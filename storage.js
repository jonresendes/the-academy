/* =========================================================
   storage.js — settings + progress persisted in localStorage
   ========================================================= */
(function () {
  const KEY_SETTINGS = 'learnhub.settings';
  const KEY_PROGRESS = 'learnhub.progress';

  const DEFAULT_SETTINGS = {
    level: 2,            // 1 = Explorer, 2 = Scholar, 3 = Challenger
    fontScale: 1,        // 1, 1.15, 1.3
    font: 'default',     // 'default' | 'lexend'
    contrast: 'normal',  // 'normal' | 'high'
    motion: 'normal',    // 'normal' | 'reduced'
    readAloud: true,     // show speaker buttons
    guardianPin: '',     // when set, the level is locked unless the PIN is entered
    studentName: ''
  };

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? Object.assign({}, fallback, JSON.parse(raw)) : Object.assign({}, fallback);
    } catch (e) { return Object.assign({}, fallback); }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked – app still works for the session */ }
  }

  const Settings = {
    data: load(KEY_SETTINGS, DEFAULT_SETTINGS),
    get(k) { return this.data[k]; },
    set(k, v) { this.data[k] = v; save(KEY_SETTINGS, this.data); this.apply(); },
    get level() { return this.data.level; },
    apply() {
      const b = document.body;
      document.documentElement.style.setProperty('--font-scale', this.data.fontScale);
      b.dataset.font = this.data.font;
      b.dataset.contrast = this.data.contrast;
      b.dataset.motion = this.data.motion;
    }
  };

  /* Progress shape:
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
    data: load(KEY_PROGRESS, {}),
    unit(courseId, unitId) {
      const c = this.data[courseId] || (this.data[courseId] = {});
      const u = c[unitId] || (c[unitId] = { slides: {}, games: {}, gameScores: {}, earned: {}, testBest: 0, testAttempts: 0 });
      u.slides = u.slides || {}; u.games = u.games || {}; u.gameScores = u.gameScores || {}; u.earned = u.earned || {};
      return u;
    },
    course(courseId) { return this.data[courseId] || (this.data[courseId] = {}); },
    save() { save(KEY_PROGRESS, this.data); },
    markSlide(courseId, unitId, lessonIdx, slideIdx) {
      const u = this.unit(courseId, unitId);
      const seen = u.slides[lessonIdx] || (u.slides[lessonIdx] = []);
      if (!seen.includes(slideIdx)) seen.push(slideIdx);
      this.save();
    },
    reset() { this.data = {}; this.save(); }
  };

  /* Focus Plan — a guardian-chosen slice of the curriculum for a student
     working well below grade level. Shape:
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
  const KEY_FOCUS = 'learnhub.focus';
  const Focus = {
    data: load(KEY_FOCUS, { enabled: false, courses: {} }),
    save() { save(KEY_FOCUS, this.data); },
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

  window.Settings = Settings;
  window.Progress = Progress;
  window.Focus = Focus;
})();
