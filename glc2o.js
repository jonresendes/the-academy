/* glc2o.js — GLC2O - Career Studies (Grade 10, Open, 2024 curriculum)
   The Academy · Learn Hub course file. Built from the teacher's GLC2O slide decks, worksheets,
   answer keys, unit tests and assignments (5 units, 29 lessons).

   Every lesson has the same five slides:
     0 🎯 Start here (Minds On + learning goal)   1 key ideas   2 the case (Meet …)
     3 📝 Write this down (the record)             4 🧪 Try it (a small experiment on your own life)
   and two assignments: "My record" (the note + one line about me) and the lesson task
   (worksheet / experiment). Unit assignments and Goal Journal check-ins sit on the last lesson of a unit.

   Install: add <script src="glc2o.js"></script> to index.html after colouring.js and the other
   courses, add './glc2o.js' to FILES in sw.js, then bump the version. */
(function () {
  window.LearnHub = window.LearnHub || { courses: [] };
  var LH = window.LearnHub;

  /* ---------- helpers ---------- */
  // level text: L1, L2, then text ADDED for L3 and for L4 (L4 always builds on L3)
  function lv(l1, l2, a3, a4) {
    var b = { 1: l1, 2: l2 };
    if (a3) b[3] = l2 + '\n\n' + a3;
    if (a4) b[4] = (b[3] || l2) + '\n\n' + a4;
    return b;
  }
  function S(title, visual, l1, l2, a3, a4) { return { title: title, visual: visual, body: lv(l1, l2, a3, a4) }; }
  // multiple choice: w = three wrong answers, the most obviously wrong one LAST
  function mc(p, a, w) { return { type: 'mc', prompt: p, answer: a, options: { 1: [a, w[2]], 2: [a, w[0], w[2]], 3: [a, w[0], w[1], w[2]] } }; }
  function tf(p, a) { return { type: 'tf', prompt: p, answer: a }; }
  // true statement for Levels 1–2, the trickier false one for Levels 3–4
  function tfx(t, f) { return [{ type: 'tf', prompt: t, answer: true, levels: [1, 2] }, { type: 'tf', prompt: f, answer: false, levels: [3, 4] }]; }
  function fill(p, a, bank) { return { type: 'fill', prompt: p, answer: a, bank: [a].concat(bank) }; }
  // Level-4-only application question (real-life scenario)
  function app(p, a, w) { return { type: 'mc', prompt: p, answer: a, options: [a].concat(w), levels: [4] }; }
  // assignment: p / ok = [L1, L2, +L3, +L4]; st = starter string or [L1, L2]
  function A(title, exp, p, st, ok) {
    if (typeof st === 'string') st = [st, st];
    return { title: title, expectations: exp, prompt: lv(p[0], p[1], p[2], p[3]), starter: { 1: st[0], 2: st[1] }, success: lv(ok[0], ok[1], ok[2], ok[3]) };
  }
  // the lesson record: copy the note, then add something about your own life
  function R(exp, own1, own2, st) {
    return A('📝 My record', exp,
      ['Go to the 📝 Write this down slide. Copy the note into your notebook, then type it here. Then answer: ' + own1,
       'Record the note from the 📝 Write this down slide in your notebook and here, in your own words. Then add: ' + own2,
       'Use at least three of the lesson words correctly in your record.',
       'Finish with one question this lesson leaves you with, and where you could find the answer.'],
      st,
      ['The note is written. One sentence is about me.',
       'The note is complete and in my own words. I added an example from my own life.',
       'Three lesson words are used correctly.',
       'My question is specific and I name a real source (a person, a website or a service).']);
  }
  function M(slide, type, title, why, source, url, search) { return { slide: slide, type: type, title: title, why: why, source: source, url: url, search: search || title, src: '' }; }
  function flat(a) { var o = []; (a || []).forEach(function (x) { if (Array.isArray(x)) x.forEach(function (y) { o.push(y); }); else o.push(x); }); return o; }

  // lesson: o = { slides, terms: [[term, L1 def, L2 def]], q, rec: [own1, own2, starter], task, extra, media }
  function L(n, title, short, exp, o) {
    var cat = 'L' + n + ' ' + short;
    var qs = flat(o.q);
    var t = o.terms || [];
    for (var i = 0; i < 2 && t.length >= 4; i++) {
      var others = t.filter(function (x, j) { return j !== i; }).map(function (x) { return x[0]; });
      qs.push({ type: 'mc', prompt: 'Which word or phrase means: "' + t[i][2] + '"', answer: t[i][0],
        options: { 1: [t[i][0], others[2]], 2: [t[i][0], others[0], others[2]], 3: [t[i][0], others[0], others[1], others[2]] } });
    }
    if (t.length >= 3) qs.push({ type: 'match', prompt: 'Match each word from "' + title + '" with its meaning.', pairs: t.map(function (x) { return [x[0], x[1]]; }) });
    qs.forEach(function (q) { q.cat = cat; });
    var asg = [R(exp, o.rec[0], o.rec[1], o.rec[2]), o.task].concat(o.extra || []);
    return { lesson: { title: title, expectations: exp, cats: [cat], slides: o.slides, assignments: asg, media: o.media || [] },
      terms: t.map(function (x) { return { term: x[0], def: { 1: x[1], 2: x[2] } }; }), questions: qs };
  }
  function U(id, title, desc, lessons) {
    var u = { id: id, title: title, description: { 1: desc[0], 2: desc[1], 3: desc[2] }, lessons: [], terms: [], questions: [] }, seen = {};
    lessons.forEach(function (l) {
      u.lessons.push(l.lesson);
      l.terms.forEach(function (t) { var k = t.term.toLowerCase(); if (!seen[k]) { seen[k] = 1; u.terms.push(t); } });
      u.questions = u.questions.concat(l.questions);
    });
    return u;
  }
  var units = [];

  /* ================= UNIT 1 · Skills, Strategies and Habits for Success ================= */
  units.push(U('success', 'Unit 1 · Skills, Strategies and Habits for Success', [
    'What helps me do well and stay well? Habits, bouncing back, stress, who can help, choices and goals.',
    'What helps me succeed and stay well? Six lessons on habits, resilience, stress and balance, mental health supports, decision making and SMART goals.',
    'Strand A (A1.1–A1.3, A2.1–A2.2): the skills, strategies and habits that support success and well-being, and the decision-making and goal-setting strategies used through the rest of the course.'
  ], [

    L(1, 'What Is Success? Starting Your Career Journey', 'What Is Success?', 'A1.1, A2.1', {
      slides: [
        S('Start here: success at 25', '🎯',
          `**Think:** Picture your life at age 25. Where do you live? Who is with you? What do you do all day?\n\n**Today we learn:** what "career" means, and how habits help.`,
          `**Minds On:** Sketch or write what a successful life looks like for you at age 25. Include more than a job: where you live, who is around you, how you spend your time.\n\n**We are learning to** explain what *career* means in Career Studies, describe how skills, strategies and habits help us succeed, and see that pathways change over time.\n\n| Unit | Big question |\n| 1 Skills and habits | What helps me succeed and stay well? |\n| 2 Financial literacy | How do I make sound money decisions? |\n| 3 Work and my profile | Who am I, and how is work changing? |\n| 4 Pathways | Where could I go after high school? |\n| 5 My plan and budget | How will I get there and pay for it? |`,
          `**Expectations:** A1.1, A2.1. **I can** define career, skill, strategy, habit and pathway in my own words, describe a Canadian whose pathway took a turn, and name two helpful habits I have and one I want to build.`),
        S('Career, pathway, skill, strategy, habit', '🧭',
          `- **Career:** everything you do in your life: school, jobs, helping, family roles. More than one job.\n- **Pathway:** your route after high school.\n- **Skill:** something you can do because you practised.\n- **Strategy:** a plan you choose on purpose.\n- **Habit:** something you do again and again without thinking.`,
          `- **Career:** the sum of a person's experiences over a lifetime: learning, paid and unpaid work, community involvement and life roles. A career is much more than one job.\n- **Pathway:** the route toward a destination after high school (apprenticeship, college, community living, university or the workplace). *Grade 11 co-op → college vet technician program → work in an animal clinic.*\n- **Skill:** an ability developed through learning and practice.\n- **Strategy:** a plan or method chosen on purpose to reach a goal or solve a problem.\n- **Habit:** something a person does regularly, often without thinking. Habits can help or hold a person back.`,
          `**Careers aren't straight lines:**\n\n| Canadian | Pathway |\n| Chris Hadfield | Air cadet → engineer → fighter pilot → astronaut (chose the goal at nine) |\n| Hayley Wickenheiser | Team Canada at 15 → four Olympic golds → medical doctor → hockey executive |\n| Roberta Bondar | Neurologist → first Canadian woman in space → nature photographer |\n| Simu Liu | Accountant → laid off → extra and stunt performer → lead actor |`,
          `**Go further:** Which of the four pathways was planned, and which changed because of a setback? What does that suggest about how firmly you should hold a plan made in Grade 10?`),
        S('Meet Maya', '🧑‍🎨',
          `> Maya is in Grade 10. People keep asking what she wants to "be." She likes art, coaches soccer and likes fixing things. She has no dream job. She thinks she is behind.\n\n**Is Maya behind?** No. Most people change jobs many times. Right now she can learn about herself and build good habits.`,
          `> Maya is in Grade 10. Relatives keep asking what she wants to "be." She likes art, coaches younger kids in soccer and enjoys fixing things, but she has no single dream job. She worries that she is already behind everyone else.\n\n**Is Maya behind? What could she do now instead of choosing one job for life?**\n\n- No. Most people change jobs and even fields several times.\n- She can learn about herself: interests, values, skills and strengths.\n- She can build skills and habits that are useful in any pathway.\n- She can explore options and choose courses that keep doors open.`,
          `**Worked example:** Devon trained as an accountant and was laid off. He took acting classes and used his budgeting skills to manage a freelance income. Skills transfer, and pathways can change.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- A **career** is my whole life of learning, work and roles. It has already started.\n- **Skills** grow with practice.\n- A **habit** is something I do again and again.\n- Careers are not straight lines.`,
          `**Copy this note into your notebook:**\n\n- A **career** is the sum of my learning, paid and unpaid work, community involvement and life roles. It has already started.\n- A **pathway** is my route after high school. Pathways change.\n- A **skill** is built by practice. A **strategy** is a plan chosen on purpose. A **habit** is done regularly, often without thinking.\n- Habit formula: **"After I ____, I will ____."**\n- One Canadian whose pathway changed: ________ (how: ________).`,
          `Add: the difference between a strategy (chosen for one goal) and a habit (automatic, repeated), with one example of each from your week.`),
        S('Try it: the habit audit', '🧪',
          `**Your experiment:**\n\n1. List 5 things you do on a school day.\n2. Mark each one **H** (helps me) or **B** (holds me back).\n3. Pick one new habit. Write: "After I ____, I will ____."\n4. Try it for 3 days. Tick each day you do it.\n\n**Exit:** "For me, success means ____."`,
          `**Your experiment: a habit audit.**\n\n1. List ten things you do on a typical school day.\n2. Mark each **H** (helps me), **B** (holds me back) or **N** (neutral).\n3. Choose one habit to build and write it as **"After I ____, I will ____."** Attach it to something you already do, and keep it small.\n4. Run it for five school days. Tick each day you did it, and note what got in the way.\n\n**Exit ticket:** "For me, success means ____." Name one habit you will start this week.`,
          `**Record your result:** days completed out of five, and one change that would make the habit easier. You will reuse this in Lesson 6 when you set SMART goals.`,
          `**Go further:** Explore Canada's nine Skills for Success and decide which two your new habit would strengthen.`)
      ],
      terms: [
        ['career', 'all of your learning, work and life roles', 'the sum of a person\'s learning, paid and unpaid work, community involvement and life roles over a lifetime'],
        ['pathway', 'your route after high school', 'the route of courses, experiences and training a person takes toward a destination after high school'],
        ['skill', 'something you can do because you practised', 'an ability that a person develops through learning and practice'],
        ['strategy', 'a plan you choose on purpose', 'a plan or method chosen on purpose to reach a goal or solve a problem'],
        ['habit', 'something you do again and again without thinking', 'something a person does regularly, often without having to think about it']
      ],
      q: [
        mc('Which statement best describes a "career" in this course?', 'The sum of a person\'s learning, work and life roles over time', ['One full-time job that a person keeps for life', 'The program a person takes after high school', 'The highest-paying job a person can get']),
        mc('Which of the following is the best example of a habit?', 'Reviewing class notes for ten minutes every evening', ['Choosing a college program', 'Being naturally good at drawing', 'Winning a scholarship']),
        mc('Priya books 30-minute homework blocks in a planner and attends extra help every Tuesday to raise her science mark. Her plan is the best example of', 'a strategy', ['a pathway', 'a career', 'a destination']),
        mc('Devon trained as an accountant, was laid off, and used his budgeting skills as a freelance actor. What does his story show?', 'Skills transfer, and pathways can change', ['Skills from one job cannot be used in another', 'People should choose one job and never change', 'A layoff means a career is over']),
        tfx('Maya\'s career has already started, because it includes school and coaching soccer.', 'A career only begins when a person gets a first full-time job.'),
        tf('Habits can help a person or hold a person back.', true),
        fill('A ___ is an ability that a person develops through learning and practice.', 'skill', ['habit', 'pathway', 'career']),
        fill('Simu Liu worked as an ___ before he was laid off and became an actor.', 'accountant', ['astronaut', 'engineer', 'athlete']),
        app('Kai wants to stop handing work in late. Which plan uses the habit formula from this lesson best?', '"After I eat dinner, I will open Google Classroom for ten minutes."', ['"I will try to be more organised this year."', '"I will do all my homework on Sunday night from now on."', '"I will stop being lazy."']),
        app('A relative tells your friend, "You are in Grade 10. You should know what you want to be by now." Which reply fits this lesson best?', 'Most people change jobs and fields, so right now I am learning about myself and keeping doors open', ['I will pick the highest-paying job today so the question goes away', 'There is no point planning because careers always change', 'My friends have not chosen either, so it does not matter']),
        app('Hayley Wickenheiser became a doctor after her hockey career. Which idea from the lesson does this show most clearly?', 'A career includes more than one role, and a second pathway can be built on earlier skills', ['Athletes cannot have careers', 'A pathway chosen at 15 can never change', 'A habit is the same as a skill'])
      ],
      rec: ['What is one helpful habit you already have?', 'two helpful habits you already have and one you want to build, written as "After I ____, I will ____."', 'A helpful habit I already have is …'],
      task: A('Habit audit and four pathways', 'A1.1, A2.1',
        ['List 5 things you do on a school day. Mark each H (helps) or B (holds me back). Then write one new habit: "After I ____, I will ____."',
         'Part 1: Complete the habit audit (ten things, marked H, B or N) and write one habit to build as "After I ____, I will ____." Part 2: Choose two of the four Canadians (Hadfield, Wickenheiser, Bondar, Liu). Write each pathway in steps and say whether it was planned or changed by a surprise.',
         'Explain how your new habit could help you at school, in your life outside school, and at work (now or later), with one example for each.',
         'What do the four pathways have in common, and what does that suggest about your own career? After five days, report how your habit experiment went.'],
        ['After I …, I will …', 'One habit that holds me back is … so my new habit is: After I …, I will …'],
        ['My list has 5 things with H or B. My new habit uses "After I …, I will …".',
         'Ten things are sorted. My habit is small, specific and attached to a routine. Two pathways are written in steps.',
         'The habit is connected to school, life and work with a specific example for each.',
         'I name what the pathways share (they change; skills carry over) and report real results from my experiment.']),
      media: [
        M(1, 'image', 'Chris Hadfield', 'A face for "careers aren\'t straight lines".', 'The Canadian Encyclopedia', 'https://www.thecanadianencyclopedia.ca/en/article/chris-hadfield'),
        M(4, 'video', 'Skills for Success videos', 'Shows the nine skills the Go further step asks about.', 'Government of Canada', 'https://www.canada.ca/en/services/jobs/training/initiatives/skills-success/video.html')
      ]
    }),

    L(2, 'Resilience and Perseverance', 'Resilience', 'A1.1', {
      slides: [
        S('Start here: something that was hard', '🎯',
          `**Think:** What can you do now that was once very hard? A sport, a game level, a language?\n\n**Today we learn:** how to bounce back and keep going.`,
          `**Minds On:** Think of something you can do now that you once found very hard: a sport, a language, an instrument, a level in a game. What kept you going when it was difficult?\n\n**We are learning to** explain why resilience and perseverance matter in school, life and work, and to adapt to change, learn from mistakes and think positively about setbacks.`,
          `**Expectation:** A1.1. **I can** define resilience, perseverance, setback, growth mindset and adaptability, rewrite a fixed-mindset statement, and describe a time I bounced back and what helped.`),
        S('Terry Fox and the words for bouncing back', '🏃',
          `**Terry Fox** lost his leg to cancer at 18. In 1980 he ran for **143 days**, about a marathon every day.\n\n- **Resilience:** bouncing back after something hard.\n- **Perseverance:** keeping going when it is hard.\n- **Setback:** something that slows you down. It is not who you are.\n- **Growth mindset:** "I can't do this **yet**."`,
          `**Terry Fox by the numbers:** age **18** when his right leg was amputated because of bone cancer · **143** days running the Marathon of Hope in 1980 · **5,373** km from St. John's to near Thunder Bay · about **42** km a day.\n\n- **Resilience:** the ability to recover from difficulty, adapt to change and keep going. It grows with practice and support.\n- **Perseverance:** continuing to work toward a goal even when it is difficult or takes a long time.\n- **Setback:** an event that slows or interrupts progress. It happens *to* a person; it does not define the person.\n- **Adaptability:** adjusting goals and behaviours when change occurs. One of Canada's nine Skills for Success.\n- **Growth mindset:** the belief that abilities can be developed through effort, good strategies and help. The opposite is a **fixed mindset**.`,
          `| Fixed mindset says… | Growth mindset says… |\n| "I'm just bad at this." | "I'm not good at this yet. What can I try?" |\n| "I failed, so I should quit." | "That attempt didn't work. What can I learn?" |\n| "She's naturally talented." | "She has practised a lot. What can I learn from her?" |\n| "Feedback means I did badly." | "Feedback shows me what to work on next." |`,
          `**Go further:** Terry did not finish his run. He stopped near Thunder Bay on September 1, 1980, when the cancer reached his lungs. Was the Marathon of Hope a failure? Build your answer around the word *perseverance*.`),
        S('Meet Jamal', '🏀',
          `> Jamal was cut from the basketball team. The same week he got 52% on a science test. He says, "Maybe I'm just not good at anything."\n\n**What could Jamal do?** Ask the coach and teacher what to work on. Make a plan. Talk to someone he trusts.`,
          `> Jamal tried out for the senior basketball team and was cut. The same week, he got 52% on a science test he had studied for. He tells a friend, "Maybe I'm just not good at anything."\n\n**What would you say to Jamal? What could he do next that shows resilience?**\n\n- A setback is an event, not who he is.\n- Ask for feedback: what does the coach want to see? What went wrong on the test?\n- Make a plan: practise the skills, go to extra help, ask about the next tryout.\n- Talk to someone he trusts. Resilient people use their supports.`,
          `**Worked example:** On her second shift at a bakery, Sofia gives the wrong change and her manager points it out. The resilient response is to ask the manager to show her the process and double-check next shift, not to avoid the cash register.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Resilience** = I bounce back.\n- **Perseverance** = I keep going.\n- A **setback** is an event. It is not me.\n- Add the word **"yet"**: "I can't do this **yet**."\n- Terry Fox: 143 days, 5,373 km.`,
          `**Copy this note into your notebook:**\n\n- **Resilience:** recover, adapt, keep going. **Perseverance:** keep working toward a goal when it is hard.\n- A **setback** is an event, not an identity.\n- **Growth mindset:** abilities grow with effort, strategies and help. **Fixed mindset:** ability cannot change.\n- **Adaptability:** adjusting when change happens.\n- Terry Fox, 1980: 143 days · 5,373 km · about 42 km a day.\n- My reframe: "I'm bad at ____" → "I'm not good at ____ **yet**. I will try ____."`,
          `Add the four-step response to a setback: name it as an event → ask for feedback → make a plan → use a support.`),
        S('Try it: catch and reframe', '🧪',
          `**Your experiment (2 days):**\n\n1. Listen to how you talk to yourself.\n2. Each time you think "I can't" or "I'm bad at…", write it down.\n3. Rewrite it with **yet**.\n\n**Exit:** Tell about one time you bounced back. What helped?`,
          `**Your experiment: catch and reframe.**\n\nFor two days, catch your own fixed-mindset thoughts. Each time you hear "I can't", "I'm bad at" or "there's no point", write the exact words, then rewrite the thought as a growth-mindset statement. Use the word "yet" at least twice.\n\n| What I told myself | My reframe |\n| "I'm terrible at presentations." | "I'm not confident presenting yet. I'll practise with a friend first." |\n\n**Exit ticket:** Describe a setback you have faced (share only what you are comfortable sharing). What did you learn? What would you do the same or differently?`,
          `**Record your result:** how many thoughts you caught, and which subject or situation they came from most. That pattern is useful for your Success Toolkit.`)
      ],
      terms: [
        ['resilience', 'bouncing back after something hard', 'the ability to recover from difficulty, adapt to change and keep going'],
        ['perseverance', 'keeping going when it is hard', 'continuing to work toward a goal even when it is difficult or takes a long time'],
        ['setback', 'something that slows you down', 'an event that slows or interrupts progress toward a goal'],
        ['growth mindset', 'believing you can get better with effort', 'the belief that abilities can be developed through effort, good strategies and help from others'],
        ['fixed mindset', 'believing you cannot get better', 'the belief that ability cannot change'],
        ['adaptability', 'changing your plan when things change', 'achieving or adjusting goals and behaviours when expected or unexpected change occurs']
      ],
      q: [
        mc('Which statement shows a growth mindset?', '"I can improve my writing if I use the feedback."', ['"Some people are just born leaders."', '"If I have to try hard, I must not be smart."', '"I\'ll never be a good writer."']),
        mc('Which is the best example of perseverance?', 'Practising a presentation daily for two weeks after a poor first try', ['Choosing the easiest topic to avoid mistakes', 'Waiting for a friend to finish the group project', 'Dropping a course after the first difficult quiz']),
        mc('Sofia gives a customer the wrong change on her second shift. Which response best shows resilience?', 'Ask the manager to show her the process and double-check next shift', ['Avoid working the cash register from now on', 'Blame the customer for rushing her', 'Quit so that it cannot happen again']),
        mc('Liam\'s family moves to a new city mid-semester. Which action best shows adaptability?', 'Meeting the guidance counsellor to plan courses and joining one club', ['Waiting for other students to approach him', 'Not doing homework because the courses are different', 'Refusing to attend until he can move back']),
        mc('Terry Fox\'s Marathon of Hope is often used as an example of', 'perseverance in the face of adversity', ['school/life/work balance', 'a decision matrix', 'a fixed mindset']),
        tfx('Terry Fox ran for 143 days in 1980.', 'Terry Fox finished his run across Canada in Vancouver.'),
        tfx('A setback is an event. It does not define the person.', 'Resilience is something a person is born with and cannot practise.'),
        fill('"I\'m not good at this ___" is a growth-mindset way to talk about something hard.', 'yet', ['ever', 'now', 'never']),
        fill('Terry Fox ran about ___ kilometres a day.', '42', ['4', '143', '500']),
        app('A new cashier learns that her store is bringing in self-checkout machines. Which response shows adaptability and would most help her career?', 'Learn to troubleshoot the machines and offer to train new staff', ['Refuse to go near the machines', 'Wait to be laid off', 'Tell customers the machines are broken']),
        app('Jordan failed a test, was benched and had hours cut in the same month, and says, "Nothing I do works." Which reply is the strongest growth-mindset reframe?', '"These three things didn\'t go well. What can I learn, and what can I try next?"', ['"Next month will probably be better by itself."', '"I should stick to things I am already good at."', '"Everyone else has it easier than me."']),
        app('Which action turns a low mark into a use of resilience?', 'Asking the teacher what went wrong and booking extra help before the next test', ['Deciding the teacher marks unfairly', 'Hiding the mark and hoping it averages out', 'Dropping the course the same day'])
      ],
      rec: ['What is one thing you are not good at YET?', 'one fixed-mindset thought you sometimes have, and your growth-mindset reframe using "yet".', 'I am not good at … yet. I will try …'],
      task: A('Reframe it and my resilience story', 'A1.1',
        ['Rewrite these with the word "yet": (1) "I\'m terrible at presentations." (2) "I\'ll never understand fractions." Then tell about one time you bounced back.',
         'Part 1: Rewrite four fixed-mindset statements as growth-mindset statements, using "yet" at least twice: "I\'m terrible at presentations." / "I got cut, so I\'m not an athlete." / "My manager corrected me. I\'m bad at this job." / "There\'s no point in trying. I\'ll just fail." Part 2: Describe a setback you faced and what helped you get through it. Share only what you are comfortable sharing.',
         'Explain how being resilient could help you in school, in your personal life and at work. Give one example for each.',
         'Name two setbacks Terry Fox faced and how he responded to each. Then argue whether the Marathon of Hope was a failure, using "perseverance" or "resilience".'],
        ['I\'m not good at … yet. One time I bounced back was when …', 'A setback I faced was … What helped me was …'],
        ['Two sentences use "yet". I told one bounce-back story.',
         'Four reframes connect improvement to effort, strategy or help. My story names at least one support or strategy and one thing I learned.',
         'One specific example each for school, life and work.',
         'Terry\'s setbacks and responses are accurate (cancer and amputation; pain and weather; cancer returning), and my argument uses the key term.']),
      media: [
        M(1, 'video', 'Heritage Minute: Terry Fox', 'One minute that shows what perseverance looked like.', 'Historica Canada', 'https://www.historicacanada.ca/productions/minutes/terry-fox'),
        M(1, 'video', 'Carol Dweck: The power of believing that you can improve', 'Explains growth mindset and the word "yet".', 'TED', 'https://www.youtube.com/watch?v=_X0mgOOSpLU')
      ]
    }),

    L(3, 'Managing Stress and Finding Balance', 'Stress & Balance', 'A1.2', {
      slides: [
        S('Start here: what stresses me', '🎯',
          `**Think:** Name 3 things that stress you: one at school, one at home, one from work or sports. Rate each 1 (small) to 5 (big).\n\n**Today we learn:** healthy ways to handle stress.`,
          `**Minds On:** List three things that cause you stress: one at school, one at home and one from work, sports or activities. Rate each from 1 (mild) to 5 (intense).\n\n**We are learning to** identify strategies to manage stress and keep a healthy school/life/work balance, and to recognize signs that stress is becoming a problem.`,
          `**Expectation:** A1.2. **Canadian data** (Statistics Canada, The Daily, September 10, 2024): **12%** of youth aged 12 to 17 rated their mental health "fair" or "poor" in 2019. By 2023, **26%** of the same young people (then 16 to 21) gave that rating. About **1 in 5** who said "good" or better in 2019 had dropped to "fair" or "poor".`),
        S('Stress, stressors and coping', '🌡️',
          `- **Stress:** how your body and mind react to pressure. A little can help. Too much hurts.\n- **Stressor:** the thing that causes stress.\n- **Coping strategy:** what you do to handle stress.\n- **Balance:** enough time for school, work, people, health and rest.`,
          `- **Stress:** the response of the body and mind to demands or pressure. Some stress is normal and can help a person focus. Too much, for too long, can harm health.\n- **Stressor:** any event, situation or demand that causes stress (three tests in one week, an argument, a new job).\n- **Coping strategy:** an action taken to manage stress. **Healthy** strategies deal with the stress. **Unhealthy** ones only hide it for a while or make it worse.\n- **School/life/work balance:** dividing time and energy among school, paid work, relationships, health and rest in a way a person can keep up over time.\n\n**A strategy toolkit**\n\n| Body | Mind | Time | People |\n| Move every day, protect sleep, eat regularly, slow your breathing | Positive self-talk, realistic expectations, nature or creative time | Use a planner, break big tasks into steps, avoid overcommitting | Time with friends and family, talk to an adult you trust |`,
          `**Signs that stress is becoming a problem:** *Body:* trouble sleeping, headaches, stomach aches. *Feelings:* irritable, overwhelmed or hopeless on most days. *Thinking:* constant worry, trouble concentrating, harsh self-talk. *Behaviour:* avoiding tasks, pulling away from friends. **If signs last for weeks or get in the way of daily life, it is time to talk to someone.**`),
        S('Meet Aaliyah', '🏒',
          `> Aaliyah is in Grade 10. She works 15 hours a week, plays rep hockey and has 3 assignments due. She sleeps 5 hours a night. She gets headaches. She snapped at her best friend.\n\n**Signs of stress:** little sleep, headaches, snapping.\n\n**Two changes:** plan each assignment in steps, and ask her manager for fewer shifts next week.`,
          `> Aaliyah is in Grade 10. She works 15 hours a week at a grocery store, plays rep hockey and has three assignments due next week. She is sleeping about five hours a night, gets headaches and snapped at her best friend yesterday.\n\n**Which signs of stress do you notice? What two changes could she make this week?**\n\n- Signs: little sleep and headaches (body), snapping at a friend (feelings and behaviour).\n- Time: list every deadline, break the assignments into steps and plan when to do each.\n- Balance: ask her manager for fewer or different shifts next week, with advance notice.\n- People: tell a parent, coach or teacher what she is juggling and ask for support.`,
          `**Worked example:** Noah has two tests Thursday and a shift Wednesday 5 to 9 p.m. It is Sunday. Best strategy: ask his manager **today** to trade the shift, and plan study blocks. He plans ahead, communicates responsibly at work and protects his sleep.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Stress** = my body and mind reacting to pressure.\n- A **stressor** causes it.\n- Healthy coping: **move, sleep, plan, talk**.\n- If signs last for **weeks**, I ask for help.`,
          `**Copy this note into your notebook:**\n\n- **Stress:** the body and mind's response to pressure. Short-term stress can help; long-term stress harms.\n- **Stressor:** what causes it.\n- **Healthy coping** deals with the stress. **Unhealthy coping** hides it.\n- Toolkit: **Body** (move, sleep, eat, breathe) · **Mind** (self-talk, realistic expectations) · **Time** (planner, steps) · **People** (friends, trusted adult).\n- Time to ask for help: signs that last for **weeks** or get in the way of daily life.`,
          `Add the Canadian data: fair or poor mental health went from 12% (2019, ages 12 to 17) to 26% (2023, the same people at 16 to 21).`),
        S('Try it: my balance wheel', '🧪',
          `**Your experiment:**\n\n1. Rate each area 0 to 10: School, Sleep, Family, Friends, Activity, Downtime.\n2. Circle the lowest one.\n3. Write one small change for this week.\n4. In one week, rate it again. Did the number go up?\n\n**Exit:** One coping strategy that works for me is ____.`,
          `**Your experiment: the balance wheel.**\n\n1. Rate how satisfied you are with each area this month, from 0 (not at all) to 10 (very): **School · Sleep · Family · Friends · Physical activity · Work or volunteering · Hobbies · Downtime.**\n2. Find the area most out of balance.\n3. Write one small, specific change for this week (what, when, how often).\n4. For three nights, also record your **hours of sleep** and your **stress rating (1 to 5)**. Do the numbers move together?\n5. Re-rate the area in one week.\n\n**Exit ticket:** One coping strategy that has worked for me, one new one I will try, and one sign that would tell me it is time to ask for help.`,
          `**Record your result:** before and after ratings, and your three nights of sleep and stress numbers.`,
          `**Go further:** Suggest two possible reasons for the change in the Statistics Canada figures between 2019 and 2023, and say what evidence would support each.`)
      ],
      terms: [
        ['stress', 'how your body and mind react to pressure', 'the response of the body and mind to demands or pressure'],
        ['stressor', 'something that causes stress', 'any event, situation or demand that causes stress'],
        ['coping strategy', 'what you do to handle stress', 'an action a person takes to manage stress'],
        ['balance', 'enough time for school, work, people and rest', 'dividing time and energy among school, work, relationships, health and rest in a way a person can keep up'],
        ['overcommitting', 'saying yes to too many things', 'taking on more tasks or activities than time and energy allow']
      ],
      q: [
        mc('Which is a sign that stress may be becoming a problem?', 'Trouble sleeping and avoiding friends for several weeks', ['Feeling nervous just before a presentation', 'Feeling tired after a hard practice', 'Being excited on the first day of a job']),
        mc('Which of the following is a healthy coping strategy?', 'Breaking a project into steps and taking a walk between them', ['Avoiding the task until the night before', 'Keeping everything to yourself', 'Staying up late on a phone to forget about it']),
        mc('For three weeks Mei has had stomach aches every morning, cannot sleep, has stopped seeing friends and has missed four days of school. What is the best next step?', 'Talk to a trusted adult, such as a parent or guidance counsellor', ['Wait and see whether it goes away', 'Quit her activities permanently', 'Drink more coffee to get through the day']),
        mc('Noah has two tests on Thursday and a shift on Wednesday from 5 to 9 p.m. It is Sunday. Which strategy best protects his balance?', 'Ask his manager today to trade the shift, and plan study blocks', ['Study from 9 p.m. to 3 a.m. after his shift', 'Call in sick on Wednesday afternoon', 'Skip studying and hope the tests are easy']),
        tfx('Some stress is normal and can help a person focus.', 'All stress is harmful and should be avoided completely.'),
        tfx('A healthy coping strategy deals with the stress.', 'Scrolling until 2 a.m. to avoid thinking about a problem is a healthy coping strategy.'),
        fill('Three tests in one week is an example of a ___.', 'stressor', ['strategy', 'balance', 'habit']),
        fill('If signs of stress last for ___, it is time to talk to someone.', 'weeks', ['minutes', 'seconds', 'one hour']),
        app('Sam joins robotics on Tuesdays and Thursdays, already works two shifts and wants to raise a 64% science mark. After a month Sam has headaches and is falling further behind. What is the best response?', 'Ask the manager to change a shift and use a planner to protect study time and sleep', ['Keep everything the same and try harder', 'Stop sleeping as much to fit it all in', 'Quit school activities for good without telling anyone']),
        app('In 2019, 12% of Canadian youth aged 12 to 17 rated their mental health fair or poor. In 2023, 26% of the same young people did. What is the most reasonable conclusion?', 'The years after Grade 10 are demanding, so coping skills learned now matter', ['Stress disappears after high school', 'Young people in 2023 were less intelligent', 'Nothing changed between the two surveys']),
        app('Which plan best shows school/life/work balance during exams?', 'Limiting shifts to 10 hours a week so there is time to study, sleep and see friends', ['Working extra shifts and studying after midnight', 'Dropping every activity, including sleep, until exams end', 'Ignoring exams to keep the same work hours'])
      ],
      rec: ['What is one healthy thing you do when you feel stressed?', 'your three main stressors (school, home, work or activities) rated 1 to 5, and one strategy from each toolkit box that you would use.', 'When I feel stressed, one healthy thing I do is …'],
      task: A('My balance wheel and coping plan', 'A1.2',
        ['Rate 6 areas of your life from 0 to 10 (School, Sleep, Family, Friends, Activity, Downtime). Which is lowest? Write one small change for this week.',
         'Rate the eight balance-wheel areas from 0 to 10. Name the area most out of balance and one small, specific change you will make this week. Then describe one coping strategy you have used before (did it work?) and one new strategy you will try, and when.',
         'List the signs that would tell you your stress is becoming a problem and that it is time to ask for help. Explain why your past strategy did or did not work.',
         'Report your experiment: three nights of sleep hours and stress ratings, and your re-rating after one week. What pattern do you see, and what will you change because of it?'],
        ['My lowest area is … This week I will …', 'The area most out of balance is … My change this week is …'],
        ['Six areas are rated. One small change is written.',
         'Eight areas rated; the change says what, when and how often; one past and one new strategy are described.',
         'Signs are ones that last for weeks or interfere with daily life (sleep, attendance, friendships).',
         'Real numbers are reported and a pattern or conclusion is drawn from them.']),
      media: [
        M(0, 'image', 'Youth mental health chart, 2019 and 2023', 'A bar chart makes the 12% → 26% change visible.', 'Statistics Canada, The Daily (Sept. 10, 2024)', 'https://www150.statcan.gc.ca/n1/daily-quotidien/240910/dq240910a-eng.htm'),
        M(1, 'video', 'Kelly McGonigal: How to make stress your friend', 'Supports the idea that some stress can help.', 'TED', 'https://www.youtube.com/watch?v=RcGyVTAoXEU')
      ]
    }),

    L(4, 'Mental Health Supports: Who Can Help?', 'Who Can Help?', 'A1.3', {
      slides: [
        S('Start here: a friend needs help', '🎯',
          `**Think:** A friend says they have felt really down for weeks. What would you say? Who could help?\n\n**Today we learn:** who can help, and exactly how to reach them.`,
          `**Minds On:** A friend tells you they have felt really down for weeks. What would you say? Who could you go to for help, at school and outside school?\n\n**We are learning to** identify people, resources and services at school and in the community that support mental health, describe how to reach each one, and know what to do when a friend needs help.`,
          `**Expectation:** A1.3. **I can** name three school supports and three community supports, explain the exact steps to reach one, and explain why a friend's safety matters more than a secret.`),
        S('The words, and supports at school', '🏫',
          `- **Mental health:** how you think, feel and cope. Everyone has it.\n- **Support:** a person or service that helps.\n- **Help-seeking:** asking for help. It is a strength.\n- **Stigma:** unfair ideas that make people afraid to ask.\n- **Confidentiality:** what you say stays private, unless someone is not safe.\n\n**At school:** guidance counsellor, a teacher or coach you trust, the principal.`,
          `- **Mental health:** a state of well-being that affects how people think, feel, act and cope with life. Everyone has mental health, and it changes over time, like physical health.\n- **Support:** a person, resource or service that helps someone look after their well-being or get through a difficult time.\n- **Help-seeking:** reaching out when something is too much to handle alone. It is a skill and a sign of strength.\n- **Stigma:** negative attitudes or beliefs about mental health concerns that can make people afraid or ashamed to ask for help.\n- **Confidentiality:** keeping what a person shares private. School supports keep conversations private, except when someone's safety is at risk. Then they must get more help.\n\n**Supports at school:** guidance counsellor (book in the guidance office) · student services staff (child and youth worker, social worker, mental health worker) · a trusted adult (teacher, coach, chaplain, educational assistant) · principal or vice-principal.`,
          `**How to reach out, in four steps:** (1) Notice and name it: "I've felt overwhelmed for a few weeks and it isn't going away." (2) Choose a support you feel comfortable with. (3) Start the conversation: "I haven't been feeling like myself. Can I talk to you?" (4) Follow up. If the first person can't help, try another.`),
        S('Supports in the community: save these', '☎️',
          `| Service | How to reach it |\n| Kids Help Phone | Call 1-800-668-6868 or text CONNECT to 686868 |\n| 9-8-8 Suicide Crisis Helpline | Call or text 9-8-8 |\n| Family doctor | Book a visit |\n\n**If someone is in danger right now, call 9-1-1.**\n\n> Daniel's friend Chris said, "What's the point of anything?" and made Daniel promise not to tell.\n\n**Should Daniel keep the promise? No.** A friend's safety matters more than a secret. He tells a trusted adult today.`,
          `| Service | How to reach it | Use it when… |\n| Kids Help Phone | Call 1-800-668-6868 or text CONNECT to 686868 | You want to talk about anything. 24 hours a day, free |\n| 9-8-8 Suicide Crisis Helpline | Call or text 9-8-8 | You or someone you know is thinking about suicide. 24 hours a day |\n| Hope for Wellness Helpline | Call 1-855-242-3310 | Support for Indigenous people across Canada. 24 hours a day |\n| ConnexOntario | Call 1-866-531-2600 | You want to find mental health or addiction services in Ontario |\n| Family doctor or nurse practitioner | Book an appointment or visit a walk-in clinic | A concern keeps going |\n\n**If someone is in immediate danger, call 9-1-1.**\n\n> Daniel's friend Chris has stopped coming to lunch and is not answering texts. Yesterday Chris said, "What's the point of anything?" and made Daniel promise not to tell anyone.\n\n**Should Daniel keep his promise?** No. A friend's safety matters more than keeping a secret. He should tell a trusted adult today, tell Chris he cares and share Kids Help Phone and 9-8-8, call 9-1-1 if there is immediate danger, and look after himself too.`,
          `**Worked example:** It is 11:30 p.m. Sam feels overwhelmed, is not in danger, and everyone at home is asleep. Best fit: text CONNECT to 686868 (Kids Help Phone, free, 24 hours). 9-1-1 is for immediate danger; guidance next week is too far away for tonight.`),
        S('Write this down', '📝',
          `**Copy this note (keep it where you can find it):**\n\n- Kids Help Phone: **1-800-668-6868** or text **CONNECT to 686868**\n- Suicide Crisis Helpline: call or text **9-8-8**\n- Danger right now: **9-1-1**\n- At school: guidance office, room ____\n- A friend's **safety** matters more than a **secret**.`,
          `**Copy this note into your notebook (and save the numbers in your phone):**\n\n- Kids Help Phone: **1-800-668-6868** or text **CONNECT to 686868** (anything, 24 hours)\n- Suicide Crisis Helpline: call or text **9-8-8**\n- Hope for Wellness: **1-855-242-3310** · ConnexOntario: **1-866-531-2600**\n- Immediate danger: **9-1-1**\n- At school: guidance counsellor (room ____), trusted adult: ________\n- **Help-seeking** is a skill. **Stigma** is what stops people. **Confidentiality** has one limit: safety.\n- A friend's safety matters more than a secret.`,
          `Add the four steps: notice and name it → choose a support → start the conversation → follow up.`),
        S('Try it: my support map', '🧪',
          `**Your experiment:**\n\n1. Draw 3 rings.\n2. Ring 1: 2 people I trust.\n3. Ring 2: 2 supports at school (find the room number).\n4. Ring 3: 2 supports in the community (write the phone number).\n5. Check one: walk past the guidance office, or save a number in your phone.\n\n**Exit:** One school support and one community support, and how I reach each.`,
          `**Your experiment: build and test a support map.**\n\n| Ring | Who or what | How I reach them |\n| 1. People I trust | at least two | |\n| 2. Supports at school | at least two | room number or booking steps |\n| 3. Supports in the community | at least two | phone number or website |\n\n**Test it:** verify one detail for real today. Find the guidance office and how to book, or save Kids Help Phone and 9-8-8 as contacts in your phone.\n\n**Exit ticket:** Name one support at school and one in the community. For each, describe exactly how you would reach it.`,
          `**Record your result:** which detail you verified and what you found out (room, hours, how booking works).`,
          `**Go further:** Write the first two sentences you would say to a trusted adult if you needed help yourself. Then explain how stigma might stop someone from saying them, and one thing a school could do about it.`)
      ],
      terms: [
        ['mental health', 'how you think, feel and cope', 'a state of well-being that affects how people think, feel, act and cope with life'],
        ['support', 'a person or service that helps', 'a person, resource or service that helps someone look after their well-being or get through a difficult time'],
        ['help-seeking', 'asking for help when it is too much', 'reaching out to a person or service when something is too much to handle alone'],
        ['stigma', 'unfair ideas that make people afraid to ask for help', 'negative attitudes or beliefs about mental health concerns that can make people afraid or ashamed to ask for help'],
        ['confidentiality', 'keeping what someone says private', 'keeping what a person shares private, unless someone\'s safety is at risk']
      ],
      q: [
        mc('Which service can a person in Canada reach by calling or texting 9-8-8?', 'The Suicide Crisis Helpline', ['ConnexOntario', 'The school attendance office', 'Directory assistance']),
        mc('It is 11:30 p.m. Sam feels overwhelmed and cannot sleep. Sam is not in danger but wants to talk to someone now. Which support fits best?', 'Text CONNECT to 686868 to reach Kids Help Phone', ['Wait to book the guidance counsellor next week', 'Call 9-1-1', 'Post about it on social media']),
        mc('Which of the following is a school-based support?', 'A guidance counsellor', ['ConnexOntario', 'Kids Help Phone', 'A walk-in clinic']),
        mc('For a month, Hannah has felt sick with worry before every presentation, and this week she skipped two classes. What is the best first step?', 'Talk to her teacher or guidance counsellor about what is happening', ['Wait until the end of the semester', 'Drop the course without telling anyone', 'Keep skipping until presentations are over']),
        mc('If someone is in immediate danger, what number should you call?', '9-1-1', ['9-8-8', '1-866-531-2600', '4-1-1']),
        tfx('A friend\'s safety matters more than keeping a secret.', 'Daniel should keep his promise to Chris, because a promise always comes first.'),
        tfx('Everyone has mental health, and it can change over time.', 'A school counsellor will keep everything private even if a student might be harmed.'),
        fill('Negative attitudes that make people ashamed to ask for help are called ___.', 'stigma', ['support', 'criteria', 'balance']),
        fill('___ means reaching out when something is too much to handle alone.', 'Help-seeking', ['Stigma', 'Confidentiality', 'Overcommitting']),
        app('A Grade 9 student says, "I\'ve been really stressed for weeks and I don\'t know who to talk to." Which answer gives the most useful help?', 'Book a time in the guidance office, and you can also call Kids Help Phone at 1-800-668-6868 any time', ['Everyone is stressed, it will pass', 'Search online and see what comes up', 'Tell nobody, in case people judge you']),
        app('A friend who lives in northern Ontario and is First Nations wants culturally safe support by phone tonight. Which service from the lesson is designed for this?', 'Hope for Wellness Helpline, 1-855-242-3310', ['The school attendance office', 'A car insurance line', 'Directory assistance']),
        app('You told a teacher you were struggling and the teacher was too busy to help that day. According to the four steps, what do you do next?', 'Follow up: try another support and keep going until you get help', ['Decide that asking for help does not work', 'Wait until someone notices', 'Apologise for asking'])
      ],
      rec: ['Who is one adult at school you could talk to?', 'the name or role of one school support and exactly how you would reach it (room, booking steps).', 'One adult at school I could talk to is …'],
      task: A('My support map', 'A1.3',
        ['Draw 3 rings. Write 2 people you trust, 2 supports at school and 2 supports in the community. Add a phone number or room for each.',
         'Complete your support map: at least two people you trust, two supports at school and two supports in the community. For every school and community support, write exactly how to reach it (room, phone number, website or hours).',
         'Answer the Daniel and Chris scenario: should Daniel keep his promise? List three things he should do.',
         'Write the first two sentences you could say to a trusted adult if you needed help yourself, and report which detail on your map you verified for real.'],
        ['Two people I trust are … At school I can go to …', 'At school I can reach … by … In the community I can reach … by …'],
        ['Six supports are listed. Each has a room or a number.',
         'Six or more supports, each with accurate, specific contact details.',
         'Daniel tells a trusted adult today, shares Kids Help Phone and 9-8-8 with Chris, calls 9-1-1 if there is immediate danger, and looks after himself.',
         'My opening sentences name the problem and ask to talk. One real detail was checked.']),
      media: [
        M(2, 'image', 'Kids Help Phone contact card', 'Students should recognise the service and its number.', 'Kids Help Phone', 'https://kidshelpphone.ca/'),
        M(1, 'image', 'School Mental Health Ontario student page', 'Shows where Ontario students can read more.', 'School Mental Health Ontario', 'https://smho-smso.ca/students/')
      ]
    }),

    L(5, 'Decision-Making Strategies', 'Decisions', 'A2.1', {
      slides: [
        S('Start here: five decisions already', '🎯',
          `**Think:** Name 3 choices you made before class today. Which one needed real thinking?\n\n**Today we learn:** ways to make a good decision.`,
          `**Minds On:** List five decisions you made before you arrived in this class today. Which ones took real thought? Which were automatic? What made the difference?\n\n**We are learning to** use decision-making strategies and choose the one that fits the decision.`,
          `**Expectation:** A2.1. **I can** define decision, option, consequence, values and criteria, use the DECIDE model, and build a decision matrix.`),
        S('Four strategies and the DECIDE model', '🧩',
          `- **Decision:** a choice between options.\n- **Consequence:** what happens because of a choice.\n- **Values:** what matters most to you.\n- **Criteria:** what you use to compare options.\n\n**Ways to decide:** pros and cons list · decision matrix (give scores) · ask people and find facts · values check.`,
          `- **Decision:** a choice made between two or more **options** (also called alternatives) after thinking about them.\n- **Consequence:** a result of a choice, positive or negative, short-term or long-term.\n- **Values:** the things that matter most to a person and guide how they want to live.\n- **Criteria:** the standards a person uses to compare options. One standard is a criterion.\n\n**Four strategies:** **pros and cons list** · **decision matrix** (score each option against your criteria and add the totals) · **ask and research** (find facts; talk to people who have made a similar choice) · **values check** (which option fits what matters most to me? how will I feel in a year?).\n\n| | Step | Ask yourself |\n| D | Define the decision | What exactly do I need to decide, and by when? |\n| E | Explore the options | What are all my choices? |\n| C | Consider the consequences | What could happen, soon and later? |\n| I | Identify my values | Which option fits what matters most? |\n| D | Decide and act | What is my choice, and my first step? |\n| E | Evaluate the result | How did it go? What would I change? |`,
          `**Worked example:** Ava applies to a college program because her best friend is going, without looking at other programs or asking what she wants. She skipped **Explore the options** and **Identify my values**.`),
        S('Meet Chloe', '🎼',
          `> Chloe must pick her Grade 11 courses by Friday. She loves music. She is curious about co-op at a vet clinic. Her 3 best friends picked a different course.\n\n| What matters (1 to 5) | Music | Co-op | Friends' course |\n| My interest | 5 | 4 | 2 |\n| Helps my future | 3 | 5 | 2 |\n| Total | 8 | 9 | 4 |\n\nShe should **not** choose only because of her friends.`,
          `> Chloe must choose her Grade 11 courses by Friday. She loves music and is curious about a co-op placement at a veterinary clinic. Her three closest friends all chose a different elective. She cannot fit everything in.\n\n**Chloe's decision matrix**\n\n| Criteria (score 1 to 5) | Music | Co-op | Friends' elective |\n| My interest | 5 | 4 | 2 |\n| Helps my future pathway | 3 | 5 | 2 |\n| Fits my timetable | 4 | 4 | 5 |\n| **Total** | **12** | **13** | **9** |\n\nA matrix **informs** the decision. With totals this close, Chloe should also do a values check. She should not decide only because of what her friends chose: their values and pathways are different. She can ask guidance, the co-op teacher and a student who did co-op last year.`,
          `**Worked example (Marcus):** Job A pays $18.50 an hour, is 40 minutes away by bus and needs him every Saturday, when he plays hockey. Job B pays $17.75, is a ten-minute walk and has flexible shifts. At 10 hours a week, Job A pays 10 × $0.75 = **$7.50** more. Marcus values hockey and his marks, so Job B fits: pay is only one criterion.`,
          `**Go further:** When a matrix produces a tie, which criterion should count double? Add a weight column to Chloe's matrix and see whether the result changes.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **D**efine it\n- **E**xplore options\n- **C**onsider what could happen\n- **I**dentify my values\n- **D**ecide and act\n- **E**valuate\n\nA good decision fits **my** values, not my friends'.`,
          `**Copy this note into your notebook:**\n\n- **DECIDE:** Define the decision → Explore the options → Consider the consequences → Identify my values → Decide and act → Evaluate the result.\n- **Criteria** are the standards I compare options with (cost, interest, time).\n- **Decision matrix:** options across the top, criteria down the side, score 1 to 5, add the totals.\n- Four strategies: pros and cons · matrix · ask and research · values check.\n- A matrix informs the decision. It does not make it for me.`,
          `Add: consequences can be **short-term** or **long-term**, and a strong decision names one of each.`),
        S('Try it: a matrix for a real choice', '🧪',
          `**Your experiment:**\n\n1. Pick a real choice you have this week (2 options).\n2. Write 2 things that matter (like cost, fun, time).\n3. Give each option a score from 1 to 5.\n4. Add them up. Does the winner feel right?\n\n**Exit:** One decision I will face this year is ____.`,
          `**Your experiment: run a decision matrix on a real choice.**\n\n1. Choose a real decision you face this week or this month, with two or three options.\n2. Write three criteria that matter to **you**.\n3. Score each option 1 (poor) to 5 (excellent) and total the columns.\n4. Do a values check on the winner: does it fit what matters most to me?\n5. After you act, **evaluate**: how did it go?\n\n**Exit ticket:** Describe one decision you will face this year. Which strategy will you use, and why does it fit?`,
          `**Record your result:** your matrix, the option you chose and, later, your evaluation. You will use this strategy to choose your four goals in Lesson 6.`)
      ],
      terms: [
        ['decision', 'a choice between options', 'a choice made between two or more options after thinking about them'],
        ['option', 'one of the choices you could make', 'one of the possible choices; also called an alternative'],
        ['consequence', 'what happens because of a choice', 'a result of a choice, positive or negative, short-term or long-term'],
        ['values', 'the things that matter most to you', 'the things that matter most to a person and guide how they want to live'],
        ['criteria', 'what you use to compare options', 'the standards a person uses to compare options']
      ],
      q: [
        mc('In a decision matrix, the criteria are', 'the standards used to compare the options', ['the options a person is choosing between', 'the final choice', 'the people who give advice']),
        mc('In the DECIDE model, what is the final step?', 'Evaluate the result', ['Explore the options', 'Identify my values', 'Define the decision']),
        mc('Chloe\'s three friends all chose the same elective. Why should that not be her only reason for choosing it?', 'Her friends\' values and pathways are different from hers', ['She should never take a course with friends', 'Electives do not matter', 'Friends always choose badly']),
        mc('Ava applies to a college program because her best friend is going. She has not looked at other programs or asked herself what she wants. Which DECIDE steps did she skip?', 'Explore the options and identify her values', ['Define the decision', 'Decide and act', 'She did not skip any steps']),
        mc('Job A pays $18.50 an hour and Job B pays $17.75. If Marcus works 10 hours a week, how much more does Job A pay each week?', '$7.50', ['$0.75', '$75.00', '$185.00']),
        tfx('A consequence can be positive or negative.', 'In a decision matrix, the option with the highest total must always be chosen, even if it does not fit your values.'),
        fill('The things that matter most to a person are called ___.', 'values', ['criteria', 'options', 'totals']),
        fill('The first step of the DECIDE model is to ___ the decision.', 'define', ['evaluate', 'ignore', 'copy']),
        app('Sam scores three options in a matrix and two of them tie at 11. What is the best next move?', 'Do a values check to see which tied option fits what matters most', ['Flip a coin and never think about it again', 'Pick the option a friend prefers', 'Give up on deciding']),
        app('You are choosing between two part-time jobs. Which set of criteria is most useful?', 'Pay, travel time, and whether the shifts fit school and activities', ['Which uniform colour is nicer', 'Which manager has the better car', 'Which job your cousin once had']),
        app('Two months after choosing a course, you find it is not working. Which DECIDE step are you using when you meet guidance to ask about changes?', 'Evaluate the result', ['Define the decision', 'Explore the options for the first time', 'Identify someone to blame'])
      ],
      rec: ['What is one choice you have to make this week?', 'one real decision you will face this year and the three criteria you would use to compare your options.', 'One choice I have to make this week is …'],
      task: A('Marcus\'s two jobs and my decision', 'A2.1',
        ['Marcus has two job offers. Job A pays more but is far away and clashes with hockey. Job B pays a bit less but is close and flexible. Marcus loves hockey. Which job should he take? Why?',
         'Marcus: Job A pays $18.50 an hour, is 40 minutes away by bus and needs him every Saturday, when he plays hockey. Job B pays $17.75, is a ten-minute walk and has flexible shifts. He values hockey and keeping up his marks. (1) Make a pros and cons list for each job. (2) Score both jobs 1 to 5 for pay, travel time, fits hockey and leaves time for school, and total them. (3) Which job should he choose?',
         'Show the pay difference for a 10-hour week and explain whether it is enough to change your advice. Justify your choice using Marcus\'s values.',
         'Now describe one real decision you will face this year. Which strategy will you use, and why does that strategy fit this decision better than the others?'],
        ['Marcus should take Job … because …', 'Marcus should choose Job … because it fits his values of …'],
        ['I chose a job and gave one reason about hockey or travel.',
         'Pros and cons for both jobs; a completed matrix with totals (about 10 for A and 18 for B); a clear choice.',
         '10 × $0.75 = $7.50 a week is shown, and the choice is tied to hockey and marks.',
         'A specific decision, a named strategy and a reason for the fit (for example, a matrix for several options with several criteria).']),
      media: [
        M(1, 'image', 'DECIDE model poster', 'A visual of the six steps helps students remember the order.', 'alis CAREERinsite (Government of Alberta)', 'https://alis.alberta.ca/careerinsite/make-your-decision/'),
        M(2, 'image', 'Course selection screen', 'Shows where a real Grade 11 course decision is made.', 'myBlueprint', 'https://myblueprint.ca/')
      ]
    }),

    L(6, 'Setting, Tracking and Revising Goals', 'SMART Goals', 'A2.1, A2.2', {
      slides: [
        S('Start here: a goal or a wish?', '🎯',
          `**Think:** "A goal without a plan is just a wish." Do you agree? Think of one goal you reached. What made it work?\n\n**Today we learn:** how to write a SMART goal and keep track of it.`,
          `**Minds On:** "A goal without a plan is just a wish." Do you agree? Think of a goal you reached, in or out of school. What made it work?\n\n**We are learning to** set SMART goals, track them, reflect and revise them.\n\n**Four kinds of goals:** **Personal** (health, habits, hobbies, money) · **Social** (relationships and community) · **Educational** (courses, marks, learning skills) · **Career/Life** (experience and pathways).`,
          `**Expectations:** A2.1, A2.2. Today's four goals start your **Goal Journal**, which you revisit at the end of every unit.`),
        S('What makes a goal SMART?', '🥅',
          `| | Means | Ask |\n| S | Specific | What exactly will I do? |\n| M | Measurable | How will I know I did it? |\n| A | Achievable | Can I really do it? |\n| R | Relevant | Why does it matter to me? |\n| T | Time-bound | By when? |\n\n**Not SMART:** "Save some money."\n**SMART:** "Save $15 a week for 16 weeks to have $240 for a class trip."`,
          `- **Goal:** something a person decides to achieve and is willing to work toward.\n- **SMART goal:** Specific, Measurable, Achievable, Relevant and Time-bound.\n- **Action step:** a small, concrete task that moves a person toward a goal. Good plans also name an **obstacle** and how to handle it.\n- **Reflection:** thinking carefully about what happened, what worked, what did not and what to do next. Reflection leads to **revising** a goal.\n\n| | Means | Ask yourself |\n| S | Specific | What exactly will I do? |\n| M | Measurable | How will I know I have done it? |\n| A | Achievable | Is it realistic with my time and resources? |\n| R | Relevant | Why does this matter to me? |\n| T | Time-bound | By when? |\n\n| Vague goal | SMART goal |\n| "Get better at math." | "Raise my math mark from 68% to 75% by the midterm report by attending extra help every Tuesday." |\n| "Save some money." | "Save $15 a week from my paycheque so that I have $240 for a class trip in 16 weeks." |\n| "Be more involved." | "Attend the first three meetings of the robotics club this month and then decide whether to stay." |`,
          `**The goal cycle:** set a SMART goal → act on your first action step within **48 hours** → track progress every week → reflect → revise the goal, the timeline or the strategy, then act again.`),
        S('Meet Ethan', '🏋️',
          `> In September Ethan set two goals: "save money" and "get fit." It is November. He has saved nothing and has not exercised. He wants to give up.\n\n**Why did it not work?** The goals were not clear. There were no steps. He never checked them.\n\n**Fix:** "Save $10 from each weekly pay to have $80 by winter break."`,
          `> In September, Ethan set two goals: "save money" and "get fit." It is now November. He has saved nothing, has not exercised and has not looked at his goals since he wrote them. He feels like a failure and wants to give up.\n\n**Why didn't Ethan's goals work? How could he revise instead of quitting?**\n\n- The goals were vague: no amount, measure or deadline.\n- There were no action steps.\n- He never tracked or reviewed his progress.\n- Revision: "Save $10 from each weekly paycheque so that I have $80 by the winter break." Steps: open a savings account this week; set a reminder every payday.`,
          `**Worked example:** Owen's goal is to make the senior soccer team in three weeks. He sprains his ankle; recovery takes about four weeks. He **revises**: follow the rehab plan and aim for the spring season. The situation changed, so the timeline and steps change. The larger goal stays.`,
          `**Go further:** The best reason to revise a goal is that you have learned something new about yourself or your situation. Which of your goals do you expect to revise first, and what would you need to learn to know?`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **S**pecific · **M**easurable · **A**chievable · **R**elevant · **T**ime-bound\n- Take my first step within **48 hours**.\n- Check my goal every **week**.\n- If it is not working, I **revise**. I do not quit.`,
          `**Copy this note into your notebook:**\n\n- **SMART:** Specific · Measurable · Achievable · Relevant · Time-bound.\n- An **action step** is small and concrete. Plan for one **obstacle**.\n- **Goal cycle:** set → act within 48 hours → track weekly → reflect → revise.\n- Four kinds of goals: personal, social, educational, career/life.\n- Revising is not failing. Goals change as I learn about myself.`,
          `Add one vague goal of your own and its SMART rewrite, with S, M, A, R and T labelled.`),
        S('Try it: four goals and a 48-hour step', '🧪',
          `**Your experiment:**\n\n1. Write one SMART goal for school.\n2. Write the first small step.\n3. Do the step in the next **48 hours**.\n4. Tick it when done. How did it feel?\n\n**Exit:** The goal that matters most to me right now is ____.`,
          `**Your experiment: start the Goal Journal.**\n\n| Category | My SMART goal | First action step (within 48 hours) | Possible obstacle and my plan |\n| Personal | | | |\n| Social | | | |\n| Educational | | | |\n| Career/Life | | | |\n\n1. Write one SMART goal in each category. A partner checks S, M, A, R and T.\n2. Do one first action step within **48 hours** and note the date and time.\n3. Track that goal for one week.\n\n**Exit ticket:** Which of your four goals matters most right now? What is your first action step in the next 48 hours?`,
          `**Record your result:** which step you did, when, and what got in the way. These four goals come back in the Goal Journal check-in at the end of Units 2, 3, 4 and 5.`)
      ],
      terms: [
        ['goal', 'something you decide to work toward', 'something a person decides to achieve and is willing to work toward'],
        ['SMART goal', 'a clear goal with a number and a date', 'a goal that is Specific, Measurable, Achievable, Relevant and Time-bound'],
        ['action step', 'a small task that moves you toward a goal', 'a small, concrete task that moves a person toward a goal'],
        ['obstacle', 'something that gets in the way', 'something that could get in the way of a goal, which a good plan prepares for'],
        ['reflection', 'thinking about what worked and what did not', 'thinking carefully about an experience: what happened, what worked, what did not and what to do next']
      ],
      q: [
        mc('Which of the following is a SMART goal?', '"I will read for 20 minutes, five nights a week, until the end of the semester."', ['"I\'ll try to exercise more."', '"I will do better in school."', '"I want to be successful someday."']),
        mc('In a SMART goal, the "M" stands for', 'Measurable', ['Manageable', 'Meaningful', 'Motivating']),
        mc('Owen wants to make the soccer team in three weeks, then sprains his ankle (four weeks to recover). Which response shows effective goal setting?', 'Revise the goal: follow the rehab plan and aim for the spring season', ['Keep the goal the same and hope for the best', 'Play on the injured ankle at tryouts', 'Give up soccer']),
        mc('What is the best reason to revise a goal?', 'You have learned something new about yourself or your situation', ['The goal takes effort', 'You have not looked at the goal in months', 'A friend thinks the goal is boring']),
        mc('Zainab\'s goal is to "volunteer more." Which revision is the best SMART goal?', '"Volunteer two hours every Saturday at the food bank until I reach 20 hours."', ['"Volunteer somewhere fun this year."', '"Volunteer as much as I can."', '"Think about volunteering by June."']),
        tfx('An action step is a small task that moves you toward a goal.', 'Ethan\'s goals "save money" and "get fit" failed because they were too specific.'),
        fill('In the goal cycle, act on your first action step within ___ hours.', '48', ['480', '4', '1,000']),
        fill('The "T" in SMART stands for ___.', 'Time-bound', ['Talented', 'Tiring', 'Total']),
        app('"Save $15 a week from my paycheque so that I have $240 for a class trip in 16 weeks." Which part of this goal makes it Measurable?', '$15 a week and $240 in total', ['"for a class trip"', '"from my paycheque"', 'The word "save"']),
        app('Four weeks into a goal to attend extra help at lunch, you have gone twice because lunch keeps getting busy. What does good reflection lead you to do?', 'Switch to morning extra help and track it in your agenda', ['Decide you are not a math person', 'Keep the same plan and feel bad about it', 'Delete the goal']),
        app('Sam\'s goal is to "do better in science." Which rewrite is SMART?', '"Raise my science mark from 64% to 70% by the next report card by attending extra help every Wednesday."', ['"Really focus on science from now on."', '"Get 100% in science tomorrow."', '"Do better in science than my friends."'])
      ],
      rec: ['What is one goal you have for school this month?', 'one vague goal you have had, rewritten as a SMART goal with a first action step.', 'This month, my goal for school is …'],
      task: A('My four goals (Goal Journal)', 'A2.1, A2.2',
        ['Write one SMART goal for school. Say what you will do, how much, and by when. Then write your first small step.',
         'Write four SMART goals: personal, social, educational and career/life. For each, add a first action step you can take within 48 hours and one possible obstacle with your plan for it.',
         'Reflect: which decision-making strategy from Lesson 5 did you use to choose your goals, and how well did it work?',
         'Which goal are you least sure about? What would you need to learn about yourself to improve it? Then report on the action step you completed within 48 hours.'],
        ['I will … by … My first step is …', 'Personal: I will … by … First step: …'],
        ['One goal has a number and a date. One step is written.',
         'Four goals, each showing all five SMART elements, a concrete first step and a plan for one obstacle.',
         'A strategy is named (pros and cons, matrix, ask and research, values check) with a comment on how effective it was.',
         'Honest identification of the goal that needs work, and a real result from the 48-hour step.']),
      extra: [
        A('Unit 1 assignment: My Success Toolkit', 'A1.1, A1.2, A1.3, A2.1, A2.2',
          ['Build your toolkit with 4 short parts: (1) one time I bounced back, (2) my stress signs and 2 things that help, (3) 2 people or places that can help me and how to reach them, (4) my SMART goal.',
           'Build a personal toolkit you can use for the rest of the course. Four labelled parts: **1 My Resilience Story** (a setback, how you responded, what helped). **2 My Stress and Balance Plan** (three stressors, your signs, two strategies you have used and two new ones, signs it is time to ask for help). **3 My Support Map** (two trusted people, two school supports, two community supports, and exactly how to reach each). **4 My Goals** (four SMART goals with first action steps). Use your Lesson 2 to 6 work as rough notes. You may type it here, or make a slide deck or poster and describe it here.',
           'Part 1: analyse how resilience will help you in school, in life and at work, with one example each. Part 4: for one goal, show the decision-making strategy you used (pros and cons, matrix or DECIDE).',
           'Reflect: how effective was your strategy? Which goal needs more work, and what do you still need to learn about yourself? Include plans for obstacles.'],
          ['Part 1: One time I bounced back was …', 'Part 1: My Resilience Story. A setback I faced was …'],
          ['Four parts are there. Each part has at least one sentence about me.',
           'All four parts are complete and labelled; every goal has all five SMART elements; every school and community support says how to reach it; unit words are used correctly.',
           'Analysis connects resilience to three areas, and a decision strategy is shown for one goal.',
           'Reflection is honest and specific, and goals include plans for obstacles.'])
      ],
      media: [
        M(1, 'image', 'SMART goal chart', 'A visual of the five letters to keep on screen while writing goals.', 'myBlueprint', 'https://myblueprint.ca/'),
        M(2, 'video', 'Carol Dweck: The power of believing that you can improve', 'Links revising a goal to growth mindset.', 'TED', 'https://www.youtube.com/watch?v=_X0mgOOSpLU')
      ]
    })
  ]));

  /* ================= UNIT 2 · Financial Literacy Graduation Requirement ================= */
  var TEST_TIP = '**Practice like the test:** read the short scenario first, then the question and ALL four options. Eliminate wrong answers and show your calculations.';
  // Goal Journal check-in used at the end of Units 2–5
  function journal(unitNo, focus1, focus2, exp) {
    return A('Goal Journal check-in: Unit ' + unitNo, exp || 'A2.1, A2.2',
      ['Look at your four goals from Unit 1. Pick one. What have you done for it so far? ' + focus1,
       'Open your four SMART goals from Unit 1, Lesson 6. For each one, note your progress. What is working? What is not? ' + focus2,
       'Write your revised or new goal so that it is SMART, and label S, M, A, R and T.',
       'How effective were your decision-making and goal-setting strategies this unit? Give one piece of evidence.'],
      ['For my goal to …, so far I have …', 'Progress on my goals: … What is working: … What is not: …'],
      ['One goal is named. I say what I have done.',
       'Progress is noted for all four goals, with what is working and what is not. One goal is revised or added.',
       'The revised goal shows all five SMART elements.',
       'The reflection judges a strategy and backs it with something that really happened.']);
  }

  units.push(U('money', 'Unit 2 · Financial Literacy Graduation Requirement', [
    'How do I make good choices with money? Earning, paying, borrowing, saving, investing and spotting deals.',
    'How do I make sound money decisions? Ten lessons that prepare you for the Financial Literacy Graduation Requirement (you need 70%): income and expenses, methods of payment, credit and interest, budgets, saving and investing, incentives and reward cards.',
    'C2.1, C2.2, C2.3 (with A2.1, A2.2, B2.3): financial literacy foundations, sound financial decisions, and applying financial literacy to consumer offers. Questions follow the scenario-then-four-options style of the TVO practice assessments.'
  ], [

    L(1, 'Earning, Spending, Income and Expenses', 'Income & Expenses', 'C2.1, C2.2, C2.3', {
      slides: [
        S('Start here: money in, money out', '🎯',
          `**Think:** Name 3 ways a teenager can get money. Name 3 things a teenager spends money on.\n\n**Today we learn:** income, expenses, needs and wants.`,
          `**Minds On:** List three ways a teenager in Ontario can get money. Then list three things a teenager spends money on. Which list was easier to write?\n\n**We are learning to** tell income from expenses and needs from wants, and to work out what is left at the end of the week.`,
          `**Expectations:** C2.1, C2.2, C2.3. This unit prepares you for the **Financial Literacy Graduation Requirement**. You need **70%** to meet it.`),
        S('Five money words', '💵',
          `- **Earning:** getting money for work.\n- **Spending:** paying for things.\n- **Income:** money coming in.\n- **Expense:** money going out.\n- **Need:** you must have it. **Want:** nice to have.`,
          `- **Earning:** receiving money in return for work (labour) or services. *Taylor is paid $15 an hour to tutor.*\n- **Spending:** paying for goods or services.\n- **Income:** money earned from work or received from other sources, such as gifts or interest. *$60 tutoring + $40 babysitting = $100 per week.*\n- **Expense:** money spent on goods, services, activities or other costs. *Registration fee, software subscription, transit fare.*\n- **Need vs. want:** a need is required to live or reach a goal. A want is nice to have but not necessary. *Need: the competition registration fee. Want: a custom team hoodie.*`,
          `**The key calculation:** money left = total income − total expenses. If expenses are larger, the person is spending more than they earn.`),
        S('Meet Taylor', '🤖',
          `> Taylor builds robots. He earns money tutoring and babysitting. He needs parts, software and fees for a competition.\n\nTaylor tutors 4 hours at $15 and earns $40 babysitting.\n\n- Income: 4 × $15 = $60. $60 + $40 = **$100**\n- Spending: $20 + $10 = **$30**\n- Left: $100 − $30 = **$70**`,
          `> Taylor enjoys building robots and solving puzzles. He earns money tutoring and babysitting and hopes to enter a robotics competition next year. He will need to buy parts, replacement components and software, and pay registration fees. These costs will happen over time, not all at once.\n\n**Questions Taylor should ask:** How much do I earn each week, and from which sources? Which costs must be paid now, and which can wait? Will I need to save or borrow? Which purchases are needs, and which are wants?\n\n${TEST_TIP}\n\nTaylor tutors 4 hours a week at $15 an hour and earns $40 babysitting. He spends $20 on transit and $10 on snacks. **Income:** (4 × $15) + $40 = $100. **Expenses:** $20 + $10 = $30. **Left:** $100 − $30 = **$70**.`,
          `**Worked example:** Sara's weekly income is $90 and her expenses are $95. $95 − $90 = $5, so she is spending $5 more than she earns.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Income** = money in.\n- **Expense** = money out.\n- **Need** = must have. **Want** = nice to have.\n- **Left over = income − expenses**`,
          `**Copy this note into your notebook:**\n\n- **Income:** money earned or received (pay, gifts, interest).\n- **Expense:** money spent on goods, services or other costs.\n- **Need:** required to live or reach a goal. **Want:** nice to have.\n- **Money left = total income − total expenses.**\n- Weeks to save = cost ÷ amount saved each week.`,
          `Add a worked example: Jada works 6 hours at $17.50 plus a $15 allowance = $120. Expenses $25 + $18 + $12 = $55. Left: $65. A $260 kit takes $260 ÷ $65 = 4 weeks.`),
        S('Try it: track three days', '🧪',
          `**Your experiment (3 days):**\n\n1. Write down every time money comes in.\n2. Write down every time you spend.\n3. Mark each thing you bought **N** (need) or **W** (want).\n4. Add up: money in − money out = ?\n\n**Exit:** One income I have is ____. One expense I have is ____.`,
          `**Your experiment: a three-day money log.**\n\n| Day | Money in (source, amount) | Money out (item, amount) | Need or want? |\n| 1 | | | |\n| 2 | | | |\n| 3 | | | |\n\n1. Record every dollar in and out for three days (include money someone else spends on you, such as a bus pass).\n2. Total your income and expenses, and calculate what is left.\n3. Circle one expense that could be a need *or* a want, and explain.\n\n**Exit ticket:** In one sentence each: what is the difference between income and an expense? Give one example of each from your own life.`,
          `**Record your result:** your totals and the share of your spending that went to wants. Keep the log: you need it for your budget in Lesson 5.`,
          `**Go further:** If you saved everything left over, how many weeks would it take to afford one thing you want? Show the division.`)
      ],
      terms: [
        ['earning', 'getting money for work', 'receiving money in return for work or services'],
        ['spending', 'paying for things', 'paying for goods or services'],
        ['income', 'money coming in', 'money earned from work or received from other sources, such as gifts or interest'],
        ['expense', 'money going out', 'money spent on goods, services, activities or other costs'],
        ['need', 'something you must have', 'something required to live or reach a goal'],
        ['want', 'something nice to have', 'something nice to have but not necessary']
      ],
      q: [
        mc('Which of the following is an example of income?', 'Receiving $40 for babysitting', ['Paying a $75 registration fee', 'Paying for a bus pass', 'Buying robotics software']),
        mc('Which of the following is an expense?', 'A monthly phone bill', ['Pay from a part-time job', 'Interest earned in a savings account', 'A birthday gift of $50']),
        mc('Taylor tutors 4 hours a week at $15 an hour and earns $40 babysitting. He spends $20 on transit and $10 on snacks. How much does he have left each week?', '$70', ['$100', '$30', '$130']),
        mc('Amira\'s list has a bus pass, a new video game, lunch for school and concert tickets. Which pair are most likely needs?', 'Bus pass and lunch', ['Bus pass and video game', 'Concert tickets and lunch', 'Video game and concert tickets']),
        mc('Maya earns $17 an hour and works 8 hours a week. She also earns $25 a week pet sitting. What is her total weekly income?', '$161', ['$136', '$186', '$42']),
        mc('Which is the best example of a want?', 'Upgrading to the newest phone when the current one works', ['Groceries', 'A bus pass to get to school', 'Rent']),
        tfx('Interest from a savings account is income.', 'A $50 birthday gift is an expense.'),
        fill('Money spent on goods, services or other costs is an ___.', 'expense', ['income', 'earning', 'allowance']),
        app('Liam earns $16 an hour for 5 hours of lawn care and gets a $30 gift this week. He spends $22 on a game and $8 on snacks. How much does he have left?', '$80', ['$110', '$50', '$30']),
        app('Sara\'s weekly income is $90 and her weekly expenses are $95. Which statement is true?', 'She is spending $5 more than she earns', ['She is saving $5 a week', 'Her income and expenses are equal', 'She is saving $95 a week']),
        app('Jada has $65 left each week and wants a $260 robotics kit. If she saves all of it, how many weeks will it take?', '4 weeks', ['2 weeks', '6 weeks', '65 weeks'])
      ],
      rec: ['What is one need and one want you spent money on this week?', 'your own sources of income and your three biggest expenses, each labelled need or want.', 'One need I spent money on was … One want was …'],
      task: A('Jada\'s week and my money log', 'C2.1, C2.2',
        ['Jada earns $105 from work and gets $15 allowance. She spends $25, $18 and $12. (1) What is her income? (2) What does she spend? (3) What is left?',
         'Jada works 6 hours a week at $17.50 an hour and receives a $15 weekly allowance. Each week she spends $25 on transit, $18 on lunches and $12 on a streaming subscription. Calculate (1) her total weekly income, (2) her total weekly expenses, (3) what she has left, and (4) how many weeks it takes to save for a $260 robotics kit. Show your work.',
         'Which of Jada\'s expenses are needs and which are wants? Explain one that could go either way.',
         'Report your three-day money log: total in, total out, what was left, and the share that went to wants. What surprised you?'],
        ['Income: $105 + $15 = … Spending: … Left: …', '(6 × $17.50) + $15 = …'],
        ['Income $120, spending $55, left $65.',
         '$120 income; $55 expenses; $65 left; $260 ÷ $65 = 4 weeks, with work shown.',
         'Transit and lunch as likely needs, streaming as a want, and a reasoned either-way example (lunch from home).',
         'Real totals from my own log and one honest observation.']),
      media: [
        M(1, 'image', 'Needs and wants sorting cards', 'A picture sort makes the difference concrete.', 'Financial Consumer Agency of Canada', 'https://www.canada.ca/en/financial-consumer-agency.html', 'FCAC needs versus wants'),
        M(2, 'video', 'TVO financial literacy practice assessment', 'Shows students the question style they will see.', 'TVO Learn', 'https://tvolearn.com/', 'TVO Learn financial literacy graduation requirement practice')
      ]
    }),

    L(2, 'Methods of Payment', 'Ways to Pay', 'C2.1, C2.2, C2.3', {
      slides: [
        S('Start here: how did I pay?', '🎯',
          `**Think:** What are the last 3 things you bought? How did you pay?\n\n**Today we learn:** ways to pay, and whose money each one uses.`,
          `**Minds On:** Think about the last three things you bought. How did you pay each time? Why did you choose that way?\n\n**We are learning to** describe each method of payment and decide which one fits a situation.`,
          `**Expectations:** C2.1, C2.2, C2.3. **I can** sort methods into money I own and money I borrow, and name one advantage and one risk of each.`),
        S('Whose money are you using?', '💳',
          `**Money I own:** cash · debit card · e-transfer\n\n**Money I borrow:** credit card · loan\n\n- **Debit card:** takes money from my bank account right away.\n- **Credit card:** I borrow now and pay back later. It can cost extra.\n- **E-transfer:** sends money to someone's bank account by email or phone number.`,
          `- **Method of payment:** a way to pay for goods and services.\n- **Cash:** physical money, bills and coins.\n- **Debit card:** takes money directly out of the cardholder's bank account.\n- **E-transfer:** sends and receives money between bank accounts using an email address or phone number.\n- **Cryptocurrency:** currency that exists only in digital form. Bitcoin is one example.\n- **Credit card:** pays by borrowing the money first and paying it back later, usually with interest if not paid in full and on time.\n- **Electronic wallet:** a device or app that stores debit and credit cards so you can tap to pay.\n\n| Money you already own | Money you do not own (borrowed) |\n| Cash · Debit card · E-transfer · Cryptocurrency | Credit card · Line of credit · Loan |\n\nAn **electronic wallet** can be either. It depends on whether the card inside is debit or credit.`,
          `| Method | One advantage | One risk or cost |\n| Cash | No fees; easy to see what is left | Can be lost or stolen; not for online purchases |\n| Debit | No interest | Possible fees or transaction limits |\n| E-transfer | Fast | Hard to reverse if sent to the wrong person |\n| Credit card | Buy now, pay later; useful online | Interest and late fees if not paid in full and on time |`),
        S('Meet Kyle', '🛒',
          `> Kyle wants to know if any way of paying could make his robot parts cost **more** than the price tag.\n\n**Ask before you pay:** Do I have the money now? Will there be extra costs? Can I pay it all back on time?\n\n**Example:** Daniel wants $60 shoes. He has $200 in the bank and no cash. Best choice: **debit card**. No extra cost.`,
          `> Kyle has learned there are many ways to pay. He wants to know how each method works and whether any of them could make his robotics purchases cost more than the price tag.\n\n**What Kyle should consider:** How much money do I have right now? Will this method add interest or fees? If I borrow, can I pay the full amount by the due date? Which method keeps me within my budget? What happens if I miss a payment?\n\n${TEST_TIP}\n\nDaniel wants $60 running shoes. He has $200 in his bank account, wants no extra costs and does not carry cash. **A debit card** uses money he already has and avoids interest.\n\nPriya owes a friend across the city $25 and wants it to arrive today. **An e-transfer** moves money between bank accounts quickly.`,
          `**Worked example:** Nora taps her phone to pay. The card saved in her wallet app is a credit card, so she is using **borrowed money** from the card company.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Own:** cash, debit, e-transfer.\n- **Borrowed:** credit card.\n- Debit = money leaves my account **right away**.\n- Credit = pay it **all** back **on time**, or it costs more.`,
          `**Copy this note into your notebook:**\n\n- **Money I own:** cash · debit card · e-transfer · cryptocurrency.\n- **Money I borrow:** credit card · line of credit · loan.\n- **Electronic wallet:** depends on the card stored inside.\n- Debit: money leaves the account right away, no interest.\n- Credit: no extra cost **only** if the full balance is paid by the due date.\n- There is not always one best method. It depends on the situation.`,
          `Add one advantage and one risk for the two methods you use most.`),
        S('Try it: my payment log', '🧪',
          `**Your experiment:**\n\n1. List your last 5 purchases (or your family's).\n2. Write how each was paid.\n3. Mark each one **O** (own money) or **B** (borrowed).\n4. Count: how many O? How many B?\n\n**Exit:** Cash is best when ____.`,
          `**Your experiment: a payment log.**\n\n| Purchase | Amount | Method | Own or borrowed? | Any extra cost? |\n\n1. Record your last five purchases, or five you see made at home this week.\n2. Label each method **own** or **borrowed**.\n3. For one purchase, name a different method that would also have worked and whether it would have cost more or less.\n\n**Exit ticket:** There is not always one "best" method of payment. Describe one situation where cash is the best choice and one where a debit card is the best choice.`,
          `**Record your result:** how many purchases used owned money and how many used borrowed money.`,
          `**Go further:** Cryptocurrency is "money you own", yet it carries a risk cash does not. What is it, and why does it matter for a student saving toward a goal?`)
      ],
      terms: [
        ['cash', 'bills and coins', 'physical money, bills and coins, used to buy goods and services'],
        ['debit card', 'a card that uses money from your bank account', 'a card that takes money directly out of the cardholder\'s bank account'],
        ['e-transfer', 'sending money by email or phone number', 'a service that sends and receives money between bank accounts using an email address or phone number'],
        ['credit card', 'a card that lets you borrow and pay later', 'a card used to pay by borrowing the money first and paying it back later, usually with interest if not paid in full and on time'],
        ['electronic wallet', 'a phone or watch app that holds your cards', 'a device or app that stores debit and credit cards so you can tap to pay'],
        ['cryptocurrency', 'money that exists only online', 'a type of currency that exists only in digital or online form']
      ],
      q: [
        mc('Which method of payment uses borrowed money?', 'Credit card', ['Debit card', 'E-transfer', 'Cash']),
        mc('Which method of payment takes money directly from the cardholder\'s bank account?', 'Debit card', ['Credit card', 'Cryptocurrency', 'Gift card']),
        mc('Daniel wants $60 shoes. He has $200 in his account, wants no extra costs and does not carry cash. Which method best supports his goal?', 'A debit card', ['A credit card with a 19.99% interest rate', 'A store payment plan over 6 months', 'Cryptocurrency']),
        mc('Priya owes her friend $25. Her friend lives across the city and Priya wants the money to arrive today. Which method is most appropriate?', 'Sending an e-transfer', ['Paying with a credit card', 'Mailing a cheque', 'Waiting to pay in cash next week']),
        mc('Which method of payment uses money that the buyer does not own?', 'A line of credit', ['A debit card', 'An e-transfer', 'Cash']),
        tfx('With a debit card, the money leaves your bank account right away.', 'An electronic wallet always uses money you already own.'),
        fill('A ___ card lets you borrow money now and pay it back later.', 'credit', ['debit', 'gift', 'library']),
        app('Nora taps her phone to pay for lunch. The card saved in her wallet app is a credit card. Whose money is she using?', 'Borrowed money from the card company', ['Money from her chequing account', 'Cash stored in the phone', 'The restaurant\'s money']),
        app('Omar wants to buy a $15 used book from a classmate who does not have a bank account. Which method is most appropriate?', 'Cash', ['An e-transfer', 'A debit card', 'A credit card']),
        app('Kyle\'s parent buys a $120 robotics order online with a credit card. What must they do to avoid paying more than $120?', 'Pay the full balance by the due date', ['Pay half now and half next year', 'Make only the minimum payment', 'Nothing, a credit card never costs extra'])
      ],
      rec: ['How do you pay for things most often?', 'the method of payment you (or your family) use most, whether it is owned or borrowed money, and one risk of it.', 'I most often pay with …'],
      task: A('Choose the method', 'C2.1, C2.2',
        ['Pick the best way to pay: (1) a $3 cookie at a bake sale, (2) $20 to a friend in another city today.',
         'Name the best method of payment for each situation and give a reason: (1) a $3 cookie at the school bake sale; (2) paying back $20 to a friend in another city, today; (3) $60 shoes when you have $200 in your account, carry no cash and want no extra costs.',
         'Complete a chart for cash, debit, e-transfer and credit card: money you own or borrowed, one advantage, one risk or cost.',
         'Is an electronic wallet "money you own" or "borrowed money"? Explain. Then report your payment log: how many purchases used owned money and how many used borrowed money.'],
        ['For the cookie I would use … because …', '(1) Cash, because …'],
        ['Cash for the cookie; e-transfer for the friend.',
         'Cash, e-transfer and debit card, each with a sensible reason.',
         'Four methods correctly sorted, each with a real advantage and risk.',
         'It depends on the card stored in it, and my log results are reported.']),
      media: [
        M(1, 'image', 'Debit and credit card side by side', 'Helps students see that the cards look alike but work differently.', 'Financial Consumer Agency of Canada', 'https://www.canada.ca/en/financial-consumer-agency/services/payment.html', 'FCAC payment methods'),
        M(2, 'video', 'How Interac e-Transfer works', 'A short explainer for a method many students already use.', 'Interac', 'https://www.interac.ca/', 'Interac e-Transfer how it works')
      ]
    }),

    L(3, 'Borrowing, Credit and Debt', 'Credit & Debt', 'C2.1, C2.2', {
      slides: [
        S('Start here: is all debt bad?', '🎯',
          `**Agree or disagree:** "All debt is bad." Give one reason.\n\n**Today we learn:** what borrowing, credit and debt mean.`,
          `**Minds On:** Agree or disagree: "All debt is bad." Write your answer and one reason. We will come back to it at the end.\n\n**We are learning to** explain borrowing, credit, debt and credit limits, and the responsibilities that come with credit.`,
          `**Expectations:** C2.1, C2.2. **I can** calculate debt and available credit, and name a form of credit that fits a purpose.`),
        S('Borrowing, credit, debt, credit limit', '🏦',
          `- **Borrowing:** getting money you must pay back.\n- **Credit:** being allowed to use a bank's money.\n- **Debt:** the money you owe.\n- **Credit limit:** the most you can borrow.\n\n**Kinds of credit:** credit card · student loan (school) · car loan · mortgage (a home).`,
          `- **Borrowing:** receiving money with an agreement to pay it back in the future, usually with interest.\n- **Credit:** access to money that belongs to a financial institution, with the expectation that you pay back what you borrowed plus any costs of borrowing.\n- **Debt:** the amount of money that has been borrowed and must be paid back.\n- **Credit limit:** the maximum amount a lender allows you to borrow on a credit card or line of credit. *A card with a $500 limit will decline a $650 purchase.*\n\n| Form of credit | Used to… |\n| Credit card | make purchases and pay back later |\n| Student loan | pay for post-secondary education; repaid over time |\n| Car loan | buy a vehicle; repaid over an agreed period |\n| Mortgage | buy a home; repaid over many years |`,
          `**Responsibilities of credit:** repay what you borrow plus any interest or fees · stay within your credit limit · pay on time · check your statement for errors or fraud.`),
        S('Meet Tyler', '🧾',
          `> Tyler adds up his robot costs. He does not have enough saved. Should he save first or borrow?\n\nTyler's card has a **$500 limit**. He spends $180, then $150.\n\n- Debt: $180 + $150 = **$330**\n- Credit left: $500 − $330 = **$170**\n- He tries to pay $210. **Declined.** It is over the limit.`,
          `> As Tyler adds up the cost of parts, software and competition fees, he realizes he may not have enough saved in time. He wonders when borrowing might help, what responsibilities come with credit, and how debt could affect his goals.\n\n**Save first or use credit?** If he does not need the items right away, saving first usually avoids interest. If he must buy now, credit can work, but only with a clear repayment plan.\n\n**Tyler's credit card** has a $500 limit and starts at $0. He buys $180 of parts and $150 of software. **Debt:** $180 + $150 = $330. **Credit still available:** $500 − $330 = $170. A $210 competition fee is **declined**, because $330 + $210 = $540 is over the limit.`,
          `**Worked example:** Marcus buys a $400 laptop on his card, pays only part of the balance and leaves the rest past the due date. He is charged **interest on the unpaid balance**, so the laptop costs more than $400.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Debt** = money I owe.\n- **Credit limit** = the most I can borrow.\n- Credit left = limit − debt.\n- If I borrow, I must **pay it back, on time**.`,
          `**Copy this note into your notebook:**\n\n- **Credit:** a financial institution's money that I may use and must repay with any costs of borrowing.\n- **Debt:** what has been borrowed and must be paid back.\n- **Available credit = credit limit − debt.** A purchase over the limit is declined.\n- Forms of credit: credit card · student loan · car loan · mortgage.\n- Responsibilities: repay with interest and fees · stay within the limit · pay on time · check statements.`,
          `Add: debt can be **helpful** when it supports a goal (education, a vehicle needed for work) and comes with a repayment plan.`),
        S('Try it: helpful, risky or it depends?', '🧪',
          `**Your experiment:**\n\n1. Ask an adult you trust: "What is one thing you borrowed money for? Was it worth it?"\n2. Write the answer.\n3. Was that debt **helpful** or **risky**?\n\n**Exit:** Is all debt bad? I think ____ because ____.`,
          `**Your experiment: interview and sort.**\n\n1. Sort these: a student loan for a nursing program · a credit card for a new gaming console · a car loan for a vehicle needed to get to work · concert tickets you cannot pay off this month. Label each **Helpful, Risky or It depends**, with one reason.\n2. Ask a trusted adult about one time they borrowed money: what was it for, how long did it take to repay, would they do it again? (They may keep the amounts private.)\n3. Decide where their example fits.\n\n**Exit ticket:** Return to the Minds On. Has your answer to "All debt is bad" changed? Explain using the word "responsibility."`,
          `**Record your result:** the interview answers and your label for that debt. Use it in the next lesson when you calculate what borrowing costs.`)
      ],
      terms: [
        ['borrowing', 'getting money you must pay back', 'receiving money with an agreement to pay it back in the future, usually with interest'],
        ['credit', 'being allowed to use a bank\'s money', 'access to money that belongs to a financial institution, with the expectation that it is paid back plus any costs of borrowing'],
        ['debt', 'money you owe', 'the amount of money that has been borrowed and must be paid back'],
        ['credit limit', 'the most you are allowed to borrow', 'the maximum amount a lender allows you to borrow on a credit card or line of credit'],
        ['mortgage', 'a loan to buy a home', 'money borrowed from a financial institution to buy a home and repaid over many years'],
        ['student loan', 'a loan to pay for school after high school', 'money borrowed to pay for post-secondary education and repaid over time']
      ],
      q: [
        mc('Which form of credit is used to purchase a home?', 'Mortgage', ['Car loan', 'Student loan', 'Credit card']),
        mc('Which statement best describes debt?', 'The amount of money borrowed that must be paid back', ['Money set aside for future use', 'Money earned from an investment', 'A reward for using a credit card']),
        mc('Leila\'s college tuition is $7,000 and she has saved $2,500. Which form of credit is designed for education costs?', 'A student loan', ['A store credit card', 'A car loan', 'A mortgage']),
        mc('Marcus buys a $400 laptop on his credit card, pays only part of the balance and leaves the rest past the due date. What is the most likely result?', 'He is charged interest on the unpaid balance', ['His credit limit automatically increases', 'He earns interest on the unpaid amount', 'The remaining balance is forgiven']),
        mc('Ben\'s credit card has a $750 limit. He owes $600 and tries to make a $200 purchase. What is the most likely result?', 'The purchase is declined because it exceeds his limit', ['The purchase goes through with no problem', 'His limit rises to $800', 'The bank pays him $50']),
        mc('Which of the following is a responsibility of using credit?', 'Repaying what was borrowed, plus any interest or fees', ['Spending up to the limit every month', 'Ignoring the statement', 'Paying only when you feel like it']),
        tfx('A card with a $500 credit limit will decline a $650 purchase.', 'All debt is bad, even a student loan with a clear repayment plan.'),
        fill('The most a lender allows you to borrow is your credit ___.', 'limit', ['score', 'card', 'gift']),
        app('Ana\'s credit card has a $1,000 limit and she already owes $850. She tries to buy a $200 jacket. What happens?', 'The purchase is declined because $1,050 would exceed her limit', ['The purchase is approved and her debt becomes $650', 'The jacket is free', 'Her limit doubles']),
        app('Dev needs a car to get to his new job. The car costs $9,000 and he has saved $2,000. Which form of credit is designed for this purchase?', 'A car loan', ['A mortgage', 'A student loan', 'A loyalty card']),
        app('Tyler\'s card has a $500 limit. After purchases of $180 and $150, how much credit is still available?', '$170', ['$330', '$500', '$20'])
      ],
      rec: ['What does "debt" mean?', 'one example of debt you think is helpful and one you think is risky, with a reason for each.', 'Debt means …'],
      task: A('Tyler\'s credit card', 'C2.1, C2.2',
        ['Tyler\'s card has a $500 limit. He spends $180 and then $150. (1) How much does he owe? (2) How much can he still borrow?',
         'Tyler\'s parent lets him use a credit card with a $500 limit. The balance starts at $0. He makes three purchases in order: $180 for parts, $150 for software and $210 for a competition fee. (1) What is the debt after the first two purchases? (2) How much credit is still available? (3) What happens when he tries to pay the $210 fee, and why? (4) List three responsibilities that come with using credit.',
         'Label each as helpful, risky or it depends, with a reason: a student loan for nursing; a credit card for a gaming console; a car loan for a vehicle needed for work; concert tickets you cannot pay off this month.',
         '"All debt is bad." Do you agree? Explain using the word "responsibility" and the result of your interview.'],
        ['He owes $180 + $150 = … He can still borrow $500 − … = …', '(1) $180 + $150 = …'],
        ['He owes $330. He can still borrow $170.',
         '$330 debt; $170 available; the $210 fee is declined because $540 is over $500; three responsibilities listed.',
         'Each label has a reason about goals, wants or interest.',
         'A reasoned position: debt can help reach a goal when used responsibly, with a repayment plan and on-time payments.']),
      media: [
        M(1, 'image', 'A sample credit card statement', 'Shows where the balance, limit and due date appear.', 'Financial Consumer Agency of Canada', 'https://www.canada.ca/en/financial-consumer-agency/services/credit-cards.html', 'FCAC understanding your credit card statement'),
        M(1, 'video', 'Canada Student Loans explained', 'A real example of helpful debt with responsibilities.', 'Government of Canada', 'https://www.canada.ca/en/services/benefits/education/student-aid.html', 'Canada student grants and loans')
      ]
    }),

    L(4, 'Interest and Interest Rates', 'Interest', 'C2.1, C2.2', {
      slides: [
        S('Start here: where does the extra $60 come from?', '🎯',
          `**Think:** A robot kit costs $300 today. On a credit card, paid off over a year, it could cost about $360. Why?\n\n**Today we learn:** interest.`,
          `**Minds On:** A robotics kit costs $300 if you pay today. If you use a credit card and take a year to pay it off, it could cost about $360. Where does the extra $60 come from?\n\n**We are learning to** explain interest and calculate it for one year.`,
          `**Expectations:** C2.1, C2.2. **I can** convert a percentage to a decimal and calculate interest paid or earned.`),
        S('Interest, interest rate, principal', '📈',
          `- **Interest:** the extra money you **pay** when you borrow, or **earn** when you save.\n- **Interest rate:** the percent.\n- **Principal:** the starting amount.\n\n**Interest = Amount × Rate**\n\n$300 × 0.20 = **$60**`,
          `- **Interest:** the cost of borrowing money, OR the money earned from an investment or savings. It is based on a percentage of the original amount.\n- **Interest rate:** a percentage that shows how much is earned on top of the starting amount, or how much a lender charges on top of the amount borrowed.\n- **Principal:** the original amount of money borrowed or saved, before any interest is added.\n\n**Interest = Amount × Rate** (for one year)\n\n| | Borrowing | Saving |\n| Situation | $300 on a credit card at 20% | $500 in a savings account at 2% |\n| Calculation | $300 × 0.20 = $60 | $500 × 0.02 = $10 |\n| Total | $360 owed | $510 in the account |\n\n**Tip:** convert the percentage to a decimal first: 20% = 0.20, 2% = 0.02, 0.5% = 0.005.`,
          `| Percentage | Decimal |\n| 4% | 0.04 |\n| 12.5% | 0.125 |\n| 19.99% | 0.1999 |\n| 0.5% | 0.005 |`),
        S('Meet Olivia', '🧮',
          `> Olivia needs a $250 robot kit.\n\n- **Option 1:** wait 2 months, save, pay with debit. Cost: **$250**\n- **Option 2:** credit card at 20% for a year. $250 × 0.20 = $50. Cost: **$300**\n\nOption 2 costs **$50 more**.`,
          `> Olivia now understands that borrowing costs more than the amount borrowed. For next year's competition, she may need a specialized robotics kit that costs more than she has saved.\n\n**How could interest change her decision?** Interest increases the total cost. A longer repayment period may mean smaller payments but more interest overall. Saving first avoids interest completely. If she must borrow, she should choose the lowest-cost option and repay quickly.\n\n${TEST_TIP}\n\nOlivia needs a $250 kit. Option 1: wait two months, save and pay with debit. Option 2: buy today on a credit card at 20% a year and pay it off over one year. $250 × 0.20 = **$50** interest, so Option 2 costs about **$300**.\n\nSofia puts $1,000 in a savings account at 3% a year. $1,000 × 0.03 = $30, so she has **$1,030**.`,
          `**Worked example:** Ethan wants a $90 jacket and has $150 in the bank. He could use debit, or a credit card he pays in full before the due date. **Neither option charges interest**: debit uses his own money, and credit charges interest only if the balance is not paid in full and on time.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Interest** = extra money I pay (borrowing) or earn (saving).\n- **Interest = Amount × Rate**\n- 20% = 0.20\n- $300 × 0.20 = $60`,
          `**Copy this note into your notebook:**\n\n- **Interest** has two sides: I **pay** it when I borrow and **earn** it when I save or invest.\n- **Principal:** the starting amount. **Interest rate:** the percentage.\n- **Interest = Amount × Rate** (one year). Change the percentage to a decimal first.\n- Borrowing: $300 × 0.20 = $60 → $360 owed.\n- Saving: $500 × 0.02 = $10 → $510.\n- Paying a credit card in full and on time = no interest.`,
          `Add three conversions of your own (for example 6%, 19.99%, 0.5%) and one calculation for each.`),
        S('Try it: what would it really cost?', '🧪',
          `**Your experiment:**\n\n1. Pick one thing you want. Find the price.\n2. Multiply the price by 0.20.\n3. Add it to the price.\n4. That is the cost on a credit card for a year.\n\n**Exit:** A $300 item on a credit card can cost more than $300 because ____.`,
          `**Your experiment: price it both ways.**\n\n1. Choose something you actually want and find its real price.\n2. Calculate one year of interest at a typical credit card rate of **20%**: price × 0.20.\n3. Calculate what the same amount would **earn** in a savings account at **2%**.\n4. Compare: the cost of borrowing versus the reward for waiting.\n\n| Item and price | Interest at 20% | Total if borrowed | Interest earned at 2% |\n\n**Exit ticket:** Explain to a Grade 9 student why a $300 purchase on a credit card might end up costing more than $300.`,
          `**Record your result:** both numbers and the difference between them.`,
          `**Go further:** Two one-year loans are each $1,000. Loan A charges 8% and Loan B charges 12%. Find the difference in dollars, then say what else besides the rate you would want to know before choosing.`)
      ],
      terms: [
        ['interest', 'extra money you pay to borrow or earn by saving', 'the cost of borrowing money, or the money earned from an investment or savings'],
        ['interest rate', 'the percent used to work out interest', 'a percentage that shows how much is earned on the starting amount, or how much a lender charges on the amount borrowed'],
        ['principal', 'the starting amount of money', 'the original amount of money borrowed or saved, before any interest is added'],
        ['decimal', 'a percent written like 0.20', 'the form of a percentage used in a calculation, such as 0.20 for 20%']
      ],
      q: [
        mc('Interest can be best described as', 'the cost of borrowing money or money earned from an investment', ['only the cost of borrowing money', 'only money earned from savings', 'a fee charged for using cash']),
        mc('Joelle borrows $200 at an interest rate of 10% for one year. How much interest will she pay?', '$20', ['$10', '$220', '$2']),
        mc('Olivia could save and pay $250 with debit, or use a credit card at 20% a year and pay it off over one year. Which statement is correct?', 'The credit card option costs about $50 more because of interest', ['Both options cost exactly $250', 'Saving costs more because she has to wait', 'The credit card costs less because she gets the kit sooner']),
        mc('Sofia puts $1,000 into a savings account that pays 3% a year. How much is in the account after one year?', '$1,030', ['$1,003', '$1,300', '$970']),
        mc('Chen borrows $1,500 at 8% interest per year and repays the loan after one year. How much does he repay in total?', '$1,620', ['$1,508', '$1,580', '$120']),
        tfx('You pay interest when you borrow and earn interest when you save.', 'A credit card always charges interest, even when the full balance is paid on time.'),
        fill('The original amount borrowed or saved is called the ___.', 'principal', ['interest', 'limit', 'budget']),
        fill('As a decimal, 20% is ___.', '0.20', ['20.0', '2.0', '200']),
        app('Ravi borrows $800 at 6% a year and repays the loan after one year. How much does he repay in total?', '$848', ['$806', '$860', '$48']),
        app('Two one-year loans are each for $1,000. Loan A charges 8% and Loan B charges 12%. How much more interest does Loan B cost?', '$40', ['$4', '$120', '$200']),
        app('Ethan wants a $90 jacket and has $150 in the bank. He could use debit, or a credit card he pays in full before the due date. Which statement is true?', 'Neither option will charge him interest', ['Both options will charge him interest', 'Only the debit card charges interest', 'Only the credit card can be used in stores'])
      ],
      rec: ['What is 20% as a decimal?', 'the price of something you want, the interest on it at 20% for one year, and the total.', '20% as a decimal is …'],
      task: A('Calculating interest', 'C2.1, C2.2',
        ['Work out the interest for one year: (1) $400 at 5%. (2) $250 at 20%. Remember: 5% = 0.05 and 20% = 0.20.',
         'Calculate the interest and the total after one year. Show at least two calculations. (1) Savings: $400 at 5%. (2) Savings: $1,200 at 2%. (3) Credit card balance: $250 at 20%. (4) Youth savings: $600 at 0.5%. Then say in which rows interest is paid and in which it is earned.',
         'Olivia needs a $300 kit. Option 1: save for three months and pay with debit. Option 2: credit card at 20% and one year to pay it off. How much more does Option 2 cost? Which would you choose, and when might Option 2 make sense?',
         'Add row (5): a $2,000 credit card balance at 19.99%. Then report your "price it both ways" experiment.'],
        ['$400 × 0.05 = …', '(1) $400 × 0.05 = $… so the total is $…'],
        ['$20 and $50.',
         '$20 → $420; $24 → $1,224; $50 → $300 owed; $3 → $603. Paid on the credit card row; earned on the savings rows.',
         '$300 × 0.20 = $60 more. A reasoned choice (saving avoids interest; borrowing may fit a deadline with a plan to repay quickly).',
         '$399.80 → $2,399.80 owed, plus my own two numbers.']),
      media: [
        M(1, 'image', 'Interest calculation diagram', 'A visual of principal + interest = total.', 'Financial Consumer Agency of Canada', 'https://www.canada.ca/en/financial-consumer-agency/services/credit-cards/interest-rates.html', 'FCAC how credit card interest works'),
        M(4, 'video', 'TVO Part 1 practice questions', 'Students try the Part 1 questions and record a score.', 'TVO Learn', 'https://tvolearn.com/', 'TVO Learn financial literacy practice Part 1')
      ]
    }),

    L(5, 'Financial Goals and Budgeting', 'Goals & Budgets', 'C2.1, C2.3', {
      slides: [
        S('Start here: what would I save for?', '🎯',
          `**Think:** What is one thing you want to save for? Would it take weeks, months or years?\n\n**Today we learn:** money goals and budgets.`,
          `**Minds On:** What is one thing you would like to save for? Would it take you a few weeks, a few months or a few years?\n\n**We are learning to** set a financial goal, name its timeframe and build a simple budget.`,
          `**Expectations:** C2.1, C2.3 (and A2.1). **I can** calculate how long a goal takes and what a budget leaves for savings.`),
        S('Saving, goals and a budget', '🎨',
          `- **Saving:** putting money aside for later.\n- **Financial goal:** something you plan to save for.\n- **Budget:** a plan for money in and money out.\n\n**Goals:** short-term (soon) · mid-term (months) · long-term (years, like a car or college).`,
          `- **Saving:** putting money aside for future use.\n- **Financial goal:** an objective a person sets that affects how they spend or save their money. *"I will save $50 for a watercolour set in the next 8 weeks."*\n- **Budget:** an estimate of how to manage income and expenses over a set period of time. A tool to track income, expenses and savings.\n- **Investing:** buying something that is expected to increase in value or produce income.\n\n| Short-term | Mid-term | Long-term |\n| Things you want soon, like art supplies or a game | Things that take longer, like a special class or an outing | Things further in the future, like a car or post-secondary education |\n\n**Four steps to creating a budget:** (1) Check in with yourself. (2) Look at your spending. (3) Consider your income. (4) Make a plan.`,
          `**Two calculations:** savings each month = income − expenses. Time to reach a goal = amount needed ÷ amount saved each week (or month).`),
        S('Meet Gurpreet', '🖌️',
          `> Gurpreet is in the Art Club. He wants a watercolour set for the art show.\n\n**His steps:** pick the set → find the price → pick a date → work out how much to save each week.\n\n**Example:** Tanvi wants $120. She saves $15 a week. $120 ÷ $15 = **8 weeks**.`,
          `> Gurpreet is in his school's Art Club and has started painting with watercolours. The club is planning a year-end art show, and he would like to buy a watercolour set to use at home. His supervisor suggests setting a financial goal, but he isn't sure where to start.\n\n**Steps to set a financial goal:** decide which set he wants → find out how much it costs → decide on a timeline → work out how much he can set aside each week or month.\n\n${TEST_TIP}\n\nThe art show is in 10 weeks and he needs the last 2 weeks to paint, so he must buy the set within 8 weeks: a **short-term goal**.\n\nTanvi wants $120 for hockey camp and can save $15 a week. $120 ÷ $15 = **8 weeks**.`,
          `**Worked example (Ella):** $40 allowance + $60 babysitting = $100 income. $25 phone + $20 snacks + $15 bus = $60 expenses. Savings: $40 a month. A $200 skateboard takes $200 ÷ $40 = **5 months**. Cutting snacks to $10 raises savings to $50, so **4 months**.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Budget** = my plan for money in and out.\n- **Savings = income − expenses**\n- **Weeks to save = cost ÷ savings each week**\n- Short-term = soon. Long-term = years.`,
          `**Copy this note into your notebook:**\n\n- **Financial goal:** what I am saving for, how much, and by when.\n- **Short-term** (soon) · **mid-term** (months) · **long-term** (years).\n- **Budget:** a plan to track income, expenses and savings.\n- Four steps: check in with myself → look at my spending → consider my income → make a plan.\n- **Savings = income − expenses.** **Time = amount needed ÷ amount saved per week.**`,
          `Add: if expenses are higher than income, go back to step 2 and look for wants to reduce.`),
        S('Try it: my financial goal card', '🧪',
          `**Your experiment:**\n\n1. What am I saving for?\n2. How much does it cost?\n3. How much can I save each week?\n4. Cost ÷ weekly savings = how many weeks?\n5. Save for one week. Did you hit your number?\n\n**Exit:** My goal is short-term / mid-term / long-term because ____.`,
          `**Your experiment: goal card and one-week budget.**\n\n| Question | My answer |\n| What am I saving for, and why? | |\n| How much do I need? | |\n| My timeframe (short-, mid- or long-term) | |\n| How much will I set aside each week? | amount ÷ weeks |\n\nThen use your Lesson 1 money log to write a one-week budget (income, expenses, savings). Follow it for a week and compare **planned** with **actual**.\n\n**Exit ticket:** Write one short-term, one mid-term and one long-term goal you might have in the next five years.`,
          `**Record your result:** planned savings, actual savings and the reason for any gap. Keep the card: you will match it to a savings or investment option in Lesson 7.`,
          `**Go further:** Find the one change to your spending that would shorten your timeline the most, and recalculate, as Ella did with her snacks.`)
      ],
      terms: [
        ['saving', 'putting money aside for later', 'putting money aside for future use'],
        ['financial goal', 'something you plan to save money for', 'an objective a person sets that affects how they spend or save their money'],
        ['budget', 'a plan for money coming in and going out', 'an estimate of how to manage income and expenses over a set period of time'],
        ['investing', 'buying something you hope will grow in value', 'buying something that is expected to increase in value or produce income'],
        ['short-term goal', 'something you want soon', 'a goal for something a person wants soon, like art supplies or a game'],
        ['long-term goal', 'something far in the future, like a car', 'a goal for something further in the future, like a car or post-secondary education']
      ],
      q: [
        mc('Which goal is the best example of a long-term goal?', 'Paying for post-secondary education', ['Buying art supplies for a project', 'Buying a new video game next week', 'Going to a movie on Friday']),
        mc('Which of the following best describes a budget?', 'A plan for managing income and expenses over a set period', ['A type of investment', 'Money borrowed from a bank', 'A reward from a store']),
        mc('Tanvi wants to save $120 for a hockey camp. She can save $15 per week. How many weeks will it take?', '8 weeks', ['6 weeks', '10 weeks', '15 weeks']),
        mc('Gurpreet must buy his watercolour set within 8 weeks. Which type of goal is he setting?', 'Short-term goal', ['Mid-term goal', 'Investment goal', 'Long-term goal']),
        mc('Priya\'s monthly income is $240. Her monthly expenses are $185. How much can she save each month?', '$55', ['$65', '$425', '$185']),
        mc('Omar is creating a budget. He has checked in with himself and looked at his spending. What is the next step?', 'Consider his income', ['Make a plan', 'Open a credit card', 'Buy what he wants']),
        mc('Rosa is saving for a concert ticket she wants to buy next month. Which type of goal is this?', 'Short-term goal', ['Mid-term goal', 'Long-term goal', 'Not a financial goal']),
        tfx('A budget tracks income, expenses and savings.', 'The first step in creating a budget is to make a plan.'),
        fill('Putting money aside for future use is called ___.', 'saving', ['spending', 'borrowing', 'upselling']),
        app('Jon wants to save $180 for a bike helmet and lock. He can save $12 a week. How many weeks will it take?', '15 weeks', ['12 weeks', '18 weeks', '168 weeks']),
        app('Aisha\'s monthly budget shows $150 in income and $165 in expenses. What is the best next step?', 'Look at her spending to find wants she can reduce', ['Use a credit card to cover the $15 every month', 'Ignore the budget', 'Stop tracking her income']),
        app('Ella saves $40 a month toward a $200 skateboard. If she cuts snacks by $10 a month and saves that too, how long will it take?', '4 months', ['5 months', '2 months', '10 months'])
      ],
      rec: ['What is one thing you want to save for?', 'your own financial goal: what it is, the cost, the timeframe (short-, mid- or long-term) and how much you would save each week.', 'I want to save for …'],
      task: A('Ella\'s budget and my goal card', 'C2.1, C2.3',
        ['Ella gets $100 a month. She spends $60. (1) How much can she save each month? (2) A skateboard costs $200. How many months will it take?',
         'Each month Ella receives a $40 allowance and earns $60 babysitting. She spends $25 on her phone plan, $20 on snacks and $15 on bus fare. She wants a $200 skateboard. Calculate her total income, total expenses and monthly savings. How many months will the skateboard take? How many if she cuts snacks to $10?',
         'Is the skateboard a short-, mid- or long-term goal? Explain. Then number the four budget steps in order.',
         'Complete your own financial goal card and report your one-week budget: planned versus actual, and why they differed.'],
        ['$100 − $60 = … so $200 ÷ … = … months', 'Income: $40 + $60 = …'],
        ['$40 a month; 5 months.',
         '$100 income, $60 expenses, $40 savings; 5 months, or 4 months with the snack change.',
         'Mid-term, with a reason; steps in order: check in, look at spending, consider income, make a plan.',
         'A complete goal card (item, amount, timeframe, weekly amount) and honest planned-versus-actual numbers.']),
      media: [
        M(1, 'image', 'Budget planner screenshot', 'Shows what a real budget tool looks like.', 'Financial Consumer Agency of Canada: Budget Planner', 'https://itools-ioutils.fcac-acfc.gc.ca/BP-PB/budget-planner', 'FCAC budget planner'),
        M(4, 'image', 'Goal timeline: short, mid, long', 'A timeline graphic to sort goals on.', 'Canada.ca: Setting financial goals', 'https://www.canada.ca/en/financial-consumer-agency/services/savings-investments/setting-savings-investment-goals.html', 'FCAC setting savings goals')
      ]
    }),

    L(6, 'Savings Accounts', 'Savings Accounts', 'C2.1, C2.3', {
      slides: [
        S('Start here: jar or bank?', '🎯',
          `**Think:** Jasmine can keep her savings in a jar at home or in a bank account. Name one good thing about each.\n\n**Today we learn:** savings accounts.`,
          `**Minds On:** Jasmine could keep her savings in a jar at home or in a savings account at a bank. List one advantage of each.\n\n**We are learning to** compare savings accounts using rate of return and risk.`,
          `**Expectations:** C2.1, C2.3. **I can** calculate the interest two accounts would pay and choose the one that fits a goal.`),
        S('Savings account, rate of return, risk', '🏧',
          `- **Savings account:** a safe place at a bank for your money. It pays a little interest.\n- **Rate of return:** how much your money earns (a percent).\n- **Risk:** the chance you could lose money.\n\nA savings account has **very low risk**.`,
          `- **Savings account:** an account at a financial institution for saving toward short-term and long-term goals. It pays interest based on the amount in the account.\n- **Rate of return:** how much an account or investment earns, shown as a percentage of the amount saved or invested, usually per year. *2% on $100 earns $2 in a year.*\n- **Risk:** the chance that you could lose some or all of your money.\n\n| | Youth savings account | High interest savings account (HISA) |\n| Rate of return (approximate) | About 0.5% per year | About 1% to 4.5% per year |\n| Risk | Very low | Very low |\n| Pros | Very secure; access any time | Easy access; more interest; good for short-term goals |\n| Cons | Very little interest; may have fees or transaction limits | Rates can change, so earnings can go up or down |`,
          `**Why a higher balance earns more:** interest is a percentage of the amount in the account, so a larger amount produces a larger dollar value at the same rate.`),
        S('Meet Jasmine', '🫙',
          `> Jasmine saves $25 a month for a watercolour set. A savings account would keep her money safe and earn a little extra.\n\n**Example:** Noor has $800.\n\n- Bank A, 0.5%: $800 × 0.005 = **$4**\n- Bank B, 4%: $800 × 0.04 = **$32**\n- Bank B pays **$28 more**.`,
          `> Jasmine is saving $25 a month for her watercolour set. Her supervisor mentions that a savings account could keep her money secure and even earn a little extra. She wants to compare her options.\n\n**Recommendation:** a high interest savings account earns more and still gives easy access. Both accounts are very low risk. Because her goal is only 8 weeks away, she needs access to her money, not a locked-in investment. She should compare fees and transaction limits before choosing.\n\n${TEST_TIP}\n\nNoor has $800. Bank A offers 0.5% a year and Bank B offers 4%. Bank A: $800 × 0.005 = $4. Bank B: $800 × 0.04 = $32. Difference: **$28**.`,
          `**Worked example:** Jordan will buy a laptop in four months and wants his money secure and easy to reach. A **high interest savings account** fits: very low risk, easy access, suited to a short-term goal. A 5-year GIC would lock the money in.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Savings account** = safe, and pays a little interest.\n- **Rate of return** = how much my money earns.\n- **Risk** = the chance of losing money.\n- **Interest = Amount × Rate**`,
          `**Copy this note into your notebook:**\n\n- **Savings account:** secure, pays interest, money can be reached when needed.\n- **Rate of return:** what an account earns, as a percentage per year.\n- **Risk:** the chance of losing some or all of your money. Savings accounts: very low.\n- Youth account: about 0.5%. HISA: about 1% to 4.5%, but the rate can change.\n- Short-term goal → low risk and easy access.`,
          `Add the rate-shopping row for $1,000: $5 at 0.5%, $20 at 2%, $40 at 4%.`),
        S('Try it: rate shopping', '🧪',
          `**Your experiment:**\n\n1. Pick an amount you could save: $____\n2. At 0.5%: amount × 0.005 = $____\n3. At 4%: amount × 0.04 = $____\n4. Which earns more? By how much?\n\n**Exit:** A savings account is worth it because ____.`,
          `**Your experiment: rate shopping.**\n\n1. With an adult's help or on your own, look up the **real** rate for one youth or savings account at a bank or credit union near you. Write the name and the rate.\n2. Complete the table, then add a row for the amount on your own goal card.\n\n| Balance | At 0.5% | At 2% | At 4% |\n| $500 | | | |\n| $1,000 | | | |\n| $2,000 | | | |\n\n**Exit ticket:** Jasmine's friend says, "A savings account isn't worth it because you barely earn anything." Do you agree? Give one reason.`,
          `**Record your result:** the real rate you found, where you found it, and what your own goal amount would earn in a year.`,
          `**Go further:** HISA rates can change. Explain how that is different from "risk" as this lesson defines it.`)
      ],
      terms: [
        ['savings account', 'a safe bank account for money you are saving', 'an account at a financial institution for saving money toward goals, which pays interest on the amount in it'],
        ['rate of return', 'how much your money earns, as a percent', 'how much an account or investment earns, shown as a percentage of the amount saved or invested'],
        ['risk', 'the chance you could lose money', 'the chance that you could lose some or all of your money'],
        ['balance', 'how much money is in an account', 'the amount of money in an account at a given time'],
        ['high interest savings account', 'a savings account that pays more interest', 'a very low risk account with easy access that pays more interest than a youth account, at a rate that can change']
      ],
      q: [
        mc('Which account would usually earn the most interest?', 'High interest savings account', ['Youth savings account', 'A chequing account with no interest', 'A jar at home']),
        mc('What is one disadvantage of a high interest savings account?', 'The interest rate can change', ['It is very high risk', 'It does not pay any interest', 'You can never access your money']),
        mc('Noor has $800. Bank A pays 0.5% a year and Bank B pays 4% a year. How much more interest will she earn in one year at Bank B?', '$28', ['$32', '$36', '$4']),
        mc('Jordan will buy a laptop in four months. He wants his money secure and easy to access. Which option best meets his needs?', 'A high interest savings account', ['A mutual fund', 'A 5-year GIC', 'Buying stocks']),
        mc('Which statement best describes risk?', 'The chance of losing some or all of your money', ['The interest a bank pays', 'A fee for using a debit card', 'A type of savings account']),
        mc('Tess has $1,200. A youth account pays 0.5% and a high interest account pays 3.5%. How much more would she earn in one year in the high interest account?', '$36', ['$42', '$6', '$48']),
        tfx('A savings account has very low risk.', 'A youth savings account usually pays more interest than a high interest savings account.'),
        fill('A 2% rate of return on $100 earns $___ in a year.', '2', ['20', '200', '0']),
        app('Leo has $600. Bank A pays 0.5% a year and Bank B pays 3% a year. How much more will Leo earn in one year at Bank B?', '$15', ['$18', '$3', '$21']),
        app('Amy needs her money in two months for a class trip. She wants it secure and easy to access. Which option is best?', 'A high interest savings account', ['A 5-year GIC', 'Stocks', 'A mutual fund']),
        app('A friend says a savings account "isn\'t worth it." Which reply uses the lesson best?', 'The money is secure, earns something instead of nothing, and is harder to spend on impulse', ['You are right, a jar pays more interest', 'Savings accounts are very high risk anyway', 'Only adults are allowed to save'])
      ],
      rec: ['Where do you keep money you are saving?', 'where you keep (or would keep) your savings, one advantage of that place and one disadvantage.', 'I keep my savings …'],
      task: A('Rate shopping', 'C2.1, C2.3',
        ['Work out the interest for one year: (1) $500 at 2% (multiply by 0.02). (2) $1,000 at 4% (multiply by 0.04).',
         'Calculate the interest earned in one year on $500, $1,000 and $2,000 at 0.5%, 2% and 4% (nine answers). Then give one advantage of a jar at home and one advantage of a savings account.',
         'Why does a higher balance earn more interest at the same rate? Compare a youth savings account with a HISA: rate, risk, one pro and one con each.',
         'Report the real account and rate you found, and what your goal-card amount would earn in a year. Do you agree that a savings account "isn\'t worth it"? Give a reason.'],
        ['$500 × 0.02 = …', '$500 at 0.5% = $… ; at 2% = $… ; at 4% = $…'],
        ['$10 and $40.',
         '$2.50, $10, $20 · $5, $20, $40 · $10, $40, $80. Jar: easy to reach, no fees. Account: secure and earns interest.',
         'Interest is a percentage of the amount, so a larger amount gives a larger dollar value. Both accounts are very low risk; HISA pays more but the rate can change.',
         'A real rate with its source, a correct calculation and a reasoned opinion.']),
      media: [
        M(1, 'image', 'Savings account comparison tool', 'A real comparison of account rates and fees.', 'Financial Consumer Agency of Canada: Account Comparison Tool', 'https://itools-ioutils.fcac-acfc.gc.ca/ACT-OCC/SearchFilter-eng.aspx', 'FCAC account comparison tool'),
        M(2, 'image', 'CDIC deposit protection', 'Explains why money in a bank account is secure.', 'Canada Deposit Insurance Corporation', 'https://www.cdic.ca/', 'CDIC how deposit insurance works')
      ]
    }),

    L(7, 'Investments, Risk and Timelines', 'Investing & Risk', 'C2.1, C2.3', {
      slides: [
        S('Start here: slow and sure, or a gamble?', '🎯',
          `**Think:** Would you rather have $100 that grows slowly but is safe, or $100 that might grow a lot or might shrink?\n\n**Today we learn:** investing and risk.`,
          `**Minds On:** Would you rather have $100 that grows slowly but is guaranteed, or $100 that might grow a lot, or might shrink? Why?\n\n**We are learning to** compare investments by risk and return, and match one to a goal's timeline.`,
          `**Expectations:** C2.1, C2.3. **I can** order investments by risk and explain why timeline matters.`),
        S('Five investment words', '📊',
          `- **Stock:** a small piece of a company.\n- **Bond:** you lend money and get it back with interest.\n- **Mutual fund:** a mix of many investments.\n- **GIC:** money locked in for a set time. The interest is guaranteed.\n- **TFSA:** an account where your savings grow without tax. You must be 18.\n\n**More possible return = more risk.**`,
          `- **Stock:** a share, or piece, of a public company owned by an investor.\n- **Bond:** an investment where you temporarily lend money to a company or government, with the promise of repayment plus interest.\n- **Mutual fund:** a mix of stocks, bonds and other investments, shared by many investors.\n- **GIC (Guaranteed Investment Certificate):** money is locked in for a set time and returned with a guaranteed amount of interest.\n- **TFSA (Tax-Free Savings Account):** an account where savings and investments can grow without being taxed. Available at age 18.\n\n| | GIC | Bonds | Mutual funds | Stocks |\n| Rate of return (example) | 2.5% | 6% | 8% | 12% |\n| Risk | Low | Medium | High | Very high |\n| Pro | Very secure | Relatively secure | Mix of investments | Can earn the highest return |\n| Con | Locked in; low rate | Locked in for a period | Management fees | Can lose value quickly |`,
          `**The rule:** higher potential return usually comes with higher risk. The example rates are not promises: only the GIC's is guaranteed. $2,000 for a year could earn $50 in the GIC (guaranteed) or $240 in stocks (not guaranteed; it could also lose money).`),
        S('Meet Sophia', '🎓',
          `> Sophia reached her watercolour goal. Now she wants to save for art school in **4 years**. Should she keep saving or try investing?\n\n- **Short-term goal:** keep it safe (savings account, GIC).\n- **Long-term goal:** you can think about higher risk, because there is time to recover.\n\n**Example:** $1,000 in a GIC at 2.5%: $1,000 × 0.025 = $25. Total **$1,025**.`,
          `> Sophia reached her watercolour goal. Now she is thinking further ahead: she would like to save for post-secondary art school in four years. She wonders whether she should keep saving in an account or try investing.\n\n**Should her choice change now that the goal is long-term?**\n\n- For a short-term goal, lower-risk options (savings account, TFSA, GIC) keep money secure.\n- For a mid- or long-term goal, higher-risk options (bonds, mutual funds, stocks) may earn more, but can also lose value.\n- Before investing: consider the goal, do research and talk to a trusted financial professional.\n\n${TEST_TIP}\n\nKiara is saving for a trip in 6 months, cannot lose any money and needs access. **A high interest savings account.**\n\nMateo is 16 and wants to grow money for a home in 15 years. Over a long timeline he **may consider higher-risk options**, because there is time to recover from short-term losses.`,
          `**Worked example:** Olivia puts $1,000 into a one-year GIC at 2.5%. $1,000 × 0.025 = $25, so she has **$1,025**.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- Risk, low to high: **GIC → bond → mutual fund → stock**\n- More possible return = more risk.\n- Short-term goal = keep it safe.\n- **TFSA** = age 18.`,
          `**Copy this note into your notebook:**\n\n- Risk ladder: **GIC (low) → bond (medium) → mutual fund (high) → stock (very high).**\n- Higher potential return usually comes with higher risk.\n- **Short-term goal:** savings account or GIC. **Long-term goal:** may consider higher risk, because there is time to recover.\n- **GIC:** locked in, guaranteed interest. **TFSA:** tax-free growth, from age 18.\n- Before investing: know the goal, research, ask a trusted financial professional.`,
          `Add what $2,000 could earn in one year at each example rate: $50, $120, $160 and $240, and which of those is guaranteed.`),
        S('Try it: match my goals to the ladder', '🧪',
          `**Your experiment:**\n\n1. Write 3 goals: one for soon, one for a few years, one far away.\n2. Next to each, write **safe** or **could take some risk**.\n3. Explain one choice to a partner or an adult.\n\n**Exit:** For a short-term goal I would choose ____ because ____.`,
          `**Your experiment: the risk ladder for my own goals.**\n\n1. Take your Lesson 5 goal card and add one mid-term and one long-term goal.\n2. For each goal, choose an option from the ladder (savings account, GIC, bond, mutual fund, stock) and give your reason using **risk** and **timeline**.\n3. Ask one adult how they decide where to keep money for a goal that is far away. Compare their answer with yours.\n\n| My goal | Timeline | Option | Why |\n\n**Exit ticket:** "For a short-term goal I would choose ____ because ____. For a long-term goal I would consider ____ because ____."`,
          `**Record your result:** your three matches and one thing the adult said that you had not thought of.`,
          `**Go further:** Nobody can count on earning $240 from the stocks in the example. Explain why, and describe the kind of person for whom that uncertainty is acceptable.`)
      ],
      terms: [
        ['stock', 'a small piece of a company', 'a share, or piece, of a public company owned by an investor'],
        ['bond', 'lending money and getting it back with interest', 'an investment where you temporarily lend money to a company or government, with the promise of repayment plus interest'],
        ['mutual fund', 'a mix of many investments', 'an investment made up of a mix of stocks, bonds and other investments, shared by many investors'],
        ['GIC', 'money locked in for a set time with guaranteed interest', 'Guaranteed Investment Certificate: money is locked in for a set time and returned with a guaranteed amount of interest'],
        ['TFSA', 'an account where savings grow without tax', 'Tax-Free Savings Account: an account where savings and investments can grow without being taxed, available at age 18']
      ],
      q: [
        mc('Which investment has the highest risk?', 'Stock', ['Bond', 'Mutual fund', 'GIC']),
        mc('When an investor buys a bond, they are', 'temporarily lending money to a company or government', ['buying part of a company', 'borrowing money from a bank', 'opening a savings account']),
        mc('Kiara is saving for a trip in 6 months. She cannot lose any money and needs access to it. Which option best matches her goal?', 'A high interest savings account', ['A mutual fund', 'A 5-year bond', 'Stocks']),
        mc('Olivia puts $1,000 into a GIC that pays 2.5% per year for one year. How much will she have at the end?', '$1,025', ['$1,002.50', '$1,250', '$975']),
        mc('Which list orders the investments from lowest risk to highest risk?', 'GIC, bond, mutual fund, stock', ['Stock, mutual fund, bond, GIC', 'Bond, GIC, stock, mutual fund', 'Mutual fund, stock, GIC, bond']),
        mc('Hugo puts $2,000 into a one-year GIC that pays 3% per year. How much will he have at the end of the year?', '$2,060', ['$2,006', '$2,600', '$1,940']),
        tfx('Higher potential return usually comes with higher risk.', 'Stocks are guaranteed to earn 12% every year.'),
        fill('A TFSA is available at age ___.', '18', ['16', '10', '65']),
        app('Mateo is 16 and wants to grow money for a home he hopes to buy in 15 years. Which statement best supports his decision?', 'Over a long timeline, he may consider higher-risk options like mutual funds or stocks', ['He should keep all his money in a youth savings account', 'He should avoid all investments because they have risk', 'He should use a credit card to invest']),
        app('Ty puts $3,000 into a one-year GIC that pays 2.5% a year. How much will he have at the end of the year?', '$3,075', ['$3,025', '$3,750', '$3,007.50']),
        app('Nia is 17 and wants to open a TFSA today. What is the problem with her plan?', 'A TFSA is not available until age 18', ['A TFSA is only for stocks', 'A TFSA charges 20% interest', 'A TFSA is a kind of credit card'])
      ],
      rec: ['Which is safer: a GIC or a stock?', 'the risk ladder from memory, and where you would keep money for a goal that is one year away.', 'A … is safer than a … because …'],
      task: A('Match the goal to the option', 'C2.1, C2.3',
        ['Put these in order from safest to riskiest: stock, GIC, mutual fund, bond. Then pick the best choice for a trip in 6 months when you cannot lose any money.',
         'Using the example rates (GIC 2.5%, bonds 6%, mutual funds 8%, stocks 12%), calculate what $2,000 could earn in one year in each. Then choose a suitable option for each goal and explain why: (a) a trip in six months, cannot lose any money; (b) art school in four years; (c) a home in 15 years.',
         'Why can an investor not count on earning the stock amount? Name two things a person should do before investing.',
         'Report your own three goals matched to the ladder, with reasons that use both risk and timeline.'],
        ['From safest to riskiest: …', 'GIC: $2,000 × 0.025 = … ; bonds: …'],
        ['GIC, bond, mutual fund, stock. A savings account for the trip.',
         '$50, $120, $160, $240. (a) high interest savings account; (b) GIC or bonds; (c) may consider mutual funds or stocks, each with a reason.',
         'Stocks are very high risk and change quickly. Consider the goal and timeline, research, and talk to a trusted financial professional.',
         'Three goals, each with an option and a reason naming risk and timeline.']),
      media: [
        M(1, 'image', 'Risk and return chart', 'A staircase graphic of the four investments.', 'GetSmarterAboutMoney.ca (Ontario Securities Commission)', 'https://www.getsmarteraboutmoney.ca/learning-path/investing-basics/the-risk-return-relationship/', 'risk return relationship'),
        M(1, 'image', 'TFSA basics', 'Explains the account students can open at 18.', 'Canada Revenue Agency', 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account.html', 'CRA tax-free savings account')
      ]
    }),

    L(8, 'Loyalty Programs, Incentives and Ads', 'Deals & Ads', 'C2.1, C2.3', {
      slides: [
        S('Start here: did the ad work?', '🎯',
          `**Think:** Remember an ad or a deal you saw. What did it want you to do? Did it work?\n\n**Today we learn:** how deals work, and how to check them.`,
          `**Minds On:** Think of an ad or an online deal you saw recently. What was it trying to get you to do? Did it work?\n\n**We are learning to** analyse loyalty programs and incentives and work out the real total cost.`,
          `**Expectations:** C2.1, C2.3 (and B2.3 for personal information). **I can** calculate a discount, add 13% HST and spot upselling.`),
        S('Loyalty programs, incentives, cashback, upselling', '🏷️',
          `- **Loyalty program:** you collect points for shopping at a store.\n- **Incentive:** a reward to get you to buy (like free shipping).\n- **Cashback:** a little money back for what you spend.\n- **Upselling:** a deal that makes you spend **more** than you planned.`,
          `- **Loyalty program:** an incentive program that rewards members with discounts or points they can collect and use on future purchases. *Each $1 earns 10 points; 5,000 points = $5 off.*\n- **Incentive:** a reward offered by a company to encourage consumers to buy or use its products.\n- **Cashback:** an incentive, often from credit card companies, that gives back a small percentage of the amount spent. *1% cashback returns $4 on a $400 bike.*\n- **Upselling:** when a promotion encourages a customer to spend more than they planned. *"Spend $25 more to get free shipping!"*\n\n| Short-term incentive | What it is |\n| Flash sale | A big price cut that lasts only a few hours |\n| Instant rebate | Immediate savings at the time of purchase |\n| First-time buyer code | A one-time discount in exchange for your email address |\n| Bundled gift | A free item if you buy right away |\n\n**Watch for:** extra costs at checkout · requests for personal information · promotions used to upsell.`,
          `**Total cost in Ontario:** sale price = price × (1 − discount). Then add **13% HST**: sale price × 1.13. *$120 shoes at 25% off: $120 × 0.75 = $90; $90 × 1.13 = $101.70.*`),
        S('Meet Nimki', '🚲',
          `> Nimki wants a bike. He sees ads for points, discounts, free shipping and cashback. Are they all good deals?\n\n**Store A:** $400 bike, 25% off, plus $30 shipping.\n$400 × 0.75 = $300. $300 + $30 = **$330**\n\n**Store B:** $380, free shipping = **$380**\n\nStore A is **$50 cheaper**.`,
          `> Nimki wants to buy a bicycle to get to school and around his community. As he compares bikes and retailers, he sees ads for loyalty programs, discounts, free shipping and cashback offers. Some deals look like big savings, but he isn't sure they're all worthwhile.\n\n**Before signing up or choosing a deal:** Am I comfortable giving this retailer my personal information? Will I buy anything else here? (Unused points are worth nothing.) What is the total cost, including tax, shipping and fees? Does the incentive give real value, or does it encourage extra spending?\n\n${TEST_TIP}\n\nStore A: $400 bike, 25% off, plus $30 shipping. $400 × 0.75 = $300 + $30 = **$330**. Store B: $380, free shipping. Store A is cheaper by **$50**.\n\nHeadphones are advertised at $80. With 13% HST: $80 × 0.13 = $10.40, so **$90.40**.`,
          `**Worked example:** Shipping is $8, or free over $75. Zane's cart is $68. Without adding anything he pays $68 + $8 = $76. He adds a $14 item for "free" shipping and pays $82. He spent **$6 more**. That is upselling.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Incentive** = a reward to make me buy.\n- **Upselling** = I spend more than I planned.\n- Ontario tax (HST) = **13%**. Price × 1.13.\n- Always check the **total cost**.`,
          `**Copy this note into your notebook:**\n\n- **Incentive:** a reward meant to make me buy. **Loyalty program:** points or discounts for coming back. **Cashback:** a small percentage returned.\n- **Upselling:** a promotion that gets me to spend more than I planned.\n- **Sale price = price × (1 − discount).** **With HST = sale price × 1.13.**\n- Compare **total cost**: price − discount + shipping + tax.\n- A discount in exchange for my email, phone number or birthday is paid for with my personal information.`,
          `Add: 10 points per $1 and 5,000 points = $5 means spending $500 to earn $5, a reward worth 1%.`),
        S('Try it: deal detective', '🧪',
          `**Your experiment:**\n\n1. Find a real ad or flyer deal (online or paper).\n2. Write the price and the deal.\n3. Work out the price after the discount.\n4. Add tax: × 1.13.\n5. Is it a real saving, or does it make you spend more?\n\n**Exit:** One deal that could make me spend more is ____.`,
          `**Your experiment: deal detective.**\n\n1. Find **two real deals** this week: a flyer, a store sign, an app notification or an online ad. Screenshot or copy the wording.\n2. For each, calculate the total cost of one item including 13% HST and any shipping.\n3. Decide: **real value** or **encourages extra spending**? What personal information does it ask for?\n\n| Deal (exact words) | Price | Total with HST | Real value or upsell? | Information asked for |\n\n**Exit ticket:** Name one incentive that could save you money and one that could make you spend more than you planned. Explain each.`,
          `**Record your result:** both deals, your calculations and your verdict.`,
          `**Go further:** "Buy one, get one 50% off" on two $40 shirts costs $60. Explain when this is a saving and when it is $20 of extra spending, and write a rule you could use in a store.`)
      ],
      terms: [
        ['loyalty program', 'collecting points for shopping at one store', 'an incentive program that rewards members with discounts or points they can collect and use on future purchases'],
        ['incentive', 'a reward to get you to buy', 'a reward offered by a company to encourage consumers to buy or use its products'],
        ['cashback', 'a little money back for what you spend', 'an incentive that gives back cash or credit equal to a small percentage of the amount spent'],
        ['upselling', 'a deal that makes you spend more than you planned', 'when a promotion encourages a customer to spend more than they planned'],
        ['flash sale', 'a big price cut for a few hours', 'a big price cut that lasts only a few hours'],
        ['bundled gift', 'a free item if you buy right now', 'a free item offered if a customer buys right away']
      ],
      q: [
        mc('A store offers a free water bottle if you buy a bike today. This is an example of a', 'bundled gift', ['flash sale', 'loyalty program', 'annual fee']),
        mc('Why do stores often ask for your email address to give you a first-time buyer discount?', 'To add you to their marketing emails', ['To check your credit score', 'To charge you an annual fee', 'To open a bank account for you']),
        mc('Store A: $400 bike, 25% off, plus $30 shipping. Store B: $380 bike, free shipping. Which store has the lower total cost, and by how much? (Ignore tax.)', 'Store A, by $50', ['Store B, by $20', 'Store A, by $20', 'They cost the same']),
        mc('Headphones are advertised for $80. In Ontario, 13% HST is added. What is the total cost?', '$90.40', ['$93.00', '$80.13', '$10.40']),
        mc('A $90 jacket is on sale for 20% off. Ontario\'s 13% HST is added to the sale price. What is the total cost?', '$81.36', ['$72.00', '$101.70', '$83.70']),
        mc('Free shipping starts at $60. Ari\'s cart totals $51, so he adds a $15 item he had not planned to buy. Which concept does this show?', 'Upselling', ['Cashback', 'A flash sale', 'An instant rebate']),
        mc('Store A sells headphones for $150 at 10% off, plus $12 shipping. Store B sells them for $140 with free shipping. Which has the lower total cost, and by how much?', 'Store B, by $7', ['Store A, by $5', 'Store A, by $7', 'Store B, by $22']),
        tfx('Unused loyalty points are worth nothing.', 'A deal with the biggest percentage off always has the lowest total cost.'),
        fill('In Ontario, ___% HST is added at checkout.', '13', ['3', '30', '50']),
        app('Aiden joins a clothing store\'s loyalty program for 10% off. He does not plan to shop there again, and the program requires his phone number and birthday. What matters most?', 'Whether the discount is worth sharing his personal information', ['How many points his friends have', 'Whether the store has a flash sale next year', 'Whether the store sells bikes']),
        app('A video game is advertised for $50. With 13% HST, what is the total cost?', '$56.50', ['$50.13', '$63.00', '$6.50']),
        app('A credit card gives 2% cashback. How much cashback is earned on a $350 purchase?', '$7', ['$70', '$3.50', '$20'])
      ],
      rec: ['What is one deal or ad you saw this week?', 'one real deal you have seen, the incentive it used, and whether it gave real value or encouraged extra spending.', 'One deal I saw was …'],
      task: A('Deal detectives', 'C2.1, C2.3',
        ['Shoes cost $120. They are 25% off. (1) What is the sale price? ($120 × 0.75) (2) Add tax: sale price × 1.13.',
         'Show your calculations (HST is 13%). (1) $120 running shoes at 25% off: total with HST? (2) Store A: $250 bike at 20% off plus $15 shipping. Store B: $230 with free shipping. Which is cheaper, and by how much? (3) "Buy one, get one 50% off": two $40 shirts. Total before tax? Is it a good deal if you only wanted one?',
         '(4) Shipping is $8, or free over $75. Zane\'s cart is $68 and he adds a $14 item. What does he pay each way, and what is this called? (5) 10 points per $1; 5,000 points = $5. How much must a shopper spend to earn $5?',
         'Name two things to think about before giving a store your email, phone number or birthday. Then report your two real deals and your verdict on each.'],
        ['$120 × 0.75 = … Then … × 1.13 = …', '(1) $120 × 0.75 = $… ; × 1.13 = $…'],
        ['$90, then $101.70.',
         '$101.70 · Store A at $215, cheaper by $15 · $60, and not a saving if you wanted one shirt.',
         '$76 versus $82, $6 more, upselling · $500 (a 1% reward).',
         'Privacy and marketing use are weighed against the discount, and two real deals are analysed with totals.']),
      media: [
        M(1, 'image', 'A real store flyer page', 'Gives students deals to decode.', 'Any current local grocery or retail flyer', '', 'this week flyer Ontario'),
        M(3, 'video', 'How loyalty programs use your data', 'Connects discounts to personal information.', 'Office of the Privacy Commissioner of Canada', 'https://www.priv.gc.ca/en/privacy-topics/technology/online-privacy-tracking-cookies/', 'privacy commissioner loyalty programs personal information')
      ]
    }),

    L(9, 'Reward Credit Cards and Fees', 'Reward Cards', 'C2.1, C2.2', {
      slides: [
        S('Start here: read the ad twice', '🎯',
          `**Think:** An ad says, "0% interest for 12 months! 20,000 bonus points!" What would you ask before signing up?\n\n**Today we learn:** reward credit cards and their fees.`,
          `**Minds On:** An ad says: "0% interest for 12 months! Earn 20,000 bonus points!" What questions would you want answered before you sign up?\n\n**We are learning to** analyse a credit card offer: its incentives, its costs and who qualifies.`,
          `**Expectations:** C2.1, C2.2. **I can** compare rewards with fees and explain APR and introductory offers.`),
        S('Five card words', '💳',
          `- **Reward credit card:** a card that gives points or cashback.\n- **Annual fee:** money you pay every year to have the card.\n- **APR:** the yearly cost of borrowing on the card (about 20%).\n- **Introductory offer:** a special deal that ends.\n- **Qualified customer:** someone who meets the rules, like a minimum income.`,
          `- **Reward credit card:** a credit card that gives the cardholder benefits for using it: cashback, reward points or bank loyalty.\n- **Annual fee:** a fee paid every year to keep the card account active. Cards with higher fees usually have higher rewards.\n- **APR (Annual Percentage Rate):** the yearly cost of borrowing on a credit card. *A 19.99% APR charges about $20 a year on a $100 unpaid balance.*\n- **Introductory offer:** a special deal for new cardholders that lasts a limited time. *0% APR for 12 months, then 19.99%.*\n- **Qualified customer:** a person who meets the card's requirements, such as a minimum income or a history of on-time payments.\n\n| | Card A: Starter Cashback | Card B: Everyday Points | Card C: Travel Elite |\n| APR | 20.99% | 19.99% | 20.99% |\n| Annual fee | $0 | $89 | $139 |\n| Rewards | 0.5% cashback on everything | 3 points/$1 groceries and bills | 5 points/$1 travel; lounge passes |\n| Minimum income | None | $12,000 | $80,000 |`,
          `**Is a fee worth it?** Rewards earned = spending × reward rate. Compare with the annual fee. *$6,000 × 0.01 = $60 cashback, less than a $120 fee: a loss of $60 a year.*`),
        S('Meet Reid', '🔎',
          `> Reid keeps seeing card ads with points, cashback and bonuses.\n\n**Ask:** What happens after 12 months? (The rate goes up to about 20%.) Is there a yearly fee? Do I qualify?\n\n**Example:** Hana earns $14,000, rarely travels and wants no fees. **Card A** fits: $0 fee, no minimum income.`,
          `> While researching bikes, Reid keeps seeing credit card offers that promise points, cashback and bonuses. He wants to understand the incentives, rewards and fees attached to each type of card.\n\n**Questions before applying:** What are the incentives, and will I actually use them? What happens after 12 months? (The APR usually rises to about 20%.) What does "qualified customer" mean, and do I meet the requirements? Is there an annual fee, and do the rewards cover it?\n\n**Maple Saver Rewards Card (example):** welcome bonus of 20,000 points (= $200) when you spend $1,500 in the first 3 months · 0% introductory APR for 12 months, then 19.99% · $0 annual fee for qualified customers · minimum annual income $70,000.\n\n${TEST_TIP}\n\nHana is a college student earning $14,000 a year. She rarely travels and wants no fees. **Card A** has no annual fee and no income requirement.`,
          `**Worked example:** A student normally spends $200 a month. $200 × 3 = $600, less than the $1,500 needed for the welcome bonus. Reaching it would mean spending $900 more than planned.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Annual fee** = I pay it every year.\n- **APR** = yearly cost of borrowing (about 20%).\n- A 0% offer **ends**. Then the rate goes up.\n- Rewards must be **more** than the fee.`,
          `**Copy this note into your notebook:**\n\n- **APR:** the yearly cost of borrowing on a card, often about 20%.\n- **Annual fee:** paid every year, whether or not I use the rewards.\n- **Introductory offer:** temporary. After it ends, the regular APR applies.\n- **Qualified customer:** meets the requirements (income, payment history).\n- **Rewards = spending × reward rate.** Worth it only if rewards are greater than the fee, and only if I pay in full.\n- Before the points, check: the fee, the APR after the offer, the requirements.`,
          `Add the break-even example: an $89 fee at 1% cashback needs $89 ÷ 0.01 = $8,900 of spending a year.`),
        S('Try it: read a real offer', '🧪',
          `**Your experiment:**\n\n1. Find one real credit card ad (online, in the mail, at a bank).\n2. Find the **yearly fee**.\n3. Find the **interest rate (APR)**.\n4. Find one reward.\n5. Would you take it? Why?\n\n**Exit:** Before picking a card for its points, I would check ____ and ____.`,
          `**Your experiment: analyse a real card offer.**\n\nFind one real credit card offer (a bank website, an ad, mail at home). You are **not** applying. Answer the five questions from the lesson:\n\n| Question | What the offer says |\n| What are the incentives? | |\n| Are they useful to all consumers? | |\n| What are the costs (annual fee, APR)? | |\n| What requirements must applicants meet? | |\n| Who is the target audience? | |\n\nThen find the sentence in the smallest print and copy it.\n\n**Exit ticket:** A friend wants a card "because it has the most points." What two other things should they check first?`,
          `**Record your result:** the five answers and the fine-print sentence.`,
          `**Go further:** Match three people to Cards A, B and C and justify each with incentives, fees and requirements: a student who never travels, a parent earning $55,000 who buys lots of groceries, and a business traveller earning $95,000.`)
      ],
      terms: [
        ['reward credit card', 'a credit card that gives points or cashback', 'a credit card that gives the cardholder benefits for using it, such as cashback or reward points'],
        ['annual fee', 'money you pay every year to keep a card', 'a fee the cardholder pays every year to keep the card account active'],
        ['APR', 'the yearly cost of borrowing on a credit card', 'Annual Percentage Rate: the yearly cost of borrowing on a credit card'],
        ['introductory offer', 'a special deal for new customers that ends', 'a special deal for new cardholders that lasts a limited time, such as a 0% APR or bonus points'],
        ['qualified customer', 'a person who meets the card\'s rules', 'a person who meets the card\'s requirements, such as a minimum income or a history of on-time payments']
      ],
      q: [
        mc('Which term describes the yearly cost of borrowing on a credit card, including interest?', 'APR', ['Annual fee', 'Credit limit', 'Cashback']),
        mc('A card offers 0% interest for 12 months. What usually happens after the introductory period?', 'The interest rate increases', ['The annual fee is refunded', 'The card is cancelled', 'The bank pays you interest']),
        mc('Hana earns $14,000 a year, rarely travels and wants no fees. Card A: $0 fee, no minimum income. Card B: $89 fee, $12,000 minimum. Card C: $139 fee, $80,000 minimum. Which card suits her best?', 'Card A: Starter Cashback', ['Card B: Everyday Points', 'None, she does not qualify for any', 'Card C: Travel Elite']),
        mc('Ravi\'s card has a $120 annual fee and 1% cashback. He spends about $6,000 a year and pays in full each month. Which statement is true?', 'The rewards he earns are less than the annual fee', ['He earns $120 more than he pays in fees', 'The card costs Ravi nothing', 'He earns $600 in cashback']),
        mc('A reward card has a $99 annual fee and gives 1.5% cashback. Dana spends $4,000 a year and pays in full. Which statement is true?', 'The rewards she earns are less than the annual fee', ['She earns $600 in cashback', 'Her rewards and fee are exactly equal', 'She earns $99 more than the fee']),
        mc('What does "qualified customer" mean in a credit card offer?', 'A person who meets the card\'s requirements, such as a minimum income', ['Anyone who sees the ad', 'A person who already has ten cards', 'A person under 16']),
        tfx('An annual fee is paid every year to keep the card.', 'A 0% introductory APR lasts for as long as you keep the card.'),
        fill('APR stands for Annual ___ Rate.', 'Percentage', ['Payment', 'Points', 'Purchase']),
        app('A card has a $150 annual fee and gives 2% cashback. Sana spends $5,000 a year and pays in full each month. Which statement is true?', 'She pays $50 more in fees than she earns in cashback', ['She earns $50 more than the fee', 'She earns $1,000 in cashback', 'The fee and cashback are equal']),
        app('Jo carries a $500 balance on a credit card for one year. The APR is 20%. About how much interest is Jo charged?', '$100', ['$10', '$20', '$520']),
        app('A welcome bonus needs $1,500 of spending in 3 months. A student normally spends $200 a month. What is the best conclusion?', 'The student would have to spend $900 more than planned, so the bonus is not a real saving', ['The student earns the bonus automatically', 'The bonus is free money for everyone', 'The student should borrow to reach $1,500'])
      ],
      rec: ['What is an annual fee?', 'two things you would check about a credit card before looking at its points, and why each matters.', 'An annual fee is …'],
      task: A('Which card fits whom?', 'C2.1, C2.2',
        ['Card A has no fee and no minimum income. Card C costs $139 a year and needs $80,000 income. A student earns $14,000. Which card fits? Why?',
         'Use the card table (A: $0 fee, 0.5% cashback, no minimum income; B: $89 fee, 3 points/$1 on groceries and bills, $12,000 minimum; C: $139 fee, 5 points/$1 on travel, $80,000 minimum). (1) A parent earns $55,000 and spends mostly on groceries and bills: which card? (2) A business traveller earns $95,000 and flies monthly: which card? (3) A student spends $4,000 a year on Card A and pays in full: how much cashback?',
         '(4) A card has an $89 fee and 1% cashback. How much must be spent in a year for the cashback to equal the fee? (5) After a 0% offer ends, a cardholder carries $1,000 unpaid for a year at 19.99%. About how much interest?',
         'Report your analysis of a real card offer: incentives, costs, requirements and target audience. Would the rewards cover the fee for someone who spends $3,000 a year?'],
        ['Card … fits because …', '(1) Card … because …'],
        ['Card A, because there is no fee and no income rule.',
         'Card B (qualifies; best rewards on groceries and bills) · Card C (qualifies; most on travel) · $4,000 × 0.005 = $20.',
         '$89 ÷ 0.01 = $8,900 · about $199.90.',
         'A real offer is analysed with all four parts and a rewards-versus-fee calculation.']),
      media: [
        M(1, 'image', 'Credit card comparison tool', 'Real cards with fees, rates and rewards side by side.', 'Financial Consumer Agency of Canada: Credit Card Comparison Tool', 'https://itools-ioutils.fcac-acfc.gc.ca/CCCT-OCCC/SearchFilter-eng.aspx', 'FCAC credit card comparison tool'),
        M(4, 'video', 'TVO Part 3 practice questions', 'Practice in the assessment format.', 'TVO Learn', 'https://tvolearn.com/', 'TVO Learn financial literacy practice Part 3')
      ]
    }),

    L(10, 'Review, Practice Assessment and Games', 'Unit Review', 'C2.1, C2.2, C2.3', {
      slides: [
        S('Start here: term speed-round', '🎯',
          `**60 seconds:** Write as many money words from this unit as you can. Circle 2 you are not sure about.\n\n**Today:** review and practice for the test.`,
          `**Minds On: term speed-round.** In 60 seconds, write as many key terms from this unit as you can. Circle the two you feel least sure about.\n\n**Today** is review: the key terms, the six calculations and a practice assessment. You need **7 out of 10 (70%)** to show you are ready.`,
          `**Expectations:** C2.1, C2.2, C2.3. The Financial Literacy Graduation Requirement needs 70%. If a first attempt falls short, a second attempt follows targeted review.`),
        S('All the key terms, in three parts', '🗂️',
          `**Part 1:** income · expense · cash · debit · credit card · debt · interest\n\n**Part 2:** saving · budget · goal · savings account · risk · stock · GIC\n\n**Part 3:** loyalty program · incentive · cashback · upselling · annual fee · APR`,
          `**Part 1:** Earning · Spending · Income · Expense · Method of payment · Cash · Debit card · E-transfer · Cryptocurrency · Credit card · Electronic wallet · Borrowing · Credit · Debt · Interest · Interest rate\n\n**Part 2:** Saving · Financial goal · Budget · Short/mid/long-term goals · Investing · Savings account · Rate of return · Risk · Stock · Bond · Mutual fund · GIC · TFSA\n\n**Part 3:** Loyalty program · Incentive · Cashback · Flash sale · Instant rebate · Bundled gift · Upselling · Reward credit card · Annual fee · APR · Introductory offer · Qualified customer`,
          `**Sort check:** money you own (cash, debit, e-transfer) versus money you borrow (credit card, line of credit, loan). Risk ladder: GIC → bond → mutual fund → stock.`),
        S('The six calculations', '🧮',
          `1. **Income:** hours × pay, plus extras.\n2. **Left over:** income − expenses.\n3. **Interest:** amount × rate.\n4. **Weeks to save:** cost ÷ weekly savings.\n5. **Sale price:** price × (1 − discount).\n6. **With tax:** × 1.13.`,
          `| Calculation | Example |\n| Income = hours × wage + other income | (4 × $16) + $25 = $89 |\n| Total repaid = principal + (principal × rate) | $900 + ($900 × 0.10) = $990 |\n| Interest earned = amount × rate | $1,500 × 0.04 = $60 |\n| Weeks to a goal = amount ÷ weekly savings | $240 ÷ $16 = 15 weeks |\n| Sale price with HST = price × (1 − discount) × 1.13 | $70 × 0.80 = $56; $56 × 1.13 = $63.28 |\n| Rewards versus fee = spending × rate, compared with the fee | $7,500 × 0.01 = $75, less than a $99 fee |\n\n${TEST_TIP}`,
          `**Practice:** Zara earns $18 an hour for 10 hours and $20 for dog walking: (10 × $18) + $20 = **$200**. Chloe borrows $600 at 10% for a year: $600 + $60 = **$660**.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- Left over = income − expenses\n- Interest = amount × rate\n- Weeks = cost ÷ weekly savings\n- With tax = × 1.13\n- Read **all four** answers before I choose.`,
          `**Copy this note into your notebook (your study guide):**\n\n- Income = hours × wage + other income. Money left = income − expenses.\n- Interest = amount × rate (percentage as a decimal). Total = amount + interest.\n- Time to a goal = amount ÷ savings per week.\n- Sale price = price × (1 − discount). With HST = × 1.13.\n- Rewards = spending × rate; compare with the annual fee.\n- Test routine: read the scenario → read the question and **all four** options → eliminate → calculate.\n- My two least-sure terms: ________, ________.`,
          `Add your own definition for each of your two least-sure terms.`),
        S('Try it: practice assessment and study plan', '🧪',
          `**Your experiment:**\n\n1. Do this lesson's quiz. Write your score.\n2. Play one game in the Game Room with the unit words.\n3. Do the quiz again tomorrow. Did your score go up?\n\n**Exit:** The two words I will study are ____ and ____.`,
          `**Your experiment: test, study, retest.**\n\n1. Take this lesson's quiz as a practice assessment. Record your score.\n2. Rate how ready you are for each part, from 1 (not yet) to 4 (very):\n\n| Part | Topics | Ready? (1 to 4) |\n| Part 1 | Earning, spending, methods of payment, borrowing, credit, debt, interest | |\n| Part 2 | Financial goals, budgeting, savings accounts, investments, risk and timelines | |\n| Part 3 | Loyalty programs, incentives, advertising, reward credit cards and fees | |\n\n3. Study your weakest part with the Game Room (Matching or Jeopardy), then retake the quiz.\n\n**Exit ticket:** Which two terms will I study tonight? When will I try the practice questions again?`,
          `**Record your result:** first score, second score, and what you did in between. That is evidence for your Goal Journal check-in.`,
          `**Go further:** Write your own assessment-style question: a two-sentence scenario about a student, one question and four options with exactly one correct answer. Trade with a partner.`)
      ],
      terms: [
        ['method of payment', 'a way to pay', 'a way to pay for goods and services, such as cash, a debit card, a credit card or an e-transfer'],
        ['HST', 'the 13% tax added in Ontario', 'Harmonized Sales Tax: the 13% tax added to most purchases in Ontario'],
        ['instant rebate', 'money off right when you buy', 'immediate cash back or savings at the time of purchase'],
        ['mid-term goal', 'a goal that takes some months', 'a goal for something that takes longer to save for, like a special class or an outing'],
        ['line of credit', 'borrowed money you can use up to a limit', 'a form of borrowing that lets a person use a lender\'s money up to a set limit']
      ],
      q: [
        mc('Zara earns $18 an hour and works 10 hours a week. She also receives $20 a week for walking a dog. What is her total weekly income?', '$200', ['$180', '$160', '$38']),
        mc('Ben wants a $35 phone case without borrowing or paying interest. Which method would NOT meet his goal if he cannot pay it back in full right away?', 'Credit card', ['Debit card', 'E-transfer', 'Cash']),
        mc('Chloe borrows $600 for a used laptop. The loan charges 10% interest per year and she repays it after one year. How much does she repay in total?', '$660', ['$610', '$700', '$600']),
        mc('Sam wants to buy a car in five years. Which type of goal is this?', 'Long-term goal', ['Mid-term goal', 'Not a financial goal', 'Short-term goal']),
        mc('Lina is creating her first budget. She has already checked in with herself. What is the next step?', 'Look at her spending', ['Make a plan', 'Consider her income', 'Open a credit card']),
        mc('Dale wants to save $210 for a guitar. He can save $14 a week. How many weeks will it take?', '15 weeks', ['14 weeks', '21 weeks', '196 weeks']),
        mc('Ines walks to school all winter. Which item on her list is most likely a need?', 'Winter boots', ['Designer winter boots', 'A streaming subscription', 'Concert tickets']),
        mc('Kofi paid for a group gift. A friend in another city wants to send him her $12 share today. Which method is most appropriate?', 'An e-transfer', ['A mortgage', 'Mailing coins', 'A car loan']),
        mc('Lena needs her money in four months for a school trip. She cannot lose any of it and wants easy access. Which option is best?', 'A high interest savings account', ['A mutual fund', 'A 5-year GIC', 'Stocks']),
        tfx('You need 70% to meet the Financial Literacy Graduation Requirement.', 'On a test question, you should choose the first option that looks right without reading the others.'),
        fill('$1,500 saved at 4% for one year earns $___ in interest.', '60', ['6', '600', '15']),
        app('A $70 item is 20% off, and 13% HST is added to the sale price. What is the total cost?', '$63.28', ['$56.00', '$79.10', '$65.10']),
        app('A card gives 1% cashback and has a $99 annual fee. Someone spends $7,500 a year. Is the card worth it on rewards alone?', 'No: $75 in cashback is less than the $99 fee', ['Yes: $750 in cashback', 'Yes: the fee is refunded', 'No: cashback is always $0']),
        app('$900 is borrowed at 10% for one year. What is the total repaid?', '$990', ['$909', '$910', '$1,800'])
      ],
      rec: ['Which money word is hardest for you?', 'the two terms you feel least sure about, each with a definition in your own words and an example.', 'The hardest money word for me is … It means …'],
      task: A('Unit review: my study guide', 'C2.1, C2.2, C2.3',
        ['Show your work: (1) 4 hours at $16 an hour plus $25. Total? (2) A goal of $240, saving $16 a week. How many weeks?',
         'Quick calculations, with work shown: (1) 4 hours at $16 an hour plus a $25 allowance: total income? (2) $900 borrowed at 10% for one year: total repaid? (3) $1,500 saved at 4% for one year: interest earned? (4) A goal of $240, saving $16 a week: how many weeks?',
         '(5) A $70 item at 20% off, plus 13% HST: total cost? (6) 1% cashback on $7,500 of spending with a $99 annual fee: is the card worth it on rewards alone?',
         'Rate your readiness for Parts 1, 2 and 3 from 1 to 4. Report your first and second practice scores and exactly what you will study before the assessment.'],
        ['(4 × $16) + $25 = …', '(1) (4 × $16) + $25 = …'],
        ['$89 and 15 weeks.',
         '$89 · $990 · $60 · 15 weeks.',
         '$63.28 · $75 is less than $99, so no.',
         'Three ratings, two real scores and a specific study plan (which terms, when).']),
      extra: [journal(2, 'What is one thing you learned about money that could help with it?', 'What did you learn about money that affects your goals? Add or revise one financial goal (short-, mid- or long-term).')],
      media: [
        M(2, 'video', 'TVO practice assessment', 'The full practice assessment in the real format.', 'TVO Learn', 'https://tvolearn.com/', 'TVO Learn financial literacy graduation requirement practice assessment'),
        M(1, 'image', 'Unit word wall', 'All Part 1, 2 and 3 terms on one page for the speed-round.', 'Class-made (photograph your word wall)', '', 'financial literacy vocabulary word wall')
      ]
    })
  ]));

  /* ================= UNIT 3 · The World of Work and My Personal Profile ================= */
  units.push(U('work', 'Unit 3 · The World of Work and My Personal Profile', [
    'Who am I, and how is work changing? Job trends, my rights, my skills, what I like, and being safe online.',
    'Who am I, and how is work changing? Five lessons on trends and workers\' rights, transferable skills, interests and values, your personal profile, and your digital footprint and network.',
    'Strand B (B1.1–B1.3, B2.1–B2.4): trends that shape work, workers\' rights and responsibilities, Skills for Success, a personal profile built from inventories and evidence, and safe, purposeful use of digital media and networking.'
  ], [

    L(1, 'Trends Shaping Work, and Workers\' Rights', 'Trends & Rights', 'B1.1', {
      slides: [
        S('Start here: jobs that appear and disappear', '🎯',
          `**Think:** Name one job that did not exist when your parents were in Grade 10. Name one job that has almost gone.\n\n**Today we learn:** how work is changing, and your rights at work.`,
          `**Minds On:** Name one job that did not exist when your parents were in Grade 10, and one job that has almost disappeared. What changed?\n\n**We are learning to** describe trends that shape work, explain their impact on employers and workers, and know workers' rights and responsibilities in Ontario.`,
          `**Expectation:** B1.1. **Canadian data** (Statistics Canada, The Daily, September 3, 2024): **29%** of workers were in jobs highly exposed to AI that may benefit from it, **31%** in highly exposed jobs where some tasks might be replaced, and **40%** in jobs not highly exposed. *Exposure does not mean a job disappears. It means the tasks in that job are likely to change.*`),
        S('Trends and the labour market', '📉',
          `- **Trend:** the way something is changing over time.\n- **Labour market:** people who want jobs, and employers who need workers.\n- **Automation:** machines or AI doing tasks people used to do.\n- **Gig work:** short jobs through an app, paid per task. No benefits.`,
          `- **Trend:** a general direction in which something is changing over time.\n- **Labour market:** the supply of people who want to work and the demand from employers who need workers.\n- **Automation:** the use of technology, including artificial intelligence, to do tasks that people used to do. *Self-checkouts, chatbots, warehouse robots.*\n- **Gig work:** short-term, task-based or contract work, often found through a digital platform. It offers flexibility but usually no benefits or guaranteed hours.\n\n| Kind of trend | Examples | Impact |\n| Technological | AI, automation, remote work tools | Tasks change; workers need new skills |\n| Economic | Contract and gig work, outsourcing, rising cost of living | More flexibility, less security |\n| Social | Aging population, inclusion, work/life balance | More openings as people retire; fairer workplaces |`,
          `**Young workers in Canada, October 2026** (Labour Force Survey, The Daily, November 6, 2026): youth unemployment (ages 15 to 24) **13.7%**; all workers **6.7%**; **54.0%** of youth had a job. Young workers usually feel a slowdown first: less experience, more part-time and seasonal work.`,
          `**Go further:** A grocery store installs self-checkouts and cuts cashier hours, then hires staff to fix the machines and pick online orders. Explain the impact on the employer and on two different workers.`),
        S('Meet Amara: rights at work', '⚖️',
          `> Amara is 16. It is her first job. Her manager pays her $15 an hour "because she's a student." He asks her to clean a meat slicer. Nobody trained her.\n\n- **Pay:** the student minimum wage is **$16.90**. $15 is not legal.\n- **Safety:** she has the right to be trained and the right to say no to unsafe work.\n- **Do:** talk to the manager calmly. Tell a parent.`,
          `| Area | What every worker in Ontario should know |\n| Fair pay | Minimum wage is **$17.95** an hour. The student rate is **$16.90** for students under 18 who work 28 hours a week or less during school. |\n| Safe work | Three rights: to **know** about hazards, to **participate** in health and safety, and to **refuse** unsafe work. |\n| Respect | Ontario's Human Rights Code protects workers from discrimination and harassment. |\n| Responsibilities | Follow safety rules, use protective equipment, report hazards and injuries, and do the job you were hired to do. |\n\n> Amara, 16, has started her first job at a restaurant. Her manager pays her $15 an hour "because she's a student," asks her to clean a meat slicer she has never been trained to use, and changes her schedule by text the night before.\n\n- **Pay:** $15 is below the legal student minimum of $16.90.\n- **Safety:** she has the right to know the hazards and be trained, and the right to refuse unsafe work.\n- **First step:** speak to the manager calmly, with the facts, and tell a parent or trusted adult. If it is not resolved, she or a parent can contact Ontario's Ministry of Labour.`,
          `**Worked example:** $16.90 − $15.00 = $1.90 an hour. At 12 hours a week Amara is underpaid 12 × $1.90 = **$22.80** every week.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- Student minimum wage: **$16.90** an hour.\n- My 3 safety rights: **know · participate · refuse**.\n- **Automation** changes tasks.\n- **Gig work** = flexible, but no benefits.`,
          `**Copy this note into your notebook:**\n\n- Three kinds of trends: **technological, economic, social**.\n- **Automation** changes tasks; new skills are needed. **Gig work:** flexible, little security.\n- Ontario minimum wage: **$17.95**; student rate **$16.90** (under 18, 28 hours a week or less during school).\n- Three health and safety rights: **to know, to participate, to refuse unsafe work**.\n- My responsibilities: follow safety rules, use protective equipment, report hazards and injuries, do the job.\n- Human Rights Code: no discrimination or harassment.`,
          `Add the youth data: 13.7% youth unemployment against 6.7% overall (October 2026), and one reason for the gap.`),
        S('Try it: interview a worker', '🧪',
          `**Your experiment:**\n\n1. Ask an adult who works: "How has your job changed because of technology?"\n2. Ask: "Did you get safety training?"\n3. Write both answers.\n\n**Exit:** One trend that will change a job I like is ____.`,
          `**Your experiment: a two-question interview and a pay check.**\n\n1. Ask an adult about their job: **What has changed in your work in the last ten years, and why?** and **What safety training did you get, and when?**\n2. Classify the change: technological, economic or social.\n3. If you have a job (or a friend does), check a pay stub or your hourly rate against the legal minimum. Calculate a week's pay at 10 hours.\n\n**Exit ticket:** Choose a job you are interested in. Name one trend that will change it over the next ten years and explain how.`,
          `**Record your result:** the change, its type, and whether the worker was trained before doing risky tasks.`)
      ],
      terms: [
        ['trend', 'the way something is changing over time', 'a general direction in which something is changing over time'],
        ['labour market', 'people who want jobs and employers who need workers', 'the supply of people who want to work and the demand from employers who need workers'],
        ['automation', 'machines or AI doing tasks people used to do', 'the use of technology, including artificial intelligence, to do tasks that people used to do'],
        ['gig work', 'short jobs through an app, paid per task', 'short-term, task-based or contract work, often found through a digital platform'],
        ['minimum wage', 'the lowest pay the law allows', 'the lowest hourly pay an employer is legally allowed to pay a worker'],
        ['hazard', 'something at work that could hurt you', 'something in a workplace that could cause injury or illness']
      ],
      q: [
        mc('A driver finds jobs through an app and is paid per delivery, with no benefits. This is an example of', 'gig work', ['automation', 'outsourcing', 'a labour shortage']),
        mc('A grocery store installs self-checkouts and cuts cashier hours. It then hires staff to fix the machines and pick online orders. Which statement best describes the impact?', 'Some tasks disappear and new ones appear, so workers need new skills', ['Technology only destroys jobs', 'Only employers are affected', 'Technology has no effect on workers']),
        mc('Which of the following is a social trend affecting work?', 'An aging population', ['Self-checkout machines', 'More contract and gig work', 'A new AI tool']),
        mc('A worker is told to use a machine that has a broken safety guard. Which right applies most directly?', 'The right to refuse unsafe work', ['The right to a longer lunch', 'The right to choose a uniform', 'The right to a raise']),
        mc('Using technology to do tasks that people used to do is called', 'automation', ['gig work', 'a labour market', 'networking']),
        mc('Which of the following is an economic trend affecting work?', 'More contract and gig work', ['An aging population', 'A focus on inclusion', 'Remote work tools']),
        tfx('Workers in Ontario have the right to refuse unsafe work.', 'If a job is "highly exposed" to AI, that job will certainly disappear.'),
        fill('In Ontario, a worker has the right to know, the right to participate and the right to ___ unsafe work.', 'refuse', ['enjoy', 'ignore', 'sell']),
        app('Amara is paid $15 an hour, but the student minimum wage is $16.90. She works 12 hours a week. How much is she underpaid each week?', '$22.80', ['$1.90', '$180.00', '$12.00']),
        app('Statistics Canada estimated that 31% of workers were in AI-exposed jobs where tasks might be replaced and 29% in exposed jobs that may benefit. What share of workers were in highly exposed jobs in total?', '60%', ['40%', '2%', '100%']),
        app('Youth unemployment was 13.7% when the overall rate was 6.7%. Which reason best explains the gap?', 'Young workers have less experience and more part-time or seasonal jobs, so they lose hours first in a slowdown', ['Young people do not want to work', 'Employers are not allowed to hire anyone under 25', 'The two numbers measure the same people'])
      ],
      rec: ['What is one right you have at work?', 'the three health and safety rights and one situation at a real workplace where each would matter.', 'One right I have at work is …'],
      task: A('Amara\'s rights and the trends chart', 'B1.1',
        ['Amara is 16. She is paid $15 an hour. The student minimum wage is $16.90. (1) Is her pay legal? (2) She is asked to use a machine with no training. What can she do?',
         'Amara, 16, is paid $15 an hour "because she\'s a student," is asked to clean a meat slicer she has never been trained to use, and has her schedule changed by text the night before. (1) Is her pay legal? Explain using the student minimum wage. (2) She works 12 hours a week: how much is she underpaid each week? (3) Name the three health and safety rights and say which apply to the meat slicer. (4) List two responsibilities Amara has as a worker.',
         'Complete a trends chart: one technological, one economic and one social trend, each with its impact on employers and on workers.',
         'Suggest two reasons the youth unemployment rate is usually higher than the overall rate. Then report your worker interview and classify the change you heard about.'],
        ['Amara\'s pay is not legal because …', '(1) No, because the student minimum wage is …'],
        ['Not legal: $15 is less than $16.90. She can say no until she is trained.',
         'Not legal ($1.90 below); 12 × $1.90 = $22.80; right to know, participate and refuse (know and refuse apply); two real responsibilities.',
         'Three trends with a believable impact on each side.',
         'Two reasons (experience, part-time and seasonal work, last hired) and a real interview result.']),
      media: [
        M(1, 'image', 'AI exposure of Canadian jobs chart', 'Shows the 29 / 31 / 40 split at a glance.', 'Statistics Canada, The Daily (Sept. 3, 2024)', 'https://www150.statcan.gc.ca/n1/daily-quotidien/240903/dq240903b-eng.htm'),
        M(2, 'image', 'Ontario minimum wage table', 'The official source for the rates on the slide.', 'Ontario: Your guide to the Employment Standards Act', 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/minimum-wage')
      ]
    }),

    L(2, 'Transferable Skills and Skills for Success', 'Transferable Skills', 'B1.2, B1.3', {
      slides: [
        S('Start here: what I did last weekend', '🎯',
          `**Think:** List 3 things you did last weekend. Next to each, write one skill you used.\n\n**Today we learn:** the skills you already have.`,
          `**Minds On:** List everything you did last weekend: chores, sports, gaming, a job, helping family. Beside each one, write one skill you used.\n\n**We are learning to** identify transferable skills, name Canada's nine Skills for Success and describe our own skills with evidence.`,
          `**Expectations:** B1.2, B1.3. **I can** write a skill statement: "I can ____, as shown when I ____."`),
        S('Transferable skills and the nine Skills for Success', '🧰',
          `- **Transferable skill:** a skill you can use in many places.\n- **Technical skill:** a skill for one job, like driving a forklift.\n- **Lifelong learning:** you keep learning your whole life.\n\n**Nine Skills for Success:** adaptability · collaboration · communication · creativity · digital · numeracy · problem solving · reading · writing`,
          `- **Transferable skill:** a skill learned in one situation that can be used in many others. *Explaining rules as a coach, then explaining a product to customers.*\n- **Technical skill:** a skill needed for a specific job or task, usually learned through training. *Operating a forklift, writing code in Python.*\n- **Skills for Success:** the nine skills the Government of Canada says people need to take part in work, learning and life.\n- **Lifelong learning:** continuing to build knowledge and skills throughout life.\n\n| Skill | At a part-time job |\n| Adaptability | Covering a different station when a co-worker is away |\n| Collaboration | Working with the team to close on time |\n| Communication | Explaining a return policy clearly |\n| Creativity and innovation | Suggesting a better display |\n| Digital | Using the scheduling app and point-of-sale system |\n| Numeracy | Counting the float, calculating a discount |\n| Problem solving | Fixing an order made incorrectly |\n| Reading | Following a recipe card or safety data sheet |\n| Writing | Leaving clear shift notes |`,
          `**Skills employers will need:** STEM and digital · skilled trades · creative and people skills that machines do poorly · financial and business. Whatever the field, transferable skills help workers adapt when jobs change.`),
        S('Meet Mateo', '⚽',
          `> Mateo says he has "no experience." But he babysits his cousins, plays goalie, edits videos, and helps his grandmother with online banking.\n\n**His skills:** responsibility, teamwork, digital skills, communication.\n\n**Skill statement:** "I edit and post a video every week, so I learn software quickly and meet deadlines."`,
          `> Mateo says he has "no experience" for his first résumé. He has babysat his cousins for two years, plays goalie on a soccer team, edits videos for a small gaming channel and helps his grandmother with online banking and translating at appointments.\n\n**Which transferable skills does Mateo already have?**\n\n- Babysitting: responsibility, problem solving.\n- Goalie: collaboration and communication under pressure.\n- Video editing: digital skills, creativity, meeting deadlines.\n- Helping his grandmother: communication in two languages, numeracy, patience.\n\n**Skill statement:** "I edit and post a video every week, so I learn software quickly and meet deadlines."`,
          `**Worked example:** Layla worked two years at a busy fast-food restaurant and is applying to be a clinic receptionist. She should highlight **staying calm and communicating clearly with customers when it is busy**, because those skills transfer directly.`,
          `**Go further:** Why are transferable skills especially valuable when work is changing quickly? Answer using one Skill for Success by name.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- A **transferable skill** goes with me to any job.\n- Skill statement: **"I can ____, as shown when I ____."**\n- 3 Skills for Success I have: ____, ____, ____.`,
          `**Copy this note into your notebook:**\n\n- **Transferable skill:** used in many jobs and situations. **Technical skill:** for one specific job.\n- **Nine Skills for Success:** adaptability, collaboration, communication, creativity and innovation, digital, numeracy, problem solving, reading, writing.\n- **Lifelong learning:** skills keep growing after school.\n- **Skill statement:** "I can ____, as shown when I ____." Evidence = what I actually did, with numbers where possible.\n- "No experience" is rarely true: chores, sports, hobbies and helping family all count.`,
          `Add the example statement: "I can stay calm and solve problems, as shown when I looked after three children during a power outage and kept them safe and busy for two hours."`),
        S('Try it: my skills inventory', '🧪',
          `**Your experiment:**\n\n1. Rate yourself 1 to 4 on 3 skills: communication, problem solving, digital.\n2. For your best one, write what you did that proves it.\n3. Ask a friend or family member: "What am I good at?" Was it the same?\n\n**Exit:** "I am good at ____. For example, ____."`,
          `**Your experiment: rate, prove, compare.**\n\n1. Rate yourself on all nine Skills for Success from 1 (just starting) to 4 (a real strength).\n2. Give **evidence** for your two highest ratings.\n3. Ask someone who knows you well to name your two strongest skills **without** seeing your ratings. Do they match?\n4. List four experiences (school, home, work, volunteering, sports, hobbies) and the skills each one used.\n\n**Exit ticket:** Write one skill statement about yourself: "I am good at ____. For example, ____."`,
          `**Record your result:** your ratings, the other person's answer, and whether they matched. These skill statements go straight into your résumé in Unit 5.`)
      ],
      terms: [
        ['transferable skill', 'a skill you can use in many places', 'a skill learned in one situation that can be used in many others'],
        ['technical skill', 'a skill for one special job', 'a skill needed for a specific job or task, usually learned through training'],
        ['Skills for Success', 'nine skills everyone needs for work and life', 'the nine skills the Government of Canada says people need to take part in work, learning and life'],
        ['lifelong learning', 'learning new things your whole life', 'continuing to build knowledge and skills throughout life, in school and outside it'],
        ['numeracy', 'using numbers', 'the skill of using numbers, such as counting money or calculating a discount'],
        ['collaboration', 'working well with other people', 'the skill of working with others toward a shared goal']
      ],
      q: [
        mc('Which of the following is a transferable skill?', 'Problem solving', ['Holding a forklift licence', 'Using one brand of cash register', 'Knowing one store\'s product codes']),
        mc('Layla worked at a busy fast-food restaurant and is applying to be a receptionist at a medical clinic. Which experience should she highlight?', 'Staying calm and communicating clearly with customers when it is busy', ['How fast she can make a burger', 'The restaurant\'s menu prices', 'The uniform she wore']),
        mc('Which list contains only Skills for Success?', 'Adaptability, numeracy, writing', ['Numeracy, height, a driver\'s licence', 'Reading, luck, popularity', 'Forklift, slicer, cash register']),
        mc('A mechanic takes a course on electric vehicles ten years into her career. This is an example of', 'lifelong learning', ['gig work', 'automation', 'a systemic barrier']),
        mc('A skill that can be used in many different jobs and situations is a', 'transferable skill', ['technical skill', 'work value', 'credit']),
        tfx('Babysitting can show responsibility and problem solving.', 'Mateo has no skills to put on a résumé because he has never had a paid job.'),
        fill('Counting the float and calculating a discount use the skill of ___.', 'numeracy', ['writing', 'reading', 'creativity']),
        fill('Canada has ___ Skills for Success.', 'nine', ['two', 'fifty', 'three']),
        app('Which is the strongest skill statement?', '"I can solve problems calmly, as shown when I looked after three children during a power outage for two hours."', ['"I am a hard worker."', '"I have many skills."', '"People say I am nice."']),
        app('Mateo translates for his grandmother at appointments and helps with her online banking. Which Skills for Success does this show best?', 'Communication, digital and numeracy', ['Only technical skills', 'No skills, because it is unpaid', 'Only creativity']),
        app('Kayla babysits every weekend, is student council treasurer and sells stickers she designs online. Which pairing of skill and evidence is correct?', 'Numeracy: keeping the council\'s money as treasurer', ['Numeracy: babysitting', 'Reading: selling stickers', 'Adaptability: being a treasurer'])
      ],
      rec: ['What is one thing you are good at?', 'your two strongest Skills for Success, each with one piece of evidence from your own life.', 'I am good at … For example, …'],
      task: A('Skill statements', 'B1.2, B1.3',
        ['Write one skill statement about you: "I can ____, as shown when I ____."',
         'Write three skill statements using the pattern "I can ____, as shown when I ____." Each one names a skill and gives specific evidence. Then list four of your experiences and at least two skills each one used.',
         'Explain how a technical skill is different from a transferable skill, with an example of each.',
         'Choose one job you might want in the future. Which two of your skills would transfer to it, and which new skill would you need to learn? Report whether someone else\'s view of your strengths matched yours.'],
        ['I can …, as shown when I …', 'I can …, as shown when I …'],
        ['One statement names a skill and one thing I did.',
         'Three statements with specific evidence (numbers where possible); four experiences with skills.',
         'Technical = for a specific job, learned through training; transferable = useful in almost any job.',
         'A clear link between current skills and the job, a realistic skill to develop, and my comparison result.']),
      media: [
        M(1, 'video', 'Skills for Success videos', 'Short clips showing each skill at work.', 'Government of Canada', 'https://www.canada.ca/en/services/jobs/training/initiatives/skills-success/video.html'),
        M(4, 'image', 'Skills for Success wheel', 'The nine skills in one graphic for the self-rating.', 'Government of Canada', 'https://www.canada.ca/en/services/jobs/training/initiatives/skills-success/understanding-individuals.html')
      ]
    }),

    L(3, 'Who Am I? Interests, Values and Personality', 'Interests & Values', 'B2.1', {
      slides: [
        S('Start here: a free Saturday', '🎯',
          `**Think:** You have a free Saturday. No phone, no homework. What do you do? What does that say about you?\n\n**Today we learn:** your interests and what matters to you in a job.`,
          `**Minds On:** You have a free Saturday with no phone and no homework. What would you choose to do? What does your answer suggest about you?\n\n**We are learning to** use inventories to identify our interests, work values and personality, and to use the results wisely.`,
          `**Expectation:** B2.1. **I can** name my top interest types and work values and explain one limit of a quiz.`),
        S('Interests, work values and six types', '🧭',
          `- **Interest:** something you enjoy.\n- **Work value:** what matters to you in a job (like safe hours, good pay, helping people).\n- **Inventory:** a quiz about you. There are no wrong answers.\n\n**Six types:** Doers · Thinkers · Creators · Helpers · Persuaders · Organizers`,
          `- **Interest:** something a person enjoys doing or wants to learn more about.\n- **Work value:** something important to a person in a job, such as security, creativity, independence, income or helping others.\n- **Personality:** the patterns in how a person usually thinks, feels and behaves.\n- **Inventory:** a questionnaire that helps identify interests, values, skills or personality. It is not a test: there are no right or wrong answers.\n\n| Type (Holland Codes) | Likes to… | Example occupations |\n| Realistic (Doers) | Build, repair, work outdoors or with tools | Electrician, chef, heavy equipment operator |\n| Investigative (Thinkers) | Research, analyse, solve problems | Lab technologist, software developer |\n| Artistic (Creators) | Design, write, perform | Graphic designer, musician, animator |\n| Social (Helpers) | Teach, care for and support people | Nurse, teacher, child and youth worker |\n| Enterprising (Persuaders) | Lead, sell, start projects | Entrepreneur, sales manager |\n| Conventional (Organizers) | Work with data, details and systems | Bookkeeper, office administrator |`,
          `**Using quiz results wisely:** a quiz is a **mirror, not a map**. It shows patterns; it does not choose for you. Results change, so retake after new experiences. Look for patterns across several quizzes. Compare with what people who know you would say. Protect your privacy: check what a site collects before entering an email.`),
        S('Meet Hana', '🎨',
          `> Hana's quiz says **Helper** and **Creator**. She likes helping at a daycare and making posters. A relative says, "There's no money in that. Be an engineer."\n\n**What should Hana do?** The quiz is information, not an order. She can look for jobs that mix helping and creating, check the pay on Job Bank, and try it out by volunteering.`,
          `> Hana's quiz results show Social and Artistic interests. She enjoys helping at a daycare and designing posters, and she dislikes lab work. A relative tells her, "There's no money in that. Be an engineer."\n\n**How should Hana use her results? What else should she consider?**\n\n- The results are information, not instructions. They confirm what she already enjoys.\n- Look for occupations that combine helping and creating: early childhood educator, teacher, designer.\n- Income is a real work value too. She can research wages and outlook on Job Bank.\n- Test the fit with experience: volunteering, co-op or a part-time job.`,
          `**Worked example:** Devin's top types are Realistic and Investigative. His work values are working with his hands, solving problems and job security. **An electrician apprenticeship** fits: hands-on, problem solving, stable work.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Interest** = what I enjoy.\n- **Work value** = what matters to me in a job.\n- A quiz is a **mirror, not a map**.\n- My top type: ____.`,
          `**Copy this note into your notebook:**\n\n- **Interest:** what I enjoy. **Work value:** what matters to me in a job. **Personality:** how I usually think, feel and act.\n- **Inventory:** a questionnaire, not a test.\n- Six types: Realistic · Investigative · Artistic · Social · Enterprising · Conventional.\n- **A quiz is a mirror, not a map.** Results change; use several; check my privacy.\n- My top two types: ____ and ____. My top two work values: ____ and ____.`,
          `Add one limit of interest and personality quizzes, in your own words.`),
        S('Try it: take two quizzes', '🧪',
          `**Your experiment:**\n\n1. Rank the six types from 1 (most like me) to 6.\n2. Do the **Interests** quiz on Job Bank.\n3. Did the quiz agree with your ranking?\n4. Write 2 jobs it suggested.\n\n**Exit:** Three words that describe me are ____.`,
          `**Your experiment: predict, then test.**\n\n1. **Predict:** rank the six interest types from 1 (most like me) to 6 before any quiz.\n2. **Test:** complete the **Interests** and **Work values** quizzes on Job Bank (about ten minutes each). Optional: Abilities, Learning style or 16Personalities.\n3. **Compare:** did the results match your prediction? Which occupations were suggested?\n\n| Quiz | My top results | Occupations it suggested |\n| Interests | | |\n| Work values | | |\n\n**Exit ticket:** Write three words that describe you according to your results. Then name one result you disagree with, and explain why.`,
          `**Record your result:** prediction, results and the gap between them. They go into your Personal Profile next lesson.`,
          `**Go further:** Why might a quiz get you wrong? Give two reasons, then name two occupations from your results you would research further and why.`)
      ],
      terms: [
        ['interest', 'something you enjoy doing', 'something a person enjoys doing or wants to learn more about'],
        ['work value', 'something that matters to you in a job', 'something that is important to a person in a job, such as security, creativity, independence, income or helping others'],
        ['personality', 'how you usually think, feel and act', 'the patterns in how a person usually thinks, feels and behaves'],
        ['inventory', 'a quiz about you with no wrong answers', 'a questionnaire that helps a person identify their interests, values, skills or personality'],
        ['occupation', 'a kind of job', 'a type of work, such as electrician, nurse or graphic designer']
      ],
      q: [
        mc('Which of the following is a work value?', 'Job security', ['A driver\'s licence', 'A Grade 10 math credit', 'Being 170 cm tall']),
        mc('Devin\'s top interest types are Realistic and Investigative. He values working with his hands, solving problems and job security. Which option fits best?', 'An electrician apprenticeship', ['A telephone sales job', 'A job as a tour guide', 'A fashion blog']),
        mc('A person who enjoys teaching, caring for and supporting others is showing which interest type?', 'Social', ['Conventional', 'Realistic', 'Enterprising']),
        mc('What is the best way to use the results of a career quiz?', 'Use them as one source of information alongside experience and research', ['Follow the first result exactly', 'Ignore them completely', 'Let a relative choose from the list']),
        mc('A person who likes to build, repair and work with tools is showing which interest type?', 'Realistic', ['Artistic', 'Social', 'Conventional']),
        tfx('An inventory has no right or wrong answers.', 'Quiz results never change, so you only need to take a quiz once in your life.'),
        fill('A quiz is a mirror, not a ___.', 'map', ['test', 'job', 'mark']),
        fill('People with ___ interests like to design, write, perform and express ideas.', 'Artistic', ['Conventional', 'Realistic', 'Investigative']),
        app('Hana has Social and Artistic interests and a relative says, "There\'s no money in that." What is the most useful next step?', 'Research wages and outlook on Job Bank for jobs that combine helping and creating', ['Give up on her interests', 'Choose engineering without looking into it', 'Stop taking quizzes']),
        app('A quiz site asks for your full name, birth date and email before it shows results. What does this lesson say to do first?', 'Check what the site collects and why before entering anything', ['Enter everything quickly', 'Use a friend\'s information', 'Assume every quiz site is safe']),
        app('Your Interests quiz says Enterprising, but you rarely lead anything. Which explanation fits the lesson?', 'A short quiz depends on mood and experience, so look for patterns across several quizzes', ['The quiz is always right, so you must become a salesperson', 'Quizzes are useless', 'Your personality is broken'])
      ],
      rec: ['What is one thing you love doing?', 'your top two interest types and your top two work values, with one example from your life that supports each type.', 'One thing I love doing is …'],
      task: A('My quiz results and reflection', 'B2.1',
        ['Rank the six types (Doers, Thinkers, Creators, Helpers, Persuaders, Organizers) from most like you to least like you. Then write 2 jobs you might like.',
         'Record your results from the Job Bank Interests and Work values quizzes: your top results and at least three occupations suggested. Then answer: which results fit you well? Give an example from your life that supports one of them.',
         'Which result surprised you or seems wrong? Why might a quiz get this wrong? Explain one limit of interest and personality quizzes.',
         'Name two occupations from your results you would like to research further and say why. Compare your prediction with the quiz: what did you learn from the gap?'],
        ['The type most like me is … because …', 'My top interest results were … This fits me because …'],
        ['Six types are ranked. Two jobs are named.',
         'Top results for two quizzes, three occupations and one personal example as evidence.',
         'A reasoned explanation (mood, limited experience, short quiz) and one accurate limit.',
         'Two occupations with reasons, and a real comparison of prediction and result.']),
      media: [
        M(4, 'image', 'Job Bank career quizzes page', 'Where students take the two quizzes.', 'Job Bank, Government of Canada', 'https://www.jobbank.gc.ca/career-planning/quizzes'),
        M(1, 'image', 'Holland Codes hexagon', 'A diagram of the six interest types.', 'myBlueprint', 'https://myblueprint.ca/', 'Holland codes RIASEC hexagon')
      ]
    }),

    L(4, 'My Personal Profile and What Shapes My Choices', 'My Profile', 'B2.1, B2.2', {
      slides: [
        S('Start here: who influences me?', '🎯',
          `**Think:** Who or what has most shaped what you might do after high school? A person? A class? A show? Money?\n\n**Today we learn:** to build your profile and name what shapes your choices.`,
          `**Minds On:** Who or what has most influenced what you think you might do after high school? A person, a class, a show, money, something else?\n\n**We are learning to** build a personal profile and analyse the factors and barriers that shape our choices.`,
          `**Expectations:** B2.1, B2.2. **I can** summarize my profile in a few sentences and turn one barrier into a plan.`),
        S('Profile, strengths, factors and barriers', '🪪',
          `- **Personal profile:** what you know about yourself (interests, values, skills, experiences).\n- **Strength:** something you do well.\n- **Factor:** something that affects a choice.\n- **Barrier:** something that makes a goal harder.\n\n**Factors:** me · family and culture · friends and media · money and place.`,
          `- **Personal profile:** a record of what a person knows about themselves: interests, values, skills, strengths and experiences. It is updated as the person learns more.\n- **Strength:** something a person does well, often with less effort than other people need.\n- **Factor:** something that influences a decision. Factors can be personal, family, cultural, social or financial.\n- **Barrier:** something that makes it harder to reach a goal. A **systemic barrier** is built into how an organization or society works. *Personal: no driver's licence. Systemic: a workplace with stairs and no ramp.*\n\n| Personal | Family and culture | Peers and media | Money and place |\n| Interests, values, strengths, health, identity | Expectations, traditions, language, role models | What friends plan; what we see online | What things cost, where we live, which jobs are nearby |\n\nSome factors open doors and some are barriers. Naming them is the first step.`,
          `**What goes in a profile:** interests (with quiz results) · values · skills and strengths with evidence · experiences (school, work, volunteering, activities, family responsibilities) · influences and goals.`),
        S('Meet Samir', '🍳',
          `> Samir loves cooking. He makes dinner for his family 3 nights a week. His parents want him to take over their store. His friends plan to study business. The cooking school is 2 hours away.\n\n**Support:** a real interest and lots of practice.\n**Barriers:** family plans, friends, distance.\n**Plan:** show his family the costs, OSAP, and a cook apprenticeship that pays while he learns.`,
          `> Samir loves cooking and makes dinner for his family three nights a week. His parents own a convenience store and expect him to take it over. His friends plan to study business at university. The nearest culinary program is two hours away.\n\n**Which factors are influencing Samir?**\n\n- **Personal:** a real interest and years of practice. This is a strength.\n- **Family:** an expectation that may limit him, but also business experience he can use.\n- **Peers, money and distance** are pulling him away from his interest.\n- **A plan:** bring information to his family about costs, OSAP, co-op and a cook apprenticeship that pays while he learns.\n\n| Barrier | A possible plan |\n| "I can't afford the program." | Research OSAP grants and loans, scholarships and part-time work. Compare a program closer to home. |\n| "No one in my family has done this." | Talk to a guidance counsellor, find a mentor, visit an open house. |\n| "The program is far away." | Look at online courses, residence, transit and similar programs nearby. |\n| "People like me don't do that job." | Find role models, talk to someone in the field, know your rights under the Human Rights Code. |`,
          `**Worked example:** Priya loves biology and has Investigative interests. After one low mark she says, "I'm not smart enough for science." The factor at work is **her belief about her own ability**: a personal factor, and one she can change (growth mindset, Unit 1).`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- My **profile** = my interests, values, skills and experiences.\n- A **barrier** makes a goal harder.\n- First step: **name the barrier**. Then make a plan and ask for help.`,
          `**Copy this note into your notebook:**\n\n- **Personal profile:** interests · values · skills and strengths (with evidence) · experiences · influences and goals. It gets updated.\n- **Factors:** personal · family and culture · peers and media · money and place.\n- **Barrier:** makes a goal harder. **Systemic barrier:** built into how an organization or society works.\n- From barrier to plan: **name it → find supports and options → write at least two steps → say who can help.**`,
          `Add one example of a personal barrier and one of a systemic barrier.`),
        S('Try it: my influences map', '🧪',
          `**Your experiment:**\n\n1. Write 1 thing in each box that shapes your choices: Me · Family · Friends · Money.\n2. Put a ✓ if it helps you. Put an ✗ if it makes things harder.\n3. Pick one ✗. Write one step to get around it.\n\n**Exit:** One thing I now know about myself is ____.`,
          `**Your experiment: influences map and a first step.**\n\n| Factor | How it influences my choices | Opens doors, or a barrier? |\n| Personal | | |\n| Family and culture | | |\n| Peers and media | | |\n| Money and place | | |\n\n1. Fill in the map. Share only what you are comfortable sharing.\n2. Name one barrier and write a plan with at least two steps. Who could help?\n3. **Do step one this week** (for example, ask guidance one question, or look up one program's cost).\n\n**Exit ticket:** "One thing I now know about myself that I did not know a month ago is ____. Because of that, I will change my goal to ____."`,
          `**Record your result:** what you did for step one and what you found out.`,
          `**Go further:** Summarize your profile in three or four sentences, as if introducing yourself to a guidance counsellor. Mention interests, values and at least one strength with evidence.`)
      ],
      terms: [
        ['personal profile', 'what you know about yourself, written down', 'a record of what a person knows about themselves: interests, values, skills, strengths and experiences'],
        ['strength', 'something you do well', 'something a person does well, often with less effort than other people need'],
        ['factor', 'something that affects a choice', 'something that influences a decision, such as a personal, family, cultural, social or financial influence'],
        ['barrier', 'something that makes a goal harder to reach', 'something that makes it harder for a person to reach a goal'],
        ['systemic barrier', 'a barrier built into how a place or system works', 'a barrier that is built into how an organization or society works']
      ],
      q: [
        mc('Which of the following is an example of a systemic barrier?', 'A workplace entrance that has stairs and no ramp', ['Disliking early mornings', 'Choosing a different elective', 'Forgetting to hand in an application']),
        mc('Priya loves biology but, after one low mark, says, "I\'m not smart enough for science." Which factor is influencing her most?', 'Her belief about her own ability', ['The cost of university', 'Her friends\' plans', 'Where she lives']),
        mc('Samir\'s parents expect him to take over the family store. This is which kind of factor?', 'Family', ['Media', 'Place', 'Peers']),
        mc('Which is the best first step when facing a barrier?', 'Name the barrier and look for supports and options', ['Give up on the goal', 'Pretend it is not there', 'Wait for it to disappear']),
        mc('A barrier that is built into how an organization or society works is called', 'a systemic barrier', ['a work value', 'a personal profile', 'a strength']),
        tfx('A personal profile should be updated as you learn more about yourself.', 'Once you write a personal profile in Grade 10, it should never be changed.'),
        fill('Something a person does well, often with less effort than others, is a ___.', 'strength', ['barrier', 'factor', 'debt']),
        fill('"I can\'t afford the program" is a barrier. One plan is to research ___ grants and loans.', 'OSAP', ['HST', 'APR', 'GIC']),
        app('Samir wants to study cooking but the nearest program is two hours away and his family expects him to run the store. Which plan fits the lesson best?', 'Bring his family information about costs, OSAP, co-op and a cook apprenticeship that pays while he learns', ['Say nothing and hope they guess', 'Drop cooking because friends chose business', 'Move away without a plan']),
        app('A student says, "No one in my family has gone to college, so I can\'t." Which response turns the barrier into a plan?', 'Talk to a guidance counsellor, find a mentor and visit an open house', ['Agree and stop looking', 'Wait until Grade 12 to think about it', 'Apply only where friends apply']),
        app('Kayla\'s family expects her to become a pharmacist, but her interests are Artistic and Enterprising. How should this factor be described?', 'A family factor that could be a barrier or a support, depending on how she and her family work through it', ['A systemic barrier', 'Not a factor at all', 'A technical skill'])
      ],
      rec: ['Who helps you make choices about your future?', 'the two factors that influence your choices most, and whether each opens doors or acts as a barrier.', 'One person who helps me make choices is …'],
      task: A('My personal profile and barrier plan', 'B2.1, B2.2',
        ['Finish these: (1) I enjoy … (2) I am good at … (3) One thing that makes my goal harder is … (4) One person who can help is …',
         'Build your personal profile: top interests, work values, skills and strengths with evidence, experiences, and occupations or fields you want to explore. Then name one barrier that could get in the way after high school and write a plan with at least two steps. Who could help?',
         'Explain the difference between a personal barrier and a systemic barrier, with an example of each. Complete your influences map for the four kinds of factors.',
         'Summarize your profile in three or four sentences, as if introducing yourself to a guidance counsellor, and report what happened when you did step one of your plan.'],
        ['I enjoy … I am good at …', 'My top interests are … My work values are …'],
        ['Four sentences are finished.',
         'Five profile parts are filled in from my own results, and the plan has two realistic steps and a named helper.',
         'Personal affects one person\'s situation; systemic is built into an organization or society. Four factors mapped.',
         'The summary names interests, values and a strength with evidence, and step one was really done.']),
      media: [
        M(2, 'image', 'OSAP overview page', 'Shows the real funding source in Samir\'s plan.', 'Ontario: OSAP', 'https://www.ontario.ca/page/osap-ontario-student-assistance-program'),
        M(1, 'image', 'Human Rights Code poster', 'Supports the rights-based response to "people like me don\'t do that job."', 'Ontario Human Rights Commission', 'https://www.ohrc.on.ca/')
      ]
    }),

    L(5, 'Digital Footprint, Privacy and Networking', 'Online & Networking', 'B2.3, B2.4', {
      slides: [
        S('Start here: search yourself', '🎯',
          `**Think:** If a boss looked you up online tonight, what would they find? What do you want them to find?\n\n**Today we learn:** staying safe online and asking people about their jobs.`,
          `**Minds On:** If an employer or a scholarship committee looked you up tonight, what would they find? What would you want them to find?\n\n**We are learning to** manage a digital footprint, protect personal information and build a network.`,
          `**Expectations:** B2.3, B2.4. **I can** name one online risk and its protection, and write a polite request for an informational interview.`),
        S('Footprint, personal information, network', '👣',
          `- **Digital footprint:** everything you leave online. It is very hard to erase.\n- **Personal information:** things that show who you are (name, address, birthday, SIN).\n- **Network:** the people you know, and the people they know.\n- **Informational interview:** a short talk to learn about someone's job.`,
          `- **Digital footprint:** the trail of information a person leaves online: posts, photos, comments, likes, accounts and searches. It is very hard to erase.\n- **Personal information:** information that identifies a person, such as full name, birth date, address, phone number, school, photos and Social Insurance Number.\n- **Network:** the people a person knows, and the people they know, who can share information, advice and opportunities.\n- **Informational interview:** a short conversation with someone who works in a field, to learn about their job. A request for information, not for a job.\n\n| Risk | Protect yourself |\n| Oversharing personal information | Share less. Review privacy settings twice a year. |\n| Old posts seen by employers or schools | Review and remove posts. Ask: would I be fine with a future boss seeing this? |\n| Fake job offers and scams | Never pay to get a job. Never send banking details or a SIN before you are hired. |\n| Tracking and data collection | Read what an app asks permission for. Use strong, unique passwords and two-step sign-in. |`,
          `**How digital media can help:** **research** occupations and programs on reliable sites · **showcase** projects or a portfolio · **connect** with organizations and people in a field · **learn** with free courses.`),
        S('Meet Jordan', '🔌',
          `> Jordan wants to be an electrician. He says he knows no one in the trades. His public account has gaming rants and some rude jokes. A neighbour is an electrician.\n\n1. **Clean up** his posts first.\n2. **Ask** the neighbour for 15 minutes to talk about her job.\n3. Say **thank you** after.`,
          `> Jordan wants to become an electrician but says he knows no one in the trades. His public account is full of gaming rants and a few jokes in poor taste. A neighbour and a friend of his uncle are both electricians.\n\n- Clean up first: review public posts, delete or hide what he would not want an employer to see, check settings.\n- He does know people. He can ask his neighbour for a 15-minute informational interview.\n- Ask the guidance or co-op teacher about the Ontario Youth Apprenticeship Program.\n- Send a thank-you message afterward and stay in touch.\n\n**Networking in five steps:** list who you know → decide what you want to learn → ask politely and specifically → listen and take notes → say thank you and stay in touch.\n\n> "Hello Ms. Singh, I am a Grade 10 student and I am interested in the electrical trade. Would you have 15 minutes in the next two weeks to answer a few questions about how you started? Thank you for considering it. Jordan"`,
          `**Worked example:** Mia's account is private, but she has 900 followers, some she has never met. She posts her work schedule and store location. Followers can screenshot and share, so **the risk remains**. Schedules and locations are personal information.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- What I post **stays** online.\n- Never send my **SIN** or bank details before I am hired.\n- **Never pay** to get a job.\n- Ask: "Could I ask you 3 questions about your work?"`,
          `**Copy this note into your notebook:**\n\n- **Digital footprint:** everything I leave online; hard to erase. Test: would I be fine with a future boss seeing this?\n- **Personal information:** name, birth date, address, school, photos, SIN. A SIN is needed only **after** hiring.\n- Scam signs: paying to get a job; SIN or banking details asked for before an interview.\n- Private accounts reduce risk but do not remove it.\n- **Network:** people I know and people they know. **Informational interview:** a request for information, not a job.\n- Five steps: list → decide → ask → listen → thank.`,
          `Add the four parts of a good request message: a greeting, who I am, a specific and reasonable request, and thanks.`),
        S('Try it: footprint audit and one message', '🧪',
          `**Your experiment:**\n\n1. Search your own name. What comes up?\n2. Check the privacy settings on one account.\n3. Write the names of 3 people you could ask about their job.\n\n**Exit:** One thing I will change online this week is ____.`,
          `**Your experiment: audit, then reach out.**\n\n**Part 1 (private): tick what you have done in the last six months.**\n\n- I searched my own name to see what is public\n- I reviewed the privacy settings on each account\n- I removed or hid posts I would not want an employer to see\n- My usernames and profile photos are ones I would show an employer\n- I use different, strong passwords and two-step sign-in\n- I know who my followers are\n\nDo **one** unticked item today.\n\n**Part 2: network map.** List five people (at least two who are not family), how you know them and one question you could ask each. Write and, if you are ready, send one request for a 15-minute informational interview.\n\n**Exit ticket:** Name one thing you will change online this week, and one person you will ask about their work.`,
          `**Record your result:** how many items you could tick, the one you fixed, and whether your message was sent or answered. You do not need to record anything private.`,
          `**Go further:** Describe two ways you could use digital media to explore or reach a goal, and the two privacy steps that should go with them.`)
      ],
      terms: [
        ['digital footprint', 'everything you leave online', 'the trail of information a person leaves online: posts, photos, comments, likes, accounts and searches'],
        ['personal information', 'things that show who you are', 'information that identifies a person, such as full name, birth date, address, phone number and Social Insurance Number'],
        ['network', 'the people you know and the people they know', 'the people a person knows, and the people they know, who can share information, advice and opportunities'],
        ['informational interview', 'a short talk to learn about someone\'s job', 'a short conversation with someone who works in a field, to learn about their job'],
        ['privacy settings', 'controls for who can see your account', 'the controls on an account that decide who can see a person\'s posts and information'],
        ['scam', 'a trick to get your money or information', 'a dishonest offer designed to get a person\'s money or personal information']
      ],
      q: [
        mc('A message offers you a job and asks for your SIN and banking details before any interview. What is the safest response?', 'Do not send them, and check the employer through its official contact', ['Send only the banking details', 'Forward it to friends', 'Send the details quickly']),
        mc('Mia\'s account is private, but she has 900 followers, including strangers. She posts her work schedule and store location. Which statement is true?', 'Followers can screenshot and share, so the risk remains', ['Only employers can see private posts', 'Posting a schedule is always required', 'A private account removes all risk']),
        mc('Which piece of personal information should never be sent to an employer before you are hired?', 'Your Social Insurance Number', ['Your first name', 'The job you are applying for', 'Your availability']),
        mc('What is the purpose of an informational interview?', 'To learn about a person\'s work and field', ['To ask for a job on the spot', 'To sell a product', 'To get someone\'s banking details']),
        mc('The trail of information a person leaves online is called', 'a digital footprint', ['a network', 'a credit limit', 'an inventory']),
        tfx('A digital footprint is very hard to erase.', 'A real employer will ask you to pay for a uniform before your first interview.'),
        fill('The people you know, and the people they know, are your ___.', 'network', ['footprint', 'budget', 'profile photo']),
        fill('An informational interview is a request for ___, not for a job.', 'information', ['money', 'a raise', 'a password']),
        app('A "recruiter" asks for $50 for a uniform before an interview. What is the risk and the right response?', 'A job scam: never pay to get a job, verify the employer and tell an adult', ['No risk: pay quickly to secure the job', 'A loyalty program: collect the points', 'A normal fee: send banking details too']),
        app('Which message is the best request for an informational interview?', '"Hello Ms. Singh, I am a Grade 10 student interested in the electrical trade. Would you have 15 minutes in the next two weeks to answer a few questions? Thank you."', ['"hey can u get me a job"', '"I need to talk to you. Call me."', '"Tell me everything about your job right now."']),
        app('Kayla\'s public account includes arguments with classmates, and she also runs an online sticker shop. Which advice is best?', 'Remove the arguments, check her settings and use the shop to showcase her skills', ['Delete the shop and keep the arguments', 'Make more arguments public', 'Share her address so customers trust her'])
      ],
      rec: ['Who is one adult you could ask about their job?', 'one change you will make to your online presence and one person you will ask about their work, with your question.', 'One adult I could ask about their job is …'],
      task: A('My network map and interview request', 'B2.3, B2.4',
        ['List 3 people you could ask about their job. Next to each, write one question. Then write a short, polite message to one of them.',
         'Make a network map of five people (at least two who are not family): how you know each one and what you could ask them. Then write a message to one person asking for a 15-minute informational interview. Include a greeting, who you are, a clear request and a thank-you.',
         'For each situation, name the risk and what the person should do: a quiz app asks for access to contacts and location; a "recruiter" asks for $50 for a uniform before an interview; a friend tags you in an embarrassing photo.',
         'Describe one way you could use digital media to help you explore or reach a goal. Report on your footprint audit: what you changed, and whether your message was sent.'],
        ['Hello …, I am a Grade 10 student. Could I ask you …? Thank you.', 'Hello …, I am a Grade 10 student and I am interested in …'],
        ['Three people, three questions, one polite message.',
         'Five people with specific questions; the message has all four parts and a reasonable request.',
         'Tracking and data collection → decline or read permissions; a job scam → never pay, verify, tell an adult; digital footprint → ask them to remove it and adjust tagging.',
         'A realistic use of digital media and a real audit result.']),
      extra: [
        A('Unit 3 assignment: My Personal Profile', 'B1.3, B2.1, B2.2, B2.3, B2.4, A2.2',
          ['Make your profile with 4 short parts: (1) what I like, (2) 2 things I am good at and how I know, (3) one thing that shapes my choices, (4) 2 ways I stay safe online.',
           'Create a personal profile you could show a guidance counsellor, a co-op teacher or an employer. Five labelled parts: **1 Who I Am** (top interests and work values from at least two inventories; three occupations that match and why). **2 My Skills** (five transferable skills, each with a skill statement and evidence; one skill to develop). **3 What Shapes My Choices** (three factors; one barrier with a two-step plan). **4 My Online Presence and Network** (two ways I will use digital media, two privacy steps, a network map of five people and my interview request). **5 Reflection.** Type it here, or build it as slides or in myBlueprint and describe it here. Share only what you are comfortable sharing.',
           'Every skill needs specific evidence, and each factor should be labelled as opening doors or acting as a barrier.',
           'Part 5: What did you learn about yourself in this unit? Which Unit 1 goal did you revise, and why?'],
          ['Part 1: I like …', 'Part 1: Who I Am. My top interests are …'],
          ['Four parts are there, each with a sentence about me.',
           'All five parts are complete and labelled, built from my own quiz results and worksheets.',
           'Evidence is specific (what I did, with numbers where possible).',
           'The reflection names something learned and connects it to a revised goal.']),
        journal(3, 'What is one thing you learned about yourself?', 'What did you learn about your interests, values and skills? Revise one goal to fit: write the old goal, the new goal and the reason for the change.')
      ],
      media: [
        M(1, 'image', 'Privacy tips for youth', 'Five plain tips to pair with the risks table.', 'Office of the Privacy Commissioner of Canada', 'https://www.priv.gc.ca/en/about-the-opc/what-we-do/awareness-campaigns-and-events/privacy-education-for-kids/resources-for-teachers/five-tips-pp/'),
        M(1, 'video', 'Get Cyber Safe', 'Short videos on passwords and two-step sign-in.', 'Government of Canada: Get Cyber Safe', 'https://www.getcybersafe.gc.ca/')
      ]
    })
  ]));

  /* ================= UNIT 4 · Pathways and Postsecondary Destinations ================= */
  units.push(U('pathways', 'Unit 4 · Pathways and Postsecondary Destinations', [
    'Where could I go after high school? Five places to go, what I need to graduate, and how to choose and plan.',
    'Where could I go after high school? Four lessons on the five destinations, the diploma requirements and course pathways, comparing options, and turning a goal into a plan.',
    'B3.1, B3.2, C1.1, C1.2: researching postsecondary destinations, OSSD requirements and specialized programs, choosing a first destination with evidence, and building a pathway plan with supports and a contingency.'
  ], [

    L(1, 'Five Destinations After High School', 'Five Destinations', 'B3.1', {
      slides: [
        S('Start here: "What are you doing after high school?"', '🎯',
          `**Think:** When adults ask "What are you doing after high school?", what answer do they expect? What other answers are there?\n\n**Today we learn:** the five places you can go first.`,
          `**Minds On:** When adults ask, "What are you doing after high school?", which answers do you think they expect? Which other answers are possible?\n\n**We are learning to** describe Ontario's five postsecondary destinations and how to research them.`,
          `**Expectation:** B3.1. **I can** compare destinations by requirements, cost, length and credential, and the jobs they lead to.`),
        S('The five destinations', '🗺️',
          `| Destination | What it is |\n| Apprenticeship | Paid training on the job in a trade |\n| College | Hands-on programs, 1 to 3 years |\n| Community living | Support to live and work in the community |\n| University | Programs of 3 or 4 years, for a degree |\n| Workplace | Going straight to a job |\n\n**No destination is "the best." The best one fits you.**`,
          `- **Postsecondary destination:** where a person goes first after high school. In Ontario there are five.\n- **Credential:** official proof that a person has completed training or education: a certificate, diploma, degree or Certificate of Qualification.\n\n| Destination | What it is | Leads to |\n| Apprenticeship | Paid, on-the-job training with a skilled worker, plus some in-class learning | Certificate of Qualification in a skilled trade |\n| College | Applied, hands-on programs, usually one to three years | Certificate, diploma or degree |\n| Community living | Supports that help people with developmental disabilities live, work and take part in the community | Greater independence; supported work and activities |\n| University | Academic and professional programs, usually three or four years | Degree |\n| Workplace | Going directly into a job, with training from the employer | Income, experience and on-the-job training |`,
          `| Myth | Fact |\n| "University is the best destination." | The best destination fits a person's goals, interests and situation. |\n| "Apprentices don't earn money while they learn." | Apprentices are employees and are paid while they train. |\n| "You have to choose one and stay there." | People move between destinations and combine them over time. |\n| "Going straight to work means you stop learning." | Employers train workers, and many people return to school later. |`),
        S('Meet Noor', '🔧',
          `> Noor likes hands-on work. She is good at math. She wants to earn money soon. Her parents want her to go to university. There are 3 ways into electrical work.\n\n**Four questions to ask:**\n\n1. What do I need to get in?\n2. What does it cost? Would I be paid?\n3. How long is it? What do I finish with?\n4. What jobs does it lead to?`,
          `> Noor likes hands-on work, is strong in math and wants to start earning soon. Her parents want her to go to university. Her counsellor mentions three routes into electrical work: an apprenticeship, a college technician program and a university engineering degree.\n\n**Four questions to research for any option:**\n\n| Requirements | Cost |\n| Which courses and marks do I need to get in? | What are the tuition and living costs? Would I be paid? |\n\n| Length and credential | Jobs |\n| How long does it take, and what do I finish with? | What work does it lead to, and what is the outlook? |\n\nUse official sites: the school or program, **ontariocolleges.ca**, **OUInfo**, **Skilled Trades Ontario**, **Developmental Services Ontario** and **Job Bank**.`,
          `**Worked example:** Eli has a developmental disability. After high school he wants to work part time in a kitchen and live more independently, with support. He and his family should explore **community living with supported employment** first. Developmental Services Ontario is the access point for adults, and planning should start early.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n**Five destinations:** apprenticeship · college · community living · university · workplace\n\n- Apprentices are **paid** while they learn.\n- I can change or add destinations later.\n- Ask: get in? cost? how long? what jobs?`,
          `**Copy this note into your notebook:**\n\n- **Five destinations:** apprenticeship · college · community living · university · workplace.\n- **Credential:** proof of completed training (certificate, diploma, degree, Certificate of Qualification).\n- Apprenticeship: paid, on the job → Certificate of Qualification. College: 1 to 3 years → certificate or diploma. University: 3 or 4 years → degree.\n- **Four research questions:** requirements · cost (or pay) · length and credential · jobs and outlook.\n- Use official websites. People combine and move between destinations.`,
          `Add one advantage and one challenge for the two destinations you are most curious about.`),
        S('Try it: research two real options', '🧪',
          `**Your experiment:**\n\n1. Pick 2 destinations you are curious about.\n2. Find one real program or job for each (ask your teacher for the website).\n3. Write: how long is it? Does it cost money, or do you get paid?\n\n**Exit:** I am most curious about ____ and ____.`,
          `**Your experiment: research two programs on official sites.**\n\nChoose two **different** destinations and one real option in each.\n\n| | Option 1 | Option 2 |\n| Name and where it is offered | | |\n| Requirements to get in | | |\n| Length and credential | | |\n| Cost (or pay) | | |\n| Jobs it leads to | | |\n| Website I used | | |\n\nThen ask one adult what their first destination was, and whether they added another one later.\n\n**Exit ticket:** Which two destinations are you most curious about today? Write one question you have about each.`,
          `**Record your result:** the two options and the adult's pathway. You will compare these in a decision matrix in Lesson 3.`,
          `**Go further:** Which of the two fits you better right now? Explain using your personal profile from Unit 3 (interests, values, skills).`)
      ],
      terms: [
        ['postsecondary destination', 'where you go first after high school', 'where a person goes first after high school: apprenticeship, college, community living, university or the workplace'],
        ['credential', 'proof that you finished training or school', 'official proof that a person has completed training or education, such as a certificate, diploma or degree'],
        ['apprenticeship', 'paid training on the job in a trade', 'paid, on-the-job training with a skilled worker, plus some in-class learning'],
        ['college', 'hands-on programs of one to three years', 'applied, hands-on programs, usually one to three years, leading to a certificate, diploma or degree'],
        ['community living', 'support to live and work in the community', 'supports that help people with developmental disabilities live, work and take part in the community'],
        ['university', 'programs of three or four years for a degree', 'academic and professional programs, usually three or four years, leading to a degree']
      ],
      q: [
        mc('In which destination does a person earn wages while training on the job with a skilled worker?', 'Apprenticeship', ['College', 'University', 'Community living']),
        mc('Eli has a developmental disability. After high school he wants to work part time in a kitchen and live more independently, with support. Which destination should his family explore first?', 'Community living, with supported employment', ['A college graduate certificate', 'A four-year university degree', 'None: there are no options']),
        mc('Which credential does a completed apprenticeship lead to?', 'A Certificate of Qualification', ['A degree', 'A diploma', 'A report card']),
        mc('Which statement about the five destinations is true?', 'People often combine or move between destinations over time', ['University is always the best destination', 'Apprentices are not paid', 'Once you choose, you can never change']),
        mc('Which of the following is NOT one of Ontario\'s five postsecondary destinations?', 'Graduate school', ['The workplace', 'Community living', 'Apprenticeship']),
        mc('An apprentice spends most of the training time', 'working on the job with a skilled worker', ['in a university lecture hall', 'studying online alone', 'on unpaid leave']),
        tfx('Apprentices are paid while they train on the job.', 'Going straight to the workplace means a person stops learning.'),
        fill('A diploma, a degree and a Certificate of Qualification are each a ___.', 'credential', ['prerequisite', 'barrier', 'budget']),
        app('Noor likes hands-on work, is strong in math and wants to earn soon. Her parents prefer university. What should she do before deciding?', 'Research all three routes with the four questions: requirements, cost or pay, length and credential, and jobs', ['Choose university to avoid a discussion', 'Pick whatever her friends pick', 'Wait until Grade 12 to look']),
        app('A friend says, "College is for people who can\'t get into university." Which reply uses the lesson?', 'The best destination is the one that fits a person\'s goals, interests and situation', ['That is true for everyone', 'Only apprenticeships are worth doing', 'Nobody should go to college']),
        app('Which source is the most reliable for finding out what a college program requires?', 'The program\'s official page on ontariocolleges.ca or the college\'s own site', ['A comment on social media', 'A cousin who attended ten years ago', 'A random blog post'])
      ],
      rec: ['Which destination are you most curious about?', 'the two destinations you are most curious about and one question you have about each.', 'I am most curious about …'],
      task: A('Compare the destinations', 'B3.1',
        ['Pick 2 destinations. For each one, write: (1) how long it takes, (2) do you pay or get paid, (3) one good thing about it.',
         'Complete a comparison chart for apprenticeship, college, university, workplace and community living: typical length, whether the person pays or gets paid, one advantage and one challenge. Then research two real options from two different destinations: requirements, length and credential, cost or pay, jobs it leads to and the official website you used.',
         'What is a credential? Give two examples. Which myth from the lesson have you heard most often, and what is the fact?',
         'Which of your two options fits you better right now? Explain using your personal profile from Unit 3.'],
        ['The first destination is … It takes … You …', 'Apprenticeship: about … years; the person is paid …'],
        ['Two destinations, each with a length, pay or cost, and one good thing.',
         'Five destinations compared accurately, and two real options with facts from official sites.',
         'Credential defined with two examples; one myth corrected.',
         'The choice is tied to my interests, values or skills.']),
      media: [
        M(1, 'image', 'Skilled Trades Ontario: starting an apprenticeship', 'Shows the steps into the paid destination many students overlook.', 'Skilled Trades Ontario', 'https://www.skilledtradesontario.ca/apprenticeship/starting-your-apprenticeship/'),
        M(4, 'image', 'ontariocolleges.ca program search', 'Where students look up real programs.', 'ontariocolleges.ca', 'https://www.ontariocolleges.ca/')
      ]
    }),

    L(2, 'Graduation Requirements and Course Pathways', 'Diploma & Courses', 'B3.2', {
      slides: [
        S('Start here: count my credits', '🎯',
          `**Think:** How many credits do you have now? How many do you need to graduate? Write both numbers.\n\n**Today we learn:** what you need for your diploma, and how to pick courses.`,
          `**Minds On:** How many credits have you earned so far? How many do you think you need to graduate? Write both numbers down.\n\n**We are learning to** explain the OSSD requirements, plan a course pathway backward from a goal, and describe programs that open doors.`,
          `**Expectation:** B3.2. These requirements are for students who started Grade 9 in 2024 or later. Check your own progress with guidance.`),
        S('The OSSD by the numbers', '🎓',
          `**To graduate you need:**\n\n- **30** credits (17 you must take + 13 you choose)\n- **40** hours of community involvement\n- the literacy requirement\n- 2 online learning credits\n- **70%** on financial literacy (this course)`,
          `**The Ontario Secondary School Diploma (OSSD):** **30** credits in total · **17** compulsory · **13** optional · **40** hours of community involvement. Also required: the literacy requirement, two online learning credits, and 70% on the financial literacy requirement in this course.\n\n| Compulsory subject | Credits |\n| English (one per grade) | 4 |\n| Mathematics (Grades 9 and 10, plus one in Grade 11 or 12) | 3 |\n| Science | 2 |\n| Canadian history · Canadian geography | 1 each |\n| The arts · Health and physical education · French · Technological education | 1 each |\n| Career studies · Civics and citizenship | 0.5 each |\n| One STEM-related credit | 1 |\n\n- **Credit:** recognition for completing a course of at least 110 hours. A half-credit course, like this one, is 55 hours.\n- **Prerequisite:** a course that must be completed before another course or program.\n- **Course type:** in Grades 11 and 12, university (U), university/college (M), college (C), workplace (E) and open (O).\n- **Pathway:** the set of courses and experiences that leads to a destination. Plan it by working **backward** from the goal.`,
          `**Programs that open doors:** **Co-op** (credits through a work placement) · **SHSM** (Specialist High Skills Major: a bundle of courses and certifications in one sector) · **OYAP** (start an apprenticeship in Grade 11 or 12 through co-op) · **Dual credits** (a college course that also counts toward the OSSD).`),
        S('Meet Tyrell', '🚑',
          `> Tyrell wants to be a paramedic. He heard you only need 2 science credits to graduate. So he plans to take no more science.\n\n**The problem:** 2 credits is the least you need to **graduate**. The paramedic program needs **more**.\n\n**Fix:** look up the program. Plan backward. Grade 12 needs decide Grade 11 choices.`,
          `> Tyrell wants to become a paramedic. He has heard that only two science credits are required to graduate, so he plans to take no science after Grade 10. He has not looked at any college program requirements.\n\n**What is the problem, and what should he do?**\n\n- Compulsory credits are the **minimum** to graduate. Programs have their own prerequisites.\n- Look up the paramedic program on ontariocolleges.ca and list its required courses.\n- **Plan backward:** Grade 12 requirements decide his Grade 11 choices. *Paramedic program → requires Grade 12 English, biology and math → so take Grade 11 biology next year.*\n- Talk to guidance about a health and wellness SHSM or a co-op placement.`,
          `**Worked example:** Maya wants to study engineering at university. University engineering needs Grade 12 **university-preparation** math, which needs the Grade 11 U course first. A college or workplace math course in Grade 11 would close that pathway.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **30** credits: **17** must-take + **13** I choose.\n- **40** hours of community involvement.\n- A **prerequisite** is a course I need first.\n- **Plan backward** from my goal.`,
          `**Copy this note into your notebook:**\n\n- **OSSD:** 30 credits (17 compulsory + 13 optional) · 40 community involvement hours · literacy requirement · 2 online learning credits · 70% financial literacy.\n- Compulsory: 4 English, 3 math, 2 science.\n- **Prerequisite:** must be completed first. **Course types:** U, M, C, E, O.\n- Compulsory credits are the minimum to graduate. Programs ask for more.\n- **Plan backward:** program → Grade 12 courses → Grade 11 prerequisites.\n- Doors: co-op · SHSM · OYAP · dual credits.\n- My credits so far: ____. My hours so far: ____.`,
          `Add one course you now know you need in Grade 11, and the program requirement behind it.`),
        S('Try it: plan backward', '🧪',
          `**Your experiment:**\n\n1. Count your credits so far: ____\n2. Count your community hours so far: ____\n3. 30 − my credits = credits I still need: ____\n4. Pick one job you like. Ask your teacher or guidance: "What courses do I need for that?"\n\n**Exit:** One course I need in Grade 11 is ____.`,
          `**Your experiment: audit my progress, then plan backward.**\n\n**Part 1: my progress.** Fill in what you have so far: total credits (of 30), compulsory credits (of 17), community involvement hours (of 40), literacy requirement, online learning credits (of 2).\n\n**Part 2: plan backward.** Choose one program or destination and look it up on an official website.\n\n| Step | My answer |\n| The program or destination, and where | |\n| Required Grade 12 courses (with course type) | |\n| Grade 11 courses I need as prerequisites | |\n| Other requirements (marks, portfolio, experience) | |\n| Website I used | |\n\n**Exit ticket:** Name one course you now know you need to take in Grade 11, and explain why.`,
          `**Record your result:** credits and hours still needed, and whether your current Grade 11 plan matches the requirements you found.`,
          `**Go further:** Which of co-op, SHSM, OYAP or dual credits would help your pathway most? Find out whether your school offers it and what you must do to get in.`)
      ],
      terms: [
        ['credit', 'what you earn when you pass a course', 'recognition for successfully completing a course of at least 110 hours'],
        ['prerequisite', 'a course you must take first', 'a course that must be completed before a student can take another course or enter a program'],
        ['course type', 'the kind of course: university, college, workplace or open', 'the design of a Grade 11 or 12 course for a destination: university (U), university/college (M), college (C), workplace (E) or open (O)'],
        ['compulsory credit', 'a credit everyone must earn', 'one of the 17 credits every student must earn to graduate'],
        ['co-op', 'earning credits at a work placement', 'a program in which students earn credits through a work placement connected to a course'],
        ['OYAP', 'starting an apprenticeship while in high school', 'the Ontario Youth Apprenticeship Program, which lets students start an apprenticeship in Grade 11 or 12 through co-op']
      ],
      q: [
        mc('How many compulsory credits are needed for the OSSD (students who started Grade 9 in 2024 or later)?', '17', ['13', '18', '30']),
        mc('Maya wants to study engineering at university. Which Grade 11 math course keeps her pathway open?', 'A university-preparation math course', ['A college-preparation math course', 'A workplace-preparation math course', 'No math in Grade 11']),
        mc('A course that must be completed before taking another course is called a', 'prerequisite', ['credential', 'contingency', 'credit limit']),
        mc('Which program lets a student begin an apprenticeship while still in high school?', 'OYAP', ['OSAP', 'HST', 'TFSA']),
        mc('How many credits are needed for the OSSD?', '30', ['17', '40', '13']),
        mc('How many hours of community involvement are required?', '40', ['30', '17', '110']),
        mc('Which program is a bundle of courses and certifications in one economic sector?', 'SHSM', ['OYAP', 'Dual credits', 'OSAP']),
        tfx('A prerequisite is a course you must take first.', 'Two science credits are enough for every college and university program.'),
        fill('The OSSD requires ___ compulsory English credits.', '4', ['1', '10', '30']),
        app('Tyrell wants to be a paramedic and plans to take no science after Grade 10 because only two science credits are compulsory. What is wrong with his plan?', 'Compulsory credits are the minimum to graduate; the program has its own prerequisites', ['Nothing, two credits are enough for any program', 'Paramedics do not need high school', 'Science is not offered in Grade 11']),
        app('A program needs Grade 12 university-preparation biology. What does planning backward tell you to do in Grade 11?', 'Take the Grade 11 biology course that is the prerequisite', ['Wait and take biology after graduating', 'Take any course that fits your timetable', 'Skip Grade 11 science']),
        app('A student wants experience in health care and several certifications before college. Which program fits best?', 'A health and wellness SHSM, with a co-op placement', ['Dropping to fewer courses', 'Only online courses', 'No program can help'])
      ],
      rec: ['How many credits do you have so far?', 'your credits and community involvement hours so far, and how many of each you still need.', 'So far I have … credits. I still need …'],
      task: A('OSSD check and plan backward', 'B3.2',
        ['You need 30 credits and 40 hours to graduate. (1) How many credits do you have? (2) How many do you still need? (3) How many hours do you still need?',
         'Part 1: Record your progress on each OSSD requirement (30 credits, 17 compulsory, 13 optional, 40 hours, literacy, 2 online credits, financial literacy at 70%). Part 2: Choose one program or destination, look it up on an official website, and list the required Grade 12 courses (with course type), the Grade 11 prerequisites and any other requirements.',
         'Compulsory credits are the minimum needed to graduate. Why might a student need more than the minimum in a subject? Does your current plan for Grade 11 match the requirements you found? What needs to change?',
         'For co-op, SHSM, OYAP and dual credits, say what each is and whether it interests you, and why. Report what you learned about one of them at your school.'],
        ['I have … credits. I still need 30 − … = …', 'My progress: … of 30 credits; … of 40 hours.'],
        ['My credits, credits still needed and hours still needed are written.',
         'Each requirement has my progress, and the plan-backward chart uses a real program page.',
         'Programs have their own prerequisites and course types; a clear statement of what must change.',
         'Four programs described accurately, with a personal reason and one real fact from my school.']),
      media: [
        M(1, 'image', 'Earning your high school diploma', 'The official list of OSSD requirements.', 'Ontario.ca', 'https://www.ontario.ca/page/earning-your-high-school-diploma'),
        M(1, 'video', 'What is a Specialist High Skills Major?', 'Explains SHSM sectors and certifications.', 'Ontario.ca', 'https://www.ontario.ca/page/specialist-high-skills-major')
      ]
    }),

    L(3, 'Comparing Options and Refining My Goal', 'Comparing Options', 'B3.1, C1.1', {
      slides: [
        S('Start here: love it, or close and cheap?', '🎯',
          `**Think:** Would you pick a program you love that costs more and is far away, or one that is okay, cheaper and close?\n\n**Today we learn:** how to compare and choose a first destination.`,
          `**Minds On:** Would you rather take a program you love that costs more and is far away, or one that is fine, cheaper and close to home? Explain your choice.\n\n**We are learning to** compare options with criteria and labour market information, and to choose a first postsecondary destination and a backup.`,
          `**Expectations:** B3.1, C1.1. **I can** justify a first destination with my profile and with research.`),
        S('Fit, requirements and labour market information', '⚖️',
          `- **First destination:** your first step after high school. It is a start, not forever.\n- **Admission requirement:** what you need to get in.\n- **Labour market information:** facts about jobs (pay, how many jobs).\n- **Fit:** how well it matches **you**.`,
          `- **First postsecondary destination:** the first step a person plans to take after high school. A starting point, not a decision for life.\n- **Admission requirement:** a condition a person must meet to be accepted, such as specific courses, marks, a portfolio or an interview.\n- **Labour market information:** facts about jobs: wages, the number of openings expected, where the jobs are and the education they require.\n- **Fit:** how well an option matches a person's interests, values, skills and situation.\n\n**One field, three routes: electrical work**\n\n| | Apprenticeship: electrician | College: technician | University: engineer |\n| Length | About five years | Two years | Four years |\n| Cost | Paid wages; small in-class fees | Tuition for two years | Tuition for four years |\n| Credential | Certificate of Qualification | Diploma | Degree |\n| Learning style | Mostly on the job | Labs and classes | Mostly theory and design |`,
          `**From research to decision:** (1) Start with your profile. (2) Research at least two destinations on official sites. (3) Compare them with a decision matrix, using your own criteria. (4) Check reality: prerequisites, cost, location, job outlook. (5) Choose a first destination and a backup, then set a SMART goal.`),
        S('Meet Grace', '🩺',
          `> Grace likes helping people and wants steady work. She is choosing between a 2-year nursing diploma and a 4-year nursing degree. Money is tight. She is not sure about Grade 12 chemistry.\n\n- **First destination:** the 2-year diploma. She can add a degree later.\n- **Backup:** another health program.\n- **SMART goal:** "Get at least 75% in Grade 11 biology and chemistry this year."`,
          `> Grace's profile shows Social and Investigative interests, and she values helping people and stable work. She is comparing a two-year practical nursing diploma with a four-year nursing degree. Her family's budget is tight, and she is unsure about Grade 12 chemistry.\n\n**Which criteria should she use? What could be her first destination and her backup?**\n\n- Criteria: fit with her interests, prerequisites, cost and length, and job outlook.\n- A possible first destination: the practical nursing diploma, with a bridge to a degree later.\n- A backup: a related health program with different requirements.\n- A SMART goal: "Earn at least 75% in Grade 11 biology and chemistry this year."`,
          `**Worked example:** Job Bank shows a median wage of $30 an hour for an occupation. Full-time yearly income: $30 × 40 hours × 52 weeks = **$62,400**.`,
          `**Go further:** A program can have great job prospects and still be a poor fit. Describe a case where the matrix total and the values check disagree, and say which you would trust and why.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- My **first destination** is a start, not forever.\n- **Fit** = it matches my interests, values and skills.\n- Always have a **backup**.\n- Yearly pay = hourly pay × 40 × 52.`,
          `**Copy this note into your notebook:**\n\n- **First destination:** a starting point. **Backup:** a second option that is ready.\n- **Fit:** matches my interests, values, skills and situation.\n- **Labour market information:** wages (low, median, high), outlook, location, education required. Source: Job Bank.\n- Five steps: profile → research two options → decision matrix → reality check → first destination, backup and SMART goal.\n- **Yearly income = median hourly wage × 40 × 52.**\n- Official sources: Job Bank · ontariocolleges.ca · OUInfo · Skilled Trades Ontario.`,
          `Add your own four criteria for the matrix, in order of importance.`),
        S('Try it: matrix plus Job Bank', '🧪',
          `**Your experiment:**\n\n1. Pick 2 options from last lesson.\n2. Score each 1 to 5 for: I like it · cost · close to home.\n3. Add the scores.\n4. Does the winner feel right?\n\n**Exit:** My first destination is ____. My backup is ____.`,
          `**Your experiment: decide with evidence.**\n\n**1. My decision matrix.** Two options, four criteria that matter to you, scores 1 (poor) to 5 (excellent).\n\n| My criteria | Option 1 | Option 2 |\n| e.g., fits my interests | | |\n| e.g., cost | | |\n| e.g., job outlook | | |\n| e.g., location | | |\n| **Total** | | |\n\n**2. Job Bank lookup.** Search one occupation connected to your first choice, in your region of Ontario: low, median and high hourly wages, the outlook rating and the education usually required. Estimate full-time yearly income from the median.\n\n**Exit ticket:** "My first destination is ____ because ____. My backup is ____."`,
          `**Record your result:** totals, the three wage figures, the outlook and your yearly estimate. Do you agree with what the matrix suggests?`)
      ],
      terms: [
        ['first destination', 'your first step after high school', 'the first step a person plans to take after high school; a starting point, not a decision for life'],
        ['admission requirement', 'what you need to get into a program', 'a condition a person must meet to be accepted into a program, such as specific courses, marks, a portfolio or an interview'],
        ['labour market information', 'facts about jobs, like pay and openings', 'facts about jobs: wages, the number of openings expected, where the jobs are and the education they require'],
        ['fit', 'how well something matches you', 'how well an option matches a person\'s interests, values, skills and situation'],
        ['job outlook', 'how many jobs are expected in the future', 'how many openings are expected for an occupation over the next few years'],
        ['median wage', 'the middle pay for a job', 'the middle hourly pay for an occupation, with half of workers earning more and half earning less']
      ],
      q: [
        mc('Labour market information helps a person find out', 'wages and job outlook for an occupation', ['which courses their friends are taking', 'their credit count', 'their personality type']),
        mc('Leo chooses a university program only because it is in the same city as his best friend\'s school. Which step did he skip?', 'Comparing options against criteria based on his own profile', ['Applying on time', 'Telling his friend', 'Choosing a city']),
        mc('Which source is most reliable for a college program\'s admission requirements?', 'The program\'s official page on ontariocolleges.ca or the college site', ['A video from five years ago', 'A classmate\'s guess', 'An advertisement for a bank']),
        mc('An option that matches a person\'s interests, values, skills and situation is said to be a good', 'fit', ['credit', 'trend', 'limit']),
        mc('Wages and job outlook for an occupation are examples of', 'labour market information', ['admission requirements', 'personal information', 'compulsory credits']),
        tfx('A first destination is a starting point. You can add to it later.', 'A program with great job prospects is a good fit for everyone.'),
        fill('It is called a "___" postsecondary destination because it is a starting point, not a decision for life.', 'first', ['final', 'forced', 'free']),
        fill('Yearly income for full-time work = hourly wage × 40 hours × ___ weeks.', '52', ['12', '7', '365']),
        app('Job Bank shows a median wage of $30 an hour. What is the estimated yearly income for full-time work (40 hours a week, 52 weeks)?', '$62,400', ['$1,200', '$15,600', '$120,000']),
        app('Grace is torn between a two-year diploma and a four-year degree, money is tight and she is unsure about chemistry. Which plan fits the lesson?', 'Start with the diploma, keep a related program as backup, and set a SMART goal for her science marks', ['Choose neither and stop planning', 'Pick the degree because it is longer', 'Decide by flipping a coin']),
        app('Andre enjoys fixing cars, is good at math and wants to earn soon. He is comparing an apprenticeship with a college diploma. Which set of criteria is best?', 'Fit with his interests, cost or pay, length and credential, and job outlook', ['Which has the nicer logo', 'Which his neighbour mentioned', 'Which starts with the letter A'])
      ],
      rec: ['What is one thing that matters to you when choosing a program?', 'your four criteria for comparing options, and the one that matters most to you.', 'When I choose a program, what matters to me is …'],
      task: A('My decision matrix and Job Bank lookup', 'B3.1, C1.1',
        ['Pick 2 options. Give each a score from 1 to 5 for (1) I like it, (2) cost, (3) close to home. Add the scores. Which one wins?',
         'Build a decision matrix for two destinations or programs with four criteria that matter to you (scores 1 to 5, with totals). Then look up one related occupation on Job Bank for your region: low, median and high wages, the outlook and the education usually required.',
         'Using the median hourly wage, estimate the yearly income for full-time work (40 hours × 52 weeks). Show your calculation. What does your matrix suggest, and do you agree with it?',
         'State your first postsecondary destination with two reasons based on your profile and research, your backup and why, and a SMART goal for this school year that moves you toward it.'],
        ['Option 1 scores … Option 2 scores … The winner is …', 'Option 1: … Option 2: … My criteria are …'],
        ['Two options are scored and added. A winner is named.',
         'A complete matrix with totals and real Job Bank figures.',
         'Median × 40 × 52 is shown, and the matrix is checked against my values.',
         'Reasons refer to my profile and to research; the backup is realistic; the goal has all five SMART elements.']),
      media: [
        M(4, 'image', 'Job Bank wage report', 'Shows where low, median and high wages appear.', 'Job Bank, Government of Canada', 'https://www.jobbank.gc.ca/trend-analysis/search-wages', 'Job Bank wages by occupation Ontario'),
        M(1, 'image', 'OUInfo program search', 'The official guide to Ontario university requirements.', 'OUInfo', 'https://www.ouinfo.ca/')
      ]
    }),

    L(4, 'From Goal to Plan', 'Goal to Plan', 'C1.2', {
      slides: [
        S('Start here: planning a trip', '🎯',
          `**Think:** Remember a trip you took. What had to happen first? What went wrong? How was it fixed?\n\n**Today we learn:** to turn a goal into a plan with steps and dates.`,
          `**Minds On:** Think of a trip you took or helped to plan. What had to happen, and in what order, before you could leave? What went wrong, and how was it fixed?\n\n**We are learning to** build a pathway plan with steps, dates, supports and a Plan B.`,
          `**Expectation:** C1.2. **I can** name the next step in my plan, the date, and who can help.`),
        S('Pathway plan, milestones, opportunities, Plan B', '🛤️',
          `- **Pathway plan:** my steps, dates and helpers.\n- **Milestone:** a big step that shows progress.\n- **Opportunity:** a chance to get experience, skills or money.\n- **Contingency plan:** my Plan B.`,
          `- **Pathway plan:** a plan that lists the steps, dates and supports a person needs to reach a postsecondary goal.\n- **Milestone:** an important step that shows progress. *Completing 40 community involvement hours. Submitting an application.*\n- **Opportunity:** a chance to gain experience, skills, contacts or funding. *A co-op placement, a summer job, a scholarship, an open house.*\n- **Contingency plan:** a backup plan (Plan B) that is ready in case the first plan does not work out.\n\n| When | Steps |\n| Grade 10 (now) | Choose Grade 11 courses that include prerequisites. Start community involvement hours. Draft a résumé. |\n| Grade 11 | Take a co-op placement or SHSM. Visit open houses and fairs. Work part time and start saving. |\n| Grade 12, fall | Research programs and confirm requirements. Apply: colleges through ontariocolleges.ca, universities through the Ontario application centre. |\n| Grade 12, winter and spring | Apply for OSAP and scholarships. Compare offers and costs. Accept an offer by the deadline. |\n| After acceptance | Build a first-year budget. Arrange housing and transportation. Find a summer job. |`,
          `**Supports and opportunities:** **People** (guidance counsellors, teachers, family, employers, mentors) · **Programs** (co-op, SHSM, OYAP, dual credits) · **Money** (scholarships, bursaries, OSAP, savings, part-time work) · **Experience** (volunteering, clubs, teams, summer jobs).`),
        S('Meet Isabella', '🧒',
          `> Isabella wants a college diploma in child and youth care. Her whole plan is "apply in Grade 12." She has never worked with children. She has no savings.\n\n**What is missing?**\n\n1. Check what the program needs **now**.\n2. Get experience with children (volunteer, camp job).\n3. Start saving.\n4. Add dates and a Plan B.`,
          `> Isabella's goal is a college diploma in child and youth care. Her whole plan is "apply in Grade 12." She has no experience working with children, has not checked the program's requirements and has no savings.\n\n**Which steps are missing?**\n\n- Check the admission requirements now and choose Grade 11 courses to match.\n- Get experience with children and youth: volunteering, co-op or a summer camp job.\n- Start a money plan: savings from a part-time job, scholarships and an OSAP estimate.\n- Add dates and a backup program so that the plan can be tracked.\n\n| Common challenge | A Plan B |\n| A mark is lower than I need | Extra help, an upgrade course, or a related program with different requirements |\n| Money is tight | OSAP, scholarships, work, living at home, or a college close to home |\n| I was not accepted | A backup program, a bridging program, or applying again next year |\n| I changed my mind | That is normal. Go back to the profile and revise the goal |`,
          `**Worked example:** Ravi's entire plan reads: "Get into university." The change that improves it most is **adding specific steps with dates and the supports he will use**, so that progress can be tracked.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- A plan needs **steps, dates and helpers**.\n- A **milestone** shows I am getting there.\n- I need a **Plan B**.\n- My next step: ____ by ____ (date).`,
          `**Copy this note into your notebook:**\n\n- **Pathway plan:** steps + dates + supports. **Milestone:** a step that shows progress.\n- **Opportunity:** experience, skills, contacts or funding. **Contingency plan:** Plan B, ready in advance.\n- Timeline: Grade 10 (courses with prerequisites, hours, résumé) → Grade 11 (co-op or SHSM, open houses, saving) → Grade 12 (apply, OSAP and scholarships, accept) → after acceptance (budget, housing).\n- Supports: people · programs · money · experience.\n- Changing my mind is normal: revise the goal.`,
          `Add one likely challenge for your own plan and the first two steps of your Plan B.`),
        S('Try it: my pathway plan and one step this month', '🧪',
          `**Your experiment:**\n\n1. Write my first destination: ____\n2. Write 3 steps to get there.\n3. Put a **date** next to each step.\n4. Do the first step this month. Tick it.\n\n**Exit:** The first step I can do this month is ____. ____ can help me.`,
          `**Your experiment: write the plan, then do step one.**\n\n**My first postsecondary destination: ________**\n\n| When | Steps I will take | Target date |\n| Grade 10 (now) | | |\n| Grade 11 | | |\n| Grade 12 | | |\n| After acceptance | | |\n\n| Support | Specific people, programs or sources I can use |\n| People | |\n| Programs | |\n| Money | |\n| Experience | |\n\nNow **complete one Grade 10 step this month** and write the date you did it.\n\n**Exit ticket:** Name the first step in your plan that you can complete this month. Who could help you with it?`,
          `**Record your result:** the step, the date completed and what you learned from doing it. Your plan becomes Part 1 of the culminating task in Unit 5.`,
          `**Go further:** Describe one challenge that could get in the way and write your Plan B in two or three steps. It should lead to the same goal or a related one.`)
      ],
      terms: [
        ['pathway plan', 'my steps and dates to reach my goal', 'a plan that lists the steps, dates and supports a person needs to reach a postsecondary goal'],
        ['milestone', 'a big step that shows progress', 'an important step that shows progress toward a goal'],
        ['opportunity', 'a chance to get experience, skills or money', 'a chance to gain experience, skills, contacts or funding that moves a person toward a goal'],
        ['contingency plan', 'a backup plan, or Plan B', 'a backup plan that is ready in case the first plan does not work out'],
        ['scholarship', 'money for school that you do not pay back', 'money awarded to a student for education that does not have to be repaid'],
        ['OSAP', 'Ontario\'s grants and loans for students', 'the Ontario Student Assistance Program, which provides grants and loans for postsecondary education']
      ],
      q: [
        mc('A contingency plan is', 'a backup plan in case the first plan does not work', ['a list of compulsory credits', 'a type of scholarship', 'a college application']),
        mc('Ravi\'s entire pathway plan reads: "Get into university." Which change would improve it most?', 'Adding specific steps with dates and the supports he will use', ['Asking a friend to hold on to it', 'Writing it in capital letters', 'Removing the goal']),
        mc('Which of the following is an opportunity?', 'A co-op placement in a field of interest', ['A missed deadline', 'A low mark', 'A cancelled bus']),
        mc('Isabella has not been accepted to her first-choice program. What does a good plan include for this situation?', 'A contingency plan', ['Nothing, the plan is over', 'A new phone', 'A longer holiday']),
        mc('A backup plan prepared in advance is called', 'a contingency plan', ['a milestone', 'a prerequisite', 'a credential']),
        tfx('A pathway plan lists steps, dates and supports.', 'If you change your mind about your destination, your planning has failed.'),
        fill('Submitting an application is an example of a ___ in a pathway plan.', 'milestone', ['barrier', 'hazard', 'stressor']),
        fill('A scholarship is money for education that does not have to be ___.', 'repaid', ['earned', 'spent', 'saved']),
        app('Isabella wants a child and youth care diploma but has no experience with children. Which step should she add first?', 'Volunteer, take a co-op or get a summer camp job to work with children and youth', ['Wait until Grade 12 to think about it', 'Apply to a different field she dislikes', 'Remove the goal from her plan']),
        app('Andre cannot find an employer to sponsor his apprenticeship. Which Plan B connects to the same goal?', 'Start with the two-year college motive power diploma and move into an apprenticeship after', ['Give up on working with cars', 'Wait at home until a sponsor calls', 'Switch to a field he has never considered']),
        app('It is the fall of Grade 12. According to the sample timeline, what should a student be doing?', 'Researching programs, confirming requirements and applying', ['Choosing Grade 9 courses', 'Building a first-year budget before applying anywhere', 'Nothing until June'])
      ],
      rec: ['What is one step toward your goal that you can do this month?', 'the next step in your plan, the date you will do it by, and who could help.', 'This month I can …'],
      task: A('My pathway plan', 'C1.2',
        ['Write your first destination. Then write 3 steps to get there. Put a date next to each step.',
         'Write your pathway plan: your first postsecondary destination, and the steps you will take in Grade 10 (now), Grade 11, Grade 12 and after acceptance, each with a target date. Then list your supports and opportunities under People, Programs, Money and Experience, using specific names.',
         'Describe one challenge that could get in the way of your plan. What will you do if it happens? Write your Plan B in two or three steps.',
         'How effective has your goal setting been so far this course? What will you do differently? Report the Grade 10 step you completed this month.'],
        ['My first destination is … Step 1: … by …', 'My first destination is … In Grade 10 I will … by …'],
        ['One destination and three steps with dates.',
         'Steps for all four stages with dates, and specific supports in all four categories.',
         'A realistic challenge and a Plan B that leads to the same goal or a related one.',
         'Honest reflection on my process, and one step really completed.']),
      extra: [
        A('Unit 4 assignment: Destination Comparison', 'B3.1, B3.2, C1.1, C1.2',
          ['Compare 2 options for after high school. For each: how long, the cost or pay, and one job it leads to. Then say which one you choose and why.',
           'Compare two postsecondary options that interest you, choose a first destination and show how you will get there. Four labelled parts: **1 Two Options** from at least two different destinations (requirements, length, credential, cost or pay, jobs; name the official website). **2 Course Pathway** (the Grade 11 and 12 courses you need, with course types; one of co-op, SHSM, OYAP or dual credit that would help). **3 Compare and Decide** (a decision matrix with at least four criteria; Job Bank wages and outlook for one related occupation; your first destination and backup). **4 My Plan** (a timeline for Grades 10, 11 and 12 with dates; supports; one challenge and your Plan B). Type it here, or make slides or an infographic and describe it here.',
           'Every fact needs an official source, and your decision must refer to your personal profile from Unit 3.',
           'Explain how the program in Part 2 would help, and justify your choice where the matrix and your values point in different directions.'],
          ['Option 1 is … Option 2 is … I choose … because …', 'Part 1: My two options are …'],
          ['Two options are compared and one is chosen with a reason.',
           'All four parts are complete and labelled; two destinations are compared; the plan has dates and a Plan B.',
           'Sources are official and the decision is tied to my profile.',
           'The reasoning weighs evidence against values and is clearly explained.']),
        journal(4, 'What is your first destination after high school?', 'Now that you have chosen a first destination, revise or replace your educational goal and your career/life goal.', 'A2.1, A2.2, C1.1')
      ],
      media: [
        M(1, 'image', 'OSAP: how to apply', 'The money step in the Grade 12 timeline.', 'Ontario: OSAP', 'https://www.ontario.ca/page/osap-ontario-student-assistance-program'),
        M(4, 'image', 'myBlueprint pathway planner', 'A tool many schools use to record the plan.', 'myBlueprint', 'https://myblueprint.ca/')
      ]
    })
  ]));

  /* ================= UNIT 5 · My Postsecondary Plan and Budget (culminating) ================= */
  units.push(U('plan', 'Unit 5 · My Postsecondary Plan and Budget', [
    'How will I get there and pay for it? My résumé, my cover letter, my interview and my first-year budget.',
    'How will I get there and pay for it? Four lessons on building a résumé, writing a cover letter, preparing for an interview and budgeting for the first year, leading to the culminating task.',
    'C1.1, C1.2, C1.3, C2.3: an application package (résumé, cover letter, interview) and a researched first-year budget, brought together in the culminating postsecondary plan and the final Goal Journal reflection.'
  ], [

    L(1, 'Building a Résumé', 'Résumé', 'C1.3', {
      slides: [
        S('Start here: 30 seconds', '🎯',
          `**Think:** A boss has 30 seconds to learn about you. What 3 things do you want them to know?\n\n**Today we learn:** how to build a résumé.`,
          `**Minds On:** If an employer had only 30 seconds to learn about you, which three things would you want them to know?\n\n**We are learning to** build a one-page résumé with strong, evidence-based bullet points.`,
          `**Expectation:** C1.3. **I can** write a bullet point with an action verb, what I did and a number. Your Unit 3 skill statements are your raw material.`),
        S('The parts of a résumé', '📄',
          `- **Résumé:** one page about your skills and experience.\n- **Objective:** one sentence: the job I want and what I offer.\n- **Action verb:** a strong doing word (served, organized, built).\n- **Reference:** an adult (not family) who will say good things about you.\n\n**Parts:** contact · objective · skills · experience · education`,
          `- **Résumé:** a short document, usually one page for a student, that summarizes contact information, skills, experience and education for an employer.\n- **Objective:** one or two sentences at the top that say what position the person wants and what they offer. *"Reliable Grade 10 student with two years of child care experience seeking a part-time position as a camp counsellor."*\n- **Action verb:** a strong verb at the start of a bullet point. *Organized, served, repaired, designed, trained, supervised.*\n- **Reference:** a person who agrees to tell an employer about someone's skills and character. Not a relative. Always ask first.\n\n| Section | What goes in it |\n| Contact information | Name, phone number, a professional email address and city. No full street address. |\n| Objective | The position you want and what you offer, tailored to the job. |\n| Skills | Three to five skills that match the posting. |\n| Experience | Paid work, volunteering, school activities and family responsibilities, with bullet points. |\n| Education and credentials | School, grade, expected graduation, certifications such as First Aid. |`,
          `**Do** keep it to one page, tailor it with words from the posting, and proofread (then ask someone else to). **Don't** include a photo, your birth date or your Social Insurance Number. **Don't** exaggerate: everything on a résumé must be true.`),
        S('Meet Aiden: from weak to strong', '✏️',
          `> Aiden's résumé uses the email sk8rboi4life. It is 3 pages. It says "hard worker" with no examples. It has spelling mistakes.\n\n**Fix it:** a proper email with his name · **one page** · proof instead of "hard worker" · check the spelling.\n\n**Weak:** "Helped customers."\n**Strong:** "Served up to 50 customers each shift."`,
          `> Aiden's résumé uses the email sk8rboi4life, runs to three pages, lists "hard worker" with no examples, has two spelling mistakes and is sent unchanged to every employer.\n\n**Three pieces of advice:** create a professional email address based on his name · cut it to one page and remove anything that does not show a skill · replace "hard worker" with evidence · proofread, and tailor the objective and skills to each posting.\n\n| Weak | Strong: action verb + what + how many or how well |\n| "Worked at a camp." | "Supervised a group of 12 campers aged 6 to 8 and planned daily activities." |\n| "Helped customers." | "Served up to 50 customers each shift and handled cash accurately." |\n| "Did babysitting." | "Cared for two children after school for two years, preparing meals and helping with homework." |`,
          `**Worked example:** A grocery store posting asks for someone reliable, who works well on a team and has customer service experience. The applicant should place **two years volunteering at a food bank, serving the public on a team** first: it shows all three things the posting asks for.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- Résumé = **one page**.\n- Bullet = **action verb + what I did + a number**.\n- **No** photo, birthday or SIN.\n- Ask before I list a **reference**.`,
          `**Copy this note into your notebook:**\n\n- **Résumé:** one page; clear headings; true.\n- Sections: contact (professional email, city) · objective · skills · experience · education and credentials.\n- **Bullet formula: action verb + what + how many or how well.**\n- Never include: a photo, birth date, SIN or full street address.\n- **Tailor** it to each posting. **Proofread** twice.\n- **References:** two adults who are not relatives; ask first.\n- Verb bank: assisted · built · cared for · coached · created · delivered · designed · handled · led · managed · organized · prepared · repaired · served · supervised · taught · trained.`,
          `Add one bullet point of your own that follows the formula. Underline the action verb and circle the number.`),
        S('Try it: draft, then the 30-second test', '🧪',
          `**Your experiment:**\n\n1. Write 2 bullet points about things you have done. Start each with an action verb.\n2. Add a number to one of them.\n3. Show them to someone for **30 seconds**. Ask: "What do you remember?"\n\n**Exit:** My strongest bullet point is ____.`,
          `**Your experiment: draft, check, and run the 30-second test.**\n\n1. Fill in the résumé planner: contact information · objective · three to five skills · two experiences with two bullet points each · education and credentials · two references you will ask.\n2. Partner checklist: professional email · objective names a position · every bullet starts with an action verb · at least two bullets include a number · no photo, birth date or SIN · no spelling mistakes.\n3. **The test:** give your draft to someone for exactly 30 seconds, take it back, and ask what they remember. Was it what you wanted an employer to know?\n\n**Exit ticket:** Write the strongest bullet point from your résumé. Underline the action verb and circle the number.`,
          `**Record your result:** what the reader remembered, and the change you made because of it.`,
          `**Go further:** Find a real posting for a job you could apply for. Rewrite your objective and reorder your skills so that they use the posting's own words.`)
      ],
      terms: [
        ['résumé', 'one page about your skills and experience', 'a short document that summarizes a person\'s contact information, skills, experience and education for an employer'],
        ['objective', 'a sentence saying the job you want and what you offer', 'one or two sentences at the top of a résumé that say what position the person wants and what they offer'],
        ['action verb', 'a strong doing word at the start of a bullet', 'a strong verb at the start of a bullet point that shows what the person did'],
        ['reference', 'an adult who will tell a boss about you', 'a person, not a relative, who agrees to tell an employer about someone\'s skills and character'],
        ['tailoring', 'changing your résumé to match one job', 'changing a résumé or cover letter so that it matches one specific job'],
        ['proofread', 'check for mistakes', 'to read a document carefully to find and fix mistakes']
      ],
      q: [
        mc('Which bullet point is the strongest?', 'Stocked shelves and served about 40 customers per shift', ['Was there every Saturday', 'Responsible for stuff at the store', 'Good worker']),
        mc('A grocery store posting asks for someone reliable, who works well on a team and has customer service experience. Which experience should go first?', 'Two years as a volunteer at a food bank, serving the public on a team', ['A Grade 9 science fair project on volcanoes', 'A holiday abroad', 'A list of favourite video games']),
        mc('Who is the best choice for a reference?', 'A coach who has known you for two years', ['Your best friend', 'Your older brother', 'Someone you have never met']),
        mc('What does it mean to tailor a résumé?', 'Adjust it to match the job posting', ['Make it three pages long', 'Add a photo', 'Use a fancy font']),
        mc('Which of these should NOT appear on a résumé in Canada?', 'Your Social Insurance Number', ['Your phone number', 'Your skills', 'Your school']),
        tfx('A student résumé is usually one page.', 'It is fine to exaggerate on a résumé, because employers expect it.'),
        fill('"Supervised", "organized" and "served" are examples of action ___.', 'verbs', ['nouns', 'numbers', 'photos']),
        fill('A ___ is a person, not a relative, who will tell an employer about your skills and character.', 'reference', ['recruiter', 'customer', 'sibling']),
        app('Which rewrite of "Cut grass" follows the formula action verb + what + how many?', '"Managed lawn care for five neighbours every week from May to September."', ['"I cut grass sometimes."', '"Grass cutting."', '"Really good at lawns."']),
        app('Aiden\'s résumé has the email sk8rboi4life, three pages and "hard worker" with no examples. What should he fix first?', 'Use a professional email, cut to one page and replace "hard worker" with evidence', ['Add a photo and his birth date', 'Make it four pages', 'Send it to more employers unchanged']),
        app('Mateo babysat cousins for two years and edits a weekly gaming video. Which résumé bullet is best?', '"Edited and posted one video every week for a year, meeting every deadline."', ['"Likes video games."', '"Has no experience."', '"Good with computers and stuff."'])
      ],
      rec: ['What is one thing you have done that you are proud of?', 'your strongest résumé bullet point, with the action verb underlined and the number circled.', 'One thing I have done that I am proud of is …'],
      task: A('My résumé planner', 'C1.3',
        ['Write 2 bullet points about things you have done (a job, chores, a team, helping family). Start each one with an action verb. Put a number in one.',
         'Part 1: Rewrite each weak bullet as action verb + what + how many or how well: "Was on the soccer team." / "Helped at church events." / "Cut grass." / "Did the school store." Part 2: Complete your résumé planner: contact information, an objective, three to five skills, two experiences with two bullets each, education and credentials, and two references you will ask.',
         'Name three things that should NOT appear on a résumé in Canada, and explain why.',
         'Run the partner checklist and the 30-second test. Report what the reader remembered and what you changed.'],
        ['Served … / Organized … / Helped … (with a number)', 'Objective: … Skills: … Experience 1: …'],
        ['Two bullets start with action verbs. One has a number.',
         'Four strong rewrites and a complete planner with at least two numbers and a named position in the objective.',
         'A photo, birth date and SIN: personal information not needed to judge skills, which could lead to discrimination or identity theft.',
         'A real test result and one specific revision.']),
      media: [
        M(1, 'image', 'Job Bank Resume Builder', 'A free tool that formats the sections for students.', 'Job Bank, Government of Canada', 'https://www.jobbank.gc.ca/findajob/resume-builder'),
        M(2, 'image', 'Do\'s and don\'ts of résumé writing', 'The official checklist behind the lesson.', 'Job Bank, Government of Canada', 'https://www.jobbank.gc.ca/findajob/resources/write-good-resume')
      ]
    }),

    L(2, 'Writing a Cover Letter', 'Cover Letter', 'C1.3', {
      slides: [
        S('Start here: what a list cannot say', '🎯',
          `**Think:** A résumé is a list of facts. What could a letter tell a boss that a list cannot?\n\n**Today we learn:** how to write a cover letter.`,
          `**Minds On:** A résumé is a list of facts. What could a letter tell an employer that a list cannot?\n\n**We are learning to** write a cover letter that matches our skills to one specific job posting.`,
          `**Expectation:** C1.3. **I can** write an evidence sentence for each skill a posting asks for.`),
        S('The parts of a cover letter', '✉️',
          `- **Cover letter:** a short letter that goes with your résumé.\n- **Job posting:** the ad for the job.\n- **Tailoring:** writing a new letter for each job.\n- **Tone:** polite and professional.\n\n**Parts:** greeting → opening → body → closing → sign-off`,
          `- **Cover letter:** a short letter sent with a résumé. It introduces the applicant, names the job and explains why the applicant is a good match.\n- **Job posting:** an employer's description of a job: the duties, the skills and qualifications wanted, and how to apply.\n- **Tailoring:** changing a résumé or cover letter so that it matches one specific job. Each job needs its own letter.\n- **Tone:** the attitude a piece of writing shows. A cover letter should sound polite, confident and professional.\n\n| Part | What it does |\n| Heading and greeting | Your contact information, the date and "Dear Ms. Chen," or "Dear Hiring Manager," |\n| Opening | Names the job, says where you saw it and gives one reason you are a good match |\n| Body | Two or three skills the posting asks for, each with a specific example |\n| Closing | Thanks the reader, asks for an interview and says how to reach you |\n| Sign-off | "Sincerely," followed by your full name |`,
          `**Match the posting in three steps:** highlight the skills it asks for → choose two or three you can prove → write one sentence of evidence for each.\n\n| The posting asks for… | An evidence sentence |\n| Reliability | "In two years of delivering flyers, I have never missed a route." |\n| Teamwork | "As a goalie, I communicate constantly with my defence to organize our play." |\n| Customer service | "At school bake sales, I serve up to 60 students in a lunch period and handle the cash." |`),
        S('Meet Zoe', '🏊',
          `> Zoe wants a job helping teach swimming. The ad asks for a Bronze Cross, experience with children, and someone reliable. Her letter says: "Hi, I want this job because I need money. I'm a good swimmer. Thx."\n\n**Fix it:**\n\n- Start with "Dear Hiring Manager,"\n- Name the job.\n- Tell about her Bronze Cross and her babysitting.\n- Say thank you and ask for an interview.`,
          `> Zoe is applying to be an assistant swim instructor at the community pool. The posting asks for a Bronze Cross, experience with children and reliability. Her draft reads: "Hi, I want this job because I need money. I'm a good swimmer. Thx."\n\n**How could Zoe improve her letter?**\n\n- Fix the tone and greeting: "Dear Hiring Manager," and full sentences.\n- Opening: name the position and where she saw it.\n- Body: her Bronze Cross, her babysitting experience and an example of reliability.\n- Closing: thank the reader, ask for an interview and give her phone number.\n\n**Four common mistakes:** **generic** (the same letter to every employer) · **repeating** the résumé instead of giving examples · **too long** (more than one page) · **careless** (spelling errors, slang or the wrong employer's name).`,
          `**Worked example:** Omar wants to apply to a restaurant, a hardware store, a summer camp and a landscaping company. He should **write a tailored letter for each job**, because each employer asks for different skills.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- A new letter for **each** job.\n- **Greeting → opening → body → closing → sign-off**\n- Opening: "I am writing to apply for ____."\n- Body: a skill + **proof**.\n- End: "Sincerely," and my full name.`,
          `**Copy this note into your notebook:**\n\n- **Cover letter:** one page, three or four short paragraphs, written for one job.\n- Order: heading and greeting → opening → body → closing → sign-off.\n- Opening: "I am writing to apply for the ____ position posted on ____."\n- Body: two or three skills from the posting, each with an **evidence sentence**.\n- Closing: thanks, a request for an interview, how to reach me. Sign-off: "Sincerely," + full name.\n- Avoid: generic, repeating, too long, careless.`,
          `Add your own evidence sentence for reliability, teamwork or customer service.`),
        S('Try it: answer a real posting', '🧪',
          `**Your experiment:**\n\n1. Read this ad: *"Day camp counsellor. Must be responsible, work well on a team and have experience with children."*\n2. Pick one skill from the ad.\n3. Write one sentence that proves you have it.\n4. Read it to someone. Do they believe it?\n\n**Exit:** My first sentence is: "I am writing to apply for ____."`,
          `**Your experiment: analyse a posting and draft the letter.**\n\n> **Day Camp Counsellor (summer, part time).** Riverside Community Centre is hiring day camp counsellors for July and August. Counsellors plan and lead games, crafts and outdoor activities for children aged 5 to 10. We are looking for someone who is responsible, works well on a team, communicates clearly with children and parents, and has experience with children. First Aid is an asset. Apply with a résumé and cover letter to the Camp Director.\n\n1. List four skills or qualities this employer wants. Who should the letter be addressed to?\n2. Choose three skills (from this posting, or a **real** posting you found) and write an evidence sentence for each.\n3. Draft all five parts of your letter.\n4. **Test it:** ask a reader to underline every skill from the posting they can find evidence for. Count them.\n\n**Exit ticket:** Write the opening sentence of your cover letter. Does it name the job?`,
          `**Record your result:** how many of the posting's skills your reader found evidence for, and what you added afterward.`,
          `**Go further:** Rewrite your body paragraph for a completely different job (a pool, a store, a kitchen). What stayed the same, and what had to change?`)
      ],
      terms: [
        ['cover letter', 'a short letter that goes with your résumé', 'a short letter sent with a résumé that introduces the applicant, names the job and explains why the applicant is a good match'],
        ['job posting', 'an ad for a job', 'an employer\'s description of a job: the duties, the skills and qualifications wanted, and how to apply'],
        ['tone', 'how your writing sounds', 'the attitude a piece of writing shows, such as polite, confident and professional'],
        ['evidence sentence', 'a sentence that proves a skill', 'a sentence that proves a skill with a specific example from a person\'s experience'],
        ['greeting', 'the "Dear …" line at the start of a letter', 'the opening line of a letter that addresses the reader, such as "Dear Hiring Manager,"'],
        ['closing', 'the end of a letter that says thank you', 'the final paragraph of a cover letter, which thanks the reader, asks for an interview and says how to reach the applicant']
      ],
      q: [
        mc('What is the main purpose of the body of a cover letter?', 'To match your skills to the posting, with examples', ['To repeat the résumé', 'To list hobbies', 'To ask about pay']),
        mc('Omar wants to apply for four different jobs this week. What should he do about cover letters?', 'Write a tailored letter for each job', ['Send one general letter to all four', 'Skip the letter for all four', 'Send only a text message']),
        mc('Which opening sentence is best?', '"I am writing to apply for the Day Camp Counsellor position posted on your website."', ['"I need money so please hire me."', '"To whom it may concern, I want any job."', '"Hey, I want this job."']),
        mc('How many cover letters should a person write when applying for three different jobs?', 'Three', ['One', 'Two', 'None']),
        mc('A posting says, "Apply with a résumé and cover letter to the Camp Director." Which greeting is best?', '"Dear Camp Director,"', ['"Hi there,"', '"Yo,"', '"Dear Friend,"']),
        tfx('A cover letter should fit on one page.', 'The body of a cover letter should repeat every line of the résumé.'),
        fill('A cover letter usually ends with "___," followed by your full name.', 'Sincerely', ['Thx', 'Later', 'Bye']),
        fill('Changing a letter so that it matches one specific job is called ___.', 'tailoring', ['upselling', 'copying', 'borrowing']),
        app('A posting asks for reliability. Which evidence sentence is strongest?', '"In two years of delivering flyers, I have never missed a route."', ['"I am very reliable."', '"My mom says I am reliable."', '"Reliability is important."']),
        app('Zoe\'s draft reads: "Hi, I want this job because I need money. I\'m a good swimmer. Thx." What is the biggest problem?', 'The tone is too casual and it gives no evidence for what the posting asks for', ['It is too long', 'It names the job too clearly', 'It includes too many examples']),
        app('A reader finds that your letter names the wrong employer. Which common mistake is this?', 'Careless', ['Repeating', 'Too long', 'Tailored'])
      ],
      rec: ['What job would you like to apply for one day?', 'a job you could apply for, one skill it would ask for, and your evidence sentence for that skill.', 'One day I would like to apply for …'],
      task: A('My cover letter draft', 'C1.3',
        ['Write 3 sentences for a camp counsellor job: (1) "I am writing to apply for …" (2) one thing you are good at, with an example, (3) "Thank you for …"',
         'Using the Day Camp Counsellor posting (or a real posting you found): (1) list four skills or qualities the employer wants and who the letter should be addressed to; (2) write an evidence sentence for three of the skills; (3) draft your full letter: greeting, opening, body, closing and sign-off.',
         'Check your draft against the checklist: names the specific job and employer; the body gives examples instead of repeating the résumé; polite, professional tone; one page; no spelling mistakes and the employer\'s name is correct.',
         'Report your reader test (how many posting skills they found evidence for), then revise one paragraph and show before and after.'],
        ['I am writing to apply for …', 'Dear Camp Director, I am writing to apply for …'],
        ['Three sentences: the job is named, one skill has an example, and there is a thank-you.',
         'Four skills; "Dear Camp Director,"; three evidence sentences with specific examples; all five parts drafted.',
         'Every checklist item is met.',
         'A real count from a reader and a clear before-and-after revision.']),
      media: [
        M(4, 'image', 'Real student job postings', 'Students can pick a real posting to answer.', 'Job Bank, Government of Canada', 'https://www.jobbank.gc.ca/findajob'),
        M(1, 'image', 'How do I apply for a job?', 'The official guide to résumés and cover letters.', 'Job Bank, Government of Canada', 'https://www.jobbank.gc.ca/findajob/resources/apply-for-jobs')
      ]
    }),

    L(3, 'Interview Preparation', 'Interviews', 'C1.3', {
      slides: [
        S('Start here: the first 30 seconds', '🎯',
          `**Think:** What do people notice in the first 30 seconds when they meet someone?\n\n**Today we learn:** how to get ready for a job interview.`,
          `**Minds On:** What creates a first impression? List everything a person notices in the first 30 seconds of meeting someone.\n\n**We are learning to** prepare for an interview and answer behavioural questions with the STAR method.`,
          `**Expectation:** C1.3. **I can** give a STAR answer with all four parts and ask a thoughtful question at the end.`),
        S('The STAR method', '⭐',
          `- **Interview:** a talk where a boss decides if you fit the job, and you decide if the job fits you.\n- **STAR** is a way to answer:\n\n| S | Situation | Where and when? |\n| T | Task | What was my job? |\n| A | Action | What did I do? |\n| R | Result | What happened? |`,
          `- **Interview:** a conversation in which an employer asks questions to decide whether a person is right for a job, and the person finds out whether the job is right for them.\n- **Behavioural question:** a question that asks for a real example from the past, because past behaviour suggests future behaviour. *"Tell me about a time you solved a problem."*\n- **STAR method:** Situation, Task, Action, Result.\n- **Follow-up:** a short thank-you message sent within a day of an interview.\n\n| | Stands for | Say… |\n| S | Situation | Where and when did this happen? |\n| T | Task | What were you responsible for? |\n| A | Action | What did you do? This is the longest part. |\n| R | Result | What happened? What did you learn? |\n\n> "At a bake sale (S), I was in charge of cash (T). The float ran out, so I asked a teacher for change and kept the line moving (A). We served everyone and raised $240 (R)."`,
          `| Common question | What the employer wants to know |\n| "Tell me about yourself." | A short, relevant summary: school, skills, why this job |\n| "Why do you want to work here?" | Whether you have researched the employer |\n| "What is one of your weaknesses?" | Whether you are honest and working to improve |\n| "Tell me about a time you worked on a team." | A real example. Use STAR |\n| "Do you have any questions for us?" | Whether you are interested. Always have two ready |`),
        S('Meet Dylan: before, during and after', '🛠️',
          `> Dylan has an interview at a hardware store tomorrow. He plans to "wing it." He does not know what the store sells. He will wear his gym clothes. He has no questions.\n\n**Tonight Dylan should:**\n\n1. Find out about the store.\n2. Practise 2 answers out loud.\n3. Pick clean, neat clothes. Plan to be 10 minutes early.\n4. Write 2 questions to ask.`,
          `> Dylan has an interview at a hardware store tomorrow. He plans to "wing it." He does not know what the store sells besides tools, intends to wear what he wore to the gym and has no questions to ask.\n\n**What should Dylan do tonight?** Research the store: what it sells, who its customers are and what the job involves. Prepare STAR answers for two or three likely questions and practise them aloud. Choose clean, neat clothing and plan to arrive ten minutes early. Write down two questions, such as "What training do new staff receive?"\n\n| Before | During | Your questions | After |\n| Research the employer. Prepare answers. Plan your route. | Greet people, listen carefully, answer with examples, put your phone away. | Ask about training, a typical shift or what makes someone succeed there. | Send a short thank-you message within a day. Reflect on what went well. |\n\nIn Ontario, interviewers may not ask about race, religion, disability or family status.`,
          `**Worked example:** "What is one of your weaknesses?" The strongest answer is honest and shows improvement: **"I get nervous presenting, so I joined the debate club to practise."** Not "I don't have any" and not "I work too hard."`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **S**ituation · **T**ask · **A**ction · **R**esult\n- Be **10 minutes early**.\n- Have **2 questions** ready.\n- Say **thank you** within one day.`,
          `**Copy this note into your notebook:**\n\n- **STAR:** Situation · Task · Action (the longest part) · Result.\n- **Behavioural question:** asks for a real example from the past.\n- **Before:** research the employer, prepare answers, plan the route, arrive ten minutes early.\n- **During:** greet, listen, answer with examples, phone away.\n- **My questions:** two ready (training, a typical shift). Not pay or time off in a first interview.\n- **After:** thank-you message within a day.\n- Weakness answer = an honest weakness + what I am doing about it.`,
          `Add your own STAR story in four short labelled lines.`),
        S('Try it: mock interview', '🧪',
          `**Your experiment:**\n\n1. Write a STAR answer to: "Tell me about a time you worked on a team."\n2. Say it out loud to a partner or record it with 🎙️.\n3. Ask: "Did I say what happened at the end?"\n4. Try again. Was it better?\n\n**Exit:** The question that makes me most nervous is ____.`,
          `**Your experiment: the mock interview.**\n\nWork in threes: **interviewer, candidate, observer**. Five minutes each, plus two minutes of feedback. (On your own? Use 🎙️ Record on the assignment, listen back and be your own observer.)\n\nThe interviewer asks: one **opening** (Tell me about yourself / Why are you interested in this position?), two **behavioural** (a time you worked on a team · solved a problem · made a mistake · learned something quickly · dealt with a difficult person · showed leadership), one **about you** (a strength · a weakness · how you manage commitments · where you see yourself in five years), then **"Do you have any questions for us?"**\n\n| Observer looks for | Rating 1 to 4 |\n| Greeting, posture and first impression | |\n| Speaks clearly and listens to the question | |\n| Answers are relevant and include specific examples | |\n| STAR answers include all four parts | |\n| Shows knowledge of the job or employer | |\n| Asks a thoughtful question at the end | |\n\n**Exit ticket:** Which interview question makes you most nervous? Write your plan for answering it.`,
          `**Record your result:** your six ratings, one thing you did well and one suggestion. Keep the feedback for your culminating portfolio.`,
          `**Go further:** Research a real employer where you might apply: what it does or sells, who its customers are, what the job's duties would be, and a specific reason you would want to work there.`)
      ],
      terms: [
        ['interview', 'a talk with a boss about a job', 'a conversation in which an employer asks questions to decide whether a person is right for a job'],
        ['behavioural question', 'a question that asks for a real example', 'a question that asks for a real example from the past, because past behaviour suggests future behaviour'],
        ['STAR method', 'Situation, Task, Action, Result', 'a way to answer behavioural questions clearly: Situation, Task, Action, Result'],
        ['follow-up', 'a thank-you message after an interview', 'a short thank-you message sent within a day of an interview'],
        ['first impression', 'what people think when they first meet you', 'the opinion a person forms in the first moments of meeting someone'],
        ['weakness', 'something you are still working on', 'something a person does not yet do well and is working to improve']
      ],
      q: [
        mc('In the STAR method, what does the "R" stand for?', 'Result', ['Reference', 'Reason', 'Résumé']),
        mc('An interviewer asks Priya, "What is one of your weaknesses?" Which answer is the strongest?', '"I get nervous presenting, so I joined the debate club to practise."', ['"I work too hard."', '"I don\'t have any."', '"I\'m always late."']),
        mc('What should a person do within a day after an interview?', 'Send a short thank-you message', ['Call every hour to ask for the result', 'Post about it online', 'Nothing at all']),
        mc('Which is the best question to ask at the end of a first interview?', '"What training do new staff receive?"', ['"When can I take a holiday?"', '"Can I leave early every day?"', '"I have no questions."']),
        mc('"Tell me about a time you solved a problem" is an example of', 'a behavioural question', ['a follow-up', 'a reference', 'a job posting']),
        tfx('It is a good idea to arrive ten minutes early for an interview.', 'In Ontario, an interviewer is allowed to ask about your religion and family status.'),
        fill('In STAR, the longest part of the answer is the ___.', 'Action', ['Situation', 'Greeting', 'Sign-off']),
        fill('STAR stands for Situation, ___, Action, Result.', 'Task', ['Time', 'Talent', 'Tone']),
        app('"At a bake sale, I was in charge of cash. The float ran out, so I asked a teacher for change and kept the line moving. We served everyone and raised $240." Which part is the Result?', '"We served everyone and raised $240."', ['"At a bake sale"', '"I was in charge of cash."', '"I asked a teacher for change."']),
        app('Dylan plans to "wing" tomorrow\'s interview at a hardware store. Which preparation matters most tonight?', 'Research the store, practise two STAR answers aloud and write two questions to ask', ['Buy the most expensive shoes he can find', 'Memorise the store\'s phone number only', 'Stay up all night playing games to relax']),
        app('An observer notes that your STAR answer described the situation for a long time and never said what happened in the end. What should you change?', 'Shorten the situation, spend longer on your action and finish with the result', ['Add more detail to the situation', 'Remove the action', 'Avoid behavioural questions'])
      ],
      rec: ['Tell about one time you worked with other people.', 'one STAR story of your own, with S, T, A and R each on its own line.', 'One time I worked with other people was …'],
      task: A('My interview answers', 'C1.3',
        ['Answer this question: "Tell me about a time you worked on a team." Say (1) where it was, (2) what you did, (3) what happened in the end. You can use 🎙️ Record.',
         'Write (or record) your answers: (1) "Tell me about yourself." in under one minute: school and grade, two skills with evidence, why this job. (2) "Tell me about a time you worked on a team." Use STAR and label each part. (3) "What is one of your weaknesses?" (4) Two questions you could ask at the end.',
         'Add a second STAR answer: "Tell me about a time you solved a problem or handled a mistake." Then research one real employer: what it does, its customers, the job\'s duties and why you would want to work there.',
         'Report your mock interview: your six ratings, one thing you did well, one suggestion, and what you will do differently in a real interview.'],
        ['It was at … I … In the end …', 'S: … T: … A: … R: …'],
        ['My answer says where, what I did and how it ended.',
         'A brief, relevant introduction; a STAR answer with all four parts; an honest weakness with a plan; two good questions (not about pay or time off).',
         'A second complete STAR answer and four researched facts about a real employer.',
         'Real feedback is reported and turned into a specific change.']),
      extra: [
        A('Mock interview feedback form', 'C1.3',
          ['After your practice interview, finish these: (1) One thing I did well was … (2) Next time I will …',
           'After your mock interview, record the observer\'s ratings (1 to 4) for: greeting, posture and first impression · speaks clearly and listens · relevant answers with specific examples · STAR answers include all four parts · shows knowledge of the job or employer · asks a thoughtful question at the end. Add one thing you did well and one suggestion for next time.',
           'Which questions were you asked? Which answer was your strongest, and why?',
           'Candidate\'s reflection: what will you do differently in a real interview? Name the one change that would raise your lowest rating.'],
          ['One thing I did well was … Next time I will …', 'My ratings: … One thing I did well: … One suggestion: …'],
          ['Two sentences are finished.',
           'Six ratings, one strength and one suggestion.',
           'The questions are listed and the strongest answer is explained.',
           'A specific, realistic change tied to the lowest rating.'])
      ],
      media: [
        M(2, 'image', 'Researching an employer', 'The official guide to preparing before an interview.', 'Job Bank, Government of Canada', 'https://www.jobbank.gc.ca/findajob/resources/apply-for-jobs'),
        M(2, 'image', 'Human rights at work', 'Shows what interviewers may not ask.', 'Ontario Human Rights Commission', 'https://www.ohrc.on.ca/')
      ]
    }),

    L(4, 'Paying for the First Year: Costs and My Budget', 'First-Year Budget', 'C2.1, C2.2, C2.3', {
      slides: [
        S('Start here: guess the cost', '🎯',
          `**Guess:** How much does one year of college or university cost, with housing and food? Write a number.\n\n**Today we learn:** what the first year costs and how to pay for it.`,
          `**Minds On:** Guess: how much does one year of college or university cost in total, including housing and food? Write down a number. We will check it.\n\n**We are learning to** research first-year costs, build a budget and compare ways to pay.`,
          `**Expectations:** C2.1, C2.2, C2.3. **Canadian data** (Statistics Canada, The Daily, tuition fees for degree programs, 2026/2027): average tuition and compulsory fees for Canadian undergraduates were **$9,292**, up **3.3%** from **$8,994** in 2025/2026. Tuition is only part of the cost: housing, food, transportation and books often add up to more.`),
        S('Tuition, OSAP and four ways to pay', '💰',
          `- **Tuition:** what you pay a college or university to teach you.\n- **OSAP:** Ontario's grants and loans for students.\n- **Grant / scholarship / bursary:** money you do **not** pay back.\n- **Loan:** money you **must** pay back, with interest.\n\n**Borrow last. Borrow only what you need.**`,
          `- **Tuition:** the fee a student pays a college or university for instruction. Compulsory fees for services are added to it.\n- **OSAP:** the Ontario Student Assistance Program. It provides grants and loans to eligible students, based on financial need.\n- **Grant, scholarship, bursary:** money for education that does not have to be repaid. Grants and bursaries are based on need. Scholarships are usually based on marks, skills or involvement.\n- **Fixed expense:** stays the same each month (rent, phone plan). **Variable expense:** changes from month to month (food, entertainment, transportation).\n\n| Savings | Earnings | Money you keep | Borrowing |\n| Your own savings and family savings such as an RESP | Summer and part-time work. Apprentices earn wages while they train | Grants, bursaries and scholarships. Apply for every one you qualify for | OSAP loans or a student line of credit. Repaid with interest |\n\n**Borrow last, and borrow only what you need.**`,
          `**Link to Unit 2:** a loan is credit. The responsibilities are the same: repay what was borrowed plus interest, pay on time, and keep track of the total owed.`),
        S('Meet Sam and Chiara', '🏠',
          `**Sam's first year (8 months away from home):**\n\n- Money in: **$20,200**\n- Money out: **$17,500**\n- Left: $20,200 − $17,500 = **$2,700**\n\nSam's budget works. Sam could borrow less.\n\n> Chiara has two offers: a university far away (about $23,300 a year) or a college near home ($4,500 plus the bus).`,
          `**Sam's first-year budget: 8 months away** (figures are examples only)\n\n| Income | Amount | Expenses | Amount |\n| Savings | $3,000 | Tuition and fees | $4,800 |\n| Summer job | $4,500 | Books and supplies | $1,000 |\n| Part-time job (8 × $400) | $3,200 | Rent (8 × $700) | $5,600 |\n| OSAP grant and loan | $7,000 | Food (8 × $350) | $2,800 |\n| Family contribution | $2,000 | Transit and phone (8 × $150) | $1,200 |\n| Scholarship | $500 | Personal and emergency fund | $2,100 |\n| **Total income** | **$20,200** | **Total expenses** | **$17,500** |\n\nIncome − expenses = **$2,700**. Sam could borrow less.\n\n> Chiara has two offers. A university three hours away: tuition $9,300, residence and meal plan $14,000. A college 20 minutes from home: tuition $4,500, and she would live at home. She has $4,000 saved and expects about $6,000 from OSAP.\n\nThe totals: about $23,300 for the university and $4,500 plus transit for the college. The gap: $23,300 − $10,000 = **$13,300** still to find each year. Fit matters too: the program, the credential and the jobs each leads to. And about borrowing: how much would she owe at graduation, and how long would it take to repay?`,
          `**Worked example:** Sam's rent rises to $800 a month. Rent becomes 8 × $800 = $6,400 ($800 more), expenses $18,300, balance $1,900. If Sam instead loses the part-time job (rent at $700): income $17,000 − expenses $17,500 = **−$500**. The budget no longer balances.`),
        S('Write this down', '📝',
          `**Copy this note:**\n\n- **Grant / scholarship** = I do not pay it back.\n- **Loan** = I pay it back, with interest.\n- **Fixed** = same every month (rent). **Variable** = it changes (food).\n- **Left over = income − expenses**`,
          `**Copy this note into your notebook:**\n\n- **Tuition** + compulsory fees is only part of the cost. Add housing, food, transportation, books and an emergency fund.\n- **Four ways to pay:** savings · earnings · money you keep (grants, bursaries, scholarships) · borrowing (OSAP loan, line of credit).\n- Grants and scholarships first. **Borrow last, and only what I need.**\n- **Fixed expense:** rent, phone, tuition. **Variable expense:** food, transit, personal.\n- **Balance = total income − total expenses.** If it is negative: cut variable costs, add income, then borrow.\n- My first-year guess: $____. What I found: $____.`,
          `Add the average undergraduate tuition figure for 2026/2027 ($9,292) and the tuition for your own destination from its official site.`),
        S('Try it: my first-year budget', '🧪',
          `**Your experiment:**\n\n1. Write your destination for after high school.\n2. Ask your teacher or look up: what does it cost for one year?\n3. Write 3 ways you could get the money.\n4. Which of them do you **not** have to pay back?\n\n**Exit:** My biggest cost will be ____.`,
          `**Your experiment: research real numbers and build the budget.**\n\nMy destination: ________ · Living at home or away? ________ · Number of months: ____\n\n| Income | Amount | Expenses | Amount |\n| Savings | | Tuition and fees (or tools and fees) | |\n| Summer job | | Books, supplies or equipment | |\n| Part-time job or wages | | Housing | |\n| Grants, bursaries, scholarships | | Food | |\n| Family contribution | | Transportation and phone | |\n| Loans (OSAP or other) | | Personal and emergency fund | |\n| **Total income** | | **Total expenses** | |\n\nUse official sources (the school's site, ontariocolleges.ca, OUInfo, OSAP, the FCAC Budget Planner, Job Bank wages) and name them. Then **stress-test** it: what happens if rent rises by $100 a month, or you lose your part-time job?\n\n**Exit ticket:** "The biggest cost in my first year will probably be ____. One thing I can do now to prepare for it is ____."`,
          `**Record your result:** your totals, your balance, and the result of one stress test. Compare it with your guess from the start of class.`,
          `**Go further:** If you had to borrow the shortfall every year of your program, estimate what you would owe at graduation. What would that mean for your first job?`)
      ],
      terms: [
        ['tuition', 'what you pay a school to teach you', 'the fee a student pays a college or university for instruction'],
        ['grant', 'money for school that you do not pay back', 'money for education, based on financial need, that does not have to be repaid'],
        ['bursary', 'money for students who need it, not paid back', 'money for education given to students with financial need that does not have to be repaid'],
        ['fixed expense', 'a cost that is the same every month', 'an expense that stays the same each month, such as rent or a phone plan'],
        ['variable expense', 'a cost that changes from month to month', 'an expense that changes from month to month, such as food, entertainment or transportation'],
        ['loan', 'money you borrow and must pay back', 'money that is borrowed and must be repaid, usually with interest']
      ],
      q: [
        mc('Which of the following does NOT have to be repaid?', 'A grant', ['A student line of credit', 'An OSAP loan', 'A credit card balance']),
        mc('Marco\'s first-year budget shows $18,000 in expenses and $15,500 in income. What is the best first step?', 'Look for expenses to reduce and more income before borrowing more', ['Put the $2,500 on a credit card', 'Ignore the difference', 'Drop out']),
        mc('A student\'s rent is $650 every month. Rent is', 'a fixed expense', ['a variable expense', 'a grant', 'income']),
        mc('Keisha\'s budget shows income of $14,000 and expenses of $15,200. By how much is she short?', '$1,200', ['$2,200', '$200', '$29,200']),
        mc('Sam\'s budget shows $20,200 in income and $17,500 in expenses. What is the balance?', '$2,700 left over', ['$2,700 short', '$37,700 left over', '$0']),
        tfx('A scholarship does not have to be repaid.', 'Tuition is the only cost of a year at college or university.'),
        fill('Food and entertainment are ___ expenses, because they change from month to month.', 'variable', ['fixed', 'compulsory', 'borrowed']),
        fill('OSAP provides grants and ___ to eligible students.', 'loans', ['jobs', 'cars', 'credits']),
        app('Sam\'s rent rises from $700 to $800 a month for 8 months. Expenses were $17,500 and income is $20,200. What is the new balance?', '$1,900', ['$2,700', '$2,600', '$900']),
        app('Sam loses the part-time job (8 × $400). Income was $20,200 and expenses are $17,500. Does the budget still balance?', 'No: income falls to $17,000, which is $500 short', ['Yes: there is still $2,700 left', 'Yes: there is $500 left', 'No: it is $3,200 short']),
        app('Chiara has $4,000 saved and expects $6,000 from OSAP. The university would cost about $23,300 a year. How much would she still need to find each year?', '$13,300', ['$19,300', '$17,300', '$10,000'])
      ],
      rec: ['What will you need money for after high school?', 'your guess for one year of costs at your destination, the real number you found, and the difference.', 'After high school I will need money for …'],
      task: A('Sam\'s budget and my first-year budget', 'C2.1, C2.2, C2.3',
        ['Sam has $20,200 coming in and $17,500 going out. (1) How much is left? (2) Name one cost that is the same every month. (3) Name one way to get money that you do not pay back.',
         'Part 1 (Sam): (1) Does the budget balance? Calculate income minus expenses. (2) Rent rises to $800 a month: new total expenses and balance? (3) Sam loses the part-time job (rent at $700): does it still balance, and what could Sam do? (4) Which of Sam\'s expenses are fixed and which are variable? Part 2: Research real numbers and build your own first-year budget with income, expenses, totals and your sources.',
         'Income minus expenses = ? Does your budget balance? If not, name two realistic changes. Explain the difference between a grant and a loan, and which a student should look for first.',
         'If you borrow, what two responsibilities do you take on (think back to Unit 2, Lesson 3)? Report one stress test on your budget and what it showed.'],
        ['$20,200 − $17,500 = … A cost that stays the same is …', 'Part 1: (1) $20,200 − $17,500 = …'],
        ['$2,700 left; rent (or phone); a grant or scholarship.',
         '$2,700 surplus · $18,300 and $1,900 · −$500, so cut spending, find work, apply for bursaries or, last, borrow · fixed: tuition, rent, phone; variable: food, transit, books, personal. My budget has totals and named sources.',
         'Correct arithmetic; realistic changes; a grant is not repaid and comes first because it creates no debt.',
         'Repay with interest and on time (borrow only what is needed; track the total), plus a real stress-test result.']),
      extra: [
        A('Culminating task: My Postsecondary Plan', 'C1.1, C1.2, C1.3, C2.3, A2.2',
          ['Put your plan together in 4 short parts: (1) what I am good at, (2) where I want to go after high school, (3) my next 3 steps with dates, (4) what it costs and how I could pay.',
           'Bring together everything you have learned into one plan for your first year after high school. Seven labelled parts: **1 My profile** (interests, values, skills and strengths, with evidence). **2 My destination** (first destination and backup, with research and a comparison). **3 My pathway plan** (Grade 11 and 12 courses, steps with dates, supports, one challenge and Plan B). **4 My application package** (a one-page résumé and a cover letter tailored to a real or sample posting). **5 My first-year budget** (income, expenses, sources, how I will pay). **6 Mock interview** (your feedback form). **7 Final reflection.** Most of it is already drafted in your unit assignments. Type or paste it here, or submit a portfolio and describe it here.',
           'Check: the résumé is one page with no spelling mistakes; the cover letter names a specific job; the budget shows totals, a balance and sources.',
           'Part 7: explain how at least one goal changed during the course and why, and name your next three steps after this course.'],
          ['Part 1: I am good at …', 'Part 1: My profile. My interests are …'],
          ['Four parts are there. Each has at least one sentence about me.',
           'All seven parts are included and labelled, built from my earlier work.',
           'The résumé, letter and budget meet every checklist item.',
           'The reflection explains a changed goal with a reason and gives three concrete next steps.']),
        journal(5, 'Which goal did you reach?', 'Final reflection: which goals did you reach, change or drop? What are your next three steps after this course?', 'A2.2, C1.1')
      ],
      media: [
        M(0, 'image', 'Tuition fees for degree programs, 2026/2027', 'The source for the $9,292 figure.', 'Statistics Canada, The Daily', 'https://www150.statcan.gc.ca/n1/daily-quotidien/260916/dq260916e-eng.htm'),
        M(4, 'image', 'FCAC Budget Planner', 'A free tool for building the first-year budget.', 'Financial Consumer Agency of Canada', 'https://itools-ioutils.fcac-acfc.gc.ca/BP-PB/budget-planner')
      ]
    })
  ]));

  /* ================= COURSE ================= */
  LH.courses.push({
    id: 'glc2o',
    title: 'GLC2O - Career Studies',
    subtitle: 'Grade 10 Career Studies: skills, money, work and my plan',
    description: {
      1: 'Learn about yourself, money, jobs and your plan for after high school. Every lesson has a note to write down and something to try in your own life.',
      2: 'Career Studies, Grade 10 (half credit). Five units: skills and habits for success, financial literacy, the world of work and your personal profile, pathways after high school, and your own postsecondary plan and budget. Every lesson leaves a record in your notebook and a small experiment on your own life.',
      3: 'GLC2O Career Studies, Grade 10, Open (2024). Strands A, B and C across five units and 29 lessons, including preparation for the Financial Literacy Graduation Requirement, a Goal Journal revisited each unit, and a culminating postsecondary plan.'
    },
    icon: '🧭',
    color: '#b4532a',
    awards: {
      study: { icon: '📓', name: 'Notebook Kept: {unit}', desc: 'Read every lesson in {unit}.' },
      testPass: { icon: '✅', name: 'On Track: {unit}', desc: 'Passed the {unit} test.' },
      testPerfect: { icon: '💯', name: 'Top Marks: {unit}', desc: 'A perfect score on the {unit} test.' },
      games3: { icon: '🎲', name: 'Explorer: {unit}', desc: 'Finished three games in {unit}.' },
      allGames: { icon: '🎖️', name: 'All-Rounder: {unit}', desc: 'Finished every game in {unit}.' },
      unitMedal: { icon: '🏅', name: 'Milestone Reached: {unit}', desc: 'Every lesson read, every quiz passed and the test passed in {unit}.' },
      courseTrophy: { icon: '🏆', name: 'Pathfinder', desc: 'Earned every unit medal in {course}.' }
    },
    units: units
  });

  /* ================= COLOURING PICTURES (original line art) ================= */
  LH.colouring = LH.colouring || {};
  function pic(unitId, title, inner) {
    var k = 'glc2o/' + unitId;
    (LH.colouring[k] = LH.colouring[k] || []).push({ title: title,
      svg: '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round">' + inner + '</svg>' });
  }
  var R = ' class="region"';
  // Unit 1: a mountain path with a flag and a sun
  pic('success', 'The path to the summit',
    '<rect' + R + ' x="2" y="2" width="396" height="296"/>' +
    '<circle' + R + ' cx="330" cy="60" r="34"/>' +
    '<path' + R + ' d="M20 250 L150 70 L250 250 Z"/>' +
    '<path' + R + ' d="M150 70 L122 108 L142 122 L156 106 L176 122 L178 108 Z"/>' +
    '<path' + R + ' d="M200 250 L290 130 L390 250 Z"/>' +
    '<rect' + R + ' x="147" y="34" width="5" height="38"/>' +
    '<path' + R + ' d="M152 34 L190 44 L152 56 Z"/>' +
    '<path' + R + ' d="M2 250 H398 V298 H2 Z"/>' +
    '<path' + R + ' d="M150 298 C150 270 200 275 190 252 L215 252 C230 275 185 272 200 298 Z"/>' +
    '<ellipse' + R + ' cx="70" cy="60" rx="38" ry="16"/>');
  // Unit 2: piggy bank, coins and a bar chart
  pic('money', 'Piggy bank and savings',
    '<rect' + R + ' x="2" y="2" width="396" height="296"/>' +
    '<ellipse' + R + ' cx="150" cy="170" rx="100" ry="70"/>' +
    '<circle' + R + ' cx="250" cy="165" r="26"/>' +
    '<path' + R + ' d="M95 110 L105 78 L130 104 Z"/>' +
    '<rect' + R + ' x="85" y="230" width="26" height="40"/>' +
    '<rect' + R + ' x="185" y="230" width="26" height="40"/>' +
    '<rect' + R + ' x="125" y="98" width="50" height="9"/>' +
    '<circle' + R + ' cx="120" cy="150" r="8"/>' +
    '<circle' + R + ' cx="150" cy="60" r="22"/>' +
    '<rect' + R + ' x="300" y="200" width="24" height="70"/>' +
    '<rect' + R + ' x="330" y="160" width="24" height="110"/>' +
    '<rect' + R + ' x="360" y="110" width="24" height="160"/>' +
    '<circle' + R + ' cx="320" cy="60" r="18"/>' +
    '<circle' + R + ' cx="362" cy="72" r="14"/>');
  // Unit 3: tools of different jobs — hard hat, wrench, laptop, paintbrush
  pic('work', 'Tools of many jobs',
    '<rect' + R + ' x="2" y="2" width="396" height="296"/>' +
    '<path' + R + ' d="M40 120 A60 60 0 0 1 160 120 Z"/>' +
    '<rect' + R + ' x="28" y="120" width="144" height="16" rx="6"/>' +
    '<rect' + R + ' x="230" y="50" width="130" height="86" rx="6"/>' +
    '<rect' + R + ' x="242" y="62" width="106" height="62"/>' +
    '<path' + R + ' d="M210 136 H380 L366 156 H224 Z"/>' +
    '<rect' + R + ' x="60" y="180" width="120" height="22" rx="8" transform="rotate(-25 120 191)"/>' +
    '<circle' + R + ' cx="62" cy="218" r="24"/>' +
    '<rect' + R + ' x="250" y="180" width="18" height="90"/>' +
    '<path' + R + ' d="M244 180 H274 L270 150 Q259 132 248 150 Z"/>' +
    '<circle' + R + ' cx="330" cy="225" r="38"/>' +
    '<circle' + R + ' cx="318" cy="212" r="9"/>' +
    '<circle' + R + ' cx="345" cy="216" r="9"/>' +
    '<circle' + R + ' cx="332" cy="242" r="9"/>');
  // Unit 4: a signpost with five arrows
  pic('pathways', 'Five destinations signpost',
    '<rect' + R + ' x="2" y="2" width="396" height="296"/>' +
    '<path' + R + ' d="M2 240 H398 V298 H2 Z"/>' +
    '<rect' + R + ' x="190" y="30" width="20" height="230"/>' +
    '<path' + R + ' d="M210 40 H330 L352 58 L330 76 H210 Z"/>' +
    '<path' + R + ' d="M190 84 H70 L48 102 L70 120 H190 Z"/>' +
    '<path' + R + ' d="M210 128 H320 L342 146 L320 164 H210 Z"/>' +
    '<path' + R + ' d="M190 172 H80 L58 190 L80 208 H190 Z"/>' +
    '<path' + R + ' d="M210 200 H300 L322 218 L300 236 H210 Z"/>' +
    '<circle' + R + ' cx="200" cy="24" r="14"/>' +
    '<circle' + R + ' cx="60" cy="50" r="26"/>' +
    '<path' + R + ' d="M330 240 L350 190 L370 240 Z"/>' +
    '<ellipse' + R + ' cx="120" cy="262" rx="40" ry="12"/>');
  // Unit 5: résumé page, graduation cap and a handshake badge
  pic('plan', 'My plan: résumé and graduation cap',
    '<rect' + R + ' x="2" y="2" width="396" height="296"/>' +
    '<rect' + R + ' x="40" y="40" width="150" height="210" rx="6"/>' +
    '<circle' + R + ' cx="80" cy="80" r="18"/>' +
    '<rect' + R + ' x="110" y="66" width="62" height="12"/>' +
    '<rect' + R + ' x="110" y="84" width="46" height="10"/>' +
    '<rect' + R + ' x="58" y="118" width="114" height="14"/>' +
    '<rect' + R + ' x="58" y="142" width="114" height="14"/>' +
    '<rect' + R + ' x="58" y="166" width="114" height="14"/>' +
    '<rect' + R + ' x="58" y="200" width="60" height="26" rx="6"/>' +
    '<path' + R + ' d="M290 60 L380 95 L290 130 L200 95 Z"/>' +
    '<path' + R + ' d="M240 114 V160 Q290 190 340 160 V114 L290 134 Z"/>' +
    '<rect' + R + ' x="362" y="98" width="6" height="56"/>' +
    '<circle' + R + ' cx="365" cy="164" r="10"/>' +
    '<circle' + R + ' cx="290" cy="235" r="38"/>' +
    '<path' + R + ' d="M270 235 L285 250 L312 220 L320 228 L285 266 L262 243 Z"/>');
})();
