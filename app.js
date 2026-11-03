/* =========================================================
   app.js — router + pages
   Routes:
     #/signin                   Student sign-in (shown whenever nobody is signed in)
     #/                         home (the signed-in student's courses)
     #/course/:course           units + rooms
     #/lesson/:course/:unit/:i  Lesson hub (slides · quiz · assignments)
     #/study/:course/:unit/:i   Lesson slides
     #/quiz/:course/:unit/:i    Lesson quiz
     #/assign/:course/:unit/:i/:n   Assignment
     #/test/:course/:unit       Unit test
     #/games/:course/:unit      Game Room (choose a game)
     #/game/:course/:unit/:game play a game
     #/case                     Display Case
     #/settings                 Settings (accessibility; Teacher Lock on top)
   ========================================================= */
(function () {
  const { L, esc, md, speakBtn, slidesFor, questionsFor, termsFor, findCourse, findUnit, normalize, shuffle, byLevel, LEVELS, LEVEL_NAMES, LEVEL_DESC, unitsFor, lessonsFor, focusFor, catsOf, allTermKeys, markSeen, accom, assessmentCount, assessmentOrder, lessonQuestions, assignmentsFor } = window.LH;
  const app = document.getElementById('app');
  const allCourses = () => window.LearnHub.courses || [];
  /** Courses the signed-in student is enrolled in (every course when no list is set). */
  const courses = () => allCourses().filter(c => Students.enrolled(c.id));

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
  function setNav(key) {
    document.querySelectorAll('.topnav a').forEach(a => a.classList.toggle('active', a.dataset.nav === key));
  }
  /** The "signed in as" chip in the header. */
  function renderWho() {
    const el = document.getElementById('whoChip'); if (!el) return;
    const s = Students.current;
    el.innerHTML = s ? '<a class="who" href="#/signin" title="Switch student"><span class="who-avatar" style="background:' + esc(s.colour) + '">' + s.avatar + '</span><span class="who-name">' + esc(s.name) + '</span><span class="who-switch">Switch</span></a>' : '';
  }
  const avatarHtml = (s, cls) => '<span class="' + (cls || 'who-avatar') + '" style="background:' + esc(s.colour) + '">' + s.avatar + '</span>';

  /* ---------- pages ---------- */

  /* ----- Sign-in ----- */
  function pageSignin() {
    setCourseColor(null); setNav('');
    const list = Students.list;
    const canAdd = Settings.get('allowSelfSignup') !== false || !list.length;
    app.innerHTML = '<div class="signin"><div class="signin-head"><div class="signin-logo">🎓</div><h1>Who is learning today?</h1>' +
      '<p class="muted">' + (list.length ? 'Tap your name to sign in.' : 'Add your first name to get started.') + '</p></div>' +
      (list.length ? '<div class="student-grid">' + list.map(s => '<button class="student-tile" data-signin="' + s.id + '" style="--tile:' + esc(s.colour) + '">' + avatarHtml(s, 'tile-avatar') + '<span class="tile-name">' + esc(s.name) + '</span></button>').join('') + '</div>' : '') +
      (canAdd ? '<div class="card signin-add"><h3>' + (list.length ? 'New here?' : 'Add a student') + '</h3><div class="btn-row"><input class="text-input" id="newName" maxlength="30" placeholder="First name" style="max-width:260px" autocomplete="off"><button class="btn" id="addMe">Add me</button></div>' +
        '<p class="muted small" style="margin:0.5rem 0 0">Just a first name — no password needed.</p></div>'
        : '<p class="muted small center">Not on the list? Ask your teacher to add you (Settings → Teacher Lock → Students).</p>') +
      '</div>';
    app.querySelectorAll('[data-signin]').forEach(b => b.addEventListener('click', () => { Students.setCurrent(b.dataset.signin); renderWho(); location.hash = '#/'; }));
    const add = () => { const v = (app.querySelector('#newName').value || '').trim(); if (!v) return; const s = Students.add(v); Students.setCurrent(s.id); renderWho(); location.hash = '#/'; };
    const addBtn = app.querySelector('#addMe'); if (addBtn) addBtn.addEventListener('click', add);
    const inp = app.querySelector('#newName'); if (inp) { inp.addEventListener('keydown', e => { if (e.key === 'Enter') add(); }); inp.focus(); }
  }

  function pageHome() {
    setCourseColor(null); setNav('home');
    const s = Students.current;
    const mine = courses();
    const others = allCourses().filter(c => !mine.includes(c));
    app.innerHTML = '<div class="page-head"><div><h1>' + 'Welcome back, ' + esc(s.name) + '!</h1>' +
      '<p class="muted">' + (mine.length ? 'Pick a course. Each unit has lessons with quizzes and assignments, a unit test and a Game Room.' : 'No courses have been added for you yet.') + '</p></div></div>' +
      (Focus.enabled && Object.keys(Focus.data.courses).length ? '<div class="plan-banner">🎯 <strong>Focus Plan is on.</strong> Courses with a plan show only the pieces chosen for you.</div>' : '') +
      (mine.length ? '<div class="grid">' + mine.map(c => {
        const sm = Badges.summary(c);
        return '<a class="card link course-card" href="#/course/' + c.id + '" style="--course:' + esc(c.color || '') + '">' +
          '<div class="card-icon">' + c.icon + '</div><h2>' + esc(c.title) + '</h2><p class="muted">' + esc(c.subtitle || '') + '</p>' +
          '<div class="progress"><span style="width:' + courseProgress(c) + '%"></span></div>' +
          '<div class="btn-row"><span class="tag">' + unitsFor(c).length + ' unit' + (unitsFor(c).length === 1 ? '' : 's') + '</span>' + (Focus.active(c.id) ? '<span class="tag accent">🎯 Focus Plan</span>' : '') +
          '<span class="tag accent">🏅 ' + sm.earned + ' / ' + sm.total + ' awards</span></div></a>';
      }).join('') + '</div>' : (allCourses().length ? '' : '<div class="empty">No courses yet. Add a course file and link it in <code>index.html</code>.</div>')) +
      (others.length && !s.coursesLocked ? '<details class="other-courses"><summary>More courses (' + others.length + ')</summary><div class="grid" style="margin-top:1rem">' + others.map(c =>
        '<div class="card course-card" style="--course:' + esc(c.color || '') + '"><div class="card-icon">' + c.icon + '</div><h2>' + esc(c.title) + '</h2><p class="muted">' + esc(c.subtitle || '') + '</p><button class="btn secondary sm" data-join="' + c.id + '">＋ Add to my courses</button></div>').join('') + '</div></details>'
        : (others.length ? '<p class="muted small center" style="margin-top:1.5rem">Your course list is set by your teacher.</p>' : ''));
    app.querySelectorAll('[data-join]').forEach(b => b.addEventListener('click', () => { Students.setCourses(s.id, mine.map(c => c.id).concat(b.dataset.join)); pageHome(); }));
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
    app.innerHTML = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title }]) +
      '<div class="page-head"><div><h1>' + course.icon + ' ' + esc(course.title) + '</h1><p class="muted">' + esc(L(course.description) || course.subtitle || '') + '</p></div>' +
      '<a class="btn secondary" href="#/case/' + course.id + '">🏆 Display Case</a></div>' + planBanner(course) +
      '<div class="search-row course-search"><input class="text-input" id="courseQ" placeholder="🔍 Find a lesson by keyword (e.g. census, ritual, festival)" value="' + esc(courseSearch.q) + '"><button class="btn secondary" id="courseGo">Search</button>' + (q ? '<button class="btn ghost" id="courseClear">Clear</button>' : '') + '</div>' +
      '<div class="unit-list">' + unitsFor(course).map(unit => {
        const idx = course.units.indexOf(unit);
        const awards = Badges.unitRow(course, unit);
        const pct = unitProgress(course, unit);
        const lessons = lessonsFor(unit);
        const hits = q ? lessons.filter(l => matchesKeyword(l, q)) : lessons;
        if (q && !hits.length) return '';
        const u = Progress.unit(course.id, unit.id);
        return '<div class="card unit-card"><div class="unit-head"><div><span class="tag">Unit ' + (idx + 1) + '</span><h2 style="margin-top:0.4rem">' + esc(unit.title) + '</h2>' +
          '<p class="muted small">' + esc(L(unit.description) || '') + '</p></div>' +
          '<div class="unit-side"><div class="progress"><span style="width:' + pct + '%"></span></div>' +
          '<div class="unit-badges">' + awards.map(a => '<span class="' + (a.earnedAt ? '' : 'locked') + '" title="' + esc(a.name) + '">' + a.icon + '</span>').join('') + '</div></div></div>' +
          '<div class="lesson-list">' + (q ? hits : lessons).map((les, k) => lessonRow(course, unit, les, lessons.indexOf(les) + 1, q && hits.includes(les))).join('') + '</div>' +
          '<div class="unit-foot">' + goalsHtml(course, unit) +
          '<div class="rooms">' +
          '<a class="room" href="#/test/' + course.id + '/' + unit.id + '"><span class="room-icon">📝</span><span>Unit test' + (u.testBest ? ' <span class="muted">· best ' + u.testBest + '%</span>' : '') + '</span></a>' +
          '<a class="room" href="#/games/' + course.id + '/' + unit.id + '"><span class="room-icon">🎮</span><span>Game Room</span></a>' +
          '<a class="room" href="#/print/' + course.id + '/' + unit.id + '/unit"><span class="room-icon">🖨️</span><span>Print unit</span></a>' +
          '</div></div></div>';
      }).join('') + '</div>' +
      (unitsFor(course).length ? (q && !unitsFor(course).some(un => lessonsFor(un).some(l => matchesKeyword(l, q))) ? '<div class="empty">No lessons mention "' + esc(courseSearch.q) + '".</div>' : '') : '<div class="empty">No units are in this course\'s Focus Plan yet. A teacher can choose some in Settings.</div>');
    const run = () => { courseSearch.q = app.querySelector('#courseQ').value; pageCourse(courseId); };
    app.querySelector('#courseGo').addEventListener('click', run);
    app.querySelector('#courseQ').addEventListener('keydown', e => { if (e.key === 'Enter') run(); });
    const cl = app.querySelector('#courseClear'); if (cl) cl.addEventListener('click', () => { courseSearch.q = ''; pageCourse(courseId); });
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
    app.innerHTML = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title, href: '#/course/' + course.id }, { label: 'Lesson ' + (pos + 1) }]) +
      '<div class="page-head"><div><span class="tag">Lesson ' + (pos + 1) + ' of ' + lessons.length + '</span><h1 style="margin-top:0.4rem">' + esc(les.title) + '</h1><p class="muted">' + esc(unit.title) + '</p></div>' +
      '<div class="btn-row">' + Print.button('#/print/' + course.id + '/' + unit.id + '/lesson/' + les._idx, 'Print lesson') + (pos > 0 ? '<a class="btn ghost" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessons[pos - 1]._idx + '">← Lesson ' + pos + '</a>' : '') +
      (pos < lessons.length - 1 ? '<a class="btn ghost" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessons[pos + 1]._idx + '">Lesson ' + (pos + 2) + ' →</a>' : '') + '</div></div>' +
      '<div class="grid lesson-parts">' +
      '<a class="card link part" href="#/study' + base + '"><div class="card-icon">📖</div><h3>Slides</h3><p class="muted small">' + st.slides + ' slide' + (st.slides === 1 ? '' : 's') + ' · read in order, with read-aloud.</p>' + (st.seen >= st.slides && st.slides ? '<span class="tag ok">✓ All read</span>' : '<span class="tag">' + st.seen + ' of ' + st.slides + ' read</span>') + '</a>' +
      (st.hasQuiz ? '<a class="card link part" href="#/quiz' + base + '"><div class="card-icon">❓</div><h3>Quiz</h3><p class="muted small">' + quizN + ' questions on this lesson · pass mark ' + Badges.PASS_MARK + '%.</p>' + (st.quiz ? '<span class="tag' + (st.quiz.passed ? ' ok' : '') + '">' + (st.quiz.passed ? '✓ Passed · ' : 'Best ') + st.quiz.best + '%</span>' : '<span class="tag">Not tried yet</span>') + '</a>'
                 : '<div class="card part muted"><div class="card-icon">❓</div><h3>Quiz</h3><p class="small">No quiz for this lesson.</p></div>') +
      (as.length ? as.map((a, k) => { const w = work[a._idx] || {}; return '<a class="card link part" href="#/assign' + base + '/' + a._idx + '"><div class="card-icon">✍️</div><h3>Assignment ' + (k + 1) + '</h3><p class="muted small">' + esc(a.title) + '</p>' + (w.done ? '<span class="tag ok">✓ Handed in</span>' : w.text ? '<span class="tag accent">Draft saved</span>' : '<span class="tag">To do</span>') + '</a>'; }).join('')
                 : '') + '</div>' +
      (pos === lessons.length - 1 ? '<div class="card center" style="margin-top:1.25rem"><h3>Finished every lesson in the unit?</h3><p class="muted small">The unit test covers all ' + lessons.length + ' lessons.</p><a class="btn" href="#/test/' + course.id + '/' + unit.id + '">📝 Take the unit test</a></div>' : '');
  }

  /* ----- Assignment ----- */
  function pageAssign(courseId, unitId, lessonIdx, n) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    lessonIdx = +lessonIdx || 0; n = +n || 0;
    const les = unit.lessons[lessonIdx]; const a = (les && assignmentsFor(les).find(x => x._idx === n)); if (!a) return notFound();
    const u = Progress.unit(course.id, unit.id); u.work = u.work || {}; const wl = u.work[lessonIdx] = u.work[lessonIdx] || {}; const w = wl[n] = wl[n] || { text: '', done: false };
    const starter = L(a.starter) || '';
    const words = t => String(t || '').trim().split(/\s+/).filter(Boolean).length;
    app.innerHTML = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: les.title, href: '#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx }, { label: 'Assignment' }]) +
      '<div class="page-head"><div><span class="tag">✍️ Assignment</span><h1 style="margin-top:0.4rem">' + esc(a.title) + '</h1><p class="muted">' + esc(les.title) + (a.expectations ? ' · <span class="small">' + esc(a.expectations) + '</span>' : '') + '</p></div>' + Print.button('#/print/' + course.id + '/' + unit.id + '/assign/' + lessonIdx + '/' + n, 'Print') + '</div>' +
      '<div class="slide assignment"><div class="btn-row between"><h2>Your task</h2>' + speakBtn(String(L(a.prompt)).replace(/[*#>-]/g, '')) + '</div><div class="slide-body">' + md(L(a.prompt)) + '</div>' +
      '<div class="success-box"><strong>A complete answer…</strong> ' + esc(L(a.success)) + '</div>' +
      (starter ? '<p class="muted small">Sentence starter: <em>' + esc(starter) + '</em> <button class="btn ghost sm" id="useStarter">Use it</button></p>' : '') +
      '<textarea class="text-input work" id="workText" rows="10" placeholder="Write your answer here…"' + (w.done ? ' readonly' : '') + '>' + esc(w.text) + '</textarea>' +
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
  function mediaHtml(lesson, slideIdx) {
    const slots = (lesson.media || []).filter(m => m.slide === slideIdx);
    if (!slots.length) return '';
    return slots.map(m => {
      if (m.src) {
        if (m.type === 'image') return '<figure class="media-fig"><img src="' + esc(m.src) + '" alt="' + esc(m.title) + '" loading="lazy"><figcaption>' + esc(m.title) + (m.source ? ' <span class="muted">· ' + esc(m.source) + '</span>' : '') + '</figcaption></figure>';
        const e = embedUrl(m.src);
        return e ? '<div class="media-video"><iframe src="' + esc(e) + '" title="' + esc(m.title) + '" allowfullscreen loading="lazy"></iframe><div class="small muted">🎬 ' + esc(m.title) + (m.source ? ' · ' + esc(m.source) : '') + '</div></div>'
                 : '<p class="media-link">🎬 <a href="' + esc(m.src) + '" target="_blank" rel="noopener">' + esc(m.title) + '</a>' + (m.source ? ' <span class="muted small">· ' + esc(m.source) + '</span>' : '') + '</p>';
      }
      if (Settings.locked || !Settings.get('guardianPin')) return '';   // students never see empty slots
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
    const lesson = lessons[pos];
    const slides = slidesFor(lesson);
    const u = Progress.unit(course.id, unit.id);
    let i = 0;
    const seen = () => u.slides[lessonIdx] || [];
    const lessonDone = li => { const s = slidesFor(unit.lessons[li]); return s.length > 0 && s.every((_, k) => (u.slides[li] || []).includes(k)); };

    const draw = () => {
      Progress.markSlide(course.id, unit.id, lessonIdx, i);
      const s = slides[i];
      app.innerHTML = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title, href: '#/course/' + course.id }, { label: 'Lesson ' + (pos + 1), href: '#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx }, { label: 'Slides' }]) +
        '<div class="page-head"><div><span class="tag">Lesson ' + (pos + 1) + ' of ' + lessons.length + '</span><h1 style="margin-top:0.4rem">📖 ' + esc(lesson.title) + '</h1><p class="muted">' + esc(unit.title) + '</p></div>' +
        '<div class="btn-row">' + Print.button('#/print/' + course.id + '/' + unit.id + '/slides/' + lessonIdx, 'Print slides') + '<a class="btn ghost" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx + '">✕ Lesson page</a></div></div>' +
        '<div class="lesson-tabs">' + lessons.map(les => '<a href="#/study/' + course.id + '/' + unit.id + '/' + les._idx + '" class="' + (les._idx === lessonIdx ? 'active' : '') + (lessonDone(les._idx) ? ' done' : '') + '">' + esc(les.title) + '</a>').join('') + '</div>' +
        '<div class="slide">' + (s.visual ? '<div class="slide-visual">' + s.visual + '</div>' : '') +
        '<div class="btn-row between"><h2>' + esc(L(s.title)) + '</h2>' + speakBtn(L(s.title) + '. ' + String(L(s.body)).replace(/[*#-]/g, '')) + '</div>' +
        '<div class="slide-body">' + md(L(s.body)) + (s.html ? L(s.html) : '') + '</div>' + mediaHtml(lesson, i) +
        '<div class="slide-foot"><button class="btn secondary" id="prevBtn"' + (i === 0 ? ' disabled' : '') + '>← Back</button>' +
        '<div class="dots">' + slides.map((_, k) => '<span class="' + (k === i ? 'current' : seen().includes(k) ? 'seen' : '') + '"></span>').join('') + '</div>' +
        (i < slides.length - 1 ? '<button class="btn" id="nextBtn">Next →</button>' :
          (lessonQuestions(unit, lessonIdx).length ? '<a class="btn success" href="#/quiz/' + course.id + '/' + unit.id + '/' + lessonIdx + '">Take the quiz →</a>' :
            pos < lessons.length - 1 ? '<a class="btn success" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessons[pos + 1]._idx + '">Next lesson →</a>' :
            '<a class="btn success" href="#/test/' + course.id + '/' + unit.id + '">Go to the unit test →</a>')) +
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
          '<div class="btn-row" style="justify-content:center"><button class="btn" id="retry">Try again</button>' + (o.links || '') + '</div></div>';
        app.querySelector('#retry').addEventListener('click', o.retry);
      }
    }
  }

  function pageTest(courseId, unitId) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    const u = Progress.unit(course.id, unit.id);
    const head = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: unit.title, href: '#/course/' + course.id }, { label: 'Unit test' }]) +
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
      links: '<a class="btn secondary" href="#/course/' + course.id + '">Lessons</a><a class="btn secondary" href="#/games/' + course.id + '/' + unit.id + '">Game Room</a>' });
  }

  function pageQuiz(courseId, unitId, lessonIdx) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
    setCourseColor(course); setNav('home');
    lessonIdx = +lessonIdx || 0; const les = unit.lessons[lessonIdx]; if (!les) return notFound();
    const u = Progress.unit(course.id, unit.id); u.quiz = u.quiz || {};
    const rec = u.quiz[lessonIdx] || (u.quiz[lessonIdx] = { best: 0, attempts: 0, passed: false });
    const head = crumbs([{ label: 'Courses', href: '#/' }, { label: course.title, href: '#/course/' + course.id }, { label: les.title, href: '#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx }, { label: 'Quiz' }]) +
      '<div class="page-head"><div><h1>❓ Quiz</h1><p class="muted">' + esc(les.title) + '</p></div></div>';
    const level = Settings.level;
    const count = assessmentCount(byLevel(level, [4, 6, 8, 10]));
    const qs = buildAssessment(lessonQuestions(unit, lessonIdx, level), count);
    if (!qs.length) { app.innerHTML = head + '<div class="empty">This lesson has no quiz questions yet.</div>'; return; }
    runAssessment({ head, qs, best: rec.best, icon: '❓', title: 'Quick check on this lesson', start: 'Start the quiz', print: '#/print/' + course.id + '/' + unit.id + '/quiz/' + lessonIdx,
      onDone(pct) {
        rec.attempts++; rec.best = Math.max(rec.best, pct); if (pct >= Badges.PASS_MARK) rec.passed = true;
        Progress.save();
        return Badges.evaluate(course, unit);
      },
      retry: () => pageQuiz(courseId, unitId, lessonIdx),
      links: '<a class="btn secondary" href="#/lesson/' + course.id + '/' + unit.id + '/' + lessonIdx + '">Back to the lesson</a>' });
  }

  /* ----- Game Room ----- */
  function pageGames(courseId, unitId) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
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
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit || !Students.enrolled(course.id)) return notFound();
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
    app.innerHTML = '<div class="page-head"><div><h1>🏆 The Display Case</h1><p class="muted">' + esc(Students.current.name) + '\'s badges, medals and trophies' + (courseId && list[0] ? ' in ' + esc(list[0].title) : '') + '.</p></div>' +
      (courseId ? '<a class="btn secondary" href="#/case">All courses</a>' : '') + '</div>' +
      '<div class="case-stats"><div class="stat"><div class="n">🎖️ ' + totals.b + '</div><div class="l">Badges</div></div><div class="stat"><div class="n">🏅 ' + totals.m + '</div><div class="l">Medals</div></div><div class="stat"><div class="n">🏆 ' + totals.t + '</div><div class="l">Trophies</div></div><div class="stat"><div class="n">' + totals.earned + '/' + totals.all + '</div><div class="l">Collected</div></div></div>' +
      list.map(c => {
        const awards = Badges.listForCourse(c);
        const card = a => '<div class="award tier-' + a.tier + (a.earnedAt ? ' earned' : ' locked') + '" title="' + esc(a.desc) + '"><span class="tier-label">' + a.tier + '</span><div class="award-icon">' + a.icon + '</div><div class="award-name">' + esc(a.name) + '</div><div class="award-desc">' + esc(a.earnedAt ? 'Earned ' + new Date(a.earnedAt).toLocaleDateString() : a.desc) + '</div></div>';
        const groups = [{ title: '🏆 Course trophies', list: awards.filter(a => !a.unit) }].concat(unitsFor(c).map(un => ({ title: un.title, list: awards.filter(a => a.unit && a.unit.id === un.id) })));
        return '<section class="case-shelf" style="--course:' + esc(c.color || '') + '"><h2>' + c.icon + ' ' + esc(c.title) + ' <span class="tag">' + awards.filter(a => a.earnedAt).length + ' / ' + awards.length + '</span></h2>' +
          groups.map(g => '<h3 class="case-group">' + esc(g.title) + ' <span class="tag">' + g.list.filter(a => a.earnedAt).length + ' / ' + g.list.length + '</span></h3><div class="award-grid">' + g.list.map(card).join('') + '</div>').join('') + '</section>';
      }).join('') + (list.length ? '' : '<div class="empty">No courses yet.</div>');
  }

  /* ----- Settings ----- */
  const sw = (key, label, help, val, attrs) => '<div class="setting-row"><div><label>' + label + '</label><div class="help">' + help + '</div></div><button class="switch ' + (val ? 'on' : '') + '" ' + (attrs || 'data-switch="' + key + '"') + ' role="switch" aria-checked="' + !!val + '"></button></div>';
  const seg = (key, label, help, options, val, attr) => '<div class="setting-row"><div><label>' + label + '</label><div class="help">' + help + '</div></div><div class="seg">' + options.map(o => '<button ' + (attr || 'data-seg="' + key + '"') + ' data-v="' + esc(o[0]) + '" class="' + (String(val) === String(o[0]) ? 'on' : '') + '">' + o[1] + '</button>').join('') + '</div></div>';

  function pageSettings() {
    setCourseColor(null); setNav('settings');
    const hasPin = !!Settings.get('guardianPin');
    const locked = Settings.locked;
    const me = Students.current;
    const pref = (k, label, help, options) => seg(k, label, help, options, Settings.get(k));

    const teacherInner = locked ? '' :
      '<div class="teacher-section">' + studentsPanelHtml() + '</div>' +
      '<div class="teacher-section"><h3>🔍 Find lessons by keyword</h3><p class="muted small">Pick a unit and type a word or phrase. Lessons that mention it are listed in order; apply them and <strong>' + esc(me.name) + '</strong> sees only those lessons for that unit.</p>' + lessonSearchHtml() + '</div>' +
      '<div class="teacher-section">' + focusPlanHtml(false) + '</div>' +
      '<div class="teacher-section"><h3>🎨 Colouring page learning breaks</h3>' +
      seg('colouringEvery', 'Show a learning card every…', 'How many areas the student colours before a lesson card appears. "Student chooses" lets them pick inside the game.', [['student', 'Student chooses'], [1, '1'], [3, '3'], [5, '5'], [10, '10'], [0, 'Off']], Settings.get('colouringEvery')) + '</div>' +
      '<div class="teacher-section">' + mediaChecklistHtml() + '</div>' +
      '<div class="teacher-section"><h3>🚪 Sign-in screen</h3>' +
      sw('allowSelfSignup', 'Students may add their own name', 'Off: only names added here (Students, above) appear on the sign-in screen.', Settings.get('allowSelfSignup') !== false) + '</div>';

    app.innerHTML = '<div class="page-head"><div><h1>⚙️ Settings</h1><p class="muted">Teaching controls live behind the Teacher Lock. Accessibility options are open to everyone.</p></div></div>' +
      '<div class="card teacher-card" style="margin-bottom:1.25rem"><div class="setting-row" style="padding-top:0"><div><h2 style="margin:0">🔒 Teacher Lock</h2><div class="help">' +
        (locked ? 'Enter the 6-digit PIN to open the teaching controls.' : hasPin ? 'Unlocked for this session. Lock again before handing the device back.' : 'No PIN yet — choose a 6-digit number you will remember. Students cannot open this section once it is set.') + '</div></div>' +
      '<div class="btn-row">' + (hasPin
        ? (locked ? '<input class="text-input pin-input" id="pinInput" type="password" inputmode="numeric" maxlength="6" placeholder="6-digit PIN"><button class="btn" id="unlockBtn">Unlock</button>'
                  : '<button class="btn secondary" id="lockBtn">🔒 Lock now</button><button class="btn ghost" id="changePin">Change PIN</button><button class="btn ghost" id="removePin">Remove PIN</button>')
        : '<input class="text-input pin-input" id="pinInput" type="password" inputmode="numeric" maxlength="6" placeholder="Choose 6 digits"><button class="btn" id="setPin">Set PIN</button>') + '</div></div>' +
      teacherInner + '</div>' +
      '<div class="card" style="margin-bottom:1.25rem"><h2>Me</h2>' +
      '<div class="setting-row"><div><label>Signed in as</label><div class="help">Progress, awards and these accessibility settings belong to this student.</div></div><div class="btn-row">' + avatarHtml(me) + '<strong>' + esc(me.name) + '</strong><a class="btn secondary sm" href="#/signin">Switch student</a></div></div>' +
      '<div class="setting-row"><div><label>My picture</label><div class="help">Pick the picture shown on the sign-in screen.</div></div><div class="avatar-grid">' + Students.AVATARS.map(a => '<button class="avatar-pick' + (a === me.avatar ? ' on' : '') + '" data-avatar="' + a + '">' + a + '</button>').join('') + '</div></div></div>' +
      '<div class="card" style="margin-bottom:1.25rem"><h2>Accessibility</h2>' +
      pref('fontScale', 'Text size', 'Make everything larger.', [[1, 'Normal'], [1.15, 'Large'], [1.3, 'Extra large']]) +
      pref('font', 'Reading font', 'Lexend is designed for easier reading.', [['default', 'Standard'], ['lexend', 'Lexend']]) +
      pref('contrast', 'Contrast', 'High contrast: black text and strong borders. Inverted: white text on a black background.', [['normal', 'Normal'], ['high', 'High'], ['inverted', 'Inverted']]) +
      pref('motion', 'Animation', 'Reduced motion removes flips, spins and slide effects.', [['normal', 'Normal'], ['reduced', 'Reduced']]) +
      sw('readAloud', 'Read aloud buttons', 'Show 🔊 buttons that read slides and questions out loud.', Settings.get('readAloud')) + '</div>' +
      '<div class="card" style="margin-bottom:1.25rem" id="appCard"><h2>📱 App</h2><p class="muted small">Checking…</p></div>' +
      '<div class="card"><h2>Progress</h2><p class="muted small">' + esc(me.name) + '\'s progress and awards are saved in this browser.</p><button class="btn ghost" id="resetBtn">Reset ' + esc(me.name) + '\'s progress</button></div>';
    renderAppCard();

    app.querySelectorAll('[data-seg]').forEach(b => b.addEventListener('click', () => { const v = b.dataset.v; Settings.set(b.dataset.seg, isNaN(v) ? v : +v); pageSettings(); }));
    app.querySelectorAll('[data-switch]').forEach(b => b.addEventListener('click', () => { Settings.set(b.dataset.switch, !(Settings.get(b.dataset.switch) !== false)); pageSettings(); }));
    app.querySelectorAll('[data-avatar]').forEach(b => b.addEventListener('click', () => { Students.update(me.id, { avatar: b.dataset.avatar }); renderWho(); pageSettings(); }));
    const on = (id, fn) => { const el = app.querySelector(id); if (el) el.addEventListener('click', fn); };
    const askPin = (label) => { const v = prompt(label + ' (6 digits):') || ''; if (!/^\d{6}$/.test(v.trim())) { if (v) alert('The PIN must be exactly 6 digits.'); return null; } return v.trim(); };
    on('#setPin', () => { const v = app.querySelector('#pinInput').value.trim(); if (!/^\d{6}$/.test(v)) return alert('The PIN must be exactly 6 digits.'); Settings.set('guardianPin', v); sessionStorage.setItem('learnhub.unlocked', '1'); pageSettings(); });
    on('#unlockBtn', () => { if (app.querySelector('#pinInput').value === Settings.get('guardianPin')) { sessionStorage.setItem('learnhub.unlocked', '1'); pageSettings(); } else alert('Wrong PIN.'); });
    const pin = app.querySelector('#pinInput'); if (pin) pin.addEventListener('keydown', e => { if (e.key === 'Enter') { const b = app.querySelector('#unlockBtn, #setPin'); if (b) b.click(); } });
    on('#lockBtn', () => { sessionStorage.removeItem('learnhub.unlocked'); pageSettings(); });
    on('#changePin', () => { const v = askPin('New Teacher Lock PIN'); if (v) { Settings.set('guardianPin', v); alert('PIN changed.'); } });
    on('#removePin', () => { if (confirm('Remove the Teacher Lock PIN? Students will be able to open the teaching controls.')) { Settings.set('guardianPin', ''); sessionStorage.removeItem('learnhub.unlocked'); pageSettings(); } });
    on('#resetBtn', () => { if (confirm('Erase all of ' + me.name + '\'s progress and awards on this device?')) { Progress.reset(); pageSettings(); } });
    if (!locked) { bindStudentsPanel(); bindFocusPlan(false); bindLessonSearch(); }
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
  function studentsPanelHtml() {
    const open = sessionStorage.getItem('learnhub.studentOpen');
    const list = Students.list;
    const pending = list.filter(s => Object.keys(s.suggestions || {}).length);
    return '<h3>👥 Students</h3><p class="muted small">Each student has their own progress, awards and Focus Plan. Set the achievement level a student works at (never shown to them), choose which courses they see, and lock that list if you wish.</p>' +
      '<div class="level-legend">' + [1, 2, 3, 4].map(l => '<span><strong>Level ' + l + ' · ' + LEVEL_NAMES[l] + '</strong> <span class="muted">' + LEVELS[l].band + ' · ' + LEVELS[l].short + '</span></span>').join('') + '</div>' +
      (pending.length ? '<div class="plan-banner">💡 <strong>Level suggestions waiting:</strong> ' + pending.map(s => esc(s.name)).join(', ') + ' — based on recent test results. Open the student to apply or dismiss.</div>' : '') +
      '<div class="student-list">' + list.map(s => {
        const isOpen = open === s.id, isMe = Students.current && Students.current.id === s.id;
        const sugg = Object.entries(s.suggestions || {});
        return '<div class="student-row' + (isOpen ? ' open' : '') + '"><button class="student-head" data-student-open="' + s.id + '">' + avatarHtml(s) + '<span class="student-name">' + esc(s.name) + (isMe ? ' <span class="tag ok">signed in</span>' : '') + '</span>' +
          '<span class="tag">Level ' + s.level + ' · ' + LEVEL_NAMES[s.level] + '</span>' + (Array.isArray(s.courses) ? '<span class="tag">' + s.courses.length + ' course' + (s.courses.length === 1 ? '' : 's') + (s.coursesLocked ? ' 🔒' : '') + '</span>' : '<span class="tag">all courses</span>') +
          (sugg.length ? '<span class="tag accent">💡 ' + sugg.length + '</span>' : '') + '<span class="muted">' + (isOpen ? '▾' : '▸') + '</span></button>' +
          (isOpen ? '<div class="student-body">' +
            (sugg.length ? '<div class="plan-section"><div class="plan-label">💡 Suggested level changes (from test results)</div>' + sugg.map(([cid, g]) => { const c = findCourse(cid); return '<div class="suggestion"><span>' + (c ? c.icon + ' ' + esc(c.title) : esc(cid)) + ': <strong>Level ' + g.from + ' → Level ' + g.level + '</strong> <span class="muted small">(' + g.pct + '% on ' + esc(g.unit) + ', ' + new Date(g.at).toLocaleDateString() + ')</span></span><span class="btn-row"><button class="btn sm success" data-sugg-apply="' + s.id + '" data-c="' + cid + '" data-l="' + g.level + '">Apply</button><button class="btn sm ghost" data-sugg-dismiss="' + s.id + '" data-c="' + cid + '">Dismiss</button></span></div>'; }).join('') + '</div>' : '') +
            '<div class="plan-section"><div class="plan-label">Default achievement level</div><div class="level-cards compact">' + [1, 2, 3, 4].map(l => '<button class="level-card ' + (s.level === l ? 'on' : '') + '" data-set-level="' + s.id + '" data-l="' + l + '"><h3>Level ' + l + ' · ' + LEVEL_NAMES[l] + '</h3><p>' + LEVEL_DESC[l] + '</p></button>').join('') + '</div></div>' +
            '<div class="plan-section"><div class="plan-label">Courses and level per course</div><p class="muted small" style="margin:0 0 0.5rem">Tick the courses this student sees. "Default" uses the level above; pick a number to set a different level for that course only.</p>' +
            allCourses().map(c => { const on = Students.enrolled(c.id, s); const cl = (s.courseLevels || {})[c.id] || '';
              return '<div class="course-line' + (on ? '' : ' off') + '"><label><input type="checkbox" data-enrol="' + s.id + '" data-c="' + c.id + '"' + (on ? ' checked' : '') + '> ' + c.icon + ' ' + esc(c.title) + '</label>' +
                (on ? '<div class="seg">' + [['', 'Default'], [1, '1'], [2, '2'], [3, '3'], [4, '4']].map(o => '<button data-course-level="' + s.id + '" data-c="' + c.id + '" data-v="' + o[0] + '" class="' + (String(cl) === String(o[0]) ? 'on' : '') + '">' + o[1] + '</button>').join('') + '</div>' : '') + '</div>'; }).join('') +
            sw('', 'Lock the course list', 'On: the student cannot add courses from the home page.', s.coursesLocked, 'data-lock-courses="' + s.id + '"') + '</div>' +
            '<div class="plan-section"><div class="plan-label">Accommodations (quizzes and tests)</div>' +
            sw('', 'Reduction', 'Fewer questions per quiz and test (about 60%).', (s.accommodations || {}).reduce, 'data-accom="reduce" data-s="' + s.id + '"') +
            sw('', 'Complexity', 'Answer choices and word banks from one level down; no typed blanks.', (s.accommodations || {}).simplify, 'data-accom="simplify" data-s="' + s.id + '"') +
            sw('', 'Chunking', 'Matching shown three pairs at a time; word banks of at most three.', (s.accommodations || {}).chunk, 'data-accom="chunk" data-s="' + s.id + '"') + '</div>' +
            workHtml(s) +
            '<div class="plan-section btn-row"><button class="btn ghost sm" data-rename="' + s.id + '">Rename</button><button class="btn ghost sm" data-reset-student="' + s.id + '">Reset progress</button><button class="btn ghost sm" data-delete="' + s.id + '">Remove student</button></div>' +
          '</div>' : '') + '</div>';
      }).join('') + '</div>' +
      '<div class="btn-row" style="margin-top:0.75rem"><input class="text-input" id="teacherAddName" maxlength="30" placeholder="Add a student by first name" style="max-width:280px"><button class="btn secondary" id="teacherAdd">＋ Add student</button></div>';
  }
  /** A student's handed-in and draft assignment work (teacher view). */
  function workHtml(s) {
    const prog = Progress.peek(s.id); const items = [];
    allCourses().forEach(c => c.units.forEach(un => { const u = (prog[c.id] || {})[un.id]; if (!u || !u.work) return;
      Object.keys(u.work).forEach(li => Object.keys(u.work[li]).forEach(n => { const w = u.work[li][n]; if (!w || !w.text) return; const les = un.lessons[li]; const a = les && (les.assignments || [])[n];
        items.push({ course: c, unit: un, les, a, w, li, n }); })); }));
    const open = sessionStorage.getItem('learnhub.workOpen') === s.id;
    return '<div class="plan-section"><button class="btn ghost sm" data-work-open="' + s.id + '">' + (open ? '▾' : '▸') + ' Assignment work (' + items.filter(x => x.w.done).length + ' handed in, ' + items.filter(x => !x.w.done).length + ' drafts)</button>' +
      (open ? (items.length ? items.map(x => '<div class="work-item' + (x.w.done ? ' done' : '') + '"><div class="work-head"><strong>' + esc(x.a ? x.a.title : 'Assignment') + '</strong> <span class="muted small">' + x.course.icon + ' ' + esc(x.les ? x.les.title : '') + ' · ' + (x.w.done ? '✓ handed in' : 'draft') + ' · ' + new Date(x.w.at).toLocaleString() + '</span></div><div class="work-text">' + esc(x.w.text) + '</div></div>').join('') : '<p class="muted small">No written work yet.</p>') : '') + '</div>';
  }
  function bindStudentsPanel() {
    const on = (sel, ev, fn) => app.querySelectorAll(sel).forEach(el => el.addEventListener(ev, fn));
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
    on('[data-delete]', 'click', e => { const s = Students.byId(e.currentTarget.dataset.delete); if (confirm('Remove ' + s.name + ' and all of their progress? This cannot be undone.')) { const wasMe = Students.current && Students.current.id === s.id; Students.removeStudent(s.id); if (wasMe) { renderWho(); location.hash = '#/signin'; } else pageSettings(); } });
    const add = () => { const v = (app.querySelector('#teacherAddName').value || '').trim(); if (!v) return; const s = Students.add(v); sessionStorage.setItem('learnhub.studentOpen', s.id); pageSettings(); };
    const b = app.querySelector('#teacherAdd'); if (b) b.addEventListener('click', add);
    const i = app.querySelector('#teacherAddName'); if (i) i.addEventListener('keydown', e => { if (e.key === 'Enter') add(); });
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
    card.innerHTML = '<h2>📱 App</h2>' +
      '<div class="setting-row" style="padding-top:0"><div><label>Status</label><div class="help">' + (d.standalone ? 'You are using the installed app.' : d.installed ? 'LearnHub is installed on this device. Open it from your home screen or app list.' : 'LearnHub is not installed on this device yet. Installing adds an icon and lets it work offline.') + '</div></div>' +
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
    const course = findCourseAll(searchState.course) || allCourses()[0]; if (!course) return '<p class="muted">No courses yet.</p>';
    searchState.course = course.id;
    const unit = course.units.find(u => u.id === searchState.unit) || course.units[0]; if (!unit) return '';
    searchState.unit = unit.id;
    const q = searchState.q.trim().toLowerCase();
    const words = q.split(/\s+/).filter(Boolean);
    const hits = q ? unit.lessons.map((les, i) => ({ i, les, text: lessonText(les) })).filter(x => words.every(w => x.text.includes(w))) : [];
    const f = Focus.unitEntry(course.id, unit.id);
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
    const body = allCourses().map(c => {
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
    const me = Students.current;
    return '<div class="setting-row" style="padding-top:0"><div><h3 style="margin:0">🎯 Focus Plan for ' + esc(me.name) + '</h3><div class="help">For a student working well below grade level: choose exactly which units, lessons, words and question topics they see, and the goals they work toward. Everything else is hidden for them. Sign in as another student to edit their plan.</div></div>' +
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
  function findCourseAll(id) { return allCourses().find(c => c.id === id); }

  function notFound() { app.innerHTML = '<div class="empty"><h2>Page not found</h2><a class="btn" href="#/">Back to courses</a></div>'; }

  /* ---------- router ---------- */
  function route() {
    const parts = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    window.scrollTo(0, 0);
    window.LH.stopSpeaking();   // leaving a page stops any reading
    renderWho();
    if (parts[0] === 'signin' || !Students.current) return pageSignin();   // nobody signed in → sign-in screen, whatever the route
    switch (parts[0]) {
      case '': return pageHome();
      case 'course': return pageCourse(parts[1]);
      case 'lesson': return pageLesson(parts[1], parts[2], parts[3]);
      case 'study': return pageStudy(parts[1], parts[2], parts[3]);
      case 'quiz': return pageQuiz(parts[1], parts[2], parts[3]);
      case 'assign': return pageAssign(parts[1], parts[2], parts[3], parts[4]);
      case 'test': return pageTest(parts[1], parts[2]);
      case 'print': return Print.page(parts[1], parts[2], parts[3], parts[4], parts[5]);
      case 'games': return pageGames(parts[1], parts[2]);
      case 'game': return pageGame(parts[1], parts[2], parts[3]);
      case 'case': return pageCase(parts[1]);
      case 'settings': return pageSettings();
      default: return notFound();
    }
  }
  window.addEventListener('hashchange', route);
  Settings.apply();
  route();
})();
