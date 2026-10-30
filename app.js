/* =========================================================
   app.js — router + pages
   Routes:
     #/                         home (courses)
     #/course/:course           units + rooms
     #/study/:course/:unit/:lesson   Study Room
     #/test/:course/:unit       Test Room
     #/games/:course/:unit      Game Room (choose a game)
     #/game/:course/:unit/:game play a game
     #/case                     Display Case
     #/settings                 Settings
   ========================================================= */
(function () {
  const { L, esc, md, speakBtn, slidesFor, questionsFor, termsFor, findCourse, findUnit, normalize, shuffle, LEVEL_NAMES, LEVEL_DESC, unitsFor, lessonsFor, focusFor, catsOf, allTermKeys } = window.LH;
  const app = document.getElementById('app');
  const courses = () => window.LearnHub.courses || [];

  /* ---------- helpers ---------- */
  function setCourseColor(course) {
    document.documentElement.style.setProperty('--course', course ? course.color || 'var(--primary)' : 'var(--primary)');
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
  function updateLevelPill() { /* the level is intentionally never shown to students */ }
  const GOAL_LABELS = { study: ['📖', 'Read every slide in the Study Room'], testPass: ['📝', 'Pass the test'], testPerfect: ['💯', 'Get a perfect test score'],
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
  function setNav(key) {
    document.querySelectorAll('.topnav a').forEach(a => a.classList.toggle('active', a.dataset.nav === key));
  }

  /* ---------- pages ---------- */

  function pageHome() {
    setCourseColor(null); setNav('home');
    const name = Settings.get('studentName');
    app.innerHTML = '<div class="page-head"><div><h1>' + (name ? 'Welcome back, ' + esc(name) + '!' : 'Welcome to LearnHub') + '</h1>' +
      '<p class="muted">Pick a course. Each unit has a Study Room, a Test Room and a Game Room.</p></div></div>' +
      (Focus.enabled && Object.keys(Focus.data.courses).length ? '<div class="plan-banner">🎯 <strong>Focus Plan is on.</strong> Courses with a plan show only the pieces chosen for you.</div>' : '') +
      (courses().length ? '<div class="grid">' + courses().map(c => {
        const s = Badges.summary(c);
        return '<a class="card link course-card" href="#/course/' + c.id + '" style="--course:' + esc(c.color || '') + '">' +
          '<div class="card-icon">' + c.icon + '</div><h2>' + esc(c.title) + '</h2><p class="muted">' + esc(c.subtitle || '') + '</p>' +
          '<div class="progress"><span style="width:' + courseProgress(c) + '%"></span></div>' +
          '<div class="btn-row"><span class="tag">' + unitsFor(c).length + ' unit' + (unitsFor(c).length === 1 ? '' : 's') + '</span>' + (Focus.active(c.id) ? '<span class="tag accent">🎯 Focus Plan</span>' : '') +
          '<span class="tag accent">🏅 ' + s.earned + ' / ' + s.total + ' awards</span></div></a>';
      }).join('') + '</div>' : '<div class="empty">No courses yet. Add a course file in <code>courses/</code> and link it in <code>index.html</code>.</div>');
  }

  function pageCourse(courseId) {
    const course = findCourse(courseId); if (!course) return notFound();
    setCourseColor(course); setNav('home');
    app.innerHTML = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title }]) +
      '<div class="page-head"><div><h1>' + course.icon + ' ' + esc(course.title) + '</h1><p class="muted">' + esc(course.description || course.subtitle || '') + '</p></div>' +
      '<a class="btn secondary" href="#/case/' + course.id + '">🏆 Display Case</a></div>' + planBanner(course) +
      '<div class="unit-list">' + unitsFor(course).map(unit => {
        const idx = course.units.indexOf(unit);
        const awards = Badges.unitRow(course, unit);
        const pct = unitProgress(course, unit);
        const firstLesson = (lessonsFor(unit)[0] || { _idx: 0 })._idx;
        return '<div class="card unit-row"><div><span class="tag">Unit ' + (idx + 1) + '</span><h2 style="margin-top:0.4rem">' + esc(unit.title) + '</h2>' +
          '<p class="muted small">' + esc(L(unit.description) || '') + '</p>' +
          '<div class="progress"><span style="width:' + pct + '%"></span></div>' +
          '<div class="unit-badges">' + awards.map(a => '<span class="' + (a.earnedAt ? '' : 'locked') + '" title="' + esc(a.name) + '">' + a.icon + '</span>').join('') + '</div>' +
          goalsHtml(course, unit) + '</div>' +
          '<div class="rooms">' +
          '<a class="room" href="#/study/' + course.id + '/' + unit.id + '/' + firstLesson + '"><span class="room-icon">📖</span><span>Study Room</span></a>' +
          '<a class="room" href="#/test/' + course.id + '/' + unit.id + '"><span class="room-icon">📝</span><span>Test Room</span></a>' +
          '<a class="room" href="#/games/' + course.id + '/' + unit.id + '"><span class="room-icon">🎮</span><span>Game Room</span></a>' +
          '</div></div>';
      }).join('') + '</div>' + (unitsFor(course).length ? '' : '<div class="empty">No units are in this course\'s Focus Plan yet. A teacher can choose some in Settings.</div>');
  }

  /* ----- Study Room ----- */
  function pageStudy(courseId, unitId, lessonIdx) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit) return notFound();
    setCourseColor(course); setNav('home');
    const lessons = lessonsFor(unit);
    if (!lessons.length) { app.innerHTML = '<div class="empty">No lessons are in this unit\'s Focus Plan yet.</div>'; return; }
    lessonIdx = +lessonIdx || 0;
    if (!lessons.some(l => l._idx === lessonIdx)) lessonIdx = lessons[0]._idx;
    const pos = lessons.findIndex(l => l._idx === lessonIdx);
    const lesson = lessons[pos];
    const slides = slidesFor(lesson);
    const u = Progress.unit(course.id, unit.id);
    let i = 0;
    const seen = () => u.slides[lessonIdx] || [];
    const lessonDone = li => { const s = slidesFor(unit.lessons[li]); return s.length > 0 && s.every((_, k) => (u.slides[li] || []).includes(k)); };

    const draw = () => {
      Progress.markSlide(course.id, unit.id, lessonIdx, i);
      const s = slides[i];
      app.innerHTML = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title }, { label: 'Study Room' }]) +
        '<div class="page-head"><div><h1>📖 Study Room</h1><p class="muted">' + esc(unit.title) + '</p></div>' +
        '</div>' +
        '<div class="lesson-tabs">' + lessons.map(les => '<a href="#/study/' + course.id + '/' + unit.id + '/' + les._idx + '" class="' + (les._idx === lessonIdx ? 'active' : '') + (lessonDone(les._idx) ? ' done' : '') + '">' + esc(les.title) + '</a>').join('') + '</div>' +
        '<div class="slide">' + (s.visual ? '<div class="slide-visual">' + s.visual + '</div>' : '') +
        '<div class="btn-row between"><h2>' + esc(L(s.title)) + '</h2>' + speakBtn(L(s.title) + '. ' + String(L(s.body)).replace(/[*#-]/g, '')) + '</div>' +
        '<div class="slide-body">' + md(L(s.body)) + (s.html ? L(s.html) : '') + '</div>' +
        '<div class="slide-foot"><button class="btn secondary" id="prevBtn"' + (i === 0 ? ' disabled' : '') + '>← Back</button>' +
        '<div class="dots">' + slides.map((_, k) => '<span class="' + (k === i ? 'current' : seen().includes(k) ? 'seen' : '') + '"></span>').join('') + '</div>' +
        (i < slides.length - 1 ? '<button class="btn" id="nextBtn">Next →</button>' :
          (pos < lessons.length - 1 ? '<a class="btn success" href="#/study/' + course.id + '/' + unit.id + '/' + lessons[pos + 1]._idx + '">Next lesson →</a>' :
            '<a class="btn success" href="#/test/' + course.id + '/' + unit.id + '">Go to the Test Room →</a>')) +
        '</div></div>' +
        '<p class="muted small center" style="margin-top:1rem">Slide ' + (i + 1) + ' of ' + slides.length + ' · Lesson ' + (pos + 1) + ' of ' + lessons.length + '</p>';
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

  /* ----- Test Room ----- */
  function pageTest(courseId, unitId) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit) return notFound();
    setCourseColor(course); setNav('home');
    const u = Progress.unit(course.id, unit.id);
    const head = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title }, { label: 'Test Room' }]) +
      '<div class="page-head"><div><h1>📝 Test Room</h1><p class="muted">' + esc(unit.title) + '</p></div></div>';

    const level = Settings.level;
    const count = level === 1 ? 5 : level === 2 ? 8 : 12;
    let qs = questionsFor(unit, level).slice(0, count);
    if (!qs.length) { app.innerHTML = head + '<div class="empty">This unit has no test questions yet.</div>'; return; }

    app.innerHTML = head + '<div class="card center" style="padding:2.5rem"><div class="card-icon">📝</div><h2>Ready?</h2>' +
      '<p class="muted">' + qs.length + ' questions · pass mark ' + Badges.PASS_MARK + '%' + (u.testBest ? ' · your best: ' + u.testBest + '%' : '') + '</p>' +
      '<button class="btn lg" id="startBtn">Start the test</button></div>';
    app.querySelector('#startBtn').addEventListener('click', start);

    function start() {
      let i = 0, score = 0;
      const next = () => {
        if (i >= qs.length) return finish();
        const q = qs[i];
        app.innerHTML = head + '<div class="score-bar"><span>Question ' + (i + 1) + ' of ' + qs.length + '</span><span>Score: ' + score + '</span></div><div class="question"><div class="q-host"></div></div>';
        const host = app.querySelector('.q-host');
        const done = (ok) => { if (ok) score++; i++; next(); };
        if (q.type === 'mc' || q.type === 'tf') Games.askChoice(host, q, done);
        else if (q.type === 'fill') Games.renderFill(host, q, done);
        else if (q.type === 'match') {
          host.innerHTML = '<div class="q-prompt">' + esc(q.prompt || 'Match each item to its pair.') + '</div><div class="m-host"></div>';
          Games.renderMatchBoard(host.querySelector('.m-host'), q.pairs, mistakes => done(mistakes <= Math.floor(q.pairs.length / 3)));
        }
      };
      next();
      function finish() {
        const pct = Math.round(score / qs.length * 100);
        u.testAttempts = (u.testAttempts || 0) + 1;
        u.testBest = Math.max(u.testBest || 0, pct);
        if (pct >= Badges.PASS_MARK) u.testPassed = true;
        if (pct === 100) u.testPerfect = true;
        Progress.save();
        const fresh = Badges.evaluate(course, unit);
        app.innerHTML = head + '<div class="card result-card"><div class="big-num">' + pct + '%</div>' +
          '<h2>' + (pct === 100 ? 'Perfect!' : pct >= Badges.PASS_MARK ? 'You passed!' : 'Keep practising') + '</h2>' +
          '<p class="muted">' + score + ' of ' + qs.length + ' correct.' + (pct < Badges.PASS_MARK ? ' Visit the Study Room and try again.' : '') + '</p>' +
          (fresh.length ? '<p>' + fresh.map(a => '<span class="tag accent">' + a.icon + ' ' + esc(a.name) + '</span>').join(' ') + '</p>' : '') +
          '<div class="btn-row" style="justify-content:center"><button class="btn" id="retry">Try again</button>' +
          '<a class="btn secondary" href="#/study/' + course.id + '/' + unit.id + '/' + (lessonsFor(unit)[0] || { _idx: 0 })._idx + '">Study Room</a>' +
          '<a class="btn secondary" href="#/games/' + course.id + '/' + unit.id + '">Game Room</a></div></div>';
        app.querySelector('#retry').addEventListener('click', () => { qs = questionsFor(unit, level).slice(0, count); start(); });
      }
    }
  }

  /* ----- Game Room ----- */
  function pageGames(courseId, unitId) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit) return notFound();
    setCourseColor(course); setNav('home');
    const u = Progress.unit(course.id, unit.id);
    let games = Games.available(course, unit);
    if (Settings.level === 1) games = games.filter(g => g.gentle).concat(games.filter(g => !g.gentle)); // gentle games first
    app.innerHTML = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title }, { label: 'Game Room' }]) +
      '<div class="page-head"><div><h1>🎮 Game Room</h1><p class="muted">' + esc(unit.title) + ' · finish 3 games for a badge, all of them for a medal</p></div></div>' +
      '<div class="grid">' + games.map(g => '<a class="card link" href="#/game/' + course.id + '/' + unit.id + '/' + g.id + '"><div class="card-icon">' + g.icon + '</div><h3>' + esc(g.name) + '</h3><p class="muted small">' + esc(g.desc) + '</p>' +
        (u.games[g.id] ? '<span class="tag ok">✓ Completed' + (u.gameScores[g.id] !== undefined ? ' · best ' + u.gameScores[g.id] : '') + '</span>' : (g.gentle ? '<span class="tag">Gentle</span>' : '<span class="tag accent">Challenge</span>')) + '</a>').join('') + '</div>';
  }

  function pageGame(courseId, unitId, gameId) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit) return notFound();
    setCourseColor(course); setNav('home');
    const game = Games.ALL.find(g => g.id === gameId);
    app.innerHTML = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title, href: '#/games/' + course.id + '/' + unit.id }, { label: game ? game.name : 'Game' }]) +
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
    app.innerHTML = '<div class="page-head"><div><h1>🏆 The Display Case</h1><p class="muted">Badges, medals and trophies you have earned' + (courseId && list[0] ? ' in ' + esc(list[0].title) : '') + '.</p></div>' +
      (courseId ? '<a class="btn secondary" href="#/case">All courses</a>' : '') + '</div>' +
      '<div class="case-stats"><div class="stat"><div class="n">🎖️ ' + totals.b + '</div><div class="l">Badges</div></div><div class="stat"><div class="n">🏅 ' + totals.m + '</div><div class="l">Medals</div></div><div class="stat"><div class="n">🏆 ' + totals.t + '</div><div class="l">Trophies</div></div><div class="stat"><div class="n">' + totals.earned + '/' + totals.all + '</div><div class="l">Collected</div></div></div>' +
      list.map(c => {
        const awards = Badges.listForCourse(c);
        return '<section class="case-shelf" style="--course:' + esc(c.color || '') + '"><h2>' + c.icon + ' ' + esc(c.title) + ' <span class="tag">' + awards.filter(a => a.earnedAt).length + ' / ' + awards.length + '</span></h2>' +
          '<div class="award-grid">' + awards.map(a => '<div class="award tier-' + a.tier + (a.earnedAt ? ' earned' : ' locked') + '" title="' + esc(a.desc) + '"><span class="tier-label">' + a.tier + '</span><div class="award-icon">' + a.icon + '</div><div class="award-name">' + esc(a.name) + '</div><div class="award-desc">' + esc(a.earnedAt ? 'Earned ' + new Date(a.earnedAt).toLocaleDateString() : a.desc) + '</div></div>').join('') + '</div></section>';
      }).join('') + (list.length ? '' : '<div class="empty">No courses yet.</div>');
  }

  /* ----- Settings ----- */
  function pageSettings() {
    setCourseColor(null); setNav('settings');
    const hasPin = !!Settings.get('guardianPin');
    const locked = hasPin && !sessionStorage.getItem('learnhub.unlocked');
    const sw = (key, label, help) => '<div class="setting-row"><div><label>' + label + '</label><div class="help">' + help + '</div></div><button class="switch ' + (Settings.get(key) ? 'on' : '') + '" data-switch="' + key + '" role="switch" aria-checked="' + !!Settings.get(key) + '"></button></div>';
    const seg = (key, label, help, options) => '<div class="setting-row"><div><label>' + label + '</label><div class="help">' + help + '</div></div><div class="seg">' + options.map(o => '<button data-seg="' + key + '" data-v="' + o[0] + '" class="' + (String(Settings.get(key)) === String(o[0]) ? 'on' : '') + '">' + o[1] + '</button>').join('') + '</div></div>';

    const teacherInner = locked ? '' :
      '<div class="teacher-section"><h3>Challenge level</h3><p class="muted small">Changes the language in lessons, the number and style of questions, and the size of game boards. Students never see which level is active.</p>' +
      '<div class="level-cards">' + [1, 2, 3].map(l => '<button class="level-card ' + (Settings.level === l ? 'on' : '') + '" data-level="' + l + '"><h3>Level ' + l + ' · ' + LEVEL_NAMES[l] + '</h3><p>' + LEVEL_DESC[l] + '</p></button>').join('') + '</div></div>' +
      '<div class="teacher-section"><h3>🔍 Find lessons by keyword</h3><p class="muted small">Pick a unit and type a word or phrase. Lessons that mention it are listed in order; apply them and the student sees only those lessons for that unit.</p>' + lessonSearchHtml() + '</div>' +
      '<div class="teacher-section">' + focusPlanHtml(false) + '</div>' +
      '<div class="teacher-section"><h3>🎨 Colouring page learning breaks</h3>' +
      seg('colouringEvery', 'Show a learning card every…', 'How many areas the student colours before a lesson card appears. "Student chooses" lets them pick inside the game.', [['student', 'Student chooses'], [1, '1'], [3, '3'], [5, '5'], [10, '10'], [0, 'Off']]) + '</div>';

    app.innerHTML = '<div class="page-head"><div><h1>⚙️ Settings</h1><p class="muted">Accessibility options are open to everyone. Teaching controls live behind the Teacher Lock.</p></div></div>' +
      '<div class="card" style="margin-bottom:1.25rem"><h2>Accessibility</h2>' +
      seg('fontScale', 'Text size', 'Make everything larger.', [[1, 'Normal'], [1.15, 'Large'], [1.3, 'Extra large']]) +
      seg('font', 'Reading font', 'Lexend is designed for easier reading.', [['default', 'Standard'], ['lexend', 'Lexend']]) +
      seg('contrast', 'Contrast', 'High contrast uses black text and strong borders.', [['normal', 'Normal'], ['high', 'High']]) +
      seg('motion', 'Animation', 'Reduced motion removes flips, spins and slide effects.', [['normal', 'Normal'], ['reduced', 'Reduced']]) +
      sw('readAloud', 'Read aloud buttons', 'Show 🔊 buttons that read slides and questions out loud.') + '</div>' +
      '<div class="card" style="margin-bottom:1.25rem"><h2>Student</h2><div class="setting-row"><div><label>Name</label><div class="help">Shown on the home page.</div></div><input class="text-input" style="max-width:260px" id="nameInput" value="' + esc(Settings.get('studentName')) + '" placeholder="Student name"></div></div>' +
      '<div class="card teacher-card" style="margin-bottom:1.25rem"><div class="setting-row" style="padding-top:0"><div><h2 style="margin:0">🔒 Teacher Lock</h2><div class="help">' +
        (locked ? 'Enter the PIN to open the teaching controls.' : hasPin ? 'Unlocked for this session. Lock again before handing the device back.' : 'No PIN yet — set one so students cannot open this section.') + '</div></div>' +
      '<div class="btn-row">' + (hasPin
        ? (locked ? '<input class="text-input" style="max-width:180px" id="pinInput" type="password" inputmode="numeric" placeholder="Enter PIN"><button class="btn" id="unlockBtn">Unlock</button>'
                  : '<button class="btn secondary" id="lockBtn">🔒 Lock now</button><button class="btn ghost" id="removePin">Remove PIN</button>')
        : '<input class="text-input" style="max-width:180px" id="pinInput" type="password" inputmode="numeric" placeholder="Choose a PIN"><button class="btn" id="setPin">Set PIN</button>') + '</div></div>' +
      teacherInner + '</div>' +
      '<div class="card"><h2>Progress</h2><p class="muted small">Progress and awards are saved in this browser.</p><button class="btn ghost" id="resetBtn">Reset all progress</button></div>';

    app.querySelectorAll('[data-level]').forEach(b => b.addEventListener('click', () => { Settings.set('level', +b.dataset.level); pageSettings(); }));
    app.querySelectorAll('[data-seg]').forEach(b => b.addEventListener('click', () => { const v = b.dataset.v; Settings.set(b.dataset.seg, isNaN(v) ? v : +v); pageSettings(); }));
    app.querySelectorAll('[data-switch]').forEach(b => b.addEventListener('click', () => { Settings.set(b.dataset.switch, !Settings.get(b.dataset.switch)); pageSettings(); }));
    app.querySelector('#nameInput').addEventListener('change', e => Settings.set('studentName', e.target.value.trim()));
    const on = (id, fn) => { const el = app.querySelector(id); if (el) el.addEventListener('click', fn); };
    on('#setPin', () => { const v = app.querySelector('#pinInput').value.trim(); if (v.length < 4) return alert('Choose at least 4 digits.'); Settings.set('guardianPin', v); sessionStorage.setItem('learnhub.unlocked', '1'); pageSettings(); });
    on('#unlockBtn', () => { if (app.querySelector('#pinInput').value === Settings.get('guardianPin')) { sessionStorage.setItem('learnhub.unlocked', '1'); pageSettings(); } else alert('Wrong PIN.'); });
    const pin = app.querySelector('#pinInput'); if (pin) pin.addEventListener('keydown', e => { if (e.key === 'Enter') { const b = app.querySelector('#unlockBtn, #setPin'); if (b) b.click(); } });
    on('#lockBtn', () => { sessionStorage.removeItem('learnhub.unlocked'); pageSettings(); });
    on('#removePin', () => { if (confirm('Remove the Teacher Lock PIN? Students will be able to open the teaching controls.')) { Settings.set('guardianPin', ''); sessionStorage.removeItem('learnhub.unlocked'); pageSettings(); } });
    on('#resetBtn', () => { if (confirm('Erase all progress and awards on this device?')) { Progress.reset(); pageSettings(); } });
    if (!locked) { bindFocusPlan(false); bindLessonSearch(); }
  }

  /* ----- Keyword → lessons search (inside Teacher Lock) ----- */
  const searchState = { course: '', unit: '', q: '' };
  function lessonText(lesson) {
    const parts = [lesson.title];
    (lesson.slides || []).forEach(sl => { [sl.title, sl.body].forEach(v => { if (v && typeof v === 'object') Object.values(v).forEach(x => parts.push(x)); else parts.push(v); }); });
    return parts.filter(Boolean).join(' \n ').toLowerCase();
  }
  function lessonSearchHtml() {
    const course = findCourseAll(searchState.course) || courses()[0]; if (!course) return '<p class="muted">No courses yet.</p>';
    searchState.course = course.id;
    const unit = course.units.find(u => u.id === searchState.unit) || course.units[0]; if (!unit) return '';
    searchState.unit = unit.id;
    const q = searchState.q.trim().toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);
    const hits = q ? unit.lessons.map((les, i) => ({ i, les, text: lessonText(les) })).filter(x => words.every(w => x.text.includes(w))) : [];
    const f = Focus.unitEntry(course.id, unit.id);
    return '<div class="search-row">' +
      '<select class="text-input" id="searchCourse">' + courses().map(c => '<option value="' + c.id + '"' + (c.id === course.id ? ' selected' : '') + '>' + c.icon + ' ' + esc(c.title) + '</option>').join('') + '</select>' +
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
      Focus.includeUnit(course.id, unit.id, true);
      Focus.unitEntry(course.id, unit.id).lessons = idx.length === unit.lessons.length ? null : idx;
      Focus.save(); Focus.setEnabled(true);
      sessionStorage.setItem('learnhub.planOpen', course.id);
      pageSettings();
    });
  }

  /* ----- Focus Plan editor (inside Settings) ----- */
  function focusPlanHtml(locked) {
    const dis = locked ? ' disabled' : '';
    const chip = (on, attrs, label) => '<button class="chip' + (on ? ' on' : '') + '" ' + attrs + dis + '>' + esc(label) + '</button>';
    const body = courses().map(c => {
      const entry = Focus.courseEntry(c.id);
      const open = sessionStorage.getItem('learnhub.planOpen') === c.id;
      return '<div class="plan-course" style="--course:' + esc(c.color || '') + '"><button class="plan-course-head" data-plan-open="' + c.id + '">' +
        '<span>' + c.icon + ' ' + esc(c.title) + '</span><span class="tag' + (entry ? ' accent' : '') + '">' + (entry ? Object.keys(entry.units).length + ' of ' + c.units.length + ' units' : 'Whole course') + '</span><span class="muted">' + (open ? '▾' : '▸') + '</span></button>' +
        (open ? '<div class="plan-units">' + c.units.map(u => {
          const f = Focus.unitEntry(c.id, u.id);
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
    return '<div class="setting-row" style="padding-top:0"><div><h3 style="margin:0">🎯 Focus Plan</h3><div class="help">For a student working well below grade level: choose exactly which units, lessons, words and question topics they see, and the goals they work toward. Everything else is hidden for them.</div></div>' +
      '<button class="switch ' + (Focus.enabled ? 'on' : '') + '" id="focusSwitch" role="switch" aria-checked="' + Focus.enabled + '"' + dis + '></button></div>' +
      '<p class="muted small">Tick a unit to add it to the plan, then narrow it down. Leaving every lesson, word or topic selected means "all of them". A course with no ticked units is shown in full.</p>' +
      body;
  }
  function bindFocusPlan(locked) {
    const on = (sel, fn) => app.querySelectorAll(sel).forEach(el => el.addEventListener(el.type === 'checkbox' ? 'change' : 'click', fn));
    on('[data-plan-open]', e => { const id = e.currentTarget.dataset.planOpen; sessionStorage.setItem('learnhub.planOpen', sessionStorage.getItem('learnhub.planOpen') === id ? '' : id); pageSettings(); });
    if (locked) return;
    const fs = app.querySelector('#focusSwitch'); if (fs) fs.addEventListener('click', () => { Focus.setEnabled(!Focus.enabled); pageSettings(); });
    on('[data-plan-unit]', e => { Focus.includeUnit(e.target.dataset.planUnit, e.target.dataset.u, e.target.checked); pageSettings(); });
    on('[data-plan-toggle]', e => {
      const b = e.currentTarget, course = findCourseAll(b.dataset.c), unit = course.units.find(x => x.id === b.dataset.u);
      const field = b.dataset.planToggle;
      const all = field === 'lessons' ? unit.lessons.map((_, i) => i) : field === 'terms' ? allTermKeys(unit) : field === 'cats' ? catsOf(unit) : Object.keys(GOAL_LABELS);
      Focus.toggle(course.id, unit.id, field, field === 'lessons' ? +b.dataset.v : b.dataset.v, all);
      pageSettings();
    });
  }
  function findCourseAll(id) { return courses().find(c => c.id === id); }

  function notFound() { app.innerHTML = '<div class="empty"><h2>Page not found</h2><a class="btn" href="#/">Back to courses</a></div>'; }

  /* ---------- router ---------- */
  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    window.scrollTo(0, 0);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    switch (parts[0]) {
      case '': return pageHome();
      case 'course': return pageCourse(parts[1]);
      case 'study': return pageStudy(parts[1], parts[2], parts[3]);
      case 'test': return pageTest(parts[1], parts[2]);
      case 'games': return pageGames(parts[1], parts[2]);
      case 'game': return pageGame(parts[1], parts[2], parts[3]);
      case 'case': return pageCase(parts[1]);
      case 'settings': return pageSettings();
      default: return notFound();
    }
  }
  window.addEventListener('hashchange', route);
  Settings.apply();
  updateLevelPill();
  route();
})();
