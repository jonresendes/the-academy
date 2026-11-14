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
media.js        dictation (voice to text) and audio recording (IndexedDB)
drive.js        exports (CSV + JSON), import, Google Drive push/pull
dashboard.js    teacher dashboard (students × lessons per section)
app.js          router + pages
olc4o.js        OLC4O Literacy — Unit 1 · Reading Like a Detective (Lessons 1–7)
colouring.js    line-art pictures for the Colouring Page
media-guide-<course>.html   checklist of suggested images/videos per lesson (generated)
pwa.js          install button, update notice, phone back button
report.js       "Found a problem?" button: screenshot + message to the Headmaster
html2canvas.min.js   screenshot library (MIT), loaded only when the button is pressed
opendyslexic-400.woff2 / opendyslexic-700.woff2   dyslexia-friendly font (SIL OFL, see opendyslexic-LICENSE.txt)
cloud-config.js Firebase project settings (public identifiers)
cloud.js        Firebase sign-in + live sync layer, account management, access lists, the v43 data upgrade
firebase-app-compat.js / -auth- / -firestore-   Firebase SDK 10.14.1, served from this site
firestore.rules security rules to paste into the Firebase console
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

## Cloud accounts and sync (Firebase)

Since v32 the app runs on a Firebase project (`cloud-config.js`): accounts, rosters, progress, assignment work and teacher grades live in Firestore and follow people to any device. If Firebase can't be loaded (no internet on first open, or `enabled: false`), the app runs in the older device-only mode.

**One-time set-up (already done for the-academy---learnhub):** Firebase console → Authentication → Email/Password enabled; Authorized domains includes `jonresendes.github.io`; Firestore database created; the web app's config pasted into `cloud-config.js`; the contents of `firestore.rules` pasted into Firestore → **Rules** → Publish. (*Enable create (sign-up)* in Authentication → Settings must stay **on**: teachers' browsers create the student sign-ins.)

**Sign-in.** Students: student number + birthday as `DDMMYYYY` (12 January 2008 → `12012008`). Teachers: teacher ID + password. There is **one Headmaster (admin) account**. The sign-in screen no longer offers to create one (v42); on a brand-new Firebase project open `…/#/setup` once to create it, and the cloud refuses a second. The Headmaster adds other teachers in the **Teachers** tab (below).

**Students** are created by a teacher in Settings → Students (first name, student number, birthday) — this creates the login and enrols them in the selected section — or, if *Students may create their own profile* is on, by the student themselves (they then wait for a teacher to add them to a class). Wrong birthday? The student's row has **Fix birthday / reset password**.

**Sessions.** Closing the app, the back button or a reload never signs anyone out — only **Switch user** / **Sign out** on the name chip do (v39: the sign-in screen sends a signed-in user straight home, so stepping back through old history can't end a session). A device with *Keep me signed in* unticked signs the user out after `idleMinutes` (30) without activity; a staff session with it ticked ends after `staffIdleMinutes` (720). Signing out empties the device (v43). Settings → My profile has **Sign out**.

**What syncs.** Profiles, levels, accommodations, Focus Plans, sections and rosters, every quiz/test score, award, assignment draft and hand-in, teacher grades and comments. Voice recordings and uploaded media stay on the device they were made on. Changes appear live on other open devices.

**Profile sync (v38).** A device sends only the profile fields that changed since the last copy it received, never the whole record, so a phone holding an old copy (offline, or opened from cache) cannot put an old level or course list back over a newer one. A student's own account may only change its own fields (preferences, archived courses, avatar, quiz-driven level moves and logs); the level, course list, accommodations, track, name and number are teacher-only, enforced in `firestore.rules`. Every saved change raises the profile's **version** (`rev`) and stamps who saved it and when; the stamp shows on the student's desk, in their Settings → My profile, and under their name in the teacher's Students list. If two screens show different version numbers, the newer one has not reached the other yet — Settings → App status says whether that device is synced, offline or in error, and the Save button now reports a refused write instead of claiming success.

**Is it really saved? (v40)** The student row's Save button now waits for the cloud to confirm every write that is in flight, then reads the profile straight back from the server and compares it with what you set; it says *✓ Confirmed by the cloud · Profile vN* only if they match, and otherwise *⚠️ Not confirmed* with the reason. Settings has a cloud status line (synced / sending, N waiting / offline / error). If writes keep waiting, another open copy of the app on the same phone (a Chrome tab plus the installed app) may be holding the cache — close the other copy. Writes go out one batch at a time in the order they were made.

**Firestore layout:** `students/{uid}`, `staff/{uid}`, `meta/master`, `logins/{teacherId}`, `issues/{id}`, `sections/{id}`, `progress/{uid}__{courseId}`, `focus/{uid}`, `settings/global`. See the v43 section below for the current layout and rules.

## Security update (v43) — scoped access, protected grades, nothing left on devices

v43 answers the v42 security review (project doc `security-privacy-audit-v42.md`). It runs on Firebase's free plan: there are no Cloud Functions. The security rules decide what each account may read and write, and the app keeps the supporting records in step. Putting it live is three steps — see `DEPLOY.md`. Passwords, names and teacher IDs of existing accounts are not changed.

**Being signed in is no longer enough.** Every read needs a staff record or a student record. Sign-ins are still made from the browser (a teacher adding a student, the Headmaster adding a teacher), so a stranger can still create a bare sign-in — but it can read nothing and write nothing. Self sign-up works only while the school's switch is saved as on, and then only creates a plain profile (level 2, no courses, nobody's student).

