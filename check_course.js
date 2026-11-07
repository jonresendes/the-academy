// Validates a Learn Hub course file. Usage: node check_course.js snc1l2l.js
const fs = require('fs');
const file = process.argv[2];
global.window = {};
new Function('window', fs.readFileSync(file, 'utf8'))(global.window);
const course = window.LearnHub.courses[0];
const errs = [], warn = [];
const at = (v, l) => { if (v == null || typeof v !== 'object' || Array.isArray(v)) return v; const ks = Object.keys(v).map(Number).sort((a, b) => a - b); if (v[l] != null) return v[l]; const lower = ks.filter(k => k < l).pop(); if (lower != null) return v[lower]; return v[ks[0]]; };
const has = (q, l) => !q.levels || q.levels.includes(l);
console.log(`Course ${course.id} · ${course.title} · ${course.units.length} unit(s)`);
for (const u of course.units) {
  console.log(`\nUnit ${u.id}: ${u.lessons.length} lessons, ${u.terms.length} terms, ${u.questions.length} questions`);
  u.lessons.forEach((les, i) => {
    const n = i + 1;
    const cat = `L${n} `;
    const qs = u.questions.filter(q => (q.cat || '').startsWith(cat));
    const nonMatch = qs.filter(q => q.type !== 'match');
    const l4 = qs.filter(q => q.levels && q.levels.length === 1 && q.levels[0] === 4);
    for (const l of [1, 2, 3, 4]) {
      const avail = nonMatch.filter(q => has(q, l)).length;
      const need = [4, 6, 8, 10][l - 1];
      if (avail < need) errs.push(`${u.id} L${n}: only ${avail} non-match questions at level ${l}, quiz needs ${need}`);
    }
    if (l4.length < 3) errs.push(`${u.id} L${n}: ${l4.length} Level-4-only application questions (need ≥ 3)`);
    if (!les.assignments || les.assignments.length < 2) errs.push(`${u.id} L${n}: ${les.assignments ? les.assignments.length : 0} assignments (need 2)`);
    if (!les.slides || les.slides.length < 4) errs.push(`${u.id} L${n}: ${les.slides ? les.slides.length : 0} slides`);
    (les.slides || []).forEach((s, si) => { for (const l of [1, 2, 3, 4]) { const b = at(s.body, l); if (!b || typeof b !== 'string') errs.push(`${u.id} L${n} slide ${si}: no body at level ${l}`); } });
    (les.assignments || []).forEach((a, ai) => { for (const k of ['prompt', 'starter', 'success']) for (const l of [1, 2, 3, 4]) if (!at(a[k], l)) errs.push(`${u.id} L${n} assignment ${ai}: ${k} missing at level ${l}`); if (!a.expectations) warn.push(`${u.id} L${n} assignment ${ai}: no expectations code`); });
    console.log(`  L${n} ${les.title}: ${les.slides.length} slides, ${qs.length} q (${l4.length} L4-only), ${les.assignments.length} assignments`);
  });
  u.questions.forEach((q, qi) => {
    const id = `${u.id} q${qi} [${q.cat}] "${(q.prompt || '').slice(0, 40)}"`;
    if (q.type === 'mc') {
      for (const l of [1, 2, 3, 4]) { if (!has(q, l)) continue; const o = at(q.options, l); if (!Array.isArray(o)) { errs.push(`${id}: options not a list at level ${l}`); continue; } if (!o.includes(q.answer)) errs.push(`${id}: answer not in options at level ${l}`); if (new Set(o).size !== o.length) errs.push(`${id}: duplicate options at level ${l}`); if (o.length < 2) errs.push(`${id}: < 2 options at level ${l}`); }
    } else if (q.type === 'fill') {
      if (!q.prompt.includes('___')) errs.push(`${id}: fill prompt has no ___`);
      if (!q.bank || !q.bank.includes(q.answer)) errs.push(`${id}: fill answer not in bank`);
    } else if (q.type === 'tf') {
      if (typeof q.answer !== 'boolean') errs.push(`${id}: tf answer not boolean`);
    } else if (q.type === 'match') {
      if (!q.pairs || q.pairs.length < 3) errs.push(`${id}: match needs ≥ 3 pairs`);
    } else errs.push(`${id}: unknown type ${q.type}`);
    if (!q.cat && q.type !== 'match') warn.push(`${id}: no cat`);
  });
  const cats = {}; u.questions.forEach(q => { if (q.cat && q.type !== 'match') cats[q.cat] = (cats[q.cat] || 0) + 1; });
  const big = Object.values(cats).filter(c => c >= 4).length;
  if (big < 5) warn.push(`${u.id}: only ${big} categories with ≥ 4 questions (4×5 Jeopardy wants 5)`);
  const test3 = u.questions.filter(q => q.type !== 'match' && has(q, 3)).length;
  if (test3 < 12) errs.push(`${u.id}: ${test3} questions for a Level 3 unit test (need ≥ 12)`);
  for (const l of [1, 2, 3]) { const t = u.terms.filter(t => has(t, l)).length; if (t < 10) errs.push(`${u.id}: ${t} terms at level ${l} (Matching wants ≥ 10)`); u.terms.forEach(t => { if (has(t, l) && !at(t.def, l)) errs.push(`${u.id} term ${t.term}: no def at level ${l}`); }); }
  const dup = u.terms.map(t => t.term).filter((t, i, a) => a.indexOf(t) !== i); if (dup.length) errs.push(`${u.id}: duplicate terms ${dup}`);
  const pic = (window.LearnHub.colouring || {})[`${course.id}/${u.id}`]; if (!pic || !pic.length) warn.push(`${u.id}: no colouring picture`); else if (!/class="region"/.test(pic[0].svg)) errs.push(`${u.id}: colouring svg has no region shapes`);
}
console.log(`\n${errs.length} error(s), ${warn.length} warning(s)`);
errs.forEach(e => console.log('  ERROR ' + e)); warn.forEach(w => console.log('  warn  ' + w));
process.exit(errs.length ? 1 : 0);
