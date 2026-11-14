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

   This is the free-plan edition: there are no Cloud Functions. Accounts are made from the browser through a
   second, throw-away connection (as before v43), and the security rules decide what each account may read
   and write. Run once by the Headmaster's app: Cloud.runMigration (the v42 → v43 data upgrade).

   Firestore layout (v43):
     meta/master              { uid, name, at }                    the one Headmaster (admin) account
     meta/config              { version, migratedAt, … }           which data version the project is on
     issues/{id}              a reported problem + screenshot (see report.js); read by the Headmaster only
     logins/{teacherId}       { email, uid, at }                   which sign-in a teacher ID uses now (after a password reset)
     staff/{uid}              { id, name, role, login, avatar, colour, prefs, archived, createdAt }   — public part
     staffNotes/{uid}         { notes }                            that teacher only
     staffPrivate/{uid}       { email, authEmail, gen }            that teacher and the Headmaster
     students/{uid}           profile (same shape as storage.js) + number, dob, createdAt, teachers
     directory/{uid}          { name, number, avatar }             staff only: who can be added to a section
     sections/{id}            section (same shape as storage.js)
     progress/{uid}__{course} { student, course, data, updatedAt }
     grades/{uid}__{course}   { student, course, data, updatedAt }   teacher grades; a student can read, not write
     focus/{uid}              { student, data, updatedAt }
     settings/global          { allowSelfSignup, colouringEvery }
     audit/{id}               change log: lines added by staff apps, read by the Headmaster, never edited
   `teachers` (on the student record) is the list of staff who have that student. A teacher's app adds its own id
   when the student goes onto one of its rosters and takes it off again when they leave; the Headmaster's app keeps
   the lists in step with the rosters. The security rules use it: a teacher only ever receives their own students.
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
  const normLogin = n => String(n).trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
  /* A teacher whose password the Headmaster has reset signs in with a fresh account behind the same teacher ID
     (the browser cannot change someone else's password). logins/{teacherId} says which address is current. */
  const genEmail = (login, gen) => gen > 1 ? normLogin(login) + '+r' + gen + '@' + TD : staffEmail(login);
  async function emailForLogin(login) {
    try { const d = await db.collection('logins').doc(normLogin(login)).get(); if (d.exists && d.data().email) return d.data().email; } catch (e) {}
    return staffEmail(login);
  }
  const KEY_ACTIVE = 'learnhub.lastActive', KEY_KEEP = 'learnhub.keepSignedIn', KEY_CACHE = 'learnhub.cache', KEY_KIND = 'learnhub.kind';
  // KEY_CACHE 'wipe': empty the offline database as soon as nobody is signed in · KEY_KIND: 'staff' | 'student', who signed in last

  /** One line in the change log (never waits, never fails the action it describes). */
  function log(action, target, detail) {
    try { if (Cloud.user && Cloud.role !== 'student') db.collection('audit').add({ at: now(), by: Cloud.user.uid, byName: whoAmI(), byRole: Cloud.role, action, target: target || '', detail: detail || {} }).catch(() => {}); } catch (e) {}
  }

  /* ---------- nothing is left on the device after sign-out ---------- */
  const DATA_KEYS = /^learnhub\.(students|staff|sections|progress\.|focus\.|grades\.|issues|directory)/;
  /** Remove every copy of school data from this browser's storage and from the app's memory. */
  function wipeLocal() {
    applying = true;
    try { Object.keys(localStorage).filter(k => DATA_KEYS.test(k)).forEach(k => localStorage.removeItem(k)); } catch (e) {}
    try { Object.keys(sessionStorage).filter(k => /^learnhub\./.test(k) && k !== 'learnhub.switch').forEach(k => sessionStorage.removeItem(k)); } catch (e) {}
    applying = false;
    Object.keys(lastSeen).forEach(k => delete lastSeen[k]);
    const S = window.Students, St = window.Staff, Sec = window.Sections, P = window.Progress, F = window.Focus;
    Cloud.directory = [];
    if (S) { S.data.list = []; S.data.current = null; S._staffCache = {}; }
    if (St) St.data = { master: null, teachers: [] };
    if (Sec) Sec.data = { list: [], current: {} };
    if (P) P.load(); if (F) F.load();
  }
  /** Empty the offline database too (it holds whatever this account could read), then start clean. */
  async function wipeCache() {
    try { localStorage.removeItem(KEY_CACHE); } catch (e) {}
    try { await db.terminate(); await db.clearPersistence(); } catch (e) { console.warn('could not clear the offline cache', e); }
    location.reload();
  }

  /* ---------- status + events ---------- */
  function setStatus(s, err) { if (s === 'synced' && Cloud.loadError) { s = 'error'; err = Cloud.loadError; }   // a problem found at sign-in stays on show until the next sign-in
    Cloud.status = s; Cloud.error = err || ''; emit('status'); }
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
    pending[key] = JSON.parse(json);   // a snapshot: the live object may be replaced by an incoming cloud copy before the push runs
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
            for (const s of (v.list || [])) if (s.id) { try { await pushStudent(s, me); } catch (e) { failed = failed || e; console.warn('student push failed', s.id, e); } }   // students are removed by the server (Cloud.removeStudent)
          } else if (key === 'learnhub.staff' && Cloud.role !== 'student') {
            const m = v.master, recs = [];
            // The staff record everyone can read holds only the public part; notes and e-mail go to their own private records.
            if (m && m.uid) recs.push({ pub: { id: m.uid, name: m.name, avatar: m.avatar, colour: m.colour, prefs: m.prefs || null, archived: m.archived || [], role: 'master', login: m.login || '' }, email: m.email || '', notes: m.notes || null });
            for (const t of (v.teachers || [])) recs.push({ pub: { id: t.id, name: t.name, avatar: t.avatar, colour: t.colour, prefs: t.prefs || null, archived: t.archived || [], role: 'teacher', login: t.login || '', createdAt: t.createdAt || now() }, email: t.email || '', notes: t.notes || null });
            for (const r of recs) { const id = r.pub.id, own = id === me.uid;
              if (Cloud.role !== 'master' && !own) continue;                                // a teacher only ever writes their own record
              if (!own && !seenStaff[id]) continue;                                         // teachers are created by the server, never from a local list
              try {
                await pushStaff(r.pub);
                if (own && notesLoaded && J(r.notes) !== J(myNotes)) { await db.collection('staffNotes').doc(id).set({ notes: r.notes ? clean(r.notes) : null, updatedAt: now() }); myNotes = r.notes ? clean(r.notes) : null; }
                if (emailsLoaded && (r.email || '') !== (emails[id] || '')) { await db.collection('staffPrivate').doc(id).set({ email: String(r.email || '').slice(0, 120), updatedAt: now() }, { merge: true }); emails[id] = r.email || ''; }
              } catch (e) { failed = failed || e; console.warn('staff push failed', id, e); } }
          } else if (key === 'learnhub.sections' && Cloud.role !== 'student') {
            for (const sec of (v.list || [])) await db.collection('sections').doc(sec.id).set(clean(Object.assign({}, sec, { updatedAt: now() })));
            for (const id of removedSections(v.list || [])) await db.collection('sections').doc(id).delete().catch(() => {});
            try { await reconcileAccess(v.list || []); } catch (e) { failed = failed || e; console.warn('access lists', e); }
          } else if (key.startsWith('learnhub.progress.')) {
            const sid = key.slice('learnhub.progress.'.length); if (sid === 'anon' || sid.startsWith('staff:')) continue;   // a teacher's own course preview stays on the device
            if (Cloud.role === 'student' && sid !== me.uid) continue;
            for (const cid of Object.keys(v || {})) await db.collection('progress').doc(sid + '__' + cid).set({ student: sid, course: cid, data: clean(v[cid]), updatedAt: now() });
          } else if (key.startsWith('learnhub.grades.')) {                                  // teacher grades: their own record, which a student cannot write
            const sid = key.slice('learnhub.grades.'.length); if (Cloud.role === 'student') continue;
            for (const cid of Object.keys(v || {})) await db.collection('grades').doc(sid + '__' + cid).set({ student: sid, course: cid, data: clean(v[cid]), updatedAt: now(), updatedBy: whoAmI() });
          } else if (key.startsWith('learnhub.focus.')) {
            const sid = key.slice('learnhub.focus.'.length); if (sid === 'anon') continue;
            if (Cloud.role === 'student') continue;                                          // a Focus Plan is set by a teacher
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
  const knownDocs = { progress: new Set(), grades: new Set(), focus: new Set() };
  /** Staff records: same idea as students — only the fields that changed since the copy we last saw. */
  const seenStaff = {};
  async function pushStaff(r) {
    const prev = seenStaff[r.id], ref = db.collection('staff').doc(r.id);
    if (!prev) { const full = clean(r); await ref.set(full, { merge: true }); seenStaff[r.id] = full; return; }
    const args = [], next = Object.assign({}, prev);
    for (const k of Object.keys(r)) { if (k === 'createdAt' || J(prev[k]) === J(r[k])) continue; args.push(FP(k), r[k] === undefined || r[k] === null ? null : clean(r[k])); next[k] = clean(r[k]); }
    if (!args.length) return;
    try { await ref.update(...args); } catch (e) { if (e && e.code === 'not-found') { if (Cloud.user && r.id === Cloud.user.uid) await ref.set(clean(r), { merge: true }); else return; } else throw e; }   // a record the Headmaster removed is not brought back
    seenStaff[r.id] = next;
  }
  /** Read a student's profile straight from the cloud (never the cache) and apply it here.
      Used by the Save button to prove the change landed. Returns the cloud copy. */
  Cloud.verifyStudent = async function (id) {
    const d = await db.collection('students').doc(id).get({ source: 'server' });
    if (!d.exists) throw new Error('The cloud has no profile for this student.');
    const doc = tidy(d.data()); doc.id = d.id;
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
  const META = ['updatedAt', 'updatedBy', 'rev', 'id', 'teachers'];   // stamps, and the access list (changed only by claim / unclaim below)
  const STUDENT_OWN = ['prefs', 'archived', 'suggestions', 'lessonLevels', 'levelLog', 'courseLevels', 'avatar', 'colour', 'notes'];   // a student may change these about themselves
  const PER_COURSE = ['courseLevels', 'levelLog', 'lessonLevels', 'suggestions', 'track'];                                     // maps keyed by course: one course at a time
  const isMap = v => !!v && typeof v === 'object' && !Array.isArray(v);
  const J = v => JSON.stringify(v === undefined ? null : v);
  const FP = (...seg) => new fb.firestore.FieldPath(...seg);
  function whoAmI() { const S = window.Students, c = S && S.current; return c ? String(c.name || '') : ''; }
  async function pushStudent(s, me) {
    const id = s.id, prev = seenStudents[id], mine = Cloud.role === 'student';
    if (mine && id !== me.uid) return;
    if (!prev) return;                                                                 // not loaded from the cloud yet (nothing safe to compare with); profiles are created by Cloud.createStudent
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
    catch (e) { if (e && e.code === 'not-found') return; throw e; }                    // removed meanwhile: do not bring it back
    const before = mine ? '' : J(card(prev));
    seenStudents[id] = Object.assign(next, stamp, { rev: (+prev.rev || 0) + 1 });
    if (!mine && J(card(next)) !== before) db.collection('directory').doc(id).set(Object.assign(card(next), { updatedAt: now() })).catch(() => {});   // keep the staff directory card in step
  }
  let knownSections = new Set();
  function removedSections(list) { const ids = new Set(list.map(s => s.id)); const gone = [...knownSections].filter(id => !ids.has(id)); knownSections = ids; return gone; }
  /** A local key was removed (reset progress / remove student): delete the matching documents. */
  Cloud.onLocalRemove = async function (key) {
    if (applying || !Cloud.user || Cloud.role === 'student') return;
    try {
      if (key.startsWith('learnhub.progress.')) { const sid = key.slice('learnhub.progress.'.length); for (const id of [...knownDocs.progress].filter(x => x.startsWith(sid + '__'))) { await db.collection('progress').doc(id).delete(); knownDocs.progress.delete(id); } }
      else if (key.startsWith('learnhub.focus.')) await db.collection('focus').doc(key.slice('learnhub.focus.'.length)).delete().catch(() => {});
    } catch (e) { console.warn('cloud delete failed', e); }
  };
  /** Firestore rejects undefined values; strip them (and functions). */
  function clean(o) { return JSON.parse(JSON.stringify(o === undefined ? null : o)); }

  /* ---------- cloud → local ---------- */
  const unsubs = [];
  function stopListening() { listening = false; unsubs.splice(0).forEach(u => { try { u(); } catch (e) {} }); Object.keys(docSubs).forEach(k => { try { docSubs[k](); } catch (e) {} delete docSubs[k]; }); }
  function listen(ref, handler) { unsubs.push(ref.onSnapshot(snap => { try { handler(snap); } catch (e) { console.warn('cloud apply failed', e); } }, err => { console.warn('cloud listen', err); setStatus('error', err.message); })); }

  /* Records arriving from the cloud are data, never markup. Before anything is stored or drawn: values that must be
     numbers are made numbers, and a map key that could not be an ordinary id or word is dropped. (Text a person typed
     — names, answers, comments — is left as it is and escaped where it is shown.) */
  const NUMERIC = new Set(['best', 'attempts', 'testBest', 'testAttempts', 'pct', 'level', 'from', 'to', 'score', 'max', 'rev', 'fontScale']);
  function tidy(v, key, parent) {
    if (Array.isArray(v)) return v.map(x => tidy(x, '', key));
    if (v && typeof v === 'object') { const o = {}; Object.keys(v).forEach(k => { if (!/[<>"'&`]/.test(k)) o[k] = tidy(v[k], k, key); }); return o; }
    if (typeof v === 'string' && (NUMERIC.has(key) || parent === 'gameScores' || parent === 'courseLevels')) { const n = parseFloat(v); return isFinite(n) ? n : 0; }
    return v;
  }
  function applyStudents(docs) {
    const cur = lsGet('learnhub.students') || { list: [], current: null };
    const list = docs.map(d => { const s = tidy(d.data()); s.id = d.id; seenStudents[s.id] = clean(s); return s; });   // keep rev / updatedAt / updatedBy: screens show them
    if (Cloud.role === 'student') { // a student only ever holds their own profile locally
      const mine = list.find(s => s.id === Cloud.user.uid);
      lsSet('learnhub.students', { list: mine ? [mine] : [], current: cur.current });
    } else {                                                                         // a teacher receives only the students who have them on their access list
      const ids = new Set(list.map(x => x.id));
      Object.keys(seenStudents).forEach(k => { if (ids.has(k)) return; delete seenStudents[k];   // no longer mine: drop every local copy of their records
        applying = true; try { ['progress', 'grades', 'focus'].forEach(n => localStorage.removeItem('learnhub.' + n + '.' + k)); } catch (e) {} applying = false; });
      lsSet('learnhub.students', { list, current: cur.current });
    }
    reloadStores('students'); syncDocListeners();
  }
  /** Staff only: name, number and picture of every student, for "Add an existing student" (kept in memory, never stored). */
  function applyDirectory(docs) { Cloud.directory = docs.map(d => Object.assign(tidy(d.data()), { id: d.id })); emit('change', 'directory'); }
  /* Private parts of staff records, held apart from the public record and joined on here. */
  let staffDocs = [], staffLoaded = false, myNotes = null, notesLoaded = false, emails = {}, emailsLoaded = false;
  function applyNotes(d) {
    const cloud = d.exists ? (d.data().notes || null) : null;
    const cur = lsGet('learnhub.staff') || {}; const uid = Cloud.user && Cloud.user.uid;
    const loc = ((cur.master && cur.master.uid === uid) ? cur.master : (cur.teachers || []).find(t => t.id === uid) || {}).notes;
    // notes typed on this device but not yet confirmed by the cloud must not be wiped by an older copy: send them up again
    const newer = loc && loc.updatedAt && (!cloud || !cloud.updatedAt || loc.updatedAt > cloud.updatedAt);
    myNotes = cloud ? clean(cloud) : null; notesLoaded = true;
    if (newer) { setTimeout(() => { pending['learnhub.staff'] = lsGet('learnhub.staff'); lastSeen['learnhub.staff'] = ''; flush(); }, 0); return; }
    rebuildStaff();
  }
  function applyEmails(docs) { emails = {}; docs.forEach(d => { if (d.exists) emails[d.id] = (d.data() || {}).email || ''; }); emailsLoaded = true; rebuildStaff(); }
  function applyStaff(docs) { staffDocs = docs.map(d => { const t = tidy(d.data()); t.id = d.id; seenStaff[t.id] = clean(t); return t; }); staffLoaded = true; rebuildStaff(); }
  function rebuildStaff() {
    if (!staffLoaded) return;
    const staff = { master: null, teachers: [] }; const uid = Cloud.user && Cloud.user.uid;
    staffDocs.forEach(doc => { const t = Object.assign({}, doc); delete t.notes; delete t.email; delete t.pin;           // never taken from the public record
      if (t.id === uid && myNotes) t.notes = myNotes;
      if (emails[t.id]) t.email = emails[t.id];
      if (isMasterDoc(t)) staff.master = Object.assign({ pin: '' }, t, { role: 'master', uid: t.id, id: 'master' }); else staff.teachers.push(Object.assign({ pin: '' }, t, { role: 'teacher' })); });   // the master keeps the local id 'master'; its Firebase uid is in .uid
    lsSet('learnhub.staff', staff); reloadStores('staff');
  }
  /** The Headmaster is the account named in meta/master (the same record the security rules trust);
      the role written on a staff record is only a fallback for when that record cannot be read. */
  function isMasterDoc(t) { const m = Cloud.masterInfo; return m && m.uid ? t.id === m.uid : t.role === 'master'; }
  function applySections(docs) {
    const cur = lsGet('learnhub.sections') || { list: [], current: {} };
    const list = docs.map(d => { const s = d.data(); delete s.updatedAt; return s; });
    knownSections = new Set(list.map(s => s.id));
    // a student's own "current section" map is device-local; keep it
    lsSet('learnhub.sections', { list, current: cur.current || {} }); reloadStores('sections'); syncDocListeners();
  }
  /** progress / grades records are named <student>__<course>; anything else is ignored. */
  function ownerOf(id) { const m = /^([A-Za-z0-9_-]+?)__([A-Za-z0-9_-]{1,80})$/.exec(String(id)); return m ? { student: m[1], course: m[2] } : null; }
  function applyGrades(docs) {
    const perStudent = {}; knownDocs.grades = new Set(docs.map(d => d.id));
    if (Cloud.role === 'student') perStudent[Cloud.user.uid] = {};                      // a removed grade must disappear from the student's page too
    docs.forEach(d => { const g = d.data(), k = ownerOf(d.id); if (k) (perStudent[k.student] = perStudent[k.student] || {})[k.course] = tidy(g.data || {}); });
    Object.keys(perStudent).forEach(sid => lsSet('learnhub.grades.' + sid, perStudent[sid]));
    reloadStores('grades');
  }
  function applyProgress(docs) {
    const perStudent = {}; knownDocs.progress = new Set(docs.map(d => d.id));
    docs.forEach(d => { const p = d.data(), k = ownerOf(d.id); if (k) (perStudent[k.student] = perStudent[k.student] || {})[k.course] = tidy(p.data || {}); });
    Object.keys(perStudent).forEach(sid => {
      const local = lsGet('learnhub.progress.' + sid) || {};
      const merged = Object.assign({}, local, perStudent[sid]);
      lsSet('learnhub.progress.' + sid, merged);
    });
    reloadStores('progress');
  }
  function applyFocus(docs) { knownDocs.focus = new Set(docs.map(d => d.id)); docs.forEach(d => { const f = d.data(); lsSet('learnhub.focus.' + d.id, tidy(f.data || { enabled: false, courses: {} })); }); reloadStores('focus'); }
  function applySettings(doc) { const g = doc.exists ? doc.data() : {}; const s = lsGet('learnhub.settings') || {}; s.allowSelfSignup = g.allowSelfSignup === true;   /* self sign-up is on only when the school has saved it as on (the rules agree) */ if (g.colouringEvery !== undefined) s.colouringEvery = g.colouringEvery; lsSet('learnhub.settings', s); reloadStores('settings'); }
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

  /** What each kind of account receives. A student: their own records. A teacher: their own sections and the students
      whose access list holds them (the security rules refuse anything wider). The Headmaster: everything. */
  function sources() {
    const uid = Cloud.user.uid, c = n => db.collection(n);
    const one = (ref, fn) => ({ ref, apply: d => fn(d.exists ? [d] : []) }), many = (ref, fn) => ({ ref, apply: q => fn(q.docs) });
    const common = [many(c('staff'), applyStaff), { ref: c('settings').doc('global'), apply: applySettings }];
    if (Cloud.role === 'student') return [one(c('students').doc(uid), applyStudents), many(c('sections').where('students', 'array-contains', uid), applySections),
      many(c('progress').where('student', '==', uid), applyProgress), many(c('grades').where('student', '==', uid), applyGrades), one(c('focus').doc(uid), applyFocus)].concat(common);
    const notes = { ref: c('staffNotes').doc(uid), apply: applyNotes };
    if (Cloud.role === 'master') return [many(c('students'), applyStudents), many(c('sections'), applySections), many(c('progress'), applyProgress), many(c('grades'), applyGrades),
      many(c('focus'), applyFocus), many(c('staffPrivate'), applyEmails), notes].concat(common);
    // a teacher's students arrive here; their work, grades and Focus Plans are fetched record by record (see teacherDocs)
    return [many(c('students').where('teachers', 'array-contains', uid), applyStudents), many(c('sections').where('teacherId', '==', uid), applySections),
      many(c('directory'), applyDirectory), one(c('staffPrivate').doc(uid), applyEmails), notes].concat(common);
  }
  /* A teacher reads a student's work one record at a time — <student>__<course> for the courses of the sections that
     student is in — because that is what the rules can check. The set follows the rosters as they change. */
  const docSubs = {};
  function teacherDocs() {
    const out = [], mine = new Set(Object.keys(seenStudents)), uid = Cloud.user && Cloud.user.uid;
    ((lsGet('learnhub.sections') || {}).list || []).forEach(sec => { if (sec.teacherId !== uid || !/^[\w-]{1,80}$/.test(sec.courseId || '')) return;
      (sec.students || []).forEach(sid => { if (mine.has(sid)) out.push('progress/' + sid + '__' + sec.courseId, 'grades/' + sid + '__' + sec.courseId); }); });
    mine.forEach(sid => out.push('focus/' + sid));
    return [...new Set(out)];
  }
  let docT = null;
  function applyDoc(key, d) {
    const col = key.split('/')[0], lsKey = { progress: 'learnhub.progress.', grades: 'learnhub.grades.' }[col];
    if (col === 'focus') { if (d.exists) { knownDocs.focus.add(d.id); lsSet('learnhub.focus.' + d.id, tidy(d.data().data || { enabled: false, courses: {} })); } }
    else { const k = ownerOf(d.id); if (!k) return; const cur = lsGet(lsKey + k.student) || {};
      if (d.exists) { knownDocs[col].add(d.id); cur[k.course] = tidy(d.data().data || {}); } else { knownDocs[col].delete(d.id); delete cur[k.course]; }
      lsSet(lsKey + k.student, cur); }
    clearTimeout(docT); docT = setTimeout(() => reloadStores(col), 60);
  }
  function syncDocListeners() {
    if (Cloud.role !== 'teacher' || !listening) return;
    const want = new Set(teacherDocs());
    Object.keys(docSubs).forEach(k => { if (!want.has(k)) { try { docSubs[k](); } catch (e) {} delete docSubs[k]; } });
    want.forEach(k => { if (docSubs[k]) return; const [col, id] = k.split('/');
      docSubs[k] = db.collection(col).doc(id).onSnapshot(d => { try { applyDoc(k, d); } catch (e) { console.warn('cloud apply failed', e); } }, err => console.warn('cloud listen', k, err && err.code)); });
  }
  let listening = false;
  function startListening() { stopListening(); listening = true; sources().forEach(s => listen(s.ref, s.apply)); syncDocListeners(); }

  /* ---------- who am I ---------- */
  let readyResolve; const readyP = new Promise(r => { readyResolve = r; });
  Cloud.whenReady = () => readyP;
  async function resolveRole(user) {
    const ref = db.collection('staff').doc(user.uid);
    const [st, meta] = await Promise.all([ref.get().catch(() => null), db.collection('meta').doc('master').get().catch(() => null)]);
    Cloud.masterInfo = meta && meta.exists ? meta.data() : null;
    if (!st || !st.exists) return 'student';
    const mine = Cloud.masterInfo && Cloud.masterInfo.uid ? Cloud.masterInfo.uid === user.uid : st.data().role === 'master';
    // The Headmaster's own record lost its role (older versions could leave it as 'teacher'): put it back.
    if (mine && st.data().role !== 'master') { try { await ref.update({ role: 'master' }); } catch (e) { console.warn('could not repair the Headmaster record', e); } }
    return mine ? 'master' : 'teacher';
  }
  async function loadOnce(user, role) {
    // First pull so the app has data before it draws (listeners keep it fresh afterwards).
    // Each source is fetched on its own: one refusal must not leave the whole app empty.
    const list = sources(); let firstError = null;
    const got = await Promise.all(list.map(s => s.ref.get().catch(e => { firstError = firstError || e; console.warn('cloud load', e); return null; })));
    got.forEach((snap, i) => { if (snap) { try { list[i].apply(snap); } catch (e) { console.warn('cloud apply failed', e); } } });
    if (role === 'teacher') { const keys = teacherDocs(); const docs = await Promise.all(keys.map(k => db.collection(k.split('/')[0]).doc(k.split('/')[1]).get().catch(() => null)));
      docs.forEach((d, i) => { if (d) { try { applyDoc(keys[i], d); } catch (e) { console.warn('cloud apply failed', e); } } }); }
    if (role !== 'student') { try { const cfg = await db.collection('meta').doc('config').get(); dataVersion = cfg.exists ? (+cfg.data().version || 0) : 0; } catch (e) { dataVersion = -1; } }
    if (firstError && firstError.code === 'permission-denied') Cloud.loadError = 'Some records could not be read (permission denied). If the app was just updated, check that the new firestore.rules have been published.';
    else if (role !== 'student' && dataVersion < 0) Cloud.loadError = 'The version 43 security rules do not seem to be published yet (Firebase console → Firestore → Rules). Until they are, some things will not save.';
    else if (role === 'teacher' && dataVersion >= 0 && dataVersion < 43) Cloud.loadError = 'The Headmaster needs to sign in once to finish the update to version 43. Until then your students do not appear.';
    else Cloud.loadError = '';
  }
  let dataVersion = 0;   // meta/config.version: 43 once the Headmaster's app has run the one-time upgrade
  auth.onAuthStateChanged(async user => {
    stopListening(); Object.keys(seenStudents).forEach(k => delete seenStudents[k]); Object.keys(seenStaff).forEach(k => delete seenStaff[k]);
    myRoster = null; claimed.clear(); staffDocs = []; staffLoaded = false; myNotes = null; notesLoaded = false; emails = {}; emailsLoaded = false; Object.keys(knownDocs).forEach(k => knownDocs[k] = new Set());
    if (!user) {
      Cloud.user = null; Cloud.role = null; Cloud.loadError = '';
      wipeLocal();                                                                     // signed out (here, by the idle timer or by the server): nothing stays behind
      if (localStorage.getItem(KEY_CACHE) === 'wipe') return wipeCache();               // the offline copy (whole rosters, for a teacher) is emptied too, then the app starts clean
      // the sign-in screen offers "I'm new" only if the school allows it: ask the cloud (a moment at most)
      try { await Promise.race([db.collection('settings').doc('global').get().then(applySettings), new Promise(r => setTimeout(r, 2500))]); } catch (e) {}
      Cloud.ready = true; setStatus('signed-out'); readyResolve(); emit('auth'); return; }
    try {
      if (idleExpired()) { await auth.signOut(); return; }
      Cloud.user = user; Cloud.role = await resolveRole(user);
      try { localStorage.setItem(KEY_KIND, Cloud.role === 'student' ? 'student' : 'staff'); if (Cloud.role === 'student') localStorage.removeItem(KEY_CACHE); else localStorage.setItem(KEY_CACHE, 'wipe'); } catch (e) {}
      await loadOnce(user, Cloud.role);
      if (Cloud.role === 'master' && dataVersion >= 0 && dataVersion < 43) {             // first Headmaster sign-in on v43: bring the stored data up to date, once
        try { await Cloud.runMigration(); await loadOnce(user, Cloud.role); } catch (e) { console.warn('data upgrade failed', e); Cloud.loadError = 'The update to version 43 could not finish: ' + describe(e) + ' Check that the new firestore.rules are published, then use Settings → Security → Run the data upgrade again.'; } }
      startListening();
      if (Cloud.role !== 'student' && dataVersion >= 43) reconcileAccess().catch(e => console.warn('access lists', e));
      touch();
      Cloud.ready = true; if (Cloud.loadError) setStatus('error', Cloud.loadError); else setStatus(Cloud.online ? 'synced' : 'offline'); readyResolve(); emit('auth');
    } catch (e) { console.warn('cloud sign-in failed', e); Cloud.ready = true; setStatus('error', e.message); readyResolve(); emit('auth'); }
  });

  /* ---------- idle sign-out (grace period) ---------- */
  function touch() { try { localStorage.setItem(KEY_ACTIVE, String(Date.now())); } catch (e) {} }
  function idleExpired() {
    const last = +localStorage.getItem(KEY_ACTIVE) || 0; if (!last) return false;
    const idle = Date.now() - last, keep = localStorage.getItem(KEY_KEEP) === '1', mins = +CFG.idleMinutes || 0;
    // A staff session can open every student record, so "Keep me signed in" still ends after a long idle spell.
    if (localStorage.getItem(KEY_KIND) === 'staff' && keep) { const cap = CFG.staffIdleMinutes === undefined ? 720 : +CFG.staffIdleMinutes; return !!cap && idle > cap * 60000; }
    if (keep) return false;
    return !!mins && idle > mins * 60000;
  }
  let touchT = 0; ['click', 'keydown', 'touchstart', 'scroll'].forEach(ev => window.addEventListener(ev, () => { const t = Date.now(); if (t - touchT > 30000) { touchT = t; touch(); } }, { passive: true }));
  setInterval(() => { if (Cloud.user && idleExpired()) Cloud.signOut(); }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && Cloud.user && idleExpired()) Cloud.signOut(); });

  /* ---------- public API ---------- */
  const friendly = e => ({ 'auth/user-not-found': 'The number or password is not right.', 'auth/wrong-password': 'The number or password is not right. Students: your birthday as DDMMYYYY, e.g. 12011986.', 'auth/invalid-credential': 'The number or password is not right.', 'auth/invalid-login-credentials': 'The number or password is not right.', 'auth/too-many-requests': 'Too many tries — wait a minute and try again.', 'auth/network-request-failed': 'No internet connection.', 'auth/email-already-in-use': 'An account with that number already exists.', 'auth/weak-password': 'That password is too short.', 'auth/operation-not-allowed': 'Creating accounts from this screen is turned off.', 'auth/admin-restricted-operation': 'Creating accounts from this screen is turned off.', 'auth/user-disabled': 'This account has been turned off. Ask your teacher.' }[e.code] || e.message);
  const dobPassword = dob => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob); return m ? m[3] + m[2] + m[1] : String(dob).replace(/\D/g, ''); };   // 2008-01-12 → 12012008

  Cloud.signInStudent = async (number, password, keep) => {
    try { localStorage.setItem(KEY_KEEP, keep ? '1' : '0'); } catch (e) {}
    try { await auth.signInWithEmailAndPassword(studentEmail(number), String(password).replace(/\D/g, '')); } catch (e) { throw new Error(friendly(e)); }
    await waitForRole();
  };
  Cloud.signInStaff = async (login, password, keep) => {
    try { localStorage.setItem(KEY_KEEP, keep ? '1' : '0'); } catch (e) {}
    try { await auth.signInWithEmailAndPassword(await emailForLogin(login), password); } catch (e) { throw new Error(friendly(e)); }
    await waitForRole();
    if (Cloud.role === 'student') { await auth.signOut(); throw new Error('That is a student account — use the student sign-in.'); }
  };
  function waitForRole() { return new Promise(res => { const t = setInterval(() => { if (Cloud.user && Cloud.role) { clearInterval(t); res(); } }, 50); }); }
  /** Sign out and leave nothing on the device: local copies, session state and the offline database are all emptied.
      One exception: a student whose last changes have not reached the cloud keeps the offline queue (their own work only),
      so it is sent the next time they sign in. */
  Cloud.signOut = async () => {
    let sent = true; try { await Cloud.flushNow(); } catch (e) { sent = false; }
    const wasStaff = Cloud.role && Cloud.role !== 'student', had = !!(auth.currentUser || Cloud.user);
    Students_signOutLocal(); Cloud.user = null; Cloud.role = null; stopListening();
    const clearAll = had && (wasStaff || (sent && Cloud.online));
    try { if (clearAll) localStorage.setItem(KEY_CACHE, 'wipe'); else localStorage.removeItem(KEY_CACHE); } catch (e) {}   // 'wipe' tells the signed-out handler to empty the offline database as well
    try { await auth.signOut(); } catch (e) {}
  };
  function Students_signOutLocal() { try { sessionStorage.removeItem('learnhub.entered'); } catch (e) {} if (window.Students) window.Students.setCurrent(null); }

  /* ----- access lists: who has which student ----- */
  const card = s => ({ name: String(s.name || '').slice(0, 40), number: String(s.number || '').slice(0, 40), avatar: String(s.avatar || '').length <= 16 && !/[<>&"'`]/.test(s.avatar || '') ? (s.avatar || '🙂') : '🙂' });
  const sameSet = (a, b) => J([...(a || [])].sort()) === J([...(b || [])].sort());
  let myRoster = null;   // teacher: the students on my rosters at the last look
  const claimed = new Set();   // …and the ones this session has already put me on the list of
  /** Keep the access lists in step with the section rosters.
      A teacher's app: put myself on the list of every student on one of my rosters; take myself off when a student leaves the last of them.
      The Headmaster's app: for a student who is in at least one section, the list is exactly the teachers of those sections. */
  async function reconcileAccess(sections, gone) {
    const uid = Cloud.user && Cloud.user.uid; if (!uid || Cloud.role === 'student' || !Cloud.online) return;
    const FV = fb.firestore.FieldValue, secs = sections || (lsGet('learnhub.sections') || {}).list || [];
    if (Cloud.role === 'teacher') {
      const mineNow = new Set(); secs.forEach(sec => { if (sec.teacherId === uid) (sec.students || []).forEach(id => mineNow.add(id)); });
      for (const id of mineNow) {
        if (seenStudents[id] || claimed.has(id)) continue;
        try { await db.collection('students').doc(id).update({ teachers: FV.arrayUnion(uid) }); claimed.add(id); log('take on student', id, {}); }
        catch (e) { if (e && e.code !== 'not-found') console.warn('could not take on student', id, e); continue; }
        try { // now readable: make sure they can see the course of the section they were added to
          const d = await db.collection('students').doc(id).get(); const st = d.exists ? d.data() : null; const patch = {};
          secs.forEach(sec => { if (sec.teacherId !== uid || !(sec.students || []).includes(id) || !sec.courseId || !st) return;
            if (Array.isArray(st.courses) && !st.courses.includes(sec.courseId)) patch.courses = FV.arrayUnion(sec.courseId);
            if (Array.isArray(st.archived) && st.archived.includes(sec.courseId)) patch.archived = FV.arrayRemove(sec.courseId); });
          if (Object.keys(patch).length) await db.collection('students').doc(id).update(patch);
        } catch (e) { console.warn('could not enrol', id, e); }
      }
      if (myRoster) for (const id of myRoster) if (!mineNow.has(id) && seenStudents[id]) { try { await db.collection('students').doc(id).update({ teachers: FV.arrayRemove(uid) }); claimed.delete(id); log('let go of student', id, {}); } catch (e) { console.warn('could not let go of student', id, e); } }
      myRoster = mineNow; return;
    }
    const want = {}; secs.forEach(sec => (sec.students || []).forEach(id => { want[id] = want[id] || new Set(); if (sec.teacherId) want[id].add(sec.teacherId); }));
    const staffIds = new Set(Object.keys(seenStaff)); (gone || []).forEach(g => staffIds.delete(g));
    for (const id of Object.keys(seenStudents)) {
      const cur = Array.isArray(seenStudents[id].teachers) ? seenStudents[id].teachers : [];
      const target = (want[id] ? [...want[id]] : cur).filter(t => staffIds.has(t)).sort();   // in no section: whoever added them keeps them
      if (sameSet(cur, target) && Array.isArray(seenStudents[id].teachers)) continue;
      try { await db.collection('students').doc(id).update({ teachers: target }); seenStudents[id].teachers = target; } catch (e) { console.warn('access list', id, e); }
    }
  }
  Cloud.reconcileAccess = () => reconcileAccess();

  /* ----- accounts (made through a second, throw-away connection so the current session is not disturbed) ----- */
  async function createAuthUser(email, password) {
    const sec = fb.initializeApp(CFG.firebase, 'secondary-' + Date.now());
    try { const cred = await sec.auth().createUserWithEmailAndPassword(email, password); const uid = cred.user.uid; await sec.auth().signOut(); return uid; }
    catch (e) { const err = new Error(friendly(e)); err.code = e.code; throw err; }
    finally { setTimeout(() => sec.delete().catch(() => {}), 500); }
  }
  /** Change a user's password when the old one is known (used to fix a wrong birthday). */
  async function changeAuthPassword(email, oldPw, newPw) {
    const sec = fb.initializeApp(CFG.firebase, 'secondary-' + Date.now());
    try { const cred = await sec.auth().signInWithEmailAndPassword(email, oldPw); await cred.user.updatePassword(newPw); await sec.auth().signOut(); }
    catch (e) { throw new Error(friendly(e)); }
    finally { setTimeout(() => sec.delete().catch(() => {}), 500); }
  }
  /** Undo a sign-in that was created for a record the cloud then refused (keeps the number / teacher ID free). */
  async function dropAuthUser(email, password) {
    const sec = fb.initializeApp(CFG.firebase, 'secondary-' + Date.now());
    try { const cred = await sec.auth().signInWithEmailAndPassword(email, password); await cred.user.delete(); } catch (e) {}
    finally { setTimeout(() => sec.delete().catch(() => {}), 500); }
  }
  const rulesHint = e => /permission|insufficient/i.test((e && (e.code || '')) + ' ' + (e && e.message)) ? 'The cloud refused the change. Check that the v43 firestore.rules are published (Firebase → Firestore → Rules), then try again.' : describe(e);
  /** A teacher adds a student — or, signed out, a student signs themselves up when the school allows it. Returns the profile. */
  Cloud.createStudent = async ({ name, number, dob, level, courses }) => {
    number = String(number || '').trim(); if (!/^[A-Za-z0-9._-]{3,}$/.test(number)) throw new Error('Enter the student number (letters and digits only).');
    name = String(name || '').replace(/[<>]/g, '').trim().slice(0, 30); if (!name) throw new Error('Enter the first name.');
    const pw = dobPassword(dob); if (!/^\d{8}$/.test(pw)) throw new Error('Enter the birthday.');
    const S = window.Students, email = studentEmail(number);
    if (!Cloud.user) {
      // Self sign-up: the new account writes its own plain profile (level 2, no courses, nobody's student yet); the rules allow nothing more.
      const sec = fb.initializeApp(CFG.firebase, 'secondary-' + Date.now());
      try {
        let cred; try { cred = await sec.auth().createUserWithEmailAndPassword(email, pw); } catch (e) { throw new Error(friendly(e)); }
        const uid = cred.user.uid;
        const profile = S.add(name, { id: uid, number, dob, level: 2, courses: [] });
        const full = clean(Object.assign({}, profile, { level: 2, courses: [], teachers: [], updatedAt: now(), updatedBy: name, rev: 1 }));
        try { await sec.firestore().collection('students').doc(uid).set(full); await sec.firestore().collection('directory').doc(uid).set(Object.assign(card(full), { updatedAt: now() })).catch(() => {}); }
        catch (e) { try { await cred.user.delete(); } catch (x) {} S.data.list = S.data.list.filter(x => x.id !== uid); S.save();
          throw new Error(/permission|insufficient/i.test((e.code || '') + ' ' + e.message) ? 'Your school has turned off self sign-up. Ask your teacher to add you.' : describe(e)); }
        return profile;
      } finally { try { await sec.auth().signOut(); } catch (x) {} setTimeout(() => sec.delete().catch(() => {}), 500); }
    }
    if (Cloud.role === 'student') throw new Error('Only a teacher can add students.');
    const uid = await createAuthUser(email, pw);
    const profile = S.add(name, { id: uid, number, dob, level: level || 2, courses: courses === undefined ? null : courses });
    const full = clean(Object.assign({}, profile, { teachers: Cloud.role === 'master' ? [] : [Cloud.user.uid], updatedAt: now(), updatedBy: whoAmI(), rev: 1 }));
    try { await db.collection('students').doc(uid).set(full); }
    catch (e) { S.data.list = S.data.list.filter(x => x.id !== uid); S.save(); await dropAuthUser(email, pw); throw new Error(rulesHint(e)); }
    seenStudents[uid] = full; Object.assign(profile, { teachers: full.teachers, rev: 1, updatedAt: full.updatedAt, updatedBy: full.updatedBy });
    db.collection('directory').doc(uid).set(Object.assign(card(full), { updatedAt: now() })).catch(e => console.warn('directory', e));
    log('add student', uid, { number });
    return profile;
  };
  /** Fix a student's birthday (and therefore their password). Needs the birthday on record to be the current password. */
  Cloud.fixStudentBirthday = async (student, newDob) => {
    const oldPw = dobPassword(student.dob), newPw = dobPassword(newDob);
    if (!/^\d{8}$/.test(newPw)) throw new Error('Enter the new birthday.');
    await changeAuthPassword(studentEmail(student.number), oldPw, newPw);
    window.Students.update(student.id, { dob: newDob });
    log('fix student birthday', student.id, {});
  };
  /** Remove a student: profile, work, grades, Focus Plan and directory card. (The unused sign-in stays in Firebase
      Authentication and opens nothing; the Headmaster can delete it in the Firebase console.) */
  Cloud.removeStudent = async id => {
    const was = seenStudents[id] || {};
    const courses = ((window.LearnHub && window.LearnHub.courses) || []).map(c => c.id);
    const ids = new Set(courses.map(c => id + '__' + c)); ['progress', 'grades'].forEach(col => knownDocs[col].forEach(k => { if (k.startsWith(id + '__')) ids.add(k); }));
    try {
      for (const k of ids) { await db.collection('progress').doc(k).delete().catch(() => {}); await db.collection('grades').doc(k).delete().catch(() => {}); }
      await db.collection('focus').doc(id).delete().catch(() => {});
      await db.collection('directory').doc(id).delete().catch(() => {});
      await db.collection('students').doc(id).delete();
    } catch (e) { throw new Error(rulesHint(e)); }
    delete seenStudents[id]; log('remove student', id, { name: was.name || '', number: was.number || '' });
  };
  Cloud.MIN_STAFF_PASSWORD = 10;
  const pwCheck = p => { if (String(p || '').length < Cloud.MIN_STAFF_PASSWORD) throw new Error('The password must be at least ' + Cloud.MIN_STAFF_PASSWORD + ' characters.'); };
  /** Create a staff sign-in for a teacher ID, stepping past addresses used by removed or reset accounts. */
  async function createStaffAuth(login, password, fromGen) {
    for (let gen = fromGen || 1; gen <= 30; gen++) {
      try { const uid = await createAuthUser(genEmail(login, gen), password); return { uid, gen, authEmail: genEmail(login, gen) }; }
      catch (e) { if (e.code !== 'auth/email-already-in-use') throw e; }
    }
    throw new Error('That teacher ID has been used too many times — choose a different ID.');
  }
  const loginTaken = (login, exceptId) => { const St = window.Staff, n = normLogin(login); if (!St) return null; if (St.master && St.master.uid !== exceptId && normLogin(St.master.login || '') === n) return St.master; return St.teachers.find(t => t.id !== exceptId && normLogin(t.login || '') === n) || null; };
  /** The Headmaster adds a teacher: name, teacher ID, password, optional e-mail and picture. */
  Cloud.createStaff = async ({ name, login, password, avatar, email }) => {
    if (Cloud.role !== 'master') throw new Error('Only the Headmaster can add teachers.');
    name = String(name || '').replace(/[<>]/g, '').trim().slice(0, 40); if (!name) throw new Error('Enter the teacher\'s name.');
    login = String(login || '').trim(); if (!/^[A-Za-z0-9._-]{3,}$/.test(login)) throw new Error('Enter a teacher ID of at least 3 characters (letters, digits, dot, dash or underscore).');
    pwCheck(password);
    const clash = loginTaken(login); if (clash) throw new Error('The teacher ID "' + login + '" already belongs to ' + clash.name + '.');
    const a = await createStaffAuth(login, password, 1);
    const rec = clean({ id: a.uid, name, role: 'teacher', login, avatar: avatar || '🧑‍🏫', colour: '#1f5f8b', archived: [], createdAt: now() });
    const priv = { email: String(email || '').trim().slice(0, 120), authEmail: a.authEmail, gen: a.gen, updatedAt: now() };
    try {
      const b = db.batch(); b.set(db.collection('staff').doc(a.uid), rec); b.set(db.collection('staffPrivate').doc(a.uid), priv);
      const lref = db.collection('logins').doc(normLogin(login)); if (a.gen > 1) b.set(lref, { email: a.authEmail, uid: a.uid, at: now() }); else b.delete(lref);
      await b.commit();
    } catch (e) { await dropAuthUser(a.authEmail, password); throw new Error(rulesHint(e)); }
    seenStaff[a.uid] = rec; emails[a.uid] = priv.email; log('add teacher', a.uid, { login });
    return Object.assign({ email: priv.email }, rec);
  };
  /** First-time set-up only (the hidden #/setup page): the very first account becomes the Headmaster.
      The security rules refuse this once a Headmaster exists, and it needs "Enable create (sign-up)" switched on
      in Firebase Authentication for the minute it takes. */
  Cloud.createMaster = async ({ name, login, password, email }) => {
    name = String(name || '').trim().slice(0, 40); if (!name) throw new Error('Enter your name.');
    login = String(login || '').trim(); if (!/^[A-Za-z0-9._-]{3,}$/.test(login)) throw new Error('Enter a teacher ID (letters and digits only).');
    pwCheck(password);
    const exists = 'A Headmaster account already exists. There is only one — sign in with it.';
    const sec = fb.initializeApp(CFG.firebase, 'secondary-' + Date.now());
    try {
      let cred;
      try { cred = await sec.auth().createUserWithEmailAndPassword(staffEmail(login), password); } catch (e) { throw new Error(friendly(e)); }
      const uid = cred.user.uid, sdb = sec.firestore();
      const rec = clean({ id: uid, name, role: 'master', login, avatar: '🦉', colour: '#1f5f8b', archived: [], createdAt: now() });
      try { await sdb.collection('meta').doc('master').set({ uid, name, at: now() }); await sdb.collection('staff').doc(uid).set(rec); if (email) await sdb.collection('staffPrivate').doc(uid).set({ email: String(email).slice(0, 120), updatedAt: now() }); }
      catch (e) { try { await cred.user.delete(); } catch (x) {} throw new Error(/permission|insufficient/i.test(e.message) ? exists : friendly(e)); }
      return rec;
    } finally { try { await sec.auth().signOut(); } catch (x) {} setTimeout(() => sec.delete().catch(() => {}), 500); }
  };
  /** The Headmaster gives a teacher a new password. A browser cannot change another person's password, so the teacher
      gets a fresh sign-in behind the same teacher ID: their record, notes, sections and students move to it. The old
      sign-in is left with no record behind it, so it opens nothing. */
  Cloud.resetStaffPassword = async (teacherId, newPassword) => {
    if (Cloud.role !== 'master') throw new Error('Only the Headmaster can reset a teacher\'s password.');
    pwCheck(newPassword);
    const old = await db.collection('staff').doc(teacherId).get().catch(() => null);
    if (!old || !old.exists) throw new Error('That teacher could not be found in the cloud.');
    const t = old.data(); if (!t.login) throw new Error('This teacher has no teacher ID on record.');
    const [privSnap, notesSnap] = await Promise.all([db.collection('staffPrivate').doc(teacherId).get().catch(() => null), db.collection('staffNotes').doc(teacherId).get().catch(() => null)]);
    const priv = privSnap && privSnap.exists ? privSnap.data() : {};
    const a = await createStaffAuth(t.login, newPassword, (+priv.gen || +t.gen || 1) + 1);
    const rec = clean(Object.assign({}, t, { id: a.uid, role: 'teacher', passwordResetAt: now() })); ['notes', 'email', 'authEmail', 'gen', 'pin'].forEach(k => delete rec[k]);
    try {
      const secs = await db.collection('sections').where('teacherId', '==', teacherId).get();
      const b = db.batch();
      b.set(db.collection('staff').doc(a.uid), rec);
      b.set(db.collection('staffPrivate').doc(a.uid), { email: priv.email || '', authEmail: a.authEmail, gen: a.gen, updatedAt: now() });
      if (notesSnap && notesSnap.exists) b.set(db.collection('staffNotes').doc(a.uid), notesSnap.data());
      b.set(db.collection('logins').doc(normLogin(t.login)), { email: a.authEmail, uid: a.uid, at: now() });
      secs.docs.forEach(d => b.update(d.ref, { teacherId: a.uid, updatedAt: now() }));
      b.delete(db.collection('staff').doc(teacherId)); b.delete(db.collection('staffPrivate').doc(teacherId)); b.delete(db.collection('staffNotes').doc(teacherId));
      await b.commit();
    } catch (e) { await dropAuthUser(a.authEmail, newPassword); throw new Error(rulesHint(e)); }
    // the teacher's students follow them to the new sign-in
    for (const id of Object.keys(seenStudents)) { const cur = seenStudents[id].teachers || []; if (!cur.includes(teacherId)) continue;
      const next = [...new Set(cur.map(x => x === teacherId ? a.uid : x))].sort();
      try { await db.collection('students').doc(id).update({ teachers: next }); seenStudents[id].teachers = next; } catch (e) { console.warn('access list', id, e); } }
    log('reset teacher password', a.uid, { login: t.login });
    return Object.assign({ email: priv.email || '' }, rec);
  };
  /** The Headmaster removes a teacher: the record is deleted (so the sign-in no longer opens anything),
      their sections pass to the Headmaster and they come off every student's access list. */
  Cloud.removeStaff = async (teacherId) => {
    if (Cloud.role !== 'master') throw new Error('Only the Headmaster can remove a teacher.');
    if (Cloud.user && teacherId === Cloud.user.uid) throw new Error('The Headmaster account cannot be removed.');
    try {
      const old = await db.collection('staff').doc(teacherId).get().catch(() => null);
      const login = old && old.exists ? (old.data() || {}).login : '';
      const secs = await db.collection('sections').where('teacherId', '==', teacherId).get();
      const b = db.batch();
      secs.docs.forEach(d => b.update(d.ref, { teacherId: null, updatedAt: now() }));
      b.delete(db.collection('staff').doc(teacherId)); b.delete(db.collection('staffPrivate').doc(teacherId)); b.delete(db.collection('staffNotes').doc(teacherId));
      await b.commit();
      if (login) await db.collection('logins').doc(normLogin(login)).delete().catch(() => {});
      log('remove teacher', teacherId, { name: old && old.exists ? (old.data().name || '') : '' });
    } catch (e) { throw new Error(rulesHint(e)); }
    for (const id of Object.keys(seenStudents)) { const cur = seenStudents[id].teachers || []; if (!cur.includes(teacherId)) continue;
      const next = cur.filter(x => x !== teacherId); try { await db.collection('students').doc(id).update({ teachers: next }); seenStudents[id].teachers = next; } catch (e) { console.warn('access list', id, e); } }
  };

  /* ----- the one-time data upgrade (v42 → v43), run by the Headmaster's app; safe to run again ----- */
  Cloud.runMigration = async () => {
    if (Cloud.role !== 'master') throw new Error('Only the Headmaster can run the data upgrade.');
    const c = n => db.collection(n), FV = fb.firestore.FieldValue, same = (a, b) => Array.isArray(a) && Array.isArray(b) && J(a) === J(b);
    const report = { students: 0, accessFixed: 0, progress: 0, gradesMoved: 0, staff: 0, notesMoved: 0 };
    const cfgSnap = await c('meta').doc('config').get().catch(() => null); const gradesDone = !!(cfgSnap && cfgSnap.exists && cfgSnap.data().gradesMigratedAt);
    const [students, sections, staff] = await Promise.all([c('students').get(), c('sections').get(), c('staff').get()]);
    const staffIds = new Set(staff.docs.map(d => d.id));
    // 1. access lists (from the rosters; a student in no section keeps whoever is already listed) and directory cards
    const want = {}; sections.docs.forEach(d => { const sec = d.data(); (sec.students || []).forEach(id => { want[id] = want[id] || new Set(); if (sec.teacherId && staffIds.has(sec.teacherId)) want[id].add(sec.teacherId); }); });
    const known = new Set(students.docs.map(d => d.id));
    for (const d of students.docs) { const st = d.data(); report.students++;
      const t = (want[d.id] ? [...want[d.id]] : (Array.isArray(st.teachers) ? st.teachers.filter(x => staffIds.has(x)) : [])).sort();
      if (!same(st.teachers, t)) { await d.ref.update({ teachers: t }); report.accessFixed++; }
      await c('directory').doc(d.id).set(Object.assign(card(st), { updatedAt: now() })); }
    // 2. teacher grades move out of the record a student can write
    const progress = await c('progress').get();
    for (const d of progress.docs) { const p = d.data(), k = ownerOf(d.id); report.progress++; if (!k || !known.has(k.student)) continue;
      const patch = {}, grades = {}, data = p.data || {}; let found = 0;
      if (p.student !== k.student) patch.student = k.student; if (p.course !== k.course) patch.course = k.course;
      Object.keys(data).forEach(u => { const work = data[u] && data[u].work; if (!isMap(work)) return; Object.keys(work).forEach(l => { if (!isMap(work[l])) return; Object.keys(work[l]).forEach(n => { const w = work[l][n];
        if (isMap(w) && w.grade !== undefined) { if (isMap(w.grade)) ((grades[u] = grades[u] || {})[l] = grades[u][l] || {})[n] = w.grade; found++; delete w.grade; } }); }); });
      if (found) patch.data = clean(data);
      if (found && !gradesDone && Object.keys(grades).length) { const g = c('grades').doc(d.id); const cur = await g.get(); if (!cur.exists) { await g.set({ student: k.student, course: k.course, data: clean(grades), updatedAt: now(), updatedBy: 'upgrade to v43' }); report.gradesMoved += found; } }
      if (Object.keys(patch).length) await d.ref.update(patch); }
    const focus = await c('focus').get();
    for (const d of focus.docs) if (known.has(d.id) && d.data().student !== d.id) await d.ref.update({ student: d.id });
    // 3. private notes and e-mail addresses leave the staff record every signed-in user can read
    for (const d of staff.docs) { const t = d.data(), patch = {}, priv = {}; report.staff++;
      if (t.notes !== undefined) { if (t.notes) { const nref = c('staffNotes').doc(d.id), cur = await nref.get(); const newer = !cur.exists || !cur.data().notes || String(t.notes.updatedAt || '') > String((cur.data().notes || {}).updatedAt || ''); if (newer) { await nref.set({ notes: t.notes, updatedAt: now() }); report.notesMoved++; } } patch.notes = FV.delete(); }
      ['email', 'authEmail', 'gen'].forEach(key => { if (t[key] !== undefined) { if (t[key] !== '' && t[key] !== null) priv[key] = t[key]; patch[key] = FV.delete(); } });
      if (t.pin !== undefined) patch.pin = FV.delete();
      if (Object.keys(priv).length) await c('staffPrivate').doc(d.id).set(Object.assign(priv, { updatedAt: now() }), { merge: true });
      if (Object.keys(patch).length) await d.ref.update(patch); }
    // 4. self sign-up is on only if the school had saved it as on
    const g = await c('settings').doc('global').get(); if (!g.exists || g.data().allowSelfSignup !== true) await c('settings').doc('global').set({ allowSelfSignup: false }, { merge: true });
    const stamp = { version: 43, migratedAt: now() }; if (!gradesDone) stamp.gradesMigratedAt = now();
    await c('meta').doc('config').set(stamp, { merge: true }); dataVersion = 43;
    log('data upgrade to v43', '', report);
    return report;
  };
  Cloud.auditLog = async n => { const q = await db.collection('audit').orderBy('at', 'desc').limit(n || 50).get(); return q.docs.map(d => d.data()); };
  Cloud.changeMyPassword = async (oldPw, newPw) => { const u = auth.currentUser; if (!u) throw new Error('Not signed in.'); const min = Cloud.role === 'student' ? 8 : Cloud.MIN_STAFF_PASSWORD; if (String(newPw || '').length < min) throw new Error('The new password must be at least ' + min + ' characters.'); try { const cred = fb.auth.EmailAuthProvider.credential(u.email, oldPw); await u.reauthenticateWithCredential(cred); await u.updatePassword(newPw); } catch (e) { throw new Error(friendly(e)); } };
  Cloud.hasMaster = async () => (await db.collection('meta').doc('master').get()).exists;
  Cloud.touch = touch;
  Cloud.keepSignedIn = () => localStorage.getItem(KEY_KEEP) === '1';
  Cloud.dobPassword = dobPassword;
  Cloud.db = db; Cloud.auth = auth;
})();
