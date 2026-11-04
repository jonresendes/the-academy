/* =========================================================
   util.js — shared helpers (level-aware content picking,
   question building, shuffling, speech)
   ========================================================= */
(function () {
  const LEVELS = window.LEVELS;
  const LEVEL_NAMES = { 1: LEVELS[1].name, 2: LEVELS[2].name, 3: LEVELS[3].name, 4: LEVELS[4].name };
  const LEVEL_DESC = { 1: LEVELS[1].desc, 2: LEVELS[2].desc, 3: LEVELS[3].desc, 4: LEVELS[4].desc };

  /** Pick one of four values by level: byLevel(level, [l1, l2, l3, l4]). */
  function byLevel(level, arr) { level = level || Settings.level; return arr[Math.min(arr.length, Math.max(1, level)) - 1]; }

  /** Pick the value for the current level. Accepts a plain value or {1:…, 2:…, 3:…, 4:…}.
      Falls back to the nearest lower level, then the nearest higher one
      (so content written at three levels serves Level 4 its Level 3 text). */
  /* ---------- Modified program (K–2 / 3–5 / 6–8) ----------
     A student on the Modified track for the active course reads `mod.{band}` text,
     answers `bands: [...]` questions and gets `bands` assignments. Everything else
     (game sizes, option counts) behaves like Level 1. */
  const BANDS = { k2: { name: 'K–2', chain: ['k2', 'g35', 'g68'] }, g35: { name: 'Grades 3–5', chain: ['g35', 'g68', 'k2'] }, g68: { name: 'Grades 6–8', chain: ['g68', 'g35', 'k2'] } };
  function band() { const t = window.Students && Students.trackFor && Students.trackFor(Settings.activeCourse); return t ? t.band : null; }
  function bandText(value) {
    const b = band(); if (!b || !value || typeof value !== 'object' || Array.isArray(value)) return undefined;
    if (!('k2' in value || 'g35' in value || 'g68' in value)) return undefined;
    for (const k of BANDS[b].chain) if (value[k] !== undefined) return value[k];
    return undefined;
  }
  /** Slide body / term definition for the current student: Modified band text when on that track, else the level text. */
  function body(slide) { const m = bandText(slide.mod); return m !== undefined ? m : L(slide.body); }
  function def(term) { const m = bandText(term.mod); return m !== undefined ? m : L(term.def); }

  function L(value, level) {
    level = level || Settings.level;
    if (value === null || value === undefined) return value;
    if (typeof value !== 'object' || Array.isArray(value)) return value;
    const bt = bandText(value); if (bt !== undefined) return bt;   // band-keyed objects (assignments, titles)
    const keys = Object.keys(value).filter(k => /^[1-4]$/.test(k));
    if (!keys.length) return value;
    for (let l = level; l >= 1; l--) if (value[l] !== undefined) return value[l];
    for (let l = level; l <= 4; l++) if (value[l] !== undefined) return value[l];
    return value[keys[0]];
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function sample(arr, n) { return shuffle(arr).slice(0, n); }

  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /** Light markdown: blank-line paragraphs, "- " bullets, **bold**, "> " quotes, | a | b | tables. */
  function md(text) {
    const blocks = String(text || '').trim().split(/\n\s*\n/);
    return blocks.map(b => {
      const lines = b.split('\n');
      if (lines.length > 1 && lines.every(l => /^\s*\|/.test(l))) {          // | a | b | table rows; first row = header
        const rows = lines.map(l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => inline(c.trim())));
        return '<table class="md-table"><thead><tr>' + rows[0].map(c => '<th>' + c + '</th>').join('') + '</tr></thead><tbody>' +
          rows.slice(1).map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
      }
      if (/^\s*>\s/.test(lines[0])) return '<blockquote>' + lines.map(l => inline(l.replace(/^\s*>\s?/, ''))).join('<br>') + '</blockquote>';
      if (lines.every(l => /^\s*-\s+/.test(l))) {
        return '<ul>' + lines.map(l => '<li>' + inline(l.replace(/^\s*-\s+/, '')) + '</li>').join('') + '</ul>';
      }
      return '<p>' + inline(lines.join('<br>')) + '</p>';
    }).join('');
    function inline(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/&lt;br&gt;/g, '<br>'); }
  }

  /* Read aloud: a button starts reading; tapping the same button again stops it;
     tapping once more restarts from the beginning. A different button switches to its text.
     When the button names a target element (data-target), the words of that element are
     wrapped in spans and the word being spoken is highlighted in yellow. */
  let speaking = null, hl = null;   // the active button; the highlight state { el, html, spans }
  function clearHighlight() { if (hl) { try { hl.el.innerHTML = hl.html; } catch (e) {} hl = null; } }
  function setSpeaking(btn) {
    document.querySelectorAll('.speak-btn.on').forEach(b => { b.classList.remove('on'); b.textContent = '🔊'; b.title = 'Read aloud'; b.setAttribute('aria-label', 'Read aloud'); });
    speaking = btn || null;
    if (btn) { btn.classList.add('on'); btn.textContent = '⏹️'; btn.title = 'Stop reading'; btn.setAttribute('aria-label', 'Stop reading'); }
  }
  function stopSpeaking() { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); clearHighlight(); setSpeaking(null); }
  /** Wrap every word of el in a span; returns the text to speak and the spans with their character offsets. */
  function prepareHighlight(el) {
    const html = el.innerHTML;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = []; while (walker.nextNode()) { const n = walker.currentNode; if (!n.parentNode.closest('.speak-btn, button, script, style')) nodes.push(n); }
    let text = ''; const spans = [];
    nodes.forEach(n => {
      const str = n.nodeValue; if (!str.trim()) { text += ' '; return; }
      const frag = document.createDocumentFragment(); const re = /\S+|\s+/g; let m;
      while ((m = re.exec(str))) {
        if (/\S/.test(m[0])) { const sp = document.createElement('span'); sp.className = 'rw'; sp.textContent = m[0]; spans.push({ s: text.length, e: text.length + m[0].length, el: sp }); frag.appendChild(sp); }
        else frag.appendChild(document.createTextNode(m[0]));
        text += m[0];
      }
      n.parentNode.replaceChild(frag, n);
      if (!/\s$/.test(text)) text += ' ';   // a pause between blocks so words never run together
    });
    return { el, html, spans, text: text.replace(/[*#>|]/g, ' ') };   // same length: offsets stay valid
  }
  function speak(text, btn, target) {
    if (!('speechSynthesis' in window)) return;
    if (btn && btn === speaking) return stopDictationSafe(), stopSpeaking();          // second tap stops
    window.speechSynthesis.cancel(); clearHighlight();
    let utterText = String(text);
    if (target) { hl = prepareHighlight(target); utterText = hl.text; }
    const u = new SpeechSynthesisUtterance(hl ? utterText : utterText.replace(/\s+/g, ' ').trim());   // highlighted text keeps its exact offsets
    u.rate = 0.95;
    const spans = hl ? hl.spans : [];
    let last = null;
    u.onboundary = e => {
      if (e.name !== 'word' || !spans.length) return;
      const ci = e.charIndex;
      const sp = spans.find(x => ci >= x.s && ci < x.e) || spans.find(x => x.s >= ci);
      if (sp && sp !== last) { if (last) last.el.classList.remove('reading'); sp.el.classList.add('reading'); last = sp; }
    };
    u.onend = u.onerror = () => { if (speaking === btn) { clearHighlight(); setSpeaking(null); } };
    setSpeaking(btn);
    window.speechSynthesis.speak(u);
  }
  function stopDictationSafe() { if (window.Media && Media.stopDictation) Media.stopDictation(); }
  /** Button HTML. `target` is a CSS selector for the element whose words should light up while read
      (resolved relative to the button first, then the page). */
  function speakBtn(text, target) {
    if (!Settings.get('readAloud')) return '';
    return '<button class="speak-btn" type="button" title="Read aloud" aria-label="Read aloud" data-speak="' + esc(text) + '"' + (target ? ' data-target="' + esc(target) + '"' : '') + '>🔊</button>';
  }
  // delegate all speaker buttons
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-speak]');
    if (!b) return;
    let target = null;
    if (b.dataset.target) { target = b.closest(b.dataset.target) || (b.parentElement && b.parentElement.querySelector(b.dataset.target)) || document.querySelector(b.dataset.target); }
    speak(b.dataset.speak, b, target);
  });
  // leaving the page restores any highlighted element
  new MutationObserver(() => { if (hl && !document.body.contains(hl.el)) { hl = null; } }).observe(document.body, { childList: true, subtree: true });

  /* ---------- Focus Plan helpers ---------- */

  /** The unit's Focus Plan entry when a plan is active for its course, else null. */
  function focusFor(unit) {
    const courseId = unit && unit.__courseId;
    return courseId && window.Focus && Focus.active(courseId) ? Focus.unitEntry(courseId, unit.id) : null;
  }

  /** Units of a course the student can see (all, or those in an active Focus Plan). */
  function unitsFor(course) {
    course.units.forEach(u => { u.__courseId = course.id; });
    if (!(window.Focus && Focus.active(course.id))) return course.units;
    return course.units.filter(u => Focus.unitEntry(course.id, u.id));
  }

  /** Lessons of a unit the student can see, each tagged with its original index as `_idx`. */
  function lessonsFor(unit) {
    const f = focusFor(unit);
    return unit.lessons.map((les, i) => Object.assign({ _idx: i }, les))
      .filter(les => !f || !f.lessons || f.lessons.includes(les._idx));
  }

  /* ---------- content for the current level ---------- */

  /** Terms of a unit, definitions resolved for the level (and limited to the Focus Plan). */
  function termsFor(unit, level) {
    level = level || Settings.level;
    const f = focusFor(unit);
    return (unit.terms || []).filter(t => band() || !t.levels || t.levels.includes(level))
      .map(t => ({ term: L(t.term, level), def: def(t), key: L(t.term, 2) }))
      .filter(t => !f || !f.terms || f.terms.includes(t.key));
  }

  /** Slides of a lesson for the level. */
  function slidesFor(lesson, level) {
    level = level || Settings.level;
    if (band()) return lesson.slides || [];
    return (lesson.slides || []).filter(s => !s.levels || s.levels.includes(level));
  }

  /** Multiple-choice options resolved for the level. The answer is always present. */
  function mcOptions(q, level) {
    level = level || Settings.level;
    const answer = L(q.answer, level);
    let opts = L(q.options, level);
    if (!Array.isArray(opts)) opts = [];
    opts = opts.slice();
    if (!opts.includes(answer)) opts.unshift(answer);
    // If the author gave a flat list, trim distractors for easier levels.
    if (!(q.options && typeof q.options === 'object' && !Array.isArray(q.options))) {
      const max = byLevel(level, [2, 3, opts.length, opts.length]);
      const distractors = opts.filter(o => o !== answer).slice(0, max - 1);
      opts = [answer].concat(distractors);
    }
    return shuffle(opts);
  }

  /* ---------- "no repeats until every question has been seen" ----------
     Each student's progress keeps a count of how often each question has been
     shown per unit. Question lists are shuffled, then ordered least-seen first,
     so a question only comes round again once the rest have had a turn. */
  function qKey(q) { return String(L(q.prompt, 2)); }
  function seenMap(unit) {
    if (!unit || !unit.__courseId || !window.Progress) return {};
    const u = Progress.unit(unit.__courseId, unit.id);
    return u.qseen || (u.qseen = {});
  }
  /** Record that a question was shown. Call with the resolved question. */
  function markSeen(q) {
    if (!q || !q._key || !q._unit) return;
    const u = Progress.unit(q._unit.courseId, q._unit.unitId);
    u.qseen = u.qseen || {}; u.qseen[q._key] = (u.qseen[q._key] || 0) + 1;
    Progress.save();
  }

  /** Questions of a unit filtered + resolved for the level: a fresh shuffled copy,
      least-seen questions first. */
  function questionsFor(unit, level, types) {
    level = level || Settings.level;
    const f = focusFor(unit);
    const b = band();
    let qs;
    if (b) {   // Modified: this band's questions, topped up with Level 1 items when a lesson has few
      qs = (unit.questions || []).filter(q => q.bands && q.bands.includes(b));
      const fallback = (unit.questions || []).filter(q => !q.bands && (!q.levels || q.levels.includes(1)));
      qs = qs.concat(fallback.filter(q => !types || types.includes(q.type)).slice(0, Math.max(0, 6 - qs.length)));
    } else qs = (unit.questions || []).filter(q => !q.bands && (!q.levels || q.levels.includes(level)));
    if (f && f.cats) qs = qs.filter(q => !q.cat || f.cats.includes(q.cat));   // untagged questions always stay
    if (f && f.terms && !f.cats) qs = qs.filter(q => q.type !== 'match');     // a narrowed vocabulary list drops the big matching question
    if (types) qs = qs.filter(q => types.includes(q.type));
    const seen = seenMap(unit);
    return shuffle(qs).map(q => ({ q, n: seen[qKey(q)] || 0 })).sort((a, b) => a.n - b.n).map(x => resolveQuestion(x.q, level, unit));
  }

  /* ---------- accommodations (set per student by the teacher) ----------
     reduce   — fewer questions in quizzes and tests (about 60%)
     simplify — answer choices and word banks from one level down; no typed blanks
     chunk    — matching shown three pairs at a time; word banks of at most three */
  function accom() { const s = window.Students && Students.current; return (s && s.accommodations) || {}; }
  /** Number of questions for an assessment after the "reduce" accommodation. */
  function assessmentCount(base) { return accom().reduce ? Math.max(3, Math.round(base * 0.6)) : base; }

  function resolveQuestion(q, level, unit) {
    level = level || Settings.level;
    const a = accom();
    const optLevel = a.simplify ? Math.max(1, level - 1) : level;   // choices from one level down
    const r = { type: q.type, prompt: L(q.prompt, level), cat: q.cat || '', _key: qKey(q) };
    if (unit && unit.__courseId) r._unit = { courseId: unit.__courseId, unitId: unit.id };
    if (q.type === 'mc') { r.answer = L(q.answer, level); r.options = q.bands ? shuffle(q.options.slice()) : mcOptions(q, optLevel); if (!r.options.includes(r.answer)) r.options = shuffle([r.answer].concat(r.options.slice(0, -1))); }
    else if (q.type === 'tf') { r.answer = !!q.answer; r.options = ['True', 'False']; }
    else if (q.type === 'fill') {
      r.answer = L(q.answer, level);
      let bank = L(q.bank, optLevel) || [];
      if (!bank.includes(r.answer)) bank = [r.answer].concat(bank);
      let max = byLevel(optLevel, [2, 4, 6, 6]);
      if (a.chunk) max = Math.min(max, 3);
      r.bank = shuffle([r.answer].concat(bank.filter(b => b !== r.answer).slice(0, max - 1)));
      r.freeType = optLevel >= 3 && !a.simplify;
    }
    else if (q.type === 'match') {
      const max = byLevel(level, [3, 4, 6, 8]);
      r.pairs = sample(L(q.pairs, level) || [], max);
      if (a.chunk) r.chunk = 3;
    }
    return r;
  }

  /** How hard a resolved question looks to a student (used to open assessments gently). */
  function difficulty(q) {
    if (q.type === 'tf') return 0;
    if (q.type === 'mc') return q.options.length <= 2 ? 1 : q.options.length === 3 ? 2 : 3;
    if (q.type === 'fill') return q.freeType ? 5 : 4;
    return 6;
  }
  /** Order an assessment so it starts with something every student can do and builds up. */
  function assessmentOrder(qs) {
    return qs.map((q, i) => ({ q, i, d: difficulty(q) })).sort((a, b) => a.d - b.d || a.i - b.i).map(x => x.q);
  }

  /* ---------- lessons ↔ questions ----------
     A lesson's quiz uses the unit questions whose `cat` belongs to it: either the
     lesson lists `cats: ['Nouns', 'Verbs']`, or the category starts with "L<n> "
     where n is the lesson's position (the convention used by OLC4O and HRF3O). */
  function lessonCats(unit, lessonIdx) {
    const les = unit.lessons[lessonIdx]; if (!les) return [];
    if (Array.isArray(les.cats)) return les.cats;
    const re = new RegExp('^L' + (lessonIdx + 1) + '(\\b|[^0-9])');
    return catsOf(unit).filter(c => re.test(c));
  }
  function lessonQuestions(unit, lessonIdx, level, types) {
    const cats = lessonCats(unit, lessonIdx); if (!cats.length) return [];
    return questionsFor(unit, level, types).filter(q => cats.includes(q.cat));
  }
  /** Assignments of a lesson visible at the level. */
  function assignmentsFor(lesson, level) {
    level = level || Settings.level;
    const b = band();
    return (lesson.assignments || []).map((a, i) => Object.assign({ _idx: i }, a))
      .filter(a => b ? (a.bands && a.bands.includes(b)) : (!a.bands && (!a.levels || a.levels.includes(level))));
  }

  /** Any mc/tf question can be asked as MC in games; fill/term questions are converted too. */
  function toChoiceQuestion(item, level) {
    if (item.type === 'mc' || item.type === 'tf') return item;
    if (item.type === 'fill') return { type: 'mc', prompt: item.prompt, answer: item.answer, options: item.bank.length > 1 ? item.bank : null, cat: item.cat, _key: item._key, _unit: item._unit };
    return null;
  }

  /** Build MC questions from terms ("Which word means …?") so every unit can play games. */
  function termQuestions(unit, level) {
    const terms = termsFor(unit, level);
    return terms.map(t => {
      const distractors = sample(terms.filter(x => x.term !== t.term).map(x => x.term), byLevel(level, [1, 2, 3, 3]));
      return { type: 'mc', prompt: (level === 1 ? 'Which word means: ' : 'Which term matches this definition: ') + t.def, answer: t.term, options: shuffle([t.term].concat(distractors)), cat: 'Vocabulary' };
    });
  }

  /** Pool of choice questions for games, with sensible fallbacks. */
  function choicePool(unit, level) {
    level = level || Settings.level;
    let pool = questionsFor(unit, level, ['mc', 'tf', 'fill']).map(q => toChoiceQuestion(q, level)).filter(Boolean)
      .map(q => q.options ? q : Object.assign({}, q, { options: ['True', 'False'] }));
    if (pool.length < 6) pool = pool.concat(termQuestions(unit, level));
    return pool;   // already shuffled + least-seen first
  }

  function normalize(s) { return String(s || '').trim().toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' '); }

  function findCourse(id) { return (window.LearnHub.courses || []).find(c => c.id === id); }
  function findUnit(course, unitId) { return course && unitsFor(course).find(u => u.id === unitId); }

  /** Question categories available in a unit (for the Focus Plan editor). */
  function catsOf(unit) { return [...new Set((unit.questions || []).map(q => q.cat).filter(Boolean))]; }
  /** Every term of a unit at the standard level (keys used by the Focus Plan). */
  function allTermKeys(unit) { return (unit.terms || []).map(t => L(t.term, 2)); }

  window.LH = { LEVELS, LEVEL_NAMES, LEVEL_DESC, BANDS, band, body, def, byLevel, L, shuffle, sample, esc, md, speak, stopSpeaking, speakBtn, termsFor, slidesFor, mcOptions,
                questionsFor, resolveQuestion, termQuestions, choicePool, normalize, findCourse, findUnit, markSeen,
                focusFor, unitsFor, lessonsFor, catsOf, allTermKeys, accom, assessmentCount, difficulty, assessmentOrder,
                lessonCats, lessonQuestions, assignmentsFor };
})();
