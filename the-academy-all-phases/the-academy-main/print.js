/* =========================================================
   print.js — printable versions of lessons and assessments
   Routes (all render into #app with a print toolbar):
     #/print/:course/:unit/slides/:i      one lesson's slides as a handout
     #/print/:course/:unit/quiz/:i        one lesson's quiz on paper
     #/print/:course/:unit/assign/:i/:n   one assignment sheet
     #/print/:course/:unit/lesson/:i      whole lesson: slides + quiz + assignments
     #/print/:course/:unit/test           the unit test on paper
     #/print/:course/:unit/unit           the whole unit (every lesson + the unit test)
   The answer key is appended when the Teacher Lock is open and the toggle is on.
   Paper copies use the signed-in student's level and accommodations, like the screen.
   ========================================================= */
(function () {
  const { L, esc, md, slidesFor, questionsFor, lessonQuestions, assignmentsFor, lessonsFor, findCourse, findUnit, byLevel, assessmentCount, assessmentOrder, termsFor } = window.LH;
  const app = document.getElementById('app');
  const keyOn = () => !Settings.locked && sessionStorage.getItem('learnhub.printKey') === '1';

  /* ---------- pieces ---------- */
  function slidesHtml(course, unit, les, n) {
    const slides = slidesFor(les);
    return '<section class="p-section"><h2 class="p-h2">Lesson ' + n + ' · ' + esc(les.title) + '</h2>' +
      slides.map((s, i) => '<div class="p-slide"><h3>' + (s.visual ? s.visual + ' ' : '') + esc(L(s.title)) + '</h3>' + md(L(s.body)) + (s.html ? L(s.html) : '') +
        (les.media || []).filter(m => m.slide === i && m.src).map(m => m.type === 'image' ? '<figure class="p-fig"><img src="' + esc(m.src) + '" alt="' + esc(m.title) + '"><figcaption>' + esc(m.title) + '</figcaption></figure>' : '<p class="p-media">🎬 ' + esc(m.title) + ' — ' + esc(m.src) + '</p>').join('') + '</div>').join('') +
      '</section>';
  }
  function termsHtml(unit, les) {
    // a lesson's words: the unit terms that appear in its slides
    const text = slidesFor(les).map(s => String(L(s.body)) + ' ' + String(L(s.title))).join(' ').toLowerCase();
    const terms = termsFor(unit).filter(t => text.includes(String(t.term).toLowerCase()));
    if (!terms.length) return '';
    return '<div class="p-terms"><h3>Words to know</h3><table class="md-table"><tbody>' + terms.map(t => '<tr><td><strong>' + esc(t.term) + '</strong></td><td>' + esc(t.def) + '</td></tr>').join('') + '</tbody></table></div>';
  }
  const LET = 'abcdefgh';
  function questionsHtml(qs, title, sub) {
    let n = 0;
    const body = qs.map(q => {
      n++;
      if (q.type === 'mc') return '<div class="p-q"><div class="p-prompt">' + n + '. ' + esc(q.prompt) + '</div><ol class="p-opts">' + q.options.map((o, i) => '<li>' + LET[i] + ')  ' + esc(o) + '</li>').join('') + '</ol></div>';
      if (q.type === 'tf') return '<div class="p-q"><div class="p-prompt">' + n + '. <span class="p-tf">T &nbsp; F</span> ' + esc(q.prompt) + '</div></div>';
      if (q.type === 'fill') return '<div class="p-q"><div class="p-prompt">' + n + '. ' + esc(q.prompt).replace(/_{2,}/, '<span class="p-blank"></span>') + '</div>' + (q.freeType ? '' : '<div class="p-bank">Word bank: ' + q.bank.map(b => '<span>' + esc(b) + '</span>').join(' · ') + '</div>') + '</div>';
      if (q.type === 'match') {
        const right = q.pairs.map((p, i) => ({ i, t: p[1] })).sort(() => Math.random() - 0.5);
        q._order = right.map(r => r.i);
        return '<div class="p-q"><div class="p-prompt">' + n + '. ' + esc(q.prompt || 'Match each item to its pair.') + '</div><table class="p-match"><tbody>' +
          q.pairs.map((p, i) => '<tr><td class="p-left">____ ' + esc(p[0]) + '</td><td class="p-right"><strong>' + LET[i].toUpperCase() + '</strong> ' + esc(right[i].t) + '</td></tr>').join('') + '</tbody></table></div>';
      }
      return '';
    }).join('');
    return '<section class="p-section p-test"><h2 class="p-h2">' + esc(title) + '</h2><p class="p-meta">' + esc(sub) + '</p><div class="p-namebar">Name: ____________________________ &nbsp;&nbsp; Date: ______________ &nbsp;&nbsp; Mark: ______ / ' + qs.length + '</div>' + body + '</section>';
  }
  function keyHtml(qs, title) {
    let n = 0;
    return '<section class="p-section p-key"><h2 class="p-h2">Answer key — ' + esc(title) + '</h2><ol class="p-keylist">' + qs.map(q => {
      n++;
      if (q.type === 'mc') return '<li>' + LET[q.options.indexOf(q.answer)] + ')  ' + esc(q.answer) + '</li>';
      if (q.type === 'tf') return '<li>' + (q.answer ? 'True' : 'False') + '</li>';
      if (q.type === 'fill') return '<li>' + esc(q.answer) + '</li>';
      if (q.type === 'match') return '<li>' + q.pairs.map((p, i) => esc(p[0]) + ' → ' + LET[q._order ? q._order.indexOf(i) : i].toUpperCase()).join('; ') + '</li>';
      return '<li></li>';
    }).join('') + '</ol></section>';
  }
  function assignHtml(les, a, n) {
    return '<section class="p-section p-assign"><h2 class="p-h2">Assignment' + (n ? ' ' + n : '') + ' · ' + esc(a.title) + '</h2><p class="p-meta">' + esc(les.title) + (a.expectations ? ' · ' + esc(a.expectations) : '') + '</p>' +
      '<div class="p-namebar">Name: ____________________________ &nbsp;&nbsp; Date: ______________</div>' + md(L(a.prompt)) +
      '<div class="p-success"><strong>A complete answer…</strong> ' + esc(L(a.success)) + '</div>' +
      (L(a.starter) ? '<p class="p-starter">' + esc(L(a.starter)) + '</p>' : '') +
      '<div class="p-lines">' + '<div></div>'.repeat(14) + '</div></section>';
  }
  function quizSet(unit, i) { const level = Settings.level; return assessmentOrder(lessonQuestions(unit, i, level).slice(0, assessmentCount(byLevel(level, [4, 6, 8, 10])))); }
  function testSet(unit) { const level = Settings.level; return assessmentOrder(questionsFor(unit, level).slice(0, assessmentCount(byLevel(level, [5, 8, 12, 15])))); }

  /* ---------- page ---------- */
  function page(courseId, unitId, what, i, n) {
    const course = findCourse(courseId), unit = findUnit(course, unitId); if (!unit) { app.innerHTML = '<div class="empty">Nothing to print.</div>'; return; }
    document.documentElement.style.setProperty('--course', course.color || 'var(--primary)');
    Settings.activeCourse = course.id;
    const lessons = lessonsFor(unit); i = +i || 0; n = +n || 0;
    const les = unit.lessons[i]; const pos = lessons.findIndex(l => l._idx === i) + 1;
    const me = Students.current;
    let title = '', parts = [], keys = [];
    const addQuiz = (les, i, pos) => { const qs = quizSet(unit, i); if (qs.length) { parts.push(questionsHtml(qs, 'Quiz · Lesson ' + pos + ' · ' + les.title, unit.title + ' · ' + qs.length + ' questions')); keys.push(keyHtml(qs, 'Lesson ' + pos + ' quiz')); } };
    const addTest = () => { const qs = testSet(unit); if (qs.length) { parts.push(questionsHtml(qs, 'Unit test · ' + unit.title, course.title + ' · ' + qs.length + ' questions · covers every lesson')); keys.push(keyHtml(qs, 'Unit test')); } };
    const addAssign = (les, pos) => assignmentsFor(les).forEach((a, k) => parts.push(assignHtml(les, a, k + 1)));
    const addLesson = (les, pos) => { parts.push(slidesHtml(course, unit, les, pos)); parts.push(termsHtml(unit, les)); addQuiz(les, les._idx !== undefined ? les._idx : unit.lessons.indexOf(les), pos); addAssign(les, pos); };
    switch (what) {
      case 'slides': title = 'Lesson ' + pos + ' slides'; parts.push(slidesHtml(course, unit, les, pos), termsHtml(unit, les)); break;
      case 'quiz': title = 'Lesson ' + pos + ' quiz'; addQuiz(les, i, pos); break;
      case 'assign': { const a = assignmentsFor(les).find(x => x._idx === n); title = 'Assignment'; if (a) parts.push(assignHtml(les, a, assignmentsFor(les).indexOf(a) + 1)); break; }
      case 'lesson': title = 'Lesson ' + pos + ' · ' + les.title; addLesson(Object.assign({ _idx: i }, les), pos); break;
      case 'test': title = 'Unit test'; addTest(); break;
      case 'unit': title = unit.title; lessons.forEach((l, k) => addLesson(l, k + 1)); addTest(); break;
      default: app.innerHTML = '<div class="empty">Nothing to print.</div>'; return;
    }
    const back = what === 'test' || what === 'unit' ? '#/course/' + course.id : '#/lesson/' + course.id + '/' + unit.id + '/' + i;
    app.innerHTML = '<div class="print-toolbar"><div><strong>🖨️ Print preview</strong> <span class="muted small">' + esc(title) + ' · ' + esc(course.title) + ' · prepared for ' + esc(me ? me.name : 'student') + '</span></div>' +
      '<div class="btn-row">' + (!Settings.locked ? '<label class="small"><input type="checkbox" id="keyToggle"' + (keyOn() ? ' checked' : '') + '> Include answer key</label>' : '') +
      '<button class="btn" id="printNow">Print / Save as PDF</button><a class="btn secondary" href="' + back + '">✕ Close</a></div></div>' +
      '<div class="print-doc"><header class="p-head"><div class="p-course">' + course.icon + ' ' + esc(course.title) + '</div><div class="p-unit">' + esc(unit.title) + '</div></header>' +
      parts.join('') + (keyOn() ? keys.join('') : '') +
      '<footer class="p-foot">' + esc(course.title) + ' · ' + esc(unit.title) + ' · The Academy</footer></div>';
    app.querySelector('#printNow').addEventListener('click', () => window.print());
    const kt = app.querySelector('#keyToggle'); if (kt) kt.addEventListener('change', () => { sessionStorage.setItem('learnhub.printKey', kt.checked ? '1' : '0'); page(courseId, unitId, what, i, n); });
  }

  /** Small print button used on pages: Print.button('#/print/…', 'Print lesson') */
  function button(href, label) { return '<a class="btn ghost sm print-btn" href="' + href + '" title="Print or save as PDF">🖨️ ' + esc(label || 'Print') + '</a>'; }

  window.Print = { page, button };
})();
