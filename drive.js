/* =========================================================
   drive.js — exports of student work and achievement
   - Export.build()      → { json, csv } for the staff member's students
   - Export.download()   → saves the two files locally
   - Export.importJson() → merges a previously exported JSON into this device
   - Drive.push()        → uploads both files to Google Drive (school account)

   Google Drive needs a one-time setup by the master account:
     1. In Google Cloud Console create an OAuth 2.0 Client ID (Web application).
     2. Add the app's address (e.g. https://<user>.github.io) as an Authorized
        JavaScript origin.
     3. Paste the Client ID into Settings → Teacher Lock → Google Drive.
   The app then asks the signed-in Google user (the school admin account) for
   permission to create files in Drive (scope drive.file: only files this app
   creates) and writes into a folder called "The Academy exports".
   ========================================================= */
(function () {
  const SCOPE = 'https://www.googleapis.com/auth/drive.file';
  const FOLDER = 'The Academy exports';

  /* ---------- building the export ---------- */
  function studentsInScope() {
    const staff = Staff.current;
    if (!staff) return [];
    if (staff.role === 'master') return Students.list;
    const ids = new Set(); Sections.visible(staff.id, true).forEach(sec => (sec.students || []).forEach(id => ids.add(id)));
    return Students.list.filter(s => ids.has(s.id));
  }
  function build() {
    const staff = Staff.current || { name: 'Teacher', role: 'teacher' };
    const students = studentsInScope();
    const courses = window.LearnHub.courses || [];
    const rows = [['Student', 'Course', 'Unit', 'Lesson', 'Track / level', 'Slides read', 'Quiz best %', 'Quiz attempts', 'Assignments handed in', 'Unit test best %', 'Awards earned']];
    const data = { exportedAt: new Date().toISOString(), by: staff.name, role: staff.role, app: 'The Academy · Learn Hub',
      students: [], sections: Sections.list,
      // names only: no PIN, password or e-mail ever leaves in an export (v43)
      staff: { teachers: Staff.teachers.map(t => ({ id: t.id, name: t.name })) } };
    students.forEach(s => {
      const prog = Progress.graded(s.id);   // the student's work with the teacher's grades laid over it
      data.students.push({ profile: Object.assign({}, s, { prefs: undefined, dob: undefined, teachers: undefined, pwCustom: undefined }), progress: prog, focus: (() => { try { return JSON.parse(localStorage.getItem('learnhub.focus.' + s.id) || 'null'); } catch (e) { return null; } })() });
      courses.forEach(c => {
        if (!Students.enrolled(c.id, s)) return;
        const t = Students.trackFor(c.id, s);
        const lvl = t ? 'Modified · ' + ({ k2: 'K–2', g35: 'Gr 3–5', g68: 'Gr 6–8' }[t.band] || t.band) : 'Level ' + Students.levelFor(c.id, s);
        c.units.forEach(un => {
          const u = (prog[c.id] || {})[un.id]; if (!u) return;
          un.lessons.forEach((les, li) => {
            const q = (u.quiz || {})[li], w = (u.work || {})[li] || {};
            const handed = Object.values(w).filter(x => x && x.done).length;
            const ll = ((s.lessonLevels || {})[c.id] || {})[li];
            rows.push([s.name, c.title, un.title, (li + 1) + '. ' + les.title, ll ? 'Level ' + ll.level + ' (quiz ' + ll.pct + '%)' : lvl, ((u.slides || {})[li] || []).length, q ? q.best : '', q ? q.attempts : '', handed, u.testBest || '', Object.keys(u.earned || {}).length]);
          });
        });
      });
      // level history rows
      Object.keys(s.levelLog || {}).forEach(cid => (s.levelLog[cid] || []).forEach(e => rows.push([s.name, (courses.find(c => c.id === cid) || { title: cid }).title, 'LEVEL CHANGE', e.lesson !== undefined ? 'after lesson ' + (e.lesson + 1) : '', 'Level ' + e.from + ' → ' + e.to + ' (' + e.by + ')', '', e.pct !== undefined ? e.pct : '', '', '', '', new Date(e.at).toLocaleString()])));
    });
    // a cell that starts with = + - @ (or a tab) would be run as a formula by Excel / Sheets: a leading ' keeps it as text
    const cell = v => { v = String(v === undefined || v === null ? '' : v); if (/^[=+\-@\t\r]/.test(v)) v = "'" + v; return '"' + v.replace(/"/g, '""') + '"'; };
    const csv = rows.map(r => r.map(cell).join(',')).join('\r\n');
    return { json: JSON.stringify(data, null, 1), csv, students: students.length, stamp: new Date().toISOString().slice(0, 16).replace(/[:T]/g, '-') };
  }
  function download() {
    const e = build();
    const save = (name, text, type) => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); };
    save('academy-export-' + e.stamp + '.json', e.json, 'application/json');
    save('academy-summary-' + e.stamp + '.csv', e.csv, 'text/csv');
    return e;
  }
  /** Merge an exported JSON back in (students by id; progress replaced for those students). */
  function importJson(text) {
    // With cloud accounts, students and teachers exist only once the server has created them; a file cannot add them.
    if (window.Cloud && Cloud.enabled) throw new Error('Importing a file is only for device-only mode. With cloud accounts every device already has the same data.');
    const data = JSON.parse(text);
    let n = 0;
    (data.students || []).forEach(rec => {
      const p = rec.profile; if (!p || !p.id) return;
      const existing = Students.byId(p.id);
      if (existing) Object.assign(existing, p, { prefs: existing.prefs }); else Students.list.push(Object.assign({ prefs: {} }, p));
      try { localStorage.setItem('learnhub.progress.' + p.id, JSON.stringify(rec.progress || {})); if (rec.focus) localStorage.setItem('learnhub.focus.' + p.id, JSON.stringify(rec.focus)); } catch (e) {}
      n++;
    });
    Students.save();
    (data.sections || []).forEach(sec => { const ex = Sections.byId(sec.id); if (ex) Object.assign(ex, sec); else Sections.list.push(sec); });
    Sections.save();
    ((data.staff && data.staff.teachers) || []).forEach(t => { if (!t.pin) return; const ex = Staff.teachers.find(x => x.id === t.id); if (ex) Object.assign(ex, { name: t.name, pin: t.pin }); else Staff.teachers.push({ id: t.id, name: t.name, pin: t.pin, createdAt: t.createdAt || new Date().toISOString() }); });
    Staff.save();
    Progress.load(); Focus.load();
    return n;
  }

  /* ---------- Google Drive ---------- */
  function loadGis() {
    return new Promise((res, rej) => {
      if (window.google && google.accounts && google.accounts.oauth2) return res();
      const s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true; s.onload = () => res(); s.onerror = () => rej(new Error('Could not load Google sign-in. Check the internet connection.'));
      document.head.appendChild(s);
    });
  }
  function token(clientId) {
    return new Promise((res, rej) => {
      const client = google.accounts.oauth2.initTokenClient({ client_id: clientId, scope: SCOPE, callback: r => r && r.access_token ? res(r.access_token) : rej(new Error(r && r.error ? r.error : 'Sign-in was cancelled.')) });
      client.requestAccessToken();
    });
  }
  async function api(tok, url, opts) {
    opts = Object.assign({}, opts || {});
    opts.headers = Object.assign({ Authorization: 'Bearer ' + tok }, opts.headers || {});   // keep the token when a call adds its own headers
    const r = await fetch(url, opts);
    if (!r.ok) throw new Error('Google Drive said ' + r.status + ': ' + (await r.text()).slice(0, 200));
    return r.json();
  }
  async function folderId(tok) {
    const q = encodeURIComponent("name='" + FOLDER + "' and mimeType='application/vnd.google-apps.folder' and trashed=false");
    const found = await api(tok, 'https://www.googleapis.com/drive/v3/files?q=' + q + '&fields=files(id,name)');
    if (found.files && found.files.length) return found.files[0].id;
    const made = await api(tok, 'https://www.googleapis.com/drive/v3/files', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: FOLDER, mimeType: 'application/vnd.google-apps.folder' }) });
    return made.id;
  }
  async function upload(tok, folder, name, text, mime) {
    const boundary = 'academy' + Date.now();
    const body = '--' + boundary + '\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n' + JSON.stringify({ name, parents: [folder] }) +
      '\r\n--' + boundary + '\r\nContent-Type: ' + mime + '\r\n\r\n' + text + '\r\n--' + boundary + '--';
    return api(tok, 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', { method: 'POST', headers: { 'Content-Type': 'multipart/related; boundary=' + boundary }, body });
  }
  /** Push the export to Drive. Returns { files: [{name, webViewLink}], students }. */
  async function push(onStatus) {
    const clientId = Settings.get('googleClientId');
    if (!clientId) throw new Error('No Google Client ID yet. The master account adds it in Settings → Teacher Lock → Google Drive.');
    const say = m => { if (onStatus) onStatus(m); };
    say('Loading Google sign-in…'); await loadGis();
    say('Asking for permission…'); const tok = await token(clientId);
    say('Finding the export folder…'); const folder = await folderId(tok);
    const e = build();
    say('Uploading summary (CSV)…'); const f1 = await upload(tok, folder, 'academy-summary-' + e.stamp + '.csv', e.csv, 'text/csv');
    say('Uploading full export (JSON)…'); const f2 = await upload(tok, folder, 'academy-export-' + e.stamp + '.json', e.json, 'application/json');
    const log = Settings.get('driveLog') || []; log.unshift({ at: new Date().toISOString(), by: (Staff.current || {}).name, students: e.students, files: [f1.name, f2.name] });
    Settings.set('driveLog', log.slice(0, 10));
    return { files: [f1, f2], students: e.students };
  }

  /** Pull the newest JSON export from the Drive folder and import it. Returns { file, students }. */
  async function pull(onStatus) {
    const clientId = Settings.get('googleClientId');
    if (!clientId) throw new Error('No Google Client ID yet. The master account adds it in Settings → Teacher Lock → Google Drive.');
    const say = m => { if (onStatus) onStatus(m); };
    say('Loading Google sign-in…'); await loadGis();
    say('Asking for permission…'); const tok = await token(clientId);
    say('Looking for the latest export…'); const folder = await folderId(tok);
    const q = encodeURIComponent("'" + folder + "' in parents and name contains 'academy-export-' and trashed=false");
    const list = await api(tok, 'https://www.googleapis.com/drive/v3/files?q=' + q + '&orderBy=createdTime%20desc&pageSize=1&fields=files(id,name,createdTime)');
    if (!list.files || !list.files.length) throw new Error('No export found in "' + FOLDER + '" yet. Push from the other device first.');
    const f = list.files[0];
    say('Downloading ' + f.name + '…');
    const r = await fetch('https://www.googleapis.com/drive/v3/files/' + f.id + '?alt=media', { headers: { Authorization: 'Bearer ' + tok } });
    if (!r.ok) throw new Error('Could not download the export (' + r.status + ').');
    const n = importJson(await r.text());
    return { file: f.name, students: n };
  }

  window.Export = { build, download, importJson, studentsInScope };
  window.Drive = { push, pull, FOLDER };
})();
