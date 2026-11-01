/* =========================================================
   badges.js — achievement engine
   Every course supplies an `awards` theme (see courses/*.js).
   Awards are generated per unit from that theme, plus one
   course trophy. Tiers: badge → medal → trophy.
   ========================================================= */
(function () {
  const PASS_MARK = 70;

  // Default theme used for any key a course doesn't define.
  const DEFAULT_THEME = {
    study:       { tier: 'badge',  icon: '📖', name: '{unit} Reader',        desc: 'Read every slide in the {unit} Study Room.' },
    testPass:    { tier: 'badge',  icon: '✅', name: '{unit} Pass',          desc: 'Score ' + PASS_MARK + '% or more on the {unit} test.' },
    testPerfect: { tier: 'badge',  icon: '💯', name: '{unit} Perfect Score', desc: 'Score 100% on the {unit} test.' },
    games3:      { tier: 'badge',  icon: '🎮', name: '{unit} Game Explorer', desc: 'Finish 3 different games in {unit}.' },
    allGames:    { tier: 'medal',  icon: '🎖️', name: '{unit} Game Champion', desc: 'Finish every game in {unit}.' },
    unitMedal:   { tier: 'medal',  icon: '🏅', name: '{unit} Medal',         desc: 'Finish the Study Room, pass the test and complete 3 games in {unit}.' },
    courseTrophy:{ tier: 'trophy', icon: '🏆', name: '{course} Trophy',      desc: 'Earn the medal for every unit in {course}.' }
  };

  function fill(str, course, unit) {
    return String(str).replace(/\{unit\}/g, unit ? unit.title : '').replace(/\{course\}/g, course.title);
  }

  function theme(course, key) {
    return Object.assign({}, DEFAULT_THEME[key], (course.awards || {})[key] || {});
  }

  /** All awards for a course, with earned state. */
  function listForCourse(course) {
    const out = [];
    const keys = ['study', 'testPass', 'testPerfect', 'games3', 'allGames', 'unitMedal'];
    LH.unitsFor(course).forEach(unit => {
      const u = Progress.unit(course.id, unit.id);
      keys.forEach(key => {
        const t = theme(course, key);
        const id = key + ':' + unit.id;
        out.push({ id, key, tier: t.tier, icon: t.icon, name: fill(t.name, course, unit), desc: fill(t.desc, course, unit),
                   unit, earnedAt: u.earned[id] || null });
      });
    });
    const t = theme(course, 'courseTrophy');
    const cp = Progress.course(course.id);
    out.push({ id: 'courseTrophy', key: 'courseTrophy', tier: t.tier, icon: t.icon, name: fill(t.name, course), desc: fill(t.desc, course),
               unit: null, earnedAt: (cp.__earned && cp.__earned.courseTrophy) || null });
    return out;
  }

  function gameCount(course, unit) {
    // games available for this unit (games.js decides what a unit can run)
    return (window.Games ? Games.available(course, unit) : []).length;
  }

  /** Re-check conditions for a unit and award anything new. Returns newly earned awards. */
  function evaluate(course, unit) {
    const u = Progress.unit(course.id, unit.id);
    const finishedGames = Object.keys(u.games).filter(k => u.games[k]).length;
    const total = gameCount(course, unit);
    const conditions = {
      study: !!u.studyComplete,
      testPass: !!u.testPassed,
      testPerfect: !!u.testPerfect,
      games3: finishedGames >= Math.min(3, total || 3),
      allGames: total > 0 && finishedGames >= total,
      unitMedal: !!u.studyComplete && !!u.testPassed && finishedGames >= Math.min(3, total || 3)
    };
    const fresh = [];
    Object.keys(conditions).forEach(key => {
      const id = key + ':' + unit.id;
      if (conditions[key] && !u.earned[id]) {
        u.earned[id] = new Date().toISOString();
        const t = theme(course, key);
        fresh.push({ id, tier: t.tier, icon: t.icon, name: fill(t.name, course, unit) });
      }
    });
    // Course trophy: every unit has its medal
    const cp = Progress.course(course.id);
    cp.__earned = cp.__earned || {};
    const allMedals = LH.unitsFor(course).every(un => Progress.unit(course.id, un.id).earned['unitMedal:' + un.id]);
    if (allMedals && !cp.__earned.courseTrophy) {
      cp.__earned.courseTrophy = new Date().toISOString();
      const t = theme(course, 'courseTrophy');
      fresh.push({ id: 'courseTrophy', tier: t.tier, icon: t.icon, name: fill(t.name, course) });
    }
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

  /** Icons for the quick row under a unit on the course page. */
  function unitRow(course, unit) {
    return listForCourse(course).filter(a => a.unit && a.unit.id === unit.id);
  }

  window.Badges = { PASS_MARK, listForCourse, evaluate, summary, unitRow };
})();
