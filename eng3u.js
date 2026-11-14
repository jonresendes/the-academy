/* ENG3U - English (Grade 11, University Preparation) · The Academy / Learn Hub
   Built from the teacher's "ENG3U - Complete Course" package (33 slide decks, worksheets,
   answer keys, unit tests, unit assignments, CCT and final exam).
   Lesson routine (same in every lesson):
     slide 0 Start here · 1 Key ideas · 2 The text · 3 📝 Write this down · 4 🧪 Try it
     assignment 1 = "📝 My record" (the note + one line about your own life)
     assignment 2 = the lesson task from the worksheet
   Levels: L1 short and plain · L2 the deck's text · L3 = L2 + expectations / worked example
           L4 = L3 + "Go further" (never rewrites L3). */
(function () {
  'use strict';
  var W = window;
  W.LearnHub = W.LearnHub || { courses: [] };
  W.LearnHub.courses = W.LearnHub.courses || [];

  // ---------- helpers ----------
  function lv(a, b, c, d) { var o = { 1: a }; if (b) o[2] = b; if (c) o[3] = c; if (d) o[4] = d; return o; }
  function arr(x) { return Array.isArray(x) ? x : [x]; }
  function hash(s) { var h = 0, i; for (i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 9973; return h; }
  function place(answer, wrong, seed) {            // answer in a steady, non-obvious position
    var out = wrong.slice(), at = hash(seed) % (wrong.length + 1);
    out.splice(at, 0, answer); return out;
  }
  // slide: l1 plain, l2 deck text, x3 added at Level 3, x4 added at Level 4
  function S(title, visual, l1, l2, x3, x4) {
    var body = { 1: l1.trim(), 2: l2.trim() };
    if (x3) body[3] = body[2] + '\n\n' + x3.trim();
    if (x4) body[4] = (body[3] || body[2]) + '\n\n**Go further:** ' + x4.trim();
    return { title: title, visual: visual, body: body };
  }
  // multiple choice: wrong = [w1, w2, w3] with the most obviously wrong option LAST
  function mc(prompt, answer, wrong) {
    var silly = wrong[wrong.length - 1];
    return { type: 'mc', prompt: prompt, answer: answer, options: {
      1: place(answer, [silly], prompt),
      2: place(answer, wrong.length > 2 ? [wrong[0], silly] : wrong, prompt),
      3: place(answer, wrong, prompt) } };
  }
  function tf(prompt, answer) { return { type: 'tf', prompt: prompt, answer: answer }; }
  // true statement at Levels 1–2, the trickier false one at Levels 3–4
  function tfx(t, f) {
    return [{ type: 'tf', prompt: t, answer: true, levels: [1, 2] },
            { type: 'tf', prompt: f, answer: false, levels: [3, 4] }];
  }
  function fill(prompt, answer, others) {
    return { type: 'fill', prompt: prompt, answer: answer, bank: place(answer, others, prompt) };
  }
  // Level-4-only application question (real-life scenario), flat four options
  function app(prompt, answer, wrong) {
    return { type: 'mc', prompt: prompt, answer: answer, options: place(answer, wrong, prompt), levels: [4] };
  }
  // assignment (task). p = [L1, L2, L3, L4] prompts; ok = [L1–2 success, L3–4 success]
  function T(title, p, starter, ok, exp) {
    return { title: title, prompt: lv(p[0], p[1], p[2], p[3]), starter: lv(starter),
             success: { 1: ok[0], 3: ok[1] || ok[0] }, expectations: exp || 'B1, C1' };
  }
  // the notebook record, checked in the app
  function R(life, exp) {
    var q = life[0];
    return { title: '📝 My record', expectations: exp || 'B4, C1',
      prompt: lv(
        'Copy the note from the “Write this down” slide (or type the 3 points you think matter most). Then answer in one sentence: ' + q,
        'Record the note from the “Write this down” slide. Then add two or three sentences about you: ' + q,
        'Record the note in your own words (do not copy it word for word). Then answer with one specific example: ' + q,
        'Record the note in your own words. Answer with one specific example: ' + q + ' Finish with one real question this lesson left you with.'),
      starter: lv(life[1]),
      success: lv('The 3 main points and one sentence about your own life.',
        'The full note and 2–3 sentences about your own life.',
        'The note in your own words, plus a specific example from your life that uses at least one key term correctly.',
        'The note in your own words, a specific example that uses key terms correctly, and a question worth discussing in class.') };
  }
  function M(slide, type, title, source, url, why, minutes) {
    var m = { slide: slide, type: type, title: title, why: why, source: source, url: url, search: title, src: '' };
    if (minutes) m.minutes = minutes; return m;
  }
  // a poem as raw slide HTML (stanzas = arrays of lines); shown at every level under the slide text
  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function poem(title, stanzas, credit) {
    return '<blockquote class="poem"><p><strong>' + esc(title) + '</strong></p>' + stanzas.map(function (st) {
      return '<p>' + st.map(esc).join('<br>') + '</p>'; }).join('') + '<p><em>' + esc(credit) + '</em></p></blockquote>';
  }
  function bullets(list) { return list.map(function (x) { return '- ' + x; }).join('\n'); }

  /* lesson builder
     o = { exp, goals:[..], warm:[l1,l2], ideasTitle, ideas:[l1,l2,x3,x4], textTitle, textIcon, text:[l1,l2,x3,x4],
           note:[[L1 points],[L2 points]], life:[question, starter], tryTitle, tryit:[l1,l2,x4], exit,
           terms:[[term,d1,d2]], q:[...], task:T(..), extra:[T..], media:[M..] } */
  function L(n, short, title, o) {
    var cat = 'L' + n + ' ' + short, qs = [], terms = o.terms.map(function (t) {
      return { term: t[0], def: lv(t[1], t[2]) };
    });
    function add(q) { arr(q).forEach(function (x) { x.cat = cat; qs.push(x); }); }
    // two vocabulary questions built from the lesson's own words
    [0, 3].forEach(function (i) {
      var t = o.terms[i]; if (!t) return;
      var others = o.terms.filter(function (x) { return x !== t; }).map(function (x) { return x[0]; }).slice(0, 3);
      var q = mc(t[2], t[0], [others[0], others[1], others[2]].filter(Boolean));
      q.prompt = lv('Which word means: ' + t[1], 'Which term matches this definition? ' + t[2]);
      add(q);
    });
    (o.q || []).forEach(add);
    add({ type: 'match', prompt: 'Match each term from Lesson ' + n + ' to its meaning.',
          pairs: o.terms.map(function (t) { return [t[0], t[1]]; }) });
    var goals = bullets(o.goals);
    var slides = [
      S('Start here: ' + title, o.icon || '📖',
        o.warm[0] + '\n\n**Today I will:**\n' + bullets(o.goals1 || o.goals.slice(0, 2)),
        o.warm[1] + '\n\n**By the end of this lesson, you can…**\n' + goals,
        '**Curriculum expectations (ENG3U):** ' + o.exp),
      S(o.ideasTitle, '🗝️', o.ideas[0], o.ideas[1], o.ideas[2], o.ideas[3]),
      (function () { var s = S(o.textTitle, o.textIcon || '📜', o.text[0], o.text[1], o.text[2], o.text[3]); if (o.textHtml) s.html = o.textHtml; return s; })(),
      S('📝 Write this down', '📝',
        '**Copy this into your notebook.**\n\n' + bullets(o.note[0]) + '\n\n**Then add one line about you:** ' + o.life[0],
        '**Record this note in your notebook.** You will use it for the unit test, the assignment and today’s experiment.\n\n' +
          bullets(o.note[1]) + '\n\n**Then add a line about your own life:** ' + o.life[0],
        '**Make it yours:** put a star beside the one point you could explain to someone at home without looking.'),
      S('🧪 Try it: ' + o.tryTitle, '🧪',
        o.tryit[0] + '\n\n**Exit question:** ' + (o.exit1 || o.exit),
        o.tryit[1] + '\n\n**Record your result** in your notebook, then answer the exit question: ' + o.exit,
        '**Next:** open the lesson quiz, then the two assignments (your record and the lesson task).',
        o.tryit[2])
    ];
    return { n: n, lesson: { title: 'Lesson ' + n + ' · ' + title, cats: [cat], slides: slides,
      assignments: [R(o.life, o.recExp)].concat([o.task]).concat(o.extra || []), media: o.media || [] },
      terms: terms, questions: qs };
  }
  function U(id, title, desc, built) {
    var u = { id: id, title: title, description: lv(desc[0], desc[1], desc[2]), lessons: [], terms: [], questions: [] };
    var seen = {};
    built.forEach(function (b) {
      u.lessons.push(b.lesson);
      b.terms.forEach(function (t) { var k = t.term.toLowerCase(); if (!seen[k]) { seen[k] = 1; u.terms.push(t); } });
      u.questions = u.questions.concat(b.questions);
    });
    return u;
  }
  var UNITS = [];

  // =====================================================================
  // UNIT 1 · THE SHORT STORY  — “Every word is a choice.”
  // =====================================================================
  UNITS.push(U('stories', 'Unit 1 · The Short Story', [
    'Six short stories. For each one we ask: why did the writer choose this?',
    'Six short stories, six tools for reading them: plot and irony, character and conflict, point of view, setting and symbol, theme and perspective, and analytical writing (PEEL). Unit motto: “Every word is a choice.”',
    'Six short stories (Chopin, Roberts, Poe, Jackson, Johnson, Leacock) and the tools of literary analysis: plot and irony, characterization and conflict, point of view and the unreliable narrator, setting and symbol, theme and perspective, and the PEEL paragraph. Ends with the Close Reading Literary Analysis (40 marks) and the unit test. Expectations: A1, A2, B1–B4, C1–C3, D1.'
  ], [

    L(1, 'Elements & Irony', 'What Makes a Short Story Work?', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · A1 Listening to Understand',
      goals: ['Explain what makes the short story its own form', 'Name the five elements of fiction and the six stages of plot', 'Identify three kinds of irony in “The Story of an Hour”'],
      warm: [
        `Think of a story you could tell in under one minute. It could be a joke, a rumour or something from your week.\n\nWhat made it worth telling?`,
        `**Warm-up (no notes needed).** Think of a story you could tell in under a minute: a joke, a rumour, a moment from your week. What made it worth telling?\n\nWhat is the difference between “something that happened” and “a story”?\n\nUnit motto: **“Every word is a choice.”** All unit long we ask *why* the writer made this choice.`],
      ideasTitle: 'The short story, five elements, Freytag’s Pyramid',
      ideas: [
        `A **short story** is short fiction you can read in one sitting. It leaves **one strong feeling**.\n\n**Five elements:** plot, character, setting, point of view, theme.\n\n**Plot has six stages:**\n- Exposition (the start)\n- Inciting incident (the spark)\n- Rising action (tension builds)\n- Climax (the turning point)\n- Falling action\n- Resolution (the end)\n\n**Irony** is a gap between what *seems* true and what *is* true.`,
        `**A short story** is brief prose fiction, built to be read in one sitting and to leave one strong impression.\n- **Compression:** few characters, one main conflict, a short span of time\n- **Unity of effect:** every detail works toward a single emotional impact (Edgar Allan Poe’s idea)\n- **Implication:** much is left unsaid, so the reader must infer\n\n**The five elements of fiction:** plot (what happens, in what order), character (who it happens to, how they change), setting (where and when, including the social world), point of view (who tells it, how much they know), theme (the insight about life).\n\n**Freytag’s Pyramid:** exposition → inciting incident → rising action → climax → falling action → resolution (dénouement).\n\n**Three kinds of irony** (a gap between what seems true and what is true):\n| Kind | What it is |\n| Verbal | a speaker says the opposite of what they mean |\n| Situational | what happens is the opposite of what we expect |\n| Dramatic | the reader knows something a character does not |`,
        `**Think like an analyst:** the elements are tools. Analysis asks: *why did the author use this tool in this way?*\n\n**A Canadian strength:** Mavis Gallant, Alistair MacLeod and Thomas King built careers on the short story.`,
        `Poe argued that a story must be short enough to read in one sitting. What is lost, and what is gained, when a story is *that* compressed? Think of one film that would be better as a ten-minute short.`],
      textTitle: '“The Story of an Hour” — Kate Chopin (1894)', textIcon: '🪟',
      text: [
        `**The story in brief.** Louise Mallard has a weak heart. She is told that her husband, Brently, died in a train accident.\n\nShe cries. Then, alone at an open window, she sees spring outside and whispers “free, free, free!”\n\nThen the front door opens. Brently is alive. Louise dies.\n\nThe doctors say she died “of joy that kills.” **We know better.** That is dramatic irony.`,
        `About 1,000 words, first printed in *Vogue* in December 1894, when a married woman had few legal rights of her own. Free to read at katechopin.org/story-hour.\n\n**Mapping the story**\n| Stage | Event |\n| Exposition | Louise’s weak heart; the news is broken to her gently |\n| Inciting incident | the report that Brently has been killed in a “railroad disaster” |\n| Rising action | alone at the window, she slowly recognizes her freedom |\n| Climax | Brently opens the front door, alive |\n| Resolution | Louise dies; the doctors misread the cause |\n\n**As you read, track:** each stage of the plot, Louise’s emotions moment by moment, and everything she sees and hears through the open window (signs of new spring life).\n\n**The last line:** the doctors say she died “of joy that kills.” They believe joy killed her. We know she died of the shock of losing the freedom she had just found.`,
        `**Up for debate:** some readers place the climax earlier, at “Free! Body and soul free!” Which moment is the true turning point? Defend your choice.\n\n**Discussion:** Chopin tells us Brently was kind and loving. Why include that detail? Does it change how we judge Louise?`,
        `The final line can be read as dramatic irony (we know what the doctors do not) or situational irony (the outcome reverses what everyone expects). Argue for the label you think fits best, using the exact wording of the line.`],
      note: [
        ['A short story gives one strong feeling in one sitting.', 'Five elements: plot, character, setting, point of view, theme.', 'Irony = a gap between what seems true and what is true.'],
        ['A short story aims for **unity of effect**: one sitting, one strong impression.', 'The five elements are plot, character, setting, point of view and theme.', 'Freytag’s Pyramid: exposition, inciting incident, rising action, climax, falling action, resolution.', 'Irony is verbal, situational or dramatic. “Joy that kills” is dramatic irony: we know what the doctors do not.']],
      life: ['Where did you meet irony in your own life this week (something said, or something that turned out the opposite of what you expected)?', 'This week I noticed irony when…'],
      tryTitle: 'Plot your own minute',
      tryit: [
        `**Experiment.** Tell someone a true one-minute story from your week.\n\n1. Draw a pyramid (a mountain shape).\n2. Write where your story **started**, the **turning point**, and how it **ended**.\n3. Ask your listener: “What was the best moment?” Was it your turning point?`,
        `**Experiment: does a real story have a pyramid?**\n\n1. Tell someone a true one-minute story from your week (or use a film, show or game you both know).\n2. Draw Freytag’s Pyramid and label all six stages with one event each.\n3. Ask your listener which moment they think was the climax. Do you agree?\n4. Which stage was hardest to pin down, and why?`,
        `Tell the same story again, but start at the climax. What did the new order do to your listener? Record one sentence on what order has to do with “unity of effect.”`],
      exit: 'What kind of irony is “joy that kills,” and how do you know?', exit1: 'The doctors are wrong about why Louise died. What do we know that they do not?',
      terms: [
        ['unity of effect', 'every part of a story works toward one strong feeling', 'Poe’s idea that a story should be read in one sitting, with every word serving one overall effect'],
        ['exposition', 'the start of a story, where we meet the people and place', 'the opening of a plot, which introduces characters, setting and situation'],
        ['inciting incident', 'the event that starts the problem', 'the event that sparks the central conflict'],
        ['climax', 'the turning point, the most tense moment', 'the turning point of a plot; the moment of highest tension'],
        ['dénouement', 'the ending, where the problem is settled', 'the final resolution, where the conflict is settled or deliberately left open'],
        ['dramatic irony', 'we know something a character does not', 'the reader knows something that a character does not'],
        ['situational irony', 'the opposite of what we expect happens', 'what happens is the opposite of what is expected'],
        ['verbal irony', 'saying the opposite of what you mean', 'a speaker says the opposite of what they mean']],
      q: [
        mc('A short story is best described as:', 'brief prose fiction designed to create a single, unified impression', ['the first chapter of a novel', 'a true account of real events', 'any book with pictures']),
        mc('The idea of “unity of effect” is most closely associated with which writer?', 'Edgar Allan Poe', ['Kate Chopin', 'Stephen Leacock', 'John Green']),
        mc('Which stage of plot is the event that sparks the central conflict?', 'Inciting incident', ['Exposition', 'Climax', 'The title']),
        mc('In “The Story of an Hour,” what does Louise notice through the open window?', 'Signs of new spring life', ['A gathering storm', 'A funeral procession', 'A hockey game']),
        mc('The doctors’ conclusion that Louise died “of joy that kills” is an example of:', 'dramatic irony', ['verbal irony', 'hyperbole', 'rhyme']),
        tf('A short story usually focuses on a single main conflict.', true),
        tfx('In Freytag’s Pyramid, the resolution comes after the climax.', 'In Freytag’s Pyramid, the resolution comes before the climax.'),
        tfx('In “The Story of an Hour,” Brently Mallard walks in alive at the end.', 'In “The Story of an Hour,” Brently Mallard dies in a railroad disaster.'),
        fill('The five elements of fiction are plot, character, setting, point of view and ___.', 'theme', ['irony', 'climax', 'rhyme']),
        app('A friend texts “Great, another Monday. My favourite.” while stuck in the rain waiting for a late bus. Which kind of irony is this?', 'Verbal irony: the words say the opposite of what the speaker means', ['Dramatic irony: the reader knows more than the speaker', 'Situational irony: the bus was expected to be late', 'No irony: the friend loves Mondays']),
        app('In a horror film, the audience can see the intruder in the closet, but the babysitter cannot. The tension comes from:', 'dramatic irony', ['verbal irony', 'the resolution', 'exposition']),
        app('A fire station burns down. A student calls this “dramatic irony.” The best correction is:', 'It is situational irony: the outcome is the opposite of what we expect', ['It is verbal irony, because someone reported it', 'It is not irony, only bad luck', 'It is a climax, not irony'])
      ],
      task: T('Lesson 1 task: Mapping “The Story of an Hour”', [
        'Finish these three sentences about “The Story of an Hour.” (1) The story starts when Louise is told… (2) The turning point is when… (3) The doctors think she died of joy, but really…',
        'Name the event in “The Story of an Hour” for each stage: exposition, inciting incident, climax, resolution. Then say what type of irony the last line (“of joy that kills”) creates, and how you know.',
        'Map the story on Freytag’s Pyramid (exposition, inciting incident, climax, resolution), identify the irony in the final line with an explanation, then answer: is Louise’s reaction to her husband’s death selfish, human, or both? Support your opinion with at least one specific detail from the story.',
        'Complete the Level 3 task. Then defend ONE placement of the climax (Brently at the door, or “Free! Body and soul free!”) against the other, and explain how your choice changes what the story is about.'],
        'The inciting incident is…',
        ['Each sentence or stage matches a real event in the story, and you explain what the reader knows that the doctors do not.',
         'Four accurate plot stages; the irony named and explained; a clear opinion on Louise supported by a specific detail (for example, she weeps “with sudden, wild abandonment,” yet whispers “free, free, free!”).'], 'B1, B2'),
      media: [
        M(1, 'video', 'Crash Course Literature #1: How and Why We Read', 'Crash Course (John Green)', 'https://thecrashcourse.com', 'Sets up the unit motto: if reading is communication, every word the writer chose is worth noticing.', 7),
        M(2, 'image', 'Freytag’s Pyramid diagram', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'A labelled pyramid beside the plot map of the story.')]
    }),

    L(2, 'Character & Conflict', 'Character & Conflict', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · A2 Speaking to Communicate',
      goals: ['Tell protagonists from antagonists, and round, flat, dynamic and static characters', 'Use STEAL to find indirect characterization', 'Identify internal and external conflict in a Canadian wilderness story'],
      warm: [
        `Name a “villain” from a movie, show or game. What did they want?\n\nIs anyone the villain of their own story?`,
        `**Warm-up.** Name a “villain” from a movie, show or game whose motives you actually understood. What did they want?\n\nIs anyone the villain of their own story?\n\nToday: two starving panthers, one crying child. Whose side are you on?`],
      ideasTitle: 'Building character, STEAL, types of conflict',
      ideas: [
        `**Protagonist:** the main character. **Antagonist:** whatever is against them (a person, nature, society or themselves).\n\n**Dynamic** characters change. **Static** characters stay the same.\n\nWriters show character with **STEAL**:\n- **S**peech\n- **T**houghts\n- **E**ffect on others\n- **A**ctions\n- **L**ooks\n\n**Conflict** is the struggle in a story. No conflict, no story.\n- Inside: person vs. self\n- Outside: person vs. person, nature or society`,
        `**Building character**\n- **Protagonist:** the central character, whose goal drives the story\n- **Antagonist:** the force opposing that goal: a person, society, nature or the self\n- **Round vs. flat:** complex and contradictory vs. defined by one or two traits\n- **Dynamic vs. static:** changes in a meaningful way vs. stays the same\n\n*Careful:* a protagonist is not always “the good guy,” and an antagonist is not always evil.\n\n**How writers reveal character**\n- **Direct characterization:** the narrator states a trait outright (“She was stubborn.”)\n- **Indirect characterization:** the writer shows evidence and we infer the trait\n- **STEAL:** Speech · Thoughts · Effect on others · Actions · Looks\n\n**Types of conflict**\n| Conflict | Meaning |\n| Person vs. Self (internal) | competing desires, duties or fears inside one character |\n| Person vs. Person | two characters want incompatible things |\n| Person vs. Nature | survival against animals, weather or landscape |\n| Person vs. Society | one character against laws, customs or expectations |`,
        `**Why it matters:** indirect characterization makes the reader do the work, so the character feels real. Strong stories **layer** conflicts: an outer struggle usually exposes an inner one.`,
        `Pick a character you first read as a villain and later understood. Which letter of STEAL changed your mind, and what does that tell you about how writers control sympathy?`],
      textTitle: '“Do Seek Their Meat from God” — Charles G.D. Roberts (1892)', textIcon: '🐆',
      text: [
        `**The story in brief.** Two panthers are starving. They have cubs to feed. They hear a child crying in a cabin and go to hunt.\n\nA tired settler hears the crying too. He almost keeps walking. Then he turns back and shoots the panthers.\n\n**The twist:** the child is his own son.\n\nLater he finds the panther cubs, dead. Both families were only trying to live.`,
        `A New Brunswick writer; the title echoes Psalm 104:21. Roberts helped create the realistic animal story, a form Canadians made famous. Free on Project Gutenberg (ebook 20231).\n\n**Reading the conflict**\n- **Person vs. Nature:** the settler fights the panthers, yet they are hunting only to feed their cubs\n- **Person vs. Self:** tired and irritated, he argues with his own conscience before turning back\n- **Parallel parents:** both sides are providing for their young; one family’s survival costs the other’s\n- **The narrator** moves between animal and human minds and refuses to pick a side\n\n**The twist:** he expects the squatter’s neglected boy. Then a voice cries, “Daddy, daddy, I knew you’d come.” The child is his own son.\n\n**The ending:** Roberts closes on the dead cubs, not the rescue.`,
        `**Worked example (STEAL, Actions):** the settler hides his load, takes his gun and hurries back toward the crying child. *Trait revealed:* he is compassionate and conscientious despite his irritation. He is **dynamic**: he moves from indifference to deep feeling (“Thank God I came!”).`,
        `Can a story have a real conflict and no villain at all? Where do we see “both sides are only trying to survive” conflicts in Canada today (wildlife moving into towns, cottage country and cities)?`],
      note: [
        ['The protagonist is the main character. The antagonist is whatever is against them.', 'STEAL: Speech, Thoughts, Effect on others, Actions, Looks.', 'Conflict is inside (vs. self) or outside (vs. person, nature, society).'],
        ['The protagonist drives the story; the antagonist is whatever opposes them, and it need not be evil.', 'Round characters are complex; dynamic characters change.', 'Indirect characterization shows instead of tells. Use **STEAL** to find it.', 'Conflict is internal (vs. self) or external (vs. person, nature, society), and strong stories layer both.']],
      life: ['What is one conflict in your own week, and which type is it (vs. self, person, nature or society)?', 'One conflict in my week was… It is person vs. … because…'],
      tryTitle: 'STEAL in real life',
      tryit: [
        `**Experiment.** Watch one person for five minutes (at home, on the bus, or a character on a show). Do not tell them.\n\nWrite down:\n- one thing they **said**\n- one thing they **did**\n- one thing about how they **look**\n\nWhat does each one tell you about them?`,
        `**Experiment: can you read a person without being told?**\n\n1. Observe one person for five minutes (someone at home, or a character in a show with the sound low).\n2. Collect evidence for any THREE letters of STEAL.\n3. Beside each piece of evidence, write the trait it reveals.\n4. Check: ask the person (or someone who knows the show) if your inferences are fair.`,
        `Now write two sentences about that person: one using only direct characterization, one using only indirect. Which would a reader believe more, and why?`],
      exit: 'Is the settler dynamic or static? Give one piece of evidence.', exit1: 'Does the settler change in the story? How?',
      terms: [
        ['protagonist', 'the main character of a story', 'the central character, whose goal drives the story'],
        ['antagonist', 'the person or force against the main character', 'the force that opposes the central character'],
        ['round character', 'a character with many sides, like a real person', 'a complex character with many sides, sometimes contradictory'],
        ['static character', 'a character who does not change', 'a character who does not change in any meaningful way'],
        ['dynamic character', 'a character who changes', 'a character who changes in a meaningful way over the story'],
        ['direct characterization', 'the narrator tells you what a character is like', 'the narrator states a character’s trait outright'],
        ['indirect characterization', 'the writer shows clues and you work out what the character is like', 'the writer shows evidence (speech, thoughts, effect, actions, looks) and the reader infers the trait'],
        ['conflict', 'the struggle or problem in a story', 'the struggle that drives a plot']],
      q: [
        mc('A character who changes in a meaningful way over the course of a story is called:', 'dynamic', ['static', 'flat', 'invisible']),
        mc('The acronym STEAL is a tool for analyzing:', 'indirect characterization', ['plot structure', 'types of irony', 'page numbers']),
        mc('In “Do Seek Their Meat from God,” the settler’s debate about whether to turn back is an example of which conflict?', 'Person vs. Self', ['Person vs. Society', 'Person vs. Person', 'Person vs. Fate']),
        mc('Why are the panthers hunting in Roberts’s story?', 'They are starving and have cubs to feed', ['They are defending their territory from the settler', 'They hunt for sport', 'They are lost pets']),
        mc('A teenager refuses to follow a tradition her whole town expects her to obey. This is:', 'Person vs. Society', ['Person vs. Nature', 'Person vs. Self', 'Person vs. Weather']),
        tf('In “Do Seek Their Meat from God,” the child the settler saves turns out to be his own son.', true),
        tfx('An antagonist can be nature, society or the character’s own self.', 'An antagonist must always be a human character.'),
        fill('When the narrator states a trait outright (“She was stubborn”), it is ___ characterization.', 'direct', ['indirect', 'dynamic', 'dramatic']),
        app('A hiker caught in a sudden blizzard has to decide whether to leave an injured friend to get help. Which pair of conflicts is layered here?', 'Person vs. Nature and Person vs. Self', ['Person vs. Society and Person vs. Person', 'Person vs. Person only', 'There is no conflict, only setting']),
        app('A job reference says: “Sam is reliable.” An interviewer instead notices that Sam arrived ten minutes early with notes prepared. The interviewer is using:', 'indirect characterization (Actions)', ['direct characterization', 'dramatic irony', 'a static character']),
        app('A coyote takes a family’s cat in a new suburb built on its hunting ground. A reader of Roberts would most likely say:', 'neither side is a villain; one family’s survival costs the other’s', ['the coyote is the protagonist, so it is good', 'this is Person vs. Society', 'there is no conflict because no one chose it'])
      ],
      task: T('Lesson 2 task: STEAL chart and the ending', [
        'Choose the settler OR the panthers. Write two things they DO in the story. Beside each, write one word for what it shows about them (for example: caring, hungry, brave).',
        'Choose the settler OR the panthers. Find evidence for THREE letters of STEAL and write the trait each one reveals. Then decide: is the settler dynamic or static? Give one piece of evidence.',
        'Complete a STEAL chart for the settler or the panthers (three letters, evidence + trait). State whether the settler is dynamic or static, with evidence. Then answer: why does Roberts end the story with the dead panther cubs instead of the rescue?',
        'Complete the Level 3 task. Then argue who the protagonist of this story really is, and explain what the shifting narrator does to the reader’s sympathy.'],
        'One action that shows character is…',
        ['Two real actions from the story, each matched to a sensible trait.',
         'Three accurate pieces of STEAL evidence with traits; “dynamic” supported (irritated → turns back → “Thank God I came!”); an explanation of the ending that sees the cost of the rescue (the panthers were parents too).'], 'B1, B2'),
      media: [
        M(2, 'image', 'Sir Charles G.D. Roberts (portrait and biography)', 'The Canadian Encyclopedia', 'https://www.thecanadianencyclopedia.ca/en/article/sir-charles-george-douglas-roberts', 'Introduces the New Brunswick author of the realistic animal story.'),
        M(2, 'image', 'Eastern cougar (panther) in forest', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'Helps students picture the animals the story asks them to sympathize with.')]
    }),

    L(3, 'Point of View', 'Who’s Telling the Story?', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · C2 Using Knowledge of Form and Style · D1 Understanding Media Texts',
      goals: ['Identify five points of view and what each one lets a reader know', 'Explain what makes a narrator unreliable, with evidence', 'Describe how diction and syntax create tone and mood'],
      warm: [
        `Think of an argument you had. The other person would tell the story differently.\n\nWhat would THEY leave out? What would YOU leave out?`,
        `**Warm-up.** Think of an argument where the other person would tell the story completely differently. What would THEY leave out? What would you leave out?\n\nWhy do we tend to trust whoever is telling us the story?\n\n*Content note:* today’s story describes a murder.`],
      ideasTitle: 'Point of view, the unreliable narrator, tone and mood',
      ideas: [
        `**Point of view** = who tells the story.\n- **First person:** “I”\n- **Third-person limited:** “he/she/they,” inside ONE mind\n- **Third-person omniscient:** knows EVERY mind\n- **Third-person objective:** like a camera; no thoughts\n\nAn **unreliable narrator** is a storyteller we cannot fully trust.\n\n**Tone** = the speaker’s attitude. **Mood** = the feeling in the reader.`,
        `**Point of view**\n| Point of view | What it gives the reader |\n| First person | “I”; the narrator is a character. Intimate, but limited and biased |\n| Second person | “you”; rare, and puts the reader inside the story |\n| Third-person limited | “he, she, they”; inside one character’s mind |\n| Third-person omniscient | all-knowing; moves between minds, as in last lesson’s story |\n| Third-person objective | reports only what can be seen and heard, like a camera |\n\n**The unreliable narrator:** a narrator whose account we have good reason to doubt, because of limited knowledge, bias or self-interest, an altered state (fear, obsession, illness), or deliberate deception.\n\n*Clues:* contradictions, insisting too hard, gaps in the story, other characters reacting in ways the narrator cannot explain.\n\n**Voice, tone and mood**\n- **Voice:** the narrator’s distinct personality on the page\n- **Tone:** the speaker’s attitude toward the subject (mocking, anxious, proud)\n- **Mood (atmosphere):** the feeling created in the reader (dread, calm, suspense)\n- **Diction and syntax** (word choice and sentence structure) create all three`,
        `**Don’t mix them up:** tone is the speaker’s attitude; mood is the reader’s feeling.\n\n**Practice:** “Maya dreaded opening the letter; across town, her brother already regretted sending it.” Two minds → third-person omniscient.`,
        `Where do we meet unreliable narrators today? Think of social media, true crime podcasts and reality TV. Which of the four causes of unreliability is most common online, and how can you tell?`],
      textTitle: '“The Tell-Tale Heart” — Edgar Allan Poe (1843)', textIcon: '🫀',
      text: [
        `**The story in brief.** A man says again and again that he is NOT mad. He says he loved an old man. But he hates the old man’s eye.\n\nHe kills the old man and hides the body under the floor.\n\nThe police come. The man hears a heart beating, louder and louder. The police hear nothing. He confesses.\n\nThe more he says he is sane, the less we believe him.`,
        `About 2,100 words; free on Project Gutenberg (ebook 2148).\n\n**As you read, track:** every time the narrator insists he is sane; dashes, exclamation marks and repeated words; who “you” is; and the sounds (what do we hear, and who hears it?).\n\n**How Poe builds the voice**\n| Technique | Example and effect |\n| Repetition | “very, very dreadfully nervous”: he cannot stop himself |\n| Broken syntax | dashes and exclamations mimic a racing mind |\n| Direct address | “you” makes the reader his judge |\n| Slowed time | a whole hour to put his head through the doorway: suspense through delay |\n| Sound imagery | “a low, dull, quick sound” turns guilt into a noise |\n\n**The effect:** the harder he argues that he is sane, the less we believe him. The proof is in *how* he speaks, not what he says.`,
        `**Evidence he is unreliable:** he says he loved the old man but kills him for his “vulture” eye; he hears the dead man’s heart beneath the floorboards while the police hear nothing; he treats his careful planning as proof of sanity.\n\n**Discussion:** whose heart is really beating at the end?`,
        `What would be lost if a calm, third-person objective narrator told this story? Rewrite the last moment in two objective sentences and name what disappeared.`],
      note: [
        ['Point of view is who tells the story: first person (“I”) or third person (he/she/they).', 'An unreliable narrator cannot be fully trusted.', 'Tone = the speaker’s attitude. Mood = the reader’s feeling.'],
        ['Point of view controls what the reader can know: first, second, third limited, omniscient, objective.', 'An unreliable narrator’s account cannot be fully trusted; look for contradictions and over-insisting.', 'Tone is the speaker’s attitude; mood is the reader’s feeling.', 'Diction and syntax (repetition, dashes, direct address) create voice.']],
      life: ['When was the last time you heard only one side of a story? What made you trust, or doubt, the person telling it?', 'I heard only one side when… I trusted / doubted it because…'],
      tryTitle: 'Flip the narrator',
      tryit: [
        `**Experiment.** Think of a small argument or mix-up from your week.\n\n1. Write 3 sentences telling it **your** way (“I…”).\n2. Write 3 sentences telling it the **other person’s** way (“I…” as them).\n\nWhat changed?`,
        `**Experiment: what does a new point of view gain and lose?**\n\n1. Choose a small disagreement or mix-up from your week (or the night of the murder in Poe’s story).\n2. Tell it in 5–6 sentences in first person, your side.\n3. Retell it from a NEW point of view: the other person (first person), or a camera on the wall (third-person objective).\n4. Record: what did the new point of view gain? What did it lose?`,
        `Show both versions to someone who was not there. Ask which narrator they trust more and why. Record which “clue” of unreliability they noticed.`],
      exit: 'Explain the difference between tone and mood, with one example of each.', exit1: 'Whose feeling is “mood”: the speaker’s or the reader’s?',
      terms: [
        ['point of view', 'who tells the story', 'who tells the story, and how much they know'],
        ['first-person narration', 'the story is told by “I”', 'the story is told by a character who uses “I”'],
        ['omniscient', 'a narrator who knows every character’s thoughts', 'all-knowing; a third-person narrator who can move between every character’s mind'],
        ['unreliable narrator', 'a storyteller we cannot fully trust', 'a storyteller whose account the reader has good reason to doubt'],
        ['tone', 'the speaker’s attitude', 'the speaker’s or author’s attitude toward the subject'],
        ['mood', 'the feeling the reader gets', 'the feeling a text creates in the reader'],
        ['diction', 'word choice', 'a writer’s choice of words'],
        ['syntax', 'how sentences are built', 'sentence structure: the length, order and punctuation of sentences']],
      q: [
        mc('A narrator who can report the thoughts of every character is:', 'third-person omniscient', ['third-person limited', 'third-person objective', 'second-person silent']),
        mc('The narrator of “The Tell-Tale Heart” repeatedly insists that he is:', 'not mad', ['innocent of any crime', 'the old man’s son', 'a famous singer']),
        mc('The feeling a text creates in the reader is called:', 'mood', ['tone', 'diction', 'plot']),
        mc('According to Poe’s narrator, what drives him to kill the old man?', 'The old man’s eye', ['The old man’s gold', 'An insult', 'A loud television']),
        mc('“The girl opened the letter, read it, folded it twice and left the room.” This sentence is:', 'third-person objective', ['third-person limited', 'first person', 'second person']),
        tf('The narrator of “The Tell-Tale Heart” confesses because he believes he hears the dead man’s heart beating.', true),
        tfx('A third-person objective narrator reports only what can be seen and heard.', 'A third-person objective narrator reveals every character’s private thoughts.'),
        fill('Tone is the speaker’s attitude; ___ is the feeling created in the reader.', 'mood', ['voice', 'syntax', 'plot']),
        app('A reality show contestant says in a confessional, “I never start drama,” right after footage of them starting an argument. Viewers treat the contestant as:', 'an unreliable narrator, because the evidence contradicts the account', ['an omniscient narrator', 'a static character', 'a third-person objective narrator']),
        app('A news site reports only what police body cameras recorded, with no one’s thoughts or feelings. The closest point of view is:', 'third-person objective', ['third-person omniscient', 'first person', 'second person']),
        app('A product review repeats “honestly, truly, I swear this is 100% real” five times. Which clue of unreliability from this lesson applies?', 'Insisting too hard', ['Slowed time', 'Third-person limited', 'Sound imagery'])
      ],
      task: T('Lesson 3 task: Is he reliable?', [
        'Is the narrator of “The Tell-Tale Heart” telling the truth about being sane? Write two things he says or does that make you doubt him.',
        'Define “unreliable narrator.” Then give TWO pieces of evidence from the story that show Poe’s narrator is unreliable.',
        'Give two pieces of evidence that the narrator is unreliable and explain what each shows. Then choose ONE technique Poe uses (repetition, broken syntax, direct address, slowed time or sound imagery) and explain its effect on you as a reader, with an example.',
        'Complete the Level 3 task. Then rewrite 4–5 sentences of the story from a new point of view (police officer, the old man, or an all-knowing narrator) and explain in two sentences what the new version gained and lost.'],
        'One reason I doubt the narrator is…',
        ['Two real details from the story that give a reason to doubt him.',
         'Two accurate pieces of evidence, each explained (for example, he hears the heart while the police hear nothing); one technique named, with an accurate example and its effect on the reader.'], 'B1, B2, C2'),
      media: [
        M(1, 'video', 'Why should you read Edgar Allan Poe? (Scott Peeples)', 'TED-Ed', 'https://ed.ted.com', 'Poe’s rules for story length and the single effect; why his narrators unsettle us.', 5),
        M(2, 'image', 'Illustration for “The Tell-Tale Heart” (Harry Clarke, 1919)', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'A public-domain illustration to anchor the mood of the story.')]
    }),

    L(4, 'Setting & Symbol', 'Setting, Atmosphere & Symbol', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · A1 Listening to Understand',
      goals: ['Describe the physical, temporal and social dimensions of setting', 'Explain symbol, motif, allegory and foreshadowing', 'Interpret the key symbols in “The Lottery” using evidence'],
      warm: [
        `Name a tradition people follow without knowing why. It could be at home, at school, in sports or on a holiday.\n\nWhat would happen if someone said no?`,
        `**Warm-up.** Name a tradition (family, school, sports, holiday) that people follow without really knowing why. What would happen if someone refused to take part?\n\nToday: a sunny morning, a village gathering. What could possibly go wrong?\n\n*Content note:* the story ends with a stoning.`],
      ideasTitle: 'Setting is more than a place; symbol, motif, allegory',
      ideas: [
        `**Setting** has three parts:\n- **Physical:** the place and weather\n- **Temporal:** the time (year, season, time of day)\n- **Social:** the rules and customs of the people\n\n**Atmosphere** is the mood the setting makes.\n\nA **symbol** is a thing that also stands for an idea.\n\n**Foreshadowing** is an early hint about what will happen.`,
        `**Setting is more than a place**\n- **Physical:** place, landscape, weather, objects\n- **Temporal:** the era, the season, the time of day\n- **Social:** the customs, values, rules and power structure of a community\n- **Atmosphere:** the mood that the setting creates for the reader\n\n*Ask of every setting:* what does this place expect of the people who live in it?\n\n**Symbol, motif, allegory**\n| Term | Meaning |\n| Symbol | a concrete object, person or action that also stands for an abstract idea |\n| Motif | an image or idea that repeats and builds meaning each time |\n| Allegory | a whole story that works as an extended symbol for a larger idea |\n| Foreshadowing | early hints of what is coming, often hidden in plain sight |`,
        `**Test a symbol:** does the writer describe it carefully, return to it, or give it more attention than the plot needs? Then it probably means more.\n\n**Context, June 1948:** published in *The New Yorker* three years after the Second World War. The magazine was flooded with letters; many readers were furious, some cancelled subscriptions, and some believed the ritual was real.`,
        `Why did an invented village upset real readers so much in 1948? What would a story have to show to get that reaction today?`],
      textTitle: '“The Lottery” — Shirley Jackson (1948)', textIcon: '🗳️',
      text: [
        `**The story in brief.** It is a sunny June morning. A whole village meets in the square for the yearly lottery. Children pile up stones.\n\nEach family draws a slip of paper from an old black box. Tessie Hutchinson gets the slip with the black dot.\n\nThe village stones her. No one asks why. “We have always done it.”\n\n**Symbols:** the black box = old tradition. The stones = violence everyone shares.`,
        `About 3,400 words; free to read on The New Yorker’s website.\n\n**As you re-read the opening and ending, look for:** details that seemed ordinary the first time and are chilling now; objects Jackson describes with special care; what is said and what is never said; the exact moment the mood changes.\n\n**Reading the symbols**\n| Symbol | What it may represent |\n| The black box | shabby and splintered, yet no one will replace it: tradition itself, decaying but untouchable |\n| The stones | gathered by children in the second paragraph: foreshadowing, and violence shared so that no one is to blame |\n| The names | Summers, Graves, Delacroix (“of the cross”), Old Man Warner |\n| The slips of paper | a life decided by chance, with a single black dot |\n\n**The setting:** a village square between the post office and the bank; the morning of June 27, about ten o’clock; a small farming community where the lottery is accepted without question.`,
        `**Discussion:** Tessie only protests once her own family is chosen. What is Jackson suggesting about people?\n\n**Claim frame:** “In ‘The Lottery,’ ___ symbolizes ___ because ___.”\n\nThe villagers have forgotten the original ritual, but they “still remembered to use stones.”`,
        `Old Man Warner calls people who gave up the lottery a “pack of crazy fools.” Who plays his role when a tradition is questioned today? If the story is an allegory, what is it an allegory for?`],
      note: [
        ['Setting = place (physical), time (temporal) and the people’s rules (social).', 'A symbol is a thing that stands for an idea.', 'Foreshadowing is an early hint, like the pile of stones.'],
        ['Setting has physical, temporal and social dimensions; atmosphere is the mood it creates.', 'A symbol is a concrete thing that stands for an abstract idea; a motif repeats; an allegory is a whole symbolic story.', 'Foreshadowing hides hints in plain sight, such as the pile of stones.', '“The Lottery” uses a cheerful setting to expose how ordinary people accept cruelty in the name of tradition.']],
      life: ['What is one tradition or routine in your life that you follow “because we’ve always done it”? What does it expect of you?', 'One tradition I follow without thinking is… It expects me to…'],
      tryTitle: 'The setting audit',
      tryit: [
        `**Experiment.** Sit in one room for five minutes (kitchen, classroom, bus).\n\nWrite down:\n- 3 things you **see** (physical)\n- the **time** and season (temporal)\n- 1 **rule** everyone follows there without being told (social)\n\nWhat feeling does this place give you?`,
        `**Experiment: what does a place expect of you?**\n\n1. Choose one real setting and stay in it for five minutes.\n2. Record its physical, temporal and social dimensions (at least two details each).\n3. Name the atmosphere in one word.\n4. Find one object there that could be a **symbol**. Write a claim: “In my ___, the ___ symbolizes ___ because ___.”`,
        `Ask an older family or community member where one tradition you share came from. Record whether anyone actually knows, and what that tells you about Jackson’s black box.`],
      exit: 'Name one example of foreshadowing in “The Lottery” and what it hints at.', exit1: 'What do the children collect at the start of the story? Why does it matter?',
      terms: [
        ['setting', 'where and when a story happens', 'the physical, temporal and social world of a story'],
        ['atmosphere', 'the mood a place creates', 'the overall feeling that a setting creates for the reader'],
        ['symbol', 'a thing that stands for an idea', 'a concrete object, person or action that stands for an abstract idea'],
        ['motif', 'an image or idea that keeps coming back', 'an image or idea that repeats and builds meaning each time'],
        ['allegory', 'a whole story that stands for a bigger idea', 'a whole story that works as an extended symbol for a larger idea'],
        ['foreshadowing', 'an early hint about what will happen', 'an early hint of events that will happen later in a story']],
      q: [
        mc('The social dimension of setting refers to:', 'the customs, values and power structure of a community', ['weather and landscape', 'the time of day', 'the font of the book']),
        mc('In “The Lottery,” the shabby black box most strongly symbolizes:', 'a decaying tradition that no one will question', ['the village’s wealth', 'childhood innocence', 'a birthday present']),
        mc('An early hint of events that will happen later in a story is called:', 'foreshadowing', ['a motif', 'an allegory', 'a table of contents']),
        mc('In “The Lottery,” the stones are best read as a symbol of:', 'collective violence and shared guilt', ['the villagers’ wealth', 'the beauty of nature', 'a game of hopscotch']),
        mc('“The morning of June 27, about ten o’clock” is which dimension of setting?', 'Temporal', ['Social', 'Physical', 'Musical']),
        tfx('“The Lottery” opens on a clear, sunny summer morning, which makes the ending more shocking.', '“The Lottery” opens with a dark, stormy setting that warns the reader of danger.'),
        tf('Tessie Hutchinson protests the lottery only after her own family is chosen.', true),
        fill('A whole story that works as an extended symbol for a larger idea is an ___.', 'allegory', ['atmosphere', 'antagonist', 'apple']),
        app('A hockey team keeps a cracked, taped-up stick in the dressing room that no one is allowed to throw out, though no one remembers why. In Jackson’s terms, the stick works most like:', 'the black box: a worn-out tradition treated as untouchable', ['the slips of paper: chance', 'foreshadowing of a loss', 'the temporal setting']),
        app('A film opens with a cheerful birthday party, but the camera keeps returning to a locked cellar door. The repeated door is best called:', 'a motif that also foreshadows', ['an allegory', 'the social setting', 'verbal irony']),
        app('A new employee notices that no one ever sits in one chair at meetings, and no one explains why. Which dimension of setting has the employee discovered?', 'Social: an unwritten rule of the community', ['Physical: the furniture', 'Temporal: the meeting time', 'Atmosphere: the lighting'])
      ],
      task: T('Lesson 4 task: Symbol hunt', [
        'Choose ONE: the black box OR the stones. Write (1) what it really is in the story, and (2) what idea it might stand for.',
        'Explain what the black box, the stones and Old Man Warner might each represent. Then find one example of foreshadowing and explain what it hints at.',
        'Explain three symbols (the black box, the stones, Old Man Warner), give one example of foreshadowing with its meaning, then answer: what warning does “The Lottery” give its readers? Refer to at least one specific detail.',
        'Complete the Level 3 task. Then write a one-sentence symbol claim for an object the class did NOT discuss (the three-legged stool, the date, or a name) and defend it with one quotation.'],
        'In “The Lottery,” ___ symbolizes ___ because…',
        ['You say what the object literally is and give a sensible idea it stands for.',
         'Three symbols explained (tradition; collective violence and shared guilt; blind loyalty to the past); accurate foreshadowing (for example, the boys’ pile of stones); a clear warning supported by a detail such as “still remembered to use stones.”'], 'B1, B2'),
      media: [
        M(2, 'image', 'The New Yorker, 26 June 1948 (cover or contents page)', 'The New Yorker archive', 'https://www.newyorker.com/magazine/1948/06/26/the-lottery', 'Shows where and when the story first appeared; link rather than copy the text.'),
        M(1, 'image', 'A New England village green', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'An ordinary, pleasant square: the setting Jackson uses to disarm the reader.')]
    }),

    L(5, 'Theme & Perspective', 'Theme & Perspective', {
      exp: 'B1 Reading for Meaning (including B1 critical literacy) · B2 Understanding Form and Style · A2 Speaking to Communicate',
      goals: ['Tell a topic from a theme, and write a strong theme statement', 'Explain how an author’s perspective shapes a story', 'Ask critical literacy questions: whose voice is centred, and whose is missing?'],
      warm: [
        `Think of two groups you belong to (family, friends, team, culture, faith). Did they ever have different rules for the same thing?\n\nWhich rule did you follow?`,
        `**Warm-up.** Think of a time two groups you belong to (family, friends, team, culture, faith) had different rules for the same situation. Which did you follow?\n\nWho gets to decide which customs are “official”?`],
      ideasTitle: 'Topic vs. theme; perspective and voice',
      ideas: [
        `A **topic** is one or two words: pride, identity, tradition.\n\nA **theme** is a **full sentence** that says something about the topic.\n\n- Topic: tradition\n- Theme: People will do cruel things without asking why, if it is called tradition.\n\n**Perspective** is the lens a story is told through: who the writer is and what they have lived.\n\nAsk: **Whose voice is here? Whose is missing?**`,
        `**Topic vs. theme**\n- **Topic:** the subject, in a word or two: pride, identity, tradition\n- **Theme:** a complete statement the story makes about that topic\n- **A strong theme statement** is a full sentence, is arguable, applies beyond the story, and avoids clichés and commands\n\n*Example.* Topic: tradition. Theme: “The Lottery” suggests that communities will commit cruelty without question when it is disguised as tradition.\n\n**Perspective and voice**\n- **Perspective:** the lens of experience, identity and values through which a story is told and read\n- **Critical literacy questions:** Whose voice is centred? Whose is missing? Who benefits from the story being told this way?\n\n**Before we discuss: the story’s language.** The story uses 1893 terms for Indigenous people that are outdated and, today, offensive. We read them as historical evidence; we do not use them ourselves. Words we use: Indigenous, First Nations, Métis, Inuit, or the specific nation, such as Mohawk (Kanien’kehá:ka).`,
        `**Fix a weak statement**\n| Weak | Strong |\n| Pride. | Pride can lead people to destroy the relationships they value most. |\n| Don’t judge a book by its cover. | People often misjudge others because they rely on appearances and their own assumptions. |`,
        `Whose customs and ceremonies are treated as “official” in Canada today, and whose still have to fight for recognition? Why does it matter who gets to tell a community’s stories?`],
      textTitle: '“A Red Girl’s Reasoning” — E. Pauline Johnson (Tekahionwake) (1893)', textIcon: '💍',
      text: [
        `**The author.** E. Pauline Johnson (Tekahionwake) was born on the Six Nations Reserve in Ontario. Her father was a Mohawk chief. Her mother was English.\n\n**The story in brief.** Christie marries Charlie. At a dance, she says her parents married by Indigenous custom, with no priest.\n\nCharlie is ashamed and says she has disgraced him.\n\nChristie answers: “If their union is illegal, so is ours.” She takes off her ring and leaves. She does not come back.`,
        `**Meet the author.** E. Pauline Johnson (Tekahionwake), 1861–1913, was born on the Six Nations Reserve near Brantford, Ontario. Her father was a Mohawk chief; her mother was English. A poet and performer, she toured Canada, the United States and England, and in 1892 she attacked the way novels portrayed Indigenous women. Free in *The Moccasin Maker* on Project Gutenberg (ebook 6600).\n\n**The story in brief**\n- **The marriage:** Christie, daughter of a Hudson’s Bay trader and an Indigenous mother, marries Charlie McDonald, a young government man\n- **The dance:** at the Lieutenant-Governor’s party she explains that her parents married by Indigenous custom, with no priest or magistrate\n- **The insult:** Charlie, humiliated, tells her she has disgraced him and her parents\n- **The reasoning:** “If their union is illegal, so is ours.” She throws off her wedding ring and leaves\n- **The ending:** months later he finds her, and she refuses to return\n\n**The reversal:** the “civilized” husband acts from pride; Christie acts from principle.`,
        `**Christie’s reasoning, step by step:** if Charlie will not recognize her parents’ marriage because it followed Indigenous custom rather than church law, then by the same logic she need not recognize their church wedding, which did not follow her people’s rites. Either both kinds of marriage are valid or neither is.\n\n**Whose voice?** An Indigenous woman, writing in 1893, gives an Indigenous woman the winning argument.`,
        `Johnson refuses to give her 1890s readers a happy reunion. What would a reconciliation ending have told those readers, and why does withholding it serve her purpose?`],
      note: [
        ['A topic is one or two words. A theme is a full sentence about the topic.', 'Perspective is the lens of who is telling the story.', 'Ask: whose voice is here, and whose is missing?'],
        ['A topic is a word or two; a theme is a complete, arguable statement about that topic.', 'Strong theme statements are full sentences, apply beyond the story, and avoid clichés and commands.', 'Perspective is the lens of identity and experience behind a story.', 'Critical readers ask whose voice is centred, whose is missing, and who benefits.']],
      life: ['Think of a story people tell about your school, neighbourhood or community. Whose voice is centred, and whose is missing?', 'A story people tell about my community is… The voice that is missing is…'],
      tryTitle: 'A theme for your week',
      tryit: [
        `**Experiment.** Pick one **topic** from your own week: friendship, pressure, fairness, family or money.\n\nNow turn it into a **theme**: one full sentence that says something true about that topic.\n\nRead it to someone. Do they agree?`,
        `**Experiment: can you write a theme someone will argue with?**\n\n1. Choose one topic from your own week (pressure, loyalty, fairness, identity, money).\n2. Write a theme statement: a full sentence, arguable, universal, not a cliché, not a command.\n3. Read it to two people. Record whether each one agrees or disagrees, and why.\n4. Revise it once using what you heard.`,
        `Look at one news story about a community you belong to. Apply the three critical literacy questions and record your answers in three lines.`],
      exit: 'Write one theme statement for “A Red Girl’s Reasoning.”', exit1: 'Is “pride” a topic or a theme? How do you know?',
      terms: [
        ['topic', 'what a story is about, in one or two words', 'the subject of a story, in a word or two'],
        ['theme', 'a full sentence about what a story says about life', 'an insight about life, expressed as a complete statement'],
        ['theme statement', 'one arguable sentence that states a theme', 'a full, arguable sentence that states what a text suggests about a topic and applies beyond the story'],
        ['perspective', 'the lens a story is told through', 'the lens of experience, identity and values through which a story is told and read'],
        ['critical literacy', 'asking whose voice is in a text and whose is missing', 'reading that asks whose voice is centred, whose is missing, and who benefits'],
        ['cliché', 'a saying used so much it has lost its power', 'an overused phrase or idea that has lost its force']],
      q: [
        mc('Which of the following is a THEME statement rather than a topic?', 'Blindly following tradition can lead a community to cruelty.', ['Pride and marriage', 'Tradition', 'Page 12']),
        mc('In “A Red Girl’s Reasoning,” what does Christie explain at the Lieutenant-Governor’s dance?', 'Her parents married by Indigenous custom, without a priest or magistrate', ['She was married once before', 'She plans to leave Charlie', 'She has won the lottery']),
        mc('Which is NOT a feature of a strong theme statement?', 'It is a command, such as “Don’t lie.”', ['It is arguable', 'It applies beyond the story', 'It is a full sentence']),
        mc('“If their union is illegal, so is ours.” What is Christie’s reasoning?', 'Either both kinds of marriage are valid or neither is', ['Marriage should be illegal', 'Her parents were never together', 'She wants a bigger ring']),
        tf('E. Pauline Johnson (Tekahionwake) was a writer and performer of Mohawk and English heritage, born on the Six Nations Reserve in Ontario.', true),
        tfx('A theme is a complete statement; a topic is only a word or two.', 'A theme can be stated in a single word, such as “pride.”'),
        tfx('At the end of the story, Christie refuses to return to Charlie.', 'At the end of the story, Christie forgives Charlie and returns home with him.'),
        fill('The lens of experience, identity and values through which a story is told is called ___.', 'perspective', ['plot', 'hyperbole', 'paragraph']),
        app('A documentary about a remote community interviews only visiting officials and no one who lives there. The first critical literacy question to ask is:', 'Whose voice is missing?', ['What is the climax?', 'Is the narrator omniscient?', 'What is the rhyme scheme?']),
        app('A student writes: “The theme of the movie is friendship.” The best feedback is:', '“Friendship” is a topic; say what the film suggests ABOUT friendship in a full sentence', ['Correct: a theme is one word', 'Change it to a command: “Be a good friend”', 'Themes only exist in short stories']),
        app('Two families plan a wedding. One side insists only its own ceremony is “the real one.” Which idea from Johnson’s story applies most directly?', 'Respect between cultures must run in both directions', ['Tradition always leads to violence', 'Narrators cannot be trusted', 'Setting creates atmosphere'])
      ],
      task: T('Lesson 5 task: From topic to theme', [
        'Turn each word into a full sentence that says something about life: (1) Pride. (2) Respect. Start with “Pride can…” and “Respect means…”.',
        'Rewrite each weak statement as a strong theme statement: (1) “Pride.” (2) “Don’t judge a book by its cover.” (3) “Christie leaves Charlie.” Then explain Christie’s “reasoning” in your own words.',
        'Rewrite the three weak statements as strong theme statements, explain Christie’s reasoning, then write one theme statement for “A Red Girl’s Reasoning” with one piece of evidence that supports it.',
        'Complete the Level 3 task. Then answer: why does it matter that this story was written by an Indigenous woman in 1893? Use the three critical literacy questions in your answer.'],
        'The story suggests that…',
        ['Two full sentences that say something about life (not single words, not commands).',
         'Three statements that are full sentences, arguable and universal; Christie’s logic explained (both marriages are valid or neither is); a theme statement supported by evidence such as “you have disgraced me” / “If their union is illegal, so is ours.”'], 'B1, B2'),
      media: [
        M(2, 'image', 'E. Pauline Johnson (Tekahionwake), portrait', 'The Canadian Encyclopedia', 'https://www.thecanadianencyclopedia.ca/en/article/pauline-johnson', 'Introduces the author and her two heritages before the story.'),
        M(2, 'image', 'CanLit Guides: teaching page for “A Red Girl’s Reasoning”', 'UBC CanLit Guides', 'https://canlitguides.ca', 'Discussion questions and context for the story’s historical language.')]
    }),

    L(6, 'Writing About Lit', 'Writing About Literature', {
      exp: 'C1 Developing and Organizing Content · C2 Using Knowledge of Form and Style · C3 Applying Knowledge of Conventions · D1 Understanding Media Texts',
      goals: ['Identify how tone, hyperbole and satire create humour', 'Explain the difference between summary and analysis', 'Write a PEEL paragraph with a properly integrated quotation'],
      warm: [
        `Think of a time a simple job made you very nervous: ordering food, a phone call, a job interview.\n\nWhy is being embarrassed funny later?`,
        `**Warm-up.** Describe a time an ordinary task (ordering food, making a phone call, a job interview) made you irrationally nervous. Why is embarrassment funny, at least afterward?\n\nToday we move from “I liked it” to “Here is how it works.”`],
      ideasTitle: 'Summary vs. analysis; the PEEL paragraph; quotations',
      ideas: [
        `**Summary** tells WHAT happens.\n\n**Analysis** explains HOW the writing works and WHY it matters.\n\nA **PEEL** paragraph:\n- **P**oint: your idea\n- **E**vidence: a short quotation\n- **E**xplain: how the words work (most marks are here)\n- **L**ink: back to your point\n\nPut quotations **inside** your own sentence. Do not drop them in alone.`,
        `**From summary to analysis**\n- **Summary** tells WHAT happens in the text\n- **Analysis** explains HOW the writing works and WHY it matters\n- **The pattern:** claim, then evidence, then explanation\n- **The conventions:** present tense, third person, and the author’s last name (“Leacock uses…”)\n\n**The PEEL paragraph**\n| Letter | Job |\n| Point | an arguable topic sentence naming the text, author, technique and effect |\n| Evidence | a short, well-chosen quotation, introduced with its context |\n| Explain | how those specific words create the effect; this is where the marks are |\n| Link | tie the idea back to your point or to the story’s theme |\n\n*Rule of thumb:* your explanation should be at least twice as long as your quotation.\n\n**Integrating quotations:** **introduce** (give the speaker and the situation), **embed** (weave short phrases into your own sentence), **trim** (quote only the words you will analyze).`,
        `**Dropped vs. embedded**\n- *Dropped:* He is nervous. “When I go into a bank I get rattled.”\n- *Embedded:* The narrator admits that inside a bank he gets “rattled,” a word Leacock repeats until the whole building seems to shake.\n\n**Hear the difference.** Summary: “The narrator withdraws all his money.” Analysis: “Leacock uses hyperbole to show how institutions intimidate ordinary people.”`,
        `Take one sentence of summary you have written this unit and turn it into analysis by adding a technique and an effect. Which word in your new sentence does the most work?`],
      textTitle: '“My Financial Career” — Stephen Leacock (1910)', textIcon: '🏦',
      text: [
        `**The story in brief.** A nervous man goes to a bank to put in fifty-six dollars. Banks “rattle” him.\n\nHe asks to see the manager “alone,” like it is a big secret. The manager thinks he is a detective.\n\nHe gets so mixed up that he takes all his money out again and runs away.\n\n**Why it is funny:** a tiny job is told like a huge crisis. That is **hyperbole** (big exaggeration).`,
        `Leacock was raised in Ontario, taught at McGill, and is the namesake of Canada’s Leacock Medal for Humour. Story: Project Gutenberg (ebook 6340). Film: the National Film Board’s 1962 animated short, free at nfb.ca/film/my_financial_career (about 7 minutes).\n\n**How humour works**\n| Technique | In the story |\n| Tone | self-mocking and mock-serious: a tiny errand told like a crisis |\n| Hyperbole | deliberate exaggeration: “everything rattles me” |\n| Irony | the gap between how big the moment feels to him and how small it is ($56!) |\n| Satire | humour with a target: institutions that make ordinary people feel small |\n\n**Model PEEL paragraph**\n> [Point] In “My Financial Career,” Stephen Leacock uses repetition and hyperbole to show how institutions can intimidate ordinary people. [Evidence] From the opening lines, the narrator confesses that in a bank “everything rattles me.” [Explain] The repeated verb turns a quiet building into something almost violent, exaggerating his fear until a simple deposit feels like an ordeal. [Link] By making us laugh at this panic, Leacock invites us to ask why a bank should make anyone feel so small.`,
        `**Notice in the model:** present tense, the author’s last name, a three-word quotation, and an explanation longer than the evidence.\n\n**Discussion:** is Leacock laughing at the narrator, at the bank, or at both?`,
        `Watch the NFB film and read the story. Name one thing the animation adds that the prose cannot, and one thing Leacock’s narrating voice does that the film loses.`],
      note: [
        ['Summary tells what happens. Analysis explains how and why.', 'PEEL: Point, Evidence, Explain, Link.', 'Put quotations inside your own sentence.'],
        ['Humour is built from tone, hyperbole, irony and satire.', 'Summary tells what happens; analysis explains how and why the writing works.', 'PEEL: Point, Evidence, Explain, Link. Most marks live in Explain.', 'Introduce, embed and trim every quotation; write in present tense using the author’s last name.']],
      life: ['Where in your life does a place or institution (a bank, an office, a government form, a new job) make you feel “rattled”? What does it do to make you feel small?', 'A place that rattles me is… because…'],
      tryTitle: 'PEEL something you love',
      tryit: [
        `**Experiment.** Pick a song, show, game or ad you like.\n\nWrite 4 sentences:\n1. **Point:** “___ makes me feel ___.”\n2. **Evidence:** one line, image or moment.\n3. **Explain:** how does that moment make the feeling?\n4. **Link:** so what?`,
        `**Experiment: does PEEL work outside English class?**\n\n1. Choose a song, show, game or advertisement you know well.\n2. Write a PEEL paragraph (5–7 sentences): how does it use ONE technique to create ONE effect? Embed one short quotation or describe one exact moment.\n3. Give it to someone. Ask for one star (what works) and one step (what to improve).\n4. Label your own P, E, E and L in the margin. Is your Explain at least twice as long as your Evidence?`,
        `Find a real review online (film, game, restaurant). Highlight every sentence of summary in one colour and analysis in another. Record the ratio and whether the review persuaded you.`],
      exit: 'What does each letter of PEEL stand for, and where do most of the marks live?', exit1: 'What do the letters P-E-E-L stand for?',
      terms: [
        ['summary', 'retelling what happens', 'a retelling of what happens in a text'],
        ['analysis', 'explaining how the writing works and why it matters', 'an explanation of how the writing works (the author’s choices) and why it matters (their effect)'],
        ['PEEL', 'Point, Evidence, Explain, Link', 'a paragraph structure: Point, Evidence, Explain, Link'],
        ['hyperbole', 'a big exaggeration', 'deliberate exaggeration for effect'],
        ['satire', 'humour that criticizes someone or something', 'humour used to criticize people, institutions or society'],
        ['embedded quotation', 'a short quotation placed inside your own sentence', 'a short quotation woven grammatically into the writer’s own sentence, with its speaker and situation introduced']],
      q: [
        mc('The humour of Leacock’s “My Financial Career” depends mostly on:', 'hyperbole and a self-mocking tone', ['tragic irony', 'omniscient narration', 'rhyming couplets']),
        mc('In a PEEL paragraph, the second “E” stands for:', 'Explain', ['Evidence', 'Evaluate', 'Eraser']),
        mc('Which sentence is ANALYSIS rather than summary?', 'Leacock’s repetition of “rattled” makes the narrator’s anxiety seem to shake the whole scene.', ['The manager thinks the narrator is a detective.', 'The narrator goes to the bank to deposit fifty-six dollars.', 'The story is on page four.']),
        mc('Literary analysis is normally written in:', 'present tense, third person, using the author’s last name', ['past tense, first person, using the author’s first name', 'future tense, second person', 'capital letters']),
        mc('Humour used to criticize people, institutions or society is called:', 'satire', ['hyperbole', 'summary', 'exposition']),
        tfx('In a PEEL paragraph, quotations should be introduced and embedded in the writer’s own sentence.', 'In a PEEL paragraph, quotations should be dropped in without any introduction.'),
        tf('In a PEEL paragraph, the explanation should be longer than the quotation.', true),
        fill('Summary tells what happens; ___ explains how the writing works and why it matters.', 'analysis', ['evidence', 'hyperbole', 'spelling']),
        app('A student writes: “Poe is creepy. ‘I heard many things in hell.’ This shows he is creepy.” The most useful fix is:', 'Introduce and embed the quotation, then explain HOW those words create the effect', ['Add two more quotations', 'Switch to past tense', 'Remove the author’s name']),
        app('A comedian describes renewing a health card as “a three-day expedition requiring a sherpa.” Used to mock slow offices, this is:', 'hyperbole in the service of satire', ['dramatic irony', 'a dropped quotation', 'third-person objective narration']),
        app('In a cover letter you write: “I am hard-working. In my last job I closed the store alone four nights a week, which taught me to…” Which PEEL moves are these?', 'Point, then Evidence, moving into Explain', ['Link, then Point', 'Evidence only', 'Summary, then summary'])
      ],
      task: T('Lesson 6 task: Summary, analysis and one PEEL paragraph', [
        'Write SUMMARY or ANALYSIS beside each: (1) The narrator goes to the bank to deposit fifty-six dollars. (2) Leacock’s repetition of “rattled” makes the narrator’s anxiety shake the whole scene. Then write one sentence about why the story is funny.',
        'Label three sentences as summary or analysis. Then fix this dropped quotation by rewriting it as ONE sentence: The narrator is nervous. “When I go into a bank I get rattled.”',
        'Fix the dropped quotation. Then identify ONE humour technique Leacock uses (tone, hyperbole, irony or satire) and write a PEEL paragraph (5–7 sentences) explaining its effect, with one embedded quotation.',
        'Write a PEEL paragraph on any story from this unit: how does the author use ONE technique to create ONE effect? Then label your P, E, E and L, and write one “star” and one “step” for your own paragraph.'],
        'In “My Financial Career,” Stephen Leacock uses…',
        ['Both labels correct (1 = summary, 2 = analysis) and a sentence that names something Leacock does.',
         'One grammatical sentence that embeds part of the quotation; a paragraph with a clear Point, a short embedded quotation, an Explain longer than the Evidence, and a Link; present tense and the author’s last name.'], 'C1, C2, C3'),
      extra: [T('Unit 1 assignment: Close Reading Literary Analysis (40 marks)', [
        'Choose ONE story from this unit (not “The Story of an Hour”). Write one sentence that says what the story teaches about life. Then write ONE PEEL paragraph that shows how the author gets that idea across, using one short quotation.',
        'Choose ONE story: Roberts, Poe, Jackson, Johnson or Leacock. Write a theme statement (full sentence, arguable, universal, not a cliché). Then write TWO PEEL paragraphs, one for each of two techniques the author uses to develop that theme. Each needs one short, embedded quotation.',
        'Write a 500–600 word analysis of ONE story (Roberts, Poe, Jackson, Johnson or Leacock). Include: an introduction naming the story and author with a thesis stating the theme and your TWO techniques; two PEEL body paragraphs, each with at least one short, embedded quotation; a conclusion that returns to the theme and explains why it still matters today. Present tense, third person, author’s last name. Complete your Planning Organizer by hand in class first.',
        'Complete the Level 3 analysis. In your conclusion, also weigh one alternative reading of the story against your own and explain why yours accounts for the evidence better.'],
        'In “___,” ___ uses ___ and ___ to show that…',
        ['A full-sentence theme and at least one PEEL paragraph with a short quotation and an explanation in your own words.',
         'An arguable thesis about theme (not plot summary); every quotation introduced, embedded and trimmed; explanations that show HOW each technique works and are longer than the quotations; organized, proofread and in your own words. Marked /40: Knowledge 10 · Thinking 10 · Communication 10 · Application 10. Ideas or wording from a website, another student or an AI tool presented as your own are plagiarism.'], 'B1, B2, C1, C2, C3')],
      media: [
        M(2, 'video', 'My Financial Career (1962, dir. Gerald Potterton)', 'National Film Board of Canada', 'https://www.nfb.ca/film/my_financial_career', 'The animated adaptation; compare the narrator’s voice on screen and on the page.', 7),
        M(2, 'image', 'Stephen Leacock (portrait and biography)', 'The Canadian Encyclopedia', 'https://www.thecanadianencyclopedia.ca/en/article/stephen-leacock', 'Introduces the Ontario-raised humorist and the Leacock Medal.')]
    })
  ]));

  // =====================================================================
  // UNIT 2 · FRANKENSTEIN — “Who is responsible for what we create?”
  // Text: Project Gutenberg ebook 84 (the 1831 text; Letters 1–4, Chapters 1–24)
  // =====================================================================
  var PG84 = 'https://www.gutenberg.org/ebooks/84';
  UNITS.push(U('frankenstein', 'Unit 2 · Frankenstein', [
    'We read Mary Shelley’s novel Frankenstein and ask: who is responsible for what we create?',
    'A novel study of Mary Shelley’s Frankenstein in nine lessons: Gothic and Romantic context, the frame narrative, Victor’s hubris, the Creature’s story, doubles, the tragic hero, themes and critical lenses, and the literary essay. Unit question: “Who is responsible for what we create?”',
    'A novel study of Frankenstein (1818; the 1831 text, Project Gutenberg ebook 84): Gothic fiction and Romanticism, the epistolary frame narrative, hubris, the sublime, nature versus nurture, doubles, the tragic hero, themes and critical lenses. Ends with a 700–900 word literary essay (40 marks) and the unit test. Expectations: A1, A2, B1–B4, C1–C4, D1.'
  ], [

    L(1, 'Birth of a Monster', 'The Birth of a Monster', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · D1 Understanding Media Texts',
      goals: ['Explain how and why Mary Shelley wrote Frankenstein', 'Identify the conventions of Gothic fiction and the values of Romanticism', 'Connect the subtitle, “The Modern Prometheus,” to the myth'],
      warm: [
        `Describe Frankenstein in three details. Where did each one come from: the book, or movies and Halloween?\n\nIf you could bring one thing to life, what would it be? What would you owe it?`,
        `**Warm-up.** Describe Frankenstein in three details. Where did each detail come from: the book, or movies, cartoons and Halloween?\n\nIf you could bring one thing to life, what would it be, and what would you owe it afterward?\n\nUnit question: **“Who is responsible for what we create?”**`],
      ideasTitle: 'Mary Shelley, summer 1816, Gothic fiction and Romanticism',
      ideas: [
        `**Mary Shelley** started this novel at **18**. It came out in **1818** with no name on it.\n\n**Summer 1816, Lake Geneva:** storms kept Mary and her friends inside. Lord Byron said: let’s each write a ghost story.\n\n**Gothic fiction** is made to give dread and awe:\n- wild, lonely places\n- storms and darkness\n- tormented people\n- forbidden knowledge\n\n**Romanticism** values feeling, nature and the individual. It does not trust science without conscience.`,
        `**Mary Shelley (1797–1851).** Her mother, Mary Wollstonecraft, wrote *A Vindication of the Rights of Woman* and died days after giving birth to her; her father, William Godwin, was a political philosopher. She began the novel at 18 and published it anonymously in 1818 at 20; she revised it in 1831.\n\n**Summer 1816, Lake Geneva.** Mary, Percy Shelley, Lord Byron and Dr. John Polidori were kept indoors by the “Year Without a Summer” (cold, storms and darkness after the eruption of Mount Tambora). Byron proposed that each write a ghost story. They had been talking about **galvanism**: experiments using electricity to make dead muscle move.\n\n**Gothic fiction** (a genre built to produce dread, awe and unease)\n| Convention | Examples |\n| Settings | remote, wild or decaying: ice fields, mountains, laboratories, graveyards |\n| Atmosphere | storms, darkness, isolation, secrets |\n| Characters | obsessed or tormented figures; innocents in danger |\n| The forbidden | knowledge or acts that cross a moral boundary |\n| The sublime | nature so vast and powerful it is beautiful and terrifying at once |\n\n**Romanticism** (about 1790–1830) reacted against an age of pure reason and industry. It values emotion and imagination, nature as a source of healing and awe, the individual (the lonely genius, the outsider), and it is suspicious of progress without conscience.`,
        `**Hold this thought:** *Frankenstein* is both Gothic and Romantic: it thrills us with horror, then asks us to feel for the outcast.\n\n**Check your sources:** the TED-Ed narration gives 1815 for Byron’s challenge; the summer at Lake Geneva was 1816.`,
        `Mary Shelley published anonymously, and many readers assumed the author was a man. What might change in how a book is read when we know who wrote it?`],
      textTitle: '“The Modern Prometheus”: the myth behind the subtitle', textIcon: '🔥',
      text: [
        `**The myth.** Prometheus was a Titan. He **stole fire from the gods** and gave it to humans.\n\n**The punishment.** Zeus chained him to a rock. Every day an eagle tore at his liver.\n\n**The link.** Victor Frankenstein takes a power that is not his: making life. He suffers for it.\n\nThe subtitle is an **allusion**: a short reference to a well-known story.\n\n**Remember:** in the book, “Frankenstein” is the scientist, not the Creature.`,
        `**The myth:** the Titan Prometheus stole fire from the gods and gave it to humans; in some versions he also shaped humans from clay.\n\n**The punishment:** Zeus chained him to a rock, where an eagle tore at his liver every day.\n\n**The parallel:** Victor Frankenstein seizes a power that belongs to nature, the creation of life, and suffers for it.\n\n**An allusion** is a brief reference to a well-known story, person or text that adds meaning.\n\n**The result of the contest:** Mary’s story began as a waking nightmare of a student kneeling beside “the thing he had put together.” It became the first great science-fiction novel.\n\n**Reading plan:** Letters 1–4 for next class (about 25 minutes), free at Project Gutenberg (ebook 84). As you read: who is writing, to whom, from where, and what does he want?`,
        `**Question for the unit:** is Victor a hero who dared greatly, or a warning about daring without responsibility?\n\n**Prediction frame:** “Like Prometheus, Victor will ___, and so he will ___.”`,
        `In 1816, electricity seemed to hold the secret of life. What new science makes people both excited and afraid today, and why do horror stories so often begin with someone going too far?`],
      note: [
        ['Mary Shelley began Frankenstein at 18, in the stormy summer of 1816.', 'Gothic fiction: wild places, dark mood, forbidden knowledge.', 'Prometheus stole fire and was punished. Victor steals the power to make life.'],
        ['Mary Shelley began *Frankenstein* at 18, in the stormy summer of 1816 at Lake Geneva; it was published anonymously in 1818.', 'Gothic fiction uses wild settings, dark atmosphere, tormented characters, forbidden knowledge and the sublime.', 'Romanticism values emotion, nature and the individual, and distrusts progress without conscience.', 'The subtitle is an allusion: like Prometheus, Victor takes a power that is not his and is punished.']],
      life: ['What is one thing you have made, started or brought into the world (a project, a rumour, a post, a pet you adopted)? What did you owe it afterward?', 'Something I created or started was… Afterward I owed it…'],
      tryTitle: 'Where did you learn that?',
      tryit: [
        `**Experiment.** Ask three people: “Who is Frankenstein?”\n\nTally the answers:\n- “The monster”\n- “The scientist”\n- Something else\n\nThen ask: “Where did you learn that?”`,
        `**Experiment: book, or Halloween?**\n\n1. Ask three people to describe Frankenstein in three details each.\n2. Tally: how many say “Frankenstein” is the monster? How many mention bolts, green skin, a castle or an assistant?\n3. Ask each person where their details came from.\n4. Then run the **Gothic checklist** on one “dark” film, series or game you know: setting, atmosphere, characters, the forbidden, the sublime. Is it truly Gothic, or only scary?`,
        `Keep your tally. At the end of the unit, mark which “facts” the novel never contains, and write one sentence on how adaptations replace a book in public memory.`],
      exit: 'How does the subtitle “The Modern Prometheus” predict what will happen to Victor?', exit1: 'What did Prometheus steal, and what happened to him?',
      terms: [
        ['Gothic fiction', 'scary stories with dark, wild places and forbidden acts', 'a genre that uses wild settings, dark atmosphere and forbidden acts to create dread'],
        ['Romanticism', 'a movement that values feeling, nature and the individual', 'a movement that values emotion, nature and the individual over pure reason'],
        ['the sublime', 'nature so huge it is beautiful and scary at once', 'awe, beauty and terror felt together before something vast in nature'],
        ['allusion', 'a short reference to a famous story or person', 'a brief reference to a well-known story, person or text'],
        ['Prometheus', 'the Titan who stole fire for humans and was punished', 'the Titan who stole fire from the gods for humankind and was punished'],
        ['galvanism', 'using electricity to make dead muscle move', 'experiments using electricity to make dead muscle move']],
      q: [
        mc('Frankenstein was first published in:', '1818', ['1797', '1851', '2018']),
        mc('The novel’s subtitle is:', 'The Modern Prometheus', ['The Fallen Angel', 'The New Adam', 'The Green Giant']),
        mc('Which of these is NOT a convention of Gothic fiction?', 'Cheerful, crowded city settings', ['Forbidden knowledge or acts', 'Storms, darkness and isolation', 'Obsessed or tormented characters']),
        mc('What kept Mary Shelley and her friends indoors in the summer of 1816?', 'Cold and storms after the eruption of Mount Tambora', ['A war in Geneva', 'An outbreak of scarlet fever', 'A hockey tournament']),
        tf('Mary Shelley began Frankenstein after a ghost-story challenge in the summer of 1816.', true),
        tfx('In the novel, “Frankenstein” is the name of the creator, Victor.', 'In the novel, “Frankenstein” is the name of the Creature.'),
        tfx('Romanticism is suspicious of science and progress without conscience.', 'Romanticism values cold logic and industry above emotion and nature.'),
        fill('A brief reference to a well-known story, person or text is an ___.', 'allusion', ['atmosphere', 'antagonist', 'apple']),
        app('A headline calls a new lab-grown burger “Frankenfood.” What is the headline doing?', 'Making an allusion to the novel to suggest science has gone too far', ['Using the sublime to create awe', 'Quoting Mary Shelley directly', 'Describing a Gothic setting']),
        app('Standing at the edge of Niagara Falls, a visitor feels thrilled and frightened at the same time. The Romantics would call this:', 'the sublime', ['galvanism', 'an allusion', 'hubris']),
        app('A streaming series is set in a bright, busy high school and has one jump scare per episode. Against the Gothic checklist it is:', 'only scary: it lacks the remote setting, dark atmosphere and forbidden knowledge', ['fully Gothic, because it frightens viewers', 'Romantic, because it is about teenagers', 'an allusion to Prometheus'])
      ],
      task: T('Lesson 1 task: Context and a prediction', [
        'Finish these sentences. (1) Mary Shelley started Frankenstein in the summer of ___ at Lake ___ because… (2) Prometheus stole ___ and was punished by…',
        'Describe how Mary Shelley came to write Frankenstein (year, place, what prompted it). Name THREE conventions of Gothic fiction and TWO values of Romanticism.',
        'Describe the circumstances of the novel’s creation, name three Gothic conventions and two Romantic values, and explain who Prometheus was. Then predict: what might the subtitle “The Modern Prometheus” suggest about Victor and what will happen to him?',
        'Complete the Level 3 task. Then argue whether Prometheus is a hero or a warning, and say which reading you expect Shelley to support and why.'],
        'Like Prometheus, Victor will…',
        ['1816, Lake Geneva, bad weather and Byron’s ghost-story challenge; Prometheus stole fire and was chained to a rock.',
         'Accurate context (1816, Lake Geneva, the ghost-story challenge); three Gothic conventions; two Romantic values; the myth told correctly; a prediction that ties Victor’s overreaching and punishment to the myth.'], 'B1, B2'),
      media: [
        M(1, 'video', 'Everything you need to know to read “Frankenstein” (Iseult Gillespie)', 'TED-Ed', 'https://ed.ted.com', 'Pre-reading: who Frankenstein actually is, the Romantics and science, Shelley’s life in the story.', 5),
        M(2, 'image', 'Prometheus Bound (painting or sculpture)', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'The punishment of Prometheus, beside the subtitle.')]
    }),

    L(2, 'Stories Inside Stories', 'Stories Inside Stories (Letters 1–4)', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · B3 Reading With Fluency',
      goals: ['Explain what a frame narrative and an epistolary novel are', 'Describe Robert Walton and what he wants', 'Identify how the Letters foreshadow Victor’s story'],
      warm: [
        `Think of a story you only know because someone told you, and someone told them.\n\nHow much do you trust it?`,
        `**Warm-up.** Think of a story you only know second-hand, told to you by someone who heard it from someone else. How much do you trust it?\n\nWhat would you risk to be the first person ever to do something?`],
      ideasTitle: 'How the novel is built: letters, frames, foils',
      ideas: [
        `The novel is told in **letters**. That is called **epistolary**.\n\nIt is a **frame narrative**: a story inside a story inside a story.\n\n| Who speaks | Who listens |\n| Walton | his sister Margaret (letters) |\n| Victor | Walton |\n| The Creature | Victor |\n\nA **foil** is a character who is like another character but different enough to show us that character more clearly. **Walton is a foil for Victor.**`,
        `**How the novel is built**\n- **Epistolary form:** a story told through letters or other documents\n- **Frame narrative:** an outer story that contains one or more inner stories\n\n| Layer | Narrator | Audience |\n| Outer frame | Robert Walton | his sister, Margaret Saville, in letters |\n| Middle | Victor Frankenstein | Walton, aboard the ship |\n| Centre | the Creature (Chapters 11–16) | Victor |\n\n**Why it matters:** every word of the Creature’s story reaches us through Victor, then through Walton. Ask each time: who is speaking, and what do they want us to believe?\n\n**Foils and foreshadowing**\n- **Foil:** a character whose similarities and differences highlight another character’s traits\n- **Walton and Victor:** both are driven, isolated and hungry for glory; one is at the start of his journey, the other at the end\n- **Foreshadowing:** the giant figure on the ice and the stranger’s ruined state promise a catastrophe`,
        `**The stakes:** Walton still has a choice to make. Watch what he does in the final letters.\n\n**Link to Unit 1:** three first-person narrators means three possible *unreliable* narrators.`,
        `Why might Mary Shelley begin a novel about Victor Frankenstein with someone else entirely? What would be lost if the book opened at Chapter 1?`],
      textTitle: 'Robert Walton and Victor’s warning (Letter 4)', textIcon: '🧊',
      text: [
        `**Robert Walton** is an English explorer. He is sailing to the **North Pole**. He wants glory.\n\nHe is lonely: “I have no friend, Margaret.”\n\nIn Letter 4, his crew sees a **giant figure** on a dog-sledge far away on the ice. The next day they rescue a dying stranger: **Victor Frankenstein**.\n\nVictor warns him: “You seek for knowledge and wisdom, as I once did.” His story will be a **warning**.`,
        `**Robert Walton**\n- **Who:** a self-educated English explorer sailing for the North Pole\n- **His goal:** glory and discovery: “I shall satiate my ardent curiosity”\n- **His lack:** “I have no friend, Margaret”: he longs for an equal who understands him\n- **Letter 4:** the crew sees a gigantic figure on a dog-sledge; the next day they rescue a dying stranger\n\n**Close reading: Letter 4, entry of August 19th.** Re-read the paragraph that begins “You seek for knowledge and wisdom, as I once did…”\n- What does Victor see of himself in Walton?\n- What image does he use for the harm that knowledge did to him?\n- Why does he decide to tell his story at all?\n- What does this make us expect from the tale to come?`,
        `**Worked answer:** the line signals that Victor’s pursuit of knowledge ended in disaster. It creates suspense (we know the ending is terrible, but not how), links Victor to Walton, and tells us how to read the tale: as a lesson about ambition.\n\n**Discussion:** Walton says he would give up his fortune, his life and every hope to succeed. Admirable, or alarming?`,
        `Walton wants a friend more than anything. Why does the novel care so much about loneliness this early? Predict which other characters will suffer from the same lack.`],
      note: [
        ['Frankenstein is told in letters (epistolary).', 'It is a frame narrative: Walton → Victor → the Creature.', 'Walton is a foil for Victor: both want glory and are alone.'],
        ['*Frankenstein* is an epistolary frame narrative: Walton’s letters contain Victor’s story, which contains the Creature’s.', 'Walton is ambitious, isolated and longing for a friend.', 'Walton is a foil for Victor: the same hunger, at an earlier stage.', 'Victor tells his story as a warning: “You seek for knowledge and wisdom, as I once did.”']],
      life: ['What is one thing you believe that you only know second-hand (from a friend, a post or a video)? Who told the person who told you?', 'Something I only know second-hand is… I heard it from… who heard it from…'],
      tryTitle: 'The telephone test',
      tryit: [
        `**Experiment.** Tell person A a true 30-second story.\n\nAsk A to tell it to person B (without you).\n\nAsk B to tell it back to you.\n\nWhat changed? What was left out?`,
        `**Experiment: what does a frame do to a story?**\n\n1. Tell person A a true 30-second story with at least five details.\n2. A tells person B without you in the room. B tells it back to you.\n3. Record: which details survived, which changed, and which were added?\n4. Draw three nested boxes (you → A → B) and write one reason each teller might have shaped the story.\n\nThis is your **narrative map**. Keep a second copy for Walton, Victor and the Creature at the front of your notes.`,
        `On your Frankenstein map, add one reason each narrator might shape the story in his own favour. Which of the three do you expect to be least reliable?`],
      exit: 'How is Walton a foil for Victor? Give one similarity and one difference.', exit1: 'Name the three narrators, from the outside in.',
      terms: [
        ['frame narrative', 'a story that holds another story inside it', 'an outer story that contains one or more inner stories'],
        ['epistolary', 'told through letters', 'told through letters or other documents'],
        ['foil', 'a character who helps us see another character by contrast', 'a character whose contrasts with another highlight that character’s traits'],
        ['narrator', 'the one who tells the story', 'the voice that tells a story, whose aims shape what we are told'],
        ['ambition', 'a strong wish to succeed or be great', 'a strong desire for achievement, discovery or glory']],
      q: [
        mc('A story told through letters is called:', 'epistolary', ['allegorical', 'omniscient', 'alphabetical']),
        mc('Robert Walton writes his letters to:', 'his sister, Margaret Saville', ['Victor Frankenstein', 'the Royal Society', 'his dog']),
        mc('Walton’s expedition is trying to reach:', 'the North Pole', ['the Orkney Islands', 'Geneva', 'the Moon']),
        mc('What does Walton say he lacks?', 'A friend', ['Money', 'A ship', 'A map of Toronto']),
        mc('In the frame narrative, the Creature tells his story to:', 'Victor Frankenstein', ['Robert Walton', 'Margaret Saville', 'Elizabeth Lavenza']),
        tf('Victor tells his story to Walton aboard a ship in the Arctic.', true),
        tfx('Victor tells his story to Walton as a warning.', 'Victor tells his story to Walton to encourage him to press on to the Pole at any cost.'),
        fill('An outer story that contains one or more inner stories is a ___ narrative.', 'frame', ['flat', 'final', 'funny']),
        app('A podcast host reads a listener’s email, which quotes what the listener’s grandmother once said. To weigh the grandmother’s words, you should first ask:', 'Who is speaking at each layer, and what does each want us to believe?', ['Is the podcast Gothic?', 'What is the climax?', 'Is the grandmother a tragic hero?']),
        app('A film pairs a cautious rookie with a reckless veteran so that each makes the other’s traits obvious. The rookie is the veteran’s:', 'foil', ['frame', 'allusion', 'narrator']),
        app('A documentary opens with rescuers pulling an exhausted climber off a mountain, then goes back to tell how he got there. Like Shelley’s Letters, this opening mainly works to:', 'foreshadow a disaster and make us ask how it happened', ['reveal the ending so there is no suspense', 'prove the narrator is omniscient', 'replace the need for the main story'])
      ],
      task: T('Lesson 2 task: Map the narrative', [
        'Draw three boxes, one inside the other. Write one name in each: Walton, Victor, the Creature. Under each name write who they are talking to.',
        'Define “frame narrative” and “epistolary.” Complete the chart of the three narrators and who each tells his story to. Then say what Walton’s goal is and what he lacks.',
        'Define the two terms, chart the three narrators, and explain how Walton acts as a foil for Victor (one similarity, one difference). Then answer: Victor says, “You seek for knowledge and wisdom, as I once did.” What does this line lead you to expect, and why is it an effective way to begin?',
        'Complete the Level 3 task. Then add to your map one reason each narrator might shape the story in his own favour, and explain how the frame makes “the truth” harder to find.'],
        'Walton and Victor are alike because…',
        ['Three nested boxes: Walton → his sister Margaret; Victor → Walton; the Creature → Victor.',
         'Accurate definitions and chart; foil explained (both ambitious and isolated; Walton can still turn back, Victor is already destroyed); the line read as a warning that builds suspense and tells us how to read the tale.'], 'B1, B2'),
      media: [
        M(2, 'image', 'Arctic sea ice and a 19th-century sailing ship (engraving)', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'Walton’s setting: the outer frame of the novel.'),
        M(1, 'image', 'Frankenstein, 1831 edition frontispiece', 'Wikimedia Commons / Project Gutenberg', PG84, 'The edition used in the unit; shows the book as a physical object.')]
    }),

    L(3, 'Making of a Creator', 'The Making of a Creator (Chapters 1–5)', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · D1 Understanding Media Texts',
      goals: ['Trace the influences that turn Victor into a creator', 'Define hubris and explain how Victor shows it', 'Analyze the creation scene for imagery and irony'],
      warm: [
        `Name something people CAN now do that you think we should NOT do (or only with strict rules).\n\nWhen you are deep in a project, what do you stop noticing?`,
        `**Warm-up: could vs. should.** Name something humans CAN now do that you think we should not, or should do only with strict rules.\n\nWhen you are deeply absorbed in a project, what do you stop noticing?`],
      ideasTitle: 'Victor’s path and the idea of hubris',
      ideas: [
        `**Victor’s path:**\n- A loved child in **Geneva**. Elizabeth is adopted into the family.\n- He reads old books about mastering nature.\n- His mother dies.\n- At university in **Ingolstadt**, Professor **Waldman** inspires him.\n- He works in secret and finds the cause of life.\n\n**Hubris** = too much pride or ambition. It makes a person cross a line they should not cross.`,
        `**Victor’s path (Chapters 1–4)**\n- **A loved child:** born in Geneva to devoted parents; Elizabeth Lavenza is adopted into the family\n- **Dangerous reading:** Cornelius Agrippa, Paracelsus and Albertus Magnus: old dreams of mastering nature\n- **Loss:** his mother dies of scarlet fever just before he leaves for university\n- **Ingolstadt:** M. Krempe mocks his reading; M. Waldman inspires him\n- **Obsession:** he discovers the cause of life and works in secret, cut off from family and seasons\n\n**Hubris:** excessive pride or ambition that leads a character to overstep natural or moral limits.\n- **Victor’s dream:** “A new species would bless me as its creator and source”\n- **What is missing:** he imagines gratitude and glory; he never imagines responsibility\n- **His own verdict:** “how dangerous is the acquirement of knowledge”`,
        `**Notice:** Victor is telling this in hindsight. The older Victor keeps interrupting the younger one to warn us.\n\n| Character | Role in Victor’s life |\n| Elizabeth Lavenza | the orphan adopted by the Frankensteins; later his fiancée |\n| Henry Clerval | his closest friend from childhood |\n| M. Waldman | the chemistry professor who inspires him |\n| Caroline Frankenstein | his mother, who dies of scarlet fever |`,
        `List five moments in Chapters 1–5 where Victor could have chosen differently. Is there one point where the tragedy becomes unavoidable, or is “unavoidable” Victor’s own excuse?`],
      textTitle: 'Close reading: the creation (Chapter 5)', textIcon: '⚡',
      text: [
        `It is a rainy November night. A candle is almost out.\n\nThe Creature opens one “dull yellow eye.”\n\nVictor worked for two years for this. But now “breathless horror and disgust” fill his heart. **He runs away.**\n\nThe Creature reaches out a hand. Victor leaves it alone.\n\nThis is **situational irony**: the opposite of what he hoped. It is also Victor’s first big failure: **he abandons what he made**.`,
        `**Chapter 5, opening two paragraphs.** As you read, track: the setting (time, weather, light); the first thing that moves, “the dull yellow eye of the creature”; every word Victor uses for what he has made; and the moment his feeling flips: “breathless horror and disgust filled my heart.”\n\n**Reading the scene**\n| Feature | In the scene |\n| Situational irony | two years of longing end in instant disgust |\n| Gothic atmosphere | night, rain, a candle “nearly burnt out” |\n| The nightmare | he dreams he kisses Elizabeth and she becomes his dead mother’s corpse: creation is tied to death |\n| Abandonment | the Creature reaches out a hand; Victor flees. This is the novel’s first and greatest failure |`,
        `**Discussion:** Victor chose every feature of the Creature himself and thought them beautiful. Why does he recoil the instant it lives? What should a creator have done in that moment?\n\nWhere is the lightning bolt, the castle, the assistant? Shelley tells us almost nothing about HOW he does it.`,
        `At this point in the novel, who do you hold more responsible for what happens next: Victor or the Creature? Build your answer on one word Victor uses for what he has made.`],
      note: [
        ['Victor is shaped by a loving home, old books, his mother’s death and a teacher.', 'Hubris = pride or ambition that goes too far.', 'When the Creature wakes, Victor runs away. He abandons it.'],
        ['Victor is shaped by a loving home, outdated books, his mother’s death and an inspiring teacher.', 'Hubris is pride or ambition that oversteps natural or moral limits.', 'The creation scene is built on situational irony and Gothic atmosphere.', 'Victor’s first response to his creation is to abandon it.']],
      life: ['When were you so absorbed in something (a game, a project, a goal) that you stopped noticing people or things that mattered? What did it cost?', 'I was so absorbed in… that I stopped noticing…'],
      tryTitle: 'My turning points',
      tryit: [
        `**Experiment.** Think of something that went wrong for you (a late project, a fight, a bad mark).\n\nList **three moments** where you could have chosen differently.\n\nCircle the most important one. What should you have done?`,
        `**Experiment: where could it have gone differently?**\n\n1. Choose something of your own that ended badly (or one of Victor’s first five chapters).\n2. List five moments where a different choice was possible.\n3. Rank them from least to most important.\n4. For the top one, write what should have been done and what it would have changed.\n5. Compare with Victor: which of your moments involved working **alone and in secret**?`,
        `Find one current news story about a new technology. Record one sentence about what its makers imagine it will give them, and one about what they say they owe it or its users.`],
      exit: 'Explain the situational irony in the creation scene.', exit1: 'What does Victor do when the Creature wakes up?',
      terms: [
        ['hubris', 'too much pride or ambition', 'excessive pride or ambition that oversteps natural or moral limits'],
        ['situational irony', 'the opposite of what was expected happens', 'an outcome that is the opposite of what was expected'],
        ['abandonment', 'leaving someone who needs you', 'deserting someone or something one is responsible for'],
        ['hindsight', 'understanding something only after it has happened', 'understanding of an event only after it has happened; Victor narrates this way'],
        ['obsession', 'thinking about one thing so much that nothing else matters', 'a fixation on one purpose that crowds out family, health and judgment']],
      q: [
        mc('Victor Frankenstein grows up in:', 'Geneva', ['Ingolstadt', 'London', 'Winnipeg']),
        mc('Which professor inspires Victor at university?', 'M. Waldman', ['M. Krempe', 'Mr. Kirwin', 'Dr. Polidori']),
        mc('When the Creature first opens its eye, Victor:', 'is filled with horror and runs away', ['teaches it to speak', 'celebrates his success', 'takes a photograph']),
        mc('“A new species would bless me as its creator and source.” This line mainly reveals Victor’s:', 'desire for glory and gratitude', ['fear of the Creature', 'love for Elizabeth', 'plan to become a doctor']),
        mc('Who is Henry Clerval?', 'Victor’s closest friend from childhood', ['Victor’s chemistry professor', 'Walton’s first mate', 'The Creature’s teacher']),
        tfx('Victor works on his experiment in secret, cut off from his family.', 'Victor tells his family about the Creature soon after he makes it.'),
        tf('Victor’s mother dies of scarlet fever just before he leaves for university.', true),
        fill('Excessive pride or ambition that oversteps natural or moral limits is called ___.', 'hubris', ['humour', 'hindsight', 'homework']),
        app('A start-up founder launches an app that collects children’s data, dreaming of awards, and never asks who will look after the users. In the novel’s terms the founder shows:', 'hubris: imagining glory, never responsibility', ['the sublime', 'a frame narrative', 'catharsis']),
        app('A student trains for a year to make the team, makes it, and on the first day realizes she hates it and quits. This is closest to:', 'situational irony, like Victor’s reaction in Chapter 5', ['dramatic irony, because the coach knew', 'foreshadowing', 'an allusion to Prometheus']),
        app('A family adopts a puppy as a surprise, finds it harder than expected, and leaves it at the side of a road. The novel would judge the worst act to be:', 'the abandonment, not the adopting', ['wanting a puppy at all', 'the surprise', 'nothing: the puppy can look after itself'])
      ],
      task: T('Lesson 3 task: What made Victor?', [
        'Write two things from Victor’s early life that push him toward his experiment. Then finish: “When the Creature wakes up, Victor…”',
        'Identify THREE influences that lead Victor toward his experiment. Define “hubris.” Then explain what “A new species would bless me as its creator and source” reveals about his motives.',
        'Identify three influences, define hubris and explain the “new species” line. Explain the situational irony in the creation scene. Then answer: at this point, who do you hold more responsible for what happens next, Victor or the Creature?',
        'Complete the Level 3 task. Then choose the single turning point in Chapters 1–5 that mattered most, and explain what Victor should have done and what it would have changed.'],
        'One influence on Victor is…',
        ['Two real influences (for example old science books, his mother’s death, Professor Waldman) and “he is horrified and runs away.”',
         'Three accurate influences; hubris defined; the line read as a wish for glory and god-like status, not responsibility; irony explained (two years of work → “breathless horror and disgust”); a reasoned position on responsibility.'], 'B1, B2'),
      media: [
        M(1, 'video', 'Crash Course Literature #205: Frankenstein, Part 1', 'Crash Course (John Green)', 'https://thecrashcourse.com', 'Romanticism and the first science-fiction novel. Stop after the Thought Bubble to avoid spoilers.', 13),
        M(2, 'image', 'Frontispiece to the 1831 edition (the creation scene)', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'The only illustration Shelley’s first readers had of the scene: no bolts, no castle.')]
    }),

    L(4, 'Consequences', 'Consequences (Chapters 6–10)', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · A2 Speaking to Communicate',
      goals: ['Explain how Victor’s silence harms others', 'Describe how Shelley uses nature and the sublime', 'Analyze the Creature’s first speech as an argument'],
      warm: [
        `Have you ever stayed quiet when the truth would have helped someone, because telling it would cost you?\n\nIs doing nothing ever as bad as doing harm?`,
        `**Warm-up: speaking up.** Have you ever stayed silent when the truth would have helped someone else, because telling it would have cost you?\n\nIs failing to act ever as bad as doing harm? When?`],
      ideasTitle: 'William, Justine and the cost of silence; the sublime',
      ideas: [
        `**What happens:**\n- Victor is ill for months. He tells **no one** what he did.\n- His little brother **William** is found strangled.\n- Victor sees the Creature in a storm and knows it is the killer.\n- **Justine**, a servant, is blamed. William’s portrait is in her pocket.\n- She is executed. Victor stays silent.\n\n**The sublime:** huge nature (mountains, storms, ice) that fills us with awe and fear together.`,
        `**What happens (Chapters 6–8)**\n- **Recovery:** Clerval nurses Victor through months of illness; Victor tells no one what he has done\n- **William:** Victor’s youngest brother is found strangled near Geneva\n- **A glimpse:** in a lightning storm Victor sees the Creature and is certain it is the killer\n- **Justine Moritz:** a servant loved by the family is accused; William’s portrait is found in her pocket\n- **Injustice:** pressured by her confessor, she confesses falsely and is executed\n\n**Nature and the sublime**\n- **The sublime:** the mix of awe, beauty and terror we feel before something vast: mountains, storms, glaciers\n- **Nature as medicine:** after each disaster Victor escapes to the Alps and briefly feels calm\n- **A Romantic idea:** the natural world restores what human ambition has damaged\n- **Shelley’s twist:** it is at his most peaceful, on the sea of ice below Montanvert, that Victor meets what he made`,
        `**The cost of silence:** Victor is certain the Creature killed William, but tells no one because he fears being thought mad. The court relies on the planted evidence. His secrecy protects himself at Justine’s expense. He calls himself “the true murderer.”`,
        `Justine confesses to a crime she did not commit. What does the trial show about how this society treats a poor young woman, and whose word counts in a courtroom today?`],
      textTitle: 'Close reading: the Creature speaks (Chapter 10)', textIcon: '🏔️',
      text: [
        `On a glacier in the Alps, Victor meets the Creature. For the first time, **the Creature speaks**.\n\nHe says: “I ought to be thy Adam, but I am rather the fallen angel.”\n\nHe means: you made me, so you should have cared for me like God cared for Adam. Instead you threw me out.\n\nHe says: “I was benevolent and good; misery made me a fiend.”\n\n**Big question:** are monsters born, or made?`,
        `**The meeting on the glacier.** The “monster” turns out to be the most eloquent speaker in the book.\n\n**The Creature’s argument**\n| Move | What he does |\n| Allusion | to Genesis and Milton’s *Paradise Lost*: Adam was made and loved; Satan was cast out |\n| His claim | he was born good, and cruelty and loneliness made him violent |\n| His appeal | to duty: “Remember that I am thy creature” |\n\n> “I ought to be thy Adam, but I am rather the fallen angel.”\n\n> “I was benevolent and good; misery made me a fiend.”\n\nAs you read: what does he ask for? Is the request reasonable?\n\n**Nature vs. nurture:** is character inborn, or made by how we are treated? The next six chapters are the Creature’s evidence.`,
        `**Worked explanation of the allusion:** Adam was God’s first creation, cared for by his maker; the fallen angel (Satan) was cast out. The Creature means he should have been loved and guided by his creator, but has been rejected and driven from all joy although he did nothing wrong.`,
        `Put Victor on trial for the deaths of William and Justine. Write the single strongest point for the prosecution and for the defence, each tied to one event from Chapters 5–10, then give your verdict: guilty, not guilty, or guilty of something else?`],
      note: [
        ['Victor stays silent, so Justine is blamed and executed.', 'The sublime = awe and fear before huge nature.', 'The Creature says: I was good; misery made me bad.'],
        ['Victor’s secrecy allows William’s death to be blamed on Justine, who is executed.', 'The sublime is the awe and terror inspired by vast nature; Victor seeks healing in it.', 'The Creature’s first speech uses allusion to Adam and the fallen angel to argue that misery made him violent.', 'The novel raises the nature versus nurture question: are monsters born or made?']],
      life: ['When has staying silent (yours or someone else’s) let another person take the blame? What would speaking up have cost?', 'A time silence let someone else take the blame was…'],
      tryTitle: 'Five minutes with something vast',
      tryit: [
        `**Experiment.** Go outside. Look at something **huge** for five minutes: the night sky, a storm, a lake, a big hill.\n\nNo phone.\n\nWrite three words for how it made you feel. Did you feel smaller? Calmer? A bit scared?`,
        `**Experiment: does nature work as medicine?**\n\n1. Before you go out, rate your mood from 1 to 10.\n2. Spend five minutes, without a phone, looking at something vast: the night sky, a storm, a lake, a ravine, a snowfield.\n3. Record three sensory details and name the feeling. Was there any awe? Any unease?\n4. Rate your mood again. Did the Romantics have a point?`,
        `Write three sentences describing what you saw in the style of the sublime (scale, power, your own smallness). Underline the word that carries the terror and the word that carries the beauty.`],
      exit: 'Explain how Victor’s silence contributes to Justine’s death.', exit1: 'Who is blamed for William’s death? Was she guilty?',
      terms: [
        ['the sublime', 'awe and fear together before huge nature', 'awe, beauty and terror felt together before something vast in nature'],
        ['nature versus nurture', 'the question: are we born the way we are, or made by how we are treated?', 'the debate over whether character is inborn or shaped by treatment and experience'],
        ['fallen angel', 'Satan, the angel thrown out of heaven', 'Satan in Paradise Lost, cast out by his creator; the Creature compares himself to him'],
        ['injustice', 'when someone is treated unfairly', 'unfair treatment, as when Justine is condemned on planted evidence'],
        ['eloquent', 'able to speak well and persuade', 'fluent and persuasive in speech, as the Creature proves to be']],
      q: [
        mc('Who is executed for the murder of William?', 'Justine Moritz', ['Elizabeth Lavenza', 'Safie', 'Mary Shelley']),
        mc('Victor and the Creature first speak to each other:', 'on a glacier in the Alps', ['in Victor’s laboratory', 'at Justine’s trial', 'at a shopping mall']),
        mc('Why is Justine convicted?', 'William’s portrait is found in her pocket and she makes a false confession', ['Victor testifies against her', 'She is seen with the Creature', 'She wins a lottery']),
        mc('“I ought to be thy Adam, but I am rather the fallen angel.” The Creature means that he:', 'should have been cared for by his creator but was cast out instead', ['wants to be worshipped', 'believes he is the first human', 'fell off the glacier']),
        mc('After each disaster, where does Victor go to feel calm?', 'Into nature, in the Alps', ['To the university library', 'To a crowded city', 'To the cinema']),
        tf('Justine Moritz confesses to William’s murder even though she is innocent.', true),
        tfx('Victor believes the Creature killed William but tells no one.', 'Victor tells the court at Justine’s trial that the Creature killed William.'),
        fill('The debate over whether character is inborn or shaped by experience is called nature versus ___.', 'nurture', ['nature', 'novel', 'noodles']),
        app('An employee knows a co-worker is being blamed for a mistake the employee made, and says nothing in order to keep a clean record. In the novel’s terms this most resembles:', 'Victor’s silence at Justine’s trial', ['the Creature’s first speech', 'Walton’s ambition', 'the sublime']),
        app('A teen who was bullied for years begins bullying others. Someone says, “He was always going to turn out that way.” That speaker is arguing for:', 'nature over nurture', ['nurture over nature', 'the sublime', 'dramatic irony']),
        app('A defendant’s lawyer says: “My client did wrong, but look at how he was treated from birth.” This is the same kind of argument as:', '“I was benevolent and good; misery made me a fiend”', ['“You seek for knowledge and wisdom, as I once did”', '“I have no friend, Margaret”', '“A new species would bless me”'])
      ],
      task: T('Lesson 4 task: Silence and the Creature’s plea', [
        'Answer in one sentence each. (1) What happens to William? (2) What happens to Justine? (3) What could Victor have said to help her?',
        'Explain who Justine is, why she is convicted and what happens to her. Define “the sublime.” Then explain how Victor’s silence contributes to her death.',
        'Explain Justine’s conviction and how Victor’s silence contributes to it. Explain the allusion in “I ought to be thy Adam, but I am rather the fallen angel.” Then answer: “I was benevolent and good; misery made me a fiend.” Do you accept the Creature’s explanation? Why or why not?',
        'Complete the Level 3 task. Then write a two-paragraph verdict for “Victor on trial”: your strongest point for each side with an event from Chapters 5–10, and your ruling.'],
        'Victor’s silence matters because…',
        ['William is strangled; Justine is blamed and executed; Victor could have said that he knew who the real killer was.',
         'Justine’s conviction explained (the portrait, the forced confession); Victor’s secrecy linked to her death; the allusion explained (Adam loved, Satan cast out); a clear position on the Creature’s excuse supported by a detail.'], 'B1, B2'),
      media: [
        M(1, 'image', 'Mer de Glace (sea of ice) below Montanvert, Chamonix', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'The real glacier where creator and Creature meet: the sublime in one picture.'),
        M(2, 'image', 'Gustave Doré, illustration for Paradise Lost (the fallen angel)', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'A public-domain image of the allusion the Creature makes.')]
    }),

    L(5, 'The Creature’s Story', 'The Creature’s Story (Chapters 11–16)', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · A1 Listening to Understand',
      goals: ['Trace the Creature’s education and each rejection he suffers', 'Apply the nature versus nurture debate to his character', 'Explain how Paradise Lost shapes the way he sees himself'],
      warm: [
        `Think of a time someone decided what you were like before you said a word.\n\nHow did it change how you acted?`,
        `**Warm-up: judged on sight.** Think of a time someone made up their mind about you before you had said a word. How did it change the way you behaved?\n\nHow do people learn right from wrong if no one teaches them?`],
      ideasTitle: 'Learning to be human; three books and a journal',
      ideas: [
        `**The Creature teaches himself.**\n- He feels light, hunger and cold. He finds fire.\n- Villagers attack him. He hides beside a cottage.\n- He watches the **De Lacey** family. He secretly gathers their firewood.\n- He learns to **speak and read** by listening.\n- He sees his own face in a pool and is terrified.\n\nHe reads ***Paradise Lost***. He thinks: I am like **Adam**, made by a creator. But I am alone and hated, so I am like **Satan**.`,
        `**Learning to be human**\n- **Sensation:** light, hunger, cold; he discovers fire and burns his hand\n- **First rejection:** villagers attack him on sight; he hides in a hovel beside a cottage\n- **The De Laceys:** blind father, Felix and Agatha: he watches a loving family in poverty and secretly gathers their firewood\n- **Language:** he learns to speak and read by listening as Felix teaches Safie\n- **Self-knowledge:** he sees his reflection in a pool and is terrified\n\n**Three books and a journal**\n| Text | What it teaches him |\n| Plutarch’s *Lives* | heroes, virtue and public life |\n| *The Sorrows of Werter* | feeling, love and despair |\n| *Paradise Lost* | Milton’s epic of God, Adam and Satan, which he reads as true history |\n| Victor’s journal | found in his coat pocket: the record of his own creation |\n\n**His conclusion:** like Adam, he was made by a creator. Unlike Adam, he was made hideous and left alone. So he begins to see himself as Satan.`,
        `**Each attempt to connect**\n| What he does | How people respond |\n| Enters a village for food and shelter | they scream, attack him and drive him out |\n| Speaks to the blind De Lacey, then is seen | Agatha faints, Safie flees, Felix beats him; the family leaves |\n| Rescues a girl from drowning | her companion shoots him |`,
        `Compare the Creature’s education with Victor’s. Who is the better student, and what does each do with what he learns?`],
      textTitle: 'Close reading: “Who was I? What was I?” (Chapters 15–16)', textIcon: '📚',
      text: [
        `After reading, the Creature asks: **“Who was I? What was I?”**\n\nReading makes him sadder. Now he knows what he is missing.\n\n**The turn to violence:**\n- He saves a drowning girl. He is **shot** for it.\n- He meets little William. The boy screams and says his father is Frankenstein.\n- The Creature **kills William** and hides the portrait on Justine.\n\nThen he asks Victor for one thing: **a female companion**.`,
        `**Chapter 15.** After he reads the three books, the Creature questions himself: “Who was I? What was I?” What kind of questions are these? How does reading make his suffering worse?\n\n**The turn to violence (Chapter 16)**\n- **Rejected again:** he saves a drowning girl and is shot for it\n- **William:** he hopes a child will be unprejudiced; the boy screams and names his father, Frankenstein\n- **The murder:** he strangles William, then plants the portrait on the sleeping Justine\n- **The demand:** he ends his story by asking Victor for a female companion\n\n> “Cursed, cursed creator! Why did I live?”\n\n**Born or made?** List the Creature’s good actions in these chapters. What do they suggest about his nature? After Felix beats him, he burns the cottage. Is this the moment he becomes a monster, or does that come later?`,
        `**Where this sits:** the Creature’s story is the centre of the frame, and Shelley’s strongest evidence for nurture over nature. Remember that we hear it through Victor, then Walton.\n\n**He approaches the blind father first.** Why is that a clever plan, and why does it fail?`,
        `Some readers argue he *chooses* evil, since he understands right and wrong and still murders a child. Weigh that against the “misery made me” argument. Which does the text support better, and where?`],
      note: [
        ['The Creature learns to speak and read by watching the De Lacey family.', 'He starts out kind. People reject him again and again.', 'After Paradise Lost he sees himself as Adam left alone, and so as Satan.'],
        ['The Creature teaches himself to feel, speak and read by watching the De Lacey family.', 'He begins gentle and generous; repeated rejection turns him toward revenge.', '*Paradise Lost* gives him a way to understand himself: an Adam abandoned, and so a Satan.', 'His story is the centre of the frame, and Shelley’s strongest evidence for nurture over nature.']],
      life: ['When has a first impression of you (or yours of someone else) turned out to be wrong? What changed it?', 'A first impression that turned out wrong was…'],
      tryTitle: 'The sympathy graph',
      tryit: [
        `**Experiment.** Draw a line graph.\n\nAcross the bottom: Chapters 5, 10, 11, 13, 15, 16.\n\nUp the side: how sorry you feel for the Creature, from 0 to 10.\n\nPut a dot for each chapter. Join the dots. Where is your highest point? Your lowest?`,
        `**Experiment: track your own sympathy.**\n\n1. Draw a graph. Across the bottom: Chapters 5, 10, 11, 12, 13, 15 and 16. Up the side: your sympathy for the Creature, 0 to 10.\n2. Plot a point for each chapter and join them.\n3. Label your highest and lowest points with the event that caused them.\n4. Ask someone else who has read it (or tell them the events) to draw theirs. Where do your lines split, and why?`,
        `Now do it for a real person in the news. Plot your sympathy before and after you learn their backstory. Record what one new fact did to your line.`],
      exit: 'Is the Creature’s character the result of nature or nurture? Give one example.', exit1: 'Name one kind thing the Creature does before he turns violent.',
      terms: [
        ['Paradise Lost', 'Milton’s long poem about God, Adam and Satan', 'Milton’s epic of God, Adam and Satan, which the Creature reads as true history'],
        ['rejection', 'being pushed away or refused', 'being refused or driven away; the Creature’s repeated experience of people'],
        ['prejudice', 'judging someone before you know them', 'judging a person in advance, often by appearance'],
        ['nurture', 'how a person is raised and treated', 'the treatment and experience that shape a person’s character'],
        ['hovel', 'a small, poor shelter', 'a small, rough shelter; the Creature hides in one beside the De Laceys’ cottage']],
      q: [
        mc('The Creature learns to speak and read mainly by:', 'secretly observing the De Lacey family', ['being taught by Victor', 'attending the university', 'watching television']),
        mc('Which of these does the Creature NOT read?', 'The Odyssey', ['Paradise Lost', 'Plutarch’s Lives', 'The Sorrows of Werter']),
        mc('What happens when the Creature rescues a girl from drowning?', 'Her companion shoots him', ['He is thanked and fed', 'She becomes his friend', 'He wins a medal']),
        mc('Why does the Creature approach the blind De Lacey first?', 'A blind man cannot judge him by his appearance', ['The old man is the strongest', 'He wants to steal from him', 'He thinks he is Victor']),
        mc('Why does the Creature kill William?', 'In rage, after the boy screams and reveals he is a Frankenstein', ['Victor orders him to', 'He mistakes him for Felix', 'By accident, while playing']),
        tf('The Creature compares himself to both Adam and Satan after reading Paradise Lost.', true),
        tfx('The Creature begins gentle and helpful and turns violent only after repeated rejection.', 'The Creature is violent from the moment he is brought to life.'),
        fill('The Creature secretly gathers ___ for the De Lacey family.', 'firewood', ['gold', 'letters', 'pizza']),
        app('A new student who is ignored for months stops trying to talk to anyone and becomes hostile. A classmate who says “We did that to him” is making which argument?', 'Nurture: treatment shaped his behaviour', ['Nature: he was born hostile', 'Hubris: he is too proud', 'The sublime']),
        app('A job applicant is rejected the moment the interviewer sees them, before the interview begins. Which scene in the novel is the closest parallel?', 'The De Lacey family’s reaction when they see the Creature', ['Walton rescuing Victor', 'Victor reading Agrippa', 'Justine’s confession']),
        app('Someone reads about injustice for the first time and says, “Learning this made me angrier, not happier.” This matches the Creature’s discovery that:', 'knowledge showed him what he was missing', ['fire is warm but burns', 'Felix was poor', 'Safie spoke another language'])
      ],
      task: T('Lesson 5 task: Born or made?', [
        'Write two KIND things the Creature does and two times people hurt him. Then finish: “I think the Creature became violent because…”',
        'Explain how the Creature learns to speak and read. Name the three books he finds and what he learns from ONE. Complete the chart of his three attempts to connect with people and how they respond.',
        'Explain the Creature’s education and his three rejections. Explain why he compares himself to both Adam and Satan. Then answer: is the Creature’s character the result of nature or nurture? Use at least one specific example from his story.',
        'Complete the Level 3 task. Then draw your sympathy graph (Chapters 5–16) and write a paragraph explaining your highest and lowest points.'],
        'The Creature’s character is the result of…',
        ['Kind acts (gathering firewood, saving the girl) and harms (attacked by villagers, beaten by Felix, shot), with a reason in your own words.',
         'Accurate account of his learning and the three books; Adam/Satan comparison explained (first of his kind, but hideous, alone and rejected); a clear nature/nurture position with a specific example.'], 'B1, B2'),
      media: [
        M(1, 'image', 'Paradise Lost, title page (1667) or Doré’s Adam and Eve', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'The book that gives the Creature his idea of himself.'),
        M(2, 'image', 'A mountain cottage in the Alps (19th-century engraving)', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'The De Laceys’ world as the Creature sees it from his hovel.')]
    }),

    L(6, 'The Bargain', 'The Bargain (Chapters 17–20)', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · A2 Speaking to Communicate',
      goals: ['Evaluate the Creature’s demand and Victor’s reasons for refusing it', 'Explain how Victor and the Creature mirror each other as doubles', 'Analyze how power shifts between creator and creation'],
      warm: [
        `What do parents owe their children?\n\nIs it ever right to break a promise?`,
        `**Warm-up: what are we owed?** What do parents owe their children? What do inventors owe the world?\n\nIs it ever right to break a promise? What would it take?`],
      ideasTitle: 'The demand, the broken promise, and doubles',
      ideas: [
        `**The demand.** The Creature asks Victor to make a **female companion**. He promises to leave Europe with her forever.\n\nHe says: “I am malicious because I am miserable.”\n\n**Victor says yes.** Later, on a Scottish island, he **tears the female apart** while the Creature watches. He fears a “race of devils.”\n\nA **double** is a character who mirrors another. Victor and the Creature are doubles: both smart, both alone, both set on one goal.`,
        `**The demand (Chapter 17)**\n- **What he asks:** a female companion “of the same species,” as hideous as himself\n- **His reason:** “I am malicious because I am miserable”\n- **His promise:** to leave Europe with her and never be seen again\n- **His threat:** “if I cannot inspire love, I will cause fear”\n- **Victor’s answer:** moved, then horrified, then moved again, he finally consents\n\n**The broken promise (Chapters 18–20)**\n- Victor travels to England with Clerval, promising to marry Elizabeth on his return\n- He builds a second laboratory on a remote island in the Orkneys\n- **His fears:** she might refuse the bargain, be worse than her mate, or bear children: a “race of devils”\n- With the Creature watching at the window, he tears the unfinished female to pieces\n- He sinks the remains at sea, drifts to Ireland and is arrested for murder\n\n**Doubles.** The double (doppelgänger) is a character who mirrors another, often showing a hidden side of the self. Both are intelligent, eloquent, isolated and consumed by one purpose; each destroys the other’s chance of love and family.`,
        `**A famous confusion:** people call the Creature “Frankenstein.” The mistake contains a truth.\n\n**Notice:** Victor decides alone, again, in secret, again. What has he learned since Chapter 5?`,
        `Victor destroys the female to protect humanity. Is that courage, or a second abandonment? Note that the female never agreed to the bargain made on her behalf.`],
      textTitle: 'Close reading: the threat (Chapter 20)', textIcon: '🌙',
      text: [
        `After Victor destroys the female, the Creature comes to him. Now **the Creature gives the orders**:\n\n> “You are my creator, but I am your master; obey!”\n\nAnd he makes a threat:\n\n> “I shall be with you on your wedding-night.”\n\nVictor thinks the Creature will kill **him**. We suspect someone else is in danger. That is **dramatic irony**.`,
        `**Creator and creature change places.**\n\n> “You are my creator, but I am your master; obey!”\n\n> “Beware, for I am fearless and therefore powerful.”\n\n> “I shall be with you on your wedding-night.”\n\n**The reversal:** at first Victor had all the power: he gave the Creature life and could abandon him. Now the Creature controls Victor through fear, because he can destroy everyone Victor loves. The word “obey” shows who gives the commands.\n\n**Dramatic irony:** Victor is sure the wedding-night threat is aimed at him. The reader is not so sure. Who does Victor assume is in danger? Who do you think is?`,
        `**Discussion:** the Creature says he is now the “master.” When did the power actually shift: at this moment, at William’s death, or the night Victor ran away?`,
        `Run a four-corners vote on “Victor has a duty to make the companion” with your two best text-based reasons. Then write the best argument for the corner *opposite* yours.`],
      note: [
        ['The Creature asks for a companion. Victor agrees, then destroys her.', 'Power flips: “You are my creator, but I am your master.”', 'Victor and the Creature are doubles (mirrors of each other).'],
        ['The Creature argues that misery made him malicious and that a companion would make him harmless.', 'Victor agrees, then destroys the female, fearing a “race of devils.”', 'Power reverses: “You are my creator, but I am your master.”', 'Victor and the Creature are doubles; each becomes the other’s tormentor.']],
      life: ['Think of a promise you made or that was made to you and then broken. Was breaking it right? What did it do to the trust between you?', 'A promise that was broken was… I think breaking it was right / wrong because…'],
      tryTitle: 'What do we owe?',
      tryit: [
        `**Experiment.** Ask three people of different ages:\n\n“What do parents owe their children?”\n\nWrite one answer from each. Did they agree? Which answer would the Creature like best?`,
        `**Experiment: a three-person survey.**\n\n1. Ask three people of different ages two questions: “What do parents owe their children?” and “Is it ever right to break a promise?”\n2. Record each answer in one line.\n3. Sort the answers: which would support Victor making the companion, and which would support destroying her?\n4. Record your own position on “Victor has a duty to make the companion”: strongly agree, agree, disagree or strongly disagree, with your two best reasons from the text.`,
        `Ask the same people a third question: “What do inventors owe the world?” Compare their answers with what they said about parents. Is creating a thing different from having a child?`],
      exit: 'Explain how “You are my creator, but I am your master; obey!” shows a change in the relationship.', exit1: 'Who has the power now: Victor or the Creature? How do you know?',
      terms: [
        ['double', 'a character who mirrors another', 'a character who mirrors another and reveals a hidden side of the self (doppelgänger)'],
        ['dramatic irony', 'we understand something a character does not', 'the reader understands something that a character does not'],
        ['malicious', 'wanting to hurt others', 'intending harm; the Creature says misery has made him so'],
        ['companion', 'someone to share life with', 'a partner or mate; what the Creature demands of Victor'],
        ['consent', 'to agree to something', 'to agree; Victor consents to the demand, and the female never can']],
      q: [
        mc('The Creature asks Victor to:', 'create a female companion for him', ['make him handsome', 'end his life', 'buy him a boat']),
        mc('Victor destroys the female creature partly because he fears:', 'a “race of devils” might be born', ['Clerval will discover his work', 'he will run out of materials', 'she will be too friendly']),
        mc('“I am malicious because I am miserable.” The Creature is claiming that:', 'his suffering causes his violence', ['he enjoys being cruel', 'Victor is miserable too', 'he is only joking']),
        mc('Where does Victor build his second laboratory?', 'On a remote island in the Orkneys', ['In Geneva', 'On Walton’s ship', 'In a castle in Transylvania']),
        mc('What does the Creature promise in return for a companion?', 'To leave Europe with her and never be seen again', ['To serve Victor forever', 'To confess to William’s murder', 'To become a teacher']),
        tfx('Victor tears the female creature apart before she is finished.', 'Victor finishes the female creature and then abandons her.'),
        tf('After the female is destroyed, the Creature tells Victor, “I shall be with you on your wedding-night.”', true),
        fill('A character who mirrors another and reveals a hidden side of the self is a ___.', 'double', ['foil', 'frame', 'doctor']),
        app('A company promises a town it will clean up a spill, then cancels the plan because the clean-up “might create new risks.” Critics and defenders would argue just as readers do about:', 'Victor destroying the female creature', ['Walton’s letters', 'the Creature learning to read', 'Justine’s confession']),
        app('In a thriller, the detective and the criminal share the same obsession and the same loneliness, and each ruins the other’s life. They are best described as:', 'doubles', ['foils with nothing in common', 'unreliable narrators', 'allusions']),
        app('A horror film shows the audience the stalker entering the *sister’s* room while the hero guards his own door. This copies the novel’s use of:', 'dramatic irony around the wedding-night threat', ['situational irony in the creation scene', 'the sublime on the glacier', 'the epistolary form'])
      ],
      task: T('Lesson 6 task: Was Victor right?', [
        'Answer in one sentence each. (1) What does the Creature ask for? (2) What does Victor do to the female? (3) Was Victor right? Say yes or no and give one reason.',
        'Explain what the Creature demands and what he promises in return. Give TWO reasons Victor destroys the female. Define “double.”',
        'Explain the demand, Victor’s two reasons and the term “double.” Explain how “You are my creator, but I am your master; obey!” shows a change in their relationship. Then answer: was Victor right to destroy the female creature? Defend your position with reasons from the text.',
        'Complete the Level 3 task. Then write the strongest possible argument for the position you did NOT take, and say what evidence would change your mind.'],
        'Victor was right / wrong to destroy her because…',
        ['He asks for a female companion; Victor tears her apart; a yes or no with a reason from the story.',
         'The bargain stated accurately; two of Victor’s fears; the power reversal explained through the word “obey”; a clear position on the destruction supported by the text (the risk to humanity and her lack of consent, or the broken word and the deaths it provokes).'], 'B1, A2'),
      media: [
        M(1, 'image', 'Orkney Islands coastline', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'The remote setting of the second laboratory: Gothic isolation.'),
        M(2, 'image', 'Engraving: a figure at a moonlit window', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'The Creature watching at the window as Victor destroys the female.')]
    }),

    L(7, 'Revenge & Ruin', 'Revenge and Ruin (Chapters 21–24)', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · D1 Understanding Media Texts',
      goals: ['Trace how revenge consumes both Victor and the Creature', 'Define tragic hero and hamartia, and test Victor against them', 'Argue, with evidence, who the real monster is'],
      warm: [
        `Does getting even ever make a person feel better?\n\nFinish the sentence: “A monster is someone who…”`,
        `**Warm-up: getting even.** Does revenge ever actually satisfy the person who takes it?\n\nFinish the sentence: “A monster is someone who…” Keep your definition. You will test it at the end.`],
      ideasTitle: 'What is lost; the tragic hero',
      ideas: [
        `**What Victor loses:**\n- **Henry Clerval**, his best friend, is strangled.\n- **Elizabeth** is killed on their wedding night.\n- His **father** dies of grief.\n\nA **tragic hero** is a great person whose own flaw destroys them.\n\n**Hamartia** = the fatal flaw. Victor’s is **hubris** (too much pride) plus **secrecy**.`,
        `**What is lost (Chapters 21–23)**\n- **Henry Clerval:** found strangled in Ireland; Victor is jailed, falls ill and is finally cleared\n- **A warning missed:** Elizabeth writes offering to release him; Victor marries her, armed against an attack on himself\n- **Elizabeth:** murdered on their wedding night at Evian while Victor patrols the house\n- **Alphonse Frankenstein:** his father dies of grief within days\n- **Belief:** Victor finally tells a magistrate everything, and is not believed\n\n**The tragic hero**\n| Term | Meaning |\n| Tragic hero | a person of high ability or standing whose own flaw brings about his downfall |\n| Hamartia | the fatal flaw or error of judgment; often hubris |\n| Recognition | the moment the hero understands what he has done |\n| Catharsis | the pity and fear the audience feels, and the release that follows |`,
        `**Test Victor:** great ability? Yes. Fatal flaw? Certainly. Recognition? That is the question. Does he ever truly accept responsibility?\n\n**Dramatic irony paid off:** Victor arms himself and sends Elizabeth to her room for safety. His precautions leave her alone and unprotected.`,
        `Crash Course offers two different critical readings of the novel. Which one accounts better for Chapters 21–24, and what does it leave out?`],
      textTitle: 'The chase (Chapter 24): who is the monster?', textIcon: '🛷',
      text: [
        `At his family’s graves, Victor swears to hunt the Creature until one of them is dead.\n\n**The roles flip.** Before, the Creature followed Victor. Now Victor follows the Creature, north across the ice.\n\nThe Creature leaves him **food and messages** to keep him alive.\n\nThen Walton’s ship finds Victor. We are back where the letters began.\n\n**Who is the monster?** There is no simple answer. That is the point.`,
        `**The chase (Chapter 24)**\n- **The vow:** at his family’s graves Victor swears to pursue the Creature until one of them dies\n- **The roles reverse:** the hunted creator becomes the hunter; the Creature leaves food and taunting messages to keep him alive\n- **North:** across Russia and onto the frozen sea, where Walton’s ship finds him\n- **The frame closes:** we are back where the Letters began\n\n**Who is the monster?**\n| “Victor is the monster” | “The Creature is the monster” |\n| creates life irresponsibly | murders William, Clerval and Elizabeth, all innocent |\n| abandons his creation | frames Justine |\n| lets Justine die to protect his secret | chooses revenge knowing right from wrong |\n| breaks his promise | torments Victor on the chase |\n\nSome readers argue **society** is the monster, for judging by appearance.`,
        `**Discussion:** the Creature keeps Victor alive on the chase. Why does he need his enemy to live? By Chapter 24 each has destroyed the other’s family. Is there any real difference between them now?`,
        `Go back to your warm-up definition of a monster. Rewrite it so that it fits your verdict, then test it on one character it should NOT fit.`],
      note: [
        ['The Creature kills Clerval and Elizabeth. Victor’s father dies of grief.', 'A tragic hero falls because of their own flaw (hamartia).', 'Who is the monster? There is no simple answer.'],
        ['The Creature kills Clerval and Elizabeth; Victor’s father dies of grief.', 'A tragic hero falls through his own hamartia (fatal flaw); Victor’s is hubris joined to secrecy.', 'In the chase the roles reverse: creator and creation need and destroy each other.', 'The question “Who is the monster?” has no simple answer, which is the point.']],
      life: ['Think of a time you (or someone you know) wanted to get even. Did it satisfy? What did it cost?', 'A time someone wanted to get even was… It cost…'],
      tryTitle: 'The evidence ledger',
      tryit: [
        `**Experiment.** Draw two columns:\n\n| Victor is the monster | The Creature is the monster |\n\nWrite **two facts** from the book in each column.\n\nCircle the strongest one. Write: “The real monster is ___ because ___.”`,
        `**Experiment: argue both sides before you choose.**\n\n1. Draw two columns: “Victor is the monster” and “The Creature is the monster.”\n2. Find four pieces of evidence for each side, with chapter numbers.\n3. Circle the single strongest piece of evidence on the page.\n4. Read both columns to someone who has not read the novel. Record their verdict and the fact that decided it.\n5. Write a one-sentence verdict. **You will use this ledger for your essay.**`,
        `Add a third column: “Society is the monster.” Find three pieces of evidence. Does the third column weaken or strengthen your verdict?`],
      exit: 'Define “tragic hero” and “hamartia.” Does Victor fit?', exit1: 'What is Victor’s fatal flaw?',
      terms: [
        ['tragic hero', 'a great person destroyed by their own flaw', 'a person of high ability whose own flaw destroys him or her'],
        ['hamartia', 'a fatal flaw', 'the fatal flaw or error that causes a hero’s downfall'],
        ['catharsis', 'the release of pity and fear we feel at a tragedy', 'the release of pity and fear an audience feels at a tragedy'],
        ['recognition', 'the moment a hero understands what they have done', 'the moment a tragic hero understands what he or she has done'],
        ['revenge', 'hurting someone because they hurt you', 'harm done in return for harm; it consumes both Victor and the Creature']],
      q: [
        mc('Whose body is found on the coast of Ireland?', 'Henry Clerval’s', ['William’s', 'Alphonse Frankenstein’s', 'Lord Byron’s']),
        mc('The Creature’s threat, “I shall be with you on your wedding-night,” ends in the death of:', 'Elizabeth', ['Victor', 'Justine', 'Walton']),
        mc('Hamartia is:', 'a tragic hero’s fatal flaw', ['a story within a story', 'the feeling of awe before nature', 'a kind of sledge']),
        mc('On the chase north, the Creature:', 'leaves food and messages to keep Victor alive', ['tries to escape Victor for good', 'begs Victor for forgiveness', 'builds a snowman']),
        mc('What happens when Victor finally tells a magistrate the whole story?', 'He is not believed', ['The Creature is arrested', 'Victor is jailed for life', 'The magistrate joins the chase']),
        tf('Elizabeth is murdered on her wedding night.', true),
        tfx('In Chapter 24 the roles reverse: Victor becomes the one who pursues.', 'In Chapter 24 the Creature pursues Victor across the ice, begging to be heard.'),
        fill('The pity and fear an audience feels at a tragedy, and the release that follows, is called ___.', 'catharsis', ['hubris', 'galvanism', 'coffee']),
        app('A gifted surgeon refuses to admit an early mistake, hides it, and the cover-up ends her career. In tragic terms, the refusal to admit error is her:', 'hamartia', ['catharsis', 'frame narrative', 'foil']),
        app('Two neighbours keep damaging each other’s property in return for the last insult until both have lost everything. The novel would say that:', 'revenge consumes both sides and makes them alike', ['the one who started it is the only monster', 'revenge restores justice', 'this is the sublime']),
        app('After a sad film, viewers leave the theatre drained but strangely lighter. The term for that release is:', 'catharsis', ['recognition', 'hamartia', 'allusion'])
      ],
      task: T('Lesson 7 task: Who is the real monster?', [
        'Finish the chart: what happens to (1) Henry Clerval, (2) Elizabeth, (3) Victor’s father? Then finish: “I think the real monster is ___ because ___.”',
        'Complete the chart of what Victor loses in these chapters. Define “tragic hero” and “hamartia.” Explain how Victor and the Creature “reverse roles” in Chapter 24.',
        'Chart Victor’s losses, define the two terms and explain the role reversal. Explain the dramatic irony around “I shall be with you on your wedding-night.” Then answer: who is the real monster of the novel? State your position and support it with TWO pieces of evidence.',
        'Complete the Level 3 task. Then test Victor against all four parts of the tragic pattern (ability, hamartia, recognition, catharsis) and rule on whether he is a true tragic hero.'],
        'The real monster is…',
        ['Clerval is strangled; Elizabeth is murdered on her wedding night; his father dies of grief; a verdict with one reason.',
         'Accurate chart and definitions; the reversal explained (creator now pursues and suffers); the irony explained (Victor protects himself and leaves Elizabeth alone); a clear position with two accurate pieces of evidence.'], 'B1, B2'),
      media: [
        M(1, 'video', 'Crash Course Literature #206: Frankenstein, Part 2', 'Crash Course (John Green)', 'https://thecrashcourse.com', '“romantic” vs. “Romantic,” two critical readings, and whether science has moral limits.', 13),
        M(2, 'image', 'Dog-sledge on Arctic sea ice (19th-century engraving)', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'The chase to the end of the world; closes the frame opened in Letter 4.')]
    }),

    L(8, 'Endings & Themes', 'Endings and Themes (“Walton, in continuation”)', {
      exp: 'B1 Reading for Meaning (B1 critical literacy) · B2 Understanding Form and Style · B4 Reflecting on Skills and Strategies',
      goals: ['Explain what Walton, Victor and the Creature each do at the end, and why it matters', 'State four major themes as full theme statements', 'Read one scene through two critical lenses'],
      warm: [
        `You finished the book. Did you like the ending?\n\nWhich character changed the most?`,
        `**Warm-up: last words.** Now that you have finished: did the ending satisfy you? What did you want that you did not get?\n\nWhich character changed the most from beginning to end?`],
      ideasTitle: 'Major themes and critical lenses',
      ideas: [
        `**Four big themes** (each is a full sentence):\n- **Ambition:** chasing knowledge with no limits destroys the chaser.\n- **Responsibility:** if you create something, you must answer for it.\n- **Isolation:** people cut off from love become dangerous.\n- **Prejudice:** judging by looks creates the monsters we fear.\n\nA **critical lens** is a set of questions you bring to a book. A new lens shows new things.`,
        `**Major themes**\n| Topic | Theme statement |\n| Ambition and knowledge | the pursuit of knowledge without limits or foresight destroys the pursuer |\n| Responsibility | creators are answerable for what they bring into the world |\n| Isolation | people cut off from love and community become dangerous to themselves and others |\n| Prejudice and appearance | judging by looks creates the very monsters we fear |\n\n*Remember Unit 1:* a theme is a full, arguable sentence. “Ambition” is a topic.\n\n**Critical lenses.** A lens is a set of questions a reader brings to a text. Different lenses reveal different things.\n| Lens | Questions it asks of *Frankenstein* |\n| Feminist | where are the women? Nearly all are silent, passive or dead, and a man tries to create life without one |\n| Science and ethics | what do creators owe their creations and their society? |\n| Psychological | the Creature as Victor’s double: the part of himself he will not face |\n| Social class and justice | who is believed, who is punished, and why? Think of Justine |`,
        `**Worked example, two lenses on Justine’s trial.** *Class and justice:* a servant’s word counts for less than planted evidence. *Feminist:* a young woman is pressured by a male confessor into a false confession while the man who knows the truth stays silent.`,
        `Choose the lens that the class has used least. Write two questions it asks about the ending that no other lens would ask.`],
      textTitle: 'Three endings and the Creature’s farewell', textIcon: '❄️',
      text: [
        `**Walton:** his crew wants to go home. He **turns the ship back**.\n\n**Victor:** tells Walton to “avoid ambition.” Then he **dies**, still calling the Creature his enemy.\n\n**The Creature:** cries over Victor’s body. He is sorry. He says he will die by fire at the Pole.\n\nThe last line: he is “lost in darkness and distance.” We never see him die.\n\n**Only Walton hears the warning and acts on it.**`,
        `**Three endings**\n| Character | What he does at the end |\n| Walton | his crew, trapped in ice, demand to turn back if they are freed. He consents, and sails for England |\n| Victor | urges the crew onward, then advises Walton: “Seek happiness in tranquillity and avoid ambition.” He dies still calling the Creature his enemy |\n| The Creature | weeps over Victor’s body, condemns himself, and promises to die by fire at the Pole |\n\n**The last line:** he is “lost in darkness and distance.” We never see him die.\n\n**Close reading: the Creature’s farewell.** “The fallen angel becomes a malignant devil.” What has he accepted about himself? Does he blame Victor, himself, or both? Why does Shelley give the last word to the Creature and not to Victor?`,
        `**Who learns anything?** Victor’s last advice is to avoid ambition, yet minutes earlier he shamed the crew for wanting to turn back, and he dies asking Walton to continue his revenge. The Creature feels remorse; Victor does not seem to.\n\n**The frame matters:** Walton is the one character who hears the warning and acts on it.`,
        `Walton turns the ship around. Is he a failure, or the only wise man in the book? Walton listens to the Creature and lets him go. What would you have done?`],
      note: [
        ['Walton turns back. Victor dies. The Creature mourns and disappears.', 'Themes: ambition, responsibility, isolation, prejudice.', 'A critical lens is a set of questions that shows new meanings.'],
        ['Walton turns back; Victor dies unreconciled; the Creature mourns and vanishes “in darkness and distance.”', 'Major themes: ambition and knowledge, responsibility, isolation, prejudice and appearance.', 'A critical lens is a set of questions that brings different meanings into focus.', 'The frame matters: Walton is the one character who hears the warning and acts on it.']],
      life: ['Which of the four themes (ambition, responsibility, isolation, prejudice) is most alive in your own life right now? Write it as a full theme statement about you.', 'The theme that fits my life right now is… because…'],
      tryTitle: 'Two lenses, one scene',
      tryit: [
        `**Experiment.** Pick one ad, or one scene from a show.\n\nLook at it twice:\n1. **Who are the women** here? What do they do?\n2. **Who has the money or power?** Who is believed?\n\nDid you notice something new the second time?`,
        `**Experiment: does a lens change what you see?**\n\n1. Choose one advertisement, music video or scene from a show.\n2. View it once with the **feminist** lens: where are the women, and what do they get to do or say?\n3. View it again with the **class and justice** lens: who has power, who is believed, who pays?\n4. Record one thing each lens revealed that you had not noticed.\n5. Which lens would the makers least want you to use?`,
        `Now apply the science-and-ethics lens to a piece of technology you used today. What does its maker owe you, and what does it owe people who never chose to use it?`],
      exit: 'Write a full theme statement for ONE of: ambition, responsibility, isolation, prejudice.', exit1: 'What does Walton do at the end of the book?',
      terms: [
        ['critical lens', 'a set of questions you bring to a text', 'a set of questions a reader brings to a text to reveal particular meanings'],
        ['isolation', 'being cut off from other people', 'separation from love and community; in the novel it makes people dangerous'],
        ['responsibility', 'having to answer for what you do or make', 'the duty to answer for one’s actions and creations'],
        ['remorse', 'feeling deeply sorry for what you did', 'deep regret for a wrong one has done; the Creature shows it, Victor barely does'],
        ['feminist lens', 'asking where the women are and what power they have', 'a critical lens that asks how women are represented and what power they hold']],
      q: [
        mc('At the end of the novel, Walton:', 'agrees to turn back toward England', ['reaches the North Pole', 'kills the Creature', 'opens a school']),
        mc('At the end of the novel, the Creature:', 'disappears across the ice, vowing to die', ['is killed by Walton’s crew', 'returns to Geneva', 'becomes captain of the ship']),
        mc('Which is a full theme statement?', 'People cut off from love and community become dangerous to themselves and others.', ['Isolation', 'Ambition and knowledge', 'Chapter 24']),
        mc('Which lens asks “Who is believed, who is punished, and why?”', 'Social class and justice', ['Psychological', 'Feminist', 'Telescopic']),
        mc('Victor’s final advice to Walton is to:', 'seek happiness in tranquillity and avoid ambition', ['reach the Pole at any cost', 'trust the Creature', 'write a novel']),
        tfx('Victor dies aboard the ship; the Creature departs alive, vowing to die.', 'The novel ends with Victor killing the Creature.'),
        tf('At the end, the Creature expresses remorse over Victor’s body.', true),
        fill('A set of questions a reader brings to a text to reveal particular meanings is a critical ___.', 'lens', ['letter', 'ledger', 'lunch']),
        app('A reviewer asks of a new superhero film: “Why do all three women in it exist only to be rescued?” The reviewer is using:', 'a feminist lens', ['a psychological lens', 'hamartia', 'the epistolary form']),
        app('A climber 200 metres from the summit turns back because her team is exhausted. By the novel’s standard she most resembles:', 'Walton, who hears the warning and acts on it', ['Victor, who urges the crew onward', 'the Creature at the Pole', 'M. Krempe']),
        app('An engineer says, “Our job ends when the product ships.” Which theme statement from the novel most directly answers him?', 'Creators are answerable for what they bring into the world', ['Judging by looks creates monsters', 'Nature heals what ambition damages', 'Stories inside stories are hard to trust'])
      ],
      task: T('Lesson 8 task: Endings, themes and lenses', [
        'Write one sentence each: what does (1) Walton, (2) Victor, (3) the Creature do at the end? Then finish: “The book teaches that people who are left alone…”',
        'Describe what each of the three characters does at the end. Say what a critical lens is and name TWO lenses. Write a full theme statement for TWO of: ambition, responsibility, isolation, prejudice.',
        'Describe the three endings, define “critical lens” and write two theme statements. Then answer: Victor advises Walton to “Seek happiness in tranquillity and avoid ambition.” Has Victor truly learned this lesson? Give one piece of evidence. Finally, why does Shelley give the final speech to the Creature?',
        'Complete the Level 3 task. Then read ONE scene of your choice through TWO lenses and explain what each reveals that the other misses.'],
        'At the end of the novel…',
        ['Walton turns back; Victor dies; the Creature mourns and leaves to die; one full sentence about isolation.',
         'Three accurate endings; two lenses; two theme statements that are full, arguable sentences; evidence on Victor (for example, he shames the crew for wanting to turn back); a reason for the Creature’s last word (remorse, the reader’s final sympathy).'], 'B1, B2, B4'),
      media: [
        M(2, 'image', 'Arctic pack ice at dusk', 'Wikimedia Commons', 'https://commons.wikimedia.org', '“Lost in darkness and distance”: the final image of the novel.'),
        M(1, 'image', 'Mary Wollstonecraft, portrait (John Opie, c. 1797)', 'Wikimedia Commons / National Portrait Gallery', 'https://commons.wikimedia.org', 'Context for the feminist lens: Shelley’s mother and A Vindication of the Rights of Woman.')]
    }),

    L(9, 'Frankenstein Today', 'Frankenstein Today and the Literary Essay', {
      exp: 'C1 Developing and Organizing Content · C2 Using Knowledge of Form and Style · C3 Applying Knowledge of Conventions · D1 Understanding Media Texts',
      goals: ['Connect the novel’s questions to science and technology today', 'Write an arguable thesis and plan a five-paragraph literary essay', 'Integrate and cite quotations from the novel correctly'],
      warm: [
        `If Mary Shelley wrote today, what would Victor be building?\n\nWhen a new technology hurts people, who is responsible?`,
        `**Warm-up: the new creatures.** If Mary Shelley were writing today, what would Victor be building?\n\nWho is responsible when a new technology causes harm: the inventor, the company, the user, or the government?`],
      ideasTitle: 'The thesis statement and the five-paragraph literary essay',
      ideas: [
        `A **thesis** is **one sentence** that says what your whole essay will prove.\n\nA strong thesis is:\n- **arguable** (someone could disagree)\n- **specific** (names the book, the author and the idea)\n- a **roadmap** (lists your three points)\n\n**The essay has five paragraphs:**\n1. Introduction (ends with the thesis)\n2. Body 1 (PEEL)\n3. Body 2 (PEEL)\n4. Body 3 (PEEL)\n5. Conclusion (“so what?”)`,
        `**The thesis statement**\n- **What it is:** one sentence that states the argument your whole essay will prove\n- **Arguable:** a thoughtful reader could disagree with it\n- **Specific:** it names the text, the author and the particular idea\n- **A roadmap:** it previews your three supporting points, in order\n\n*Weak:* “Frankenstein is about a monster.”\n*Strong:* “In *Frankenstein*, Shelley shows through abandonment, secrecy and revenge that Victor, not his Creature, is the true monster.”\n\n**The five-paragraph literary essay**\n| Paragraph | Job |\n| Introduction | hook, title and author, brief context, thesis |\n| Body 1, 2, 3 | one supporting point each, in PEEL form, with at least one quotation |\n| Conclusion | restate the thesis in new words, then answer “so what?” |\n\nBuild to your strongest point, and link each paragraph to the one before it.\n\n**Quoting the novel:** introduce and embed (as in Unit 1); cite the chapter, e.g. the Creature tells Victor, “I am malicious because I am miserable” (ch. 17); name the narrator; write in present tense.`,
        `**Check every quotation:** copy from the book, not from memory or a website. One wrong word changes the meaning and costs marks.\n\n| Thesis | Verdict |\n| Frankenstein is a novel by Mary Shelley about a scientist. | Weak (a fact) |\n| Through Walton, Victor and the Creature, Shelley shows that isolation, not ambition, is the true cause of destruction in Frankenstein. | Strong |\n| In this essay I will talk about the theme of responsibility. | Weak (an announcement) |`,
        `Naming the narrator changes how far we trust a quotation. Find one line from Victor that you would quote differently once you remember he is speaking to Walton, and explain why.`],
      textTitle: 'Still alive: Frankenstein at 200, and a model paragraph', textIcon: '🤖',
      text: [
        `People still say “Frankenstein” when a new science scares them: AI, gene editing, cloning.\n\n**Key idea:** Victor’s failure was not *making* the Creature. It was **abandoning** him.\n\n**Model body paragraph (short):**\n> Victor’s first monstrous act is abandoning the being he has made. When the Creature opens its eye, Victor says “breathless horror and disgust filled my heart” (ch. 5), and he runs. The word “disgust” judges looks alone. From this first desertion, every later death follows.`,
        `**CBC Radio, *Ideas*: “It’s Alive! Frankenstein at 200.”** Listen or read for: how Mary Shelley’s own experiences shaped the novel; why the story has been retold for two centuries; one reason the guests say it is “more than just fun.” Also from CBC: *Quirks & Quarks* on Frankenstein’s lessons for artificial intelligence.\n\n**Still alive**\n- “Frankenstein” has become a word people attach to new science they fear. Is that fair to the science? Is it fair to the novel?\n- Victor’s failure was not making the Creature; it was abandoning him. What would “not abandoning” a new technology look like?\n\n**Model body paragraph**\n> [Point] Victor’s first monstrous act is abandoning the being he has made. [Evidence] When the Creature opens its eye, Victor recalls that “breathless horror and disgust filled my heart” (ch. 5), and he runs from the room. [Explain] The word “disgust” is a judgment of appearance alone, since the Creature has done nothing but breathe. Victor’s horror is at his own work, yet he punishes the Creature for it. [Link] From this first desertion, every later death follows.`,
        `**Notice:** Point, Evidence with chapter citation, Explain (the longest part), Link back to the thesis.\n\n**The four essay prompts:** Who is the true monster of the novel? · Is the Creature’s character the product of nature or of nurture? · What does the novel suggest about the responsibilities of a creator? · How does isolation drive the tragedy of the novel?`,
        `Which matters more for your generation: the novel’s warning about ambition, or its warning about prejudice? Draft a thesis that argues one over the other.`],
      note: [
        ['A thesis is one sentence that says what your essay will prove.', 'Five paragraphs: introduction, three PEEL body paragraphs, conclusion.', 'Put quotations inside your sentence and give the chapter: (ch. 5).'],
        ['*Frankenstein* endures because every new technology raises its question: who is responsible for what we create?', 'A thesis is one arguable, specific sentence with a roadmap of three points.', 'A literary essay has an introduction, three PEEL body paragraphs and a conclusion that answers “so what?”', 'Introduce, embed and cite every quotation, and check it against the book.']],
      life: ['Name one technology you use every day. Who is responsible if it harms you: the inventor, the company, you, or the government?', 'A technology I use every day is… If it harms me, the one responsible is… because…'],
      tryTitle: 'The thesis test',
      tryit: [
        `**Experiment.** Write one strong opinion about a technology you use. Example: “Phones make friendships weaker because…”\n\nRead it to someone.\n\nCan they **disagree** with it? If yes, it is arguable. Good!\n\nIf they just say “true,” make it bolder.`,
        `**Experiment: can anyone disagree with you?**\n\n1. Write a thesis about a technology in your own life: one sentence, arguable, specific, with three supporting points.\n2. Read it to two people. Record whether each can disagree, and what they say.\n3. Test it: is it arguable? Specific? Does it give a roadmap?\n4. Revise it once.\n5. Now do the same for your *Frankenstein* prompt, and find one quotation (with chapter number) for each of your three points.`,
        `Trade thesis statements with someone. Write the best counter-argument to theirs in two sentences. A thesis that survives its best counter-argument is ready for the organizer.`],
      exit: 'List three qualities of a strong thesis statement.', exit1: 'How many paragraphs are in the essay, and where does the thesis go?',
      terms: [
        ['thesis statement', 'one sentence that says what your essay will prove', 'one sentence stating the argument an essay will prove'],
        ['roadmap', 'the list of points your essay will make, in order', 'the preview of an essay’s supporting points, in order, inside the thesis'],
        ['citation', 'a note that says where a quotation comes from', 'a reference showing where a quotation comes from, such as (ch. 17)'],
        ['conclusion', 'the last paragraph, which answers “so what?”', 'the final paragraph, which restates the thesis in new words and explains why it matters'],
        ['transition', 'words that link one paragraph to the next', 'a word or sentence that links one paragraph or idea to the next'],
        ['hook', 'an opening that grabs the reader', 'an opening sentence designed to draw the reader into an essay']],
      q: [
        mc('A strong thesis statement is:', 'an arguable claim with a roadmap', ['a summary of the plot', 'a fact no one could dispute', 'a question mark']),
        mc('Which thesis is STRONG?', 'Through Walton, Victor and the Creature, Shelley shows that isolation, not ambition, is the true cause of destruction in Frankenstein.', ['In this essay I will talk about the theme of responsibility.', 'Frankenstein is a novel by Mary Shelley about a scientist.', 'Frankenstein is a book.']),
        mc('In a five-paragraph literary essay, the conclusion should:', 'restate the thesis in new words and answer “so what?”', ['introduce a brand-new argument', 'repeat the introduction word for word', 'list the page numbers']),
        mc('Which is the correct way to quote and cite the novel?', 'The Creature tells Victor, “I am malicious because I am miserable” (ch. 17).', ['“I am malicious because I am miserable.” This is in Chapter 17.', 'I am malicious because I am miserable, said the monster.', 'Chapter 17!']),
        mc('According to this lesson, Victor’s real failure was:', 'abandoning the Creature, not making him', ['using electricity', 'studying at Ingolstadt', 'sailing north']),
        tf('Each body paragraph of the literary essay should be in PEEL form with at least one quotation.', true),
        tfx('Quotations should be copied from the book and checked word for word.', 'Quotations may be written from memory, since small wording changes do not matter.'),
        fill('One sentence that states the argument your whole essay will prove is the ___.', 'thesis', ['hook', 'title', 'footnote']),
        app('A company releases an AI chatbot, sees it give harmful advice, and shuts down its support team. In the novel’s terms, the company’s key failure is:', 'abandoning what it made', ['creating something new', 'being Gothic', 'writing a weak thesis']),
        app('A student’s thesis reads: “Social media has good and bad effects.” The best revision advice is:', 'Take a position a reader could disagree with and preview your three points', ['Add more adjectives', 'Turn it into a question', 'Make it a fact from a website']),
        app('A science journalist quotes a researcher from memory and gets one word wrong, reversing the meaning. Which rule from this lesson was broken?', 'Check every quotation against the source', ['Build to your strongest point', 'Use present tense', 'Name the narrator'])
      ],
      task: T('Lesson 9 task: Thesis workshop', [
        'Write WEAK or STRONG beside each: (1) Frankenstein is a novel by Mary Shelley about a scientist. (2) Shelley shows that isolation, not ambition, causes the destruction in Frankenstein. Then write one sentence saying who you think the real monster is, and why.',
        'List THREE qualities of a strong thesis. Label three thesis statements weak or strong. Then rewrite as ONE sentence with the quotation embedded and cited: The Creature explains why he is violent. “I am malicious because I am miserable.” This is in Chapter 17.',
        'Complete the Level 2 task. Then choose ONE of the four essay prompts and write your own thesis with three supporting points, and name one modern technology that raises the same question as Frankenstein, explaining the connection.',
        'Complete the Level 3 task. Then find one quotation (with chapter and narrator) for each of your three points and write one full PEEL body paragraph for your strongest point.'],
        'In Frankenstein, Shelley shows through ___, ___ and ___ that…',
        ['1 = weak, 2 = strong; one sentence that takes a side and gives a reason.',
         'Three qualities (one sentence, arguable, specific, roadmap); correct labels; a single grammatical sentence that introduces the speaker, embeds the quotation and cites (ch. 17); a thesis that is arguable, specific and previews three points; a modern example tied to responsibility.'], 'C1, C2, C3'),
      extra: [T('Unit 2 assignment: Frankenstein Literary Essay (40 marks)', [
        'Choose ONE question: Who is the true monster? OR Was the Creature born bad or made bad? Write one sentence that answers it (your thesis). Then write TWO PEEL paragraphs that prove it, each with one short quotation and its chapter.',
        'Choose ONE prompt: (1) Who is the true monster of the novel? (2) Is the Creature’s character the product of nature or of nurture? (3) What does the novel suggest about the responsibilities of a creator? (4) How does isolation drive the tragedy? Write an introduction ending in a thesis with three points, and THREE PEEL body paragraphs, each with one embedded quotation cited by chapter.',
        'Write a 700–900 word five-paragraph literary essay on ONE of the four prompts. Include: an introduction with a hook, title and author, brief context and an arguable thesis that previews three points; THREE PEEL body paragraphs, each with at least one embedded quotation cited by chapter or letter, e.g. (ch. 10); a conclusion that restates the thesis in new words and answers “so what?”; quotations from at least TWO of the three narrators. Present tense, third person, author’s last name. Complete your Essay Organizer by hand in class first.',
        'Complete the Level 3 essay. In one body paragraph, use a critical lens from Lesson 8 by name, and in your conclusion connect your argument to one present-day creation.'],
        'In Frankenstein, Mary Shelley shows that…',
        ['A thesis that takes a side, and PEEL paragraphs with a short quotation, its chapter and an explanation in your own words.',
         'A thesis a thoughtful reader could disagree with; each body paragraph proves one point and links back to the thesis; every quotation exact, introduced, embedded and cited; explanations show HOW the quotation proves the point (no plot retelling); two narrators quoted. Marked /40: Knowledge 10 · Thinking 10 · Communication 10 · Application 10. Work must be your own.'], 'B1, C1, C2, C3')],
      media: [
        M(2, 'video', 'It’s Alive! Frankenstein at 200 (article and radio documentary)', 'CBC Radio · Ideas', 'https://www.cbc.ca/1.4618628', 'Use a 10-minute excerpt or the article: why the story has been retold for two centuries.', 10),
        M(2, 'video', 'What Frankenstein teaches us about artificial intelligence', 'CBC Radio · Quirks & Quarks', 'https://www.cbc.ca/radio/quirks', 'Connects the novel’s question of responsibility to AI.')]
    })
  ]));

  // =====================================================================
  // UNIT 3 · POETRY — “Say it so it stays.”
  // Poems printed in full or in part are in the public domain (Dickinson, Johnson, Shelley, McCrae, Owen).
  // Rita Joe and Shane Koyczan are in copyright: linked, never reproduced.
  // =====================================================================
  UNITS.push(U('poetry', 'Unit 3 · Poetry', [
    'Five lessons on poems: how they sound, what they mean, and how to say one out loud.',
    'Five lessons on reading and performing poetry: the three-read routine, imagery and sound, form and the sonnet, comparing two war poems, and spoken word. Unit motto: “Say it so it stays.”',
    'Dickinson, Johnson, Shelley, McCrae, Owen, Rita Joe and Shane Koyczan: speaker and diction, imagery and figures of speech, sound devices, form, meter and the sonnet, tone and context, comparison, free verse, spoken word and TP-CASTT. Ends with Poem in Performance (recitation + commentary, 40 marks) and the unit test. Expectations: A1–A3, B1–B4, C1–C3, D1.'
  ], [

    L(1, 'What Poetry Does', 'What Poetry Does', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · B3 Reading With Fluency · D1 Understanding Media Texts',
      goals: ['Explain what sets poetry apart from prose', 'Use a three-read routine to make sense of a poem', 'Identify speaker, diction and extended metaphor in a Dickinson poem'],
      warm: [
        `In your head, say a song lyric, prayer, rhyme or movie line you know by heart.\n\nWhy did THAT one stick?`,
        `**Warm-up: words you know by heart.** Recite, in your head, a lyric, a prayer, a rhyme or a line from a film that you know by heart. Why did THAT one stick?\n\nIs a song lyric a poem? What would it need to be one?\n\nUnit motto: **“Say it so it stays.”** A poem is language built to be remembered.`],
      ideasTitle: 'What makes it poetry? How to read a poem: three reads',
      ideas: [
        `**Poetry** packs a lot of meaning into few words.\n\nThe **speaker** is the voice of the poem. The speaker is not always the poet.\n\n**Read every poem three times:**\n1. **For sound.** Read it aloud. Just listen.\n2. **For sense.** Say each sentence in plain words.\n3. **For craft.** What choices did the poet make?\n\nYou are allowed not to understand a poem the first time.`,
        `**What makes it poetry?**\n- **Compression:** the most meaning in the fewest words\n- **The line:** the poet, not the page margin, decides where each line ends\n- **Sound:** rhythm, rhyme and repetition are part of the meaning\n- **Figurative language:** saying one thing in terms of another\n- **A speaker:** the voice of the poem, who is not necessarily the poet\n\n**How to read a poem: three reads**\n| Read | What you are reading for |\n| 1. Sound | aloud, straight through. Do not stop to understand. What do you hear and feel? |\n| 2. Sense | sentence by sentence, not line by line. Paraphrase each sentence in plain words |\n| 3. Craft | what choices did the poet make, and what does each one do? |\n\n**Permission:** you are allowed not to understand a poem the first time. That is what the second and third reads are for.`,
        `**Terms for today’s poem:** *diction* (word choice); *extended metaphor* (one comparison carried through a whole poem); *slant rhyme* (near-rhyme, such as “soul” and “all”).`,
        `Is a song lyric a poem? Take one lyric you know by heart and test it against the five features. Which feature does the music supply that the words alone do not?`],
      textTitle: '“‘Hope’ is the thing with feathers” — Emily Dickinson (about 1861)', textIcon: '🐦',
      textHtml: poem('“Hope” is the thing with feathers', [
        ['“Hope” is the thing with feathers -', 'That perches in the soul -', 'And sings the tune without the words -', 'And never stops - at all -'],
        ['And sweetest - in the Gale - is heard -', 'And sore must be the storm -', 'That could abash the little Bird', 'That kept so many warm -'],
        ['I’ve heard it in the chillest land -', 'And on the strangest Sea -', 'Yet - never - in Extremity,', 'It asked a crumb - of me.']], 'Emily Dickinson, written about 1861; published 1891 (public domain).'),
      text: [
        `Read the poem below three times.\n\n**What it says:** Hope is like a **bird**. It lives in the soul. It sings and never stops.\n\nYou hear it best in a storm. It has kept many people warm.\n\nThe speaker has heard it in the coldest, strangest places. And hope **never asked for anything back**, not even a crumb.\n\nThe bird idea runs through the whole poem. That is an **extended metaphor**.`,
        `Read the poem below. **Read 1:** just listen. **Read 2:** what is the “thing with feathers”? Where does it live? **Read 3:** the dashes, the capitals, the one word in quotation marks.\n\n**Speaker, diction, extended metaphor**\n- **Speaker:** an “I” who has known “the chillest land” and “the strangest Sea”: someone who has suffered\n- **Diction:** “perches” is light and temporary-sounding, yet this bird “never stops”\n- **Extended metaphor:** hope is a bird in all three stanzas\n- **Slant rhyme:** “soul” and “all”\n\n**Why the dashes?** They make us pause, breathe and hesitate. Read the last line aloud with and without them.`,
        `**Worked answer:** “It asked a crumb - of me.” A bird might be expected to need feeding, but hope has comforted the speaker in the hardest times without ever demanding anything in return. Hope costs nothing and is freely given.\n\n**Discussion:** Dickinson never uses the word “bird” until line 7. Why describe it first as a “thing with feathers”?`,
        `The bird sings “the tune without the words.” What is hope like when it has no words? Explain how that line describes what a poem itself does.`],
      note: [
        ['Poetry packs big meaning into few words.', 'Read three times: for sound, for sense, for craft.', 'An extended metaphor is one comparison that runs through a whole poem (hope = a bird).'],
        ['Poetry compresses meaning and uses the line, sound and figurative language to carry it.', 'Read three times: for sound, for sense, for craft.', 'The speaker is the voice of the poem; diction is word choice.', 'An extended metaphor carries one comparison through a whole poem, as Dickinson does with hope and the bird.']],
      life: ['What words do you know by heart (a lyric, a prayer, a saying from home)? Why did those words stay with you?', 'Words I know by heart are… They stayed because…'],
      tryTitle: 'Ten minutes to keep it for life',
      tryit: [
        `**Experiment.** Learn the **first stanza** of “Hope” by heart (4 lines).\n\n1. Read it aloud 5 times.\n2. Cover it. Say it.\n3. Say it to someone at home.\n\nTomorrow: can you still say it? What helped you remember?`,
        `**Experiment: what makes words stick?**\n\n1. Time yourself: memorize “Hope” (12 lines). Most people need about ten minutes.\n2. Note what you used to remember it: the rhyme, the rhythm, the dashes, the picture of the bird?\n3. Recite it to someone. Then test yourself again tomorrow.\n4. Meanwhile, rewrite each stanza as one plain sentence. Put your three sentences beside the poem. **What did your version lose?**\n5. Choose the ONE word in the poem you could not replace.`,
        `Test the unit motto: tomorrow, try to recall your three plain sentences and the poem. Record which survived the night better, and explain why in terms of sound.`],
      exit: 'What is the extended metaphor in Dickinson’s poem, and where do you see it in each stanza?', exit1: 'In the poem, what is hope compared to?',
      terms: [
        ['speaker', 'the voice of a poem', 'the voice of a poem, not necessarily the poet'],
        ['diction', 'word choice', 'a writer’s choice of words'],
        ['extended metaphor', 'one comparison that runs through a whole poem', 'one comparison carried through a whole poem'],
        ['slant rhyme', 'words that almost rhyme', 'near-rhyme, in which the sounds are close but not identical'],
        ['paraphrase', 'to say it again in plain words', 'to restate a passage in plain words, sentence by sentence'],
        ['compression', 'saying a lot in very few words', 'packing the most meaning into the fewest words']],
      q: [
        mc('The “speaker” of a poem is:', 'the voice that speaks the poem', ['always the poet', 'the person who reads it aloud', 'the loudspeaker in the room']),
        mc('In Dickinson’s poem, hope is compared to:', 'a bird', ['a storm', 'a sea', 'a sandwich']),
        mc('Which feature is most typical of Emily Dickinson’s style?', 'the frequent use of dashes', ['strict iambic pentameter', 'very long lines', 'emojis']),
        mc('The SECOND read of a poem is for:', 'sense: paraphrasing sentence by sentence', ['sound: reading aloud without stopping', 'craft: noticing the poet’s choices', 'speed: finishing quickly']),
        mc('“Soul” and “all” in the first stanza are an example of:', 'slant rhyme', ['onomatopoeia', 'a volta', 'a couplet']),
        tf('In Dickinson’s poem, hope “never stops” singing.', true),
        tfx('The speaker is the voice of the poem and may be different from the poet.', 'The speaker of a poem is always the poet.'),
        fill('According to the speaker, hope has never asked for even a ___.', 'crumb', ['song', 'storm', 'coin']),
        app('A coach says before every game, “We are a pack of wolves: we hunt together, we howl together, no wolf eats alone.” The coach is using:', 'an extended metaphor', ['slant rhyme', 'a paraphrase', 'third-person objective narration']),
        app('A friend says a poem “makes no sense” after reading it once, silently, in ten seconds. The most useful advice from this lesson is:', 'Read it aloud for sound first, then paraphrase sentence by sentence', ['Look up the answer online', 'Skip to the last line', 'Poems are not meant to be understood']),
        app('A singer performs a song written in the voice of a soldier in 1917. Listeners should treat the “I” of the song as:', 'a speaker created by the writer, not the singer’s own life story', ['proof the singer fought in 1917', 'an unreliable narrator in every case', 'a typing mistake'])
      ],
      task: T('Lesson 1 task: Three reads of “Hope”', [
        'Write each stanza of “Hope” as ONE plain sentence (three sentences in all). Then finish: “Hope is like a bird because…”',
        'Name THREE things that set poetry apart from prose. Describe the purpose of each of the three reads. Then define “extended metaphor” and explain the one in Dickinson’s poem.',
        'Complete the Level 2 task. Then explain what the speaker means by saying hope has never “asked a crumb - of me,” and choose one word or one punctuation mark in the poem and explain its effect on you as a reader.',
        'Complete the Level 3 task. Then put your three-sentence paraphrase beside the poem and explain, in a short paragraph, exactly what the paraphrase lost and which single word you could not replace.'],
        'Hope is like a bird because…',
        ['Three plain sentences that match the stanzas, and one reason hope is like a bird (it sings, never stops, asks for nothing).',
         'Three features (compression, the line, sound, figurative language, a speaker); the three reads (sound, sense, craft); the bird metaphor traced through all three stanzas; “crumb” explained (hope gives freely); a specific word or mark with a clear effect.'], 'B1, B2, B3'),
      media: [
        M(2, 'video', 'Before I Got My Eye Put Out: The Poetry of Emily Dickinson (Crash Course Literature #8)', 'Crash Course (John Green)', 'https://thecrashcourse.com', 'Dickinson’s punctuation, “I” and “eye,” and one fact about her life.', 10),
        M(2, 'image', 'Emily Dickinson daguerreotype (c. 1847)', 'Amherst College Archives / Wikimedia Commons', 'https://commons.wikimedia.org', 'The only authenticated photograph of the poet.')]
    }),

    L(2, 'Painting with Words', 'Painting with Words', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · A1 Listening to Understand',
      goals: ['Identify imagery and the main figures of speech', 'Explain how sound devices create rhythm and mood', 'Analyze how Johnson makes a poem move like a canoe'],
      warm: [
        `Think of a place you love.\n\nDescribe it using only what you can **hear** there.`,
        `**Warm-up.** Read your four lines (a lyric or poem you admire) to a partner. Which single image or sound in them do you like best?\n\nDescribe a place you love using only what you can hear there.`],
      ideasTitle: 'Imagery, figures of speech and sound devices',
      ideas: [
        `**Imagery** = words for the five senses (and movement).\n\n**Figures of speech:**\n- **Simile:** uses “like” or “as”\n- **Metaphor:** says one thing IS another\n- **Personification:** makes a thing act human\n- **Apostrophe:** talking to something that cannot answer (“O wind!”)\n\n**Sound devices:**\n- **Alliteration:** same first sounds (“tinkling tunes”)\n- **Onomatopoeia:** a word that sounds like its meaning (“splash”)\n- **Repetition:** “Dip, dip”`,
        `**Imagery:** language that appeals to the senses. It lets the reader experience, not just understand: visual (sight), auditory (sound), tactile (touch, temperature, texture), olfactory and gustatory (smell and taste), kinesthetic (movement and physical effort).\n\n*Show, don’t tell:* “The river was rough” tells. “They seethe, and boil, and bound, and splash” shows.\n\n**Figures of speech**\n| Figure | Meaning |\n| Simile | a comparison using “like” or “as” |\n| Metaphor | a direct comparison: one thing IS another |\n| Personification | giving human qualities to something non-human |\n| Apostrophe | speaking directly to something absent or non-human, as if it could answer |\n| Hyperbole | deliberate exaggeration (you met it in Unit 1) |\n\n**Sound devices**\n| Device | Example from the poem |\n| Alliteration | repeated first consonant sounds: “tinkling tunes” |\n| Onomatopoeia | words that sound like what they name: “splash” |\n| Repetition | “Blow, blow!” “Dip, dip” |\n| Rhyme | end rhyme links lines; here, mostly couplets |\n| Rhythm | the pattern of beats. Johnson’s short, doubled lines land like paddle strokes |`,
        `**Identify the device**\n| Quotation | Device |\n| “West wind, blow from your prairie nest” | apostrophe (also personification) |\n| “August is laughing across the sky” | personification |\n| “Its emerald wings” (the fir tree) | metaphor: no “like” or “as” |`,
        `Choose one line you admire from any song. Name every device in it, then rewrite it with the devices removed. What exactly did the devices buy?`],
      textTitle: '“The Song My Paddle Sings” — E. Pauline Johnson (Tekahionwake)', textIcon: '🛶',
      textHtml: poem('The Song My Paddle Sings (opening and ending)', [
        ['West wind, blow from your prairie nest,', 'Blow from the mountains, blow from the west', 'The sail is idle, the sailor too;', 'O! wind of the west, we wait for you.', 'Blow, blow!', 'I have wooed you so,', 'But never a favour you bestow.', 'You rock your cradle the hills between,', 'But scorn to notice my white lateen.'],
        ['. . .'],
        ['We’ve raced the rapid, we’re far ahead!', 'The river slips through its silent bed.', 'Sway, sway,', 'As the bubbles spray', 'And fall in tinkling tunes away.'],
        ['And up on the hills against the sky,', 'A fir tree rocking its lullaby,', 'Swings, swings,', 'Its emerald wings,', 'Swelling the song that my paddle sings.']], 'E. Pauline Johnson (Tekahionwake). Lines 1–9 and 43–53 of 53 (public domain). Full text: Representative Poetry Online, University of Toronto.'),
      text: [
        `You met E. Pauline Johnson in Unit 1. Read the lines below **aloud**.\n\n**What happens:** The speaker asks the **west wind** to fill her sail. The wind ignores her. So she picks up her **paddle**.\n\nThe river gets fast: “Dip, dip,” “Swirl, swirl!” “Dash, dash.” Then it goes calm: “Sway, sway.”\n\n**The short lines sound like paddle strokes.** The poem moves like a canoe.`,
        `Students met Johnson in Unit 1. The poem is 53 lines; the opening and ending are below, and the full text is at Representative Poetry Online (rpo.library.utoronto.ca). A *lateen* is a triangular sail.\n\n**The opening:** who is the speaker talking to? What human things does the wind do? What does she decide to do when the wind will not help?\n\n**The middle (the rapids):** as the river speeds up, the lines shorten and double: “Dip, dip,” “Swirl, swirl!” “Reel, reel,” “Dash, dash, / With a mighty crash.”\n\n**The ending:** how has the rhythm changed from the rapids? Find one metaphor and one example of personification. The poem ends on the word “sings.” Who, or what, has been singing?\n\n**Form follows feeling:** the rhythm imitates the paddle and the river.`,
        `**Claim frame:** “Johnson uses ___ in ‘___’ to make the reader ___.”\n\n*Example:* Johnson uses repetition in “Dip, dip” to make the reader feel each paddle stroke; when the water calms, the rhythm slows to “Sway, sway.”`,
        `The speaker begs the wind, is ignored, and picks up her paddle. What kind of person is this speaker, and how does the apostrophe to the wind set up that turn?`],
      note: [
        ['Imagery = words for the senses.', 'Simile uses “like” or “as.” Metaphor says one thing IS another.', 'Sound matters: alliteration, onomatopoeia, repetition, rhythm.'],
        ['Imagery appeals to the senses: sight, sound, touch, smell, taste and movement.', 'Simile, metaphor, personification and apostrophe say one thing in terms of another.', 'Alliteration, onomatopoeia, repetition, rhyme and rhythm make meaning through sound.', 'In Johnson’s poem the rhythm imitates the paddle and the river: form follows feeling.']],
      life: ['What is one sound from your everyday life that you would know anywhere (a door, a voice, a bus, a kettle)? Describe it with one simile or metaphor.', 'A sound I would know anywhere is… It sounds like…'],
      tryTitle: 'Eyes closed, ears open',
      tryit: [
        `**Experiment.** Go to one place. **Close your eyes for three minutes.**\n\nList every sound you hear.\n\nNow write **two lines** about the place. Use one sound word (like “splash,” “buzz,” “clatter”).`,
        `**Experiment: can you make a reader hear a place?**\n\n1. Choose a place. Close your eyes for three minutes and list every sound.\n2. Write four lines about the place using at least THREE devices from today (for example personification, onomatopoeia and repetition).\n3. Make the rhythm fit the place: short lines for busy, long lines for calm.\n4. Read it aloud to someone without naming the place. Can they guess where you were?\n5. Record which device did the most work.`,
        `Rewrite your four lines so the rhythm *fights* the subject (long, slow lines for a busy place). Read both versions aloud and record what the mismatch does.`],
      exit: 'How does Johnson use rhythm and sound to make the reader feel the canoe move? Give one example.', exit1: 'What do the short lines “Dip, dip” sound like?',
      terms: [
        ['imagery', 'words that make you see, hear, feel, smell or taste', 'language that appeals to the senses'],
        ['simile', 'a comparison using “like” or “as”', 'a comparison using “like” or “as”'],
        ['metaphor', 'saying one thing IS another', 'a direct comparison that says one thing is another'],
        ['personification', 'making a thing act like a person', 'giving human qualities to something non-human'],
        ['apostrophe', 'talking to something that cannot answer', 'speaking directly to something absent or non-human'],
        ['alliteration', 'words close together that start with the same sound', 'repetition of first consonant sounds in nearby words'],
        ['onomatopoeia', 'a word that sounds like what it means', 'a word that sounds like what it names'],
        ['rhythm', 'the beat of the words', 'the pattern of beats in a line or poem']],
      q: [
        mc('Imagery is language that appeals to:', 'the senses', ['logic', 'authority', 'the alphabet']),
        mc('“August is laughing across the sky” is an example of:', 'personification', ['simile', 'onomatopoeia', 'subtraction']),
        mc('Speaking directly to something absent or non-human, such as the west wind, is called:', 'apostrophe', ['allusion', 'enjambment', 'a comma']),
        mc('“Tinkling tunes” is an example of:', 'alliteration', ['metaphor', 'irony', 'a sonnet']),
        mc('In “The Song My Paddle Sings,” the short repeated lines such as “Dip, dip” mainly imitate:', 'the strokes of the paddle', ['a heartbeat', 'falling rain', 'a telephone']),
        tf('E. Pauline Johnson’s poem describes a journey by canoe.', true),
        tfx('A simile uses the word “like” or “as.”', 'A metaphor uses the word “like” or “as.”'),
        fill('A word that sounds like what it names, such as “splash,” is an example of ___.', 'onomatopoeia', ['personification', 'apostrophe', 'punctuation']),
        app('A weather report says, “The storm marched up the coast and hammered on every door.” Which device makes the storm vivid?', 'Personification', ['Simile', 'Apostrophe', 'Slant rhyme']),
        app('A cereal advertisement promises “Snap, Crackle, Crunch.” The marketers are relying on:', 'onomatopoeia', ['extended metaphor', 'kinesthetic imagery only', 'apostrophe']),
        app('Stuck in traffic, a driver mutters, “Come on, light, turn green for me.” Technically the driver is using:', 'apostrophe', ['simile', 'alliteration', 'a caesura'])
      ],
      task: T('Lesson 2 task: Device hunt', [
        'Match each line to its device. (1) “August is laughing across the sky.” (2) “tinkling tunes.” (3) “splash.” Devices: alliteration, onomatopoeia, personification.',
        'Define “imagery” and name THREE types. Identify the device in each: “West wind, blow from your prairie nest”; “August is laughing across the sky”; “Dip, dip, / While the waters flip”; “tinkling tunes”; “They seethe, and boil, and bound, and splash.”',
        'Complete the Level 2 task. Explain the difference between a simile and a metaphor, and say which one “its emerald wings” is. Then answer: how does Johnson use rhythm and sound to make the reader feel the movement of the canoe? Refer to at least one specific example.',
        'Complete the Level 3 task. Then write four lines of your own about a journey you make often (a bus ride, a walk, a drive) in which the rhythm imitates the movement, and label the devices you used.'],
        'Johnson uses ___ in “___” to make the reader…',
        ['1 = personification, 2 = alliteration, 3 = onomatopoeia.',
         'Imagery defined with three types; devices identified (apostrophe, personification, repetition, alliteration, onomatopoeia); “emerald wings” = metaphor; a claim about rhythm supported by an example such as “Dip, dip” (paddle strokes) or “Sway, sway” (calm water).'], 'B1, B2'),
      media: [
        M(2, 'image', 'E. Pauline Johnson (Tekahionwake) in performance dress', 'Library and Archives Canada / Wikimedia Commons', 'https://commons.wikimedia.org', 'Johnson toured as a performer: the poem was written to be heard.'),
        M(2, 'image', 'The Song My Paddle Sings: full text', 'Representative Poetry Online, University of Toronto', 'https://rpo.library.utoronto.ca/content/song-my-paddle-sings', 'All 53 lines for annotation (link in a Doc or paste the page).')]
    }),

    L(3, 'The Shape of a Poem', 'The Shape of a Poem', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · B3 Reading With Fluency',
      goals: ['Use the vocabulary of form: stanza, rhyme scheme, meter, enjambment', 'Scan a line of iambic pentameter', 'Explain how the sonnet form and irony work together in “Ozymandias”'],
      warm: [
        `What do people build, post or leave behind so they will be remembered?\n\nName someone who was world-famous 100 years ago. Was it hard?`,
        `**Warm-up: remember me.** What do people build, post or leave behind so that they will be remembered?\n\nName someone who was world-famous a hundred years ago. How long did it take you?`],
      ideasTitle: 'The vocabulary of form; iambic pentameter; the sonnet',
      ideas: [
        `**Form** is the shape of a poem.\n\n- **Stanza:** a group of lines\n- **Rhyme scheme:** the pattern of rhymes (ABAB)\n- **Meter:** a regular beat\n\n**Iambic pentameter** = five “da-DUM” beats in a line (ten syllables).\n\nClap it: *the LONE and LEV-el SANDS stretch FAR a-WAY.*\n\nA **sonnet** has **14 lines** and a **turn** (the *volta*), where the idea changes.`,
        `**The vocabulary of form**\n| Term | Meaning |\n| Stanza | a group of lines; a couplet has two, a quatrain four |\n| Rhyme scheme | the pattern of end rhymes, labelled with letters: ABAB |\n| Enjambment | a sentence runs over the end of a line without a pause |\n| Caesura | a strong pause in the middle of a line |\n| Free verse | poetry with no regular meter or rhyme |\n\n**Meter and iambic pentameter**\n- **Meter:** a regular pattern of stressed and unstressed syllables\n- **Iamb:** one unstressed syllable, then one stressed: da-DUM\n- **Pentameter:** five feet to a line, so ten syllables\n- **Scansion:** marking the stresses to find the pattern\n\n*Clap it out:* The LONE and LEV-el SANDS stretch FAR a-WAY. Five beats. You will meet this rhythm again in *Macbeth*.\n\n**The sonnet:** fourteen lines, usually in iambic pentameter; often an octave (first eight lines) and a sestet (last six); a **volta**, the “turn” in thought or feeling. Two traditions: Italian (Petrarchan) and English (Shakespearean), each with its own rhyme scheme.`,
        `**Shelley’s version:** ABABACDCEDEFEF. He bends the rules, and the pattern crumbles like the statue.`,
        `Scan line 10 (“My name is Ozymandias, King of Kings”). Where does the meter strain against the natural stress of the name, and what does that strain do to the king’s boast?`],
      textTitle: '“Ozymandias” — Percy Bysshe Shelley (1818)', textIcon: '🗿',
      textHtml: poem('Ozymandias', [
        ['I met a traveller from an antique land', 'Who said: “Two vast and trunkless legs of stone', 'Stand in the desert . . . Near them, on the sand,', 'Half sunk, a shattered visage lies, whose frown,', 'And wrinkled lip, and sneer of cold command,', 'Tell that its sculptor well those passions read', 'Which yet survive, stamped on these lifeless things,', 'The hand that mocked them, and the heart that fed;', 'And on the pedestal, these words appear:', 'My name is Ozymandias, King of Kings;', 'Look on my Works, ye Mighty, and despair!', 'Nothing beside remains. Round the decay', 'Of that colossal Wreck, boundless and bare', 'The lone and level sands stretch far away.”']], 'Percy Bysshe Shelley, first published 11 January 1818 (public domain).'),
      text: [
        `Read the poem below. It was printed in January 1818, the same month as his wife’s *Frankenstein*.\n\n**What it says:** A traveller saw a broken statue in the desert: two legs and a smashed face.\n\nThe words on it say: “Look on my Works, ye Mighty, and despair!”\n\nBut there are **no works**. “Nothing beside remains.” Only sand.\n\nThat is **irony**: the king’s boast now means the opposite. Even great power does not last.`,
        `First published in *The Examiner* on 11 January 1818, the same month his wife’s *Frankenstein* appeared. Ozymandias is the Greek name for the pharaoh Ramesses II.\n\n**As you read:** how many voices speak, and who says what? What is left of the statue? Where does the poem turn?\n\n**How the form makes the meaning**\n| Feature | What it does |\n| Irony | the boast “Look on my Works” is surrounded by nothing |\n| The turn | “Nothing beside remains.” A three-word sentence after eleven lines of build-up |\n| Caesura | the full stop in the middle of line 12 makes us stop, like the traveller |\n| Alliteration | “boundless and bare,” “lone and level”: the sound stretches out like the sand |\n| Framing | three nested voices put the king at a great distance, as Walton’s letters did for Victor |`,
        `**Worked answer on the irony:** Ozymandias meant that other rulers should despair because they could never equal him. But his works have vanished. The reader now “despairs” for a different reason: even the greatest power is erased by time.\n\n**What outlasts power?** The sculptor “well those passions read,” and his carving of the sneer survives when the empire does not. So does the poem.`,
        `We hear the story from a speaker, who heard it from a traveller, who read it on a pedestal. Compare this framing with Walton’s letters: what does distance do to authority in each text?`],
      note: [
        ['Form is the shape of a poem: stanzas, rhyme, beat.', 'Iambic pentameter = five da-DUM beats (ten syllables).', 'A sonnet has 14 lines and a turn (volta).'],
        ['Form is the shape of a poem: stanza, rhyme scheme, meter, line breaks.', 'Iambic pentameter is five da-DUM feet: ten syllables to the line.', 'A sonnet has fourteen lines and a volta, or turn.', 'In “Ozymandias,” irony and form work together: the proud inscription is answered by “Nothing beside remains.”']],
      life: ['What is one thing you (or your family) have made, posted or kept so that you will be remembered? How long do you think it will last?', 'Something I have made or kept to be remembered is… I think it will last…'],
      tryTitle: 'Clap it out',
      tryit: [
        `**Experiment.** Say this aloud and clap on the capital letters:\n\n*i’d LIKE a GLASS of MILK and SOME-thing SWEET.*\n\nFive claps = iambic pentameter!\n\nNow make up **one line of your own** with five da-DUM beats about your day.`,
        `**Experiment: is iambic pentameter hiding in ordinary speech?**\n\n1. Clap the last line of the poem: five stressed beats.\n2. Listen to people talk for ten minutes (or use your own speech). Catch one sentence that falls naturally into five da-DUM beats and write it down.\n3. Write two lines of iambic pentameter about your day. Mark the stresses.\n4. Run the “Remember me” test: ask two people to name someone world-famous from 100 years ago. Time them.\n5. Record: what does your result say about Ozymandias?`,
        `Write a 14-line sketch of a sonnet about something you once thought would last forever. Put your volta in a three-word sentence, as Shelley does.`],
      exit: 'Explain the irony of “Look on my Works, ye Mighty, and despair!”', exit1: 'How many lines does a sonnet have?',
      terms: [
        ['stanza', 'a group of lines in a poem', 'a group of lines in a poem'],
        ['rhyme scheme', 'the pattern of rhymes, shown with letters', 'the pattern of end rhymes in a poem, labelled with letters'],
        ['enjambment', 'a sentence that runs past the end of a line', 'a sentence running past the end of a line without a pause'],
        ['caesura', 'a strong pause in the middle of a line', 'a strong pause in the middle of a line'],
        ['iambic pentameter', 'a line with five da-DUM beats', 'a line of five da-DUM feet'],
        ['sonnet', 'a 14-line poem', 'a fourteen-line poem with a set form'],
        ['volta', 'the turn in a sonnet, where the idea changes', 'the turn in thought or feeling in a sonnet'],
        ['meter', 'a regular beat in a poem', 'a regular pattern of stressed and unstressed syllables']],
      q: [
        mc('An iamb is:', 'an unstressed syllable followed by a stressed one', ['a stressed syllable followed by an unstressed one', 'two stressed syllables', 'a kind of fruit spread']),
        mc('A regular line of iambic pentameter has:', 'ten syllables', ['eight syllables', 'fourteen syllables', 'one hundred syllables']),
        mc('The “volta” in a sonnet is:', 'the turn in thought or feeling', ['the final rhyme', 'the first quatrain', 'the author’s signature']),
        mc('In “Ozymandias,” what remains of the statue?', 'two legs and a shattered face', ['a complete figure buried in sand', 'a crown and a sword', 'a gift shop']),
        mc('The inscription on the pedestal is ironic because:', 'the king’s works have completely disappeared', ['the sculptor refused to carve it', 'the traveller cannot read it', 'it is spelled wrong']),
        tf('“Ozymandias” is a sonnet.', true),
        tfx('In “Ozymandias,” nothing remains around the statue but “lone and level sands.”', 'In “Ozymandias,” a great city still surrounds the statue.'),
        fill('A sonnet has ___ lines.', 'fourteen', ['four', 'ten', 'forty']),
        app('A demolished stadium still has one sign standing: “HOME OF CHAMPIONS, FOREVER.” The effect on a passer-by is closest to:', 'the irony of Ozymandias’s inscription', ['the volta of a sonnet', 'an apostrophe to the wind', 'iambic pentameter']),
        app('“I think I’ll take the bus to school today.” Read aloud, this ordinary sentence happens to be:', 'a line of iambic pentameter', ['a caesura', 'free verse by definition', 'a quatrain']),
        app('A rapper lets a sentence spill over the end of one bar into the next without a breath. In poetry terms that is:', 'enjambment', ['a caesura', 'a couplet', 'a volta'])
      ],
      task: T('Lesson 3 task: Mark up the sonnet', [
        'Answer in one sentence each. (1) What is left of the statue? (2) What do the words on it say? (3) Why are those words funny or sad now?',
        'Define in your own words: enjambment, caesura, volta, rhyme scheme. Say what iambic pentameter is and how many syllables a regular line has. State TWO features of a sonnet.',
        'Complete the Level 2 task. Explain the irony of the inscription “Look on my Works, ye Mighty, and despair!” Then answer: what does the poem suggest outlasts power? Support your answer with one detail.',
        'Complete the Level 3 task. Then label the rhyme scheme, scan lines 10 and 14, mark the volta, and explain in a paragraph how Shelley’s “broken” sonnet form supports the meaning.'],
        'The inscription is ironic because…',
        ['Two legs and a broken face; “Look on my Works, ye Mighty, and despair!”; there are no works left, only sand.',
         'Four accurate definitions; iambic pentameter = five da-DUM feet, ten syllables; two sonnet features; the irony explained (the boast now means the opposite); a claim about what lasts (art, words, or only time) tied to a detail.'], 'B1, B2'),
      media: [
        M(2, 'image', 'The “Younger Memnon” statue of Ramesses II', 'British Museum / Wikimedia Commons', 'https://commons.wikimedia.org', 'The statue whose arrival in London helped inspire the poem.'),
        M(1, 'image', 'Scansion of a line of iambic pentameter', 'Poetry Foundation glossary', 'https://www.poetryfoundation.org/learn/glossary-terms', 'A marked-up line to copy the stress marks from.')]
    }),

    L(4, 'Two Voices, One War', 'Two Voices from One War', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · C1 Developing and Organizing Content',
      goals: ['Identify tone, purpose and audience in a poem', 'Explain how context shapes a poet’s message', 'Compare two poems on the same subject using evidence'],
      warm: [
        `What do you remember from Remembrance Day at school?\n\nIs honouring soldiers the same as celebrating war?`,
        `**Warm-up: November 11.** What do you remember hearing, seeing or doing at Remembrance Day ceremonies?\n\nWhat is the difference between honouring soldiers and celebrating war?\n\n*Content note:* Owen’s poem describes a soldier dying in a gas attack.`],
      ideasTitle: 'Tone, purpose, audience, context; how to compare',
      ideas: [
        `Ask four things of any poem:\n- **Tone:** how does the speaker feel? (sad, bitter, proud)\n- **Purpose:** what is the poem trying to do? (mourn, warn, persuade)\n- **Audience:** who is it talking to? Look for “you.”\n- **Context:** who wrote it, when and where?\n\n**To compare two poems:** go point by point. Tone with tone. Image with image.`,
        `**Tone, purpose, audience, context**\n| Question | Meaning |\n| Tone | the speaker’s attitude: solemn, bitter, tender, mocking |\n| Purpose | what the poem is trying to do: mourn, persuade, warn, celebrate |\n| Audience | who the poem is speaking to. Watch for the word “you” |\n| Context | when, where and by whom it was written, and what was happening |\n\n**Comparison tip:** compare point by point: tone with tone, imagery with imagery. Do not describe one poem and then the other.\n\n**The two poets**\n| | John McCrae (1872–1918) | Wilfred Owen (1893–1918) |\n| Who | a doctor and soldier from Guelph, Ontario | a British infantry officer |\n| When | May 1915, near Ypres, Belgium, the day after a close friend was killed | 1917–18, after he had been treated for shell shock |\n| Published / died | *Punch*, 8 December 1915 | killed in action 4 November 1918, one week before the Armistice, aged 25 |\n| Form / title | a rondeau: fifteen lines with a repeated refrain | from Horace: “It is sweet and fitting to die for one’s country” |`,
        `**A comparative thesis frame:** “Although both poems…, McCrae…, while Owen…”\n\n**Legacy:** McCrae’s poem made the poppy the symbol of remembrance.`,
        `Canada recites “In Flanders Fields” every November 11. What would change if we recited Owen instead? Consider audience and purpose, not only tone.`],
      textTitle: '“In Flanders Fields” (McCrae) and “Dulce et Decorum Est” (Owen)', textIcon: '🌺',
      textHtml: poem('In Flanders Fields', [
        ['In Flanders fields the poppies blow', 'Between the crosses, row on row,', 'That mark our place; and in the sky', 'The larks, still bravely singing, fly', 'Scarce heard amid the guns below.'],
        ['We are the Dead. Short days ago', 'We lived, felt dawn, saw sunset glow,', 'Loved and were loved, and now we lie', 'In Flanders fields.'],
        ['Take up our quarrel with the foe:', 'To you from failing hands we throw', 'The torch; be yours to hold it high.', 'If ye break faith with us who die', 'We shall not sleep, though poppies grow', 'In Flanders fields.']], 'John McCrae, 1915 (public domain). Veterans Affairs Canada.') +
        poem('Dulce et Decorum Est (opening and ending)', [
        ['Bent double, like old beggars under sacks,', 'Knock-kneed, coughing like hags, we cursed through sludge,', 'Till on the haunting flares we turned our backs', 'And towards our distant rest began to trudge.'],
        ['. . .'],
        ['My friend, you would not tell with such high zest', 'To children ardent for some desperate glory,', 'The old Lie: Dulce et decorum est', 'Pro patria mori.']], 'Wilfred Owen, written 1917–18. Lines 1–4 and 25–28 of 28 (public domain). Full poem: Poetry In Voice.'),
      text: [
        `Read both poems below.\n\n**McCrae:** The **dead soldiers** speak. Poppies grow between their crosses. They ask the living: carry on. “To you… we throw the torch.” The tone is **solemn** (serious and sad).\n\n**Owen:** A **soldier who lived** speaks. The men are bent “like old beggars.” He says the idea that it is sweet to die for your country is “**the old Lie**.” The tone is **bitter**.\n\nSame war. Opposite poems.`,
        `**“In Flanders Fields.”** Who is “we”? Who is “you”? What do the dead ask the living to do? The refrain: how does its meaning change the second time?\n\n**“Dulce et Decorum Est.”** Two similes in two lines: what do soldiers look like? Who is “My friend”? What is “the old Lie”? Read the full poem (28 lines) at poetryinvoice.ca/read/dulce-et-decorum-est.\n\n**Point by point**\n| | McCrae | Owen |\n| Speaker | the dead soldiers (“We are the Dead”) | a soldier who survived a gas attack |\n| Audience | the living, who must continue the fight | “My friend”: people at home who tell the young that dying for one’s country is glorious |\n| Imagery | poppies, larks, sunset | sludge, coughing, gas |\n| Purpose | to honour the dead and ask the living to carry the torch | to bear witness and attack “the old Lie” |`,
        `**Imagery sets tone.** “Between the crosses, row on row” creates a solemn, orderly, almost peaceful tone of mourning. “Bent double, like old beggars under sacks” creates a bitter, disgusted tone by showing young men as broken and old.`,
        `Do the two poems contradict each other, or can both be true? One can grieve soldiers and reject the glorifying of war. Build the strongest case for “both are true,” using one quotation from each.`],
      note: [
        ['Tone = the speaker’s attitude. Purpose = what the poem is trying to do.', 'McCrae: the dead ask the living to carry the torch.', 'Owen: a soldier calls the glory of war “the old Lie.”'],
        ['Tone is the speaker’s attitude; purpose is what the poem is trying to do.', 'Context (who, when, where) shapes meaning: McCrae wrote in 1915, Owen after years of trench warfare.', 'McCrae speaks for the dead and asks the living to carry the torch; Owen speaks as a witness and attacks “the old Lie.”', 'Compare point by point, with evidence from both poems.']],
      life: ['Think of one event in your life that two people describe in completely different tones. What does each person want the listener to feel?', 'One event that two people describe differently is… One wants me to feel… The other wants me to feel…'],
      tryTitle: 'Same event, two voices',
      tryit: [
        `**Experiment.** Find **two posts, headlines or people** talking about the **same event** (a game, a storm, a school rule).\n\nFor each one, write:\n- one word for the **tone**\n- **who** it is talking to\n\nHow are they different?`,
        `**Experiment: compare two real texts point by point.**\n\n1. Find two texts about the same event: two headlines, two posts, or two family members’ accounts.\n2. Draw a chart with two columns and five rows: speaker, audience, tone, key image, purpose.\n3. Fill every box with a word or phrase AND a short quotation.\n4. Write one sentence: “Although both…, the first…, while the second…”\n\nYou have just written a comparative thesis. Now do the same chart for McCrae and Owen.`,
        `Find out when and where each of your two texts was produced. Add a sixth row, “context,” and record whether it explains the difference in tone.`],
      exit: 'Who is the speaker of each poem, and who is each speaker addressing?', exit1: 'Who is speaking in “In Flanders Fields”?',
      terms: [
        ['tone', 'the speaker’s attitude', 'the speaker’s attitude toward the subject'],
        ['purpose', 'what a poem is trying to do', 'what a text is trying to do: mourn, persuade, warn or celebrate'],
        ['audience', 'who a text is speaking to', 'the people a text addresses'],
        ['context', 'when, where and by whom something was written', 'when, where and by whom a text was written, and what was happening'],
        ['rondeau', 'a 15-line poem with a line that repeats', 'a fifteen-line poem with a repeated refrain, such as “In Flanders Fields”'],
        ['refrain', 'a line that repeats in a poem or song', 'a line or phrase that repeats through a poem or song']],
      q: [
        mc('Who speaks in “In Flanders Fields”?', 'the dead soldiers', ['a general', 'a child at a ceremony', 'a news reporter']),
        mc('John McCrae was:', 'a Canadian doctor and soldier from Guelph, Ontario', ['a British infantry officer', 'a French army chaplain', 'a hockey player']),
        mc('In Owen’s poem, “the old Lie” is the idea that:', 'it is sweet and fitting to die for one’s country', ['the war will end soon', 'gas attacks are harmless', 'poppies are blue']),
        mc('Which images belong to Owen’s poem?', 'sludge, coughing and gas', ['poppies, larks and sunset', 'a canoe and a west wind', 'a statue in the desert']),
        mc('When comparing two poems, you should:', 'compare point by point, with evidence from both', ['describe one poem fully, then the other', 'choose a favourite and ignore the other', 'count the letters']),
        tf('Wilfred Owen was killed one week before the war ended.', true),
        tfx('“In Flanders Fields” is a rondeau, with regular meter, rhyme and a refrain.', '“In Flanders Fields” is written in free verse.'),
        tfx('Owen’s poem calls the glory of dying in war “the old Lie.”', 'Wilfred Owen’s poem presents death in war as glorious.'),
        fill('McCrae’s poem made the ___ the symbol of remembrance.', 'poppy', ['lark', 'torch', 'tulip']),
        app('A recruiting poster shows smiling soldiers under a bright flag; a veteran’s memoir describes the same battle as mud and fear. To explain the difference you would look first at:', 'purpose and audience', ['rhyme scheme', 'the number of lines', 'onomatopoeia']),
        app('A student writes two paragraphs: everything about McCrae, then everything about Owen. The teacher’s best advice is:', 'Reorganize point by point: tone with tone, imagery with imagery', ['Add a third poem', 'Remove all quotations', 'Write only about your favourite']),
        app('A speech at a memorial ends, “They gave us the task; we must not drop it.” This echoes which image?', 'McCrae’s torch thrown from failing hands', ['Owen’s old beggars under sacks', 'Dickinson’s bird', 'Shelley’s shattered visage'])
      ],
      task: T('Lesson 4 task: Comparison chart', [
        'Fill in the chart with one word each. McCrae: who speaks? what is the feeling? Owen: who speaks? what is the feeling? Then finish: “The poems are different because…”',
        'Define “tone” and “purpose.” Give TWO facts about the context of each poem. Say who the speaker of each poem is and who each speaker is addressing.',
        'Complete the Level 2 task. Choose one image from each poem and explain how it helps create the poem’s tone. Then answer: do the two poems contradict each other, or can both be true? Refer to each poem.',
        'Complete the Level 3 task. Then write a comparative thesis (“Although both poems…, McCrae…, while Owen…”) and one PEEL paragraph that compares the two poems on ONE point, quoting both.'],
        'Although both poems…, McCrae…, while Owen…',
        ['McCrae: the dead soldiers, sad and serious. Owen: a living soldier, bitter or angry. One clear difference.',
         'Accurate definitions and context (May 1915, Ypres, a Canadian doctor; 1917–18, a British officer treated for shell shock); speakers and audiences identified; one image per poem linked to tone; a position on “contradict or both true” that refers to both poems.'], 'B1, B2, C1'),
      media: [
        M(2, 'image', 'John McCrae and the handwritten “In Flanders Fields”', 'Veterans Affairs Canada', 'https://www.veterans.gc.ca', 'Text, biography and the manuscript of the poem.'),
        M(2, 'image', 'Dulce et Decorum Est: full text and recitation', 'Poetry In Voice', 'https://poetryinvoice.ca/read/dulce-et-decorum-est', 'All 28 lines for annotation. Content note: a gas attack.')]
    }),

    L(5, 'Poetry Out Loud', 'Poetry Out Loud', {
      exp: 'A2 Speaking to Communicate · A3 Reflecting on Skills and Strategies · B1 Reading for Meaning · D1 Understanding Media Texts',
      goals: ['Describe how free verse and spoken word use voice in place of fixed form', 'Analyze a poem using TP-CASTT', 'Plan an expressive recitation of a poem'],
      warm: [
        `Whose voice could you pick out with your eyes closed? What makes it theirs?\n\nIs there something you can say in one language, or with one group, that you cannot say in another?`,
        `**Warm-up: whose voice?** Whose voice could you recognize from one sentence, with your eyes closed? What makes it theirs?\n\nIs there anything you can say in one language, or with one group of people, that you cannot say in another?\n\n*Content note:* today’s poems refer to residential school, bullying, self-harm and depression.`],
      ideasTitle: 'Free verse, spoken word and TP-CASTT',
      ideas: [
        `**Free verse** has no regular beat or rhyme. Line breaks and repeated words give it shape.\n\n**Spoken word** is poetry made to be **performed**. The voice is the instrument.\n\n**Tools of the voice:** pace (fast/slow), pause, volume, emphasis.\n\n**TP-CASTT** is a tool for any poem:\n**T**itle · **P**araphrase · **C**onnotation · **A**ttitude · **S**hift · **T**itle again · **T**heme`,
        `**Free verse and spoken word**\n- **Free verse:** no regular meter or rhyme; line breaks, repetition and white space do the shaping\n- **Spoken word:** poetry written to be performed; the voice is the instrument\n- **Tools of performance:** pace, pause, volume, pitch, emphasis, gesture\n- **An old idea:** poetry was spoken and sung long before it was printed. E. Pauline Johnson toured as a performer more than a century ago\n\n**TP-CASTT: a tool for any poem**\n| Letter | What to do |\n| Title | predict before you read |\n| Paraphrase | plain words, sentence by sentence |\n| Connotation | devices, imagery and what the words suggest |\n| Attitude | the speaker’s tone |\n| Shift | where the poem turns |\n| Title again | what does it mean now? |\n| Theme | a full, arguable sentence |`,
        `**How you say a poem is an interpretation of it.** Underline three words you would stress and mark two places to pause ( / ) before you read anything aloud.`,
        `What can a performed poem do that a printed poem cannot? What can the page do that the stage cannot? Use one example from Rita Joe and one from Shane Koyczan.`],
      textTitle: '“I Lost My Talk” (Rita Joe) and “To This Day” (Shane Koyczan)', textIcon: '🎤',
      text: [
        `These two poems are **not printed here** (they are under copyright). Read and watch them at the links your teacher gives you.\n\n**Rita Joe** was a Mi’kmaq poet from Cape Breton. As a child at residential school she was made to speak English. Her “talk” is her **Mi’kmaq language**. Her poem is quiet. At the end she reaches out and asks to teach us about herself.\n\n**Shane Koyczan** performs “To This Day,” about being **bullied**. He speeds up, slows down and repeats lines. His voice carries the meaning.`,
        `Both poems are in copyright, so they are linked, not reprinted.\n\n**Read: “I Lost My Talk.”** Rita Joe (1932–2007), Mi’kmaq poet from Cape Breton, Nova Scotia, attended the Shubenacadie Indian Residential School. Read it at poetryinvoice.ca/poems/i-lost-my-talk.\n- What does the speaker mean by her “talk”? Who took it, and where?\n- No rhyme, no meter, very short lines. Why might that suit this poem?\n- The tone at the end: angry, sad, generous, or something else?\n- Her poem closes with a request to find her talk again so that she can teach the reader about herself.\n\n**Watch: “To This Day … for the bullied and beautiful.”** Shane Koyczan, Canadian spoken-word poet (TED, about 12 minutes; the poem begins after his introduction).\n- Where does he speed up? Where does he nearly stop?\n- One image you will remember tomorrow\n- A place where his voice does something print could not\n- How does he use repetition?`,
        `**Connect to Unit 1, Lesson 5:** whose voice is centred? Rita Joe’s poem does not end in blame; it reaches toward the reader. The poem itself is an act of finding her “talk.”\n\n**Discussion:** both poets write about being silenced. Why might poetry be the form people reach for when that happens?`,
        `Rita Joe is quiet; Shane Koyczan is loud. Which approach moved you more, and why? Describe one performance choice you would borrow from each for your own recitation.`],
      note: [
        ['Free verse has no regular beat or rhyme.', 'Spoken word is poetry made to be performed.', 'TP-CASTT: Title, Paraphrase, Connotation, Attitude, Shift, Title, Theme.'],
        ['Free verse shapes meaning with line breaks, repetition and white space, not meter or rhyme.', 'Spoken word is written for performance: pace, pause, volume and emphasis carry meaning.', 'TP-CASTT: Title, Paraphrase, Connotation, Attitude, Shift, Title, Theme.', 'How you say a poem is an interpretation of it.']],
      life: ['Is there a language, a way of speaking, or a side of yourself that you use in one place and not in another? What happens to it when you cannot use it?', 'A way of speaking I only use in one place is… When I cannot use it…'],
      tryTitle: 'Say it two ways',
      tryit: [
        `**Experiment.** Pick **four lines** from any poem in this unit.\n\n1. Underline two words to say **louder**.\n2. Mark one place to **pause** with a slash ( / ).\n3. Read it aloud to someone. Use 🎙️ **Record** if you like.\n4. Now read it again, **very fast with no pauses**.\n\nWhich way did your listener like? Why?`,
        `**Experiment: does the way you say it change what it means?**\n\n1. Choose any poem from this unit except “Hope.” Complete a TP-CASTT chart in point form: one line per letter.\n2. Mark up a script: underline three words to stress and mark two pauses with a slash ( / ).\n3. Record yourself reading it your way (🎙️ **Record** on the assignment), or read it to a listener.\n4. Read it a second time making the *opposite* choices: stress different words, pause in different places.\n5. Ask your listener what each version seemed to mean. Record the difference.`,
        `Listen back to your recording and write a three-sentence commentary that justifies one stress, one pause and one change of pace by pointing to the poem’s meaning.`],
      exit: 'What does each letter of TP-CASTT stand for?', exit1: 'Name two tools of the voice a performer can use.',
      terms: [
        ['free verse', 'poetry with no regular beat or rhyme', 'poetry with no regular meter or rhyme'],
        ['spoken word', 'poetry made to be performed out loud', 'poetry written to be performed aloud'],
        ['TP-CASTT', 'a seven-step tool for reading any poem', 'a tool for analyzing a poem: Title, Paraphrase, Connotation, Attitude, Shift, Title, Theme'],
        ['connotation', 'the feelings and ideas a word suggests', 'what a word suggests beyond its literal meaning'],
        ['shift', 'the place where a poem turns or changes', 'the point where a poem turns in thought, tone or feeling'],
        ['recitation', 'saying a poem aloud from memory', 'the spoken performance of a poem from memory'],
        ['pace', 'how fast or slow you speak', 'the speed of delivery in a spoken performance']],
      q: [
        mc('In Rita Joe’s poem, the “talk” she lost is:', 'her Mi’kmaq language', ['a speech she had memorized', 'her singing voice', 'her phone']),
        mc('Free verse is poetry that:', 'has no regular meter or rhyme', ['must be performed', 'always has fourteen lines', 'costs nothing to publish']),
        mc('In TP-CASTT, the “A” stands for:', 'Attitude: the speaker’s tone', ['Alliteration', 'Audience', 'Apple']),
        mc('Which is NOT a tool of performance?', 'Rhyme scheme', ['Pace', 'Pause', 'Volume']),
        mc('How does Rita Joe’s poem end?', 'By reaching out and asking to teach the reader about herself', ['With a demand for revenge', 'With a joke', 'With a recipe']),
        tf('Spoken word poetry is written to be performed aloud.', true),
        tfx('Poetry was spoken and sung long before it was printed.', 'Spoken word is a brand-new idea: poetry was never performed before the 2000s.'),
        fill('TP-CASTT ends with ___: a full, arguable sentence about what the poem says.', 'Theme', ['Title', 'Tone', 'Tuesday']),
        app('A valedictorian slows right down and lowers her voice for one sentence of her speech. The audience leans in. She has used:', 'pace and volume to carry meaning', ['enjambment', 'a rhyme scheme', 'an extended metaphor']),
        app('A student’s family speaks one language at home, and the student is told at school to use only English. Which poem from this unit speaks most directly to that experience?', '“I Lost My Talk” by Rita Joe', ['“Ozymandias” by Shelley', '“The Song My Paddle Sings” by Johnson', '“In Flanders Fields” by McCrae']),
        app('Before reading an unfamiliar poem called “The Last Bus,” a reader guesses what it might be about, then checks the guess after reading. Which TP-CASTT steps are these?', 'Title, and Title again', ['Paraphrase and Shift', 'Connotation and Attitude', 'Theme only'])
      ],
      task: T('Lesson 5 task: TP-CASTT and a marked-up script', [
        'Finish each sentence. (1) Free verse is poetry with no… (2) Rita Joe’s “talk” is her… (3) Two things a speaker can change with their voice are… and…',
        'Define “free verse” and “spoken word.” Write what each letter of TP-CASTT stands for. Name THREE tools a performer uses. Explain what the speaker of “I Lost My Talk” means by her “talk,” and how it was lost.',
        'Complete the Level 2 task. Identify one choice Shane Koyczan makes with his VOICE in “To This Day” and explain its effect. Then answer: Rita Joe’s poem ends by reaching out to the reader. What does this ending suggest about the purpose of her poem?',
        'Complete the Level 3 task. Then complete a full TP-CASTT chart for any poem in this unit except “Hope,” attach a marked-up script (stresses, pauses, pace) and record yourself reading it.'],
        'One choice the poet makes with voice is…',
        ['No regular beat or rhyme; her Mi’kmaq language; two of pace, pause, volume, emphasis.',
         'Accurate definitions; TP-CASTT in order; three performance tools; “talk” = her Mi’kmaq language, lost at residential school; one accurate observation about Koyczan’s voice with its effect; the ending read as reaching toward understanding, not blame.'], 'A2, A3, B1'),
      extra: [T('Unit 3 assignment: Poem in Performance (40 marks)', [
        'Choose a short poem with your teacher. Practise reading it aloud five times. Mark two words to stress and two pauses. Read it to your teacher or record it. Then write three sentences: what the poem is about, one word you stressed, and why.',
        'Choose a poem from Poetry In Voice (poetryinvoice.ca), at least 14 lines, not one we studied; get it approved. Complete a TP-CASTT chart, mark up a script (underline stresses, slash for pauses), and recite it (from memory if you can). Write a 150–200 word commentary: the theme in one sentence, one device with a quotation, and two performance choices with reasons.',
        'Choose and confirm a poem from Poetry In Voice (at least 14 lines, not studied in class). Submit: (1) the Performance Organizer (TP-CASTT); (2) your marked-up script; (3) a live recitation from memory, one to three minutes; (4) a 300–400 word commentary that states the theme in one sentence, explains at least TWO devices with quotations, and justifies at least THREE performance choices (stress, pause, pace, volume or tone) by linking each to the poem’s meaning. If reciting live is a barrier, speak to your teacher first: you may recite to the teacher alone, to a small group, or submit a recording.',
        'Complete the Level 3 assignment. In your commentary, also describe one line you could have performed in two defensible ways, and explain why you chose the reading you did.'],
        'The theme of my poem is…',
        ['A clear reading with planned stresses and pauses, and sentences that give a reason for one choice.',
         'The poem known by heart and recited accurately; a clear voice and a pace that suits the poem, with pauses on purpose; choices that interpret, not act out; a commentary that names specific devices, quotes exactly and ties each performance choice to a reason in the poem. Marked /40: Knowledge 10 · Thinking 10 · Communication 10 · Application 10.'], 'A2, A3, B1, B2, C1')],
      media: [
        M(2, 'video', 'To This Day … for the bullied and beautiful (Shane Koyczan)', 'TED', 'https://www.ted.com/talks/shane_koyczan_to_this_day_for_the_bullied_and_beautiful', 'Spoken word in performance. Content note: bullying, self-harm, depression. Preview first.', 12),
        M(2, 'image', 'I Lost My Talk (Rita Joe): text and biography', 'Poetry In Voice', 'https://poetryinvoice.ca/poems/i-lost-my-talk', 'In copyright: link to it, do not copy it.')]
    })
  ]));

  // =====================================================================
  // UNIT 4 · MACBETH — “Fair is foul, and foul is fair.”
  // Text: Folger Shakespeare edition (free online). Quotations cited as (act.scene).
  // =====================================================================
  var FOLGER = 'https://www.folger.edu/explore/shakespeares-works/macbeth/read';
  UNITS.push(U('macbeth', 'Unit 4 · Macbeth', [
    'We read Shakespeare’s play Macbeth: a soldier, a prophecy, a murder, and what guilt does to people.',
    'Shakespeare’s Macbeth in eight lessons: the world of King James, the witches and the prophecy, Lady Macbeth’s persuasion, blood and sleep, the banquet, equivocation, the ending, and the play on stage. Unit motto: “Fair is foul, and foul is fair.”',
    'Macbeth (c. 1606; Folger edition): context and tragedy, paradox and prophecy, soliloquy and aside, persuasion and gender, motifs of blood, sleep and darkness, climax, equivocation, catharsis, themes and the director’s tools. Ends with The Director’s Promptbook (40 marks) and the unit test. Expectations: A1–A3, B1–B4, C1–C3, D1–D3.'
  ], [

    L(1, 'The Scottish Play', 'Shakespeare’s Scottish Play', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · B3 Reading With Fluency',
      goals: ['Explain the world Macbeth was written for: King James, witchcraft and the fear of treason', 'Recall the features of tragedy and of Shakespeare’s verse', 'Use four strategies for reading Shakespeare’s language'],
      warm: [
        `Someone you trust says you are **certain** to get the thing you want most.\n\nWould you wait for it, or go after it?`,
        `**Warm-up: how far would you go?** If someone you trusted told you that you were certain to get the thing you want most, would you wait for it or go after it?\n\nIs ambition a virtue or a danger? Where is the line?\n\nUnit motto: **“Fair is foul, and foul is fair.”**`],
      ideasTitle: '1606: a play for a king; the order of things; verse and stagecraft',
      ideas: [
        `**Macbeth** was written about **1606** for **King James I**.\n\n- James **feared witches** and wrote a book about them.\n- He feared **treason** (the Gunpowder Plot, 1605).\n- He said **Banquo** was his ancestor.\n\nPeople believed God chose the king (**divine right**). Killing a king is **regicide**. It breaks the natural order.\n\n**On stage:**\n- **Soliloquy:** a character alone says their thoughts aloud.\n- **Aside:** a remark the other characters do not hear.`,
        `**1606: a play for a king**\n- **King James I:** king of Scotland, then of England from 1603; patron of Shakespeare’s company, the King’s Men\n- **Witchcraft:** James believed in witches and wrote a book about them, *Daemonologie* (1597)\n- **Treason:** the Gunpowder Plot of 1605 tried to blow up king and Parliament\n- **Banquo:** James claimed descent from him, so Shakespeare makes Banquo noble\n- **The source:** Holinshed’s *Chronicles*; the real Macbeth ruled Scotland from 1040 to 1057\n\n**The order of things**\n- **Divine right of kings:** a king was believed to be chosen by God; to kill him was a crime against heaven\n- **The Great Chain of Being:** everything had its place, from God down to stones\n- **Regicide:** the killing of a king. Break the chain and nature itself goes wrong: storms, darkness, animals turning on each other\n\n**Tragedy (you know this):** a tragic hero of high standing falls through his own *hamartia*; five acts follow Freytag’s pyramid; the audience feels *catharsis*.\n\n**Verse, prose and stagecraft**\n| Term | Meaning |\n| Blank verse | unrhymed iambic pentameter (Unit 3): how nobles usually speak |\n| Prose | ordinary speech: servants, comic scenes, madness |\n| Soliloquy | a character alone on stage speaks his or her thoughts aloud |\n| Aside | a remark the other characters on stage do not hear |`,
        `**Watch for it:** every time order is broken in this play, the natural world reacts. The witches speak in a different, chanting rhythm. Listen for it.\n\n**Why it pleased the king:** the play shows regicide as monstrous and punishes it, makes James’s ancestor Banquo noble, and takes his interest in witchcraft seriously.`,
        `Shakespeare’s company depended on the king’s favour. How might that shape a play about killing a king? People in 1606 feared witches and hidden traitors: who or what plays that role in our fears today?`],
      textTitle: 'Reading Shakespeare: four ways in', textIcon: '🗝️',
      text: [
        `Shakespeare’s words look hard. Use **four tricks**:\n\n1. **Read to the punctuation**, not to the end of the line.\n2. **Fix the word order.** Find who is doing what.\n3. **Open the short forms:** o’er = over, ’tis = it is, th’ = the.\n4. **Say it aloud.**\n\n**Try it:** “Stars, hide your fires.” → *Stars, turn off your light.*\n\n“Thou,” “thee” and “thy” all mean **you** / **your** (for friends, family, or insults).`,
        `**Four ways in**\n| Strategy | How |\n| Read to the punctuation | not to the end of the line |\n| Untangle the word order | find the subject and the verb, then rebuild the sentence |\n| Expand the contractions | o’er = over, ’tis = it is, th’ = the |\n| Say it aloud | the rhythm tells you which words matter |\n\n**Thou and you:** “thou,” “thee” and “thy” are the familiar forms: used for friends, family, inferiors and insults.\n\n**Decode the lines.** Rewrite each in modern English, then predict who might say it, and at what kind of moment:\n> “So foul and fair a day I have not seen.”\n\n> “Stars, hide your fires.”\n\n> “False face must hide what the false heart doth know.”\n\n**Macbeth in Ontario:** the Stratford Festival, one of North America’s great Shakespeare theatres, is a few hours from most Ontario classrooms. A play is a script for performance. As we read, keep asking: *how would I stage this?*`,
        `**Worked example:** “False face must hide what the false heart doth know.” → *I must put on an innocent expression to hide the treachery my heart is planning.* Both halves matter: the deceptive appearance and the guilty secret.\n\n**Reading plan:** Act 1, scenes 1–4 (about 20 minutes; read aloud if you can). What exactly do the witches promise, and to whom?`,
        `Actors still avoid saying “Macbeth” inside a theatre and call it “the Scottish play.” Why do superstitions cling to this play in particular? Connect your answer to what the play itself says about belief.`],
      note: [
        ['Macbeth was written about 1606 for King James, who feared witches and treason.', 'Killing a king (regicide) broke God’s order.', 'Soliloquy = thoughts spoken alone. Aside = a remark others do not hear.'],
        ['*Macbeth* was written about 1606 for King James I, who feared witchcraft and treason and claimed descent from Banquo.', 'Killing a king (regicide) broke the divine order, and in the play nature reacts.', 'A tragic hero falls through his own hamartia; the audience feels catharsis.', 'Nobles speak blank verse; a soliloquy reveals private thought; an aside is unheard by others on stage.']],
      life: ['What is the thing you want most right now? If you were told it was certain, would you wait for it or go after it, and what would you NOT be willing to do?', 'The thing I want most is… I would not be willing to…'],
      tryTitle: 'Read to the punctuation',
      tryit: [
        `**Experiment.** Read this line aloud to someone **two ways**:\n\n“So foul and fair a day I have not seen.”\n\n1. Fast, in one breath.\n2. Slowly, leaning on **foul** and **fair**.\n\nAsk: which way was easier to understand?\n\nThen say the line in your own words.`,
        `**Experiment: does reading aloud really help?**\n\n1. Choose the three lines from the “Decode the lines” list.\n2. Read each to a listener line-by-line in a flat voice. Ask what they understood.\n3. Read each again using the four strategies: to the punctuation, stressing the words the rhythm picks out.\n4. Ask again. Record what changed.\n5. Rewrite all three lines in modern English and keep your predictions about who says each. We will check them over the next two weeks.`,
        `Ask two people about a superstition they still follow (a lucky item, a word they avoid). Record whether each one “believes” it, and what that tells you about an audience that half-believed in witches.`],
      exit: 'What was the “divine right of kings,” and why did it make regicide so serious?', exit1: 'What is the word for killing a king?',
      terms: [
        ['regicide', 'the killing of a king', 'the killing of a king'],
        ['divine right of kings', 'the belief that God chooses the king', 'the belief that a monarch is chosen by God'],
        ['blank verse', 'poetry lines with five beats and no rhyme', 'unrhymed iambic pentameter'],
        ['prose', 'ordinary speech with no set beat', 'ordinary speech without meter, often used for servants or madness'],
        ['soliloquy', 'a speech a character says alone, sharing private thoughts', 'a speech of private thought by a character alone on stage'],
        ['aside', 'a remark the other characters do not hear', 'a remark that other characters on stage do not hear']],
      q: [
        mc('Macbeth was written in about:', '1606', ['1506', '1806', '2006']),
        mc('The play was written during the reign of:', 'James I', ['Elizabeth I', 'Victoria', 'Charles III']),
        mc('Why does Shakespeare make Banquo noble?', 'King James claimed descent from him', ['Banquo was Shakespeare’s uncle', 'The real Banquo wrote the play', 'Banquo paid for the theatre']),
        mc('Which strategy helps most with a long Shakespearean sentence?', 'Read to the punctuation, not to the end of the line', ['Skip every second word', 'Read only the rhyming words', 'Read it backwards']),
        mc('In Shakespeare, servants, comic scenes and madness are usually written in:', 'prose', ['blank verse', 'sonnets', 'capital letters']),
        tf('King James I believed in witchcraft and wrote a book about it.', true),
        tfx('A soliloquy is spoken by a character alone on stage.', 'A soliloquy is a conversation between two characters that everyone on stage can hear.'),
        fill('Unrhymed iambic pentameter is called ___ verse.', 'blank', ['free', 'black', 'blue']),
        app('In a TV drama, a character turns to the camera and mutters, “She has no idea,” while the other characters carry on. This is the screen version of:', 'an aside', ['a soliloquy', 'blank verse', 'regicide']),
        app('“O’er the hills th’ army came, and ’twas a fearful sight.” Which strategy do you need first?', 'Expand the contractions', ['Find the rhyme scheme', 'Look for a volta', 'Count the stanzas']),
        app('A film about a president’s assassination shows storms, blackouts and animals behaving strangely afterward. This borrows which idea from Macbeth’s world?', 'When rightful order is broken, nature itself goes wrong', ['Comic relief', 'The epistolary form', 'Unity of effect'])
      ],
      task: T('Lesson 1 task: The world of the play', [
        'Finish the sentences. (1) Macbeth was written for King ___. (2) He was afraid of ___ and ___. (3) In my own words, “Stars, hide your fires” means…',
        'Give THREE facts about King James I that help explain what is in Macbeth. Define: regicide, blank verse, soliloquy, aside. Rewrite in modern English: “False face must hide what the false heart doth know.”',
        'Complete the Level 2 task. Explain the “divine right of kings” and why it made regicide so serious. Then answer: why might a play about the murder of a king have pleased King James instead of offending him?',
        'Complete the Level 3 task. Then decode all three lines from the lesson, predict the speaker and the moment for each, and explain which of the four strategies each line needed most.'],
        'In modern English, the line means…',
        ['King James; witches and treason (traitors); a sensible plain-English version of the line.',
         'Three accurate facts about James; four correct definitions; a paraphrase that keeps both the false appearance and the guilty secret; divine right explained (the king is chosen by God, so regicide is a crime against heaven); a context-based reason the play flatters James.'], 'B1, B2, B3'),
      media: [
        M(2, 'image', 'Macbeth study guide and production photos', 'Stratford Festival (Tools for Teachers)', 'https://www.stratfordfestival.ca', 'How an Ontario production sets the play, and why a director might move it out of medieval Scotland.'),
        M(1, 'image', 'King James I of England and VI of Scotland, portrait', 'National Portrait Gallery / Wikimedia Commons', 'https://commons.wikimedia.org', 'The king the play was written for.')]
    }),

    L(2, 'Fair Is Foul', 'Fair Is Foul (Act 1, scenes 1–4)', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · A2 Speaking to Communicate · D1 Understanding Media Texts',
      goals: ['Explain how the opening scenes establish atmosphere and the theme of appearance versus reality', 'Compare Macbeth’s and Banquo’s reactions to the prophecy', 'Identify paradox, aside and foil in Act 1'],
      warm: [
        `Has a prediction ever changed how you acted? (A horoscope, a teacher’s comment, a coach’s remark.)\n\nIf it came true because you acted on it, was it fate or was it you?`,
        `**Warm-up: predictions.** Has a prediction (a horoscope, a teacher’s comment, a coach’s remark) ever changed how you behaved?\n\nIf a prophecy comes true because you acted on it, was it fate or was it you?`],
      ideasTitle: 'The witches set the rules; the hero and the prophecy',
      ideas: [
        `The play opens with **three witches**, thunder and lightning.\n\nThey say: “**Fair is foul, and foul is fair.**” Good is bad, and bad is good. That is a **paradox**: it sounds impossible but holds a truth.\n\n**The theme:** nothing is what it seems.\n\n**The prophecy:**\n- To **Macbeth:** Thane of Glamis, Thane of Cawdor, and **king** one day.\n- To **Banquo:** you will not be king, but your **children** will be kings.`,
        `**The witches set the rules**\n- **1.1:** thunder, lightning and a plan to meet Macbeth. Twelve lines, and the mood is fixed\n- **Paradox:** a statement that seems to contradict itself yet holds a truth: “Fair is foul, and foul is fair”\n- **The theme:** appearance versus reality: nothing in this play is what it seems\n- **An echo:** Macbeth’s first line is “So foul and fair a day I have not seen” (1.3). He is in their world before he meets them\n\n**The hero and the prophecy**\n- **1.2, the report:** “brave Macbeth (well he deserves that name)” has carved through the rebels. We hear of him before we see him\n- **To Macbeth:** Thane of Glamis, Thane of Cawdor, “king hereafter”\n- **To Banquo:** “Lesser than Macbeth and greater”; he will father kings but not be one\n- **Proof arrives:** moments later Ross greets Macbeth as Thane of Cawdor`,
        `**Dramatic irony:** we already know Duncan has given Macbeth the title. Macbeth does not. Watch his face.\n\n**Foil:** Banquo hears the same prophecy and does nothing. His restraint measures Macbeth’s ambition.`,
        `Crash Course asks about fate and free will. Did the witches put the idea of murder in Macbeth’s mind, or was it already there? Find the one line in 1.3 that best supports your view.`],
      textTitle: 'Two men, one prophecy (1.3) and Duncan’s mistake (1.4)', textIcon: '🌩️',
      text: [
        `**Two reactions:**\n- **Macbeth** is startled and silent. He cannot stop thinking about being king.\n- **Banquo** is calm and careful. He warns that evil tells small truths to trick us.\n\n**King Duncan** names his son **Malcolm** as the next king. Now Malcolm is in Macbeth’s way.\n\nMacbeth says in an **aside**:\n> “Stars, hide your fires; / Let not light see my black and deep desires.”\n\nHe is already hiding dark thoughts.`,
        `**Read 1.3 in roles** (three witches, Macbeth, Banquo, Ross, Angus). Track: who speaks to the witches first, and who is silent? Every aside: who is Macbeth hiding his thoughts from?\n\n| | Reaction to the prophecy |\n| Macbeth | startled, silent and “rapt”; immediately absorbed by the idea of being king |\n| Banquo | calm, curious and sceptical; warns that “The instruments of darkness tell us truths” to betray us |\n\n> “If chance will have me king, why, chance may crown me.” (1.3)\n\nDoes he mean it?\n\n**Duncan’s mistake (1.4)**\n- **Duncan on the traitor Cawdor:** “There’s no art / To find the mind’s construction in the face.” Then he turns to greet Macbeth\n- **The obstacle:** Duncan names his son Malcolm heir, the Prince of Cumberland\n- **Macbeth’s aside:** “Stars, hide your fires; / Let not light see my black and deep desires”`,
        `**Worked answer on the irony:** Duncan means he could not read the old Thane of Cawdor’s treachery in his face. The audience knows the *new* Thane of Cawdor, entering at that moment, is already thinking of murder. Duncan is about to make the same mistake again.\n\n**The aside:** “black and deep” shows Macbeth knows his desires are evil, before his wife says a word.`,
        `Read only the lines Macbeth says ALOUD to others in 1.3–1.4, then only his asides. In one sentence, what is he already hiding by the end of 1.4, and from whom?`],
      note: [
        ['“Fair is foul, and foul is fair” is a paradox. Nothing is what it seems.', 'Macbeth is promised the crown. Banquo is promised that his children will be kings.', 'An aside lets us hear what Macbeth hides.'],
        ['The witches’ paradox, “Fair is foul, and foul is fair,” announces the theme of appearance versus reality.', 'Macbeth is promised the crown; Banquo is promised a line of kings.', 'Banquo is a foil: same prophecy, different response.', 'Asides let us hear what Macbeth hides: “Let not light see my black and deep desires.”']],
      life: ['Has someone’s prediction about you (good or bad) ever changed what you did next? Was the result fate, or was it you?', 'Someone once predicted that I would… After that I…'],
      tryTitle: 'The horoscope test',
      tryit: [
        `**Experiment.** In the morning, read **any horoscope** (or ask a friend to predict your day in one sentence).\n\nAt the end of the day, write:\n- Did it “come true”?\n- Did **you** do anything to make it come true?`,
        `**Experiment: can a prediction steer you?**\n\n1. In the morning, read a horoscope for your sign, or ask someone to predict one thing about your day.\n2. Write the exact words down.\n3. Through the day, note every moment you thought of it, and anything you did differently because of it.\n4. In the evening, decide: did it come true? How much of that was the wording being vague (a *paradox* or a double meaning), and how much was you?\n5. Compare with Macbeth and Banquo: which of them were you today?`,
        `Read your prediction again. Underline every word that could be true in more than one way. Keep it: you will need it for equivocation in Lesson 6.`],
      exit: 'Compare how Macbeth and Banquo react to the witches.', exit1: 'What do the witches promise Macbeth?',
      terms: [
        ['paradox', 'a statement that seems impossible but holds a truth', 'a statement that seems to contradict itself but holds a truth'],
        ['prophecy', 'a statement about what will happen in the future', 'a prediction of future events, such as the witches’ greeting'],
        ['thane', 'a Scottish lord', 'a Scottish nobleman who holds land from the king'],
        ['foil', 'a character who makes another stand out by contrast', 'a character whose contrast highlights another character’s traits'],
        ['dramatic irony', 'the audience knows something a character does not', 'the audience knows something a character does not'],
        ['appearance versus reality', 'things are not what they seem', 'the theme that what looks fair may be foul']],
      q: [
        mc('“Fair is foul, and foul is fair” is an example of:', 'paradox', ['hyperbole', 'comic relief', 'a recipe']),
        mc('At the start of the play, Macbeth is Thane of:', 'Glamis', ['Cawdor', 'Fife', 'Toronto']),
        mc('The witches tell Banquo that he will:', 'father a line of kings', ['be king himself', 'betray Macbeth', 'win a horse']),
        mc('Whom does Duncan name as heir to the throne?', 'Malcolm', ['Macbeth', 'Donalbain', 'the First Witch']),
        mc('“Stars, hide your fires; / Let not light see my black and deep desires.” This aside shows that Macbeth:', 'already has dark desires and wants to hide them', ['is afraid of the dark', 'wants to study astronomy', 'has forgiven the witches']),
        tf('Banquo hears the witches’ prophecy but does not act on it.', true),
        tfx('The idea of murder first appears in Macbeth’s asides after the prophecy in 1.3.', 'Macbeth decides to murder Duncan before he ever meets the witches.'),
        fill('Banquo is a ___ for Macbeth: he hears the same prophecy and responds differently.', 'foil', ['thane', 'witch', 'king']),
        app('A slogan says, “Less is more.” Like the witches’ chant, this is:', 'a paradox', ['an aside', 'dramatic irony', 'blank verse']),
        app('Two teammates are both told by a scout, “You could go pro.” One keeps training steadily; the other starts cheating to make sure of it. In the play’s terms, the first teammate is the second one’s:', 'foil, as Banquo is to Macbeth', ['thane', 'prophecy', 'soliloquy']),
        app('A manager says, “You can never tell a traitor by his face,” while warmly promoting the employee who is planning to take his job. The audience feels:', 'dramatic irony, as with Duncan in 1.4', ['comic relief', 'catharsis', 'a paradox'])
      ],
      task: T('Lesson 2 task: The prophecy and the aside', [
        'Answer in one sentence each. (1) What do the witches promise Macbeth? (2) What do they promise Banquo? (3) Who is more excited by it: Macbeth or Banquo?',
        'List the three titles the witches use to greet Macbeth and say which he already holds. State what they predict for Banquo. Define “paradox” with an example from Act 1. Compare how Macbeth and Banquo react.',
        'Complete the Level 2 task. Explain the dramatic irony when Duncan says, “There’s no art / To find the mind’s construction in the face.” Then answer: what does the aside “Stars, hide your fires; / Let not light see my black and deep desires” reveal about Macbeth at this point?',
        'Complete the Level 3 task. Then argue, with one quotation, whether the witches plant the idea of murder or only reveal what Macbeth already wanted.'],
        'The aside reveals that Macbeth…',
        ['He will be king; Banquo’s children will be kings; Macbeth is more excited (Banquo is careful).',
         'Glamis (held), Cawdor, king hereafter; Banquo will father kings; paradox defined with an example; reactions compared (rapt vs. sceptical); the irony explained (Duncan trusts the next traitor); the aside read through its words: “black and deep,” hiding from light.'], 'B1, B2'),
      media: [
        M(1, 'video', 'Free Will, Witches, Murder, and Macbeth, Part 1 (Crash Course Literature #409)', 'Crash Course (John Green)', 'https://thecrashcourse.com', 'History vs. Shakespeare; fate and free will. It summarizes the whole plot: watch the first half now.', 13),
        M(2, 'image', 'Macbeth and Banquo meeting the witches (Théodore Chassériau, 1855)', 'Musée d’Orsay / Wikimedia Commons', 'https://commons.wikimedia.org', 'One painter’s staging of 1.3: compare with your own.')]
    }),

    L(3, 'The Serpent Under It', 'The Serpent Under It (Act 1, scenes 5–7)', {
      exp: 'B1 Reading for Meaning (B1 critical literacy) · B2 Understanding Form and Style · A1 Listening to Understand',
      goals: ['Analyze Lady Macbeth’s character through her soliloquy', 'Identify the techniques she uses to persuade Macbeth', 'Explain how the play connects ambition, gender and power'],
      warm: [
        `Think of a time someone talked you into something you had decided NOT to do.\n\nWhat did they say that worked?`,
        `**Warm-up: talked into it.** Think of a time someone talked you into something you had decided not to do. What did they say that worked?\n\nWhat does it mean to tell someone to “be a man”? Who gets to define that?`],
      ideasTitle: 'Enter Lady Macbeth; Macbeth argues with himself',
      ideas: [
        `**Lady Macbeth** reads Macbeth’s letter about the witches.\n\nShe worries he is too kind: “too full o’ th’ milk of human kindness.”\n\nShe tells him:\n> “Look like th’ innocent flower, / But be the serpent under ’t.”\n\n(Look harmless. Be deadly.)\n\n**Macbeth** thinks it over alone. Duncan is his **king**, his **relative** and his **guest**. He admits the only thing pushing him is “**vaulting ambition**.” He decides **not** to do it.\n\nA **motif** is an image that keeps coming back: darkness, blood, sleep.`,
        `**Enter Lady Macbeth (1.5)**\n- **Her entrance:** alone, reading Macbeth’s letter aloud. We meet her through his words to her\n- **Her fear:** that his nature “is too full o’ th’ milk of human kindness” to seize the crown\n- **Her resolve:** she will “pour my spirits in thine ear”\n- **Her instruction:** “Look like th’ innocent flower, / But be the serpent under ’t”\n\n**Close reading, “unsex me here”:** “Come, you spirits / That tend on mortal thoughts, unsex me here.” Who is she calling on? What does she ask them to take away, and what does she want in its place? Is this strength, or fear that she is not strong enough?\n\n**Macbeth argues with himself (1.7)**\n- **The soliloquy:** “If it were done when ’tis done, then ’twere well / It were done quickly.” If only murder had no consequences\n- **Reasons against:** Duncan is his king, his kinsman and his guest, and has been a good ruler\n- **His honest verdict:** “I have no spur / To prick the sides of my intent, but only / Vaulting ambition”\n- **His decision:** he tells his wife they will go no further\n\n**Motif:** a recurring image. Start a list: darkness, blood, sleep, and false appearances.`,
        `**Hamartia:** Macbeth names his own fatal flaw before he acts on it. That is what makes him tragic and not merely wicked.\n\n**The serpent line and the theme:** pleasant surfaces hide treachery (“Fair is foul”); the serpent also suggests temptation.`,
        `In her soliloquy Lady Macbeth links cruelty with manhood. What does she believe about women and cruelty, and about men? Read the speech through the feminist lens from Unit 2.`],
      textTitle: 'How she wins (1.7)', textIcon: '🐍',
      text: [
        `Macbeth says no. Lady Macbeth changes his mind. **How?**\n\n1. She says he is a **coward**.\n2. She says he is **not a man**: “When you durst do it, then you were a man.”\n3. She says **she** would never break a promise like this.\n4. She gives him a **plan**: get Duncan’s two guards drunk and blame them.\n\n“Screw your courage to the sticking place.”\n\nMacbeth agrees. Act 1 ends:\n> “False face must hide what the false heart doth know.”`,
        `**How she wins**\n| Technique | In the scene |\n| She attacks his courage | is he afraid to act on what he desires? |\n| She attacks his manhood | “When you durst do it, then you were a man” |\n| She shames him with her own resolve | she would break any bond before a promise like his |\n| She makes it practical | she will get Duncan’s two chamberlains drunk, and they will take the blame |\n\n**Her command:** “screw your courage to the sticking place.”\n\n**Two definitions of a man.** Macbeth: “I dare do all that may become a man. / Who dares do more is none.” For him, a man has limits. For her, a man dares anything.\n\n**The scene ends:** “False face must hide what the false heart doth know.” Who has he become by the end of Act 1?`,
        `**The argument map:** list Macbeth’s reasons NOT to (king, kinsman, guest, good ruler, consequences) and draw an arrow from each of her replies to the reason it defeats. **Which of his reasons does she never answer?**`,
        `Macbeth had decided against the murder. Does Lady Macbeth change his mind, or give him permission? Decide which single line wins the argument and defend it.`],
      note: [
        ['Lady Macbeth fears her husband is too kind to take the crown.', 'Macbeth names his flaw: “vaulting ambition.”', 'She wins by attacking his courage and manhood, and by giving a plan.'],
        ['Lady Macbeth fears her husband is “too full o’ th’ milk of human kindness” and resolves to drive him on.', 'In her soliloquy she asks spirits to “unsex” her, linking cruelty with manhood.', 'In 1.7 Macbeth names his flaw: “Vaulting ambition.”', 'She persuades him by attacking his courage and manhood, and by supplying a plan.']],
      life: ['When were you last talked into something you had decided against? Which of Lady Macbeth’s four techniques was used on you?', 'I was talked into… The technique that worked on me was…'],
      tryTitle: 'The persuasion log',
      tryit: [
        `**Experiment.** For one day, notice every time someone tries to **change your mind**: a friend, an ad, a parent, a video.\n\nWrite down **three**.\n\nFor each: did they use **shame** (“everyone else is…”), a **dare** (“are you scared?”), or a **plan** (“it’s easy, just…”)?`,
        `**Experiment: who is persuading you, and how?**\n\n1. For one day, log every attempt to persuade you: advertisements, friends, family, influencers, notifications. Aim for at least six.\n2. Label each with a technique: attacks your courage · attacks your identity (“a real ___ would…”) · shames you by comparison · makes it practical (“it’s easy, just…”).\n3. Mark which ones worked.\n4. Pick the most effective one and map it like 1.7: your reasons not to, their replies, and the reason they never answered.`,
        `Rewrite the most effective attempt as two lines of blank verse in Lady Macbeth’s voice. What did you have to add to make it sound like her?`],
      exit: 'Identify TWO techniques Lady Macbeth uses to persuade Macbeth in 1.7.', exit1: 'Does Macbeth want to kill Duncan at the start of 1.7? Who changes his mind?',
      terms: [
        ['motif', 'an image or idea that keeps coming back', 'a recurring image or idea that builds meaning'],
        ['ambition', 'a strong wish for power or success', 'a strong desire for power or success; Macbeth calls his “vaulting”'],
        ['persuasion', 'getting someone to agree or act', 'the act of moving someone to believe or do something'],
        ['kinsman', 'a relative', 'a relative; Duncan is Macbeth’s kinsman as well as his king'],
        ['hamartia', 'a fatal flaw', 'the fatal flaw or error of judgment'],
        ['chamberlains', 'the servants who guard the king’s bedroom', 'the grooms who attend and guard the king’s bedchamber']],
      q: [
        mc('Who says, “unsex me here”?', 'Lady Macbeth', ['the First Witch', 'Lady Macduff', 'King Duncan']),
        mc('In his 1.7 soliloquy, Macbeth says the only thing driving him is:', 'vaulting ambition', ['revenge', 'love of Scotland', 'boredom']),
        mc('Lady Macbeth’s plan is to:', 'get Duncan’s chamberlains drunk and blame them', ['ambush Duncan on the road', 'poison Duncan at dinner', 'send Duncan a text']),
        mc('“Look like th’ innocent flower, / But be the serpent under ’t” connects most directly to which theme?', 'Appearance versus reality', ['Fate and free will', 'Order and disorder', 'Gardening']),
        mc('Which is NOT one of Macbeth’s reasons against killing Duncan?', 'Duncan has insulted him', ['Duncan is his guest', 'Duncan is his kinsman', 'Duncan is his king']),
        tf('Lady Macbeth learns about the prophecy from a letter Macbeth sends her.', true),
        tfx('At the start of 1.7, Macbeth decides not to go through with the murder.', 'Macbeth never has any doubts about killing Duncan.'),
        fill('Lady Macbeth fears her husband is “too full o’ th’ milk of human ___.”', 'kindness', ['ambition', 'courage', 'chocolate']),
        app('A friend who wants you to skip class says, “What, are you scared? I thought you were fun.” Which of Lady Macbeth’s techniques is this?', 'Attacking your courage and your identity', ['Offering a practical plan', 'Naming your hamartia', 'Using dramatic irony']),
        app('A scam website looks exactly like your bank’s login page. Which line from the play describes it best?', '“Look like th’ innocent flower, / But be the serpent under ’t”', ['“Screw your courage to the sticking place”', '“If chance will have me king”', '“So foul and fair a day”']),
        app('A politician lists every reason a policy is wrong, then votes for it “because my party needs the win.” Like Macbeth in 1.7, the politician has:', 'named the right reasons and then let ambition overrule them', ['been tricked by witches', 'used comic relief', 'spoken an aside'])
      ],
      task: T('Lesson 3 task: The argument map', [
        'Write two reasons Macbeth gives for NOT killing Duncan. Then write two things Lady Macbeth says or does to change his mind.',
        'Explain how Lady Macbeth learns about the prophecy and her main worry about her husband. Give TWO reasons Macbeth lists in 1.7 for not killing Duncan. Define “motif” and name TWO motifs introduced in Act 1.',
        'Complete the Level 2 task. Explain the advice “Look like th’ innocent flower, / But be the serpent under ’t” and connect it to a theme. Identify TWO techniques Lady Macbeth uses to persuade Macbeth, with an example. Then answer: at the end of Act 1, who is more responsible for the plan: Macbeth, Lady Macbeth or the witches?',
        'Complete the Level 3 task. Then draw the full argument map for 1.7 (his reasons, her replies, with quotations), identify the reason she never answers, and explain why that silence matters.'],
        'Lady Macbeth persuades him by…',
        ['Reasons such as “Duncan is my king / my guest / my relative”; she calls him a coward or not a man, and gives a plan.',
         'The letter and “milk of human kindness”; two reasons (king, kinsman, guest, good ruler); motif defined with two examples; the serpent line tied to appearance versus reality; two techniques with an example (“When you durst do it, then you were a man”); a position on responsibility supported by a moment from Act 1.'], 'B1, B2'),
      media: [
        M(2, 'image', 'Ellen Terry as Lady Macbeth (John Singer Sargent, 1889)', 'Tate Britain / Wikimedia Commons', 'https://commons.wikimedia.org', 'A famous image of Lady Macbeth holding the crown: what does this staging argue?'),
        M(1, 'image', 'Macbeth, Act 1, scene 5: the full text of the soliloquy', 'Folger Shakespeare', FOLGER, 'The speech that begins “The raven himself is hoarse,” for close reading.')]
    }),

    L(4, 'Blood & Sleep', 'Blood and Sleep (Act 2)', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · B3 Reading With Fluency',
      goals: ['Analyze the dagger soliloquy as a window into Macbeth’s mind', 'Trace the motifs of blood and sleep through Act 2', 'Explain the purpose of the Porter scene and of the unnatural events'],
      warm: [
        `Why is it so hard to sleep when you feel guilty or worried?\n\nScary movies often do not show the worst moment. Why can that be scarier?`,
        `**Warm-up: what keeps you awake.** Why is it so hard to sleep when you feel guilty or anxious?\n\nHorror films often keep the worst moment off screen. Why can that be more frightening?`],
      ideasTitle: 'The deed; two views of blood; knocking at the gate',
      ideas: [
        `**The murder happens offstage.** We do not see it. We see what it does to them.\n\n- Lady Macbeth could not do it: the king looked like her father asleep.\n- Macbeth comes back with the **daggers** still in his hands.\n- He hears a voice: “**Sleep no more! Macbeth does murder sleep.**”\n\n**Blood:**\n- Macbeth: a whole **ocean** could not wash my hand clean.\n- Lady Macbeth: “**A little water** clears us of this deed.”\n\nRemember her line. It comes back in Act 5.`,
        `**The deed (2.2)**\n- **Offstage:** we never see Duncan die; we see what it does to the two people who did it\n- **Lady Macbeth** could not do it herself: “Had he not resembled / My father as he slept, I had done ’t”\n- **Macbeth** returns with the daggers still in his hands and will not go back\n- **A voice:** “Sleep no more! / Macbeth does murder sleep”\n- **She takes charge:** returns the daggers and smears the sleeping grooms with blood\n\n**Two views of blood**\n| Macbeth | Lady Macbeth |\n| “Will all great Neptune’s ocean wash this blood / Clean from my hand?” He believes the stain is permanent | “A little water clears us of this deed.” She believes it is a practical problem |\n\nAnd yet she says: “My hands are of your color, but I shame / To wear a heart so white.” His **hyperbole** measures his guilt.\n\n**Knocking at the gate (2.3–2.4)**\n- **The Porter:** a drunken gatekeeper imagines he is the porter of hell: “Knock, knock, knock! Who’s there?”\n- **Comic relief:** a comic moment that releases tension, and here sharpens the horror: this castle IS a kind of hell\n- **Discovery:** Macduff finds the body; Macbeth kills the two grooms before they can speak\n- **Flight:** Malcolm goes to England, Donalbain to Ireland: “There’s daggers in men’s smiles”\n- **Nature rebels:** darkness at midday; Macbeth is to be crowned, and Macduff will not attend`,
        `**Remember her line:** “A little water clears us of this deed.” You will hear its echo in Act 5.\n\n**Why offstage?** It keeps attention on the murderers’ guilt and fear, not on violence; the audience’s imagination makes it worse; and showing the killing of a king before King James would have been risky.`,
        `Macbeth cannot say “Amen.” Lady Macbeth says not to think about it. Whose reaction is more human? Sleep is called innocent and healing in this scene: what, exactly, has Macbeth lost?`],
      textTitle: 'Close reading: the dagger soliloquy (2.1)', textIcon: '🗡️',
      textHtml: poem('Macbeth, 2.1 (opening of the soliloquy)', [
        ['Is this a dagger which I see before me,', 'The handle toward my hand? Come, let me clutch thee.', 'I have thee not, and yet I see thee still.', 'Art thou not, fatal vision, sensible', 'To feeling as to sight? Or art thou but', 'A dagger of the mind, a false creation']], 'William Shakespeare, Macbeth (Folger edition).'),
      text: [
        `Before the murder, Macbeth is alone. He sees a **dagger floating in the air**. The handle points at his hand.\n\nHe tries to grab it. He cannot. Is it real?\n\nHe decides it may be “**a dagger of the mind**”: something his own guilty brain made up.\n\nRead the six lines below aloud. Count the **questions**. A man who asks that many questions is not sure of anything.`,
        `Read the lines below aloud.\n\n- **Four questions in six lines.** What state of mind is that?\n- Which way is the handle pointing?\n- “A dagger of the mind”: is it sent by the witches, or made by his own guilt?\n- Scan line 1. Then line 2. Where does the regular beat break?\n\n**What the speech shows:** a mind already divided. He sees what he wants and fears, cannot touch it, and names it himself: “a false creation.”`,
        `**Motif tracker (start it now):** four motifs: blood, sleep, darkness, false appearances. For each, three quotations from Acts 1 and 2 with act and scene, and what the image suggests at that moment. You will add to it every act.`,
        `Line 1 scans as almost perfect iambic pentameter; line 2 has an extra syllable and a mid-line stop. Explain how the rhythm acts out what is happening in Macbeth’s mind.`],
      note: [
        ['Macbeth sees a “dagger of the mind” before the murder.', 'The murder is offstage. The scene is about guilt.', 'Blood and sleep are motifs: he fears he can never be clean or rest again.'],
        ['The dagger soliloquy shows a mind already divided: “A dagger of the mind, a false creation.”', 'The murder is offstage; the scene is about guilt, not gore.', 'Blood and sleep become motifs: Macbeth fears he can never be clean or rest again.', 'The Porter provides comic relief and turns the castle into hell’s gate; nature itself reacts to the regicide.']],
      life: ['What is one thing that has kept you awake at night? Was it guilt, worry, or something else, and what did it take to sleep again?', 'Something that kept me awake was… What helped was…'],
      tryTitle: 'Track a motif',
      tryit: [
        `**Experiment.** Pick a show, movie, album or game you know well.\n\nFind **one picture, colour, object or word that keeps coming back** (rain, a red coat, a song, a clock).\n\nWrite down **two times** it appears. What does it mean each time?\n\nThat is a **motif**.`,
        `**Experiment: can you find a motif in something you already love?**\n\n1. Choose a series, film, album or game you know well.\n2. Identify one recurring image, object, colour, sound or phrase.\n3. Record three appearances (episode, track or scene).\n4. Beside each, write what it suggests at that moment. Does the meaning change, as blood does from honour to guilt?\n5. Then start your *Macbeth* tracker: three quotations for ONE of blood, sleep, darkness or false appearances from Acts 1–2, with act and scene.`,
        `Describe a frightening event in five sentences without showing the event itself: only the minute before and the minute after. Read it to someone and record what they imagined.`],
      exit: 'Compare Macbeth’s and Lady Macbeth’s attitudes to the blood on their hands. Quote one line from each.', exit1: 'What does Macbeth see in the air before the murder?',
      terms: [
        ['comic relief', 'a funny moment that gives a break from the tension', 'a humorous moment that releases tension in a serious work'],
        ['hyperbole', 'a big exaggeration', 'deliberate exaggeration for effect'],
        ['offstage', 'happening where the audience cannot see', 'happening out of the audience’s sight, as Duncan’s murder does'],
        ['hallucination', 'seeing something that is not really there', 'a vision of something not present, such as the “dagger of the mind”'],
        ['grooms', 'the king’s bedroom servants', 'the servants who sleep in the king’s chamber; Lady Macbeth smears them with blood'],
        ['Porter', 'the gatekeeper of the castle', 'the drunken gatekeeper who imagines he keeps the gate of hell']],
      q: [
        mc('Before he murders Duncan, Macbeth sees:', 'a dagger in the air', ['Banquo’s ghost', 'a bloody child', 'a rainbow']),
        mc('Who discovers Duncan’s body?', 'Macduff', ['Lennox', 'Malcolm', 'the audience']),
        mc('After the murder, Malcolm flees to:', 'England', ['Ireland', 'Norway', 'Florida']),
        mc('“A little water clears us of this deed” is spoken by:', 'Lady Macbeth', ['Macbeth', 'the Porter', 'Banquo']),
        mc('Why does Lady Macbeth not kill Duncan herself?', 'He resembled her father as he slept', ['She could not find the daggers', 'Macbeth forbade it', 'She overslept']),
        tf('The murder of Duncan takes place offstage.', true),
        tf('The Porter scene is an example of comic relief.', true),
        tfx('Macbeth kills Duncan; Lady Macbeth returns the daggers.', 'Lady Macbeth kills Duncan herself.'),
        fill('A voice cries, “Sleep no more! Macbeth does murder ___.”', 'sleep', ['kings', 'time', 'breakfast']),
        app('In a tense thriller, a clumsy security guard tells a joke just before the bomb is found. The laugh makes the next scare land harder. The guard provides:', 'comic relief', ['a soliloquy', 'equivocation', 'an aside']),
        app('“I’ve told you a billion times: this stain is never coming out, not if I scrub till the sun burns out.” Like Macbeth’s “Neptune’s ocean,” the speaker uses:', 'hyperbole to show how strongly they feel', ['paradox to hide the truth', 'blank verse', 'dramatic irony']),
        app('A film cuts from a hand on a door handle to the character sitting alone, shaking, an hour later. The director has chosen to:', 'keep the act offstage and show its effect', ['use comic relief', 'add a motif of sleep', 'restore order'])
      ],
      task: T('Lesson 4 task: Blood on their hands', [
        'Who says it: Macbeth or Lady Macbeth? (1) “A little water clears us of this deed.” (2) “Will all great Neptune’s ocean wash this blood clean from my hand?” Then finish: “Macbeth feels… but Lady Macbeth feels…”',
        'Explain what Macbeth sees before the murder and how he explains it. Explain why Lady Macbeth does not kill Duncan herself, and what she does afterward that Macbeth will not. Complete the chart: what do Macduff, Macbeth, and Malcolm and Donalbain do after the murder is discovered?',
        'Complete the Level 2 task. Compare Macbeth’s and Lady Macbeth’s attitudes to the blood on their hands, quoting one line from each. Explain what comic relief is and the purpose of the Porter. Why does Shakespeare keep the murder offstage?',
        'Complete the Level 3 task. Then hand in your motif tracker for ONE motif (three quotations from Acts 1–2 with act and scene, and what each suggests).'],
        'Macbeth believes the blood… while Lady Macbeth believes…',
        ['1 = Lady Macbeth, 2 = Macbeth; he feels guilty forever, she thinks it is easy to fix.',
         'The dagger (“a dagger of the mind”); Duncan resembled her father, and she returns the daggers; Macduff raises the alarm, Macbeth kills the grooms, the sons flee; the two blood lines compared (permanent stain vs. practical problem); the Porter releases tension and makes the castle hell’s gate.'], 'B1, B2'),
      media: [
        M(2, 'image', 'Macbeth, Act 2, scene 1: the dagger soliloquy (full text)', 'Folger Shakespeare', FOLGER, 'The whole speech for scanning and annotation.'),
        M(1, 'image', 'Lady Macbeth Seizing the Daggers (Henry Fuseli, 1812)', 'Tate / Wikimedia Commons', 'https://commons.wikimedia.org', 'One artist’s staging of 2.2: who has the power in this picture?')]
    }),

    L(5, 'Blood Will Have Blood', 'Blood Will Have Blood (Act 3)', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · A2 Speaking to Communicate',
      goals: ['Explain why Macbeth turns on Banquo and what the second murder costs him', 'Describe how the relationship between Macbeth and Lady Macbeth changes', 'Identify the banquet scene as the play’s turning point'],
      warm: [
        `Think of someone (real or in a story) who got exactly what they wanted and was **still not happy**.\n\nWhy not?`,
        `**Warm-up: is it ever enough?** Think of someone, real or fictional, who got exactly what they wanted and was still not satisfied. Why not?\n\nWhy are people who gain power dishonestly so often suspicious of everyone else?`],
      ideasTitle: 'The insecure king; a marriage changes',
      ideas: [
        `Macbeth is king now. He is **not happy**. He is **afraid**.\n\n- **Banquo** suspects him.\n- The witches said **Banquo’s sons** will be kings. Macbeth has no son: a “fruitless crown.”\n- So he **hires murderers** to kill Banquo and his son Fleance.\n\n**The marriage changes:**\n- Act 1: they plan together. **She** leads.\n- Act 3: **he** plans alone and tells her nothing.\n\n“O, full of scorpions is my mind, dear wife!”`,
        `**The insecure king (3.1–3.2)**\n- **Banquo suspects:** “Thou hast it now—king, Cawdor, Glamis, all / As the Weïrd Women promised”\n- **Macbeth’s fear:** “To be thus is nothing, / But to be safely thus”\n- **His grievance:** “Upon my head they placed a fruitless crown”: he has no heir, and Banquo’s sons will be kings\n- **His method:** he hires murderers and persuades them that Banquo is their enemy\n- **His mind:** “O, full of scorpions is my mind, dear wife!”\n\n**A marriage changes**\n| Act 1 | Act 3 |\n| they plan together; she leads | he plans alone and tells her nothing: “Be innocent of the knowledge, dearest chuck” |\n| she urges him on | her loneliness: “Naught’s had, all’s spent, / Where our desire is got without content” |\n\nHer advice: “What’s done is done.”`,
        `**Role reversal:** he has become the cold planner she wanted. She has begun to feel what he felt in Act 2.\n\n**Then and now frame:** “The biggest change in Macbeth is ___, shown when he says ‘___.’”`,
        `Macbeth uses Lady Macbeth’s own techniques from 1.7 on the hired murderers. Find the parallel and explain what it shows about what he has learned.`],
      textTitle: 'The banquet (3.4): the turning point', textIcon: '🍷',
      text: [
        `The murderers kill Banquo. But **Fleance escapes**.\n\nAt a big dinner, Macbeth sees **Banquo’s ghost** sitting in his chair. **No one else can see it.**\n\nHe shouts at it in front of all the lords: “Never shake / Thy gory locks at me.”\n\nLady Macbeth says he is ill and sends everyone home.\n\nMacbeth says: “**Blood will have blood.**” Killing leads to more killing.\n\nThis is the **climax**. Until now he was rising. From here he falls.`,
        `**Read 3.4 in roles** (Macbeth, Lady Macbeth, Murderer, Ross, Lennox, Lords).\n- The news at the door: Banquo is dead, but who has escaped?\n- “Thou canst not say I did it. Never shake / Thy gory locks at me.” Who can see the ghost?\n- How does Lady Macbeth try to rescue the evening?\n- **Staging question:** should the audience see the ghost, or an empty chair?\n\n**The turning point**\n- **Fleance escapes:** the prophecy about Banquo’s line is still alive; Macbeth’s plan has failed\n- **Public exposure:** the whole court has watched its king rave about blood\n- **No way back:** “I am in blood / Stepped in so far” that returning would be as hard as going on\n- **A grim law:** “It will have blood, they say; blood will have blood”\n- **Opposition:** Macduff has refused the feast and gone to England`,
        `**Climax:** up to here Macbeth rises. From here he falls. The banquet is the peak of Freytag’s pyramid.\n\n**Discussion:** Macbeth did not flinch at killing men in battle. Why does this ghost undo him?`,
        `By the end of the scene Macbeth says he will visit the witches again. In Act 1 they sought him; now he seeks them. What does that reversal tell you about fate and free will?`],
      note: [
        ['Being king does not make Macbeth happy or safe.', 'He has Banquo killed, but Fleance escapes.', 'The banquet is the turning point: “blood will have blood.”'],
        ['The crown does not satisfy Macbeth: “To be thus is nothing, / But to be safely thus.”', 'He has Banquo murdered, but Fleance escapes.', 'The Macbeths reverse roles: he plans alone; she is shut out.', 'The banquet scene is the climax: “blood will have blood,” and there is no way back.']],
      life: ['What is something you wanted badly, got, and then found was not enough? What did you want next?', 'Something I wanted and got was… It was not enough because…'],
      tryTitle: 'Then and now',
      tryit: [
        `**Experiment.** Make two columns: **Me a year ago** and **Me now**.\n\nFill in three rows:\n- What I wanted most\n- What I was afraid of\n- Who I told things to\n\nWhat is the biggest change?`,
        `**Experiment: measure a change.**\n\n1. Make a two-column chart about yourself: “A year ago” and “Now.”\n2. Four rows: how I decide things · who I confide in · what I fear · what I want.\n3. Write one sentence: “The biggest change in me is ___, shown when I ___.”\n4. Now make the same chart for Macbeth (Act 1 and Act 3): how he decides, how he treats his wife, what he fears, how he feels about killing. Add a shorter one for Lady Macbeth.\n5. Finish: “The biggest change in Macbeth is ___, shown when he says ‘___.’”`,
        `Ask someone who has known you for over a year to fill in the “A year ago” column *about you* without seeing yours. Record one difference between their account and your own.`],
      exit: 'Why is the banquet scene considered the turning point (climax) of the play?', exit1: 'Who escapes from the murderers?',
      terms: [
        ['climax', 'the turning point of a play', 'the turning point of a play'],
        ['tyrant', 'a cruel ruler who uses fear', 'a ruler who holds power through cruelty and fear'],
        ['heir', 'the person who will be next to rule', 'the person who will inherit a title or throne'],
        ['role reversal', 'when two people switch places', 'an exchange of positions between characters, as the Macbeths switch between Acts 1 and 3'],
        ['insecurity', 'not feeling safe', 'a lack of safety or confidence; Macbeth’s state once he is king']],
      q: [
        mc('Who escapes the murderers in Act 3?', 'Fleance', ['Banquo', 'Macduff', 'Duncan']),
        mc('What does Macbeth see at the banquet?', 'Banquo’s ghost', ['a floating dagger', 'the witches', 'a birthday cake']),
        mc('“Upon my head they placed a fruitless crown” means that Macbeth:', 'has no heir, while Banquo’s sons are promised the throne', ['dislikes the look of the crown', 'wants to give up being king', 'is allergic to fruit']),
        mc('“It will have blood, they say; blood will have blood” means:', 'murder leads to more murder', ['wounds heal with time', 'kings must be related by blood', 'dinner is ready']),
        mc('How does Lady Macbeth explain her husband’s behaviour at the banquet?', 'As an old illness he has had since youth', ['As a joke', 'As a message from the witches', 'As a dance']),
        tfx('Macbeth keeps his plan to kill Banquo from Lady Macbeth.', 'Macbeth tells Lady Macbeth every detail of his plan to kill Banquo.'),
        tfx('Only Macbeth can see Banquo’s ghost at the banquet.', 'All of the guests at the banquet can see Banquo’s ghost.'),
        fill('“To be thus is nothing, / But to be ___ thus.”', 'safely', ['richly', 'quickly', 'loudly']),
        app('A student cheats to become class president, then becomes so worried about being found out that he starts spreading rumours about his closest friend. Which line fits him best?', '“To be thus is nothing, / But to be safely thus”', ['“A little water clears us of this deed”', '“Fair is foul, and foul is fair”', '“Lay on, Macduff”']),
        app('A director stages the banquet with an empty chair and a spotlight. This choice argues that:', 'the ghost is a creation of Macbeth’s guilt', ['the ghost is certainly real', 'the lords are lying', 'Lady Macbeth sees it too']),
        app('A company covers up one accounting lie with a second, larger one, then a third. An analyst says, “They’re in too deep to turn back.” This echoes:', '“I am in blood / Stepped in so far”', ['“Stars, hide your fires”', '“Look like th’ innocent flower”', '“What’s done is done”'])
      ],
      task: T('Lesson 5 task: The turning point', [
        'Answer in one sentence each. (1) Why does Macbeth want Banquo dead? (2) What goes wrong? (3) What does Macbeth see at the dinner?',
        'Give TWO reasons Macbeth has Banquo killed. Explain what goes wrong with the attack and why it matters. Describe what happens at the banquet.',
        'Complete the Level 2 task. Explain how the relationship between Macbeth and Lady Macbeth has changed since Act 1, using one quotation. Explain why the banquet scene is the turning point. Then answer: “blood will have blood.” What does Macbeth mean, and is he right?',
        'Complete the Level 3 task. Then decide, as a director, whether the audience should see Banquo’s ghost or an empty chair, and defend your choice from the text of 3.4.'],
        'The banquet is the turning point because…',
        ['Banquo suspects him and Banquo’s sons are promised the throne; Fleance escapes; he sees Banquo’s ghost.',
         'Two reasons (the prophecy, the “fruitless crown,” Banquo’s suspicion); Fleance’s escape keeps the prophecy alive; the banquet described; the role reversal with a quotation (“Be innocent of the knowledge, dearest chuck”); the climax explained (plan fails, guilt exposed, “Stepped in so far”).'], 'B1, B2'),
      media: [
        M(2, 'image', 'Macbeth seeing the ghost of Banquo (Théodore Chassériau, 1854)', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'A painter who chose to show the ghost. Compare with an empty-chair staging.'),
        M(2, 'video', 'The banquet scene (3.4) in two productions', 'Stratford Festival / National Theatre (teacher’s choice; preview first)', 'https://www.stratfordfestival.ca', 'Two directors’ answers to “do we see the ghost?”', 6)]
    }),

    L(6, 'Something Wicked', 'Something Wicked (Act 4)', {
      exp: 'B1 Reading for Meaning (B1 critical literacy) · B2 Understanding Form and Style · A1 Listening to Understand',
      goals: ['Explain how the apparitions equivocate and why Macbeth believes them', 'Recognize the murder of Macduff’s family as Macbeth’s moral low point', 'Compare the play’s ideas of manhood: Lady Macbeth’s, Macbeth’s and Macduff’s'],
      warm: [
        `Give an example of something that is **technically true** but tricks you. (“Up to 50% off!”)\n\nWhy do we believe good news more easily than bad news?`,
        `**Warm-up: technically true.** Give an example of a statement that is technically true and completely misleading.\n\nWhy do we believe good news so much more easily than bad?`],
      ideasTitle: 'Three apparitions and equivocation',
      ideas: [
        `Macbeth goes back to the witches. They show him **three visions**:\n\n| Vision | What it says |\n| A head in armour | Beware Macduff! |\n| A bloody child | No one **born of a woman** can hurt you |\n| A crowned child with a tree | You are safe until **Birnam Wood** comes to Dunsinane Hill |\n\nMacbeth thinks: everyone is born of a woman, and forests cannot walk. So I am safe!\n\n**Equivocation** = words that are true in one way but meant to trick you.`,
        `**Three apparitions (4.1)**\n- **The witches:** “By the pricking of my thumbs, / Something wicked this way comes.” They now call HIM the wicked thing\n\n| Apparition | What it says |\n| An Armed Head | “Beware Macduff! / Beware the Thane of Fife!” |\n| A Bloody Child | “none of woman born / Shall harm Macbeth” |\n| A Child Crowned, with a tree in his hand | safe until “Great Birnam Wood to high Dunsinane Hill / Shall come against him” |\n\n- **A last vision:** a line of eight kings, and Banquo’s ghost\n\n**Equivocation**\n- **Equivocation:** deliberately ambiguous language: words that are true in one sense and deceive in another\n- **In 1606** it was a charged word: a priest tried after the Gunpowder Plot had defended equivocating under oath. The Porter jokes about an “equivocator” at hell’s gate\n- **False security:** Macbeth hears only the meaning he wants and decides he cannot be beaten\n- **Remember Banquo:** “The instruments of darkness tell us truths” in order to betray`,
        `**How the false security works:** everyone is born of a woman and forests cannot walk, so Macbeth concludes he can never be killed or defeated. He takes the words in their most obvious sense and never considers another.`,
        `The first apparition warns Macbeth; the next two reassure him. Why does he act on the warning AND trust the reassurance? What do the apparitions’ shapes (an armed head, a bloody child, a crowned child with a tree) hint at?`],
      textTitle: 'The tyrant, and Macduff’s grief (4.2–4.3)', textIcon: '🏰',
      text: [
        `Macbeth gives an order: attack Macduff’s castle. Kill his **wife and children**.\n\nBut Macduff is already in England. The murders gain Macbeth **nothing**. This is his lowest point.\n\nIn England, Macduff hears the news. Malcolm says: “Dispute it like a man.”\n\nMacduff answers:\n> “I shall do so, / But I must also feel it as a man.”\n\nFor Macduff, a real man **feels**. That is the opposite of what Lady Macbeth said in Act 1.`,
        `**The tyrant (4.1–4.2)**\n- **A new rule:** from now on he will act on his first impulse, without thought\n- **The order:** “The castle of Macduff I will surprise,” and kill his wife, his children and all his line\n- **No purpose:** Macduff is already in England. The murders gain Macbeth nothing\n- **On stage:** this time Shakespeare shows us the killing of a child\n\n**Measure the fall:** Duncan: agonized over. Banquo: arranged through others, for a reason. Macduff’s family: ordered in an instant, for none.\n\n**Close reading: Macduff’s grief (4.3)**\n> “What, all my pretty chickens and their dam / At one fell swoop?”\n\nWhy does he keep asking? Malcolm: “Dispute it like a man.” Macduff: “I shall do so, / But I must also feel it as a man.”\n\n**A different kind of man, a different kind of king**\n- **Malcolm’s test:** he pretends to be lustful and greedy to see whether Macduff serves Scotland or only wants a new master. Macduff despairs for his country; Malcolm takes it all back\n- **Foil:** Macduff is everything Macbeth has stopped being: loyal, feeling, acting for others`,
        `**Manhood redefined:** Lady Macbeth told her husband that being a man meant daring anything and silencing pity (“When you durst do it, then you were a man”). Macduff’s version includes compassion; hers excludes it.`,
        `Many readers call the murder of Lady Macduff and her son the point where we lose all sympathy for Macbeth. Do you agree, or was it lost with Banquo? Does any of it return in Act 5?`],
      note: [
        ['The visions trick Macbeth with words that are true but misleading (equivocation).', 'He has Macduff’s family killed for no reason. This is his lowest point.', 'Macduff: a real man also feels.'],
        ['The apparitions equivocate: their words are true in a sense Macbeth does not hear.', 'False confidence makes him reckless: he orders the slaughter of Macduff’s family for no gain.', 'Malcolm tests Macduff’s loyalty before trusting him.', 'Macduff offers a new definition of manhood: “I must also feel it as a man.”']],
      life: ['When did you last hear only what you wanted to hear (in a promise, an ad, a mark, a message)? What was the other meaning you missed?', 'I heard what I wanted to hear when… The meaning I missed was…'],
      tryTitle: 'Find the loophole',
      tryit: [
        `**Experiment.** Find **two** ads, labels or posts with tricky words like:\n- “up to…”\n- “from only…”\n- “may help…”\n- “9 out of 10…”\n\nFor each one, write: what do they **want** you to think? What is **really** true?`,
        `**Experiment: collect real equivocations.**\n\n1. Find three statements in advertising, packaging, terms of service or social media that are technically true and misleading (“up to 70% off,” “clinically studied,” “no added sugar”).\n2. For each, write the meaning the reader is meant to hear and the meaning that is actually true.\n3. Now be as inventive as a lawyer with the play: write the second and third prophecies exactly as worded, and brainstorm how each could be true and Macbeth still lose.\n4. Seal your best loophole for each. Open it after Act 5.`,
        `Take out the prediction you saved in Lesson 2. Rewrite it so that it is true no matter what happens. You have just written like a witch.`],
      exit: 'How do the second and third prophecies give Macbeth a false sense of security?', exit1: 'What does the bloody child tell Macbeth?',
      terms: [
        ['equivocation', 'tricky words that are true in one way but meant to fool you', 'deliberately ambiguous language meant to mislead'],
        ['apparition', 'a ghostly vision', 'a supernatural vision, such as the three the witches show Macbeth'],
        ['false security', 'feeling safe when you are not', 'unjustified confidence that makes a person careless'],
        ['manhood', 'what it means to be a man', 'the idea of what makes a man, argued over by Lady Macbeth, Macbeth and Macduff'],
        ['loyalty', 'staying true to a person or country', 'faithfulness to a person, cause or country; what Malcolm tests in Macduff'],
        ['tyranny', 'cruel and unfair rule', 'cruel and oppressive rule']],
      q: [
        mc('The second apparition, a Bloody Child, tells Macbeth that:', 'none of woman born shall harm him', ['he should beware Macduff', 'Banquo’s sons will be kings', 'he will win the lottery']),
        mc('In Act 4, Macbeth orders the murder of:', 'Macduff’s wife and children', ['Malcolm', 'the Doctor', 'the witches']),
        mc('Why is the murder of Macduff’s family pointless?', 'Macduff has already fled to England', ['They were already dead', 'Macduff is Macbeth’s ally', 'It never happens']),
        mc('Why does Malcolm pretend to be greedy and lustful?', 'To test whether Macduff is loyal to Scotland', ['Because he truly is', 'To frighten the witches', 'To win a bet']),
        mc('“I must also feel it as a man.” Macduff’s idea of manhood includes:', 'grief and compassion', ['never showing feeling', 'daring any crime', 'owning a castle']),
        tf('The first apparition warns Macbeth to beware Macduff.', true),
        tfx('Macbeth takes the prophecies in their most obvious sense and feels safe.', 'Macbeth carefully considers every possible meaning of the prophecies and trusts none of them.'),
        fill('Deliberately ambiguous language that is true in one sense and misleads in another is called ___.', 'equivocation', ['exaggeration', 'personification', 'education']),
        app('A phone plan advertises “Unlimited data*” with a footnote that speeds drop to almost nothing after 20 GB. This is closest to:', 'equivocation: true in a sense the customer does not hear', ['hyperbole', 'comic relief', 'a soliloquy']),
        app('A boy cries at a funeral and a relative says, “Be a man.” Another answers, “He is being one.” The second speaker agrees with:', 'Macduff', ['Lady Macbeth', 'Macbeth in 1.7', 'the Porter']),
        app('Before trusting a stranger who offers to help overthrow a corrupt boss, an employee pretends to want the job only for the money, to see how the stranger reacts. This copies:', 'Malcolm’s test of Macduff', ['the witches’ apparitions', 'Lady Macbeth’s soliloquy', 'the dagger speech'])
      ],
      task: T('Lesson 6 task: Prophecies and manhood', [
        'Match each vision to what it says. Visions: head in armour, bloody child, crowned child. Messages: “Beware Macduff” · “No one born of a woman can hurt you” · “You are safe until the forest moves.” Then finish: “Macbeth feels safe because…”',
        'Record what each apparition tells Macbeth. Define “equivocation.” Say what Macbeth orders after he leaves the witches and why the act is pointless.',
        'Complete the Level 2 task. Explain how the second and third prophecies give Macbeth a false sense of security. Explain why Malcolm pretends to be a worse man than he is. Then answer: what idea of manhood does Macduff express in “I must also feel it as a man,” and how does it differ from Lady Macbeth’s in Act 1?',
        'Complete the Level 3 task. Then write your best “loophole” for prophecies two and three, and argue whether a statement that is technically true can still be a lie.'],
        'Macduff’s idea of manhood is…',
        ['Head = beware Macduff; bloody child = no one born of a woman; crowned child = until the forest moves; he thinks those things are impossible.',
         'Three apparitions recorded accurately; equivocation defined; the slaughter of Macduff’s family and why it gains nothing; false security explained; Malcolm’s test; Macduff’s manhood (acts AND feels) contrasted with Lady Macbeth’s (dares anything, silences pity).'], 'B1, B2'),
      media: [
        M(1, 'image', 'Macbeth consulting the vision of the armed head (Henry Fuseli, 1793)', 'Folger Shakespeare Library / Wikimedia Commons', 'https://commons.wikimedia.org', 'The first apparition, as an 18th-century painter imagined it.'),
        M(2, 'image', 'Macbeth, Act 4, scene 3: Macduff receives the news (full text)', 'Folger Shakespeare', FOLGER, 'The “pretty chickens” passage for close reading.')]
    }),

    L(7, 'Sound & Fury', 'Sound and Fury (Act 5)', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · D1 Understanding Media Texts',
      goals: ['Analyze the sleepwalking scene as the return of buried guilt', 'Interpret the “Tomorrow” soliloquy', 'Explain how the prophecies are fulfilled and whether the ending restores order'],
      warm: [
        `Have you ever worked hard for something, got it, and found it did not mean what you thought it would?\n\nCan guilt be buried forever, or does it come back?`,
        `**Warm-up: what was it for?** Have you ever worked hard for something and found, once you had it, that it did not mean what you expected?\n\nCan guilt be buried for good, or does it always come back?`],
      ideasTitle: 'The sleepwalking scene; the prophecies come true',
      ideas: [
        `**Lady Macbeth walks in her sleep.** She rubs her hands again and again:\n> “Out, damned spot, out, I say!”\n\nShe sees blood that is not there. Her guilt has come back.\n\n**Remember Act 2?** “A little water clears us of this deed.” Now: “All the perfumes of Arabia will not sweeten this little hand.”\n\n**The prophecies come true:**\n- Soldiers carry **branches** from Birnam Wood. The forest “moves.”\n- **Macduff** was cut from his mother’s body, not “born.” He kills Macbeth.`,
        `**The sleepwalking scene (5.1)**\n- **Watched:** a Doctor and a Gentlewoman observe Lady Macbeth walking in her sleep with a candle\n- **The stain:** “Out, damned spot, out, I say!”\n- **The memory:** “Yet who would have thought the old man to have had so much blood in him?”\n- **The despair:** “All the perfumes of Arabia will not sweeten this little hand”\n- **The echo:** “What’s done cannot be undone”\n\n**Then and now:** Act 2: “A little water clears us of this deed.” Act 3: “What’s done is done.” Hear how her own words have turned on her. And she speaks in **prose**.\n\n**The prophecies come true**\n| Prophecy | How it comes true |\n| Birnam Wood will come to Dunsinane | Malcolm’s soldiers cut branches to hide their numbers; the wood “comes” to the castle |\n| No man “of woman born” can harm Macbeth | “Macduff was from his mother’s womb / Untimely ripped” |\n\n**Macbeth’s response:** he sees he has been tricked, and fights anyway: “Lay on, Macduff.” Is this courage, or only pride?`,
        `**Order restored?** Macduff kills Macbeth and brings in his head; Malcolm is hailed king and will be crowned at Scone. Malcolm calls them “this dead butcher and his fiend-like queen.”\n\n**An open question:** the witches are never punished, and Banquo’s line has not yet come to the throne.`,
        `Did the witches lie to Macbeth? Find the exact words that prove your answer, then complete: “Macbeth is defeated not by the prophecy but by ___.”`],
      textTitle: 'Close reading: “Tomorrow and tomorrow and tomorrow” (5.5)', textIcon: '🕯️',
      textHtml: poem('Macbeth, 5.5 (key phrases; read the full speech in your text)', [
        ['She should have died hereafter', '. . .', 'Tomorrow and tomorrow and tomorrow', '. . .', 'Out, out, brief candle!', 'Life’s but a walking shadow', '. . .', 'Told by an idiot, full of sound and fury,', 'Signifying nothing.']], 'William Shakespeare, Macbeth (Folger edition).'),
      text: [
        `Macbeth is told: “The Queen, my lord, is dead.”\n\nHe does not cry. He says life is:\n- a **candle** that goes out fast\n- a **walking shadow**, with nothing solid in it\n- a **tale told by an idiot**: loud, and meaning **nothing**\n\nHe got the crown. It cost him everything. Now nothing matters to him.\n\nRead the lines below slowly and aloud.`,
        `He has just been told “The Queen, my lord, is dead.” Read the key phrases below, then the full speech in your text.\n\n- **Three images of life:** a candle, a shadow, a tale. What do they share?\n- **The rhythm of “Tomorrow and tomorrow and tomorrow”:** how does it sound?\n- **Is this grief, or the absence of grief?**\n\n| Image | What it suggests |\n| The candle | life is brief and easily put out |\n| The walking shadow | life is insubstantial, an imitation with nothing solid behind it |\n| The tale told by an idiot | life is noisy and passionate but has no meaning |\n\nMacbeth says he has “almost forgot the taste of fears.”`,
        `**Catharsis:** pity for what Macbeth was, fear at what he became, relief that it is over.\n\n**Do you accept it?** Is “butcher” a fair summary of the man who spoke “Tomorrow and tomorrow and tomorrow”?`,
        `Lady Macbeth is destroyed by guilt; Macbeth is emptied by it. Whose ending is more terrible? Does his speech describe life, or only the life he has made?`],
      note: [
        ['Lady Macbeth’s guilt comes back: “Out, damned spot!”', '“Tomorrow” speech: to Macbeth, life now means nothing.', 'The prophecies come true by tricks: the wood moves; Macduff was not “born.”'],
        ['In the sleepwalking scene Lady Macbeth’s buried guilt returns: “Out, damned spot, out, I say!”', 'The “Tomorrow” soliloquy shows a man for whom life has become meaningless: “a tale / Told by an idiot.”', 'The prophecies are fulfilled through equivocation: the wood moves, and Macduff was not “born” in the usual way.', 'Order is restored under Malcolm, and the audience experiences catharsis.']],
      life: ['What is something you once said confidently (“it’s no big deal,” “I’ll never…”) that came back on you later? What changed?', 'Something I once said that came back on me was…'],
      tryTitle: 'Your own words, turned',
      tryit: [
        `**Experiment.** Read this line aloud **three ways**:\n\n“Tomorrow and tomorrow and tomorrow.”\n\n1. Angry\n2. Tired\n3. Empty (no feeling at all)\n\nAsk a listener: which one sounds most like a man whose wife just died? Use 🎙️ **Record** if you like.`,
        `**Experiment: the echo.**\n\n1. Find something you wrote or said at least a year ago: an old post, message, journal entry or yearbook line.\n2. Write it down beside what you would say about the same thing now.\n3. Has the meaning turned, as “A little water clears us” turns into “All the perfumes of Arabia”? Record what happened in between.\n4. Then read “Tomorrow and tomorrow and tomorrow” aloud three ways (angry, exhausted, empty) to a listener or with 🎙️ **Record**. Which reading fits the text best, and which words prove it?`,
        `Open your sealed loopholes from Lesson 6. Record whether you predicted Birnam Wood or Macduff’s birth, and what your miss or hit tells you about how equivocation works on a listener.`],
      exit: 'Choose ONE image from the “Tomorrow” soliloquy and explain what it suggests about how Macbeth now sees life.', exit1: 'What is Lady Macbeth trying to wash off her hands?',
      terms: [
        ['sleepwalking scene', 'the scene where Lady Macbeth walks and talks in her sleep', 'Act 5, scene 1, in which Lady Macbeth’s buried guilt returns as she walks in her sleep'],
        ['catharsis', 'the release of pity and fear at the end of a tragedy', 'the release of pity and fear an audience feels at the end of a tragedy'],
        ['guilt', 'the bad feeling of knowing you did wrong', 'the knowledge of having done wrong; it destroys Lady Macbeth and empties Macbeth'],
        ['Birnam Wood', 'the forest that “moves” toward Macbeth’s castle', 'the forest whose cut branches, carried by soldiers, fulfil the third prophecy'],
        ['Dunsinane', 'Macbeth’s castle on a hill', 'the hill and castle where Macbeth makes his last stand'],
        ['anti-hero', 'a main character who does bad things but still interests us', 'a central character who lacks traditional heroic virtue yet holds our interest']],
      q: [
        mc('In the sleepwalking scene, Lady Macbeth tries to:', 'wash blood from her hands', ['write a confession', 'wake her husband', 'bake bread']),
        mc('Macbeth speaks “Tomorrow and tomorrow and tomorrow” just after learning that:', 'the Queen is dead', ['Birnam Wood is moving', 'Macduff has returned', 'it is Monday']),
        mc('How does Birnam Wood “come” to Dunsinane?', 'Soldiers carry cut branches as camouflage', ['The witches move it by magic', 'A storm uproots the trees', 'It takes the bus']),
        mc('Who kills Macbeth?', 'Macduff', ['Malcolm', 'Young Siward', 'Lady Macbeth']),
        mc('“Life’s but a walking shadow” suggests that life is:', 'insubstantial, with nothing solid behind it', ['long and full of meaning', 'dangerous but exciting', 'best spent outdoors']),
        tf('Macduff was not “of woman born” in the ordinary sense.', true),
        tfx('At the end of the play, Malcolm is hailed as King of Scotland.', 'At the end of the play, Donalbain is hailed as King of Scotland.'),
        fill('“All the perfumes of ___ will not sweeten this little hand.”', 'Arabia', ['Scotland', 'England', 'Ontario']),
        app('A CEO who once told staff “a quick apology will make this go away” is later seen, years on, unable to stop talking about the scandal. This arc most resembles:', 'Lady Macbeth from “A little water” to “All the perfumes of Arabia”', ['Banquo’s restraint', 'Malcolm’s test', 'the Porter’s jokes']),
        app('An athlete wins the title she cheated for and says at the podium, “I feel nothing.” The closest parallel is:', 'Macbeth’s “Tomorrow” soliloquy', ['Macduff’s grief', 'Duncan’s trust', 'the witches’ chant']),
        app('A contract says “no human shall ever review your data.” It turns out an AI reviews all of it. As with “none of woman born,” the customer was defeated by:', 'equivocation: the obvious meaning was not the only one', ['hyperbole', 'catharsis', 'a soliloquy'])
      ],
      task: T('Lesson 7 task: Guilt, emptiness and the ending', [
        'Finish the sentences. (1) In her sleep, Lady Macbeth tries to… (2) The forest “moves” because… (3) Macduff can kill Macbeth because… (4) At the end, the new king is…',
        'Describe what the Doctor and the Gentlewoman see and hear in the sleepwalking scene. Explain how each of the two prophecies is fulfilled.',
        'Complete the Level 2 task. Explain what “A little water clears us of this deed” (Act 2) and “All the perfumes of Arabia will not sweeten this little hand” (Act 5) together show about Lady Macbeth. Choose ONE image from the “Tomorrow” soliloquy and explain what it suggests. Then answer: is “this dead butcher” a fair final judgment of Macbeth?',
        'Complete the Level 3 task. Then argue whether the ending truly restores order, considering the unpunished witches and Banquo’s line.'],
        'The two lines together show that Lady Macbeth…',
        ['Wash blood from her hands; soldiers carry branches; Macduff was not “born” in the usual way; Malcolm.',
         'The sleepwalking scene described (candle, hand-washing, speaking of the murders); both prophecies explained; the reversal in Lady Macbeth (dismissed guilt → overwhelmed by it); one image explained (candle, shadow or tale); a reasoned view on “butcher.”'], 'B1, B2'),
      media: [
        M(1, 'video', 'Gender, Guilt, and Fate: Macbeth, Part 2 (Crash Course Literature #410)', 'Crash Course (John Green)', 'https://thecrashcourse.com', 'Gender in the play, Macbeth as an early anti-hero, and whether we can still feel for him.', 12),
        M(2, 'image', 'The sleepwalking Lady Macbeth (Henry Fuseli, c. 1784)', 'Louvre / Wikimedia Commons', 'https://commons.wikimedia.org', 'A painter’s 5.1: the candle, the staring eyes, the watchers.')]
    }),

    L(8, 'The Play on Stage', 'The Play on Stage', {
      exp: 'B1 Reading for Meaning · D1 Understanding Media Texts · D2 Understanding Media Forms, Conventions and Techniques · D3 Creating Media Texts · A2 Speaking to Communicate',
      goals: ['State the play’s major themes as full theme statements, with evidence', 'Explain how a director’s choices interpret a script', 'Begin a promptbook for one scene'],
      warm: [
        `Think of a story you have seen in **two versions** (a remake, or a book and its movie).\n\nWhat did the second version change?`,
        `**Warm-up: same script, different play.** Think of a story you have seen in two versions (a remake, a book and its film). What did the second version change, and why?\n\nIf you staged *Macbeth* today, where and when would you set it?`],
      ideasTitle: 'Major themes and motifs at a glance',
      ideas: [
        `**Five big themes:**\n- **Ambition** with no limits destroys the person.\n- **Appearance and reality:** what looks fair may be foul.\n- **Guilt:** you can hide a crime from others, not from yourself.\n- **Fate and free will:** the prophecy names the ending, but people choose.\n- **Order and disorder:** violence spreads until order returns.\n\n**Motifs** (images that repeat): blood, sleep, darkness, clothing, manhood.`,
        `**Major themes**\n| Topic | Theme statement |\n| Ambition | unchecked ambition destroys the person who serves it |\n| Appearance and reality | what looks fair may be foul; trust in surfaces is fatal |\n| Guilt | a crime can be hidden from others but not from oneself |\n| Fate and free will | prophecy may name an outcome, but the choices are human |\n| Order and disorder | violence against rightful order spreads until order is restored |\n\n**Motifs at a glance**\n| Motif | Through the play |\n| Blood | from honour in battle (1.2) to guilt that will not wash off (2.2, 5.1) |\n| Sleep | innocence and peace: “Macbeth does murder sleep” |\n| Darkness | “Stars, hide your fires”; night at noon |\n| Clothing | “borrowed robes”: titles that do not fit |\n| Manhood | argued over by Lady Macbeth, Macbeth and Macduff |`,
        `**Fate or free will?** The witches never tell him to kill; he admits his own “Vaulting ambition” and chooses each murder, while Banquo hears a prophecy and does nothing. And yet every prediction comes true, and the witches seek him out.`,
        `If Macbeth had done nothing at all after Act 1, scene 3, would he have become king? Build an answer from “If chance will have me king, why, chance may crown me” and from Duncan’s naming of Malcolm.`],
      textTitle: 'The director’s tools, and a model promptbook', textIcon: '🎬',
      text: [
        `A play is a **script**. A **director** decides how it looks and sounds.\n\n**The director’s tools:**\n- **Setting:** where and when?\n- **Blocking:** where actors stand and move\n- **Delivery:** how lines are said (fast, slow, loud, quiet)\n- **Design:** light, sound, costume, props\n\n**The rule:** every choice needs a reason **from the words of the play**. “It would look cool” is not a reason.\n\nA **promptbook** is a script with the director’s choices written in the margins.`,
        `**The director’s tools**\n| Tool | What it decides |\n| Setting and period | medieval Scotland, a modern war zone, a boardroom: each makes an argument |\n| Blocking | where actors stand and move: who is close, who is alone, who has the higher ground |\n| Delivery | pace, pause, volume, stress (you practised this in Unit 3) |\n| Design | light, sound, costume, props |\n| Cuts and choices | is the ghost seen? Are the witches frightening, pitiable, or ordinary? |\n\n**The rule:** every choice must be defended from the text. “It would look cool” is not a reason.\n\n**Model promptbook: one line, three decisions**\n- **The line:** “Is this a dagger which I see before me, / The handle toward my hand?” (2.1)\n- **Blocking:** Macbeth alone, far upstage in a single shaft of light; he does not move toward the dagger but leans back from it\n- **Delivery:** a whisper; long pause after “me”; the question mark is real, he does not know\n- **Design:** no visible dagger. The audience sees only his eyes tracking it\n- **Why:** he calls it “A dagger of the mind, a false creation”: the horror is inside him`,
        `**The nine scenes for the assignment:** 1.3 the witches greet Macbeth and Banquo · 1.5 the Macbeths meet after the letter · 1.7 the persuasion · 2.2 after the murder · 3.4 the banquet · 4.1 the apparitions · 5.1 sleepwalking · 5.5 “Tomorrow” · 5.8 Macbeth and Macduff. (The dagger soliloquy is used in the exemplar and is not available.)`,
        `In the banquet scene, the stage direction has the ghost enter and sit in Macbeth’s place, yet Lady Macbeth compares it to the “air-drawn dagger.” Which piece of text should a director obey, and why?`],
      note: [
        ['Themes: ambition, appearance and reality, guilt, fate and free will, order and disorder.', 'Motifs: blood, sleep, darkness, clothing, manhood.', 'A director’s choices must have a reason from the words of the play.'],
        ['Themes: ambition, appearance and reality, guilt, fate and free will, order and disorder.', 'Motifs (blood, sleep, darkness, clothing, manhood) carry those themes through the play.', 'A production is an interpretation: setting, blocking, delivery and design all make arguments about the text.', 'Every directorial choice must be justified by the words of the play.']],
      life: ['Which theme of Macbeth (ambition, appearance and reality, guilt, fate and free will, order and disorder) do you see most clearly in your own world right now? Give one example.', 'The theme I see most in my own world is… For example…'],
      tryTitle: 'One line, two takes',
      tryit: [
        `**Experiment.** Choose **one line** from the play.\n\nAct it out **two ways** (use 🎙️ **Record**, or perform for someone):\n1. Standing close to the other person, quiet.\n2. Far away, loud.\n\nWhich way fits the words better? Why?`,
        `**Experiment: direct one line twice.**\n\n1. Choose one line or short exchange from your assignment scene.\n2. Make three decisions (blocking, delivery, design) and write a reason from the text for each.\n3. Perform or record the line that way (a phone video, 🎙️ **Record**, or a live reading with a partner).\n4. Now make the three *opposite* decisions and perform it again.\n5. Show both to someone who does not know the play. Ask what each version made them think about the character. Record which choices the text can actually support.`,
        `Watch the same scene in two productions if you can (preview clips with your teacher). Record one choice in each that changes the meaning, and the line of text each director could cite.`],
      exit: 'Fate or free will: which does the play hold more responsible for Macbeth’s downfall? Give one piece of evidence.', exit1: 'Name two tools a director uses.',
      terms: [
        ['blocking', 'where the actors stand and move', 'the planned positions and movements of actors on stage'],
        ['promptbook', 'a script with the director’s notes in the margins', 'a director’s working copy of a script, annotated with staging decisions'],
        ['theme', 'a full sentence about what a work says about life', 'an insight about life, stated as a full sentence'],
        ['delivery', 'how an actor says a line', 'how a line is spoken: pace, pause, volume, stress and tone'],
        ['design', 'the lights, sound, costumes and props', 'the lighting, sound, costume, props and set of a production'],
        ['interpretation', 'one way of understanding a text', 'a reading of a text expressed through choices; every production is one']],
      q: [
        mc('Which is a full theme statement?', 'A crime can be hidden from others but not from oneself.', ['Guilt', 'Blood and sleep', 'Act 5']),
        mc('“Blocking” means:', 'the planned positions and movements of actors on stage', ['stopping an actor from speaking', 'the lighting design', 'building the set from blocks']),
        mc('Which motif moves from honour in battle to guilt that will not wash off?', 'Blood', ['Sleep', 'Clothing', 'Weather']),
        mc('What is the rule for every directorial choice?', 'It must be defended from the text', ['It must be expensive', 'It must match the 1606 staging', 'It must look cool']),
        mc('“Borrowed robes” belongs to which motif?', 'Clothing: titles that do not fit', ['Darkness', 'Manhood', 'Laundry']),
        tf('A production of a play is an interpretation of the script.', true),
        tfx('The witches never tell Macbeth to kill anyone.', 'The witches order Macbeth to kill Duncan in Act 1.'),
        fill('A director’s annotated working copy of a script is called a ___.', 'promptbook', ['playbill', 'paperback', 'passport']),
        app('A production sets Macbeth in a modern corporate head office, with the “crown” as the CEO’s chair. This choice mainly argues that the play is about:', 'ambition and power in any age', ['medieval Scottish history only', 'the weather', 'nothing: settings carry no meaning']),
        app('A director has Lady Macbeth stand on a staircase above Macbeth in 1.7 and below him in 3.2. The blocking shows:', 'the reversal of power in the marriage', ['that the set is uneven', 'comic relief', 'the divine right of kings']),
        app('A student says, “I’ll light the banquet in green because green is my favourite colour.” The best response is:', '“Where in the lines does that come from?”', ['“Green is always wrong for tragedy.”', '“Favourite colours are a fine reason.”', '“Lighting does not matter.”'])
      ],
      task: T('Lesson 8 task: Themes, a motif and a choice', [
        'Finish the sentences. (1) Macbeth teaches that too much ambition… (2) One image that keeps coming back in the play is… (3) If I directed the ghost scene, the audience would / would not see the ghost because…',
        'Write a full theme statement for TWO of: ambition, guilt, appearance and reality, fate and free will. Trace ONE motif through the play with an example from early and late in the action (with act and scene). Name THREE tools a director uses.',
        'Complete the Level 2 task. In the banquet scene (3.4), should the audience see Banquo’s ghost? State your choice and defend it with one reason from the text. Then answer: fate or free will: which does the play hold more responsible for Macbeth’s downfall? Give one piece of evidence.',
        'Complete the Level 3 task. Then, for one line from your assignment scene, write a mini promptbook entry: one blocking, one delivery and one design decision, each justified by words from the scene.'],
        'I would stage it this way because the text says…',
        ['A sentence about ambition destroying people; a motif such as blood, sleep or darkness; a choice with a reason.',
         'Two full, arguable theme statements; one motif traced early and late with act and scene (for example blood: 2.2 → 5.1); three director’s tools; a ghost choice defended from 3.4; a fate/free-will position with a specific moment (for example Banquo hears a prophecy and does nothing).'], 'B1, D1, D2'),
      extra: [T('Unit 4 assignment: The Director’s Promptbook (40 marks)', [
        'Choose 10–15 lines from ONE scene. Print them with wide margins. Write in the margins: two notes about where the actors stand or move, two notes about how lines are said, and one note about light, sound or costume. Then write four sentences: where you set the scene, and why your choices fit the words.',
        'Choose ONE scene from the list (an excerpt of 20–40 lines). Annotate it with at least THREE blocking notes, THREE delivery notes and TWO design notes, plus a simple sketch of the stage. Write a 200–250 word director’s statement that explains your idea for the scene and justifies your choices with two quotations.',
        'Choose ONE scene (20–40 lines) from: 1.3, 1.5, 1.7, 2.2, 3.4, 4.1, 5.1, 5.5 or 5.8. Submit: (1) the Concept Organizer (setting, central idea, evidence), completed in class; (2) the Promptbook: your excerpt annotated with at least FOUR blocking notes, FOUR delivery notes, THREE design notes, and a sketch or ground plan of the stage for the key moment; (3) a Director’s Statement of 400–500 words that explains your concept, justifies your most important choices with quotations from the scene, and connects your staging to at least ONE theme or motif of the play.',
        'Complete the Level 3 assignment. In your statement, also describe one alternative staging you rejected and explain, from the text, why your choice is the stronger interpretation.'],
        'My concept for this scene is…',
        ['Margin notes for movement, voice and design, with reasons that point to words in the scene.',
         'A clear concept; every annotation specific and performable; each major choice justified by a quotation from the scene; staging connected to a theme or motif; accurate understanding of the scene in context. Marked /40: Knowledge 10 · Thinking 10 · Communication 10 · Application 10.'], 'B1, C1, D1, D2, D3')],
      media: [
        M(2, 'video', 'One scene of Macbeth in two productions (teacher’s choice; preview first)', 'Stratford Festival / Folger / National Theatre', 'https://www.stratfordfestival.ca', 'Compare two directors’ choices for the same lines.', 8),
        M(2, 'image', 'A page from a real theatre promptbook', 'Folger Shakespeare Library digital collections', 'https://www.folger.edu', 'What a working director’s script actually looks like.')]
    })
  ]));

  // =====================================================================
  // UNIT 5 · MEDIA AND NON-FICTION — “Who is speaking, and what do they want?”
  // Leacock is public domain. Cullis-Suzuki and Orwell are linked and quoted only in a phrase.
  // =====================================================================
  UNITS.push(U('media', 'Unit 5 · Media and Non-Fiction', [
    'Essays, speeches, ads and posts. For each one we ask: who is speaking, and what do they want?',
    'Five lessons on non-fiction and media: purpose, audience and thesis; the art of persuasion; the personal essay; media literacy and lateral reading; and writing an op-ed. Unit motto: “Who is speaking, and what do they want?”',
    'Leacock, Severn Cullis-Suzuki and Orwell, plus students’ own media: PAT, fact and opinion, satire, ethos/pathos/logos, the rhetorical situation, the personal essay, MediaSmarts’ five key concepts, misinformation, bias and framing, lateral reading (CIVIX CTRL-F), the op-ed, counterargument and logical fallacies. Ends with the Op-Ed (40 marks) and the unit test. Expectations: A1, A2, B1–B4, C1–C4, D1–D4.'
  ], [

    L(1, 'Reading Non-Fiction', 'Reading Non-Fiction', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · D1 Understanding Media Texts',
      goals: ['Identify the purpose, audience and thesis of a non-fiction text', 'Tell fact from opinion, and a stated thesis from an implied one', 'Explain how satire makes an argument by saying the opposite'],
      warm: [
        `What is one piece of health, study or life advice you saw online this month?\n\nWho was giving it? Why?`,
        `**Warm-up: advice everywhere.** What is one piece of health, study or life advice you have seen online this month? Who was giving it, and why?\n\nHow do you decide which advice to believe?\n\nUnit motto: **“Who is speaking, and what do they want?”** Ask it of an essay, a speech, an advertisement and a post.`],
      ideasTitle: 'PAT; forms of non-fiction; fact, opinion and evidence',
      ideas: [
        `Ask **PAT** of anything you read:\n- **P**urpose: why was it written?\n- **A**udience: who is it for?\n- **T**hesis: what is its main claim?\n\nA **fact** can be checked.\nAn **opinion** is a belief. It needs **evidence**.\n\n**Satire** uses jokes and exaggeration to criticize something. It often says the **opposite** of what it means.`,
        `**PAT: three questions for any text**\n- **Purpose:** why was this written? To inform, persuade, entertain or reflect, and usually more than one\n- **Audience:** who is it for? What does the writer assume they know, believe and want?\n- **Thesis:** the central claim. It may be stated outright or only implied\n\n**Forms of non-fiction**\n| Form | What it does |\n| Expository essay | explains or informs |\n| Persuasive essay and op-ed | argues a position |\n| Personal essay and memoir | reflects on the writer’s own experience |\n| Speech | written for the ear and for a particular occasion |\n| Satire | uses humour, irony and exaggeration to criticize |\n\n**Fact, opinion and evidence**\n- **Fact:** a statement that can be checked and proven true or false\n- **Opinion:** a judgment or belief; it can be supported but not proven\n- **Evidence:** facts, examples, expert testimony, statistics, experience\n- **Informed opinion:** an opinion supported by good evidence and sound reasoning: the goal of this unit`,
        `**Fact or opinion?**\n| Statement | Verdict |\n| *Literary Lapses* was published in 1910. | Fact |\n| Stephen Leacock is the funniest writer Canada has produced. | Opinion |\n| Everyone should take a cold shower every morning. | Opinion |`,
        `Why might a writer choose satire over a direct, serious argument? Name one advantage and one risk, then find a current example where readers missed the irony.`],
      textTitle: '“How to Live to Be 200” — Stephen Leacock (1910)', textIcon: '🏃',
      text: [
        `You met Leacock in Unit 1. This essay gives silly health **“advice.”**\n\nA man called **Jiggins** has the “Health Habit.” He exercises all day. Then, in three words: “Jiggins is dead.”\n\nThe narrator says: “Eat what you want. Eat lots of it.”\n\n**Does he mean it? No.** It is **satire**.\n\n**His real point:** people who obsess over health fads are being foolish.`,
        `From *Literary Lapses* (public domain; Project Gutenberg ebook 6340). About 6 minutes read aloud.\n\n**As you read**\n- “Twenty years ago I knew a man called Jiggins, who had the Health Habit.” What do the capital letters do?\n- What happens to Jiggins? How many words does Leacock spend on it?\n- List the narrator’s “advice.” Does he mean it?\n- Who is the real target of the joke?\n\n**How satire argues**\n| Feature | In the essay |\n| Satire | writing that uses humour to expose and criticize foolishness |\n| Its tools | irony, hyperbole and understatement (“Jiggins is dead.”) |\n| Implied thesis | the reader must work out the real claim, often the opposite of what is said |\n| Persona | the voice the writer puts on: here, a cheerfully lazy adviser |\n\n**Leacock’s real claim:** not “never exercise,” but something like: obsessing over health fads is its own kind of foolishness.`,
        `**PAT for Leacock.** *Purpose:* to entertain and to criticize health fads. *Audience:* general readers of 1910 surrounded by health crazes. *Thesis (implied):* obsession with health rules does not guarantee a long or happy life.`,
        `Leacock wrote this in 1910. Which health habits would he make fun of today? Write three sentences in his persona, then state your implied thesis in one plain sentence.`],
      note: [
        ['PAT = Purpose, Audience, Thesis.', 'A fact can be checked. An opinion needs evidence.', 'Satire criticizes by joking. It often says the opposite of what it means.'],
        ['Ask PAT of every non-fiction text: Purpose, Audience, Thesis.', 'A fact can be checked; an opinion is a judgment that needs evidence.', 'A thesis can be stated or implied.', 'Satire criticizes through humour and irony, so its real claim is often the opposite of its surface.']],
      life: ['What is one piece of advice you have followed from the internet or social media? Who gave it, and what did they want?', 'Advice I followed was… It came from… What they wanted was…'],
      tryTitle: 'PAT in two minutes',
      tryit: [
        `**Experiment.** Find **one** piece of advice online (a video, a post, an ad).\n\nWrite:\n- **P:** Why did they make it?\n- **A:** Who is it for?\n- **T:** What is the main claim?\n\nIs it honest about why it was made?`,
        `**Experiment: which text is more honest about its purpose?**\n\n1. Complete a PAT chart for Leacock’s essay, with one piece of evidence for each letter.\n2. Choose any piece of advice aimed at people your age (an ad, a post, a video). Do PAT in two minutes.\n3. Sort its claims into fact, opinion and evidence. How many of each?\n4. Compare: which text is more honest about its purpose, Leacock’s joke or the “serious” advice?\n5. **Keep your example.** You need it for Lesson 2.`,
        `Find out who profits if you follow the advice. Record how long it took to find out, and whether the text told you itself.`],
      exit: 'What is the IMPLIED thesis of “How to Live to Be 200”?', exit1: 'What do the letters P-A-T stand for?',
      terms: [
        ['purpose', 'why a text was written', 'why a text was written: to inform, persuade, entertain or reflect'],
        ['audience', 'who a text is for', 'the people a text is written or spoken for'],
        ['thesis', 'the main claim of a text', 'the central claim of a text, stated or implied'],
        ['fact', 'a statement that can be checked', 'a statement that can be checked and proven true or false'],
        ['opinion', 'a belief or judgment', 'a judgment or belief that can be supported but not proven'],
        ['satire', 'writing that uses jokes to criticize', 'writing that uses humour, irony and exaggeration to expose and criticize foolishness'],
        ['implied thesis', 'a main claim the reader has to work out', 'a central claim that is not stated outright and must be inferred by the reader'],
        ['persona', 'the voice a writer puts on', 'the voice or character a writer adopts in a text']],
      q: [
        mc('In this unit, the letters PAT stand for:', 'Purpose, Audience, Thesis', ['Persuasion, Argument, Thesis', 'Plot, Atmosphere, Tone', 'Pizza, Apples, Toast']),
        mc('A statement that can be checked and proven true or false is:', 'a fact', ['an opinion', 'a thesis', 'a feeling']),
        mc('Stephen Leacock’s “How to Live to Be 200” is best described as:', 'a satire', ['a memoir', 'a news report', 'a cookbook']),
        mc('In Leacock’s essay, Jiggins is:', 'a man devoted to the “Health Habit” who dies young', ['the narrator’s doctor', 'a seller of health foods', 'a racehorse']),
        mc('The narrator’s advice to “Eat what you want. Eat lots of it.” is meant to be read:', 'ironically', ['literally', 'as medical evidence', 'backwards']),
        tf('An opinion can be supported with evidence, but it cannot be proven in the way a fact can.', true),
        tfx('A thesis may be stated anywhere in a text, or only implied.', 'A thesis must always be stated directly in the first paragraph.'),
        tfx('Leacock’s essay is satire: he is mocking health fads, not giving real advice.', 'Leacock sincerely wants his readers to stop exercising and to eat as much as possible.'),
        fill('“Everyone should take a cold shower every morning” is an ___, not a fact.', 'opinion', ['error', 'essay', 'elephant']),
        app('A satirical news site runs the headline “Local Teen Heroically Reads Entire Terms of Service.” The real claim is probably:', 'almost no one reads terms of service, and they are too long', ['a teenager deserves a medal', 'terms of service are exciting to read', 'the site reports only facts']),
        app('A post says, “Studies show this tea melts fat. I lost 10 pounds!” with a link to buy it. Using PAT, the purpose is most likely to:', 'persuade you to buy, while appearing to inform', ['entertain with satire', 'reflect on a personal experience only', 'report checked facts']),
        app('“The Leafs last won the Stanley Cup in 1967” and “The Leafs are the best team in hockey.” Together these are:', 'a fact, then an opinion', ['two facts', 'two opinions', 'an opinion, then a fact'])
      ],
      task: T('Lesson 1 task: PAT and the implied thesis', [
        'Write FACT or OPINION beside each. (1) Leacock taught at McGill University. (2) Everyone should take a cold shower every morning. Then finish: “Leacock does not really mean his advice. I know because…”',
        'Explain what each letter of PAT stands for. Label four statements as fact or opinion: Literary Lapses was published in 1910 · Leacock is the funniest writer Canada has produced · Leacock taught at McGill University · Everyone should take a cold shower every morning. Define “satire.”',
        'Complete the Level 2 task. State the IMPLIED thesis of “How to Live to Be 200” and give one piece of evidence that the narrator does not mean his advice literally. Then answer: why might a writer choose satire over a direct, serious argument? Give one advantage and one risk.',
        'Complete the Level 3 task. Then complete a PAT chart for one piece of online advice aimed at your age group and judge which text is more honest about its purpose: Leacock’s or the one you found.'],
        'The implied thesis is…',
        ['1 = fact, 2 = opinion; a reason such as “the advice is silly and exaggerated” or “Jiggins is dead.”',
         'PAT explained; fact, opinion, fact, opinion; satire defined; implied thesis (obsessing over health fads is foolish) with evidence such as “Eat lots of it” or “Jiggins is dead”; one advantage (humour lowers defences, is memorable) and one risk (readers miss the irony).'], 'B1, B2, D1'),
      media: [
        M(2, 'image', 'Stephen Leacock at Old Brewery Bay (photograph)', 'Leacock Museum / The Canadian Encyclopedia', 'https://www.thecanadianencyclopedia.ca/en/article/stephen-leacock', 'The Ontario humorist students met in Unit 1.'),
        M(2, 'image', 'An early 1900s health-fad advertisement', 'Wikimedia Commons / Library and Archives Canada', 'https://commons.wikimedia.org', 'What Leacock was mocking: compare it with today’s wellness advertising.')]
    }),

    L(2, 'The Art of Persuasion', 'The Art of Persuasion', {
      exp: 'A1 Listening to Understand · B1 Reading for Meaning · B2 Understanding Form and Style · D1 Understanding Media Texts',
      goals: ['Define ethos, pathos and logos and find each in a speech', 'Identify rhetorical devices and explain their effect', 'Analyze how a speaker adapts to audience and occasion'],
      warm: [
        `Think of the last time someone changed your mind.\n\nWas it their **facts**, their **feelings**, or **who they were**?`,
        `**Warm-up: what worked on you?** Show a partner the example of persuasion you collected. Who made it, and what do they want?\n\nThink of the last time someone changed your mind. Was it their facts, their feelings, or who they were?`],
      ideasTitle: 'The three appeals; the rhetorical situation; devices',
      ideas: [
        `**Rhetoric** is the art of persuading with words. There are **three appeals**:\n\n| Appeal | It means | It asks |\n| **Ethos** | trust | Why believe this speaker? |\n| **Pathos** | feeling | What do I feel? |\n| **Logos** | reason | What is the evidence? |\n\n**Devices:**\n- **Rhetorical question:** asked for effect, not for an answer\n- **Direct address:** talking to “you”\n- **Anaphora:** starting several sentences with the same words`,
        `**The three appeals** (from Aristotle, more than two thousand years ago)\n| Appeal | Definition |\n| Ethos | appeal to credibility and character: why should we trust this speaker? |\n| Pathos | appeal to emotion: what does the speaker make us feel? |\n| Logos | appeal to reason: what evidence and logic does the speaker offer? |\n\n**Rhetoric** is the art of using language to persuade. The best persuasion still uses all three.\n\n**The rhetorical situation:** *speaker* (who is talking, with what authority?), *audience* (who is listening, and what do they already think?), *occasion* (where, when, and why now?), *purpose* (what should the audience think, feel or do afterward?).\n\n**Rhetorical devices**\n| Device | Meaning |\n| Anaphora | repeating the same words at the start of successive sentences |\n| Rhetorical question | asked for effect, not for an answer |\n| Direct address | speaking to the audience as “you” |\n| Parallelism | ideas in matching grammatical form |\n| Anecdote | a brief personal story used as evidence |\n| Contrast | setting two things side by side: what adults say and what they do |`,
        `**Claim frame:** “The speech persuades mainly through ___ because ___.”\n\n**Link back:** Lady Macbeth’s persuasion in 1.7 was almost all pathos (shame) with a little logos (the plan). What was missing?`,
        `Find a current speech or advertisement that uses only one appeal. Explain what it would gain, and what it would risk, by adding the other two.`],
      textTitle: 'Severn Cullis-Suzuki at the UN Earth Summit (Rio, 1992)', textIcon: '🌎',
      text: [
        `**Watch the speech** (about 6 minutes). It is not printed here.\n\n**Who:** Severn Cullis-Suzuki, **age 12**, from Vancouver. She and three friends raised the money to go to Rio themselves.\n\n**To whom:** world leaders at the United Nations.\n\nShe has no power and is not an expert. But she is a **child** speaking for children. That is her **ethos**.\n\nHer most famous line: “If you don’t know how to fix it, please stop breaking it!”`,
        `The speech is in copyright: watch the video (about 6 minutes) and study it from a transcript in class (Archives of Women’s Political Communication, Iowa State University).\n\n**The rhetorical situation**\n- **Speaker:** Severn Cullis-Suzuki, aged 12, from Vancouver, for the Environmental Children’s Organization (ECO). She and three friends raised the money to travel to Rio themselves\n- **Audience:** delegates to the United Nations Earth Summit\n- **Occasion:** Rio de Janeiro, 1992\n\n**As you watch**\n- How does she introduce herself? What does that do for her credibility?\n- Where do you feel something? What caused it?\n- What evidence does she give from her own life?\n- Her most quoted line: “If you don’t know how to fix it, please stop breaking it!”\n\n**Second viewing, appeal hunt:** in threes, each person tracks ONE appeal and names any device used.`,
        `**How she builds ethos:** she raised the money and travelled a great distance (commitment); she says she has no hidden agenda and is fighting only for her future (honesty); she speaks as a child whose generation will live with the consequences (a moral authority the adults lack).\n\n**The famous line:** parallel structure (“fix it … breaking it”) and direct address reduce a complicated issue to plain common sense.`,
        `She speaks to the delegates as parents, not as politicians. Why is that a clever reading of her audience? Three decades later, how would you judge whether the speech “worked”?`],
      note: [
        ['Ethos = trust. Pathos = feeling. Logos = reason.', 'Every speech has a speaker, an audience, an occasion and a purpose.', 'Good speakers turn who they are into a reason to listen.'],
        ['Rhetoric is the art of persuasion; its three appeals are ethos (credibility), pathos (emotion) and logos (reason).', 'Every speech answers a situation: speaker, audience, occasion, purpose.', 'Devices such as anaphora, rhetorical questions, direct address and parallelism make ideas memorable.', 'Strong speakers turn who they are into a reason to listen.']],
      life: ['Think of the last time someone changed your mind. Was it ethos, pathos or logos that did it? What exactly did they say or do?', 'The last time someone changed my mind was… It worked because of…'],
      tryTitle: 'Three ways to ask',
      tryit: [
        `**Experiment.** Ask for the **same small favour** three ways (three different people, or the same person on three days).\n\n1. **Ethos:** “You know I always…”\n2. **Pathos:** “It would mean so much to me…”\n3. **Logos:** “It makes sense because…”\n\nWhich one worked best? Write down what happened.`,
        `**Experiment: which appeal works on real people?**\n\n1. Choose one small, honest request (borrow something, swap a chore, change a plan).\n2. Write three one-sentence versions: one built on ethos, one on pathos, one on logos.\n3. Try them on three people (or on one person over three days). Record each result.\n4. Now do an **appeal hunt** on the persuasion example you saved in Lesson 1: mark every appeal and name one device.\n5. Finish: “It persuades mainly through ___ because ___.”`,
        `Write a fourth version of your request that uses all three appeals and one device from today’s list. Record whether it worked better, or just sounded like a speech.`],
      exit: 'How does Severn Cullis-Suzuki establish ethos even though she is a child with no official authority?', exit1: 'Which appeal is about feelings: ethos, pathos or logos?',
      terms: [
        ['rhetoric', 'the art of persuading with words', 'the art of using language to persuade'],
        ['ethos', 'an appeal to trust in the speaker', 'an appeal to the speaker’s credibility and character'],
        ['pathos', 'an appeal to feelings', 'an appeal to the audience’s emotions'],
        ['logos', 'an appeal to reason and evidence', 'an appeal to reason, using evidence and logic'],
        ['anaphora', 'starting several sentences with the same words', 'repeating the same words at the start of successive sentences'],
        ['rhetorical question', 'a question asked for effect, not for an answer', 'a question asked for effect, not for an answer'],
        ['parallelism', 'ideas written in the same pattern', 'ideas expressed in matching grammatical form'],
        ['anecdote', 'a short personal story used to make a point', 'a brief personal story used as evidence']],
      q: [
        mc('An appeal to the speaker’s credibility and character is called:', 'ethos', ['pathos', 'logos', 'bingo']),
        mc('An appeal to the audience’s emotions is called:', 'pathos', ['ethos', 'logos', 'framing']),
        mc('Severn Cullis-Suzuki delivered her famous speech at:', 'the UN Earth Summit in Rio de Janeiro in 1992', ['the House of Commons in Ottawa', 'a TED conference in Vancouver', 'a school assembly in 2020']),
        mc('She spoke on behalf of:', 'the Environmental Children’s Organization (ECO)', ['the Government of Canada', 'a Vancouver newspaper', 'a soft drink company']),
        mc('Repeating the same words at the start of successive sentences is called:', 'anaphora', ['anecdote', 'understatement', 'alphabet']),
        tf('Severn Cullis-Suzuki was twelve years old when she spoke in Rio.', true),
        tfx('Logos is an appeal to reason; pathos is the appeal to emotion.', 'Logos is an appeal to emotion.'),
        fill('The four parts of the rhetorical situation are speaker, audience, occasion and ___.', 'purpose', ['pathos', 'paragraph', 'popcorn']),
        app('A toothpaste ad shows a dentist in a white coat saying, “I recommend this to my own family.” The main appeal is:', 'ethos', ['pathos', 'logos', 'anaphora']),
        app('A charity video shows one shivering puppy and slow piano music, with no statistics at all. It relies almost entirely on:', 'pathos', ['logos', 'ethos', 'parallelism']),
        app('A student council candidate says, “We will listen. We will act. We will deliver.” The device is:', 'anaphora (with parallelism)', ['a rhetorical question', 'an anecdote', 'understatement'])
      ],
      task: T('Lesson 2 task: Appeal hunt', [
        'Match each word to its meaning: ethos, pathos, logos → feelings · trust in the speaker · reasons and evidence. Then finish: “People listened to Severn because…”',
        'Define each of the three appeals. Name and define TWO rhetorical devices. List the four parts of the rhetorical situation.',
        'Complete the Level 2 task. Explain how Severn Cullis-Suzuki establishes ethos even though she is a child with no official authority. Explain the effect of her line, “If you don’t know how to fix it, please stop breaking it!” Which appeal is strongest in the speech? Give one reason.',
        'Complete the Level 3 task. Then analyze the persuasion example you collected: identify the rhetorical situation, one example of each appeal it uses (or note which is missing), and one device, and judge how honestly it persuades.'],
        'The speech persuades mainly through ___ because…',
        ['Ethos = trust, pathos = feelings, logos = reasons; a sensible reason such as “she was a child speaking honestly for children.”',
         'Three accurate definitions; two devices defined; speaker, audience, occasion, purpose; ethos explained (commitment, honesty, speaking for the generation affected); the line’s effect (simple, parallel, direct, hard to argue with); a choice of strongest appeal tied to a specific moment.'], 'A1, B1, B2'),
      media: [
        M(2, 'video', 'Severn Cullis-Suzuki: speech to the UN Earth Summit (1992)', 'United Nations / video archive', 'https://awpc.cattcenter.iastate.edu', 'The speech itself, about 6 minutes. Transcript in the Archives of Women’s Political Communication, Iowa State University.', 6),
        M(1, 'image', 'Aristotle’s rhetorical triangle (ethos, pathos, logos)', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'A simple diagram of the three appeals to copy into notes.')]
    }),

    L(3, 'The Personal Essay', 'The Personal Essay', {
      exp: 'B1 Reading for Meaning (B1 critical literacy) · B2 Understanding Form and Style · C1 Developing and Organizing Content',
      goals: ['Explain how a personal essay turns one experience into an argument', 'Identify the implied thesis of “Shooting an Elephant”', 'Analyze how honesty and reflection build a writer’s ethos'],
      warm: [
        `Have you ever done something you did not want to do **because people were watching**?\n\nWhat happened?`,
        `**Warm-up: because they were watching.** Have you ever done something you did not want to do because people were watching and expected it?\n\nIs it harder to resist a crowd when you are the one supposedly in charge?\n\n*Content note:* the essay describes the slow death of an animal and uses the racist language of British colonial officials in the 1920s.`],
      ideasTitle: 'What is a personal essay?',
      ideas: [
        `A **personal essay** tells about **one real thing that happened to the writer**. It uses “I.”\n\nIt has two parts:\n- **Scene:** what happened\n- **Reflection:** what it meant\n\nIt has two voices: the “I” **then** and the “I” **now**.\n\nThe one small story stands for something **bigger**. The thesis is often **implied** (not said outright).\n\nA writer who admits a weakness earns our **trust**.`,
        `**What is a personal essay?**\n- **One real experience,** told in the first person\n- **Two voices:** the “I” who lived it then, and the “I” who understands it now\n- **Scene and reflection:** it shows what happened, then thinks about what it meant\n- **A larger point:** the single story stands for something bigger; the thesis is often implied\n\n**Why it persuades:** a writer who admits his own weakness earns trust. Honesty is a form of ethos.\n\n**Orwell in Burma**\n- **George Orwell (1903–1950):** the pen name of Eric Blair; later the author of *Animal Farm* and *Nineteen Eighty-Four*\n- **1922–1927:** served in the Indian Imperial Police in Burma (now Myanmar), then a British colony\n- **Imperialism:** one country ruling another for its own profit and power\n- **His position:** he already believed the empire was wrong, and was hated as its representative: “I was hated by large numbers of people”`,
        `**From scene to meaning**\n| Technique | What it does |\n| Concrete detail | the mud, the crowd, the weight of the rifle: we are placed in the moment |\n| Slowed time | the death is described at length; the reader is not allowed to look away |\n| Reflection | the older Orwell interrupts to explain what the younger one only felt |\n| Symbol | the elephant: powerful, valuable, and destroyed for the sake of appearances |`,
        `The final sentence of the essay is a confession, not a moral. Why is that a stronger ending than a lesson would be? Connect your answer to ethos.`],
      textTitle: '“Shooting an Elephant” — George Orwell (1936)', textIcon: '🐘',
      text: [
        `Read the essay at the link your teacher gives you. **In brief:**\n\nOrwell is a young British police officer in Burma. A work elephant has broken loose and killed a man.\n\nWhen Orwell finds it, the elephant is **calm**. But about **two thousand people** are watching him.\n\nHe does not want to shoot. He shoots anyway. The elephant dies slowly.\n\nHe admits: he did it **only so he would not look like a fool**.\n\n**His bigger point:** ruling others by force also traps the ruler.`,
        `Read it at online-literature.com/orwell/887 (public domain in Canada; link to it and quote sparingly).\n\n**The essay in brief**\n- **The call:** a working elephant has broken loose and killed a man\n- **The crowd:** by the time he finds it, the animal is calm, and about two thousand people have followed him\n- **The decision:** he does not want to shoot, but feels the crowd’s will pressing him forward\n- **The act:** he shoots; the elephant takes a long time to die\n- **The confession:** he admits he did it only to avoid looking a fool\n\n**Who is in control?** Orwell carries the rifle and wears the uniform. Who actually has the power in the field? He says he realized in that moment what happens to a ruler who must always look like a ruler.\n\n**Implied thesis:** imperialism traps the oppressor as well as the oppressed: he becomes a puppet of the role he plays.`,
        `**Scene vs. reflection in the essay.** *Scene:* the crowd gathering behind him; the elephant quietly eating grass; the long description of the death. *Reflection:* his realization about what the crowd expected; his insight about the ruler’s lost freedom; the final admission of his motive.`,
        `Orwell does not make himself the hero of his own story. Apply the Unit 1 questions: whose voice is centred in this essay, and whose is missing? Does his honesty make up for that absence?`],
      note: [
        ['A personal essay uses one real experience to make a bigger point.', 'Scene = what happened. Reflection = what it meant.', 'Admitting a weakness makes readers trust the writer.'],
        ['A personal essay uses one real experience to make a larger point.', 'It moves between scene (what happened) and reflection (what it meant).', 'In “Shooting an Elephant” the implied thesis is that imperialism corrupts and traps those who enforce it.', 'Admitting weakness builds ethos: the reader trusts a writer who does not flatter himself.']],
      life: ['When did you do something against your own judgment because people were watching or expecting it? What do you understand about it now that you did not then?', 'I acted against my own judgment when… Now I understand that…'],
      tryTitle: 'Your moment',
      tryit: [
        `**Experiment.** Think of a small moment when you did something you did not really want to do.\n\nWrite **three sentences of SCENE:** where were you? who was there? what did you see?\n\nWrite **one sentence of REFLECTION:** “Now I understand that…”`,
        `**Experiment: the seed of a personal essay.**\n\n1. Think of a small moment when you acted against your own judgment.\n2. Write three sentences of SCENE: where, who, what you saw. Use at least two concrete details.\n3. Write two sentences of REFLECTION: what you understand now that you did not then.\n4. Underline the sentence where “then” becomes “now.”\n5. Read it to someone you trust (optional). Ask: did admitting the weakness make them trust the story more or less? Record the answer.`,
        `Write one more sentence that turns your moment into a larger point about people in general, without stating it as a moral. That is an implied thesis.`],
      exit: 'State the implied thesis of “Shooting an Elephant” in your own words.', exit1: 'Why does Orwell shoot the elephant?',
      terms: [
        ['personal essay', 'a true story about the writer that makes a bigger point', 'an essay that reflects on the writer’s own experience to make a larger point'],
        ['scene', 'the part that shows what happened', 'the part of a personal essay that shows what happened, in concrete detail'],
        ['reflection', 'the part that thinks about what it meant', 'the part of a personal essay that considers what the experience meant'],
        ['imperialism', 'one country ruling another for its own gain', 'one country ruling another for its own profit and power'],
        ['memoir', 'a writer’s account of part of their own life', 'a writer’s account of his or her own experiences'],
        ['confession', 'admitting something you did wrong', 'an admission of fault; Orwell ends his essay with one']],
      q: [
        mc('In Burma, George Orwell worked as:', 'a police officer', ['a journalist', 'an elephant trainer', 'a chef']),
        mc('According to the essay, Orwell shoots the elephant mainly because:', 'the crowd expects it and he does not want to look a fool', ['it is charging at him', 'his commanding officer orders it', 'he wants the ivory']),
        mc('A personal essay typically moves between:', 'scene and reflection', ['rhyme and rhythm', 'fact and fallacy', 'left and right']),
        mc('The implied thesis of “Shooting an Elephant” is closest to:', 'imperialism traps and corrupts those who enforce it', ['elephants are dangerous animals', 'crowds are always right', 'policemen should carry bigger rifles']),
        mc('Why does a writer who admits weakness often persuade more?', 'Honesty builds ethos: readers trust a writer who does not flatter himself', ['Readers enjoy feeling superior', 'Weakness is a form of logos', 'It makes the essay shorter']),
        tf('By the time Orwell found the elephant, it had calmed down.', true),
        tfx('When he wrote about Burma, Orwell had come to believe that imperialism was wrong.', 'When he wrote about Burma, Orwell was a firm supporter of the British Empire.'),
        fill('One country ruling another for its own profit and power is called ___.', 'imperialism', ['journalism', 'optimism', 'tourism']),
        app('A new shift supervisor fires a worker she likes because the rest of the staff are watching to see if she is “tough enough.” The closest parallel is:', 'Orwell shooting the elephant to avoid looking a fool', ['Leacock’s Jiggins', 'Severn’s speech in Rio', 'the Porter in Macbeth']),
        app('A college application essay begins in a hospital waiting room (what the writer saw), then says, “I did not understand until later that…” The second part is:', 'reflection', ['scene', 'a fallacy', 'anaphora']),
        app('An influencer posts, “I got this completely wrong last year, and here is what I learned.” Followers trust her more afterward. This illustrates:', 'admitting weakness as a source of ethos', ['pathos through fear', 'a false dilemma', 'satire'])
      ],
      task: T('Lesson 3 task: Scene and reflection', [
        'Answer in one sentence each. (1) What was Orwell’s job? (2) Why did he shoot the elephant? (3) How did he feel about it afterward?',
        'Name TWO features of a personal essay. Define “imperialism” and explain Orwell’s job in Burma. Explain why Orwell shoots the elephant even though he believes he should not.',
        'Complete the Level 2 task. State the implied thesis of the essay in your own words. Identify one example of SCENE and one of REFLECTION. Then answer: Orwell does not make himself the hero of his own story. How does that choice affect your trust in him as a writer?',
        'Complete the Level 3 task. Then write your own “moment” (three sentences of scene, two of reflection, with the turn from “then” to “now” underlined) and one sentence stating the larger point it implies.'],
        'Orwell shoots the elephant because…',
        ['A police officer for the British in Burma; the crowd was watching and he did not want to look foolish; he knew it was wrong.',
         'Two features (first person, scene and reflection, two voices, a larger point, implied thesis); imperialism defined and his job explained; the crowd’s pressure; an implied thesis about power trapping the powerful; accurate scene and reflection examples; a reasoned view on trust.'], 'B1, B2, C1'),
      media: [
        M(1, 'image', 'George Orwell in Burma with the police training school (1923)', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'The young Eric Blair in uniform, before he became “Orwell.”'),
        M(2, 'image', 'Shooting an Elephant: full text', 'The Literature Network', 'https://www.online-literature.com/orwell/887/', 'Link to the essay; public domain in Canada.')]
    }),

    L(4, 'Media Literacy', 'Media Literacy', {
      exp: 'D1 Understanding Media Texts · D2 Understanding Media Forms, Conventions and Techniques · D4 Reflecting on Skills and Strategies · B1 Reading for Meaning',
      goals: ['Apply the five key concepts of media literacy to any media text', 'Distinguish misinformation from disinformation, and bias from framing', 'Use lateral reading to check a source'],
      warm: [
        `Have you ever shared (or almost shared) something that turned out to be **false**?\n\nHow did you find out?`,
        `**Warm-up: did you check?** Have you ever shared, or nearly shared, something that turned out to be false? How did you find out?\n\nWhere do you actually get your news? Who decides what you see there?`],
      ideasTitle: 'Five key concepts (MediaSmarts); when information goes wrong',
      ideas: [
        `**Every message is built by someone.** Five ideas:\n1. Media are **made** (someone chose what to show and what to leave out).\n2. Different people **read it differently**.\n3. Someone is **making money**.\n4. Media carry **values**.\n5. The **form** changes the message (a video is not a meme).\n\n**Misinformation:** false, shared by mistake.\n**Disinformation:** false, shared **on purpose**.`,
        `**Five key concepts (MediaSmarts)**\n| Concept | Meaning |\n| Media are constructions | someone chose what to include, what to leave out and how to present it |\n| Audiences negotiate meaning | different people read the same text differently |\n| Media have commercial implications | someone is paying, and someone is profiting |\n| Media have social and political implications | they carry values and affect how we see people and issues |\n| Each medium has its own form | a video, a headline and a meme shape a message in different ways |\n\n**Questions to ask any media text:** Who made this, and who paid for it? Who is it for, and who might read it differently? What is shown, and what is left out? What values does it take for granted? How does the form shape the message?\n\n**When information goes wrong**\n| Term | Meaning |\n| Misinformation | false information shared by someone who believes it |\n| Disinformation | false information created or shared on purpose to deceive |\n| Bias | a leaning toward one side that shapes what is reported and how |\n| Framing | the angle chosen: the same event as a “protest” or a “riot” |\n| Algorithm | the system that decides what appears in your feed, based on what keeps you watching |`,
        `**Sound familiar?** Purpose, Audience, Thesis. Whose voice is centred, whose is missing? You have been doing media literacy since Unit 1.\n\n**Worked example.** A fitness influencer praises a protein powder and includes a discount code. *Commercial implications:* the code suggests a commission, so the praise may be advertising. *Constructions:* the video is edited to show only positive results.`,
        `Bias and framing can shape a message even when every fact in it is true. Find two headlines about the same event and identify the single word in each that carries the frame.`],
      textTitle: 'Read laterally, not vertically', textIcon: '🔎',
      text: [
        `**Vertical reading** = staying on the page and judging it by how it looks. (Easy to fool.)\n\n**Lateral reading** = **leaving the page**. Open new tabs. See what **other** sources say.\n\nAsk three questions:\n1. **Who** is behind this?\n2. **What** is the evidence?\n3. **What do other sources say?**\n\nReal fact-checkers do this. Opening new tabs is a **good** sign.`,
        `**Read laterally, not vertically**\n- **Vertical reading:** staying on the page and judging it by how it looks\n- **Lateral reading:** leaving the page to see what other sources say about it\n- **Three questions:** Who is behind this? What is the evidence? What do other sources say?\n- **Made in Canada:** CIVIX’s CTRL-F program (ctrl-f.ca) teaches these skills with Canadian examples\n\n**Watch:** *Crash Course Navigating Digital Information #3*, “Check Yourself with Lateral Reading” (about 14 minutes). What do professional fact-checkers do that most readers do not? Why is opening new tabs a good sign? What does John Green say about using Wikipedia?\n\n**Check your story (17 minutes)**\n1. Take out the story or post you saved. Before checking, rate how much you believe it, from 1 to 5.\n2. Read laterally for five minutes. Who is behind the source? What do others say about the claim?\n3. Rate it again. Record what changed your rating, if anything.\n4. Report: reliable, unreliable or uncertain, and the single best piece of evidence.`,
        `**Sources for this lesson:** MediaSmarts, Canada’s centre for digital media literacy (mediasmarts.ca); The Canadian Encyclopedia, “Media Literacy”; CIVIX CTRL-F (ctrl-f.ca).`,
        `Which of the three lateral-reading questions matters most, and why? Test your answer on a source you already trust: does it survive the question?`],
      note: [
        ['All media are made by someone, for a reason.', 'Misinformation = false by mistake. Disinformation = false on purpose.', 'Read laterally: leave the page and check other sources.'],
        ['All media are constructions made by someone for a purpose, often commercial, and they carry values.', 'Misinformation is false and shared in error; disinformation is false and shared on purpose.', 'Bias and framing shape a message even when every fact in it is true.', 'Read laterally: leave the page and ask who is behind it, what the evidence is, and what other sources say.']],
      life: ['Where do you actually get your news and information? Who (or what algorithm) decides what you see there?', 'I get most of my news from… What I see is decided by…'],
      tryTitle: 'Check your story',
      tryit: [
        `**Experiment.** Pick one post or story you are **not sure** is true.\n\n1. Before checking: how much do you believe it? (1 to 5)\n2. Open **two new tabs**. Search for the claim and for who made it.\n3. Now: how much do you believe it? (1 to 5)\n\nWhat changed your mind?`,
        `**Experiment: five minutes of lateral reading.**\n\n1. Choose a news story or post you are not sure you believe. Rate your belief from 1 to 5 **before** checking.\n2. Read laterally for five minutes: open new tabs; search the source’s name; search the claim.\n3. Answer the three questions: who is behind it, what is the evidence, what do other sources say?\n4. Rate your belief again. Record what changed it.\n5. Verdict: reliable, unreliable or uncertain, with your single best piece of evidence.\n6. Then apply TWO of the five key concepts to the post itself.`,
        `Do the same check on something you *want* to be true. Record whether you read as carefully, and what that tells you about your own bias.`],
      exit: 'Explain the difference between misinformation and disinformation.', exit1: 'What does “lateral reading” mean?',
      terms: [
        ['media literacy', 'the skill of understanding and questioning media', 'the ability to analyze how media texts are made, for whom, and why'],
        ['misinformation', 'false information shared by mistake', 'false information shared by someone who believes it'],
        ['disinformation', 'false information shared on purpose', 'false information created or shared on purpose to deceive'],
        ['bias', 'leaning toward one side', 'a leaning toward one side that shapes what is reported and how'],
        ['framing', 'the angle chosen to present something', 'the angle or emphasis chosen in presenting an event or issue'],
        ['lateral reading', 'leaving a page to check what other sources say', 'leaving a web page to check what other sources say about it and its claims'],
        ['algorithm', 'the system that decides what shows up in your feed', 'the system that decides what appears in a feed, based on what keeps a user watching'],
        ['construction', 'something built by choices', 'a media text understood as the product of choices about what to include and leave out']],
      q: [
        mc('The key concept “media are constructions” means that:', 'someone made choices about what to include and what to leave out', ['media texts are always false', 'media companies own many buildings', 'audiences build their own websites']),
        mc('False information created or shared on purpose to deceive is:', 'disinformation', ['misinformation', 'framing', 'satire']),
        mc('Reading laterally means:', 'leaving the page to see what other sources say about it', ['reading every word on a page before judging it', 'reading only the headline', 'reading a page while lying down']),
        mc('CTRL-F is:', 'a Canadian program from CIVIX that teaches source-checking skills', ['a social media platform', 'a federal law about advertising', 'a kind of sandwich']),
        mc('Describing the same event as a “protest” in one headline and a “riot” in another is an example of:', 'framing', ['lateral reading', 'an algorithm', 'a rhyme']),
        tf('Professional fact-checkers often leave a website to see what other sources say about it.', true),
        tfx('Misinformation is shared by people who believe it is true.', 'Misinformation is always shared on purpose to deceive.'),
        fill('The system that decides what appears in your feed is called an ___.', 'algorithm', ['anecdote', 'audience', 'avocado']),
        app('Your aunt shares a fake “miracle cure” post because she sincerely wants to help the family. In this lesson’s terms she is spreading:', 'misinformation', ['disinformation', 'satire', 'framing']),
        app('A website has a professional logo, a “.org” address and no spelling errors. A classmate says, “It looks legit.” The classmate is reading:', 'vertically: judging the page by how it looks', ['laterally', 'ironically', 'with logos']),
        app('A “top 10 headphones” video never mentions that the maker of #1 sent the reviewer free products. Which key concept exposes the problem fastest?', 'Media have commercial implications', ['Each medium has its own form', 'Audiences negotiate meaning', 'Media are always false'])
      ],
      task: T('Lesson 4 task: Key concepts and a source check', [
        'Finish the sentences. (1) Misinformation is false information shared by… (2) Disinformation is false information shared… (3) To check a post, I should open…',
        'List THREE of the five key concepts of media literacy. Explain the difference between misinformation and disinformation. Define: bias, framing, lateral reading.',
        'Complete the Level 2 task. A fitness influencer posts a video praising a protein powder and includes a discount code: apply TWO key concepts to this post. Then list the three questions to ask when reading laterally and say which you think is most important, and why.',
        'Complete the Level 3 task. Then hand in your own source check: the story, your belief rating before and after, your answers to the three questions, and your verdict with its best piece of evidence.'],
        'The most important question to ask is…',
        ['By someone who believes it; on purpose to trick people; new tabs to see what other sources say.',
         'Three concepts; the two terms distinguished by intent; three accurate definitions; two concepts applied to the influencer post (for example the discount code = commercial implications; editing = construction); the three lateral-reading questions with a reasoned choice.'], 'D1, D2, D4'),
      media: [
        M(2, 'video', 'Check Yourself with Lateral Reading (Crash Course Navigating Digital Information #3)', 'Crash Course (John Green)', 'https://thecrashcourse.com', 'What fact-checkers do differently, the three questions, and how to use Wikipedia.', 14),
        M(2, 'image', 'CTRL-F: Find the Facts (lessons and examples)', 'CIVIX Canada', 'https://ctrl-f.ca', 'Free Canadian classroom lessons on lateral reading. Also see mediasmarts.ca.')]
    }),

    L(5, 'Make Your Case', 'Make Your Case', {
      exp: 'C1 Developing and Organizing Content · C2 Using Knowledge of Form and Style · C3 Applying Knowledge of Conventions · C4 Reflecting on Skills and Strategies · D3 Creating Media Texts',
      goals: ['Plan an op-ed with a clear position, reasons and evidence', 'Answer a counterargument fairly', 'Recognize and avoid common logical fallacies'],
      warm: [
        `Pick an issue you care about. Say your opinion in **one sentence**.\n\nNow ask a partner for the **best reason you might be wrong**. Write it down.`,
        `**Warm-up: change my mind.** Tell your partner the issue you chose and your position in one sentence.\n\nPartner: give the strongest objection you can think of. Do not be polite about it.\n\nTwo minutes each way. Write down the objection you were given; you will need it.`],
      ideasTitle: 'The op-ed; answering the other side; five fallacies',
      ideas: [
        `An **op-ed** is a short opinion article. It has five parts:\n1. **Hook** (a story, fact or question)\n2. **Thesis** (your opinion, said clearly)\n3. **Reasons + evidence** (two or three)\n4. **The other side**, and your answer\n5. **Call to action** (what should the reader do?)\n\nA **fallacy** is a mistake in reasoning:\n- **Ad hominem:** attacking the person\n- **Bandwagon:** “everyone thinks so”\n- **False dilemma:** “only two choices”`,
        `**The op-ed:** a short opinion article (the name comes from “opposite the editorial page”) arguing one position for a general audience.\n| Part | Job |\n| Hook | open with a story, a striking fact or a question |\n| Thesis | your position, stated clearly and early |\n| Reasons and evidence | two or three, each supported |\n| Counterargument and rebuttal | the best objection, answered |\n| Call to action | what should the reader think or do now? |\n\n**Answering the other side**\n- **Counterargument:** the strongest objection to your position\n- **Concession:** admitting what is true in it: “It is fair to say that…”\n- **Rebuttal:** showing why your position still holds: “But…”\n- **Why bother?** It shows you have thought it through, which builds ethos, and it answers the reader’s doubts before they harden\n\n**Five fallacies to avoid** (a logical fallacy is an error in reasoning that makes an argument look stronger than it is)\n| Fallacy | What it does |\n| Ad hominem | attacks the person, not the argument |\n| Straw man | distorts the other side’s view to make it easy to knock down |\n| False dilemma | pretends there are only two choices |\n| Bandwagon | “everyone thinks so, so it must be true” |\n| Slippery slope | claims one step must lead to disaster, with no evidence |`,
        `**The test for a fair counterargument:** would someone who disagrees with you say, “Yes, that is my view”? If not, you have built a straw man.\n\n**Name that fallacy:** “You can’t trust her opinion on school uniforms; she doesn’t even play a sport.” (ad hominem) · “Either we ban phones completely or nobody will ever learn anything again.” (false dilemma) · “If we let students redo one test, soon no deadline will mean anything and the whole school will collapse.” (slippery slope)`,
        `Rewrite each of the three “Name that fallacy” sentences as a fair argument that makes the same point honestly. Which one was hardest to save, and why?`],
      textTitle: 'A model opening', textIcon: '📰',
      text: [
        `Here is how an op-ed can **begin**:\n\n> Last month a classmate showed me a headline that made my stomach drop. It took me ninety seconds, and two new tabs, to learn that it was not true. By then she had already shared it with forty people. Every Ontario student should be taught to check a source before they share it.\n\n**See the moves:**\n- a small **true story** (the hook)\n- a **detail** (forty people)\n- the **thesis** at the end`,
        `**Model opening**\n> Last month a classmate showed me a headline that made my stomach drop. It took me ninety seconds, and two new tabs, to learn that it was not true. By then she had already shared it with forty people. Nobody had ever taught either of us what to do in those ninety seconds. Every Ontario student should be taught to check a source before they share it, and the lesson should not wait until Grade 11.\n\n**The moves:** a hook (a small true story), a telling detail, the problem, then the thesis.\n\n**Plan your case (20 minutes)**\n1. Write your thesis: your position in one arguable sentence.\n2. List three reasons. Beside each, note your evidence: an experience, an example, or your checked source.\n3. Write the objection your partner gave you, one sentence of concession and two of rebuttal.\n4. Draft your hook and your call to action. Trade organizers and check each other for fallacies.`,
        `**Worked counterargument.** Claim: “Schools should start one hour later.” *Counterargument:* a later start would push sports, jobs and family responsibilities later into the evening and complicate bus schedules. *Rebuttal:* those schedules can be adjusted, whereas students cannot learn well if they are too tired to concentrate.`,
        `Which of the three appeals does the model opening use first, and where does logos enter? Rewrite its first sentence so that it opens with logos, and judge which version you would keep reading.`],
      note: [
        ['An op-ed: hook, thesis, reasons with evidence, the other side, call to action.', 'Admit what is fair in the other side. Then answer it.', 'Avoid fallacies like ad hominem, bandwagon and false dilemma.'],
        ['An op-ed has a hook, a thesis, reasons with evidence, a counterargument with rebuttal, and a call to action.', 'Conceding what is fair in the other side strengthens your ethos.', 'Avoid fallacies: ad hominem, straw man, false dilemma, bandwagon, slippery slope.', 'Check every source laterally before you rely on it.']],
      life: ['What is one issue in your school, community or country that you care about enough to argue? What is the strongest objection to your position?', 'An issue I care about is… The strongest objection to my view is…'],
      tryTitle: 'Change my mind',
      tryit: [
        `**Experiment.** Tell someone at home your opinion on your issue in **one sentence**.\n\nAsk: “What is the best reason I might be wrong?”\n\nWrite their answer down. Then write:\n- “It is fair to say that…”\n- “But…”`,
        `**Experiment: survive your strongest objection.**\n\n1. State your position on your issue, in one sentence, to someone who is likely to disagree.\n2. Ask for their strongest objection. Write it down in *their* words, and check with them: “Is that your view?” (the straw-man test).\n3. Write one sentence of concession and two of rebuttal.\n4. Read it back to them. Record whether they moved at all, and why.\n5. **Fallacy hunt:** read the comments under any news story for five minutes. Collect one example each of three different fallacies.`,
        `Take the weakest comment you collected and rewrite it as the strongest fair version of the same view. If you can do that for a position you oppose, you are ready to write your rebuttal.`],
      exit: 'Why does including the other side’s best argument make your own writing MORE persuasive?', exit1: 'Name the five parts of an op-ed.',
      terms: [
        ['op-ed', 'a short opinion article', 'a short opinion article arguing one position for a general audience'],
        ['counterargument', 'the best reason against your opinion', 'the strongest objection to a writer’s position'],
        ['concession', 'admitting what is true in the other side', 'an admission of what is true or reasonable in the opposing view'],
        ['rebuttal', 'your answer to the other side', 'the explanation of why a position still holds despite an objection'],
        ['fallacy', 'a mistake in reasoning', 'an error in reasoning that makes an argument look stronger than it is'],
        ['ad hominem', 'attacking the person, not the argument', 'attacking the person instead of the argument'],
        ['straw man', 'twisting the other side’s view to make it easy to beat', 'distorting the other side’s view to make it easy to knock down'],
        ['call to action', 'telling the reader what to do next', 'the closing appeal that tells readers what to think or do next']],
      q: [
        mc('Attacking the person instead of the argument is the fallacy called:', 'ad hominem', ['straw man', 'slippery slope', 'tic-tac-toe']),
        mc('“Either we ban phones completely or nobody will ever learn anything again” is an example of:', 'a false dilemma', ['a concession', 'an anecdote', 'a haiku']),
        mc('In an op-ed, a concession:', 'admits what is true or reasonable in the opposing view', ['restates the thesis', 'attacks the other side', 'lists the sources']),
        mc('“Everyone in Grade 11 thinks the dress code is unfair, so it must be.” This is:', 'bandwagon', ['ad hominem', 'straw man', 'parallelism']),
        mc('“If we allow one food truck, the cafeteria will close and students will go hungry.” This is:', 'slippery slope', ['false dilemma', 'bandwagon', 'satire']),
        tf('Answering a counterargument fairly can strengthen a writer’s ethos.', true),
        tfx('In an op-ed, the thesis should be stated clearly and early.', 'In an op-ed, the thesis should be hidden until the final sentence.'),
        fill('“My opponent wants shorter classes, which means she thinks learning doesn’t matter.” This fallacy is a ___ man.', 'straw', ['snow', 'iron', 'ginger']),
        app('In a debate about transit fares, one speaker says, “Why listen to him? He doesn’t even take the bus.” The audience should recognize:', 'ad hominem', ['a rebuttal', 'logos', 'a call to action']),
        app('A letter to the editor says, “Critics are right that the new rink will cost more than planned. But the old one is unsafe, and repairs would cost almost as much.” The first sentence is a:', 'concession', ['fallacy', 'hook', 'straw man']),
        app('You are writing to persuade your principal to allow a later start. Which closing line is a true call to action?', '“Pilot a 9:30 start for one semester and measure attendance.”', ['“In conclusion, sleep is important.”', '“Everyone agrees with me.”', '“Thank you for reading.”'])
      ],
      task: T('Lesson 5 task: Plan your case', [
        'Write your opinion on one issue in ONE sentence. Give two reasons. Then finish: “Some people say… but I still think… because…”',
        'List the parts of an op-ed in order. Explain the difference between a concession and a rebuttal. Name the fallacy in each: (1) “Don’t listen to his argument about the bus schedule; he’s always late anyway.” (2) “Everyone in Grade 11 thinks the dress code is unfair, so it must be.” (3) “We either cancel all homework or admit we don’t care about mental health.”',
        'Complete the Level 2 task, and also name the fallacy in: “My opponent wants shorter classes, which means she thinks learning doesn’t matter” and “If we allow one food truck, the cafeteria will close and students will go hungry.” Then, for the claim “Schools should start one hour later,” write ONE fair counterargument and a one-sentence rebuttal. Why does including the other side’s best argument make your writing MORE persuasive?',
        'Complete the Level 3 task. Then complete your Op-Ed Organizer: thesis, three reasons with evidence, the real objection you were given with a concession and rebuttal, a hook and a call to action.'],
        'Some people say… but I still think… because…',
        ['A clear opinion, two reasons, and a sentence that fairly names the other side before answering it.',
         'Hook, thesis, reasons with evidence, counterargument and rebuttal, call to action; concession vs. rebuttal; ad hominem, bandwagon, false dilemma (and straw man, slippery slope); a fair counterargument a real opponent would accept, with a relevant rebuttal; ethos explained.'], 'C1, C2'),
      extra: [T('Unit 5 assignment: Op-Ed (40 marks)', [
        'Choose an issue you care about. Write a 150–200 word opinion piece with: a first sentence that grabs attention, your opinion in one clear sentence, two reasons, one sentence about what the other side says and your answer, and a last sentence telling the reader what to do. Name one source you checked.',
        'Choose an issue on which reasonable people disagree. Find ONE credible source and check it laterally. Write a 350–450 word op-ed with a hook, a thesis, two reasons with evidence, a counterargument with a concession and rebuttal, and a call to action. Give it a headline. Below it, write who is behind your source and why you trust it.',
        'Write a 600–700 word op-ed on an issue you care about (school, community, Canada or the world). Submit: (1) the Op-Ed Organizer, completed in class; (2) a Source Log for at least TWO credible sources: for each, who is behind it, what other sources say about it, and why you trust it; (3) the final op-ed with a headline: hook, thesis, two or three reasons with evidence, counterargument with concession and rebuttal, call to action; use the three appeals and at least two rhetorical devices on purpose; (4) a short annotation labelling one example each of ethos, pathos and logos, and two rhetorical devices.',
        'Complete the Level 3 assignment. Add a 100-word reflection naming the fallacy you were most tempted to use, where, and how you revised it out.'],
        'My headline is… My thesis is…',
        ['A clear opinion stated early, reasons, a fair mention of the other side with an answer, and a checked source.',
         'A thesis that is clear, arguable and stated early; reasons supported by checked evidence; a counterargument a real opponent would recognize, with concession and rebuttal; no fallacies; the three appeals and two devices used deliberately and labelled; a complete Source Log. Marked /40: Knowledge 10 · Thinking 10 · Communication 10 · Application 10. Work must be your own.'], 'C1, C2, C3, C4, D3')],
      media: [
        M(1, 'image', 'An op-ed page from a Canadian newspaper', 'The Globe and Mail / Toronto Star / CBC Opinion', 'https://www.cbc.ca/news/opinion', 'A real published opinion piece to label: hook, thesis, counterargument, call to action.'),
        M(1, 'image', 'Logical fallacies reference chart', 'MediaSmarts / Purdue OWL', 'https://mediasmarts.ca', 'A one-page reference for the five fallacies in this lesson.')]
    })
  ]));

  // =====================================================================
  // UNIT 6 · COURSE CULMINATING TASK AND EXAM REVIEW
  // The final exam's own sight passage is NOT in the app; the practice passage here was written for this course file.
  // =====================================================================
  UNITS.push(U('final', 'Unit 6 · Culminating Task and Exam Review', [
    'Put the whole course together: one big question, two texts, a short talk, and getting ready for the exam.',
    'The Course Culminating Task (“One Question, Two Texts”: comparative essay, seminar and reflection) and review for the two-hour final exam.',
    'The 30 per cent final evaluation: the Course Culminating Task (comparative essay of 800–1000 words, seminar with a checked media connection, and reflection; 100 marks) and review for the Final Examination (selected response, short answer, an unseen non-fiction passage and a two-text essay; 100 marks). Expectations: A1–A3, B1, B2, B4, C1–C4, D1, D4.'
  ], [

    L(1, 'One Question, Two Texts', 'One Question, Two Texts', {
      exp: 'B1 Reading for Meaning · C1 Developing and Organizing Content · C2 Using Knowledge of Form and Style · A2 Speaking to Communicate · D1 Understanding Media Texts',
      goals: ['Choose one big question and two texts from two different units', 'Write a comparative thesis that makes an arguable claim about BOTH texts', 'Plan a comparison that shows what is similar and what is importantly different'],
      warm: [
        `Think of everything we read this year.\n\nWhich **two** stories, poems or plays would you put side by side? What do they have in common?`,
        `**Warm-up.** Look back over the whole course: six short stories, *Frankenstein*, seven poems, *Macbeth*, an essay, a speech and a personal essay.\n\nWhich two texts from different units keep “talking to each other” in your head? What question do they both answer?`],
      ideasTitle: 'How to compare: the comparative thesis and structure',
      ideas: [
        `To **compare** two texts, do not write about one and then the other.\n\nGo **point by point**:\n- Point 1: text A **and** text B\n- Point 2: text A **and** text B\n- Point 3: text A **and** text B\n\nA **comparative thesis** answers the big question and names **both** texts:\n\n“Although both…, [text A]…, while [text B]…”\n\nEvery paragraph is still **PEEL**.`,
        `**A comparative thesis** answers the big question with an arguable claim about BOTH texts.\n\n*Frame (from the poetry unit):* “Although both ___ and ___ show…, [text A] suggests…, while [text B]…”\n\n**Structure of the comparative essay (800–1000 words)**\n| Paragraph | Job |\n| Introduction | names both texts and authors; ends with the comparative thesis |\n| Body 1, 2, 3 (at least) | one point of comparison each, in PEEL form, with evidence from both texts |\n| Conclusion | restates the thesis in new words and answers “so what?” |\n\n**Rules that earn marks**\n- A real comparison: show what is similar AND what is importantly different\n- At least FOUR short quotations (two from each text), introduced, embedded and explained\n- Literary terms from the course, used accurately\n- Present tense, third person, authors’ last names`,
        `**Worked example of a comparative thesis (question 1):** “Although both Victor Frankenstein and Macbeth are destroyed by their own ambition, Shelley shows the cost falling first on the innocent people around the creator, while Shakespeare shows it hollowing out the ambitious man himself.”`,
        `Test your thesis: could a thoughtful classmate argue that your two texts answer the question in the *same* way? If so, sharpen the “while” half until the difference matters.`],
      textTitle: 'The task: five big questions, two texts, four parts', textIcon: '⚖️',
      text: [
        `**Step 1. Choose ONE big question:**\n1. What does ambition cost, and who pays?\n2. When things go wrong, who is responsible?\n3. Why do appearances trick us?\n4. What happens to people who are shut out?\n5. How can one voice change what people believe?\n\n**Step 2. Choose TWO texts** from two different units. One must be *Frankenstein* or *Macbeth*.\n\n**You will make:** a plan, an essay, a short talk to a small group, and a reflection.`,
        `**Step 1: choose a question**\n| | Big question |\n| 1 | What does unchecked ambition cost, and who pays? |\n| 2 | When things go wrong, who is responsible: the individual, or the people and society that shaped them? |\n| 3 | Why do appearances deceive, and what does it take to see clearly? |\n| 4 | What happens to people who are shut out, and what do they show us about the societies that exclude them? |\n| 5 | How can one voice change what other people believe? |\n\nYou may propose a question of your own; it must be approved on Day 1.\n\n**Step 2: choose two texts** from two different units. At least one must be a major text: *Frankenstein* or *Macbeth* (you may use both). The second may be a short story, a poem, an essay or a speech from Units 1, 3 or 5. You may not reuse the argument of an essay you have already submitted.\n\n**What you’ll produce**\n| Part | What it is | When |\n| A. Planning Organizer | question, texts, working thesis, evidence chart, outline; checked in a conference | Days 1–2 |\n| B. Comparative Essay | 800–1000 words, drafted in class | Days 3–4 |\n| C. Seminar | a 3–4 minute talk to four or five classmates, with one visual and one checked media connection; then answer one question | Day 5 |\n| D. Reflection | about 200 words, written in class | Day 5 |`,
        `**The seminar:** your question, your thesis, your best piece of evidence, and one connection to a current media text (a news story, advertisement, film, song or post) whose source you have checked by reading laterally. Speak to your group, not to your notes.`,
        `Which of the five questions could NOT be answered well with your first-choice pair of texts? Explaining why is a fast way to find out what your pair is really about.`],
      note: [
        ['Compare point by point: both texts in every paragraph.', 'A comparative thesis names both texts and makes one claim.', 'Use at least two short quotations from each text.'],
        ['The CCT: one big question, two texts from two units (one must be *Frankenstein* or *Macbeth*).', 'A comparative thesis makes an arguable claim about BOTH texts: “Although both…, A…, while B…”', 'Compare point by point in PEEL paragraphs; show what is similar and what is importantly different.', 'At least four short quotations (two per text), introduced, embedded and explained.', 'Seminar: question, thesis, best evidence, and a media connection from a source you checked laterally.']],
      life: ['Which of the five big questions matters most in your own life right now, and why?', 'The question that matters most to me is… because…'],
      tryTitle: 'The 60-second thesis',
      tryit: [
        `**Experiment.** Tell someone at home, in **one minute**:\n1. your big question\n2. your two texts\n3. your answer\n\nAsk them: “Did that make sense?” and “What would you ask me?”\n\nWrite down their question. It may be the one your group asks!`,
        `**Experiment: can you say it in a minute?**\n\n1. Explain your question, your two texts and your thesis to someone outside the class in 60 seconds. Time it, or use 🎙️ **Record**.\n2. Ask them to repeat your thesis back. If they cannot, it is not clear yet. Revise and try again.\n3. Ask what they would want to know next. Write the question down: practise answering it.\n4. Find your **media connection**: one current news story, ad, film, song or post that raises your question. Check its source laterally (who is behind it, what is the evidence, what do other sources say?).`,
        `Deliver the full 3–4 minute seminar once to a listener or a recording. Mark where you looked at your notes; cut one sentence there and replace it with eye contact.`],
      exit: 'Write your working comparative thesis in one sentence.', exit1: 'Which two texts will you compare?',
      terms: [
        ['comparative essay', 'an essay about how two texts are alike and different', 'an essay that develops one argument by comparing two texts point by point'],
        ['comparative thesis', 'one sentence that makes a claim about both texts', 'a thesis that makes one arguable claim about two texts, including how they differ'],
        ['seminar', 'a short talk to a small group, with questions', 'a short presentation to a small group, followed by questions'],
        ['organizer', 'a planning sheet', 'a planning sheet: question, texts, thesis, evidence chart and outline'],
        ['evidence', 'quotations and details that prove your point', 'the quotations and specific details that support a point'],
        ['reflection', 'writing about what you learned and changed', 'a piece of writing that looks back on one’s own process and learning']],
      q: [
        mc('For the CCT, your two texts must come from:', 'two different units, and one must be Frankenstein or Macbeth', ['the same unit', 'outside the course', 'the school library only']),
        mc('A comparative thesis should:', 'make an arguable claim about BOTH texts', ['summarize the first text', 'ask the reader a question', 'list the characters']),
        mc('How many short quotations must the comparative essay include, at minimum?', 'Four: two from each text', ['One', 'Four, all from one text', 'None']),
        mc('The best way to organize a comparison is:', 'point by point, with both texts in each body paragraph', ['all of text A, then all of text B', 'in the order you read them', 'alphabetically']),
        mc('In the seminar, your media connection must be:', 'from a source you have checked by reading laterally', ['at least ten years old', 'a video you made yourself', 'kept secret from your group']),
        tf('The CCT essay is planned and drafted in class so that it is your own work.', true),
        tfx('A strong comparison shows what is similar AND what is importantly different.', 'A strong comparison only needs to list the similarities between two texts.'),
        fill('“Although both texts…, the first…, ___ the second…” is a frame for a comparative thesis.', 'while', ['because', 'when', 'pizza']),
        app('A student’s thesis reads: “Macbeth and Frankenstein are both about ambition.” The best advice is:', 'Say what each text suggests ABOUT ambition and how they differ', ['Add a third text', 'Remove the titles', 'Turn it into a question']),
        app('A student plans: paragraph 1 on Victor, paragraph 2 on Macbeth, paragraph 3 on which book she liked. What is missing?', 'Comparison within each paragraph', ['A longer introduction', 'More plot summary', 'A title page']),
        app('For question 5 (“How can one voice change what other people believe?”), which pair fits the rules and the question best?', 'Lady Macbeth’s persuasion in Macbeth and Severn Cullis-Suzuki’s speech', ['“The Lottery” and “The Tell-Tale Heart”', '“Ozymandias” and “In Flanders Fields”', 'Two scenes from Macbeth'])
      ],
      task: T('CCT Part A: Planning Organizer', [
        'Write: (1) the big question you chose, (2) your two texts, (3) one way the two texts are ALIKE, (4) one way they are DIFFERENT. Then finish: “Both texts show that…”',
        'Write your question, your two texts (from two different units) and a working thesis. Make an evidence chart: for each text, two short quotations or details and what each one shows.',
        'Complete the Planning Organizer: your question; your two texts; a working comparative thesis; an evidence chart with at least two short quotations per text (with chapter, act.scene or line) and what each proves; and an outline of at least three points of comparison. Bring it to your thesis conference.',
        'Complete the Level 3 organizer. Add the strongest objection to your thesis and one sentence of rebuttal, and note the literary terms you will use in each paragraph.'],
        'Although both texts…, …, while…',
        ['A question, two texts, one similarity and one difference, and a sentence about what both show.',
         'An arguable thesis about BOTH texts; two accurate quotations per text with their location; at least three points of comparison that each involve both texts; texts from two different units with one major text.'], 'B1, C1'),
      extra: [
        T('CCT Part B: Comparative Essay (800–1000 words)', [
          'Write three PEEL paragraphs about your question. In each one, say something about BOTH texts and use one short quotation or detail. Finish with one sentence that answers your big question.',
          'Write a 500–600 word comparative essay: an introduction that names both texts and ends with your thesis; three body paragraphs in PEEL form, each discussing both texts; a short conclusion. Include at least two short quotations in all, one from each text.',
          'Write a comparative essay of 800–1000 words, drafted in class: a clear thesis; at least three body paragraphs; a real comparison of the two texts; at least FOUR short quotations (two from each text), each introduced and explained; literary terms from the course used accurately. Peer edit with the checklist and revise.',
          'Complete the Level 3 essay. In one paragraph, answer the strongest objection to your thesis with a concession and a rebuttal, as you learned in Unit 5.'],
          'In ___ and ___, …',
          ['Paragraphs that each make a point about both texts with a quotation or detail and an explanation.',
           'A thesis that answers the big question with an arguable claim about BOTH texts; PEEL body paragraphs; similarities and important differences; exact, short, introduced and explained quotations; accurate terms. The whole task is marked /100: Knowledge 25 · Thinking 25 · Communication 25 · Application 25.'], 'B1, B2, C1, C2, C3'),
        T('CCT Parts C and D: Seminar and Reflection', [
          'Tell your group (or your teacher): your question, your two texts, and your answer. Show one picture or slide. Then write five sentences: what you are proud of, and one thing you learned in this course that you will keep using.',
          'Give a 2–3 minute talk: your question, your thesis and your best piece of evidence. Show one visual. Name one news story, ad, film, song or post that connects, and say where it came from. Then write a reflection of about 100 words.',
          'Seminar: a 3–4 minute talk to a group of four or five: your question, your thesis, your best piece of evidence, and one connection to a current media text whose source you have checked by reading laterally. Use one slide or one-page visual, then answer one question from your group. Reflection (about 200 words, written in class): what you are proudest of, what you changed between plan and final copy, and one skill from this course you will keep using. If the seminar is a barrier, speak to your teacher: you may present to the teacher alone or submit a recording.',
          'Complete the Level 3 seminar and reflection. In your reflection, also name the piece of feedback from this course that changed your writing most, and show where it appears in your final essay.'],
          'The question I chose was… My thesis is…',
          ['A clear spoken answer with a visual, and a reflection that names something specific.',
           'Speaks to the group, not to notes; thesis and best evidence stated clearly; a relevant media connection from a checked source; one group question answered; a reflection that is honest and specific about process and about a skill to keep.'], 'A2, A3, C4, D1, D4')],
      media: [
        M(2, 'image', 'Planning Organizer: One Question, Two Texts', 'Teacher’s course package (paste the Google Doc link)', 'https://docs.google.com', 'The organizer students complete on Days 1–2; paste your own share link here.'),
        M(1, 'image', 'Venn diagram / point-by-point comparison chart', 'Wikimedia Commons', 'https://commons.wikimedia.org', 'A visual for planning what is shared and what is importantly different.')]
    }),

    L(2, 'Exam Review', 'Final Exam Review', {
      exp: 'B1 Reading for Meaning · B2 Understanding Form and Style · B4 Reflecting on Skills and Strategies · C1 Developing and Organizing Content · D1 Understanding Media Texts',
      goals: ['Describe the format and timing of the final exam', 'Analyze an unseen non-fiction passage: thesis, appeals, devices, concession', 'Plan a two-text essay answer in five minutes'],
      warm: [
        `Which unit do you remember **best**? Which do you remember **least**?\n\nStart your review with the one you remember least.`,
        `**Warm-up.** Rank the five units from the one you remember best to the one you remember least. Beside the weakest, write the three terms you are least sure of.\n\nThat list, not the textbook order, is where your review starts.`],
      ideasTitle: 'Exam format, and what to know from each unit',
      ideas: [
        `**The exam is 2 hours, 100 marks.**\n\n| Part | What |\n| A | 25 multiple choice |\n| B | 20 matching |\n| C | 10 true or false (fix the false ones!) |\n| D | short answers + a passage you have not seen |\n| D | one essay about **two texts** |\n\n**How to study:**\n- Redo the unit tests and quizzes in this app.\n- Make **one page** for each big text.\n- Practise **PEEL**.`,
        `**Exam format (2 hours, 100 marks)**\n| Section | What to expect | Marks | Time |\n| A. Multiple Choice | 25 questions, five from each unit | 25 | 15 min |\n| B. Matching | 20 terms and definitions | 20 | 10 min |\n| C. True or False | 10 statements; correct the false ones | 10 | 10 min |\n| D. Short Answer | the short story, *Frankenstein*, *Macbeth*, and two questions on a passage you have not seen before | 25 | 40 min |\n| D. Essay | one of three prompts; two texts from two different units | 20 | 40 min |\n\nLeave five minutes to reread your essay.\n\n**How to study**\n- **Redo the unit tests** (and every lesson quiz here). Many exam questions are close relatives of these\n- **Reread your worksheets and records:** your “Write this down” notes are your study guide\n- **Make a one-page sheet for each major text:** plot in five points, four characters, three themes as full sentences, and five short quotations you can use from memory\n- **Practise PEEL:** every short answer and every essay body paragraph uses it`,
        `**Texts by unit.** *Unit 1:* Chopin, Roberts, Poe, Jackson, Johnson, Leacock. *Unit 2:* Frankenstein (Walton’s letters, Victor’s story, the Creature’s story). *Unit 3:* Dickinson, Johnson, Shelley, McCrae, Owen, Rita Joe, Koyczan. *Unit 4:* Macbeth, all five acts. *Unit 5:* Leacock, Cullis-Suzuki, Orwell, the five key concepts, lateral reading, the op-ed and fallacies.\n\n**On the day:** in True or False, a false statement earns its mark only when you correct it. If you cannot remember a quotation exactly, describe the moment accurately instead. **Never invent a quotation.**`,
        `Plan (do not write out) an answer to this practice prompt in five minutes: “Guilt is a punishment no court needs to hand down.” Thesis, two texts from two units, one detail from each.`],
      textTitle: 'Practice: reading a passage you have not seen before', textIcon: '🧭',
      text: [
        `**How to read a new passage:** read the **questions first**. Then read the passage with a pencil.\n\n**Practice passage: “Walk It”**\n> Last winter my bus pass expired and I was too stubborn to tell my parents. So for three weeks I walked the two kilometres to school. I expected to hate it. Instead, I arrived awake. Walking is not for everyone, but every student who can walk to school should try it for a month.\n\n**Find:** the **thesis** (last sentence), the **story** (the bus pass), and the words that admit the other side (“not for everyone”).`,
        `**For the sight passage:** read the questions first, then the passage, with a pencil in your hand. Find the thesis, one example each of ethos, pathos and logos, three devices and the concession. Give yourself ten minutes.\n\n**Practice passage: “Walk It”** (written for this course)\n> Last winter my bus pass expired, and I was too stubborn to tell my parents. So for three weeks I walked the two kilometres to school. I expected to hate it. I expected frozen ears, wet socks and a daily argument with my alarm clock. Instead, I arrived awake. I noticed which houses had new puppies. I solved two math problems in my head and one argument with my sister. It is fair to say that walking is not possible for everyone: some students live too far, and some streets are not safe. But if you can walk, why are you waiting for a bus that makes you later, sleepier and no happier? Try it for one month. Your first class will thank you.\n\n**Questions**\n1. State the writer’s thesis in your own words.\n2. How does the opening anecdote support that thesis?\n3. Identify THREE devices and quote an example of each.\n4. Quote the concession, and explain why including it makes the argument stronger.`,
        `**Model answers.** *Thesis:* students who are able to should walk to school because it leaves them more alert and observant. *Anecdote:* an accidental experiment the writer did not want to do, so the good result is believable (ethos). *Devices:* anaphora (“I expected… I expected…”), a rhetorical question (“why are you waiting…?”), a list of three (“later, sleepier and no happier”), direct address (“you”). *Concession:* “It is fair to say that walking is not possible for everyone”: it shows fairness and answers the reader’s first objection.`,
        `Which appeal is weakest in “Walk It”? Rewrite one sentence to add the missing logos (a checked fact you would need to find), and say what source you would trust for it.`],
      note: [
        ['The exam: multiple choice, matching, true or false, short answers, one essay.', 'New passage: read the questions first. Find the thesis and the concession.', 'Never invent a quotation. Describe the moment instead.'],
        ['Exam: 2 hours, 100 marks: A multiple choice (25), B matching (20), C true or false (10), D short answer (25), essay on two texts from two units (20).', 'Sight passage: questions first; find the thesis, the appeals, three devices and the concession.', 'Every short answer and essay paragraph is PEEL.', 'One page per major text: plot in five points, four characters, three themes as full sentences, five short quotations.', 'In True or False, correct every false statement. Never invent a quotation.']],
      life: ['Which skill from this course (close reading, PEEL, checking a source, speaking a poem, answering the other side) will you actually keep using outside school? Where?', 'The skill I will keep using is… I will use it when…'],
      tryTitle: 'One page, ten minutes',
      tryit: [
        `**Experiment.** Make a **one-page sheet** for *Macbeth* or *Frankenstein*:\n- what happens, in **5 points**\n- **4** characters\n- **1** theme as a full sentence\n- **2** short quotations\n\nTomorrow, cover it and see what you remember.`,
        `**Experiment: test-study-retest.**\n\n1. Before studying, take the Unit 2 or Unit 4 test in this app cold. Record your score.\n2. Make a one-page sheet for that text: plot in five points, four characters, three themes as full sentences, and five short quotations.\n3. The next day, cover the sheet and write out as much as you can. Check it.\n4. Retake the test. Record the new score and what made the difference.\n5. Then do one timed sight passage: take any opinion article and, in ten minutes, find the thesis, one example each of ethos, pathos and logos, three devices and the concession.`,
        `Plan answers to the other two practice prompts in five minutes each: “How do two writers from this course show the power, or the danger, of words?” and “‘We are shaped by how others treat us.’ To what extent do two texts from this course agree?”`],
      exit: 'In True or False on the exam, what must you do with a false statement to earn the mark?', exit1: 'How long is the exam?',
      terms: [
        ['sight passage', 'a text on a test that you have not seen before', 'an unseen text presented for analysis on a test or exam'],
        ['concession', 'admitting what is true in the other side', 'an admission of what is true or reasonable in the opposing view'],
        ['PEEL', 'Point, Evidence, Explain, Link', 'a paragraph structure: Point, Evidence, Explain, Link'],
        ['thesis', 'the main claim', 'the central, arguable claim of a text or essay'],
        ['literary term', 'a special word for talking about writing', 'a precise word for a feature of writing, such as motif, foil or irony'],
        ['quotation', 'the exact words from a text', 'the exact words of a text, reproduced inside quotation marks']],
      q: [
        mc('The final exam essay asks you to write about:', 'two texts from two different units', ['one text of your choice', 'three poems', 'a film']),
        mc('What should you do FIRST with a sight passage?', 'Read the questions, then read the passage with a pencil', ['Count the paragraphs', 'Write your essay', 'Skip it']),
        mc('In “Walk It,” which sentence is the concession?', '“It is fair to say that walking is not possible for everyone.”', ['“Instead, I arrived awake.”', '“Try it for one month.”', '“I expected to hate it.”']),
        mc('“I expected to hate it. I expected frozen ears…” This device is:', 'anaphora', ['a concession', 'onomatopoeia', 'a sonnet']),
        mc('If you cannot remember a quotation exactly on the exam, you should:', 'describe the moment accurately instead', ['invent a quotation that sounds right', 'leave the question blank', 'quote a different book']),
        mc('Which pair is correctly matched?', 'Equivocation: Macbeth · Frame narrative: Frankenstein', ['Volta: Macbeth · Regicide: Poetry', 'Lateral reading: Short stories · Sonnet: Media', 'Hubris: Poetry · Anaphora: Short stories']),
        tf('The exam is two hours long and worth 100 marks.', true),
        tfx('In True or False, a false statement earns its mark only when you correct it.', 'In True or False, you never need to explain why a statement is false.'),
        fill('Every short answer and every essay body paragraph should use ___: Point, Evidence, Explain, Link.', 'PEEL', ['PAT', 'STEAL', 'TP-CASTT']),
        app('You have 40 minutes for the essay and no plan. The most effective first five minutes are spent:', 'writing a thesis, choosing two texts, and noting one detail from each', ['copying out the question neatly', 'writing the conclusion first', 'starting with a long plot summary']),
        app('The exam asks you to trace the motif of blood in Macbeth with two examples from different acts. The strongest pair is:', '“Neptune’s ocean” (2.2) and “Out, damned spot” (5.1)', ['two lines from the same speech in 2.2', 'the witches’ chant and the Porter’s jokes', 'Birnam Wood and Dunsinane']),
        app('For the question “Is the Creature’s character the result of nature or nurture?”, which evidence best supports nurture?', 'He gathers firewood for the De Laceys and turns violent only after being attacked, beaten and shot', ['He is eight feet tall', 'Victor studied at Ingolstadt', 'Walton writes to his sister'])
      ],
      task: T('Exam practice: the sight passage and an essay plan', [
        'Read “Walk It.” Answer: (1) What does the writer want students to do? (2) What story does the writer tell at the start? (3) Copy the sentence where the writer admits walking is not for everyone.',
        'Read “Walk It.” (1) State the writer’s thesis in your own words. (2) Explain how the opening anecdote supports it. (3) Identify TWO devices and quote an example of each.',
        'Answer all four questions on “Walk It” (thesis; anecdote; THREE devices with quotations; the concession and why it strengthens the argument). Then plan an exam essay for ONE practice prompt: a thesis, two texts from two different units, and one specific detail from each.',
        'Complete the Level 3 task under timed conditions (10 minutes for the passage, 5 for the plan). Then write the full introduction and one PEEL body paragraph of your essay, using at least three literary terms correctly.'],
        'The writer’s thesis is…',
        ['Walk to school if you can; the bus pass story; the “It is fair to say…” sentence.',
         'An accurate thesis; the anecdote linked to credibility; three devices with exact quotations (for example anaphora, rhetorical question, list of three, direct address); the concession quoted and explained (fairness, ethos); an essay plan with an arguable thesis and two texts from two units.'], 'B1, B2, C1'),
      extra: [T('My one-page review sheets', [
        'Choose ONE text: Macbeth or Frankenstein. Write: what happens, in five short points; four characters; one thing the story teaches; one line you remember.',
        'Make a one-page sheet for Macbeth AND one for Frankenstein: plot in five points, four characters, two themes as full sentences, and three short quotations each.',
        'Make a one-page sheet for each major text (Frankenstein and Macbeth): plot in five points, four characters, three themes as full sentences, and five short quotations you can use from memory, each with its speaker and chapter or act.scene. Add a third sheet of the twenty terms you are least sure of, with a definition and an example for each.',
        'Complete the Level 3 sheets. Add a comparison box linking the two major texts on three points (for example ambition, guilt, responsibility) with one quotation from each per point.'],
        'Plot in five points: 1.…',
        ['A clear sheet you could study from: plot points, characters, a theme sentence and a line from the text.',
         'Accurate plot points and characters; themes written as full, arguable sentences; quotations exact and located; terms defined with examples from the course texts.'], 'B1, B4')],
      media: [
        M(1, 'image', 'Final Exam Review Guide (texts and terms by unit)', 'Teacher’s course package (paste the Google Doc link)', 'https://docs.google.com', 'The full list of twenty terms per unit; paste your own share link here.'),
        M(2, 'image', 'An opinion article for timed sight-passage practice', 'CBC Opinion / a local newspaper', 'https://www.cbc.ca/news/opinion', 'Any short op-ed: find the thesis, the appeals, three devices and the concession in ten minutes.')]
    })
  ]));

  // ---------- colouring pictures (original line art; one per unit) ----------
  W.LearnHub.colouring = W.LearnHub.colouring || {};
  function pic(unit, title, svg) { var k = 'eng3u/' + unit; (W.LearnHub.colouring[k] = W.LearnHub.colouring[k] || []).push({ title: title, svg: svg }); }
  pic('stories', 'The open window', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="5" y="5" width="390" height="290"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="90" y="40" width="220" height="190"/><circle class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="265" cy="85" r="24"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M90 230 L90 170 Q150 140 200 175 Q250 150 310 180 L310 230 Z"/><circle class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="150" cy="130" r="30"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="144" y="158" width="12" height="40"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M205 105 q12 -14 24 0 q12 -14 24 0 q-24 10 -48 0 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M60 30 L110 30 Q120 130 80 235 L60 235 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M340 30 L290 30 Q280 130 320 235 L340 235 Z"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="75" y="230" width="250" height="16"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M150 262 h100 l14 28 h-128 Z"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="330" y="250" width="50" height="36"/></svg>');
  pic('frankenstein', 'Ice, mountains and a ship', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="5" y="5" width="390" height="180"/><circle class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="320" cy="55" r="28"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M20 185 L110 60 L170 185 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M130 185 L220 85 L300 185 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M110 60 L92 85 L108 78 L120 92 L128 85 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M180 30 L160 75 L182 70 L165 115 L210 60 L186 64 L204 30 Z"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="5" y="185" width="390" height="110"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M250 215 h110 l-18 30 h-74 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M300 215 V140 l42 60 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M296 215 V155 l-34 50 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M30 250 l40 -22 l34 22 l-36 20 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M130 270 l46 -16 l30 20 l-44 14 Z"/></svg>');
  pic('poetry', 'The song my paddle sings', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="5" y="5" width="390" height="165"/><circle class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="70" cy="60" r="30"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M250 170 L290 70 L330 170 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M310 170 L345 95 L380 170 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M150 70 q16 -18 32 0 q16 -18 32 0 q-32 14 -64 0 Z"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="5" y="170" width="390" height="125"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M70 205 Q200 250 330 205 Q200 232 70 205 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M70 205 Q200 232 330 205 Q300 262 200 262 Q100 262 70 205 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M196 130 l10 0 l6 70 l-22 0 Z"/><ellipse class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="201" cy="118" rx="14" ry="22"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M30 275 q20 -14 40 0 q20 -14 40 0 l0 14 l-80 0 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M270 280 q20 -14 40 0 q20 -14 40 0 l0 12 l-80 0 Z"/></svg>');
  pic('macbeth', 'Crown, dagger and candle', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="5" y="5" width="390" height="290"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M40 250 V120 h30 v-25 h20 v25 h30 v-25 h20 v25 h30 v130 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M95 250 v-50 a15 15 0 0 1 30 0 v50 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M215 110 L205 60 L232 85 L250 50 L268 85 L295 60 L285 110 Z"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="212" y="110" width="76" height="14"/><circle class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="250" cy="45" r="7"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M243 150 h14 l-3 90 l-4 18 l-4 -18 Z"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="228" y="140" width="44" height="10"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="244" y="126" width="12" height="14"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="330" y="170" width="24" height="80"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M342 170 q-14 -22 0 -42 q14 20 0 42 Z"/><ellipse class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="342" cy="255" rx="34" ry="10"/><circle class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="345" cy="55" r="22"/></svg>');
  pic('media', 'Who is speaking?', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="5" y="5" width="390" height="290"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M40 150 L130 110 L130 200 Z"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="130" y="118" width="18" height="74"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="60" y="160" width="16" height="50"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M170 60 h130 a16 16 0 0 1 16 16 v40 a16 16 0 0 1 -16 16 h-80 l-26 24 v-24 h-24 a16 16 0 0 1 -16 -16 v-40 a16 16 0 0 1 16 -16 Z"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="190" y="170" width="120" height="100"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="200" y="180" width="100" height="18"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="200" y="206" width="44" height="54"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="252" y="206" width="48" height="54"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="330" y="150" width="50" height="100" rx="8"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="337" y="162" width="36" height="66"/><circle class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="100" cy="250" r="26"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M118 268 l10 -10 l30 30 l-10 10 Z"/></svg>');
  pic('final', 'Books, cap and scroll', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="5" y="5" width="390" height="290"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="60" y="230" width="180" height="34"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="75" y="196" width="165" height="34"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="68" y="162" width="150" height="34"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M143 150 L60 118 L143 86 L226 118 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M100 134 v22 q43 22 86 0 v-22 l-43 16 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M222 118 h8 v40 h-8 Z"/><rect class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" x="270" y="70" width="90" height="120"/><ellipse class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="315" cy="70" rx="50" ry="10"/><ellipse class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="315" cy="190" rx="50" ry="10"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M280 280 l70 -70 l14 14 l-70 70 Z"/><path class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" d="M280 280 l-8 22 l22 -8 Z"/><circle class="region" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round" cx="330" cy="40" r="18"/></svg>');

  // ---------- the course ----------
  W.LearnHub.courses.push({
    id: 'eng3u',
    title: 'ENG3U - English',
    subtitle: 'Grade 11 English, University Preparation',
    description: 'Short stories, Frankenstein, poetry, Macbeth, and media and non-fiction. Every lesson has a note to record, a small experiment to try in your own life, a quiz and two assignments. Based on The Ontario Curriculum, Grades 11 and 12: English (2007).',
    icon: '📚',
    color: '#6b3fa0',
    awards: {
      study:        { icon: '📓', name: 'Notebook Kept: {unit}', desc: 'Read every lesson in {unit}.' },
      testPass:     { icon: '🖋️', name: 'Close Reader: {unit}', desc: 'Passed the {unit} test.' },
      testPerfect:  { icon: '💯', name: 'Every Word Counts: {unit}', desc: 'A perfect score on the {unit} test.' },
      games3:       { icon: '🎭', name: 'Player of Parts: {unit}', desc: 'Finished three games in {unit}.' },
      allGames:     { icon: '🎖️', name: 'Master of Revels: {unit}', desc: 'Finished every game in {unit}.' },
      unitMedal:    { icon: '🏅', name: 'Medal of Letters: {unit}', desc: 'Lessons read, quizzes passed and the test passed in {unit}.' },
      courseTrophy: { icon: '🏆', name: 'The Laureate', desc: 'Earned every unit medal in {course}.' }
    },
    units: UNITS
  });
})();
