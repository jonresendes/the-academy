# The Academy · Learn Hub

A static learning environment for any number of courses. Each unit is a list of **Lessons** — each lesson has slides, a quiz and assignments — plus a **unit test** and a **Game Room** (7 games), and every achievement lands in **The Display Case**. Everything is plain HTML/CSS/JS — no build step, no server — so it deploys straight to GitHub Pages.

All files live side by side in the repository root (no folders), so you can upload them straight to GitHub:

```
index.html      app shell — add one <script> line per course here
styles.css      palette + every component (change colours in :root)
storage.js      settings, progress and Focus Plan (localStorage)
util.js         level-aware content helpers
badges.js       award engine (badge → medal → trophy)
games.js        the 7 games
print.js        printable lessons, quizzes, tests and assignments (with answer key)
app.js          router + pages
english.js      sample course — copy this to start a new one
science.js
olc4o.js        OLC4O Literacy — Unit 1 · Reading Like a Detective (Lessons 1–7)
colouring.js    line-art pictures for the Colouring Page
media-guide-<course>.html   checklist of suggested images/videos per lesson (generated)
pwa.js          install button, update notice, phone back button
sw.js           service worker (offline cache) — bump VERSION on every deploy
manifest.json   app name, colours and icons for installing
icon-192.png / icon-512.png   app icons (the "A" badge)
logo.png        header logo
README.md
```

## Deploy on GitHub Pages

1. Create a repository and upload all the files into its root (GitHub → Add file → Upload files).
2. Repository **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. Your app is live at `https://<user>.github.io/<repo>/`.

You can also just open `index.html` locally — it works from a file:// URL too.

## Installing on a phone or computer

The app is a Progressive Web App. On Android Chrome and desktop Chrome/Edge an **⬇️ Install app** button appears in the header (also available from the browser menu → *Install app* / *Add to Home screen*). On iPhone use Safari → Share → *Add to Home Screen*. Installed copies work offline.

**Settings → App** shows whether LearnHub is installed on this device, offers Install / Uninstall instructions, and — when not installed — checks that `manifest.json`, both icons and `sw.js` are actually being served (a ✕ means that file is missing from the website). The header's Install button disappears once the app is installed on the device. If you host the app at a different address, update the `related_applications` URL in `manifest.json` so the browser can report installed status.

**Updates.** `sw.js` holds a `VERSION` string. Every time you upload changed files, change that string (e.g. `learnhub-v3` → `learnhub-v4`) and upload `sw.js` too. Installed copies then show an *"A new version is ready — Update now"* notice the next time they open (they also check hourly while open). If you forget to bump it, online users still get the new files (the app is network-first) but offline copies won't refresh.

**Phone back button.** The app keeps its own history, so the phone's back button steps back through the pages you visited. On the home page, one press shows "Press back again to close"; a second press within two seconds asks *Close LearnHub?* with Keep learning / Close app.

## Students and sign-in

The app opens on a **sign-in screen**: each student taps their first name (no password). Progress, awards, Focus Plan and accessibility preferences are kept **per student** on the device. Students can add their own name unless the teacher turns that off (Teacher Lock → Sign-in screen); teachers can also add, rename, reset or remove students in **Teacher Lock → Students**. The header shows who is signed in with a *Switch* link.

For each student the teacher sets:
- **Achievement level** (default, plus a per-course override) — see below.
- **Courses** — tick the courses the student sees, and **lock the course list** so they cannot add more from the home page. With no list set, a student sees every course.

Data from the single-student version is migrated automatically into a first profile the first time the new version loads.

## Achievement levels (1–4)

Levels follow the Ontario achievement chart and are set per student inside **Settings → Teacher Lock → Students**. The level is never shown to the student (no badge, no label anywhere in the app). After every test the app records a **level suggestion** for the teacher when the score lands in a different band (e.g. "Level 3 → 4, 86% on Unit 1"); it appears in the student's row with *Apply* / *Dismiss* buttons and is never shown to the student.

