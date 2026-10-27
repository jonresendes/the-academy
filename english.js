/* =========================================================
   English — Literature & Language
   Copy this file to start a new course. See README.md for
   the full format. Any text can be a plain string OR an
   object with level variants: { 1: 'simple', 2: 'standard', 3: 'advanced' }.
   ========================================================= */
window.LearnHub = window.LearnHub || { courses: [] };
window.LearnHub.courses.push({
  id: 'english',
  title: 'English',
  subtitle: 'Literature & Language',
  description: 'Words, sentences and stories — how language works and how writers use it.',
  icon: '📚',
  color: '#5b4fd6',

  /* Award names for this course. {unit} and {course} are filled in automatically. */
  awards: {
    study:        { icon: '📖', name: 'Bookworm: {unit}',         desc: 'Read every slide in the {unit} Study Room.' },
    testPass:     { icon: '✒️', name: 'Scribe: {unit}',            desc: 'Score 70% or more on the {unit} test.' },
    testPerfect:  { icon: '🪶', name: 'Golden Quill: {unit}',      desc: 'Score 100% on the {unit} test.' },
    games3:       { icon: '🎭', name: 'Playwright: {unit}',        desc: 'Finish 3 different games in {unit}.' },
    allGames:     { icon: '🎖️', name: 'Bard of {unit}',            desc: 'Finish every game in {unit}.' },
    unitMedal:    { icon: '🏅', name: 'Medal of Letters: {unit}',  desc: 'Finish the Study Room, pass the test and complete 3 games in {unit}.' },
    courseTrophy: { icon: '🏆', name: 'Poet Laureate',             desc: 'Earn the Medal of Letters for every unit in English.' }
  },

  units: [
    {
      id: 'parts-of-speech',
      title: 'Parts of Speech',
      description: { 1: 'Learn the jobs that words do.', 2: 'The eight kinds of words and the jobs they do in a sentence.', 3: 'Classifying words by function: nouns, verbs, modifiers and connectors.' },

      lessons: [
        {
          title: 'Nouns',
          slides: [
            { title: 'What is a noun?', visual: '🏠',
              body: { 1: 'A **noun** is a naming word.\n\nIt names a **person**, a **place** or a **thing**.\n\n- dog\n- school\n- Maria',
                      2: 'A **noun** is a word that names a person, place, thing or idea.\n\n- Person: teacher, Maria\n- Place: school, Canada\n- Thing: pencil, river\n- Idea: freedom, happiness',
                      3: 'A **noun** names a person, place, thing or abstract idea. Nouns can be **concrete** (things you can sense: pencil, thunder) or **abstract** (ideas and qualities: justice, courage).\n\nIn a sentence, a noun can act as the subject, the object or the complement.' } },
            { title: 'Proper nouns', visual: '🗺️',
              body: { 1: 'Some nouns are **names**.\n\nNames start with a **capital letter**.\n\n- Maria\n- Canada\n- Monday',
                      2: 'A **proper noun** is the specific name of a person, place or thing. Proper nouns always begin with a capital letter.\n\n- common noun: city → proper noun: Montréal\n- common noun: girl → proper noun: Maria',
                      3: 'A **proper noun** names a specific, unique entity and is always capitalised: *Montréal*, *the Pacific Ocean*, *Tuesday*. A **common noun** names a general class: *city*, *ocean*, *day*.\n\nNote that titles become proper nouns when attached to a name (*Doctor Lee*) but not when used generally (*a doctor*).' } },
            { title: 'Try it', visual: '🔍',
              body: { 1: 'Find the noun:\n\n**The cat sleeps.**\n\nThe noun is **cat**. It names a thing.',
                      2: 'Find the nouns in this sentence:\n\n**The teacher gave Sam a book about Canada.**\n\nNouns: teacher, Sam, book, Canada.',
                      3: 'Identify each noun and classify it:\n\n**Curiosity led the scientist from Toronto to a discovery.**\n\n- curiosity — abstract, common\n- scientist — concrete, common\n- Toronto — concrete, proper\n- discovery — abstract, common' } }
          ]
        },
        {
          title: 'Verbs',
          slides: [
            { title: 'What is a verb?', visual: '🏃',
              body: { 1: 'A **verb** is a doing word.\n\nIt tells what someone **does**.\n\n- run\n- eat\n- sing',
                      2: 'A **verb** is a word that shows an action or a state of being.\n\n- Action verbs: run, write, think\n- Being verbs: is, am, are, was, were',
                      3: 'A **verb** expresses an action, an occurrence or a state of being. Every complete sentence has at least one verb.\n\n- Action: *She **sprinted** home.*\n- Occurrence: *The storm **happened** overnight.*\n- State: *They **are** tired.*' } },
            { title: 'Verb tense', visual: '⏳',
              body: { 1: 'Verbs can tell **when**.\n\n- Now: I **jump**.\n- Before: I **jumped**.\n- Later: I **will jump**.',
                      2: 'The **tense** of a verb tells when something happens.\n\n- Present: I walk\n- Past: I walked\n- Future: I will walk\n\nMany past-tense verbs end in **-ed**, but some change completely: go → went, eat → ate.',
                      3: 'Tense places an action in time. English has three main tenses (past, present, future), each with simple, progressive and perfect forms.\n\n- Simple past: *I wrote*\n- Past progressive: *I was writing*\n- Present perfect: *I have written*\n\n**Irregular verbs** do not take *-ed*: *go/went*, *speak/spoke*, *begin/began*.' } }
          ]
        },
        {
          title: 'Adjectives & Adverbs',
          slides: [
            { title: 'Adjectives', visual: '🎨',
              body: { 1: 'An **adjective** describes a noun.\n\n- a **big** dog\n- a **red** ball',
                      2: 'An **adjective** describes or modifies a noun. It tells which one, what kind or how many.\n\n- the **tall** tree\n- **three** apples\n- a **funny** story',
                      3: 'An **adjective** modifies a noun or pronoun, answering *which?*, *what kind?* or *how many?*. Adjectives can be compared: *tall, taller, tallest* or *beautiful, more beautiful, most beautiful*.' } },
            { title: 'Adverbs', visual: '💨',
              body: { 1: 'An **adverb** tells **how** you do something.\n\n- run **fast**\n- sing **loudly**',
                      2: 'An **adverb** describes a verb. It often ends in **-ly** and tells how, when or where.\n\n- She ran **quickly**. (how)\n- We left **early**. (when)\n- Come **here**. (where)',
                      3: 'An **adverb** modifies a verb, an adjective or another adverb, answering *how?*, *when?*, *where?* or *to what degree?*.\n\n- modifies a verb: *She spoke **softly**.*\n- modifies an adjective: *a **remarkably** clear sky*\n- modifies an adverb: *He arrived **very** late.*\n\nNot every *-ly* word is an adverb (*friendly*, *lovely* are adjectives).' } }
          ]
        }
      ],

      /* Vocabulary — used by Matching, Memory, Tap & Reveal, Wheel of Fortune and as a fallback for games. */
      terms: [
        { term: 'noun',       def: { 1: 'a naming word', 2: 'a word that names a person, place, thing or idea', 3: 'a word naming a person, place, thing or abstract idea' } },
        { term: 'verb',       def: { 1: 'a doing word', 2: 'a word that shows an action or state of being', 3: 'a word expressing an action, occurrence or state' } },
        { term: 'adjective',  def: { 1: 'a word that describes a thing', 2: 'a word that describes a noun', 3: 'a modifier that describes a noun or pronoun' } },
        { term: 'adverb',     def: { 1: 'a word that tells how', 2: 'a word that describes a verb', 3: 'a modifier of a verb, adjective or adverb' } },
        { term: 'pronoun',    def: { 1: 'a word like he, she or it', 2: 'a word that takes the place of a noun', 3: 'a word substituting for a noun or noun phrase' }, levels: [2, 3] },
        { term: 'proper noun', def: { 1: 'a name with a capital letter', 2: 'the name of a specific person, place or thing', 3: 'a capitalised noun naming a unique entity' } },
        { term: 'tense',      def: { 1: 'when something happens', 2: 'the form of a verb that shows time', 3: 'the verb form locating an action in time' }, levels: [2, 3] },
        { term: 'preposition', def: { 2: 'a word that shows position or relationship, like on or under', 3: 'a word relating a noun to another part of the sentence' }, levels: [3] },
        { term: 'conjunction', def: { 2: 'a joining word like and, but or because', 3: 'a word connecting words, phrases or clauses' }, levels: [3] }
      ],

      /* Test questions. Types: mc, tf, fill, match. Optional `levels: [..]` restricts a question to some levels.
         `cat` groups questions into Jeopardy categories. */
      questions: [
        { type: 'mc', cat: 'Nouns', prompt: 'Which word is a noun?', answer: 'apple',
          options: { 1: ['apple', 'run'], 2: ['apple', 'run', 'quickly'], 3: ['apple', 'run', 'quickly', 'under'] } },
        { type: 'mc', cat: 'Nouns', prompt: { 1: 'Which one is a name?', 2: 'Which word is a proper noun?', 3: 'Which of these is a proper noun?' }, answer: 'Canada',
          options: { 1: ['Canada', 'dog'], 2: ['Canada', 'country', 'happy'], 3: ['Canada', 'country', 'northern', 'nation'] } },
        { type: 'tf', cat: 'Nouns', prompt: { 1: 'A noun is a naming word.', 2: 'A noun names a person, place, thing or idea.', 3: 'Abstract nouns name things you can touch.' }, answer: true,
          levels: [1, 2] },
        { type: 'tf', cat: 'Nouns', prompt: 'Abstract nouns name things you can touch.', answer: false, levels: [3] },
        { type: 'mc', cat: 'Verbs', prompt: 'Which word is a verb?', answer: 'jump',
          options: { 1: ['jump', 'table'], 2: ['jump', 'table', 'green'], 3: ['jump', 'table', 'green', 'slowly'] } },
        { type: 'mc', cat: 'Verbs', prompt: { 1: 'Which one happened before?', 2: 'Which sentence is in the past tense?', 3: 'Which sentence is in the simple past tense?' }, answer: 'I walked to school.',
          options: { 1: ['I walked to school.', 'I walk to school.'], 2: ['I walked to school.', 'I walk to school.', 'I will walk to school.'], 3: ['I walked to school.', 'I was walking to school.', 'I have walked to school.', 'I will walk to school.'] } },
        { type: 'tf', cat: 'Verbs', prompt: 'The word "is" is a verb.', answer: true },
        { type: 'mc', cat: 'Describing words', prompt: 'Which word is an adjective?', answer: 'tiny',
          options: { 1: ['tiny', 'swim'], 2: ['tiny', 'swim', 'house'], 3: ['tiny', 'swim', 'house', 'gently'] } },
        { type: 'mc', cat: 'Describing words', prompt: 'Which word is an adverb?', answer: 'slowly',
          options: { 1: ['slowly', 'cat'], 2: ['slowly', 'cat', 'blue'], 3: ['slowly', 'cat', 'blue', 'lovely'] } },
        { type: 'tf', cat: 'Describing words', prompt: { 1: 'An adjective describes a thing.', 2: 'Adjectives describe nouns.', 3: 'Every word ending in -ly is an adverb.' }, answer: true, levels: [1, 2] },
        { type: 'tf', cat: 'Describing words', prompt: 'Every word ending in -ly is an adverb.', answer: false, levels: [3] },
        { type: 'fill', cat: 'Verbs', prompt: { 1: 'Yesterday I ___ to the park.', 2: 'Yesterday I ___ to the park. (go)', 3: 'Yesterday I ___ to the park. (past tense of "go")' }, answer: 'went', bank: ['went', 'go', 'going', 'goes'] },
        { type: 'fill', cat: 'Nouns', prompt: 'A ___ noun always starts with a capital letter.', answer: 'proper', bank: ['proper', 'common', 'silly', 'small'] },
        { type: 'fill', cat: 'Describing words', prompt: 'An adverb often ends in ___.', answer: '-ly', bank: ['-ly', '-ed', '-ing', '-s'], levels: [2, 3] },
        { type: 'match', prompt: 'Match each word to its part of speech.',
          pairs: [['dog', 'noun'], ['run', 'verb'], ['happy', 'adjective'], ['quickly', 'adverb'], ['she', 'pronoun'], ['under', 'preposition'], ['and', 'conjunction']] }
      ]
    },

    {
      id: 'story-elements',
      title: 'Story Elements',
      description: { 1: 'The pieces that make a story.', 2: 'Characters, setting, plot, conflict and theme.', 3: 'The structural elements of narrative and how authors deploy them.' },
      lessons: [
        {
          title: 'The building blocks',
          slides: [
            { title: 'Characters', visual: '🧑‍🤝‍🧑', body: { 1: 'The **characters** are the people (or animals!) in a story.\n\nThe main character is the **hero**.', 2: 'Characters are the people, animals or beings in a story. The main character is the **protagonist**. The character who works against them is the **antagonist**.', 3: 'Characters drive narrative. The **protagonist** pursues a goal; the **antagonist** opposes it. Round characters are complex and change; flat characters stay the same. Authors reveal character through dialogue, action, thought and the reactions of others.' } },
            { title: 'Setting', visual: '🏔️', body: { 1: 'The **setting** is **where** and **when** a story happens.\n\n- a castle, long ago\n- a school, today', 2: 'The **setting** is the time and place of a story. It can create mood: a stormy night feels different from a sunny beach.', 3: 'The **setting** encompasses time, place and social context. Beyond backdrop, setting shapes mood, limits what characters can do and can function symbolically (a locked room, a vast ocean).' } },
            { title: 'Plot', visual: '🎢', body: { 1: 'The **plot** is what happens in the story.\n\n- beginning\n- middle\n- end', 2: 'The **plot** is the sequence of events. Most plots follow a shape:\n\n- Beginning (exposition)\n- Rising action\n- Climax (the most exciting moment)\n- Falling action\n- Resolution', 3: 'The **plot** is the structured sequence of causally linked events. Freytag\'s pyramid describes exposition, rising action, climax, falling action and dénouement. The **conflict** — internal or external — generates the rising action; the climax is the turning point where it is confronted.' } },
            { title: 'Theme', visual: '💡', body: { 1: 'The **theme** is the big idea of the story.\n\nFor example: **friendship** or **being brave**.', 2: 'The **theme** is the message or big idea behind the story — what the author wants you to think about, such as courage, honesty or growing up.', 3: 'The **theme** is the central insight a narrative explores, stated as an idea rather than a topic: not simply *courage* but *courage means acting despite fear*. Themes emerge from how conflicts resolve and what characters learn.' } }
          ]
        }
      ],
      terms: [
        { term: 'character', def: { 1: 'a person in a story', 2: 'a person or being in a story', 3: 'an agent within a narrative' } },
        { term: 'setting',   def: { 1: 'where and when a story happens', 2: 'the time and place of a story', 3: 'the time, place and social context of a narrative' } },
        { term: 'plot',      def: { 1: 'what happens in a story', 2: 'the sequence of events in a story', 3: 'the structured, causally linked sequence of events' } },
        { term: 'theme',     def: { 1: 'the big idea of a story', 2: 'the message or big idea of a story', 3: 'the central insight a narrative explores' } },
        { term: 'climax',    def: { 1: 'the most exciting part', 2: 'the most exciting moment or turning point', 3: 'the turning point where the central conflict peaks' }, levels: [2, 3] },
        { term: 'conflict',  def: { 2: 'the problem in a story', 3: 'the struggle that drives the plot' }, levels: [2, 3] },
        { term: 'protagonist', def: { 2: 'the main character', 3: 'the central character who pursues the goal' }, levels: [2, 3] },
        { term: 'antagonist', def: { 2: 'the character who works against the hero', 3: 'the force or character opposing the protagonist' }, levels: [3] }
      ],
      questions: [
        { type: 'mc', cat: 'Elements', prompt: { 1: 'Where and when a story happens is the…', 2: 'The time and place of a story is called the…', 3: 'The time, place and context of a narrative is its…' }, answer: 'setting', options: { 1: ['setting', 'dog'], 2: ['setting', 'plot', 'theme'], 3: ['setting', 'plot', 'theme', 'tone'] } },
        { type: 'mc', cat: 'Elements', prompt: 'The big idea or message of a story is the…', answer: 'theme', options: { 1: ['theme', 'cat'], 2: ['theme', 'setting', 'character'], 3: ['theme', 'setting', 'character', 'motif'] } },
        { type: 'mc', cat: 'Plot', prompt: { 1: 'The most exciting part of a story is the…', 2: 'The most exciting moment or turning point of a plot is the…', 3: 'In plot structure, the turning point is the…' }, answer: 'climax', options: { 1: ['climax', 'beginning'], 2: ['climax', 'exposition', 'resolution'], 3: ['climax', 'exposition', 'resolution', 'rising action'] } },
        { type: 'tf', cat: 'Elements', prompt: { 1: 'The plot is what happens in a story.', 2: 'The plot is the sequence of events in a story.', 3: 'A theme is best stated as a single-word topic.' }, answer: true, levels: [1, 2] },
        { type: 'tf', cat: 'Elements', prompt: 'A theme is best stated as a single-word topic.', answer: false, levels: [3] },
        { type: 'tf', cat: 'Characters', prompt: { 1: 'The hero of a story is the main character.', 2: 'The protagonist is the main character.', 3: 'The antagonist is always a villain.' }, answer: true, levels: [1, 2] },
        { type: 'tf', cat: 'Characters', prompt: 'The antagonist is always a villain.', answer: false, levels: [3] },
        { type: 'fill', cat: 'Plot', prompt: 'A story usually has a beginning, a middle and an ___.', answer: 'end', bank: ['end', 'egg', 'apple', 'ocean'] },
        { type: 'fill', cat: 'Characters', prompt: 'The character who works against the main character is the ___.', answer: 'antagonist', bank: ['antagonist', 'protagonist', 'narrator', 'setting'], levels: [2, 3] },
        { type: 'match', prompt: 'Match the story element to its meaning.', pairs: [['character', 'who the story is about'], ['setting', 'where and when'], ['plot', 'what happens'], ['theme', 'the big idea'], ['climax', 'the turning point'], ['conflict', 'the problem']] }
      ]
    }
  ]
});
