// check_course.js — run: node check_course.js glc2o.js
const fs = require('fs'), path = require('path');
global.window = {};
eval(fs.readFileSync(path.resolve(process.argv[2] || 'glc2o.js'), 'utf8'));
const LH = window.LearnHub; let err = 0, warn = 0;
const E = m => { err++; console.log('ERROR', m); }, W = m => { warn++; console.log('warn ', m); };
function at(v, lvl) { // nearest lower level, then nearest higher
  if (v === null || typeof v !== 'object' || Array.isArray(v)) return v;
  for (let l = lvl; l >= 1; l--) if (v[l] !== undefined) return v[l];
  for (let l = lvl + 1; l <= 4; l++) if (v[l] !== undefined) return v[l];
}
const vis = (x, lvl) => !x.levels || x.levels.includes(lvl);
const NEED = { 1: 4, 2: 6, 3: 8, 4: 10 }, TEST = { 1: 5, 2: 8, 3: 12, 4: 15 };
for (const c of LH.courses) {
  if (!/^[A-Z0-9/]+ - /.test(c.title)) E('course title format: ' + c.title);
  let tl = 0, ts = 0, tt = 0, tq = 0, ta = 0;
  for (const u of c.units) {
    const cats = new Set();
    u.lessons.forEach((l, i) => {
      const n = i + 1, tag = `${u.id} L${n}`; tl++;
      if (l.slides.length !== 5) E(tag + ' slide count ' + l.slides.length);
      l.slides.forEach((s, j) => { ts++; for (let v = 1; v <= 4; v++) { const b = at(s.body, v); if (!b || b.length < 20) E(`${tag} slide ${j} empty at L${v}`); if (/undefined|\$\{/.test(b)) E(`${tag} slide ${j} bad text L${v}`); } 
        if (at(s.body,1).length > at(s.body,2).length) W(`${tag} slide ${j}: L1 longer than L2`); });
      if (!/Write this down/.test(l.slides[3].title)) E(tag + ' slide 3 is not the record slide');
      if (!/^Try it/.test(l.slides[4].title)) E(tag + ' slide 4 is not the Try it slide');
      if (!l.cats || l.cats.length !== 1) E(tag + ' cats');
      const cat = l.cats[0]; if (cats.has(cat)) E(tag + ' duplicate cat'); cats.add(cat);
      if (!cat.startsWith('L' + n + ' ')) E(tag + ' cat prefix ' + cat);
      if (cat.length - ('L' + n + ' ').length > 32) E(tag + ' cat too long');
      const qs = u.questions.filter(q => q.cat === cat);
      for (let v = 1; v <= 4; v++) { const k = qs.filter(q => q.type !== 'match' && vis(q, v)).length; if (k < NEED[v]) E(`${tag} only ${k} quiz questions at L${v}`); }
      if (qs.filter(q => q.levels && q.levels.length === 1 && q.levels[0] === 4).length < 3) E(tag + ' fewer than 3 L4-only questions');
      if (qs.filter(q => q.type === 'match').length !== 1) E(tag + ' needs one match question');
      if (l.assignments.length < 2) E(tag + ' fewer than 2 assignments');
      l.assignments.forEach(a => { ta++; ['prompt', 'starter', 'success'].forEach(f => { for (let v = 1; v <= 4; v++) if (!at(a[f], v)) E(`${tag} assignment "${a.title}" ${f} L${v}`); }); if (!a.expectations) E(tag + ' assignment expectations'); });
      if (!/My record/.test(l.assignments[0].title)) E(tag + ' first assignment is not the record');
      if ((l.media || []).length !== 2) W(tag + ' media slots: ' + (l.media || []).length);
      (l.media || []).forEach(m => { if (m.slide < 0 || m.slide > 4) E(tag + ' media slide index'); });
    });
    const prompts = new Set();
    u.questions.forEach(q => { tq++;
      if (!cats.has(q.cat)) E(`${u.id} question with unknown cat ${q.cat}`);
      const key = q.type + '|' + JSON.stringify(q.prompt) + '|' + (q.levels || ''); if (prompts.has(key)) W(`${u.id} duplicate prompt: ${String(q.prompt).slice(0, 60)}`); prompts.add(key);
      if (q.type === 'mc') for (let v = 1; v <= 4; v++) { if (!vis(q, v)) continue; const o = at(q.options, v); if (!Array.isArray(o) || !o.includes(q.answer)) E(`${u.id} MC answer missing L${v}: ${q.prompt.slice(0, 50)}`); if (new Set(o).size !== o.length) E(`${u.id} MC duplicate options: ${q.prompt.slice(0, 50)}`); if (o.length < 2) E('MC too few options'); if (o.some(x => !x)) E(`${u.id} MC empty option: ${q.prompt.slice(0, 50)}`); }
      if (q.type === 'fill') { if (!q.prompt.includes('___')) E(`${u.id} fill without blank: ${q.prompt}`); if (!q.bank.includes(q.answer)) E('fill bank'); if (new Set(q.bank).size !== q.bank.length) E(`${u.id} fill duplicate bank: ${q.prompt}`); }
      if (q.type === 'tf' && typeof q.answer !== 'boolean') E('tf answer');
      if (q.type === 'match') q.pairs.forEach(p => { if (!p[0] || !p[1]) E('match pair'); });
    });
    for (let v = 1; v <= 4; v++) { const k = u.questions.filter(q => q.type !== 'match' && vis(q, v)).length; if (k < TEST[v]) E(`${u.id} test pool ${k} at L${v}`); }
    if (u.terms.length < 10) E(u.id + ' fewer than 10 terms');
    const tset = new Set(); u.terms.forEach(t => { tt++; if (tset.has(t.term)) E('dup term ' + t.term); tset.add(t.term); for (let v = 1; v <= 4; v++) if (!at(t.def, v)) E('term def ' + t.term); if (at(t.def, 1).toLowerCase().includes(t.term.toLowerCase()) && t.term.length > 4) W(`${u.id} term "${t.term}" appears in its own L1 definition`); });
    const pics = (LH.colouring || {})[c.id + '/' + u.id]; if (!pics || !pics.length) E(u.id + ' no colouring picture'); else pics.forEach(p => { if ((p.svg.match(/class="region"/g) || []).length < 8) E(u.id + ' colouring regions'); });
    console.log(`${u.title}: ${u.lessons.length} lessons, ${u.lessons.length * 5} slides, ${u.terms.length} terms, ${u.questions.length} questions (${u.questions.filter(q => q.levels && q.levels[0] === 4 && q.levels.length === 1).length} L4-only), ${u.lessons.reduce((s, l) => s + l.assignments.length, 0)} assignments`);
  }
  console.log(`${c.title}: ${c.units.length} units, ${tl} lessons, ${ts} slides, ${tt} terms, ${tq} questions, ${ta} assignments`);
}
console.log(`${err} errors, ${warn} warnings`); process.exit(err ? 1 : 0);