**A teacher receives only their own students.** Every student record carries `teachers`, the staff who have that student. A teacher's app adds its own id when a student goes onto one of its rosters (and takes it off when they leave the last one); the rules let a teacher change only their own entry. The Headmaster's app keeps the lists in step with the rosters. *Add an existing student* picks from a staff-only directory (name, number, picture); the full record arrives a moment later. A teacher fetches a student's work for the courses of the sections that student is in.

**Grades are the teacher's.** Grades and comments moved from the student's own record to `grades/{student}__{course}`, which a student can read but not write.

**Private things are private.** Teacher notes live in `staffNotes/{uid}` and e-mail addresses in `staffPrivate/{uid}`. Students no longer download either.

**Nothing stays on a shared device.** Signing out — or being signed out by the idle timer — empties the app's local storage and the offline database, then reloads. (One exception: a student whose last changes could not be sent keeps the offline queue of their own work until they next sign in.) A staff session with *Keep me signed in* still ends after `staffIdleMinutes` (12 hours) idle. A teacher's own course preview progress now stays on the device.

**Stored text is never run as code.** Every value read from the cloud is escaped where it is drawn; screenshots in problem reports must be real JPEG pictures; links must be web addresses; raw slide markup is only taken from the course files. A Content-Security-Policy in `index.html` allows scripts from this site only, and the Firebase SDK is served from this folder (`firebase-*-compat.js`, v10.14.1).

**The one-time data upgrade** runs by itself the first time the Headmaster signs in on v43: access lists on every student, grades moved to their own records, notes and e-mail moved to private records, directory cards. Until then teachers see a notice and no students. *Settings → 🔐 Security → Run the data upgrade again* repeats it safely.

**Settings → 🔐 Security (Headmaster)** also has the **change log**: who added or removed students and teachers, reset a password, or took a student onto their roster. Lines cannot be edited or deleted.

**Passwords.** New or changed staff passwords need 10 characters and are typed into a masked box. Resetting a teacher's password still gives them a fresh sign-in behind the same teacher ID (a browser cannot change someone else's password); their record, notes, sections and students move to it.

**Exports** no longer contain birthdays or PINs, and CSV cells cannot be read as spreadsheet formulas. Importing a file is for device-only mode.

**Firestore layout (v43):** `students/{uid}` (+ `teachers`), `directory/{uid}`, `staff/{uid}` (public part), `staffNotes/{uid}`, `staffPrivate/{uid}`, `sections/{id}`, `progress/{uid}__{course}`, `grades/{uid}__{course}`, `focus/{uid}`, `issues/{id}`, `settings/global`, `meta/master`, `meta/config`, `logins/{teacherId}`, `audit/{id}`. The rules are in `firestore.rules`: paste into Firestore → Rules → Publish.

**What a server would add** (if the project ever moves to the pay-as-you-go plan; a server edition was built and is kept in the project notes): sign-up closed to the outside altogether; access lists and the change log written by the server instead of by each teacher's app (today a teacher can take any student onto their own list, which is how adding to a section works, and the log relies on the app writing its line); old sign-ins deleted automatically; password resets without a new sign-in.

