/* =========================================================
   storage.js — students, settings, progress and Focus Plan
   (all persisted in localStorage)

   Keys:
     learnhub.settings            device-wide: Teacher Lock PIN, teacher options,
                                  default accessibility preferences
     learnhub.students            { list: [profile, …], current: id }
     learnhub.progress.<student>  that student's progress (see Progress)
     learnhub.focus.<student>     that student's Focus Plan (see Focus)

   A profile:
     { id, name, avatar, colour, createdAt,
       level: 1-4,                     default achievement level
       courseLevels: { [courseId]: 1-4 },   per-course override
       courses: null | [courseId, …],  null = every course
       coursesLocked: bool,            student cannot change the list
       accommodations: { reduce, simplify, chunk },   (used by the Test Room)
       prefs: { fontScale, font, dyslexia, contrast, tint, motion, readAloud, dictation },
       suggestions: { [courseId]: { level, pct, unit, at } } }  level changes suggested by test results
   ========================================================= */
(function () {
  const KEY_SETTINGS = 'learnhub.settings';
  const KEY_STUDENTS = 'learnhub.students';
  const KEY_PROGRESS = 'learnhub.progress';   // + '.' + studentId
  const KEY_FOCUS = 'learnhub.focus';         // + '.' + studentId
  const KEY_GRADES = 'learnhub.grades';       // + '.' + studentId — teacher grades, kept apart from the student's own work

  const PREF_KEYS = ['fontScale', 'font', 'dyslexia', 'contrast', 'tint', 'motion', 'readAloud', 'dictation'];
  const DEFAULT_PREFS = {
    fontScale: 1,        // 1, 1.15, 1.3
    font: 'default',     // 'default' | 'lexend'
    dyslexia: false,     // dyslexia-friendly text: OpenDyslexic + wider word and line spacing
    contrast: 'normal',  // 'normal' | 'high' | 'inverted'
    tint: 'none',        // Irlen-style colour overlay: 'none' | 'cream' | 'blue' | 'green' | 'rose' | 'yellow' | 'grey' | 'peach' | 'lavender'
    motion: 'normal',    // 'normal' | 'reduced'
    readAloud: true,     // show speaker buttons
    dictation: true      // show 🎤 dictation and record buttons
  };
  const DEFAULT_SETTINGS = Object.assign({
    guardianPin: '',          // 6-digit Teacher Lock PIN
    colouringEvery: 'student',// 'student' | 0 (off) | 1 | 3 | 5 | 10 — learning cards in the Colouring Page
    allowSelfSignup: true,    // students may add their own name on the sign-in screen
    googleClientId: '',       // OAuth client ID for the Google Drive export (set by the master account)
    level: 2                  // legacy device level (kept for migration only)
  }, DEFAULT_PREFS);

  /* ---------- the four achievement levels ---------- */
  /* Each level is a grade band. Work done at a level earns a grade inside that level's band:
     a perfect Level 2 quiz is 69, never more. The bands are the single source of truth for
     everything below (level cards, suggestions, the Grades grids). */
  const LEVEL_BANDS = { 1: [50, 59], 2: [60, 69], 3: [70, 84], 4: [85, 100] };
  const LEVELS = {
    1: { name: 'Explorer',    band: '50–59%', short: 'Limited',      desc: 'Simple words, short lessons, fewer questions, obvious answer choices and gentle games. (Ontario Level 1)' },
    2: { name: 'Scholar',     band: '60–69%', short: 'Some',         desc: 'Clear language, regular lessons, guided questions with a word bank and all games. (Ontario Level 2)' },
    3: { name: 'Challenger',  band: '70–84%', short: 'Considerable', desc: 'The full course at the provincial standard: complete lessons, full tests, typed answers and bigger game boards. (Ontario Level 3)' },
    4: { name: 'Trailblazer', band: '85–100%', short: 'Thorough',    desc: 'Extended thinking: expectation codes, real-life application questions, the longest tests and the hardest game settings. (Ontario Level 4)' }
  };
  /** Achievement level suggested by a percentage (the bands above). */
  function bandFor(pct) { return pct >= LEVEL_BANDS[4][0] ? 4 : pct >= LEVEL_BANDS[3][0] ? 3 : pct >= LEVEL_BANDS[2][0] ? 2 : 1; }

  /* ---------- levelled grades ----------
     raw   = the percentage scored on the quiz / test (or teacher score ÷ max for an assignment)
     level = the level the work was done at (1–4)
     One rule, every level: 50% raw is a pass and earns a grade of 50; a perfect score earns the top of the
     level's band; in between, the grade climbs in a straight line. Below 50% raw the grade is the raw score (a fail).
     So each level is a scaled-down copy of Level 4: a Level 2 student who scores 75% has a grade of 60,
     the same place inside 50–69 as 75 is inside 50–100.
     The best levelled grade across every level the student has attempted is the grade that counts. */
  const PASS_MARK_GRADING = 50;
  const Grading = {
    BANDS: LEVEL_BANDS,
    PASS: PASS_MARK_GRADING,
    /** The grade (0–100, whole number) for a raw percentage earned at a level. */
    levelled(raw, level) {
      raw = Math.max(0, Math.min(100, +raw || 0)); level = LEVEL_BANDS[level] ? +level : 2;
      const hi = LEVEL_BANDS[level][1];
      if (raw < PASS_MARK_GRADING) return Math.round(raw);
      return Math.round(PASS_MARK_GRADING + (raw - PASS_MARK_GRADING) / (100 - PASS_MARK_GRADING) * (hi - PASS_MARK_GRADING));
    },
    /** The raw percentage a student at this level needs for a given grade (inverse of levelled). */
    rawFor(grade, level) { const hi = LEVEL_BANDS[level] ? LEVEL_BANDS[level][1] : 69; if (grade < PASS_MARK_GRADING) return grade; return Math.round(PASS_MARK_GRADING + (grade - PASS_MARK_GRADING) / (hi - PASS_MARK_GRADING) * (100 - PASS_MARK_GRADING)); },
    /** Best grade across per-level attempts: { [level]: { best } } → { grade, level, raw } or null. */
    bestOf(perLevel) {
      let out = null;
      Object.keys(perLevel || {}).forEach(l => { const r = perLevel[l]; if (!r || !(r.attempts > 0) && !(r.best > 0)) return; const g = this.levelled(r.best || 0, +l); if (!out || g > out.grade || (g === out.grade && +l > out.level)) out = { grade: g, level: +l, raw: r.best || 0 }; });
      return out;
    },
    /** Record one attempt at a level on a quiz-style record ({ best, attempts, passed, levels }). Keeps the raw fields for awards. */
    recordAttempt(rec, level, pct) {
      rec.levels = rec.levels || {}; const r = rec.levels[level] = rec.levels[level] || { best: 0, attempts: 0 };
      r.attempts++; r.best = Math.max(r.best, pct); r.at = new Date().toISOString();
      const b = this.bestOf(rec.levels); if (b) { rec.grade = b.grade; rec.gradeLevel = b.level; rec.gradeRaw = b.raw; }
      return b;
    },
    /** Grade for an assignment: teacher score out of max, at the level the work was done. */
    assignment(w) { if (!w || !w.grade || w.grade.score === undefined || w.grade.score === null) return null; const max = +w.grade.max || 10; const lvl = +(w.grade.level || w.level) || 2; return { grade: this.levelled(+w.grade.score / max * 100, lvl), level: lvl, raw: Math.round(+w.grade.score / max * 100) }; },
    /** Average of a list of grades (whole number) or null. */
    average(list) { const xs = list.filter(x => typeof x === 'number' && !isNaN(x)); return xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : null; },
    label(level) { return 'L' + level; }
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? Object.assign({}, fallback, JSON.parse(raw)) : Object.assign({}, fallback);
    } catch (e) { return Object.assign({}, fallback); }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked – app still works for the session */ }
    if (window.Cloud && window.Cloud.enabled) window.Cloud.onLocalSave(key, value);   // mirror to the cloud (cloud.js)
  }
  function remove(key) { try { localStorage.removeItem(key); } catch (e) {} if (window.Cloud && window.Cloud.enabled && window.Cloud.onLocalRemove) window.Cloud.onLocalRemove(key); }

  /* ---------- Students ---------- */
  /* Avatars: everyone picks from the groups below. The owl 🦉 is the Headmaster's alone. */
  const HEADMASTER_AVATAR = '🦉';
  const AVATAR_GROUPS = [
    ['People', ['🧑', '👩', '👨', '🧒', '👧', '👦', '🧑‍🎓', '👩‍🎓', '👨‍🎓', '🧑‍🏫', '👩‍🏫', '👨‍🏫', '🧑‍🔬', '👩‍🔬', '👨‍🔬', '🧑‍💻', '👩‍💻', '👨‍💻', '🧑‍🎨', '👩‍🎨', '👨‍🎨', '🧑‍🚀', '👩‍🚀', '👨‍🚀', '🧑‍🍳', '🧑‍🌾', '🧑‍🔧', '🧑‍⚕️', '🦸', '🦹', '🧙', '🧝', '🧛', '🧜', '🧚', '🥷', '🤠', '👻', '🤖', '👽', '🎅', '🤶']],
    ['Animals', ['🦊', '🐼', '🐸', '🐙', '🦁', '🐧', '🦄', '🐢', '🐝', '🦋', '🐨', '🐯', '🦖', '🐬', '🦜', '🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐻‍❄️', '🐷', '🐮', '🐵', '🐔', '🐣', '🦆', '🦅', '🦇', '🐺', '🐗', '🐴', '🦓', '🦒', '🐘', '🦏', '🦛', '🐪', '🦘', '🦥', '🦦', '🦨', '🦔', '🐿️', '🦫', '🐍', '🦎', '🐊', '🐳', '🐋', '🦈', '🐠', '🐡', '🦑', '🦀', '🦞', '🐌', '🐞', '🐜', '🦗', '🕷️', '🦂', '🦩', '🦚', '🦢', '🕊️', '🐉', '🦕']],
    ['School', ['📚', '📖', '✏️', '📝', '🖍️', '🖊️', '📐', '📏', '🎒', '🏫', '🍎', '🧮', '📎', '📌', '🗂️', '📓', '📒', '🔔', '🎓', '🏅', '🥇', '🏆', '⭐', '🌟']],
    ['Sport', ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🥍', '🏏', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '🛹', '🛼', '⛸️', '🎿', '🛷', '🥌', '🏊', '🚴', '🧗', '🏇', '🤸', '⛷️', '🏂', '🏄', '🚣', '🤾', '🏋️', '🤺', '🧘']],
    ['Art & music', ['🎨', '🖌️', '🖼️', '🎭', '🎬', '🎤', '🎧', '🎼', '🎵', '🎶', '🎹', '🎸', '🎻', '🎺', '🎷', '🪕', '🥁', '🪘', '🪗', '📷', '📸', '🎥', '🎪', '🩰', '🧵', '🧶', '✂️', '🪡']],
    ['Math', ['➕', '➖', '✖️', '➗', '🟰', '♾️', '📊', '📈', '📉', '🔢', '🔣', '💯', '🧮', '📐', '📏', '⚖️', '🎲', '🧩', '🔷', '🔶', '🟥', '🟩', '🟦', '🟨', '⬛', '⚪', '🔺', '🔻']],
    ['Tech', ['💻', '🖥️', '⌨️', '🖱️', '🖨️', '💾', '💿', '📱', '📡', '🔋', '🔌', '💡', '🔦', '🕹️', '🎮', '🤖', '🛰️', '🚀', '🛸', '⚙️', '🔧', '🔩', '🛠️', '🧲', '📟', '📠', '🧰', '🔭']],
    ['Science', ['🔬', '🧪', '🧫', '🧬', '⚗️', '🌡️', '🧲', '⚛️', '🔭', '🪐', '🌍', '🌎', '🌏', '🌕', '🌙', '☀️', '⭐', '☄️', '🌈', '⚡', '🔥', '💧', '🌊', '🌋', '🧊', '🦠', '🌱', '🌿', '🍄', '🐚', '🪨', '💎', '🧠', '🦴', '🫀', '🫁', '🩺', '💊', '🧯', '🧭']],
    ['Literature & stories', ['📜', '📰', '📗', '📘', '📙', '📕', '📔', '📑', '🔖', '🖋️', '🪶', '🏰', '🗡️', '🛡️', '👑', '🧞', '🧜‍♀️', '🧚‍♂️', '🐲', '🗺️', '🧭', '⚓', '🏴‍☠️', '🔮', '🪄', '🎩', '🕵️', '🕯️', '🗝️', '🧳', '🎠', '🎡', '🧸', '🪁', '🎈']],
    ['Nature & food', ['🌳', '🌲', '🌴', '🌵', '🌷', '🌹', '🌻', '🌼', '🌸', '💐', '🍀', '🍁', '🍂', '🍃', '🌾', '🍎', '🍏', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍒', '🍑', '🥭', '🍍', '🥝', '🍅', '🥑', '🥕', '🌽', '🥦', '🍕', '🍔', '🌮', '🍣', '🍩', '🍪', '🎂', '🧁', '🍦', '🍫', '🍿', '🥨', '🧇', '🥞', '☕', '🧃']],
    ['Flags & places', ['🇨🇦', '🍁', '🏔️', '🏕️', '🏖️', '🏝️', '🏞️', '🌅', '🌃', '🌉', '🏙️', '🏟️', '🗽', '🗼', '🎑', '🏠', '🏡', '🏢', '🏥', '🏛️', '⛪', '🕌', '🛕', '🕍', '⛩️', '🚗', '🚌', '🚲', '🛴', '🚂', '✈️', '🚁', '⛵', '🚢']]
  ];
  (() => { const seen = new Set(); AVATAR_GROUPS.forEach(g => { g[1] = g[1].filter(a => { if (seen.has(a)) return false; seen.add(a); return true; }); }); })();   // each picture in one group only
  const AVATAR_ALL = AVATAR_GROUPS.reduce((a, g) => a.concat(g[1]), []).filter(a => a !== HEADMASTER_AVATAR);
  const AVATARS = ['🦊', '🐼', '🐸', '🐙', '🦁', '🐧', '🦄', '🐢', '🐝', '🦋', '🐨', '🐯', '🦖', '🐬', '🦜', '🐶'];   // defaults handed out to new students
  /** May this profile use this avatar? The owl belongs to the Headmaster. */
  const avatarAllowed = (a, isMaster) => a === HEADMASTER_AVATAR ? !!isMaster : AVATAR_ALL.includes(a);
  const COLOURS = ['#3b5bdb', '#2f9e6e', '#f59f00', '#d6336c', '#7048e8', '#15aabf', '#e8590c', '#1f5f8b'];
  function uid() { return 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  const Students = {
    data: load(KEY_STUDENTS, { list: [], current: null }),
    save() { const c = this.current; if (c && c.isStaff) this.saveStaff(c); save(KEY_STUDENTS, this.data); },
    get list() { return this.data.list; },
    /** The signed-in profile: a student, or a teacher/master profile (id 'staff:<id>'). */
    get current() { return this.byId(this.data.current); },
    _staffCache: {},
    byId(id) {
      if (!id) return null;
      if (String(id).startsWith('staff:')) {
        const sid = id.slice(6); const rec = sid === 'master' ? Staff.master : Staff.teachers.find(t => t.id === sid);
        if (!rec) return null;
        const c = this._staffCache[id] || (this._staffCache[id] = {});
        return Object.assign(c, { id, staffId: sid, isStaff: true, role: sid === 'master' ? 'master' : 'teacher', name: rec.name, avatar: rec.avatar || '🧑‍🏫', colour: rec.colour || '#1f5f8b',
          level: 3, courseLevels: {}, courses: null, coursesLocked: false, accommodations: {}, prefs: rec.prefs || (rec.prefs = Object.assign({}, DEFAULT_PREFS)), suggestions: {}, track: {}, archived: rec.archived || [], levelLog: {}, lessonLevels: {} });
      }
      return this.data.list.find(s => s.id === id) || null;
    },
    get isStaffSession() { const s = this.current; return !!(s && s.isStaff); },
    /** Create a profile. Returns it. */
    add(name, extra) {
      const n = this.data.list.length;
      const s = Object.assign({
        id: uid(), name: String(name || 'Student').trim().slice(0, 30), createdAt: new Date().toISOString(),
        avatar: AVATARS[n % AVATARS.length], colour: COLOURS[n % COLOURS.length],
        level: 2, courseLevels: {}, courses: null, coursesLocked: false,
        accommodations: { reduce: false, simplify: false, chunk: false },
        prefs: Object.assign({}, DEFAULT_PREFS, pick(Settings.data, PREF_KEYS)),
        suggestions: {},
        track: {},             // { [courseId]: { mode: 'modified', band: 'k2' | 'g35' | 'g68' } }  — Modified program
        archived: [],          // course ids the student has archived (hidden from the home page)
        levelLog: {},          // { [courseId]: [{ at, from, to, by, reason, lesson, pct }] }  — every level change
        lessonLevels: {}       // { [courseId]: { [lessonIdx]: { level, pct, at } } }  — level at which each quiz was passed
      }, extra || {});
      this.data.list.push(s); this.save();
      return s;
    },
    update(id, patch) { const s = this.byId(id); if (!s) return; if (patch && patch.avatar !== undefined && !avatarAllowed(patch.avatar, s.role === 'master')) { patch = Object.assign({}, patch); delete patch.avatar; } Object.assign(s, patch); if (s.isStaff) this.saveStaff(s); this.save(); if (s === this.current) Settings.apply(); },
    /** Persist name / avatar / prefs / archived of a staff profile back to its record. */
    saveStaff(s) { const rec = s.staffId === 'master' ? Staff.master : Staff.teachers.find(t => t.id === s.staffId); if (rec) { rec.name = s.name; rec.avatar = s.avatar; rec.colour = s.colour; rec.prefs = s.prefs; rec.archived = s.archived; Staff.save(); } },
    /** Staff only, cloud mode: name / number / picture of every student, for "Add an existing student" (held by cloud.js in memory, never stored). */
    get directory() { return (window.Cloud && window.Cloud.directory) || []; },
    set directory(v) { if (window.Cloud) window.Cloud.directory = v || []; },
    removeStudent(id) {
      const cloud = window.Cloud && window.Cloud.enabled && window.Cloud.user;
      this.data.list = this.data.list.filter(s => s.id !== id);
      if (cloud) {   // cloud.js removes the profile, work, grades and directory card; the roster entries go here
        [KEY_PROGRESS, KEY_FOCUS, KEY_GRADES].forEach(k => { try { localStorage.removeItem(k + '.' + id); } catch (e) {} });
        this.directory = (this.directory || []).filter(s => s.id !== id);
        let touched = false; Sections.list.forEach(sec => { if ((sec.students || []).includes(id)) { sec.students = sec.students.filter(x => x !== id); touched = true; } }); if (touched) Sections.save();
        window.Cloud.removeStudent(id).catch(e => alert('The student could not be removed from the cloud: ' + e.message + '\nThey will reappear here; try again in a moment.'));
      } else { remove(KEY_PROGRESS + '.' + id); remove(KEY_FOCUS + '.' + id); try { localStorage.removeItem(KEY_GRADES + '.' + id); } catch (e) {} }
      if (this.data.current === id) this.data.current = null;
      this.save(); Progress.load(); Focus.load();
    },
    /** Sign a student in (or out with null). */
    setCurrent(id) {
      this.data.current = id; save(KEY_STUDENTS, this.data);
      if (id && String(id).startsWith('staff:')) Staff.signIn(id.slice(6)); else Staff.signOut();
      Progress.load(); Focus.load(); Settings.apply();
    },
    /** Effective level for a course (per-course override, else the student's default). */
    levelFor(courseId, student) {
      const s = student || this.current;
      if (!s) return Settings.data.level || 2;
      if (s.isStaff) return 3;
      const l = (courseId && s.courseLevels && s.courseLevels[courseId]) || s.level || 2;
      return Math.min(4, Math.max(1, +l));
    },
    setLevel(id, courseId, level) {
      const s = this.byId(id); if (!s) return;
      if (courseId) { s.courseLevels = s.courseLevels || {}; if (level) s.courseLevels[courseId] = +level; else delete s.courseLevels[courseId]; }
      else s.level = +level;
      if (courseId && s.suggestions) delete s.suggestions[courseId];
      this.save();
    },
    /** Can this student see the course? (null list = every course) */
    enrolled(courseId, student) { const s = student || this.current; return !s || s.isStaff || !Array.isArray(s.courses) || s.courses.includes(courseId); },
    setCourses(id, list, locked) { const s = this.byId(id); if (!s) return; s.courses = list; if (locked !== undefined) s.coursesLocked = !!locked; this.save(); },
    /** Modified program setting for a course: null = standard track. */
    trackFor(courseId, student) { const s = student || this.current; const t = s && s.track && s.track[courseId]; return t && t.mode === 'modified' ? t : null; },
    setTrack(id, courseId, band) { const s = this.byId(id); if (!s) return; s.track = s.track || {}; if (band) s.track[courseId] = { mode: 'modified', band }; else delete s.track[courseId]; this.save(); },
    /** Move a student's level for a course by one step (student self-moves) or to any level (teacher). Logged. */
    moveLevel(id, courseId, to, by, reason, extra) {
      const s = this.byId(id); if (!s) return false;
      const from = this.levelFor(courseId, s); to = Math.min(4, Math.max(1, +to));
      if (to === from) return false;
      if (by === 'student' && Math.abs(to - from) !== 1) return false;   // students never skip a level
      s.courseLevels = s.courseLevels || {}; s.courseLevels[courseId] = to;
      s.levelLog = s.levelLog || {}; (s.levelLog[courseId] = s.levelLog[courseId] || []).push(Object.assign({ at: new Date().toISOString(), from, to, by: by || 'teacher', reason: reason || '' }, extra || {}));
      if (s.suggestions) delete s.suggestions[courseId];
      this.save(); return true;
    },
    /** The level this student was at before the latest change (for "go back"). */
    previousLevel(courseId, student) { const s = student || this.current; const log = s && s.levelLog && s.levelLog[courseId]; return log && log.length ? log[log.length - 1].from : null; },
    /** Remember the level at which a lesson quiz was passed (for end-of-course grading). */
    recordLessonLevel(courseId, lessonIdx, level, pct) { const s = this.current; if (!s) return; s.lessonLevels = s.lessonLevels || {}; const c = s.lessonLevels[courseId] = s.lessonLevels[courseId] || {}; const prev = c[lessonIdx]; if (!prev || pct >= prev.pct || level > prev.level) c[lessonIdx] = { level, pct, at: new Date().toISOString() }; this.save(); },
    /** Student-side archive of a course (hide from the home page; teachers can still assign it). */
    archiveCourse(id, courseId, on) { const s = this.byId(id); if (!s) return; s.archived = (s.archived || []).filter(x => x !== courseId); if (on) s.archived.push(courseId); if (s.isStaff) this.saveStaff(s); this.save(); },
    isArchived(courseId, student) { const s = student || this.current; return !!(s && (s.archived || []).includes(courseId)); },
    /** Record a level suggestion after a test (teacher reviews it in Settings). */
    suggest(courseId, unitTitle, pct) {
      const s = this.current; if (!s) return null;
      const band = bandFor(pct), cur = this.levelFor(courseId, s);
      s.suggestions = s.suggestions || {};
      if (band === cur) { delete s.suggestions[courseId]; this.save(); return null; }
      s.suggestions[courseId] = { level: band, from: cur, pct, unit: unitTitle, at: new Date().toISOString() };
      this.save();
      return s.suggestions[courseId];
    },
    AVATARS, COLOURS, AVATAR_GROUPS, AVATAR_ALL, HEADMASTER_AVATAR, avatarAllowed
  };
  function pick(obj, keys) { const o = {}; keys.forEach(k => { if (obj && obj[k] !== undefined) o[k] = obj[k]; }); return o; }

  /* ---------- Staff: one master account + classroom teachers ----------
     learnhub.staff = { master: { name, email, pin }, teachers: [{ id, name, pin, createdAt }] }
     Who is "unlocked" right now lives in sessionStorage ('learnhub.staffId' = 'master' | teacher id). */
  const KEY_STAFF = 'learnhub.staff';
  const Staff = {
    data: load(KEY_STAFF, { master: null, teachers: [] }),
    save() { save(KEY_STAFF, this.data); },
    /** Sticky notes for the signed-in teacher (private to that teacher, synced to their devices). */
    get notes() { const rec = this.current ? (this.currentId === 'master' ? this.master : this.teachers.find(t => t.id === this.currentId)) : null; return rec ? (rec.notes || null) : null; },
    setNotes(notes) { const rec = this.currentId === 'master' ? this.master : this.teachers.find(t => t.id === this.currentId); if (!rec) return; notes.updatedAt = new Date().toISOString(); rec.notes = notes; this.save(); },
    get master() { return this.data.master; },
    setMaster(name, email, pin) { this.data.master = Object.assign({ avatar: '🧑‍🏫', colour: '#1f5f8b' }, this.data.master || {}, { name, email, pin }); this.save(); },
    get teachers() { return this.data.teachers || (this.data.teachers = []); },
    addTeacher(name, pin, extra) { const t = Object.assign({ id: 't' + Date.now().toString(36), name: String(name).trim().slice(0, 40), pin: String(pin), avatar: '🧑‍🏫', colour: '#1f5f8b', createdAt: new Date().toISOString() }, extra || {}); this.teachers.push(t); this.save(); return t; },
    updateTeacher(id, patch) { const t = this.teachers.find(x => x.id === id); if (t) { Object.assign(t, patch); this.save(); } },
    removeTeacher(id) { this.data.teachers = this.teachers.filter(t => t.id !== id); this.save(); Sections.list.forEach(sec => { if (sec.teacherId === id) sec.teacherId = null; }); Sections.save(); },
    /** Try a PIN: returns 'master', a teacher id, or null. */
    unlock(pin) {
      if (this.master && this.master.pin === pin) return 'master';
      const t = this.teachers.find(x => x.pin === pin); return t ? t.id : null;
    },
    get currentId() { return sessionStorage.getItem('learnhub.staffId') || null; },
    get current() { const id = this.currentId; if (!id) return null; if (id === 'master') return Object.assign({ id: 'master', role: 'master' }, this.master || { name: 'Master' }); const t = this.teachers.find(x => x.id === id); return t ? Object.assign({ role: 'teacher' }, t) : null; },
    get isMaster() { return this.currentId === 'master'; },
    signIn(id) { sessionStorage.setItem('learnhub.staffId', id); sessionStorage.setItem('learnhub.unlocked', '1'); },
    signOut() { sessionStorage.removeItem('learnhub.staffId'); sessionStorage.removeItem('learnhub.unlocked'); }
  };

  /* ---------- Sections (classes): a course + a teacher + a roster, archivable ----------
     learnhub.sections = { list: [{ id, name, courseId, teacherId, term, students: [ids], archived, createdAt }], current: { [staffId]: sectionId } } */
  const KEY_SECTIONS = 'learnhub.sections';
  const Sections = {
    data: load(KEY_SECTIONS, { list: [], current: {} }),
    save() { save(KEY_SECTIONS, this.data); },
    get list() { return this.data.list; },
    byId(id) { return this.list.find(x => x.id === id) || null; },
    /** Sections a staff member may see (master: all). */
    visible(staffId, includeArchived) { return this.list.filter(sec => (staffId === 'master' || sec.teacherId === staffId) && (includeArchived || !sec.archived)); },
    add(name, courseId, teacherId, term) { const sec = { id: 'sec' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), name: String(name).trim().slice(0, 60), courseId, teacherId: teacherId || null, term: term || '', students: [], archived: false, createdAt: new Date().toISOString() }; this.list.push(sec); this.save(); return sec; },
    update(id, patch) { const sec = this.byId(id); if (sec) { Object.assign(sec, patch); this.save(); } },
    remove(id) { this.data.list = this.list.filter(x => x.id !== id); this.save(); },
    setArchived(id, on) { this.update(id, { archived: !!on }); },
    /** Current section for a staff member (null = all my students). */
    currentFor(staffId) { const id = (this.data.current || {})[staffId]; const sec = id && this.byId(id); return sec || null; },
    setCurrent(staffId, sectionId) { this.data.current = this.data.current || {}; if (sectionId) this.data.current[staffId] = sectionId; else delete this.data.current[staffId]; this.save(); },
    /** Enrol a student in a section (and in its course). */
    enrol(sectionId, studentId, on) {
      const sec = this.byId(sectionId); if (!sec) return;
      sec.students = (sec.students || []).filter(x => x !== studentId); if (on) sec.students.push(studentId);
      // the section keeps a log of who was in it and when (teachers see it even before a new student's record arrives)
      const teacher = sec.teacherId ? (Staff.teachers.find(t => t.id === sec.teacherId) || {}) : (Staff.master || {});
      const nowIso = new Date().toISOString();
      sec.log = Array.isArray(sec.log) ? sec.log : [];
      let e = sec.log.find(x => x.student === studentId && !x.until);
      if (on && !e) sec.log.push({ student: studentId, teacher: sec.teacherId || 'master', teacherName: teacher.name || '', since: nowIso });
      if (!on) { if (e) e.until = nowIso; else sec.log.push({ student: studentId, teacher: sec.teacherId || 'master', teacherName: teacher.name || '', since: '', until: nowIso }); }
      this.save();
      const s = Students.byId(studentId); if (!s) return;
      // ...and the student's own record keeps the same history, so it follows them to any teacher
      s.history = Array.isArray(s.history) ? s.history : [];
      let h = s.history.find(x => x.sec === sec.id && !x.until);
      if (on && !h) s.history.push({ sec: sec.id, name: sec.name, course: sec.courseId, term: sec.term || '', teacher: sec.teacherId || 'master', teacherName: teacher.name || '', since: nowIso });
      if (!on) { if (h) h.until = nowIso; else s.history.push({ sec: sec.id, name: sec.name, course: sec.courseId, term: sec.term || '', teacher: sec.teacherId || 'master', teacherName: teacher.name || '', since: '', until: nowIso }); }
      if (on && sec.courseId) { if (Array.isArray(s.courses) && !s.courses.includes(sec.courseId)) s.courses.push(sec.courseId); s.archived = (s.archived || []).filter(c => c !== sec.courseId); }
      Students.save();
    },
    /** Everything a student has been in — open entries (still enrolled) and closed ones, newest first —
        merged from the section logs, the student's own record and the rosters (for sections older than the log). */
    historyFor(studentId) {
      const s = Students.byId(studentId); const out = [];
      // one entry per stay: the same section and the same leaving time (or both still open) are the same stay
      const add = h => { const x = out.find(x => x.sec === h.sec && String(x.until || '') === String(h.until || '')); if (!x) out.push(h); else if (!x.since && h.since) x.since = h.since; };
      this.list.forEach(sec => (sec.log || []).forEach(e => { if (e.student === studentId) add({ sec: sec.id, name: sec.name, course: sec.courseId, term: sec.term || '', teacher: e.teacher, teacherName: e.teacherName, since: e.from, until: e.to }); }));
      (s && Array.isArray(s.history) ? s.history : []).forEach(h => add(Object.assign({}, h)));
      this.list.forEach(sec => { if ((sec.students || []).includes(studentId) && !out.some(h => h.sec === sec.id && !h.until)) { const t = sec.teacherId ? (Staff.teachers.find(x => x.id === sec.teacherId) || {}) : (Staff.master || {}); add({ sec: sec.id, name: sec.name, course: sec.courseId, term: sec.term || '', teacher: sec.teacherId || 'master', teacherName: t.name || '', since: sec.createdAt || '' }); } });
      return out.map(h => { const sec = this.byId(h.sec); const t = h.teacher === 'master' ? (Staff.master || {}) : (Staff.teachers.find(x => x.id === h.teacher) || {});
        const current = !h.until && !!sec && (sec.students || []).includes(studentId);
        return Object.assign({}, h, { current, archived: !!(sec && sec.archived), exists: !!sec, teacherName: t.name || h.teacherName || '', name: sec ? sec.name : h.name }); })
        .filter(h => h.current || h.until || !h.exists)
        .sort((a, b) => (b.current - a.current) || String(b.until || b.since).localeCompare(String(a.until || a.since)));
    },
    /** Sections a student belongs to. */
    forStudent(studentId, includeArchived) { return this.list.filter(sec => (sec.students || []).includes(studentId) && (includeArchived || !sec.archived)); }
  };

  /* ---------- Settings ----------
     Accessibility preferences belong to the signed-in student (and fall back to the
     device defaults); teacher options and the PIN belong to the device. */
  const Settings = {
    data: load(KEY_SETTINGS, DEFAULT_SETTINGS),
    isPref(k) { return PREF_KEYS.includes(k); },
    get(k) {
      const s = Students.current;
      if (this.isPref(k) && s && s.prefs && s.prefs[k] !== undefined) return s.prefs[k];
      return this.data[k];
    },
    set(k, v) {
      const s = Students.current;
      if (this.isPref(k) && s) { s.prefs = s.prefs || {}; s.prefs[k] = v; Students.save(); }
      else { this.data[k] = v; save(KEY_SETTINGS, this.data); }
      this.apply();
    },
    /** The achievement level in force right now: the signed-in student's level for the
        course being viewed (set by app.js via Settings.activeCourse). */
    activeCourse: null,
    get level() { const t = Students.trackFor && Students.trackFor(this.activeCourse); return t ? 1 : Students.levelFor(this.activeCourse); },
    /** True when a Teacher Lock exists and this session has not unlocked it. */
    get locked() { return !Students.isStaffSession; },
    apply() {
      const b = document.body;
      document.documentElement.style.setProperty('--font-scale', this.get('fontScale'));
      b.dataset.font = this.get('font');
      b.dataset.dyslexia = this.get('dyslexia') === true ? 'on' : 'off';
      b.dataset.contrast = this.get('contrast');
      b.dataset.tint = this.get('tint') || 'none';
      b.dataset.motion = this.get('motion');
    }
  };

  /* Progress shape (per student):
     { [courseId]: { [unitId]: {
         slides: { [lessonIndex]: [slideIndex, ...] },   // slides seen
         studyComplete: bool,
         testBest: 0-100, testAttempts: n, testPassed: bool, testPerfect: bool,
         games: { matching: true, memory: true, ... },   // games finished
         gameScores: { jeopardy: 1200, ... },
         earned: { [badgeId]: ISOdate }
     } } }
  */
  const Progress = {
    data: {},
    key() { const s = Students.current; return s ? KEY_PROGRESS + '.' + s.id : KEY_PROGRESS + '.anon'; },
    load() { this.data = load(this.key(), {}); },
    unit(courseId, unitId) {
      const c = this.data[courseId] || (this.data[courseId] = {});
      const u = c[unitId] || (c[unitId] = { slides: {}, games: {}, gameScores: {}, earned: {}, testBest: 0, testAttempts: 0 });
      u.slides = u.slides || {}; u.games = u.games || {}; u.gameScores = u.gameScores || {}; u.earned = u.earned || {};
      return u;
    },
    course(courseId) { return this.data[courseId] || (this.data[courseId] = {}); },
    save() { save(this.key(), this.data); },
    markSlide(courseId, unitId, lessonIdx, slideIdx) {
      const u = this.unit(courseId, unitId);
      const seen = u.slides[lessonIdx] || (u.slides[lessonIdx] = []);
      if (!seen.includes(slideIdx)) seen.push(slideIdx);
      this.save();
    },
    reset() { this.data = {}; this.save(); },
    /** Read another student's progress without switching (teacher views of work). */
    peek(studentId) { return load(KEY_PROGRESS + '.' + studentId, {}); },
    /** Reset another student's progress (teacher). */
    resetFor(studentId) { remove(KEY_PROGRESS + '.' + studentId); if (Students.current && Students.current.id === studentId) this.load(); },
    /** Write another student's progress (teacher: grades, notes). */
    saveFor(studentId, data) { save(KEY_PROGRESS + '.' + studentId, data); if (Students.current && Students.current.id === studentId) this.load(); },
    /* Teacher grades live in their own record ('learnhub.grades.<student>' → grades/<student>__<course> in the cloud),
       which the student can read but never write:  { [courseId]: { [unitId]: { [lessonIdx]: { [n]: { score, max, note, by, at } } } } } */
    grades(studentId) { return load(KEY_GRADES + '.' + studentId, {}); },
    /** A student's progress with the teacher's grades laid over it (as work[lesson][n].grade), for the Grades pages and exports.
        A "grade" found inside the student's own record is ignored: only the teacher's record counts. */
    graded(studentId) {
      const me = Students.current;
      const data = JSON.parse(JSON.stringify(me && me.id === studentId ? this.data : this.peek(studentId)));
      Object.keys(data).forEach(c => Object.keys(data[c] || {}).forEach(u => { const work = data[c][u] && data[c][u].work; if (work && typeof work === 'object') Object.keys(work).forEach(l => Object.keys(work[l] || {}).forEach(n => { if (work[l][n] && typeof work[l][n] === 'object') delete work[l][n].grade; })); }));
      const g = this.grades(studentId);
      Object.keys(g).forEach(c => Object.keys(g[c] || {}).forEach(u => Object.keys(g[c][u] || {}).forEach(l => Object.keys(g[c][u][l] || {}).forEach(n => {
        const gr = g[c][u][l][n]; if (!gr || typeof gr !== 'object') return;
        const unit = (data[c] = data[c] || {})[u] = data[c][u] || {}; unit.work = unit.work || {}; const wl = unit.work[l] = unit.work[l] || {};
        (wl[n] = wl[n] || { text: '', done: false }).grade = gr; }))));
      return data;
    },
    /** Teacher grade on an assignment: { score, max, note, by, at }. Works for any student. */
    setGrade(studentId, courseId, unitId, lessonIdx, n, grade) {
      const g = this.grades(studentId); const u = (g[courseId] = g[courseId] || {})[unitId] = g[courseId][unitId] || {}; const wl = u[lessonIdx] = u[lessonIdx] || {};
      if (grade === null) delete wl[n]; else wl[n] = Object.assign({}, wl[n] || {}, grade, { at: new Date().toISOString() });
      save(KEY_GRADES + '.' + studentId, g);
    }
  };

  /* Focus Plan — a teacher-chosen slice of the curriculum for a student
     working well below grade level (per student). Shape:
     { enabled: bool,
       courses: { [courseId]: {
         units: { [unitId]: {
           lessons: [lessonIndex, …] | null,   // null = every lesson
           terms:   [term, …]        | null,   // null = every term
           cats:    [category, …]    | null,   // null = every question topic
           goals:   ['study','testPass','games3', …]   // what this unit is working toward
         } }
       } } }
     A course with no entry is fully available; when `enabled` is true, a course WITH an
     entry shows only the units listed in it. */
  function focusStore(keyFn) {
    return {
      data: { enabled: false, courses: {} },
      key: keyFn,
      load() { this.data = load(this.key(), { enabled: false, courses: {} }); this.data.courses = this.data.courses || {}; return this; },
      save() { save(this.key(), this.data); },
      get enabled() { return !!this.data.enabled; },
      setEnabled(v) { this.data.enabled = !!v; this.save(); },
      courseEntry(courseId) { return this.data.courses[courseId] || null; },
      unitEntry(courseId, unitId) { const c = this.courseEntry(courseId); return c && c.units ? c.units[unitId] || null : null; },
      /** Is this course restricted by a plan right now? */
      active(courseId) { return this.enabled && !!this.courseEntry(courseId); },
      includeUnit(courseId, unitId, on) {
        const c = this.data.courses[courseId] || (this.data.courses[courseId] = { units: {} });
        if (on) c.units[unitId] = c.units[unitId] || { lessons: null, terms: null, cats: null, goals: ['study', 'testPass', 'games3'] };
        else delete c.units[unitId];
        if (!Object.keys(c.units).length) delete this.data.courses[courseId];
        this.save();
      },
      /** Toggle one item in a unit's list field (lessons / terms / cats / goals). `all` is the full list of possible values. */
      toggle(courseId, unitId, field, value, all) {
        const u = this.unitEntry(courseId, unitId); if (!u) return;
        let list = u[field] === null || u[field] === undefined ? (field === 'goals' ? [] : all.slice()) : u[field].slice();
        const i = list.findIndex(x => String(x) === String(value));
        if (i >= 0) list.splice(i, 1); else list.push(value);
        u[field] = (field !== 'goals' && list.length === all.length) ? null : list;   // back to "everything" when the whole list is selected
        this.save();
      },
      reset() { this.data = { enabled: false, courses: {} }; this.save(); }
    };
  }
  /** The signed-in student's Focus Plan (what the app filters by). */
  const Focus = focusStore(() => { const s = Students.current; return s ? KEY_FOCUS + '.' + s.id : KEY_FOCUS + '.anon'; });
  /** A teacher's editing handle on ANY student's plan (does not affect what the signed-in student sees until they sign in). */
  Focus.forStudent = (id) => { const f = focusStore(() => KEY_FOCUS + '.' + id).load(); f.save = function () { save(this.key(), this.data); if (Students.current && Students.current.id === id) Focus.load(); }; return f; };

  /* ---------- one-time migration from the single-student version ---------- */
  (function migrate() {
    if (Students.list.length) return;
    let oldProgress = null, oldFocus = null;
    try { oldProgress = JSON.parse(localStorage.getItem(KEY_PROGRESS) || 'null'); oldFocus = JSON.parse(localStorage.getItem(KEY_FOCUS) || 'null'); } catch (e) {}
    const hadData = (oldProgress && Object.keys(oldProgress).length) || (oldFocus && oldFocus.courses && Object.keys(oldFocus.courses).length) || Settings.data.studentName;
    if (!hadData) return;
    const s = Students.add(Settings.data.studentName || 'Student', { level: Math.min(3, +Settings.data.level || 2) });
    if (oldProgress) save(KEY_PROGRESS + '.' + s.id, oldProgress);
    if (oldFocus) save(KEY_FOCUS + '.' + s.id, oldFocus);
    remove(KEY_PROGRESS); remove(KEY_FOCUS);
    Students.data.current = s.id; Students.save();
  })();

  // The old single Teacher Lock PIN becomes the master account's PIN.
  if (Settings.data.guardianPin && !Staff.master) { Staff.setMaster('Master', '', Settings.data.guardianPin); }
  if (Staff.master && Staff.master.pin) Settings.data.guardianPin = Staff.master.pin;   // keep the legacy flag in step

  // The old single Teacher Lock PIN becomes the master account's PIN.
  if (Settings.data.guardianPin && !Staff.master) { Staff.setMaster('Master', '', Settings.data.guardianPin); }
  if (Staff.master && Staff.master.pin) Settings.data.guardianPin = Staff.master.pin;   // keep the legacy flag in step
  // A teacher/master profile stays signed in only for the browser session (students persist across sessions)
  if (String(Students.data.current || '').startsWith('staff:') && !Staff.currentId) { Students.data.current = null; save(KEY_STUDENTS, Students.data); }

  Progress.load(); Focus.load();

  window.Settings = Settings;
  window.Students = Students;
  window.Staff = Staff;
  window.Sections = Sections;
  window.Progress = Progress;
  window.Focus = Focus;
  window.LEVELS = LEVELS;
  window.bandFor = bandFor; window.Grading = Grading; window.LEVEL_BANDS = LEVEL_BANDS;
})();
