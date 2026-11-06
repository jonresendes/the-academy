/* =========================================================
   overlay.js — the classroom shell: a teacher's own version of a course
   for one section, stored as an overlay on that section (never in the
   course files). Students in the section see the course through it.
   This file holds the editing UI; util.js applies the overlay when
   lessons, slides, questions, terms and assignments are read.
   ========================================================= */
(function () {
  const { esc, L, unitOverlay, overlaySection, lessonAt, lessonsFor, slidesFor, assignmentsFor, lessonQuestions, lessonCat, termsFor, qKey, CUSTOM_BASE, LEVEL_NAMES } = window.LH;
  const BANDS = [['k2', 'K–2'], ['g35', 'Grades 3–5'], ['g68', 'Grades 6–8']];
  const editing = () => sessionStorage.getItem('learnhub.editMode') === '1';
  /** Can the signed-in profile customise this course? (teacher with a section selected for it) */
  function canEdit(course) { const s = Students.current; return !!(s && s.isStaff && overlaySection(course.id)); }
  function on() { const s = Students.current; return editing() && !!(s && s.isStaff && s.staffId && Sections.currentFor(s.staffId)); }
  function save() { Sections.save(); }
  const lv4 = (v) => ({ 1: L(v, 1), 2: L(v, 2), 3: L(v, 3), 4: L(v, 4) });
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  /* ---------- banner shown on course / lesson / slide pages ---------- */
  function bar(course) {
    const s = Students.current; if (!s || !s.isStaff) return '';
    const sec = overlaySection(course.id);
    if (!sec) { const mine = Sections.visible(s.staffId, false).filter(x => x.courseId === course.id); return '<div class="ov-bar muted">🏫 To customise this course for a class, pick one of your ' + esc(course.title) + ' sections' + (mine.length ? ': <select class="text-input" id="ovPick" style="max-width:260px;display:inline-block"><option value="">choose a section…</option>' + mine.map(x => '<option value="' + x.id + '">' + esc(x.name) + '</option>').join('') + '</select>' : ' (create one in Settings → Sections first)') + '.</div>'; }
    return '<div class="ov-bar' + (on() ? ' on' : '') + '">✏️ <strong>' + esc(sec.name) + '</strong> — ' + (on() ? 'customising: changes apply only to this section.' : 'this section has ' + countChanges(sec, course.id) + ' customisation' + (countChanges(sec, course.id) === 1 ? '' : 's') + '.') +
      '<span class="btn-row"><button class="btn sm ' + (on() ? 'success' : 'secondary') + '" id="ovToggle">' + (on() ? '✓ Done customising' : '✏️ Customise') + '</button></span></div>';
  }
  function countChanges(sec, courseId) {
    const c = sec.overlay && sec.overlay[courseId]; if (!c) return 0; let n = 0;
    Object.values(c).forEach(u => { if (u.lessonOrder) n++; Object.values(u.lessons || {}).forEach(l => { if (l.hidden || l.title) n++; n += Object.keys(l.slides || {}).length + (l.addSlides || []).length + Object.keys(l.assignments || {}).length + (l.addAssignments || []).length + (l.addMedia || []).length + Object.keys(l.media || {}).length; });
      n += (u.customLessons || []).length + ((u.questions || {}).hidden || []).length + Object.keys((u.questions || {}).edited || {}).length + ((u.questions || {}).added || []).length + ((u.terms || {}).hidden || []).length + ((u.terms || {}).added || []).length; });
    return n;
  }
  function bindBar(rerender) {
    const t = document.getElementById('ovToggle'); if (t) t.addEventListener('click', () => { sessionStorage.setItem('learnhub.editMode', on() ? '0' : '1'); rerender(); });
    const p = document.getElementById('ovPick'); if (p) p.addEventListener('change', () => { if (p.value) { Sections.setCurrent(Students.current.staffId, p.value); sessionStorage.setItem('learnhub.editMode', '1'); rerender(); } });
  }

  /* ---------- lesson-level tools (course page) ---------- */
  function lessonTools(course, unit, les) {
    if (!on()) return '';
    const o = (les._ov || {});
    return '<div class="ov-tools"><button class="btn ghost sm" data-ov-move="up" data-u="' + unit.id + '" data-i="' + les._idx + '">▲</button><button class="btn ghost sm" data-ov-move="down" data-u="' + unit.id + '" data-i="' + les._idx + '">▼</button>' +
      '<button class="btn ghost sm" data-ov-rename="' + les._idx + '" data-u="' + unit.id + '">Rename</button><button class="btn ghost sm" data-ov-hide="' + les._idx + '" data-u="' + unit.id + '">Hide</button>' +
      (les._custom ? '<button class="btn ghost sm" data-ov-dellesson="' + les._idx + '" data-u="' + unit.id + '">Delete</button>' : (o.title ? '<button class="btn ghost sm" data-ov-untitle="' + les._idx + '" data-u="' + unit.id + '">Original name</button>' : '')) +
      (les._ov && (les._ov.title || Object.keys(les._ov.slides || {}).length || (les._ov.addSlides || []).length || Object.keys(les._ov.assignments || {}).length || (les._ov.addAssignments || []).length) ? '<span class="tag accent">✏️ customised</span>' : '') + (les._custom ? '<span class="tag accent">your lesson</span>' : '') + '</div>';
  }
  function unitTools(course, unit) {
    if (!on()) return '';
    const ov = unitOverlay(unit);
    const hidden = []; (unit.lessons || []).forEach((l, i) => { if (ov && ov.lessons && ov.lessons[i] && ov.lessons[i].hidden) hidden.push({ i, title: (ov.lessons[i].title || l.title) }); });
    (ov && ov.customLessons || []).forEach((l, k) => { const i = CUSTOM_BASE + k; if (ov.lessons && ov.lessons[i] && ov.lessons[i].hidden) hidden.push({ i, title: l.title }); });
    const terms = termsFor(unit);
    return '<div class="ov-unit"><div class="plan-label">✏️ Customise this unit</div><div class="btn-row">' +
      '<button class="btn secondary sm" data-ov-addlesson="' + unit.id + '">＋ Add a lesson</button>' +
      (hidden.length ? '<span class="small">Hidden: ' + hidden.map(h => '<button class="btn ghost sm" data-ov-unhide="' + h.i + '" data-u="' + unit.id + '">↩ ' + esc(h.title) + '</button>').join('') + '</span>' : '') +
      '<button class="btn ghost sm" data-ov-resetunit="' + unit.id + '">Reset this unit to the program</button></div>' +
      '<details style="margin-top:0.5rem"><summary class="small">Words to learn (' + terms.length + ')</summary><div class="word-bank" style="margin-top:0.4rem">' + terms.map(t => '<span class="chip">' + esc(t.term) + ' <button class="ov-x" data-ov-hideterm="' + esc(t.key) + '" data-u="' + unit.id + '" title="Hide this word">✕</button></span>').join('') + '</div>' +
      '<div class="btn-row" style="margin-top:0.4rem"><input class="text-input" id="ovTerm-' + unit.id + '" placeholder="New word" style="max-width:180px"><input class="text-input" id="ovDef-' + unit.id + '" placeholder="Simple meaning" style="max-width:360px"><button class="btn secondary sm" data-ov-addterm="' + unit.id + '">Add word</button></div>' +
      (ov && ov.terms && ov.terms.hidden && ov.terms.hidden.length ? '<div class="small muted" style="margin-top:0.3rem">Hidden words: ' + ov.terms.hidden.map(t => '<button class="btn ghost sm" data-ov-unhideterm="' + esc(t) + '" data-u="' + unit.id + '">↩ ' + esc(t) + '</button>').join('') + '</div>' : '') + '</details></div>';
  }
  function bindCourse(course, rerender) {
    bindBar(rerender);
    const q = sel => document.querySelectorAll(sel);
    const unitOf = id => course.units.find(u => u.id === id);
    const lo = (unit, i) => { const ov = unitOverlay(unit, true); ov.lessons[i] = ov.lessons[i] || {}; return ov.lessons[i]; };
    q('[data-ov-move]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.u), i = +b.dataset.i; const ov = unitOverlay(unit, true);
      const order = lessonsFor(unit).map(l => l._idx); const hiddenIdx = (ov.lessonOrder || unit.lessons.map((_, k) => k)).filter(k => !order.includes(k));
      const p = order.indexOf(i), np = b.dataset.ovMove === 'up' ? p - 1 : p + 1; if (p < 0 || np < 0 || np >= order.length) return;
      order.splice(p, 1); order.splice(np, 0, i); ov.lessonOrder = order.concat(hiddenIdx); save(); rerender(); }));
    q('[data-ov-rename]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.u), i = +b.dataset.ovRename; const les = lessonAt(unit, i); const v = prompt('Lesson name for this section:', les.title); if (v && v.trim()) { if (les._custom) { unitOverlay(unit, true).customLessons[i - CUSTOM_BASE].title = v.trim(); } else lo(unit, i).title = v.trim(); save(); rerender(); } }));
    q('[data-ov-untitle]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.u); delete lo(unit, +b.dataset.ovUntitle).title; save(); rerender(); }));
    q('[data-ov-hide]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.u); lo(unit, +b.dataset.ovHide).hidden = true; save(); rerender(); }));
    q('[data-ov-unhide]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.u); delete lo(unit, +b.dataset.ovUnhide).hidden; save(); rerender(); }));
    q('[data-ov-dellesson]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.u), i = +b.dataset.ovDellesson; if (!confirm('Delete this lesson you added?')) return; const ov = unitOverlay(unit, true); ov.customLessons.splice(i - CUSTOM_BASE, 1); delete ov.lessons[i]; if (ov.lessonOrder) ov.lessonOrder = ov.lessonOrder.filter(k => k !== i).map(k => k > i && k >= CUSTOM_BASE ? k - 1 : k); save(); rerender(); }));
    q('[data-ov-addlesson]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.ovAddlesson); const v = prompt('Name of the new lesson:'); if (!v || !v.trim()) return; const ov = unitOverlay(unit, true); ov.customLessons = ov.customLessons || []; ov.customLessons.push({ title: v.trim(), slides: [{ title: v.trim(), visual: '📝', body: 'Write this lesson in the slide editor.' }], assignments: [] }); save(); rerender(); }));
    q('[data-ov-resetunit]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.ovResetunit); if (!confirm('Remove every customisation in ' + unit.title + ' for this section?')) return; const sec = overlaySection(course.id); if (sec.overlay && sec.overlay[course.id]) delete sec.overlay[course.id][unit.id]; save(); rerender(); }));
    q('[data-ov-hideterm]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.u); const ov = unitOverlay(unit, true); ov.terms = ov.terms || { hidden: [], added: [] }; const k = b.dataset.ovHideterm; const ai = (ov.terms.added || []).findIndex(t => L(t.term, 2) === k); if (ai >= 0) ov.terms.added.splice(ai, 1); else if (!ov.terms.hidden.includes(k)) ov.terms.hidden.push(k); save(); rerender(); }));
    q('[data-ov-unhideterm]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.u); const ov = unitOverlay(unit, true); ov.terms.hidden = ov.terms.hidden.filter(t => t !== b.dataset.ovUnhideterm); save(); rerender(); }));
    q('[data-ov-addterm]').forEach(b => b.addEventListener('click', () => { const unit = unitOf(b.dataset.ovAddterm); const t = document.getElementById('ovTerm-' + unit.id).value.trim(), d = document.getElementById('ovDef-' + unit.id).value.trim(); if (!t || !d) return alert('Type the word and its meaning.'); const ov = unitOverlay(unit, true); ov.terms = ov.terms || { hidden: [], added: [] }; ov.terms.added.push({ term: t, def: d }); save(); rerender(); }));
  }

  /* ---------- slide editor (slides page) ---------- */
  function slideEditor(course, unit, lesson, slide) {
    if (!on()) return '';
    const isAdded = slide._added !== undefined;
    const t = lv4(slide.title), b = lv4(slide.body);
    const mod = slide.mod || {};
    const media = (lesson.media || []).map((m, k) => Object.assign({ _k: k }, m)).filter(m => m.slide === slide._i || (slide._added !== undefined && m.slide === 'a' + slide._added));
    const slideKey = slide._added !== undefined ? 'a' + slide._added : slide._i;
    return '<div class="ov-editor"><div class="btn-row between"><strong>✏️ Edit this slide for your section</strong><span class="btn-row">' +
      (slide._edited ? '<span class="tag accent">customised</span><button class="btn ghost sm" id="ovRevertSlide">Original</button>' : '') + (isAdded ? '<span class="tag accent">your slide</span>' : '') +
      '<button class="btn ghost sm" id="ovHideSlide">' + (isAdded ? 'Delete slide' : 'Hide slide') + '</button><button class="btn ghost sm" id="ovAddSlide">＋ Add a slide after</button></span></div>' +
      '<div class="ov-grid">' + [1, 2, 3, 4].map(l => '<label>Title · Level ' + l + ' <input class="text-input" data-ov-title="' + l + '" value="' + esc(t[l] || '') + '"></label>').join('') + '</div>' +
      '<div class="ov-grid">' + [1, 2, 3, 4].map(l => '<label>Text · Level ' + l + ' · ' + LEVEL_NAMES[l] + ' <textarea class="text-input" rows="7" data-ov-body="' + l + '">' + esc(b[l] || '') + '</textarea></label>').join('') + '</div>' +
      '<details><summary class="small">Modified program text (K–2 · 3–5 · 6–8)</summary><div class="ov-grid">' + BANDS.map(k => '<label>' + k[1] + ' <textarea class="text-input" rows="5" data-ov-mod="' + k[0] + '">' + esc(mod[k[0]] || '') + '</textarea></label>').join('') + '</div></details>' +
      '<p class="muted small" style="margin:0.5rem 0">Tips: blank line between paragraphs · <code>- </code> bullets · <code>**bold**</code> · <code>&gt; </code> quoted passage · <code>| a | b |</code> table rows.</p>' +
      '<div class="btn-row"><button class="btn success" id="ovSaveSlide">Save slide</button><label class="small">Icon <input class="text-input" id="ovVisual" value="' + esc(slide.visual || '') + '" style="width:70px;display:inline-block"></label></div>' +
      '<div class="plan-section"><div class="plan-label">🖼️ Pictures, audio and video on this slide</div>' +
      (media.length ? media.map(m => '<div class="ov-media"><div><strong>' + (m.type === 'video' ? '🎬' : m.type === 'audio' ? '🔊' : m.type === 'google' ? '📄' : '🖼️') + ' ' + esc(m.title || 'Media') + '</strong>' + (m.src ? ' <span class="tag ok">added</span>' : ' <span class="tag">empty slot</span>') + (m._added !== undefined ? ' <span class="tag accent">yours</span>' : '') + '<div class="small muted">' + esc(m.why || '') + (m.url ? ' · <a href="' + esc(m.url) + '" target="_blank" rel="noopener">suggested source</a>' : '') + '</div></div>' +
        '<div class="btn-row"><input class="text-input" placeholder="Paste a link (image, YouTube, audio/video, or Google Slides / Docs / Forms)" data-ov-src="' + m._k + '" value="' + esc(m.src && !/^idb:/.test(m.src) ? m.src : '') + '" style="max-width:340px"><label class="btn secondary sm" for="ovUp-' + m._k + '">⬆️ Upload</label><input type="file" id="ovUp-' + m._k + '" accept="image/*,audio/*,video/*" hidden data-ov-upload="' + m._k + '"><button class="btn ghost sm" data-ov-clearsrc="' + m._k + '">Clear</button>' + (m._added !== undefined ? '<button class="btn ghost sm" data-ov-delmedia="' + m._added + '">Delete</button>' : '') + '</div></div>').join('') : '<p class="muted small">No media on this slide yet.</p>') +
      '<div class="btn-row" style="margin-top:0.5rem"><input class="text-input" id="ovNewMediaTitle" placeholder="Caption for new media" style="max-width:260px"><label class="btn secondary sm" for="ovNewUp">⬆️ Upload picture / audio / video</label><input type="file" id="ovNewUp" accept="image/*,audio/*,video/*" hidden><button class="btn ghost sm" id="ovNewLink">🔗 Add a link instead</button></div>' +
      '<p class="muted small" style="margin:0.4rem 0 0">Uploads are kept on this device (up to 25 MB each) and show for students who use it; links work on every device.</p></div>' +
      '<input type="hidden" id="ovSlideKey" value="' + esc(String(slideKey)) + '"></div>';
  }
  function lessonOv(unit, lesson) { const ov = unitOverlay(unit, true); ov.lessons[lesson._idx] = ov.lessons[lesson._idx] || {}; return ov.lessons[lesson._idx]; }
  function bindSlideEditor(course, unit, lesson, slide, rerender) {
    bindBar(rerender);
    const g = id => document.getElementById(id); if (!g('ovSaveSlide')) return;
    const lo = () => lessonOv(unit, lesson);
    const collect = () => { const o = { title: {}, body: {}, mod: {} };
      document.querySelectorAll('[data-ov-title]').forEach(i => { if (i.value.trim()) o.title[i.dataset.ovTitle] = i.value.trim(); });
      document.querySelectorAll('[data-ov-body]').forEach(i => { if (i.value.trim()) o.body[i.dataset.ovBody] = i.value; });
      document.querySelectorAll('[data-ov-mod]').forEach(i => { if (i.value.trim()) o.mod[i.dataset.ovMod] = i.value; });
      if (!Object.keys(o.mod).length) delete o.mod; const v = g('ovVisual').value.trim(); if (v) o.visual = v; return o; };
    g('ovSaveSlide').addEventListener('click', () => {
      const o = collect(); if (!Object.keys(o.body).length) return alert('The slide needs some text at least at one level.');
      if (lesson._custom) { const cl = unitOverlay(unit, true).customLessons[lesson._idx - CUSTOM_BASE]; cl.slides[slide._added !== undefined ? slide._added : slide._i] = Object.assign({}, cl.slides[slide._i] || {}, o); }
      else if (slide._added !== undefined) { lo().addSlides[slide._added] = Object.assign({}, lo().addSlides[slide._added], o); }
      else { lo().slides = lo().slides || {}; lo().slides[slide._i] = o; }
      save(); rerender('saved');
    });
    const rv = g('ovRevertSlide'); if (rv) rv.addEventListener('click', () => { if (lo().slides) delete lo().slides[slide._i]; save(); rerender(); });
    g('ovHideSlide').addEventListener('click', () => {
      if (slide._added !== undefined) { if (!confirm('Delete this slide?')) return; lo().addSlides.splice(slide._added, 1); }
      else if (lesson._custom) { if (!confirm('Delete this slide?')) return; unitOverlay(unit, true).customLessons[lesson._idx - CUSTOM_BASE].slides.splice(slide._i, 1); }
      else { lo().slides = lo().slides || {}; lo().slides[slide._i] = Object.assign({}, lo().slides[slide._i], { hidden: true }); }
      save(); rerender('hidden');
    });
    g('ovAddSlide').addEventListener('click', () => {
      const ns = { title: 'New slide', visual: '📝', body: { 1: 'Write the slide here.', 2: 'Write the slide here.' } };
      if (lesson._custom) { const cl = unitOverlay(unit, true).customLessons[lesson._idx - CUSTOM_BASE]; cl.slides.splice((slide._i || 0) + 1, 0, ns); }
      else { lo().addSlides = lo().addSlides || []; lo().addSlides.push(ns); }
      save(); rerender('added');
    });
    // media: paste link / upload / clear / delete / new
    const setSrc = (k, src, type) => { const base = (lesson.media || [])[k]; const patch = type ? { src, type } : { src };
      if (base && base.src && /^idb:/.test(base.src) && base.src !== src) { try { Media.delFile(base.src.slice(4)); } catch (e) {} }   // drop the old upload
      if (base && base._added !== undefined) { Object.assign(lo().addMedia[base._added], patch); } else { lo().media = lo().media || {}; lo().media[k] = Object.assign({}, lo().media[k], patch); } save(); };
    document.querySelectorAll('[data-ov-src]').forEach(i => i.addEventListener('change', () => { setSrc(+i.dataset.ovSrc, i.value.trim()); rerender(); }));
    document.querySelectorAll('[data-ov-clearsrc]').forEach(b => b.addEventListener('click', () => { setSrc(+b.dataset.ovClearsrc, ''); rerender(); }));
    document.querySelectorAll('[data-ov-delmedia]').forEach(b => b.addEventListener('click', () => { lo().addMedia.splice(+b.dataset.ovDelmedia, 1); save(); rerender(); }));
    document.querySelectorAll('[data-ov-upload]').forEach(i => i.addEventListener('change', async () => { const f = i.files[0]; if (!f) return; try { const id = await Media.putFile(f, { course: course.id, unit: unit.id }); setSrc(+i.dataset.ovUpload, 'idb:' + id, /^video\//.test(f.type) ? 'video' : /^audio\//.test(f.type) ? 'audio' : 'image'); rerender('uploaded'); } catch (e) { alert(e.message); } }));
    const slideKey = slide._added !== undefined ? 'a' + slide._added : slide._i;
    const addMedia = (src, type, title) => { lo().addMedia = lo().addMedia || []; lo().addMedia.push({ slide: slideKey, type, title: title || (type === 'image' ? 'Picture' : type === 'video' ? 'Video' : type === 'google' ? 'Google file' : 'Audio'), why: 'Added by your teacher', source: '', src }); save(); rerender('media'); };
    g('ovNewUp').addEventListener('change', async () => { const f = g('ovNewUp').files[0]; if (!f) return; try { const id = await Media.putFile(f, { course: course.id, unit: unit.id }); addMedia('idb:' + id, f.type.startsWith('video') ? 'video' : f.type.startsWith('audio') ? 'audio' : 'image', g('ovNewMediaTitle').value.trim() || f.name); } catch (e) { alert(e.message); } });
    g('ovNewLink').addEventListener('click', () => { const u = (prompt('Paste the link (image, YouTube, audio, video, or a Google Slides / Docs / Forms share link):') || '').trim(); if (!u) return; const type = /docs\.google\.com|forms\.gle/i.test(u) ? 'google' : /youtu|\.mp4|\.webm|\.mov/i.test(u) ? 'video' : /\.mp3|\.m4a|\.wav|\.ogg/i.test(u) ? 'audio' : 'image'; addMedia(u, type, g('ovNewMediaTitle').value.trim()); });
  }

  /* ---------- assignment + question editors (lesson page) ---------- */
  function lessonEditor(course, unit, lesson) {
    if (!on()) return '';
    const as = assignmentsFor(lesson); const qs = lessonQuestions(unit, lesson._idx, 3).concat(lessonQuestions(unit, lesson._idx, 4).filter(q => !lessonQuestions(unit, lesson._idx, 3).some(x => x._key === q._key)));
    const seen = new Set(); const uniq = qs.filter(q => { if (seen.has(q._key)) return false; seen.add(q._key); return true; });
    return '<div class="ov-editor"><strong>✏️ Assignments for your section</strong>' +
      (as.length ? as.map(a => '<div class="ov-row"><div><strong>' + esc(a.title) + '</strong> ' + (a._edited ? '<span class="tag accent">customised</span>' : '') + (a._added ? '<span class="tag accent">yours</span>' : '') + '</div><span class="btn-row"><button class="btn ghost sm" data-ov-edita="' + a._idx + '">Edit</button>' + (a._edited ? '<button class="btn ghost sm" data-ov-reva="' + a._idx + '">Original</button>' : '') + '<button class="btn ghost sm" data-ov-hidea="' + a._idx + '">' + (a._added ? 'Delete' : 'Hide') + '</button></span></div>').join('') : '<p class="muted small">No assignments at this level.</p>') +
      (lesson._ov && lesson._ov.assignments ? Object.keys(lesson._ov.assignments).filter(k => lesson._ov.assignments[k].hidden).map(k => '<div class="small muted">Hidden: ' + esc((lesson.assignments[k] || {}).title || 'assignment') + ' <button class="btn ghost sm" data-ov-unhidea="' + k + '">↩ show</button></div>').join('') : '') +
      '<div class="btn-row" style="margin-top:0.5rem"><button class="btn secondary sm" id="ovAddA">＋ Add an assignment</button></div>' +
      '<div id="ovAForm"></div>' +
      '<hr><strong>✏️ Quiz questions for this lesson</strong> <span class="muted small">(' + uniq.length + ' in the bank for this section)</span>' +
      '<div class="ov-qlist">' + uniq.map(q => '<div class="ov-row"><div class="small"><span class="tag">' + q.type + '</span> ' + esc(q.prompt) + ' ' + (q._edited ? '<span class="tag accent">customised</span>' : '') + (q._added ? '<span class="tag accent">yours</span>' : '') + '</div><span class="btn-row"><button class="btn ghost sm" data-ov-editq="' + esc(q._key) + '">Edit</button><button class="btn ghost sm" data-ov-hideq="' + esc(q._key) + '">' + (q._added ? 'Delete' : 'Hide') + '</button></span></div>').join('') + '</div>' +
      '<div class="btn-row" style="margin-top:0.5rem"><button class="btn secondary sm" id="ovAddQ">＋ Add a question</button></div><div id="ovQForm"></div></div>';
  }
  function aForm(a) {
    const p = lv4(a ? a.prompt : ''), st = lv4(a ? a.starter : ''), su = lv4(a ? a.success : '');
    return '<div class="ov-form"><label>Title <input class="text-input" id="ovaTitle" value="' + esc(a ? a.title : '') + '"></label>' +
      '<div class="ov-grid">' + [1, 2, 3, 4].map(l => '<label>Task · Level ' + l + ' <textarea class="text-input" rows="5" data-ova-prompt="' + l + '">' + esc(p[l] || '') + '</textarea></label>').join('') + '</div>' +
      '<div class="ov-grid">' + [1, 2, 3, 4].map(l => '<label>Sentence starter · L' + l + ' <input class="text-input" data-ova-starter="' + l + '" value="' + esc(st[l] || '') + '"></label>').join('') + '</div>' +
      '<div class="ov-grid">' + [1, 2, 3, 4].map(l => '<label>A complete answer… · L' + l + ' <input class="text-input" data-ova-success="' + l + '" value="' + esc(su[l] || '') + '"></label>').join('') + '</div>' +
      '<div class="btn-row"><button class="btn success sm" id="ovaSave">Save assignment</button><button class="btn ghost sm" id="ovaCancel">Cancel</button></div></div>';
  }
  function qForm(q) {
    const type = q ? q.type : 'mc'; const opts = q && q.type === 'mc' ? (Array.isArray(q.options) ? q.options : (q.options && (q.options[3] || q.options[2] || q.options[1])) || []) : [];
    return '<div class="ov-form"><div class="btn-row"><label>Type <select class="text-input" id="ovqType" style="max-width:200px"><option value="mc"' + (type === 'mc' ? ' selected' : '') + '>Multiple choice</option><option value="tf"' + (type === 'tf' ? ' selected' : '') + '>True / false</option><option value="fill"' + (type === 'fill' ? ' selected' : '') + '>Fill in the blank</option></select></label>' +
      '<label>Shown at <select class="text-input" id="ovqLevels" style="max-width:220px"><option value="">every level</option><option value="1,2">Levels 1–2</option><option value="3,4">Levels 3–4</option><option value="4">Level 4 only</option></select></label></div>' +
      '<label>Question <textarea class="text-input" id="ovqPrompt" rows="2">' + esc(q ? L(q.prompt, 2) : '') + '</textarea></label>' +
      '<div id="ovqMc"' + (type === 'mc' ? '' : ' hidden') + '><div class="ov-grid">' + [0, 1, 2, 3].map(i => '<label>' + (i === 0 ? 'Correct answer' : 'Wrong answer ' + i) + ' <input class="text-input" data-ovq-opt="' + i + '" value="' + esc(i === 0 ? (q ? q.answer : '') : (opts.filter(o => o !== (q && q.answer))[i - 1] || '')) + '"></label>').join('') + '</div></div>' +
      '<div id="ovqTf"' + (type === 'tf' ? '' : ' hidden') + '><label>Answer <select class="text-input" id="ovqTfAns" style="max-width:160px"><option value="true"' + (q && q.answer === true ? ' selected' : '') + '>True</option><option value="false"' + (q && q.answer === false ? ' selected' : '') + '>False</option></select></label></div>' +
      '<div id="ovqFill"' + (type === 'fill' ? '' : ' hidden') + '><div class="ov-grid"><label>Answer <input class="text-input" id="ovqFillAns" value="' + esc(q && q.type === 'fill' ? q.answer : '') + '"></label><label>Word bank (comma-separated, wrong words) <input class="text-input" id="ovqBank" value="' + esc(q && q.bank ? q.bank.filter(b => b !== q.answer).join(', ') : '') + '"></label></div><p class="muted small">Put <code>___</code> where the blank goes.</p></div>' +
      '<div class="btn-row"><button class="btn success sm" id="ovqSave">Save question</button><button class="btn ghost sm" id="ovqCancel">Cancel</button></div></div>';
  }
  function bindLessonEditor(course, unit, lesson, rerender) {
    bindBar(rerender);
    const g = id => document.getElementById(id); if (!g('ovAddA')) return;
    const lo = () => lessonOv(unit, lesson);
    const ov = () => unitOverlay(unit, true);
    let editingA = null, editingQ = null;
    const showA = (a) => { g('ovAForm').innerHTML = aForm(a); g('ovaCancel').addEventListener('click', () => { g('ovAForm').innerHTML = ''; });
      g('ovaSave').addEventListener('click', () => {
        const o = { title: g('ovaTitle').value.trim(), prompt: {}, starter: {}, success: {} };
        document.querySelectorAll('[data-ova-prompt]').forEach(i => { if (i.value.trim()) o.prompt[i.dataset.ovaPrompt] = i.value; });
        document.querySelectorAll('[data-ova-starter]').forEach(i => { if (i.value.trim()) o.starter[i.dataset.ovaStarter] = i.value; });
        document.querySelectorAll('[data-ova-success]').forEach(i => { if (i.value.trim()) o.success[i.dataset.ovaSuccess] = i.value; });
        if (!o.title || !Object.keys(o.prompt).length) return alert('Give the assignment a title and a task.');
        if (lesson._custom) { const cl = ov().customLessons[lesson._idx - CUSTOM_BASE]; cl.assignments = cl.assignments || []; if (editingA !== null && editingA < 100) cl.assignments[editingA] = o; else cl.assignments.push(o); }
        else if (editingA !== null && editingA >= 100) lo().addAssignments[editingA - 100] = o;
        else if (editingA !== null) { lo().assignments = lo().assignments || {}; lo().assignments[editingA] = o; }
        else { lo().addAssignments = lo().addAssignments || []; lo().addAssignments.push(o); }
        save(); rerender('saved'); }); };
    g('ovAddA').addEventListener('click', () => { editingA = null; showA(null); });
    document.querySelectorAll('[data-ov-edita]').forEach(b => b.addEventListener('click', () => { editingA = +b.dataset.ovEdita; showA(assignmentsFor(lesson).find(a => a._idx === editingA)); }));
    document.querySelectorAll('[data-ov-reva]').forEach(b => b.addEventListener('click', () => { delete lo().assignments[+b.dataset.ovReva]; save(); rerender(); }));
    document.querySelectorAll('[data-ov-hidea]').forEach(b => b.addEventListener('click', () => { const i = +b.dataset.ovHidea; if (i >= 100) lo().addAssignments.splice(i - 100, 1); else if (lesson._custom) ov().customLessons[lesson._idx - CUSTOM_BASE].assignments.splice(i, 1); else { lo().assignments = lo().assignments || {}; lo().assignments[i] = Object.assign({}, lo().assignments[i], { hidden: true }); } save(); rerender(); }));
    document.querySelectorAll('[data-ov-unhidea]').forEach(b => b.addEventListener('click', () => { delete lo().assignments[b.dataset.ovUnhidea].hidden; save(); rerender(); }));
    // questions
    const showQ = (q) => { g('ovQForm').innerHTML = qForm(q); const sync = () => { const t = g('ovqType').value; g('ovqMc').hidden = t !== 'mc'; g('ovqTf').hidden = t !== 'tf'; g('ovqFill').hidden = t !== 'fill'; }; g('ovqType').addEventListener('change', sync);
      if (q && q.levels) g('ovqLevels').value = q.levels.join(',');
      g('ovqCancel').addEventListener('click', () => { g('ovQForm').innerHTML = ''; });
      g('ovqSave').addEventListener('click', () => {
        const t = g('ovqType').value, prompt = g('ovqPrompt').value.trim(); if (!prompt) return alert('Type the question.');
        const nq = { type: t, cat: lessonCat(unit, lesson._idx), prompt };
        const lv = g('ovqLevels').value; if (lv) nq.levels = lv.split(',').map(Number);
        if (t === 'mc') { const o = [...document.querySelectorAll('[data-ovq-opt]')].map(i => i.value.trim()).filter(Boolean); if (o.length < 2) return alert('Give the correct answer and at least one wrong answer.'); nq.answer = o[0]; nq.options = o; }
        else if (t === 'tf') nq.answer = g('ovqTfAns').value === 'true';
        else { nq.answer = g('ovqFillAns').value.trim(); if (!nq.answer || !/___/.test(prompt)) return alert('Fill-in questions need an answer and ___ in the question.'); nq.bank = [nq.answer].concat(g('ovqBank').value.split(',').map(x => x.trim()).filter(Boolean)); }
        const oq = ov().questions;
        if (editingQ) { const ai = (oq.added || []).findIndex(x => qKey(x) === editingQ); if (ai >= 0) oq.added[ai] = nq; else { oq.edited = oq.edited || {}; oq.edited[editingQ] = nq; } } else { oq.added = oq.added || []; oq.added.push(nq); }
        save(); rerender('saved'); }); };
    g('ovAddQ').addEventListener('click', () => { editingQ = null; showQ(null); });
    document.querySelectorAll('[data-ov-editq]').forEach(b => b.addEventListener('click', () => { editingQ = b.dataset.ovEditq; const all = lessonQuestions(unit, lesson._idx, 3).concat(lessonQuestions(unit, lesson._idx, 4), lessonQuestions(unit, lesson._idx, 1)); const q = all.find(x => x._key === editingQ); const oq = ov().questions; const src = (oq.added || []).find(x => qKey(x) === editingQ) || (oq.edited || {})[editingQ] || (unit.questions || []).find(x => qKey(x) === editingQ); showQ(src || q); }));
    document.querySelectorAll('[data-ov-hideq]').forEach(b => b.addEventListener('click', () => { const k = b.dataset.ovHideq; const oq = ov().questions; const ai = (oq.added || []).findIndex(x => qKey(x) === k); if (ai >= 0) oq.added.splice(ai, 1); else { oq.hidden = oq.hidden || []; if (!oq.hidden.includes(k)) oq.hidden.push(k); } save(); rerender(); }));
  }

  /* ---------- section-level: copy / reset ---------- */
  function copyOverlay(fromSectionId, toSectionId) { const a = Sections.byId(fromSectionId), b = Sections.byId(toSectionId); if (!a || !b) return false; b.overlay = JSON.parse(JSON.stringify(a.overlay || {})); save(); return true; }
  function resetOverlay(sectionId) { const s = Sections.byId(sectionId); if (s) { delete s.overlay; save(); } }

  window.Overlay = { canEdit, on, bar, bindBar, lessonTools, unitTools, bindCourse, slideEditor, bindSlideEditor, lessonEditor, bindLessonEditor, copyOverlay, resetOverlay, countChanges };
})();