**Still open** (decisions rather than code): students sign in with number + birthday; staff have no second sign-in factor; quiz and test scores and the level history are written by the student's own browser, so a determined student can still alter those; answer keys ship inside the course files; voice recordings and uploaded media stay in the browser they were made in; unused sign-ins are cleared by hand (Firebase console, or `unused-signins.py`).

## Headmaster, Teachers tab, dyslexia-friendly text and problem reports (v42)

**Who is the Headmaster.** The account named in `meta/master` (the same record the security rules trust) is the Headmaster, whatever role is written on its staff record; if that record says `teacher` the app corrects it at sign-in. A Headmaster session is marked by a gold line across the top of the header, a **👑 Headmaster** badge on the name chip, a banner at the top of Settings and an *Account type* row in Settings → My profile. A teacher's *Account type* row names the Headmaster on record and, under *This should be the Headmaster account?*, gives the Firebase console step to move the role (set `meta/master.uid`).

**Teachers tab** (top menu, Headmaster only; the same panel is in Settings → Teachers):
- **Add a teacher** — name, teacher ID (sign-in name, 3+ letters/digits), password (10+), optional school e-mail, optional first section.
- **Teacher profiles** — one fold-out per teacher: change name and e-mail; see their sections; move a section to another teacher or back to the Headmaster; assign an existing section; create a new section for them; open a section's roster to add an existing student, create a new student (first name, number, birthday) or remove one from the section.
- **Reset password** — a browser cannot change someone else's password, so the teacher gets a fresh sign-in (10+ characters) behind the same teacher ID: their record, notes, sections and students move to it and the old password stops working. `logins/{teacherId}` records which sign-in address the ID uses now; the sign-in screen looks it up.
- **Remove teacher** — deletes the staff record (their sign-in then opens nothing) and takes them off every student's access list; their sections and students are kept and pass to the Headmaster. The same teacher ID can be given out again.

**Dyslexia-friendly text** — Settings → Accessibility (students) / My accessibility (teachers): a switch that shows the whole app in OpenDyslexic with extra room between words and lines and no italics. It is a per-person preference (`prefs.dyslexia`) that follows the account; the font files are in the repo and cached for offline use.

**Found a problem?** — a button in the bottom-left corner of every page for anyone signed in. It takes a picture of the screen, opens a box showing the picture (with a tick-box to leave it out) and a place to describe the problem, and sends both to the Headmaster. **Settings → 🐞 Reported problems** (Headmaster only) lists them — who, when, which page, app version, the message and the screenshot — with *Save screenshot* (downloads a JPEG), *Mark resolved / Reopen*, *Delete*, and Open / Resolved / All filters. Reports live in `issues/{id}`; the screenshot is a JPEG shrunk to fit inside the record. Embedded Google files and videos appear blank in a screenshot.

**Rules changed in v43** — paste `firestore.rules` into Firestore → Rules → Publish before uploading the app (see DEPLOY.md).

## Levelled grades (v45)

Each level is a **grade band**: L1 · Explorer 50–59, L2 · Scholar 60–69, L3 · Challenger 70–84, L4 · Trailblazer 85–100 (`LEVEL_BANDS` in `storage.js` — the single source for the level cards, the move-up/move-down offers, teacher suggestions and the grid colours). Work done at a level earns a grade inside that band.

- **One rule at every level** (`Grading.levelled(raw, level)`): **50% raw is a pass and a grade of 50**; a perfect score is the top of the band; between them the grade climbs in a straight line; below 50% the grade is the raw score (a fail). Each level is a scaled copy of Level 4: 75% raw is 55 at L1, 60 at L2, 67 at L3, 75 at L4; a perfect Level 2 quiz is 69, never more. `Grading.rawFor(grade, level)` is the inverse ("what do I need for a 60?"). The pass mark for awards and *You passed!* is 50% (`Badges.PASS_MARK`).
- **Tracked per level.** A quiz record keeps `levels[L] = { best, attempts, at }` beside the raw `best` (which still drives awards and the 85% level offers); the unit test keeps `unit.test.levels[L]`; an assignment stores the level it was handed in at (`work.level`) and the teacher's score out of 10 becomes a levelled grade at that level. The grade that counts is the best levelled grade across levels, worked out at display time. Records from before v45 are graded at the student's current level for the course.
- **Rewrites one level up.** Students page → student row → *Rewrites one level up* (off by default; teacher-only field). Every quiz and unit test start screen then offers *Take it at Level N+1*; the page runs the next level's version (`#/quiz/c/u/l/N+1`, `#/test/c/u/N+1`), only ever one level up and never on the Modified program. A higher levelled grade replaces the old one; a lower one changes nothing. The result card shows the grade for the attempt and the grade that counts.
- **Level offers after a quiz:** 85%+ raw → offered one level up; below 50% raw (a fail) → offered one level down.
- **Grids.** Both Grades grids show the levelled grade with *L · raw%* underneath, assignment cells show *score/10 → grade · L*, and a **Unit avg** column averages every levelled grade in the unit. The chart of raw → grade for every level (and the grade → raw-needed table) is the *Levelled Grades* artifact.