| | Level 1 · Explorer (50–59%) | Level 2 · Scholar (60–69%) | Level 3 · Challenger (70–79%) | Level 4 · Trailblazer (80–100%) |
|---|---|---|---|---|
| Slides | `body[1]` text (simple words, shortened passages) | `body[2]` | `body[3]` (+ expectation codes, worked examples) | `body[4]`, or `body[3]` when a course has no Level 4 text |
| Test | 5 questions, 2 options (obvious distractor), word bank of 2 | 8 questions, 3 options, word bank of 4 | 12 questions, all options, type-in blanks | 15 questions, all options, type-in blanks |
| Matching / Memory | 3 pairs | 5 pairs | 8 pairs | 10 pairs |
| Jeopardy | 2 × 2 board | 3 × 3 | 4 × 4, wrong answers lose points | 4 × 5, wrong answers lose points |
| Wheel of Fortune | vowels pre-revealed + definition hint, 2 puzzles | hint, 3 puzzles | category only, 4 puzzles | category only, 5 puzzles |
| Millionaire | 5 rungs | 8 rungs | 10 rungs | 12 rungs |
| Game Room | "Gentle" games listed first | all | all | all |

Every test starts with a question every student can get (a true/false or short multiple choice) and questions are served **least-seen first**, so no question repeats until the student has seen every question in the unit.

Accessibility settings (per student): text size, Lexend reading font, contrast (normal / high / **inverted** — white text on black), reduced motion, read-aloud buttons (browser speech).

## Lessons, quizzes, assignments and tests

The course page lists every unit's lessons. Opening a lesson shows its parts:
- **Slides** — the lesson at the student's level, with read-aloud.
- **Quiz** — 4 / 6 / 8 / 10 questions (by level) drawn only from that lesson's question bank (questions whose `cat` starts with `L<n>`, or the categories a lesson lists in `cats: […]`). Pass mark 70%; best score is kept.
- **Assignments** — open-response tasks with a levelled prompt, a sentence starter and a "complete answer contains…" box. Work autosaves as a draft; *Hand in* marks it done. Teachers read handed-in work in Teacher Lock → Students → *Assignment work*.
- **Unit test** — covers every lesson in the unit (5 / 8 / 12 / 15 questions by level).

Every quiz and test starts with something every student can do (a true/false or short multiple choice) and builds up; questions are served least-seen first so nothing repeats until the whole bank has been used.

**Accommodations** (per student, Teacher Lock → Students): **Reduction** (about 60% as many questions), **Complexity** (answer choices and word banks from one level down, no typed blanks), **Chunking** (matching shown three pairs at a time, word banks of at most three).

**Find a lesson by keyword** sits at the top of every course page for students; the teacher version in Teacher Lock can also restrict the student to the lessons found.

## Teacher Lock

Everything a teacher or parent controls lives at the top of **Settings → 🔒 Teacher Lock**. Choose a **6-digit PIN** once; from then on the section is hidden until the PIN is entered (unlock lasts for the browser session — press **Lock now** before handing the device back). Inside:

- **Students** — levels, courses, accommodations, level suggestions, assignment work, add / rename / reset / remove.
- **Find lessons by keyword** — pick a course and unit, type a word or phrase, and every lesson in that unit whose slides mention it is listed in chronological order. *Show only these lessons to the student* turns the Focus Plan on for the signed-in student, adds the unit, and sets its lesson list to just those lessons.
- **Focus Plan** for the signed-in student (below)
- **Colouring page learning breaks** — how often a lesson card interrupts the Colouring Page (every 1 / 3 / 5 / 10 areas, off, or let the student choose).
- **Sign-in screen** — whether students may add their own name.

## Focus Plan (students working well below grade level)

The Focus Plan lets a teacher choose exactly which pieces of a course a student works toward.

- Flip the switch on, open a course and **tick the units** to include. A course with no ticked units stays fully available; a course with ticked units shows *only* those.
- Inside a ticked unit, narrow it further by tapping chips on/off:
  - **Lessons** — which lessons appear (the study badge needs only these).
  - **Words to learn** — which vocabulary terms feed Matching, Memory, Tap & Reveal, Wheel of Fortune and the generated game questions.
  - **Question topics** — which `cat` groups appear in the Test Room, Jeopardy and Millionaire (untagged questions always stay).
  - **Goals to work toward** — the checklist the student sees on the course page (e.g. read every lesson, pass the test, finish 3 games). Each goal ticks itself off when the matching award is earned.
- Leaving every chip in a group selected means "all of them".

The student sees a 🎯 banner, a smaller course and a *My goals* checklist per unit; the Display Case and course trophy count only the units in the plan. Combine with **Level 1 · Explorer** for the simplest possible experience. The plan is stored on the device (`localStorage`, key `learnhub.focus`).

## Adding a course

1. Copy `english.js` to `<your-course>.js`.
2. Change `id`, `title`, `icon`, `color`, the `awards` names and the `units`.
3. Add `<script src="<your-course>.js"></script>` to `index.html` next to the others.

That's it — the home page, Display Case and all games pick it up automatically.

