/* =========================================================
   util.js — shared helpers (level-aware content picking,
   question building, shuffling, speech)
   ========================================================= */
(function () {
  const LEVEL_NAMES = { 1: 'Explorer', 2: 'Scholar', 3: 'Challenger' };
  const LEVEL_DESC = {
    1: 'Simple words, short lessons, fewer questions, obvious answer choices and gentle games.',
    2: 'The standard course: full lessons, regular tests and all games.',
    3: 'Richer language, longer tests, trickier answer choices and bigger game boards.'
  };

  /** Pick the value for the current level. Accepts a plain value or {1:…, 2:…, 3:…}.
      Falls back to the nearest lower level, then the nearest higher one. */
  function L(value, level) {
    level = level || Settings.level;
    if (value === null || value === undefined) return value;
    if (typeof value !== 'object' || Array.isArray(value)) return value;
    const keys = Object.keys(value).filter(k => /^[123]$/.test(k));
    if (!keys.length) return value;
    for (let l = level; l >= 1; l--) if (value[l] !== undefined) return value[l];
    for (let l = level; l <= 3; l++) if (value[l] !== undefined) return value[l];
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

  /** Light markdown: blank-line paragraphs, "- " bullets, **bold**. */
  function md(text) {
    const blocks = String(text || '').trim().split(/\n\s*\n/);
    return blocks.map(b => {
      const lines = b.split('\n');
      if (lines.every(l => /^\s*-\s+/.test(l))) {
        return '<ul>' + lines.map(l => '<li>' + inline(l.replace(/^\s*-\s+/, '')) + '</li>').join('') + '</ul>';
      }
      return '<p>' + inline(lines.join('<br>')) + '</p>';
    }).join('');
    function inline(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/&lt;br&gt;/g, '<br>'); }
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text).replace(/\s+/g, ' '));
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }
  function speakBtn(text) {
    if (!Settings.get('readAloud')) return '';
    return '<button class="speak-btn" type="button" title="Read aloud" aria-label="Read aloud" data-speak="' + esc(text) + '">🔊</button>';
  }
  // delegate all speaker buttons
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-speak]');
    if (b) speak(b.dataset.speak);
  });

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
    return (unit.terms || []).filter(t => !t.levels || t.levels.includes(level))
      .map(t => ({ term: L(t.term, level), def: L(t.def, level), key: L(t.term, 2) }))
      .filter(t => !f || !f.terms || f.terms.includes(t.key));
  }

  /** Slides of a lesson for the level. */
  function slidesFor(lesson, level) {
    level = level || Settings.level;
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
      const max = level === 1 ? 2 : level === 2 ? 3 : opts.length;
      const distractors = opts.filter(o => o !== answer).slice(0, max - 1);
      opts = [answer].concat(distractors);
    }
    return shuffle(opts);
  }

  /** Questions of a unit filtered + resolved for the level (a fresh, shuffled copy). */
  function questionsFor(unit, level, types) {
    level = level || Settings.level;
    const f = focusFor(unit);
    let qs = (unit.questions || []).filter(q => !q.levels || q.levels.includes(level));
    if (f && f.cats) qs = qs.filter(q => !q.cat || f.cats.includes(q.cat));   // untagged questions always stay
    if (f && f.terms && !f.cats) qs = qs.filter(q => q.type !== 'match');     // a narrowed vocabulary list drops the big matching question
    if (types) qs = qs.filter(q => types.includes(q.type));
    return shuffle(qs).map(q => resolveQuestion(q, level));
  }

  function resolveQuestion(q, level) {
    level = level || Settings.level;
    const r = { type: q.type, prompt: L(q.prompt, level), cat: q.cat || '' };
    if (q.type === 'mc') { r.answer = L(q.answer, level); r.options = mcOptions(q, level); }
    else if (q.type === 'tf') { r.answer = !!q.answer; r.options = ['True', 'False']; }
    else if (q.type === 'fill') {
      r.answer = L(q.answer, level);
      let bank = L(q.bank, level) || [];
      if (!bank.includes(r.answer)) bank = [r.answer].concat(bank);
      const max = level === 1 ? 2 : level === 2 ? 4 : 6;
      r.bank = shuffle([r.answer].concat(bank.filter(b => b !== r.answer).slice(0, max - 1)));
      r.freeType = level === 3;
    }
    else if (q.type === 'match') {
      const max = level === 1 ? 3 : level === 2 ? 4 : 8;
      r.pairs = sample(L(q.pairs, level) || [], max);
    }
    return r;
  }

  /** Any mc/tf question can be asked as MC in games; fill/term questions are converted too. */
  function toChoiceQuestion(item, level) {
    if (item.type === 'mc' || item.type === 'tf') return item;
    if (item.type === 'fill') return { type: 'mc', prompt: item.prompt, answer: item.answer, options: item.bank.length > 1 ? item.bank : null, cat: item.cat };
    return null;
  }

  /** Build MC questions from terms ("Which word means …?") so every unit can play games. */
  function termQuestions(unit, level) {
    const terms = termsFor(unit, level);
    return terms.map(t => {
      const distractors = sample(terms.filter(x => x.term !== t.term).map(x => x.term), level === 1 ? 1 : level === 2 ? 2 : 3);
      return { type: 'mc', prompt: (level === 1 ? 'Which word means: ' : 'Which term matches this definition: ') + t.def, answer: t.term, options: shuffle([t.term].concat(distractors)), cat: 'Vocabulary' };
    });
  }

  /** Pool of choice questions for games, with sensible fallbacks. */
  function choicePool(unit, level) {
    level = level || Settings.level;
    let pool = questionsFor(unit, level, ['mc', 'tf', 'fill']).map(q => toChoiceQuestion(q, level)).filter(Boolean)
      .map(q => q.options ? q : Object.assign({}, q, { options: ['True', 'False'] }));
    if (pool.length < 6) pool = pool.concat(termQuestions(unit, level));
    return shuffle(pool);
  }

  function normalize(s) { return String(s || '').trim().toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' '); }

  function findCourse(id) { return (window.LearnHub.courses || []).find(c => c.id === id); }
  function findUnit(course, unitId) { return course && unitsFor(course).find(u => u.id === unitId); }

  /** Question categories available in a unit (for the Focus Plan editor). */
  function catsOf(unit) { return [...new Set((unit.questions || []).map(q => q.cat).filter(Boolean))]; }
  /** Every term of a unit at the standard level (keys used by the Focus Plan). */
  function allTermKeys(unit) { return (unit.terms || []).map(t => L(t.term, 2)); }

  window.LH = { LEVEL_NAMES, LEVEL_DESC, L, shuffle, sample, esc, md, speak, speakBtn, termsFor, slidesFor, mcOptions,
                questionsFor, resolveQuestion, termQuestions, choicePool, normalize, findCourse, findUnit,
                focusFor, unitsFor, lessonsFor, catsOf, allTermKeys };
})();
