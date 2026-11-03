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
       prefs: { fontScale, font, contrast, motion, readAloud },
       suggestions: { [courseId]: { level, pct, unit, at } } }  level changes suggested by test results
   ========================================================= */
(function () {
  const KEY_SETTINGS = 'learnhub.settings';
  const KEY_STUDENTS = 'learnhub.students';
  const KEY_PROGRESS = 'learnhub.progress';   // + '.' + studentId
  const KEY_FOCUS = 'learnhub.focus';         // + '.' + studentId

  const PREF_KEYS = ['fontScale', 'font', 'contrast', 'motion', 'readAloud'];
  const DEFAULT_PREFS = {
    fontScale: 1,        // 1, 1.15, 1.3
    font: 'default',     // 'default' | 'lexend'
    contrast: 'normal',  // 'normal' | 'high' | 'inverted'
    motion: 'normal',    // 'normal' | 'reduced'
    readAloud: true      // show speaker buttons
  };
  const DEFAULT_SETTINGS = Object.assign({
    guardianPin: '',          // 6-digit Teacher Lock PIN
    colouringEvery: 'student',// 'student' | 0 (off) | 1 | 3 | 5 | 10 — learning cards in the Colouring Page
    allowSelfSignup: true,    // students may add their own name on the sign-in screen
    level: 2                  // legacy device level (kept for migration only)
  }, DEFAULT_PREFS);

  /* ---------- the four achievement levels ---------- */
  const LEVELS = {
    1: { name: 'Explorer',    band: '50–59%', short: 'Limited',      desc: 'Simple words, short lessons, fewer questions, obvious answer choices and gentle games. (Ontario Level 1)' },
    2: { name: 'Scholar',     band: '60–69%', short: 'Some',         desc: 'Clear language, regular lessons, guided questions with a word bank and all games. (Ontario Level 2)' },
    3: { name: 'Challenger',  band: '70–79%', short: 'Considerable', desc: 'The full course at the provincial standard: complete lessons, full tests, typed answers and bigger game boards. (Ontario Level 3)' },
    4: { name: 'Trailblazer', band: '80–100%', short: 'Thorough',    desc: 'Extended thinking: expectation codes, real-life application questions, the longest tests and the hardest game settings. (Ontario Level 4)' }
  };
  /** Achievement level suggested by a percentage (Ontario bands). */
  function bandFor(pct) { return pct >= 80 ? 4 : pct >= 70 ? 3 : pct >= 60 ? 2 : 1; }

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? Object.assign({}, fallback, JSON.parse(raw)) : Object.assign({}, fallback);
    } catch (e) { return Object.assign({}, fallback); }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked – app still works for the session */ }
  }
  function remove(key) { try { localStorage.removeItem(key); } catch (e) {} }

  /* ---------- Students ---------- */
  const AVATARS = ['🦊', '🐼', '🦉', '🐸', '🐙', '🦁', '🐧', '🦄', '🐢', '🐝', '🦋', '🐨', '🐯', '🦖', '🐬', '🦜'];
  const COLOURS = ['#3b5bdb', '#2f9e6e', '#f59f00', '#d6336c', '#7048e8', '#15aabf', '#e8590c', '#1f5f8b'];
  function uid() { return 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  const Students = {
    data: load(KEY_STUDENTS, { list: [], current: null }),
    save() { save(KEY_STUDENTS, this.data); },
    get list() { return this.data.list; },
    get current() { return this.data.list.find(s => s.id === this.data.current) || null; },
    byId(id) { return this.data.list.find(s => s.id === id) || null; },
    /** Create a profile. Returns it. */
    add(name, extra) {
      const n = this.data.list.length;
      const s = Object.assign({
        id: uid(), name: String(name || 'Student').trim().slice(0, 30), createdAt: new Date().toISOString(),
        avatar: AVATARS[n % AVATARS.length], colour: COLOURS[n % COLOURS.length],
        level: 2, courseLevels: {}, courses: null, coursesLocked: false,
        accommodations: { reduce: false, simplify: false, chunk: false },
        prefs: Object.assign({}, DEFAULT_PREFS, pick(Settings.data, PREF_KEYS)),
        suggestions: {}
      }, extra || {});
      this.data.list.push(s); this.save();
      return s;
    },
    update(id, patch) { const s = this.byId(id); if (!s) return; Object.assign(s, patch); this.save(); if (s === this.current) Settings.apply(); },
    removeStudent(id) {
      this.data.list = this.data.list.filter(s => s.id !== id);
      remove(KEY_PROGRESS + '.' + id); remove(KEY_FOCUS + '.' + id);
      if (this.data.current === id) this.data.current = null;
      this.save(); Progress.load(); Focus.load();
    },
    /** Sign a student in (or out with null). */
    setCurrent(id) {
      this.data.current = id; this.save();
      Progress.load(); Focus.load(); Settings.apply();
    },
    /** Effective level for a course (per-course override, else the student's default). */
    levelFor(courseId, student) {
      const s = student || this.current;
      if (!s) return Settings.data.level || 2;
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
    enrolled(courseId, student) { const s = student || this.current; return !s || !Array.isArray(s.courses) || s.courses.includes(courseId); },
    setCourses(id, list, locked) { const s = this.byId(id); if (!s) return; s.courses = list; if (locked !== undefined) s.coursesLocked = !!locked; this.save(); },
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
    AVATARS, COLOURS
  };
  function pick(obj, keys) { const o = {}; keys.forEach(k => { if (obj && obj[k] !== undefined) o[k] = obj[k]; }); return o; }

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
    get level() { return Students.levelFor(this.activeCourse); },
    /** True when the PIN is set and this session has not unlocked it. */
    get locked() { return !!this.data.guardianPin && !sessionStorage.getItem('learnhub.unlocked'); },
    apply() {
      const b = document.body;
      document.documentElement.style.setProperty('--font-scale', this.get('fontScale'));
      b.dataset.font = this.get('font');
      b.dataset.contrast = this.get('contrast');
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
    resetFor(studentId) { remove(KEY_PROGRESS + '.' + studentId); if (Students.current && Students.current.id === studentId) this.load(); }
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
  const Focus = {
    data: { enabled: false, courses: {} },
    key() { const s = Students.current; return s ? KEY_FOCUS + '.' + s.id : KEY_FOCUS + '.anon'; },
    load() { this.data = load(this.key(), { enabled: false, courses: {} }); this.data.courses = this.data.courses || {}; },
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
      // back to "everything" when the whole list is selected (goals stay explicit)
      u[field] = (field !== 'goals' && list.length === all.length) ? null : list;
      this.save();
    },
    reset() { this.data = { enabled: false, courses: {} }; this.save(); }
  };

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

  Progress.load(); Focus.load();

  window.Settings = Settings;
  window.Students = Students;
  window.Progress = Progress;
  window.Focus = Focus;
  window.LEVELS = LEVELS;
  window.bandFor = bandFor;
})();