### Level variants

**Any text field** (slide body, slide title, question prompt, options, bank, definition, unit description) can be a plain string or an object keyed by level:

```js
body: { 1: 'A noun is a naming word.', 2: 'A noun names a person, place, thing or idea.', 3: '…' }
```

Missing levels fall back to the nearest lower level, then the nearest higher one. So `{ 2: '…', 3: '…' }` serves Level 1 the Level 2 text. A plain string is used at all levels.

Any slide, term or question can also carry `levels: [2, 3]` to hide it from other levels. This is how you give Level 1 students fewer slides and fewer questions.

### Course shape

```js
window.LearnHub = window.LearnHub || { courses: [] };
window.LearnHub.courses.push({
  id: 'math',                       // used in URLs — letters, numbers, dashes
  title: 'Mathematics',
  subtitle: 'Numbers & Patterns',
  description: '…',
  icon: '➗',                        // any emoji
  color: '#d6336c',                 // accent used throughout this course

  awards: {                         // names per course; {unit} and {course} are filled in
    study:        { icon: '📐', name: 'Measured Mind: {unit}', desc: '…' },   // badge
    testPass:     { icon: '✅', name: 'Problem Solver: {unit}', desc: '…' },  // badge
    testPerfect:  { icon: '💯', name: 'Flawless: {unit}', desc: '…' },        // badge
    games3:       { icon: '🎲', name: 'Game Theorist: {unit}', desc: '…' },   // badge
    allGames:     { icon: '🎖️', name: 'Grand Master: {unit}', desc: '…' },   // medal
    unitMedal:    { icon: '🏅', name: 'Medal of Numbers: {unit}', desc: '…' },// medal
    courseTrophy: { icon: '🏆', name: 'Fields Medallist', desc: '…' }         // trophy
  },

  units: [
    {
      id: 'fractions',
      title: 'Fractions',
      description: { 1: '…', 2: '…', 3: '…' },
      lessons: [
        { title: 'What is a fraction?',
          cats: ['Basics'],                              // optional: question categories that form this lesson's quiz
          assignments: [                                 // optional: open-response tasks (levelled)
            { title: 'Fractions at home', prompt: { 1: '…', 2: '…', 3: '…', 4: '…' }, starter: { 1: 'I found …' }, success: { 1: '…', 2: '…', 3: '…', 4: '…' }, expectations: 'B1.1' }
          ],
          slides: [
            { title: 'Parts of a whole', visual: '🍕', body: { 1: '…', 2: '…', 3: '…' } },
            { title: 'Numerator & denominator', body: '…', levels: [2, 3] }
          ] }
      ],
      terms: [                                          // vocabulary → Matching, Memory, Tap & Reveal, Wheel
        { term: 'numerator', def: { 1: 'the top number', 2: '…', 3: '…' } },
        { term: 'denominator', def: '…', levels: [2, 3] }
      ],
      questions: [                                      // Test Room, Jeopardy, Millionaire, Fill-in-the-blanks
        { type: 'mc',    cat: 'Basics', prompt: '…', answer: '1/2', options: { 1: ['1/2', 'banana'], 2: ['1/2', '1/3', '2/1'] } },
        { type: 'tf',    cat: 'Basics', prompt: '…', answer: true },
        { type: 'fill',  cat: 'Basics', prompt: 'The top number is the ___.', answer: 'numerator', bank: ['numerator', 'denominator', 'sum'] },
        { type: 'match', prompt: 'Match…', pairs: [['1/2', 'one half'], ['1/4', 'one quarter']] }
      ]
    }
  ]
});
```

Notes on questions:

- `mc` — `options` can be a flat list (the app trims distractors for lower levels) or an object per level so you control exactly how obvious the wrong answers are. The answer is always included.
- `tf` — `answer: true/false`. Use `levels` + two versions when a statement should be true at Level 1 but a trickier false statement at Level 3.
- `fill` — put `___` in the prompt. Levels 1–2 show a word bank from `bank`; Level 3 types the answer (case/punctuation-insensitive).
- `match` — the test samples 3 / 4 / 8 pairs by level.
- `cat` groups questions into Jeopardy categories (needs ≥ 2 categories with enough questions each; otherwise the board is built automatically).
- Slide bodies accept light markdown: blank lines for paragraphs, `- ` for bullets, `**bold**`, `> ` for a quoted passage (a reading text), and `| a | b |` rows for a table (first row is the header). A slide can also carry `html: '<div>…</div>'` for raw HTML such as a bar chart (see the `GRAPH` block in `olc4o.js`).

