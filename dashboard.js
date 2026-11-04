/* =========================================================
   dashboard.js — teacher dashboard: students × lessons for a section
   Route #/dashboard (needs the Teacher Lock to be open). Shows, for the
   selected section (or all of a teacher's students), one row per student:
   level / Modified band, then per lesson the quiz best score, and per unit
   the test best, assignments handed in and awards. Printable.
   ========================================================= */
(function () {
  const { esc, lessonsFor, assignmentsFor, lessonQuestions } = window.LH;
  const app = document.getElementById('app');

  function cell(pct, attempts) {
    if (pct === undefined || pct === null) return '<td class="d-cell none" title="not tried">–</td>';
    const cls = pct >= 85 ? 'top' : pct >= 70 ? 'pass' : 'low';
    return '<td class="d-cell ' + cls + '" title="' + attempts + ' attempt' + (attempts === 1 ? '' : 's') + '">' + pct + '%</td>';
  }
  function page() {
    if (Settings.locked || !Staff.master) { location.hash = '#/settings'; return; }
    const staff = Staff.current; const sid = staff.id;
    document.documentElement.style.setProperty('--course', 'var(--primary)');
    const sections = Sections.visible(sid, true);
    const cur = Sections.currentFor(sid);
    // students + course in scope
    let students, course;
    if (cur) { students = Students.list.filter(s => (cur.students || []).includes(s.id)); course = window.LearnHub.courses.find(c => c.id === cur.courseId); }
    else {
      const ids = new Set(); if (Staff.isMaster) Students.list.forEach(s => ids.add(s.id)); else Sections.visible(sid, true).forEach(sec => (sec.students || []).forEach(id => ids.add(id)));
      students = Students.list.filter(s => ids.has(s.id));
      const cid = sessionStorage.getItem('learnhub.dashCourse'); course = window.LearnHub.courses.find(c => c.id === cid) || window.LearnHub.courses[0];
    }
    const head = '<div class="page-head"><div><h1>📊 Dashboard</h1><p class="muted">' + (cur ? esc(cur.name) + (cur.term ? ' · ' + esc(cur.term) : '') + (cur.archived ? ' · 📦 archived' : '') : (Staff.isMaster ? 'All students on this device' : 'All my students')) + ' · ' + students.length + ' student' + (students.length === 1 ? '' : 's') + '</p></div>' +
      '<div class="btn-row"><select class="text-input" id="dashSection" style="max-width:260px"><option value="">' + (Staff.isMaster ? 'All students' : 'All my students') + '</option>' + sections.map(sec => '<option value="' + sec.id + '"' + (cur && cur.id === sec.id ? ' selected' : '') + '>' + (sec.archived ? '📦 ' : '') + esc(sec.name) + '</option>').join('') + '</select>' +
      (!cur ? '<select class="text-input" id="dashCourse" style="max-width:220px">' + window.LearnHub.courses.map(c => '<option value="' + c.id + '"' + (course && c.id === course.id ? ' selected' : '') + '>' + c.icon + ' ' + esc(c.title) + '</option>').join('') + '</select>' : '') +
      '<button class="btn secondary" id="dashPrint">🖨️ Print</button><a class="btn ghost" href="#/settings">Settings</a></div></div>';
    if (!course) { app.innerHTML = head + '<div class="empty">No course.</div>'; return; }
    Settings.activeCourse = course.id;
    const tables = course.units.map((un, ui) => {
      const lessons = un.lessons.map((l, i) => Object.assign({ _idx: i }, l));
      const header = '<tr><th class="d-name">Student</th><th>Level</th>' + lessons.map((l, i) => '<th class="d-les" title="' + esc(l.title) + '">L' + (i + 1) + '</th>').join('') + '<th>Unit test</th><th>Handed in</th><th>Awards</th></tr>';
      const rows = students.map(s => {
        const prog = Progress.peek(s.id); const u = (prog[course.id] || {})[un.id] || {};
        const t = Students.trackFor(course.id, s);
        const lvl = t ? '<span class="tag">Mod · ' + ({ k2: 'K–2', g35: '3–5', g68: '6–8' }[t.band]) + '</span>' : '<span class="tag">L' + Students.levelFor(course.id, s) + '</span>';
        const quiz = u.quiz || {}, work = u.work || {};
        let total = 0, handed = 0;
        lessons.forEach(l => { const as = (l.assignments || []).filter(a => t ? (a.bands && a.bands.includes(t.band)) : !a.bands); total += as.length; const w = work[l._idx] || {}; as.forEach((a, k) => { const idx = (l.assignments || []).indexOf(a); if (w[idx] && w[idx].done) handed++; }); });
        const awards = Object.keys(u.earned || {}).length;
        return '<tr><td class="d-name"><a href="#/settings" data-open-student="' + s.id + '">' + s.avatar + ' ' + esc(s.name) + '</a></td><td>' + lvl + '</td>' +
          lessons.map(l => { const q = quiz[l._idx]; return cell(q ? q.best : undefined, q ? q.attempts : 0); }).join('') +
          cell(u.testBest || undefined, u.testAttempts || 0) + '<td class="d-cell ' + (total && handed >= total ? 'top' : handed ? 'pass' : 'none') + '">' + handed + '/' + total + '</td><td class="d-cell none">' + awards + '</td></tr>';
      }).join('');
      return '<div class="card" style="margin-bottom:1.25rem"><h2>' + esc(un.title) + '</h2><div class="d-wrap"><table class="dash">' + header + rows + '</table></div></div>';
    }).join('');
    app.innerHTML = head + '<p class="small muted">Quiz cells: <span class="d-key top">85%+</span> <span class="d-key pass">70–84%</span> <span class="d-key low">below 70%</span> · hover a cell for attempts · click a name to open the student in Settings.</p>' + tables +
      (students.length ? '' : '<div class="empty">No students in this section yet.</div>');
    app.querySelector('#dashSection').addEventListener('change', e => { Sections.setCurrent(sid, e.target.value || null); page(); });
    const dc = app.querySelector('#dashCourse'); if (dc) dc.addEventListener('change', e => { sessionStorage.setItem('learnhub.dashCourse', e.target.value); page(); });
    app.querySelector('#dashPrint').addEventListener('click', () => window.print());
    app.querySelectorAll('[data-open-student]').forEach(a => a.addEventListener('click', () => sessionStorage.setItem('learnhub.studentOpen', a.dataset.openStudent)));
  }
  window.Dashboard = { page };
})();
