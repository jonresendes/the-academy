// node check_course.js eng3u.js  — validates an Academy course file
const fs = require('fs'), vm = require('vm');
const file = process.argv[2]; const ctx = { window: {} }; ctx.window.window = ctx.window;
vm.runInNewContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
const LH = ctx.window.LearnHub; let errors = 0, warns = 0;
const err = m => { errors++; console.log('ERROR ' + m); }, warn = m => { warns++; console.log('warn  ' + m); };
function res(v, L) { if (v == null) return v; if (typeof v !== 'object' || Array.isArray(v)) return v;
  for (let l = L; l >= 1; l--) if (v[l] != null) return v[l]; for (let l = L; l <= 4; l++) if (v[l] != null) return v[l]; return undefined; }
const vis = (x, L) => !x.levels || x.levels.includes(L);
for (const c of LH.courses) {
  let tot = { lessons: 0, slides: 0, terms: 0, q: 0, q4: 0, asg: 0 };
  if (!/^[A-Z0-9/]+ - /.test(c.title)) err('course title must be "CODE - description"');
  console.log(`\n${c.title} (${c.id})`);
  for (const u of c.units) {
    const where = `${u.id}`; let uq4 = 0, uasg = 0;
    for (let L = 1; L <= 4; L++) if (!res(u.description, L)) err(`${where} description L${L}`);
    const cats = new Set();
    u.lessons.forEach((les, i) => {
      const w = `${where} L${i + 1}`;
      if (les.slides.length !== 5) err(`${w} has ${les.slides.length} slides`);
      if (!/Write this down/.test(les.slides[3].title)) err(`${w} slide 3 is not the record`);
      if (!/Try it/.test(les.slides[4].title)) err(`${w} slide 4 is not Try it`);
      les.slides.forEach((s, k) => { for (let L = 1; L <= 4; L++) { const b = res(s.body, L); if (!b || b.length < 40) err(`${w} slide ${k} L${L} empty`); if (/undefined|\[object/.test(b)) err(`${w} slide ${k} L${L} has undefined`);
        if (L === 1 && b.split(/\s+/).length > 190) warn(`${w} slide ${k} L1 is long (${b.split(/\s+/).length} words)`); } });
      if (!les.cats || les.cats.length !== 1) err(`${w} cats`); const cat = les.cats[0];
      if (cats.has(cat)) err(`${w} duplicate cat ${cat}`); cats.add(cat);
      if (cat.replace(/^L\d+ /, '').length > 32) err(`${w} cat too long`);
      const qs = u.questions.filter(q => q.cat === cat);
      const need = { 1: 4, 2: 6, 3: 8, 4: 10 };
      for (let L = 1; L <= 4; L++) { const n = qs.filter(q => q.type !== 'match' && vis(q, L)).length; if (n < need[L]) err(`${w} only ${n} quiz questions at L${L}`); }
      const l4 = qs.filter(q => q.levels && q.levels.length === 1 && q.levels[0] === 4).length; if (l4 < 3) err(`${w} only ${l4} L4-only questions`); uq4 += l4;
      if (qs.filter(q => q.type === 'match').length !== 1) err(`${w} match count`);
      if (!les.assignments || les.assignments.length < 2) err(`${w} needs 2 assignments`);
      else { if (!/My record/.test(les.assignments[0].title)) err(`${w} first assignment is not the record`);
        les.assignments.forEach(a => { for (let L = 1; L <= 4; L++) for (const k of ['prompt', 'starter', 'success']) if (!res(a[k], L)) err(`${w} assignment "${a.title}" ${k} L${L}`); if (!a.expectations) err(`${w} assignment expectations`); }); uasg += les.assignments.length; }
      (les.media || []).forEach(m => { if (m.slide > 4 || !m.type || !m.title || !/^https:\/\//.test(m.url)) err(`${w} media slot`); });
      if ((les.media || []).length < 2) warn(`${w} has ${(les.media || []).length} media slots`);
      tot.slides += les.slides.length;
    });
    const prompts = new Set();
    u.questions.forEach(q => {
      const id = `${where} [${q.cat}] ${JSON.stringify(res(q.prompt, 2)).slice(0, 60)}`;
      if (!cats.has(q.cat)) err(`${id} unknown cat`);
      const key = JSON.stringify(q.prompt) + (q.levels || ''); if (prompts.has(key)) err(`${id} duplicate prompt`); prompts.add(key);
      if (q.type === 'mc') for (let L = 1; L <= 4; L++) { if (!vis(q, L)) continue; const o = res(q.options, L);
        if (!o || o.length < 2) err(`${id} options L${L}`); else { if (!o.includes(q.answer)) err(`${id} answer missing L${L}`); if (new Set(o).size !== o.length) err(`${id} duplicate options L${L}`); if (o.some(x => !x)) err(`${id} empty option L${L}`); } }
      else if (q.type === 'tf') { if (typeof q.answer !== 'boolean') err(`${id} tf answer`); }
      else if (q.type === 'fill') { if (!/___/.test(q.prompt)) err(`${id} no blank`); if (!q.bank.includes(q.answer)) err(`${id} answer not in bank`); if (new Set(q.bank).size !== q.bank.length) err(`${id} dup bank`); if (/\s/.test(q.answer.trim()) ) warn(`${id} multi-word fill answer`); }
      else if (q.type === 'match') { if (q.pairs.length < 4) err(`${id} match pairs`); if (new Set(q.pairs.map(p => p[1])).size !== q.pairs.length) err(`${id} dup defs`); }
      else err(`${id} type`);
    });
    const pool = { 1: 5, 2: 8, 3: 12, 4: 15 };
    for (let L = 1; L <= 4; L++) { const n = u.questions.filter(q => q.type !== 'match' && vis(q, L)).length; if (n < pool[L]) err(`${where} test pool L${L} = ${n}`); }
    if (u.terms.length < 10) err(`${where} only ${u.terms.length} terms`);
    u.terms.forEach(t => { for (let L = 1; L <= 4; L++) if (!res(t.def, L)) err(`${where} term ${t.term}`); });
    const pics = (LH.colouring || {})[`${c.id}/${u.id}`];
    if (!pics || !pics.length) err(`${where} no colouring picture`); else pics.forEach(p => { const n = (p.svg.match(/class="region"/g) || []).length; if (n < 8) err(`${where} colouring has ${n} regions`); });
    console.log(`  ${u.title}: ${u.lessons.length} lessons, ${u.lessons.length * 5} slides, ${u.terms.length} terms, ${u.questions.length} questions (${uq4} L4-only), ${uasg} assignments`);
    tot.lessons += u.lessons.length; tot.terms += u.terms.length; tot.q += u.questions.length; tot.q4 += uq4; tot.asg += uasg;
  }
  console.log(`  TOTAL: ${tot.lessons} lessons, ${tot.slides} slides, ${tot.terms} terms, ${tot.q} questions (${tot.q4} L4-only), ${tot.asg} assignments`);
}
console.log(`\n${errors} errors, ${warns} warnings`); process.exit(errors ? 1 : 0);