## OLC4O Literacy course

`olc4o.js` holds Unit 1 (seven lessons) built from the Unit 1 slideshows, worksheets and answer keys, with Level 4 extensions, Level-4-only application questions and two assignments per lesson. Each lesson's vocabulary, case text (Jaden's Tuesday, Why employers talk about skills, Bouncing back, The second sitting, the Riverside schedule and graph, Priya's e-mail and the Food Handler web page, the model reflection) and worksheet questions are in the app, with Level 1 using shortened passages and plain sentences. Questions carry `cat: 'L1 …' … 'L7 …'`, so the Focus Plan's *Question topics* and Jeopardy's categories line up with the lessons. Add Unit 2 as a second entry in `units`.

## Colouring Page

A gentle game: pick a colour from the grid, tap any area inside the black lines to fill it. Fill every area to finish (counts toward the games badges). While colouring, **learning cards** from a chosen lesson pop up every N areas and must be dismissed ("Got it") before colouring continues; with breaks off, a *Did you know?* spot at the side rotates through the lesson's slides and the unit's vocabulary instead.

Pictures live in `colouring.js`, keyed by `courseId/unitId`. Each is an inline SVG whose fillable areas carry `class="region"` (white fill, black stroke). The bundled pictures are original drawings. To add your own, paste any public-domain / CC0 line-art SVG, add `class="region"` to each closed shape, and register it:

```js
LearnHub.colouring['science/cells'].push({ title: 'Animal cell', svg: '<svg viewBox="…">…</svg>' });
```

Good sources of public-domain line art: openclipart.org, publicdomainvectors.org, Wikimedia Commons (filter by CC0 / public domain). Shapes must be closed paths for tap-to-fill to work; strokes with no fill will not colour.

## Printing

Every lesson, quiz, test and assignment has a **🖨️ Print** button, and each unit has **Print unit** next to the unit test and Game Room. The print preview opens in the app (`#/print/…`) with a *Print / Save as PDF* button:
- **Lesson** — slides as a handout, the lesson's words, the quiz on paper and the assignment sheets.
- **Unit** — every lesson followed by the unit test.
- **Quiz / Unit test** — numbered paper versions (a) b) c) choices, T/F boxes, word banks, matching columns) at the student's level and accommodations.
- **Assignment** — the prompt, the "complete answer" box, a sentence starter and writing lines.
When the Teacher Lock is open, an **Include answer key** toggle appends the key as a separate page.

## Images and videos

A lesson can list media slots: `media: [{ slide, type: 'image' | 'video', title, why, source, url, search, minutes, src: '' }]`. Each slot says where a visual helps and which **credible source** to use (CrashCourse, Heritage Minutes, Statistics Canada, museums, Wikimedia Commons…). Students only see a slot once `src` holds an image URL or video link (YouTube links embed as a player; images show under the slide). Unlocked teachers see empty slots as dashed placeholders on the slides, and **Settings → Teacher Lock → Media checklist** lists every unfilled slot per course. `media-guide-<course>.html` is a printable version of that checklist with a column to write your links.

## Awards

Per unit (20): reading badges (every lesson read), quiz badges (first quiz, every quiz, three first-try passes), the Scribe badge (every assignment handed in), test badges (pass, 90%+, perfect, "never give up"), game and points badges (3 games, 1,000 and 2,000 Jeopardy points, Millionaire top rung, $1,000 Wheel bank, clean Matching), medals (every game, 5,000 points, Lessons Complete, Unit Medal, Unit Gold). Per course (4 trophies): every unit medal, Scholar's Crown (every quiz), **Trailblazer** (80%+ on every unit test — Level 4 achievement), Grand Master (Gold in every unit). Pass mark is 70% (`PASS_MARK` in `badges.js`). Names and icons are themed per course through its `awards` block; any key a course leaves out uses the default name.

## Where things live

Progress, awards and settings are stored in the browser's `localStorage` (per device, per browser): `learnhub.students` (the roster), `learnhub.progress.<student>` and `learnhub.focus.<student>` per student, and `learnhub.settings` for the Teacher Lock PIN and device options. Profiles are local to the device — there is no server.

## Ideas for next iterations

- Export/import of student profiles and progress between devices.
- Images in slides (`visual` can already be any HTML — e.g. `<img src="img/cell.png">`).
- Timed challenges and leaderboards per unit.
- Teacher dashboard page reading the same progress data.
- Ontario curriculum expectation codes attached to units/questions for reporting.
