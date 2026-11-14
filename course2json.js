#!/usr/bin/env node
/* course2json.js — convert a repo-style course file (window.LearnHub.courses.push({ … })) into the JSON envelope
   that The Academy's Headmaster can upload in Courses → Load a course from a file.

     node course2json.js eng3u.js              → writes eng3u.json next to it
     node course2json.js eng3u.js out.json     → writes out.json

   The .js file is run here, on your own machine, inside Node's vm with nothing but a fake window — the app itself
   never runs code from a file. Run check_course.js on the .js first if you want the full authoring checks. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const [,, input, output] = process.argv;
if (!input) { console.error('usage: node course2json.js <course.js> [out.json]'); process.exit(1); }
const ctx = { window: {} }; ctx.window.window = ctx.window; ctx.self = ctx.window;
vm.runInNewContext(fs.readFileSync(input, 'utf8'), ctx, { filename: input, timeout: 10000 });
const courses = (ctx.window.LearnHub && ctx.window.LearnHub.courses) || [];
if (!courses.length) { console.error('The file did not add a course (it should call window.LearnHub.courses.push({ … })).'); process.exit(1); }
if (courses.length > 1) console.warn('note: the file holds ' + courses.length + ' courses; writing one envelope per course');
const codeOf = c => { const m = String(c.title || c.id || '').toUpperCase().match(/^([A-Z]{3}[1-4][A-Z0-9](?:\/[A-Z0-9]{1,5})?)\b/); return m ? m[1] : String(c.id || '').toUpperCase(); };
courses.forEach((c, i) => {
  const env = { format: 'academy-course/1', type: 'course', code: codeOf(c), build: new Date().toISOString().slice(0, 10), course: JSON.parse(JSON.stringify(c)) };   // JSON round-trip drops any functions
  const out = output && courses.length === 1 ? output : (output ? output.replace(/\.json$/i, '') + '-' + (i + 1) + '.json' : path.join(path.dirname(input), path.basename(input).replace(/\.js$/i, '') + (courses.length > 1 ? '-' + (i + 1) : '') + '.json'));
  fs.writeFileSync(out, JSON.stringify(env));
  const u = env.course.units || [];
  console.log('wrote ' + out + '  (' + env.code + ' · ' + u.length + ' units · ' + u.reduce((n, x) => n + (x.lessons || []).length, 0) + ' lessons · ' + Math.round(fs.statSync(out).size / 1024) + ' kB)');
});
