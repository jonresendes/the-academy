/* =========================================================
   cloud.js — Firebase sync layer (accounts + live data on every device)

   The app keeps working exactly as before on localStorage. This file:
     • signs people in with Firebase Auth (student number + birthday password,
       teacher ID + password) and tells storage.js who is signed in;
     • mirrors every local save to Firestore (students, staff, sections,
       progress per course, Focus Plans, shared settings);
     • listens to Firestore and writes changes back into localStorage, then
       asks the app to redraw — so a teacher sees a hand-in as it happens
       and a student sees their class on a brand-new device.
   Loads BEFORE storage.js (storage.js calls Cloud.onLocalSave after each save).

   Firestore layout:
     meta/master              { uid, name, at }                    first teacher = master account
     staff/{uid}              { id, name, role, login, avatar, colour, prefs, archived, createdAt }
     students/{uid}           profile (same shape as storage.js) + number, dob, createdAt
     sections/{id}            section (same shape as storage.js)
     progress/{uid}__{course} { student, course, data, updatedAt }
     focus/{uid}              { data, updatedAt }
     settings/global          { allowSelfSignup, colouringEvery }
   ========================================================= */
(function () {
  const CFG = window.CLOUD_CONFIG || {};
  const enabled = !!(CFG.enabled && CFG.firebase && window.firebase);
  const Cloud = { enabled, ready: false, user: null, role: null, online: navigator.onLine, status: enabled ? 'starting' : 'off', error: '' };
  window.Cloud = Cloud;
  if (!enabled) { Cloud.onLocalSave = () => {}; Cloud.whenReady = () => Promise.resolve(); return; }

  const fb = window.firebase;
  const app = fb.initializeApp(CFG.firebase);
  const auth = fb.auth();
  const db = fb.firestore();
  try { db.enablePersistence({ synchronizeTabs: false }).catch(() => {}); } catch (e) {}
  auth.setPersistence(fb.auth.Auth.Persistence.LOCAL).catch(() => {});
  const SD = CFG.studentDomain || 'students.the-academy.app', TD = CFG.staffDomain || 'staff.the-academy.app';
  const studentEmail = n => String(n).trim().toLowerCase().replace(/[^a-z0-9._-]/g, '') + '@' + SD;
  const staffEmail = n => String(n).trim().toLowerCase().replace(/[^a-z0-9._-]/g, '') + '@' + TD;
  const now = () => new Date().toISOString();
  const KEY_ACTIVE = 'learnhub.lastActive', KEY_KEEP = 'learnhub.keepSignedIn';

  /* ---------- status + events ---------- */
  function setStatus(s, err) { Cloud.status = s; Cloud.error = err || ''; emit('status'); }
  function emit(kind, detail) { try { window.dispatchEvent(new CustomEvent('cloud:' + kind, { detail })); } catch (e) {} }
  window.addEventListener('online', () => { Cloud.online = true; setStatus(Cloud.user ? 'synced' : 'signed-out'); });
  window.addEventListener('offline', () => { Cloud.online = false; setStatus('offline'); });

  /* ---------- local store access (storage.js is loaded after this file) ---------- */
  const lsGet = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
  let applying = false;           // true while we write remote data into localStorage (suppresses echo)
  const lsSet = (k, v) => { applying = true; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} applying = false; lastSeen[k] = JSON.stringify(v); };
  const lastSeen = {};            // last JSON we pushed or applied per local key (echo filter)

  /* ---------- local → cloud ---------- */
  const pending = {}; let flushTimer = null;
  Cloud.onLocalSave = function (key, value) {
    if (applying || !Cloud.user) return;
    const json = JSON.stringify(value);
    if (lastSeen[key] === json) return;
    lastSeen[key] = json;
    pending[key] = value;
    clearTimeout(flushTimer); flushTimer = setTimeout(flush, 300);
  };
  /** Push everything waiting right now (Save buttons, sign-out, leaving the page).
      Resolves only when the cloud has CONFIRMED every write, including ones started earlier;
      throws if a write failed or has not been confirmed within `waitMs`. */
  let inFlight = null, inFlightCount = 0; Cloud.waiting = 0; Cloud.lastConfirmed = '';
  Cloud.flushNow = async function (waitMs) {
    clearTimeout(flushTimer);
    const run = flush();
    let timer; const timeout = new Promise((_, rej) => { timer = setTimeout(() => rej(new Error('stuck')), waitMs || 8000); });
    try { await Promise.race([run, timeout]); }
    catch (e) { if (e.message === 'stuck') throw new Error('The cloud has not confirmed this change yet (' + Cloud.waiting + ' waiting). Keep the app open and press Save again in a moment; if it keeps happening, close other open copies of The Academy on this device.'); throw e; }
    finally { clearTimeout(timer); }
    if (Cloud.lastError) throw new Error(Cloud.lastError);
  };
  window.addEventListener('pagehide', () => { if (Object.keys(pending).length) flush(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && Object.keys(pending).length) flush(); });
  function updateWaiting() { Cloud.waiting = Object.keys(pending).length + inFlightCount; }
  /** Writes are sent one batch at a time, in order; a new flush waits for the previous one. */
  function flush() { const prev = inFlight || Promise.resolve(); inFlight = prev.then(doFlush, doFlush); return inFlight; }
  async function doFlush() {
    const batch = Object.assign({}, pending); for (const k in batch) delete pending[k];
    const me = Cloud.user; if (!me) return;
    const keys = Object.keys(batch); if (!keys.length) return;
    inFlightCount = keys.length; updateWaiting(); setStatus('sending');
    let failed = null;
    try {
      for (const key of keys) {
        const v = batch[key];
        try {
          if (key === 'learnhub.students') {
            for (const s of (v.list || [])) if (s.id) { try { await pushStudent(s, me); } catch (e) { failed = failed || e; console.warn('student push failed', s.id, e); } }
            if (Cloud.role !== 'student') for (const id of removedStudents(v.list || [])) await db.collection('students').doc(id).delete().catch(() => {});
          } else if (key === 'learnhub.staff' && Cloud.role !== 'student') {
            const m = v.master, recs = [];
            if (m && m.uid) recs.push({ id: m.uid, name: m.name, avatar: m.avatar, colour: m.colour, prefs: m.prefs || null, archived: m.archived || [], role: 'master', login: m.login || '', email: m.email || '', notes: m.notes || null });
            for (const t of (v.teachers || [])) recs.push({ id: t.id, name: t.name, avatar: t.avatar, colour: t.colour, prefs: t.prefs || null, archived: t.archived || [], role: 'teacher', login: t.login || '', createdAt: t.createdAt || now(), notes: t.notes || null });
            for (const r of recs) { if (Cloud.role !== 'master' && r.id !== me.uid) continue;   // a teacher only ever writes their own record
              try { await pushStaff(r); } catch (e) { failed = failed || e; console.warn('staff push failed', r.id, e); } }
          } else if (key === 'learnhub.sections' && Cloud.role !== 'student') {
            for (const sec of (v.list || [])) await db.collection('sections').doc(sec.id).set(clean(Object.assign({}, sec, { updatedAt: now() })));
            for (const id of removedSections(v.list || [])) await db.collection('sections').doc(id).delete().catch(() => {});
          } else if (key.startsWith('learnhub.progress.')) {
            const sid = key.slice('learnhub.progress.'.length); if (sid === 'anon') continue;
            if (Cloud.role === 'student' && sid !== me.uid) continue;
            for (const cid of Object.keys(v || {})) await db.collection('progress').doc(sid + '__' + cid).set({ student: sid, course: cid, data: clean(v[cid]), updatedAt: now() });
          } else if (key.startsWith('learnhub.focus.')) {
            const sid = key.slice('learnhub.focus.'.length); if (sid === 'anon') continue;
            if (Cloud.role === 'student' && sid !== me.uid) continue;
            await db.collection('focus').doc(sid).set({ student: sid, data: clean(v), updatedAt: now() });
          } else if (key === 'learnhub.settings' && Cloud.role !== 'student') {
            await db.collection('settings').doc('global').set({ allowSelfSignup: v.allowSelfSignup !== false, colouringEvery: v.colouringEvery === undefined ? 'student' : v.colouringEvery, updatedAt: now() }, { merge: true });
          }
        } catch (e) { failed = failed || e; console.warn('cloud push failed', key, e); }
        inFlightCount--; updateWaiting();
      }
    } finally { inFlightCount = 0; updateWaiting(); }
    if (failed) { Cloud.lastError = describe(failed); setStatus('error', Cloud.lastError); }
    else { Cloud.lastError = ''; Cloud.lastConfirmed = now(); setStatus(Cloud.online ? 'synced' : 'offline'); }
  }
  /** Staff records: same idea as students — only the fields that changed since the copy we last saw. */
  const seenStaff = {};
  async function pushStaff(r) {
    const prev = seenStaff[r.id], ref = db.collection('staff').doc(r.id);
    if (!prev) { const full = clean(r); await ref.set(full, { merge: true }); seenStaff[r.id] = full; return; }
    const args = [], next = Object.assign({}, prev);
    for (const k of new Set([...Object.keys(r), ...Object.keys(prev)])) { if (k === 'createdAt' || J(prev[k]) === J(r[k])) continue; args.push(FP(k), r[k] === undefined || r[k] === null ? null : clean(r[k])); next[k] = clean(r[k]); }
    if (!args.length) return;
    try { await ref.update(...args); } catch (e) { if (e && e.code === 'not-found') await ref.set(clean(r), { merge: true }); else throw e; }
    seenStaff[r.id] = next;
  }
  /** Read a student's profile straight from the cloud (never the cache) and apply it here.
      Used by the Save button to prove the change landed. Returns the cloud copy. */
  Cloud.verifyStudent = async function (id) {
    const d = await db.collection('students').doc(id).get({ source: 'server' });
    if (!d.exists) throw new Error('The cloud has no profile for this student.');
    const doc = d.data(); doc.id = doc.id || d.id;
    seenStudents[id] = clean(doc);
    const cur = lsGet('learnhub.students') || { list: [], current: null };
    const list = (cur.list || []).map(s => s.id === id ? doc : s);
    lsSet('learnhub.students', { list, current: cur.current }); reloadStores('students');
    return doc;
  };
  const describe = e => e && e.code === 'permission-denied' ? 'The cloud refused the change (permission denied). Check the Firestore rules in the Firebase console.' : e && e.code === 'unavailable' ? 'The cloud is not reachable right now.' : (e && e.message) || String(e);

  /* ---------- student profiles: send only the fields that changed ----------
     Every device used to rewrite the whole profile, so a phone holding an old copy (offline, or a
     cached read) could put the old level and course list back over the teacher's newer one.
     Now each push compares the local record with the last copy we saw from the cloud and updates
     only the fields that differ; a student may only touch their own fields; and every change bumps
     `rev` and stamps who made it, so the same profile version can be checked on any screen. */
  const seenStudents = {};                                                             // id → last cloud copy applied here
  const META = ['updatedAt', 'updatedBy', 'rev'];
  const STUDENT_OWN = ['prefs', 'archived', 'suggestions', 'lessonLevels', 'levelLog', 'courseLevels', 'avatar', 'colour'];   // a student may change these about themselves
  const PER_COURSE = ['courseLevels', 'levelLog', 'lessonLevels', 'suggestions', 'track'];                                     // maps keyed by course: one course at a time
  const isMap = v => !!v && typeof v === 'object' && !Array.isArray(v);
  const J = v => JSON.stringify(v === undefined ? null : v);
  const FP = (...seg) => new fb.firestore.FieldPath(...seg);
  function whoAmI() { const S = window.Students, c = S && S.current; return c ? String(c.name || '') : ''; }
  async function pushStudent(s, me) {
    const id = s.id, prev = seenStudents[id], mine = Cloud.role === 'student';
    if (mine && id !== me.uid) return;
    if (!prev) {
      if (mine) return;                                                                // own profile not loaded yet: nothing safe to compare with
      const full = clean(Object.assign({}, s, { updatedAt: now(), updatedBy: whoAmI(), rev: (+s.rev || 0) + 1 }));
      await db.collection('students').doc(id).set(full); seenStudents[id] = full; return;
    }
    const args = [], next = Object.assign({}, prev); let changed = 0;
    const FV = fb.firestore.FieldValue;
    const put = (path, val) => { args.push(FP(...path), val === undefined ? FV.delete() : clean(val)); changed++; };
    for (const k of new Set([...Object.keys(s), ...Object.keys(prev)])) {
      if (META.includes(k) || (mine && !STUDENT_OWN.includes(k)) || J(prev[k]) === J(s[k])) continue;
      if (PER_COURSE.includes(k) && isMap(prev[k]) && isMap(s[k])) {
        const n = Object.assign({}, prev[k]);
        for (const c of new Set([...Object.keys(prev[k]), ...Object.keys(s[k])])) { if (J(prev[k][c]) === J(s[k][c])) continue; put([k, c], s[k][c]); if (s[k][c] === undefined) delete n[c]; else n[c] = clean(s[k][c]); }
        next[k] = n;
      } else { put([k], s[k]); if (s[k] === undefined) delete next[k]; else next[k] = clean(s[k]); }
    }
    if (!changed) return;
    const stamp = { updatedAt: now(), updatedBy: whoAmI() };
    args.push(FP('updatedAt'), stamp.updatedAt, FP('updatedBy'), stamp.updatedBy, FP('rev'), FV.increment(1));
    try { await db.collection('students').doc(id).update(...args); }
    catch (e) { if (e && e.code === 'not-found' && !mine) await db.collection('students').doc(id).set(clean(Object.assign({}, s, stamp, { rev: 1 }))); else throw e; }
    seenStudents[id] = Object.assign(next, stamp, { rev: (+prev.rev || 0) + 1 });
  }
  let knownSections = new Set(), knownStudents = new Set();
  function removedSections(list) { const ids = new Set(list.map(s => s.id)); const gone = [...knownSections].filter(id => !ids.has(id)); knownSections = ids; return gone; }
  function removedStudents(list) { const ids = new Set(list.map(s => s.id)); const gone = [...knownStudents].filter(id => !ids.has(id)); knownStudents = ids; return gone; }
  /** A local key was removed (reset progress / remove student): delete the matching documents. */
  Cloud.onLocalRemove = async function (key) {
    if (applying || !Cloud.user || Cloud.role === 'student') return;
    try {
      if (key.startsWith('learnhub.progress.')) { const sid = key.slice('learnhub.progress.'.length); const q = await db.collection('progress').where('student', '==', sid).get(); for (const d of q.docs) await d.ref.delete(); }
      else if (key.startsWith('learnhub.focus.')) await db.collection('focus').doc(key.slice('learnhub.focus.'.length)).delete().catch(() => {});
    } catch (e) { console.warn('cloud delete failed', e); }
  };
  /** Firestore rejects undefined values; strip them (and functions). */
  function clean(o) { return JSON.parse(JSON.stringify(o === undefined ? null : o)); }

  /* ---------- cloud → local ---------- */
  const unsubs = [];
  function stopListening() { unsubs.splice(0).forEach(u => { try { u(); } catch (e) {} }); }
  function listen(ref, handler) { unsubs.push(ref.onSnapshot(snap => { try { handler(snap); } catch (e) { console.warn('cloud apply failed', e); } }, err => { console.warn('cloud listen', err); setStatus('error', err.message); })); }

  function applyStudents(docs) {
    const cur = lsGet('learnhub.students') || { list: [], current: null };
    const list = docs.map(d => { const s = d.data(); s.id = s.id || d.id; seenStudents[s.id] = clean(s); return s; });   // keep rev / updatedAt / updatedBy: screens show them
    if (Cloud.role === 'student') { // a student only ever holds their own profile locally
      const mine = list.find(s => s.id === Cloud.user.uid); const others = (cur.list || []).filter(s => s.id !== Cloud.user.uid && !String(s.id).startsWith('s'));
      lsSet('learnhub.students', { list: mine ? [mine] : [], current: cur.current });
    } else { knownStudents = new Set(list.map(s => s.id)); lsSet('learnhub.students', { list, current: cur.current }); }
    reloadStores('students');
  }
  function applyStaff(docs) {
    const staff = { master: null, teachers: [] };
    const cur = lsGet('learnhub.staff') || { master: null, teachers: [] };
    const localOf = id => (cur.master && cur.master.uid === id) ? cur.master : (cur.teachers || []).find(t => t.id === id);
    docs.forEach(d => { const t = d.data(); t.id = t.id || d.id; seenStaff[t.id] = clean(t);
      // my own notes typed on this device but not yet confirmed by the cloud must not be wiped by an older copy
      const loc = localOf(t.id); const newer = loc && loc.notes && loc.notes.updatedAt && (!t.notes || !t.notes.updatedAt || loc.notes.updatedAt > t.notes.updatedAt);
      if (newer && Cloud.user && t.id === Cloud.user.uid) { t.notes = loc.notes; setTimeout(() => { pending['learnhub.staff'] = lsGet('learnhub.staff'); lastSeen['learnhub.staff'] = ''; flush(); }, 0); }
      if (t.role === 'master') staff.master = Object.assign({ pin: '' }, t, { uid: t.id, id: 'master' }); else staff.teachers.push(Object.assign({ pin: '' }, t)); });   // the master keeps the local id 'master'; its Firebase uid is in .uid
    lsSet('learnhub.staff', staff); reloadStores('staff');
  }
  function applySections(docs) {
    const cur = lsGet('learnhub.sections') || { list: [], current: {} };
    const list = docs.map(d => { const s = d.data(); delete s.updatedAt; return s; });
    knownSections = new Set(list.map(s => s.id));
    // a student's own "current section" map is device-local; keep it
    lsSet('learnhub.sections', { list, current: cur.current || {} }); reloadStores('sections');
  }
  function applyProgress(docs) {
    const perStudent = {};
    docs.forEach(d => { const p = d.data(); (perStudent[p.student] = perStudent[p.student] || {})[p.course] = p.data || {}; });
    Object.keys(perStudent).forEach(sid => {
      const local = lsGet('learnhub.progress.' + sid) || {};
      const merged = Object.assign({}, local, perStudent[sid]);
      lsSet('learnhub.progress.' + sid, merged);
    });
    reloadStores('progress');
  }
  function applyFocus(docs) { docs.forEach(d => { const f = d.data(); lsSet('learnhub.focus.' + f.student, f.data || { enabled: false, courses: {} }); }); reloadStores('focus'); }
  function applySettings(doc) { if (!doc.exists) return; const g = doc.data(); const s = lsGet('learnhub.settings') || {}; s.allowSelfSignup = g.allowSelfSignup !== false; if (g.colouringEvery !== undefined) s.colouringEvery = g.colouringEvery; lsSet('learnhub.settings', s); reloadStores('settings'); }
  /** Update an object tree in place so pages holding references keep seeing current data. */
  function mergeInPlace(target, src) {
    Object.keys(target).forEach(k => { if (!(k in src)) delete target[k]; });
    Object.keys(src).forEach(k => {
      const a = target[k], b = src[k];
      if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a) && !Array.isArray(b)) mergeInPlace(a, b);
      else target[k] = b;
    });
  }
  /** Make storage.js re-read what we just wrote, then ask the app to redraw. */
  function reloadStores(what) {
    const S = window.Students, St = window.Staff, Sec = window.Sections, P = window.Progress, F = window.Focus, Set = window.Settings;
    if (!S) return;
    if (what === 'students') { const d = lsGet('learnhub.students'); if (d) { S.data.list = d.list; } }
    if (what === 'staff' && St) { const d = lsGet('learnhub.staff'); if (d) St.data = d; S._staffCache = {}; }
    if (what === 'sections' && Sec) { const d = lsGet('learnhub.sections'); if (d) Sec.data = d; }
    if (what === 'progress' && P) { const fresh = lsGet(P.key()); if (fresh && P.data && typeof P.data === 'object') mergeInPlace(P.data, fresh); else P.load(); }
    if (what === 'focus' && F) { const fresh = lsGet(F.key()); if (fresh && F.data) mergeInPlace(F.data, fresh); else F.load(); }
    if (what === 'settings' && Set) { const d = lsGet('learnhub.settings'); if (d) Object.assign(Set.data, d); }
    emit('change', what);
  }

  function startListening() {
    stopListening();
    const uid = Cloud.user.uid;
    if (Cloud.role === 'student') {
      listen(db.collection('students').doc(uid), d => applyStudents(d.exists ? [d] : []));
      listen(db.collection('sections').where('students', 'array-contains', uid), q => applySections(q.docs));
      listen(db.collection('progress').where('student', '==', uid), q => applyProgress(q.docs));
      listen(db.collection('focus').doc(uid), d => applyFocus(d.exists ? [d] : []));
      listen(db.collection('settings').doc('global'), applySettings);
      listen(db.collection('staff'), q => applyStaff(q.docs));          // teacher names for the student's sections
    } else {
      listen(db.collection('students'), q => applyStudents(q.docs));
      listen(db.collection('staff'), q => applyStaff(q.docs));
      listen(db.collection('sections'), q => applySections(q.docs));
      listen(db.collection('progress'), q => applyProgress(q.docs));
      listen(db.collection('focus'), q => applyFocus(q.docs));
      listen(db.collection('settings').doc('global'), applySettings);
    }
  }

  /* ---------- who am I ---------- */
  let readyResolve; const readyP = new Promise(r => { readyResolve = r; });
  Cloud.whenReady = () => readyP;
  async function resolveRole(user) {
    const st = await db.collection('staff').doc(user.uid).get().catch(() => null);
    if (st && st.exists) return st.data().role === 'master' ? 'master' : 'teacher';
    return 'student';
  }
  async function loadOnce(user, role) {
    // First pull so the app has data before it draws (listeners keep it fresh afterwards).
    if (role === 'student') {
      const [p, secs, prog, foc, g, st] = await Promise.all([
        db.collection('students').doc(user.uid).get(), db.collection('sections').where('students', 'array-contains', user.uid).get(),
        db.collection('progress').where('student', '==', user.uid).get(), db.collection('focus').doc(user.uid).get(), db.collection('settings').doc('global').get(), db.collection('staff').get()]);
      applyStudents(p.exists ? [p] : []); applySections(secs.docs); applyProgress(prog.docs); applyFocus(foc.exists ? [foc] : []); applySettings(g); applyStaff(st.docs);
    } else {
      const [ss, st, secs, prog, foc, g] = await Promise.all([db.collection('students').get(), db.collection('staff').get(), db.collection('sections').get(), db.collection('progress').get(), db.collection('focus').get(), db.collection('settings').doc('global').get()]);
      applyStudents(ss.docs); applyStaff(st.docs); applySections(secs.docs); applyProgress(prog.docs); applyFocus(foc.docs); applySettings(g);
    }
  }
  auth.onAuthStateChanged(async user => {
    stopListening(); Object.keys(seenStudents).forEach(k => delete seenStudents[k]); Object.keys(seenStaff).forEach(k => delete seenStaff[k]);
    if (!user) { Cloud.user = null; Cloud.role = null; Cloud.ready = true; setStatus('signed-out'); readyResolve(); emit('auth'); return; }
    try {
      if (idleExpired()) { await auth.signOut(); return; }
      Cloud.user = user; Cloud.role = await resolveRole(user);
      await loadOnce(user, Cloud.role);
      startListening();
      touch();
      Cloud.ready = true; setStatus(Cloud.online ? 'synced' : 'offline'); readyResolve(); emit('auth');
    } catch (e) { console.warn('cloud sign-in failed', e); Cloud.ready = true; setStatus('error', e.message); readyResolve(); emit('auth'); }
  });

  /* ---------- idle sign-out (grace period) ---------- */
  function touch() { try { localStorage.setItem(KEY_ACTIVE, String(Date.now())); } catch (e) {} }
  function idleExpired() {
    const mins = +CFG.idleMinutes || 0; if (!mins) return false;
    if (localStorage.getItem(KEY_KEEP) === '1') return false;
    const last = +localStorage.getItem(KEY_ACTIVE) || 0; return last && (Date.now() - last) > mins * 60000;
  }
  let touchT = 0; ['click', 'keydown', 'touchstart', 'scroll'].forEach(ev => window.addEventListener(ev, () => { const t = Date.now(); if (t - touchT > 30000) { touchT = t; touch(); } }, { passive: true }));
  setInterval(() => { if (Cloud.user && idleExpired()) Cloud.signOut(); }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && Cloud.user && idleExpired()) Cloud.signOut(); });

  /* ---------- public API ---------- */
  const friendly = e => ({ 'auth/user-not-found': 'No account with that number.', 'auth/wrong-password': 'The password is not right. Students: your birthday as DDMMYYYY, e.g. 12011986.', 'auth/invalid-credential': 'The number or password is not right.', 'auth/invalid-login-credentials': 'The number or password is not right.', 'auth/too-many-requests': 'Too many tries — wait a minute and try again.', 'auth/network-request-failed': 'No internet connection.', 'auth/email-already-in-use': 'An account with that number already exists.', 'auth/weak-password': 'The password must be at least 6 characters.' }[e.code] || e.message);
  const dobPassword = dob => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob); return m ? m[3] + m[2] + m[1] : String(dob).replace(/\D/g, ''); };   // 2008-01-12 → 12012008

  Cloud.signInStudent = async (number, password, keep) => {
    try { localStorage.setItem(KEY_KEEP, keep ? '1' : '0'); } catch (e) {}
    try { await auth.signInWithEmailAndPassword(studentEmail(number), String(password).replace(/\D/g, '')); } catch (e) { throw new Error(friendly(e)); }
    await waitForRole();
  };
  Cloud.signInStaff = async (login, password, keep) => {
    try { localStorage.setItem(KEY_KEEP, keep ? '1' : '0'); } catch (e) {}
    try { await auth.signInWithEmailAndPassword(staffEmail(login), password); } catch (e) { throw new Error(friendly(e)); }
    await waitForRole();
    if (Cloud.role === 'student') { await auth.signOut(); throw new Error('That is a student account — use the student sign-in.'); }
  };
  function waitForRole() { return new Promise(res => { const t = setInterval(() => { if (Cloud.user && Cloud.role) { clearInterval(t); res(); } }, 50); }); }
  Cloud.signOut = async () => { try { await Cloud.flushNow(); } catch (e) {} Students_signOutLocal(); if (!auth.currentUser && !Cloud.user) return; Cloud.user = null; Cloud.role = null; stopListening(); try { await auth.signOut(); } catch (e) {} };
  function Students_signOutLocal() { try { sessionStorage.removeItem('learnhub.entered'); } catch (e) {} if (window.Students) window.Students.setCurrent(null); }

  /** Create a user without disturbing the current session (a secondary Firebase app). */
  async function createAuthUser(email, password) {
    const name = 'secondary-' + Date.now();
    const sec = fb.initializeApp(CFG.firebase, name);
    try { const cred = await sec.auth().createUserWithEmailAndPassword(email, password); const uid = cred.user.uid; await sec.auth().signOut(); return uid; }
    catch (e) { throw new Error(friendly(e)); }
    finally { setTimeout(() => sec.delete().catch(() => {}), 500); }
  }
  /** Change a user's password when the old one is known (used to fix a wrong birthday). */
  async function changeAuthPassword(email, oldPw, newPw) {
    const name = 'secondary-' + Date.now();
    const sec = fb.initializeApp(CFG.firebase, name);
    try { const cred = await sec.auth().signInWithEmailAndPassword(email, oldPw); await cred.user.updatePassword(newPw); await sec.auth().signOut(); }
    catch (e) { throw new Error(friendly(e)); }
    finally { setTimeout(() => sec.delete().catch(() => {}), 500); }
  }

  /** Teacher (or self sign-up) creates a student: returns the profile (also written locally + to the cloud). */
  Cloud.createStudent = async ({ name, number, dob, level, courses, prefs, avatar }) => {
    number = String(number || '').trim(); if (!/^[A-Za-z0-9._-]{3,}$/.test(number)) throw new Error('Enter the student number (letters and digits only).');
    const pw = dobPassword(dob); if (!/^\d{8}$/.test(pw)) throw new Error('Enter the birthday.');
    const uid = await createAuthUser(studentEmail(number), pw);
    const S = window.Students;
    const profile = S.add(name, Object.assign({ id: uid, number, dob, level: level || 2, courses: courses === undefined ? null : courses }, prefs ? { prefs } : {}, avatar ? { avatar } : {}));
    const full = clean(Object.assign({}, profile, { updatedAt: now(), updatedBy: whoAmI(), rev: 1 })); await db.collection('students').doc(uid).set(full); seenStudents[uid] = full;
    return profile;
  };
  /** Fix a student's birthday (and therefore their password). */
  Cloud.fixStudentBirthday = async (student, newDob) => {
    const oldPw = dobPassword(student.dob), newPw = dobPassword(newDob);
    if (!/^\d{8}$/.test(newPw)) throw new Error('Enter the new birthday.');
    await changeAuthPassword(studentEmail(student.number), oldPw, newPw);
    window.Students.update(student.id, { dob: newDob });
  };
  /** Master creates a teacher (login + password); the first teacher ever becomes the master. */
  Cloud.createStaff = async ({ name, login, password, avatar, email }) => {
    login = String(login || '').trim(); if (!/^[A-Za-z0-9._-]{3,}$/.test(login)) throw new Error('Enter a teacher ID (letters and digits only).');
    if (String(password || '').length < 6) throw new Error('The password must be at least 6 characters.');
    let role;
    try { const meta = await db.collection('meta').doc('master').get(); role = meta.exists ? 'teacher' : 'master'; }
    catch (e) { role = Cloud.role === 'master' ? 'teacher' : 'master'; }     // not signed in: the rules hide meta/master; creation below fails safely if one exists
    if (role === 'teacher' && Cloud.role !== 'master') throw new Error('Only the Headmaster can add teachers. If you are setting up for the first time and see this, a Headmaster account already exists — sign in with it.');
    const uid = await createAuthUser(staffEmail(login), password);
    const rec = clean({ id: uid, name: String(name).trim().slice(0, 40), role, login, email: email || '', avatar: avatar || '🧑‍🏫', colour: '#1f5f8b', archived: [], createdAt: now() });
    if (role === 'master') {
      // The first teacher writes their own record, then claims the master record (rules allow both only while no master exists).
      const sname = 'secondary-' + Date.now(); const sec = fb.initializeApp(CFG.firebase, sname);
      try { await sec.auth().signInWithEmailAndPassword(staffEmail(login), password); const sdb = sec.firestore(); await sdb.collection('staff').doc(uid).set(rec); await sdb.collection('meta').doc('master').set({ uid, name: rec.name, at: now() }); await sec.auth().signOut(); }
      catch (e) { try { await sec.auth().signOut(); } catch (x) {} throw new Error(/permission|insufficient/i.test(e.message) ? 'A Headmaster account already exists — sign in with it, and add yourself as a teacher from Settings → Teachers.' : friendly(e)); }
      finally { setTimeout(() => sec.delete().catch(() => {}), 500); }
    } else await db.collection('staff').doc(uid).set(rec);   // the signed-in master writes the teacher's record
    return rec;
  };
  Cloud.changeMyPassword = async (oldPw, newPw) => { const u = auth.currentUser; if (!u) throw new Error('Not signed in.'); try { const cred = fb.auth.EmailAuthProvider.credential(u.email, oldPw); await u.reauthenticateWithCredential(cred); await u.updatePassword(newPw); } catch (e) { throw new Error(friendly(e)); } };
  Cloud.hasMaster = async () => (await db.collection('meta').doc('master').get()).exists;
  Cloud.touch = touch;
  Cloud.keepSignedIn = () => localStorage.getItem(KEY_KEEP) === '1';
  Cloud.dobPassword = dobPassword;
  Cloud.db = db; Cloud.auth = auth;
})();
