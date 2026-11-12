/* =========================================================
   app.js — router + pages
   Routes:
     #/welcome                   Student sign-in (shown whenever nobody is signed in)
     #/                         Dashboard (student: classes, scores; teacher: sections)
     #/course/:course           units + rooms
     #/lesson/:course/:unit/:i  Lesson hub (slides · quiz · assignments)
     #/study/:course/:unit/:i   Lesson slides
     #/quiz/:course/:unit/:i    Lesson quiz
     #/assign/:course/:unit/:i/:n   Assignment
     #/test/:course/:unit       Unit test
     #/games/:course/:unit      Game Room (choose a game)
     #/game/:course/:unit/:game play a game
     #/case                     Display Case
     #/settings                 Settings (collapsible groups; teacher tools in a teacher session)
   ========================================================= */
(function () {
  const { L, esc, md, speakBtn, slidesFor, questionsFor, termsFor, findCourse, findUnit, normalize, shuffle, byLevel, LEVELS, LEVEL_NAMES, LEVEL_DESC, unitsFor, lessonsFor, focusFor, catsOf, allTermKeys, markSeen, accom, assessmentCount, assessmentOrder, lessonQuestions, assignmentsFor, lessonAt } = window.LH;
  const app = document.getElementById('app');
  const allCourses = () => window.LearnHub.courses || [];
  /** Courses the signed-in student is enrolled in (every course when no list is set). */
  const courses = () => allCourses().filter(c => Students.enrolled(c.id) && !Students.isArchived(c.id));
  const archivedCourses = () => allCourses().filter(c => Students.enrolled(c.id) && Students.isArchived(c.id));

  /* ---------- helpers ---------- */
  function setCourseColor(course) {
    document.documentElement.style.setProperty('--course', course ? course.color || 'var(--primary)' : 'var(--primary)');
    Settings.activeCourse = course ? course.id : null;   // the level in force follows the course being viewed
  }
  function crumbs(parts) {
    return '<div class="crumbs">' + parts.map(p => p.href ? '<a href="' + p.href + '">' + esc(p.label) + '</a>' : esc(p.label)).join(' › ') + '</div>';
  }
  function unitProgress(course, unit) {
    const u = Progress.unit(course.id, unit.id);
    let total = 0, seen = 0;
    lessonsFor(unit).forEach(les => { const s = slidesFor(les); total += s.length; seen += Math.min(s.length, (u.slides[les._idx] || []).length); });
    const games = Games.available(course, unit).length;
    const gamesDone = Object.keys(u.games).filter(k => u.games[k]).length;
    const parts = [total ? seen / total : 0, u.testPassed ? 1 : (u.testBest || 0) / 100, games ? Math.min(1, gamesDone / Math.min(3, games)) : 0];
    return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length * 100);
  }
  function courseProgress(course) {
    const units = unitsFor(course);
    if (!units.length) return 0;
    return Math.round(units.reduce((a, u) => a + unitProgress(course, u), 0) / units.length);
  }
  const GOAL_LABELS = { study: ['📖', 'Read every lesson'], testPass: ['📝', 'Pass the test'], testPerfect: ['💯', 'Get a perfect test score'],
                        games3: ['🎮', 'Finish 3 games'], allGames: ['🎖️', 'Finish every game'], unitMedal: ['🏅', 'Earn the unit medal'] };
  /** Goals checklist for a unit (Focus Plan goals, or the standard set). */
  function goalsHtml(course, unit) {
    const f = focusFor(unit);
    const goals = f && f.goals && f.goals.length ? f.goals : ['study', 'testPass', 'games3'];
    const u = Progress.unit(course.id, unit.id);
    const items = goals.map(g => { const done = !!u.earned[g + ':' + unit.id]; const [icon, label] = GOAL_LABELS[g] || ['⭐', g];
      return '<li class="' + (done ? 'done' : '') + '">' + icon + ' ' + label + (done ? ' <span class="tag ok">Done</span>' : '') + '</li>'; });
    const n = goals.filter(g => u.earned[g + ':' + unit.id]).length;
    return '<div class="goals"><div class="goals-head">' + (f ? '🎯 My goals' : '🎯 Goals') + ' <span class="tag">' + n + ' / ' + goals.length + '</span></div><ul>' + items.join('') + '</ul></div>';
  }
  function planBanner(course) {
    if (!(Focus.active(course.id))) return '';
    return '<div class="plan-banner">🎯 <strong>Focus Plan is on.</strong> This course shows only the units, lessons and words chosen for you.</div>';
  }
  const BAND_MIN = { 1: 50, 2: 60, 3: 70, 4: 80 };
  /** Small line on the course page: the level the student is working at, with "go back" when a move was made. */
  function levelBanner(course) {
    const t = Students.trackFor(course.id);
    if (t) return '<div class="level-banner">📘 Modified program · ' + ({ k2: 'K–2', g35: 'Grades 3–5', g68: 'Grades 6–8' }[t.band] || t.band) + '</div>';
    const l = Students.levelFor(course.id), prev = Students.previousLevel(course.id);
    return '<div class="level-banner">🎚️ Working at <strong>Level ' + l + ' · ' + LEVEL_NAMES[l] + '</strong>' + (prev && prev !== l ? ' <button class="btn ghost sm" id="revertLevel">↩ Go back to Level ' + prev + '</button>' : '') + '</div>';
  }
  /** After a quiz: suggest moving up (≥ 85%) or down (below the level's band). Returns HTML for the result card. */
  function levelPromptHtml(course, lessonIdx, pct) {
    if (Students.trackFor(course.id)) return '';
    const l = Students.levelFor(course.id);
    if (pct >= 85 && l < 4) return '<div class="level-prompt up"><strong>🚀 ' + pct + '% — that\'s mastery at Level ' + l + '.</strong> Want to work at <strong>Level ' + (l + 1) + ' · ' + LEVEL_NAMES[l + 1] + '</strong> for the next lessons? You can always go back.<div class="btn-row" style="margin-top:0.5rem"><button class="btn success sm" data-level-move="' + (l + 1) + '" data-pct="' + pct + '" data-lesson="' + lessonIdx + '">Yes, move up</button><button class="btn ghost sm" data-level-stay>Not now</button></div></div>';
    if (pct < BAND_MIN[l] && l > 1) return '<div class="level-prompt down"><strong>💡 ' + pct + '% is below the Level ' + l + ' target (' + BAND_MIN[l] + '%).</strong> Would you like to work at <strong>Level ' + (l - 1) + ' · ' + LEVEL_NAMES[l - 1] + '</strong> for now and build back up?<div class="btn-row" style="margin-top:0.5rem"><button class="btn sm" data-level-move="' + (l - 1) + '" data-pct="' + pct + '" data-lesson="' + lessonIdx + '">Yes, for now</button><button class="btn ghost sm" data-level-stay>Keep going at Level ' + l + '</button></div></div>';
    return '';
  }
  function bindLevelPrompt(course) {
    app.querySelectorAll('[data-level-move]').forEach(b => b.addEventListener('click', () => {
      const to = +b.dataset.levelMove, from = Students.levelFor(course.id);
      Students.moveLevel(Students.current.id, course.id, to, 'student', to > from ? 'mastery ≥ 85%' : 'below band', { lesson: +b.dataset.lesson, pct: +b.dataset.pct });
      const box = b.closest('.level-prompt'); if (box) box.innerHTML = '<strong>✓ You are now working at Level ' + to + ' · ' + LEVEL_NAMES[to] + '.</strong> <span class="muted small">Your teacher can see this change.</span>';
    }));
    app.querySelectorAll('[data-level-stay]').forEach(b => b.addEventListener('click', () => { const box = b.closest('.level-prompt'); if (box) box.remove(); }));
  }
  function setNav(key) {
    document.querySelectorAll('.topnav a').forEach(a => a.classList.toggle('active', a.dataset.nav === key));
    const d = document.querySelector('[data-nav="dashboard"]'); if (d) d.hidden = Settings.locked || !Staff.master;
    const g = document.querySelector('[data-nav="grades"]'); if (g) g.hidden = !Students.current || Students.current.isStaff;
    const h = document.querySelector('[data-nav="home"]'); if (h) h.textContent = deskName();
    const cs = document.querySelector('[data-nav="case"]'); if (cs) cs.hidden = !Students.current || Students.current.isStaff;
    const sn = document.querySelector('[data-nav="sections"]'); if (sn) sn.hidden = !Students.current;
  }
  /** The "signed in as" chip in the header. */
  function renderWho() {
    const el = document.getElementById('whoChip'); if (!el) return;
    const s = Students.current;
    el.innerHTML = s ? '<button class="who" type="button" id="whoBtn" title="Account"><span class="who-avatar" style="background:' + esc(s.colour) + '">' + s.avatar + '</span><span class="who-name">' + esc(s.name) + (s.isStaff ? ' <span class="muted small">(' + (s.role === 'master' ? 'Headmaster' : 'teacher') + ')</span>' : '') + '</span><span class="who-switch">▾</span></button>' : '';
    const b = el.querySelector('#whoBtn'); if (b) b.addEventListener('click', accountMenu);
  }
  /** Tapping the name/picture: a small sheet with Switch user / Sign out / Settings (no immediate sign-out). */
  function accountMenu() {
    const s = Students.current; if (!s) return;
    const old = document.getElementById('accountMenu'); if (old) { old.remove(); return; }
    const d = document.createElement('div'); d.id = 'accountMenu'; d.className = 'learn-overlay';
    d.innerHTML = '<div class="learn-card account-card"><div class="account-head">' + avatarHtml(s, 'who-avatar big') + '<div><strong>' + esc(s.name) + '</strong><div class="muted small">' + (s.isStaff ? (s.role === 'master' ? 'Headmaster' : 'Teacher') + (Cloud.enabled && Staff.current && Staff.current.login ? ' · ID ' + esc(Staff.current.login) : '') : 'Student' + (s.number ? ' · #' + esc(s.number) : '')) + '</div></div></div>' +
      '<div class="account-actions">' +
      '<button class="btn secondary" id="acctSwitch">🔁 Switch user</button>' +
      '<button class="btn secondary" id="acctSignOut">🚪 Sign out</button>' +
      '<a class="btn ghost" href="#/settings" id="acctSettings">⚙️ Settings</a>' +
      '<button class="btn ghost" id="acctClose">Stay signed in</button></div>' +
      (Cloud.enabled ? '<p class="muted small" style="margin:0.75rem 0 0">' + (Cloud.keepSignedIn() ? 'This device keeps you signed in.' : 'You are signed out automatically after ' + ((window.CLOUD_CONFIG || {}).idleMinutes || 30) + ' minutes without activity.') + '</p>' : '') + '</div>';
    document.body.appendChild(d);
    const close = () => d.remove();
    d.addEventListener('click', e => { if (e.target === d) close(); });
    d.querySelector('#acctClose').addEventListener('click', close);
    d.querySelector('#acctSettings').addEventListener('click', close);
    d.querySelector('#acctSwitch').addEventListener('click', () => { close(); sessionStorage.setItem('learnhub.switch', '1'); location.hash = '#/welcome'; });
    d.querySelector('#acctSignOut').addEventListener('click', () => { if (!confirm('Sign out of The Academy on this device?')) return; close(); sessionStorage.setItem('learnhub.switch', '1'); location.hash = '#/welcome'; });
  }
  const avatarHtml = (s, cls) => '<span class="' + (cls || 'who-avatar') + '" style="background:' + esc(s.colour) + '">' + s.avatar + '</span>';

  /* ---------- pages ---------- */

  /* ----- Welcome page: pick a profile, or sign up as a student / teacher ----- */
  const welcomeState = { mode: '', pinFor: '' };
  function pageWelcome() {
    setCourseColor(null); setNav('');
    if (Students.isStaffSession && sessionStorage.getItem('learnhub.entered')) { Students.setCurrent(null); renderWho(); }   // a teacher who returns here is signed out
    const cont = Students.current && !Students.current.isStaff ? Students.current : null;   // profile left signed in on this device
    const bb = document.getElementById('backBtn'); if (bb) bb.hidden = true;
    const students = Students.list;
    const staffTiles = (Staff.master ? [{ id: 'staff:master', name: Staff.master.name, avatar: Staff.master.avatar || '🧑‍🏫', colour: Staff.master.colour || '#1f5f8b', role: 'Master' }] : [])
      .concat(Staff.teachers.map(t => ({ id: 'staff:' + t.id, name: t.name, avatar: t.avatar || '🧑‍🏫', colour: t.colour || '#1f5f8b', role: 'Teacher' })));
    const canAdd = Settings.get('allowSelfSignup') !== false || !students.length;
    const tile = (p, extra) => '<button class="student-tile" data-welcome="' + p.id + '" style="--tile:' + esc(p.colour) + '">' + avatarHtml(p, 'tile-avatar') + '<span class="tile-name">Welcome, ' + esc(p.name) + '</span>' + (extra ? '<span class="tag">' + extra + '</span>' : '') + '</button>';
    let form = '';
    if (welcomeState.pinFor) {
      const p = staffTiles.find(x => x.id === welcomeState.pinFor);
      form = '<div class="card signin-add"><h3>' + (p ? p.avatar + ' ' + esc(p.name) : 'Teacher') + '</h3><p class="muted small">Enter your 6-digit PIN.</p><div class="btn-row"><input class="text-input pin-input" id="staffPin" type="password" inputmode="numeric" maxlength="6" placeholder="PIN" autocomplete="off"><button class="btn" id="staffGo">Sign in</button><button class="btn ghost" id="welcomeCancel">Cancel</button></div></div>';
    } else if (welcomeState.mode === 'student') {
      const TINTS = [['none', 'None'], ['cream', 'Cream'], ['blue', 'Pale blue'], ['green', 'Pale green'], ['rose', 'Rose'], ['yellow', 'Yellow'], ['grey', 'Grey'], ['peach', 'Peach'], ['lavender', 'Lavender']];
      form = '<div class="card signup"><div class="btn-row between"><h3>New student</h3><button class="btn ghost sm" id="welcomeCancel">✕</button></div>' +
        '<div class="plan-section"><div class="plan-label">Your first name</div><input class="text-input" id="suName" maxlength="30" placeholder="First name" style="max-width:300px" autocomplete="off"></div>' +
        '<div class="plan-section"><div class="plan-label">Your picture</div><div class="avatar-grid">' + Students.AVATARS.map((a, i) => '<button type="button" class="avatar-pick' + (i === 0 ? ' on' : '') + '" data-su-avatar="' + a + '">' + a + '</button>').join('') + '</div></div>' +
        '<div class="plan-section"><div class="plan-label">Reading and viewing</div><p class="muted small" style="margin:0 0 0.5rem">Try them — the page changes as you choose, so you can see what you like.</p><div class="signup-grid">' +
        '<label>Text size <select class="text-input" id="suFont"><option value="1">Normal</option><option value="1.15">Large</option><option value="1.3">Extra large</option></select></label>' +
        '<label>Reading font <select class="text-input" id="suFace"><option value="default">Standard</option><option value="lexend">Lexend (easier reading)</option></select></label>' +
        '<label>Contrast <select class="text-input" id="suContrast"><option value="normal">Normal</option><option value="high">High contrast</option><option value="inverted">Inverted (white on black)</option></select></label>' +
        '<label>Colour overlay <select class="text-input" id="suTint">' + TINTS.map(t => '<option value="' + t[0] + '">' + t[1] + '</option>').join('') + '</select></label>' +
        '<label class="chk"><input type="checkbox" id="suRead" checked> Read-aloud buttons</label><label class="chk"><input type="checkbox" id="suDictate" checked> Dictation and voice recording</label></div></div>' +
        '<div class="plan-section"><div class="plan-label">Level of learning</div><p class="muted small" style="margin:0 0 0.4rem">Where you will start. You can move up or down later as you go.</p><div class="level-cards compact">' + [1, 2, 3, 4].map(l => '<button type="button" class="level-card' + (l === 2 ? ' on' : '') + '" data-su-level="' + l + '"><h3>Level ' + l + ' · ' + LEVEL_NAMES[l] + '</h3><p>' + LEVEL_DESC[l] + '</p></button>').join('') + '</div></div>' +
        '<div class="plan-section"><div class="plan-label">Your classes</div>' + allCourses().map(c => '<label class="chk course-line"><span><input type="checkbox" data-su-course="' + c.id + '" checked> ' + c.icon + ' ' + esc(c.title) + '</span><span class="muted small">' + esc(c.subtitle || '') + '</span></label>').join('') + '</div>' +
        '<div class="btn-row" style="margin-top:1rem"><button class="btn lg" id="suCreate">Create my profile</button></div></div>';
    } else if (welcomeState.mode === 'teacher') {
      form = '<div class="card signup"><div class="btn-row between"><h3>New teacher</h3><button class="btn ghost sm" id="welcomeCancel">✕</button></div>' +
        (Staff.master ? '<p class="muted small">Teacher profiles are created with the master account\'s PIN (ask ' + esc(Staff.master.name) + ').</p>' : '<p class="muted small">You are the first teacher here, so this profile becomes the <strong>master account</strong> for this device: it can add other teachers, create sections and run exports.</p>') +
        '<div class="signup-grid"><label>Name <input class="text-input" id="tName" maxlength="40" placeholder="e.g. Ms Patel"></label>' +
        '<label>Your 6-digit PIN <input class="text-input pin-input" id="tPin" type="password" inputmode="numeric" maxlength="6" placeholder="PIN"></label>' +
        (Staff.master ? '<label>Master PIN <input class="text-input pin-input" id="tMaster" type="password" inputmode="numeric" maxlength="6" placeholder="Master PIN"></label>' : '<label>School e-mail (optional) <input class="text-input" id="tEmail" placeholder="name@school.ca"></label>') + '</div>' +
        '<div class="plan-section"><div class="plan-label">Your picture</div><div class="avatar-grid">' + ['🧑‍🏫', '👩‍🏫', '👨‍🏫', '🦉', '📚', '🍎', '🌟', '🧭'].map((a, i) => '<button type="button" class="avatar-pick' + (i === 0 ? ' on' : '') + '" data-su-avatar="' + a + '">' + a + '</button>').join('') + '</div></div>' +
        '<div class="btn-row" style="margin-top:1rem"><button class="btn lg" id="tCreate">Create teacher profile</button></div></div>';
    }
    app.innerHTML = '<div class="signin"><div class="signin-head"><div class="signin-logo">🎓</div><h1>Welcome to The Academy</h1><p class="muted">' + (cont ? 'Welcome back! Continue, or pick another name.' : students.length || staffTiles.length ? 'Tap your name to sign in.' : 'Create the first profile to get started.') + '</p></div>' +
      (!welcomeState.mode && !welcomeState.pinFor ? ((cont ? '<button class="continue-tile" data-welcome="' + cont.id + '" style="--tile:' + esc(cont.colour) + '">' + avatarHtml(cont, 'tile-avatar') + '<span><span class="tile-name">Continue as ' + esc(cont.name) + '</span><span class="muted small">Pick up where you left off</span></span><span class="continue-arrow">→</span></button>' : '') +(students.length ? '<div class="student-grid">' + students.map(p => tile(p)).join('') + '</div>' : '') +
        (staffTiles.length ? '<div class="student-grid staff-grid">' + staffTiles.map(p => tile(p, p.role)).join('') + '</div>' : '') +
        '<div class="card signin-add"><h3>New here?</h3><div class="btn-row">' + (canAdd ? '<button class="btn" data-mode="student">🎒 I\'m a student</button>' : '') + '<button class="btn secondary" data-mode="teacher">🧑‍🏫 I\'m a teacher</button></div>' + (canAdd ? '' : '<p class="muted small" style="margin:0.5rem 0 0">Students are added by their teacher on this device.</p>') + '</div>') : form) + '</div>';
    // bindings
    app.querySelectorAll('[data-welcome]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.welcome;
      if (id.startsWith('staff:')) { welcomeState.pinFor = id; pageWelcome(); return; }
      Students.setCurrent(id); sessionStorage.setItem('learnhub.entered', '1'); renderWho(); goHome();
    }));
    app.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => { welcomeState.mode = b.dataset.mode; pageWelcome(); }));
    const on = (id, fn) => { const el = app.querySelector(id); if (el) el.addEventListener('click', fn); };
    on('#welcomeCancel', () => { welcomeState.mode = ''; welcomeState.pinFor = ''; pageWelcome(); });
    const staffGo = () => { const pin = (app.querySelector('#staffPin').value || '').trim(); const sid = welcomeState.pinFor.slice(6); const ok = Staff.unlock(pin); if (ok && (ok === sid)) { welcomeState.pinFor = ''; Students.setCurrent('staff:' + sid); sessionStorage.setItem('learnhub.entered', '1'); renderWho(); goHome(); } else alert('Wrong PIN.'); };
    on('#staffGo', staffGo); const sp = app.querySelector('#staffPin'); if (sp) { sp.focus(); sp.addEventListener('keydown', e => { if (e.key === 'Enter') staffGo(); }); }
    let avatar = null;
    app.querySelectorAll('[data-su-avatar]').forEach(b => b.addEventListener('click', () => { app.querySelectorAll('[data-su-avatar]').forEach(x => x.classList.toggle('on', x === b)); avatar = b.dataset.suAvatar; }));
    let level = 2;
    app.querySelectorAll('[data-su-level]').forEach(b => b.addEventListener('click', () => { app.querySelectorAll('[data-su-level]').forEach(x => x.classList.toggle('on', x === b)); level = +b.dataset.suLevel; }));
    on('#suCreate', () => {
      const name = (app.querySelector('#suName').value || '').trim(); if (!name) return alert('Please type your first name.');
      const g = id => app.querySelector(id).value;
      const courses = [...app.querySelectorAll('[data-su-course]:checked')].map(x => x.dataset.suCourse);
      const st = Students.add(name, { level, courses: courses.length === allCourses().length ? null : courses,
        prefs: { fontScale: +g('#suFont'), font: g('#suFace'), contrast: g('#suContrast'), tint: g('#suTint'), motion: 'normal', readAloud: app.querySelector('#suRead').checked, dictation: app.querySelector('#suDictate').checked } });
      if (avatar) Students.update(st.id, { avatar });
      welcomeState.mode = ''; Students.setCurrent(st.id); sessionStorage.setItem('learnhub.entered', '1'); renderWho(); goHome();
    });
    on('#tCreate', () => {
      const name = (app.querySelector('#tName').value || '').trim(), pin = (app.querySelector('#tPin').value || '').trim();
      if (!name) return alert('Please type your name.'); if (!/^\d{6}$/.test(pin)) return alert('The PIN must be exactly 6 digits.');
      if (Staff.master) {
        const mp = (app.querySelector('#tMaster').value || '').trim(); if (Staff.unlock(mp) !== 'master') return alert('The master PIN is not right.');
        if (Staff.unlock(pin)) return alert('That PIN is already in use — choose another.');
        const t = Staff.addTeacher(name, pin, { avatar: avatar || '🧑‍🏫' }); welcomeState.mode = ''; Students.setCurrent('staff:' + t.id);
      } else {
        Staff.setMaster(name, (app.querySelector('#tEmail').value || '').trim(), pin); Settings.set('guardianPin', pin); if (avatar) { Staff.master.avatar = avatar; Staff.save(); }
        welcomeState.mode = ''; Students.setCurrent('staff:master');
      }
      sessionStorage.setItem('learnhub.entered', '1'); renderWho(); goHome();
    });
    const nm = app.querySelector('#suName, #tName'); if (nm) nm.focus();
    // live preview: the sign-up form applies text size / font / contrast / overlay to the page as they are chosen,
    // so the student sees the effect before deciding. Cancelling restores the previous look.
    const preview = () => { const g = id => { const el = app.querySelector(id); return el ? el.value : null; };
      const d = document.documentElement, body = document.body;
      if (g('#suFont') !== null) { d.style.setProperty('--font-scale', g('#suFont')); body.dataset.font = g('#suFace'); body.dataset.contrast = g('#suContrast'); body.dataset.tint = g('#suTint'); } };
    ['#suFont', '#suFace', '#suContrast', '#suTint'].forEach(id => { const el = app.querySelector(id); if (el) el.addEventListener('change', preview); });
    if (app.querySelector('#suFont')) { preview(); const c = app.querySelector('#welcomeCancel'); if (c) c.addEventListener('click', () => Settings.apply()); }
  }
  /* ----- Cloud sign-in (replaces the welcome tiles when cloud.js is enabled) -----
     Students: student number + birthday (DDMMYYYY). Teachers: teacher ID + password. */
  const signinState = { mode: 'student', busy: false, msg: '', signup: false };
  function pageCloudSignIn() {
    setCourseColor(null); setNav('');
    const bb = document.getElementById('backBtn'); if (bb) bb.hidden = true;
    const st = signinState, student = st.mode === 'student';
    const keep = Cloud.keepSignedIn();
    const canSelf = Settings.get('allowSelfSignup') !== false;
    const field = (id, label, type, ph, extra) => '<label class="signin-field">' + label + '<input class="text-input" id="' + id + '" type="' + type + '" placeholder="' + ph + '" autocomplete="off" ' + (extra || '') + '></label>';
    let form;
    if (st.signup && student) {
      form = '<div class="card signin-card"><div class="btn-row between"><h3>Create my student account</h3><button class="btn ghost sm" id="siBack">✕</button></div>' +
        '<p class="muted small">Your teacher will add you to your classes. Your password is your birthday written as <strong>DDMMYYYY</strong> (12 January 2008 → 12012008).</p>' +
        field('suNumber', 'Student number', 'text', 'e.g. 123456', 'inputmode="numeric"') + field('suName', 'First name', 'text', 'First name', 'maxlength="30"') + field('suDob', 'Birthday', 'date', '') +
        '<div class="btn-row" style="margin-top:0.75rem"><button class="btn lg" id="suGo"' + (st.busy ? ' disabled' : '') + '>Create account</button></div></div>';
    } else {
      form = '<div class="card signin-card"><div class="seg signin-seg"><button class="' + (student ? 'on' : '') + '" data-si-mode="student">🎒 Student</button><button class="' + (!student ? 'on' : '') + '" data-si-mode="staff">🧑‍🏫 Teacher</button></div>' +
        (student ? field('siUser', 'Student number', 'text', 'Student number', 'inputmode="numeric"') + field('siPass', 'Password (birthday DDMMYYYY)', 'password', '12012008', 'inputmode="numeric" maxlength="8"')
                 : field('siUser', 'Teacher ID', 'text', 'Teacher ID') + field('siPass', 'Password', 'password', 'Password')) +
        '<label class="chk" style="margin-top:0.5rem"><input type="checkbox" id="siKeep"' + (keep ? ' checked' : '') + '> Keep me signed in on this device <span class="muted small">(untick on shared computers)</span></label>' +
        '<div class="btn-row" style="margin-top:0.75rem"><button class="btn lg" id="siGo"' + (st.busy ? ' disabled' : '') + '>' + (st.busy ? 'Signing in…' : 'Sign in') + '</button>' +
        (student && canSelf ? '<button class="btn ghost" id="siSignup">New student? Create an account</button>' : '') + (!student ? '<button class="btn ghost" id="siFirstTeacher">🎓 First time here? Set up the Headmaster (admin) account</button>' : '') + '</div></div>';
    }
    app.innerHTML = '<div class="signin"><div class="signin-head"><div class="signin-logo">🎓</div><h1>Welcome to The Academy</h1><p class="muted">' + (student ? 'Sign in with your student number and your birthday.' : 'Teachers sign in with their teacher ID and password.') + '</p></div>' +
      (st.msg ? '<div class="signin-msg' + (st.msgOk ? ' ok' : '') + '">' + esc(st.msg) + '</div>' : '') + form +
      '<p class="muted small center" style="margin-top:1rem">' + (Cloud.online ? '☁️ Connected' : '📴 Offline — sign in needs the internet the first time on a device') + '</p></div>';
    const on = (id, fn) => { const el = app.querySelector(id); if (el) el.addEventListener('click', fn); };
    app.querySelectorAll('[data-si-mode]').forEach(b => b.addEventListener('click', () => { st.mode = b.dataset.siMode; st.msg = ''; st.signup = false; pageCloudSignIn(); }));
    const fail = m => { st.busy = false; st.msg = m; st.msgOk = false; pageCloudSignIn(); };
    const go = async () => {
      if (st.busy) return; const u = (app.querySelector('#siUser').value || '').trim(), pw = app.querySelector('#siPass').value || '', keepMe = app.querySelector('#siKeep').checked;
      if (!u || !pw) return fail('Type your ' + (student ? 'student number and birthday' : 'teacher ID and password') + '.');
      st.busy = true; st.msg = ''; pageCloudSignIn();
      try { if (student) await Cloud.signInStudent(u, pw, keepMe); else await Cloud.signInStaff(u, pw, keepMe); st.busy = false; enterCloudSession(); }
      catch (e) { fail(e.message); }
    };
    on('#siGo', go); const pw = app.querySelector('#siPass'); if (pw) pw.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    on('#siSignup', () => { st.signup = true; st.msg = ''; pageCloudSignIn(); });
    on('#siBack', () => { st.signup = false; st.msg = ''; pageCloudSignIn(); });
    on('#suGo', async () => {
      if (st.busy) return; const number = app.querySelector('#suNumber').value.trim(), name = app.querySelector('#suName').value.trim(), dob = app.querySelector('#suDob').value;
      if (!number || !name || !dob) return fail('Fill in your student number, first name and birthday.');
      st.busy = true; pageCloudSignIn();
      try { await Cloud.createStudent({ name, number, dob, level: 2, courses: [] }); await Cloud.signInStudent(number, Cloud.dobPassword(dob), false); st.busy = false; st.signup = false; enterCloudSession(); }
      catch (e) { fail(e.message); }
    });
    // first-ever teacher: offer master set-up when no master exists yet
    const ft = app.querySelector('#siFirstTeacher'); if (ft) ft.addEventListener('click', () => { st.signup = 'master'; pageMasterSetup(); });
    const first = app.querySelector('#siUser, #suNumber'); if (first) first.focus();
  }
  function pageMasterSetup() {
    app.innerHTML = '<div class="signin"><div class="signin-head"><div class="signin-logo">🎓</div><h1>Set up the Headmaster account</h1><p class="muted">The Headmaster is the admin account: it adds teachers, creates sections and sees every student. It can only be created once — after that, teachers are added by the Headmaster in Settings → Teachers.</p></div>' +
      '<div class="card signin-card"><label class="signin-field">Your name<input class="text-input" id="mName" maxlength="40" placeholder="e.g. Ms Patel"></label><label class="signin-field">Teacher ID (what you will sign in with)<input class="text-input" id="mLogin" placeholder="e.g. jresendes"></label><label class="signin-field">Password (at least 6 characters)<input class="text-input" id="mPass" type="password"></label><label class="signin-field">School e-mail (optional)<input class="text-input" id="mEmail" placeholder="name@school.ca"></label>' +
      '<div class="btn-row" style="margin-top:0.75rem"><button class="btn lg" id="mGo">Create Headmaster account</button><button class="btn ghost" id="mBack">Cancel</button></div><p class="muted small" id="mMsg"></p></div></div>';
    app.querySelector('#mBack').addEventListener('click', () => { signinState.signup = false; pageCloudSignIn(); });
    app.querySelector('#mGo').addEventListener('click', async () => {
      const g = id => app.querySelector(id).value.trim(); const msg = app.querySelector('#mMsg');
      try { msg.textContent = 'Creating…'; const rec = await Cloud.createStaff({ name: g('#mName'), login: g('#mLogin'), password: app.querySelector('#mPass').value, email: g('#mEmail') }); await Cloud.signInStaff(rec.login, app.querySelector('#mPass').value, true); signinState.signup = false; enterCloudSession(); }
      catch (e) { msg.textContent = e.message; msg.style.color = 'var(--danger)'; }
    });
  }
  /** After Firebase says who we are: make storage.js's "current profile" match and go home. */
  function enterCloudSession() {
    if (!Cloud.user) return;
    const uid = Cloud.user.uid;
    if (Cloud.role === 'student') {
      if (!Students.byId(uid)) { signinState.msg = 'Your account exists but your profile could not be found. Ask your teacher to add you again.'; Cloud.signOut(); return pageCloudSignIn(); }
      Students.setCurrent(uid);
    } else Students.setCurrent(Cloud.role === 'master' ? 'staff:master' : 'staff:' + uid);
    sessionStorage.setItem('learnhub.entered', '1'); renderWho(); goHome();
  }
  /** "Profile v7 · saved 11 Nov, 11:38 p.m. by Mr. Resendes" — the same stamp on every device once they agree. */
  function profileStamp(s) { if (!s || !Cloud.enabled) return ''; const when = s.updatedAt ? new Date(s.updatedAt).toLocaleString([], { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : ''; return '<span class="stamp" title="Every saved change raises the version number. If two screens show different numbers, the newer one has not reached the other yet.">Profile v' + (+s.rev || 0) + (when ? ' · saved ' + esc(when) : '') + (s.updatedBy ? ' by ' + esc(s.updatedBy) : '') + '</span>'; }
  /** One line about the cloud connection, for Settings and the save bar. */
  function cloudStatusHtml() {
    if (!Cloud.enabled) return '';
    const t = iso => iso ? new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';
    const st = Cloud.status, w = Cloud.waiting || 0;
    const txt = st === 'error' ? '⚠️ Cloud error: ' + esc(Cloud.error || Cloud.lastError || '') : st === 'sending' || w ? '⏳ Sending to the cloud… (' + w + ' waiting)' : st === 'offline' ? '📴 Offline — changes wait on this device' : st === 'synced' ? '☁️ Cloud: synced' + (Cloud.lastConfirmed ? ' · last change confirmed ' + t(Cloud.lastConfirmed) : '') : '☁️ Cloud: ' + esc(st);
    return '<p class="muted small cloud-status" data-cloud-status>' + txt + '</p>';
  }
  window.addEventListener('cloud:status', () => { document.querySelectorAll('[data-cloud-status]').forEach(el => { const n = document.createElement('div'); n.innerHTML = cloudStatusHtml(); if (n.firstChild) el.replaceWith(n.firstChild); }); });
  function possessive(n) { n = String(n || '').trim(); return n + (/s$/i.test(n) ? '\u2019' : '\u2019s'); }
  function deskName() { return Students.current && Students.current.isStaff ? "Teacher's Desk" : 'Student Desk'; }
  /** Sections the signed-in student is enrolled in (active first). */
  function mySections() { const me = Students.current; if (!me || me.isStaff) return []; return Sections.list.filter(sec => (sec.students || []).includes(me.id)).sort((a, b) => (a.archived ? 1 : 0) - (b.archived ? 1 : 0)); }
  function teacherName(sec) { if (!sec.teacherId) return Staff.master ? Staff.master.name : ''; const t = Staff.teachers.find(x => x.id === sec.teacherId); return t ? t.name : ''; }
  function goHome() { if (location.hash === '#/' || location.hash === '') window.dispatchEvent(new HashChangeEvent('hashchange')); else location.hash = '#/'; }

  function pageHome() {
    setCourseColor(null); setNav('home');
    const s = Students.current;
    if (s.isStaff) return pageTeacherHome();
    const mine = courses();
    const others = allCourses().filter(c => !mine.includes(c) && !Students.isArchived(c.id));
    const arch = archivedCourses();
    // totals across my classes
    let awards = 0, total = 0, bestTests = [];
    mine.forEach(c => { const sm = Badges.summary(c); awards += sm.earned; total += sm.total; unitsFor(c).forEach(un => { const u = Progress.unit(c.id, un.id); if (u.testBest) bestTests.push(u.testBest); }); });
    const avg = bestTests.length ? Math.round(bestTests.reduce((a, b) => a + b, 0) / bestTests.length) : null;
    const courseCard = (c, resume) => { const sm = Badges.summary(c); const t = Students.trackFor(c.id); const pct = courseProgress(c);
      const units = unitsFor(c).map((un, i) => { const u = Progress.unit(c.id, un.id); const up = unitProgress(c, un); const ls = lessonsFor(un); const done = ls.filter(l => lessonStatus(c, un, l).complete).length;
        return '<a class="unit-line" href="#/course/' + c.id + '"><span class="tag">Unit ' + (c.units.indexOf(un) + 1) + '</span><span class="unit-line-title">' + esc(un.title) + '</span><span class="muted small">' + done + '/' + ls.length + ' lessons' + (u.testBest ? ' · test ' + u.testBest + '%' : '') + '</span><span class="progress mini"><span style="width:' + up + '%"></span></span></a>'; }).join('');
      return '<details class="card course-card class-fold" style="--course:' + esc(c.color || '') + '"><summary class="class-summary"><span class="card-icon">' + c.icon + '</span><span class="class-text"><h2>' + esc(c.title) + '</h2><span class="muted small">' + esc(c.subtitle || '') + '</span>' +
        '<span class="progress"><span style="width:' + pct + '%"></span></span></span>' +
        '<span class="btn-row class-tags"><span class="tag">' + (t ? 'Modified · ' + ({ k2: 'K–2', g35: 'Gr 3–5', g68: 'Gr 6–8' }[t.band]) : 'Level ' + Students.levelFor(c.id)) + '</span>' + (Focus.active(c.id) ? '<span class="tag accent">🎯 Focus Plan</span>' : '') + '<span class="tag accent">🏅 ' + sm.earned + ' / ' + sm.total + '</span>' + (resume ? '<span class="tag ok">' + (pct ? pct + '%' : 'Start') + '</span>' : '') + '</span></summary>' +
        '<div class="class-body">' + units + '<div class="btn-row" style="margin-top:0.6rem"><a class="btn" href="#/course/' + c.id + '">' + (pct ? '▶️ Resume this class' : '▶️ Start this class') + '</a><a class="btn secondary sm" href="#/grades/' + c.id + '">📊 My grades</a><a class="btn ghost sm" href="#/case/' + c.id + '">🏆 Display Case</a></div></div></details>'; };
    const secs = mySections();
    const secCard = sec => { const c = findCourseAll(sec.courseId); if (!c) return ''; const pct = Students.enrolled(c.id) ? courseProgress(c) : 0;
      return '<div class="card section-card" style="--course:' + esc(c.color || '') + '"><div class="btn-row between"><div><span class="tag">' + (sec.archived ? '📦 archived' : 'Section') + '</span><h3 style="margin:0.3rem 0 0">' + esc(sec.name) + '</h3><div class="muted small">' + c.icon + ' ' + esc(c.title) + (sec.term ? ' · ' + esc(sec.term) : '') + (teacherName(sec) ? ' · ' + esc(teacherName(sec)) : '') + '</div></div><span class="tag ok">' + (pct ? pct + '%' : 'Start') + '</span></div>' +
        '<div class="btn-row" style="margin-top:0.75rem"><a class="btn" href="#/course/' + c.id + '">▶️ Open class</a><a class="btn secondary sm" href="#/grades/' + c.id + '">📊 Grades</a><a class="btn ghost sm" href="#/case/' + c.id + '">🏆 Display Case</a></div></div>'; };
    document.body.dataset.page = 'desk';
    app.innerHTML = '<div class="page-head"><div><h1>🎒 ' + esc(possessive(s.name)) + ' Desk</h1><p class="muted">Welcome back, ' + esc(s.name) + '! Your sections, your courses, and how you are doing.</p>' + (Cloud.enabled ? '<p class="muted small">' + profileStamp(s) + '</p>' : '') + '</div>' +
      '<div class="btn-row"><a class="btn ghost" href="#/settings">⚙️ Settings</a></div></div>' +
      (Focus.enabled && Object.keys(Focus.data.courses).length ? '<div class="plan-banner">🎯 <strong>Focus Plan is on.</strong> Courses with a plan show only the pieces chosen for you.</div>' : '') +
      '<div class="case-stats"><div class="stat"><div class="n">' + mine.length + '</div><div class="l">Active class' + (mine.length === 1 ? '' : 'es') + '</div></div><div class="stat"><div class="n">🏅 ' + awards + ' / ' + total + '</div><div class="l">Awards</div></div><div class="stat"><div class="n">' + (avg === null ? '–' : avg + '%') + '</div><div class="l">Average best test</div></div><div class="stat"><div class="n">' + arch.length + '</div><div class="l">Archived</div></div></div>' +
      '<details class="card desk-fold"><summary class="class-summary"><span class="card-icon">🏫</span><span class="class-text"><h2>Sections</h2><span class="muted small">' + (secs.length ? secs.length + ' section' + (secs.length === 1 ? '' : 's') + ' with a teacher' : 'no sections yet') + '</span></span></summary><div class="class-body">' +
        (secs.length ? '<div class="section-list">' + secs.map(secCard).join('') + '</div>' : '<p class="muted">Your teacher adds you to a section; it appears here as soon as they do.</p>') + '<p class="small muted" style="margin:0.75rem 0 0"><a href="#/sections">Open the Sections page →</a></p></div></details>' +
      '<details class="card desk-fold"><summary class="class-summary"><span class="card-icon">📚</span><span class="class-text"><h2>Courses</h2><span class="muted small">' + mine.length + ' active' + (others.length && !s.coursesLocked ? ' · ' + others.length + ' to join' : '') + (arch.length ? ' · ' + arch.length + ' archived' : '') + '</span></span></summary><div class="class-body">' +
      (mine.length ? '<div class="class-list">' + mine.map(c => courseCard(c, true)).join('') + '</div>' : '<p class="muted">No active classes. ' + (others.length ? 'Join one below.' : (Cloud.enabled ? 'Your teacher adds you to a class; it appears here as soon as they do.' : '')) + '</p>') +
      (others.length && !s.coursesLocked ? '<details class="other-courses"><summary>➕ Join a new class (' + others.length + ')</summary><div class="grid" style="margin-top:1rem">' + others.map(c =>
        '<div class="card course-card" style="--course:' + esc(c.color || '') + '"><div class="card-icon">' + c.icon + '</div><h2>' + esc(c.title) + '</h2><p class="muted">' + esc(c.subtitle || '') + '</p><button class="btn secondary sm" data-join="' + c.id + '">＋ Join this class</button></div>').join('') + '</div></details>'
        : (others.length ? '<p class="muted small" style="margin-top:1.5rem">Your class list is set by your teacher.</p>' : '')) +
      (arch.length ? '<details class="other-courses"><summary>📦 Archived classes (' + arch.length + ')</summary><div class="grid" style="margin-top:1rem">' + arch.map(c =>
        '<div class="card course-card" style="--course:' + esc(c.color || '') + '"><div class="card-icon">' + c.icon + '</div><h2>' + esc(c.title) + '</h2><p class="muted">' + esc(c.subtitle || '') + '</p><div class="btn-row"><a class="btn secondary sm" href="#/course/' + c.id + '">Open</a><button class="btn ghost sm" data-unarchive="' + c.id + '">Bring back</button></div></div>').join('') + '</div></details>' : '') +
      '</div></details>';
    app.querySelectorAll('[data-join]').forEach(b => b.addEventListener('click', () => { Students.setCourses(s.id, mine.map(c => c.id).concat(arch.map(c => c.id)).concat(b.dataset.join)); pageHome(); }));
    app.querySelectorAll('[data-unarchive]').forEach(b => b.addEventListener('click', () => { Students.archiveCourse(s.id, b.dataset.unarchive, false); pageHome(); }));
  }
  /** Teacher / master dashboard: sections, students and the course grid. */
  function pageTeacherHome() {
    const s = Students.current;
    const secs = Sections.visible(s.staffId, false), archived = Sections.visible(s.staffId, true).filter(x => x.archived);
    const scope = studentsInScope();
    document.body.dataset.page = 'desk';
    app.innerHTML = '<div class="page-head"><div><h1>🧑‍🏫 Teacher\'s Desk</h1><p class="muted">Welcome, ' + esc(s.name) + ' · ' + (s.role === 'master' ? 'Headmaster' : 'Teacher') + ' · ' + secs.length + ' active section' + (secs.length === 1 ? '' : 's') + ' · ' + scope.length + ' student' + (scope.length === 1 ? '' : 's') + '</p></div>' +
      '<div class="btn-row"><a class="btn secondary" href="#/settings">⚙️ Settings &amp; students</a></div></div>' +
      '<details class="card desk-fold"><summary class="class-summary"><span class="card-icon">🏫</span><span class="class-text"><h2>Sections</h2><span class="muted small">' + secs.length + ' active' + (archived.length ? ' · ' + archived.length + ' archived' : '') + '</span></span></summary><div class="class-body">' +
      (secs.length ? '<div class="section-list">' + secs.map(sec => teacherSectionCard(sec)).join('') + '</div>' : '<p class="muted">No sections yet — create one in Settings → Sections.</p>') +
      (archived.length ? '<details class="other-courses"><summary>📦 Archived sections (' + archived.length + ')</summary><div class="section-list" style="margin-top:1rem">' + archived.map(sec => teacherSectionCard(sec)).join('') + '</div></details>' : '') +
      '<p class="small muted" style="margin:0.75rem 0 0"><a href="#/sections">Open the Sections page →</a></p></div></details>' +
      '<details class="card desk-fold"><summary class="class-summary"><span class="card-icon">📚</span><span class="class-text"><h2>Courses</h2><span class="muted small">' + allCourses().length + ' courses · teacher preview</span></span></summary><div class="class-body"><div class="grid" style="margin-top:0.75rem">' + allCourses().map(c => '<a class="card link course-card" href="#/course/' + c.id + '" style="--course:' + esc(c.color || '') + '"><div class="card-icon">' + c.icon + '</div><h2>' + esc(c.title) + '</h2><p class="muted">' + esc(c.subtitle || '') + '</p><span class="tag">' + c.units.length + ' units · ' + c.units.reduce((n, u) => n + u.lessons.length, 0) + ' lessons</span></a>').join('') + '</div></div></details>' + notesFoldHtml();
    app.querySelectorAll('[data-section]').forEach(a => a.addEventListener('click', () => Sections.setCurrent(s.staffId, a.dataset.section)));
  }

  /** A section card for teachers (desk + Sections page): roster, grades, course, students. */
  function teacherSectionCard(sec) {
    const c = findCourseAll(sec.courseId); const roster = (sec.students || []).map(id => Students.byId(id)).filter(Boolean);
    return '<details class="card class-fold section-card" style="--course:' + esc(c ? c.color || '' : '') + '"><summary class="class-summary"><span class="card-icon">' + (c ? c.icon : '🏫') + '</span><span class="class-text"><h2>' + esc(sec.name) + '</h2><span class="muted small">' + (c ? esc(c.title) : '') + (sec.term ? ' · ' + esc(sec.term) : '') + (sec.archived ? ' · 📦 archived' : '') + '</span></span><span class="btn-row class-tags"><span class="tag">' + roster.length + ' student' + (roster.length === 1 ? '' : 's') + '</span></span></summary>' +
      '<div class="class-body">' + (roster.length ? '<div class="roster">' + roster.map(st => '<span class="roster-chip">' + st.avatar + ' ' + esc(st.name) + (st.number ? ' <span class="muted small">#' + esc(st.number) + '</span>' : '') + '</span>').join('') + '</div>' : '<p class="muted small">No students yet — add them in Settings → Students.</p>') +
      '<div class="btn-row" style="margin-top:0.6rem"><a class="btn" href="#/dashboard" data-section="' + sec.id + '">📊 Grades</a>' + (c ? '<a class="btn secondary sm" href="#/course/' + c.id + '">📚 Open the course</a>' : '') + '<a class="btn secondary sm" href="#/settings" data-section="' + sec.id + '" data-open-group="students">👥 Students</a>' + (c ? '<a class="btn ghost sm" href="#/print/' + c.id + '/' + c.units[0].id + '/unit">🖨️ Print unit 1</a>' : '') + '</div></div></details>';
  }
  /* ----- Teacher notes: sticky notes, private to the signed-in teacher ----- */
  const NOTE_COLOURS = ['yellow', 'pink', 'blue', 'green', 'orange', 'purple'];
  function notesData() {
    let n = Staff.notes; if (!n || !Array.isArray(n.items)) n = { count: 6, items: [] };
    while (n.items.length < 10) n.items.push({ title: '', text: '', colour: NOTE_COLOURS[n.items.length % NOTE_COLOURS.length] });
    n.count = [4, 6, 8, 10].includes(n.count) ? n.count : 6;
    return n;
  }
  function notesFoldHtml() {
    const n = notesData(); const used = n.items.slice(0, n.count).filter(x => (x.title || x.text).trim());
    return '<details class="card desk-fold notes-fold"><summary class="class-summary"><span class="card-icon">📝</span><span class="class-text"><h2>Notes</h2><span class="muted small">' + (used.length ? used.length + ' note' + (used.length === 1 ? '' : 's') + ' with something on them' : 'your sticky notes — only you see them') + '</span></span></summary><div class="class-body">' +
      (used.length ? '<div class="sticky-grid preview">' + used.slice(0, 4).map((x, i) => '<a class="sticky ' + x.colour + '" href="#/notes">' + (x.title ? '<strong>' + esc(x.title) + '</strong>' : '') + '<span class="sticky-text">' + esc(x.text.slice(0, 120)) + (x.text.length > 120 ? '…' : '') + '</span></a>').join('') + '</div>' : '<p class="muted small">Nothing written yet.</p>') +
      '<div class="btn-row" style="margin-top:0.75rem"><a class="btn" href="#/notes">📝 Open my notes</a></div></div></details>';
  }
  function pageNotes() {
    const me = Students.current; if (!me || !me.isStaff) { location.hash = '#/'; return; }
    setCourseColor(null); setNav('sections');
    const n = notesData();
    app.innerHTML = crumbs([{ label: deskName(), href: '#/' }, { label: 'Notes' }]) +
      '<div class="page-head"><div><h1>📝 My notes</h1><p class="muted">Sticky notes for ' + esc(me.name) + ' — reminders, to-dos, things to say to a class. Only you can see them, on every device you sign in on. Each note saves itself as you type.</p></div>' +
      '<div class="btn-row"><span class="muted small">Number of notes</span><div class="seg">' + [4, 6, 8, 10].map(k => '<button data-notes-count="' + k + '" class="' + (n.count === k ? 'on' : '') + '">' + k + '</button>').join('') + '</div></div></div>' +
      '<div class="sticky-grid">' + n.items.slice(0, n.count).map((x, i) => '<div class="sticky ' + x.colour + '" data-note="' + i + '"><div class="sticky-top"><input class="sticky-title" data-note-title="' + i + '" placeholder="Title" maxlength="40" value="' + esc(x.title) + '"><span class="sticky-tools">' + NOTE_COLOURS.map(c => '<button class="sticky-dot ' + c + (x.colour === c ? ' on' : '') + '" data-note-colour="' + i + '" data-c="' + c + '" title="' + c + '"></button>').join('') + '<button class="sticky-clear" data-note-clear="' + i + '" title="Clear this note">✕</button></span></div>' +
        '<textarea class="sticky-body" data-note-text="' + i + '" placeholder="Write here…">' + esc(x.text) + '</textarea><div class="sticky-foot muted small" data-note-saved="' + i + '">' + (x.at ? 'saved ' + new Date(x.at).toLocaleString() : '') + '</div></div>').join('') + '</div>';
    let timer = null, dirty = -1;
    const persist = (i, msg) => { timer = null; dirty = -1; n.items[i].at = new Date().toISOString(); Staff.setNotes({ count: n.count, items: n.items }); const f = app.querySelector('[data-note-saved="' + i + '"]'); if (f) f.textContent = msg || ('saved ' + new Date().toLocaleTimeString()); };
    // leaving the page (back button, a menu tap, closing the app) saves whatever is still being typed, then sends it
    const leave = () => { if (timer) { clearTimeout(timer); persist(dirty); } if (Cloud.enabled) Cloud.flushNow().catch(() => {}); window.removeEventListener('hashchange', leave); window.removeEventListener('pagehide', leave); };
    window.addEventListener('hashchange', leave); window.addEventListener('pagehide', leave);
    app.querySelectorAll('[data-note-text]').forEach(t => t.addEventListener('input', () => { const i = +t.dataset.noteText; n.items[i].text = t.value; dirty = i; const f = app.querySelector('[data-note-saved="' + i + '"]'); if (f) f.textContent = 'saving…'; clearTimeout(timer); timer = setTimeout(() => persist(i), 500); }));
    app.querySelectorAll('[data-note-title]').forEach(t => t.addEventListener('input', () => { const i = +t.dataset.noteTitle; n.items[i].title = t.value; dirty = i; clearTimeout(timer); timer = setTimeout(() => persist(i), 500); }));
    app.querySelectorAll('[data-note-colour]').forEach(b => b.addEventListener('click', () => { const i = +b.dataset.noteColour; n.items[i].colour = b.dataset.c; persist(i); const card = app.querySelector('[data-note="' + i + '"]'); card.className = 'sticky ' + b.dataset.c; card.querySelectorAll('.sticky-dot').forEach(d => d.classList.toggle('on', d.dataset.c === b.dataset.c)); }));
    app.querySelectorAll('[data-note-clear]').forEach(b => b.addEventListener('click', () => { const i = +b.dataset.noteClear; if (!(n.items[i].title || n.items[i].text) || confirm('Clear this note?')) { n.items[i].title = ''; n.items[i].text = ''; persist(i, 'cleared'); pageNotes(); } }));
    app.querySelectorAll('[data-notes-count]').forEach(b => b.addEventListener('click', () => { n.count = +b.dataset.notesCount; Staff.setNotes({ count: n.count, items: n.items }); pageNotes(); }));
  }

  /* ----- Sections page (top menu) ----- */
  function pageSections() {
    setCourseColor(null); setNav('sections');
    const me = Students.current;
    if (me.isStaff) {
      const secs = Sections.visible(me.staffId, false), archived = Sections.visible(me.staffId, true).filter(x => x.archived);
      app.innerHTML = '<div class="page-head"><div><h1>🏫 Sections</h1><p class="muted">Each class you teach, with its grades, course and students.</p></div><div class="btn-row"><a class="btn secondary" href="#/settings" data-open-group="sections">＋ Create or manage sections</a></div></div>' +
        (secs.length ? '<div class="section-list">' + secs.map(sec => teacherSectionCard(sec)).join('') + '</div>' : '<div class="empty">No sections yet — create one in Settings → Sections.</div>') +
        (archived.length ? '<details class="other-courses"><summary>📦 Archived sections (' + archived.length + ')</summary><div class="section-list" style="margin-top:1rem">' + archived.map(sec => teacherSectionCard(sec)).join('') + '</div></details>' : '') + notesFoldHtml();
      app.querySelectorAll('[data-section]').forEach(a => a.addEventListener('click', () => Sections.setCurrent(me.staffId, a.dataset.section)));
    } else {
      const secs = mySections();
      app.innerHTML = '<div class="page-head"><div><h1>🏫 Sections</h1><p class="muted">The classes you are in, with their teacher, course, grades and awards.</p></div></div>' +
        (secs.length ? '<div class="section-list">' + secs.map(sec => { const c = findCourseAll(sec.courseId); if (!c) return ''; const pct = Students.enrolled(c.id) ? courseProgress(c) : 0;
          return '<details class="card class-fold section-card" style="--course:' + esc(c.color || '') + '"><summary class="class-summary"><span class="card-icon">' + c.icon + '</span><span class="class-text"><h2>' + esc(sec.name) + '</h2><span class="muted small">' + esc(c.title) + (sec.term ? ' · ' + esc(sec.term) : '') + (teacherName(sec) ? ' · ' + esc(teacherName(sec)) : '') + (sec.archived ? ' · 📦 archived' : '') + '</span></span><span class="btn-row class-tags"><span class="tag ok">' + (pct ? pct + '%' : 'Start') + '</span></span></summary>' +
            '<div class="class-body">' + unitsFor(c).map(un => { const u = Progress.unit(c.id, un.id); const ls = lessonsFor(un); const done = ls.filter(l => lessonStatus(c, un, l).complete).length; return '<a class="unit-line" href="#/course/' + c.id + '"><span class="tag">Unit ' + (c.units.indexOf(un) + 1) + '</span><span class="unit-line-title">' + esc(un.title) + '</span><span class="muted small">' + done + '/' + ls.length + ' lessons' + (u.testBest ? ' · test ' + u.testBest + '%' : '') + '</span><span class="progress mini"><span style="width:' + unitProgress(c, un) + '%"></span></span></a>'; }).join('') +
            '<div class="btn-row" style="margin-top:0.75rem"><a class="btn" href="#/course/' + c.id + '">▶️ Open class</a><a class="btn secondary sm" href="#/grades/' + c.id + '">📊 Grades</a><a class="btn secondary sm" href="#/work/' + c.id + '/' + c.units[0].id + '">📁 Work folder</a><a class="btn ghost sm" href="#/case/' + c.id + '">🏆 Display Case</a></div></div></details>'; }).join('') + '</div>'
         : '<div class="empty">You are not in a section yet. Your teacher adds you; it appears here as soon as they do.</div>');
    }
  }

  /* ----- Course page: units → lessons ----- */
  const courseSearch = { q: '' };
  function lessonStatus(course, unit, les) {
    const u = Progress.unit(course.id, unit.id);
    const slides = slidesFor(les), seen = Math.min(slides.length, (u.slides[les._idx] || []).length);
    const quiz = (u.quiz || {})[les._idx] || null;
    const as = assignmentsFor(les), work = (u.work || {})[les._idx] || {};
    const doneA = as.filter(a => work[a._idx] && work[a._idx].done).length;
    const hasQuiz = lessonQuestions(unit, les._idx).length > 0;
    return { slides: slides.length, seen, quiz, hasQuiz, assignments: as.length, doneA,
             complete: slides.length > 0 && seen >= slides.length && (!hasQuiz || (quiz && quiz.passed)) && doneA >= as.length };
  }
  function lessonRow(course, unit, les, n, hit) {
    const st = lessonStatus(course, unit, les);
    return '<a class="lesson-item' + (st.complete ? ' done' : '') + (hit ? ' hit' : '') + '" href="#/lesson/' + course.id + '/' + unit.id + '/' + les._idx + '">' +
      '<span class="lesson-num">' + n + '</span><span class="lesson-title">' + esc(les.title) + '</span>' +
      '<span class="lesson-status">' +
      '<span class="tag' + (st.seen >= st.slides && st.slides ? ' ok' : '') + '" title="Slides read">📖 ' + st.seen + '/' + st.slides + '</span>' +
      (st.hasQuiz ? '<span class="tag' + (st.quiz && st.quiz.passed ? ' ok' : '') + '" title="Quiz best score">❓ ' + (st.quiz ? st.quiz.best + '%' : '–') + '</span>' : '') +
      (st.assignments ? '<span class="tag' + (st.doneA >= st.assignments ? ' ok' : '') + '" title="Assignments done">✍️ ' + st.doneA + '/' + st.assignments + '</span>' : '') +
      (st.complete ? '<span class="tag ok">✓</span>' : '') + '</span></a>';
  }
  function lessonText(lesson) {
    const parts = [lesson.title];
    (lesson.slides || []).forEach(sl => { [sl.title, sl.body].forEach(v => { if (v && typeof v === 'object') Object.values(v).forEach(x => parts.push(x)); else parts.push(v); }); });
    return parts.filter(Boolean).join(' \n ').toLowerCase();
  }
  function matchesKeyword(lesson, q) { const words = q.split(/\s+/).filter(Boolean); if (!words.length) return true; const t = lessonText(lesson); return words.every(w => t.includes(w)); }

  function pageCourse(courseId) {
    const course = findCourse(courseId); if (!course || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    const q = courseSearch.q.trim().toLowerCase();
    app.innerHTML = crumbs([{ label: deskName(), href: '#/' }, { label: course.title }]) +
      '<div class="page-head"><div><h1>' + course.icon + ' ' + esc(course.title) + '</h1><p class="muted">' + esc(L(course.description) || course.subtitle || '') + '</p></div>' +
      '<div class="btn-row">' + (Students.current.isStaff ? '' : '<button class="btn ghost sm" id="archiveCourse" title="Hide this class on your home page (you can bring it back)">📦 Archive class</button>') + '</div></div>' + Overlay.bar(course) + planBanner(course) + (Students.current.isStaff ? '' : levelBanner(course)) +
      '<details class="card class-fold case-fold" style="margin-bottom:1rem"><summary class="class-summary"><span class="card-icon">🏆</span><span class="class-text"><h2>Display Case</h2><span class="muted small">' + esc(Students.current.name) + '\'s badges, medals and trophies in this course</span></span><span class="btn-row class-tags"><span class="tag accent">🏅 ' + Badges.summary(course).earned + ' / ' + Badges.summary(course).total + '</span></span></summary><div class="class-body">' + caseHtml(course) + '</div></details>' +
      '<div class="search-row course-search"><input class="text-input" id="courseQ" placeholder="🔍 Find a lesson by keyword (e.g. census, ritual, festival)" value="' + esc(courseSearch.q) + '"><button class="btn secondary" id="courseGo">Search</button>' + (q ? '<button class="btn ghost" id="courseClear">Clear</button>' : '') + '</div>' +
      '<div class="unit-list">' + unitsFor(course).map(unit => {
        const idx = course.units.indexOf(unit);
        const awards = Badges.unitRow(course, unit);
        const pct = unitProgress(course, unit);
        const lessons = lessonsFor(unit);
        const hits = q ? lessons.filter(l => matchesKeyword(l, q)) : lessons;
        if (q && !hits.length) return '';
        const u = Progress.unit(course.id, unit.id);
        const facts = Badges.unitFacts(course, unit);
        const touched = Object.keys(u.slides || {}).length || u.testAttempts || Object.keys(u.quiz || {}).length || Object.keys(u.work || {}).length;
        const status = facts.allRead && facts.allQuizzes !== false && (facts.allQuizzes || !facts.lessons.some(l => l.hasQuiz)) && u.testPassed ? 'complete' : touched ? 'active' : 'new';
        return '<details class="card unit-card unit-' + status + '"' + (q ? ' open' : '') + '><summary class="unit-summary">' + (status === 'complete' ? '<span class="unit-flag">✓ Unit complete</span>' : status === 'active' ? '<span class="unit-flag">In progress</span>' : '') + '<div class="unit-head"><div><span class="tag">Unit ' + (idx + 1) + '</span><h2 style="margin-top:0.4rem">' + esc(unit.title) + '</h2>' +
          '<p class="muted small">' + esc(L(unit.description) || '') + '</p></div>' +
          '<div class="unit-side"><div class="progress"><span style="width:' + pct + '%"></span></div>' +
          '<div class="unit-badges">' + awards.map(a => '<span class="' + (a.earnedAt ? '' : 'locked') + '" title="' + esc(a.name) + '">' + a.icon + '</span>').join('') + '</div><span class="fold-hint">' + lessons.length + ' lesson' + (lessons.length === 1 ? '' : 's') + ' · tap to open</span></div></div></summary>' +
          '<div class="lesson-list">' + (q ? hits : lessons).map((les, k) => lessonRow(course, unit, les, lessons.indexOf(les) + 1, q && hits.includes(les)) + Overlay.lessonTools(course, unit, les)).join('') + '</div>' + Overlay.unitTools(course, unit) +
          '<div class="unit-foot">' + goalsHtml(course, unit) +
          '<div class="rooms">' +
          '<a class="room" href="#/test/' + course.id + '/' + unit.id + '"><span class="room-icon">📝</span><span>Unit test' + (u.testBest ? ' <span class="muted">· best ' + u.testBest + '%</span>' : '') + '</span></a>' +
          '<a class="room" href="#/games/' + course.id + '/' + unit.id + '"><span class="room-icon">🎮</span><span>Game Room</span></a>' +
          '<a class="room" href="#/work/' + course.id + '/' + unit.id + '"><span class="room-icon">📁</span><span>Work folder' + (function () { const w = u.work || {}; let d = 0, h = 0; Object.values(w).forEach(l => Object.values(l).forEach(x => { if (x && x.text) { if (x.done) h++; else d++; } })); return h || d ? '</span><span class="room-sub">' + h + ' handed in · ' + d + ' draft' + (d === 1 ? '' : 's') : ''; })() + '</span></a>' +
          '<a class="room" href="#/print/' + course.id + '/' + unit.id + '/unit"><span class="room-icon">🖨️</span><span>Print unit</span></a>' +
          '</div></div></details>';
      }).join('') + '</div>' +
      (unitsFor(course).length ? (q && !unitsFor(course).some(un => lessonsFor(un).some(l => matchesKeyword(l, q))) ? '<div class="empty">No lessons mention "' + esc(courseSearch.q) + '".</div>' : '') : '<div class="empty">No units are in this course\'s Focus Plan yet. A teacher can choose some in Settings.</div>');
    const rv = app.querySelector('#revertLevel'); if (rv) rv.addEventListener('click', () => { const prev = Students.previousLevel(course.id); if (prev) { Students.moveLevel(Students.current.id, course.id, prev, 'student', 'went back'); pageCourse(courseId); } });
    const ab = app.querySelector('#archiveCourse'); if (ab) ab.addEventListener('click', () => { if (confirm('Archive ' + course.title + '? It moves to "Archived classes" on your home page and you can bring it back any time.')) { Students.archiveCourse(Students.current.id, course.id, true); location.hash = '#/'; } });
    const run = () => { courseSearch.q = app.querySelector('#courseQ').value; pageCourse(courseId); };
    app.querySelector('#courseGo').addEventListener('click', run);
    app.querySelector('#courseQ').addEventListener('keydown', e => { if (e.key === 'Enter') run(); });
    const cl = app.querySelector('#courseClear'); if (cl) cl.addEventListener('click', () => { courseSearch.q = ''; pageCourse(courseId); });
    Overlay.bindCourse(course, () => pageCourse(courseId));
  }

  /* ----- Lesson hub ----- */
  function pageLesson(courseId, unitId, lessonIdx) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    const lessons = lessonsFor(unit); lessonIdx = +lessonIdx || 0;
    const pos = lessons.findIndex(l => l._idx === lessonIdx); if (pos < 0) return notFound();
    const les = lessons[pos], st = lessonStatus(course, unit, les);
    const u = Progress.unit(course.id, unit.id), work = (u.work || {})[les._idx] || {};
    const as = assignmentsFor(les);
    const quizN = assessmentCount(byLevel(Settings.level, [4, 6, 8, 10]));
    const base = '/' + course.id + '/' + unit.id + '/' + les._idx;
    app.innerHTML = crumbs([{ label: deskName(), href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title, href: '#/course/' + course.id }, { label: 'Lesson ' + (pos + 1) }]) + Overlay.bar(course) +
      '<div class="page-head"><div><span class="tag">Lesson ' + (pos + 1) + ' of ' + lessons.length + '</span><h1 style="margin-top:0.4rem">' + esc(les.title) + '</h1><p class="muted">' + esc(unit.title) + '</p></div>' +
      '<div class="btn-row">' + Print.button('#/print/' + course.id + '/' + unit.id + '/lesson/' + les._idx, 'Print lesson') + (pos > 0 ? '<a class="btn ghost" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessons[pos - 1]._idx + '">← Lesson ' + pos + '</a>' : '') +
      (pos < lessons.length - 1 ? '<a class="btn ghost" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessons[pos + 1]._idx + '">Lesson ' + (pos + 2) + ' →</a>' : '') + '</div></div>' +
      '<div class="grid lesson-parts">' +
      '<a class="card link part" href="#/study' + base + '"><div class="card-icon">📖</div><h3>Slides</h3><p class="muted small">' + st.slides + ' slide' + (st.slides === 1 ? '' : 's') + ' · read in order, with read-aloud.</p>' + (st.seen >= st.slides && st.slides ? '<span class="tag ok">✓ All read</span>' : '<span class="tag">' + st.seen + ' of ' + st.slides + ' read</span>') + '</a>' +
      (st.hasQuiz ? '<a class="card link part" href="#/quiz' + base + '"><div class="card-icon">❓</div><h3>Quiz</h3><p class="muted small">' + quizN + ' questions on this lesson · pass mark ' + Badges.PASS_MARK + '%.</p>' + (st.quiz ? '<span class="tag' + (st.quiz.passed ? ' ok' : '') + '">' + (st.quiz.passed ? '✓ Passed · ' : 'Best ') + st.quiz.best + '%</span>' : '<span class="tag">Not tried yet</span>') + '</a>'
                 : '<div class="card part muted"><div class="card-icon">❓</div><h3>Quiz</h3><p class="small">No quiz for this lesson.</p></div>') +
      (as.length ? as.map((a, k) => { const w = work[a._idx] || {}; return '<a class="card link part" href="#/assign' + base + '/' + a._idx + '"><div class="card-icon">✍️</div><h3>Assignment ' + (k + 1) + '</h3><p class="muted small">' + esc(a.title) + '</p>' + (w.done ? '<span class="tag ok">✓ Handed in</span>' : w.text ? '<span class="tag accent">Draft saved</span>' : '<span class="tag">To do</span>') + '</a>'; }).join('')
                 : '') + '</div>' +
      (pos === lessons.length - 1 ? '<div class="card center" style="margin-top:1.25rem"><h3>Finished every lesson in the unit?</h3><p class="muted small">The unit test covers all ' + lessons.length + ' lessons.</p><a class="btn" href="#/test/' + course.id + '/' + unit.id + '">📝 Take the unit test</a></div>' : '') +
      Overlay.lessonEditor(course, unit, les);
    Overlay.bindLessonEditor(course, unit, les, () => pageLesson(courseId, unitId, lessonIdx));
  }

  /* ----- Work folder: every assignment in a unit with its draft / handed-in state ----- */
  function pageWork(courseId, unitId) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    const me = Students.current, u = Progress.unit(course.id, unit.id), work = u.work || {};
    const lessons = lessonsFor(unit);
    const teacher = !Settings.locked && Staff.master;
    let counts = { done: 0, draft: 0, todo: 0 };
    const rows = lessons.map((les, k) => {
      const as = assignmentsFor(les); if (!as.length) return '';
      return '<div class="card" style="margin-bottom:1rem"><h3 style="margin-bottom:0.5rem"><span class="tag">Lesson ' + (k + 1) + '</span> ' + esc(les.title) + '</h3>' + as.map((a, n) => {
        const w = (work[les._idx] || {})[a._idx] || {};
        const state = w.done ? 'done' : (w.text ? 'draft' : 'todo'); counts[state]++;
        const words = String(w.text || '').trim().split(/\s+/).filter(Boolean).length;
        return '<div class="work-row ' + state + '"><div class="work-row-head"><div><strong>✍️ ' + esc(a.title) + '</strong> <span class="muted small">Assignment ' + (n + 1) + (a.expectations ? ' · ' + esc(a.expectations) : '') + '</span></div>' +
          '<span class="btn-row">' + (state === 'done' ? '<span class="tag ok">✓ Handed in · ' + new Date(w.at).toLocaleDateString() + '</span>' : state === 'draft' ? '<span class="tag accent">Draft · saved ' + new Date(w.at).toLocaleDateString() + '</span>' : '<span class="tag">Not started</span>') +
          '<a class="btn secondary sm" href="#/assign/' + course.id + '/' + unit.id + '/' + les._idx + '/' + a._idx + '">' + (state === 'todo' ? 'Start' : state === 'draft' ? 'Continue' : 'Open') + '</a>' + Print.button('#/print/' + course.id + '/' + unit.id + '/assign/' + les._idx + '/' + a._idx, 'Print') + '</span></div>' +
          (w.text ? '<div class="work-preview">' + esc(w.text.length > 400 ? w.text.slice(0, 400) + '…' : w.text) + '</div><div class="muted small">' + words + ' words</div>' : '') +
          (Settings.get('dictation') !== false ? '<div data-recorder="' + esc(me.id + '/' + course.id + '/' + unit.id + '/' + les._idx + '/a' + a._idx) + '" data-readonly="1" data-label="Recording"></div>' : '') + '</div>';
      }).join('') + '</div>';
    }).join('');
    app.innerHTML = crumbs([{ label: deskName(), href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title, href: '#/course/' + course.id }, { label: 'Work folder' }]) +
      '<div class="page-head"><div><h1>📁 Work folder</h1><p class="muted">' + esc(me.name) + '\'s assignments in ' + esc(unit.title) + ' — drafts and handed-in work in one place.' + (teacher ? ' <span class="tag accent">Teacher view</span>' : '') + '</p></div>' +
      '<div class="case-stats" style="margin:0"><div class="stat"><div class="n">' + counts.done + '</div><div class="l">Handed in</div></div><div class="stat"><div class="n">' + counts.draft + '</div><div class="l">Drafts</div></div><div class="stat"><div class="n">' + counts.todo + '</div><div class="l">To do</div></div></div></div>' +
      (rows || '<div class="empty">This unit has no assignments.</div>');
  }

  /* ----- Assignment ----- */
  function pageAssign(courseId, unitId, lessonIdx, n) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    lessonIdx = +lessonIdx || 0; n = +n || 0;
    const les = lessonAt(unit, lessonIdx); const a = (les && assignmentsFor(les).find(x => x._idx === n)); if (!a) return notFound();
    const u = Progress.unit(course.id, unit.id); u.work = u.work || {}; const wl = u.work[lessonIdx] = u.work[lessonIdx] || {}; const w = wl[n] = wl[n] || { text: '', done: false };
    const starter = L(a.starter) || '';
    const words = t => String(t || '').trim().split(/\s+/).filter(Boolean).length;
    app.innerHTML = crumbs([{ label: deskName(), href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: les.title, href: '#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx }, { label: 'Assignment' }]) +
      '<div class="page-head"><div><span class="tag">✍️ Assignment</span><h1 style="margin-top:0.4rem">' + esc(a.title) + '</h1><p class="muted">' + esc(les.title) + (a.expectations ? ' · <span class="small">' + esc(a.expectations) + '</span>' : '') + '</p></div>' + Print.button('#/print/' + course.id + '/' + unit.id + '/assign/' + lessonIdx + '/' + n, 'Print') + '</div>' +
      '<div class="slide assignment"><div class="slide-read"><div class="btn-row between"><h2>Your task</h2>' + speakBtn(String(L(a.prompt)).replace(/[*#>-]/g, ''), '.slide-read') + '</div><div class="slide-body">' + md(L(a.prompt)) + '</div></div>' +
      '<div class="success-box"><strong>A complete answer…</strong> ' + esc(L(a.success)) + '</div>' +
      (starter ? '<p class="muted small">Sentence starter: <em>' + esc(starter) + '</em> <button class="btn ghost sm" id="useStarter">Use it</button></p>' : '') +
      '<div class="work-tools">' + (w.done ? '' : Media.dictateBtn('#workText')) + '<span class="muted small">' + (Media.canDictate && !w.done && Settings.get('dictation') !== false ? 'Tap 🎤 to dictate instead of typing.' : '') + '</span></div>' +
      '<textarea class="text-input work" id="workText" rows="10" placeholder="Write your answer here…"' + (w.done ? ' readonly' : '') + '>' + esc(w.text) + '</textarea>' +
      (Settings.get('dictation') !== false ? '<div class="plan-section"><div class="plan-label">🎙️ Or record your answer</div><div data-recorder="' + esc(Students.current.id + '/' + course.id + '/' + unit.id + '/' + lessonIdx + '/a' + n) + '" data-label="Record my answer"' + (w.done ? ' data-readonly="1"' : '') + '></div></div>' : '') +
      '<div class="btn-row between" style="margin-top:0.75rem"><span class="muted small" id="workMeta">' + words(w.text) + ' words' + (w.at ? ' · saved ' + new Date(w.at).toLocaleString() : '') + '</span>' +
      '<span class="btn-row">' + (w.done ? '<span class="tag ok">✓ Handed in</span><button class="btn secondary" id="reopen">Edit again</button>' : '<button class="btn secondary" id="saveWork">Save draft</button><button class="btn success" id="handIn">Hand in</button>') + '</span></div></div>' +
      '<p class="center" style="margin-top:1rem"><a class="btn ghost" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx + '">← Back to the lesson</a></p>';
    const ta = app.querySelector('#workText');
    const save = (done) => { w.text = ta.value; w.at = new Date().toISOString(); if (done !== undefined) w.done = done; Progress.save(); };
    let t = null; ta.addEventListener('input', () => { app.querySelector('#workMeta').textContent = words(ta.value) + ' words · saving…'; clearTimeout(t); t = setTimeout(() => { save(); app.querySelector('#workMeta').textContent = words(ta.value) + ' words · saved'; }, 800); });
    const on = (id, fn) => { const el = app.querySelector(id); if (el) el.addEventListener('click', fn); };
    on('#useStarter', () => { if (!ta.value.trim()) { ta.value = starter + ' '; ta.focus(); save(); } });
    on('#saveWork', () => { save(); pageAssign(courseId, unitId, lessonIdx, n); });
    on('#handIn', () => { if (words(ta.value) < 3) return alert('Write your answer first.'); save(true); Badges.evaluate(course, unit); pageAssign(courseId, unitId, lessonIdx, n); });
    on('#reopen', () => { save(false); pageAssign(courseId, unitId, lessonIdx, n); });
  }

  /* ----- Media on slides -----
     A lesson may list `media: [{ slide, type, title, why, source, url, search, src }]`.
     When `src` is filled in, students see the image or video. When it is empty, only an
     unlocked teacher sees a placeholder with the suggestion and where to find it. */
  function embedUrl(u) {
    const m = String(u).match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
    return m ? 'https://www.youtube-nocookie.com/embed/' + m[1] : null;
  }
  /** Google Slides / Docs / Forms share links → { kind, embed, open } (null for anything else). */
  function googleEmbed(u) {
    u = String(u || '');
    let m = u.match(/docs\.google\.com\/presentation\/d\/(?:e\/)?([\w-]+)/);
    if (m) return { kind: 'slides', label: 'Google Slides', icon: '📽️', embed: 'https://docs.google.com/presentation/d/' + (u.includes('/d/e/') ? 'e/' : '') + m[1] + '/embed?start=false&loop=false&delayms=60000', open: u, tall: false };
    m = u.match(/docs\.google\.com\/document\/d\/(?:e\/)?([\w-]+)/);
    if (m) return { kind: 'doc', label: 'Google Docs', icon: '📄', embed: 'https://docs.google.com/document/d/' + (u.includes('/d/e/') ? 'e/' : '') + m[1] + (u.includes('/d/e/') ? '/pub?embedded=true' : '/preview'), open: u, tall: true };
    m = u.match(/docs\.google\.com\/forms\/d\/(?:e\/)?([\w-]+)/);
    if (m) return { kind: 'form', label: 'Google Forms', icon: '📝', embed: 'https://docs.google.com/forms/d/' + (u.includes('/d/e/') ? 'e/' : '') + m[1] + '/viewform?embedded=true', open: u, tall: true };
    m = u.match(/forms\.gle\/([\w-]+)/);
    if (m) return { kind: 'form', label: 'Google Forms', icon: '📝', embed: null, open: u, tall: true };   // short links cannot be embedded; open in a new tab
    return null;
  }
  function mediaHtml(lesson, slideIdx) {
    const key = slideIdx && slideIdx._added !== undefined ? 'a' + slideIdx._added : (slideIdx && slideIdx._i !== undefined ? slideIdx._i : slideIdx);
    const slots = (lesson.media || []).filter(m => String(m.slide) === String(key));
    if (!slots.length) return '';
    return slots.map(m => {
      if (m.src) {
        const cap = esc(m.title) + (m.source ? ' <span class="muted">· ' + esc(m.source) + '</span>' : '');
        const g = googleEmbed(m.src);
        if (g) return '<div class="media-google' + (g.tall ? ' tall' : '') + '">' + (g.embed ? '<iframe src="' + esc(g.embed) + '" title="' + esc(m.title) + '" allowfullscreen loading="lazy"></iframe>' : '<p class="small muted">This short link opens in a new tab.</p>') +
          '<div class="btn-row between"><span class="small muted">' + g.icon + ' ' + esc(m.title) + (m.source ? ' · ' + esc(m.source) : '') + '</span><a class="btn secondary sm" href="' + esc(g.open) + '" target="_blank" rel="noopener">' + g.icon + ' Open in ' + g.label + '</a></div></div>';
        if (/^idb:/.test(m.src)) { const id = esc(m.src.slice(4));
          if (m.type === 'video') return '<figure class="media-fig"><video controls data-idb="' + id + '" style="max-width:100%;max-height:420px;border-radius:10px"></video><figcaption>' + cap + '</figcaption></figure>';
          if (m.type === 'audio') return '<figure class="media-fig"><audio controls data-idb="' + id + '"></audio><figcaption>' + cap + '</figcaption></figure>';
          return '<figure class="media-fig"><img data-idb="' + id + '" alt="' + esc(m.title) + '"><figcaption>' + cap + '</figcaption></figure>'; }
        if (m.type === 'image') return '<figure class="media-fig"><img src="' + esc(m.src) + '" alt="' + esc(m.title) + '" loading="lazy"><figcaption>' + cap + '</figcaption></figure>';
        if (m.type === 'audio') return '<figure class="media-fig"><audio controls src="' + esc(m.src) + '"></audio><figcaption>' + cap + '</figcaption></figure>';
        if (m.type === 'video' && /\.(mp4|webm|mov|m4v)(\?|$)/i.test(m.src)) return '<figure class="media-fig"><video controls src="' + esc(m.src) + '" style="max-width:100%;max-height:420px;border-radius:10px"></video><figcaption>' + cap + '</figcaption></figure>';
        const e = embedUrl(m.src);
        return e ? '<div class="media-video"><iframe src="' + esc(e) + '" title="' + esc(m.title) + '" allowfullscreen loading="lazy"></iframe><div class="small muted">🎬 ' + esc(m.title) + (m.source ? ' · ' + esc(m.source) : '') + '</div></div>'
                 : '<p class="media-link">🎬 <a href="' + esc(m.src) + '" target="_blank" rel="noopener">' + esc(m.title) + '</a>' + (m.source ? ' <span class="muted small">· ' + esc(m.source) + '</span>' : '') + '</p>';
      }
      if (Settings.locked || !Staff.master) return '';   // students never see empty slots
      return '<div class="media-slot"><div><strong>' + (m.type === 'video' ? '🎬 Video slot' : '🖼️ Image slot') + ' (teacher only):</strong> ' + esc(m.title) + '</div><div class="small">' + esc(m.why) + '</div>' +
        '<div class="small">Source: ' + esc(m.source) + (m.url ? ' — <a href="' + esc(m.url) + '" target="_blank" rel="noopener">open</a>' : m.search ? ' — search: "' + esc(m.search) + '"' : '') + (m.minutes ? ' · ~' + m.minutes + ' min' : '') + '</div>' +
        '<div class="small muted">To show it to students, paste the image URL or video link into this slot\'s <code>src</code> in the course file (see the media guide in Settings).</div></div>';
    }).join('');
  }

  /* ----- Study Room ----- */
  function pageStudy(courseId, unitId, lessonIdx) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    const lessons = lessonsFor(unit);
    if (!lessons.length) { app.innerHTML = '<div class="empty">No lessons are in this unit\'s Focus Plan yet.</div>'; return; }
    lessonIdx = +lessonIdx || 0;
    if (!lessons.some(l => l._idx === lessonIdx)) lessonIdx = lessons[0]._idx;
    const pos = lessons.findIndex(l => l._idx === lessonIdx);
    let lesson = lessons[pos];
    let slides = slidesFor(lesson);
    const u = Progress.unit(course.id, unit.id);
    let i = 0;
    const seen = () => u.slides[lessonIdx] || [];
    const lessonDone = li => { const s = slidesFor(lessonAt(unit, li)); return s.length > 0 && s.every((_, k) => (u.slides[li] || []).includes(k)); };

    const draw = () => {
      lesson = lessonAt(unit, lessonIdx); slides = slidesFor(lesson);   // re-read: the teacher may have just edited this slide
      if (!slides.length) { app.innerHTML = Overlay.bar(course) + '<div class="empty">This lesson has no slides for the current level.</div>'; Overlay.bindBar(draw); return; }
      if (i >= slides.length) i = slides.length - 1;
      Progress.markSlide(course.id, unit.id, lessonIdx, i);
      const s = slides[i];
      app.innerHTML = crumbs([{ label: deskName(), href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title, href: '#/course/' + course.id }, { label: 'Lesson ' + (pos + 1), href: '#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx }, { label: 'Slides' }]) + Overlay.bar(course) +
        '<div class="page-head"><div><span class="tag">Lesson ' + (pos + 1) + ' of ' + lessons.length + '</span><h1 style="margin-top:0.4rem">📖 ' + esc(lesson.title) + '</h1><p class="muted">' + esc(unit.title) + '</p></div>' +
        '<div class="btn-row">' + Print.button('#/print/' + course.id + '/' + unit.id + '/slides/' + lessonIdx, 'Print slides') + '<a class="btn ghost" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx + '">✕ Lesson page</a></div></div>' +
        '<div class="lesson-tabs">' + lessons.map(les => '<a href="#/study/' + course.id + '/' + unit.id + '/' + les._idx + '" class="' + (les._idx === lessonIdx ? 'active' : '') + (lessonDone(les._idx) ? ' done' : '') + '">' + esc(les.title) + '</a>').join('') + '</div>' +
        '<div class="slide">' + (s.visual ? '<div class="slide-visual">' + s.visual + '</div>' : '') +
        '<div class="slide-read"><div class="btn-row between"><h2>' + esc(L(s.title)) + '</h2>' + speakBtn(L(s.title) + '. ' + String(LH.body(s)).replace(/[*#-]/g, ''), '.slide-read') + '</div>' +
        '<div class="slide-body">' + md(LH.body(s)) + (s.html ? L(s.html) : '') + '</div></div>' + mediaHtml(lesson, s) +
        (i === slides.length - 1 && Settings.get('dictation') !== false && Media.canRecord ? '<div class="plan-section"><div class="plan-label">🎙️ Voice note — say what you learned (optional)</div><div data-recorder="' + esc(Students.current.id + '/' + course.id + '/' + unit.id + '/' + lessonIdx + '/note') + '" data-label="Record a voice note"></div></div>' : '') +
        '<div class="slide-foot"><button class="btn secondary" id="prevBtn"' + (i === 0 ? ' disabled' : '') + '>← Back</button>' +
        '<div class="dots">' + slides.map((_, k) => '<span class="' + (k === i ? 'current' : seen().includes(k) ? 'seen' : '') + '"></span>').join('') + '</div>' +
        (i < slides.length - 1 ? '<button class="btn" id="nextBtn">Next →</button>' :
          (lessonQuestions(unit, lessonIdx).length ? '<a class="btn success" href="#/quiz/' + course.id + '/' + unit.id + '/' + lessonIdx + '">Take the quiz →</a>' :
            pos < lessons.length - 1 ? '<a class="btn success" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessons[pos + 1]._idx + '">Next lesson →</a>' :
            '<a class="btn success" href="#/test/' + course.id + '/' + unit.id + '">Go to the unit test →</a>')) +
        '</div></div>' +
        '<p class="muted small center" style="margin-top:1rem">Slide ' + (i + 1) + ' of ' + slides.length + ' · Lesson ' + (pos + 1) + ' of ' + lessons.length + '</p>' +
        Overlay.slideEditor(course, unit, lesson, s);
      Overlay.bindSlideEditor(course, unit, lesson, s, (what) => { if (what === 'added') i = lesson._custom ? i + 1 : 1e9; draw(); });
      const prev = app.querySelector('#prevBtn'), next = app.querySelector('#nextBtn');
      if (prev) prev.addEventListener('click', () => { i--; draw(); });
      if (next) next.addEventListener('click', () => { i++; draw(); });
      // study completion = every slide of every lesson seen at the current level
      if (lessons.every(les => lessonDone(les._idx)) && !u.studyComplete) {
        u.studyComplete = true; Progress.save(); Badges.evaluate(course, unit);
      }
    };
    if (!slides.length) { app.innerHTML = '<div class="empty">This lesson has no slides for the current level.</div>'; return; }
    draw();
  }

  /* ----- Assessments: unit test and lesson quizzes share one runner ----- */
  function buildAssessment(pool, count) {
    // least-seen first (no repeats until every question has been used), then ordered
    // easy → hard so every student opens with a success
    return assessmentOrder(pool.slice(0, count));
  }
  function runAssessment(o) {
    // o: { head, qs, best, onDone(pct, score), retry(), links: html }
    const qs = o.qs;
    app.innerHTML = o.head + '<div class="card center" style="padding:2.5rem"><div class="card-icon">' + (o.icon || '📝') + '</div><h2>' + esc(o.title || 'Ready?') + '</h2>' +
      '<p class="muted">' + qs.length + ' questions · pass mark ' + Badges.PASS_MARK + '%' + (o.best ? ' · your best: ' + o.best + '%' : '') + '</p>' +
      '<button class="btn lg" id="startBtn">' + esc(o.start || 'Start') + '</button>' + (o.print ? '<div style="margin-top:0.75rem">' + Print.button(o.print, 'Print a paper copy') + '</div>' : '') + '</div>';
    app.querySelector('#startBtn').addEventListener('click', start);
    function start() {
      let i = 0, score = 0;
      const next = () => {
        if (i >= qs.length) return finish();
        const q = qs[i];
        app.innerHTML = o.head + '<div class="score-bar"><span>Question ' + (i + 1) + ' of ' + qs.length + '</span><span>Score: ' + score + '</span></div><div class="question"><div class="q-host"></div></div>';
        const host = app.querySelector('.q-host');
        const done = (ok) => { if (ok) score++; i++; next(); };
        if (q.type === 'mc' || q.type === 'tf') Games.askChoice(host, q, done);
        else if (q.type === 'fill') Games.renderFill(host, q, done);
        else if (q.type === 'match') {
          markSeen(q);
          host.innerHTML = '<div class="q-prompt">' + esc(q.prompt || 'Match each item to its pair.') + '</div><div class="m-host"></div>';
          Games.renderMatchBoard(host.querySelector('.m-host'), q.pairs, mistakes => done(mistakes <= Math.floor(q.pairs.length / 3)), { chunk: q.chunk });
        }
      };
      next();
      function finish() {
        const pct = Math.round(score / qs.length * 100);
        const fresh = o.onDone(pct, score) || [];
        app.innerHTML = o.head + '<div class="card result-card"><div class="big-num">' + pct + '%</div>' +
          '<h2>' + (pct === 100 ? 'Perfect!' : pct >= Badges.PASS_MARK ? 'You passed!' : 'Keep practising') + '</h2>' +
          '<p class="muted">' + score + ' of ' + qs.length + ' correct.' + (pct < Badges.PASS_MARK ? ' Read the lesson again and try once more.' : '') + '</p>' +
          (fresh.length ? '<p>' + fresh.map(a => '<span class="tag accent">' + a.icon + ' ' + esc(a.name) + '</span>').join(' ') + '</p>' : '') +
          (o.extra ? o.extra(pct) : '') + (o.note ? o.note(pct) : '') +
          '<div class="btn-row" style="justify-content:center"><button class="btn" id="retry">Try again</button>' + (o.links || '') + '</div></div>';
        app.querySelector('#retry').addEventListener('click', o.retry);
        if (o.afterRender) o.afterRender();
      }
    }
  }

  function pageTest(courseId, unitId) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    const u = Progress.unit(course.id, unit.id);
    const head = crumbs([{ label: deskName(), href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title, href: '#/course/' + course.id }, { label: 'Unit test' }]) +
      '<div class="page-head"><div><h1>📝 Unit test</h1><p class="muted">' + esc(unit.title) + ' · covers every lesson in the unit</p></div></div>';
    const level = Settings.level;
    const count = assessmentCount(byLevel(level, [5, 8, 12, 15]));
    const qs = buildAssessment(questionsFor(unit, level), count);
    if (!qs.length) { app.innerHTML = head + '<div class="empty">This unit has no test questions yet.</div>'; return; }
    runAssessment({ head, qs, best: u.testBest, title: 'Ready for the unit test?', start: 'Start the test', print: '#/print/' + course.id + '/' + unit.id + '/test',
      onDone(pct) {
        u.testAttempts = (u.testAttempts || 0) + 1;
        u.testBest = Math.max(u.testBest || 0, pct);
        if (pct >= Badges.PASS_MARK) u.testPassed = true; else u.failedOnce = true;
        if (pct === 100) u.testPerfect = true;
        Progress.save();
        const fresh = Badges.evaluate(course, unit);
        Students.suggest(course.id, unit.title, pct);   // level suggestion for the teacher (never shown to the student)
        return fresh;
      },
      retry: () => pageTest(courseId, unitId),
      links: '<a class="btn secondary" href="#/course/' + course.id + '">Back to the course</a><a class="btn secondary" href="#/games/' + course.id + '/' + unit.id + '">Game Room</a>',
      note: (pct) => '<p class="muted small">Level changes are offered after lesson quizzes (85%+ to move up). Unit tests count toward awards and your teacher\'s level suggestions.</p>' });
  }

  function pageQuiz(courseId, unitId, lessonIdx) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    lessonIdx = +lessonIdx || 0; const les = lessonAt(unit, lessonIdx); if (!les) return notFound();
    const u = Progress.unit(course.id, unit.id); u.quiz = u.quiz || {};
    const rec = u.quiz[lessonIdx] || (u.quiz[lessonIdx] = { best: 0, attempts: 0, passed: false });
    const head = crumbs([{ label: deskName(), href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: les.title, href: '#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx }, { label: 'Quiz' }]) +
      '<div class="page-head"><div><h1>❓ Quiz</h1><p class="muted">' + esc(les.title) + '</p></div></div>';
    const level = Settings.level;
    const count = assessmentCount(byLevel(level, [4, 6, 8, 10]));
    const qs = buildAssessment(lessonQuestions(unit, lessonIdx, level), count);
    if (!qs.length) { app.innerHTML = head + '<div class="empty">This lesson has no quiz questions yet.</div>'; return; }
    runAssessment({ head, qs, best: rec.best, icon: '❓', title: 'Quick check on this lesson', start: 'Start the quiz', print: '#/print/' + course.id + '/' + unit.id + '/quiz/' + lessonIdx,
      onDone(pct) {
        rec.attempts++; rec.best = Math.max(rec.best, pct); if (pct >= Badges.PASS_MARK) rec.passed = true;
        Progress.save();
        if (pct >= Badges.PASS_MARK) Students.recordLessonLevel(course.id, lessonIdx, Settings.level, pct);
        return Badges.evaluate(course, unit);
      },
      extra: (pct) => levelPromptHtml(course, lessonIdx, pct),
      note: (pct) => { if (Students.trackFor(course.id)) return ''; const l = Settings.level; if (pct >= 85 && l < 4) return ''; if (pct < BAND_MIN[l] && l > 1) return '';
        return '<p class="muted small">Level ' + l + ' · ' + LEVEL_NAMES[l] + (l < 4 ? ' — score 85% or more on a quiz to be offered Level ' + (l + 1) + '.' : ' — the top level.') + (l > 1 && pct >= BAND_MIN[l] ? ' You are above the Level ' + l + ' band (' + BAND_MIN[l] + '%+).' : '') + '</p>'; },
      afterRender: () => bindLevelPrompt(course),
      retry: () => pageQuiz(courseId, unitId, lessonIdx),
      links: (function () { const ls = lessonsFor(unit); const pos = ls.findIndex(l => l._idx === lessonIdx); const next = pos >= 0 && pos < ls.length - 1 ? ls[pos + 1] : null;
        return '<a class="btn secondary" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx + '">Back to the lesson</a>' + (next ? '<a class="btn success" href="#/lesson/' + course.id + '/' + unit.id + '/' + next._idx + '">Next lesson →</a>' : '<a class="btn success" href="#/test/' + course.id + '/' + unit.id + '">Unit test →</a>') + '<a class="btn ghost" href="#/course/' + course.id + '">Back to the course</a>'; })() });
  }

  /* ----- Game Room ----- */
  function pageGames(courseId, unitId) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    const u = Progress.unit(course.id, unit.id);
    let games = Games.available(course, unit);
    if (Settings.level === 1) games = games.filter(g => g.gentle).concat(games.filter(g => !g.gentle)); // gentle games first
    app.innerHTML = crumbs([{ label: deskName(), href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title }, { label: 'Game Room' }]) +
      '<div class="page-head"><div><h1>🎮 Game Room</h1><p class="muted">' + esc(unit.title) + ' · finish 3 games for a badge, all of them for a medal</p></div></div>' +
      '<div class="grid">' + games.map(g => '<a class="card link" href="#/game/' + course.id + '/' + unit.id + '/' + g.id + '"><div class="card-icon">' + g.icon + '</div><h3>' + esc(g.name) + '</h3><p class="muted small">' + esc(g.desc) + '</p>' +
        (u.games[g.id] ? '<span class="tag ok">✓ Completed' + (u.gameScores[g.id] !== undefined ? ' · best ' + u.gameScores[g.id] : '') + '</span>' : (g.gentle ? '<span class="tag">Gentle</span>' : '<span class="tag accent">Challenge</span>')) + '</a>').join('') + '</div>';
  }

  function pageGame(courseId, unitId, gameId) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    const game = Games.ALL.find(g => g.id === gameId);
    app.innerHTML = crumbs([{ label: deskName(), href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title, href: '#/games/' + course.id + '/' + unit.id }, { label: game ? game.name : 'Game' }]) +
      '<div class="page-head"><div><h1>' + (game ? game.icon + ' ' + esc(game.name) : 'Game') + '</h1><p class="muted">' + esc(unit.title) + '</p></div>' +
      '<a class="btn ghost" href="#/games/' + course.id + '/' + unit.id + '">✕ Exit</a></div><div class="game-area" id="gameHost"></div>';
    Games.play(gameId, course, unit, app.querySelector('#gameHost'));
  }

  /* ----- Display Case ----- */
  function pageCase(courseId) {
    setNav('case');
    const list = courseId ? courses().filter(c => c.id === courseId) : courses();
    setCourseColor(courseId ? list[0] : null);
    const totals = list.reduce((a, c) => { const s = Badges.summary(c); a.b += s.badges; a.m += s.medals; a.t += s.trophies; a.all += s.total; a.earned += s.earned; return a; }, { b: 0, m: 0, t: 0, all: 0, earned: 0 });
    app.innerHTML = '<div class="page-head"><div><h1>🏆 The Display Case</h1><p class="muted">' + esc(Students.current.name) + '\'s badges, medals and trophies' + (courseId && list[0] ? ' in ' + esc(list[0].title) : '') + '.</p></div>' +
      (courseId ? '<a class="btn secondary" href="#/case">All courses</a>' : '') + '</div>' +
      '<div class="case-stats"><div class="stat"><div class="n">🎖️ ' + totals.b + '</div><div class="l">Badges</div></div><div class="stat"><div class="n">🏅 ' + totals.m + '</div><div class="l">Medals</div></div><div class="stat"><div class="n">🏆 ' + totals.t + '</div><div class="l">Trophies</div></div><div class="stat"><div class="n">' + totals.earned + '/' + totals.all + '</div><div class="l">Collected</div></div></div>' +
      list.map(c => caseHtml(c)).join('') + (list.length ? '' : '<div class="empty">No courses yet.</div>');
  }
  /** One course's shelf of awards (used by the Display Case page and the fold on each course page). */
  function caseHtml(c) {
    return [c].map(c => {
        const awards = Badges.listForCourse(c);
        const card = a => '<div class="award tier-' + a.tier + (a.earnedAt ? ' earned' : ' locked') + '" title="' + esc(a.desc) + '"><span class="tier-label">' + a.tier + '</span><div class="award-icon">' + a.icon + '</div><div class="award-name">' + esc(a.name) + '</div><div class="award-desc">' + esc(a.earnedAt ? 'Earned ' + new Date(a.earnedAt).toLocaleDateString() : a.desc) + '</div></div>';
        const groups = [{ title: '🏆 Course trophies', list: awards.filter(a => !a.unit) }].concat(unitsFor(c).map(un => ({ title: un.title, list: awards.filter(a => a.unit && a.unit.id === un.id) })));
        return '<section class="case-shelf" style="--course:' + esc(c.color || '') + '"><h2>' + c.icon + ' ' + esc(c.title) + ' <span class="tag">' + awards.filter(a => a.earnedAt).length + ' / ' + awards.length + '</span></h2>' +
          groups.map(g => '<h3 class="case-group">' + esc(g.title) + ' <span class="tag">' + g.list.filter(a => a.earnedAt).length + ' / ' + g.list.length + '</span></h3><div class="award-grid">' + g.list.map(card).join('') + '</div>').join('') + '</section>';
      }).join('');
  }

  /* ----- Settings ----- */
  const sw = (key, label, help, val, attrs) => '<div class="setting-row"><div><label>' + label + '</label><div class="help">' + help + '</div></div><button class="switch ' + (val ? 'on' : '') + '" ' + (attrs || 'data-switch="' + key + '"') + ' role="switch" aria-checked="' + !!val + '"></button></div>';
  const seg = (key, label, help, options, val, attr) => '<div class="setting-row"><div><label>' + label + '</label><div class="help">' + help + '</div></div><div class="seg">' + options.map(o => '<button ' + (attr || 'data-seg="' + key + '"') + ' data-v="' + esc(o[0]) + '" class="' + (String(val) === String(o[0]) ? 'on' : '') + '">' + o[1] + '</button>').join('') + '</div></div>';

  const TINTS = [['none', 'None'], ['cream', 'Cream'], ['blue', 'Pale blue'], ['green', 'Pale green'], ['rose', 'Rose'], ['yellow', 'Yellow'], ['grey', 'Grey'], ['peach', 'Peach'], ['lavender', 'Lavender']];
  /** A collapsible settings group; open state is remembered for the session. */
  function group(key, title, help, inner, openDefault) {
    const st = sessionStorage.getItem('learnhub.sg.' + key); const open = st === null ? !!openDefault : st === '1';
    return '<details class="sgroup card" data-sgroup="' + key + '"' + (open ? ' open' : '') + '><summary><span class="sg-title">' + title + '</span>' + (help ? '<span class="sg-help muted small">' + help + '</span>' : '') + '</summary><div class="sg-body">' + inner + '</div></details>';
  }
  function pageSettings() {
    setCourseColor(null); setNav('settings');
    const me = Students.current, staff = me.isStaff;
    const pref = (k, label, help, options) => seg(k, label, help, options, Settings.get(k));
    const accessibility =
      pref('fontScale', 'Text size', 'Make everything larger.', [[1, 'Normal'], [1.15, 'Large'], [1.3, 'Extra large']]) +
      pref('font', 'Reading font', 'Lexend is designed for easier reading.', [['default', 'Standard'], ['lexend', 'Lexend']]) +
      pref('contrast', 'Contrast', 'High contrast: black text and strong borders. Inverted: white text on a black background.', [['normal', 'Normal'], ['high', 'High'], ['inverted', 'Inverted']]) +
      '<div class="setting-row"><div><label>Colour overlay (Irlen / visual stress)</label><div class="help">Tints the page like a coloured overlay. Try a few — the right colour is personal.</div></div><div class="tint-row">' + TINTS.map(t => '<button class="tint-swatch tint-' + t[0] + (Settings.get('tint') === t[0] ? ' on' : '') + '" data-tint="' + t[0] + '" title="' + t[1] + '" aria-label="' + t[1] + '"></button>').join('') + '<select class="text-input" id="tintSelect" style="max-width:170px">' + TINTS.map(t => '<option value="' + t[0] + '"' + (Settings.get('tint') === t[0] ? ' selected' : '') + '>' + t[1] + '</option>').join('') + '</select></div></div>' +
      pref('motion', 'Animation', 'Reduced motion removes flips, spins and slide effects.', [['normal', 'Normal'], ['reduced', 'Reduced']]) +
      sw('readAloud', 'Read aloud buttons', 'Show 🔊 buttons that read slides and questions out loud and highlight each word as it is read.', Settings.get('readAloud')) +
      sw('dictation', 'Dictation and voice recording', 'Show 🎤 dictate buttons on answers and 🎙️ record buttons on lessons and assignments.' + (Media.canDictate ? '' : ' (Dictation needs Chrome, Edge or Safari.)'), Settings.get('dictation') !== false) +
      '<div class="setting-row"><div><label>Read&amp;Write (Texthelp)</label><div class="help">The Read&amp;Write for Google Chrome extension works on this app as it is: every slide, question and assignment is real text, so hover-to-speak, dictionary, picture dictionary, highlighters and prediction all work. Tip: turn off the read-aloud buttons above to avoid two voices.</div></div><a class="btn secondary sm" href="https://chromewebstore.google.com/search/Read%26Write%20for%20Google%20Chrome" target="_blank" rel="noopener">Chrome Web Store</a></div>';
    const profile =
      (staff ? '<div class="setting-row"><div><label>Name</label><div class="help">Shown on the welcome screen and in the header.</div></div><div class="btn-row"><input class="text-input" id="meName" value="' + esc(me.name) + '" maxlength="30" style="max-width:220px"><button class="btn secondary sm" id="meNameSave">Save</button></div></div>'
             : '<div class="setting-row"><div><label>Name</label><div class="help">Your name is set by your teacher — ask them if it needs changing.</div></div><strong>' + esc(me.name) + '</strong></div>' + (Cloud.enabled ? '<div class="setting-row"><div><label>Profile version</label><div class="help">Changes your teacher makes on another device show here once they arrive.</div></div><span class="small muted">' + profileStamp(me) + '</span></div>' : '')) +
      '<div class="setting-row"><div><label>My picture</label></div><div class="avatar-grid">' + (staff ? ['🧑‍🏫', '👩‍🏫', '👨‍🏫', '🦉', '📚', '🍎', '🌟', '🧭'] : Students.AVATARS).map(a => '<button class="avatar-pick' + (a === me.avatar ? ' on' : '') + '" data-avatar="' + a + '">' + a + '</button>').join('') + '</div></div>' +
      (Cloud.enabled
        ? '<div class="setting-row"><div><label>Account</label><div class="help">' + (staff ? 'Teacher ID <strong>' + esc((Staff.current || {}).login || '') + '</strong>. ' : 'Student number <strong>' + esc(me.number || '') + '</strong>. Your password is your birthday (DDMMYYYY). ') + (Cloud.keepSignedIn() ? 'You stay signed in on this device.' : 'You are signed out after ' + ((window.CLOUD_CONFIG || {}).idleMinutes || 30) + ' minutes without activity.') + '</div></div><div class="btn-row">' + (staff ? '<button class="btn secondary sm" id="changePw">Change password</button>' : '') + '<button class="btn ghost sm" id="signOutBtn">Sign out</button></div></div>'
        : staff ? '<div class="setting-row"><div><label>Security</label><div class="help">Your 6-digit PIN signs you in from the welcome screen.</div></div><div class="btn-row"><button class="btn secondary sm" id="changePin">Change my PIN</button><a class="btn ghost sm" href="#/welcome">Sign out</a></div></div>'
             : '<div class="setting-row"><div><label>Switch profile</label><div class="help">Go back to the welcome screen.</div></div><a class="btn secondary sm" href="#/welcome">Welcome screen</a></div>');
    let html = '<div class="page-head"><div><h1>⚙️ Settings</h1><p class="muted">' + (staff ? 'Your profile, your sections and your students.' : 'Your profile, how the app looks and reads, and your classes.') + '</p>' + cloudStatusHtml() + '</div></div>';
    if (!staff) {
      const classes = '<p class="muted small">Where you are working right now, and the level you start each class at. Archived classes are on your dashboard.</p>' +
        (courses().map(c => { const t = Students.trackFor(c.id); const prev = Students.previousLevel(c.id); const lv = Students.levelFor(c.id);
          return '<div class="course-line"><label>' + c.icon + ' ' + esc(c.title) + '</label>' + (t ? '<span class="tag">Modified · ' + ({ k2: 'K–2', g35: 'Grades 3–5', g68: 'Grades 6–8' }[t.band]) + ' (set by your teacher)</span>' :
            '<span class="btn-row"><span class="tag">Level ' + lv + ' · ' + LEVEL_NAMES[lv] + '</span>' + (prev && prev !== lv ? '<button class="btn ghost sm" data-revert="' + c.id + '">↩ back to Level ' + prev + '</button>' : '') + '</span>') + '</div>'; }).join('') || '<p class="muted">No classes yet.</p>') +
        '<div class="plan-section"><div class="plan-label">Level of learning (default for new classes)</div><div class="level-cards compact">' + [1, 2, 3, 4].map(l => '<button class="level-card ' + (me.level === l ? 'on' : '') + '" data-me-level="' + l + '"><h3>Level ' + l + ' · ' + LEVEL_NAMES[l] + '</h3><p>' + LEVEL_DESC[l] + '</p></button>').join('') + '</div><p class="muted small" style="margin:0.4rem 0 0">Within a class you move up one level after 85%+ on a quiz, or back down when a quiz lands below your level\'s band.</p></div>' +
        '<div class="plan-section"><div class="plan-label">Accommodations' + (me.accommodations && (me.accommodations.reduce || me.accommodations.simplify || me.accommodations.chunk) ? '' : ' (none)') + '</div><p class="muted small" style="margin:0">' + [['reduce', 'Reduction — fewer questions'], ['simplify', 'Complexity — simpler answer choices'], ['chunk', 'Chunking — matching in small parts']].filter(x => me.accommodations && me.accommodations[x[0]]).map(x => '✓ ' + x[1]).join(' · ') + (me.accommodations && (me.accommodations.reduce || me.accommodations.simplify || me.accommodations.chunk) ? '' : 'Your teacher can turn these on for quizzes and tests.') + '</p></div>';
      html += group('profile', '👤 My profile', esc(me.name), profile) +
        group('classes', '🎚️ My classes, level, accommodations &amp; modifications', courses().length + ' active', classes) +
        group('access', '♿ Accessibility', 'text, contrast, overlay, read-aloud, dictation', accessibility) +
        group('app', '📱 App', 'install and offline', '<div id="appCard"><p class="muted small">Checking…</p></div>') +
        group('progress', '🗑️ Progress', '', '<p class="muted small">' + esc(me.name) + '\'s progress and awards are saved ' + (Cloud.enabled ? 'to the cloud and follow you to any device.' : 'in this browser.') + '</p><button class="btn ghost" id="resetBtn">Reset ' + esc(me.name) + '\'s progress</button>') +
        group('updates', '🔄 Updates', 'version ' + (window.PWA ? PWA.APP_VERSION : '?'), '<div id="updatesCard"><p class="muted small">Checking…</p></div>');
    } else {
      html += group('profile', '👤 My profile', esc(me.name) + ' · ' + (me.role === 'master' ? 'Headmaster' : 'teacher'), profile) +
        group('sections', '🏫 Sections', Sections.visible(me.staffId, false).length + ' active', sectionsHtml()) +
        group('students', '👥 Students', 'levels · accommodations &amp; modifications · courses · Focus Plan · work', studentsPanelHtml()) +
        (me.role === 'master' ? group('teachers', '🧑‍🏫 Teachers', Staff.teachers.length + ' teacher' + (Staff.teachers.length === 1 ? '' : 's'), teachersHtml()) + group('drive', '☁️ Google Drive &amp; exports', '', driveHtml()) : '') +
        group('media', '🖼️ Media checklist', 'images and videos to add', mediaChecklistHtml()) +
        group('options', '🎛️ Class options', 'colouring breaks · welcome screen', '<h3>🎨 Colouring page learning breaks</h3>' +
          seg('colouringEvery', 'Show a learning card every…', 'How many areas the student colours before a lesson card appears. "Student chooses" lets them pick inside the game.', [['student', 'Student chooses'], [1, '1'], [3, '3'], [5, '5'], [10, '10'], [0, 'Off']], Settings.get('colouringEvery')) +
          '<h3 style="margin-top:1rem">🚪 Welcome screen</h3>' + sw('allowSelfSignup', 'Students may create their own profile', 'Off: only students added here appear on the welcome screen.', Settings.get('allowSelfSignup') !== false)) +
        group('access', '♿ My accessibility', '', accessibility) +
        group('app', '📱 App', 'install and offline', '<div id="appCard"><p class="muted small">Checking…</p></div>') +
        group('updates', '🔄 Updates', 'version ' + (window.PWA ? PWA.APP_VERSION : '?'), '<div id="updatesCard"><p class="muted small">Checking…</p></div>');
    }
    app.innerHTML = html;
    renderAppCard(); renderUpdatesCard();
    const og = sessionStorage.getItem('learnhub.openGroup'); if (og) { sessionStorage.removeItem('learnhub.openGroup'); const d = app.querySelector('details[data-sgroup="' + og + '"]'); if (d) { d.open = true; setTimeout(() => d.scrollIntoView({ block: 'start' }), 50); } }
    app.querySelectorAll('details.sgroup').forEach(d => d.addEventListener('toggle', () => sessionStorage.setItem('learnhub.sg.' + d.dataset.sgroup, d.open ? '1' : '0')));
    app.querySelectorAll('[data-seg]').forEach(b => b.addEventListener('click', () => { const v = b.dataset.v; Settings.set(b.dataset.seg, isNaN(v) ? v : +v); pageSettings(); }));
    app.querySelectorAll('[data-switch]').forEach(b => b.addEventListener('click', () => { Settings.set(b.dataset.switch, !(Settings.get(b.dataset.switch) !== false)); pageSettings(); }));
    app.querySelectorAll('[data-avatar]').forEach(b => b.addEventListener('click', () => { Students.update(me.id, { avatar: b.dataset.avatar }); renderWho(); pageSettings(); }));
    app.querySelectorAll('[data-tint]').forEach(b => b.addEventListener('click', () => { Settings.set('tint', b.dataset.tint); pageSettings(); }));
    app.querySelectorAll('[data-revert]').forEach(b => b.addEventListener('click', () => { const prev = Students.previousLevel(b.dataset.revert); if (prev) { Students.moveLevel(me.id, b.dataset.revert, prev, 'student', 'went back'); pageSettings(); } }));
    app.querySelectorAll('[data-me-level]').forEach(b => b.addEventListener('click', () => { Students.update(me.id, { level: +b.dataset.meLevel }); pageSettings(); }));
    const ts = app.querySelector('#tintSelect'); if (ts) ts.addEventListener('change', () => { Settings.set('tint', ts.value); pageSettings(); });
    const on = (id, fn) => { const el = app.querySelector(id); if (el) el.addEventListener('click', fn); };
    on('#meNameSave', () => { const v = (app.querySelector('#meName').value || '').trim(); if (v) { Students.update(me.id, { name: v.slice(0, 30) }); renderWho(); pageSettings(); } });
    on('#changePin', () => { const v = (prompt('New 6-digit PIN:') || '').trim(); if (!/^\d{6}$/.test(v)) { if (v) alert('The PIN must be exactly 6 digits.'); return; } if (Staff.unlock(v)) return alert('That PIN is already in use.'); if (me.role === 'master') { Staff.setMaster(Staff.master.name, Staff.master.email, v); Settings.set('guardianPin', v); } else Staff.updateTeacher(me.staffId, { pin: v }); alert('PIN changed.'); });
    on('#resetBtn', () => { if (confirm('Erase all of ' + me.name + '\'s progress and awards on this device?')) { Progress.reset(); pageSettings(); } });
    on('#signOutBtn', () => { Cloud.signOut(); });
    on('#changePw', async () => { const o = prompt('Current password:'); if (o === null) return; const n = prompt('New password (at least 6 characters):'); if (!n) return; try { await Cloud.changeMyPassword(o, n); alert('Password changed.'); } catch (e) { alert(e.message); } });
    if (staff) { bindSections(); bindStudentsPanel(); bindTeachers(); bindDrive(); bindFocusPlan(false); bindLessonSearch(); const ps = app.querySelector('#planStudent'); if (ps) ps.addEventListener('change', () => { sessionStorage.setItem('learnhub.planStudent', ps.value); pageSettings(); }); }
  }

  /* ----- Sections (classes) ----- */
  function sectionsHtml() {
    const staff = Staff.current; const sid = staff.id;
    const mine = Sections.visible(sid, false), archived = Sections.visible(sid, true).filter(x => x.archived);
    const cur = Sections.currentFor(sid);
    const open = sessionStorage.getItem('learnhub.sectionsOpen') === '1';
    const teachers = Staff.teachers;
    return '<div class="btn-row between"><h3 style="margin:0">🏫 Sections</h3><a class="btn secondary sm" href="#/dashboard">📊 Open the dashboard</a></div><p class="muted small">A section is one class: a course, a teacher and a roster. Pick the section you are working with — the Students list below follows it. Archive a section at the end of term and bring it back any time.</p>' +
      '<div class="search-row" style="grid-template-columns:1fr auto auto"><select class="text-input" id="sectionSelect"><option value=""' + (!cur ? ' selected' : '') + '>' + (Staff.isMaster ? 'All students on this device' : 'All my students') + '</option>' +
        mine.map(sec => '<option value="' + sec.id + '"' + (cur && cur.id === sec.id ? ' selected' : '') + '>' + esc(sec.name) + (sec.term ? ' · ' + esc(sec.term) : '') + ' (' + (sec.students || []).length + ')</option>').join('') +
        (archived.length ? '<optgroup label="Archived">' + archived.map(sec => '<option value="' + sec.id + '"' + (cur && cur.id === sec.id ? ' selected' : '') + '>📦 ' + esc(sec.name) + (sec.term ? ' · ' + esc(sec.term) : '') + '</option>').join('') + '</optgroup>' : '') + '</select>' +
        (cur ? '<button class="btn ghost sm" data-section-archive="' + cur.id + '">' + (cur.archived ? '📤 Retrieve' : '📦 Archive') + '</button>' : '<span></span>') +
        '<button class="btn secondary sm" id="sectionsToggle">' + (open ? '▾ Hide' : '＋ New section') + '</button></div>' +
      (cur ? '<div class="small" style="margin:0.5rem 0 0">✏️ Classroom shell: <strong>' + Overlay.countChanges(cur, cur.courseId) + '</strong> customisation' + (Overlay.countChanges(cur, cur.courseId) === 1 ? '' : 's') + ' · <a href="#/course/' + cur.courseId + '">open the course to customise</a>' +
        (Sections.list.filter(x => x.id !== cur.id && x.courseId === cur.courseId && x.overlay).length ? ' · <select class="text-input" id="ovCopyFrom" style="max-width:280px;display:inline-block"><option value="">copy customisations from…</option>' + Sections.list.filter(x => x.id !== cur.id && x.courseId === cur.courseId && x.overlay).map(x => '<option value="' + x.id + '">' + esc(x.name) + (x.term ? ' · ' + esc(x.term) : '') + '</option>').join('') + '</select>' : '') +
        (Overlay.countChanges(cur, cur.courseId) ? ' · <button class="btn ghost sm" id="ovReset">Reset to the program</button>' : '') + '</div>' : '') +
      (cur ? '<p class="small muted" style="margin:0.4rem 0 0">' + (cur.archived ? '📦 Archived section — ' : '') + 'Course: <strong>' + esc((findCourseAll(cur.courseId) || { title: cur.courseId }).title) + '</strong>' + (cur.teacherId ? ' · Teacher: ' + esc((teachers.find(t => t.id === cur.teacherId) || { name: '?' }).name) : Staff.isMaster ? ' · no teacher assigned' : '') + ' · ' + (cur.students || []).length + ' student' + ((cur.students || []).length === 1 ? '' : 's') + '</p>' : '') +
      (open ? '<div class="plan-unit" style="margin-top:0.6rem"><div class="plan-label">New section</div><div class="search-row" style="grid-template-columns:1fr 1fr 1fr' + (Staff.isMaster ? ' 1fr' : '') + ' auto"><input class="text-input" id="secName" placeholder="Name, e.g. HRF3O Period 2"><select class="text-input" id="secCourse">' + allCourses().map(c => '<option value="' + c.id + '">' + c.icon + ' ' + esc(c.title) + '</option>').join('') + '</select><input class="text-input" id="secTerm" placeholder="Term, e.g. Fall 2026">' +
        (Staff.isMaster ? '<select class="text-input" id="secTeacher"><option value="">Teacher: me (master)</option>' + teachers.map(t => '<option value="' + t.id + '">' + esc(t.name) + '</option>').join('') + '</select>' : '') + '<button class="btn" id="secCreate">Create</button></div></div>' : '');
  }
  function bindSections() {
    const sid = Staff.current.id;
    const sel = app.querySelector('#sectionSelect'); if (sel) sel.addEventListener('change', () => { Sections.setCurrent(sid, sel.value || null); pageSettings(); });
    const tg = app.querySelector('#sectionsToggle'); if (tg) tg.addEventListener('click', () => { sessionStorage.setItem('learnhub.sectionsOpen', sessionStorage.getItem('learnhub.sectionsOpen') === '1' ? '0' : '1'); pageSettings(); });
    const cr = app.querySelector('#secCreate'); if (cr) cr.addEventListener('click', () => { const name = app.querySelector('#secName').value.trim(); if (!name) return alert('Give the section a name.'); const tSel = app.querySelector('#secTeacher'); const sec = Sections.add(name, app.querySelector('#secCourse').value, tSel && tSel.value ? tSel.value : (Staff.isMaster ? null : sid), app.querySelector('#secTerm').value.trim()); Sections.setCurrent(sid, sec.id); sessionStorage.setItem('learnhub.sectionsOpen', '0'); pageSettings(); });
    app.querySelectorAll('[data-section-archive]').forEach(b => b.addEventListener('click', () => { const sec = Sections.byId(b.dataset.sectionArchive); Sections.setArchived(sec.id, !sec.archived); if (sec.archived) Sections.setCurrent(sid, null); pageSettings(); }));
    const cf = app.querySelector('#ovCopyFrom'); if (cf) cf.addEventListener('change', () => { const cur = Sections.currentFor(sid); if (cf.value && confirm('Copy all customisations from that section into ' + cur.name + '? This replaces any customisations ' + cur.name + ' already has.')) { Overlay.copyOverlay(cf.value, cur.id); pageSettings(); } });
    const rs = app.querySelector('#ovReset'); if (rs) rs.addEventListener('click', () => { const cur = Sections.currentFor(sid); if (confirm('Remove every customisation in ' + cur.name + ' and show the program version?')) { Overlay.resetOverlay(cur.id); pageSettings(); } });
  }

  /* ----- Teachers (master only) ----- */
  function teachersHtml() {
    return '<h3>🧑‍🏫 Teachers</h3><p class="muted small">Each teacher gets a 6-digit PIN. When they unlock with it they see only their own sections and students, and can change levels, view work and run exports for them.</p>' +
      (Staff.teachers.length ? Staff.teachers.map(t => '<div class="course-line"><label>👤 ' + esc(t.name) + ' <span class="muted small">(' + Sections.visible(t.id, true).length + ' section' + (Sections.visible(t.id, true).length === 1 ? '' : 's') + ')</span></label><span class="btn-row">' + (Cloud.enabled ? '<span class="tag">ID ' + esc(t.login || '') + '</span>' : '<button class="btn ghost sm" data-teacher-pin="' + t.id + '">Reset PIN</button>') + '<button class="btn ghost sm" data-teacher-remove="' + t.id + '">Remove</button></span></div>').join('') : '<p class="muted small">No teachers yet.</p>') +
      (Cloud.enabled ? '<div class="search-row" style="grid-template-columns:1fr 1fr 1fr auto;margin-top:0.6rem"><input class="text-input" id="teacherName" placeholder="Teacher name"><input class="text-input" id="teacherLogin" placeholder="Teacher ID (sign-in name)"><input class="text-input" id="teacherPin" type="password" placeholder="Password (6+ characters)"><button class="btn secondary" id="teacherAddBtn">＋ Add teacher</button></div><p class="small muted" id="teacherAddStaffMsg" style="margin:0.4rem 0 0">Teachers sign in on any device with their teacher ID and password.</p>'
        : '<div class="btn-row" style="margin-top:0.6rem"><input class="text-input" id="teacherName" placeholder="Teacher name" style="max-width:220px"><input class="text-input pin-input" id="teacherPin" inputmode="numeric" maxlength="6" placeholder="6-digit PIN"><button class="btn secondary" id="teacherAddBtn">＋ Add teacher</button></div>');
  }
  function bindTeachers() {
    const add = app.querySelector('#teacherAddBtn'); if (add) add.addEventListener('click', async () => { const n = app.querySelector('#teacherName').value.trim(), p = app.querySelector('#teacherPin').value.trim(); if (!n) return alert('Enter the teacher\'s name.');
      if (Cloud.enabled) { const msg = app.querySelector('#teacherAddStaffMsg'); try { msg.textContent = 'Creating…'; await Cloud.createStaff({ name: n, login: app.querySelector('#teacherLogin').value, password: p }); pageSettings(); } catch (e) { msg.textContent = e.message; msg.style.color = 'var(--danger)'; } return; }
      if (!/^\d{6}$/.test(p)) return alert('The PIN must be exactly 6 digits.'); if (Staff.unlock(p)) return alert('That PIN is already in use — choose another.'); Staff.addTeacher(n, p); pageSettings(); });
    app.querySelectorAll('[data-teacher-pin]').forEach(b => b.addEventListener('click', () => { const p = (prompt('New 6-digit PIN:') || '').trim(); if (!/^\d{6}$/.test(p)) return; if (Staff.unlock(p)) return alert('That PIN is already in use.'); Staff.updateTeacher(b.dataset.teacherPin, { pin: p }); alert('PIN updated.'); }));
    app.querySelectorAll('[data-teacher-remove]').forEach(b => b.addEventListener('click', () => { const t = Staff.teachers.find(x => x.id === b.dataset.teacherRemove); if (confirm('Remove ' + t.name + '? Their sections stay but have no teacher until you assign one.')) { Staff.removeTeacher(t.id); pageSettings(); } }));
  }

  /* ----- Google Drive / export (master only) ----- */
  function driveHtml() {
    const log = Settings.get('driveLog') || [];
    return '<h3>☁️ Google Drive &amp; exports</h3><p class="muted small">Push student work and achievement to the school\'s Google Drive (a folder called <strong>' + esc(Drive.FOLDER) + '</strong>): a CSV summary (quiz/test scores, assignments handed in, level changes per lesson) and a full JSON export. <strong>Pull</strong> on another device fetches the newest export and merges it in — push at the end of a class on one device, pull on the next, and rosters, levels and work follow you. One-time setup: create an OAuth Client ID in Google Cloud Console (Web application, with this site\'s address as an authorized JavaScript origin) and paste it here.</p>' +
      '<div class="btn-row"><input class="text-input" id="gClientId" placeholder="Google OAuth Client ID (….apps.googleusercontent.com)" value="' + esc(Settings.get('googleClientId') || '') + '" style="max-width:420px"><button class="btn secondary sm" id="gSave">Save</button></div>' +
      '<div class="btn-row" style="margin-top:0.6rem"><button class="btn" id="gPush">☁️ Push to Google Drive now</button><button class="btn secondary" id="gPull">⬇️ Pull latest from Google Drive</button><button class="btn secondary" id="gDownload">⬇️ Download export (CSV + JSON)</button><label class="btn ghost" for="gImport">📥 Import JSON…</label><input type="file" id="gImport" accept="application/json" hidden></div>' +
      '<p class="small muted" id="gStatus" style="margin:0.5rem 0 0"></p>' +
      (log.length ? '<div class="small muted">Last pushes: ' + log.slice(0, 3).map(l => new Date(l.at).toLocaleString() + ' (' + l.students + ' students)').join(' · ') + '</div>' : '');
  }
  function bindDrive() {
    const st = (m, bad) => { const el = app.querySelector('#gStatus'); if (el) { el.textContent = m; el.style.color = bad ? 'var(--danger)' : ''; } };
    const on = (id, fn) => { const el = app.querySelector(id); if (el) el.addEventListener('click', fn); };
    on('#gSave', () => { Settings.set('googleClientId', app.querySelector('#gClientId').value.trim()); st('Client ID saved.'); });
    on('#gDownload', () => { const e = Export.download(); st('Downloaded the export for ' + e.students + ' student' + (e.students === 1 ? '' : 's') + '.'); });
    on('#gPull', async () => { if (!confirm('Pull the latest export from Google Drive and merge it into this device? Students already here keep their names; their progress is replaced by the export.')) return; try { const r = await Drive.pull(st); st('✓ Imported ' + r.students + ' students from ' + r.file + '.'); pageSettings(); } catch (e) { st(e.message, true); } });
    on('#gPush', async () => { try { const r = await Drive.push(st); st('✓ Uploaded ' + r.files.map(f => f.name).join(' and ') + ' for ' + r.students + ' students to "' + Drive.FOLDER + '".'); pageSettings(); } catch (e) { st(e.message, true); } });
    const imp = app.querySelector('#gImport'); if (imp) imp.addEventListener('change', async () => { const f = imp.files[0]; if (!f) return; try { const n = Export.importJson(await f.text()); st('Imported ' + n + ' student' + (n === 1 ? '' : 's') + '.'); pageSettings(); } catch (e) { st('Could not import: ' + e.message, true); } });
  }

  /* ----- Media checklist (inside Teacher Lock) ----- */
  function mediaChecklistHtml() {
    const rows = allCourses().map(c => {
      let total = 0, filled = 0; const missing = [];
      c.units.forEach((u, ui) => (u.lessons || []).forEach((l, li) => (l.media || []).forEach(m => { total++; if (m.src) filled++; else missing.push({ u, ui, l, li, m }); })));
      if (!total) return '';
      const open = sessionStorage.getItem('learnhub.mediaOpen') === c.id;
      return '<div class="plan-course" style="--course:' + esc(c.color || '') + '"><button class="plan-course-head" data-media-open="' + c.id + '"><span>' + c.icon + ' ' + esc(c.title) + '</span><span class="tag' + (filled === total ? ' ok' : ' accent') + '">' + filled + ' of ' + total + ' slots filled</span><span class="muted">' + (open ? '▾' : '▸') + '</span></button>' +
        (open ? '<div class="plan-units"><p class="small muted" style="margin:0.25rem 0 0.5rem">Printable list: <a href="media-guide-' + c.id + '.html" target="_blank" rel="noopener">media-guide-' + c.id + '.html</a> (if it has been uploaded with the app).</p>' +
          (missing.length ? missing.map(x => '<div class="media-row"><div><strong>Unit ' + (x.ui + 1) + ' · Lesson ' + (x.li + 1) + '</strong> · slide ' + (x.m.slide + 1) + ' · ' + (x.m.type === 'video' ? '🎬' : '🖼️') + ' ' + esc(x.m.title) + '</div><div class="small muted">' + esc(x.m.why) + ' — ' + esc(x.m.source) + (x.m.url ? ' · <a href="' + esc(x.m.url) + '" target="_blank" rel="noopener">open</a>' : x.m.search ? ' · search "' + esc(x.m.search) + '"' : '') + '</div></div>').join('') : '<p class="muted small">Every slot has media.</p>') + '</div>' : '') + '</div>';
    }).join('');
    return '<h3>🖼️ Media checklist</h3><p class="muted small">Each lesson suggests where an image or short video helps and a credible source for it. Students only see a slot once you paste a link into its <code>src</code> in the course file. Unlocked teachers also see the empty slots on the slides themselves.</p>' + (rows || '<p class="muted small">No media slots in the loaded courses.</p>');
  }

  /* ----- Students panel (inside Teacher Lock) ----- */
  function studentsInScope() {
    const staff = Staff.current; if (!staff) return [];
    const cur = Sections.currentFor(staff.id);
    if (cur) return Students.list.filter(s => (cur.students || []).includes(s.id));
    if (Staff.isMaster) return Students.list;
    const ids = new Set(); Sections.visible(staff.id, true).forEach(sec => (sec.students || []).forEach(id => ids.add(id)));
    return Students.list.filter(s => ids.has(s.id));
  }
  function studentsPanelHtml() {
    const open = sessionStorage.getItem('learnhub.studentOpen');
    const list = studentsInScope();
    const cur = Sections.currentFor(Staff.current.id);
    const others = cur ? Students.list.filter(s => !(cur.students || []).includes(s.id)) : [];
    const pending = list.filter(s => Object.keys(s.suggestions || {}).length);
    return '<h3>👥 Students' + (cur ? ' · ' + esc(cur.name) : '') + '</h3><p class="muted small">Each student has their own progress, awards and Focus Plan. Set the achievement level, accommodations or Modified band a student works at, choose which courses they see, review level changes and read or listen to their work.</p>' +
      '<div class="level-legend">' + [1, 2, 3, 4].map(l => '<span><strong>Level ' + l + ' · ' + LEVEL_NAMES[l] + '</strong> <span class="muted">' + LEVELS[l].band + ' · ' + LEVELS[l].short + '</span></span>').join('') + '</div>' +
      (pending.length ? '<div class="plan-banner">💡 <strong>Level suggestions waiting:</strong> ' + pending.map(s => esc(s.name)).join(', ') + ' — based on recent test results. Open the student to apply or dismiss.</div>' : '') +
      '<div class="student-list">' + list.map(s => {
        const isOpen = open === s.id, isMe = Students.current && Students.current.id === s.id;
        const sugg = Object.entries(s.suggestions || {});
        return '<div class="student-row' + (isOpen ? ' open' : '') + '"><button class="student-head" data-student-open="' + s.id + '">' + avatarHtml(s) + '<span class="student-name">' + esc(s.name) + (isMe ? ' <span class="tag ok">signed in</span>' : '') + '</span>' +
          (s.number ? '<span class="tag">#' + esc(s.number) + '</span>' : '') + '<span class="tag">Level ' + s.level + ' · ' + LEVEL_NAMES[s.level] + '</span>' + (Array.isArray(s.courses) ? '<span class="tag">' + s.courses.length + ' course' + (s.courses.length === 1 ? '' : 's') + (s.coursesLocked ? ' 🔒' : '') + '</span>' : '<span class="tag">all courses</span>') +
          (sugg.length ? '<span class="tag accent">💡 ' + sugg.length + '</span>' : '') + '<span class="muted">' + (isOpen ? '▾' : '▸') + '</span>' + (Cloud.enabled ? '<span class="small muted row-stamp">' + profileStamp(s) + '</span>' : '') + '</button>' +
          (isOpen ? '<div class="student-body">' +
            '<div class="save-bar"><span class="muted small" id="saveMsg-' + s.id + '">' + (Cloud.enabled ? 'Changes save automatically. Press Save to send them to the cloud right away.' : 'Changes save on this device as you make them.') + '</span><button class="btn sm" data-save-student="' + s.id + '">💾 Save changes</button></div>' +
            (Cloud.enabled ? '<div class="plan-section"><div class="plan-label">🔑 Account</div><div class="course-line"><span>Student number <strong>' + esc(s.number || '—') + '</strong> · birthday <strong>' + esc(s.dob || '—') + '</strong> · password = birthday as DDMMYYYY' + (s.dob ? ' (<code>' + Cloud.dobPassword(s.dob) + '</code>)' : '') + '</span><span class="btn-row"><input class="text-input" type="date" data-fix-dob="' + s.id + '" style="max-width:170px" title="Correct birthday"><button class="btn ghost sm" data-fix-dob-go="' + s.id + '">Fix birthday / reset password</button></span></div></div>' : '') +
            (sugg.length ? '<div class="plan-section"><div class="plan-label">💡 Suggested level changes (from test results)</div>' + sugg.map(([cid, g]) => { const c = findCourse(cid); return '<div class="suggestion"><span>' + (c ? c.icon + ' ' + esc(c.title) : esc(cid)) + ': <strong>Level ' + g.from + ' → Level ' + g.level + '</strong> <span class="muted small">(' + g.pct + '% on ' + esc(g.unit) + ', ' + new Date(g.at).toLocaleDateString() + ')</span></span><span class="btn-row"><button class="btn sm success" data-sugg-apply="' + s.id + '" data-c="' + cid + '" data-l="' + g.level + '">Apply</button><button class="btn sm ghost" data-sugg-dismiss="' + s.id + '" data-c="' + cid + '">Dismiss</button></span></div>'; }).join('') + '</div>' : '') +
            '<div class="plan-section"><div class="plan-label">Default achievement level</div><div class="level-cards compact">' + [1, 2, 3, 4].map(l => '<button class="level-card ' + (s.level === l ? 'on' : '') + '" data-set-level="' + s.id + '" data-l="' + l + '"><h3>Level ' + l + ' · ' + LEVEL_NAMES[l] + '</h3><p>' + LEVEL_DESC[l] + '</p></button>').join('') + '</div></div>' +
            '<div class="plan-section"><div class="plan-label">Courses and level per course</div><p class="muted small" style="margin:0 0 0.5rem">Tick the courses this student sees. "Default" uses the level above; pick a number to set a different level for that course only.</p>' +
            allCourses().map(c => { const on = Students.enrolled(c.id, s); const cl = (s.courseLevels || {})[c.id] || '';
              return '<div class="course-line' + (on ? '' : ' off') + '"><label><input type="checkbox" data-enrol="' + s.id + '" data-c="' + c.id + '"' + (on ? ' checked' : '') + '> ' + c.icon + ' ' + esc(c.title) + '</label>' +
                (on ? '<div class="seg">' + [['', 'Default'], [1, '1'], [2, '2'], [3, '3'], [4, '4']].map(o => '<button data-course-level="' + s.id + '" data-c="' + c.id + '" data-v="' + o[0] + '" class="' + (String(cl) === String(o[0]) ? 'on' : '') + '">' + o[1] + '</button>').join('') + '</div>' : '') + '</div>'; }).join('') +
            sw('', 'Lock the course list', 'On: the student cannot add courses from the home page.', s.coursesLocked, 'data-lock-courses="' + s.id + '"') + '</div>' +
            '<div class="plan-section"><div class="plan-label">Modified program (not for credit)</div><p class="muted small" style="margin:0 0 0.4rem">Serves every lesson at a much earlier level, with its own questions and assignments. Standard = the Level 1–4 framework above.</p>' +
            allCourses().filter(c => Students.enrolled(c.id, s)).map(c => { const t = Students.trackFor(c.id, s); return '<div class="course-line"><label>' + c.icon + ' ' + esc(c.title) + '</label><div class="seg">' + [['', 'Standard'], ['k2', 'K–2'], ['g35', 'Gr 3–5'], ['g68', 'Gr 6–8']].map(o => '<button data-track="' + s.id + '" data-c="' + c.id + '" data-v="' + o[0] + '" class="' + ((t ? t.band : '') === o[0] ? 'on' : '') + '">' + o[1] + '</button>').join('') + '</div></div>'; }).join('') + '</div>' +
            levelHistoryHtml(s) +
            '<div class="plan-section"><div class="plan-label">Accommodations (quizzes and tests)</div>' +
            sw('', 'Reduction', 'Fewer questions per quiz and test (about 60%).', (s.accommodations || {}).reduce, 'data-accom="reduce" data-s="' + s.id + '"') +
            sw('', 'Complexity', 'Answer choices and word banks from one level down; no typed blanks.', (s.accommodations || {}).simplify, 'data-accom="simplify" data-s="' + s.id + '"') +
            sw('', 'Chunking', 'Matching shown three pairs at a time; word banks of at most three.', (s.accommodations || {}).chunk, 'data-accom="chunk" data-s="' + s.id + '"') + '</div>' +
            workHtml(s) + recordingsHtml(s) +
            (cur ? '<div class="plan-section"><button class="btn ghost sm" data-unenrol="' + s.id + '" data-sec="' + cur.id + '">Remove from ' + esc(cur.name) + '</button></div>' : '') +
            '<div class="plan-section btn-row"><button class="btn ghost sm" data-rename="' + s.id + '">Rename</button><button class="btn ghost sm" data-reset-student="' + s.id + '">Reset progress</button><button class="btn ghost sm" data-delete="' + s.id + '">Remove student</button></div>' +
          '</div>' : '') + '</div>';
      }).join('') + '</div>' +
      (Cloud.enabled
        ? '<div class="plan-unit" style="margin-top:0.75rem"><div class="plan-label">＋ Add a new student' + (cur ? ' to ' + esc(cur.name) : '') + '</div><p class="muted small" style="margin:0 0 0.5rem">This creates the student\'s account. They sign in on any device with their student number and their birthday as the password (DDMMYYYY).</p><div class="search-row" style="grid-template-columns:1fr 1fr 1fr auto"><input class="text-input" id="teacherAddName" maxlength="30" placeholder="First name"><input class="text-input" id="teacherAddNumber" placeholder="Student number" inputmode="numeric"><input class="text-input" id="teacherAddDob" type="date" title="Birthday"><button class="btn secondary" id="teacherAdd">＋ Add student</button></div><p class="small muted" id="teacherAddMsg" style="margin:0.4rem 0 0"></p>' +
          (cur && others.length ? '<select class="text-input" id="enrolExisting" style="max-width:300px;margin-top:0.5rem"><option value="">Add an existing student…</option>' + others.map(o => '<option value="' + o.id + '">' + o.avatar + ' ' + esc(o.name) + (o.number ? ' · ' + esc(o.number) : '') + '</option>').join('') + '</select>' : '') + '</div>'
        : '<div class="btn-row" style="margin-top:0.75rem"><input class="text-input" id="teacherAddName" maxlength="30" placeholder="Add a new student by first name" style="max-width:280px"><button class="btn secondary" id="teacherAdd">＋ Add student' + (cur ? ' to ' + esc(cur.name) : '') + '</button>') +
      (!Cloud.enabled && cur && others.length ? '<select class="text-input" id="enrolExisting" style="max-width:260px"><option value="">Add an existing student…</option>' + others.map(o => '<option value="' + o.id + '">' + o.avatar + ' ' + esc(o.name) + '</option>').join('') + '</select>' : '') + (Cloud.enabled ? '' : '</div>');
  }
  function levelHistoryHtml(s) {
    const rows = [];
    allCourses().forEach(c => { const log = (s.levelLog || {})[c.id] || []; const ll = (s.lessonLevels || {})[c.id] || {};
      if (!log.length && !Object.keys(ll).length) return;
      rows.push('<div class="work-item"><div class="work-head"><strong>' + c.icon + ' ' + esc(c.title) + '</strong> <span class="muted small">now Level ' + Students.levelFor(c.id, s) + '</span></div>' +
        (Object.keys(ll).length ? '<div class="small">Quizzes passed at: ' + Object.keys(ll).sort((a, b) => a - b).map(k => 'L' + (+k + 1) + ' → Level ' + ll[k].level + ' (' + ll[k].pct + '%)').join(' · ') + '</div>' : '') +
        (log.length ? '<div class="small muted">' + log.slice(-6).map(e => new Date(e.at).toLocaleDateString() + ': Level ' + e.from + ' → ' + e.to + ' (' + e.by + (e.reason ? ', ' + e.reason : '') + (e.lesson !== undefined ? ', after lesson ' + (e.lesson + 1) : '') + (e.pct !== undefined ? ', ' + e.pct + '%' : '') + ')').join('<br>') + '</div>' : '') + '</div>');
    });
    return '<div class="plan-section"><div class="plan-label">📈 Level history (for grading)</div>' + (rows.length ? rows.join('') : '<p class="muted small">No level changes or passed quizzes yet. Students are offered a move up after 85%+ on a quiz, or a move down when they score below their level\'s band; they can go back any time but never skip a level.</p>') + '</div>';
  }
  function recordingsHtml(s) {
    const open = sessionStorage.getItem('learnhub.recOpen') === s.id;
    return '<div class="plan-section"><button class="btn ghost sm" data-rec-open="' + s.id + '">' + (open ? '▾' : '▸') + ' Voice recordings</button>' + (open ? '<div id="recList-' + s.id + '" class="small muted">Loading…</div>' : '') + '</div>';
  }
  async function fillRecordings(s) {
    const host = app.querySelector('#recList-' + s.id); if (!host) return;
    let ks = []; try { ks = await Media.keys(s.id + '/'); } catch (e) {}
    if (!ks.length) { host.textContent = 'No recordings yet.'; return; }
    host.innerHTML = ks.map(k => { const p = String(k).split('/'); const c = findCourseAll(p[1]); const un = c && c.units.find(u => u.id === p[2]); const les = un && un.lessons[+p[3]];
      return '<div class="work-item"><div class="work-head"><strong>' + (p[4] === 'note' ? '🎙️ Voice note' : '🎙️ Assignment ' + (parseInt(p[4].slice(1), 10) + 1) + ' answer') + '</strong> <span class="muted small">' + (c ? c.icon + ' ' + esc(c.title) : esc(p[1])) + (les ? ' · ' + esc(les.title) : '') + '</span></div><div data-recorder="' + esc(k) + '" data-readonly="1"></div></div>'; }).join('');
    Media.mountRecorders(host);
  }
  /** A student's handed-in and draft assignment work (teacher view). */
  function workHtml(s) {
    const prog = Progress.peek(s.id); const items = [];
    allCourses().forEach(c => c.units.forEach(un => { const u = (prog[c.id] || {})[un.id]; if (!u || !u.work) return;
      Object.keys(u.work).forEach(li => Object.keys(u.work[li]).forEach(n => { const w = u.work[li][n]; if (!w || !w.text) return; const les = un.lessons[li]; const a = les && (les.assignments || [])[n];
        items.push({ course: c, unit: un, les, a, w, li, n }); })); }));
    const open = sessionStorage.getItem('learnhub.workOpen') === s.id;
    return studentFocusHtml(s) + '<div class="plan-section"><button class="btn ghost sm" data-work-open="' + s.id + '">' + (open ? '▾' : '▸') + ' Assignment work (' + items.filter(x => x.w.done).length + ' handed in, ' + items.filter(x => !x.w.done).length + ' drafts)</button>' +
      (open ? (items.length ? items.map(x => '<div class="work-item' + (x.w.done ? ' done' : '') + '"><div class="work-head"><strong>' + esc(x.a ? x.a.title : 'Assignment') + '</strong> <span class="muted small">' + x.course.icon + ' ' + esc(x.les ? x.les.title : '') + ' · ' + (x.w.done ? '✓ handed in' : 'draft') + ' · ' + new Date(x.w.at).toLocaleString() + '</span></div><div class="work-text">' + esc(x.w.text) + '</div></div>').join('') : '<p class="muted small">No written work yet.</p>') : '') + '</div>';
  }
  function bindStudentsPanel() {
    const on = (sel, ev, fn) => app.querySelectorAll(sel).forEach(el => el.addEventListener(ev, fn));
    on('[data-track]', 'click', e => { const b = e.currentTarget; Students.setTrack(b.dataset.track, b.dataset.c, b.dataset.v || null); pageSettings(); });
    on('[data-rec-open]', 'click', e => { const id = e.currentTarget.dataset.recOpen; sessionStorage.setItem('learnhub.recOpen', sessionStorage.getItem('learnhub.recOpen') === id ? '' : id); pageSettings(); });
    on('[data-unenrol]', 'click', e => { const b = e.currentTarget; Sections.enrol(b.dataset.sec, b.dataset.unenrol, false); pageSettings(); });
    const ex = app.querySelector('#enrolExisting'); if (ex) ex.addEventListener('change', () => { if (ex.value) { Sections.enrol(Sections.currentFor(Staff.current.id).id, ex.value, true); pageSettings(); } });
    Students.list.forEach(s => { if (sessionStorage.getItem('learnhub.recOpen') === s.id && app.querySelector('#recList-' + s.id)) fillRecordings(s); });
    on('[data-accom]', 'click', e => { const b = e.currentTarget, s = Students.byId(b.dataset.s); s.accommodations = s.accommodations || {}; s.accommodations[b.dataset.accom] = !s.accommodations[b.dataset.accom]; Students.save(); pageSettings(); });
    on('[data-media-open]', 'click', e => { const id = e.currentTarget.dataset.mediaOpen; sessionStorage.setItem('learnhub.mediaOpen', sessionStorage.getItem('learnhub.mediaOpen') === id ? '' : id); pageSettings(); });
    on('[data-work-open]', 'click', e => { const id = e.currentTarget.dataset.workOpen; sessionStorage.setItem('learnhub.workOpen', sessionStorage.getItem('learnhub.workOpen') === id ? '' : id); pageSettings(); });
    on('[data-student-open]', 'click', e => { const id = e.currentTarget.dataset.studentOpen; sessionStorage.setItem('learnhub.studentOpen', sessionStorage.getItem('learnhub.studentOpen') === id ? '' : id); pageSettings(); });
    on('[data-set-level]', 'click', e => { Students.setLevel(e.currentTarget.dataset.setLevel, null, +e.currentTarget.dataset.l); pageSettings(); });
    on('[data-course-level]', 'click', e => { const b = e.currentTarget; Students.setLevel(b.dataset.courseLevel, b.dataset.c, b.dataset.v ? +b.dataset.v : null); pageSettings(); });
    on('[data-enrol]', 'change', e => { const b = e.target, s = Students.byId(b.dataset.enrol); let list = Array.isArray(s.courses) ? s.courses.slice() : allCourses().map(c => c.id);
      list = b.checked ? list.concat(b.dataset.c) : list.filter(x => x !== b.dataset.c); Students.setCourses(s.id, list); pageSettings(); });
    on('[data-lock-courses]', 'click', e => { const s = Students.byId(e.currentTarget.dataset.lockCourses); Students.setCourses(s.id, Array.isArray(s.courses) ? s.courses : allCourses().map(c => c.id), !s.coursesLocked); pageSettings(); });
    on('[data-sugg-apply]', 'click', e => { const b = e.currentTarget; Students.setLevel(b.dataset.suggApply, b.dataset.c, +b.dataset.l); pageSettings(); });
    on('[data-sugg-dismiss]', 'click', e => { const b = e.currentTarget, s = Students.byId(b.dataset.suggDismiss); delete s.suggestions[b.dataset.c]; Students.save(); pageSettings(); });
    on('[data-rename]', 'click', e => { const s = Students.byId(e.currentTarget.dataset.rename); const v = prompt('New name for ' + s.name + ':', s.name); if (v && v.trim()) { Students.update(s.id, { name: v.trim().slice(0, 30) }); renderWho(); pageSettings(); } });
    on('[data-reset-student]', 'click', e => { const s = Students.byId(e.currentTarget.dataset.resetStudent); if (confirm('Erase all of ' + s.name + '\'s progress and awards?')) { Progress.resetFor(s.id); pageSettings(); } });
    on('[data-delete]', 'click', e => { const s = Students.byId(e.currentTarget.dataset.delete); if (confirm('Remove ' + s.name + ' and all of their progress? This cannot be undone.')) { const wasMe = Students.current && Students.current.id === s.id; Students.removeStudent(s.id); if (wasMe) { renderWho(); location.hash = '#/welcome'; } else pageSettings(); } });
    const add = async () => {
      const v = (app.querySelector('#teacherAddName').value || '').trim(); if (!v) return;
      const cur = Sections.currentFor(Staff.current.id);
      if (Cloud.enabled) {
        const number = app.querySelector('#teacherAddNumber').value.trim(), dob = app.querySelector('#teacherAddDob').value, msg = app.querySelector('#teacherAddMsg');
        msg.textContent = 'Creating the account…'; msg.style.color = '';
        try { const s = await Cloud.createStudent({ name: v, number, dob, level: 2, courses: cur ? [cur.courseId] : null }); if (cur) Sections.enrol(cur.id, s.id, true); sessionStorage.setItem('learnhub.studentOpen', s.id); pageSettings(); }
        catch (e) { msg.textContent = e.message; msg.style.color = 'var(--danger)'; }
        return;
      }
      const s = Students.add(v); if (cur) { Students.setCourses(s.id, [cur.courseId]); Sections.enrol(cur.id, s.id, true); } sessionStorage.setItem('learnhub.studentOpen', s.id); pageSettings(); };
    on('[data-save-student]', 'click', async e => { const id = e.currentTarget.dataset.saveStudent, msg = app.querySelector('#saveMsg-' + id), b = e.currentTarget; b.disabled = true; b.textContent = 'Saving…';
      const TEACH = ['level', 'courses', 'courseLevels', 'coursesLocked', 'accommodations', 'track', 'name'];
      const snap = o => JSON.stringify(TEACH.map(k => o[k] === undefined ? null : o[k]));
      try {
        if (Cloud.enabled) {
          const want = snap(Students.byId(id));
          await Cloud.flushNow();
          const doc = await Cloud.verifyStudent(id);               // read back from the server, never the cache
          if (snap(doc) !== want) throw new Error('the cloud copy (Profile v' + (+doc.rev || 0) + ') does not match what you set here, so the change did not land. Check the cloud status at the top of Settings, then try again.');
          msg.innerHTML = '✓ Confirmed by the cloud ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) + ' · ' + profileStamp(doc) + ' — the student sees it on their next screen.';
        } else msg.textContent = '✓ Saved.';
        const st = app.querySelector('[data-student-open="' + id + '"] .row-stamp'); if (st) st.innerHTML = profileStamp(Students.byId(id));
      }
      catch (err) { msg.textContent = '⚠️ Not confirmed: ' + err.message; }
      b.disabled = false; b.textContent = '💾 Save changes'; });
    app.querySelectorAll('details.student-focus').forEach(d => d.addEventListener('toggle', () => sessionStorage.setItem('learnhub.focusOpen', d.open ? '1' : '0')));
    const fo = sessionStorage.getItem('learnhub.focusOpen'); if (fo === '1') app.querySelectorAll('details.student-focus').forEach(d => d.open = true);
    on('[data-fix-dob-go]', 'click', async e => { const id = e.currentTarget.dataset.fixDobGo, s = Students.byId(id), inp = app.querySelector('[data-fix-dob="' + id + '"]'); if (!inp.value) return alert('Pick the correct birthday first.'); try { e.currentTarget.textContent = 'Updating…'; await Cloud.fixStudentBirthday(s, inp.value); alert('Done. ' + s.name + ' now signs in with ' + Cloud.dobPassword(inp.value) + '.'); pageSettings(); } catch (err) { alert(err.message); pageSettings(); } });
    const b = app.querySelector('#teacherAdd'); if (b) b.addEventListener('click', add);
    const i = app.querySelector('#teacherAddName'); if (i) i.addEventListener('keydown', e => { if (e.key === 'Enter') add(); });
  }

  /* ----- Updates card ----- */
  async function renderUpdatesCard() {
    const card = app.querySelector('#updatesCard'); if (!card) return;
    if (!window.PWA) { setTimeout(renderUpdatesCard, 100); return; }
    const draw = (latest, checking) => {
      if (!app.querySelector('#updatesCard')) return;
      const help = card.closest('details') && card.closest('details').querySelector('.sg-help'); if (help) help.textContent = 'version ' + PWA.APP_VERSION + (latest ? ' · update available' : '');
      card.innerHTML = '<div class="setting-row" style="padding-top:1rem"><div><label>This device</label><div class="help">Version ' + esc(PWA.APP_VERSION) + (latest ? ' — <strong>version ' + esc(latest.version) + ' is available</strong>' + (latest.date ? ' (' + esc(latest.date) + ')' : '') + (latest.notes ? ': ' + esc(latest.notes) : '') : checking ? ' — checking…' : ' — up to date') + '</div></div>' +
        '<div class="btn-row">' + (latest ? '<button class="btn success" id="updNow">⬆️ Update now</button>' : '') + '<button class="btn secondary sm" id="updCheck"' + (checking ? ' disabled' : '') + '>Check for updates</button></div></div>' +
        '<p class="muted small" style="margin:0.5rem 0 0">Updating fetches the newest files from the site and reloads. Your progress and profiles stay on the device.</p>';
      const n = card.querySelector('#updNow'); if (n) n.addEventListener('click', () => PWA.applyUpdate());
      const c = card.querySelector('#updCheck'); if (c) c.addEventListener('click', async () => { draw(null, true); draw(await PWA.checkForUpdate(), false); });
    };
    draw(PWA.latest, true); draw(await PWA.checkForUpdate(), false);
  }

  /* ----- App card (install / uninstall / diagnostics) ----- */
  async function renderAppCard() {
    const card = app.querySelector('#appCard'); if (!card) return;
    if (!window.PWA) { setTimeout(renderAppCard, 100); return; }   // pwa.js loads after app.js
    const d = await PWA.diagnostics();
    if (!app.querySelector('#appCard')) return;
    const ok = v => v ? '<span class="tag ok">✓ OK</span>' : '<span class="tag" style="background:var(--danger-soft);color:var(--danger)">✕ Missing</span>';
    const rows = d.installed ? '' :
      '<div class="setting-row"><div><label>Website check</label><div class="help">Everything below must be ✓ for the browser to offer a proper install. A missing item means that file is not uploaded to the website.</div></div>' +
      '<div class="small" style="display:grid;gap:0.3rem;text-align:right">' +
      '<div>HTTPS ' + ok(d.https) + '</div><div>manifest.json ' + ok(d.manifest) + '</div><div>icon-192.png ' + ok(d.icon192) + '</div><div>icon-512.png ' + ok(d.icon512) + '</div><div>sw.js (offline) ' + ok(d.sw) + '</div>' +
      Object.keys(d).filter(k => k.startsWith('file:') && !d[k]).map(k => '<div>' + esc(k.slice(5)) + ' ' + ok(false) + '</div>').join('') + '</div></div>';
    card.innerHTML = '<div class="setting-row" style="padding-top:0"><div><label>Status</label><div class="help">' + (d.standalone ? 'You are using the installed app.' : d.installed ? 'LearnHub is installed on this device. Open it from your home screen or app list.' : 'LearnHub is not installed on this device yet. Installing adds an icon and lets it work offline.') + '</div></div>' +
      (d.installed ? '<span class="tag ok">Installed</span>' : '<span class="tag">Not installed</span>') + '</div>' + rows +
      '<div class="btn-row" style="margin-top:0.75rem">' +
      (d.installed ? '<button class="btn secondary" id="appUninstall">Uninstall…</button><button class="btn ghost" id="appForget">Not installed here? Reset</button>'
                   : '<button class="btn" id="appInstall">⬇️ Install LearnHub</button><button class="btn ghost" id="appHow">How to install</button>') + '</div>';
    const on = (id, fn) => { const el = card.querySelector(id); if (el) el.addEventListener('click', fn); };
    on('#appInstall', async () => { await PWA.install(); renderAppCard(); });
    on('#appHow', () => PWA.installHelp());
    on('#appUninstall', () => PWA.uninstallHelp());
    on('#appForget', () => { PWA.forget(); renderAppCard(); });
  }

  /* ----- Keyword → lessons search (inside Teacher Lock) ----- */
  const searchState = { course: '', unit: '', q: '' };
  function lessonSearchHtml() {
    const fp = FP();
    const course = findCourseAll(searchState.course) || allCourses()[0]; if (!course) return '<p class="muted">No courses yet.</p>';
    searchState.course = course.id;
    const unit = course.units.find(u => u.id === searchState.unit) || course.units[0]; if (!unit) return '';
    searchState.unit = unit.id;
    const q = searchState.q.trim().toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);
    const hits = q ? unit.lessons.map((les, i) => ({ i, les, text: lessonText(les) })).filter(x => words.every(w => x.text.includes(w))) : [];
    const f = fp.unitEntry(course.id, unit.id);
    return '<div class="search-row">' +
      '<select class="text-input" id="searchCourse">' + allCourses().map(c => '<option value="' + c.id + '"' + (c.id === course.id ? ' selected' : '') + '>' + c.icon + ' ' + esc(c.title) + '</option>').join('') + '</select>' +
      '<select class="text-input" id="searchUnit">' + course.units.map(u => '<option value="' + u.id + '"' + (u.id === unit.id ? ' selected' : '') + '>' + esc(u.title) + '</option>').join('') + '</select>' +
      '<input class="text-input" id="searchQ" placeholder="Keyword, e.g. capital letter" value="' + esc(searchState.q) + '"><button class="btn" id="searchGo">Search</button></div>' +
      (q ? (hits.length
        ? '<div class="search-hits">' + hits.map(h => '<div class="search-hit"><span class="tag">Lesson ' + (h.i + 1) + '</span> <strong>' + esc(h.les.title) + '</strong><div class="muted small">' + esc(snippet(h.text, words[0])) + '</div></div>').join('') + '</div>' +
          '<div class="btn-row" style="margin-top:0.75rem"><button class="btn success" id="searchApply">' + (hits.length === 1 ? 'Show only this 1 lesson to the student' : 'Show only these ' + hits.length + ' lessons to the student') + '</button>' +
          (f ? '<span class="muted small">This unit is already in the Focus Plan — applying replaces its lesson list.</span>' : '<span class="muted small">This turns the Focus Plan on and adds this unit.</span>') + '</div>'
        : '<p class="muted">No lessons in <strong>' + esc(unit.title) + '</strong> mention "' + esc(searchState.q) + '".</p>') : '');
  }
  function snippet(text, word) {
    const i = text.indexOf(word); if (i < 0) return '';
    const a = Math.max(0, i - 50), b = Math.min(text.length, i + 70);
    return (a ? '…' : '') + text.slice(a, b).replace(/\s*\n\s*/g, ' ').replace(/\*\*/g, '') + (b < text.length ? '…' : '');
  }
  function bindLessonSearch() {
    const fp = FP();
    const g = id => app.querySelector(id);
    if (!g('#searchCourse')) return;
    g('#searchCourse').addEventListener('change', e => { searchState.course = e.target.value; searchState.unit = ''; pageSettings(); });
    g('#searchUnit').addEventListener('change', e => { searchState.unit = e.target.value; pageSettings(); });
    const run = () => { searchState.q = g('#searchQ').value; pageSettings(); };
    g('#searchGo').addEventListener('click', run);
    g('#searchQ').addEventListener('keydown', e => { if (e.key === 'Enter') run(); });
    const ap = g('#searchApply');
    if (ap) ap.addEventListener('click', () => {
      const course = findCourseAll(searchState.course), unit = course.units.find(u => u.id === searchState.unit);
      const words = searchState.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
      const idx = unit.lessons.map((les, i) => ({ i, t: lessonText(les) })).filter(x => words.every(w => x.t.includes(w))).map(x => x.i).sort((a, b) => a - b);
      fp.includeUnit(course.id, unit.id, true);
      fp.unitEntry(course.id, unit.id).lessons = idx.length === unit.lessons.length ? null : idx;
      fp.save(); fp.setEnabled(true);
      sessionStorage.setItem('learnhub.planOpen', course.id);
      pageSettings();
    });
  }

  /* ----- Focus Plan editor (inside Settings) ----- */
  function focusPlanHtml(locked) {
    const fp = FP();
    const dis = locked ? ' disabled' : '';
    const chip = (on, attrs, label) => '<button class="chip' + (on ? ' on' : '') + '" ' + attrs + dis + '>' + esc(label) + '</button>';
    const body = allCourses().map(c => {
      const entry = fp.courseEntry(c.id);
      const open = sessionStorage.getItem('learnhub.planOpen') === c.id;
      return '<div class="plan-course" style="--course:' + esc(c.color || '') + '"><button class="plan-course-head" data-plan-open="' + c.id + '">' +
        '<span>' + c.icon + ' ' + esc(c.title) + '</span><span class="tag' + (entry ? ' accent' : '') + '">' + (entry ? Object.keys(entry.units).length + ' of ' + c.units.length + ' units' : 'Whole course') + '</span><span class="muted">' + (open ? '▾' : '▸') + '</span></button>' +
        (open ? '<div class="plan-units">' + c.units.map(u => {
          const f = fp.unitEntry(c.id, u.id);
          const lessons = u.lessons.map((l, i) => ({ i, title: l.title }));
          const terms = allTermKeys(u), cats = catsOf(u);
          const inList = (field, v, all) => !f ? false : (f[field] === null || f[field] === undefined ? field !== 'goals' : f[field].some(x => String(x) === String(v)));
          const T = (field, v, all, label) => chip(inList(field, v, all), 'data-plan-toggle="' + field + '" data-c="' + c.id + '" data-u="' + u.id + '" data-v="' + esc(v) + '"', label);
          return '<div class="plan-unit' + (f ? ' on' : '') + '"><label class="plan-unit-head"><input type="checkbox" data-plan-unit="' + c.id + '" data-u="' + u.id + '"' + (f ? ' checked' : '') + dis + '> <strong>' + esc(u.title) + '</strong></label>' +
            (f ? '<div class="plan-section"><div class="plan-label">Lessons</div><div class="word-bank">' + lessons.map(l => T('lessons', l.i, lessons.map(x => x.i), l.title)).join('') + '</div></div>' +
                 (terms.length ? '<div class="plan-section"><div class="plan-label">Words to learn</div><div class="word-bank">' + terms.map(t => T('terms', t, terms, t)).join('') + '</div></div>' : '') +
                 (cats.length ? '<div class="plan-section"><div class="plan-label">Question topics</div><div class="word-bank">' + cats.map(k => T('cats', k, cats, k)).join('') + '</div></div>' : '') +
                 '<div class="plan-section"><div class="plan-label">Goals to work toward</div><div class="word-bank">' + Object.keys(GOAL_LABELS).map(g => T('goals', g, Object.keys(GOAL_LABELS), GOAL_LABELS[g][0] + ' ' + GOAL_LABELS[g][1])).join('') + '</div></div>'
               : '') + '</div>';
        }).join('') + '</div>' : '') + '</div>';
    }).join('');
    const me = planStudent();
    return '<div class="setting-row" style="padding-top:0"><div><h3 style="margin:0">🎯 Focus Plan for ' + esc(me.name) + '</h3><div class="help">For a student working well below grade level: choose exactly which units, lessons, words and question topics they see, and the goals they work toward. Everything else is hidden for them.</div></div>' +
      '<button class="switch ' + (fp.enabled ? 'on' : '') + '" id="focusSwitch" role="switch" aria-checked="' + fp.enabled + '"' + dis + '></button></div>' +
      '<p class="muted small">Tick a unit to add it to the plan, then narrow it down. Leaving every lesson, word or topic selected means "all of them". A course with no ticked units is shown in full.</p>' +
      body;
  }
  function bindFocusPlan(locked) {
    const fp = FP();
    const on = (sel, fn) => app.querySelectorAll(sel).forEach(el => el.addEventListener(el.type === 'checkbox' ? 'change' : 'click', fn));
    on('[data-plan-open]', e => { const id = e.currentTarget.dataset.planOpen; sessionStorage.setItem('learnhub.planOpen', sessionStorage.getItem('learnhub.planOpen') === id ? '' : id); pageSettings(); });
    if (locked) return;
    const fs = app.querySelector('#focusSwitch'); if (fs) fs.addEventListener('click', () => { fp.setEnabled(!fp.enabled); pageSettings(); });
    on('[data-plan-unit]', e => { fp.includeUnit(e.target.dataset.planUnit, e.target.dataset.u, e.target.checked); pageSettings(); });
    on('[data-plan-toggle]', e => {
      const b = e.currentTarget, course = findCourseAll(b.dataset.c), unit = course.units.find(x => x.id === b.dataset.u);
      const field = b.dataset.planToggle;
      const all = field === 'lessons' ? unit.lessons.map((_, i) => i) : field === 'terms' ? allTermKeys(unit) : field === 'cats' ? catsOf(unit) : Object.keys(GOAL_LABELS);
      fp.toggle(course.id, unit.id, field, field === 'lessons' ? +b.dataset.v : b.dataset.v, all);
      pageSettings();
    });
  }
  function findCourseAll(id) { return allCourses().find(c => c.id === id); }
  /** Focus Plan + keyword search for one student, inside their row in Settings → Students. */
  function studentFocusHtml(s) {
    sessionStorage.setItem('learnhub.planStudent', s.id);
    const fp = Focus.forStudent(s.id); const on = fp && fp.enabled && Object.keys(fp.data ? fp.data.courses || {} : fp.courses || {}).length;
    return '<details class="plan-section student-focus" data-student-focus="' + s.id + '"><summary class="plan-label" style="cursor:pointer">🎯 Focus Plan &amp; keyword search ' + (on ? '<span class="tag accent">on</span>' : '<span class="tag">off</span>') + ' <span class="muted small" style="font-weight:600;text-transform:none;letter-spacing:0">— tap to open</span></summary>' +
      '<div style="margin-top:0.5rem"><h3>🔍 Find lessons by keyword</h3><p class="muted small">Pick a unit and type a word or phrase. Lessons that mention it are listed in order; apply them and <strong>' + esc(s.name) + '</strong> sees only those lessons for that unit.</p>' + lessonSearchHtml() + '<div class="teacher-section">' + focusPlanHtml(false) + '</div></div></details>';
  }
  /** The student whose Focus Plan / lesson search a teacher is editing (defaults to the signed-in student). */
  function planStudent() { const id = sessionStorage.getItem('learnhub.planStudent'); const s = id && Students.byId(id); return s && studentsInScope().some(x => x.id === s.id) ? s : Students.current; }
  function FP() { return Focus.forStudent(planStudent().id); }
  function planPickerHtml() {
    const me = planStudent(), list = studentsInScope();
    if (list.length < 2) return '';
    return '<div class="setting-row" style="padding-top:0"><div><label>Editing for</label><div class="help">The Focus Plan and keyword search below apply to this student.</div></div><select class="text-input" id="planStudent" style="max-width:260px">' + list.map(x => '<option value="' + x.id + '"' + (x.id === me.id ? ' selected' : '') + '>' + x.avatar + ' ' + esc(x.name) + (Students.current && Students.current.id === x.id ? ' (signed in)' : '') + '</option>').join('') + '</select></div>';
  }

  function notFound() { app.innerHTML = '<div class="empty"><h2>Page not found</h2><a class="btn" href="#/">Back to courses</a></div>'; }

  /* ---------- router ---------- */
  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    window.scrollTo(0, 0);
    delete document.body.dataset.page;
    window.LH.stopSpeaking();   // leaving a page stops any reading
    renderWho();
    document.querySelectorAll('.topnav a').forEach(a => a.classList.remove('active'));
    // A fresh open of the app always starts on the welcome screen; "Continue as …" is offered when a
    // profile was left signed in on this device. Once a tile is tapped the session proceeds normally.
    // every collapsible area starts closed when a screen is opened
    // (a redraw of the same screen — a setting changed, data arrived from the cloud — keeps them as they are)
    if (location.hash !== route.last) Object.keys(sessionStorage).filter(k => /^learnhub\.(sg\.|studentOpen|workOpen|recOpen|mediaOpen|planOpen|sectionsOpen|focusOpen)/.test(k)).forEach(k => sessionStorage.removeItem(k));
    route.last = location.hash;
    if (Cloud.enabled) {
      if (!Cloud.ready) { app.innerHTML = '<div class="empty"><div class="signin-logo">🎓</div><p class="muted">Connecting…</p></div>'; return; }
      if (parts[0] === 'welcome' || parts[0] === 'signin') {
        // Only "Switch user" / "Sign out" from the account menu end a session. Landing here any other
        // way (the phone's back button stepping through old history, a bookmark) just goes home.
        if (Cloud.user && sessionStorage.getItem('learnhub.switch') !== '1') { location.replace(location.pathname + '#/'); return; }
        sessionStorage.removeItem('learnhub.switch'); if (Cloud.user) Cloud.signOut(); return pageCloudSignIn(); }
      if (!Cloud.user) return pageCloudSignIn();
      if (!Students.current || !sessionStorage.getItem('learnhub.entered')) { enterCloudSession(); if (!Students.current) return; }
    } else if (parts[0] === 'signin' || parts[0] === 'welcome' || !Students.current || !sessionStorage.getItem('learnhub.entered')) return pageWelcome();
    switch (parts[0]) {
      case '': return pageHome();
      case 'course': return pageCourse(parts[1]);
      case 'lesson': return pageLesson(parts[1], parts[2], parts[3]);
      case 'study': return pageStudy(parts[1], parts[2], parts[3]);
      case 'quiz': return pageQuiz(parts[1], parts[2], parts[3]);
      case 'assign': return pageAssign(parts[1], parts[2], parts[3], parts[4]);
      case 'work': return pageWork(parts[1], parts[2]);
      case 'test': return pageTest(parts[1], parts[2]);
      case 'print': return Print.page(parts[1], parts[2], parts[3], parts[4], parts[5]);
      case 'dashboard': if (!Students.isStaffSession) return pageHome(); try { return Dashboard.page(); } catch (e) { app.innerHTML = '<div class="empty"><h2>The dashboard could not load</h2><p class="muted small">' + esc(e.message) + '</p><a class="btn" href="#/settings">Settings</a></div>'; return; }
      case 'games': return pageGames(parts[1], parts[2]);
      case 'game': return pageGame(parts[1], parts[2], parts[3]);
      case 'case': return pageCase(parts[1]);
      case 'settings': return pageSettings();
      case 'grades': return Grades.page(parts[1]);
      case 'sections': return pageSections();
      case 'notes': return pageNotes();
      default: return notFound();
    }
  }
  document.addEventListener('click', e => { const g = e.target.closest('[data-open-group]'); if (g) sessionStorage.setItem('learnhub.openGroup', g.dataset.openGroup); });
  window.addEventListener('hashchange', route);
  // Live data from the cloud: redraw data pages (not while someone is typing in a box)
  window.addEventListener('cloud:change', () => { const a = document.activeElement; if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return; const p = location.hash.replace(/^#\/?/, '').split('/')[0]; if ((['', 'course', 'lesson', 'work', 'dashboard', 'grades', 'case'].includes(p) || (p === 'settings' && !Students.isStaffSession)) && Students.current) route(); renderWho(); });
  window.addEventListener('cloud:auth', () => {
    if (Cloud.user && /^#\/(welcome|signin)/.test(location.hash)) { location.hash = '#/'; return; }   // just signed in from the sign-in page
    if (!Cloud.user && Students.current) { Students.setCurrent(null); sessionStorage.removeItem('learnhub.entered'); }
    route();
  });
  Settings.apply();
  if (Cloud.enabled) Cloud.whenReady().then(route); else route();
})();
