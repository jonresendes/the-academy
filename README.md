# LearnHub

A static learning environment for any number of courses. Each unit has a **Study Room** (slides), a **Test Room** (adaptive quiz) and a **Game Room** (7 games), and every achievement lands in **The Display Case**. Everything is plain HTML/CSS/JS — no build step, no server — so it deploys straight to GitHub Pages.

All files live side by side in the repository root (no folders), so you can upload them straight to GitHub:

```
index.html      app shell — add one <script> line per course here
styles.css      palette + every component (change colours in :root)
storage.js      settings, progress and Focus Plan (localStorage)
util.js         level-aware content helpers
badges.js       award engine (badge → medal → trophy)
games.js        the 7 games
app.js          router + pages
english.js      sample course — copy this to start a new one
science.js
README.md
```

## Deploy on GitHub Pages

1. Create a repository and upload all the files into its root (GitHub → Add file → Upload files).
2. Repository **Settings → Pages → Source: Deploy from a branch → main / (root)**.
3. Your app is live at `https://<user>.github.io/<repo>/`.

You can also just open `index.html` locally — it works from a file:// URL too.

## Difficulty levels

Students or guardians set the level in **Settings**. A guardian PIN locks it.

| | Level 1 · Explorer | Level 2 · Scholar | Level 3 · Challenger |
|---|---|---|---|
| Slides | `body[1]` text (simple words) | `body[2]` | `body[3]` |
| Test | 5 questions, 2 options (obvious distractor), word bank of 2 | 8 questions, 3 options, word bank of 4 | 12 questions, all options, type-in blanks |
| Matching / Memory | 3 pairs | 5 pairs | 8 pairs |
| Jeopardy | 2 × 2 board | 3 × 3 | 4 × 4, wrong answers lose points |
| Wheel of Fortune | vowels pre-revealed + definition hint, 2 puzzles | hint, 3 puzzles | category only, 4 puzzles |
| Millionaire | 5 rungs | 8 rungs | 10 rungs |
| Game Room | "Gentle" games listed first | all | all |

Accessibility settings: text size, Lexend reading font, high contrast, reduced motion, read-aloud buttons (browser speech).

## Focus Plan (students working well below grade level)

**Settings → Focus Plan** lets a guardian or teacher choose exactly which pieces of a course a student works toward. It sits behind the guardian PIN when one is set.

- Flip the switch on, open a course and **tick the units** to include. A course with no ticked units stays fully available; a course with ticked units shows *only* those.
- Inside a ticked unit, narrow it further by tapping chips on/off:
  - **Lessons** — which Study Room lessons appear (the study badge needs only these).
  - **Words to learn** — which vocabulary terms feed Matching, Memory, Tap & Reveal, Wheel of Fortune and the generated game questions.
  - **Question topics** — which `cat` groups appear in the Test Room, Jeopardy and Millionaire (untagged questions always stay).
  - **Goals to work toward** — the checklist the student sees on the course page (e.g. read the Study Room, pass the test, finish 3 games). Each goal ticks itself off when the matching award is earned.
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
- Slide bodies accept light markdown: blank lines for paragraphs, `- ` for bullets, `**bold**`.

## Awards

Per unit: 4 badges (study, test pass, perfect test, 3 games), 2 medals (all games; unit medal = study + pass + 3 games). Per course: 1 trophy (every unit medal). Pass mark is 70% (`PASS_MARK` in `badges.js`). Awards are course-themed through the `awards` block.

## Where things live

Progress, awards and settings are stored in the browser's `localStorage` (per device, per browser). There are no accounts yet — see the roadmap ideas below.

## Ideas for next iterations

- Student profiles (several students on one device) and export/import of progress.
- Images in slides (`visual` can already be any HTML — e.g. `<img src="img/cell.png">`).
- Timed challenges and leaderboards per unit.
- Teacher dashboard page reading the same progress data.
- Ontario curriculum expectation codes attached to units/questions for reporting.
