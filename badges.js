/* =========================================================
   badges.js — achievement engine
   Every course may supply an `awards` theme (name/icon/desc per key);
   anything it leaves out uses the defaults below. Awards are generated
   per unit from that theme, plus course-wide trophies.
   Tiers: badge → medal → trophy. Later keys reward higher achievement
   and game points, so stronger students keep finding new goals.
   ========================================================= */
(function () {
  const PASS_MARK = 70;

  // key → default theme. {unit} and {course} are filled in.
  const DEFAULT_THEME = {
    /* ---- learning ---- */
    study:       { tier: 'badge',  icon: '📖', name: '{unit} Reader',          desc: 'Read every slide of every lesson in {unit}.' },
    firstQuiz:   { tier: 'badge',  icon: '🌱', name: '{unit} First Steps',     desc: 'Pass your first lesson quiz in {unit}.' },
    quizzes:     { tier: 'badge',  icon: '❓', name: '{unit} Quiz Master',     desc: 'Pass the quiz for every lesson in {unit}.' },
    firstTry:    { tier: 'badge',  icon: '🎯', name: '{unit} First Try',       desc: 'Pass three lesson quizzes in {unit} on the first attempt.' },
    scribe:      { tier: 'badge',  icon: '✍️', name: '{unit} Scribe',          desc: 'Hand in every assignment in {unit}.' },
    lessons:     { tier: 'medal',  icon: '🎓', name: '{unit} Lessons Complete', desc: 'Finish every lesson in {unit}: slides read, quiz passed, assignments handed in.' },
    /* ---- tests ---- */
    testPass:    { tier: 'badge',  icon: '✅', name: '{unit} Pass',            desc: 'Score ' + PASS_MARK + '% or more on the {unit} test.' },
    testSharp:   { tier: 'badge',  icon: '🔎', name: '{unit} Sharp Eye',       desc: 'Score 90% or more on the {unit} test.' },
    testPerfect: { tier: 'badge',  icon: '💯', name: '{unit} Perfect Score',   desc: 'Score 100% on the {unit} test.' },
    persistence: { tier: 'badge',  icon: '🔁', name: '{unit} Never Give Up',   desc: 'Pass the {unit} test after an earlier attempt that did not pass.' },
    /* ---- games & points ---- */
    games3:      { tier: 'badge',  icon: '🎮', name: '{unit} Game Explorer',   desc: 'Finish 3 different games in {unit}.' },
    jeopardy1k:  { tier: 'badge',  icon: '📺', name: '{unit} Big Board',       desc: 'Score 1,000 points or more in one Jeopardy game in {unit}.' },
    jeopardy2k:  { tier: 'badge',  icon: '🏟️', name: '{unit} Daily Double',    desc: 'Score 2,000 points or more in one Jeopardy game in {unit}.' },
    millionaire: { tier: 'badge',  icon: '💰', name: '{unit} Millionaire',     desc: 'Reach the top of the Millionaire ladder in {unit}.' },
    wheel1k:     { tier: 'badge',  icon: '🎡', name: '{unit} Big Spinner',     desc: 'Bank $1,000 or more in one Wheel of Fortune game in {unit}.' },
    cleanMatch:  { tier: 'badge',  icon: '🔗', name: '{unit} Clean Sweep',     desc: 'Finish Matching in {unit} with no mistakes.' },
    allGames:    { tier: 'medal',  icon: '🎖️', name: '{unit} Game Champion',   desc: 'Finish every game in {unit}.' },
    points5k:    { tier: 'medal',  icon: '💎', name: '{unit} Point Collector',  desc: 'Collect 5,000 game points in {unit} (Jeopardy + Wheel best scores).' },
    /* ---- unit medals ---- */
    unitMedal:   { tier: 'medal',  icon: '🏅', name: '{unit} Medal',           desc: 'Read every lesson, pass the test and complete 3 games in {unit}.' },
    unitGold:    { tier: 'medal',  icon: '🥇', name: '{unit} Gold',            desc: 'Lessons complete, a perfect test and every game finished in {unit}.' },
    /* ---- course trophies ---- */
    courseTrophy:{ tier: 'trophy', icon: '🏆', name: '{course} Trophy',        desc: 'Earn the medal for every unit in {course}.' },
    scholarCrown:{ tier: 'trophy', icon: '👑', name: '{course} Scholar\'s Crown', desc: 'Pass every lesson quiz in {course}.' },
    trailblazer: { tier: 'trophy', icon: '🚀', name: '{course} Trailblazer',   desc: 'Score 80% or more on every unit test in {course} — Level 4 achievement.' },
    grandMaster: { tier: 'trophy', icon: '🌟', name: '{course} Grand Master',  desc: 'Earn Gold in every unit of {course}.' }
  };
  const UNIT_KEYS = ['study', 'firstQuiz', 'quizzes', 'firstTry', 'scribe', 'lessons', 'testPass', 'testSharp', 'testPerfect', 'persistence',
                     'games3', 'jeopardy1k', 'jeopardy2k', 'millionaire', 'wheel1k', 'cleanMatch', 'allGames', 'points5k', 'unitMedal', 'unitGold'];
  const COURSE_KEYS = ['courseTrophy', 'scholarCrown', 'trailblazer', 'grandMaster'];

  function fill(str, course, unit) {
    return String(str).replace(/\{unit\}/g, unit ? unit.title : '').replace(/\{course\}/g, course.title);
  }
  function theme(course, key) {
    return Object.assign({}, DEFAULT_THEME[key], (course.awards || {})[key] || {});
  }

  /** Facts about a unit's progress used by the conditions (and the lesson checklist). */
  function unitFacts(course, unit) {
    const u = Progress.unit(course.id, unit.id);
    const lessons = LH.lessonsFor(unit);
    const finishedGames = Object.keys(u.games).filter(k => u.games[k]).length;
    const total = (window.Games ? Games.available(course, unit) : []).length;
    const quiz = u.quiz || {}, work = u.work || {};
    const lessonInfo = lessons.map(les => {
      const slides = LH.slidesFor(les), seen = Math.min(slides.length, (u.slides[les._idx] || []).length);
      const hasQuiz = LH.lessonQuestions(unit, les._idx).length > 0;
      const q = quiz[les._idx];
      const as = LH.assignmentsFor(les), w = work[les._idx] || {};
      const handed = as.filter(a => w[a._idx] && w[a._idx].done).length;
      return { read: slides.length > 0 && seen >= slides.length, hasQuiz, quizPassed: !!(q && q.passed), firstTry: !!(q && q.passed && q.attempts === 1 && q.best >= PASS_MARK), assignments: as.length, handed };
    });
    const quizLessons = lessonInfo.filter(l => l.hasQuiz);
    const assignLessons = lessonInfo.filter(l => l.assignments > 0);
    const gs = u.gameScores || {};
    return {
      u, lessons: lessonInfo, finishedGames, totalGames: total,
      allRead: lessonInfo.length > 0 && lessonInfo.every(l => l.read),
      anyQuiz: quizLessons.some(l => l.quizPassed),
      allQuizzes: quizLessons.length > 0 && quizLessons.every(l => l.quizPassed),
      firstTries: lessonInfo.filter(l => l.firstTry).length,
      allHanded: assignLessons.length > 0 && assignLessons.every(l => l.handed >= l.assignments),
      allLessons: lessonInfo.length > 0 && lessonInfo.every(l => l.read && (!l.hasQuiz || l.quizPassed) && l.handed >= l.assignments),
      points: (gs.jeopardy || 0) + (gs.wheel || 0),
      gs
    };
  }

  function conditions(course, unit) {
    const f = unitFacts(course, unit), u = f.u;
    const g3 = f.finishedGames >= Math.min(3, f.totalGames || 3);
    return {
      study: !!u.studyComplete || f.allRead,
      firstQuiz: f.anyQuiz,
      quizzes: f.allQuizzes,
      firstTry: f.firstTries >= 3,
      scribe: f.allHanded,
      lessons: f.allLessons,
      testPass: !!u.testPassed,
      testSharp: (u.testBest || 0) >= 90,
      testPerfect: !!u.testPerfect,
      persistence: !!u.testPassed && !!u.failedOnce,
      games3: g3,
      jeopardy1k: (f.gs.jeopardy || 0) >= 1000,
      jeopardy2k: (f.gs.jeopardy || 0) >= 2000,
      millionaire: !!u.millionaireWon,
      wheel1k: (f.gs.wheel || 0) >= 1000,
      cleanMatch: !!u.cleanMatch,
      allGames: f.totalGames > 0 && f.finishedGames >= f.totalGames,
      points5k: f.points >= 5000,
      unitMedal: (!!u.studyComplete || f.allRead) && !!u.testPassed && g3,
      unitGold: f.allLessons && !!u.testPerfect && f.totalGames > 0 && f.finishedGames >= f.totalGames
    };
  }

  /** All awards for a course, with earned state. */
  function listForCourse(course) {
    const out = [];
    LH.unitsFor(course).forEach(unit => {
      const u = Progress.unit(course.id, unit.id);
      UNIT_KEYS.forEach(key => {
        const t = theme(course, key);
        const id = key + ':' + unit.id;
        out.push({ id, key, tier: t.tier, icon: t.icon, name: fill(t.name, course, unit), desc: fill(t.desc, course, unit), unit, earnedAt: u.earned[id] || null });
      });
    });
    const cp = Progress.course(course.id);
    COURSE_KEYS.forEach(key => {
      const t = theme(course, key);
      out.push({ id: key, key, tier: t.tier, icon: t.icon, name: fill(t.name, course), desc: fill(t.desc, course), unit: null, earnedAt: (cp.__earned && cp.__earned[key]) || null });
    });
    return out;
  }

  /** Re-check conditions for a unit (and the course) and award anything new. Returns newly earned awards. */
  function evaluate(course, unit) {
    const fresh = [];
    const u = Progress.unit(course.id, unit.id);
    const cond = conditions(course, unit);
    Object.keys(cond).forEach(key => {
      const id = key + ':' + unit.id;
      if (cond[key] && !u.earned[id]) {
        u.earned[id] = new Date().toISOString();
        const t = theme(course, key);
        fresh.push({ id, tier: t.tier, icon: t.icon, name: fill(t.name, course, unit) });
      }
    });
    // course trophies
    const cp = Progress.course(course.id);
    cp.__earned = cp.__earned || {};
    const units = LH.unitsFor(course);
    const every = (fn) => units.length > 0 && units.every(un => fn(Progress.unit(course.id, un.id), un));
    const courseCond = {
      courseTrophy: every((p, un) => p.earned['unitMedal:' + un.id]),
      scholarCrown: every((p, un) => p.earned['quizzes:' + un.id]),
      trailblazer: every(p => (p.testBest || 0) >= 80),
      grandMaster: every((p, un) => p.earned['unitGold:' + un.id])
    };
    Object.keys(courseCond).forEach(key => {
      if (courseCond[key] && !cp.__earned[key]) {
        cp.__earned[key] = new Date().toISOString();
        const t = theme(course, key);
        fresh.push({ id: key, tier: t.tier, icon: t.icon, name: fill(t.name, course) });
      }
    });
    Progress.save();
    fresh.forEach(a => toast(a));
    return fresh;
  }

  function toast(award) {
    const host = document.getElementById('toasts');
    if (!host) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<div class="t-icon">' + award.icon + '</div><div><div class="t-title">' +
      ({ badge: 'Badge earned', medal: 'Medal earned', trophy: 'Trophy earned' }[award.tier] || 'Award earned') +
      '</div><div class="t-name">' + award.name + '</div></div>';
    host.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }

  /** Summary numbers for a course (for cards and the Display Case). */
  function summary(course) {
    const all = listForCourse(course);
    const earned = all.filter(a => a.earnedAt);
    const count = tier => earned.filter(a => a.tier === tier).length;
    return { total: all.length, earned: earned.length, badges: count('badge'), medals: count('medal'), trophies: count('trophy') };
  }

  /** Awards for the quick row under a unit on the course page (the core six). */
  function unitRow(course, unit) {
    const core = ['study', 'quizzes', 'scribe', 'testPass', 'games3', 'unitMedal'];
    return listForCourse(course).filter(a => a.unit && a.unit.id === unit.id && core.includes(a.key));
  }

  window.Badges = { PASS_MARK, listForCourse, evaluate, summary, unitRow, unitFacts, UNIT_KEYS, COURSE_KEYS };
})();