## Tile desks, Students page, Sections page, avatars (v44)

- **Both desks are tile grids.** Teacher's Desk (shown as **The Headmaster's Desk** for the Headmaster, in the heading, the top menu and breadcrumbs): **Sections · Students · Courses · Grades · Notes** (+ **Teachers** for the Headmaster). Student Desk: the four stat tiles, then **Sections · Courses · Grades · Display Case · Notes**. Every tile opens a page; nothing folds out on the desk any more. **Settings** lives only in the top menu.
- **Students page** (`#/students`, staff only, also in the top menu): search by name or student number, choose the scope (all my students / one section, archived sections included), and open any student for the full editor (level, courses and per-course level, Modified program, accommodations, Focus Plan, work, recordings). Each student's row has **🏫 Sections and teachers**: who they are assigned to now, and every section and teacher they have been with before (left when, since when). The history is kept on the section (`sec.log`) and on the student's record (`history`, teacher-only), so it survives archiving and a change of teacher. A teacher sees only the students of their own sections; the Headmaster sees the school.
- **Sections page** hosts creating and managing sections (it used to be a Settings group). A section is the teacher's own copy of a course for one roster: everything customised in it (hidden lessons, edited slides, extra questions and terms, own lessons) stays in that section — including after it is archived — unless it is copied into another section with *copy customisations from…*. Teachers create their own sections; the **Headmaster** creates sections too and is the only one who can **assign a section to a teacher** (at creation here, or later on the Teachers page). The Headmaster can customise any section by selecting it as the working section.
- **Courses page** (`#/courses`): students see their classes (resume, join, archived); staff see the library in teacher preview with each course's sections and a *＋ New section* shortcut.
- **Avatars:** every profile picks from ~400 emoji in groups — People, Animals, School, Sport, Art & music, Math, Tech, Science, Literature & stories, Nature & food, Flags & places. The owl 🦉 is reserved for the Headmaster (it is not offered to anyone else and the store refuses it for other profiles).
- The two sample courses (`english.js`, `science.js`) are gone; `Sample - English` / `Sample - Science` no longer appear anywhere.
- Fix: a pending cloud write now carries a snapshot of the data, so an incoming copy of a record can no longer erase a change made a moment earlier (the enrolment history relied on this). Fix: the phone back button steps up one level even after pages that navigate by setting the address directly.

## Desks, Sections and Grades (v34)

- **Student Desk / Teacher's Desk** is the home page: two fold-outs, **Sections** first, then **Courses**. Students see the sections they are in (teacher, term, Open class / Grades / Display Case) and their courses (with Join / Archived); teachers see their sections (roster, Grades, Open the course, Students) and the course previews.
- **Sections** in the top menu opens a page with every section and its options. Grades are reached from a section (teacher: the grid for that section; student: their grades for that course). There is no separate Grades or Dashboard menu item.
- **Display Case** stays in the student menu; for teachers it is a fold-out at the top of each course page (students get that fold too).
- **Settings** groups all start closed each time Settings is opened. The Focus Plan and keyword search live inside each student's row in Settings → Students (no separate group). Each open student row has a **💾 Save changes** button that pushes the row's changes to the cloud immediately and confirms; changes are also pushed automatically within a second and on sign-out.

## Notes (everyone) and the desk

Every desk — student, teacher, Headmaster — has a **Notes** tile. Tapping it shows or hides a **My notes** panel right there on the desk (no page change); **Open my notes** goes to the full page of 4 / 6 / 8 / 10 sticky notes (title, text, colour, delete). Notes with something on them stay on the desk as sticky notes and can be deleted from the desk (✕) or from inside the notes page; the panel is open whenever there are notes, and Hide folds it for the session. Each note saves itself half a second after you stop typing and the moment you leave the page. Staff notes are private to that teacher (`staffNotes/{uid}`, v43); a student's notes live on their own record (`notes`, a field only the student may write — `firestore.rules` v45) and follow them to any device.

