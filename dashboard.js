/* =========================================================
   dashboard.js — the Grades grid
   Teacher (#/dashboard): for the selected section, one row per student and,
   per unit, a column for every lesson quiz, every assignment (handed in? +
   a grade box the teacher fills in) and the unit test. Grades save to the
   student's progress (and to the cloud), so the student sees them too.
   Student (#/grades[/course]): the same row for themselves, read-only.
   ========================================================= */
(function () {
  const { esc, lessonsFor, assignmentsFor, lessonQuestions, unitsFor } = window.LH;
  const app = document.getElementById('app');
  const DEFAULT_MAX = 10;

  function qCell(q) {
    if (!q) return '<td class="d-cell none" title="not tried">–</td>';
    const cls = q.best >= 85 ? 'top' : q.best >= 70 ? 'pass' : 'low';
    return '<td class="d-cell ' + cls + '" title="' + q.attempts + ' attempt' + (q.attempts === 1 ? '' : 's') + '">' + q.best + '%</td>';
  }
  function tCell(u) { return qCell(u.testBest ? { best: u.testBest, attempts: u.testAttempts || 0 } : null); }
  /** Assignment cell: state + grade (editable for teachers). */
  function aCell(w, editable, ref) {
    const g = w && w.grade;
    const state = !w || !w.text ? '<span class="a-state none">–</span>' : w.done ? '<span class="a-state done" title="handed in ' + (w.at ? new Date(w.at).toLocaleDateString() : '') + '">✓</span>' : '<span class="a-state draft" title="draft">✎</span>';
    const grade = editable
      ? '<span class="grade-box"><input class="grade-in" type="number" min="0" step="0.5" value="' + (g && g.score !== undefined && g.score !== null ? g.score : '') + '" placeholder="–" ' + ref + ' title="Grade out of ' + (g && g.max || DEFAULT_MAX) + '"><span class="grade-max">/' + (g && g.max || DEFAULT_MAX) + '</span></span>'
      : (g && g.score !== undefined && g.score !== null ? '<span class="grade-show' + (g.max && g.score / g.max >= 0.7 ? ' ok' : '') + '">' + g.score + '/' + (g.max || DEFAULT_MAX) + '</span>' : '');
    const note = editable ? '<button class="grade-note-btn' + (g && g.note ? ' has' : '') + '" ' + ref.replace('data-grade=', 'data-note=') + ' title="' + (g && g.note ? esc(g.note) : 'Add a comment') + '">💬</button>' : (g && g.note ? '<span class="grade-note" title="' + esc(g.note) + '">💬</span>' : '');
    return '<td class="d-cell a-cell' + (w && w.done ? ' handed' : '') + '">' + state + grade + note + '</td>';
  }
  /** Column headers for a unit (lessons with their assignments). */
  function headers(unit, lessons, forStudent) {
    const top = ['<th class="d-name" rowspan="2">' + (forStudent ? 'Class' : 'Student') + '</th>' + (forStudent ? '' : '<th rowspan="2">Level</th>')];
    const bottom = [];
    lessons.forEach((l, i) => { const as = assignmentsFor(l); const hasQ = lessonQuestions(unit, l._idx).length > 0; const n = (hasQ ? 1 : 0) + as.length; if (!n) return;
      top.push('<th class="d-les" colspan="' + n + '" title="' + esc(l.title) + '">L' + (i + 1) + '</th>');
      if (hasQ) bottom.push('<th class="d-sub" title="Lesson quiz">quiz</th>');
      as.forEach((a, k) => bottom.push('<th class="d-sub" title="' + esc(a.title) + '">✍️' + (k + 1) + '</th>')); });
    top.push('<th rowspan="2">Unit test</th><th rowspan="2">Awards</th>');
    return '<tr>' + top.join('') + '</tr><tr>' + bottom.join('') + '</tr>';
  }
  function rowCells(course, unit, lessons, u, editable, sid) {
    const quiz = u.quiz || {}, work = u.work || {};
    let cells = '';
    lessons.forEach(l => { const as = assignmentsFor(l); const hasQ = lessonQuestions(unit, l._idx).length > 0;
      if (hasQ) cells += qCell(quiz[l._idx]);
      as.forEach(a => cells += aCell((work[l._idx] || {})[a._idx], editable, 'data-grade="' + sid + '" data-c="' + course.id + '" data-u="' + unit.id + '" data-l="' + l._idx + '" data-n="' + a._idx + '"')); });
    return cells + tCell(u) + '<td class="d-cell none">' + Object.keys(u.earned || {}).length + '</td>';
  }
  function bindGrades(courseId) {
    app.querySelectorAll('.grade-in').forEach(inp => {
      const save = () => { const d = inp.dataset; const v = inp.value.trim(); const cur = ((Progress.peek(d.grade)[d.c] || {})[d.u] || {}); const w = ((cur.work || {})[d.l] || {})[d.n] || {}; const max = (w.grade && w.grade.max) || DEFAULT_MAX;
        if (v === '') Progress.setGrade(d.grade, d.c, d.u, +d.l, +d.n, null); else Progress.setGrade(d.grade, d.c, d.u, +d.l, +d.n, { score: +v, max, by: (Staff.current || {}).name || 'teacher' });
        inp.classList.add('saved'); setTimeout(() => inp.classList.remove('saved'), 800); };
      inp.addEventListener('change', save);
      inp.addEventListener('keydown', e => { if (e.key === 'Enter') { inp.blur(); } });
    });
    app.querySelectorAll('.grade-note-btn').forEach(b => b.addEventListener('click', () => { const d = b.dataset; const cur = ((Progress.peek(d.note)[d.c] || {})[d.u] || {}); const w = ((cur.work || {})[d.l] || {})[d.n] || {}; const g = w.grade || {};
      const v = prompt('Comment for the student (leave empty to remove):', g.note || ''); if (v === null) return;
      Progress.setGrade(d.note, d.c, d.u, +d.l, +d.n, { score: g.score === undefined ? null : g.score, max: g.max || DEFAULT_MAX, note: v.trim(), by: (Staff.current || {}).name || 'teacher' });
      b.classList.toggle('has', !!v.trim()); b.title = v.trim() || 'Add a comment'; }));
  }

  /* ---------- teacher grid ---------- */
  function page() {
    if (Settings.locked || !Staff.master) { location.hash = '#/settings'; return; }
    const staff = Staff.current; const sid = staff.id;
    document.documentElement.style.setProperty('--course', 'var(--primary)');
    const sections = Sections.visible(sid, true);
    const cur = Sections.currentFor(sid);
    let students, course;
    if (cur) { students = Students.list.filter(s => (cur.students || []).includes(s.id)); course = window.LearnHub.courses.find(c => c.id === cur.courseId); }
    else {
      const ids = new Set(); if (Staff.isMaster) Students.list.forEach(s => ids.add(s.id)); else Sections.visible(sid, true).forEach(sec => (sec.students || []).forEach(id => ids.add(id)));
      students = Students.list.filter(s => ids.has(s.id));
      const cid = sessionStorage.getItem('learnhub.dashCourse'); course = window.LearnHub.courses.find(c => c.id === cid) || window.LearnHub.courses[0];
    }
    const head = '<div class="page-head"><div><h1>📊 Grades</h1><p class="muted">' + (cur ? esc(cur.name) + (cur.term ? ' · ' + esc(cur.term) : '') + (cur.archived ? ' · 📦 archived' : '') : (Staff.isMaster ? 'All students' : 'All my students')) + ' · ' + students.length + ' student' + (students.length === 1 ? '' : 's') + '</p></div>' +
      '<div class="btn-row"><select class="text-input" id="dashSection" style="max-width:260px"><option value="">' + (Staff.isMaster ? 'All students' : 'All my students') + '</option>' + sections.map(sec => '<option value="' + sec.id + '"' + (cur && cur.id === sec.id ? ' selected' : '') + '>' + (sec.archived ? '📦 ' : '') + esc(sec.name) + '</option>').join('') + '</select>' +
      (!cur ? '<select class="text-input" id="dashCourse" style="max-width:220px">' + window.LearnHub.courses.map(c => '<option value="' + c.id + '"' + (course && c.id === course.id ? ' selected' : '') + '>' + c.icon + ' ' + esc(c.title) + '</option>').join('') + '</select>' : '') +
      '<button class="btn secondary" id="dashPrint">🖨️ Print</button><a class="btn ghost" href="#/settings">Settings</a></div></div>';
    if (!course) { app.innerHTML = head + '<div class="empty">No course.</div>'; return; }
    Settings.activeCourse = course.id;
    const tables = course.units.map((un, ui) => {
      const lessons = un.lessons.map((l, i) => Object.assign({ _idx: i }, l));
      const rows = students.map(s => {
        const prog = Progress.peek(s.id); const u = (prog[course.id] || {})[un.id] || {};
        const t = Students.trackFor(course.id, s);
        const lvl = t ? '<span class="tag">Mod · ' + ({ k2: 'K–2', g35: '3–5', g68: '6–8' }[t.band]) + '</span>' : '<span class="tag">L' + Students.levelFor(course.id, s) + '</span>';
        return '<tr><td class="d-name"><a href="#/settings" data-open-student="' + s.id + '">' + s.avatar + ' ' + esc(s.name) + '</a>' + (s.number ? '<div class="muted small">#' + esc(s.number) + '</div>' : '') + '</td><td>' + lvl + '</td>' + rowCells(course, un, lessons, u, true, s.id) + '</tr>';
      }).join('');
      return '<details class="card unit-grid"' + (ui === 0 ? ' open' : '') + '><summary class="unit-summary"><h2 style="margin:0">' + (/^unit\s*\d/i.test(un.title) ? '' : 'Unit ' + (ui + 1) + ' · ') + esc(un.title) + '</h2><span class="fold-hint">' + lessons.length + ' lessons · tap to open</span></summary><div class="d-wrap"><table class="dash">' + headers(un, lessons, false) + rows + '</table></div></details>';
    }).join('');
    app.innerHTML = head + '<p class="small muted">Quiz and test cells: <span class="d-key top">85%+</span> <span class="d-key pass">70–84%</span> <span class="d-key low">below 70%</span> · assignments: <strong>✓</strong> handed in, <strong>✎</strong> draft, <strong>–</strong> not started · type a grade in the box (out of ' + DEFAULT_MAX + ') and it is saved for the student to see · click a name to open the student in Settings.</p>' + tables +
      (students.length ? '' : '<div class="empty">No students in this section yet.</div>');
    app.querySelector('#dashSection').addEventListener('change', e => { Sections.setCurrent(sid, e.target.value || null); page(); });
    const dc = app.querySelector('#dashCourse'); if (dc) dc.addEventListener('change', e => { sessionStorage.setItem('learnhub.dashCourse', e.target.value); page(); });
    app.querySelector('#dashPrint').addEventListener('click', () => { app.querySelectorAll('details.unit-grid').forEach(d => d.open = true); window.print(); });
    app.querySelectorAll('[data-open-student]').forEach(a => a.addEventListener('click', () => sessionStorage.setItem('learnhub.studentOpen', a.dataset.openStudent)));
    bindGrades(course.id);
  }

  /* ---------- student view ---------- */
  function studentPage(courseId) {
    const me = Students.current; if (!me || me.isStaff) { location.hash = '#/'; return; }
    const all = window.LearnHub.courses.filter(c => Students.enrolled(c.id) && !Students.isArchived(c.id));
    const list = courseId ? all.filter(c => c.id === courseId) : all;
    document.documentElement.style.setProperty('--course', 'var(--primary)');
    app.innerHTML = '<div class="page-head"><div><h1>📊 Grades</h1><p class="muted">Your quiz and test scores, what you have handed in, and the grades your teacher has given.</p></div>' +
      (courseId ? '<a class="btn secondary" href="#/grades">All classes</a>' : '') + '</div>' +
      '<p class="small muted">Quiz and test cells: <span class="d-key top">85%+</span> <span class="d-key pass">70–84%</span> <span class="d-key low">below 70%</span> · assignments: <strong>✓</strong> handed in, <strong>✎</strong> draft, <strong>–</strong> not started · a grade like <strong>8/10</strong> was given by your teacher.</p>' +
      (list.length ? list.map(c => {
        Settings.activeCourse = c.id;
        const units = unitsFor(c).map((un, ui) => { const lessons = lessonsFor(un); const u = Progress.unit(c.id, un.id);
          const notes = []; lessons.forEach(l => assignmentsFor(l).forEach(a => { const w = ((u.work || {})[l._idx] || {})[a._idx]; if (w && w.grade && w.grade.note) notes.push('<li><strong>' + esc(a.title) + ':</strong> ' + esc(w.grade.note) + '</li>'); }));
          return '<details class="card unit-grid"><summary class="unit-summary"><h3 style="margin:0">' + (/^unit\s*\d/i.test(un.title) ? '' : 'Unit ' + (c.units.indexOf(un) + 1) + ' · ') + esc(un.title) + '</h3><span class="fold-hint">' + (u.testBest ? 'test ' + u.testBest + '% · ' : '') + 'tap to open</span></summary><div class="d-wrap"><table class="dash">' + headers(un, lessons, true) + '<tr><td class="d-name">' + c.icon + ' ' + esc(c.title) + '</td>' + rowCells(c, un, lessons, u, false, me.id) + '</tr></table></div>' + (notes.length ? '<div class="small" style="margin-top:0.5rem"><strong>Teacher comments</strong><ul>' + notes.join('') + '</ul></div>' : '') + '</details>'; }).join('');
        return '<section class="class-grades" style="--course:' + esc(c.color || '') + '"><h2>' + c.icon + ' ' + esc(c.title) + '</h2>' + units + '</section>';
      }).join('') : '<div class="empty">You are not in any class yet.</div>');
    Settings.activeCourse = null;
  }

  window.Dashboard = { page };
  window.Grades = { page: studentPage };
})();