## Grades

Teachers: open a section (Desk → Sections, or the Sections page) → **Grades**. One collapsible table per unit: a row per student; per lesson a quiz cell and a cell per assignment showing ✓ handed in / ✎ draft / – not started with a grade box (out of 10) and a 💬 comment button; then unit test and awards. Grades save to the student's record (and the cloud) as you type.

Students: **Grades** in the top bar, or *My grades* on a class — the same row for themselves, with teacher grades and comments. Nothing on it is editable.

## Collapsible classes and units

Classes on the home page, sections on the teacher dashboard, units on a course page and units on the Grades grids are all fold-outs. Every fold starts closed each time a screen is opened (nothing is remembered between screens).

## Back button (phone and header ←)

Back always goes **up one level** — slide → lesson → course → desk — whichever way you got there, and never to the sign-in screen. At the desk, a second press within two seconds asks whether to close the app. Collapsible areas (Settings groups, student rows, units) start closed each time a screen is opened, but stay as they are while that screen redraws — changing text size, overlay or any other setting keeps its group open.

## Installing on a phone or computer

The app is a Progressive Web App. On Android Chrome and desktop Chrome/Edge an **⬇️ Install app** button appears in the header (also available from the browser menu → *Install app* / *Add to Home screen*). On iPhone use Safari → Share → *Add to Home Screen*. Installed copies work offline.

**Settings → App** shows whether LearnHub is installed on this device, offers Install / Uninstall instructions, and — when not installed — checks that `manifest.json`, both icons and `sw.js` are actually being served (a ✕ means that file is missing from the website). The header's Install button disappears once the app is installed on the device. If you host the app at a different address, update the `related_applications` URL in `manifest.json` so the browser can report installed status.

**Updates.** Three things carry the version and must be bumped together on every deploy — `VERSION` in `sw.js`, `APP_VERSION` in `pwa.js`, and `version.json` (run `node tools/bump.js` if you have the repo tools, or edit all three). Installed copies check `version.json` on load and hourly; a newer number shows an *"Update now"* notice and **Settings → Updates** (at the bottom) offers *Check for updates* / *Update now*, which fetches the new files, clears the offline cache and reloads. `sw.js` holds a `VERSION` string. Every time you upload changed files, change that string (e.g. `learnhub-v3` → `learnhub-v4`) and upload `sw.js` too. Installed copies then show an *"A new version is ready — Update now"* notice the next time they open (they also check hourly while open). If you forget to bump it, online users still get the new files (the app is network-first) but offline copies won't refresh.

**Phone back button.** The app keeps its own history, so the phone's back button steps back through the pages you visited. On the home page, one press shows "Press back again to close"; a second press within two seconds asks *Close LearnHub?* with Keep learning / Close app.

## Welcome page, profiles and sign-in

The app opens on a **Welcome page**: one tile per profile — *Welcome, ‹student›* (tap to sign in) and *Welcome, ‹teacher›* (asks for the teacher's 6-digit PIN) — plus **New here? → I'm a student / I'm a teacher**.

- **Student sign-up** asks for a first name, a picture, reading/viewing preferences (text size, Lexend, contrast, colour overlay, read-aloud, dictation), a **Level of learning** (1–4, the starting level) and which classes to join. Everything can be changed later in Settings → *My profile* / *My classes*.
- **Teacher sign-up** asks for a name and a 6-digit PIN. The first teacher on a device becomes the **master account**; later teachers need the master PIN to be created (or the master adds them in Settings → Teachers). Teacher profiles stay signed in only for the browser session; opening the Welcome page signs a teacher out.
- After signing in everyone lands on their **Dashboard**: students see *Resume a class*, *Join a new class*, *Archived classes* and *Scores, accolades and awards*; teachers see their sections, the class dashboard and a course preview.

Settings is organised into **collapsible groups**. Students: *My profile* · *My classes, level, accommodations & modifications* · *Accessibility* · *App* · *Progress*. Teachers: *My profile* · *Sections* · *Students* (levels, accommodations and modifications together, courses, work, recordings, level history) · *Focus Plan & keyword search* · *Teachers* and *Google Drive* (master only) · *Media checklist* · *Class options* · *My accessibility* · *App*. Teacher tools are only visible in a teacher session — there is no PIN box inside a student's settings any more.

Course pages colour each unit by status: **white** = not started, **light orange** = in progress, **light green** = complete (every slide read, every quiz passed, unit test passed).

Students, sections and teachers are stored on the device (`learnhub.students`, `learnhub.sections`, `learnhub.staff`). To move them to another device, use the export/import or Google Drive push/pull below.

## Achievement levels (1–4)

Levels follow the Ontario achievement chart and are set per student inside **Settings → Teacher Lock → Students**. The level is never shown to the student (no badge, no label anywhere in the app). After every test the app records a **level suggestion** for the teacher when the score lands in a different band (e.g. "Level 3 → 4, 86% on Unit 1"); it appears in the student's row with *Apply* / *Dismiss* buttons and is never shown to the student.

| | Level 1 · Explorer (50–59%) | Level 2 · Scholar (60–69%) | Level 3 · Challenger (70–84%) | Level 4 · Trailblazer (85–100%) |
|---|---|---|---|---|
| Slides | `body[1]` text (simple words, shortened passages) | `body[2]` | `body[3]` (+ expectation codes, worked examples) | `body[4]`, or `body[3]` when a course has no Level 4 text |
| Test | 5 questions, 2 options (obvious distractor), word bank of 2 | 8 questions, 3 options, word bank of 4 | 12 questions, all options, type-in blanks | 15 questions, all options, type-in blanks |
| Matching / Memory | 3 pairs | 5 pairs | 8 pairs | 10 pairs |
| Jeopardy | 2 × 2 board | 3 × 3 | 4 × 4, wrong answers lose points | 4 × 5, wrong answers lose points |
| Wheel of Fortune | vowels pre-revealed + definition hint, 2 puzzles | hint, 3 puzzles | category only, 4 puzzles | category only, 5 puzzles |
| Millionaire | 5 rungs | 8 rungs | 10 rungs | 12 rungs |
| Game Room | "Gentle" games listed first | all | all | all |

Every test starts with a question every student can get (a true/false or short multiple choice) and questions are served **least-seen first**, so no question repeats until the student has seen every question in the unit.

Accessibility settings (per student): text size, Lexend reading font, contrast (normal / high / **inverted** — white text on black), colour overlays, reduced motion, read-aloud buttons (browser speech) that **highlight each word in yellow as it is spoken**, dictation and recording.

## Lessons, quizzes, assignments and tests

The course page lists every unit's lessons. Opening a lesson shows its parts:
- **Slides** — the lesson at the student's level, with read-aloud.
- **Quiz** — 4 / 6 / 8 / 10 questions (by level) drawn only from that lesson's question bank (questions whose `cat` starts with `L<n>`, or the categories a lesson lists in `cats: […]`). Pass mark 50%; best score is kept.
- **Assignments** — open-response tasks with a levelled prompt, a sentence starter and a "complete answer contains…" box. Work autosaves as a draft; *Hand in* marks it done. Teachers read handed-in work in Teacher Lock → Students → *Assignment work*.
- **Unit test** — covers every lesson in the unit (5 / 8 / 12 / 15 questions by level).
- **📁 Work folder** (a room on every unit) — every assignment in the unit with its state (not started / draft saved / handed in), a preview of the writing, any voice recording, and Continue / Open / Print buttons. The student sees their own; an unlocked teacher sees the same page for the signed-in student (and all students' work in Teacher Lock → Students).

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

1. Copy `glc2o.js` (the smallest course) to `<your-course>.js`.
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

## OLC4O - Literacy Course

`olc4o.js` holds Unit 1 (seven lessons) built from the Unit 1 slideshows, worksheets and answer keys, with Level 4 extensions, Level-4-only application questions and two assignments per lesson. Each lesson's vocabulary, case text (Jaden's Tuesday, Why employers talk about skills, Bouncing back, The second sitting, the Riverside schedule and graph, Priya's e-mail and the Food Handler web page, the model reflection) and worksheet questions are in the app, with Level 1 using shortened passages and plain sentences. Questions carry `cat: 'L1 …' … 'L7 …'`, so the Focus Plan's *Question topics* and Jeopardy's categories line up with the lessons. Add Unit 2 as a second entry in `units`.

## Colouring Page

A gentle game: pick a colour from the grid, tap any area inside the black lines to fill it. Fill every area to finish (counts toward the games badges). While colouring, **learning cards** from a chosen lesson pop up every N areas and must be dismissed ("Got it") before colouring continues; with breaks off, a *Did you know?* spot at the side rotates through the lesson's slides and the unit's vocabulary instead.

Pictures live in `colouring.js`, keyed by `courseId/unitId`. Each is an inline SVG whose fillable areas carry `class="region"` (white fill, black stroke). The bundled pictures are original drawings. To add your own, paste any public-domain / CC0 line-art SVG, add `class="region"` to each closed shape, and register it:

```js
LearnHub.colouring['science/cells'].push({ title: 'Animal cell', svg: '<svg viewBox="…">…</svg>' });
```

Good sources of public-domain line art: openclipart.org, publicdomainvectors.org, Wikimedia Commons (filter by CC0 / public domain). Shapes must be closed paths for tap-to-fill to work; strokes with no fill will not colour.

## Staff accounts, sections and archiving

- **Master account** — created the first time Settings is opened (name, optional e-mail, 6-digit PIN). The master sees every student on the device, adds **teachers** (name + their own 6-digit PIN), creates sections for any teacher, and runs exports.
- **Teachers** unlock the Teacher Lock with their PIN and see only the students in their own sections — with full control over them: levels, Modified band, accommodations, course list, Focus Plan, written work, recordings, level history.
- **Sections** (Teacher Lock → Sections) — one class = a course + a teacher + a roster + a term. The dropdown picks the section you are working with; the Students list follows it. New students added while a section is selected are enrolled in it and its course; existing students can be added from a dropdown. **Archive** a section at the end of term; archived sections stay in the dropdown under "Archived" and can be retrieved.
- **Student archive** — a student can archive a class from its course page (📦 Archive class). It moves to "Archived classes" on their home page and can be brought back; teachers can still assign it.

Accounts are stored on the device (`learnhub.staff`, `learnhub.sections`). To move a roster or a student's work to another device, use the export/import below.

## Course naming

Every course's `title` is its Ontario course code, a hyphen, and a short description: `HRF3O - World Religions`, `OLC4O - Literacy Course`, `SNC1L/2L - Grade 9-10 Science`, and for future courses e.g. `CLN4U - International Law`, `HZT4U - Philosophy`. The `subtitle` carries the fuller name or theme. (The two sample courses were removed in v44.)

## Classroom shell (per-section customisation)

A teacher can tailor any course for **one section** without touching the program or other teachers' classes. Everything lives in an *overlay* on the section (`Sections.list[n].overlay[courseId][unitId]`); the course files are never edited.

- **Turn it on** — sign in as a teacher, open the course, pick one of your sections in the bar at the top, then **✏️ Customise**. The orange bar means every change applies only to that section. **✓ Done customising** hides the tools.
- **Course page** — move lessons up/down, rename or hide a lesson (hidden ones are listed so you can bring them back), add a lesson of your own, add or hide words in the unit word bank, reset the unit to the program.
- **Slides** — under each slide: edit the title and text at every level (1–4 and the Modified bands), change the icon, hide the slide, add a slide after it, revert to the original. Media slots: paste a link (image, YouTube, audio or video URL), **upload** a picture / audio / video from the device, or add a new media item with a caption.
- **Lesson page** — edit, hide or add assignments (task, sentence starter and success criteria at each level); edit, hide or add quiz questions (multiple choice, true/false, fill-in; optionally only at some levels). Added questions join that lesson's quiz and the unit test for the section.
- **Students** see the customised course automatically through the section they are enrolled in (first non-archived section for that course). Teacher tools never appear for students.
- **Settings → Sections** shows the number of customisations for the current section, **copy customisations from…** another section of the same course, and **Reset to the program**.
- **Uploads** are stored in the browser (IndexedDB, 25 MB per file) and only show on the device they were uploaded to; a link works everywhere. Exports and Google Drive pushes carry the overlay (edits, links, hidden items) but not uploaded files.
- Printing uses the customised text; uploaded pictures are skipped on paper.
- **Google Slides, Docs and Forms** — paste the file's share link into a media slot (or add it as a new link) and the lesson shows it inline: a Slides deck with its own controls, a Doc scrolling in the page (read-only), or a live Form students fill in right there (responses go to the teacher's Sheet as usual). An **Open in Google …** button sits beside every frame. The file must be viewable by the students ("Anyone with the link" or the school domain), otherwise they see a Google sign-in box. Drive share links (`drive.google.com/file/d/…`, the shape you get from the Drive file list) and Sheets links work too — Drive previews PDFs, Office files, images and videos as well as Docs and Slides. Short `forms.gle` links can't be framed and open in a new tab. Embedded files need the internet and print as a link.

## Level progression (85% rule)

After every lesson quiz on the standard track:
- **85% or more** → the student is offered a move **up one level** for the next lessons ("Yes, move up / Not now").
- **Below the pass mark** (50% raw) → offered a move **down one level** for now.
- Students can **go back** to their previous level at any time (course page banner, or Settings → Me) but can never skip a level; teachers can set any level.
Every change is logged with who made it, why, the lesson and the score, and the level at which each lesson's quiz was passed is recorded. Teachers see this as **Level history** in the student's row (and in the CSV export) to determine a final grade.

## Modified program (K–2 · Grades 3–5 · Grades 6–8)

For students working on the course without going for credit. In the student's row, under **Modified program**, pick a band per course. The student then gets every lesson rewritten at that band (`mod.k2 / g35 / g68` on slides and terms), band-specific quiz questions (`bands: […]`), one modified assignment per lesson, Level-1 game sizes and no level prompts. HRF3O (30 lessons) and OLC4O (7) carry all three bands.

## Dictation, recording and other accessibility options

- **🎤 Dictate** appears on assignment answers and typed blanks (Chrome, Edge, Safari): speak instead of typing. **🎙️ Record** lets a student record an answer to an assignment or a voice note on the last slide of a lesson; recordings live in the browser (IndexedDB) and teachers play them from the student's row (*Voice recordings*). Both can be turned off per student in Settings → Accessibility.
- **Colour overlay (Irlen / visual stress)** — cream, pale blue, pale green, rose, yellow, grey, peach, lavender tints, per student.
- **Read&Write (Texthelp)** — the Chrome extension works on the app as it is (everything is real text). Settings links to the Chrome Web Store.

## Exports and Google Drive

Teacher Lock → **Google Drive & exports** (master only):
- **Download export** — a CSV summary (per student, course, unit and lesson: slides read, quiz best/attempts, assignments handed in, unit test best, awards, plus one row per level change) and a full JSON export.
- **Import JSON** — merges students, progress and sections from another device.
- **Dashboard** (top navigation when unlocked, or Sections → *Open the dashboard*) — one row per student in the selected section, quiz best per lesson (coloured 85%+ / 70–84 / below 70), unit test, assignments handed in, awards; printable. Click a name to open that student in Settings.
- The Focus Plan and keyword search in Teacher Lock have an **Editing for** picker, so a teacher edits any student's plan without signing in as them.
- **Push to Google Drive** — uploads both files to a folder called *The Academy exports* in the signed-in Google account (the school administration account). One-time setup: in Google Cloud Console create an **OAuth 2.0 Client ID** (Web application) with the app's address as an *Authorized JavaScript origin*, and paste it into the Client ID box. The app asks only for the `drive.file` scope (files it creates). **Pull latest from Google Drive** on another device fetches the newest export and merges it in (students, progress, sections and teachers with their PINs — the master PIN never leaves a device), so push at the end of class on one device and pull on the next.

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

Per unit (20): reading badges (every lesson read), quiz badges (first quiz, every quiz, three first-try passes), the Scribe badge (every assignment handed in), test badges (pass, 90%+, perfect, "never give up"), game and points badges (3 games, 1,000 and 2,000 Jeopardy points, Millionaire top rung, $1,000 Wheel bank, clean Matching), medals (every game, 5,000 points, Lessons Complete, Unit Medal, Unit Gold). Per course (4 trophies): every unit medal, Scholar's Crown (every quiz), **Trailblazer** (80%+ on every unit test — Level 4 achievement), Grand Master (Gold in every unit). Pass mark is 50% (`PASS_MARK` in `badges.js`). Names and icons are themed per course through its `awards` block; any key a course leaves out uses the default name.

## Where things live

Progress, awards and settings are stored in the browser's `localStorage` (per device, per browser): `learnhub.students` (the roster), `learnhub.progress.<student>` and `learnhub.focus.<student>` per student, and `learnhub.settings` for the Teacher Lock PIN and device options. Profiles are local to the device — there is no server.

## Ideas for next iterations

- Export/import of student profiles and progress between devices.
- Images in slides (`visual` can already be any HTML — e.g. `<img src="img/cell.png">`).
- Timed challenges and leaderboards per unit.
- Teacher dashboard page reading the same progress data.
- Ontario curriculum expectation codes attached to units/questions for reporting.
