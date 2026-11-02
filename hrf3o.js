/* ============================================================================
   HRF3O · World Religions and Belief Traditions in Daily Life (Grade 11, Open)
   LearnHub course file — 4 units, 30 lessons.

   Built from the Unit 1–4 slideshows, worksheets, answer keys and unit tests.
   Every text field is levelled { 1: Explorer, 2: Scholar, 3: Challenger }:
     L1 = short plain sentences, shortened case texts, 2-option questions
     L2 = original slide wording, 3-option questions (Modified A test set)
     L3 = original + expectation codes, worked examples, thinking prompts,
          4-option questions (Standard test set), type-in blanks
   Questions carry cat: 'L<n> <lesson title>' so Jeopardy categories and the
   Focus Plan's "Question topics" line up with the lessons. Open-ended
   worksheet parts (application, think-deeper, scenarios) stay on paper.
   Colouring pictures are registered at the bottom (keys hrf3o/<unitId>).
   ============================================================================ */
window.LearnHub = window.LearnHub || { courses: [] };
window.LearnHub.courses.push({
  id: 'hrf3o',
  title: 'HRF3O World Religions',
  subtitle: 'Belief Traditions in Daily Life · Grade 11 Open',
  description: {
    1: 'Learn how people believe, celebrate, read sacred stories and build sacred places — and how beliefs are part of life in Canada.',
    2: 'How religions and belief traditions meet human needs, tell their sacred stories, mark time and life with festivals and rites, and build communities and sacred places — all in the context of Canadian life.',
    3: 'A survey of religions and belief traditions in daily life (Ontario HRF3O, 2013): beliefs and human needs, sacred writings and oral teachings, practices, festivals and rites of passage, and communities, history and sacred place — with Ontario\'s creed and accommodation law and Canadian case studies throughout.'
  },
  icon: '🌍',
  color: '#1f5f8b',

  awards: {
    study:        { icon: '🧭', name: 'Pathfinder: {unit}',          desc: 'Read every Study Room lesson in {unit}.' },
    testPass:     { icon: '✅', name: 'Keeper of Meaning: {unit}',   desc: 'Passed the {unit} test.' },
    testPerfect:  { icon: '💯', name: 'Clear Sight: {unit}',         desc: 'A perfect score on the {unit} test.' },
    games3:       { icon: '🎲', name: 'Storyteller: {unit}',         desc: 'Finished three games in {unit}.' },
    allGames:     { icon: '🎖️', name: 'Festival Master: {unit}',    desc: 'Finished every game in {unit}.' },
    unitMedal:    { icon: '🏅', name: 'Medal of Traditions: {unit}', desc: 'Study, test and games complete for {unit}.' },
    courseTrophy: { icon: '🏆', name: 'World Traditions Scholar',    desc: 'Every unit medal in {course}.' }
  },

  units: [
    /* ------------------------------------------------------------------ */
    /* Unit 1 · Belief, Meaning, and Canadian Life — 9 lessons */
    {
      id: 'belief',
      title: 'Unit 1 · Belief, Meaning, and Canadian Life',
      description: {
        1: 'Find out why people believe, learn the words we use to talk about belief, and see how Canada\'s laws and pop culture treat the many traditions that live here.',
        2: 'Nine lessons on why humans build belief traditions, the vocabulary for describing them accurately, how traditions picture the divine, and who lives in Canada today. The unit then follows belief into Canadian life: prejudice and its consequences, how traditions travel, creed under the Ontario Human Rights Code, accommodation cases at the Supreme Court, and belief in popular culture.',
        3: 'Nine lessons on why humans build belief traditions, the vocabulary for describing them accurately, how traditions picture the divine, and who lives in Canada today. The unit then follows belief into Canadian life: prejudice and its consequences, how traditions travel, creed under the Ontario Human Rights Code, accommodation cases at the Supreme Court, and belief in popular culture. Expectations covered: B1.1, B1.2, B1.3, B1.4, B2.1, B2.2, B3.1, B3.2, B3.3, B3.4, B3.5, C2.4, C3.1, C3.2, C3.3; Strand A: A1.1–A1.3 (Lesson 4 and assignment).'
      },

      lessons: [
        // ---- Lesson 1: Why Do People Believe? ----
        {
          title: 'Why Do People Believe?',
          slides: [
            {
              title: { 1: 'Big idea: why believe?', 2: 'Why do people believe?', 3: 'Why do people believe? (B1.1, B1.2, B3.5)' },
              visual: '🧭',
              body: {
                1: 'Our big question today: **Why do people believe?**\n\nEvery culture we know about has built belief traditions. We want to find out what needs those traditions meet.\n\nToday we will learn to:\n- name **four human needs** that belief traditions meet\n- explain why people **celebrate** and **commemorate**\n- see how a **civil observance** (like Remembrance Day) is like a religious one\n\nYou do not need to hold a belief yourself. You only need to explain what belief does for people.',
                2: 'Driving question: **What human needs do religions and belief traditions meet, and why do we mark special moments?**\n\nIn every culture and era we know of, humans have built belief traditions. Today we ask why.\n\n**Learning goals**\n- Identify four common human needs that religions and belief traditions respond to.\n- Explain why humans celebrate and commemorate, using real examples.\n- Spot the similarities between civil observances (like Remembrance Day) and religious ones.\n\nNothing today requires you to hold a belief — only to explain what belief does for people. Think of one thing you did this week that was "just what we do" in your family: a meal, a greeting, a routine. We will come back to it under **ritual**.',
                3: 'Driving question: **What human needs do religions and belief traditions meet, and why do we mark special moments?**\n\n**Expectations: B1.1, B1.2, B3.5**\n\nIn every culture and era we know of, humans have built belief traditions. Today we ask why — and we study a deliberately secular case (the Terry Fox Run) to show that commemoration is a human behaviour, not only a religious one.\n\n**Learning goals**\n- Identify four common human needs that religions and belief traditions respond to (B1.1).\n- Explain why humans celebrate and commemorate, using real examples (B1.2).\n- Spot the similarities between civil observances (like Remembrance Day) and religious ones (B3.5).\n\n**Success criteria — I can…**\n- name the four needs and give an example of each\n- explain one celebration and one commemoration from my community\n- compare a civil ceremony with a religious one\n\n**Think about it:** Name one thing you did this week that was "just what we do" in your family. Hold that example — it may turn out to be a ritual.'
              }
            },
            {
              title: {
                1: 'Four needs belief meets',
                2: 'Four needs that belief traditions meet',
                3: 'Four needs that belief traditions meet (B1.1)'
              },
              visual: '👥',
              body: {
                1: 'Belief traditions meet **four human needs**:\n\n- **Community and identity** — belonging to a group that shares your story, food and calendar. "This is who we are."\n- **A moral code** — shared rules about right and wrong.\n- **Purpose and meaning** — answers to big questions like "Why am I here?"\n- **Ritual** — repeated actions that give shape to time, like daily prayers or yearly festivals.\n\nEvery human society has had these. Many people today meet these needs outside religion, through family, sport or music.',
                2: '| Need | What it gives people |\n| **Community and identity** | Belonging to a group that shares your story, language, food, and calendar. "This is who we are." |\n| **A moral code** | Shared rules about right and wrong, how to treat others, and what to do when you fail. |\n| **Purpose and meaning** | Answers to the big questions: Why am I here? What happens when I die? Does my life matter? |\n| **Ritual** | Repeated actions that give shape to time — daily prayers, weekly rest, yearly festivals, rites of passage. |\n\n**Needs across cultures and eras**\n- Every known human society has had rituals, shared stories, and rules about right and wrong.\n- The specific forms change — temples, longhouses, mosques, meditation halls, community centres — but the needs do not.\n- Today, many people meet these needs outside religion: through family, sport, music, volunteering, or secular humanism.\n- Religious institutions respond by adapting: online services, interfaith events, food banks, youth programs.',
                3: '| Need | What it gives people |\n| **Community and identity** | Belonging to a group that shares your story, language, food, and calendar. "This is who we are." |\n| **A moral code** | Shared rules about right and wrong, how to treat others, and what to do when you fail. |\n| **Purpose and meaning** | Answers to the big questions: Why am I here? What happens when I die? Does my life matter? |\n| **Ritual** | Repeated actions that give shape to time — daily prayers, weekly rest, yearly festivals, rites of passage. |\n\nThese four needs are named in **expectation B1.1**. Students who are not religious often meet them through sports teams, family, music scenes, or school — the need is universal, and belief traditions are one of the oldest ways humans have met it. What happens when a need is *not* met? Loneliness, drift, confusion. That is why traditions persist.\n\n**Needs across cultures and eras**\n- Every known human society has had rituals, shared stories, and rules about right and wrong.\n- The specific forms change — temples, longhouses, mosques, meditation halls, community centres — but the needs do not.\n- Today, many people meet these needs outside religion: through family, sport, music, volunteering, or secular humanism.\n- Religious institutions respond by adapting: online services, interfaith events, food banks, youth programs — a church that runs a food bank, a gurdwara serving langar to anyone, a mosque open house.\n\n**Think about it:** In what ways do religious institutions try to stay relevant in a society where more people say they have "no religion"? (The 2021 Census, studied in Lesson 4, found 34.6% of Canadians reported no religion.)'
              }
            },
            {
              title: {
                1: 'The case: Terry Fox',
                2: 'Real case: commemorating Terry Fox',
                3: 'Real case: commemorating Terry Fox (B1.2)'
              },
              visual: '🏃',
              body: {
                1: '**Terry Fox and the Marathon of Hope**\n\n> In April 1980, Terry Fox began running across Canada. He was 21 and had lost his right leg to cancer. He ran to raise money for cancer research.\n> He ran about a marathon a day for 143 days. Cancer made him stop near Thunder Bay, Ontario, in September 1980. He died in June 1981.\n> That September, the first Terry Fox Run was held. Today schools across Canada run every fall. Schools, roads and a mountain are named after him.',
                2: '**Terry Fox and the Marathon of Hope**\n\n> In April 1980, Terry Fox — a 21-year-old from British Columbia who had lost his right leg to cancer — began running across Canada to raise money for cancer research.\n> He ran roughly a marathon a day for 143 days before cancer forced him to stop near Thunder Bay, Ontario, in September 1980. He died in June 1981.\n> That September, the first Terry Fox Run was held. Today schools and communities across Canada run every fall; schools, roads, and a mountain are named after him, and his statue stands at the spot where his run ended.\n\n**Think about it**\n- Which of the four human needs does the annual Terry Fox Run meet for the people who take part?\n- Is the Run a celebration, a commemoration, or both? Explain.',
                3: '**Terry Fox and the Marathon of Hope**\n\n> In April 1980, Terry Fox — a 21-year-old from British Columbia who had lost his right leg to cancer — began running across Canada to raise money for cancer research.\n> He ran roughly a marathon a day for 143 days before cancer forced him to stop near Thunder Bay, Ontario, in September 1980. He died in June 1981.\n> That September, the first Terry Fox Run was held. Today schools and communities across Canada run every fall; schools, roads, and a mountain are named after him, and his statue stands at the spot where his run ended.\n\n**Think about it**\n- Which of the four human needs does the annual Terry Fox Run meet for the people who take part?\n- Is the Run a celebration, a commemoration, or both? Explain.\n- What makes a commemoration last for decades instead of fading away?\n\n**Key dates (from the speaker notes)**\n- The Marathon of Hope began **April 12, 1980** in St. John\'s, Newfoundland and Labrador.\n- It ended **September 1, 1980** outside Thunder Bay, Ontario.\n- Terry Fox died **June 28, 1981**; the first Terry Fox Run was held **September 13, 1981**.\n\nThe case is deliberately secular: commemoration is a human behaviour, not only a religious one. Notice how the ritual (every September, same route, same shirt) carries the memory for people born long after 1981.'
              }
            },
            {
              title: {
                1: 'Celebrate, remember, and civil ceremonies',
                2: 'Why mark special moments? Civil and religious observances',
                3: 'Why mark special moments? Civil and religious observances (B1.2, B3.5)'
              },
              visual: '🕯️',
              body: {
                1: 'A **celebration** marks a happy moment: a birthday, a graduation, a wedding. It says "this person matters to us."\n\nA **commemoration** remembers a person or event from the past: Remembrance Day, a memorial. It says "we will not forget." It uses symbols like flowers, candles and a minute of silence.\n\nThe Terry Fox Run is a commemoration. It meets all four needs: community, moral code, meaning, and ritual (every September).\n\nRemembrance Day is a **civil observance**, but it looks like a religious service: silence, poppies, names read aloud.',
                2: '| Celebrations | Commemorations |\n| Birthdays, graduations, weddings, new babies | Anniversaries of a death, Remembrance Day, memorials |\n| Say: "This person / this moment matters to us" | Say: "We will not forget" |\n| Build memory: photos, cake, songs, gifts | Use symbols: flowers, candles, a minute of silence, names read aloud |\n| Often mix religious and secular elements | Naming a school, library, or park after a person keeps them present |\n\n**Worked example — the Terry Fox Run** is a commemoration that meets all four needs: community (everyone runs together), moral code (helping others, courage), meaning (his life mattered), and ritual (every September, same route, same shirt). Some events do both: a birthday remembers a birth *and* celebrates the person.\n\n**Civil and religious observances look alike**\n- Oath of citizenship: a solemn promise, witnessed by a community, with set words — like a vow or creed.\n- "O Canada" each morning: repeated words, standing together, a shared identity — like a daily prayer.\n- Remembrance Day, November 11: a minute of silence, poppies, wreaths, names read aloud — like a memorial service.\n- Many civil ceremonies in Canada still include Christian symbols and references, a sign of the country\'s history.',
                3: '| Celebrations | Commemorations |\n| Birthdays, graduations, weddings, new babies | Anniversaries of a death, Remembrance Day, memorials |\n| Say: "This person / this moment matters to us" | Say: "We will not forget" |\n| Build memory: photos, cake, songs, gifts | Use symbols: flowers, candles, a minute of silence, names read aloud |\n| Often mix religious and secular elements | Naming a school, library, or park after a person keeps them present |\n\n**Worked example — the Terry Fox Run** is a commemoration that meets all four needs: community (everyone runs together), moral code (helping others, courage), meaning (his life mattered), and ritual (every September, same route, same shirt). Some events do both: a birthday remembers a birth *and* celebrates the person.\n\nCommunities name libraries and schools after people to honour them, set an example, express gratitude, and keep a story alive — yet commemoration fades without ritual.\n\n**Civil and religious observances look alike (B3.5)**\n- Oath of citizenship: a solemn promise, witnessed by a community, with set words — like a vow or creed.\n- "O Canada" each morning: repeated words, standing together, a shared identity — like a daily prayer.\n- Remembrance Day, November 11: a minute of silence, poppies, wreaths, names read aloud — like a memorial service.\n- Many civil ceremonies in Canada still include Christian symbols and references, a sign of the country\'s history.\n\n**Why November 11?** The armistice ending the First World War took effect at 11 a.m. on November 11, 1918. Canadians mark the moment each year with two minutes of silence.\n\n**Think about it:** What does the presence of religious symbols at civil ceremonies indicate about human responses to war, death, citizenship, and patriotism? When the stakes are highest, people reach for the most serious forms they know — and for most of Canadian history those forms were religious.'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- Name the **four human needs** that belief traditions respond to.\n- Give one example of a **celebration** and one of a **commemoration**.\n\nFinish this sentence: "A commemoration is different from a celebration because …"',
                2: 'Answer in your notes, then compare with a partner.\n\n- Name the four common human needs that belief traditions respond to.\n- Give one example each of a celebration and a commemoration.\n- Name two features that a civil observance and a religious observance can share.\n- In one sentence: why does the Terry Fox Run still happen more than forty years later?\n\n**Exit ticket:** Write one need (community, moral code, meaning, or ritual) and one way *you* meet it — religious or not. Then finish this sentence: "A commemoration is different from a celebration because …"',
                3: 'Answer in your notes, then compare with a partner.\n\n- Name the four common human needs that belief traditions respond to.\n- Give one example each of a celebration and a commemoration.\n- Name two features that a civil observance and a religious observance can share.\n- In one sentence: why does the Terry Fox Run still happen more than forty years later?\n\n**Talk it through**\n- Why is it important to celebrate special moments? What would be lost if we stopped?\n- Some people say human milestones (a birth, a wedding, a death) are "moments where the divine touches ordinary life." What do you think they mean? Explain the idea from the believer\'s point of view, whether or not you agree.\n- Pick one ritual from your own life that is not religious. Which of the four needs does it meet?\n\n**Exit ticket:** Write one need (community, moral code, meaning, or ritual) and one way *you* meet it — religious or not. Then finish this sentence: "A commemoration is different from a celebration because …" The most common error is confusing celebration with commemoration — check your answer against the table.'
              }
            }
          ]
        },

        // ---- Lesson 2: The Vocabulary of Belief ----
        {
          title: 'The Vocabulary of Belief',
          slides: [
            {
              title: { 1: 'Big idea: words are tools', 2: 'Words are tools', 3: 'Words are tools (B2.1, A4.2)' },
              visual: '🧰',
              body: {
                1: 'Words are tools. Today we sharpen the ones we will use all semester.\n\nDo **faith**, **religion**, **belief** and **tradition** mean the same thing? In this course they do not.\n\nUsing exact words lets us describe other people\'s beliefs correctly and with respect.\n\nToday we will learn to:\n- define the core terms for studying belief traditions\n- sort words into groups: **the divine**, **practice**, or **community**\n- use the words correctly in a sentence about a real tradition',
                2: 'Words are tools. Today we sharpen the ones we will use all semester.\n\nWrite "faith", "religion", "belief", and "tradition" on a page. Do they mean the same thing? Most people say "sort of". In this course they do not — and using them precisely lets us describe other people\'s beliefs accurately and respectfully.\n\n**Learning goals**\n- Define the core terms used in the study of world religions and belief traditions.\n- Group terms by what they describe: the divine, practice, or community.\n- Use the terms correctly in sentences about real traditions.\n\n**Success criteria — I can…**\n- define at least ten terms from today\'s list in my own words\n- tell the difference between similar terms (belief/faith, rite/ritual, sacred/profane)\n- use a term correctly in a sentence about a tradition',
                3: 'Words are tools. Today we sharpen the ones we will use all semester.\n\n**Expectations: B2.1, A4.2**\n\nWrite "faith", "religion", "belief", and "tradition" on a page. Do they mean the same thing? Most people say "sort of". In this course they do not — and using them precisely lets us describe other people\'s beliefs accurately and respectfully. Expectation B2.1 asks you to use these terms "in the context of various beliefs"; A4.2 is about communicating with appropriate vocabulary.\n\n**Learning goals**\n- Define the core terms used in the study of world religions and belief traditions.\n- Group terms by what they describe: the divine, practice, or community.\n- Use the terms correctly in sentences about real traditions.\n\n**Success criteria — I can…**\n- define at least ten terms from today\'s list in my own words\n- tell the difference between similar terms (belief/faith, rite/ritual, sacred/profane)\n- use a term correctly in a sentence about a tradition\n\nThe unit test uses the curriculum wording, so your own definitions should keep the key idea even if the words differ. All definitions in this lesson are adapted from the Ontario curriculum glossary (World Religions section).\n\n**Think about it:** Why might a journalist and a teacher need the same precise vocabulary?'
              }
            },
            {
              title: {
                1: 'The core six and words about the divine',
                2: 'The core six · Words about the divine',
                3: 'The core six · Words about the divine (B2.1)'
              },
              visual: '📖',
              body: {
                1: '**The core six**\n- **belief** — accepting something as true, with or without proof\n- **faith** — belief plus deep trust in ideas that cannot be proven\n- **creed** — a statement of belief, often recited together\n- **religion** — belief in and worship of a supreme being or beings\n- **sacred** — set apart from the ordinary; linked to the divine\n- **profane** — the ordinary (it does *not* mean rude)\n\n**Words about the divine**\n- **monotheism** — one God\n- **polytheism** — more than one God\n- **pantheism** — God and the universe are not separate\n- **atheism** — no deities exist',
                2: '**The core six**\n| Term | Definition |\n| belief | Accepting something as true or real, with or without proof. |\n| faith | Absolute trust and confidence in the truth of ideas that cannot be definitively proven. |\n| creed | A statement of faith or religious belief — often a set wording recited by the community. |\n| religion | The belief in and worship of a supreme being or beings. |\n| sacred | Anything set apart from the ordinary because of its connection to the divine. |\n| profane | That which is not concerned with the religious or sacred realm — the ordinary. |\n\nNote the pairs: belief vs faith (faith is belief plus trust), and sacred vs profane. "Profane" does not mean rude here; it means ordinary or everyday.\n\n**Words about the divine**\n- **deity** — a god or goddess; in monotheism, the one Creator and supreme being\n- **divine** — possessing the attributes of God or a god\n- **supernatural** — anything that exists outside the laws of nature\n- **monotheism** — belief in only one God or supreme being\n- **polytheism** — belief in more than one God or supreme being\n- **pantheism** — belief that there is no separation between God and the universe\n\n**Positions about belief itself**\n- **atheism** — belief that deities and divine beings do not exist\n- **agnosticism** — belief that the existence or nature of God cannot be known with certainty\n- **animism** — belief that all things, including plants, animals, and objects, possess a living soul\n- **secular** — not having a relationship to that which is religious or spiritual\n- **spiritual** — pertaining to the soul rather than the material world',
                3: '**The core six**\n| Term | Definition |\n| belief | Accepting something as true or real, with or without proof. |\n| faith | Absolute trust and confidence in the truth of ideas that cannot be definitively proven. |\n| creed | A statement of faith or religious belief — often a set wording recited by the community. |\n| religion | The belief in and worship of a supreme being or beings. |\n| sacred | Anything set apart from the ordinary because of its connection to the divine. |\n| profane | That which is not concerned with the religious or sacred realm — the ordinary. |\n\nNote the pairs: belief vs faith (faith is belief plus trust), and sacred vs profane. "Profane" does not mean rude here; it means ordinary or everyday. What makes a building sacred rather than profane? How the community treats it, not the bricks — an idea that returns in Unit 4 on sacred place.\n\n**Words about the divine**\n- **deity** — a god or goddess; in monotheism, the one Creator and supreme being\n- **divine** — possessing the attributes of God or a god\n- **supernatural** — anything that exists outside the laws of nature\n- **monotheism** — belief in only one God or supreme being\n- **polytheism** — belief in more than one God or supreme being\n- **pantheism** — belief that there is no separation between God and the universe\n\n**Positions about belief itself**\n- **atheism** — belief that deities and divine beings do not exist\n- **agnosticism** — belief that the existence or nature of God cannot be known with certainty\n- **animism** — belief that all things, including plants, animals, and objects, possess a living soul\n- **secular** — not having a relationship to that which is religious or spiritual\n- **spiritual** — pertaining to the soul rather than the material world\n\n**Examples from the notes:** Judaism, Christianity, Islam, Sikhism, and the Baha\'i faith are monotheistic; many Hindu traditions honour many deities while also teaching one ultimate reality; Buddhism does not centre on a creator god. "Secular" describes a space or attitude (a secular school), not a person\'s identity. Atheism and agnosticism are positions; the Census groups both under "no religion and secular perspectives".'
              }
            },
            {
              title: {
                1: 'Words about practice and community',
                2: 'Words about practice · Words about community',
                3: 'Words about practice · Words about community (B2.1)'
              },
              visual: '👥',
              body: {
                1: '**Doing**\n- **ritual** — an act done regularly by a person or group\n- **rite** — a solemn ceremony with religious meaning (like a baptism)\n- **custom** — a usual way of behaving in a **community**\n- **habit** — a **personal** routine; may have no special meaning\n- **pilgrimage** — a sacred journey to a place\n\n**Community**\n- **clergy** — people ordained to perform religious duties\n- **laity** — followers who are *not* clergy\n- **denomination** — a subgroup inside a faith tradition',
                2: '**Words about practice — doing**\n- **ritual** — an act performed regularly by a person or group\n- **rite** — a solemn act or ceremony with religious significance\n- **custom** — a usual way of behaving in a community\n- **habit** — a personal routine; may have no special meaning\n- **tradition** — beliefs or practices handed down over generations\n- **pilgrimage** — a sacred journey to a place for religious or spiritual purposes\n\n**Words about practice — experiencing**\n- **mysticism** — the pursuit of union with the divine through contemplative practice\n- **asceticism** — a way of life marked by giving up worldly pleasures for spiritual reasons\n- **atonement** — reparation or making amends for wrongdoing\n- **vocation** — a calling to a religious state of life, or a way of living as an expression of belief\n\nRite vs ritual: a rite is a specific solemn ceremony (a baptism); a ritual is any regular act (lighting candles every Friday). Custom vs habit: a custom belongs to a community (removing shoes at a temple); a habit belongs to one person (always sitting in the same seat).\n\n**Words about community**\n- **clergy** — persons ordained to perform religious duties; **laity** — adherents who are not clergy\n- **adherent** — a follower of a religion or belief tradition\n- **denomination** (or sect) — a subgroup within a faith tradition with distinct beliefs\n- **orthodoxy** — holding to established, accepted teaching; **reform** — movements that change practice over time\n- **fundamentalism** — holding to a tradition\'s beliefs based on a literal reading of its founding documents\n- **ecumenism** — cooperation among branches of one faith; **interfaith dialogue** — conversation between different faiths\n- **cult** — a minority group whose practices outsiders see as strange or extreme and that controls its members (a loaded term — see Lesson 5)',
                3: '**Words about practice — doing**\n- **ritual** — an act performed regularly by a person or group\n- **rite** — a solemn act or ceremony with religious significance\n- **custom** — a usual way of behaving in a community\n- **habit** — a personal routine; may have no special meaning\n- **tradition** — beliefs or practices handed down over generations\n- **pilgrimage** — a sacred journey to a place for religious or spiritual purposes\n\n**Words about practice — experiencing**\n- **mysticism** — the pursuit of union with the divine through contemplative practice\n- **asceticism** — a way of life marked by giving up worldly pleasures for spiritual reasons\n- **atonement** — reparation or making amends for wrongdoing\n- **vocation** — a calling to a religious state of life, or a way of living as an expression of belief\n\nRite vs ritual is tested: a rite is a specific solemn ceremony (a baptism, a bar mitzvah); a ritual is any regular act (lighting Shabbat candles weekly, daily prayer). All rites involve ritual, but not every ritual is a rite. Custom vs habit: a custom belongs to a community (removing shoes at a temple); a habit belongs to one person (always sitting in the same seat).\n\n**Words about community**\n- **clergy** — persons ordained to perform religious duties; **laity** — adherents who are not clergy\n- **adherent** — a follower of a religion or belief tradition\n- **denomination** (or sect) — a subgroup within a faith tradition with distinct beliefs (e.g. Catholic and Protestant within Christianity; Sunni and Shia within Islam; Orthodox and Reform within Judaism)\n- **orthodoxy** — holding to established, accepted teaching; **reform** — movements that change practice over time\n- **fundamentalism** — holding to a tradition\'s beliefs based on a literal reading of its founding documents\n- **ecumenism** — cooperation among branches of one faith; **interfaith dialogue** — conversation between different faiths\n- **cult** — a minority group whose practices outsiders see as strange or extreme and that controls its members (a loaded term — see Lesson 5)\n\n**Liberal vs conservative:** inside most traditions some adherents interpret teachings flexibly for modern life (liberal) and others hold closely to long-standing practice (conservative). Both are sincere. Neither word is an insult here — they describe an approach to tradition, not political parties.'
              }
            },
            {
              title: {
                1: 'The case: how the census asks',
                2: 'Real case: how the census asks about religion',
                3: 'Real case: how the census asks about religion (B2.1)'
              },
              visual: '📋',
              body: {
                1: '**Statistics Canada, 2021 Census**\n\n> Every ten years the Canadian census asks about religion.\n> In 2021 it asked for the person\'s religion, even if they were not currently practising. Any answer was allowed.\n> Statistics Canada grouped the answers: Christian, Muslim, Hindu, Sikh, Buddhist, Jewish, Traditional (North American Indigenous) spirituality, other religions, and "No religion and secular perspectives". That last group includes atheists, agnostics and humanists.\n> Statistics Canada said that belonging to a religion does not mean a person actively practises it.',
                2: '**Statistics Canada, 2021 Census**\n\n> Every ten years the Canadian census asks about religion. In 2021 the question asked for the person\'s religion, even if they were not currently practising, and allowed any answer.\n> Statistics Canada then grouped the answers into categories such as Christian (with many denominations), Muslim, Hindu, Sikh, Buddhist, Jewish, Traditional (North American Indigenous) spirituality, other religions, and "No religion and secular perspectives" — a category that includes people who identify as atheist, agnostic, or humanist.\n> Statistics Canada noted that being affiliated with a religion does not mean a person actively practises it.\n\n**Think about it**\n- Which vocabulary words from today does the census use or imply? List at least four.\n- Why would the census ask about religion "even if not currently practising"? What is the difference between affiliation and practice?',
                3: '**Statistics Canada, 2021 Census**\n\n> Every ten years the Canadian census asks about religion. In 2021 the question asked for the person\'s religion, even if they were not currently practising, and allowed any answer.\n> Statistics Canada then grouped the answers into categories such as Christian (with many denominations), Muslim, Hindu, Sikh, Buddhist, Jewish, Traditional (North American Indigenous) spirituality, other religions, and "No religion and secular perspectives" — a category that includes people who identify as atheist, agnostic, or humanist.\n> Statistics Canada noted that being affiliated with a religion does not mean a person actively practises it.\n\n**Think about it**\n- Which vocabulary words from today does the census use or imply? List at least four.\n- Why would the census ask about religion "even if not currently practising"? What is the difference between affiliation and practice?\n- Is "No religion" a belief position? Which of today\'s terms could describe someone in that category?\n\n**From the speaker notes:** The census is a neutral, real Canadian document that uses our vocabulary — denomination, religion, secular, atheism, agnosticism, humanism, adherent (affiliation). The second question draws out the difference between *belonging* (affiliation) and *doing* (ritual, practice), which you will need when reading statistics in Lesson 4. Source: Statistics Canada, Census of Population 2021, "Religion" reference guide and the October 26, 2022 release.'
              }
            },
            {
              title: {
                1: 'Which word fits?',
                2: 'Which word fits? · Check for understanding',
                3: 'Which word fits? · Check for understanding'
              },
              visual: '🔍',
              body: {
                1: '**A grandmother lights a candle for her late husband every year, but says she is not religious.** What is she doing? A **ritual** and a **commemoration** — it is a **tradition**, and it can be **secular**.\n\nCalling another tradition\'s **rite** a "habit" makes a sacred act sound small. Calling it a "superstition" says it is false. Exact words show respect.\n\n**Check yourself**\n- What is the difference between belief and faith?\n- Which word means followers who are not ordained?',
                2: '**Which word fits?**\n- A friend says, "My grandmother isn\'t religious, but she lights a candle for my grandfather every year." Which terms describe what the grandmother does? *Model answer:* ritual, commemoration, tradition — possibly secular or spiritual rather than religious.\n- Someone says, "All religions are basically the same." Using today\'s terms, give two ways religions can differ (hint: monotheism, polytheism, clergy, rite).\n- Why might it be disrespectful to call another tradition\'s rite a "habit" or a "superstition"? *Model answer:* "habit" makes a sacred act sound trivial; "superstition" judges it false. In this course we use the tradition\'s own word where we can (e.g. Salah, Shabbat, smudging).\n\n**Check for understanding**\n- What is the difference between belief and faith?\n- Give one example of a rite and one example of a ritual.\n- Match the position to the definition: atheism, agnosticism, pantheism.\n- Which word describes followers of a tradition who are not ordained?',
                3: '**Which word fits?**\n- A friend says, "My grandmother isn\'t religious, but she lights a candle for my grandfather every year." Which terms describe what the grandmother does? *Model answer:* ritual, commemoration, tradition — possibly secular or spiritual rather than religious.\n- Someone says, "All religions are basically the same." Using today\'s terms, give two ways religions can differ (hint: monotheism, polytheism, clergy, rite).\n- Why might it be disrespectful to call another tradition\'s rite a "habit" or a "superstition"? *Model answer:* "habit" makes a sacred act sound trivial; "superstition" judges it false. In this course we use the tradition\'s own word where we can (e.g. Salah, Shabbat, smudging).\n\n**Worked example — editing a news draft.** A reporter writes: "The group, which many consider a cult, has strange habits such as removing shoes and chanting. Their priest, Mr. Ahmed, says members have faith in their one god." Problems: "cult" is a loaded, judgmental term; "habits" belittles community customs or rituals (removing shoes is a custom of respect); "strange" is an outsider\'s judgment; "priest" may be the wrong title (a Muslim prayer leader is an imam). A respectful rewrite: "The congregation, a monotheistic community, follows customs such as removing shoes before prayer and reciting prayers together as a ritual. Its religious leader, Imam Ahmed, explains that adherents place their faith in one God."\n\n**Check for understanding**\n- What is the difference between belief and faith? (Faith adds trust and confidence to belief.)\n- Give one example of a rite and one example of a ritual. (A baptism; daily prayer.)\n- Match the position to the definition: atheism, agnosticism, pantheism.\n- Which word describes followers of a tradition who are not ordained? (Laity.)\n\n**Exit ticket:** Use the word "sacred" correctly in one sentence about any tradition.'
              }
            }
          ]
        },

        // ---- Lesson 3: The Supernatural and the Divine ----
        {
          title: 'The Supernatural and the Divine',
          slides: [
            {
              title: {
                1: 'Big idea: what lies beyond?',
                2: 'What lies beyond the ordinary?',
                3: 'What lies beyond the ordinary? (B2.2, B2.1)'
              },
              visual: '🌌',
              body: {
                1: 'Our big question: **How do belief traditions picture what lies beyond the ordinary?** And how does that shape the way people live?\n\nToday is a map. We will not go deep into one tradition yet. We are learning the range of answers that exist in a Canadian classroom.\n\nWe will learn to:\n- describe the **divine** in several traditions\n- compare how traditions see **life, death** and what humans are for\n- explain how **secular humanism** finds meaning without the supernatural',
                2: 'Driving question: **How do belief traditions picture what lies beyond the ordinary — and what does that mean for how people live?**\n\nThe curriculum asks: "What are some ways in which various belief traditions regard life and death and the role of humanity and divinity in the world?" Today\'s survey is a map: we will not go deep into any one tradition yet (Units 2–4 do that); we are learning the range of answers that exist in a Canadian classroom.\n\n**Learning goals**\n- Describe the perceived nature and role of the divine in several traditions.\n- Compare how traditions understand life, death, and what humans are for.\n- Explain how secular humanism views the supernatural and finds meaning without it.\n\n**Success criteria — I can…**\n- name the view of the divine in at least four traditions\n- compare two traditions\' teachings on death\n- explain secular humanism\'s position on the supernatural',
                3: 'Driving question: **How do belief traditions picture what lies beyond the ordinary — and what does that mean for how people live?**\n\n**Expectations: B2.2, B2.1**\n\nThe curriculum asks: "What are some ways in which various belief traditions regard life and death and the role of humanity and divinity in the world?" Today\'s survey is a map: we will not go deep into any one tradition yet (Units 2–4 do that); we are learning the range of answers that exist in a Canadian classroom.\n\n**Learning goals**\n- Describe the perceived nature and role of the divine in several traditions.\n- Compare how traditions understand life, death, and what humans are for.\n- Explain how secular humanism views the supernatural and finds meaning without it.\n\n**Success criteria — I can…**\n- name the view of the divine in at least four traditions\n- compare two traditions\' teachings on death\n- explain secular humanism\'s position on the supernatural\n\n**Comparing is a skill the unit test rewards.** Comparing means naming a similarity *and* a difference, not just listing two things. Use the frame: "Both … and … teach that …, but they differ because …"\n\n**Vocabulary note:** connect "reason" to "faith" from Lesson 2. Traditions differ in how much they rely on each. Humanism relies on reason; most religious traditions combine reason with faith and revelation (teachings believed to come from the divine).'
              }
            },
            {
              title: {
                1: 'How traditions picture the divine',
                2: 'How traditions picture the divine',
                3: 'How traditions picture the divine (B2.2)'
              },
              visual: '🗺️',
              body: {
                1: '| Tradition | The divine |\n| **Judaism, Christianity, Islam** | One God who created the world and speaks through prophets and scripture. |\n| **Hinduism** | One ultimate reality (Brahman), honoured through many deities. |\n| **Buddhism** | No creator God at the centre. The Buddha is a teacher who showed a path out of suffering. |\n| **Indigenous traditions in Canada** | Many nations, many teachings. Commonly a Creator, and spirit in land, animals and ancestors. |\n| **Sikhism** | One God (Waheguru), without form, present everywhere. All people are equal before God. |\n\nEach row holds many different views inside it.',
                2: '| Tradition | How the divine is pictured |\n| **Judaism, Christianity, Islam (Abrahamic)** | One God who created the world, acts in history, and speaks through prophets and scripture. Christians understand God as Trinity; Muslims stress God\'s absolute oneness. |\n| **Hinduism** | One ultimate reality (Brahman) that many Hindus honour through many deities — Vishnu, Shiva, Devi and others — each revealing an aspect of the divine. |\n| **Buddhism** | No creator God at the centre. The Buddha is a teacher who showed a path out of suffering; some branches honour enlightened beings (bodhisattvas). |\n| **Indigenous traditions in Canada** | Many nations, many teachings; commonly a Creator, and spirit present in land, animals, and ancestors, with humans in relationship to all of creation. |\n| **Sikhism** | One God (Waheguru), without form, present everywhere and known through the teachings of the Gurus; all people equal before God. |\n\nStress the diversity *within* each row: Hindu views range from devotion to one god to philosophical non-dualism; Buddhist schools differ on deities; "Indigenous" covers dozens of distinct nations in Ontario alone (Anishinaabe, Haudenosaunee, Cree and more), each with its own teachings.',
                3: '| Tradition | How the divine is pictured |\n| **Judaism, Christianity, Islam (Abrahamic)** | One God who created the world, acts in history, and speaks through prophets and scripture. Christians understand God as Trinity; Muslims stress God\'s absolute oneness. |\n| **Hinduism** | One ultimate reality (Brahman) that many Hindus honour through many deities — Vishnu, Shiva, Devi and others — each revealing an aspect of the divine. |\n| **Buddhism** | No creator God at the centre. The Buddha is a teacher who showed a path out of suffering; some branches honour enlightened beings (bodhisattvas). |\n| **Indigenous traditions in Canada** | Many nations, many teachings; commonly a Creator, and spirit present in land, animals, and ancestors, with humans in relationship to all of creation. |\n| **Sikhism** | One God (Waheguru), without form, present everywhere and known through the teachings of the Gurus; all people equal before God. |\n\n**From the speaker notes:** this is the core content, so go slowly. Stress the diversity *within* each row: Hindu views range from devotion to one god to philosophical non-dualism; Buddhist schools differ on deities; "Indigenous" covers dozens of distinct nations in Ontario alone (Anishinaabe, Haudenosaunee, Cree and more), each with its own teachings. Sikhism is included because Sikh communities are a visible part of Ontario life; you will meet the Five Ks in Unit 3. Nobody who belongs to a tradition should be asked to be its spokesperson.\n\n**Key terms:** *theology* is the systematic study of the divine; a *deity* is, in monotheism, the Creator and supreme being and, in polytheism, a god or goddess; the *supernatural* is anything that exists outside the laws of nature.\n\n**Think about it:** Which rows describe a single creator God? Which describe one ultimate reality shown in many forms? Which has no creator God at the centre?'
              }
            },
            {
              title: {
                1: 'Life, death and what humans are for',
                2: 'Life, death, and what comes next · What are humans for?',
                3: 'Life, death, and what comes next · What are humans for? (B2.2)'
              },
              visual: '🕰️',
              body: {
                1: '**A single life, then judgment or eternity**\n- Christianity: resurrection and eternal life with God\n- Islam: a Day of Judgment\n- Judaism: focuses on this life\n- Secular humanism: death is the natural end; meaning is found in this life\n\n**A cycle of lives**\n- Hinduism: **samsara** (rebirth) shaped by karma; the goal is moksha\n- Buddhism: rebirth driven by craving; the goal is nirvana\n- Sikhism: rebirth until the soul unites with God\n- Many Indigenous traditions: the spirit continues; ancestors remain present\n\nIn all of these, how you live matters.',
                2: '| A single life, then judgment or eternity | A cycle of lives |\n| Christianity: resurrection and eternal life with God; denominations differ on details | Hinduism: samsara (rebirth) shaped by karma (actions); the goal is moksha, release from the cycle |\n| Islam: a Day of Judgment; paradise or punishment based on faith and deeds | Buddhism: rebirth driven by craving; the goal is nirvana, the end of suffering |\n| Judaism: focuses on this life; teachings about the afterlife vary and are less central | Sikhism: rebirth until the soul unites with God through devotion and right living |\n| Secular humanism: death is the natural end of a person; meaning is found in this life | Many Indigenous traditions: the spirit continues and returns to the Creator or the spirit world; ancestors remain present |\n\n**What are humans for?**\n- Abrahamic traditions: humans are created by God with dignity and responsibility — stewards of creation, called to justice and mercy.\n- Hinduism: each person has a dharma — a duty fitting their stage of life — and a path toward release.\n- Buddhism: humans can wake up; the Eightfold Path (Unit 2) trains mind and conduct to end suffering.\n- Indigenous teachings: humans are one part of creation, not its owners; reciprocity and respect toward land and all beings.\n- Secular humanism: humans give life meaning through reason, compassion, creativity, and responsibility to each other.\n\nEvery answer connects back to Lesson 1\'s human needs: a moral code and a sense of purpose.',
                3: '| A single life, then judgment or eternity | A cycle of lives |\n| Christianity: resurrection and eternal life with God; denominations differ on details | Hinduism: samsara (rebirth) shaped by karma (actions); the goal is moksha, release from the cycle |\n| Islam: a Day of Judgment; paradise or punishment based on faith and deeds | Buddhism: rebirth driven by craving; the goal is nirvana, the end of suffering |\n| Judaism: focuses on this life; teachings about the afterlife vary and are less central | Sikhism: rebirth until the soul unites with God through devotion and right living |\n| Secular humanism: death is the natural end of a person; meaning is found in this life | Many Indigenous traditions: the spirit continues and returns to the Creator or the spirit world; ancestors remain present |\n\n**Compare the two columns.** Similar: actions in this life matter; death is not treated as meaningless. Different: one life vs many; a personal judge vs a natural law like karma. This course describes — it does not rank or decide which is true.\n\n**What are humans for?**\n- Abrahamic traditions: humans are created by God with dignity and responsibility — stewards of creation, called to justice and mercy.\n- Hinduism: each person has a dharma — a duty fitting their stage of life — and a path toward release.\n- Buddhism: humans can wake up; the Eightfold Path (Unit 2) trains mind and conduct to end suffering.\n- Indigenous teachings: humans are one part of creation, not its owners; reciprocity and respect toward land and all beings.\n- Secular humanism: humans give life meaning through reason, compassion, creativity, and responsibility to each other.\n\n**Think about it:** Why do so many traditions teach that actions in this life matter after death? What would change in a society that stopped believing this?'
              }
            },
            {
              title: {
                1: 'The case: a humanist statement',
                2: 'Real case: a modern statement of humanism',
                3: 'Real case: a modern statement of humanism (B2.2)'
              },
              visual: '📜',
              body: {
                1: '**The Amsterdam Declaration (2002)**\n\n> In 2002, humanist groups from many countries met in Amsterdam. They adopted a short statement about modern humanism.\n> It says humanism is **ethical**: every person has dignity. It is **rational**: it uses science and reason, not claims of supernatural knowledge.\n> It supports democracy and human rights. Freedom must go with responsibility to society. It values imagination and the arts.\n> Humanists call this a "lifestance" — a way of living, not just a set of opinions.',
                2: '**The Amsterdam Declaration (2002)**\n\n> In 2002, humanist organizations from many countries met in Amsterdam, where the international humanist movement had been founded fifty years earlier, and adopted a short statement describing modern humanism.\n> It says humanism is ethical, affirming the dignity of every person; that it is rational, using science and reason rather than claims to supernatural knowledge; that it supports democracy and human rights; that personal freedom must be combined with responsibility to society; that it offers an alternative to dogmatic religion; and that it values imagination and the arts.\n> Humanists describe this as a "lifestance" — a way of living, not just a set of opinions.\n\n**Think about it**\n- How does the Declaration view the supernatural? Quote or paraphrase the relevant part.\n- Which of the four human needs from Lesson 1 does humanism try to meet, and how?',
                3: '**The Amsterdam Declaration (2002)**\n\n> In 2002, humanist organizations from many countries met in Amsterdam, where the international humanist movement had been founded fifty years earlier, and adopted a short statement describing modern humanism.\n> It says humanism is ethical, affirming the dignity of every person; that it is rational, using science and reason rather than claims to supernatural knowledge; that it supports democracy and human rights; that personal freedom must be combined with responsibility to society; that it offers an alternative to dogmatic religion; and that it values imagination and the arts.\n> Humanists describe this as a "lifestance" — a way of living, not just a set of opinions.\n\n**Think about it**\n- How does the Declaration view the supernatural? Quote or paraphrase the relevant part.\n- Which of the four human needs from Lesson 1 does humanism try to meet, and how?\n- In what ways is humanism similar to a religion, and in what ways is it different?\n\n**From the speaker notes:** The Declaration was adopted by the International Humanist and Ethical Union (now Humanists International) at its 2002 World Humanist Congress; it was updated in 2022. It answers the curriculum prompt "How is the supernatural viewed in secular humanism?" Humanism is presented respectfully as a belief tradition in its own right (per B1.3 and B2.2), not as the absence of one. Similar to a religion: a moral code, community organizations, ceremonies (humanist weddings and funerals exist in Canada). Different: no deity, no sacred text treated as revelation, authority rests on reason.'
              }
            },
            {
              title: {
                1: 'Worked example and check',
                2: 'Worked example · Check for understanding',
                3: 'Worked example · Check for understanding'
              },
              visual: '🪨',
              body: {
                1: '**A shared memorial.** A class plans a Reflection Wall for people they have lost. The students are Muslim, Hindu, Jewish, Catholic, humanist and Anishinaabe.\n\nCan they share one memorial? Yes. Everyone shares the need to **commemorate** (Lesson 1), even when beliefs about death differ. Use open words like "We remember…" and leave room for each tradition.\n\n**Check yourself**\n- Name one tradition with no creator God at its centre.\n- How does secular humanism view the supernatural?',
                2: '**Worked example — the Reflection Wall.** A Grade 11 class plans a memorial wall where students can leave messages for people they have lost. The planners include Aisha (Muslim), Priya (Hindu), Daniel (Jewish), Marie (Catholic), Sam (humanist), and Kyle, who is Anishinaabe.\n\n- Aisha — belief in a Day of Judgment and paradise; messages might ask for God\'s mercy.\n- Priya — rebirth and karma; messages might wish the soul peace on its journey.\n- Daniel — honouring memory in this life ("may their memory be a blessing").\n- Marie — resurrection and eternal life; messages might speak of rest with God.\n- Sam — death as a natural end; messages might celebrate the person\'s life and impact.\n- Kyle — the spirit continuing and ancestors remaining present.\n\nCan they share one memorial? Yes — the human need to commemorate (Lesson 1) is shared even when beliefs about what follows death differ. Use open language ("We remember…"), avoid one tradition\'s symbol as the main design, and allow blank cards.\n\n**Check for understanding**\n- Name one tradition that is monotheistic and one that has no creator God at its centre.\n- What is samsara, and which traditions teach it?\n- State one difference between how Christianity and Hinduism understand what happens after death.\n- How does secular humanism view the supernatural?',
                3: '**Worked example — the Reflection Wall.** A Grade 11 class plans a memorial wall where students can leave messages for people they have lost. The planners include Aisha (Muslim), Priya (Hindu), Daniel (Jewish), Marie (Catholic), Sam (humanist), and Kyle, who is Anishinaabe.\n\n- Aisha — belief in a Day of Judgment and paradise; messages might ask for God\'s mercy.\n- Priya — rebirth and karma; messages might wish the soul peace on its journey.\n- Daniel — honouring memory in this life ("may their memory be a blessing").\n- Marie — resurrection and eternal life; messages might speak of rest with God.\n- Sam — death as a natural end; messages might celebrate the person\'s life and impact.\n- Kyle — the spirit continuing and ancestors remaining present; messages might address the person as still present.\n\nCan they share one memorial? Yes — the human need to commemorate (Lesson 1) is shared even when beliefs about what follows death differ. A shared memorial works when it serves the common need and leaves room for each tradition\'s meaning: open language ("We remember…"), no single tradition\'s symbol as the main design, blank cards, a natural element (plants, stone) that many traditions value.\n\n**Think about it:** "A tradition\'s view of the divine shapes its view of what humans are for." Test it: if humans are stewards of God\'s creation, wasting resources is wrong; if there is no divine, meaning must come from reason and care for each other.\n\n**Check for understanding**\n- Name one tradition that is monotheistic and one that has no creator God at its centre. (e.g. Islam / Buddhism)\n- What is samsara, and which traditions teach it? (The cycle of rebirth — Hinduism, Buddhism, Sikhism, in varied forms.)\n- State one difference between how Christianity and Hinduism understand what happens after death.\n- How does secular humanism view the supernatural? (It rejects supernatural explanations and relies on reason and science.)'
              }
            }
          ]
        },

        // ---- Lesson 4: Who Lives Here? Belief in a Diverse Society ----
        {
          title: 'Who Lives Here? Belief in a Diverse Society',
          slides: [
            {
              title: { 1: 'Big idea: who lives here?', 2: 'Who lives here?', 3: 'Who lives here? (B1.3, A1.1–A1.3)' },
              visual: '🏙️',
              body: {
                1: 'Our big question: **Who lives here, and what do they believe?**\n\nGuess first: what share of Canadians said they had **no religion** in 2021? We will check your guess against the real census data.\n\nWe will learn to:\n- read a census table and say what it shows (and does not show)\n- give two reasons why learning about other traditions matters\n- start a research project with a good **research question**',
                2: 'Reading the 2021 Census, and why it matters to know what your neighbours are celebrating, fasting for, or praying about.\n\nGuess first: what percentage of Canadians said they had no religion in 2021? Most guesses are too low or too high — a good reminder that data beats assumptions.\n\n**Learning goals**\n- Identify the major religions and belief traditions that coexist in Canada, using real data.\n- Explain why it is important to understand the traditions of friends, neighbours, and co-workers.\n- Begin the research process: pick a topic, map its key concepts, and write a guiding question.\n\n**Success criteria — I can…**\n- read a census table and state what it shows (and does not show)\n- give two reasons why learning about other traditions matters\n- write a research question that is open, focused, and answerable',
                3: 'Reading the 2021 Census, and why it matters to know what your neighbours are celebrating, fasting for, or praying about.\n\n**Expectations: B1.3, A1.1, A1.2, A1.3**\n\nGuess first: what percentage of Canadians said they had no religion in 2021? Most guesses are too low or too high — a good reminder that data beats assumptions.\n\n**Learning goals**\n- Identify the major religions and belief traditions that coexist in Canada, using real data (B1.3).\n- Explain why it is important to understand the traditions of friends, neighbours, and co-workers (B1.3).\n- Begin the research process: pick a topic, map its key concepts, and write a guiding question (A1.1–A1.3).\n\n**Success criteria — I can…**\n- read a census table and state what it shows (and does not show)\n- give two reasons why learning about other traditions matters\n- write a research question that is open, focused, and answerable\n\nThe third criterion is the Strand A skill assessed in the unit assignment, *Belief in My Community*. Today\'s exit ticket (a draft research question plus three key concepts) is the first step of that assignment.\n\n**Vocabulary note:** *multiculturalism* is the acceptance of cultural pluralism as a positive feature of society. Canada adopted multiculturalism as official policy on October 8, 1971, and passed the Canadian Multiculturalism Act in 1988 — the first country to do both.'
              }
            },
            {
              title: {
                1: 'Canada by religion, 2021',
                2: 'Canada by religious affiliation, 2021',
                3: 'Canada by religious affiliation, 2021 (B1.3)'
              },
              visual: '📊',
              body: {
                1: '| Group | Share of Canadians |\n| Christian (all denominations) | **53.3%** |\n| No religion and secular perspectives | **34.6%** |\n| Muslim | 4.9% |\n| Hindu | 2.3% |\n| Sikh | 2.1% |\n\nIn 2001, 77.1% were Christian and 16.5% had no religion. The "no religion" share doubled in twenty years.\n\n**What does the census measure?** **Affiliation** — what people wrote on a form. It does *not* measure attendance, strength of belief, or practice.',
                2: '| Group | Share of Canadians, 2021 |\n| Christian (all denominations) | **53.3%** |\n| No religion and secular perspectives | **34.6%** |\n| Muslim | 4.9% |\n| Hindu | 2.3% |\n| Sikh | 2.1% |\n| Buddhist | 1.0% |\n| Jewish | 0.9% |\n| Traditional (North American Indigenous) spirituality | 0.2% |\n| Other | 0.6% |\n\nIn 2001: Christian 77.1%, no religion 16.5%. The Muslim, Hindu, and Sikh shares each more than doubled by 2021.\n\nSource: Statistics Canada, Census of Population 2021, released October 26, 2022 (Canada at a Glance 2023, Chart 9).\n\n**Two questions for any statistic**\n- What does this measure? **Affiliation** — what people wrote on a form.\n- What does it NOT measure? Attendance, belief strength, practice. Statistics Canada itself noted that affiliation does not necessarily mean active practice.\n\nTrends: fewer Christians, more "no religion", and growth in Muslim, Hindu, and Sikh affiliation, largely through immigration.',
                3: '| Group | Share of Canadians, 2021 |\n| Christian (all denominations) | **53.3%** |\n| No religion and secular perspectives | **34.6%** |\n| Muslim | 4.9% |\n| Hindu | 2.3% |\n| Sikh | 2.1% |\n| Buddhist | 1.0% |\n| Jewish | 0.9% |\n| Traditional (North American Indigenous) spirituality | 0.2% |\n| Other | 0.6% |\n\nIn 2001: Christian 77.1%, no religion 16.5%. The Muslim, Hindu, and Sikh shares each more than doubled by 2021.\n\nSource: Statistics Canada, Census of Population 2021, released October 26, 2022 (Canada at a Glance 2023, Chart 9).\n\n**Two questions for any statistic**\n- What does this measure? **Affiliation** — what people wrote on a form.\n- What does it NOT measure? Attendance, belief strength, practice. Statistics Canada itself noted that affiliation does not necessarily mean active practice. So 53.3% "Christian" does not mean 53.3% attend church.\n\nTrends: fewer Christians, more "no religion", and growth in Muslim, Hindu, and Sikh affiliation, largely through immigration. Ontario\'s proportions for several non-Christian traditions are above the national figures because of the Greater Toronto Area.\n\n**Secular humanism counts as a tradition.** "No religion" does not mean "no beliefs". The 34.6% category includes atheists, agnostics, and humanists, as well as people who simply did not identify with any tradition. Humanists meet the four human needs too: community (humanist associations), moral code (human dignity, compassion), meaning (this life), ritual (humanist weddings, namings, and funerals). Studying world religions without humanism would leave out more than a third of Canadians.\n\n**Think about it:** The "no religion" share doubled in twenty years. List three possible causes (generational change? immigration patterns? people raised Christian no longer attending? changes in how people answer surveys?) and rank how confident you are in each.'
              }
            },
            {
              title: {
                1: 'The case: a question worth asking',
                2: 'Real case: a question worth asking',
                3: 'Real case: a question worth asking (A1.1–A1.3)'
              },
              visual: '🎓',
              body: {
                1: '**Comparing religious and secular rites of passage**\n\n> Imagine you are studying rites of passage. What would you gain by comparing religious rites (a bar/bat mitzvah, a confirmation, an amritsanchar) with secular ones (a Grade 8 graduation, getting a driver\'s licence, turning 18)?\n> A student who asks only about religious rites learns what traditions do. A student who compares both learns what the rite is FOR — and sees the human need underneath.\n\n**Think about it**\n- Write one research question that compares a religious rite of passage with a secular one.\n- What sources could answer it?',
                2: '**Comparing religious and secular rites of passage**\n\n> The curriculum suggests a research angle: if you were studying rites of passage in different communities, what would you gain by comparing religious rites (a bar/bat mitzvah, a confirmation, an amritsanchar) with secular ones (a Grade 8 graduation, getting a driver\'s licence, turning 18)?\n> A student who asks only about religious rites learns what traditions do; a student who compares both learns what the rite is FOR — and sees the human need underneath.\n\n**Think about it**\n- Write one research question that compares a religious rite of passage with a secular one.\n- List four key concepts your question depends on.\n- What sources could answer it? Name one primary and one secondary source.\n\n**Starting an inquiry (Strand A)**\n- **A1.1 Explore topics** — a festival, a rite of passage, a daily observance, a place of worship, a tradition\'s history in your town.\n- **A1.2 Identify key concepts** — make a quick web: your topic in the middle, around it the terms, people, places, and ideas it depends on. These become your search words.\n- **A1.3 Write a guiding question** — open (not yes/no), focused (one tradition, one practice), answerable with evidence. "How does Diwali express Hindu teachings about light and goodness?"',
                3: '**Comparing religious and secular rites of passage**\n\n> The curriculum suggests a research angle: if you were studying rites of passage in different communities, what would you gain by comparing religious rites (a bar/bat mitzvah, a confirmation, an amritsanchar) with secular ones (a Grade 8 graduation, getting a driver\'s licence, turning 18)?\n> A student who asks only about religious rites learns what traditions do; a student who compares both learns what the rite is FOR — and sees the human need underneath.\n\n**Think about it**\n- Write one research question that compares a religious rite of passage with a secular one.\n- List four key concepts your question depends on.\n- What sources could answer it? Name one primary and one secondary source.\n\n**Starting an inquiry (Strand A)**\n- **A1.1 Explore topics** — a festival, a rite of passage, a daily observance, a place of worship, a tradition\'s history in your town.\n- **A1.2 Identify key concepts** — make a quick web: your topic in the middle, around it the terms, people, places, and ideas it depends on. These become your search words.\n- **A1.3 Write a guiding question** — open (not yes/no), focused (one tradition, one practice), answerable with evidence. "How does Diwali express Hindu teachings about light and goodness?"\n\n**Worked example from the notes.** Weak question: "Is Ramadan hard?" (yes/no, judgmental). Better: "How do Muslim students in Ontario balance Ramadan fasting with school and sports?" — open, focused, answerable by interviews and articles.\n\n**Sources (A2.2, in the assignment rubric).** Primary: interviews with family members, observation, sacred texts, photographs, programs from a ceremony. Secondary: textbooks, encyclopedia entries, news articles, documentaries.'
              }
            },
            {
              title: {
                1: 'What the numbers mean in a hallway',
                2: 'What the numbers mean in a hallway',
                3: 'What the numbers mean in a hallway (B1.3)'
              },
              visual: '🍲',
              body: {
                1: 'In a class of 30 Ontario students, about half may be from Christian families, about ten from non-religious families, and several from other traditions.\n\n- **Dress** can reflect belief: a hijab, a turban, a kippah, a kara, a cross.\n- **Food** can reflect belief: halal, kosher, fasting during Ramadan or Lent.\n- **Time** can reflect belief: Friday prayers, Shabbat, Sunday worship.\n\n**Why it matters:** knowing why a classmate is fasting or missing a Friday afternoon helps you be a good friend and co-worker. But never assume — the same sign can be cultural, personal or religious.',
                2: 'In a class of 30 Ontario students, the census suggests roughly half may be from Christian families, about ten from non-religious families, and several from Muslim, Hindu, Sikh, Jewish, Buddhist, or Indigenous backgrounds.\n\n- **Dress** can reflect belief: a hijab, a turban, a kippah, a kara (steel bracelet), a cross, a medicine pouch.\n- **Food** can reflect belief: halal, kosher, vegetarian for religious reasons, fasting during Ramadan or Lent, no beef, no pork.\n- **Time** can reflect belief: Friday prayers, Shabbat from Friday evening, Sunday worship, festival days off school.\n\n**Why it matters:** knowing why a classmate is fasting, missing a Friday afternoon, or not eating the pizza lets you be a good friend, teammate, and later a good co-worker and manager. Ontario employers must accommodate creed (Lesson 7), so understanding is also a job skill.\n\n**Worked example — the December concert.** A school debates (1) keeping its Christmas concert, (2) a "Festival of Light" with Hanukkah, Diwali, and Christmas elements, or (3) a secular winter concert. The census suggests roughly half the school is Christian-affiliated, about a third non-religious, and a meaningful minority from other traditions. Option 1 may feel excluding to others; option 2 signals inclusion but risks treating festivals as decoration (Diwali is usually in October/November, not December); option 3 avoids exclusion but may feel like erasing everyone\'s traditions.',
                3: 'In a class of 30 Ontario students, the census suggests roughly half may be from Christian families, about ten from non-religious families, and several from Muslim, Hindu, Sikh, Jewish, Buddhist, or Indigenous backgrounds.\n\n- **Dress** can reflect belief: a hijab, a turban, a kippah, a kara (steel bracelet), a cross, a medicine pouch.\n- **Food** can reflect belief: halal, kosher, vegetarian for religious reasons, fasting during Ramadan or Lent, no beef, no pork.\n- **Time** can reflect belief: Friday prayers, Shabbat from Friday evening, Sunday worship, festival days off school.\n\n**Why it matters:** knowing why a classmate is fasting, missing a Friday afternoon, or not eating the pizza lets you be a good friend, teammate, and later a good co-worker and manager. Ontario employers must accommodate creed (Lesson 7), so understanding is also a job skill. It is unfair to assume a person\'s beliefs from these signs: the same clothing can be worn for cultural, religious, or personal reasons, and people within a tradition vary in practice.\n\n**Worked example — the December concert.** A school debates (1) keeping its Christmas concert of forty years, (2) a "Festival of Light" with Hanukkah, Diwali, and Christmas elements, or (3) a secular winter concert. The census suggests roughly half the school is Christian-affiliated, about a third non-religious, and a meaningful minority from other traditions. Option 1 may feel welcoming to Christians but excluding to others; option 2 signals inclusion but risks treating festivals as decoration (Diwali is usually in October/November, not December); option 3 avoids exclusion but may feel like erasing everyone\'s traditions. A strong recommendation names each tradition\'s festival accurately on its own dates, with student-led explanation — meeting the need for community without pretending all festivals are the same.\n\n**Think about it:** If you were a new manager at a store, what would you want to know about creed to schedule staff fairly?'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- What share of Canadians reported **no religion** in 2021?\n- What does the census measure: affiliation or practice?\n\n**Exit ticket:** write a draft research question for the unit assignment — one tradition, one practice, open, answerable.',
                2: 'Answer in your notes, then compare with a partner.\n\n- What share of Canadians reported no religion in 2021? What was it in 2001?\n- What does the census measure, and what does it not measure?\n- Give two reasons why understanding your neighbours\' traditions matters.\n- Fix this research question so it is open and focused: "Is Christmas the best holiday?"\n\n**Exit ticket:** Write a draft research question for the unit assignment (one tradition, one practice, open, answerable) and list three key concepts your question depends on. Bring it to the next class — it is the first step of your unit assignment.',
                3: 'Answer in your notes, then compare with a partner.\n\n- What share of Canadians reported no religion in 2021? What was it in 2001? (34.6%; 16.5%)\n- What does the census measure, and what does it not measure? (Affiliation — not practice or attendance.)\n- Give two reasons why understanding your neighbours\' traditions matters.\n- Fix this research question so it is open and focused: "Is Christmas the best holiday?" (e.g. "How do Christian families in Canada combine religious and secular traditions at Christmas?")\n\n**Talk it through**\n- How might the way a person dresses or eats reflect their belief tradition? Why is it unfair to assume?\n- What is secular humanism, and why is it important to understand it in discussions of world religions? (It is the organized tradition within the "no religion" group; understanding it helps religious and non-religious students talk to each other with respect.)\n\n**Exit ticket:** Write a draft research question for the unit assignment (one tradition, one practice, open, answerable) and list three key concepts your question depends on. Bring it to the next class — it is the first step of your unit assignment and your A1.3 evidence.'
              }
            }
          ]
        },

        // ---- Lesson 5: Difference, Commonality, and Prejudice ----
        {
          title: 'Difference, Commonality, and Prejudice',
          slides: [
            {
              title: {
                1: 'Big idea: what divides us',
                2: 'When we see only what divides us',
                3: 'When we see only what divides us (B1.4, B2.1)'
              },
              visual: '⚖️',
              body: {
                1: 'Our big question: **When we see only what divides us, what happens next — and how do our words help or hurt?**\n\n**Content note:** today includes two real cases of harm done to religious communities in Canada, one in 1939 and one in 2017.\n\nTry this: list what is the **same** about two traditions you know, then what is **different**. Which list came faster? Usually differences.\n\nWe will learn to:\n- tell apart **prejudice, bias, stereotype** and **discrimination**\n- explain the problem with the words "cult" and "idolatry"\n- describe two real consequences of religious prejudice in Canada',
                2: 'Driving question: **When we see only what divides us, what happens next — and how do our words help or hurt?**\n\n**Content note:** today includes two real cases of harm done to religious communities in Canada, one in 1939 and one in 2017. You may step out if you need to.\n\nA thought experiment: list what is the SAME about two traditions you know (weekly gathering, teachings about kindness, a sacred book). Then what is different. Which list came faster? Usually differences — and that is the point of today.\n\n**Learning goals**\n- Explain how a focus on differences between religions, rather than commonalities, can foster prejudice, bias, and discrimination.\n- Examine why labels such as "cult" and "idolatry" are problematic.\n- Identify consequences of religious prejudice, past and present, in Canada.\n\n**Success criteria — I can…**\n- define prejudice, bias, stereotype, and discrimination and tell them apart\n- explain the problem with "cult" and "idolatry"\n- describe two real consequences of religious prejudice in Canada',
                3: 'Driving question: **When we see only what divides us, what happens next — and how do our words help or hurt?**\n\n**Expectations: B1.4, B2.1**\n\n**Content note:** today includes two real cases of harm done to religious communities in Canada, one in 1939 and one in 2017. You may step out if you need to.\n\nA thought experiment: list what is the SAME about two traditions you know (weekly gathering, teachings about kindness, a sacred book). Then what is different. Which list came faster? Usually differences — and that is the point of today.\n\n**Learning goals**\n- Explain how a focus on differences between religions, rather than commonalities, can foster prejudice, bias, and discrimination.\n- Examine why labels such as "cult" and "idolatry" are problematic.\n- Identify consequences of religious prejudice, past and present, in Canada.\n\n**Success criteria — I can…**\n- define prejudice, bias, stereotype, and discrimination and tell them apart\n- explain the problem with "cult" and "idolatry"\n- describe two real consequences of religious prejudice in Canada\n\nThe definitions come from the curriculum glossary (Equity Studies), and the success criteria are the unit test\'s short-answer targets for B1.4. Expectation B1.4 asks what negative consequences result from focusing on differences — "the growth of prejudice, bias, and antipathy leading to wars of religion or the persecution/oppression of minority groups". Historical sketch: Europe\'s wars of religion in the 1500s–1600s between Christian denominations; expulsions of Jews from several European countries; in Canada, the suppression of Indigenous ceremonies (Lesson 6).'
              }
            },
            {
              title: {
                1: 'The chain and two loaded words',
                2: 'How a focus on difference becomes prejudice · Two loaded words',
                3: 'How a focus on difference becomes prejudice · Two loaded words (B1.4)'
              },
              visual: '🔗',
              body: {
                1: '**The chain:** bias → stereotype → prejudice → discrimination.\n\n**How difference becomes prejudice**\n- Step 1 — "They" are defined only by what is unlike "us".\n- Step 2 — Differences are read as strange or dangerous.\n- Step 3 — A stereotype forms and is repeated in jokes and media.\n- Step 4 — Prejudice turns into discrimination.\n\n**Antidote:** start from what we share, then learn differences accurately.\n\n**Two loaded words.** "Cult" is an outsider\'s judgment. "Idolatry" is one tradition\'s accusation against another.',
                2: '**The chain:** bias (inside a person) → stereotype (a fixed picture of a group) → prejudice (an attitude toward the group) → discrimination (action that treats people unfairly). The Ontario Human Rights Code addresses the last link (Lesson 7).\n\n**How a focus on difference becomes prejudice**\n- Step 1 — "They" are defined only by what is unlike "us": clothing, food rules, holidays, a different sacred book.\n- Step 2 — Differences are read as threats or as proof that "they" are strange, backward, or dangerous.\n- Step 3 — A stereotype forms and is repeated in jokes, media, and politics until it feels like common sense.\n- Step 4 — Prejudice turns into discrimination: exclusion from jobs, housing, or safety; in the worst cases, violence.\n\n**Antidote:** start from commonalities (Lesson 1\'s four needs), then learn differences accurately, from the tradition\'s own voice. If you already see a group as fellow humans meeting the same needs, a difference becomes interesting rather than threatening.\n\n| "Cult" | "Idolatry" |\n| Dictionary meaning: a minority group whose practices outsiders consider strange or extreme | Meaning: worshipping an image or object as if it were God |\n| Problem: almost always used from OUTSIDE, as a judgment — nobody calls their own community a cult | Problem: it is one tradition\'s accusation against another — it assumes the accuser\'s view of God is the only true one |\n| Many major religions were called cults when they were new and small | Hindus honouring murtis (sacred images) explain that the image is a focus for devotion, not the deity itself |\n| Scholars prefer "new religious movement" and describe specific harmful behaviours (control, coercion) instead of labelling the belief | Using the word in a classroom takes sides in a theological argument instead of describing a practice |',
                3: '**The chain:** bias (inside a person) → stereotype (a fixed picture of a group) → prejudice (an attitude toward the group) → discrimination (action that treats people unfairly). The Ontario Human Rights Code addresses the last link (Lesson 7).\n\n**How a focus on difference becomes prejudice**\n- Step 1 — "They" are defined only by what is unlike "us": clothing, food rules, holidays, a different sacred book.\n- Step 2 — Differences are read as threats or as proof that "they" are strange, backward, or dangerous.\n- Step 3 — A stereotype forms and is repeated in jokes, media, and politics until it feels like common sense.\n- Step 4 — Prejudice turns into discrimination: exclusion from jobs, housing, or safety; in the worst cases, violence.\n\n**Antidote:** start from commonalities (Lesson 1\'s four needs), then learn differences accurately, from the tradition\'s own voice. If you already see a group as fellow humans meeting the same needs, a difference becomes interesting rather than threatening.\n\n| "Cult" | "Idolatry" |\n| Dictionary meaning: a minority group whose practices outsiders consider strange or extreme | Meaning: worshipping an image or object as if it were God |\n| Problem: almost always used from OUTSIDE, as a judgment — nobody calls their own community a cult | Problem: it is one tradition\'s accusation against another — it assumes the accuser\'s view of God is the only true one |\n| Many major religions were called cults when they were new and small | Hindus honouring murtis (sacred images) explain that the image is a focus for devotion, not the deity itself |\n| Scholars prefer "new religious movement" and describe specific harmful behaviours (control, coercion) instead of labelling the belief | Using the word in a classroom takes sides in a theological argument instead of describing a practice |\n\nBoth words describe someone else\'s belief from the standpoint of one\'s own, and both carry contempt. **Model the alternative:** "Many Hindus pray before a murti, a consecrated image that helps them focus on the deity."\n\n**Think about it:** Rewrite one sentence that uses "cult" so it describes behaviour instead of labelling the belief.'
              }
            },
            {
              title: {
                1: 'The case: the MS St. Louis, 1939',
                2: 'Real case: the MS St. Louis, 1939',
                3: 'Real case: the MS St. Louis, 1939 (B1.4)'
              },
              visual: '🚢',
              body: {
                1: '**"None is too many"**\n\n> In May 1939 the ship St. Louis left Germany with more than 900 Jewish refugees fleeing Nazi persecution.\n> Cuba refused to let them land. The United States refused. Canadian religious leaders and citizens asked Canada to accept them, but Canada also refused. Canadian immigration policy at the time was openly hostile to Jewish immigration.\n> The ship went back to Europe. About a quarter of the passengers were later killed in the Holocaust.\n> In November 2018, the Prime Minister formally apologized in the House of Commons.',
                2: '**"None is too many"**\n\n> In May 1939 the ocean liner St. Louis left Germany carrying more than 900 Jewish refugees fleeing Nazi persecution. Cuba, where most had visas, refused to let them land; the United States then refused.\n> Canadian religious leaders and citizens asked the government to accept the passengers, but Canada also refused — Canadian immigration policy at the time was openly hostile to Jewish immigration.\n> The ship returned to Europe. Several countries took in the passengers, but when Germany invaded, about a quarter of them were killed in the Holocaust.\n> In November 2018, the Prime Minister formally apologized in the House of Commons for Canada\'s refusal.\n\n**Think about it**\n- Apply the four-step chain from this lesson: where do you see bias, stereotype, prejudice, and discrimination in this case?\n- What does this case show about the cost of seeing a religious group only as "different"?',
                3: '**"None is too many"**\n\n> In May 1939 the ocean liner St. Louis left Germany carrying more than 900 Jewish refugees fleeing Nazi persecution. Cuba, where most had visas, refused to let them land; the United States then refused.\n> Canadian religious leaders and citizens asked the government to accept the passengers, but Canada also refused — Canadian immigration policy at the time was openly hostile to Jewish immigration.\n> The ship returned to Europe. Several countries took in the passengers, but when Germany invaded, about a quarter of them were killed in the Holocaust.\n> In November 2018, the Prime Minister formally apologized in the House of Commons for Canada\'s refusal.\n\n**Think about it**\n- Apply the four-step chain from this lesson: where do you see bias, stereotype, prejudice, and discrimination in this case?\n- Why do you think it took Canada until 2018 to apologize?\n- What does this case show about the cost of seeing a religious group only as "different"?\n\n**Facts from the speaker notes**\n- The St. Louis sailed from Hamburg on May 13, 1939 with 937 passengers, most of them Jewish refugees.\n- Cuba admitted fewer than 30; the US and Canada refused; the remainder were admitted to Britain, France, Belgium and the Netherlands.\n- 254 of those who returned to the continent are documented as having died in the Holocaust.\n- The phrase "none is too many" is attributed to a Canadian immigration official of the era and became the title of Irving Abella and Harold Troper\'s 1982 history of Canadian policy toward Jewish refugees.\n- The federal apology was delivered on November 7, 2018.'
              }
            },
            {
              title: {
                1: 'Prejudice today and the antidote',
                2: 'Prejudice today: it has not ended',
                3: 'Prejudice today: it has not ended (B1.4)'
              },
              visual: '📰',
              body: {
                1: 'On **January 29, 2017**, a gunman entered the Islamic Cultural Centre of Quebec City during evening prayers and killed six men.\n\nHate crimes in Canada that target religion most often target Jewish and Muslim communities.\n\nEveryday forms: "jokes", vandalism of places of worship, refusing to hire someone in a hijab or turban.\n\nThe chain is the same as in 1939: difference → stereotype → prejudice → discrimination.\n\n**What stops the chain?** Accurate knowledge, personal contact, laws that protect creed, and people who speak up early — at the "joke" stage.',
                2: '- **January 29, 2017:** a gunman entered the Islamic Cultural Centre of Quebec City during evening prayers and killed six men; the attacker later pleaded guilty to murder.\n- Police-reported hate crimes targeting religion in Canada most often target Jewish and Muslim communities, according to Statistics Canada\'s annual hate-crime reports.\n- Everyday forms: "jokes", vandalism of places of worship, refusing to hire someone in a hijab or turban, assuming a classmate\'s views from their faith.\n- The chain is the same as in 1939: difference → stereotype → prejudice → discrimination. Only the targets and tools change.\n\n**What interrupts the chain?** Accurate knowledge, personal contact, laws that protect creed (Lesson 7), and people willing to speak up early — at the "joke" stage.\n\n**Worked example — the team group chat.** A teammate asks to skip a Friday-afternoon practice for prayers (*difference*). The chat fills with memes about her religion — "just jokes" (*stereotype*). A week later two players say she is "not committed" (*prejudice*) and should not start in the final (*discrimination*). A teammate could interrupt at the joke stage: "I don\'t think the memes are funny — she asked for one practice for prayers, same as if someone had a doctor\'s appointment. Let\'s drop it."',
                3: '- **January 29, 2017:** a gunman entered the Islamic Cultural Centre of Quebec City during evening prayers and killed six men; the attacker later pleaded guilty to murder (in March 2018).\n- Police-reported hate crimes targeting religion in Canada most often target Jewish and Muslim communities, according to Statistics Canada\'s annual hate-crime reports (check the latest release before quoting figures).\n- Everyday forms: "jokes", vandalism of places of worship, refusing to hire someone in a hijab or turban, assuming a classmate\'s views from their faith.\n- The chain is the same as in 1939: difference → stereotype → prejudice → discrimination. Only the targets and tools change.\n\n**What interrupts the chain?** Accurate knowledge, personal contact, laws that protect creed (Lesson 7), and people willing to speak up early — at the "joke" stage.\n\n**Worked example — the team group chat.** A teammate asks to skip a Friday-afternoon practice for prayers (*difference*). The chat fills with memes about her religion — "just jokes" (*stereotype*). A week later two players say she is "not committed" (*prejudice*) and should not start in the final (*discrimination*). Treating her unfairly because of a religious practice is discrimination based on creed; it rests on a stereotype that observance equals lack of commitment, not on her performance. Ontario\'s Human Rights Code protects creed. A teammate could interrupt at the joke stage: "I don\'t think the memes are funny — she asked for one practice for prayers, same as if someone had a doctor\'s appointment. Let\'s drop it."\n\n**Think about it**\n- A classmate says, "I\'m not prejudiced, I just think their rules are weird." Which step of the chain is this? (Step 2 — difference read as strangeness.) What could you say?\n- Should a school forbid words like "cult", or teach why they are problematic? Which works better, and why?'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- Put these in order: discrimination, bias, stereotype, prejudice.\n- Name one historical and one recent consequence of religious prejudice in Canada.\n\n**Exit ticket:** Which step in the chain is easiest to interrupt? Why?',
                2: 'Answer in your notes, then compare with a partner.\n\n- Put these in order and define each: discrimination, bias, stereotype, prejudice.\n- Explain in one sentence why "idolatry" is a problematic word in this course.\n- Name one historical and one recent consequence of religious prejudice in Canada.\n- What is the "antidote" the lesson proposes?\n\n**Exit ticket:** Write one commonality between two traditions you know, and one difference. Then write one sentence explaining the difference respectfully. Which step in the chain do you think is easiest to interrupt? Why?',
                3: 'Answer in your notes, then compare with a partner.\n\n- Put these in order and define each: discrimination, bias, stereotype, prejudice. (bias → stereotype → prejudice → discrimination)\n- Explain in one sentence why "idolatry" is a problematic word in this course. (It assumes one tradition\'s view of God is the only true one and judges another\'s practice.)\n- Name one historical and one recent consequence of religious prejudice in Canada. (MS St. Louis, 1939 / Quebec City, 2017)\n- What is the "antidote" the lesson proposes? (Start from commonalities, learn differences accurately.)\n\n**Exit ticket:** Write one commonality between two traditions you know, and one difference. Then write one sentence explaining the difference respectfully. Which step in the chain do you think is easiest to interrupt? Why?\n\nWatch for a common slip: reproducing a stereotype even while trying to be respectful ("they all…"). Antisemitism and Islamophobia are both defined and both examined in this lesson, in parallel. If today\'s content was difficult, you can speak to your teacher or a guidance counsellor.'
              }
            }
          ]
        },

        // ---- Lesson 6: How Beliefs Travel and Shape Us ----
        {
          title: 'How Beliefs Travel and Shape Us',
          slides: [
            {
              title: {
                1: 'Big idea: how beliefs travel',
                2: 'How beliefs travel and shape us',
                3: 'How beliefs travel and shape us (B3.1, B3.4)'
              },
              visual: '🗺️',
              body: {
                1: 'Our big question: **Why is a religion born in one place now practised everywhere?** And how do beliefs change the way one person treats another?\n\nChristianity began in the Middle East. Islam began in Arabia. Buddhism began in northern India. Sikhism began in Punjab. Each is now found on every continent. How?\n\nWe will learn to:\n- name **four factors** that spread belief traditions, with an example of each\n- explain one way immigration changed Canada\'s religious landscape\n- describe how one real person\'s beliefs shaped their actions',
                2: 'Driving question: **Why is a religion born in one place now practised everywhere — and how do beliefs change the way one person treats another?**\n\nA map question: Christianity began in the Middle East, Islam in Arabia, Buddhism in northern India, Sikhism in Punjab. Each is now found on every continent. Guess how — then test your guesses against the four factors the curriculum names.\n\n**Learning goals**\n- Describe the factors that have given belief traditions global reach: migration, forced migration through enslavement, proselytism, and colonialism.\n- Analyse how immigration has changed Canadian understanding of belief traditions.\n- Explain how a person\'s religious beliefs can affect how they relate to others.\n\n**Success criteria — I can…**\n- define the four factors and give an example of each\n- explain one way immigration changed Canada\'s religious landscape\n- describe how one real person\'s beliefs shaped their actions',
                3: 'Driving question: **Why is a religion born in one place now practised everywhere — and how do beliefs change the way one person treats another?**\n\n**Expectations: B3.1, B3.4**\n\nA map question: Christianity began in the Middle East, Islam in Arabia, Buddhism in northern India, Sikhism in Punjab. Each is now found on every continent. Guess how — then test your guesses against the four factors the curriculum names.\n\n**Learning goals**\n- Describe the factors that have given belief traditions global reach: migration, forced migration through enslavement, proselytism, and colonialism (B3.1).\n- Analyse how immigration has changed Canadian understanding of belief traditions (B3.1).\n- Explain how a person\'s religious beliefs can affect how they relate to others (B3.4).\n\n**Success criteria — I can…**\n- define the four factors and give an example of each\n- explain one way immigration changed Canada\'s religious landscape\n- describe how one real person\'s beliefs shaped their actions\n\nThe four factors are a unit-test target. Be able to define **proselytism** (actively seeking converts) and to distinguish **migration** (chosen) from **forced migration**.\n\n**Vocabulary note:** "colonization" follows the curriculum glossary. "Diaspora" appears in Unit 4 (Judaism) and is useful now: Sikh, Hindu, and Muslim diasporas in Ontario show migration at work.\n\n**Think about it:** Which of today\'s terms involve choice? (Migration, and often conversion; forced migration and colonization do not.)'
              }
            },
            {
              title: {
                1: 'Four ways beliefs spread',
                2: 'Four ways belief traditions spread',
                3: 'Four ways belief traditions spread (B3.1)'
              },
              visual: '🧭',
              body: {
                1: '| Factor | What happened |\n| **Migration (chosen)** | People carry their traditions with them. After Canada\'s 1967 immigration reforms, Sikh gurdwaras, mosques and Hindu temples opened across Ontario. |\n| **Forced migration through enslavement** | Millions of Africans were taken to the Americas. Enslavers imposed Christianity; enslaved people also kept African traditions. |\n| **Proselytism** | Missionaries spread a faith on purpose. Buddhism moved along the Silk Road. |\n| **Colonialism** | Colonial powers imposed their religion and suppressed local ones. In Canada, the Indian Act banned the potlatch and other ceremonies from **1885 to 1951**. |',
                2: '| Factor | How it spread belief |\n| **Migration (chosen)** | People carry their traditions with them. Canada\'s immigration reforms of 1967 opened the door beyond Europe; Sikh gurdwaras, mosques, and Hindu temples followed in cities across Ontario. |\n| **Forced migration through enslavement** | Millions of Africans were transported to the Americas. Enslavers imposed Christianity; enslaved people also preserved and blended African traditions, creating new forms of belief. |\n| **Proselytism** | Missionaries, preachers, and traders deliberately spread a faith. Buddhism moved along the Silk Road; Christian and Muslim missions reached every continent. |\n| **Colonialism** | Colonial powers often imposed their religion and suppressed local ones. In Canada, the Indian Act banned the potlatch and other ceremonies (1885–1951) and residential schools punished Indigenous spiritual practice. |\n\nNote the ethical difference between the rows: the same tradition (Christianity) spread by choice in one case and by force in another. You should be able to say which factor is at work in a given example.\n\n**Why does a person convert?**\n- Marriage or family: joining a spouse\'s tradition.\n- Conviction: a new teaching answers questions the old one did not.\n- Community: finding belonging in a congregation.\n- Experience: an event (loss, recovery, a pilgrimage) that changes a person.\n- Pressure or survival: historically, conversion was sometimes required to keep land, work, or life — a form of colonialism.\n- Leaving: many Canadians also "convert" out of religion into secular humanism or no affiliation.\n\nConversion is deeply personal. In this class we discuss reasons in general, not anyone\'s family story unless they offer it.',
                3: '| Factor | How it spread belief |\n| **Migration (chosen)** | People carry their traditions with them. Canada\'s immigration reforms of 1967 opened the door beyond Europe; Sikh gurdwaras, mosques, and Hindu temples followed in cities across Ontario. |\n| **Forced migration through enslavement** | Millions of Africans were transported to the Americas. Enslavers imposed Christianity; enslaved people also preserved and blended African traditions, creating new forms of belief. |\n| **Proselytism** | Missionaries, preachers, and traders deliberately spread a faith. Buddhism moved along the Silk Road; Christian and Muslim missions reached every continent. |\n| **Colonialism** | Colonial powers often imposed their religion and suppressed local ones. In Canada, the Indian Act banned the potlatch and other ceremonies (1885–1951) and residential schools punished Indigenous spiritual practice. |\n\n**Facts to stand behind (speaker notes):** Canada\'s 1967 immigration regulations introduced the points system and removed explicit racial and national preferences; the potlatch ban was added to the Indian Act in 1885 and removed in 1951; the last federally run residential school closed in 1996; the Truth and Reconciliation Commission reported in 2015.\n\nNote the ethical difference between the rows: the same tradition (Christianity) spread by choice in one case and by force in another. You should be able to say which factor is at work in a given example.\n\n**Why does a person convert?**\n- Marriage or family: joining a spouse\'s tradition.\n- Conviction: a new teaching answers questions the old one did not.\n- Community: finding belonging in a congregation.\n- Experience: an event (loss, recovery, a pilgrimage) that changes a person.\n- Pressure or survival: historically, conversion was sometimes required to keep land, work, or life — a form of colonialism.\n- Leaving: many Canadians also "convert" out of religion into secular humanism or no affiliation — the fastest-growing "conversion" in Canada (Lesson 4 data).\n\nMost of these reasons connect to Lesson 1\'s human needs (community, meaning). Conversion is deeply personal: discuss reasons in general, not anyone\'s family story unless they offer it.'
              }
            },
            {
              title: {
                1: 'The case: Mother Teresa',
                2: 'Real case: belief in action — Mother Teresa (1910–1997)',
                3: 'Real case: belief in action — Mother Teresa (1910–1997) (B3.4)'
              },
              visual: '🏥',
              body: {
                1: '**Mother Teresa (1910–1997)**\n\n> Anjezë Gonxhe Bojaxhiu was born in Skopje (now North Macedonia). She became a Catholic nun and moved to India in 1929 as a teacher.\n> In 1950 she founded the Missionaries of Charity in Kolkata to care for the poorest and the dying — people hospitals turned away.\n> She said she was serving Christ in each suffering person.\n> Her order grew to hundreds of houses around the world. She received the Nobel Peace Prize in 1979 and was declared a saint in 2016.',
                2: '**Mother Teresa (1910–1997)**\n\n> Born in Skopje (now North Macedonia) to an Albanian family, Anjezë Gonxhe Bojaxhiu became a Catholic nun and moved to India in 1929 as a teacher.\n> In 1950 she founded the Missionaries of Charity in Kolkata to care for the poorest and the dying, people whom hospitals turned away. She explained her work in religious terms: she believed she was serving Christ in each suffering person.\n> The order grew to hundreds of houses around the world. She received the Nobel Peace Prize in 1979 and was declared a saint by the Catholic Church in 2016.\n\n**Think about it**\n- How did Mother Teresa\'s actions express her religious beliefs? Point to one belief and one action.\n- Which factor from today\'s lesson brought Catholicism to India before she arrived there?',
                3: '**Mother Teresa (1910–1997)**\n\n> Born in Skopje (now North Macedonia) to an Albanian family, Anjezë Gonxhe Bojaxhiu became a Catholic nun and moved to India in 1929 as a teacher.\n> In 1950 she founded the Missionaries of Charity in Kolkata to care for the poorest and the dying, people whom hospitals turned away. She explained her work in religious terms: she believed she was serving Christ in each suffering person.\n> The order grew to hundreds of houses around the world. She received the Nobel Peace Prize in 1979 and was declared a saint by the Catholic Church in 2016.\n\n**Think about it**\n- How did Mother Teresa\'s actions express her religious beliefs? Point to one belief and one action.\n- Which factor from today\'s lesson brought Catholicism to India before she arrived there? (Proselytism by Portuguese and later missionaries from the 1500s, within a colonial context.)\n- Some critics argued her approach to medical care and her views on social issues were wrong. Does that change what her example shows about belief and action?\n\n**Facts from the speaker notes:** born August 26, 1910; arrived in India 1929; founded the Missionaries of Charity 1950; Nobel Peace Prize 1979; died September 5, 1997; canonized September 4, 2016.\n\n**Balance:** critics (notably journalist Christopher Hitchens) questioned the quality of medical care in her homes and her stance against contraception; supporters point to decades of care for people no one else would touch. The lesson\'s point stands either way: her beliefs clearly drove her actions, and you can evaluate the actions. This models the course habit of describing fairly before judging.'
              }
            },
            {
              title: {
                1: 'Immigration changed Canada',
                2: 'Immigration and Canadian attitudes · Worked example',
                3: 'Immigration and Canadian attitudes · Worked example (B3.1)'
              },
              visual: '🏛️',
              body: {
                1: 'Before the 1960s, Canadian public life assumed a Christian majority: Sunday closing laws, prayers in public schools.\n\nImmigration since 1967 brought large Muslim, Hindu, Sikh and Buddhist communities. Attitudes changed with contact: multiculturalism policy (1971), the Charter\'s freedom of religion (1982), the Multiculturalism Act (1988).\n\nBut diversity did not simply "arrive". Indigenous spiritual traditions were here first and were suppressed.\n\n**Worked example:** Mother Teresa believed she was serving Christ in each poor person, so she founded an order to care for them.',
                2: '- Before the 1960s, Canadian public life assumed a Christian majority: Sunday closing laws, prayers in public schools, Christian references in ceremonies.\n- Immigration since 1967 brought large Muslim, Hindu, Sikh, and Buddhist communities; the 2021 Census shows each more than doubled since 2001.\n- Attitudes changed with contact: multiculturalism policy (1971), the Charter\'s freedom of religion (1982), the Multiculturalism Act (1988), and "creed" protections in human-rights law.\n- Change is not finished: debates over religious symbols in public jobs (Quebec\'s Bill 21, Lesson 8) show Canadians still disagree about how visible belief should be.\n\nDiversity did not simply "arrive": Indigenous spiritual traditions were here first and were actively suppressed; Jewish communities date to the 1700s; Chinese and Japanese Buddhist and Sikh communities were present in British Columbia by the early 1900s.\n\n**Worked example — a town\'s heritage plaque.** Riverbend (fictional): an Anishinaabe community held ceremonies on the river for centuries (original tradition — none of the four factors); French Catholic missionaries arrived in the 1700s (proselytism within colonialism); a residential school operated nearby 1890–1960 (colonialism); Jewish merchants opened a synagogue in 1910 (migration); since the 1990s immigration added a mosque, a Hindu temple and a Sikh gurdwara (migration). An honest plaque names the residential school rather than telling only the welcoming story.',
                3: '- Before the 1960s, Canadian public life assumed a Christian majority: Sunday closing laws, prayers in public schools, Christian references in ceremonies.\n- Immigration since 1967 brought large Muslim, Hindu, Sikh, and Buddhist communities; the 2021 Census shows each more than doubled since 2001.\n- Attitudes changed with contact: multiculturalism policy (1971), the Charter\'s freedom of religion (1982), the Multiculturalism Act (1988), and "creed" protections in human-rights law. The Canadian Charter of Rights and Freedoms (1982), section 2(a), guarantees freedom of conscience and religion.\n- Change is not finished: debates over religious symbols in public jobs (Quebec\'s Bill 21, Lesson 8) show Canadians still disagree about how visible belief should be.\n\nBut diversity did not simply "arrive": Indigenous spiritual traditions were here first and were actively suppressed; Jewish communities date to the 1700s; Chinese and Japanese Buddhist and Sikh communities were present in British Columbia by the early 1900s.\n\n**Worked example — a town\'s heritage plaque.** Riverbend (fictional): an Anishinaabe community held ceremonies on the river for centuries (original tradition — none of the four factors); French Catholic missionaries arrived in the 1700s (proselytism within colonialism); a residential school operated nearby 1890–1960 (colonialism — state power used to replace one people\'s religion with another\'s); Jewish merchants opened a synagogue in 1910 (migration); since the 1990s immigration added a mosque, a Hindu temple and a Sikh gurdwara (migration). A committee member says the residential school is "too negative" for a plaque — but leaving it out repeats the pattern of telling only the welcoming story, and the TRC calls for this history to be taught.\n\n**Think about it:** "The same belief tradition can be a gift in one situation and a weapon in another." Christianity reached Indigenous nations by proselytism, was imposed through residential schools (colonialism), and also arrived by choice with immigrant communities (migration). The harm or good lies in how power was used — force vs choice — not in the belief alone.'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- Name the **four factors** that gave belief traditions global reach.\n- What did the Indian Act do to Indigenous ceremonies, and when?\n\n**Exit ticket:** Pick one tradition in your community. Which factor most likely brought it here?',
                2: 'Answer in your notes, then compare with a partner.\n\n- Name the four factors that gave belief traditions global reach, with one example each.\n- What did the Indian Act do to Indigenous ceremonies, and when?\n- Give two reasons a person might convert to a tradition.\n- In one sentence, how did Mother Teresa\'s beliefs shape her actions?\n\n**Exit ticket:** Pick one tradition present in your community. Which factor (migration, forced migration, proselytism, colonialism) most likely brought it here? Name one person — famous or someone you know — whose beliefs visibly shape how they treat others. What do they do?',
                3: 'Answer in your notes, then compare with a partner.\n\n- Name the four factors that gave belief traditions global reach, with one example each. (Migration, forced migration, proselytism, colonialism.)\n- What did the Indian Act do to Indigenous ceremonies, and when? (Banned the potlatch and other ceremonies from 1885 to 1951.)\n- Give two reasons a person might convert to a tradition.\n- In one sentence, how did Mother Teresa\'s beliefs shape her actions? (She believed she was serving Christ in the poorest, so she founded an order to care for them.)\n\n**Talk it through**\n- How might a friend\'s religious beliefs and practices influence your relationship — meals, weekends, what you can joke about, what you can lean on them for?\n- Is spreading a belief by proselytism fair? When does persuasion become pressure? (Freedom of religion includes the freedom to share and the freedom to refuse.)\n- Canada\'s history includes both welcoming belief traditions and suppressing them. Which story do you think most Canadians know better? Why? (The TRC\'s Call to Action 62 asks for this history to be taught.)\n\n**Exit ticket:** Pick one tradition present in your community. Which factor most likely brought it here? Name one person whose beliefs visibly shape how they treat others. What do they do?'
              }
            }
          ]
        },

        // ---- Lesson 7: Creed and the Law in Ontario ----
        {
          title: 'Creed and the Law in Ontario',
          slides: [
            {
              title: {
                1: 'Big idea: creed and the law',
                2: 'What changed when Ontario wrote "creed" into its law?',
                3: 'What changed when Ontario wrote "creed" into its law? (B3.3, B3.2)'
              },
              visual: '⚖️',
              body: {
                1: 'Our big question: **What changed when Ontario wrote "creed" into its human rights law — and where are the limits?**\n\nQuick gut check: when is it OK for a worker to refuse something that conflicts with their beliefs? We will come back to this with the law\'s real test.\n\nWe will learn to:\n- name the **Ontario Human Rights Code**, its date, and what a **protected ground** is\n- explain **accommodation** and give two limits\n- apply the test to a scenario',
                2: 'Driving question: **What changed when Ontario wrote "creed" into its human rights law — and where are the limits?**\n\nThe curriculum\'s scenario question: "Under what circumstances might it be acceptable for an employee to refuse to do something that conflicts with the teachings of their belief tradition?" Give a quick gut answer for a pharmacist, a server asked to pour alcohol, a nurse asked to work on a holy day. We return to them at the end with the law\'s actual test.\n\n**Learning goals**\n- Explain the impact of including "creed" as a protected ground under the Ontario Human Rights Code.\n- Describe the duty to accommodate and the idea of undue hardship.\n- Analyse real and hypothetical cases where belief and work conflict.\n\n**Success criteria — I can…**\n- name the Code, its date, and what "protected ground" means\n- explain accommodation and give two limits\n- apply the test to a scenario and explain my reasoning',
                3: 'Driving question: **What changed when Ontario wrote "creed" into its human rights law — and where are the limits?**\n\n**Expectations: B3.3, B3.2**\n\nThe curriculum\'s scenario question: "Under what circumstances might it be acceptable for an employee to refuse to do something that conflicts with the teachings of their belief tradition?" Give a quick gut answer for a pharmacist, a server asked to pour alcohol, a nurse asked to work on a holy day. We return to them at the end with the law\'s actual test.\n\n**Learning goals**\n- Explain the impact of including "creed" as a protected ground under the Ontario Human Rights Code (B3.3).\n- Describe the duty to accommodate and the idea of undue hardship (B3.2).\n- Analyse real and hypothetical cases where belief and work conflict (B3.2).\n\n**Success criteria — I can…**\n- name the Code, its date, and what "protected ground" means\n- explain accommodation and give two limits\n- apply the test to a scenario and explain my reasoning\n\nCriterion 3 is the unit test\'s scenario question. You need the **two-sided test**: the person\'s sincere belief AND the organization\'s limits.\n\n**From the speaker notes:** the Code itself does not define creed; the 2015 OHRC policy does, listing characteristics — sincerely, freely, and deeply held; integrally linked to identity; a particular, comprehensive system of belief; addressing ultimate questions; often connected to a community. Legal content is simplified for Grade 11 Open: the Code is a floor, and courts and the Tribunal decide hard cases.'
              }
            },
            {
              title: {
                1: 'The Ontario Human Rights Code',
                2: 'The Ontario Human Rights Code',
                3: 'The Ontario Human Rights Code (B3.3)'
              },
              visual: '🏛️',
              body: {
                1: '| Date | What happened |\n| **1962** | Ontario\'s Human Rights Code — the **first** comprehensive human rights law in Canada. Creed was protected from the start. |\n| **1982** | The Canadian Charter of Rights and Freedoms protects freedom of conscience and religion against governments. |\n| **2015** | The Ontario Human Rights Commission\'s creed policy widened "creed" to include non-religious belief systems and Indigenous spirituality. |\n\nThe Code has **17 protected grounds** (like creed, race, sex, disability) and **5 social areas** (like employment and housing).\n\nImpact: an employer cannot refuse to hire you because of your religion.',
                2: '| Milestone | What it means |\n| **1962: first in Canada** | Ontario\'s Human Rights Code was the first comprehensive human rights law in Canada. Creed has been a protected ground since the beginning. |\n| **17 protected grounds, 5 social areas** | Grounds include creed, race, colour, ancestry, citizenship, ethnic origin, place of origin, sex, sexual orientation, gender identity and expression, age, disability, family and marital status. Areas: employment, housing, services, contracts, membership. |\n| **Charter, 1982** | The Canadian Charter of Rights and Freedoms, section 2(a), guarantees freedom of conscience and religion against governments. The Code covers private employers and services too. |\n| **2015: creed policy updated** | The Ontario Human Rights Commission\'s Policy on preventing discrimination based on creed broadened "creed" to include non-religious belief systems and Indigenous spirituality. |\n\n**Impact in plain terms:** an employer cannot refuse to hire someone because of their religion; a landlord cannot refuse a tenant; a school or store must accommodate religious practice up to undue hardship; a person with a non-religious but comprehensive belief system can claim protection; Indigenous spiritual practices are explicitly recognized.\n\n**Key words:** a *protected ground* is a personal characteristic on which discrimination is prohibited; a *social area* is a setting the Code covers; the *duty to accommodate* is the obligation to adjust rules so a person is not disadvantaged; *undue hardship* is the legal limit of that duty.',
                3: '| Milestone | What it means |\n| **1962: first in Canada** | Ontario\'s Human Rights Code was the first comprehensive human rights law in Canada. Creed has been a protected ground since the beginning. |\n| **17 protected grounds, 5 social areas** | Grounds include creed, race, colour, ancestry, citizenship, ethnic origin, place of origin, sex, sexual orientation, gender identity and expression, age, disability, family and marital status. Areas: employment, housing, services, contracts, membership. |\n| **Charter, 1982** | The Canadian Charter of Rights and Freedoms, section 2(a), guarantees freedom of conscience and religion against governments. The Code covers private employers and services too. |\n| **2015: creed policy updated** | The Ontario Human Rights Commission\'s Policy on preventing discrimination based on creed broadened "creed" to include non-religious belief systems and Indigenous spirituality. |\n\n**Impact in plain terms (B3.3):** an employer cannot refuse to hire someone because of their religion; a landlord cannot refuse a tenant; a school or store must accommodate religious practice up to undue hardship; a person with a non-religious but comprehensive belief system (ethical veganism has been argued, but is not definitively settled in Ontario) can claim protection; Indigenous spiritual practices are explicitly recognized. People can bring complaints to the Human Rights Tribunal of Ontario.\n\nThe OHRC\'s 2013 survey found that most people reporting creed-based discrimination experienced it at work — which is why employment is the focus of this lesson.\n\n**Key words:** a *protected ground* is a personal characteristic on which discrimination is prohibited; a *social area* is a setting the Code covers; the *duty to accommodate* is the obligation to adjust rules so a person is not disadvantaged; *undue hardship* is the legal limit of that duty — under section 11 of the Code its three factors are **cost, outside sources of funding, and health and safety requirements**; *competing rights* arise when one person\'s rights appear to conflict with another\'s, and both must be weighed.\n\n**Think about it:** Should a belief system with no god — ethical veganism, for example — count as a creed? What are the arguments each way?'
              }
            },
            {
              title: {
                1: 'The case: the hard hat and the turban',
                2: 'Real case: the hard hat and the turban',
                3: 'Real case: the hard hat and the turban (B3.2)'
              },
              visual: '⛑️',
              body: {
                1: '**Bhinder v. Canadian National Railway (1985)**\n\n> K.S. Bhinder was a Sikh electrician for CN Rail in Toronto. He wore a turban as part of his religion.\n> In 1978 CN made a rule: all workers in his yard must wear hard hats. Mr. Bhinder would not remove his turban, and he lost his job.\n> A human rights tribunal sided with him. But in 1985 the Supreme Court of Canada ruled for CN. The hard-hat rule was a real safety rule, and the employer did not have to make an exception.\n> Five years later, in a 1990 case, the Supreme Court changed its approach: employers must accommodate individual employees up to undue hardship. That is the rule used today.',
                2: '**Bhinder v. Canadian National Railway (1985)**\n\n> K.S. Bhinder, a Sikh electrician for CN Rail in Toronto, wore a turban as part of his religious practice. In 1978 CN introduced a rule that all workers in his yard must wear hard hats. Mr. Bhinder refused to remove his turban and lost his job.\n> A human rights tribunal sided with him, but in 1985 the Supreme Court of Canada ruled for CN: the hard-hat rule was a genuine safety requirement, and the Court held the employer did not have to make an exception.\n> Five years later, in a 1990 case, the Supreme Court changed its approach and held that employers must accommodate individual employees up to undue hardship — the rule used today.\n\n**Think about it**\n- Apply the two-sided test: what did Mr. Bhinder show, and what did CN argue?\n- Why might the Court have ruled differently if the case were heard today?',
                3: '**Bhinder v. Canadian National Railway (1985)**\n\n> K.S. Bhinder, a Sikh electrician for CN Rail in Toronto, wore a turban as part of his religious practice. In 1978 CN introduced a rule that all workers in his yard must wear hard hats. Mr. Bhinder refused to remove his turban and lost his job.\n> A human rights tribunal sided with him, but in 1985 the Supreme Court of Canada ruled for CN: the hard-hat rule was a genuine safety requirement, and the Court held the employer did not have to make an exception.\n> Five years later, in a 1990 case, the Supreme Court changed its approach and held that employers must accommodate individual employees up to undue hardship — the rule used today.\n\n**Think about it**\n- Apply the two-sided test: what did Mr. Bhinder show, and what did CN argue?\n- Why might the Court have ruled differently if the case were heard today?\n- Was CN\'s rule an example of discrimination, a safety limit, or both? Explain.\n\n**From the speaker notes:** Bhinder v. CN, [1985] 2 S.C.R. 561. The 1990 case is Central Alberta Dairy Pool v. Alberta (Human Rights Commission), [1990] 2 S.C.R. 489, which recognized a duty to accommodate individuals even when a rule is neutral. What to see: (1) the belief was sincere and the interference serious; (2) CN relied on health and safety; (3) today the employer would have to show it explored alternatives (e.g. assigning him to work where hard hats were not needed) before refusing. The case is chosen because the worker *lost* — and the law later changed. Creed protection has limits, law evolves, and "religion always wins" is not the lesson.'
              }
            },
            {
              title: {
                1: 'The two-sided test',
                2: 'The two-sided test · When can an employee refuse?',
                3: 'The two-sided test · When can an employee refuse? (B3.2)'
              },
              visual: '🤝',
              body: {
                1: '| The person must show | The organization must |\n| A sincere belief connected to their creed | Take the request seriously and look for a solution: schedule changes, uniform changes, prayer space |\n| The rule really interferes with that belief | Accommodate up to **undue hardship**: cost, outside funding, health and safety |\n| They are willing to work on a solution | Balance competing rights |\n\nThe law never asks "is the belief true?" It asks "is the belief sincere, and can the workplace adjust?"\n\n**Example:** a short prayer break is easy to accommodate. A turban instead of a hard hat raises health and safety.',
                2: '| The person must show | The organization must |\n| A sincerely held belief or practice connected to their creed | Take the request seriously and look for ways to accommodate: schedule changes, uniform adjustments, prayer space, alternate duties |\n| The rule or request interferes with that belief in more than a trivial way | Accommodate up to the point of undue hardship: cost, outside funding, health and safety |\n| They have told the organization and are willing to cooperate in finding a solution | Balance competing rights — e.g. another person\'s right to service without discrimination |\n| Note: the belief does not have to be required by an official doctrine (Amselem, 2004 — Lesson 8) | Document the process; "we\'ve always done it this way" is not a defence |\n\n**When can an employee refuse?**\n- More likely acceptable: asking to swap a shift on a holy day; declining to serve alcohol when other staff can; wearing religious dress that does not create a safety risk; a short break for prayer.\n- Less likely acceptable: refusing to serve a customer because of who they are (that discriminates against the customer); refusing a core safety rule with no alternative; refusing a task that is the whole job.\n\nThe question is never "is the belief true?" — the law does not judge beliefs. It is "is the belief sincere, and can the workplace adjust without undue hardship?"\n\n**Worked examples:** (1) A Muslim cashier asks for a short break for one of the daily prayers — accommodation is easy, no hardship. (2) A Sikh construction worker asks to wear a turban instead of a hard hat — health and safety is at stake; in 1985 the Supreme Court said the employer could refuse (Bhinder), and the law has become more demanding since.',
                3: '| The person must show | The organization must |\n| A sincerely held belief or practice connected to their creed | Take the request seriously and look for ways to accommodate: schedule changes, uniform adjustments, prayer space, alternate duties |\n| The rule or request interferes with that belief in more than a trivial way | Accommodate up to the point of undue hardship: cost, outside funding, health and safety |\n| They have told the organization and are willing to cooperate in finding a solution | Balance competing rights — e.g. another person\'s right to service without discrimination |\n| Note: the belief does not have to be required by an official doctrine (Amselem, 2004 — Lesson 8) | Document the process; "we\'ve always done it this way" is not a defence |\n\n**When can an employee refuse?**\n- More likely acceptable: asking to swap a shift on a holy day; declining to serve alcohol when other staff can; wearing religious dress that does not create a safety risk; a short break for prayer.\n- Less likely acceptable: refusing to serve a customer because of who they are; refusing a core safety rule with no alternative; refusing a task that is the whole job.\n\nThe question is never "is the belief true?" — a secular state cannot be the judge of theology. It is "is the belief sincere, and can the workplace adjust without undue hardship?" An accommodation cannot be granted by taking away someone else\'s Code rights.\n\n**Worked example — three grocery-store requests.** (A) Raj, who is Sikh, asks to wear his turban instead of the store\'s baseball cap: accommodate — sincere practice, a cap is not a safety item, adjusting the uniform policy costs nothing. (B) Hannah, who is Jewish, asks never to be scheduled from Friday sunset to Saturday sunset for Shabbat: accommodate — undue hardship only if the store can show it genuinely cannot staff Saturdays. (C) Marco, a cashier, says his beliefs do not allow him to serve customers wearing another faith\'s religious symbols: do not accommodate — this is not a request to adjust his own practice but to discriminate against customers on the ground of creed in the social area of services (competing rights). His sincerity is not the issue; the effect on others is.'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- In what year did Ontario pass its Human Rights Code? Why was it special?\n- What are the three factors that define **undue hardship**?\n\n**Exit ticket:** finish this sentence: "The Code protects creed because …"',
                2: 'Answer in your notes, then compare with a partner.\n\n- In what year did Ontario pass its Human Rights Code, and what was significant about it?\n- Name three protected grounds and two social areas.\n- What are the three factors that define undue hardship?\n- In one sentence, what did Bhinder v. CN decide, and how did the law change later?\n\n**Exit ticket:** Write one workplace request based on creed that should be accommodated and one that might reach undue hardship. Explain the difference in one sentence. Complete: "The Code protects creed because …"',
                3: 'Answer in your notes, then compare with a partner.\n\n- In what year did Ontario pass its Human Rights Code, and what was significant about it? (1962; the first comprehensive human rights law in Canada.)\n- Name three protected grounds and two social areas.\n- What are the three factors that define undue hardship? (Cost, outside sources of funding, health and safety.)\n- In one sentence, what did Bhinder v. CN decide, and how did the law change later? (The employer could enforce a safety rule without an exception, 1985; by 1990 employers had to accommodate individuals up to undue hardship.)\n\n**Talk it through**\n- A server at a restaurant asks not to carry alcohol to tables for religious reasons. The manager says "then don\'t work here." Apply the test. What should each side have done?\n- Why does the law protect sincerity rather than judging whether a belief is correct? (A secular state cannot rule on theology; it can only ask whether a person honestly holds the belief — Amselem.)\n\n**Exit ticket:** Write one workplace request based on creed that should be accommodated and one that might reach undue hardship. Explain the difference in one sentence. Make sure your "undue hardship" example involves real cost or safety, not just inconvenience — the most common misunderstanding. Complete: "The Code protects creed because …"'
              }
            }
          ]
        },

        // ---- Lesson 8: Dress, Diet, and Behaviour: Accommodation in Everyday Life ----
        {
          title: 'Dress, Diet, and Behaviour: Accommodation in Everyday Life',
          slides: [
            {
              title: {
                1: 'Big idea: when observance meets a rule',
                2: 'When observance meets a rule',
                3: 'When observance meets a rule (C2.4, B3.2)'
              },
              visual: '🏫',
              body: {
                1: 'A steel bracelet. A small hut on a balcony. A dagger in a sheath. What did Canadian courts decide about them — and why does it matter in a school hallway?\n\nHave you ever been stopped from eating, wearing or carrying something by a rule that ignored your background? Today\'s cases show how Canada\'s top court handled such moments.\n\nWe will learn to:\n- give examples of **dress, diet** and **behaviour** practices that can cause difficulty\n- summarize the **Multani** (2006) and **Amselem** (2004) cases\n- explain the debate over Quebec\'s **Bill 21** from both sides',
                2: 'A steel bracelet, a small hut on a balcony, a dagger in a sheath: what Canadian courts decided, and why it matters in a hallway.\n\nHas anyone ever been told they could not do something — eat, wear, skip, carry — because of a rule that did not consider their background? Today\'s cases show how Canada has handled such moments at the highest level.\n\n**Learning goals**\n- Describe difficulties individuals may encounter when their religious observance includes particular practices in dress, diet, or behaviour.\n- Explain how the Supreme Court of Canada resolved the kirpan and succah cases.\n- Compare different approaches to religious symbols in public life in Canada.\n\n**Success criteria — I can…**\n- give two examples each of dress, diet, and behaviour practices that can cause difficulty\n- summarize Multani (2006) and Amselem (2004) and their reasoning\n- explain the debate over Quebec\'s Bill 21 from both sides',
                3: 'A steel bracelet, a small hut on a balcony, a dagger in a sheath: what Canadian courts decided, and why it matters in a hallway.\n\n**Expectations: C2.4, B3.2**\n\nHas anyone ever been told they could not do something — eat, wear, skip, carry — because of a rule that did not consider their background? Today\'s cases show how Canada has handled such moments at the highest level.\n\n**Learning goals**\n- Describe difficulties individuals may encounter when their religious observance includes particular practices in dress, diet, or behaviour (C2.4).\n- Explain how the Supreme Court of Canada resolved the kirpan and succah cases (C2.4, B3.2).\n- Compare different approaches to religious symbols in public life in Canada (B3.2).\n\n**Success criteria — I can…**\n- give two examples each of dress, diet, and behaviour practices that can cause difficulty\n- summarize Multani (2006) and Amselem (2004) and their reasoning\n- explain the debate over Quebec\'s Bill 21 from both sides\n\nCriterion 2 is the unit test\'s short-answer target for C2.4: know the **year, the practice, and the principle** for each case. "Sincerity of belief" comes from Amselem and was applied in Multani. The Five Ks (kesh, kangha, kara, kachera, kirpan) are covered in Unit 3; here you need only know what the kirpan is and why it is worn. Nobody who wears religious dress is required to explain it to classmates — the slides carry the explanations.'
              }
            },
            {
              title: {
                1: 'Where observance meets a rule',
                2: 'Where observance meets a rule',
                3: 'Where observance meets a rule (C2.4)'
              },
              visual: '🍲',
              body: {
                1: '**Dress and appearance**\n- Hijab, niqab, turban, kippah, kara: uniform rules, safety gear, ID photos, sports rules\n- Uncut hair and beard: grooming codes\n- Modest dress: gym class and swimming\n\n**Diet and behaviour**\n- Halal, kosher, vegetarian: cafeterias, team meals, school trips\n- Fasting (Ramadan, Lent, Yom Kippur): exam timing, sports\n- Holy days (Shabbat, Eid, Diwali, Vaisakhi): tests, work shifts\n- Refusing blood transfusions (Jehovah\'s Witnesses): hospital care\n- Offering tobacco, smudging (Indigenous protocol): smoke-free rules',
                2: '| Dress and appearance | Diet and behaviour |\n| Hijab, niqab, turban, kippah, kara: uniform policies, safety gear, ID photos, sports rules | Halal, kosher, vegetarian (Hindu, Jain, Buddhist, Sikh): cafeterias, team meals, school trips |\n| Uncut hair and beard (Sikh men, some Jewish and Muslim men): grooming codes | Fasting (Ramadan, Lent, Yom Kippur): exam timing, sports, lunch supervision |\n| Modest dress or gender-separated changing: physical education and swimming | Holy days (Shabbat, Eid, Diwali, Vaisakhi): tests, work shifts, graduation dates |\n|  | Refusing blood transfusions (Jehovah\'s Witnesses): hospital care |\n|  | Offering tobacco, smudging (Indigenous protocol): smoke-free rules, security |\n\n**Key words**\n- **hijab** — a head covering worn by many Muslim women as an expression of modesty and faith\n- **kirpan** — a small ceremonial sword worn by initiated (Khalsa) Sikhs as one of the Five Ks, a reminder to defend justice\n- **succah (sukkah)** — a temporary hut in which Jews eat and may sleep during the festival of Sukkot\n- **halal / kosher** — food permitted under Islamic law / Jewish dietary law, including how animals are slaughtered\n- **reasonable accommodation** — adjusting a rule so a person can follow their practice, up to the point of undue hardship',
                3: '| Dress and appearance | Diet and behaviour |\n| Hijab, niqab, turban, kippah, kara: uniform policies, safety gear, ID photos, sports rules | Halal, kosher, vegetarian (Hindu, Jain, Buddhist, Sikh): cafeterias, team meals, school trips |\n| Uncut hair and beard (Sikh men, some Jewish and Muslim men): grooming codes | Fasting (Ramadan, Lent, Yom Kippur): exam timing, sports, lunch supervision |\n| Modest dress or gender-separated changing: physical education and swimming | Holy days (Shabbat, Eid, Diwali, Vaisakhi): tests, work shifts, graduation dates |\n|  | Refusing blood transfusions (Jehovah\'s Witnesses): hospital care |\n|  | Offering tobacco, smudging (Indigenous protocol): smoke-free rules, security |\n\nExpectation C2.4 names hijab, blood transfusions, vegetarian diet, and offering tobacco as examples. Try to name one real difficulty per row.\n\n**From the speaker notes:** many Ontario schools and hospitals now have policies allowing ceremonial smudging indoors; offering tobacco is a sign of respect when asking an Elder or Knowledge Keeper for help, and security or no-smoking rules sometimes misunderstand it. Jehovah\'s Witnesses believe the Bible forbids taking in blood; adult patients may refuse treatment, and Canadian courts have intervened in some cases involving minors.\n\n**Key words**\n- **hijab** — a head covering worn by many Muslim women as an expression of modesty and faith\n- **kirpan** — a small ceremonial sword worn by initiated (Khalsa) Sikhs as one of the Five Ks, a reminder to defend justice\n- **succah (sukkah)** — a temporary hut in which Jews eat and may sleep during the festival of Sukkot\n- **halal / kosher** — food permitted under Islamic law / Jewish dietary law, including how animals are slaughtered\n- **sincerity of belief** — the legal test: a court asks whether a person honestly holds a belief, not whether a religious authority requires it\n- **reasonable accommodation** — adjusting a rule so a person can follow their practice, up to the point of undue hardship'
              }
            },
            {
              title: {
                1: 'The case: the kirpan at school',
                2: 'Real case: the kirpan at school',
                3: 'Real case: the kirpan at school (C2.4)'
              },
              visual: '🎒',
              body: {
                1: '**Multani v. Commission scolaire Marguerite-Bourgeoys (2006)**\n\n> In 2001, Gurbaj Singh Multani, a 12-year-old Sikh student in Montreal, dropped his kirpan in the schoolyard.\n> The school board first said he could wear it sewn inside his clothing. Then it banned it under a rule against weapons. His family went to court.\n> In March 2006 the Supreme Court of Canada ruled that a total ban violated his freedom of religion. He sincerely believed his faith required the kirpan, he was not violent, and conditions — a wooden sheath, sewn into a cloth, under clothing — made it safe.\n> A total ban was not a reasonable limit.',
                2: '**Multani v. Commission scolaire Marguerite-Bourgeoys (2006)**\n\n> In 2001, Gurbaj Singh Multani, a 12-year-old Sikh student in Montreal, dropped his kirpan in the schoolyard. The school board at first agreed he could wear it sewn inside his clothing, then banned it under a rule against weapons. His family went to court.\n> In March 2006 the Supreme Court of Canada ruled unanimously that the total ban violated his freedom of religion under the Charter.\n> The Court noted he sincerely believed his faith required the kirpan, that he was not violent, that there had been no kirpan-related incidents in Quebec schools, and that conditions — a wooden sheath, sewn into a cloth, under clothing — made it safe. A total ban was not a reasonable limit.\n\n**Think about it**\n- Which part of the two-sided test (Lesson 7) does each fact on the slide support?\n- The Court allowed the kirpan WITH conditions. Why is that different from "anything goes"?',
                3: '**Multani v. Commission scolaire Marguerite-Bourgeoys (2006)**\n\n> In 2001, Gurbaj Singh Multani, a 12-year-old Sikh student in Montreal, dropped his kirpan in the schoolyard. The school board at first agreed he could wear it sewn inside his clothing, then banned it under a rule against weapons. His family went to court.\n> In March 2006 the Supreme Court of Canada ruled unanimously that the total ban violated his freedom of religion under the Charter.\n> The Court noted he sincerely believed his faith required the kirpan, that he was not violent, that there had been no kirpan-related incidents in Quebec schools, and that conditions — a wooden sheath, sewn into a cloth, under clothing — made it safe. A total ban was not a reasonable limit.\n\n**Think about it**\n- Which part of the two-sided test (Lesson 7) does each fact on the slide support?\n- The Court allowed the kirpan WITH conditions. Why is that different from "anything goes"?\n- How might this case change the way a school writes its "no weapons" rule?\n\n**From the speaker notes:** Multani v. Commission scolaire Marguerite-Bourgeoys, 2006 SCC 6. Hearing April 2005; judgment March 2, 2006. By then Multani attended a private school that allowed the kirpan, so the ruling set a precedent rather than changing his own schooling. The lesson: accommodation means conditions, not exemptions from safety; the board\'s error was refusing to consider alternatives. Ontario school boards typically allow kirpans under similar conditions today.\n\n**Worked rewrite of a school rule:** "No weapons are permitted on school property. An initiated Sikh student may wear a kirpan provided it is secured in a sheath, sewn into a cloth holder, and worn under clothing; the student and family sign an agreement with the school."'
              }
            },
            {
              title: {
                1: 'The succah case and Bill 21',
                2: 'The succah on the balcony · Two Canadian approaches to religious symbols',
                3: 'The succah on the balcony · Two Canadian approaches to religious symbols (B3.2)'
              },
              visual: '🏘️',
              body: {
                1: '**Amselem (2004).** Orthodox Jewish residents of a Montreal condo built small succahs on their balconies for Sukkot. The bylaws banned balcony structures. The Supreme Court ruled 5–4 for the residents. Courts only check if a belief is **sincere** — not whether religious leaders require it.\n\n**Two approaches to religious symbols**\n- **Ontario and most of Canada:** public employees, including teachers and police, may wear religious dress.\n- **Quebec: Bill 21 (2019)** bans public employees in positions of authority — judges, police, teachers — from wearing religious symbols at work. Supporters want a visibly secular state. Critics say it falls hardest on Muslim women and Sikh men.',
                2: '**Syndicat Northcrest v. Amselem (2004).** Moïse Amselem and other Orthodox Jewish residents of a Montreal condominium built small succahs on their balconies for the nine days of Sukkot. The condo\'s bylaws banned structures on balconies, and the board offered a shared succah in the garden instead. The residents said their personal religious belief required each household to have its own. In 2004 the Supreme Court of Canada ruled 5–4 for the residents. The majority held that freedom of religion protects a sincerely held belief even if religious authorities do not require the practice, that the court\'s job is only to check sincerity, and that a nine-day temporary structure caused the condo very little harm.\n\n| Ontario and most of Canada | Quebec: Bill 21 (2019) |\n| Public employees, including teachers and police, may wear religious dress | Bans public employees in positions of authority — judges, police, teachers — from wearing religious symbols at work |\n| Since 1990 the RCMP has allowed turbans in uniform | Supporters: the state should be neutral and visibly secular (laïcité); surveys showed majority support in Quebec |\n| The Code requires accommodation of creed in employment and services | Critics: it falls hardest on Muslim women in hijab and Sikh men in turbans and violates freedom of religion |\n| Debate centres on individual cases, not blanket rules | Passed using the Charter\'s notwithstanding clause; challenged in court; the Supreme Court of Canada heard the case in March 2026 |',
                3: '**Syndicat Northcrest v. Amselem (2004).** Moïse Amselem and other Orthodox Jewish residents of a Montreal condominium built small succahs on their balconies for the nine days of Sukkot. The condo\'s bylaws banned structures on balconies, and the board offered a shared succah in the garden instead. The residents said their personal religious belief required each household to have its own. In 2004 the Supreme Court of Canada ruled 5–4 for the residents. The majority held that freedom of religion protects a sincerely held belief even if religious authorities do not require the practice, that the court\'s job is only to check sincerity, and that a nine-day temporary structure caused the condo very little harm.\n\n**Think about it:** What did the Court say about who decides what a religion "requires"? Four judges disagreed — the dissent worried about the rights of other owners and about courts accepting purely personal interpretations without evidence. (2004 SCC 47; judgment June 30, 2004. This is the origin of the "sincerity of belief" test used in Multani and in creed cases under the Ontario Code.)\n\n| Ontario and most of Canada | Quebec: Bill 21 (2019) |\n| Public employees, including teachers and police, may wear religious dress | Bans public employees in positions of authority — judges, police, teachers — from wearing religious symbols at work |\n| Since 1990 the RCMP has allowed turbans in uniform | Supporters: the state should be neutral and visibly secular (laïcité); surveys showed majority support in Quebec |\n| The Code requires accommodation of creed in employment and services | Critics: it falls hardest on Muslim women in hijab and Sikh men in turbans and violates freedom of religion |\n| Debate centres on individual cases, not blanket rules | Passed using the Charter\'s notwithstanding clause; challenged in court; the Supreme Court of Canada heard the case in March 2026 |\n\n**From the speaker notes:** both sides are sincere. Bill 21 (An Act respecting the laicity of the State) passed June 16, 2019; the Quebec Court of Appeal upheld it in 2024; the Supreme Court heard the appeals in March 2026 — check the outcome. The RCMP turban decision came in March 1990 after Baltej Singh Dhillon applied to join the force.'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- What did **Multani** (2006) decide, and under what conditions?\n- What is the **sincerity of belief** test, and which case created it?\n\n**Exit ticket:** finish this sentence: "Accommodation is not the same as anything goes, because …"',
                2: 'Answer in your notes, then compare with a partner.\n\n- Give one difficulty each for a dress practice, a diet practice, and a behaviour practice in Canadian life.\n- What did Multani (2006) decide, and under what conditions?\n- What is the "sincerity of belief" test, and which case created it?\n- State one argument for and one against Quebec\'s Bill 21.\n\n**Exit ticket:** Choose one practice from today (dress, diet, or behaviour). Write one rule in a school or workplace that might conflict with it and one accommodation that would solve the conflict. Complete: "Accommodation is not the same as anything goes, because …"',
                3: 'Answer in your notes, then compare with a partner.\n\n- Give one difficulty each for a dress practice, a diet practice, and a behaviour practice in Canadian life.\n- What did Multani (2006) decide, and under what conditions? (The total kirpan ban violated freedom of religion; allowed sewn in cloth with a wooden sheath under clothing.)\n- What is the "sincerity of belief" test, and which case created it? (A court checks whether a belief is honestly held, not whether a religion requires it — Amselem, 2004.)\n- State one argument for and one against Quebec\'s Bill 21. (For: state neutrality/laïcité. Against: targets minorities and violates freedom of religion.)\n\n**Worked example — Lakeview Secondary reviews three rules.** "No headwear of any kind": conflicts with hijab, turban, kippah; a blanket ban is unlikely to survive and should exempt religious head coverings. "Standard school swimsuit for the swim unit": conflicts with modesty requirements; modest swimwear or alternate scheduling is reasonable. "No blades on school property": conflicts with the kirpan; after Multani a total ban is not a reasonable limit, but conditions are. A kosher-keeping student\'s cafeteria concern: label ingredients, offer sealed kosher or vegetarian options, allow outside food; undue hardship might begin if the school had to build a separate kosher kitchen at high cost — the test is cost and safety, not inconvenience.\n\n**Exit ticket:** Write one rule that might conflict with a practice and one accommodation that would solve the conflict. Look for accommodations that include conditions (like Multani) rather than simple exemptions — that distinction is the lesson\'s core. Complete: "Accommodation is not the same as anything goes, because …"'
              }
            }
          ]
        },

        // ---- Lesson 9: Belief in Popular Culture ----
        {
          title: 'Belief in Popular Culture',
          slides: [
            {
              title: {
                1: 'Big idea: sacred things go mainstream',
                2: 'What happens when sacred things go mainstream?',
                3: 'What happens when sacred things go mainstream? (C3.1, C3.2, C3.3)'
              },
              visual: '🎬',
              body: {
                1: 'Yoga pants. A scarf at the mall. A cartoon shopkeeper. **What happens when sacred things go mainstream?**\n\nQuick poll: who has done yoga? Who knows it comes from a religious tradition? The gap between those two answers is today\'s lesson.\n\nWe will learn to:\n- give three examples of pop culture borrowing from belief traditions\n- explain one good and one bad effect of **appropriation**, using a real case\n- test a TV show or movie for **bias** using three questions',
                2: 'Yoga pants, a scarf at the mall, a cartoon shopkeeper: **what happens when sacred things go mainstream?**\n\nQuick poll: who has done yoga? Who knows it comes from a religious tradition? The gap between the two hands is today\'s lesson. Keep the tone curious, not accusatory.\n\n**Learning goals**\n- Describe ways popular culture uses symbols, ideas, and practices from belief traditions.\n- Explain the effects on faith communities — and on pop culture — when faith symbols are appropriated.\n- Identify, explain, and evaluate bias and prejudice in pop-culture representations of religions.\n\n**Success criteria — I can…**\n- give three examples of pop culture borrowing from belief traditions\n- explain one positive and one negative effect of appropriation using a real case\n- evaluate a media representation for bias using a clear test',
                3: 'Yoga pants, a scarf at the mall, a cartoon shopkeeper: **what happens when sacred things go mainstream?**\n\n**Expectations: C3.1, C3.2, C3.3**\n\nQuick poll: who has done yoga? Who knows it comes from a religious tradition? The gap between the two hands is today\'s lesson. Keep the tone curious, not accusatory — you may enjoy or wear items discussed here; the goal is awareness of what a symbol means to the community it came from.\n\n**Learning goals**\n- Describe ways popular culture uses symbols, ideas, and practices from belief traditions (C3.1).\n- Explain the effects on faith communities — and on pop culture — when faith symbols are appropriated (C3.2).\n- Identify, explain, and evaluate bias and prejudice in pop-culture representations of religions (C3.3).\n\n**Success criteria — I can…**\n- give three examples of pop culture borrowing from belief traditions\n- explain one positive and one negative effect of appropriation using a real case\n- evaluate a media representation for bias using a clear test\n\nThese are the final content expectations of Unit 1 and appear on the unit test as a scenario question. Leave with the **three-part bias test** in memory.\n\n**Think about it:** Distinguish *appropriation* (taking without right, often for profit or fashion) from *appreciation* (learning, participating with permission, giving credit). The line is not always sharp; today\'s cases sit in different places on it.'
              }
            },
            {
              title: {
                1: 'Pop culture borrows from belief',
                2: 'Pop culture borrows from belief',
                3: 'Pop culture borrows from belief (C3.1)'
              },
              visual: '🧘',
              body: {
                1: '| Example | What changed |\n| **Yoga** | For Hindus, yoga is a religious discipline aimed at union with the divine. In the fitness industry it is often just a workout. |\n| **The Beatles and Hinduism** | In 1968 the Beatles studied meditation in India. Millions in the West first heard of mantras through pop music. |\n| **Marriage** | Reality shows show marriage as romance; most traditions see it as a sacred covenant. |\n| **Tobacco** | A sacred medicine in many First Nations; cigarettes made it a product. |',
                2: '| Example | How popular culture uses it |\n| **Yoga** | For Hindus, yoga is a religious discipline of body, breath, and mind aimed at union with the divine. In the fitness industry it is often a workout — mats, leggings, and playlists, with the spiritual purpose removed. |\n| **The Beatles and Hinduism** | In 1968 the Beatles studied meditation with Maharishi Mahesh Yogi in Rishikesh, India. George Harrison\'s later music drew on Hindu devotion. Millions in the West first heard of mantras and meditation through pop music. |\n| **Marriage** | Reality shows and films present marriage as romance and spectacle; most belief traditions understand it as a sacred covenant with duties to family, community, and God. |\n| **Martial arts and tobacco** | Many martial arts grew within Buddhist or Taoist discipline; gyms often teach technique without the spiritual training. Tobacco is a sacred medicine in many First Nations; commercial cigarettes turned it into a product. |\n\n**Key words**\n- **popular culture** — the music, media, fashion, sport, and entertainment shared widely in a society\n- **appropriation** — taking or using another group\'s cultural expressions or traditions without authority or right\n- **commercialization** — turning something into a product to be sold\n- **representation** — how a group is shown in media — and who gets to do the showing\n- **caricature** — an exaggerated portrayal that turns a person or group into a joke',
                3: '| Example | How popular culture uses it |\n| **Yoga** | For Hindus, yoga is a religious discipline of body, breath, and mind aimed at union with the divine. In the fitness industry it is often a workout — mats, leggings, and playlists, with the spiritual purpose removed. |\n| **The Beatles and Hinduism** | In 1968 the Beatles studied meditation with Maharishi Mahesh Yogi in Rishikesh, India. George Harrison\'s later music drew on Hindu devotion. Millions in the West first heard of mantras and meditation through pop music. |\n| **Marriage** | Reality shows and films present marriage as romance and spectacle; most belief traditions understand it as a sacred covenant with duties to family, community, and God. |\n| **Martial arts and tobacco** | Many martial arts grew within Buddhist or Taoist discipline; gyms often teach technique without the spiritual training. Tobacco is a sacred medicine in many First Nations; commercial cigarettes turned it into a product. |\n\n**Facts from the speaker notes:** the Beatles\' stay in Rishikesh was February–April 1968; Harrison\'s "My Sweet Lord" (1970) includes the Hare Krishna mantra.\n\n**Curriculum prompts (C3.1)**\n- How does a Hindu\'s view of yoga as a religious discipline differ from the view of yoga projected by the fitness industry?\n- How did the Beatles influence the perception of Hinduism in Western culture?\n- How does the commercialization of tobacco conflict with the sacred role of tobacco in First Nation traditions?\n- How appropriate is it for martial arts to be taught without spiritual instruction? (Opinions will differ — that is fine.)\n\n**Key words**\n- **popular culture** — the music, media, fashion, sport, and entertainment shared widely in a society\n- **appropriation** — taking or using another group\'s cultural expressions or traditions without authority or right (curriculum glossary)\n- **commercialization** — turning something into a product to be sold\n- **representation** — how a group is shown in media — and who gets to do the showing\n- **caricature** — an exaggerated portrayal that turns a person or group into a joke'
              }
            },
            {
              title: {
                1: 'The case: the sports hijab',
                2: 'Real case: the sports hijab — Nike Pro Hijab (2017)',
                3: 'Real case: the sports hijab — Nike Pro Hijab (2017) (C3.2)'
              },
              visual: '🏃',
              body: {
                1: '**Nike Pro Hijab (2017)**\n\n> In March 2017 Nike announced the Pro Hijab, a light, breathable head covering designed with Muslim athletes, including figure skater Zahra Lari and weightlifter Amna Al Haddad.\n> Many Muslim athletes welcomed it: a major brand treating their practice as normal, and a product that solved a real problem.\n> Others asked harder questions. Smaller Muslim-owned companies had made sports hijabs for years. A global corporation was now profiting from a religious practice. Would the hijab\'s religious meaning be erased?',
                2: '**Nike Pro Hijab (2017)**\n\n> In March 2017 Nike announced the Pro Hijab, a lightweight, breathable head covering designed with input from Muslim athletes including Emirati figure skater Zahra Lari and weightlifter Amna Al Haddad. It went on sale later that year.\n> Many Muslim athletes welcomed it: a major brand treating their practice as normal, and a product that solved a real problem.\n> Others asked harder questions: smaller Muslim-owned companies had made sports hijabs for years; a global corporation was now profiting from a religious practice; and if the garment became mainstream sportswear marketed to everyone as a way to keep hair tidy, would the hijab\'s religious meaning be erased?\n\n**Think about it**\n- List one positive and one negative effect on the Muslim community described here.\n- Is this appropriation, appreciation, or something in between? Defend your label.\n\n**The kuffiyeh as fashion (Urban Outfitters, 2007).** The kuffiyeh is a checked cotton scarf worn for generations by men in Palestine and across the Arab world; in the twentieth century it became a symbol of Palestinian identity. By the 2000s, checked scarves were a mall fashion trend. In January 2007 Urban Outfitters sold one as an "anti-war woven scarf"; after complaints from several directions the company pulled it. The scarf kept appearing in fashion, often with no mention of where it came from.',
                3: '**Nike Pro Hijab (2017)**\n\n> In March 2017 Nike announced the Pro Hijab, a lightweight, breathable head covering designed with input from Muslim athletes including Emirati figure skater Zahra Lari and weightlifter Amna Al Haddad. It went on sale later that year.\n> Many Muslim athletes welcomed it: a major brand treating their practice as normal, and a product that solved a real problem.\n> Others asked harder questions: smaller Muslim-owned companies had made sports hijabs for years; a global corporation was now profiting from a religious practice; and if the garment became mainstream sportswear marketed to everyone as a way to keep hair tidy, would the hijab\'s religious meaning be erased?\n\n**Think about it**\n- List one positive and one negative effect on the Muslim community described here.\n- The curriculum asks: how problematic would it be if sports hijabs were marketed to everyone as ordinary sportswear to contain long hair? What is gained and lost?\n- Is this appropriation, appreciation, or something in between? Defend your label. (There is no single right label; reasoning counts.)\n\n**From the speaker notes:** announcement March 7, 2017; retail release December 2017; athletes consulted included Zahra Lari, Amna Al Haddad, and runner Manal Rostom. The double effect: visibility and normalization for Muslim women in sport vs commercialization and the risk that a symbol of faith becomes a fashion item with its meaning stripped.\n\n**The kuffiyeh as fashion (Urban Outfitters, 2007).** The kuffiyeh (keffiyeh) is a checked cotton scarf worn for generations by men in Palestine and across the Arab world; in the twentieth century it became a symbol of Palestinian identity. By the 2000s, checked scarves in many colours were a fashion trend in North American malls. In January 2007 Urban Outfitters sold one as an "anti-war woven scarf"; after complaints from several directions — some objecting to the political label, others to a cultural symbol being sold as a trend — the company pulled it from stores. The scarf kept appearing in fashion, often with no mention of where it came from. Both cases show the same mechanism: a garment with deep identity meaning becomes a pattern, its origin dropped.'
              }
            },
            {
              title: {
                1: 'The bias test: Apu and Little Mosque',
                2: 'Bias in representation: a three-part test · Two shows',
                3: 'Bias in representation: a three-part test · Two shows (C3.3)'
              },
              visual: '📺',
              body: {
                1: '**Three questions to test for bias**\n- **Who is telling the story?** Members of the tradition, or outsiders?\n- **Is the character a person or a type?**\n- **What is the pattern?** One joke is a joke; the same joke for years teaches an audience what to expect.\n\n| Apu, *The Simpsons* | *Little Mosque on the Prairie* |\n| Written and voiced by non-South Asians | Created by Zarqa Nawaz, a Muslim Canadian writer |\n| A type: exaggerated accent, stereotyped traits | People: jobs, families, inside jokes |\n| Repeated for decades; the actor stepped down in 2020 | Six seasons on CBC |',
                2: '**A three-part test for bias in representation**\n- **Who is telling the story?** Is the tradition represented by its own members, or voiced and written by outsiders?\n- **Is the character a person or a type?** Does the portrayal give the believer a full life, or only the features that mark them as "other" — accent, food, dress, "strange" rules?\n- **What is the pattern?** One joke is a joke; the same joke across years of television teaches an audience what to expect from real people.\n\nWhy a test? It gives you a method you can apply to any show, game, or news story — not just a list of "bad" examples.\n\n| Apu, *The Simpsons* (1990–2020) | *Little Mosque on the Prairie* (CBC, 2007–2012) |\n| Who tells the story: written and voiced by non-South Asians; a white actor voiced Apu for thirty years | Who tells the story: created by Zarqa Nawaz, a Muslim Canadian writer |\n| Person or type: a Hindu convenience-store owner defined by an exaggerated accent and stereotyped traits | Person or type: Muslim characters with jobs, families, arguments, and inside jokes of their own |\n| Pattern: repeated for decades; Hari Kondabolu\'s 2017 documentary *The Problem with Apu* showed the real teasing South Asian kids faced | Pattern: ordinary small-town life; religion is part of the characters, not the punchline |\n| Outcome: in January 2020 the actor stepped down from the role | Outcome: six seasons; widely used as an example of self-representation |',
                3: '**A three-part test for bias in representation**\n- **Who is telling the story?** Is the tradition represented by its own members, or voiced and written by outsiders?\n- **Is the character a person or a type?** Does the portrayal give the believer a full life, or only the features that mark them as "other" — accent, food, dress, "strange" rules?\n- **What is the pattern?** One joke is a joke; the same joke across years of television teaches an audience what to expect from real people.\n\nWhy a test? It gives you a method you can apply to any show, game, or news story — not just a list of "bad" examples.\n\n| Apu, *The Simpsons* (1990–2020) | *Little Mosque on the Prairie* (CBC, 2007–2012) |\n| Who tells the story: written and voiced by non-South Asians; a white actor voiced Apu for thirty years | Who tells the story: created by Zarqa Nawaz, a Muslim Canadian writer |\n| Person or type: a Hindu convenience-store owner defined by an exaggerated accent and stereotyped traits | Person or type: Muslim characters with jobs, families, arguments, and inside jokes of their own |\n| Pattern: repeated for decades; Hari Kondabolu\'s 2017 documentary *The Problem with Apu* showed the real teasing South Asian kids faced | Pattern: ordinary small-town life; religion is part of the characters, not the punchline |\n| Outcome: in January 2020 the actor stepped down from the role | Outcome: six seasons; widely used as an example of self-representation |\n\n**Facts from the speaker notes:** Apu first appeared in 1990; *The Problem with Apu* premiered on truTV in November 2017; Hank Azaria announced in January 2020 he would no longer voice the character. Evaluate — don\'t just label.\n\n**Worked example — the "Sacred Spaces" collection.** A brand sells hoodies printed with Sanskrit mantras, "festival" bindis and henna kits, a cap with a rosary design, and a scarf copied from a First Nations ceremonial blanket, advertised in a nightclub as "celebrating world cultures". Sacred items become products stripped of meaning and sold for profit by outsiders; no credit, permission, or benefit goes to the communities. To make it appreciation: partner with and pay designers from the communities, drop sacred objects (rosary, ceremonial patterns), include the story and meaning in marketing, share profits.\n\n**A principle:** borrowing is acceptable when the community\'s voice leads, the symbol keeps its meaning, and benefit flows back; it is appropriation when outsiders profit and the meaning is stripped.'
              }
            },
            {
              title: { 1: 'Check yourself', 2: 'Check yourself — before the test', 3: 'Check yourself — before the test' },
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- What are the **three questions** in the bias test?\n- Name one good and one bad effect of the Nike Pro Hijab for Muslim communities.\n\n**Exit ticket:** write the three-part bias test from memory.',
                2: 'Answer in your notes, then compare with a partner.\n\n- Give two examples of popular culture using elements of a belief tradition.\n- Name one positive and one negative effect of the Nike Pro Hijab for Muslim communities.\n- What are the three questions in the bias test?\n- Why did critics object to Apu, and what changed in 2020?\n\n**Exit ticket:** Write the three-part bias test from memory. Name one thing from Unit 1 you want reviewed before the test, and one thing you feel confident about.',
                3: 'Answer in your notes, then compare with a partner.\n\n- Give two examples of popular culture using elements of a belief tradition. (Yoga, Beatles/meditation, marriage, martial arts, tobacco.)\n- Name one positive and one negative effect of the Nike Pro Hijab for Muslim communities. (Visibility and a needed product / commercialization and loss of meaning.)\n- What are the three questions in the bias test? (Who tells the story; person or type; what pattern.)\n- Why did critics object to Apu, and what changed in 2020? (An outsider-voiced caricature whose accent and traits fuelled teasing — the actor stepped down.)\n\n**Talk it through**\n- Is doing yoga at a gym disrespectful to Hindus? What would make it appreciation rather than appropriation?\n- Nike profits from a religious garment. A Muslim athlete gets a product she needs. Can both be true? Who should decide if it is acceptable?\n- Pick a show, game, or song you know that includes a religious character or symbol. Run the three-part test. What is the result? (This is the unit test\'s scenario question in miniature.)\n\n**Exit ticket:** Write the three-part bias test from memory. Name one thing from Unit 1 you want reviewed before the test, and one thing you feel confident about. Common requests: the legal cases (Lessons 7–8) and the vocabulary (Lesson 2).'
              }
            }
          ]
        }
      ],

      terms: [
        // Lesson 1
        {
          term: 'belief',
          def: {
            1: 'Accepting something as true, with or without proof.',
            2: 'Accepting something as true or real, with or without proof.',
            3: 'Accepting something as true or real, with or without proof. The starting point for the whole course; compare with "faith" in Lesson 2.'
          }
        },
        {
          term: 'belief tradition',
          def: {
            1: 'Shared beliefs, practices and stories passed down in a community.',
            2: 'A shared set of beliefs, practices, and stories passed down in a community — religious or not.',
            3: 'A shared set of beliefs, practices, and stories passed down in a community — religious or not (e.g. a world religion, or secular humanism).'
          }
        },
        {
          term: 'ritual',
          def: {
            1: 'An act done regularly, often with special meaning.',
            2: 'An act performed regularly by a person or group, often with special meaning.',
            3: 'An act performed regularly by a person or group, often with special meaning (e.g. a minute of silence, daily prayer, the yearly Terry Fox Run).'
          }
        },
        {
          term: 'commemoration',
          def: {
            1: 'Remembering a person or event from the past with a ritual.',
            2: 'A ritualized remembrance of a person or event from the past.',
            3: 'A ritualized remembrance of a person or event from the past (e.g. Remembrance Day, a death anniversary). Curriculum glossary term.'
          }
        },
        {
          term: 'celebration',
          def: {
            1: 'Marking a happy or important moment together.',
            2: 'Marking a happy or important moment with shared activity.',
            3: 'Marking a happy or important moment with shared activity (e.g. a birthday, graduation, wedding). Some events, like a birthday, are both a celebration and a commemoration.'
          }
        },
        {
          term: 'civil observance',
          def: {
            1: 'A public or national ceremony without a religious meaning.',
            2: 'A ceremony performed for public or national reasons, without a specific religious meaning.',
            3: 'A ceremony performed for public or national reasons, without a specific religious meaning (e.g. the oath of citizenship, Remembrance Day). Curriculum glossary term.'
          }
        },
        // Lesson 2
        {
          term: 'faith',
          def: {
            1: 'Deep trust in ideas that cannot be proven.',
            2: 'Absolute trust and confidence in the truth of ideas that cannot be definitively proven.',
            3: 'Absolute trust and confidence in the truth of ideas that cannot be definitively proven. Faith is belief plus trust. Curriculum glossary term.'
          }
        },
        {
          term: 'creed',
          def: {
            1: 'A statement of belief, often recited together.',
            2: 'A statement of faith or religious belief — often a set wording recited by the community.',
            3: 'A statement of faith or religious belief — often a set wording recited by the community. In Ontario law (Lesson 7) "creed" also names a protected ground under the Human Rights Code.'
          }
        },
        {
          term: 'religion',
          def: {
            1: 'Belief in and worship of a supreme being or beings.',
            2: 'The belief in and worship of a supreme being or beings.',
            3: 'The belief in and worship of a supreme being or beings. The 2021 Census asked for a person\'s religion even if they were not currently practising.'
          }
        },
        {
          term: 'sacred',
          def: {
            1: 'Set apart from the ordinary because of a link to the divine.',
            2: 'Anything set apart from the ordinary because of its connection to the divine.',
            3: 'Anything set apart from the ordinary because of its connection to the divine (e.g. an altar). What makes a building sacred is how the community treats it, not the bricks.'
          }
        },
        {
          term: 'profane',
          def: {
            1: 'The ordinary; not about the sacred. Not an insult.',
            2: 'That which is not concerned with the religious or sacred realm — the ordinary.',
            3: 'That which is not concerned with the religious or sacred realm — the ordinary (e.g. a kitchen table). It does not mean rude; it is simply the opposite of sacred.'
          }
        },
        {
          term: 'laity',
          def: {
            1: 'Followers of a tradition who are not clergy.',
            2: 'Adherents of a belief tradition who are not members of the clergy.',
            3: 'Adherents of a belief tradition who are not members of the clergy (the ordinary members, as opposed to persons ordained to perform religious duties).'
          }
        },
        // Lesson 3
        {
          term: 'supernatural',
          def: {
            1: 'Anything outside the laws of nature.',
            2: 'Anything that exists outside the laws of nature.',
            3: 'Anything that exists outside the laws of nature. Secular humanism rejects supernatural explanations; most religious traditions include them. Curriculum glossary term.'
          }
        },
        {
          term: 'divine',
          def: {
            1: 'Having the qualities of God or a god.',
            2: 'Possessing the attributes of God or a god.',
            3: 'Possessing the attributes of God or a god. Traditions picture the divine differently: one God, one ultimate reality in many forms, or no creator God at the centre.'
          }
        },
        {
          term: 'deity',
          def: {
            1: 'A god or goddess; in monotheism, the Creator.',
            2: 'In monotheism, the Creator and supreme being; in polytheism, a god or goddess.',
            3: 'In monotheism, the Creator and supreme being; in polytheism, a god or goddess (e.g. Vishnu, Shiva and Devi in Hinduism reveal aspects of the divine).'
          }
        },
        {
          term: 'theology',
          def: {
            1: 'The careful study of the divine.',
            2: 'The systematic study of the divine.',
            3: 'The systematic study of the divine — how a tradition thinks and reasons about God or the gods.'
          }
        },
        {
          term: 'humanism',
          def: {
            1: 'A philosophy that stresses human dignity and reason, not the supernatural.',
            2: 'A philosophy that usually rejects supernaturalism and stresses human dignity, worth, and reason.',
            3: 'A philosophy that usually rejects supernaturalism and stresses human dignity, worth, and reason (e.g. the Amsterdam Declaration, 2002). Humanists call it a "lifestance".'
          }
        },
        {
          term: 'reason',
          def: {
            1: 'Thinking that reaches conclusions through logic.',
            2: 'A process of thought that reaches conclusions about the universe through logic.',
            3: 'A process of thought that reaches conclusions about the universe through logic. Humanism relies on reason; most religious traditions combine reason with faith and revelation.'
          }
        },
        // Lesson 4
        {
          term: 'affiliation',
          def: {
            1: 'Identifying with a religion, whether or not you practise it.',
            2: 'Identifying with a religion or tradition, whether or not you actively practise it.',
            3: 'Identifying with a religion or tradition, whether or not you actively practise it. This is what the census measures — not attendance, belief strength or practice.'
          }
        },
        {
          term: 'diversity',
          def: {
            1: 'A wide range of human qualities and backgrounds in a group.',
            2: 'The presence of a wide range of human qualities and backgrounds in a group or society.',
            3: 'The presence of a wide range of human qualities and backgrounds in a group or society (e.g. the many belief traditions recorded in the 2021 Census).'
          }
        },
        {
          term: 'multiculturalism',
          def: {
            1: 'Seeing many cultures in one society as a good thing.',
            2: 'Acceptance of cultural pluralism as a positive feature of society; official Canadian policy since 1971, law since 1988.',
            3: 'Acceptance of cultural pluralism as a positive feature of society; official Canadian policy since October 8, 1971 and law (the Canadian Multiculturalism Act) since 1988 — Canada was the first country to do both.'
          }
        },
        {
          term: 'secular humanism',
          def: {
            1: 'Finding meaning through human reason and compassion, not the supernatural.',
            2: 'A belief tradition that finds meaning and ethics through human reason and compassion rather than the supernatural.',
            3: 'A belief tradition that finds meaning and ethics through human reason and compassion rather than the supernatural. The organized tradition within the "no religion and secular perspectives" census group.'
          }
        },
        {
          term: 'research question',
          def: {
            1: 'An open question that guides an investigation.',
            2: 'An open question that guides an investigation and can be answered with evidence.',
            3: 'An open question that guides an investigation and can be answered with evidence — open (not yes/no), focused (one tradition, one practice), answerable (e.g. "How does Diwali express Hindu teachings about light and goodness?").'
          }
        },
        {
          term: 'key concept',
          def: {
            1: 'A big idea a topic depends on; a search word.',
            2: 'A big idea that a topic depends on — the words you would search for.',
            3: 'A big idea that a topic depends on — the words you would search for. Map them in a web around your topic (A1.2).'
          }
        },
        // Lesson 5
        {
          term: 'prejudice',
          def: {
            1: 'Negative opinions about a group, without good reason.',
            2: 'Preconceived attitudes or opinions about a group that denigrate it, without sound reason.',
            3: 'Preconceived attitudes or opinions about a group that denigrate it, without sound reason. The third link in the chain: bias → stereotype → prejudice → discrimination. Curriculum glossary term.'
          }
        },
        {
          term: 'bias',
          def: {
            1: 'A preference that stops you judging fairly.',
            2: 'An opinion or preference that limits one\'s ability to make fair, objective judgments.',
            3: 'An opinion or preference that limits one\'s ability to make fair, objective judgments. Bias sits inside a person — the first link in the chain.'
          }
        },
        {
          term: 'stereotype',
          def: {
            1: 'A false, usually negative idea applied to every member of a group.',
            2: 'A false or generalized, usually negative, idea about a group applied to every member.',
            3: 'A false or generalized, usually negative, idea about a group applied to every member (e.g. memes that treat a classmate\'s religion as a joke). Repeated in jokes, media and politics until it feels like common sense.'
          }
        },
        {
          term: 'discrimination',
          def: {
            1: 'Unfair treatment of people because of their group.',
            2: 'Unfair treatment of individuals or groups based on grounds such as creed, race, or sex.',
            3: 'Unfair treatment of individuals or groups based on grounds such as creed, race, or sex (e.g. Canada\'s refusal of the MS St. Louis in 1939). The Ontario Human Rights Code addresses this last link in the chain.'
          }
        },
        {
          term: 'antisemitism',
          def: {
            1: 'Prejudice or discrimination against Jewish people.',
            2: 'Prejudice, stereotyping, or discrimination directed against Jewish people.',
            3: 'Prejudice, stereotyping, or discrimination directed against Jewish people (e.g. the immigration policy behind the "none is too many" refusal of 1939). Curriculum glossary term.'
          }
        },
        {
          term: 'Islamophobia',
          def: {
            1: 'Prejudice or discrimination against Muslims.',
            2: 'Prejudice, stereotyping, or discrimination directed against Muslims or those perceived as Muslim.',
            3: 'Prejudice, stereotyping, or discrimination directed against Muslims or those perceived as Muslim (e.g. the Quebec City mosque attack of January 29, 2017). Defined here on the pattern of the glossary\'s "antisemitism" entry.'
          }
        },
        // Lesson 6
        {
          term: 'migration',
          def: {
            1: 'Moving from one country or region to another.',
            2: 'Moving from one country or region to another; emigration (leaving) and immigration (arriving).',
            3: 'Moving from one country or region to another; emigration (leaving) and immigration (arriving). Chosen migration carried Sikh, Muslim and Hindu traditions to Ontario after the 1967 immigration reforms.'
          }
        },
        {
          term: 'forced migration',
          def: {
            1: 'Movement people do not choose, like enslavement or fleeing war.',
            2: 'Movement that people do not choose — enslavement, expulsion, fleeing war or persecution.',
            3: 'Movement that people do not choose — enslavement, expulsion, fleeing war or persecution (e.g. millions of Africans transported to the Americas, where Christianity was imposed and African traditions were preserved and blended).'
          }
        },
        {
          term: 'proselytism',
          def: {
            1: 'Actively trying to convert others to your belief.',
            2: 'Actively seeking to convert others to one\'s own belief tradition.',
            3: 'Actively seeking to convert others to one\'s own belief tradition (e.g. missionaries; Buddhism moving along the Silk Road).'
          }
        },
        {
          term: 'colonization',
          def: {
            1: 'One people dominating another politically, economically and culturally.',
            2: 'Political, economic, and cultural domination of one people by another.',
            3: 'Political, economic, and cultural domination of one people by another, often including imposing religion (e.g. the Indian Act\'s potlatch ban, 1885–1951; residential schools). Curriculum glossary term.'
          }
        },
        {
          term: 'conversion',
          def: {
            1: 'Changing from one belief tradition, or none, to another.',
            2: 'Changing from one belief tradition (or none) to another.',
            3: 'Changing from one belief tradition (or none) to another — for marriage, conviction, community, experience, or historically under pressure. Many Canadians also "convert" out of religion.'
          }
        },
        {
          term: 'diaspora',
          def: {
            1: 'A community living outside its homeland, keeping its identity.',
            2: 'A community living outside the homeland of its tradition, keeping its identity.',
            3: 'A community living outside the homeland of its tradition, keeping its identity (e.g. Sikh, Hindu and Muslim diasporas in Ontario). Returns in Unit 4 (Judaism).'
          }
        },
        // Lesson 7
        {
          term: 'protected ground',
          def: {
            1: 'A personal trait the Code says you cannot be discriminated on.',
            2: 'A personal characteristic (such as creed, race, sex, disability) on which discrimination is prohibited.',
            3: 'A personal characteristic (such as creed, race, sex, disability) on which discrimination is prohibited. The Ontario Human Rights Code lists 17 grounds; creed has been one since 1962.'
          }
        },
        {
          term: 'social area',
          def: {
            1: 'A setting the Code covers, like jobs or housing.',
            2: 'A setting the Code covers: employment, housing, services, contracts, and membership in unions or professional associations.',
            3: 'A setting the Code covers: employment, housing, services, contracts, and membership in unions or professional associations. Most creed-based discrimination reported to the OHRC happens at work.'
          }
        },
        {
          term: 'duty to accommodate',
          def: {
            1: 'The duty to adjust rules so no one is disadvantaged by a protected ground.',
            2: 'The obligation to adjust rules or practices so a person is not disadvantaged because of a protected ground.',
            3: 'The obligation to adjust rules or practices so a person is not disadvantaged because of a protected ground (e.g. schedule changes, uniform adjustments, prayer space, alternate duties). Since 1990 it applies to individuals even when a rule is neutral.'
          }
        },
        {
          term: 'undue hardship',
          def: {
            1: 'When accommodation would cost too much or threaten safety.',
            2: 'The point at which accommodation would cost too much, or threaten health and safety; the legal limit of the duty.',
            3: 'The point at which accommodation would cost too much, or threaten health and safety; the legal limit of the duty. Section 11 of the Code names three factors: cost, outside sources of funding, and health and safety.'
          }
        },
        {
          term: 'competing rights',
          def: {
            1: 'When one person\'s rights seem to clash with another\'s.',
            2: 'Situations where one person\'s rights appear to conflict with another\'s; both must be weighed.',
            3: 'Situations where one person\'s rights appear to conflict with another\'s; both must be weighed (e.g. an employee\'s creed vs a customer\'s right to service without discrimination). An accommodation cannot be granted by taking away someone else\'s Code rights.'
          }
        },
        // Lesson 8
        {
          term: 'hijab',
          def: {
            1: 'A head covering many Muslim women wear for modesty and faith.',
            2: 'A head covering worn by many Muslim women as an expression of modesty and faith.',
            3: 'A head covering worn by many Muslim women as an expression of modesty and faith. Named in expectation C2.4; critics say Quebec\'s Bill 21 falls hardest on women who wear it.'
          }
        },
        {
          term: 'kirpan',
          def: {
            1: 'A small ceremonial sword worn by initiated Sikhs.',
            2: 'A small ceremonial sword worn by initiated (Khalsa) Sikhs as one of the Five Ks, a reminder to defend justice.',
            3: 'A small ceremonial sword worn by initiated (Khalsa) Sikhs as one of the Five Ks, a reminder to defend justice. In Multani (2006) the Supreme Court allowed it at school under safety conditions.'
          }
        },
        {
          term: 'succah',
          def: {
            1: 'A temporary hut Jews use during the festival of Sukkot.',
            2: 'A temporary hut in which Jews eat and may sleep during the festival of Sukkot (also spelled sukkah).',
            3: 'A temporary hut in which Jews eat and may sleep during the festival of Sukkot (also spelled sukkah). The balcony succahs in Amselem (2004) led to the "sincerity of belief" test.'
          }
        },
        {
          term: 'halal and kosher',
          def: {
            1: 'Food allowed under Islamic law / Jewish dietary law.',
            2: 'Food permitted under Islamic law (halal) / Jewish dietary law (kosher), including how animals are slaughtered.',
            3: 'Food permitted under Islamic law (halal) / Jewish dietary law (kosher), including how animals are slaughtered. Cafeterias, team meals and school trips are where these practices often meet a difficulty.'
          }
        },
        {
          term: 'sincerity of belief',
          def: {
            1: 'A court asks if you honestly hold a belief, not if it is required.',
            2: 'The legal test: a court asks whether a person honestly holds a belief, not whether a religious authority requires it.',
            3: 'The legal test: a court asks whether a person honestly holds a belief, not whether a religious authority requires it. Established in Amselem (2004) and applied in Multani (2006).'
          }
        },
        {
          term: 'reasonable accommodation',
          def: {
            1: 'Adjusting a rule so a person can follow their practice.',
            2: 'Adjusting a rule so a person can follow their practice, up to the point of undue hardship.',
            3: 'Adjusting a rule so a person can follow their practice, up to the point of undue hardship (e.g. a kirpan worn in a wooden sheath sewn into cloth under clothing). Accommodation means conditions, not "anything goes".'
          }
        },
        // Lesson 9
        {
          term: 'popular culture',
          def: {
            1: 'Music, media, fashion, sport and entertainment shared widely.',
            2: 'The music, media, fashion, sport, and entertainment shared widely in a society.',
            3: 'The music, media, fashion, sport, and entertainment shared widely in a society (e.g. yoga classes, the Beatles, The Simpsons, Nike sportswear).'
          }
        },
        {
          term: 'appropriation',
          def: {
            1: 'Taking another group\'s traditions without the right to.',
            2: 'Taking or using another group\'s cultural expressions or traditions without authority or right.',
            3: 'Taking or using another group\'s cultural expressions or traditions without authority or right (e.g. a kuffiyeh sold as a trend with its origin dropped). Contrast with appreciation: learning, participating with permission, giving credit. Curriculum glossary term.'
          }
        },
        {
          term: 'commercialization',
          def: {
            1: 'Turning something into a product to sell.',
            2: 'Turning something into a product to be sold.',
            3: 'Turning something, including a sacred practice or symbol, into a product to be sold (e.g. commercial cigarettes made from a sacred First Nations medicine; a global brand selling a sports hijab).'
          }
        },
        {
          term: 'representation',
          def: {
            1: 'How a group is shown in media, and who shows it.',
            2: 'How a group is shown in media — and who gets to do the showing.',
            3: 'How a group is shown in media — and who gets to do the showing. Little Mosque on the Prairie, created by Zarqa Nawaz, is widely used as an example of self-representation.'
          }
        },
        {
          term: 'caricature',
          def: {
            1: 'An exaggerated portrayal that makes a group a joke.',
            2: 'An exaggerated portrayal that turns a person or group into a joke.',
            3: 'An exaggerated portrayal that turns a person or group into a joke (e.g. Apu on The Simpsons — an outsider-voiced character defined by an exaggerated accent and stereotyped traits).'
          }
        }
      ],

      questions: [
        // Lesson 1
        {
          type: 'mc',
          cat: 'L1 Why Do People Believe?',
          prompt: 'Which of the following is NOT one of the four common human needs that belief traditions respond to?',
          answer: 'wealth and property',
          options: {
            1: ['wealth and property', 'community and identity'],
            2: ['community and identity', 'a moral code', 'wealth and property'],
            3: ['community and identity', 'a moral code', 'wealth and property', 'ritual']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Why Do People Believe?',
          prompt: 'A ritualized remembrance of a person or event from the past is called a…',
          answer: 'commemoration',
          options: {
            1: ['commemoration', 'pizza party'],
            2: ['celebration', 'commemoration', 'custom'],
            3: ['celebration', 'commemoration', 'custom', 'creed']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Why Do People Believe?',
          prompt: 'Why did Terry Fox begin running across Canada in 1980?',
          answer: 'to raise money for cancer research',
          options: {
            1: ['to raise money for cancer research', 'to win a gold medal'],
            2: ['to raise money for cancer research', 'to set a world running record', 'to protest a new law'],
            3: ['to raise money for cancer research', 'to set a world running record', 'to protest a new law', 'to open a new highway']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Why Do People Believe?',
          prompt: 'A school holds a yearly assembly with a minute of silence to remember the people who built the school. This event is best described as a…',
          answer: 'commemoration',
          options: {
            1: ['commemoration', 'birthday party'],
            2: ['commemoration', 'celebration', 'habit'],
            3: ['commemoration', 'celebration', 'habit', 'pilgrimage']
          }
        },
        {
          type: 'tf',
          cat: 'L1 Why Do People Believe?',
          prompt: 'A civil observance is a ceremony performed for public or national reasons, without a specific religious meaning.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L1 Why Do People Believe?',
          prompt: 'A civil observance is a ceremony that must include prayers from at least one religion.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L1 Why Do People Believe?',
          prompt: 'The first Terry Fox Run was held in September 1981, the year Terry Fox died.',
          answer: true
        },
        {
          type: 'fill',
          cat: 'L1 Why Do People Believe?',
          prompt: 'Canadians mark Remembrance Day each year on November ___.',
          answer: '11',
          bank: ['11', '1', '25', '21']
        },
        {
          type: 'fill',
          cat: 'L1 Why Do People Believe?',
          prompt: 'Cancer forced Terry Fox to stop his run near ___, Ontario, in September 1980.',
          answer: 'Thunder Bay',
          bank: ['Thunder Bay', 'Ottawa', 'Toronto', 'Sudbury']
        },
        {
          type: 'match',
          cat: 'L1 Why Do People Believe?',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['civil observance', 'a ceremony performed for public or national reasons without a specific religious meaning'],
            ['commemoration', 'a ritualized remembrance of a person or event from the past'],
            ['celebration', 'marking a happy or important moment with shared activity'],
            ['ritual', 'an act performed regularly by a person or group, often with special meaning'],
            ['belief', 'accepting something as true or real, with or without proof'],
            ['belief tradition', 'a shared set of beliefs, practices and stories passed down in a community']
          ]
        },
        {
          type: 'match',
          cat: 'L1 Why Do People Believe?',
          prompt: 'Match each civil observance to the religious form it resembles.',
          pairs: [
            ['oath of citizenship', 'a vow or creed'],
            ['singing "O Canada" each morning', 'a daily prayer'],
            ['Remembrance Day ceremony', 'a memorial service'],
            ['naming a school after a person', 'keeping someone present after death']
          ]
        },
        // Lesson 2
        {
          type: 'mc',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'The belief that there is no separation between God and the universe is…',
          answer: 'pantheism',
          options: {
            1: ['pantheism', 'pilgrimage'],
            2: ['monotheism', 'polytheism', 'pantheism'],
            3: ['monotheism', 'polytheism', 'pantheism', 'atheism']
          }
        },
        {
          type: 'mc',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'Adherents of a tradition who are not members of the clergy are called the…',
          answer: 'laity',
          options: {
            1: ['laity', 'bakery'],
            2: ['laity', 'denomination', 'orthodoxy'],
            3: ['laity', 'denomination', 'orthodoxy', 'sect']
          }
        },
        {
          type: 'mc',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'A solemn act or ceremony with religious significance, such as a baptism, is called a…',
          answer: 'rite',
          options: {
            1: ['rite', 'recipe'],
            2: ['rite', 'habit', 'creed'],
            3: ['rite', 'habit', 'creed', 'custom']
          }
        },
        {
          type: 'mc',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'In the study of religion, the word "profane" means…',
          answer: 'the ordinary, not connected to the sacred',
          options: {
            1: ['the ordinary, not connected to the sacred', 'a very loud noise'],
            2: ['the ordinary, not connected to the sacred', 'rude or offensive language', 'a holy object'],
            3: ['the ordinary, not connected to the sacred', 'rude or offensive language', 'a holy object', 'a solemn ceremony']
          }
        },
        {
          type: 'tf',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'A custom belongs to a community, while a habit is a personal routine.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'A habit belongs to a community, while a custom is a personal routine.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'The 2021 Census asked about a person\'s religion even if the person was not currently practising it.',
          answer: true
        },
        {
          type: 'fill',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'Belief in only one God or supreme being is called ___.',
          answer: 'monotheism',
          bank: ['monotheism', 'polytheism', 'animism', 'asceticism']
        },
        {
          type: 'fill',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'Persons ordained to perform religious duties are the ___.',
          answer: 'clergy',
          bank: ['clergy', 'laity', 'adherents', 'reformers']
        },
        {
          type: 'match',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['faith', 'absolute trust and confidence in the truth of ideas that cannot be definitively proven'],
            ['pilgrimage', 'a sacred journey to a place for religious or spiritual purposes'],
            ['creed', 'a statement of faith, often recited by the community'],
            ['sacred', 'set apart from the ordinary because of its connection to the divine'],
            ['profane', 'the ordinary; not concerned with the sacred realm'],
            ['laity', 'adherents who are not members of the clergy'],
            ['rite', 'a solemn ceremony with religious significance'],
            ['atonement', 'making amends for wrongdoing']
          ]
        },
        {
          type: 'match',
          cat: 'L2 The Vocabulary of Belief',
          prompt: 'Match each position to its definition.',
          pairs: [
            ['atheism', 'deities and divine beings do not exist'],
            ['agnosticism', 'the existence or nature of God cannot be known with certainty'],
            ['pantheism', 'there is no separation between God and the universe'],
            ['animism', 'all things, including plants, animals and objects, possess a living soul'],
            ['monotheism', 'belief in only one God or supreme being'],
            ['polytheism', 'belief in more than one God or supreme being']
          ]
        },
        // Lesson 3
        {
          type: 'mc',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'Which tradition does NOT centre on a creator God?',
          answer: 'Buddhism',
          options: {
            1: ['Buddhism', 'Islam'],
            2: ['Islam', 'Sikhism', 'Buddhism'],
            3: ['Islam', 'Sikhism', 'Buddhism', 'Judaism']
          }
        },
        {
          type: 'mc',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'In Hinduism, samsara refers to…',
          answer: 'the cycle of rebirth',
          options: {
            1: ['the cycle of rebirth', 'a type of food'],
            2: ['the Day of Judgment', 'the cycle of rebirth', 'union with God after one life'],
            3: ['the Day of Judgment', 'the cycle of rebirth', 'union with God after one life', 'the Golden Rule']
          }
        },
        {
          type: 'mc',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'In Hinduism, the name for the one ultimate reality honoured through many deities is…',
          answer: 'Brahman',
          options: {
            1: ['Brahman', 'Amsterdam'],
            2: ['Brahman', 'Waheguru', 'nirvana'],
            3: ['Brahman', 'Waheguru', 'nirvana', 'dharma']
          }
        },
        {
          type: 'mc',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'The Amsterdam Declaration (2002) describes humanism as "rational" because it…',
          answer: 'uses science and reason rather than claims to supernatural knowledge',
          options: {
            1: ['uses science and reason rather than claims to supernatural knowledge', 'is written only in Dutch'],
            2: ['uses science and reason rather than claims to supernatural knowledge', 'requires members to attend weekly services', 'follows one sacred text as revelation'],
            3: ['uses science and reason rather than claims to supernatural knowledge', 'requires members to attend weekly services', 'follows one sacred text as revelation', 'rejects democracy and human rights']
          }
        },
        {
          type: 'tf',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'Secular humanism rejects supernatural explanations and relies on reason.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'Christianity teaches that each person lives many lives in a cycle of rebirth.',
          answer: false
        },
        {
          type: 'fill',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'In Hinduism, the goal of release from the cycle of rebirth is called ___.',
          answer: 'moksha',
          bank: ['moksha', 'nirvana', 'karma', 'dharma']
        },
        {
          type: 'fill',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'In Buddhism, the goal that ends suffering is called ___.',
          answer: 'nirvana',
          bank: ['nirvana', 'moksha', 'samsara', 'Brahman']
        },
        {
          type: 'fill',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'The Amsterdam Declaration describing modern humanism was adopted in ___.',
          answer: '2002',
          bank: ['2002', '1952', '2022', '1980']
        },
        {
          type: 'match',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['secular humanism', 'a belief tradition that finds meaning and ethics through reason and compassion rather than the supernatural'],
            ['supernatural', 'anything that exists outside the laws of nature'],
            ['theology', 'the systematic study of the divine'],
            ['deity', 'in monotheism the Creator; in polytheism a god or goddess'],
            ['reason', 'thought that reaches conclusions about the universe through logic'],
            ['divine', 'possessing the attributes of God or a god']
          ]
        },
        {
          type: 'match',
          cat: 'L3 The Supernatural and the Divine',
          prompt: 'Match each tradition to its teaching about what comes after death.',
          pairs: [
            ['Christianity', 'resurrection and eternal life with God'],
            ['Islam', 'a Day of Judgment; paradise or punishment based on faith and deeds'],
            ['Hinduism', 'samsara shaped by karma; the goal is moksha'],
            ['Buddhism', 'rebirth driven by craving; the goal is nirvana'],
            ['Secular humanism', 'death is the natural end; meaning is found in this life'],
            ['Sikhism', 'rebirth until the soul unites with God']
          ]
        },
        // Lesson 4
        {
          type: 'mc',
          cat: 'L4 Who Lives Here?',
          prompt: 'According to the 2021 Census, the share of Canadians reporting "no religion and secular perspectives" was about…',
          answer: '34.6%',
          options: {
            1: ['34.6%', '99%'],
            2: ['16.5%', '25.0%', '34.6%'],
            3: ['16.5%', '25.0%', '34.6%', '53.3%']
          }
        },
        {
          type: 'mc',
          cat: 'L4 Who Lives Here?',
          prompt: 'The census question on religion measures a person\'s…',
          answer: 'religious affiliation',
          options: {
            1: ['religious affiliation', 'favourite food'],
            2: ['attendance at services', 'religious affiliation', 'strength of belief'],
            3: ['attendance at services', 'religious affiliation', 'strength of belief', 'daily practice']
          }
        },
        {
          type: 'mc',
          cat: 'L4 Who Lives Here?',
          prompt: 'According to the 2021 Census, the largest religious affiliation in Canada was…',
          answer: 'Christian',
          options: {
            1: ['Christian', 'Buddhist'],
            2: ['Christian', 'Muslim', 'Hindu'],
            3: ['Christian', 'Muslim', 'Hindu', 'Sikh']
          }
        },
        {
          type: 'mc',
          cat: 'L4 Who Lives Here?',
          prompt: 'Which of these is the best research question for the unit assignment?',
          answer: 'How do Muslim students in Ontario balance Ramadan fasting with school and sports?',
          options: {
            1: ['How do Muslim students in Ontario balance Ramadan fasting with school and sports?', 'Is Ramadan hard?'],
            2: ['How do Muslim students in Ontario balance Ramadan fasting with school and sports?', 'Is Ramadan hard?', 'Is Christmas the best holiday?'],
            3: ['How do Muslim students in Ontario balance Ramadan fasting with school and sports?', 'Is Ramadan hard?', 'Is Christmas the best holiday?', 'Everything about Islam']
          }
        },
        {
          type: 'tf',
          cat: 'L4 Who Lives Here?',
          prompt: 'In 1971 Canada became the first country in the world to adopt multiculturalism as official policy.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L4 Who Lives Here?',
          prompt: 'Statistics Canada noted that being affiliated with a religion does not necessarily mean a person actively practises it.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L4 Who Lives Here?',
          prompt: 'Because 53.3% of Canadians reported a Christian affiliation in 2021, the census shows that 53.3% attend church.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L4 Who Lives Here?',
          prompt: 'In 2001, the share of Canadians reporting no religion was ___.',
          answer: '16.5%',
          bank: ['16.5%', '34.6%', '53.3%', '4.9%']
        },
        {
          type: 'fill',
          cat: 'L4 Who Lives Here?',
          prompt: 'Canada passed the Canadian Multiculturalism Act in ___.',
          answer: '1988',
          bank: ['1988', '1971', '2001', '1962']
        },
        {
          type: 'match',
          cat: 'L4 Who Lives Here?',
          prompt: 'Match each group to its share of Canadians in the 2021 Census.',
          pairs: [
            ['Christian (all denominations)', '53.3%'],
            ['No religion and secular perspectives', '34.6%'],
            ['Muslim', '4.9%'],
            ['Hindu', '2.3%'],
            ['Sikh', '2.1%'],
            ['Buddhist', '1.0%'],
            ['Jewish', '0.9%']
          ]
        },
        {
          type: 'match',
          cat: 'L4 Who Lives Here?',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['affiliation', 'identifying with a tradition, whether or not you practise it'],
            ['multiculturalism', 'acceptance of cultural pluralism as a positive feature of society'],
            ['research question', 'an open question that guides an investigation and can be answered with evidence'],
            ['key concept', 'a big idea a topic depends on — a search word'],
            ['diversity', 'a wide range of human qualities and backgrounds in a society'],
            ['secular humanism', 'meaning and ethics through reason and compassion rather than the supernatural']
          ]
        },
        // Lesson 5
        {
          type: 'mc',
          cat: 'L5 Difference & Prejudice',
          prompt: 'The word "cult" is considered problematic in this course mainly because it…',
          answer: 'is an outsider\'s judgment that labels a minority group as strange',
          options: {
            1: ['is an outsider\'s judgment that labels a minority group as strange', 'is too long to use in essays'],
            2: ['refers only to illegal groups', 'is an outsider\'s judgment that labels a minority group as strange', 'is too long to use in essays'],
            3: ['refers only to illegal groups', 'is an outsider\'s judgment that labels a minority group as strange', 'is too long to use in essays', 'applies only to Christian groups']
          }
        },
        {
          type: 'mc',
          cat: 'L5 Difference & Prejudice',
          prompt: 'Canada\'s refusal of the MS St. Louis in 1939 is best described as an example of…',
          answer: 'discrimination based on religious prejudice',
          options: {
            1: ['discrimination based on religious prejudice', 'a summer holiday cruise'],
            2: ['chosen migration', 'proselytism', 'discrimination based on religious prejudice'],
            3: ['chosen migration', 'proselytism', 'discrimination based on religious prejudice', 'colonialism']
          }
        },
        {
          type: 'mc',
          cat: 'L5 Difference & Prejudice',
          prompt: 'In the four-step chain, which step comes right after a stereotype forms and is repeated?',
          answer: 'prejudice turns into discrimination',
          options: {
            1: ['prejudice turns into discrimination', 'everyone becomes friends'],
            2: ['prejudice turns into discrimination', '"they" are defined only by differences', 'differences are read as threats'],
            3: ['prejudice turns into discrimination', '"they" are defined only by differences', 'differences are read as threats', 'an apology is issued']
          }
        },
        {
          type: 'mc',
          cat: 'L5 Difference & Prejudice',
          prompt: 'Instead of "cult", scholars prefer the term…',
          answer: 'new religious movement',
          options: {
            1: ['new religious movement', 'sports club'],
            2: ['new religious movement', 'denomination', 'civil observance'],
            3: ['new religious movement', 'denomination', 'civil observance', 'orthodoxy']
          }
        },
        {
          type: 'tf',
          cat: 'L5 Difference & Prejudice',
          prompt: 'In 2018 the Canadian government formally apologized for turning away the MS St. Louis in 1939.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L5 Difference & Prejudice',
          prompt: 'The word "idolatry" is a neutral, descriptive term suitable for a classroom.',
          answer: false
        },
        {
          type: 'tf',
          cat: 'L5 Difference & Prejudice',
          prompt: 'The lesson\'s antidote to prejudice is to start from commonalities, then learn differences accurately from the tradition\'s own voice.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L5 Difference & Prejudice',
          prompt: 'Hindus who honour murtis explain that the image itself is the deity.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L5 Difference & Prejudice',
          prompt: 'The MS St. Louis carried more than 900 Jewish refugees fleeing Nazi persecution in the year ___.',
          answer: '1939',
          bank: ['1939', '1918', '1951', '2017']
        },
        {
          type: 'fill',
          cat: 'L5 Difference & Prejudice',
          prompt: 'On January 29, ___, a gunman killed six men during evening prayers at the Islamic Cultural Centre of Quebec City.',
          answer: '2017',
          bank: ['2017', '2018', '1939', '2006']
        },
        {
          type: 'match',
          cat: 'L5 Difference & Prejudice',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['stereotype', 'a false or generalized, usually negative, idea about a group applied to every member'],
            ['prejudice', 'preconceived attitudes about a group that denigrate it, without sound reason'],
            ['bias', 'an opinion or preference that limits fair, objective judgment'],
            ['discrimination', 'unfair treatment of people based on grounds such as creed, race or sex'],
            ['antisemitism', 'prejudice, stereotyping or discrimination directed against Jewish people'],
            ['Islamophobia', 'prejudice, stereotyping or discrimination directed against Muslims']
          ]
        },
        {
          type: 'match',
          cat: 'L5 Difference & Prejudice',
          prompt: 'Match each part of the team group-chat scenario to the step of the chain it shows.',
          pairs: [
            ['asking to skip a Friday practice for prayers', 'difference'],
            ['memes treating her religion as a joke', 'stereotype'],
            ['the attitude that she is "not committed"', 'prejudice'],
            ['suggesting she lose her starting spot', 'discrimination']
          ]
        },
        // Lesson 6
        {
          type: 'mc',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'The Indian Act\'s ban on the potlatch and other Indigenous ceremonies lasted from…',
          answer: '1885 to 1951',
          options: {
            1: ['1885 to 1951', '2004 to 2006'],
            2: ['1885 to 1951', '1962 to 1982', '1971 to 1988'],
            3: ['1885 to 1951', '1962 to 1982', '1971 to 1988', '2004 to 2006']
          }
        },
        {
          type: 'mc',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'Sikh gurdwaras opening in Ontario cities after Canada\'s 1967 immigration reforms is an example of which factor?',
          answer: 'migration',
          options: {
            1: ['migration', 'colonialism'],
            2: ['migration', 'proselytism', 'forced migration'],
            3: ['migration', 'proselytism', 'forced migration', 'colonialism']
          }
        },
        {
          type: 'mc',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'Buddhism moving along the Silk Road through missionaries and traders is an example of…',
          answer: 'proselytism',
          options: {
            1: ['proselytism', 'a potluck dinner'],
            2: ['proselytism', 'colonialism', 'forced migration'],
            3: ['proselytism', 'colonialism', 'forced migration', 'diaspora']
          }
        },
        {
          type: 'mc',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'Mother Teresa explained her work with the poorest and the dying by saying she believed she was…',
          answer: 'serving Christ in each suffering person',
          options: {
            1: ['serving Christ in each suffering person', 'training for a marathon'],
            2: ['serving Christ in each suffering person', 'building hospitals for the government', 'earning the Nobel Peace Prize'],
            3: ['serving Christ in each suffering person', 'building hospitals for the government', 'earning the Nobel Peace Prize', 'converting India to Catholicism']
          }
        },
        {
          type: 'tf',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'Mother Teresa founded the Missionaries of Charity in Kolkata in 1950.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'Canada\'s 1967 immigration reforms opened the door to immigration from beyond Europe.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'Before the 1960s, Canadian public life already assumed a wide range of belief traditions rather than a Christian majority.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'Enslaved Africans in the Americas only had Christianity imposed on them and did not preserve any African traditions.',
          answer: false
        },
        {
          type: 'fill',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'Mother Teresa received the Nobel Peace Prize in ___.',
          answer: '1979',
          bank: ['1979', '1950', '1997', '2016']
        },
        {
          type: 'fill',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'The Canadian Charter of Rights and Freedoms, which guarantees freedom of conscience and religion, dates from ___.',
          answer: '1982',
          bank: ['1982', '1971', '1988', '1967']
        },
        {
          type: 'match',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['proselytism', 'actively seeking to convert others to one\'s belief tradition'],
            ['migration', 'moving from one country or region to another by choice'],
            ['forced migration', 'movement people do not choose — enslavement, expulsion, fleeing persecution'],
            ['colonization', 'political, economic and cultural domination of one people by another'],
            ['conversion', 'changing from one belief tradition (or none) to another'],
            ['diaspora', 'a community living outside the homeland of its tradition, keeping its identity']
          ]
        },
        {
          type: 'match',
          cat: 'L6 How Beliefs Travel and Shape Us',
          prompt: 'Match each example to the factor that spread belief.',
          pairs: [
            ['Sikh gurdwaras in Ontario after 1967', 'migration'],
            ['Christianity imposed on enslaved Africans in the Americas', 'forced migration through enslavement'],
            ['Buddhism carried along the Silk Road', 'proselytism'],
            ['the Indian Act potlatch ban and residential schools', 'colonialism']
          ]
        },
        // Lesson 7
        {
          type: 'mc',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'The Ontario Human Rights Code was significant because it was…',
          answer: 'the first comprehensive human rights law in Canada (1962)',
          options: {
            1: ['the first comprehensive human rights law in Canada (1962)', 'a recipe book'],
            2: ['part of the 1982 Charter', 'the first comprehensive human rights law in Canada (1962)', 'passed in 1988 with the Multiculturalism Act'],
            3: ['part of the 1982 Charter', 'the first comprehensive human rights law in Canada (1962)', 'passed in 1988 with the Multiculturalism Act', 'created by the 2015 creed policy']
          }
        },
        {
          type: 'mc',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'Under the Code, "undue hardship" is defined by…',
          answer: 'cost, outside sources of funding, and health and safety',
          options: {
            1: ['cost, outside sources of funding, and health and safety', 'the weather that day'],
            2: ['cost, outside sources of funding, and health and safety', 'how popular the request is', 'how long the tradition has existed'],
            3: ['cost, outside sources of funding, and health and safety', 'how popular the request is', 'how long the tradition has existed', 'the opinion of the majority of staff']
          }
        },
        {
          type: 'mc',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'Which of these is one of the five social areas covered by the Ontario Human Rights Code?',
          answer: 'employment',
          options: {
            1: ['employment', 'video games'],
            2: ['employment', 'friendship', 'sports results'],
            3: ['employment', 'friendship', 'sports results', 'weather']
          }
        },
        {
          type: 'mc',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'A cashier says his beliefs do not allow him to serve customers who wear another faith\'s religious symbols. Under the Code, this request should…',
          answer: 'not be accommodated, because it discriminates against customers on the ground of creed',
          options: {
            1: ['not be accommodated, because it discriminates against customers on the ground of creed', 'be accommodated with a pay raise'],
            2: ['not be accommodated, because it discriminates against customers on the ground of creed', 'be accommodated, because his belief is sincere', 'be accommodated if the store is not busy'],
            3: ['not be accommodated, because it discriminates against customers on the ground of creed', 'be accommodated, because his belief is sincere', 'be accommodated if the store is not busy', 'be decided by a vote of the other staff']
          }
        },
        {
          type: 'tf',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'In Bhinder v. CN (1985) the Supreme Court of Canada ruled that the Sikh worker could keep his turban instead of wearing a hard hat.',
          answer: false
        },
        {
          type: 'tf',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'Creed has been a protected ground under the Ontario Human Rights Code since the Code began in 1962.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'Under the two-sided test, the law asks whether a belief is sincere, not whether it is true.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'Under the two-sided test, an employee\'s belief must be required by an official religious doctrine before it can be accommodated.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'Ontario\'s Human Rights Code, the first comprehensive human rights law in Canada, was passed in ___.',
          answer: '1962',
          bank: ['1962', '1982', '1988', '2015']
        },
        {
          type: 'fill',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'In ___, the Ontario Human Rights Commission\'s creed policy broadened "creed" to include non-religious belief systems and Indigenous spirituality.',
          answer: '2015',
          bank: ['2015', '1962', '1990', '1985']
        },
        {
          type: 'match',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'Match each legal term to its meaning.',
          pairs: [
            ['creed', 'religion broadly defined, plus other sincerely held belief systems; a protected ground under the Code'],
            ['undue hardship', 'the point at which accommodation would cost too much or threaten health and safety'],
            ['protected ground', 'a personal characteristic on which discrimination is prohibited'],
            ['social area', 'a setting the Code covers, such as employment or housing'],
            ['duty to accommodate', 'the obligation to adjust rules so a person is not disadvantaged by a protected ground'],
            ['competing rights', 'when one person\'s rights appear to conflict with another\'s and both must be weighed']
          ]
        },
        {
          type: 'match',
          cat: 'L7 Creed and the Law in Ontario',
          prompt: 'Match each date to the legal milestone.',
          pairs: [
            ['1962', 'Ontario Human Rights Code — first comprehensive human rights law in Canada'],
            ['1982', 'Canadian Charter of Rights and Freedoms guarantees freedom of conscience and religion'],
            ['1985', 'Bhinder v. CN — Supreme Court rules the hard-hat rule could be enforced'],
            ['1990', 'Supreme Court holds employers must accommodate individuals up to undue hardship'],
            ['2015', 'OHRC creed policy broadens "creed" to non-religious belief systems and Indigenous spirituality']
          ]
        },
        // Lesson 8
        {
          type: 'mc',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'In Multani (2006) the Supreme Court of Canada ruled that the kirpan…',
          answer: 'could be worn at school under safety conditions',
          options: {
            1: ['could be worn at school under safety conditions', 'had to be painted bright orange'],
            2: ['could be banned entirely from schools', 'could be worn at school under safety conditions', 'was not a religious item'],
            3: ['could be banned entirely from schools', 'could be worn at school under safety conditions', 'was not a religious item', 'could only be worn by adults']
          }
        },
        {
          type: 'mc',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'In Syndicat Northcrest v. Amselem (2004), the Supreme Court ruled in favour of…',
          answer: 'Orthodox Jewish residents who built succahs on their condo balconies',
          options: {
            1: ['Orthodox Jewish residents who built succahs on their condo balconies', 'a hockey team that wanted a new arena'],
            2: ['Orthodox Jewish residents who built succahs on their condo balconies', 'a condo board that wanted all balconies kept clear', 'a school board that banned the kirpan'],
            3: ['Orthodox Jewish residents who built succahs on their condo balconies', 'a condo board that wanted all balconies kept clear', 'a school board that banned the kirpan', 'a railway that required hard hats']
          }
        },
        {
          type: 'mc',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'Supporters of Quebec\'s Bill 21 mainly argue that…',
          answer: 'the state should be neutral and visibly secular',
          options: {
            1: ['the state should be neutral and visibly secular', 'everyone should wear a uniform of the same colour'],
            2: ['the state should be neutral and visibly secular', 'religious dress is unsafe in all workplaces', 'teachers should not be allowed to speak French'],
            3: ['the state should be neutral and visibly secular', 'religious dress is unsafe in all workplaces', 'teachers should not be allowed to speak French', 'only Christian symbols should be permitted']
          }
        },
        {
          type: 'mc',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'A school rule says "no headwear of any kind in the building." Which practices does it conflict with?',
          answer: 'hijab, turban and kippah',
          options: {
            1: ['hijab, turban and kippah', 'eating lunch in the cafeteria'],
            2: ['hijab, turban and kippah', 'halal and kosher diets', 'fasting during Ramadan'],
            3: ['hijab, turban and kippah', 'halal and kosher diets', 'fasting during Ramadan', 'smudging ceremonies']
          }
        },
        {
          type: 'tf',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'Quebec\'s Bill 21 bans public employees in positions of authority from wearing religious symbols at work.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'Since 1990 the RCMP has allowed turbans in uniform.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'In Amselem (2004), the Supreme Court said a religious practice is protected only if religious authorities officially require it.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'In Multani (2006) the Supreme Court of Canada agreed with the school board that a total ban on the kirpan was a reasonable limit.',
          answer: false
        },
        {
          type: 'fill',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'In Multani, the Supreme Court allowed the kirpan if it was kept in a ___ sheath, sewn into a cloth, under clothing.',
          answer: 'wooden',
          bank: ['wooden', 'steel', 'plastic', 'glass']
        },
        {
          type: 'fill',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'The Amselem residents built succahs on their balconies for the festival of ___.',
          answer: 'Sukkot',
          bank: ['Sukkot', 'Diwali', 'Ramadan', 'Vaisakhi']
        },
        {
          type: 'match',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['sincerity of belief', 'the legal test asking whether a person honestly holds a belief, not whether religious authorities require it'],
            ['reasonable accommodation', 'adjusting a rule so a person can follow their practice, up to undue hardship'],
            ['kirpan', 'a small ceremonial sword worn by initiated Sikhs as one of the Five Ks'],
            ['succah', 'a temporary hut used by Jews during the festival of Sukkot'],
            ['hijab', 'a head covering worn by many Muslim women as an expression of modesty and faith'],
            ['halal', 'food permitted under Islamic law'],
            ['kosher', 'food permitted under Jewish dietary law']
          ]
        },
        {
          type: 'match',
          cat: 'L8 Dress, Diet & Accommodation',
          prompt: 'Match each case or law to what it decided or did.',
          pairs: [
            ['Multani (2006)', 'a total kirpan ban violated freedom of religion; allowed with safety conditions'],
            ['Amselem (2004)', 'courts check sincerity of belief, not whether a religion requires the practice'],
            ['Bill 21 (2019)', 'bans Quebec public employees in positions of authority from wearing religious symbols'],
            ['RCMP decision (1990)', 'allowed turbans in uniform']
          ]
        },
        // Lesson 9
        {
          type: 'mc',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'One of the three questions in the test for bias in media representation is…',
          answer: 'Who is telling the story?',
          options: {
            1: ['Who is telling the story?', 'How much did it cost to make?'],
            2: ['Who is telling the story?', 'How many people watched?', 'How much did it cost to make?'],
            3: ['Who is telling the story?', 'How many people watched?', 'How much did it cost to make?', 'What genre is it?']
          }
        },
        {
          type: 'mc',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'For Hindus, yoga is best described as…',
          answer: 'a religious discipline of body, breath and mind aimed at union with the divine',
          options: {
            1: ['a religious discipline of body, breath and mind aimed at union with the divine', 'a brand of leggings'],
            2: ['a religious discipline of body, breath and mind aimed at union with the divine', 'a workout invented by the fitness industry', 'a martial art from a Buddhist monastery'],
            3: ['a religious discipline of body, breath and mind aimed at union with the divine', 'a workout invented by the fitness industry', 'a martial art from a Buddhist monastery', 'a style of pop music from the 1960s']
          }
        },
        {
          type: 'mc',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'Little Mosque on the Prairie is used as an example of self-representation because it was…',
          answer: 'created by Zarqa Nawaz, a Muslim Canadian writer',
          options: {
            1: ['created by Zarqa Nawaz, a Muslim Canadian writer', 'filmed entirely underwater'],
            2: ['created by Zarqa Nawaz, a Muslim Canadian writer', 'written and voiced by non-Muslims', 'based on a 2017 documentary'],
            3: ['created by Zarqa Nawaz, a Muslim Canadian writer', 'written and voiced by non-Muslims', 'based on a 2017 documentary', 'cancelled after one season']
          }
        },
        {
          type: 'mc',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'A brand sells hoodies printed with Sanskrit mantras and a cap with a rosary design, with no credit or benefit to the communities. This is best described as…',
          answer: 'appropriation and commercialization',
          options: {
            1: ['appropriation and commercialization', 'a civil observance'],
            2: ['appropriation and commercialization', 'appreciation', 'self-representation'],
            3: ['appropriation and commercialization', 'appreciation', 'self-representation', 'proselytism']
          }
        },
        {
          type: 'tf',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'In 1968 the Beatles studied meditation with Maharishi Mahesh Yogi in Rishikesh, India.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'The Nike Pro Hijab was designed with input from Muslim athletes.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'Every Muslim athlete and commentator agreed that the Nike Pro Hijab was a purely positive development with no drawbacks.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'In many First Nations, tobacco is a sacred medicine; commercial cigarettes turned it into a product.',
          answer: true
        },
        {
          type: 'fill',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'Nike announced the Pro Hijab in March ___.',
          answer: '2017',
          bank: ['2017', '2007', '2020', '1968']
        },
        {
          type: 'fill',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'In January 2007, Urban Outfitters sold a ___ as an "anti-war woven scarf" and then pulled it from stores.',
          answer: 'kuffiyeh',
          bank: ['kuffiyeh', 'hijab', 'kippah', 'turban']
        },
        {
          type: 'match',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['appropriation', 'taking another group\'s cultural expressions or traditions without authority or right'],
            ['commercialization', 'turning something into a product to be sold'],
            ['representation', 'how a group is shown in media — and who gets to do the showing'],
            ['caricature', 'an exaggerated portrayal that turns a person or group into a joke'],
            ['popular culture', 'the music, media, fashion, sport and entertainment shared widely in a society'],
            ['appreciation', 'learning or participating with permission and giving credit']
          ]
        },
        {
          type: 'match',
          cat: 'L9 Belief in Popular Culture',
          prompt: 'Match each bias-test question to what it asks.',
          pairs: [
            ['Who is telling the story?', 'is the tradition represented by its own members or by outsiders?'],
            ['Is the character a person or a type?', 'does the portrayal give the believer a full life, or only "other" features?'],
            ['What is the pattern?', 'is the same joke repeated across years until it teaches what to expect?']
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    /* Unit 2 · Sacred Stories and Writings — 6 lessons */
    {
      id: 'texts',
      title: 'Unit 2 · Sacred Stories and Writings',
      description: {
        1: 'Discover the holy books and spoken teachings of the world\'s traditions, the rules people live by, and the stories behind festivals and art.',
        2: 'Compare sacred writings with oral teachings, tour the world\'s sacred texts, and study three teachings people live by. Then trace how texts shaped their traditions, how the Golden Rule appears across traditions, and how sacred stories became festivals and art.',
        3: 'Compare sacred writings with oral teachings, tour the world\'s sacred texts, and study three teachings people live by. Then trace how texts shaped their traditions, how the Golden Rule appears across traditions, and how sacred stories became festivals and art. Expectations: E1.1, E1.2, E1.3, E1.4, E2.1, E2.2, E2.3, E2.4; Strand A: A3.1, A3.3, A3.5.'
      },

      lessons: [
        // ---- Lesson 1: Written and Spoken: Sacred Writings and Oral Teachings ----
        {
          title: 'Written and Spoken: Sacred Writings and Oral Teachings',
          slides: [
            {
              title: { 1: 'Books and voices', 2: 'Written and spoken', 3: 'Written and spoken: the driving question' },
              visual: '📖',
              body: {
                1: 'Some traditions keep their deepest teachings in books.\n\nOthers keep them in memory, story, and song.\n\n**Our question:** What changes when a teaching is written down? What is kept when it is not?\n\n**We are learning to:**\n- Compare sacred writings and oral teachings.\n- Explain why they matter to communities.\n- Look at one object that is both a record and a teaching.',
                2: 'Some traditions carry their deepest teachings in books. Others carry them in memory, story, and song. **What changes when a teaching is written down — and what is kept when it isn\'t?**\n\n**Learning goals**\n- Compare and contrast sacred writings and oral teachings: how each is made, kept, taught, and trusted.\n- Describe why sacred writings and oral teachings matter to belief traditions.\n- Examine an object that is both a written record and an oral teaching.\n\nThink of the oldest thing you know by heart that nobody ever wrote down for you — a family saying, a recipe, a rule. Now think of the most important document in your life — a birth certificate, a passport, a licence. Today we look at how traditions use both kinds of carriers.',
                3: 'Some traditions carry their deepest teachings in books. Others carry them in memory, story, and song. **What changes when a teaching is written down — and what is kept when it isn\'t?**\n\n**Expectations: E1.1, E1.2**\n\n**Learning goals**\n- Compare and contrast sacred writings and oral teachings: how each is made, kept, taught, and trusted.\n- Describe why sacred writings and oral teachings matter to belief traditions.\n- Examine an object that is both a written record and an oral teaching.\n\n**Success criteria — I can…**\n- name three similarities and three differences between written and oral traditions\n- explain two reasons sacred texts and teachings matter to communities\n- explain why the Hiawatha Belt is called both a writing and an oral teaching\n\n**Think about it:** What is the oldest thing you know by heart that nobody ever wrote down for you? What is the most important document in your life? "Compare" on the unit test means similarities **and** differences.'
              }
            },
            {
              title: {
                1: 'How writing and speech work',
                2: 'Writing and speech: how they work',
                3: 'Writing and speech: how they work (E1.1)'
              },
              visual: '🗣️',
              body: {
                1: '| Sacred writings | Oral teachings |\n| Same words every time, copied carefully | Retold by trained keepers; the core stays, details change |\n| Can travel far and be translated | Travel with people; stay rooted in a place and language |\n| Read, studied, debated | Spoken, sung, danced, acted out |\n| Authority is in the text | Authority is in the teller |\n\n**Both** carry law, history, ethics, and ritual.\n\n**Risk for writings:** the words survive but the living context can be lost.\n\n**Risk for oral teachings:** if the keepers are silenced, the teaching can be lost.',
                2: '| Sacred writings | Oral teachings |\n| Fixed wording: the same words every time, copied carefully | Living wording: retold by trained keepers; the core stays, details adapt to the listeners |\n| Can travel far from the community that made them; can be translated | Travel with people; stay rooted in a place, a language, a relationship |\n| Read privately or aloud; studied, commented on, debated | Spoken, sung, danced, enacted in ceremony; learned by hearing and doing |\n| Authority tied to the text itself and to those trained to interpret it | Authority tied to the teller: Elders, Knowledge Keepers, griots, cantors |\n| Risk: the words survive but the living context can be lost | Risk: if the keepers are silenced, the teaching can be lost — which is what residential schools attempted |\n\n**Both** carry law, history, ethics, and ritual. Most "written" traditions began orally: the Vedas were chanted for centuries before being written; the Qur\'an was recited and memorized before it was compiled; the Gospels were preached before they were written. Oral and written are stages and partners, not opposites.',
                3: '**Expectation E1.1**\n\n| Sacred writings | Oral teachings |\n| Fixed wording: the same words every time, copied carefully | Living wording: retold by trained keepers; the core stays, details adapt to the listeners |\n| Can travel far from the community that made them; can be translated | Travel with people; stay rooted in a place, a language, a relationship |\n| Read privately or aloud; studied, commented on, debated | Spoken, sung, danced, enacted in ceremony; learned by hearing and doing |\n| Authority tied to the text itself and to those trained to interpret it | Authority tied to the teller: Elders, Knowledge Keepers, griots, cantors |\n| Risk: the words survive but the living context can be lost | Risk: if the keepers are silenced, the teaching can be lost — which is what residential schools attempted |\n\n**Both** carry law, history, ethics, and ritual.\n\n**Think about it:** Which is easier to control from outside? Written texts can be banned or burned, but copies survive; oral traditions depend on people, so suppressing a language attacks the teaching itself.\n\n**Oral teachings that became writings:** the Vedas were chanted and memorized by priestly families for centuries before being written (hymns generally dated c. 1500–1200 BCE); the Qur\'an was recited by Muhammad from 610 to 632 CE, memorized by his companions, and compiled after his death ("Qur\'an" means "recitation"); the Gospels were preached for decades before being written, roughly 65–100 CE; the Great Law of Peace was recited for generations and recorded in wampum, with English written versions only in the late 1800s and 1900s. Oral and written are stages and partners, not opposites.'
              }
            },
            {
              title: {
                1: 'The Hiawatha Belt',
                2: 'Real case: the Hiawatha Belt',
                3: 'Real case: the Hiawatha Belt — a record you can read, a teaching you must be told'
              },
              visual: '🪢',
              body: {
                1: '> The Hiawatha Belt is a wampum belt of purple and white shell beads.\n> It is kept by the Haudenosaunee (Iroquois) Confederacy.\n> Its symbols stand for the five founding nations: Mohawk, Oneida, Onondaga, Cayuga, and Seneca.\n> A white line of peace joins them. A tree in the centre stands for Onondaga, where the leaders buried their weapons.\n> The belt records the founding of the Confederacy, before Europeans arrived.\n> But the beads do not explain themselves. A trained speaker must "read" the belt aloud and recite the Great Law of Peace.\n> The design is now the Haudenosaunee flag.',
                2: '> The Hiawatha Belt is a wampum belt of purple and white shell beads kept by the Haudenosaunee (Iroquois) Confederacy. Read from east to west, its symbols stand for the five founding nations — Mohawk, Oneida, Onondaga, Cayuga, and Seneca — joined by a white line of peace, with a tree at the centre for Onondaga, where the Peacemaker uprooted a great white pine and the leaders buried their weapons beneath it.\n> The belt records the founding of the Confederacy, before European contact. But the beads do not explain themselves: a trained speaker must "read" the belt aloud, reciting the Great Law of Peace and the duties of each nation. The design is now the Haudenosaunee flag.',
                3: '> The Hiawatha Belt is a wampum belt of purple and white shell beads kept by the Haudenosaunee (Iroquois) Confederacy. Read from east to west, its symbols stand for the five founding nations — Mohawk, Oneida, Onondaga, Cayuga, and Seneca — joined by a white line of peace, with a tree at the centre for Onondaga, where the Peacemaker uprooted a great white pine and the leaders buried their weapons beneath it.\n> The belt records the founding of the Confederacy, before European contact. But the beads do not explain themselves: a trained speaker must "read" the belt aloud, reciting the Great Law of Peace and the duties of each nation. The design is now the Haudenosaunee flag.\n\n**Think about it**\n- In what ways is the belt a sacred writing? In what ways is it an oral teaching?\n- What would be lost if the belt existed but no one could recite its meaning? What would be lost if the recitation existed but the belt was gone?\n- Why might a community choose to keep its law in beads and speech rather than in a book?\n\n**From the Onondaga Nation:** the five symbols are read following the sun from the east — Mohawk (Eastern Doorkeeper), Oneida, Onondaga (Firekeepers, the tree), Cayuga, Seneca (Western Doorkeeper). The belt predates contact and is the basis of the Haudenosaunee flag. Several wampum belts were returned to the Onondaga Nation in 1989 after decades in museums; wampum belts are living objects for Haudenosaunee communities, not museum curiosities.'
              }
            },
            {
              title: {
                1: 'Why do they matter?',
                2: 'Why do they matter? Connecting to the case',
                3: 'Why do they matter? Worked example and connections (E1.2)'
              },
              visual: '👥',
              body: {
                1: 'Sacred writings and oral teachings matter because they give a community:\n\n- **Identity** — a people knows itself through its teachings.\n- **Authority** — when a question comes up, the community asks what the teaching says.\n- **Continuity** — a grandparent and a grandchild hold the same story.\n- **Worship** — teachings are recited, sung, and carried in ceremony.\n- **Ethics** — rules for living come from these sources.\n\nThe Hiawatha Belt is **both**. Its beads record the founding of the Confederacy, like a writing. Its meaning must be recited by a trained speaker, like an oral teaching.',
                2: '**Why sacred writings and oral teachings matter**\n- **Identity:** "the people of the book", "the people of the longhouse" — a community knows itself through its teachings.\n- **Authority:** when a question arises, the community asks "what does the Torah say?", "what did the Buddha teach?", "what did the Peacemaker instruct?"\n- **Continuity:** teachings bind generations; a grandparent and a grandchild hold the same words or the same story.\n- **Worship and ritual:** texts and teachings are recited, sung, carried in procession, placed at the centre of the room.\n- **Ethics:** the Golden Rule, the Eightfold Path, and the Seven Grandfather Teachings come from these sources.\n\n**Connect to Unit 1:** the four human needs — community, moral code, meaning, ritual — are all met through a tradition\'s sacred writings and oral teachings.\n\n**Worked example — the Hiawatha Belt:** its beads record the founding of the Confederacy in a fixed design (a written record), but the meaning must be recited by a trained speaker who delivers the Great Law of Peace (an oral teaching). That is why it is described as both.',
                3: '**Expectation E1.2 — why sacred writings and oral teachings matter**\n- **Identity:** "the people of the book", "the people of the longhouse" — a community knows itself through its teachings.\n- **Authority:** when a question arises, the community asks "what does the Torah say?", "what did the Buddha teach?", "what did the Peacemaker instruct?"\n- **Continuity:** teachings bind generations; a grandparent and a grandchild hold the same words or the same story.\n- **Worship and ritual:** texts and teachings are recited, sung, carried in procession, placed at the centre of the room (Unit 4).\n- **Ethics:** the Golden Rule, the Eightfold Path, the Seven Grandfather Teachings (Lessons 3 and 5) come from these sources.\n\n**Connect to Unit 1:** the four human needs — community, moral code, meaning, ritual — are all met through a tradition\'s sacred writings and oral teachings.\n\n**Worked example — the Hiawatha Belt:** its beads record the founding of the Confederacy in a fixed design (a written record), but the meaning must be recited by a trained speaker who delivers the Great Law of Peace (an oral teaching). Law kept in beads and speech requires relationship — you cannot learn it alone from a shelf — and it keeps authority with the nations rather than with whoever owns the paper.\n\n**Worked example — the museum scenario:** for the community, a wampum belt is a sacred writing **and** an oral teaching: a record whose meaning lives only when recited and used at council. For a museum it is an object — an artefact to preserve and display, with its oral meaning absent.\n\n**Think about it:** Residential schools forbade Indigenous languages. Using today\'s ideas, why did that attack oral teachings directly?'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: '- Give one similarity and one difference between sacred writings and oral teachings.\n- Why is the Hiawatha Belt both a writing and an oral teaching?\n\nTry this: "If I could keep only the book or only the teller, I would keep … because …"',
                2: '- Give two similarities and two differences between sacred writings and oral teachings.\n- Name one tradition whose scripture began as oral recitation, and explain.\n- Why is the Hiawatha Belt both a writing and an oral teaching?\n- Give two reasons sacred teachings matter to a community.\n\n**Exit ticket:** Write one sacred teaching (written or oral) from any tradition and say how it is passed on. Then complete: "If I could keep only the book or only the teller, I would keep … because …"',
                3: '- Give two similarities and two differences between sacred writings and oral teachings.\n- Name one tradition whose scripture began as oral recitation, and explain.\n- Why is the Hiawatha Belt both a writing and an oral teaching? (Look for both halves: symbols that record, and a required recitation.)\n- Give two reasons sacred teachings matter to a community.\n\n**Talk it through**\n- A story told by your grandmother and a story printed in a book: which do you trust more, and why? Does your answer change if the story is sacred?\n- Many Muslims memorize the entire Qur\'an; many Jews chant the Torah from a handwritten scroll. What does carrying a text in your voice or hands add that reading it silently does not?\n\n**Think deeper:** "Writing a sacred teaching down protects it; keeping it oral keeps it alive." Writing protects wording and lets a text travel, but the Vedas show that memorization also protected a text for centuries, and residential schools show that oral teachings are vulnerable when keepers are silenced. Which risk is greater — losing the words or losing the living context?'
              }
            }
          ]
        },

        // ---- Lesson 2: The World's Sacred Texts ----
        {
          title: 'The World\'s Sacred Texts',
          slides: [
            {
              title: {
                1: 'A tour of sacred texts',
                2: 'The World\'s Sacred Texts',
                3: 'The World\'s Sacred Texts: the driving question'
              },
              visual: '🗺️',
              body: {
                1: 'Hymns, epics, law codes, letters, and stories told by a river. Today we tour what the world\'s traditions hold sacred.\n\n**We are learning to:**\n- Describe sacred texts from many traditions.\n- Tell the Rig Veda apart from the Mahabharata.\n- See how Jewish and Christian scriptures overlap and differ.\n- Ask four questions about any source.\n\nA common mix-up: the Qur\'an is **not** "the Muslim Bible", and the Bhagavad Gita is part of a much larger epic.',
                2: 'Hymns, epics, law codes, letters, stories told by a river: a tour of what the world\'s traditions hold sacred.\n\n**Learning goals**\n- Describe sacred writings and oral teachings from a range of traditions, with specific examples.\n- Explain the difference between the Rig Veda and the Mahabharata, and between the primary scriptures of Judaism and Christianity.\n- Begin assessing sources: what is it, who produced it, for whom, and whose voice is present or absent?\n\nToday fills in the gaps and corrects common mix-ups: the Qur\'an is not "the Muslim Bible"; the Bhagavad Gita is part of a much larger epic.',
                3: 'Hymns, epics, law codes, letters, stories told by a river: a tour of what the world\'s traditions hold sacred.\n\n**Expectations: E1.3, A3.1**\n\n**Learning goals**\n- Describe sacred writings and oral teachings from a range of traditions, with specific examples.\n- Explain the difference between the Rig Veda and the Mahabharata, and between the primary scriptures of Judaism and Christianity.\n- Begin assessing sources: what is it, who produced it, for whom, and whose voice is present or absent?\n\n**Success criteria — I can…**\n- describe at least four sacred texts: tradition, type, and content\n- explain one difference between the Rig Veda and the Mahabharata\n- explain how Christian and Jewish scriptures overlap and differ\n- ask the four source-assessment questions about a text\n\nToday corrects common mix-ups: the Qur\'an is not "the Muslim Bible"; the Bhagavad Gita is part of a much larger epic. Criterion 4 is A3.1 and feeds the unit assignment — keep the four source questions in view for the rest of the unit. This is a survey lesson with many names; the test asks you to describe three or four texts, not ten.'
              }
            },
            {
              title: {
                1: 'Hindu, Jewish, and Christian texts',
                2: 'Hymns and epics; overlapping scriptures',
                3: 'Hinduism: hymns and epics • Judaism and Christianity: overlapping scriptures'
              },
              visual: '📚',
              body: {
                1: '**Hinduism**\n- **Rig Veda:** hymns sung at fire rituals, about 1500–1200 BCE. Believed to be revealed ("heard").\n- **Mahabharata:** a huge story (epic) about a war between two branches of a royal family. Composed by humans ("remembered"). It contains the **Bhagavad Gita**, where the god Krishna teaches the warrior Arjuna.\n\n**Judaism**\n- **Tanakh:** the Hebrew Bible — Torah, Prophets, Writings.\n- **Mishnah:** oral law written down about 200 CE.\n\n**Christianity**\n- **Old Testament:** the Tanakh, in a different order.\n- **New Testament:** 27 books — four Gospels, Acts, letters, Revelation.\n\nBoth share the Hebrew Bible. Christianity adds the New Testament.',
                2: '**Hinduism: hymns and epics**\n| Rig Veda | Mahabharata and Bhagavad Gita |\n| Oldest of the four Vedas: about 1,028 hymns in ten books, generally dated c. 1500–1200 BCE | Vast epic (roughly 100,000 verses) about a war between two branches of a royal family |\n| Hymns to deities (Agni, Indra, Varuna…) sung at fire rituals | Smriti — "what is remembered", composed by humans over centuries |\n| Shruti — "what is heard", believed revealed to ancient sages | Contains the Bhagavad Gita: about 700 verses in which the god Krishna teaches the warrior Arjuna about duty, devotion, and the self |\n| Preserved by exact oral chanting for centuries; the sound is sacred | The Ramayana, the other great epic, tells of Rama, Sita, and Ravana |\n\n**Judaism and Christianity: overlapping scriptures**\n| Judaism | Christianity |\n| Tanakh: Torah (five books), Prophets, Writings — written in Hebrew (some Aramaic) | Old Testament: the Tanakh (in a different order; Catholic and Orthodox Bibles include extra books) |\n| Torah scrolls are handwritten and read in the synagogue on a yearly cycle | New Testament: 27 books in Greek — four Gospels, Acts, letters (many by Paul), Revelation |\n| Mishnah (c. 200 CE): oral law written down; with later commentary it forms the Talmud | The Gospels tell the life, death, and resurrection of Jesus; the letters guide early churches |\n| Authority: Torah first, interpreted through rabbinic tradition | Authority: both Testaments, read in light of Jesus; interpretation varies by denomination |',
                3: '**Expectation E1.3**\n\n**Hinduism: hymns and epics**\n| Rig Veda | Mahabharata and Bhagavad Gita |\n| Oldest of the four Vedas: about 1,028 hymns in ten books, generally dated c. 1500–1200 BCE | Vast epic (roughly 100,000 verses) about a war between two branches of a royal family |\n| Hymns to deities (Agni, Indra, Varuna…) sung at fire rituals | Smriti — "what is remembered", composed by humans over centuries |\n| Shruti — "what is heard", believed revealed to ancient sages | Contains the Bhagavad Gita: about 700 verses in which the god Krishna teaches the warrior Arjuna about duty, devotion, and the self |\n| Preserved by exact oral chanting for centuries; the sound is sacred | The Ramayana, the other great epic, tells of Rama, Sita, and Ravana |\n\nKey difference: hymn collection vs narrative epic; revealed (shruti) vs remembered (smriti); ritual use vs story and teaching. Both are sacred, with different kinds of authority. Many Hindus know the Gita best; it is often the text given to a student first.\n\n**Judaism and Christianity: overlapping scriptures**\n| Judaism | Christianity |\n| Tanakh: Torah (five books), Prophets, Writings — written in Hebrew (some Aramaic) | Old Testament: the Tanakh (in a different order; Catholic and Orthodox Bibles include extra books) |\n| Torah scrolls are handwritten and read in the synagogue on a yearly cycle | New Testament: 27 books in Greek — four Gospels, Acts, letters (many by Paul), Revelation |\n| Mishnah (c. 200 CE): oral law written down; with later commentary it forms the Talmud | The Gospels tell the life, death, and resurrection of Jesus; the letters guide early churches |\n| Authority: Torah first, interpreted through rabbinic tradition | Authority: both Testaments, read in light of Jesus; interpretation varies by denomination |\n\n**Courtesy point:** "Old Testament" is a Christian name; in a Jewish context say Tanakh or Hebrew Bible.'
              }
            },
            {
              title: {
                1: 'More sacred writings',
                2: 'More sacred writings and oral teachings',
                3: 'More sacred writings • Oral teachings as sacred text'
              },
              visual: '🌍',
              body: {
                1: '| Text | Tradition | What it is |\n| Qur\'an | Islam | 114 surahs in Arabic, revealed to Muhammad over about 23 years (610–632 CE) |\n| Tripitaka | Buddhism | the "three baskets", written in Pali in the first century BCE |\n| Jatakas | Buddhism | stories of the Buddha\'s past lives about generosity and compassion |\n| Kojiki | Shinto | Japan\'s oldest chronicle (712 CE) |\n| Guru Granth Sahib | Sikhism | hymns of the Gurus, finalized in 1708 |\n| Great Law of Peace | Haudenosaunee | oral constitution recorded in wampum |\n\nOral teachings have rules. Some stories are told only in winter, or only by certain people.',
                2: '| Text | Tradition | Description |\n| Qur\'an | Islam | 114 surahs in Arabic, believed to be the word of God revealed to Muhammad over about 23 years (610–632 CE). Memorized, recited, never "translated" in the strict sense — translations are called interpretations. |\n| Tripitaka and the Jatakas | Buddhism | The "three baskets" — monastic rules, the Buddha\'s discourses, and philosophy — written down in Pali in Sri Lanka in the first century BCE. The Jatakas are hundreds of stories of the Buddha\'s previous lives, teaching generosity and compassion. |\n| Kojiki | Shinto | Japan\'s oldest surviving chronicle (712 CE): creation myths, kami (spirits), and the origins of the imperial line. |\n| Guru Granth Sahib | Sikhism | Hymns of the Sikh Gurus and other saints, compiled from 1604 and finalized in 1708, when Guru Gobind Singh declared it the eternal, living Guru. |\n\n**Oral teachings as sacred text**\n- The Great Law of Peace (Haudenosaunee): the constitution of the Confederacy, recited and recorded in wampum.\n- Seven Grandfather Teachings (Anishinaabe): wisdom, love, respect, bravery, honesty, humility, truth — taught through story and ceremony.\n- Creation stories: Sky Woman falling to Turtle Island, each with its own tellers and protocols.\n- Oral teachings have rules: some stories are told only in winter, only by certain people, only with permission. Writing them down is useful and also risky: a story recorded without its teller loses its protocols.',
                3: '| Text | Tradition | Description |\n| Qur\'an | Islam | 114 surahs in Arabic, believed to be the word of God revealed to Muhammad over about 23 years (610–632 CE). Memorized, recited, never "translated" in the strict sense — translations are called interpretations. |\n| Tripitaka and the Jatakas | Buddhism | The "three baskets" — monastic rules, the Buddha\'s discourses, and philosophy — written down in Pali in Sri Lanka in the first century BCE. The Jatakas are hundreds of stories of the Buddha\'s previous lives, teaching generosity and compassion. |\n| Kojiki | Shinto | Japan\'s oldest surviving chronicle (712 CE): creation myths, kami (spirits), and the origins of the imperial line; the foundation of Shinto\'s sacred stories. |\n| Guru Granth Sahib | Sikhism | Hymns of the Sikh Gurus and other saints, compiled from 1604 and finalized in 1708, when Guru Gobind Singh declared it the eternal, living Guru. It is treated as a person in the gurdwara (Unit 4). |\n\n**Oral teachings as sacred text**\n- The Great Law of Peace (Haudenosaunee): the constitution of the Confederacy, recited and recorded in wampum (Lesson 1).\n- Seven Grandfather Teachings (Anishinaabe): wisdom, love, respect, bravery, honesty, humility, truth — taught through story and ceremony (Lesson 3).\n- Creation stories: Sky Woman falling to Turtle Island (Haudenosaunee and other nations), each with its own tellers and protocols.\n- Oral teachings have rules: some stories are told only in winter, only by certain people, only with permission. Writing them down (in books, websites, this course) is useful and also risky: a story recorded without its teller loses its protocols.\n\n**Source question (A3.1):** when you read an Indigenous story in a textbook, ask: whose voice is this — the community\'s, or an outsider\'s retelling? The curriculum\'s own prompts: "Whose voices are represented and whose are absent?" and "Whose interests are advanced if you believe the main message of this source?" These slides are themselves a secondary source written for a classroom; seek community-authored sources (nation websites, Elders\' recorded teachings) in the assignment.'
              }
            },
            {
              title: {
                1: 'Reading the same words differently',
                2: 'Real case: reading the same words differently',
                3: 'Real case: Isaiah in a synagogue and a church'
              },
              visual: '🕯️',
              body: {
                1: '> The book of Isaiah is in both the Tanakh and the Christian Old Testament.\n> In a synagogue, parts of Isaiah are read after the Torah reading. People hear them as a message to Israel: comfort, justice, and hope.\n> In a church, some of the same parts are read in Advent. People hear them as prophecies of Jesus.\n> The words are the same. The communities, the calendar, and the meaning are different.\n> Neither community is "misreading". Each reads within its own canon and tradition.',
                2: '> The book of Isaiah is in both the Tanakh and the Christian Old Testament. In a synagogue, passages from Isaiah are read as the Haftarah after the Torah reading and heard as prophecy to Israel: comfort in exile, a call to justice, hope for the future. In a church, some of the same passages are read in Advent and heard as prophecies of Jesus.\n> The words are identical; the communities, the calendar, the language of reading (Hebrew or English), and the meaning drawn from them differ. Neither community is "misreading"; each reads within its canon and tradition.',
                3: '> The book of Isaiah is in both the Tanakh and the Christian Old Testament. In a synagogue, passages from Isaiah are read as the Haftarah after the Torah reading and heard as prophecy to Israel: comfort in exile, a call to justice, hope for the future. In a church, some of the same passages are read in Advent and heard as prophecies of Jesus.\n> The words are identical; the communities, the calendar, the language of reading (Hebrew or English), and the meaning drawn from them differ. Neither community is "misreading"; each reads within its canon and tradition.\n\n**Think about it**\n- How does the surrounding canon (what else is in the book) change what a passage means?\n- Using the four source questions, assess a modern English Bible as a source for a Jewish reading of Isaiah. Whose voice does the translation carry?\n- What does this case suggest about studying any sacred text in isolation from its community?\n\n**From the notes:** the Haftarah is the prophetic reading that follows the Torah portion on Shabbat; Advent readings commonly include Isaiah 7, 9, 11, and 40. A Christian translation may render key words in ways that reflect Christian readings; a Jewish Publication Society translation will differ. That is "values and bias" and "voice" from A3.1, not dishonesty.'
              }
            },
            {
              title: {
                1: 'Four questions for any source',
                2: 'Assessing sources: the four questions',
                3: 'Worked example: the four source questions (A3.1)'
              },
              visual: '🔍',
              body: {
                1: 'Ask four questions about any source:\n\n- **What is it?** A primary source is the text itself. A secondary source is writing about the text.\n- **Who made it, and why?**\n- **How reliable is it?**\n- **Whose voice is it?** Whose voice is missing?\n\n**Example:** A textbook retells an Indigenous creation story. It is a secondary retelling, made by textbook authors for a classroom. It is likely an outsider\'s voice unless the nation wrote or approved it.',
                2: '**The four source-assessment questions**\n- What is it? (primary: the text itself, an eyewitness, an interview; secondary: writing about the text)\n- Who made it, and why?\n- How reliable is it?\n- Whose voice is present — and whose is absent?\n\n**Worked example — a textbook retelling of an Indigenous creation story:** What is it? A secondary retelling. Who made it and why? Textbook authors, for a classroom. How reliable? It depends on consultation with the nation. Whose voice? Likely an outsider\'s unless the nation authored or approved it.\n\n**Check yourself**\n- Describe the Rig Veda and the Mahabharata and give one difference.\n- What scripture do Judaism and Christianity share, and what does Christianity add?\n- Match the text to the tradition: Qur\'an, Kojiki, Tripitaka, Guru Granth Sahib, Great Law of Peace.\n- List the four questions for assessing a source.',
                3: '**Expectation A3.1 — the four source-assessment questions**\n- What is it? (primary: the text itself, an eyewitness, an interview; secondary: writing about the text — textbooks, articles, reviews). A sacred text in translation is still a primary source; an encyclopedia article about it is secondary.\n- Who made it, and why?\n- How reliable is it?\n- Whose voice is present — and whose is absent?\n\n**Worked example — a school display of "Sacred Texts of Our Community":** a family\'s Qur\'an in Arabic with an English interpretation is primary (with a secondary layer in the English); a Gideon Bible from a hotel is a primary text distributed by a Christian organization for evangelism (note the purpose); a Gita printout from a website with no author named is a primary text with an unknown translator, so reliability is unclear; a photograph of the Hiawatha Belt from the Onondaga Nation website is an image of a primary object in the community\'s voice; a 1912 anthropologist\'s book of "Iroquois legends" is secondary — an outsider\'s retelling. Using **voice** as the test, the Onondaga image and the family\'s Qur\'an rank highest; the 1912 book and the anonymous Gita rank lowest.\n\n**Check yourself**\n- Describe the Rig Veda and the Mahabharata and give one difference.\n- What scripture do Judaism and Christianity share, and what does Christianity add?\n- Match the text to the tradition: Qur\'an, Kojiki, Tripitaka, Guru Granth Sahib, Great Law of Peace.\n- List the four questions for assessing a source.\n\n**Think about it:** Many Muslims say the Qur\'an can only truly be read in Arabic, while most Christians read the Bible in translation. What might each approach protect, and what might it cost?'
              }
            }
          ]
        },

        // ---- Lesson 3: Living by the Words: Three Teachings ----
        {
          title: 'Living by the Words: Three Teachings',
          slides: [
            {
              title: {
                1: 'Three teachings to live by',
                2: 'Living by the Words: Three Teachings',
                3: 'Living by the Words: the driving question'
              },
              visual: '🧭',
              body: {
                1: 'Eight blessings. Eight steps. Seven gifts.\n\nThese are three short teachings that millions of people measure their lives against.\n\n**We are learning to:**\n- Explain the main message of the Beatitudes, the Eightfold Path, and the Seven Grandfather Teachings.\n- Name the values in each one.\n- Think about how life would change if you lived by one of them.\n\nStart by writing down one rule you try to live by.',
                2: 'Eight blessings, eight steps, seven gifts: three short teachings that millions of people measure their lives against.\n\n**Learning goals**\n- Explain the intended message of three passages: the Beatitudes (Christianity), the Eightfold Path (Buddhism), and the Seven Grandfather Teachings (Anishinaabe).\n- Identify the values reflected in each.\n- Consider how a life shaped by one of these teachings would differ from a life without it.\n\nStart by writing down one rule you try to live by — from any source. Today\'s three teachings are rules of life that communities have handed down for centuries; by the end you can compare your own rule to them.',
                3: 'Eight blessings, eight steps, seven gifts: three short teachings that millions of people measure their lives against.\n\n**Expectation: E1.4**\n\n**Learning goals**\n- Explain the intended message of three passages: the Beatitudes (Christianity), the Eightfold Path (Buddhism), and the Seven Grandfather Teachings (Anishinaabe).\n- Identify the values reflected in each.\n- Consider how a life shaped by one of these teachings would differ from a life without it.\n\n**Success criteria — I can…**\n- state the main message of each teaching in one sentence\n- name at least three specific values from each\n- describe one concrete change in daily life a teaching would require\n\nStart by writing down one rule you try to live by — from any source. These three teachings are the curriculum\'s own examples for E1.4. The unit test asks for the message and values of at least two of the three; the curriculum\'s own prompt is "How would your life change if you tried to live by the Seven Grandfather Teachings?"'
              }
            },
            {
              title: {
                1: 'The three teachings',
                2: 'The Beatitudes, the Eightfold Path, the Seven Grandfather Teachings',
                3: 'The three teachings in detail (E1.4)'
              },
              visual: '📜',
              body: {
                1: '**The Beatitudes (Christianity)** — in the Gospel of Matthew, chapter 5. Eight sayings that begin "Blessed are the…": the poor in spirit, those who mourn, the meek, the merciful, the peacemakers, and more. **Message:** God\'s blessing rests on people the world overlooks.\n\n**The Eightfold Path (Buddhism)** — eight steps in three groups: **wisdom** (right view, right intention), **conduct** (right speech, action, livelihood), and **mind** (right effort, mindfulness, concentration). **Message:** suffering ends through practice.\n\n**The Seven Grandfather Teachings (Anishinaabe)** — wisdom, love, respect, bravery, honesty, humility, truth. **Message:** live in balance with creation and each other.',
                2: '**The Beatitudes (Christianity)**\n- Found in the Gospel of Matthew (chapter 5), at the start of the Sermon on the Mount; a shorter version appears in Luke.\n- Eight statements of the form "Blessed are the…": the poor in spirit, those who mourn, the meek, those who hunger for righteousness, the merciful, the pure in heart, the peacemakers, those persecuted for doing right.\n- **Intended message:** God\'s blessing rests on people the world overlooks — the humble, the grieving, the merciful — and the values of God\'s kingdom reverse worldly success.\n- **Values:** humility, compassion, mercy, justice, peacemaking, courage under persecution.\n\n**The Noble Eightfold Path (Buddhism)**\n| Group | Steps | Meaning |\n| Wisdom | right view, right intention | See life as it is (impermanent, marked by dukkha) and intend goodwill and harmlessness. |\n| Conduct | right speech, right action, right livelihood | No lying or harsh speech; no killing, stealing, or sexual misconduct; earn a living that does not harm others. |\n| Mind | right effort, right mindfulness, right concentration | Cultivate good states, stay aware of body and mind, and train attention through meditation. |\n\n**The Seven Grandfather Teachings (Anishinaabe)**\n- **Wisdom** and **Love**: use knowledge for the good of the people; know peace and love unconditionally.\n- **Respect** and **Bravery**: honour all of creation; face challenges with integrity, even when afraid.\n- **Honesty** and **Humility**: be truthful in word and action; know yourself as a sacred part of creation, no greater than others.\n- **Truth**: know and live all the teachings together; truth is understood by living them.',
                3: '**The Beatitudes (Christianity)**\n- Found in the Gospel of Matthew (chapter 5), at the start of the Sermon on the Mount; a shorter version appears in Luke.\n- Eight statements of the form "Blessed are the…": the poor in spirit, those who mourn, the meek, those who hunger for righteousness, the merciful, the pure in heart, the peacemakers, those persecuted for doing right.\n- **Intended message:** God\'s blessing rests on people the world overlooks — the humble, the grieving, the merciful — and the values of God\'s kingdom reverse worldly success.\n- **Values:** humility, compassion, mercy, justice, peacemaking, courage under persecution.\n- **Lived out:** Christians cite the Beatitudes for charity, nonviolence, and care for the poor; Catholic social teaching draws on them directly.\n\n**The Noble Eightfold Path (Buddhism)**\n| Group | Steps | Meaning |\n| Wisdom | right view, right intention | See life as it is (impermanent, marked by dukkha) and intend goodwill and harmlessness. |\n| Conduct | right speech, right action, right livelihood | No lying or harsh speech; no killing, stealing, or sexual misconduct; earn a living that does not harm others. |\n| Mind | right effort, right mindfulness, right concentration | Cultivate good states, stay aware of body and mind, and train attention through meditation. |\n\nThe Path is the fourth of the Four Noble Truths: suffering exists, it has a cause (craving), it can end (nirvana), and the path is the way. It is central to Buddhism because it is the practical method; Buddhism is less about believing than about training. **Values:** non-harm, honesty, mindfulness, moderation (the "middle way").\n\n**The Seven Grandfather Teachings (Anishinaabe)**\n- **Wisdom (Nibwaakaawin)** and **Love (Zaagi\'idiwin)**: use knowledge for the good of the people; know peace and love unconditionally.\n- **Respect (Minaadendamowin)** and **Bravery (Aakode\'ewin)**: honour all of creation; face challenges with integrity, even when afraid.\n- **Honesty (Gwayakwaadiziwin)** and **Humility (Dabaadendiziwin)**: be truthful in word and action; know yourself as a sacred part of creation, no greater than others.\n- **Truth (Debwewin)**: know and live all the teachings together; truth is understood by living them.\n\nThe teachings are often told as gifts given by seven spirit grandfathers to a child who carried them to the people; many Anishinaabe teachers pair each gift with an animal (e.g. the eagle for love, the bear for bravery, the turtle for truth). Spellings vary by community.'
              }
            },
            {
              title: {
                1: 'A teaching on the wall',
                2: 'Real case: a teaching on the wall',
                3: 'Real case: the Seven Grandfather Teachings in Ontario schools'
              },
              visual: '🏫',
              body: {
                1: '> Walk into many Ontario schools and you will see the Seven Grandfather Teachings on a poster or a mural.\n> Often the poster shows their Anishinaabemowin names and animal symbols.\n> School boards adopted them after the Truth and Reconciliation Commission\'s 2015 Calls to Action.\n> Some Anishinaabe educators welcome this.\n> Others warn that a poster can turn a living teaching into decoration, unless students learn where it comes from and who holds it.',
                2: '> Walk into many Ontario public and Catholic schools and you will find the Seven Grandfather Teachings on a poster, a mural, or a classroom wall, often with their Anishinaabemowin names and animal symbols. School boards adopted them after the Truth and Reconciliation Commission\'s 2015 Calls to Action, as a way to teach Indigenous knowledge and character education together.\n> Some Anishinaabe educators welcome this; others caution that a poster can turn a living teaching into decoration unless students learn where it comes from and who holds it.',
                3: '> Walk into many Ontario public and Catholic schools and you will find the Seven Grandfather Teachings on a poster, a mural, or a classroom wall, often with their Anishinaabemowin names and animal symbols. School boards adopted them after the Truth and Reconciliation Commission\'s 2015 Calls to Action, as a way to teach Indigenous knowledge and character education together.\n> Some Anishinaabe educators welcome this; others caution that a poster can turn a living teaching into decoration unless students learn where it comes from and who holds it.\n\n**Think about it**\n- What is gained when a school displays the teachings? What is at risk?\n- Using Lesson 1, explain why learning the teachings from a poster differs from learning them from a Knowledge Keeper.\n- Design one activity that would move the teachings from the wall into students\' conduct.\n\n**From the notes:** the TRC\'s Calls to Action 62–65 concern education. Intended message matters: the teachings are a way of living in relationship, not seven vocabulary words. Activity ideas: a weekly focus on one teaching with student examples; inviting a Knowledge Keeper; connecting each teaching to a school decision. Many Ontario students live on Anishinaabe territory, including Simcoe County and Muskoka.'
              }
            },
            {
              title: { 1: 'Side by side', 2: 'Three teachings side by side', 3: 'Worked example: three teachings side by side' },
              visual: '⚖️',
              body: {
                1: '**What they share**\n- Each is short enough to memorize.\n- Each turns belief into action: how to speak and treat others.\n- Humility and compassion appear in all three.\n\n**How they differ**\n- Beatitudes: blessings from Jesus; the frame is God\'s kingdom.\n- Eightfold Path: a training method; the frame is ending suffering.\n- Seven Grandfather Teachings: gifts for living in balance with creation.\n\n**Example:** If you lived by "right speech" for a week, you would stop gossip and sarcasm in the group chat.',
                2: '**What they share**\n- Each is short enough to memorize and carry.\n- Each turns belief into conduct: how to speak, treat others, handle hardship.\n- Humility and compassion appear in all three.\n- Each is taught orally and in writing, to children and adults.\n- Each describes a way of life, not a one-time act.\n\n**How they differ**\n- Beatitudes: blessings pronounced by Jesus; the frame is God\'s kingdom.\n- Eightfold Path: a training method; the frame is ending suffering, with no creator God required.\n- Seven Grandfather Teachings: gifts for living in balance with creation; the frame is relationship with the land and all beings.\n- Different sources: Gospel text / Buddha\'s discourses / oral tradition and ceremony.\n\n**Worked example — a week of "right speech":** no gossip or sarcasm in the group chat; speak up kindly when someone is excluded. The hardest moment: a joke at someone\'s expense that everyone is laughing at. A sign of success: fewer arguments, someone noticing the change. Right speech belongs to the Path\'s conduct group and aims to reduce the suffering that harsh words cause — it is more than a general "be nice" rule.',
                3: '**What they share**\n- Each is short enough to memorize and carry.\n- Each turns belief into conduct: how to speak, treat others, handle hardship.\n- Humility and compassion appear in all three.\n- Each is taught orally and in writing, to children and adults.\n- Each describes a way of life, not a one-time act.\n\n**How they differ**\n- Beatitudes: blessings pronounced by Jesus; the frame is God\'s kingdom.\n- Eightfold Path: a training method; the frame is ending suffering, with no creator God required.\n- Seven Grandfather Teachings: gifts for living in balance with creation; the frame is relationship with the land and all beings.\n- Different sources: Gospel text / Buddha\'s discourses / oral tradition and ceremony.\n\nPush for precision: "all three value compassion" is a similarity; "the Beatitudes promise God\'s blessing while the Path promises the end of suffering" is a difference. A tradition\'s view of the divine shapes its view of purpose, and that shows here.\n\n**Worked example — a week of "right speech":** no gossip or sarcasm in the group chat; speak up kindly when someone is excluded. Hardest moment: a joke at someone\'s expense that everyone is laughing at. Sign of success: fewer arguments, someone noticing the change. Right speech is part of the Path\'s conduct group, aimed at reducing the suffering harsh words cause and training the mind. Mercy in the Beatitudes means forgiving as one hopes to be forgiven; humility in the Grandfather Teachings means knowing oneself as part of creation, not above others.\n\n**Think about it:** The Beatitudes bless the mourning and the persecuted. The Eightfold Path aims to end suffering. Are these opposite attitudes to suffering, or two sides of one insight? And is a "Live the Teaching" challenge appropriation? Learning a widely published ethical teaching with its source credited and its community\'s voice included is appreciation; appropriation would be stripping the teaching of its source and displaying it as your own.'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: '- What is the main message of the Beatitudes?\n- Name the Seven Grandfather Teachings.\n\nTry this: "If I lived by … for a week, the first thing I would change is …"',
                2: '- State the intended message of the Beatitudes in one sentence and name three values they reflect.\n- Why is the Eightfold Path central to Buddhism? List its three groups.\n- Name the Seven Grandfather Teachings.\n- Give one similarity and one difference between any two of today\'s teachings.\n\n**Exit ticket:** "If I lived by … for a week, the first thing I would change is …"',
                3: '- State the intended message of the Beatitudes in one sentence and name three values they reflect.\n- Why is the Eightfold Path central to Buddhism? List its three groups. (It is the practical method for ending suffering — wisdom, conduct, mind.)\n- Name the Seven Grandfather Teachings.\n- Give one similarity and one difference between any two of today\'s teachings.\n\n**Talk it through**\n- Which of the three teachings would be hardest to live by in a Grade 11 hallway? Which would change the hallway most if everyone followed it?\n- Pick any one teaching. If you tried to live by it for a week, what is the first thing you would have to change?\n\n**Think deeper:** Choose three of the seven Grandfather Teachings and describe one real change each would require in your week. Then compare the Teachings\' overall message (balance within creation, a relational frame) with the Eightfold Path (training the mind to end suffering) or the Beatitudes (blessedness in God\'s kingdom). The usual sticking points are the Path\'s "right livelihood" and the Beatitudes\' "poor in spirit".'
              }
            }
          ]
        },

        // ---- Lesson 4: How Sacred Texts Shaped Their Traditions ----
        {
          title: 'How Sacred Texts Shaped Their Traditions',
          slides: [
            {
              title: {
                1: 'Can a text change a people?',
                2: 'How Sacred Texts Shaped Their Traditions',
                3: 'How Sacred Texts Shaped Their Traditions: the driving question'
              },
              visual: '🕰️',
              body: {
                1: 'Can a book change a people?\n\nToday we look at three teachings that did more than describe a tradition. They shaped how the tradition grew.\n\n- A prophet\'s visions after near-death.\n- A merchant\'s revelations in a cave.\n- A traveller\'s letters to small communities.\n\n**We are learning to:**\n- Describe what was happening when each text appeared.\n- Explain how each text shaped its tradition.\n- Find what the three cases have in common.',
                2: 'A prophet\'s visions after near-death, a merchant\'s revelations in a cave, a traveller\'s letters to small communities: how texts made traditions.\n\n**Learning goals**\n- Explain the influence of sacred writings and oral teachings on the origin and development of traditions.\n- Describe the circumstances that produced the Code of Handsome Lake, the Qur\'an, and the letters of Paul, and how each shaped its tradition.\n- Find common themes across the three cases.\n\nCan a book change a people? Constitutions and declarations suggest yes. Today\'s cases show teachings that did not just describe a tradition but shaped how it grew — and the circumstances that produced them.',
                3: 'A prophet\'s visions after near-death, a merchant\'s revelations in a cave, a traveller\'s letters to small communities: how texts made traditions.\n\n**Expectations: E2.1, A3.3**\n\n**Learning goals**\n- Explain the influence of sacred writings and oral teachings on the origin and development of traditions.\n- Describe the circumstances that produced the Code of Handsome Lake, the Qur\'an, and the letters of Paul, and how each shaped its tradition.\n- Find common themes across the three cases.\n\n**Success criteria — I can…**\n- describe the circumstances behind each of the three sources\n- explain one way each source shaped its tradition\'s development\n- state two themes common to all three\n\nThe curriculum\'s prompts for E2.1 are the three cases: "What do we know about the circumstances that influenced the development of the Code of Handsome Lake?", "How did the manner in which the Qur\'an was revealed influence the development of Islam?", "How are the conditions of the early Christian communities reflected in the letters of Paul?" On the test, distinguish **circumstance** (what produced the text) from **influence** (what the text produced).'
              }
            },
            {
              title: {
                1: 'The Qur\'an, Paul\'s letters, the Tripitaka',
                2: 'The Qur\'an and Islam • Paul\'s letters and the early church • The Tripitaka',
                3: 'Three texts that organized communities (E2.1)'
              },
              visual: '✉️',
              body: {
                1: '**The Qur\'an (Islam)**\n- Muslims believe God\'s words were delivered to Muhammad over 23 years, from 610 to 632 CE.\n- Verses often answered real events, so the Qur\'an became both scripture and law.\n- It was recited and memorized, then compiled after Muhammad\'s death.\n- Arabic became the shared sacred language.\n\n**Paul\'s letters (Christianity)**\n- Paul travelled the Roman Empire visiting small Christian communities.\n- His letters, from about 50 CE, answered real problems: arguments, questions about Jewish law, persecution.\n- They opened the movement to non-Jews and became scripture.\n\n**The Tripitaka (Buddhism)**\n- Its rules for monks and nuns made Buddhism a tradition built around monastic communities.',
                2: '**The Qur\'an and the shape of Islam**\n- **Revealed over 23 years:** Muslims believe the angel Gabriel delivered God\'s words to Muhammad from 610 to 632 CE, in Mecca and then Medina, often in response to the community\'s situation.\n- **Recited, then compiled:** "Qur\'an" means recitation. Companions memorized it; a written text was gathered after Muhammad\'s death. Memorization (hifz) remains a mark of devotion.\n- **Guidance for a community:** because verses addressed real events — a battle, a dispute, a question — the Qur\'an became both scripture and law for the umma.\n- **Arabic as sacred language:** since the words themselves are believed revealed, Arabic recitation binds Muslims worldwide, and translations are treated as interpretations.\n\n**Paul\'s letters and the early church**\n- Paul, a Jewish teacher who became a follower of Jesus around the mid-30s CE, travelled the eastern Roman Empire founding and visiting small Christian communities.\n- His letters — the earliest Christian writings, from roughly 50 CE onward — answer real problems: arguments in Corinth, questions about Jewish law in Galatia, encouragement for Thessalonica, a plea for a runaway slave in Philemon.\n- The conditions show through: tiny groups meeting in homes; mixed Jewish and non-Jewish members unsure of the rules; persecution; disputes over leadership and money.\n- The letters opened the movement to non-Jews, defined key ideas (grace, faith, the church as one body), and became scripture themselves.\n\n**The Tripitaka: a rule for a community**\n- Preserved orally by monks for centuries and written down in Pali in Sri Lanka in the first century BCE — the "three baskets": the Vinaya (rules for monks and nuns), the Sutras (the Buddha\'s discourses), and philosophical analysis.\n- The Vinaya made Buddhism a tradition organized around monastic communities (the sangha), which carried the teaching across Asia.',
                3: '**The Qur\'an and the shape of Islam**\n- **Revealed over 23 years:** Muslims believe the angel Gabriel delivered God\'s words to Muhammad from 610 to 632 CE, in Mecca and then Medina, often in response to the community\'s situation.\n- **Recited, then compiled:** "Qur\'an" means recitation. Companions memorized it; a written text was gathered after Muhammad\'s death. Memorization (hifz) remains a mark of devotion.\n- **Guidance for a community:** because verses addressed real events — a battle, a dispute, a question — the Qur\'an became both scripture and law for the umma, and the reasons for revelation are studied alongside the text.\n- **Arabic as sacred language:** since the words themselves are believed revealed, Arabic recitation binds Muslims worldwide, and translations are treated as interpretations.\n\nThree influences to remember: gradual revelation tied to events made the text a guide for community life and law; oral recitation made memorization and sound central to worship; Arabic became a unifying sacred language across cultures. Use "Muslims believe" for the revelation and plain statements for the dates.\n\n**Paul\'s letters and the early church**\n- Paul, a Jewish teacher who became a follower of Jesus around the mid-30s CE, travelled the eastern Roman Empire founding and visiting small Christian communities.\n- His letters — the earliest Christian writings, from roughly 50 CE onward — answer real problems: arguments in Corinth, questions about Jewish law in Galatia, encouragement for Thessalonica, a plea for a runaway slave in Philemon.\n- The conditions show through: tiny groups meeting in homes; mixed Jewish and non-Jewish members unsure of the rules; persecution; disputes over leadership and money.\n- The letters shaped Christianity\'s development: they opened the movement to non-Jews, defined key ideas (grace, faith, the church as one body), and became scripture themselves.\n- Of the 13 letters bearing Paul\'s name, scholars agree at least seven were written by him (Romans, 1 and 2 Corinthians, Galatians, Philippians, 1 Thessalonians, Philemon); the others may be by followers writing in his name — a question of voice (A3.1).\n\n**The Tripitaka: a rule for a community**\n- After the Buddha\'s death, his followers gathered to recite and agree on his teachings (tradition holds the first council met soon after, around the 5th century BCE). Preserved orally for centuries and written down in Pali in Sri Lanka in the first century BCE.\n- Basket 1, the Vinaya, sets rules for monks and nuns; Basket 2, the Sutras, records the Buddha\'s discourses; Basket 3 holds philosophical analysis.\n- The Vinaya made Buddhism a tradition organized around monastic communities (the sangha), which carried the teaching across Asia; later Mahayana schools added their own sutras.\n\n**Pattern:** a text that includes rules for a community tends to produce a tradition organized around that community.'
              }
            },
            {
              title: {
                1: 'The Code of Handsome Lake',
                2: 'Real case: the Code of Handsome Lake',
                3: 'Real case: the Code of Handsome Lake — Gaiwiio, the Good Word (1799)'
              },
              visual: '🌽',
              body: {
                1: '> After the American Revolution, the Haudenosaunee lost most of their land in New York. Many moved to the Grand River in Ontario.\n> Disease, war, and alcohol broke families and old ceremonies.\n> In 1799, Handsome Lake, a Seneca leader, was near death after years of heavy drinking. He had a series of visions.\n> He stopped drinking and began to teach the Gaiwiio, the Good Word: give up alcohol, witchcraft, and selling land; keep families whole; bring back the old ceremonies; learn enough English to survive.\n> The Code is still recited in longhouses today. The Longhouse religion continues on Six Nations of the Grand River.',
                2: '> After the American Revolution, the Haudenosaunee lost most of their land in New York; many moved to the Haldimand Tract along the Grand River in Ontario. Epidemics, war, and alcohol broke families and old ceremonies. In 1799, Handsome Lake, a Seneca leader near death after years of heavy drinking, had a series of visions. He stopped drinking and began to teach the Gaiwiio: give up alcohol, witchcraft, and the selling of land; keep marriages and families whole; revive traditional ceremonies and the farming cycle; and learn enough English to survive among settlers.\n> The Code blended Haudenosaunee teachings with some Quaker influences. It is still recited in longhouses today, and the Longhouse religion that follows it continues on Six Nations of the Grand River.',
                3: '> After the American Revolution, the Haudenosaunee lost most of their land in New York; many moved to the Haldimand Tract along the Grand River in Ontario. Epidemics, war, and alcohol broke families and old ceremonies. In 1799, Handsome Lake, a Seneca leader near death after years of heavy drinking, had a series of visions. He stopped drinking and began to teach the Gaiwiio: give up alcohol, witchcraft, and the selling of land; keep marriages and families whole; revive traditional ceremonies and the farming cycle; and learn enough English to survive among settlers.\n> The Code blended Haudenosaunee teachings with some Quaker influences. It is still recited in longhouses today, and the Longhouse religion that follows it continues on Six Nations of the Grand River.\n\n**Think about it**\n- List the circumstances (at least three) that shaped the Code.\n- Which parts of the Code revive old ways, and which adapt to new conditions? Why both?\n- How has an oral teaching from 1799 continued to influence a community in Ontario today?\n\n**From the notes:** Handsome Lake was born c. 1735 at Canawaugus and died August 10, 1815; his first visions came in 1799. The Code is recited annually in longhouses over several days. The teaching did not just reflect crisis; it created a path through it — the Longhouse religion exists because of the text. Revival (ceremonies, the thanksgiving cycle) plus adaptation (English, farming changes, prohibition) was a survival strategy that kept identity. Teach it as a **revitalization** that mixed old and new, not as a "conversion" to Christianity.'
              }
            },
            {
              title: {
                1: 'What the sources share',
                2: 'Common themes across the four sources',
                3: 'Worked example: common themes across the four sources (A3.3)'
              },
              visual: '🔗',
              body: {
                1: '**What the four sources share**\n- Each came out of a crisis or a new situation.\n- Each answered real, concrete questions.\n- Each set rules that organized a community.\n- Each was spoken before it was written.\n- Each is still used today by the community it shaped.\n\n**How they differ**\n- Where authority comes from: visions, revelation, an apostle\'s teaching, or the Buddha\'s words.\n\n**Example:** Handsome Lake\'s Code banned alcohol and land sales. Those rules helped families and ceremonies survive. The Longhouse religion exists today because of it.',
                2: '**What they share (A3.3)**\n- Each arose in a crisis or a new situation: land loss, a city rejecting its prophet, new communities with no rulebook, a teacher\'s death.\n- Each answered concrete questions, not abstract ones.\n- Each set rules that organized a community.\n- Each was carried orally before it was written.\n- Each is still recited, read, or studied by the community it shaped.\n\n**How they differ**\n| | Handsome Lake | Qur\'an | Paul | Tripitaka |\n| Source of authority | visions | revelation | apostolic teaching | the Buddha\'s discourses |\n| Scope | one confederacy | a worldwide umma | a network of churches | a monastic order |\n| Status today | an oral code recited in longhouses | the central scripture of Islam | part of the Christian canon | the canon of Theravada Buddhism |\n\n**Worked example — circumstance vs influence for the Code of Handsome Lake:** *Circumstances:* land loss after the American Revolution and relocation (including to the Grand River); epidemics and war; alcohol damaging families and ceremonies; Handsome Lake\'s 1799 visions after near-fatal illness. *Influence:* banned alcohol, witchcraft, and land sales; strengthened family; revived ceremonies and the farming cycle; accepted limited adaptation (English); produced the Longhouse religion still practised at Six Nations.',
                3: '**Expectation A3.3 — "determine whether common themes arise in different sources"**\n\n**What they share**\n- Each arose in a crisis or a new situation: land loss, a city rejecting its prophet, new communities with no rulebook, a teacher\'s death.\n- Each answered concrete questions, not abstract ones.\n- Each set rules that organized a community.\n- Each was carried orally before it was written.\n- Each is still recited, read, or studied by the community it shaped.\n\n**How they differ**\n| | Handsome Lake | Qur\'an | Paul | Tripitaka |\n| Source of authority | visions | revelation | apostolic teaching | the Buddha\'s discourses |\n| Scope | one confederacy | a worldwide umma | a network of churches | a monastic order |\n| Status today | an oral code recited in longhouses | the central scripture of Islam | part of the Christian canon | the canon of Theravada Buddhism |\n\nCommon themes do not mean the texts are "the same".\n\n**Worked example — circumstance vs influence for the Code of Handsome Lake:** *Circumstances:* land loss after the American Revolution and relocation (including to the Grand River); epidemics and war; alcohol damaging families and ceremonies; Handsome Lake\'s 1799 visions after near-fatal illness. *Influence:* banned alcohol, witchcraft, and land sales; strengthened family; revived ceremonies and the farming cycle; accepted limited adaptation (English); produced the Longhouse religion still practised at Six Nations.\n\n**Worked example — Paul\'s letters:** small house churches (letters addressed to communities in homes); Jewish/Gentile tension over law (Galatians); internal disputes over leadership, money, and conduct (1 Corinthians); persecution and the need for encouragement (1 Thessalonians); slavery in the community (Philemon).\n\n**Think about it**\n- Why might rules about everyday conduct do more to preserve a community than statements of belief?\n- How might a tradition differ if its scripture arrived all at once, with no connection to events?\n- Paul wrote letters to fix problems; centuries later they are scripture. Does a text\'s original purpose limit how it can be used later?\n- "Sacred texts are born in crisis." Where does the claim hold, and where does it fail (the Rig Veda? the Kojiki?)?'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: '- Name two things that were happening when Handsome Lake began his teaching.\n- Give one way the Qur\'an\'s revelation shaped Islam.\n\nTry this: In one sentence, how did ONE of today\'s texts shape its tradition?',
                2: '- Name three circumstances that shaped the Code of Handsome Lake.\n- Give two ways the manner of the Qur\'an\'s revelation shaped Islam.\n- Give two conditions of the early churches visible in Paul\'s letters.\n- State two themes common to all the sources studied today.\n\n**Exit ticket:** In one sentence each: how did ONE of today\'s texts shape its tradition, and what circumstance produced it?',
                3: '- Name three circumstances that shaped the Code of Handsome Lake.\n- Give two ways the manner of the Qur\'an\'s revelation shaped Islam.\n- Give two conditions of the early churches visible in Paul\'s letters.\n- State two themes common to all the sources studied today.\n\n**Exit ticket:** In one sentence each: how did ONE of today\'s texts shape its tradition, and what circumstance produced it? Which common theme surprised you most?\n\n**Think deeper — a modern parallel:** a small immigrant community loses its place of worship to a fire; families drift away; some leaders struggle with debt and alcohol; a respected elder begins recording weekly teachings that members share on their phones. Parallels with Handsome Lake: loss of a central place; family and community strain; a respected figure offering a teaching that mixes old practice with practical adaptation. Using the lesson\'s pattern, the recordings may become the community\'s reference point and even "scripture" — with the risk that the elder\'s voice replaces older sources, or that context is lost when recordings outlive the elder.'
              }
            }
          ]
        },

        // ---- Lesson 5: The Golden Rule Across Traditions ----
        {
          title: 'The Golden Rule Across Traditions',
          slides: [
            {
              title: {
                1: 'Treat others as you want to be treated',
                2: 'The Golden Rule Across Traditions',
                3: 'The Golden Rule Across Traditions: the driving question'
              },
              visual: '🤝',
              body: {
                1: 'Treat others as you want to be treated.\n\nNearly every tradition on earth says it. **Why?** And what else do they agree on?\n\n**We are learning to:**\n- Find the Golden Rule in the sacred writings of several traditions.\n- Notice what they share, and how their wording differs.\n- Draw a conclusion from evidence.\n\nWho first taught you the Golden Rule? Where did that person get it?',
                2: 'Treat others as you want to be treated. Why does nearly every tradition on earth say it — and what else do they agree on?\n\n**Learning goals**\n- Identify key precepts (such as the Golden Rule) from the sacred writings and oral teachings of several traditions.\n- Describe the commonalities among them — and notice the real differences in wording and reasoning.\n- Synthesize: draw a conclusion from the evidence about why traditions converge on similar rules.\n\nWho first taught you the Golden Rule? Most people say a parent or elementary teacher. Then: where did THAT person get it? Today we trace the rule, and other shared precepts, back to the sacred sources.',
                3: 'Treat others as you want to be treated. Why does nearly every tradition on earth say it — and what else do they agree on?\n\n**Expectations: E2.2, A3.5**\n\n**Learning goals**\n- Identify key precepts (such as the Golden Rule) from the sacred writings and oral teachings of several traditions.\n- Describe the commonalities among them — and notice the real differences in wording and reasoning.\n- Synthesize: draw a conclusion from the evidence about why traditions converge on similar rules.\n\n**Success criteria — I can…**\n- state the Golden Rule as found in at least four traditions\n- name two other precepts that appear across traditions\n- write a one-paragraph conclusion supported by at least three pieces of evidence\n\nWho first taught you the Golden Rule? Where did THAT person get it? Today we trace the rule back to the sacred sources. Criterion 3 is A3.5 and is the model for the assignment\'s conclusion. The unit test asks for the Golden Rule in three traditions (with a source for each) and one comparison with the Code of Handsome Lake. Note: the wordings in this lesson are paraphrases; if you display exact text, cite the translation.'
              }
            },
            {
              title: {
                1: 'The Golden Rule in sacred sources',
                2: 'The Golden Rule in sacred sources • Other precepts traditions share',
                3: 'The Golden Rule in sacred sources • Other precepts traditions share (E2.2)'
              },
              visual: '📖',
              body: {
                1: '| Tradition | Source | The rule (in short) |\n| Judaism | Leviticus 19:18; Hillel | What is hateful to you, do not do to another. |\n| Christianity | Matthew 7:12 | Do to others what you would have them do to you. |\n| Islam | a hadith | Wish for your brother what you wish for yourself. |\n| Confucianism | Analects | Do not impose on others what you do not desire. |\n| Hinduism | Mahabharata | Do not treat others in a way you would not like. |\n\n**Two forms:** the **positive** form says *do* good. The **negative** form says *do not* harm.\n\n**Other shared precepts:** care for the vulnerable (zakat, langar) and honesty and non-harm (right speech, ahimsa).',
                2: '| Tradition | Source | Paraphrase |\n| Judaism | Leviticus 19:18; Hillel (1st century BCE) | "Love your neighbour as yourself." Hillel, asked to teach the whole Torah while standing on one foot: what is hateful to you, do not do to another; the rest is commentary. |\n| Christianity | Matthew 7:12; Luke 6:31 | Jesus in the Sermon on the Mount: in everything, do to others what you would have them do to you — this sums up the Law and the Prophets. |\n| Islam | hadith of the Prophet Muhammad | None of you truly believes until he wishes for his brother what he wishes for himself (recorded in the collections of Bukhari and Muslim). |\n| Confucianism | Analects 15:23 | Asked for one word to guide a whole life, Confucius answered: reciprocity — do not impose on others what you yourself do not desire. |\n| Hinduism | Mahabharata | One should not behave toward others in a way that is disagreeable to oneself; this is the sum of duty (dharma). |\n\nJudaism and Confucianism give the **negative form**; Christianity and Islam the **positive form**. Each tradition presents the rule as a summary of its whole ethic.\n\n**Other precepts traditions share**\n- **Care for the vulnerable:** Torah — leave the edges of the field for the poor and the stranger; Islam — zakat, a required share of wealth for those in need; Christianity — the Beatitudes, "whatever you did for the least of these"; Sikhism — langar, the free kitchen open to all; Anishinaabe — sharing as a duty.\n- **Honesty, humility, and non-harm:** Eightfold Path — right speech, action, livelihood; Seven Grandfather Teachings — honesty, humility; Ten Commandments — no false witness, no stealing; Jainism — ahimsa, non-violence toward all living things; Code of Handsome Lake — no witchcraft, no gossip that divides families.',
                3: '**Expectation E2.2**\n\n| Tradition | Source | Paraphrase |\n| Judaism | Leviticus 19:18; Hillel (1st century BCE) | "Love your neighbour as yourself." Hillel, asked to teach the whole Torah while standing on one foot: what is hateful to you, do not do to another; the rest is commentary. |\n| Christianity | Matthew 7:12; Luke 6:31 | Jesus in the Sermon on the Mount: in everything, do to others what you would have them do to you — this sums up the Law and the Prophets. |\n| Islam | hadith of the Prophet Muhammad | None of you truly believes until he wishes for his brother what he wishes for himself (a widely cited saying recorded in the collections of Bukhari and Muslim). |\n| Confucianism | Analects 15:23 | Asked for one word to guide a whole life, Confucius answered: reciprocity — do not impose on others what you yourself do not desire. |\n| Hinduism | Mahabharata | One should not behave toward others in a way that is disagreeable to oneself; this is the sum of duty (dharma). |\n\nEvery line is a paraphrase. Judaism and Confucianism give the **negative form**; Christianity and Islam the **positive form**. Each tradition presents the rule as a summary of its whole ethic — Hillel\'s "the rest is commentary", Jesus\' "the Law and the Prophets", Confucius\' "one word". The Buddhist Dhammapada and Sikh scripture express the same principle; the Seven Grandfather Teachings\' "respect" and "love" carry it in Anishinaabe form.\n\n**Other precepts traditions share**\n- **Care for the vulnerable:** Torah — leave the edges of the field for the poor and the stranger; Islam — zakat, a required share of wealth for those in need (a pillar of Islam); Christianity — the Beatitudes, "whatever you did for the least of these"; Sikhism — langar, the free kitchen open to all; Anishinaabe — sharing as a duty; the potlatch tradition on the Pacific coast.\n- **Honesty, humility, and non-harm:** Eightfold Path — right speech, right action, right livelihood; Seven Grandfather Teachings — honesty, humility; Ten Commandments — no false witness, no stealing; Jainism — ahimsa, non-violence toward all living things, the first vow; Code of Handsome Lake — no witchcraft, no gossip that divides families.\n\nReciprocity, care for the poor, honesty, humility, and non-harm recur, though the reasons and scope differ: ahimsa extends to animals and insects; zakat is a precise legal duty.\n\n**Think about it:** Is "do not do to others what you hate" weaker, stronger, or just different from "do to others what you would want"? Some scholars argue the negative form is more practical because it does not assume others want what you want.'
              }
            },
            {
              title: {
                1: 'Handsome Lake and the Golden Rule',
                2: 'Real case: Handsome Lake and the Golden Rule',
                3: 'Real case: Handsome Lake and the Golden Rule — a Seneca code and a universal precept'
              },
              visual: '🌳',
              body: {
                1: '> The Code of Handsome Lake (1799) is not a list of big ideas. It is a set of clear instructions for a community in crisis.\n> Do not drink. Do not leave your spouse or children. Do not sell the land. Do not practise witchcraft or spread gossip. Care for the elderly and for orphans. Give thanks to the Creator. Keep the ceremonies.\n> Next to the Golden Rule, the Code looks different. It gives specific commands, not one principle.\n> But much of it is the rule in action: treat your family, your neighbours, and the land as you would wish to be treated.',
                2: '> The Code of Handsome Lake (1799) is not a list of abstract principles; it is a set of concrete instructions for a community in crisis: do not drink, do not abandon your spouse or children, do not sell the land, do not practise witchcraft or spread gossip, care for the elderly and for orphans, give thanks to the Creator, keep the ceremonies.\n> Set beside the Golden Rule, the Code looks different in form — specific commands rather than a single principle — but much of it can be read as the rule applied: treat your family, your neighbours, and the land as you would wish to be treated, and do not do to them the harm that was done to you.',
                3: '> The Code of Handsome Lake (1799) is not a list of abstract principles; it is a set of concrete instructions for a community in crisis: do not drink, do not abandon your spouse or children, do not sell the land, do not practise witchcraft or spread gossip, care for the elderly and for orphans, give thanks to the Creator, keep the ceremonies.\n> Set beside the Golden Rule, the Code looks different in form — specific commands rather than a single principle — but much of it can be read as the rule applied: treat your family, your neighbours, and the land as you would wish to be treated, and do not do to them the harm that was done to you.\n\n**Think about it**\n- Find three instructions in the Code that express the Golden Rule in practice.\n- What does the Code add that the Golden Rule alone does not say? (Think: land, ceremony, the Creator.)\n- Why might a community in crisis need specific commands more than a general principle?\n\n**From the notes:** this case answers the curriculum prompt "What similarities do you see between the Code of Handsome Lake and the Golden Rule?" Similarities: reciprocity in family and community conduct; care for the vulnerable (elderly, orphans); prohibitions on harm (gossip, abandonment). Additions: duties to the land and to the Creator, and ritual obligations — the Code\'s ethic is relational to all of creation, not only to other humans. That is a difference worth naming rather than erasing.'
              }
            },
            {
              title: {
                1: 'Why do traditions agree?',
                2: 'Why do traditions converge? Writing a synthesis',
                3: 'Worked example: why do traditions converge? (A3.5 synthesis)'
              },
              visual: '🧩',
              body: {
                1: 'Why do so many traditions teach the same rule? Three ideas:\n\n- **Shared human need:** every society must solve the same problems — trust, fairness, care for the weak.\n- **Contact and borrowing:** traditions met along trade routes, and ideas travelled with people.\n- **A common source:** some believers hold that one divine truth shows up in many teachings.\n\nAgreeing on a rule does **not** mean traditions are all the same. Their reasons and their scope differ.\n\n**A conclusion** = a claim + evidence for it + evidence that limits it.',
                2: '**Why do traditions converge?**\n- **Hypothesis 1 — shared human need:** every society must solve the same problems (trust, fairness, care for the weak), so similar rules emerge independently (Unit 1\'s four needs).\n- **Hypothesis 2 — contact and borrowing:** traditions met along trade routes and through empire; precepts travelled with people.\n- **Hypothesis 3 — a common source:** believers in several traditions hold that one divine truth is reflected in many teachings.\n\nEvidence for each exists; the hypotheses are not exclusive. A synthesis weighs them rather than picking one. What convergence does **not** mean: that traditions are "all the same". Reasons, scope, and the surrounding way of life differ.\n\n**A3.5 — synthesize.** A conclusion is a claim, plus the evidence that supports it, plus the evidence that limits it. Try: "Traditions converge on the Golden Rule because …; however, …"\n\n**Worked example — the Code and the Rule:** *Similarities:* reciprocity within family and community; care for the elderly and orphans; prohibitions on harm (gossip, abandonment, witchcraft). *Additions:* duties to the land (no selling it), to ceremony, and to the Creator — a relational ethic toward all of creation.',
                3: '**Why do traditions converge?**\n- **Hypothesis 1 — shared human need:** every society must solve the same problems (trust, fairness, care for the weak), so similar rules emerge independently (Unit 1\'s four needs).\n- **Hypothesis 2 — contact and borrowing:** traditions met along trade routes and through empire; precepts travelled with people.\n- **Hypothesis 3 — a common source:** believers in several traditions hold that one divine truth is reflected in many teachings.\n\nEvidence for each exists; the hypotheses are not exclusive. A synthesis weighs them rather than picking one. What convergence does **not** mean: that traditions are "all the same". Reasons, scope, and the surrounding way of life differ.\n\n**Expectation A3.5 — synthesize.** A conclusion is a claim, plus the evidence that supports it, plus the evidence that limits it.\n\n**Worked example — a model synthesis.** *Claim:* traditions converge on reciprocity because every community must solve the same problems of trust and fairness, and because teachings travelled with people. *Evidence:* Hillel, Jesus, and Confucius each offer the rule as a summary of their whole ethic; zakat and langar show shared care for the poor; Handsome Lake applies reciprocity to a community in crisis. *Limit:* the forms differ (negative vs positive), the scope differs (ahimsa includes all living things; the Code includes the land), and the reasons differ (God\'s command, dharma, ending suffering) — so convergence on a rule does not make the traditions the same.\n\n**Worked example — a "Code of Respect" for a shared community centre:** a single line ("treat others as you would want to be treated") is the Golden Rule as a summary principle; a detailed list (no alcohol, quiet hours, a free meal program, protection for elders and children) echoes the Code of Handsome Lake\'s concrete commands; covering the grounds and the river echoes the Code\'s duties to the land. A principle alone may not change behaviour; a list alone may feel arbitrary. Combined: state the principle, then specific rules as its application.\n\n**Think about it:** If nearly every tradition teaches the Golden Rule, why is the world not kinder? What does a precept need in order to change behaviour? Should the Golden Rule extend to non-human beings — and which traditions say yes?'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: '- Say the Golden Rule the way two different traditions teach it.\n- Name one other precept that many traditions share.\n\nTry this: Which tradition\'s version of the rule would you adopt as your own, and why?',
                2: '- State the Golden Rule as taught in Judaism, Christianity, Islam, and Confucianism (paraphrase).\n- Name two precepts besides the Golden Rule that appear across traditions, with one example each.\n- Give two similarities between the Code of Handsome Lake and the Golden Rule, and one thing the Code adds.\n- What are the three parts of a synthesis conclusion?\n\n**Exit ticket:** Write your one-paragraph conclusion: "Traditions converge on the Golden Rule because …; however, …" with three specific pieces of evidence.',
                3: '- State the Golden Rule as taught in Judaism, Christianity, Islam, and Confucianism (paraphrase).\n- Name two precepts besides the Golden Rule that appear across traditions, with one example each.\n- Give two similarities between the Code of Handsome Lake and the Golden Rule, and one thing the Code adds.\n- What are the three parts of a synthesis conclusion? (Claim, supporting evidence, limiting evidence.)\n\n**Exit ticket:** Write your one-paragraph conclusion: "Traditions converge on the Golden Rule because …; however, …" with three specific pieces of evidence. Which tradition\'s version of the rule would you adopt as your own, and why?\n\n**Think deeper:** Explain the difference between the positive and negative forms of the rule and give a situation where it matters. For example, a classmate is being excluded: the negative form only requires you not to join in; the positive form requires you to include them. The exit paragraph is a draft of the assignment\'s conclusion — check it for claim, evidence, and limit.'
              }
            }
          ]
        },

        // ---- Lesson 6: From Story to Festival and Art ----
        {
          title: 'From Story to Festival and Art',
          slides: [
            {
              title: {
                1: 'Stories that became festivals and art',
                2: 'From Story to Festival and Art',
                3: 'From Story to Festival and Art: the driving question'
              },
              visual: '🎉',
              body: {
                1: 'A queen who saved her people. A prince who came home. A woman who fell from the sky. A canoe full of quarrelling spirits.\n\nThese are stories that became festivals and art.\n\n**We are learning to:**\n- Connect sacred stories to the festivals built on them.\n- Connect sacred stories to works of art.\n- Judge how closely a work of art follows its story.\n\nWhat story is behind a holiday you celebrate?',
                2: 'A queen who saved her people, a prince who came home, a woman who fell from the sky, a canoe full of quarrelling spirits: stories that became festivals and art.\n\n**Learning goals**\n- Explain the connections between sacred stories and the festivals, celebrations, rites of passage, and daily observances built on them.\n- Explain the relationships between sacred stories and works of art, music, or literature.\n- Evaluate how accurately a work of art depicts the story it draws on.\n\nWhat story is behind a holiday you celebrate? Many students can tell the Christmas story but struggle with others. Today we practise moving from story to festival and from story to art, in three traditions plus a famous Canadian sculpture.',
                3: 'A queen who saved her people, a prince who came home, a woman who fell from the sky, a canoe full of quarrelling spirits: stories that became festivals and art.\n\n**Expectations: E2.3, E2.4**\n\n**Learning goals**\n- Explain the connections between sacred stories and the festivals, celebrations, rites of passage, and daily observances built on them.\n- Explain the relationships between sacred stories and works of art, music, or literature.\n- Evaluate how accurately a work of art depicts the story it draws on.\n\n**Success criteria — I can…**\n- tell the story behind Purim, Diwali, and the Green Corn Festival and name the practices that act each story out\n- explain what each figure in Spirit of Haida Gwaii is doing and why Bill Reid chose it\n- judge a painting of the Last Supper against the Gospel accounts\n\nWhat story is behind a holiday you celebrate? The unit test\'s scenario questions ask you to connect a story to a festival and to evaluate a representation. By the end you should be able to say: "this festival exists because of this story", with the story\'s key events named. Sacred images are described, not reproduced, in this course; if you look at artworks, use museum or institutional sources.'
              }
            },
            {
              title: {
                1: 'From story to festival',
                2: 'From story to festival: Purim, Diwali, the Green Corn Festival',
                3: 'From story to festival: Purim, Diwali, the Green Corn Festival (E2.3)'
              },
              visual: '🪔',
              body: {
                1: '**Esther → Purim (Judaism)**\n- Esther becomes queen of Persia. Haman plots to destroy the Jews. Esther and Mordecai expose him. The people are saved.\n- Purim: the story is read from a scroll (the Megillah). People drown out Haman\'s name with noisemakers, give food gifts and gifts to the poor, feast, and wear costumes.\n\n**The Ramayana → Diwali (Hinduism)**\n- Rama is exiled with Sita. Ravana kidnaps Sita. Rama, helped by Hanuman, defeats Ravana. Ayodhya lights lamps to welcome them home.\n- Diwali: rows of lamps (diyas), fireworks, new clothes, sweets.\n\n**Sky Woman → Green Corn Festival (Haudenosaunee)**\n- Sky Woman falls to Turtle Island. Corn, beans, and squash grow from her daughter\'s body.\n- The festival gives thanks for the first ripe corn.',
                2: '**The Book of Esther and Purim**\n- The Book of Esther tells of a Jewish woman who becomes queen of Persia and, with her cousin Mordecai, uncovers a plot by the king\'s adviser Haman to destroy the Jews; she risks her life to appeal to the king, and the people are saved.\n- Purim re-enacts the story: the whole book is read aloud from a scroll (the Megillah), and every time Haman\'s name is read the congregation drowns it out with noisemakers (graggers) and boos. Families send gifts of food to friends (mishloach manot), give to the poor as the book commands, eat a festive meal, and dress in costume — recalling Esther\'s hidden identity and the story\'s reversals.\n\n**The Ramayana and Diwali**\n- Prince Rama is exiled for fourteen years with his wife Sita and brother Lakshmana. The demon king Ravana abducts Sita and carries her to Lanka; Rama, aided by the monkey general Hanuman and his army, defeats Ravana and rescues her. When Rama and Sita return to Ayodhya, the people light rows of oil lamps to welcome them home.\n- Many Hindus celebrate Diwali, the festival of lights, in memory of that homecoming: rows of lamps (diyas) in windows and doorways, fireworks, new clothes, sweets, and the cleaning of homes to welcome prosperity. Diwali also carries other stories for Jains, Sikhs, and Hindus of different regions.\n\n**Sky Woman and the Green Corn Festival**\n- In the Haudenosaunee creation story, a pregnant woman falls from the Sky World; water birds catch her, and animals dive for earth to place on a great turtle\'s back, which grows into the land — Turtle Island. Sky Woman\'s daughter gives birth to twins; from her body grow corn, beans, and squash — the Three Sisters.\n- The Green Corn Festival, held in late summer when the first corn ripens, gives thanks for the harvest with the Thanksgiving Address, dances, songs, and a feast. The festival thanks the gifts that the story explains; the story tells why the gifts are sacred.',
                3: '**The Book of Esther and Purim**\n- The Book of Esther tells of a Jewish woman who becomes queen of Persia and, with her cousin Mordecai, uncovers a plot by the king\'s adviser Haman to destroy the Jews; she risks her life to appeal to the king, and the people are saved.\n- Purim re-enacts the story: the whole book is read aloud from a scroll (the Megillah), and every time Haman\'s name is read the congregation drowns it out with noisemakers (graggers) and boos. Families send gifts of food to friends (mishloach manot), give to the poor as the book commands, eat a festive meal, and dress in costume — recalling Esther\'s hidden identity and the story\'s reversals.\n- The Book of Esther never mentions God directly, which rabbis connect to the theme of hiddenness and costume.\n\n**The Ramayana and Diwali**\n- Prince Rama is exiled from his kingdom for fourteen years with his wife Sita and brother Lakshmana. The demon king Ravana abducts Sita and carries her to Lanka; Rama, aided by the monkey general Hanuman and his army, defeats Ravana and rescues her. When Rama and Sita return to Ayodhya, the people light rows of oil lamps to welcome them home.\n- Diwali, the festival of lights: rows of lamps (diyas) in windows and doorways recall the people of Ayodhya lighting the way home; cleaning and new clothes welcome the returning rightful ruler; fireworks and sweets celebrate victory over Ravana. Diwali carries other stories too: for Jains, Mahavira\'s liberation; for Sikhs, Bandi Chhor Divas, the release of Guru Hargobind.\n\n**Sky Woman and the Green Corn Festival**\n- In the Haudenosaunee creation story, a pregnant woman falls from the Sky World; water birds catch her, and animals dive for earth to place on a great turtle\'s back, which grows into the land — Turtle Island. Sky Woman\'s daughter gives birth to twins; from her body grow corn, beans, and squash — the Three Sisters — the foundation of the people\'s food.\n- The Green Corn Festival, held in late summer when the first corn ripens, gives thanks for the harvest with the Thanksgiving Address, dances, songs, and a feast; it is one of a cycle of ceremonies through the year. The Thanksgiving Address (Ohen:ton Karihwatehkwen) opens and closes Haudenosaunee gatherings; it thanks the people, the earth, waters, plants, animals, winds, sun, moon, stars, and the Creator in order.\n- **Source note:** each nation tells the story with its own protocols. The primary source is a community teller — learn it from a Haudenosaunee source before retelling it.\n\n**Think about it:** Why read the whole story of Esther aloud every year rather than simply remember it? How does giving to the poor turn the story into ethics? Diwali means different things to Jains and Sikhs — does that weaken the festival or strengthen it?'
              }
            },
            {
              title: {
                1: 'Spirit of Haida Gwaii',
                2: 'Real case: Bill Reid\'s Spirit of Haida Gwaii',
                3: 'Real case: Bill Reid\'s Spirit of Haida Gwaii — a canoe full of stories'
              },
              visual: '🛶',
              body: {
                1: '> Bill Reid (1920–1998) was a Haida artist. He spent years making a huge bronze canoe crowded with figures from Haida stories.\n> Raven the trickster steers. A Grizzly Bear sits at the front with Bear Mother and their two cubs.\n> Beaver, Dogfish Woman, Eagle, Frog, and Wolf are all aboard. Some bite or grip one another.\n> A small human paddles. At the centre stands a shaman with a carved staff.\n> The black bronze stands outside the Canadian Embassy in Washington. The green "Jade Canoe" is at Vancouver airport. The image was on the $20 bill from 2004 to 2012.\n> Reid said the passengers, however much they quarrel, are all in the same boat and must paddle together.',
                2: '> Bill Reid (1920–1998), a Haida artist, spent years making a huge bronze canoe crowded with figures from Haida stories: Raven the trickster steers; Mouse Woman crouches beneath him; a Grizzly Bear sits at the bow with Bear Mother and their two cubs; Beaver, Dogfish Woman, Eagle, Frog, and Wolf are all aboard, some biting or gripping one another; a small human, the "Ancient Reluctant Conscript", paddles; and at the centre stands a shaman with a staff carved with Seabear, Raven, and Killer Whale.\n> The black bronze stands outside the Canadian Embassy in Washington (1991); the green "Jade Canoe" is at Vancouver International Airport (1996); the image was on the $20 bill from 2004 to 2012. Reid said the passengers, however much they quarrel, are all in the same boat and must paddle together.',
                3: '> Bill Reid (1920–1998), a Haida artist, spent years making a huge bronze canoe crowded with figures from Haida stories: Raven the trickster steers; Mouse Woman crouches beneath him; a Grizzly Bear sits at the bow with Bear Mother and their two cubs; Beaver, Dogfish Woman, Eagle, Frog, and Wolf are all aboard, some biting or gripping one another; a small human, the "Ancient Reluctant Conscript", paddles; and at the centre stands a shaman with a staff carved with Seabear, Raven, and Killer Whale.\n> The black bronze stands outside the Canadian Embassy in Washington (1991); the green "Jade Canoe" is at Vancouver International Airport (1996); the image was on the $20 bill from 2004 to 2012. Reid said the passengers, however much they quarrel, are all in the same boat and must paddle together.\n\n**Think about it**\n- Why might Reid have chosen each figure? Pick three and connect each to what it represents in Haida stories.\n- What does a canoe full of quarrelling beings say about community? Connect to a precept from Lesson 5.\n- This sacred imagery was placed on money and at an airport. Using Unit 1\'s idea of appropriation, is that honour or misuse? Who decides?\n\n**From the notes:** figures and roles are from the Canadian Museum of History and Reid\'s own writing. Raven steering suggests the unpredictability of nature; the animals are the beings the Haida depended on; the shaman is the focal point. Reid himself approved the embassy commission, and the $20 bill was a Bank of Canada decision with the Reid estate\'s cooperation — which makes the appropriation question a genuine debate rather than an obvious case. Bill Reid was Haida through his mother.'
              }
            },
            {
              title: {
                1: 'Judging art against its story',
                2: 'Judging art against its story',
                3: 'Worked example: judging art against its story (E2.4)'
              },
              visual: '🖼️',
              body: {
                1: '**Leonardo da Vinci\'s Last Supper** shows Jesus\' final meal with his disciples.\n\n- **Faithful to the Gospels:** thirteen figures, bread and wine, the shock when Jesus announces a betrayal.\n- **The artist\'s interpretation:** a long table with everyone on one side, Italian clothing and buildings, European faces.\n- **Judgement:** true to the drama of the story, not to the real setting in first-century Jerusalem.\n\n**Images of Hindu deities** sum up stories: Ganesha\'s elephant head and Krishna\'s flute each recall a story. Different regions show the same deity differently. None is "wrong".',
                2: '**Paintings of the Last Supper**\n- The Gospels describe Jesus\' final meal with his disciples the night before his death; Leonardo da Vinci\'s mural (Milan, 1495–98) shows the moment he announces a betrayal.\n- **Faithful:** thirteen figures, bread and wine on the table, the shock of the announcement.\n- **Interpretive:** a long table with everyone on one side (for the composition), Renaissance Italian clothing and architecture, European faces, a daytime window.\n- **Judgement:** accurate to the drama of the text, not to the historical setting (a Passover-season meal in first-century Jerusalem, likely reclining).\n\n**Images of Hindu deities**\n- Each deity\'s image (murti) is a visual summary of stories: Ganesha\'s elephant head recalls the story of Shiva restoring his son\'s life; Krishna\'s flute recalls his youth among the cowherds.\n- Multiple arms show many powers at once; objects held (a lotus, a conch, a discus) each carry a story.\n- Different regions and centuries show the same deity differently; none is "wrong" — each is an interpretation within the iconography.\n\n**The three-step judgement:** what the text says, what the artwork shows, what the artist changed and why. The point is not to catch artists out but to see interpretation at work.',
                3: '**Expectation E2.4**\n\n**Paintings of the Last Supper**\n- The Gospels describe Jesus\' final meal with his disciples the night before his death; Leonardo da Vinci\'s mural (Milan, 1495–98) shows the moment he announces a betrayal.\n- **Faithful:** thirteen figures, bread and wine on the table, the shock of the announcement.\n- **Interpretive:** a long table with everyone on one side (for the composition), Renaissance Italian clothing and architecture, European faces, a daytime window.\n- **Judgement:** accurate to the drama of the text, not to the historical setting (a Passover-season meal in first-century Jerusalem, likely reclining).\n\n**Images of Hindu deities**\n- Each deity\'s image (murti) is a visual summary of stories: Ganesha\'s elephant head recalls the story of Shiva restoring his son\'s life; Krishna\'s flute recalls his youth among the cowherds.\n- Multiple arms show many powers at once; objects held (a lotus, a conch, a discus) each carry a story.\n- Different regions and centuries show the same deity differently; none is "wrong" — each is an interpretation within the iconography.\n\n**The three-step judgement:** what the text says, what the artwork shows, what the artist changed and why. The point is not to catch artists out but to see interpretation at work.\n\n**Worked example — a modern Last Supper set in a Toronto restaurant with disciples of many backgrounds.** *Faithful:* thirteen figures, bread and wine, the moment of announcement. *Interpreted:* the modern setting and diverse faces — like Leonardo\'s Renaissance Italy, which made the story the viewers\' own. *Judgement:* interpretation can strengthen meaning (the story belongs to this community too) while weakening historical accuracy; neither painting is "wrong" as art.\n\n**Worked example — a school review as a source (A3.1):** a student review calling the Reid replica "just a boat with animals" is a secondary source written to entertain or provoke; its reliability is limited if it shows no sign of consulting the Gospels, Haida sources, or the artists\' statements; the voices missing are Christian viewers, Haida people, and the artists.\n\n**Think about it:** Leonardo painted first-century Jerusalem to look like Renaissance Italy. Was that a mistake, a choice, or a way of saying "this story is ours too"? Why do festivals need the body — noise, light, food, costume — and not only the story?'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: '- Tell the story behind Purim in two sentences. Name one practice that acts it out.\n- Name two figures in Spirit of Haida Gwaii.\n\nTry this: Choose one festival and write its story in one sentence, plus one practice that enacts it.',
                2: '- Tell the story behind Purim in three sentences and name three practices that enact it.\n- Which Diwali practices reflect Rama\'s return?\n- Name three figures in Spirit of Haida Gwaii and what each is doing.\n- Give one accurate and one interpretive element in Leonardo\'s Last Supper.\n\n**Exit ticket:** Choose one festival from today and write: the story in one sentence, and one practice that enacts it. Name one Unit 2 topic you want reviewed before the test.',
                3: '- Tell the story behind Purim in three sentences and name three practices that enact it.\n- Which Diwali practices reflect Rama\'s return?\n- Name three figures in Spirit of Haida Gwaii and what each is doing.\n- Give one accurate and one interpretive element in Leonardo\'s Last Supper.\n\n**Exit ticket:** Choose one festival from today and write: the story in one sentence, and one practice that enacts it. Name one Unit 2 topic you want reviewed before the test. (The usual requests are the sacred texts table from Lesson 2 and the three teachings from Lesson 3.)\n\n**Think deeper:** "Every festival is a story performed, and every sacred artwork is a story interpreted." Purim performs Esther almost line by line (reading, drowning out Haman, gifts, costumes), though the festive meal and costumes also reflect later tradition; Diwali\'s lamps perform the homecoming, but its prosperity customs and its Jain and Sikh meanings come from elsewhere — so festivals perform stories and accumulate more. Leonardo\'s Last Supper is faithful to the Gospel drama but interprets the setting as Renaissance Italy; that made the story the viewers\' own, strengthening its meaning for them while weakening historical accuracy. Why do festivals perform stories with the body rather than only telling them? The body remembers what the mind forgets; shared action builds community; re-enactment lets each generation enter the story.'
              }
            }
          ]
        }
      ],

      terms: [
        // Lesson 1
        {
          term: 'sacred writing',
          def: {
            1: 'A text a tradition treats as holy.',
            2: 'A text a tradition treats as holy — often believed to be revealed, inspired, or handed down from founders.',
            3: 'A text a tradition treats as holy — often believed to be revealed, inspired, or handed down from founders (e.g. the Torah, the Qur\'an, the Vedas).'
          }
        },
        {
          term: 'oral teaching',
          def: {
            1: 'Sacred beliefs passed on by speaking, story, song, and ceremony.',
            2: 'Sacred beliefs that emerge from, or are transmitted through, the spoken word — stories, songs, ceremonies, and law recited from memory.',
            3: 'Sacred beliefs that emerge from, or are transmitted through, the spoken word — stories, songs, ceremonies, and law recited from memory (e.g. the Great Law of Peace recited from the Hiawatha Belt). Curriculum glossary term.'
          }
        },
        {
          term: 'scripture',
          def: {
            1: 'Sacred writings a tradition treats as having authority.',
            2: 'Sacred writings regarded as authoritative within a tradition.',
            3: 'Sacred writings regarded as authoritative within a tradition (e.g. the Bible for Christians, the Qur\'an for Muslims).'
          }
        },
        {
          term: 'canon',
          def: {
            1: 'The official list of a tradition\'s holy books.',
            2: 'The official list of writings a tradition accepts as its scripture.',
            3: 'The official list of writings a tradition accepts as its scripture. Explains why Jews, Catholics, and Protestants have Bibles with different contents: each community decided which books were in.'
          }
        },
        {
          term: 'revelation',
          def: {
            1: 'Knowledge believed to come from the divine to people.',
            2: 'Knowledge believed to be communicated by the divine to humans.',
            3: 'Knowledge believed to be communicated by the divine to humans (e.g. Muslims believe the Qur\'an was revealed to Muhammad).'
          }
        },
        {
          term: 'wampum',
          def: {
            1: 'Shell-bead belts that record laws, agreements, and history.',
            2: 'Belts and strings of purple and white shell beads used by Haudenosaunee and other nations to record agreements, laws, and history.',
            3: 'Belts and strings of purple and white shell beads used by Haudenosaunee and other nations to record agreements, laws, and history (e.g. the Hiawatha Belt).'
          }
        },
        // Lesson 2
        {
          term: 'Tanakh',
          def: {
            1: 'The Hebrew Bible: Torah, Prophets, and Writings.',
            2: 'The Hebrew Bible: Torah (teaching/law), Nevi\'im (prophets), Ketuvim (writings).',
            3: 'The Hebrew Bible: Torah (teaching/law), Nevi\'im (prophets), Ketuvim (writings). Christians call the same books the Old Testament, in a different order.'
          }
        },
        {
          term: 'Torah',
          def: {
            1: 'The first five books of the Hebrew Bible.',
            2: 'The first five books of the Hebrew Bible; also, more broadly, Jewish teaching as a whole.',
            3: 'The first five books of the Hebrew Bible; also, more broadly, Jewish teaching as a whole. Torah scrolls are handwritten and read in the synagogue on a yearly cycle.'
          }
        },
        {
          term: 'epic',
          def: {
            1: 'A long story-poem about heroes, gods, and a people.',
            2: 'A long narrative poem about heroes, gods, and the fate of a people — the Mahabharata and Ramayana are Hindu epics.',
            3: 'A long narrative poem about heroes, gods, and the fate of a people — the Mahabharata (roughly 100,000 verses) and the Ramayana are Hindu epics.'
          }
        },
        {
          term: 'surah',
          def: {
            1: 'One of the 114 chapters of the Qur\'an.',
            2: 'One of the 114 chapters of the Qur\'an. (A sutra, by contrast, is a Buddhist or Hindu teaching text.)',
            3: 'One of the 114 chapters of the Qur\'an, revealed in Arabic. Not to be confused with a sutra: a Buddhist (or Hindu) teaching text.'
          }
        },
        {
          term: 'commentary',
          def: {
            1: 'Writings that explain a sacred text.',
            2: 'Writings that interpret a sacred text — the Mishnah and Talmud in Judaism, hadith collections in Islam.',
            3: 'Writings that interpret a sacred text — the Mishnah and Talmud in Judaism, hadith collections in Islam. A commentary is a secondary source about the text.'
          }
        },
        {
          term: 'primary source',
          def: {
            1: 'The text itself, or an eyewitness or interview.',
            2: 'The text itself (or an eyewitness, an interview). A secondary source is writing about the text: textbooks, articles, reviews.',
            3: 'The text itself (or an eyewitness, an interview). A secondary source is writing about the text: textbooks, articles, reviews. A sacred text in translation is still primary; an encyclopedia article about it is secondary.'
          }
        },
        // Lesson 3
        {
          term: 'precept',
          def: {
            1: 'A rule for action that comes from a tradition\'s teachings.',
            2: 'A rule or principle for action, derived from a tradition\'s teachings.',
            3: 'A rule or principle for action, derived from a tradition\'s teachings (e.g. "right speech" in the Eightfold Path). The curriculum\'s word for E2.2.'
          }
        },
        {
          term: 'beatitude',
          def: {
            1: 'A "Blessed are…" saying from Jesus\' Sermon on the Mount.',
            2: 'A statement of blessing — "Blessed are…" — in Jesus\' Sermon on the Mount.',
            3: 'A statement of blessing — "Blessed are…" — in Jesus\' Sermon on the Mount (Gospel of Matthew, chapter 5; a shorter version in Luke). There are eight.'
          }
        },
        {
          term: 'dukkha',
          def: {
            1: 'The Buddhist word for suffering or unease.',
            2: 'The Buddhist term for suffering, dissatisfaction, or unease — the problem the Eightfold Path addresses.',
            3: 'The Buddhist term for suffering, dissatisfaction, or unease — the problem the Eightfold Path addresses. The first of the Four Noble Truths is that dukkha exists.'
          }
        },
        {
          term: 'nirvana',
          def: {
            1: 'In Buddhism, the end of suffering; the goal of the path.',
            2: 'In Buddhism, the end of suffering and of the cycle of rebirth; the goal of the path.',
            3: 'In Buddhism, the end of suffering and of the cycle of rebirth; the goal of the path. The third Noble Truth: suffering can end.'
          }
        },
        {
          term: 'Anishinaabe',
          def: {
            1: 'The Ojibwe, Odawa, Potawatomi, and related Great Lakes nations.',
            2: 'The Ojibwe, Odawa, Potawatomi, and related nations of the Great Lakes region, including much of Ontario.',
            3: 'The Ojibwe, Odawa, Potawatomi, and related nations of the Great Lakes region, including much of Ontario (pronounced roughly ah-nish-in-AH-bay). The Seven Grandfather Teachings are Anishinaabe.'
          }
        },
        {
          term: 'virtue',
          def: {
            1: 'A good quality of character, like honesty or courage.',
            2: 'A quality of good character — honesty, courage, humility — that a teaching asks people to practise.',
            3: 'A quality of good character — honesty, courage, humility — that a teaching asks people to practise (e.g. each of the Seven Grandfather Teachings names a virtue).'
          }
        },
        // Lesson 4
        {
          term: 'prophet',
          def: {
            1: 'A person believed to speak for the divine.',
            2: 'A person believed to speak on behalf of the divine; in Islam, Muhammad is the final prophet.',
            3: 'A person believed to speak on behalf of the divine; in Islam, Muhammad is the final prophet. Muslims believe the Qur\'an was revealed to him from 610 to 632 CE.'
          }
        },
        {
          term: 'revitalization',
          def: {
            1: 'A movement that renews a community after a crisis.',
            2: 'A movement that renews a community\'s identity and practices after a crisis.',
            3: 'A movement that renews a community\'s identity and practices after a crisis (e.g. the Code of Handsome Lake). Also describes language and ceremony revival in Indigenous communities today.'
          }
        },
        {
          term: 'epistle',
          def: {
            1: 'A letter, especially a New Testament letter from Paul.',
            2: 'A letter, especially one of the New Testament letters written to early Christian communities.',
            3: 'A letter, especially one of the New Testament letters written to early Christian communities (e.g. Paul\'s letters to Corinth, Galatia, and Thessalonica, from roughly 50 CE onward).'
          }
        },
        {
          term: 'umma',
          def: {
            1: 'The worldwide community of Muslims.',
            2: 'The worldwide community of Muslims.',
            3: 'The worldwide community of Muslims, for whom the Qur\'an became both scripture and law. Returns in Unit 4 (Sunni, Shia, Ismaili).'
          }
        },
        {
          term: 'Longhouse religion',
          def: {
            1: 'The Haudenosaunee tradition that follows the Code of Handsome Lake.',
            2: 'The Haudenosaunee tradition that follows the Code of Handsome Lake (Gaiwiio, "the Good Word").',
            3: 'The Haudenosaunee tradition that follows the Code of Handsome Lake (Gaiwiio, "the Good Word"), still practised on Six Nations of the Grand River.'
          }
        },
        // Lesson 5
        {
          term: 'Golden Rule',
          def: {
            1: 'Treat others as you would want to be treated.',
            2: 'The precept of reciprocity: treat others as you would want to be treated (positive form) or do not do to others what you would not want done to you (negative form).',
            3: 'The precept of reciprocity: treat others as you would want to be treated (positive form, e.g. Matthew 7:12) or do not do to others what you would not want done to you (negative form, e.g. Hillel, Analects 15:23).'
          }
        },
        {
          term: 'reciprocity',
          def: {
            1: 'Mutual exchange: what you give, you may expect back.',
            2: 'Mutual exchange: what you give, you may expect; what you take, you owe.',
            3: 'Mutual exchange: what you give, you may expect; what you take, you owe. Confucius named reciprocity as the one word to guide a whole life.'
          }
        },
        {
          term: 'ethic of care',
          def: {
            1: 'Moral teaching about looking after others, especially the vulnerable.',
            2: 'Moral teaching centred on responsibility for others\' wellbeing, especially the vulnerable.',
            3: 'Moral teaching centred on responsibility for others\' wellbeing, especially the vulnerable (e.g. zakat in Islam, langar in Sikhism, the Torah\'s field edges for the poor).'
          }
        },
        {
          term: 'synthesis',
          def: {
            1: 'Combining several sources into one conclusion.',
            2: 'Combining information from several sources into a single conclusion (A3.5).',
            3: 'Combining information from several sources into a single conclusion (A3.5). A conclusion is a claim plus supporting evidence plus limiting evidence.'
          }
        },
        {
          term: 'convergence',
          def: {
            1: 'Different traditions reaching similar teachings by different paths.',
            2: 'Different traditions arriving at similar teachings by different paths.',
            3: 'Different traditions arriving at similar teachings by different paths (e.g. the Golden Rule in Judaism, Christianity, Islam, Confucianism, and Hinduism). Convergence does not mean the traditions are "all the same".'
          }
        },
        // Lesson 6
        {
          term: 'sacred story',
          def: {
            1: 'A story a tradition treats as carrying truth about the divine or the world.',
            2: 'A narrative a tradition treats as carrying truth about the divine, the world, or the community — whether or not it is read as history.',
            3: 'A narrative a tradition treats as carrying truth about the divine, the world, or the community — whether or not it is read as history (e.g. the Book of Esther, the Ramayana, Sky Woman).'
          }
        },
        {
          term: 'festival',
          def: {
            1: 'A community celebration that happens again each year, often recalling a sacred story.',
            2: 'A recurring community celebration, often re-enacting or recalling a sacred story.',
            3: 'A recurring community celebration, often re-enacting or recalling a sacred story (e.g. Purim, Diwali, the Green Corn Festival).'
          }
        },
        {
          term: 're-enactment',
          def: {
            1: 'Doing again in ritual what a story tells.',
            2: 'Doing again, in ritual, what a story tells — eating what the ancestors ate, lighting what they lit.',
            3: 'Doing again, in ritual, what a story tells — eating what the ancestors ate, lighting what they lit (e.g. lighting diyas at Diwali to recall the lamps of Ayodhya).'
          }
        },
        {
          term: 'iconography',
          def: {
            1: 'The symbols a tradition\'s art uses to show its figures and stories.',
            2: 'The set of symbols and conventions by which a tradition\'s art shows its figures and stories.',
            3: 'The set of symbols and conventions by which a tradition\'s art shows its figures and stories (e.g. a halo, a lotus, Ganesha\'s elephant head, Krishna\'s flute).'
          }
        },
        {
          term: 'patron',
          def: {
            1: 'The person or group that orders and pays for a work of art.',
            2: 'The person or body that orders and pays for (commissions) a work of art, shaping what it shows.',
            3: 'The person or body that orders and pays for a work of art — the commission — shaping what it shows (e.g. the Canadian Embassy commission for Spirit of Haida Gwaii, 1991).'
          }
        },
        {
          term: 'interpretation',
          def: {
            1: 'An artist\'s choices about how to show a story.',
            2: 'An artist\'s choices about how to show a story: what to include, emphasize, or change.',
            3: 'An artist\'s choices about how to show a story: what to include, emphasize, or change (e.g. Leonardo setting the Last Supper in Renaissance Italy).'
          }
        }
      ],

      questions: [
        // Lesson 1
        {
          type: 'mc',
          cat: 'L1 Written and Spoken',
          prompt: 'Which statement best describes an oral teaching?',
          answer: 'Sacred beliefs transmitted through the spoken word, story, and ceremony',
          options: {
            1: ['Sacred beliefs transmitted through the spoken word, story, and ceremony', 'A recipe for baking bread'],
            2: ['A text with fixed wording copied carefully', 'Sacred beliefs transmitted through the spoken word, story, and ceremony', 'A translation of scripture'],
            3: ['A text with fixed wording copied carefully', 'Sacred beliefs transmitted through the spoken word, story, and ceremony', 'A translation of scripture', 'A commentary written by scholars']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Written and Spoken',
          prompt: 'The Hiawatha Belt is described as both a sacred writing and an oral teaching because…',
          answer: 'its symbols record the Confederacy\'s founding but must be recited by a trained speaker',
          options: {
            1: ['its symbols record the Confederacy\'s founding but must be recited by a trained speaker', 'it is a bus ticket'],
            2: ['it is written in two languages', 'its symbols record the Confederacy\'s founding but must be recited by a trained speaker', 'it was printed in a book in 1800'],
            3: ['it is written in two languages', 'its symbols record the Confederacy\'s founding but must be recited by a trained speaker', 'it was printed in a book in 1800', 'it is kept in a museum']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Written and Spoken',
          prompt: 'In a sacred writing, where does authority mainly sit?',
          answer: 'in the text itself and those trained to interpret it',
          options: {
            1: ['in the text itself and those trained to interpret it', 'in the weather'],
            2: ['in the text itself and those trained to interpret it', 'in the teller, such as an Elder', 'in the museum that owns it'],
            3: ['in the text itself and those trained to interpret it', 'in the teller, such as an Elder', 'in the museum that owns it', 'in the government that prints it']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Written and Spoken',
          prompt: 'The tree at the centre of the Hiawatha Belt stands for which nation, where the leaders buried their weapons?',
          answer: 'Onondaga',
          options: {
            1: ['Onondaga', 'France'],
            2: ['Onondaga', 'Mohawk', 'Seneca'],
            3: ['Onondaga', 'Mohawk', 'Seneca', 'Cayuga']
          }
        },
        {
          type: 'tf',
          cat: 'L1 Written and Spoken',
          prompt: 'Most sacred writings began as oral recitation before they were written down.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L1 Written and Spoken',
          prompt: 'Most sacred writings were written down first and only later recited aloud.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L1 Written and Spoken',
          prompt: 'The design of the Hiawatha Belt is now the Haudenosaunee flag.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L1 Written and Spoken',
          prompt: 'Oral teachings have fixed wording that is copied carefully so the words never change.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L1 Written and Spoken',
          prompt: 'Both sacred writings and oral teachings carry law, history, ethics, and ritual.',
          answer: true
        },
        {
          type: 'fill',
          cat: 'L1 Written and Spoken',
          prompt: 'The Hiawatha Belt is made of purple and white shell beads called ___.',
          answer: 'wampum',
          bank: ['wampum', 'scripture', 'canon', 'revelation']
        },
        {
          type: 'fill',
          cat: 'L1 Written and Spoken',
          prompt: 'The official list of writings a tradition accepts as its scripture is its ___.',
          answer: 'canon',
          bank: ['canon', 'wampum', 'revelation', 'oral teaching']
        },
        {
          type: 'fill',
          cat: 'L1 Written and Spoken',
          prompt: 'A trained speaker "reads" the Hiawatha Belt aloud by reciting the Great Law of ___.',
          answer: 'Peace',
          bank: ['Peace', 'Trade', 'Harvest', 'Kings']
        },
        {
          type: 'match',
          cat: 'L1 Written and Spoken',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['canon', 'the official list of writings a tradition accepts as scripture'],
            ['Great Law of Peace', 'the oral constitution of the Haudenosaunee Confederacy, recorded in wampum'],
            ['oral teaching', 'sacred beliefs passed on through the spoken word, story, and ceremony'],
            ['scripture', 'sacred writings regarded as authoritative within a tradition'],
            ['revelation', 'knowledge believed to be communicated by the divine to humans'],
            ['wampum', 'belts and strings of shell beads that record laws, agreements, and history']
          ]
        },
        // Lesson 2
        {
          type: 'mc',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'The Rig Veda is best described as…',
          answer: 'a collection of hymns chanted at fire rituals, c. 1500–1200 BCE',
          options: {
            1: ['a collection of hymns chanted at fire rituals, c. 1500–1200 BCE', 'a modern comic book'],
            2: ['a narrative epic about a royal war', 'a collection of hymns chanted at fire rituals, c. 1500–1200 BCE', 'a code of law from 1799'],
            3: ['a narrative epic about a royal war', 'a collection of hymns chanted at fire rituals, c. 1500–1200 BCE', 'a code of law from 1799', 'a chronicle of Japan\'s origins']
          }
        },
        {
          type: 'mc',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'The Bhagavad Gita is part of which larger work?',
          answer: 'the Mahabharata',
          options: {
            1: ['the Mahabharata', 'the phone book'],
            2: ['the Ramayana', 'the Rig Veda', 'the Mahabharata'],
            3: ['the Ramayana', 'the Rig Veda', 'the Mahabharata', 'the Tripitaka']
          }
        },
        {
          type: 'mc',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'The scripture shared by Judaism and Christianity is…',
          answer: 'the Hebrew Bible (Tanakh / Old Testament)',
          options: {
            1: ['the Hebrew Bible (Tanakh / Old Testament)', 'the Kojiki'],
            2: ['the New Testament', 'the Mishnah', 'the Hebrew Bible (Tanakh / Old Testament)'],
            3: ['the New Testament', 'the Mishnah', 'the Hebrew Bible (Tanakh / Old Testament)', 'the Talmud']
          }
        },
        {
          type: 'mc',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'The Kojiki (712 CE) is a sacred chronicle of…',
          answer: 'Shinto',
          options: {
            1: ['Shinto', 'hockey'],
            2: ['Shinto', 'Buddhism', 'Sikhism'],
            3: ['Shinto', 'Buddhism', 'Sikhism', 'Jainism']
          }
        },
        {
          type: 'mc',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'Which of the four source-assessment questions asks whether a text comes from the community itself or from an outsider\'s retelling?',
          answer: 'Whose voice is present or absent?',
          options: {
            1: ['Whose voice is present or absent?', 'What colour is the cover?'],
            2: ['Whose voice is present or absent?', 'What is it?', 'How long is it?'],
            3: ['Whose voice is present or absent?', 'What is it?', 'How long is it?', 'Who made it, and why?']
          }
        },
        {
          type: 'tf',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'The New Testament contains 27 books, including four Gospels and letters by Paul.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'Shruti ("what is heard") texts such as the Vedas are considered revealed, while smriti texts such as the epics are considered composed by humans.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'The Qur\'an is often called "the Muslim Bible" by Muslims themselves.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'A sacred text read in translation is still a primary source.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'The Mishnah is a Hindu epic about a war between two branches of a royal family.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'The Qur\'an has 114 chapters, each called a ___.',
          answer: 'surah',
          bank: ['surah', 'sutra', 'epic', 'Gospel']
        },
        {
          type: 'fill',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'The Tripitaka, the "three baskets" of Buddhist scripture, was written down in the ___ language.',
          answer: 'Pali',
          bank: ['Pali', 'Greek', 'Hebrew', 'Arabic']
        },
        {
          type: 'match',
          cat: 'L2 The World\'s Sacred Texts',
          prompt: 'Match each sacred text to its description.',
          pairs: [
            ['Tanakh', 'the Hebrew Bible: Torah, Prophets, and Writings'],
            ['Mishnah', 'Jewish oral law written down around 200 CE'],
            ['Tripitaka', 'the "three baskets" of Buddhist scripture, written in Pali'],
            ['Jatakas', 'stories of the Buddha\'s previous lives teaching generosity and compassion'],
            ['Kojiki', 'Japan\'s oldest chronicle, the foundation of Shinto\'s sacred stories'],
            ['Guru Granth Sahib', 'hymns of the Sikh Gurus, declared the eternal living Guru'],
            ['Rig Veda', 'the oldest of the four Vedas, hymns sung at fire rituals'],
            ['Bhagavad Gita', 'Krishna teaches Arjuna about duty, devotion, and the self']
          ]
        },
        // Lesson 3
        {
          type: 'mc',
          cat: 'L3 Living by the Words',
          prompt: 'The Beatitudes teach that blessing belongs to…',
          answer: 'the humble, the merciful, and the peacemakers',
          options: {
            1: ['the humble, the merciful, and the peacemakers', 'the fastest runners'],
            2: ['the powerful and wealthy', 'the humble, the merciful, and the peacemakers', 'those who keep every law perfectly'],
            3: ['the powerful and wealthy', 'the humble, the merciful, and the peacemakers', 'those who keep every law perfectly', 'rulers and generals']
          }
        },
        {
          type: 'mc',
          cat: 'L3 Living by the Words',
          prompt: 'The Eightfold Path is central to Buddhism because it is…',
          answer: 'the practical method for ending suffering',
          options: {
            1: ['the practical method for ending suffering', 'a recipe for soup'],
            2: ['a list of gods to worship', 'the practical method for ending suffering', 'the story of the Buddha\'s birth'],
            3: ['a list of gods to worship', 'the practical method for ending suffering', 'the story of the Buddha\'s birth', 'a code of law for kings']
          }
        },
        {
          type: 'mc',
          cat: 'L3 Living by the Words',
          prompt: 'Which is NOT one of the Seven Grandfather Teachings?',
          answer: 'wealth',
          options: {
            1: ['wealth', 'honesty'],
            2: ['humility', 'bravery', 'wealth'],
            3: ['humility', 'bravery', 'wealth', 'truth']
          }
        },
        {
          type: 'mc',
          cat: 'L3 Living by the Words',
          prompt: 'In which Gospel, at the start of the Sermon on the Mount, are the Beatitudes found?',
          answer: 'Matthew',
          options: {
            1: ['Matthew', 'Harry Potter'],
            2: ['Matthew', 'Mark', 'John'],
            3: ['Matthew', 'Mark', 'John', 'Acts']
          }
        },
        {
          type: 'mc',
          cat: 'L3 Living by the Words',
          prompt: 'Right speech, right action, and right livelihood belong to which group of the Eightfold Path?',
          answer: 'conduct',
          options: {
            1: ['conduct', 'cooking'],
            2: ['conduct', 'wisdom', 'mind'],
            3: ['conduct', 'wisdom', 'mind', 'rebirth']
          }
        },
        {
          type: 'tf',
          cat: 'L3 Living by the Words',
          prompt: 'The Seven Grandfather Teachings come from the Anishinaabe.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L3 Living by the Words',
          prompt: 'The Seven Grandfather Teachings come from the Haudenosaunee.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L3 Living by the Words',
          prompt: 'The Eightfold Path has three groups: wisdom, conduct, and mind.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L3 Living by the Words',
          prompt: 'The Eightfold Path is the first of the Four Noble Truths.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L3 Living by the Words',
          prompt: 'The Buddhist term for suffering or dissatisfaction is ___.',
          answer: 'dukkha',
          bank: ['dukkha', 'nirvana', 'precept', 'virtue']
        },
        {
          type: 'fill',
          cat: 'L3 Living by the Words',
          prompt: 'Many Ontario school boards adopted the Seven Grandfather Teachings after the Truth and Reconciliation Commission\'s Calls to Action in ___.',
          answer: '2015',
          bank: ['2015', '1999', '2008', '1867']
        },
        {
          type: 'match',
          cat: 'L3 Living by the Words',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['precept', 'a rule or principle for action derived from a tradition\'s teachings'],
            ['beatitude', 'a statement of blessing in Jesus\' Sermon on the Mount'],
            ['dukkha', 'the Buddhist term for suffering or dissatisfaction'],
            ['nirvana', 'the end of suffering and of the cycle of rebirth'],
            ['virtue', 'a quality of good character a teaching asks people to practise'],
            ['Anishinaabe', 'the Ojibwe, Odawa, Potawatomi, and related Great Lakes nations']
          ]
        },
        {
          type: 'match',
          cat: 'L3 Living by the Words',
          prompt: 'Match each teaching to its frame.',
          pairs: [
            ['Beatitudes', 'blessings pronounced by Jesus; the frame is God\'s kingdom'],
            ['Eightfold Path', 'a training method; the frame is ending suffering'],
            ['Seven Grandfather Teachings', 'gifts for living in balance with creation']
          ]
        },
        // Lesson 4
        {
          type: 'mc',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'The Qur\'an is believed by Muslims to have been revealed…',
          answer: 'gradually over about 23 years (610–632 CE)',
          options: {
            1: ['gradually over about 23 years (610–632 CE)', 'by email last week'],
            2: ['all at once in a single night', 'gradually over about 23 years (610–632 CE)', 'to the Prophet\'s companions after his death'],
            3: ['all at once in a single night', 'gradually over about 23 years (610–632 CE)', 'to the Prophet\'s companions after his death', 'in Greek']
          }
        },
        {
          type: 'mc',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'The Code of Handsome Lake arose in 1799 among the…',
          answer: 'Seneca',
          options: {
            1: ['Seneca', 'Vikings'],
            2: ['Mohawk', 'Seneca', 'Cree'],
            3: ['Mohawk', 'Seneca', 'Cree', 'Haida']
          }
        },
        {
          type: 'mc',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'The letters of Paul reveal that early Christian communities…',
          answer: 'were small, mixed Jewish and non-Jewish groups facing disputes and persecution',
          options: {
            1: ['were small, mixed Jewish and non-Jewish groups facing disputes and persecution', 'played video games together'],
            2: ['met in large cathedrals', 'were small, mixed Jewish and non-Jewish groups facing disputes and persecution', 'had no contact with one another'],
            3: ['met in large cathedrals', 'were small, mixed Jewish and non-Jewish groups facing disputes and persecution', 'had no contact with one another', 'all lived in Jerusalem']
          }
        },
        {
          type: 'mc',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'Which part of the Tripitaka sets the rules for monks and nuns, making Buddhism a tradition organized around monastic communities?',
          answer: 'the Vinaya',
          options: {
            1: ['the Vinaya', 'the dictionary'],
            2: ['the Vinaya', 'the Sutras', 'the Jatakas'],
            3: ['the Vinaya', 'the Sutras', 'the Jatakas', 'the Kojiki']
          }
        },
        {
          type: 'tf',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'Handsome Lake\'s Code banned alcohol and the selling of land.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'Handsome Lake\'s Code encouraged the Haudenosaunee to sell their land and move to cities.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'The word "Qur\'an" means recitation.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'Paul\'s letters were written after the Gospels and are the latest writings in the New Testament.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'Each of the four sources in this lesson was carried orally before it was written down.',
          answer: true
        },
        {
          type: 'fill',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'Handsome Lake\'s teaching is called the Gaiwiio, which means "the Good ___".',
          answer: 'Word',
          bank: ['Word', 'Land', 'Harvest', 'River']
        },
        {
          type: 'fill',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'The worldwide community of Muslims is called the ___.',
          answer: 'umma',
          bank: ['umma', 'sangha', 'epistle', 'canon']
        },
        {
          type: 'fill',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'The Longhouse religion that follows the Code of Handsome Lake continues today on ___ Nations of the Grand River.',
          answer: 'Six',
          bank: ['Six', 'Five', 'Seven', 'Three']
        },
        {
          type: 'match',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['revitalization', 'a movement renewing a community\'s identity after a crisis'],
            ['epistle', 'a New Testament letter to an early Christian community'],
            ['umma', 'the worldwide community of Muslims'],
            ['prophet', 'a person believed to speak on behalf of the divine'],
            ['Longhouse religion', 'the Haudenosaunee tradition that follows the Code of Handsome Lake'],
            ['sangha', 'the Buddhist monastic community organized by the Vinaya']
          ]
        },
        {
          type: 'match',
          cat: 'L4 How Texts Shaped Traditions',
          prompt: 'Match each source to where its authority comes from.',
          pairs: [
            ['Code of Handsome Lake', 'visions'],
            ['Qur\'an', 'revelation'],
            ['letters of Paul', 'apostolic teaching'],
            ['Tripitaka', 'the Buddha\'s discourses']
          ]
        },
        // Lesson 5
        {
          type: 'mc',
          cat: 'L5 The Golden Rule',
          prompt: 'The "negative form" of the Golden Rule says…',
          answer: 'do not do to others what you would not want done to you',
          options: {
            1: ['do not do to others what you would not want done to you', 'always eat dessert first'],
            2: ['do to others what you want done to you', 'do not do to others what you would not want done to you', 'love your enemies'],
            3: ['do to others what you want done to you', 'do not do to others what you would not want done to you', 'love your enemies', 'give to the poor']
          }
        },
        {
          type: 'mc',
          cat: 'L5 The Golden Rule',
          prompt: 'Asked for one word to guide a whole life, Confucius answered…',
          answer: 'reciprocity',
          options: {
            1: ['reciprocity', 'pizza'],
            2: ['reciprocity', 'wealth', 'silence'],
            3: ['reciprocity', 'wealth', 'silence', 'victory']
          }
        },
        {
          type: 'mc',
          cat: 'L5 The Golden Rule',
          prompt: 'Which Christian source gives the Golden Rule in the Sermon on the Mount: "in everything, do to others what you would have them do to you"?',
          answer: 'Matthew 7:12',
          options: {
            1: ['Matthew 7:12', 'a weather report'],
            2: ['Matthew 7:12', 'Leviticus 19:18', 'Analects 15:23'],
            3: ['Matthew 7:12', 'Leviticus 19:18', 'Analects 15:23', 'the Mahabharata']
          }
        },
        {
          type: 'mc',
          cat: 'L5 The Golden Rule',
          prompt: 'Which precept of care for the vulnerable is the Sikh free kitchen open to all?',
          answer: 'langar',
          options: {
            1: ['langar', 'hockey practice'],
            2: ['langar', 'zakat', 'ahimsa'],
            3: ['langar', 'zakat', 'ahimsa', 'dharma']
          }
        },
        {
          type: 'tf',
          cat: 'L5 The Golden Rule',
          prompt: 'The Golden Rule appears in many traditions, including Judaism, Christianity, Islam, and Confucianism.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L5 The Golden Rule',
          prompt: 'The Golden Rule appears in only one tradition.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L5 The Golden Rule',
          prompt: 'Hillel said that what is hateful to you, you should not do to another, and the rest is commentary.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L5 The Golden Rule',
          prompt: 'Because so many traditions teach the Golden Rule, the lesson concludes that the traditions are basically all the same.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L5 The Golden Rule',
          prompt: 'The Code of Handsome Lake adds duties to the land and to the Creator that the Golden Rule alone does not state.',
          answer: true
        },
        {
          type: 'fill',
          cat: 'L5 The Golden Rule',
          prompt: 'In Islam, ___ is a required share of wealth for those in need and a pillar of the faith.',
          answer: 'zakat',
          bank: ['zakat', 'langar', 'ahimsa', 'hadith']
        },
        {
          type: 'fill',
          cat: 'L5 The Golden Rule',
          prompt: 'In Jainism, ___ means non-violence toward all living things and is the first vow.',
          answer: 'ahimsa',
          bank: ['ahimsa', 'dharma', 'zakat', 'dukkha']
        },
        {
          type: 'match',
          cat: 'L5 The Golden Rule',
          prompt: 'Match each tradition to the source of its Golden Rule.',
          pairs: [
            ['Judaism', 'Leviticus 19:18 and the teacher Hillel'],
            ['Christianity', 'Matthew 7:12, the Sermon on the Mount'],
            ['Islam', 'a hadith of the Prophet Muhammad'],
            ['Confucianism', 'Analects 15:23'],
            ['Hinduism', 'the Mahabharata']
          ]
        },
        {
          type: 'match',
          cat: 'L5 The Golden Rule',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['reciprocity', 'mutual exchange: what you give, you may expect'],
            ['ethic of care', 'responsibility for others\' wellbeing, especially the vulnerable'],
            ['synthesis', 'combining several sources into a single conclusion'],
            ['convergence', 'different traditions arriving at similar teachings by different paths']
          ]
        },
        // Lesson 6
        {
          type: 'mc',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'At Purim, the congregation drowns out the name of…',
          answer: 'Haman',
          options: {
            1: ['Haman', 'the school principal'],
            2: ['Esther', 'Mordecai', 'Haman'],
            3: ['Esther', 'Mordecai', 'Haman', 'Rama']
          }
        },
        {
          type: 'mc',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'In Bill Reid\'s Spirit of Haida Gwaii, the figure holding the steering oar is…',
          answer: 'Raven',
          options: {
            1: ['Raven', 'a robot'],
            2: ['the shaman', 'Raven', 'Grizzly Bear'],
            3: ['the shaman', 'Raven', 'Grizzly Bear', 'Eagle']
          }
        },
        {
          type: 'mc',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'At Purim, the whole Book of Esther is read aloud from a scroll called the…',
          answer: 'Megillah',
          options: {
            1: ['Megillah', 'menu'],
            2: ['Megillah', 'Mishnah', 'Tanakh'],
            3: ['Megillah', 'Mishnah', 'Tanakh', 'Talmud']
          }
        },
        {
          type: 'mc',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'In the Ramayana, who helps Rama defeat Ravana and rescue Sita?',
          answer: 'Hanuman, the monkey general',
          options: {
            1: ['Hanuman, the monkey general', 'a hockey team'],
            2: ['Hanuman, the monkey general', 'Haman, the king\'s adviser', 'Krishna, the charioteer'],
            3: ['Hanuman, the monkey general', 'Haman, the king\'s adviser', 'Krishna, the charioteer', 'Mordecai, Esther\'s cousin']
          }
        },
        {
          type: 'mc',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'Which element of Leonardo\'s Last Supper is faithful to the Gospel accounts?',
          answer: 'thirteen figures with bread and wine on the table',
          options: {
            1: ['thirteen figures with bread and wine on the table', 'a spaceship in the window'],
            2: ['thirteen figures with bread and wine on the table', 'Renaissance Italian clothing and architecture', 'everyone seated on one side of a long table'],
            3: ['thirteen figures with bread and wine on the table', 'Renaissance Italian clothing and architecture', 'everyone seated on one side of a long table', 'a daytime window behind the figures']
          }
        },
        {
          type: 'tf',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'Diwali recalls the lamps lit to welcome Rama and Sita home to Ayodhya.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'The Green Corn Festival gives thanks for the first ripe corn and connects to the Sky Woman story.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'Leonardo\'s Last Supper accurately shows first-century Jerusalem clothing and architecture.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'Diwali has only one meaning and is celebrated only by Hindus.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'At Diwali, rows of small oil lamps called ___ are placed in windows and doorways.',
          answer: 'diyas',
          bank: ['diyas', 'graggers', 'murtis', 'surahs']
        },
        {
          type: 'fill',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'The image of Spirit of Haida Gwaii appeared on the Canadian $20 bill from 2004 to ___.',
          answer: '2012',
          bank: ['2012', '1998', '2020', '2004']
        },
        {
          type: 'match',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['iconography', 'the symbols and conventions by which a tradition\'s art shows its figures'],
            ['interpretation', 'an artist\'s choices about what to include, emphasize, or change'],
            ['re-enactment', 'doing again in ritual what a story tells'],
            ['festival', 'a recurring community celebration recalling a sacred story'],
            ['sacred story', 'a narrative a tradition treats as carrying truth'],
            ['patron', 'the person or body that orders and pays for a work of art']
          ]
        },
        {
          type: 'match',
          cat: 'L6 From Story to Festival & Art',
          prompt: 'Match each festival practice to the story event it enacts.',
          pairs: [
            ['drowning out Haman\'s name with graggers', 'Haman\'s plot to destroy the Jews is defeated'],
            ['dressing in costume at Purim', 'Esther\'s hidden identity and the story\'s reversals'],
            ['rows of diyas at Diwali', 'the people of Ayodhya lighting Rama and Sita\'s way home'],
            ['fireworks and sweets at Diwali', 'celebrating victory over Ravana'],
            ['the Thanksgiving Address at the Green Corn Festival', 'giving thanks for the gifts the Sky Woman story explains']
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    /* Unit 3 · Living the Tradition — 8 lessons */
    {
      id: 'practice',
      title: 'Unit 3 · Living the Tradition',
      description: {
        1: 'How people live their traditions through the year and through a life: calendars and festivals, fasts and feasts, symbols, rites of passage, and daily prayer.',
        2: 'How belief traditions keep sacred time — calendars, festivals, fasts and feasts, and the symbols that carry their stories — and how they mark a life through rites of passage and daily observances. Anchored in real cases from the potlatch and Nalukataq to Hindu cremation, the Shema, Salah, and the Five Ks in Canadian public life.',
        3: 'How belief traditions keep sacred time — solar, lunar, and lunisolar calendars, festivals, fasts and feasts, and the symbols that carry their stories — and how they mark a life through birth, coming-of-age, marriage, and death rites and daily observances, ending with how daily practice forms a person and meets a secular world. Expectations covered: D1.1, D1.2, D1.3, D1.4, D1.5, D2.1, D2.2, D2.3, D3.1, D3.2, D3.3, F1.1, F1.2; C2.4 revisited in Lesson 8; E2.3 revisited in Lessons 4 and 6.'
      },

      lessons: [
        // ---- Lesson 1: Sacred Time: Calendars, Cycles, and Seasons ----
        {
          title: 'Sacred Time: Calendars, Cycles, and Seasons',
          slides: [
            {
              title: {
                1: 'Why do holy days move?',
                2: 'Why does Easter move, Christmas stay put, and Ramadan drift?',
                3: 'Why does Easter move, Christmas stay put, and Ramadan drift through every season?'
              },
              visual: '🕰️',
              body: {
                1: 'Think of three dates. Christmas is always December 25. Easter moves a little each year. Ramadan moves through every season.\n\nWhy? Some traditions count the year by the **sun**. Some count by the **moon**. Some use **both**.\n\nToday we learn:\n\n- the three kinds of calendars\n- why a festival falls when it does\n- which observances follow nature and which remember founders',
                2: 'Put three dates side by side: Christmas (Dec 25), Easter 2027 (Mar 28), and Ramadan 2027 (begins Feb 8). One is fixed, one moves within a range, and one moves through the whole year. The answer — sun, moon, and both — is today\'s lesson.\n\n**Learning goals**\n\n- Describe how common celebrations and commemorations are linked to concepts of time.\n- Explain the significance of historical events and natural cycles that traditions commemorate: planting and harvest, migrations of animals, cycles of the moon and sun, the births and deaths of founders.\n- Map this semester\'s observances and explain their timing.\n\n**Success criteria — I can…**\n\n- tell solar, lunar, and lunisolar calendars apart with an example of each\n- explain why a given festival falls when it does\n- name two observances tied to nature\'s cycles and two tied to founders\' lives',
                3: '**Expectations: F1.1, F1.2**\n\nPut three dates side by side: Christmas (Dec 25), Easter 2027 (Mar 28), and Ramadan 2027 (begins Feb 8). One is fixed, one moves within a range, and one moves through the whole year. The answer — sun, moon, and both — is today\'s lesson.\n\n**Learning goals**\n\n- Describe how common celebrations and commemorations are linked to concepts of time (F1.1).\n- Explain the significance of historical events and natural cycles that traditions commemorate: planting and harvest, migrations of animals, cycles of the moon and sun, the births and deaths of founders (F1.2).\n- Map this semester\'s observances and explain their timing.\n\n**Success criteria — I can…**\n\n- tell solar, lunar, and lunisolar calendars apart with an example of each\n- explain why a given festival falls when it does\n- name two observances tied to nature\'s cycles and two tied to founders\' lives\n\n**Think about it:** the unit test asks you to explain the timing of three observances and to compare lunar and solar influence — the curriculum\'s own prompt. Keep the three calendar types in view all lesson; everything else depends on them.'
              }
            },
            {
              title: {
                1: 'Three ways to count a year',
                2: 'Three ways to count a year',
                3: 'Three ways to count a year: solar, lunar, lunisolar'
              },
              visual: '🧭',
              body: {
                1: '| Calendar | Follows | Example |\n| Solar | the sun | Christmas, Dec 25 |\n| Lunar | the moon | Ramadan |\n| Lunisolar | moon + a leap month | Passover |\n\nA **solar** year is about 365 days. Dates stay in the same season.\n\nA **lunar** year has 12 moon months. It is about 11 days shorter. So Ramadan moves about 11 days earlier each year.\n\nA **lunisolar** calendar adds a leap month now and then. So Passover is always in spring.',
                2: '| Calendar type | How it works | Examples |\n| Solar | Follows the sun\'s year (about 365.25 days); dates stay in the same season | Gregorian calendar: Christmas (Dec 25), Remembrance Day (Nov 11), Vaisakhi (Apr 13–14, solar-based) |\n| Lunar | Twelve moon months (about 29.5 days each) with no correction; the year is about 11 days shorter than a solar year | Islamic calendar: Ramadan moves about 11 days earlier each year and circles the seasons every 33 years |\n| Lunisolar | Moon months plus a leap month every two or three years keep festivals in season | Jewish, Chinese, and Hindu calendars: Passover always spring, Rosh Hashanah always autumn, Diwali always autumn, Chinese New Year always late winter |\n\n**Easter is the exception** on the Christian calendar: it is lunisolar — the first Sunday after the first full moon after the spring equinox (March 28 in 2027).\n\nIn 2027 Ramadan runs from about February 8 to March 9, with Eid al-Fitr about March 9–10. Passover falls April 22–29.',
                3: '| Calendar type | How it works | Examples |\n| Solar | Follows the sun\'s year (about 365.25 days); dates stay in the same season | Gregorian calendar: Christmas (Dec 25), Remembrance Day (Nov 11), Vaisakhi (Apr 13–14, on the solar Nanakshahi calendar) |\n| Lunar | Twelve moon months (about 29.5 days each) with no correction; a 12-month lunar year is about 11 days shorter than a solar year | Islamic calendar: Ramadan moves about 11 days earlier each year and circles the seasons every 33 years |\n| Lunisolar | Moon months plus a leap month every two or three years keep festivals in season | Jewish, Chinese, and Hindu calendars: Passover always spring, Rosh Hashanah always autumn, Diwali always autumn, Chinese New Year always late winter |\n\n**Easter is the exception** on the Christian calendar: it is lunisolar — the first Sunday after the first full moon after the spring equinox (March 28 in 2027).\n\nIn 2027 Ramadan runs from about February 8 to March 9, with Eid al-Fitr about March 9–10. Passover falls April 22–29. Islamic dates depend on moon sighting, so they may differ by a day between communities.\n\n**Anchors in the sky:** the equinoxes (equal day and night) fall around March 20 and September 22; the solstices (longest and shortest days) around June 21 and December 21. Many festivals are anchored to them — Nowruz at the spring equinox, Christmas near the winter solstice.\n\n**Think about it:** Ramadan fell in June in 2017 (long fasts) and in February in 2027 (short ones). What might it mean to a Muslim to fast through every season over a lifetime?'
              }
            },
            {
              title: {
                1: 'Real case: why potlatch in winter?',
                2: 'Real case: why potlatch in winter?',
                3: 'Real case: why potlatch in winter? Timing a ceremony to the rhythm of a year'
              },
              visual: '🏔️',
              body: {
                1: '> The potlatch is a ceremony of the Kwakwaka\'wakw, Haida, Tlingit, Nuu-chah-nulth, and other Pacific Northwest nations.\n> A host family invites guests. There is feasting, dancing, and the telling of family histories. The hosts give away wealth to confirm names, rights, marriages, and inheritances.\n> Potlatches are usually held in winter.\n> In spring, summer, and fall, families are spread out. They fish for salmon, gather berries, hunt, and store food.\n> By winter the work is done. The houses are full of food. People are together indoors with time for ceremony.\n> In many of these nations\' teachings, winter is also when the spirit world is closest.',
                2: '> The potlatch is a ceremony of the Kwakwaka\'wakw, Haida, Tlingit, Nuu-chah-nulth, and other Pacific Northwest nations: a host family gathers guests for feasting, dancing, the telling of family histories, and the giving away of wealth to confirm names, rights, marriages, and inheritances.\n> Potlatches are traditionally held in winter. Through spring, summer, and fall, families are dispersed — fishing salmon, gathering berries, hunting, and preserving food. By winter the work is done, the houses are full of stored food, and people are together indoors with time for ceremony.\n> Winter is also the season when, in many of these nations\' teachings, the spirit world is closest and masked dances may be performed.\n\nCanada banned the potlatch from 1885 to 1951 (Unit 1).',
                3: '> The potlatch is a ceremony of the Kwakwaka\'wakw, Haida, Tlingit, Nuu-chah-nulth, and other Pacific Northwest nations: a host family gathers guests for feasting, dancing, the telling of family histories, and the giving away of wealth to confirm names, rights, marriages, and inheritances.\n> Potlatches are traditionally held in winter. Through spring, summer, and fall, families are dispersed — fishing salmon, gathering berries, hunting, and preserving food. By winter the work is done, the houses are full of stored food, and people are together indoors with time for ceremony.\n> Winter is also the season when, in many of these nations\' teachings, the spirit world is closest and masked dances may be performed.\n\n**Think about it**\n\n- List three practical reasons a potlatch makes more sense in winter than in summer.\n- What does the timing show about the relationship between daily work and sacred time?\n- Canada banned the potlatch from 1885 to 1951 (Unit 1). Why would banning a winter ceremony attack a whole year\'s rhythm?\n\n**From the teacher notes:** the ban was lifted in the Indian Act revision of 1951. Because the ceremony confirmed names, marriages, and inheritances, banning it disrupted law and family, not just a party. The curriculum frames the \'why winter?\' question as reasoning from practical life — the fishing and gathering season ends, people are together indoors — rather than from mysticism. The redistribution of goods at the potlatch (D1.4) returns in Lesson 3.'
              }
            },
            {
              title: {
                1: 'Why these dates? Nature and founders',
                2: 'Why these dates? Nature\'s cycles, founders, and events',
                3: 'Why these dates? Nature\'s cycles, founders, and events'
              },
              visual: '🌍',
              body: {
                1: 'Some festivals follow **nature**.\n\n- Sukkot (Judaism) is a harvest festival.\n- First Salmon ceremonies welcome the spring salmon run.\n- Qingming (Chinese tradition) happens in early April. Families clean the graves of their ancestors as spring returns.\n\nSome festivals remember **founders and events**.\n\n- Wesak marks the Buddha\'s birth, enlightenment, and death.\n- Vaisakhi marks the founding of the Khalsa in 1699.\n- Hanukkah remembers the rededication of the Temple.\n\nEvery festival answers two questions: **what** happened, and **when** we remember it.',
                2: '**Planting and harvest**\n\n- Sukkot and Shavuot (Judaism): harvest festivals with the Exodus story layered on\n- Green Corn Festival (Haudenosaunee): first ripe corn, late summer\n- Pongal and Onam (Hindu communities of South India): rice harvest\n\n**Migrations, moon, and sun**\n\n- Monarch butterflies arrive in central Mexico around Día de los Muertos (Nov 1–2); many families see them as returning souls\n- First Salmon ceremonies (Pacific Northwest nations) welcome the spring run with thanks and return the first bones to the river\n- Qingming (Chinese tradition, early April): sweeping ancestors\' graves as spring returns — honouring the dead as life renews\n\n**Founders and events**\n\n- Births and deaths of founders: Wesak (the Buddha, May full moon), Christmas (Jesus\' birth), Mawlid (Muhammad\'s birth), Guru Nanak\'s birthday (Gurpurab, November)\n- Founding events: Vaisakhi (1699, the founding of the Khalsa by Guru Gobind Singh), Pentecost, Passover (the Exodus)\n- Deliverance and victory: Purim (Esther), Hanukkah (the rededication of the Temple, 164 BCE), Diwali (Rama\'s return)\n\n**Pattern:** every festival answers two questions — what happened (the story) and when we remember it (the calendar).',
                3: '**Planting and harvest**\n\n- Sukkot and Shavuot (Judaism): harvest festivals with the Exodus story layered on\n- Green Corn Festival (Haudenosaunee): first ripe corn, late summer\n- Pongal and Onam (Hindu communities of South India): rice harvest\n- Thanksgiving (civic, Canada): second Monday of October, harvest\n\n**Migrations, moon, and sun**\n\n- Monarch butterflies arrive in central Mexico around Día de los Muertos (Nov 1–2); many families see them as returning souls\n- First Salmon ceremonies (Pacific Northwest nations) welcome the spring run with thanks and return the first bones to the river\n- Qingming (Chinese tradition, early April): sweeping ancestors\' graves as spring returns — honouring the dead as life renews. Qingming falls about 15 days after the spring equinox (April 4 or 5); families clean graves, offer food, and go outdoors. The return of life in spring is the fitting time to care for those who gave life to the family.\n\n**Founders and events**\n\n- Births and deaths of founders: Wesak (the Buddha\'s birth, enlightenment, and death, May full moon), Christmas (Jesus\' birth), Mawlid (Muhammad\'s birth, observed by many Muslims), Guru Nanak\'s birthday (Gurpurab, November)\n- Founding events: Vaisakhi (1699, the founding of the Khalsa by Guru Gobind Singh), Pentecost (the Spirit descending on the disciples), Passover (the Exodus)\n- Deliverance and victory: Purim (Esther), Hanukkah (the rededication of the Temple, 164 BCE), Diwali (Rama\'s return)\n- Civic commemorations work the same way: Remembrance Day (the armistice, Nov 11, 1918), National Indigenous Peoples Day (June 21, the summer solstice — set in 1996 because of the solstice\'s significance for many Indigenous nations)\n\n**Worked example — Vaisakhi:** it is both a spring harvest festival in Punjab and the anniversary of the Khalsa\'s founding in 1699 — a natural cycle and a founding event stacked on one date, as with Sukkot and Passover.\n\n**Think about it:** Qingming cleans graves as spring returns. Why pair death and new life? Parallels: Easter (death and resurrection in spring), Día de los Muertos (monarchs returning), Passover (spring deliverance).'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- Why does Ramadan move through the seasons, while Passover stays in spring?\n- Give two reasons the potlatch is held in winter.\n\nThis semester (Feb–June 2027) many observances cluster near the spring equinox: Holi, Purim, Nowruz, Easter, Passover, and Vaisakhi all mark renewal in different calendars.',
                2: 'Answer in your notes, then compare with a partner.\n\n- Define solar, lunar, and lunisolar calendars with one tradition each.\n- Why does Ramadan move through the seasons while Passover stays in spring?\n- Name two observances tied to natural cycles and two tied to founders\' lives.\n- Give two reasons the potlatch is held in winter.\n\n**This semester\'s sacred time (February–June 2027):** Ramadan begins Feb 8 (to about Mar 9); Ash Wednesday Feb 10; Holi Mar 22; Purim Mar 23; Good Friday Mar 26; Easter Mar 28; Vaisakhi Apr 14; Passover Apr 22–29; Orthodox Easter May 2; Eid al-Adha May 17; Vesak/Wesak May 20. Also Nowruz and Baha\'i Naw-Rúz on March 21 (spring equinox), Lent Feb 10 – Mar 27, and Shavuot June 11–12.\n\nNotice the clustering around the spring equinox: Holi, Purim, Nowruz, Easter, Passover, and Vaisakhi all mark renewal in different calendars.',
                3: 'Answer in your notes, then compare with a partner.\n\n- Define solar, lunar, and lunisolar calendars with one tradition each.\n- Why does Ramadan move through the seasons while Passover stays in spring?\n- Name two observances tied to natural cycles and two tied to founders\' lives.\n- Give two reasons the potlatch is held in winter.\n\n**This semester\'s sacred time (February–June 2027):** Ramadan begins Feb 8 (to about Mar 9); Ash Wednesday Feb 10; Holi Mar 22; Purim Mar 23; Good Friday Mar 26; Easter Mar 28; Vaisakhi Apr 14; Passover Apr 22–29; Orthodox Easter May 2; Eid al-Adha May 17; Vesak/Wesak May 20. Also Nowruz and Baha\'i Naw-Rúz on March 21 (spring equinox), Lent Feb 10 – Mar 27, and Shavuot June 11–12. Lunar dates may vary by a day with moon sighting — a poster should mark them as approximate and advise teachers to check with students.\n\nNotice the clustering around the spring equinox: Holi, Purim, Nowruz, Easter, Passover, and Vaisakhi all mark renewal in different calendars.\n\n**Think about it**\n\n- Should Canadian schools build their year around the solar calendar only, or make room for lunar and lunisolar observances? What would that look like?\n- \'A tradition\'s calendar tells you what it values.\' Calendars reveal values through what a community stops for; texts reveal what it argues and teaches. Which shows values more clearly?\n- Do civic days such as Remembrance Day (the 1918 armistice) and National Indigenous Peoples Day (the June 21 solstice) count as sacred time? They mark events or cycles and use ritual — silence, ceremony — which is sacred time in a civic form.'
              }
            }
          ]
        },

        // ---- Lesson 2: Festivals and What They Mean ----
        {
          title: 'Festivals and What They Mean',
          slides: [
            {
              title: {
                1: 'What do festivals do?',
                2: 'Festivals and what they mean',
                3: 'Festivals and what they mean: what festivals do'
              },
              visual: '🎉',
              body: {
                1: 'Colour thrown in the street. Candles lit at dusk. A day of fasting and saying sorry. A circle of dancers around a drum.\n\nFestivals are more than fun. Each practice **carries a meaning**.\n\nToday we learn:\n\n- what big festivals mean to their traditions\n- what people actually do at them\n- why many Jews call Yom Kippur the holiest day of the year',
                2: 'Colour thrown in the street, candles lit at dusk, a day of fasting and confession, a circle of dancers around a drum: what festivals do.\n\nThink of the festival you would least want to miss, and why. The \'why\' answers — family, food, feeling, memory — point to what festivals mean to their traditions and how the practices carry that meaning.\n\n**Learning goals**\n\n- Explain the significance of major festivals and commemorations in various traditions.\n- Identify and describe the observances and practices associated with them.\n- Connect each practice to the meaning it carries.\n\n**Success criteria — I can…**\n\n- explain the significance of at least four festivals from different traditions\n- describe two practices for each and what they mean\n- explain why Yom Kippur is considered the holiest day by many Jews',
                3: '**Expectations: D1.1, D1.2**\n\nColour thrown in the street, candles lit at dusk, a day of fasting and confession, a circle of dancers around a drum: what festivals do.\n\nThink of the festival you would least want to miss, and why. The \'why\' answers — family, food, feeling, memory — point to what festivals mean to their traditions and how the practices carry that meaning.\n\n**Learning goals**\n\n- Explain the significance of major festivals and commemorations in various traditions (D1.1).\n- Identify and describe the observances and practices associated with them (D1.2).\n- Connect each practice to the meaning it carries.\n\n**Success criteria — I can…**\n\n- explain the significance of at least four festivals from different traditions\n- describe two practices for each and what they mean\n- explain why Yom Kippur is considered the holiest day by many Jews\n\n**From the teacher notes:** the curriculum prompt for D1.1 is Yom Kippur; D1.2\'s examples are coloured water at Holi, dancing at powwows, Shabbat candles, nativity scenes, Wesak lights, and drumming. All appear in this lesson.\n\n**For your Field Guide:** significance = what the festival remembers or celebrates and why it matters to adherents. Practices = what people actually do. Keep both.'
              }
            },
            {
              title: {
                1: 'Practices and what they mean',
                2: 'Practices and their meaning',
                3: 'Practices and their meaning: what each practice makes people do'
              },
              visual: '🪔',
              body: {
                1: '| Practice | Festival | Meaning |\n| Throwing colour | Holi (Hinduism) | Rank and age do not matter for a day |\n| Dancing to the drum | Powwow | The drum is the heartbeat of the people |\n| Lighting two candles | Shabbat (Judaism) | The line between ordinary time and sacred rest |\n| Nativity scene | Christmas (Christianity) | Makes the story of Jesus\' birth visible |\n| Lanterns and lamps | Wesak (Buddhism) | Light = the Buddha\'s enlightenment |\n\nAt Wesak, light stands for the Buddha\'s awakening. It drives away the darkness of ignorance, like a lamp drives away night.\n\nThe powwow drum is often called the heartbeat of Mother Earth and of the people. It joins dancers, singers, and watchers together.',
                2: '| Practice | Festival | Meaning |\n| Coloured water and powder | Holi (Hinduism) | Spring festival of colour: friends and strangers douse one another; barriers of status and age dissolve for a day. Recalls Krishna\'s playfulness and the victory of good over evil (Holika\'s bonfire the night before). |\n| Dancing and drumming | Powwows | Dancers in regalia move around a circle to a drum group; the drum is called the heartbeat of the people, uniting dancers, singers, and spectators with the earth and with one another. |\n| Lighting candles | Shabbat (Judaism) | Two candles lit before sunset on Friday, usually by a woman of the household, with a blessing: they mark the border between ordinary time and sacred rest and bring peace and light into the home. |\n| Nativity scenes | Christmas (Christianity) | Figures of the infant Jesus, Mary, Joseph, shepherds, animals, and later the Magi make the Gospel birth story visible in homes and churches. |\n| Lights and candles | Wesak (Buddhism) | The May full moon marks the Buddha\'s birth, enlightenment, and passing. Light = enlightenment: the Buddha\'s awakening dispels the darkness of ignorance, as a lamp dispels night. |\n\n**Drumming in Indigenous festivals:** the beat is often described as the heartbeat of Mother Earth and of the people. Drum groups sing honour songs, veterans\' songs, and social songs; dancers follow the beat. The drum is treated with respect — it is fed, smudged, and not stepped over.',
                3: '| Practice | Festival | Meaning |\n| Coloured water and powder | Holi (Hinduism) | Spring festival of colour: friends and strangers douse one another; barriers of status and age dissolve for a day. Recalls Krishna\'s playfulness and the victory of good over evil (Holika\'s bonfire the night before). Holi 2027 is March 22. |\n| Dancing and drumming | Powwows | Dancers in regalia move around a circle to a drum group; the drum is called the heartbeat of the people, uniting dancers, singers, and spectators with the earth and with one another. Grand Entry, honour songs, and specific dance styles each carry meaning. |\n| Lighting candles | Shabbat (Judaism) | Two candles lit before sunset on Friday, usually by a woman of the household, with a blessing: they mark the border between ordinary time and sacred rest and bring peace and light into the home. |\n| Nativity scenes | Christmas (Christianity) | Figures of the infant Jesus, Mary, Joseph, shepherds, animals, and later the Magi make the Gospel birth story visible in homes and churches; St. Francis is credited with the first living nativity in 1223. |\n| Lights and candles | Wesak (Buddhism) | Wesak (Vesak), the May full moon (May 20 in 2027), marks the Buddha\'s birth, enlightenment, and passing. Homes and temples are hung with lanterns; candles and lamps are lit; some release lanterns on water. Light = enlightenment: the Buddha\'s awakening dispels the darkness of ignorance, as a lamp dispels night. Also observed: giving to the poor, freeing caged birds, chanting, visiting temples. |\n\n**Drumming in Indigenous festivals:** the drum is central at powwows and many ceremonies across Turtle Island and around the world. The beat is often described as the heartbeat of Mother Earth and of the people. Drum groups sing honour songs, veterans\' songs, and social songs; dancers follow the beat. The drum is treated with respect: it is fed, smudged, and not stepped over; in many nations women do not sit at the big drum, while hand drums are used by all — practices vary by nation, so avoid generalizing drum protocols.\n\n**Think about it:** for each practice ask — what does it make people DO, and what does that doing mean? Holi\'s colour erases rank; the powwow drum unites; Shabbat candles mark a boundary; the nativity scene makes a story present.'
              }
            },
            {
              title: {
                1: 'Real case: the holiest day',
                2: 'Real case: the holiest day — Yom Kippur',
                3: 'Real case: the holiest day — Yom Kippur, the Day of Atonement'
              },
              visual: '📯',
              body: {
                1: '> Yom Kippur is the Jewish Day of Atonement. It comes ten days after Rosh Hashanah, the Jewish New Year.\n> For about 25 hours, observant Jews do not eat or drink. They do not work, wear leather shoes, or bathe. They wear white.\n> They spend much of the day in the synagogue. Together they confess their wrongs and ask God for forgiveness.\n> In the days before, they ask forgiveness from the people they have hurt.\n> The day ends with a long blast of the shofar, a ram\'s horn, and a meal to break the fast.\n> Tradition teaches that on this day God seals the judgement for the coming year. That is why many call it the holiest day: a person\'s whole relationship with God and neighbour is set right.',
                2: '> Ten days after Rosh Hashanah, the Jewish New Year, comes Yom Kippur (in 2027, from sundown October 10 to nightfall October 11). For about 25 hours observant Jews fast from food and drink, avoid work, leather shoes, bathing, and other comforts, wear white, and spend much of the day in the synagogue confessing wrongs together, asking forgiveness of God and — in the days before — of the people they have hurt.\n> The day ends with a long blast of the shofar (ram\'s horn) and a meal to break the fast. Many Jews who rarely attend synagogue attend on Yom Kippur.\n> Tradition teaches that on this day God seals the judgement for the coming year, which is why many call it the holiest day of the calendar: it is the day a person\'s whole relationship with God and neighbour is set right.',
                3: '> Ten days after Rosh Hashanah, the Jewish New Year, comes Yom Kippur (in 2027, from sundown October 10 to nightfall October 11). For about 25 hours observant Jews fast from food and drink, avoid work, leather shoes, bathing, and other comforts, wear white, and spend much of the day in the synagogue confessing wrongs together, asking forgiveness of God and — in the days before — of the people they have hurt.\n> The day ends with a long blast of the shofar (ram\'s horn) and a meal to break the fast. Many Jews who rarely attend synagogue attend on Yom Kippur.\n> Tradition teaches that on this day God seals the judgement for the coming year, which is why many call it the holiest day of the calendar: it is the day a person\'s whole relationship with God and neighbour is set right.\n\n**Think about it**\n\n- List five observances of Yom Kippur and say what each one expresses.\n- Why would some Jewish people say Yom Kippur is the most holy day, rather than a joyful festival like Passover or Hanukkah?\n- What does it tell you about a tradition that its holiest day is about confession and forgiveness rather than celebration?\n\n**From the teacher notes:** it is the one day of total fasting commanded in the Torah (Leviticus 16, 23); atonement is personal and communal; the liturgy includes communal confession; the Torah calls it the Sabbath of Sabbaths. Asking forgiveness of people before the day is a widely taught requirement: God forgives sins against God, but sins against people must be settled with them (reciprocity made ritual — Unit 2 Lesson 5).'
              }
            },
            {
              title: {
                1: 'Putting it together',
                2: 'Worked example: practices as meaning made visible',
                3: 'Worked example: practices as meaning made visible'
              },
              visual: '🔗',
              body: {
                1: 'Yom Kippur\'s fasting, white clothing, and shared confession make **atonement** visible. The body shows humility. The community shows shared responsibility.\n\nHoli\'s thrown colour makes the erasing of rank visible. The powwow drum makes unity something you can hear.\n\nA festival\'s practices are its meaning made visible.',
                2: '**Yom Kippur:** fasting, white clothing, and communal confession make atonement visible — the body enacts humility and the community enacts shared responsibility.\n\n**Holi:** the thrown colour makes the erasing of rank visible. A bonfire (Holika Dahan) the night before, then colour on friends and strangers, music, and sweets celebrate spring and the victory of good over evil.\n\n**Powwow:** the drum makes unity audible — the heartbeat of the earth and the people carrying honour songs.\n\n**Festivals of the semester, in one line each**\n\n- Ramadan and Eid al-Fitr (Islam): a month of fasting marking the Qur\'an\'s revelation, ended by a feast of gratitude and charity.\n- Lent and Easter (Christianity): forty days of discipline leading to the commemoration of Jesus\' death and the celebration of his resurrection — the central Christian festival.\n- Passover (Judaism): the Exodus from Egypt, told at the Seder meal with matzo and bitter herbs.\n- Vaisakhi (Sikhism): the founding of the Khalsa in 1699; processions (nagar kirtan) and the reading of the Guru Granth Sahib.\n- Nowruz (Persian and Baha\'i traditions): the new year at the spring equinox; the Haft-Seen table, visiting, renewal.',
                3: '**Yom Kippur:** fasting, white clothing, and communal confession make atonement visible — the body enacts humility and the community enacts shared responsibility.\n\n**Holi:** the thrown colour makes the erasing of rank visible. A bonfire (Holika Dahan) the night before, then colour on friends and strangers, music, and sweets celebrate spring, Krishna\'s playfulness, and the victory of good over evil.\n\n**Powwow:** the drum makes unity audible — the heartbeat of the earth and the people carrying honour songs.\n\n**Festivals of the semester, in one line each**\n\n- Ramadan and Eid al-Fitr (Islam): a month of fasting marking the Qur\'an\'s revelation, ended by a feast of gratitude and charity (Lesson 3).\n- Lent and Easter (Christianity): forty days of discipline leading to the commemoration of Jesus\' death and the celebration of his resurrection — the central Christian festival.\n- Passover (Judaism): the Exodus from Egypt, told at the Seder meal with matzo and bitter herbs.\n- Vaisakhi (Sikhism): the founding of the Khalsa in 1699; processions (nagar kirtan) and the reading of the Guru Granth Sahib.\n- Nowruz (Persian and Baha\'i traditions): the new year at the spring equinox; the Haft-Seen table, visiting, renewal.\n\n**Think about it**\n\n- Holi erases rank for a day; Yom Kippur erases wrongs for a year. Why do traditions build \'reset days\' into the calendar?\n- Candles at Shabbat, lamps at Diwali, lanterns at Wesak, Advent candles: why is light the most common festival symbol? What would be lost if these festivals used recorded light shows instead?\n- Many festivals have become public or commercial events (Holi colour runs, Christmas sales). When does that spread joy, and when does it hollow out meaning? Fun is fine when the community leads and the meaning travels with the practice; copying colour and lamps without their stories turns practices into decoration (appropriation).\n- Does \'practices are meaning made visible\' hold when a practice is performed without belief — a non-Jewish student fasting to support a friend, or a tourist at Holi? Meaning needs both the practice and the community that holds it.'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- Why do many Jews consider Yom Kippur the holiest day? Name three of its observances.\n- Why are lights central to Wesak?\n\nChoose one festival from today. Write what it means in one sentence, and two practices with their meaning.',
                2: 'Answer in your notes, then compare with a partner.\n\n- Why do many Jews consider Yom Kippur the holiest day? Name three of its observances.\n- What do the coloured powders of Holi express?\n- Why are lights central to Wesak?\n- Why is drumming significant at powwows?\n\n**Exit ticket:** choose one festival from today. Write its significance in one sentence and two practices with their meaning. Confirm your Festival Field Guide choice (festival, rite, or daily observance) and its tradition.',
                3: 'Answer in your notes, then compare with a partner.\n\n- Why do many Jews consider Yom Kippur the holiest day? Name three of its observances.\n- What do the coloured powders of Holi express?\n- Why are lights central to Wesak?\n- Why is drumming significant at powwows?\n- Explain the meaning of lighting candles at Shabbat and of nativity scenes at Christmas.\n\n**Worked application:** a school plans a \'Festival of Light and Colour\' on March 25, 2027, mixing Holi colour, Diwali-style lamps, and Easter decorations. What is inaccurate? Diwali is a lunisolar autumn festival, not spring; Holi colour (Mar 22) is the practice itself, not decoration; March 25 falls in Holy Week, a solemn period for Christians, and two days after Purim (Mar 23). Combining festivals of different meanings as \'light\' flattens their significance. A better plan honours two spring festivals accurately, on or near their dates, each led by students of that tradition.\n\n**Exit ticket:** choose one festival from today. Write its significance in one sentence and two practices with their meaning. Confirm your Festival Field Guide choice (festival, rite, or daily observance) and its tradition.'
              }
            }
          ]
        },

        // ---- Lesson 3: Fasts and Feasts ----
        {
          title: 'Fasts and Feasts',
          slides: [
            {
              title: {
                1: 'Going without, giving away',
                2: 'Fasts and feasts: what going without, and giving away, mean',
                3: 'Fasts and feasts: what going without, and giving away, mean'
              },
              visual: '🍲',
              body: {
                1: 'A month without food from dawn to dusk. A whale shared with a whole village. A feast where the host gives everything away.\n\nFasting and feasting are two sides of one thing. People use food to **say something**.\n\nToday we learn:\n\n- why Muslims fast during Ramadan\n- how the Nalukataq shows what the whale means to the Iñupiat\n- how the potlatch, the Jain Ayambil, and the Christian kiss of peace reflect each tradition\'s teachings',
                2: 'A month without food from dawn to dusk; a whale shared with an entire village; a feast where the host gives everything away. What going without, and giving away, mean.\n\nWhen did you last skip a meal on purpose, and for what? When did you last share food with people you did not have to? Fasting and feasting are two sides of one thing — using food to say something.\n\n**Learning goals**\n\n- Describe the role and significance of fasts and feasts in various belief traditions.\n- Explain how practices and rituals used in festivals reflect the teachings of those traditions.\n- Analyse how the sharing and redistribution of food expresses community interdependence.\n\n**Success criteria — I can…**\n\n- explain why Muslims fast during Ramadan and why Hindus exchange sweets at Holi\n- explain how the nalukataq expresses the whale\'s significance to the Iñupiat\n- explain how the potlatch\'s redistribution of goods, the Jain Ayambil, and the Christian kiss of peace reflect each tradition\'s teachings',
                3: '**Expectations: D1.3, D1.4**\n\nA month without food from dawn to dusk; a whale shared with an entire village; a feast where the host gives everything away. What going without, and giving away, mean.\n\nWhen did you last skip a meal on purpose, and for what? When did you last share food with people you did not have to? Fasting and feasting are two sides of one thing — using food to say something.\n\n**Learning goals**\n\n- Describe the role and significance of fasts and feasts in various belief traditions (D1.3).\n- Explain how practices and rituals used in festivals reflect the teachings of those traditions (D1.4).\n- Analyse how the sharing and redistribution of food expresses community interdependence.\n\n**Success criteria — I can…**\n\n- explain why Muslims fast during Ramadan and why Hindus exchange sweets at Holi\n- explain how the nalukataq expresses the whale\'s significance to the Iñupiat\n- explain how the potlatch\'s redistribution of goods, the Jain Ayambil, and the Christian kiss of peace reflect each tradition\'s teachings\n\n**From the teacher notes:** the curriculum\'s prompts for D1.3 and D1.4 are exactly these cases — Ramadan, Holi sweets, nalukataq; Ayambil, the kiss of peace, the potlatch. Religious fasting is presented as a time-bound communal discipline with exemptions for the sick, pregnant, young, and elderly; every tradition in this lesson has such exemptions.'
              }
            },
            {
              title: {
                1: 'Real case: Ramadan',
                2: 'Real case: Ramadan — why do Muslims fast?',
                3: 'Real case: Ramadan — why do Muslims fast?'
              },
              visual: '🌙',
              body: {
                1: '> Ramadan is the ninth month of the Islamic calendar. Muslims who are able do not eat or drink from dawn to sunset. Children, the sick, and travellers do not have to fast.\n> The fast is called sawm. It is one of the Five Pillars of Islam.\n> Why fast? The Qur\'an commands it. Fasting trains self-control and awareness of God. Hunger builds compassion for the poor.\n> The sunset meal (iftar) and night prayers bring families together.\n> The month ends with Eid al-Fitr, a feast with prayers, gifts, and a required charity gift so the poor can feast too.',
                2: '> During Ramadan, the ninth month of the Islamic calendar (about February 8 to March 9 in 2027), Muslims who are able fast from food, drink, smoking, and sexual activity from dawn to sunset. Children, the sick, travellers, and pregnant or nursing women are exempt. The fast, sawm, is one of the Five Pillars of Islam.\n> Muslims give several reasons: the Qur\'an commands it and was first revealed in this month; fasting trains self-control and awareness of God; hunger builds compassion for the poor, and the month is a time of extra charity; the shared pre-dawn meal (suhoor), the evening breaking of the fast (iftar), and night prayers draw families and communities together.\n> The month ends with Eid al-Fitr, a feast marked by special prayers, new clothes, visiting, gifts, and a required charity donation (zakat al-fitr) so that the poor can also feast.',
                3: '> During Ramadan, the ninth month of the Islamic calendar (about February 8 to March 9 in 2027), Muslims who are able fast from food, drink, smoking, and sexual activity from dawn to sunset. Children, the sick, travellers, and pregnant or nursing women are exempt. The fast, sawm, is one of the Five Pillars of Islam.\n> Muslims give several reasons: the Qur\'an commands it and was first revealed in this month; fasting trains self-control and awareness of God; hunger builds compassion for the poor, and the month is a time of extra charity; the shared pre-dawn meal (suhoor), the evening breaking of the fast (iftar), and night prayers draw families and communities together.\n> The month ends with Eid al-Fitr, a feast marked by special prayers, new clothes, visiting, gifts, and a required charity donation (zakat al-fitr) so that the poor can also feast.\n\n**Think about it**\n\n- List four reasons Muslims fast during Ramadan. Which are about God, which about the self, which about others?\n- Why does the fast end with a feast and a required charity gift? What would be lost without the feast?\n- In 2027 Ramadan overlaps the start of this semester. What should classmates and teachers understand?\n\n**From the teacher notes:** zakat al-fitr is a required donation before the Eid prayer. Fasting students may skip the cafeteria, be tired in afternoon classes, need a space at lunch, and may prefer not to be asked repeatedly \'not even water?\' (correct: not even water). Non-Muslims are not expected to fast before attending an iftar; those who choose to fast in solidarity should follow the same health exemptions and understand the fast\'s meaning rather than treating it as a challenge.'
              }
            },
            {
              title: {
                1: 'Real case: Nalukataq',
                2: 'Real case: Nalukataq — the whale shared with everyone',
                3: 'Real case: Nalukataq — the whale shared with everyone'
              },
              visual: '🐋',
              body: {
                1: '> In June, after the spring bowhead whale hunt, Iñupiat communities in northern Alaska hold Nalukataq.\n> The whaling captains (umialik) and their wives host the whole community.\n> The day opens with prayer and a flag-raising. Then meals are served. The crews give whale meat and muktuk (skin and blubber) to every family present.\n> The highlight is the blanket toss. Dozens of people hold a seal- or walrus-skin blanket and launch a jumper high into the air. Captains and their wives go first.\n> The day ends with drumming, dancing, and prayer.\n> A captain earns respect by how generously he shares the whale. The whale is understood as giving itself to a community that treats it with respect.',
                2: '> In June, after the spring bowhead whale hunt, Iñupiat communities along Alaska\'s North Slope — Utqiaġvik, Point Hope, Kaktovik, Nuiqsut — hold Nalukataq. The whaling captains (umialik) and their wives host the whole community: the day opens with prayer and a flag-raising, then meals are served and the crews distribute whale meat, fluke strips, and muktuk (skin and blubber) to every family present.\n> The highlight is the blanket toss, where dozens of people holding a seal- or walrus-skin blanket launch a jumper high into the air — captains and their wives first — and the day ends with drumming, dancing, and prayer.\n> A captain earns respect by how generously he shares the whale. The hunt itself is a subsistence hunt under quotas agreed with the International Whaling Commission, and the whale is understood as giving itself to a community that treats it with respect.',
                3: '> In June, after the spring bowhead whale hunt, Iñupiat communities along Alaska\'s North Slope — Utqiaġvik, Point Hope, Kaktovik, Nuiqsut — hold Nalukataq. The whaling captains (umialik) and their wives host the whole community: the day opens with prayer and a flag-raising, then meals are served and the crews distribute whale meat, fluke strips, and muktuk (skin and blubber) to every family present.\n> The highlight is the blanket toss, where dozens of people holding a seal- or walrus-skin blanket launch a jumper high into the air — captains and their wives first — and the day ends with drumming, dancing, and prayer.\n> A captain earns respect by how generously he shares the whale. The hunt itself is a subsistence hunt under quotas agreed with the International Whaling Commission, and the whale is understood as giving itself to a community that treats it with respect.\n\n**Think about it**\n\n- How does the festival express the significance of the whale to the community? Name three practices and what each says.\n- Why does the giving away of the whale, rather than keeping it, bring a captain respect?\n- Compare the nalukataq\'s sharing with the Eid al-Fitr charity gift. What teaching do they share?\n\n**From the teacher notes:** Nalukataq is held in June, around the solstice, as a three-day festival; prayer opens and closes it. The Iñupiat are an Inuit people of northern Alaska — the curriculum\'s word \'Inuit\' is correct in the broad sense, but use the specific name. Interdependence is the theme: survival in the Arctic depends on sharing, so generosity is the highest status.'
              }
            },
            {
              title: {
                1: 'Practices that reflect teachings',
                2: 'Practices that reflect teachings',
                3: 'Practices that reflect teachings (D1.4)'
              },
              visual: '🤝',
              body: {
                1: '| Practice | Tradition | Teaching |\n| Potlatch | Pacific Northwest nations | Wealth is what you give, not what you keep |\n| Ayambil | Jainism | Plain food trains the self to let go of craving |\n| Kiss of peace | Christianity | Make peace with others before Communion |\n| Sweets at Holi | Hinduism | Sharing sweetness heals old quarrels |\n\nAt a **potlatch**, the host family gives away blankets, food, and goods. Guests must give back later. This binds the community together — everyone depends on everyone.\n\nIn **Ayambil**, Jains eat one plain meal a day for nine days. The tasteless food trains detachment and non-harm.',
                2: '| Practice | Tradition | Teaching it reflects |\n| The potlatch — redistribution | Pacific Northwest nations | A host family gives away blankets, food, and goods to guests who witness names, rights, and marriages being confirmed. Wealth is measured by what is given, not kept; guests are obligated to reciprocate later — binding the community in interdependence. |\n| Ayambil — restraint | Jainism | For nine days twice a year (Ayambil Oli, spring and autumn), observant Jains eat one plain meal a day — boiled grain without spices, oil, or sweetness — while meditating on the nine supreme beings and virtues. The tasteless food trains detachment from craving and non-harm, the path to freeing the soul from karma. |\n| The kiss of peace — reconciliation | Christianity | In many Christian liturgies, before Communion, worshippers exchange a sign of peace — a handshake, embrace, or kiss. It enacts Jesus\' teaching to be reconciled with your brother or sister before offering a gift at the altar: a Christian life is one of peace with others before peace with God. |\n| Sweets at Holi — shared joy | Hinduism | Families prepare and exchange sweets such as gujiya; sharing sweetness marks the forgiving of old quarrels and the renewal of relationships that Holi celebrates, alongside the colour that erases rank. |',
                3: '| Practice | Tradition | Teaching it reflects |\n| The potlatch — redistribution | Pacific Northwest nations | A host family gives away blankets, food, and goods to guests who witness names, rights, and marriages being confirmed. Wealth is measured by what is given, not kept; guests are obligated to reciprocate later — binding the community in interdependence. |\n| Ayambil — restraint | Jainism | For nine days twice a year (Ayambil Oli, spring and autumn), observant Jains eat one plain meal a day — boiled grain without spices, oil, or sweetness — while meditating on the nine supreme beings and virtues. The tasteless food trains detachment from craving and non-harm, the path to freeing the soul from karma. |\n| The kiss of peace — reconciliation | Christianity | In many Christian liturgies, before Communion, worshippers exchange a sign of peace — a handshake, embrace, or kiss. It enacts Jesus\' teaching to be reconciled with your brother or sister before offering a gift at the altar (Matthew 5:23–24): a Christian life is one of peace with others before peace with God. |\n| Sweets at Holi — shared joy | Hinduism | Families prepare and exchange sweets such as gujiya; sharing sweetness marks the forgiving of old quarrels and the renewal of relationships that Holi celebrates, alongside the colour that erases rank. |\n\n**Worked example — the potlatch and interdependence:** the host gives away wealth to guests who witness names, rights, and marriages being confirmed; guests are obligated to reciprocate at their own potlatches; status comes from giving, not keeping. This binds families in a web of mutual obligation — no one stands alone. Because the potlatch is a specific legal and ceremonial institution (banned by Canada 1885–1951), copying its name for a general \'potlatch-style\' giving event is appropriation; a respectful alternative is a feast hosted by a local First Nation on its own terms.\n\n**Think about it:** the potlatch and the nalukataq make generosity the highest status. Our economy makes accumulation the highest status. What follows for a community from each choice?'
              }
            },
            {
              title: {
                1: 'Fasts and feasts side by side',
                2: 'Fasting and feasting across traditions',
                3: 'Fasting and feasting across traditions — and check yourself'
              },
              visual: '🍽️',
              body: {
                1: '| Fasts | Feasts |\n| Ramadan (Islam): dawn to sunset for a month | Eid al-Fitr (Islam): sharing food and charity |\n| Yom Kippur (Judaism): 25 hours | Passover Seder and Shabbat meals (Judaism) |\n| Lent (Christianity): forty days | Christmas and Easter dinners (Christianity) |\n| Ayambil Oli (Jainism): nine days of one plain meal | Langar (Sikhism): a free kitchen for everyone, every day |\n\nThe pattern: fasts train the **self**. Feasts bind the **community**. Most traditions pair them — the fast ends in a feast.',
                2: '| Fasts | Feasts |\n| Ramadan (Islam): dawn to sunset for a month | Eid al-Fitr and Eid al-Adha (Islam): with required sharing of food and charity |\n| Yom Kippur (Judaism): 25 hours, total | Passover Seder and Shabbat meals (Judaism) |\n| Lent (Christianity): forty days of giving something up, Fridays without meat for Catholics | Christmas and Easter dinners; the Eucharist itself as a sacred meal (Christianity) |\n| Ayambil Oli (Jainism): nine days of one plain meal | Langar (Sikhism): the free community kitchen, every day, for everyone |\n| Ekadashi (Hinduism): twice-monthly fasts for many devotees | Diwali sweets, Holi gujiya, Onam sadya (Hinduism) |\n| Fasting before a vision quest or ceremony (many First Nations) | Potlatch, nalukataq, feasts at powwows and after ceremonies (Indigenous nations) |\n\n**The pattern:** fasts train the self (discipline, compassion, awareness); feasts bind the community (sharing, gratitude, reconciliation). Most traditions pair them — the fast ends in a feast.\n\n**Check yourself**\n\n- Give three reasons Muslims fast during Ramadan and name the feast that ends it.\n- How does the nalukataq express the whale\'s significance to the community?\n- How does the potlatch\'s redistribution of goods express interdependence?\n- How does Ayambil relate to a Jain\'s spiritual goals? Why is the kiss of peace symbolic of Christian life?',
                3: '| Fasts | Feasts |\n| Ramadan (Islam): dawn to sunset for a month | Eid al-Fitr and Eid al-Adha (Islam): with required sharing of food and charity |\n| Yom Kippur (Judaism): 25 hours, total | Passover Seder and Shabbat meals (Judaism) |\n| Lent (Christianity): forty days of giving something up, Fridays without meat for Catholics | Christmas and Easter dinners; the Eucharist itself as a sacred meal (Christianity) |\n| Ayambil Oli (Jainism): nine days of one plain meal | Langar (Sikhism): the free community kitchen, every day, for everyone |\n| Ekadashi (Hinduism): twice-monthly fasts for many devotees | Diwali sweets, Holi gujiya, Onam sadya (Hinduism) |\n| Fasting before a vision quest or ceremony (many First Nations) | Potlatch, nalukataq, feasts at powwows and after ceremonies (Indigenous nations) |\n\n**The pattern:** fasts train the self (discipline, compassion, awareness); feasts bind the community (sharing, gratitude, reconciliation). Most traditions pair them — the fast ends in a feast. Langar is a daily feast with a teaching built in: everyone sits on the floor together regardless of status, eating the same simple vegetarian food served by volunteers — equality and service.\n\n**Check yourself**\n\n- Give three reasons Muslims fast during Ramadan and name the feast that ends it.\n- How does the nalukataq express the whale\'s significance to the community?\n- How does the potlatch\'s redistribution of goods express interdependence?\n- How does Ayambil relate to a Jain\'s spiritual goals? Why is the kiss of peace symbolic of Christian life?\n\n**Think about it:** \'Every fast is for the self; every feast is for the community.\' Ramadan\'s fast disciplines the self but is kept communally and ends in a feast with required charity. The nalukataq and potlatch are feasts whose whole point is redistribution, yet the host\'s generosity also shapes the self. The fast-then-feast pattern suggests traditions use hunger to train compassion and then use shared food to turn compassion into relationship. Fasting appears in almost every tradition — what does going without food teach that reading a book cannot?'
              }
            }
          ]
        },

        // ---- Lesson 4: Symbols of the Festivals ----
        {
          title: 'Symbols of the Festivals',
          slides: [
            {
              title: {
                1: 'How a symbol carries a story',
                2: 'Symbols of the festivals: how festival symbols carry whole stories',
                3: 'Symbols of the festivals: how festival symbols carry whole stories'
              },
              visual: '🕯️',
              body: {
                1: 'An eight-branched lamp. A spinning top. A flower that rises from mud. A braid of grass.\n\nPut a plain candle on a desk. What does it mean? Nothing — until a community gives it a **story**.\n\nToday we learn:\n\n- where six festival symbols come from\n- the story or teaching each one carries\n- the difference between a sacred symbol and a decoration',
                2: 'An eight-branched lamp, a spinning top, a flower that rises from mud, a braid of grass: how festival symbols carry whole stories.\n\nPut a plain object on the desk — a candle, a wreath of greenery — and ask what it \'means\'. Nothing, until a community gives it a story. Today we trace festival symbols back to the stories and teachings that made them mean something.\n\n**Learning goals**\n\n- Explain the origins of symbols associated with specific religious festivals, celebrations, and commemorations.\n- Connect each symbol to its story or teaching (building on Unit 2).\n- Distinguish sacred meaning from decorative use.\n\n**Success criteria — I can…**\n\n- explain the origin and meaning of the menorah, the dreidel, Diwali lamps and fireworks, the Advent wreath, the lotus, and sweetgrass\n- connect each symbol to a story or teaching\n- give one example of a symbol used decoratively and explain what is lost',
                3: '**Expectations: D1.5, E2.3**\n\nAn eight-branched lamp, a spinning top, a flower that rises from mud, a braid of grass: how festival symbols carry whole stories.\n\nPut a plain object on the desk — a candle, a wreath of greenery — and ask what it \'means\'. Nothing, until a community gives it a story. Today we trace festival symbols back to the stories and teachings that made them mean something.\n\n**Learning goals**\n\n- Explain the origins of symbols associated with specific religious festivals, celebrations, and commemorations (D1.5).\n- Connect each symbol to its story or teaching, building on Unit 2 (E2.3).\n- Distinguish sacred meaning from decorative use.\n\n**Success criteria — I can…**\n\n- explain the origin and meaning of the menorah, the dreidel, Diwali lamps and fireworks, the Advent wreath, the lotus, and sweetgrass\n- connect each symbol to a story or teaching\n- give one example of a symbol used decoratively and explain what is lost\n\n**From the teacher notes:** D1.5\'s examples are the Advent wreath, menorah, lotus, fireworks, and sweetgrass; its prompts are the dreidel and the lights of Diwali. Technically the Hanukkah lamp is a hanukkiah; \'menorah\' is the common name and the curriculum\'s word. The decks describe symbols in words by design, keeping images to institutional sources.'
              }
            },
            {
              title: {
                1: 'Real case: the menorah and the dreidel',
                2: 'Real case: the menorah and the dreidel — Hanukkah, eight nights of light',
                3: 'Real case: the menorah and the dreidel — Hanukkah, eight nights of light'
              },
              visual: '🪟',
              body: {
                1: '> In 164 BCE, Jewish fighters led by the Maccabees took back the Temple in Jerusalem and rededicated it. Hanukkah means \'dedication\'.\n> Tradition tells that only one day\'s supply of oil was found for the Temple lamp. Yet it burned for eight days.\n> So Jews light one more candle each night for eight nights. The lamp is placed in a window so everyone can see the miracle.\n> Children play with a dreidel, a spinning top. Its four Hebrew letters stand for \'a great miracle happened there\'.\n> A well-known story says Jews spun tops to hide secret Torah study from soldiers. Historians note this story appears much later.',
                2: '> In 164 BCE, after a revolt led by the Maccabees, Jewish fighters retook the Temple in Jerusalem from the Seleucid Greek rulers who had banned Jewish practice, and rededicated it (Hanukkah means \'dedication\'). Later tradition, recorded in the Talmud, tells that only one day\'s supply of pure oil was found for the Temple lamp, yet it burned for eight days.\n> Jews therefore light a nine-branched lamp — one candle the first night, two the second, up to eight, with a helper candle — placed in a window so the miracle is seen by all.\n> Children play with a dreidel marked with four Hebrew letters standing for \'a great miracle happened there\' (in Israel, \'here\'); a widely told explanation holds that under the Greek ban Jews studied Torah in secret and spun tops to disguise the lesson as a game when soldiers passed, though historians note this story appears much later than the events.',
                3: '> In 164 BCE, after a revolt led by the Maccabees, Jewish fighters retook the Temple in Jerusalem from the Seleucid Greek rulers who had banned Jewish practice, and rededicated it (Hanukkah means \'dedication\'). Later tradition, recorded in the Talmud, tells that only one day\'s supply of pure oil was found for the Temple lamp, yet it burned for eight days.\n> Jews therefore light a nine-branched lamp — one candle the first night, two the second, up to eight, with a helper candle — placed in a window so the miracle is seen by all.\n> Children play with a dreidel marked with four Hebrew letters standing for \'a great miracle happened there\' (in Israel, \'here\'); a widely told explanation holds that under the Greek ban Jews studied Torah in secret and spun tops to disguise the lesson as a game when soldiers passed, though historians note this story appears much later than the events.\n\n**Think about it**\n\n- What two origins does the menorah carry — a historical event and a story of a miracle? How does the lighting order express the story?\n- What is the significance of the dreidel? Why might a tradition keep telling a story about it that historians cannot confirm?\n- Why place the lamp in a window? What does that say about the purpose of a festival symbol?\n\n**From the teacher notes:** the First and Second Books of Maccabees record the events; the oil story is in the Talmud (Shabbat 21b). The window placement is \'publicizing the miracle\' (pirsumei nisa), a stated value of the festival. The dreidel-and-soldiers story is a later folk explanation; its persistence tells you what the community values — courage, and learning under persecution. Saying so models honest sourcing.'
              }
            },
            {
              title: {
                1: 'Lamps and fireworks at Diwali',
                2: 'Real case: lamps and fireworks at Diwali — why fireworks and lights?',
                3: 'Real case: lamps and fireworks at Diwali — why fireworks and lights?'
              },
              visual: '🎆',
              body: {
                1: '> Diwali means \'row of lamps\'. It recalls the oil lamps the people of Ayodhya lit to welcome Rama and Sita home from exile, after Rama\'s victory over Ravana.\n> Families clean and decorate their homes. They draw rangoli patterns at the door. They set rows of clay lamps (diyas) in windows and on rooftops.\n> Fireworks fill the sky on the main night.\n> The lamps carry the central teaching: light over darkness, knowledge over ignorance, good over evil.\n> Fireworks carry that light into the sky and add the sound of celebration. Their smoke has led many cities to limit them in favour of lamps.\n> For many Hindus the night also honours Lakshmi, goddess of prosperity, who is welcomed into a clean, lit home.',
                2: '> Diwali — \'row of lamps\' — recalls the oil lamps the people of Ayodhya lit to welcome Rama and Sita home from exile after Rama\'s victory over Ravana (Unit 2). Families clean and decorate their homes, draw rangoli patterns at the door, and set rows of clay lamps (diyas) in windows and along walls and rooftops; many also light candles and electric lights. Fireworks fill the sky on the main night.\n> Lamps carry the central teaching: light over darkness, knowledge over ignorance, good over evil. Fireworks extend that light into the sky and add the sound of celebration — though their smoke has led many cities and communities, including in India, to limit them in favour of lamps.\n> For many Hindus the night also honours Lakshmi, goddess of prosperity, who is welcomed into a clean, lit home.',
                3: '> Diwali — \'row of lamps\' — recalls the oil lamps the people of Ayodhya lit to welcome Rama and Sita home from exile after Rama\'s victory over Ravana (Unit 2). Families clean and decorate their homes, draw rangoli patterns at the door, and set rows of clay lamps (diyas) in windows and along walls and rooftops; many also light candles and electric lights. Fireworks fill the sky on the main night.\n> Lamps carry the central teaching: light over darkness, knowledge over ignorance, good over evil. Fireworks extend that light into the sky and add the sound of celebration — though their smoke has led many cities and communities, including in India, to limit them in favour of lamps.\n> For many Hindus the night also honours Lakshmi, goddess of prosperity, who is welcomed into a clean, lit home.\n\n**Think about it**\n\n- Explain why fireworks and lights are common symbols associated with Diwali, connecting each to the story and the teaching.\n- What is the difference between a diya and a string of electric lights, as symbols? Does the difference matter?\n- If a city limits fireworks for air quality, does Diwali lose anything essential? Argue both sides.\n\n**From the teacher notes:** the fireworks debate is real in Delhi and other cities, and in Brampton and Mississauga; it tests whether you can separate the core symbol (light) from an extension (fireworks).'
              }
            },
            {
              title: {
                1: 'Three more symbols',
                2: 'Three more symbols and their origins',
                3: 'Three more symbols and their origins — and symbol versus decoration'
              },
              visual: '🌿',
              body: {
                1: '| Symbol | Tradition | Origin and meaning |\n| Advent wreath | Christianity | A circle of evergreen with four candles, one lit each Sunday before Christmas. Circle = forever; evergreen = life in winter; growing light = Jesus coming. Began among German Lutherans in the 1800s. |\n| Lotus | Buddhism and Hinduism | Grows from mud and opens clean above the water. Purity and enlightenment. The Buddha is shown seated on a lotus. |\n| Sweetgrass | Many First Nations | One of the four sacred medicines. Braided in three strands, often explained as mind, body, and spirit. Burned in smudging for cleansing and prayer. |\n\nA symbol becomes a **decoration** when its story, ritual, and calendar are taken away.',
                2: '| Symbol | Tradition | Origin and meaning |\n| The Advent wreath | Christianity | A circle of evergreen with four candles, one lit each Sunday of Advent (a fifth, white, on Christmas in some churches). The circle: eternity; evergreen: life through winter; growing light: the approach of Jesus, \'the light of the world\'. Began among German Lutherans in the 1800s and spread widely. |\n| The lotus | Buddhism and Hinduism | The flower grows from mud through murky water and opens clean above the surface. In Buddhism it stands for enlightenment rising from the world\'s suffering; the Buddha is shown seated on a lotus. In Hinduism, deities such as Lakshmi and Brahma are shown on or holding a lotus — purity and divine birth. |\n| Sweetgrass | Many First Nations | One of the four sacred medicines (with tobacco, sage, and cedar) in Anishinaabe and other teachings; braided in three strands often explained as mind, body, and spirit, and burned in smudging for cleansing and prayer. Its sweet smoke is understood as the hair of Mother Earth; it is gathered with gratitude and never sold for profit in the traditional view. |\n\n**Sacred symbol or decoration?** Inside its tradition a symbol carries a story, is used in ritual (lit in order, placed in a window, braided and burned with prayer), teaches, and belongs to a calendar. The same object as decoration — a menorah-shaped string light in October, \'lotus\' spa candles, sweetgrass braids sold as \'natural air freshener\', diyas as autumn décor — loses the story, the ritual order, the community, and the calendar: the meaning.',
                3: '| Symbol | Tradition | Origin and meaning |\n| The Advent wreath | Christianity | A circle of evergreen with four candles, one lit each Sunday of Advent (a fifth, white, on Christmas in some churches). The circle: eternity; evergreen: life through winter; growing light: the approach of Jesus, \'the light of the world\'. Began among German Lutherans in the 1800s; its modern form is credited to Johann Hinrich Wichern in Hamburg in 1839. |\n| The lotus | Buddhism and Hinduism | The flower grows from mud through murky water and opens clean above the surface. In Buddhism it stands for enlightenment rising from the world\'s suffering; the Buddha is shown seated on a lotus. In Hinduism, deities such as Lakshmi and Brahma are shown on or holding a lotus — purity and divine birth. |\n| Sweetgrass | Many First Nations | One of the four sacred medicines (with tobacco, sage, and cedar) in Anishinaabe and other teachings; braided in three strands often explained as mind, body, and spirit, and burned in smudging for cleansing and prayer. Its sweet smoke is understood as the hair of Mother Earth; it is gathered with gratitude and never sold for profit in the traditional view. Teachings vary by nation. |\n\n**Sacred symbol or decoration?** Inside its tradition a symbol carries a story (the oil, the homecoming, the birth), is used in ritual (lit in order, placed in a window, braided and burned with prayer), teaches (light over darkness, purity from mud, cleansing), and belongs to a calendar (Hanukkah, Diwali, Advent, ceremony). The same object as decoration — a menorah-shaped string light in a store window in October, \'lotus\' yoga-studio logos and spa candles, sweetgrass braids sold as \'natural air freshener\', diyas and rangoli stickers as autumn décor — loses the story, the ritual order, the community, and the calendar: the meaning (Unit 1 Lesson 9, appropriation).\n\n**Worked example — a craft store\'s \'World Festivals\' décor line:** the most problematic product is usually the sweetgrass-scented \'prairie grass\' air freshener — a sacred medicine commercialized as a scent, with its name altered, by outsiders, for profit. Many Indigenous teachers object to its commercial sale; buying from Indigenous makers for ceremonial use is different. A better alternative: stock festival items made by community makers, labelled with the festival, its date, and its story, and drop the sacred medicine product entirely.\n\n**Think about it:** light appears in Hanukkah, Diwali, Advent, Wesak, and Shabbat. Is it a coincidence, a shared human instinct, or borrowing? Does a symbol need a true story to carry real meaning? Do not demonstrate smudging without an Indigenous educator.'
              }
            },
            {
              title: 'Check yourself',
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- Explain where the menorah\'s eight nights come from, and what the dreidel\'s letters mean.\n- Why are lights and fireworks symbols of Diwali?\n\nComplete the sentence: \'A symbol becomes decoration when …\'',
                2: 'Answer in your notes, then compare with a partner.\n\n- Explain the origin of the menorah\'s eight nights and the meaning of the dreidel\'s letters.\n- Why are lights and fireworks symbols of Diwali?\n- Give the origin and meaning of the Advent wreath, the lotus, and sweetgrass.\n- Give one example of a festival symbol used as decoration and say what is lost.\n\n**Exit ticket:** name one symbol from your Field Guide observance, its origin, and its meaning. Complete: \'A symbol becomes decoration when …\'',
                3: 'Answer in your notes, then compare with a partner.\n\n- Explain the origin of the menorah\'s eight nights and the meaning of the dreidel\'s letters.\n- Why are lights and fireworks symbols of Diwali?\n- Give the origin and meaning of the Advent wreath, the lotus, and sweetgrass.\n- Give one example of a festival symbol used as decoration and say what is lost.\n\n**Think about it:** \'A symbol is a story you can hold.\' The menorah holds the rededication and the oil story in its very form (eight lights plus one); without the story it is a lamp shape. The lotus holds enlightenment from suffering in its growth; without it, a flower. Sweetgrass holds gratitude, the four medicines, and the hair of Mother Earth; without it, a scent. A symbol can physically survive the loss of its story but ceases to be a symbol — it becomes decoration. So schools should teach the story before showing the symbol and let the tradition\'s students lead; stores should either carry the story (maker, festival, date) or not sell the object.\n\nShould a public school decorate with festival symbols in December? If yes, which, and how do you avoid \'decoration without story\'?\n\n**Exit ticket:** name one symbol from your Field Guide observance, its origin, and its meaning. Complete: \'A symbol becomes decoration when …\''
              }
            }
          ]
        },

        // ---- Lesson 5: Rites of Passage: Birth and Coming of Age ----
        {
          title: 'Rites of Passage: Birth and Coming of Age',
          slides: [
            {
              title: {
                1: 'Marking the thresholds of a life',
                2: 'Rites of passage: how traditions mark the thresholds of a life',
                3: 'Rites of passage: how traditions mark the thresholds of a life'
              },
              visual: '🚪',
              body: {
                1: 'A name whispered in a newborn\'s ear. A red egg at one month. Candy thrown at a thirteen-year-old.\n\nWhat marked your own step out of childhood — a licence, a job, a birthday? Communities use **rites of passage** to answer the question \'who are you now?\'\n\nToday we learn:\n\n- why naming ceremonies matter in four traditions\n- what the one-month celebration and the bar/bat mitzvah mean\n- how coming-of-age rites are alike and different',
                2: 'A name whispered in a newborn\'s ear, a red egg at one month, candy thrown at a thirteen-year-old: how traditions mark the thresholds of a life.\n\nWhat marked your own passage out of childhood — a licence, a job, a ceremony, a birthday? Rites of passage are how communities answer \'who are you now?\' Today: birth and coming of age; next lesson: marriage and death.\n\n**Learning goals**\n\n- Identify and explain the purpose of key rites of passage associated with birth and coming of age.\n- Describe the practices and rituals of specific rites and explain their significance.\n- Compare the birth and coming-of-age rituals of several traditions.\n\n**Success criteria — I can…**\n\n- explain why naming ceremonies matter in First Nations, Hindu, Jewish, and Muslim traditions\n- describe the one-month celebration and the bar/bat mitzvah and explain their key practices\n- give two similarities and two differences in birth or coming-of-age rites across traditions\n\n**A rite of passage** is a ritual event that marks a person\'s progress from one status to another. Keep the three stages in mind: **separation** from the old status, a **threshold** moment, and **incorporation** into the new one.',
                3: '**Expectations: D2.1, D2.2**\n\nA name whispered in a newborn\'s ear, a red egg at one month, candy thrown at a thirteen-year-old: how traditions mark the thresholds of a life.\n\nWhat marked your own passage out of childhood — a licence, a job, a ceremony, a birthday? Rites of passage are how communities answer \'who are you now?\' Today: birth and coming of age; next lesson: marriage and death.\n\n**Learning goals**\n\n- Identify and explain the purpose of key rites of passage associated with birth and coming of age (D2.1).\n- Describe the practices and rituals of specific rites and explain their significance (D2.2).\n- Compare the birth and coming-of-age rituals of several traditions.\n\n**Success criteria — I can…**\n\n- explain why naming ceremonies matter in First Nations, Hindu, Jewish, and Muslim traditions\n- describe the one-month celebration and the bar/bat mitzvah and explain their key practices\n- give two similarities and two differences in birth or coming-of-age rites across traditions\n\n**A rite of passage** (curriculum glossary) is a ritual event that marks a person\'s progress from one status to another. Keep the three stages in mind: **separation** from the old status, a **threshold** moment, and **incorporation** into the new one — the test asks you to apply this to a rite you did not see analysed in class.\n\n**From the teacher notes:** D2.1\'s prompts are naming ceremonies and the one-month celebration; D2.2\'s are the bar mitzvah candy and the comparison question. Compare, don\'t rank.'
              }
            },
            {
              title: {
                1: 'Why a name matters',
                2: 'Why a name matters: four naming traditions',
                3: 'Why a name matters: four naming traditions'
              },
              visual: '👶',
              body: {
                1: '| Tradition | Naming practice |\n| First Nations | An Elder may give a spirit name, often after fasting or ceremony. It links the person to clan, ancestors, and the spirit world. |\n| Hinduism | On the 11th or 12th day, the father whispers the name into the baby\'s ear. |\n| Judaism | A boy is circumcised and named on the eighth day (brit milah). A girl is named in the synagogue. |\n| Islam | The call to prayer (adhan) is whispered in the newborn\'s ear. Around day seven, the aqiqah: naming, head-shaving, meat for the poor. |\n\nIn every case, the name joins the child to the community, the ancestors, and the divine.',
                2: '| Tradition | Naming practice |\n| First Nations (many nations) | A spirit name may be given by an Elder, often after fasting, dreams, or ceremony, at birth or later in life; it connects the person to their clan, ancestors, and the spirit world, and may be used only in ceremony. Receiving a name is receiving a responsibility. |\n| Hinduism — namakarana | Usually on the 11th or 12th day, the father whispers the name into the baby\'s ear; the name may be chosen by the child\'s birth star (nakshatra), a deity, or a family elder; a priest may chant, and relatives bless the child. |\n| Judaism — brit milah and baby naming | A boy is circumcised and named on the eighth day in the covenant ceremony (brit milah); a girl is named in the synagogue or at a simchat bat ceremony. Names often honour a deceased relative (Ashkenazi) or a living one (Sephardi), keeping memory alive. |\n| Islam — adhan and aqiqah | The call to prayer is whispered in the newborn\'s right ear so that God\'s name is the first thing heard; around the seventh day, the aqiqah: the baby is named (often after prophets or the Prophet\'s family), the head is shaved, and meat is shared with the poor. |\n\n**Common thread:** the name joins the child to the community, the ancestors, and the divine, and is given by someone with authority.',
                3: '| Tradition | Naming practice |\n| First Nations (many nations) | A spirit name may be given by an Elder, often after fasting, dreams, or ceremony, at birth or later in life; it connects the person to their clan, ancestors, and the spirit world, and may be used only in ceremony. Receiving a name is receiving a responsibility. |\n| Hinduism — namakarana | Usually on the 11th or 12th day, the father whispers the name into the baby\'s ear; the name may be chosen by the child\'s birth star (nakshatra), a deity, or a family elder; a priest may chant, and relatives bless the child. |\n| Judaism — brit milah and baby naming | A boy is circumcised and named on the eighth day in the covenant ceremony (brit milah); a girl is named in the synagogue or at a simchat bat ceremony. Names often honour a deceased relative (Ashkenazi) or a living one (Sephardi), keeping memory alive. |\n| Islam — adhan and aqiqah | The call to prayer is whispered in the newborn\'s right ear so that God\'s name is the first thing heard; around the seventh day, the aqiqah: the baby is named (often after prophets or the Prophet\'s family), the head is shaved, and meat is shared with the poor. |\n\n**Common thread (the D2.1 prompt):** the name joins the child to the community, the ancestors, and the divine, and is given by someone with authority — an Elder, the father, the mohel or rabbi, the parents with the adhan. **Differences:** timing, who gives it, and whether it is public or ceremonial-only.\n\n**Think about it:** several traditions give a name chosen by someone else. What does that say about where identity comes from? Compare with choosing your own name or username. In naming ceremonies the community acts on an infant who cannot choose — the community claims the child.'
              }
            },
            {
              title: {
                1: 'Real case: the one-month celebration',
                2: 'Real case: the one-month celebration — full moon for a new baby',
                3: 'Real case: the one-month celebration — full moon for a new baby (Buddhist and Taoist Chinese traditions)'
              },
              visual: '🥚',
              body: {
                1: '> In Chinese communities, including Buddhist and Taoist families in Toronto and Markham, a baby\'s first month is marked with a \'full month\' (man yue) celebration.\n> In the past, surviving the first month meant the child would likely live. So the family gives thanks and shows the baby to relatives and friends for the first time.\n> Guests receive red-dyed eggs. Red means luck and joy. The egg means life and new beginnings.\n> The baby\'s head may be shaved or trimmed. Relatives give red envelopes of money. The family may give thanks at a temple or before the ancestral altar.\n> The celebration also ends the mother\'s month of rest.',
                2: '> In Chinese communities, including Buddhist and Taoist families in Toronto and Markham, a baby\'s first month is marked with a \'full month\' (man yue) celebration. Historically, surviving the first month meant the child was likely to live, so the family gives thanks and presents the baby to relatives and friends for the first time.\n> Guests receive red-dyed eggs (red for luck and joy, the egg for life and new beginnings) and sometimes pickled ginger and sweets; the baby\'s head may be shaved or trimmed; relatives give red envelopes of money; the family may offer thanks at a temple or before the ancestral altar.\n> The celebration marks the end of the mother\'s month of rest and confinement as well as the child\'s entry into the family.',
                3: '> In Chinese communities, including Buddhist and Taoist families in Toronto and Markham, a baby\'s first month is marked with a \'full month\' (man yue) celebration. Historically, surviving the first month meant the child was likely to live, so the family gives thanks and presents the baby to relatives and friends for the first time.\n> Guests receive red-dyed eggs (red for luck and joy, the egg for life and new beginnings) and sometimes pickled ginger and sweets; the baby\'s head may be shaved or trimmed; relatives give red envelopes of money; the family may offer thanks at a temple or before the ancestral altar.\n> The celebration marks the end of the mother\'s month of rest and confinement as well as the child\'s entry into the family.\n\n**Think about it**\n\n- What is the significance of the one-month celebration? Name three practices and what each expresses.\n- Which of the three stages of a rite of passage (separation, threshold, incorporation) does the celebration complete, and for whom?\n- Compare with one naming ceremony: one similarity, one difference.\n\n**From the teacher notes:** the celebration is cultural and religious at once; in Buddhist families it may include temple offerings and merit-making, in Taoist families ancestral offerings. It incorporates both the baby (into the family) and the mother (back into normal life). Red eggs are the signature practice.'
              }
            },
            {
              title: {
                1: 'Real case: the bar/bat mitzvah',
                2: 'Real case: the bar/bat mitzvah — why candy is thrown',
                3: 'Real case: the bar/bat mitzvah — why candy is thrown'
              },
              visual: '🍬',
              body: {
                1: '> At 13 (12 for girls in many communities), a Jewish young person becomes bar or bat mitzvah. This means they are now responsible for the commandments.\n> The milestone is marked in the synagogue. For the first time, the young person is called to the Torah. They chant the blessings and then the Haftarah, a passage from the Prophets.\n> When the Haftarah is complete, the community showers the young person with candy. It wishes a sweet life and celebrates a sweet accomplishment.\n> Months or years of study come before the day. A party follows.\n\nThe status change happens by age, whether or not there is a ceremony. The ceremony makes it public.',
                2: '> At 13 (12 for girls in many communities), a Jewish young person becomes bar or bat mitzvah — responsible for the commandments. The milestone is marked in the synagogue: for the first time, the young person is called to the Torah, chants the blessings and often the week\'s portion, and then chants the Haftarah, a passage from the Prophets.\n> When the Haftarah is complete, in many congregations the community showers the young person with candy — wishing a sweet life and celebrating a sweet accomplishment, and recalling older customs of giving sweets when a child first learns Torah.\n> Months or years of study precede the day; a celebratory meal or party follows. The young person may also give a short teaching (a d\'var Torah) and often takes on a community project.\n\n**Worked example — the three stages:** months of study and leaving childhood behind are the separation; being called to the Torah and completing the Haftarah is the threshold; the candy, the meal, and the new responsibilities are the incorporation. The status change happens by age whether or not a ceremony is held; the ceremony makes it public.',
                3: '> At 13 (12 for girls in many communities), a Jewish young person becomes bar or bat mitzvah — responsible for the commandments. The milestone is marked in the synagogue: for the first time, the young person is called to the Torah, chants the blessings and often the week\'s portion, and then chants the Haftarah, a passage from the Prophets.\n> When the Haftarah is complete, in many congregations the community showers the young person with candy — wishing a sweet life and celebrating a sweet accomplishment, and recalling older customs of giving sweets when a child first learns Torah.\n> Months or years of study precede the day; a celebratory meal or party follows. The young person may also give a short teaching (a d\'var Torah) and often takes on a community project.\n\n**Worked example — the three stages:** months of study and leaving childhood behind are the separation; being called to the Torah and completing the Haftarah is the threshold; the candy, the meal, and the new responsibilities are the incorporation. The status change happens by age whether or not a ceremony is held; the ceremony makes it public. The rite is performed by the young person but witnessed and completed by the congregation — the status change is communal recognition.\n\n**Think about it**\n\n- Why is candy thrown as the young person completes the Haftarah? What does the whole ceremony express?\n- What is the purpose of a coming-of-age rite for the community, not just the individual?\n- A bar mitzvah happens at 13 whether the young person feels ready or not; amritsanchar is chosen as an adult. Which approach better marks \'coming of age\'? What are the trade-offs?\n\n**From the teacher notes:** candy-throwing is a long-standing custom, also at weddings and aufrufs in some communities.'
              }
            },
            {
              title: {
                1: 'Coming of age across traditions',
                2: 'Coming of age across traditions: what they share, how they differ',
                3: 'Coming of age across traditions: what they share, how they differ — and check yourself'
              },
              visual: '👥',
              body: {
                1: '- **Confirmation** (many Christian churches): anointing with oil and the laying on of hands; the person confirms the faith chosen for them as a baby.\n- **Amritsanchar** (Sikhism): an adult chooses to join the Khalsa, drinks amrit, and takes on the Five Ks.\n- **Vision quest** (many First Nations): a young person fasts alone on the land, guided by an Elder.\n- **Quinceañera** (Catholic Latin American cultures): a Mass and party at 15.\n\n**Alike:** a public moment, new responsibilities, witnesses, preparation.\n\n**Different:** the age, who chooses, where it happens, and whether it is required.',
                2: '**Rites**\n\n- Confirmation (Catholic, Orthodox, many Protestant churches): anointing with oil, laying on of hands, taking a saint\'s name; the baptized person confirms the faith chosen for them as an infant\n- Amritsanchar (Sikhism): an adult-chosen initiation into the Khalsa; amrit prepared by five initiated Sikhs; the initiate takes on the Five Ks and the name Singh or Kaur\n- Vision quest / fasting (many First Nations): a young person fasts alone on the land, guided by an Elder, seeking a dream or vision that gives direction\n- Upanayana (Hinduism): the sacred thread ceremony beginning formal study, traditionally for boys of certain castes\n- Quinceañera (Catholic Latin American cultures): a Mass and celebration at 15\n\n**What they share:** a public moment; new responsibilities; a community that witnesses; preparation beforehand; often a symbol worn afterward (a cross, the Five Ks, a thread, a name).\n\n**How they differ:** age (12–13 fixed; adult-chosen; variable); who chooses (parents vs the person); location (synagogue, church, gurdwara, the land); whether it is required or voluntary.\n\n**Check yourself**\n\n- Why is a naming ceremony significant in First Nations, Hindu, Jewish, and Muslim traditions? Give one practice from each.\n- What is the significance of the one-month celebration, and what do red eggs mean?\n- Why is candy thrown at a bar/bat mitzvah?\n- Give two similarities and two differences among coming-of-age rites.',
                3: '**Rites**\n\n- Confirmation (Catholic, Orthodox, many Protestant churches): anointing with oil, laying on of hands, taking a saint\'s name; the baptized person confirms the faith chosen for them as an infant\n- Amritsanchar (Sikhism): an adult-chosen initiation into the Khalsa; amrit prepared by five initiated Sikhs; the initiate takes on the Five Ks and the name Singh or Kaur (the Five Ks are examined next lesson under D2.3)\n- Vision quest / fasting (many First Nations): a young person fasts alone on the land, guided by an Elder, seeking a dream or vision that gives direction\n- Upanayana (Hinduism): the sacred thread ceremony beginning formal study, traditionally for boys of certain castes\n- Quinceañera (Catholic Latin American cultures): a Mass and celebration at 15\n\n**What they share:** a public moment; new responsibilities; a community that witnesses; preparation beforehand; often a symbol worn afterward (a cross, the Five Ks, a thread, a name).\n\n**How they differ:** age (12–13 fixed; adult-chosen; variable); who chooses (parents vs the person); location (synagogue, church, gurdwara, the land); whether it is required or voluntary. The curriculum prompt: \'What are some similarities and differences in the birth, coming of age, and death rituals of several belief traditions?\' — death rituals come next lesson.\n\n**Worked example — a secular \'coming of age\' ceremony** (certificate, speech, family welcome): incorporation is present; the threshold is weak (a speech but no test or transformation); separation is missing (no preparation, fasting, study, or leaving childhood behind). Religious rites have months of study, a vow, or a solitary fast. Preparation and endurance make the change real rather than declared.\n\n**Check yourself**\n\n- Why is a naming ceremony significant in First Nations, Hindu, Jewish, and Muslim traditions? Give one practice from each.\n- What is the significance of the one-month celebration, and what do red eggs mean?\n- Why is candy thrown at a bar/bat mitzvah?\n- Give two similarities and two differences among coming-of-age rites.\n\n**Think about it:** Canada marks adulthood with a driver\'s licence, voting at 18, and legal drinking age. Are these rites of passage? What do they lack that religious rites have?'
              }
            }
          ]
        },

        // ---- Lesson 6: Rites of Passage: Marriage, Death, and Their Symbols ----
        {
          title: 'Rites of Passage: Marriage, Death, and Their Symbols',
          slides: [
            {
              title: {
                1: 'Life\'s great thresholds',
                2: 'Rites of passage: marriage, death, and their symbols',
                3: 'Rites of passage: marriage, death, and their symbols — life\'s great thresholds'
              },
              visual: '💍',
              body: {
                1: 'Seven steps around a fire. A glass broken under a canopy. Ashes carried to a river. A web hung over a cradle.\n\nThink of a wedding. Rings, flowers, a dress — what does each one **mean**?\n\nToday we learn:\n\n- marriage and death rites in several traditions\n- how Hindu cremation shows what Hindus believe about the afterlife\n- the meaning of the tallit, the Five Ks, the dream catcher, and a painting of baptism\n\nThis lesson includes death rituals. Step out if you need to.',
                2: 'Seven steps around a fire, a glass broken under a canopy, ashes carried to a river, a web hung over a cradle: the rites and symbols of life\'s great thresholds.\n\nContent note: today includes death rituals; students may step out if needed. Open gently: what objects do you associate with a wedding (rings, flowers, a dress) and what does each \'mean\'? Today we read the symbols of marriage and death rites, and the art made about rites of passage.\n\n**Learning goals**\n\n- Describe the practices and rituals of marriage and death rites in several traditions and explain their significance.\n- Demonstrate understanding of symbols, art, and literature associated with rites of passage.\n- Compare death rituals across traditions and connect them to beliefs about the afterlife.\n\n**Success criteria — I can…**\n\n- describe one marriage rite and one death rite from two traditions each, with their significance\n- explain the symbolism of the tallit, the Five Ks, and the dream catcher, and what He Qi\'s painting shows about baptism\n- explain how Hindu cremation rituals reflect Hindu understanding of the afterlife',
                3: '**Expectations: D2.2, D2.3, D2.1**\n\nSeven steps around a fire, a glass broken under a canopy, ashes carried to a river, a web hung over a cradle: the rites and symbols of life\'s great thresholds.\n\nContent note: today includes death rituals; students may step out if needed. Open gently: what objects do you associate with a wedding (rings, flowers, a dress) and what does each \'mean\'? Today we read the symbols of marriage and death rites, and the art made about rites of passage.\n\n**Learning goals**\n\n- Describe the practices and rituals of marriage and death rites in several traditions and explain their significance (D2.2).\n- Demonstrate understanding of symbols, art, and literature associated with rites of passage (D2.3).\n- Compare death rituals across traditions and connect them to beliefs about the afterlife (D2.1, Unit 1 Lesson 3).\n\n**Success criteria — I can…**\n\n- describe one marriage rite and one death rite from two traditions each, with their significance\n- explain the symbolism of the tallit, the Five Ks, and the dream catcher, and what He Qi\'s painting shows about baptism\n- explain how Hindu cremation rituals reflect Hindu understanding of the afterlife\n\n**From the teacher notes:** D2.2\'s prompt is Hindu cremation and the afterlife; D2.3\'s are He Qi, the tallit, amritsanchar\'s symbols, and the Ojibwe dream catcher. The Five Ks are also daily observances (Lesson 7); here they are the symbols taken on at amritsanchar. Pronunciations: Antyeshti (un-TYESH-tee), chuppah (HOO-pah), laavan (LAH-van). Descriptions stay respectful and non-graphic.'
              }
            },
            {
              title: {
                1: 'Marriage rites and their meaning',
                2: 'Marriage rites and their meaning',
                3: 'Marriage rites and their meaning: a covenant witnessed by the divine and the community'
              },
              visual: '🔥',
              body: {
                1: '| Tradition | Practice | What it says |\n| Hindu | Seven steps around a sacred fire | The fire is the witness |\n| Jewish | Vows under a chuppah; a glass broken underfoot | A home built before witnesses; joy mixed with memory |\n| Christian | Vows before God and the congregation, with rings | A promise made before God |\n| Muslim | The nikah — a contract with witnesses and a gift (mahr) to the bride | Rights and protection spelled out |\n| Sikh | Anand Karaj — four circuits of the Guru Granth Sahib | The marriage as a journey |\n\nIn every tradition, marriage is a promise witnessed by the divine and the community.',
                2: '| Tradition | Practice |\n| Hindu | Seven steps (saptapadi) around a sacred fire, each a vow; the fire is the witness |\n| Jewish | Vows under a chuppah; a ring before witnesses; seven blessings; a glass broken underfoot |\n| Christian | Vows before God and the congregation, with rings and a blessing; a sacrament for Catholics and Orthodox |\n| Muslim | The nikah — a contract with consent, witnesses, and the mahr; then a walima (feast) |\n| Sikh | Anand Karaj — four circuits of the Guru Granth Sahib as the laavan are sung |\n\n**What the practices say**\n\n- Marriage is a covenant witnessed by the divine and the community, not only a private agreement\n- Fire, canopy, altar, scripture: the couple stand before something larger than themselves\n- The broken glass: joy mixed with memory of the Temple\'s destruction, and the fragility of relationships\n- The seven steps and four circuits: the marriage as a journey with stages and duties\n- The contract and mahr: rights and obligations spelled out — protection, especially for the bride',
                3: '| Tradition | Practice |\n| Hindu | Seven steps (saptapadi) around a sacred fire, each a vow; the fire is the witness |\n| Jewish | Vows under a chuppah; a ring before witnesses; seven blessings; a glass broken underfoot |\n| Christian | Vows before God and the congregation, with rings and a blessing; a sacrament for Catholics and Orthodox |\n| Muslim | The nikah — a contract with consent, witnesses, and the mahr; then a walima (feast) |\n| Sikh | Anand Karaj — four circuits of the Guru Granth Sahib as the laavan are sung |\n\n**What the practices say**\n\n- Marriage is a covenant witnessed by the divine and the community, not only a private agreement\n- Fire, canopy, altar, scripture: the couple stand before something larger than themselves\n- The broken glass: joy mixed with memory of the Temple\'s destruction, and the fragility of relationships\n- The seven steps and four circuits: the marriage as a journey with stages and duties\n- The contract and mahr: rights and obligations spelled out — protection, especially for the bride\n\n**Worked example:** the Sikh Anand Karaj\'s four circuits of the Guru Granth Sahib express the couple\'s journey toward union with God; the Jewish chuppah expresses a home built before witnesses, and the broken glass joy mixed with memory and fragility. A Jewish wedding under the chuppah makes visible the belief that a person is made for covenant and community.\n\n**Think about it:** in every tradition on this slide the marriage is witnessed and placed before the sacred — compare with the way pop culture presents marriage as romance and spectacle (Unit 1 Lesson 9). Which practice do you find most striking, and what does it say?'
              }
            },
            {
              title: {
                1: 'Real case: Hindu cremation and the afterlife',
                2: 'Real case: Hindu cremation and the afterlife — Antyeshti, the last sacrifice',
                3: 'Real case: Hindu cremation and the afterlife — Antyeshti, the last sacrifice'
              },
              visual: '🏞️',
              body: {
                1: '> In Hindu teaching, the self (atman) is reborn again and again until it is released (moksha). The body is a temporary home.\n> The funeral rites make this belief visible. The body is washed, dressed, and cremated, ideally within a day. The eldest son traditionally lights the fire.\n> The fire returns the body to earth, air, and water. It frees the self to move on.\n> The ashes are gathered and placed in a river — the Ganges if possible. In Ontario, families have used the Credit River and other designated sites.\n> For about thirteen days the family mourns and performs rituals (shraddha) that help the departed on their way. A final meal ends the mourning.\n> Mourners wear white, not black.',
                2: '> In Hindu teaching, the self (atman) is reborn until it is released (moksha); the body is a temporary home. The funeral rites make this belief visible. The body is washed, dressed, and cremated, ideally within a day, on a pyre lit traditionally by the eldest son; the fire returns the body\'s elements to the earth, air, and water and frees the self to move on. Prayers from the Vedas and the Bhagavad Gita are recited.\n> The ashes are gathered and immersed in a river — the Ganges if possible, or another river; in Ontario, families have immersed ashes in the Credit River and other designated sites, and some travel to India.\n> For about thirteen days the family mourns and performs rituals (shraddha) that help the departed on their way and honour the ancestors; a final meal marks the end of mourning. Mourners wear white, not black.',
                3: '> In Hindu teaching, the self (atman) is reborn until it is released (moksha); the body is a temporary home. The funeral rites make this belief visible. The body is washed, dressed, and cremated, ideally within a day, on a pyre lit traditionally by the eldest son; the fire returns the body\'s elements to the earth, air, and water and frees the self to move on. Prayers from the Vedas and the Bhagavad Gita are recited.\n> The ashes are gathered and immersed in a river — the Ganges if possible, or another river; in Ontario, families have immersed ashes in the Credit River and other designated sites, and some travel to India.\n> For about thirteen days the family mourns and performs rituals (shraddha) that help the departed on their way and honour the ancestors; a final meal marks the end of mourning. Mourners wear white, not black.\n\n**Think about it**\n\n- How do the rituals reflect Hindu understanding of the afterlife? Connect three practices to beliefs about atman, rebirth, and moksha.\n- Why cremation rather than burial, and why water afterward?\n- Compare with one other tradition\'s death rituals (Christian, Muslim, Jewish, or Buddhist): one similarity, one difference, and the belief behind the difference.\n\n**From the teacher notes:** fire releases the atman; the body is not preserved because it is not the person; water carries the remains back into the cycle of nature; shraddha helps the departed and honours ancestors; white signifies purity and release rather than final loss. Several Ontario municipalities designate sites for ash immersion; the Credit River has been used with permission.'
              }
            },
            {
              title: {
                1: 'Death rituals compared',
                2: 'Death rituals compared: the belief behind the practice',
                3: 'Death rituals compared: the belief behind the practice'
              },
              visual: '⚖️',
              body: {
                1: '| Tradition | Practice |\n| Islam | Washed by family, buried within about a day facing Mecca; no cremation |\n| Judaism | Quick burial in a plain shroud; seven days of shiva; a stone left on the grave |\n| Christianity | Funeral with scripture and prayers; burial or cremation; hope of resurrection |\n| Buddhism | Usually cremation; chanting and merit for the departed |\n| Many First Nations | Wakes over days; a sacred fire; feasting |\n\n**Alike:** respect for the body, the community gathers, a set time of mourning, a meal.\n\n**Different:** burial or cremation, how fast, who prepares the body, how long the mourning lasts.\n\nWhat a tradition believes happens after death decides what is done with the body.',
                2: '| Tradition | Practices |\n| Islam | Washed and shrouded by family, prayed over, buried within about a day facing Mecca; no cremation |\n| Judaism | Quick burial in a plain shroud and simple coffin; seven days of shiva; Kaddish for eleven months; a stone left on the grave |\n| Christianity | Funeral with scripture and prayers, often the Eucharist; burial or cremation; hope of resurrection |\n| Buddhism | Usually cremation; chanting and merit for the departed; 49 days of rites in Tibetan tradition |\n| Many First Nations | Wakes over days; a sacred fire; feasting; ceremonies for the spirit\'s journey |\n\n**Share:** reverence for the body; the community gathers; set mourning periods; prayer or ceremony for the dead and the living; a meal.\n\n**Differ:** burial vs cremation (resurrection vs release); speed; who prepares the body; length of mourning.\n\n**The belief behind the practice:** what happens after death decides what is done with the body. Islam forbids cremation and buries facing Mecca because of belief in bodily resurrection and return to God; Hinduism cremates because the self is released from a temporary body.',
                3: '| Tradition | Practices |\n| Islam | Washed and shrouded by family, prayed over, buried within about a day facing Mecca; no cremation |\n| Judaism | Quick burial in a plain shroud and simple coffin; seven days of shiva; Kaddish for eleven months; a stone left on the grave |\n| Christianity | Funeral with scripture and prayers, often the Eucharist; burial or cremation; hope of resurrection |\n| Buddhism | Usually cremation; chanting and merit for the departed; 49 days of rites in Tibetan tradition |\n| Many First Nations | Wakes over days; a sacred fire; feasting; ceremonies for the spirit\'s journey |\n\n**Share:** reverence for the body; the community gathers; set mourning periods; prayer or ceremony for the dead and the living; a meal.\n\n**Differ:** burial vs cremation (resurrection vs release); speed; who prepares the body; length of mourning.\n\n**The belief behind the practice:** what happens after death (Unit 1 Lesson 3) decides what is done with the body. Islam forbids cremation and buries facing Mecca because of belief in bodily resurrection and return to God; Hinduism cremates because the self is released from a temporary body. Grief is shared, but the body is treated according to what the person is thought to be; rituals also serve the living by setting periods of mourning and gathering the community.\n\n**Worked example — a funeral home\'s \'standard package\'** (embalming, a chapel viewing three to five days later, a casket, burial or cremation at the family\'s convenience): it conflicts with Hindu rites (cremation ideally within a day; the eldest son\'s role; ash immersion), Muslim rites (washing by family, burial within about a day facing Mecca, no cremation), and Jewish rites (no embalming, burial as soon as possible, a plain shroud and simple coffin, shiva). \'Treat everyone the same\' becomes \'treat every family according to its own rites\' — identical treatment is not always fair (Unit 1 Lesson 8).\n\n**Think about it:** Hindus cremate and release; Muslims and Jews bury quickly and simply; Christians do either with hope of resurrection. What does each practice say the person IS?'
              }
            },
            {
              title: {
                1: 'Symbols and art of rites of passage',
                2: 'Symbols and art of rites of passage',
                3: 'Symbols and art of rites of passage (D2.3) — and check yourself'
              },
              visual: '🎨',
              body: {
                1: '- **He Qi, The Baptism of Jesus:** a Chinese-born artist paints Jesus in the Jordan with John, water flowing and a dove coming down. Baptism means a new identity and the Spirit\'s presence.\n- **The tallit:** the Jewish prayer shawl. Its fringes (tzitzit) recall the commandments. Many young people wear one for the first time at bar/bat mitzvah.\n- **The Five Ks:** kesh (uncut hair), kangha (comb), kara (steel bracelet), kachera (undergarment), kirpan (sword). Taking them on says what a Khalsa Sikh promises to be.\n- **The Ojibwe dream catcher:** grandmothers wove willow hoops with webs to hang over cradles. Bad dreams catch in the web; good dreams pass through. It shows the community\'s care for its newest members.',
                2: '**He Qi, The Baptism of Jesus:** the Chinese-born artist (b. 1950) paints Gospel scenes in bold colour with Chinese folk-art forms. His Baptism shows Jesus in the Jordan with John, water flowing and a dove descending: new identity and the Spirit\'s presence, re-enacted for every believer. The style says the story belongs to every culture.\n\n**The tallit at bar/bat mitzvah:** the fringes (tzitzit) recall the commandments. Many young people wear a tallit for the first time at bar/bat mitzvah: wrapping themselves in the commandments they have just become responsible for.\n\n**The Five Ks at amritsanchar:** kesh: acceptance of God\'s will; kangha: order; kara: the unbroken circle of God and restraint of the hand; kachera: self-control; kirpan: the duty to defend justice and the weak. Taking them on states what a Khalsa Sikh promises to be.\n\n**The Ojibwe dream catcher:** in Ojibwe teaching, Asibikaashi (Spider Woman) protected children; as the people spread across Turtle Island, grandmothers wove willow hoops with sinew webs to hang over cradles. Bad dreams catch in the web and vanish at sunrise; good dreams pass through the centre. Hoop, web, and feathers carry the community\'s care for its newest members.\n\n**Check yourself**\n\n- How do Hindu cremation rituals reflect beliefs about the afterlife? Name three practices.\n- What does the tallit mean at bar/bat mitzvah? What do the Five Ks represent at amritsanchar?\n- How do the symbols woven into a dream catcher convey the community\'s values?',
                3: '**He Qi, The Baptism of Jesus:** the Chinese-born artist (b. 1950) paints Gospel scenes in bold colour with Chinese folk-art forms. His Baptism shows Jesus in the Jordan with John, water flowing and a dove descending: new identity and the Spirit\'s presence, re-enacted for every believer. The style says the story belongs to every culture.\n\n**The tallit at bar/bat mitzvah:** the fringes (tzitzit) recall the commandments (Numbers 15:38–40). Many young people wear a tallit for the first time at bar/bat mitzvah: wrapping themselves in the commandments they have just become responsible for.\n\n**The Five Ks at amritsanchar:** kesh: acceptance of God\'s will; kangha: order; kara: the unbroken circle of God and restraint of the hand; kachera: self-control; kirpan: the duty to defend justice and the weak. Taking them on states what a Khalsa Sikh promises to be — a person who accepts God\'s will, restrains the hand, and defends the weak, every day.\n\n**The Ojibwe dream catcher:** in Ojibwe teaching, Asibikaashi (Spider Woman) protected children; as the people spread across Turtle Island, grandmothers wove willow hoops with sinew webs to hang over cradles. Bad dreams catch in the web and vanish at sunrise; good dreams pass through the centre. Hoop, web, and feathers carry the community\'s care for its newest members. The mass-produced version sold everywhere is the classic appropriation example (Unit 1 Lesson 9) — the ceremonial object is made for a specific child by family. Ojibwe views vary: some makers sell dream catchers and see them as a gift to share; others object to mass production without the teaching.\n\n**Check yourself**\n\n- How do Hindu cremation rituals reflect beliefs about the afterlife? Name three practices.\n- Give one similarity and two differences between death rituals in two traditions, with the belief behind one difference.\n- What does the tallit mean at bar/bat mitzvah? What do the Five Ks represent at amritsanchar?\n- How do the symbols woven into a dream catcher convey the community\'s values?\n\n**Think about it:** the Five Ks are worn every day, not only at the ceremony. What is the difference between a symbol you receive once (a certificate) and one you carry always? Complete the three-part comparison: one similarity across birth, coming of age, AND death rituals in the traditions we studied.'
              }
            }
          ]
        },

        // ---- Lesson 7: Daily Observances: Prayer, Washing, Meditation ----
        {
          title: 'Daily Observances: Prayer, Washing, Meditation',
          slides: [
            {
              title: {
                1: 'What a day looks like inside a tradition',
                2: 'Daily observances: what a day looks like inside a tradition',
                3: 'Daily observances: what a day looks like inside a tradition'
              },
              visual: '🌅',
              body: {
                1: 'Five prayers a day facing one city. A cord untied and retied with prayer. Words on the doorframe, the forehead, and the heart. The sun greeted each morning.\n\nList everything you do every single day. Which of those things has a meaning beyond itself? **Daily observances** are the practices traditions give that quality to.\n\nToday we learn:\n\n- daily rituals from at least five traditions\n- Salah, the Shema, the Kusti, the sunrise ceremony, and the Five Ks\n- how the Shema is kept through both clothing and ritual',
                2: 'Five times a day facing one city; a cord untied and retied with prayer; words on the doorframe, the forehead, and the heart; the sun greeted each morning. What a day looks like inside a tradition.\n\nList everything you do every single day without fail. Which of those things has meaning beyond itself? Daily observances are the practices traditions give that quality to: today we survey them and look closely at five.\n\n**Learning goals**\n\n- Identify daily rituals of various world religions and belief traditions — regular prayer, ritual bathing, meditation, and others.\n- Describe the role and significance of daily observances such as the Kusti prayers, Salah, the Shema, the sunrise ceremony, and the Five Ks.\n- Explain how each practice carries a core teaching into ordinary time.\n\n**Success criteria — I can…**\n\n- name daily rituals from at least five traditions\n- describe Salah, the Shema, the Kusti, the sunrise ceremony, and the Five Ks and explain the significance of each\n- explain how the Shema is observed through both clothing and ritual',
                3: '**Expectations: D3.1, D3.2**\n\nFive times a day facing one city; a cord untied and retied with prayer; words on the doorframe, the forehead, and the heart; the sun greeted each morning. What a day looks like inside a tradition.\n\nList everything you do every single day without fail. Which of those things has meaning beyond itself? Daily observances are the practices traditions give that quality to: today we survey them and look closely at five.\n\n**Learning goals**\n\n- Identify daily rituals of various world religions and belief traditions — regular prayer, ritual bathing, meditation, and others (D3.1).\n- Describe the role and significance of daily observances such as the Kusti prayers, Salah, the Shema, the sunrise ceremony, and the Five Ks (D3.2).\n- Explain how each practice carries a core teaching into ordinary time.\n\n**Success criteria — I can…**\n\n- name daily rituals from at least five traditions\n- describe Salah, the Shema, the Kusti, the sunrise ceremony, and the Five Ks and explain the significance of each\n- explain how the Shema is observed through both clothing and ritual\n\n**From the teacher notes — common confusions to avoid:** Salah is prayer (the act); the adhan is the call to it. Tefillin are worn on weekday mornings, not Shabbat. The Kusti is Zoroastrian, not Hindu (the sacred thread of upanayana is a different practice). D3.2\'s prompts are the Shema (clothing and ritual) and the sunrise ceremony (attitude to the natural world); Lesson 8 then asks how daily practice shapes a life.'
              }
            },
            {
              title: {
                1: 'A day\'s rituals across traditions',
                2: 'A day\'s rituals across traditions',
                3: 'A day\'s rituals across traditions (D3.1): four kinds of daily ritual'
              },
              visual: '🕰️',
              body: {
                1: '| Kind of ritual | Examples |\n| Regular prayer | Salah five times (Islam); the Shema (Judaism); Nitnem prayers (Sikhism); Kusti prayers (Zoroastrianism); puja at a home shrine (Hinduism) |\n| Washing | Wudu before Salah (Islam); a morning bath before puja (Hinduism); hand-washing (Judaism) |\n| Meditation and silence | Sitting meditation (Buddhism); japa with beads (Hinduism and Sikhism); the Rosary (Christianity); dhikr (Islam) |\n| Thanking the day | Sunrise ceremony (many First Nations); grace before meals; Modeh Ani on waking (Judaism) |\n\nWhich kind does your own daily routine most look like — a morning run, a gratitude journal?',
                2: '| Kind of ritual | Examples |\n| Regular prayer | Salah five times (Islam); Shema and three daily services (Judaism); the Liturgy of the Hours and morning/evening prayer (Christianity); Nitnem — set morning, evening, and bedtime prayers (Sikhism); Kusti prayers (Zoroastrianism); puja at a home shrine (Hinduism) |\n| Ritual bathing and washing | Wudu before Salah (Islam); morning bath before puja and bathing in sacred rivers (Hinduism); the mikveh for specific occasions and netilat yadayim hand-washing (Judaism); purification with water at a shrine entrance (Shinto) |\n| Meditation and silence | Sitting meditation and mindfulness (Buddhism); japa — repeating a mantra on beads (Hinduism and Sikhism); the Rosary and contemplative prayer (Christianity); dhikr — remembrance of God\'s names (Islam, especially Sufi practice); silence before meals in some traditions |\n| Greeting and thanking the day | Sunrise ceremony and smudging (many First Nations); the Thanksgiving Address opening gatherings (Haudenosaunee); grace before meals (many traditions); the Modeh Ani prayer on waking (Judaism); the Gayatri mantra at dawn (Hinduism) |\n\nFour kinds of daily ritual, each found in several traditions. Which kind does your own routine most resemble, religious or not (a morning run, a gratitude journal)?',
                3: '| Kind of ritual | Examples |\n| Regular prayer | Salah five times (Islam); Shema and three daily services (Judaism); the Liturgy of the Hours and morning/evening prayer (Christianity); Nitnem — set morning, evening, and bedtime prayers (Sikhism); Kusti prayers (Zoroastrianism); puja at a home shrine (Hinduism) |\n| Ritual bathing and washing | Wudu before Salah (Islam); morning bath before puja and bathing in sacred rivers (Hinduism); the mikveh for specific occasions and netilat yadayim hand-washing (Judaism); purification with water at a shrine entrance (Shinto) |\n| Meditation and silence | Sitting meditation and mindfulness (Buddhism); japa — repeating a mantra on beads (Hinduism and Sikhism); the Rosary and contemplative prayer (Christianity); dhikr — remembrance of God\'s names (Islam, especially Sufi practice); silence before meals in some traditions |\n| Greeting and thanking the day | Sunrise ceremony and smudging (many First Nations); the Thanksgiving Address opening gatherings (Haudenosaunee); grace before meals (many traditions); the Modeh Ani prayer on waking (Judaism); the Gayatri mantra at dawn (Hinduism) |\n\nFour kinds of daily ritual, each found in several traditions. Which kind does your own routine most resemble, religious or not (a morning run, a gratitude journal)?\n\n**Salah and the Kusti: prayer that structures a day**\n\n- **Salah (Islam):** five set times — Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), Isha (night); the times follow the sun, so they shift through the year. Wudu first: washing as preparation of body and mind. Facing the Kaaba in Mecca (the qibla); set postures — standing, bowing, prostrating, sitting; Qur\'an recited in Arabic. Significance: a pillar of Islam; submission and remembrance of God five times daily; the same prayer performed by Muslims worldwide at the same postures; Friday noon prayer in congregation.\n- **Kusti prayers (Zoroastrianism):** after initiation (navjote), a Zoroastrian wears the sudreh (white cotton shirt) and the Kusti (a woollen cord of 72 threads) at all times. Several times a day — on waking, before prayer, after washing — the Kusti is untied and retied around the waist while reciting prayers in Avestan, facing a source of light. Each knot is tied with a thought: good thoughts, good words, good deeds (humata, hukhta, hvarshta) — the core Zoroastrian ethic; the cord girds the person for the fight of good against evil. The whole faith\'s ethic rehearsed in the hands several times a day; shirt and cord as an \'armour\' of the faith. Toronto has a significant Zoroastrian (Parsi and Iranian) community.'
              }
            },
            {
              title: {
                1: 'Real case: the Shema in clothing and ritual',
                2: 'Real case: the Shema in clothing and ritual — \'Bind them as a sign… write them on the doorposts\'',
                3: 'Real case: the Shema in clothing and ritual — \'Bind them as a sign… write them on the doorposts\''
              },
              visual: '🚪',
              body: {
                1: '> The Shema begins \'Hear, O Israel: the Lord our God, the Lord is one\'. It goes on: love God with all your heart; teach these words to your children; speak of them when you lie down and when you rise; bind them as a sign on your hand and between your eyes; write them on the doorposts of your house.\n> Observant Jews carry out each line.\n> The Shema is recited every morning and evening and at bedtime.\n> Its words are written on tiny parchments inside the tefillin, small boxes bound on the arm and forehead in weekday morning prayer.\n> They are also inside the mezuzah fixed to the doorpost of every room, touched when passing.\n> The fringes (tzitzit) on the tallit, and on the small tallit katan worn under the shirt, recall the commandments every time they are seen.',
                2: '> The Shema begins \'Hear, O Israel: the Lord our God, the Lord is one\', and continues: love God with all your heart, soul, and might; teach these words to your children; speak of them at home and on the way, when you lie down and when you rise; bind them as a sign on your hand and between your eyes; write them on the doorposts of your house.\n> Observant Jews carry out each line: the Shema is recited every morning and evening and at bedtime; its words are written on tiny parchments inside the tefillin bound on the arm and forehead in weekday morning prayer and inside the mezuzah fixed to the doorpost of every room, touched when passing; the fringes (tzitzit) on the tallit and the small tallit katan worn under the shirt recall the commandments every time they are seen.\n> The Shema is also traditionally the last words a Jew hopes to say before death.\n\n**Clothing:** tefillin (weekday mornings), tzitzit on the tallit and tallit katan. **Ritual:** recitation morning, evening, and at bedtime; the mezuzah on doorposts, touched when passing; teaching children.',
                3: '> The Shema begins \'Hear, O Israel: the Lord our God, the Lord is one\', and continues: love God with all your heart, soul, and might; teach these words to your children; speak of them at home and on the way, when you lie down and when you rise; bind them as a sign on your hand and between your eyes; write them on the doorposts of your house.\n> Observant Jews carry out each line: the Shema is recited every morning and evening and at bedtime; its words are written on tiny parchments inside the tefillin bound on the arm and forehead in weekday morning prayer and inside the mezuzah fixed to the doorpost of every room, touched when passing; the fringes (tzitzit) on the tallit and the small tallit katan worn under the shirt recall the commandments every time they are seen.\n> The Shema is also traditionally the last words a Jew hopes to say before death.\n\n**Clothing:** tefillin (weekday mornings), tzitzit on the tallit and tallit katan, the tallit at prayer. **Ritual:** recitation morning, evening, and at bedtime; the mezuzah on doorposts, touched when passing; teaching children; the hoped-for last words before death. The declaration is from Deuteronomy 6:4.\n\n**Think about it**\n\n- How is the Shema observed through both clothing and ritual? List the clothing and the rituals separately.\n- What does it do to a person to meet the same words on waking, on the doorframe, on the arm, and on the clothing all day? (This previews Lesson 8: daily practice as formation of attention and identity.)\n- Compare with one other tradition\'s daily \'reminders\' (the Five Ks, the Kusti, a cross worn, a kara). What is similar?\n- The Shema is worn on the body and the house. What would a secular \'Shema\' look like — words you would want to meet all day? Would it work without the ritual?'
              }
            },
            {
              title: {
                1: 'Real case: the sunrise ceremony',
                2: 'Real case: the sunrise ceremony — greeting the day facing east',
                3: 'Real case: the sunrise ceremony — greeting the day facing east'
              },
              visual: '🌄',
              body: {
                1: '> In many First Nations, the day begins by greeting the sun. Forms differ by nation.\n> A sunrise ceremony often includes rising before dawn, facing east, offering tobacco to the fire or the earth, and smudging with sage, cedar, or sweetgrass.\n> People give thanks — for the new day, the sun, the water, the land, the ancestors, and the people.\n> Some communities gather for sunrise ceremonies on special days, such as National Indigenous Peoples Day and the solstices. Some people practise alone each morning.\n> Teachers describe the ceremony as a way of starting the day in gratitude. The person does not take the day as owed, but receives it.',
                2: '> In many First Nations, the day begins by greeting the sun. Forms differ by nation, but a sunrise ceremony commonly includes rising before dawn, facing east, offering tobacco to the fire or the earth, smudging with sage, cedar, or sweetgrass, and giving thanks — for the new day, the sun, the water, the land, the ancestors, and the people.\n> Some communities gather for sunrise ceremonies on significant days (National Indigenous Peoples Day, the solstices); individuals may practise alone each morning.\n> Teachers describe the ceremony as a way of starting the day in gratitude and in relationship: the person does not take the day as owed but receives it.\n\n**Affect and reflect:** beginning each day facing east, offering tobacco, smudging, and giving thanks for sun, water, land, and ancestors trains gratitude and relationship, so the person treats creation as relatives rather than resources. The ceremony exists because the tradition already understands humans as one part of creation.',
                3: '> In many First Nations, the day begins by greeting the sun. Forms differ by nation, but a sunrise ceremony commonly includes rising before dawn, facing east, offering tobacco to the fire or the earth, smudging with sage, cedar, or sweetgrass, and giving thanks — for the new day, the sun, the water, the land, the ancestors, and the people.\n> Some communities gather for sunrise ceremonies on significant days (National Indigenous Peoples Day, the solstices); individuals may practise alone each morning.\n> Teachers describe the ceremony as a way of starting the day in gratitude and in relationship: the person does not take the day as owed but receives it.\n\n**Worked example — affect and reflect (the D3.2 prompt):** beginning each day facing east, offering tobacco, smudging, and giving thanks for sun, water, land, and ancestors trains gratitude and relationship, so the person treats creation as relatives rather than resources. The ceremony exists because the tradition already understands humans as one part of creation (Unit 1 Lesson 3). Held outdoors at dawn, it keeps the person\'s time tied to the sun\'s, not the clock\'s.\n\n**Think about it**\n\n- What does it mean to begin a day by giving thanks before asking for anything? Compare with another tradition\'s morning prayer.\n- Why might the ceremony be held facing east, outdoors, at dawn, rather than indoors at a convenient time?\n- Salah times follow the sun; the sunrise ceremony faces the dawn; the Kusti is tied facing light. Why do so many daily observances tie the person to the sky rather than to the clock?\n\n**From the teacher notes:** the slide gives a general description from Indigenous educators, not a script; forms vary by nation. Invite an Indigenous educator if possible.'
              }
            },
            {
              title: {
                1: 'The Five Ks every day — and check yourself',
                2: 'The Five Ks as daily observance — and check yourself',
                3: 'The Five Ks as daily observance — and check yourself'
              },
              visual: '⌚',
              body: {
                1: 'An initiated Sikh wears the Five Ks every day for life: kesh (uncut hair, usually under a turban), kangha (a small comb), kara (a steel bracelet), kachera (cotton undergarment), kirpan (a small sheathed sword).\n\nThey are not jewellery. Each is an article of faith and a discipline. The hair is combed twice a day. The kara reminds the hand not to do wrong.\n\nBecause they are visible, a Sikh is recognizable as a Sikh at every moment — and so must live as one.\n\n**Check yourself**\n\n- How is the Shema kept through both clothing and ritual?\n- How might the sunrise ceremony shape a person\'s attitude toward nature?',
                2: 'An initiated Sikh wears the Five Ks every day for life: kesh (uncut hair, usually covered by a turban), kangha (a small wooden comb in the hair), kara (a steel bracelet on the right wrist), kachera (cotton undergarment), kirpan (a small sheathed sword).\n\nThey are not jewellery or costume: each is an article of faith with a meaning (Lesson 6) and a discipline — the hair is combed twice daily, the kara restrains the hand from wrong, the kirpan is a reminder of the duty to defend the weak. Together with Nitnem (daily prayers) and the ideals of honest work, sharing earnings, and remembering God, the Five Ks make a Sikh\'s identity visible around the clock.\n\nBecause they are visible, they meet the secular world constantly: helmets, uniforms, airport security, school dress codes. **Role and significance:** the Five Ks turn belief into a body that cannot be hidden — a Sikh is recognizable as a Sikh at every moment, and so must live as one.\n\n**Check yourself**\n\n- Name one daily ritual from each of five traditions.\n- How is the Shema observed through both clothing and ritual?\n- Describe Salah (times, preparation, direction) and the Kusti prayers (what, how often, what the knots mean).\n- How might the sunrise ceremony affect and reflect a person\'s attitude toward the natural world?',
                3: 'An initiated Sikh wears the Five Ks every day for life: kesh (uncut hair, usually covered by a turban), kangha (a small wooden comb in the hair), kara (a steel bracelet on the right wrist), kachera (cotton undergarment), kirpan (a small sheathed sword).\n\nThey are not jewellery or costume: each is an article of faith with a meaning (Lesson 6) and a discipline — the hair is combed twice daily, the kara restrains the hand from wrong, the kirpan is a reminder of the duty to defend the weak. Together with Nitnem (daily prayers) and the ideals of honest work, sharing earnings, and remembering God, the Five Ks make a Sikh\'s identity visible around the clock.\n\nBecause they are visible, they meet the secular world constantly: helmets, uniforms, airport security, school dress codes (Unit 1 Lessons 7–8; Lesson 8 next). **Role and significance:** the Five Ks turn belief into a body that cannot be hidden — a Sikh is recognizable as a Sikh at every moment, and so must live as one.\n\n**Worked example — a workplace \'daily ritual\' policy:** \'quiet reflection at your desk\' does not fit real practices. Salah needs set sun-based times, wudu (water), a clean space, and the direction of Mecca; tefillin and the Shema need a few private minutes on weekday mornings; the Five Ks need no break but must be allowed under dress and safety rules; the sunrise ceremony needs outdoor space facing east before shift, with tobacco or smudge. \'Performed\' observances need time and space; \'worn\' observances need policies that allow the articles at all times — and raise different accommodation questions.\n\n**Check yourself**\n\n- Name one daily ritual from each of five traditions.\n- How is the Shema observed through both clothing and ritual?\n- Describe Salah (times, preparation, direction) and the Kusti prayers (what, how often, what the knots mean).\n- How might the sunrise ceremony affect and reflect a person\'s attitude toward the natural world?\n\n**Think about it:** which is harder — a practice done five times a day (Salah) or one worn every moment (the Five Ks)? What does each do to a person over years?'
              }
            }
          ]
        },

        // ---- Lesson 8: How Daily Practice Shapes a Life ----
        {
          title: 'How Daily Practice Shapes a Life',
          slides: [
            {
              title: {
                1: 'The small, repeated things',
                2: 'How daily practice shapes a life: the small, repeated things make a person',
                3: 'How daily practice shapes a life: the small, repeated things make a person'
              },
              visual: '🔁',
              body: {
                1: 'A sentence of thanks before every meal. Twenty minutes of silence each morning. A turban worn into a police academy.\n\nWhat one thing, done every day, has most shaped who you are? Traditions have always known that daily repetition **forms** a person.\n\nToday we learn:\n\n- how saying grace anchors a day\n- what daily meditation, prayer, or time in nature might do to a life\n- what happens when the Five Ks meet a world that does not know them',
                2: 'A sentence of thanks before every meal; twenty minutes of silence each morning; a turban worn into a police academy. How the small, repeated things make a person.\n\nWhat one thing, done every day, has most shaped who you are — practice, reading, a sport, a chore? Traditions have always known that daily repetition forms a person. Today we look at three ways daily observance shapes a life — and what happens when it meets a world that does not share it.\n\n**Learning goals**\n\n- Explain how daily practices and rituals connect to and affect the lives of adherents.\n- Analyse how saying grace anchors and regulates a believer\'s day, and how daily meditation, prayer, or time in nature might affect a life.\n- Examine the tensions a Sikh who observes the Five Ks may encounter in a secular world, and how Canada has addressed some of them.\n\n**Success criteria — I can…**\n\n- explain two ways a daily observance shapes a person\'s attention, time, or identity\n- describe how grace before and after meals anchors a day\n- describe a real case in which the Five Ks met Canadian institutions and explain the outcome',
                3: '**Expectations: D3.3, C2.4**\n\nA sentence of thanks before every meal; twenty minutes of silence each morning; a turban worn into a police academy. How the small, repeated things make a person.\n\nWhat one thing, done every day, has most shaped who you are — practice, reading, a sport, a chore? Traditions have always known that daily repetition forms a person. Today we look at three ways daily observance shapes a life — and what happens when it meets a world that does not share it.\n\n**Learning goals**\n\n- Explain how daily practices and rituals connect to and affect the lives of adherents (D3.3).\n- Analyse how saying grace anchors and regulates a believer\'s day, and how daily meditation, prayer, or time in nature might affect a life.\n- Examine the tensions a Sikh who observes the Five Ks may encounter in a secular world, and how Canada has addressed some of them (C2.4, accommodation).\n\n**Success criteria — I can…**\n\n- explain two ways a daily observance shapes a person\'s attention, time, or identity\n- describe how grace before and after meals anchors a day\n- describe a real case in which the Five Ks met Canadian institutions and explain the outcome\n\n**Key idea — formation:** the shaping of character and attention by repeated practice over time. \'Formation\' is the word religious educators use for what daily practice does. Mindfulness\'s secular use links back to Unit 1 Lesson 9 (yoga): a practice lifted from its tradition.\n\n**From the teacher notes:** D3.3\'s three prompts are grace, daily meditation/prayer/nature, and the Five Ks in a secular world. This lesson closes the unit\'s content.'
              }
            },
            {
              title: {
                1: 'Real case: saying grace',
                2: 'Real case: saying grace — how thanks before and after meals anchors a day',
                3: 'Real case: saying grace — how thanks before and after meals anchors a day'
              },
              visual: '🍽️',
              body: {
                1: '> In many traditions a meal does not begin without words of thanks.\n> Christians say grace. Jews bless bread before a meal and say a longer blessing after it. Muslims begin with \'Bismillah\' (in the name of God). Many First Nations offer a portion of food to the spirits or ancestors before a feast.\n> A person who gives thanks three times a day has three fixed pauses. Hunger is met with gratitude first. The meal becomes a shared act, not just fuel.\n> Over years, the habit trains the person to receive rather than grab. The family that pauses together is bound by the pause.',
                2: '> In many traditions a meal does not begin — and in some does not end — without words of thanks. Christians say grace before eating; Jews bless bread before a meal and recite Birkat Hamazon, a longer blessing, after it; Muslims begin with \'Bismillah\' (in the name of God) and end with thanks; Sikhs and Hindus offer food before eating; many First Nations offer a portion of food to the spirits or ancestors before a feast.\n> A person who stops to give thanks three times a day has three fixed pauses: hunger is met with gratitude before satisfaction; the meal becomes a shared act rather than fuel; the day is divided by moments of attention to something beyond oneself.\n> Over years, the habit trains the person to receive rather than grab — and the family or community that pauses together is bound by the pause.',
                3: '> In many traditions a meal does not begin — and in some does not end — without words of thanks. Christians say grace before eating; Jews bless bread before a meal and recite Birkat Hamazon, a longer blessing, after it; Muslims begin with \'Bismillah\' (in the name of God) and end with thanks; Sikhs and Hindus offer food before eating; many First Nations offer a portion of food to the spirits or ancestors before a feast.\n> A person who stops to give thanks three times a day has three fixed pauses: hunger is met with gratitude before satisfaction; the meal becomes a shared act rather than fuel; the day is divided by moments of attention to something beyond oneself.\n> Over years, the habit trains the person to receive rather than grab — and the family or community that pauses together is bound by the pause.\n\n**Think about it**\n\n- How does giving thanks before and after meals anchor and regulate a believer\'s day? Name three effects.\n- What changes when the thanks is said together rather than silently alone?\n- Many non-religious families keep a version of grace (a moment of silence, naming one good thing). What does that suggest about the practice?\n\n**Worked example — the effects (the D3.3 prompt):** fixed pauses several times a day; gratitude before consumption, which trains receiving rather than grabbing; the meal as a shared ritual; attention redirected several times daily to something beyond oneself; family or community cohesion from pausing together; over years, character formed by the habit. The secular versions of grace connect to Unit 1 Lesson 1: human needs can be met outside religion.'
              }
            },
            {
              title: {
                1: 'Meditation, prayer, or nature every day',
                2: 'Meditation, prayer, or nature every day: what traditions claim and what an observer can see',
                3: 'Meditation, prayer, or nature every day: what traditions claim and what an observer can see'
              },
              visual: '🌲',
              body: {
                1: '| What traditions claim | What an observer can see |\n| Buddhism: daily sitting trains the mind to notice craving and let it go | Mindfulness programs commonly report less stress and better attention; the effects are modest and need regular practice |\n| Christianity and Islam: daily prayer keeps a person in God\'s presence | Time outdoors is linked in many studies to better mood and attention |\n| Indigenous teachings: daily time on the land reminds the person they are a relative of all creation | A fixed daily practice gives structure, especially in hard times |\n\nThe deeper claims belong to the traditions. This course describes them.',
                2: '**What the traditions claim**\n\n- Buddhism: daily sitting trains the mind to notice craving and let it go; over time, less reactivity, more compassion\n- Christianity and Islam: daily prayer keeps a person \'in the presence of God\'; decisions are made before God rather than alone\n- Hinduism and Sikhism: japa and Nitnem steady the mind and keep the Name on the lips through the day\'s work\n- Indigenous teachings: daily time on the land, greeting the sun, offering tobacco — the person remembers they are a relative of all creation, not its owner\n\n**What a secular observer can see**\n\n- Research on mindfulness programs commonly reports reduced stress and improved attention; the effects are modest and depend on regular practice\n- Time outdoors is associated in many studies with better mood and attention\n- A fixed daily practice gives structure, especially in hard times: something is done regardless of how one feels\n- The deeper claims (presence of God, release from craving, kinship with creation) are the tradition\'s to make; the course describes them',
                3: '**What the traditions claim**\n\n- Buddhism: daily sitting trains the mind to notice craving and let it go; over time, less reactivity, more compassion\n- Christianity and Islam: daily prayer keeps a person \'in the presence of God\'; decisions are made before God rather than alone\n- Hinduism and Sikhism: japa and Nitnem steady the mind and keep the Name on the lips through the day\'s work\n- Indigenous teachings: daily time on the land, greeting the sun, offering tobacco — the person remembers they are a relative of all creation, not its owner\n\n**What a secular observer can see**\n\n- Research on mindfulness programs commonly reports reduced stress and improved attention; the effects are modest and depend on regular practice\n- Time outdoors is associated in many studies with better mood and attention\n- A fixed daily practice gives structure, especially in hard times: something is done regardless of how one feels\n- The deeper claims (presence of God, release from craving, kinship with creation) are the tradition\'s to make; the course describes them\n\n**Worked example — formation:** Salah five times daily anchors attention to God throughout the day; repeated for years it forms a person who decides before God, not alone. That is what the unit means by formation: the shaping of character and attention by repeated practice over time.\n\n**Think about it:** if you added one daily observance from this unit to your life for a month — grace, twenty minutes of silence, a sunrise walk — which would you choose, and what do you predict would change in your week? (Claims about meditation\'s benefits are kept modest and general; it is not presented as therapy.)'
              }
            },
            {
              title: {
                1: 'Real case: the Five Ks in a secular world',
                2: 'Real case: the Five Ks in a secular world — a turban in the RCMP, and the tensions since',
                3: 'Real case: the Five Ks in a secular world — a turban in the RCMP, and the tensions since'
              },
              visual: '🚔',
              body: {
                1: '> In 1988, Baltej Singh Dhillon, a Sikh from British Columbia, applied to join the RCMP. The dress rules required the Stetson hat and a clean-shaven face. His faith required a turban and unshorn hair and beard.\n> A public campaign against changing the uniform gathered tens of thousands of signatures.\n> In March 1990 the federal government changed the rules. Dhillon became the first turbaned Mountie in 1991.\n> Tensions did not end there. The kirpan has been contested in schools (Multani, 2006). Ontario\'s helmet law has exempted turbaned Sikhs since 2018, but not every province does. Quebec\'s Bill 21 (2019) bars turbans for teachers and police.\n> In 2015, Harjit Sajjan, a turbaned Sikh, became Canada\'s Minister of National Defence.',
                2: '> In 1988, Baltej Singh Dhillon, a Sikh from British Columbia, applied to join the RCMP. The force\'s dress regulations required the Stetson hat and a clean-shaven face; Dhillon\'s faith required his turban and unshorn hair and beard. A public campaign against changing the uniform gathered tens of thousands of signatures. In March 1990 the federal government changed the regulations; Dhillon became the first turbaned Mountie in 1991 and served until his retirement in 2019.\n> Tensions did not end there: the Supreme Court had ruled against a Sikh electrician who refused a hard hat (Bhinder, 1985, Unit 1); the kirpan has been contested in schools (Multani, 2006) and in some legislatures and courts; motorcycle helmet laws now exempt turbaned Sikhs in Ontario (since 2018), British Columbia, Manitoba, and Alberta but not everywhere; and Quebec\'s Bill 21 (2019) bars turbans along with other religious symbols for teachers and police.\n> In 2015, Harjit Sajjan — a turbaned Sikh who had served as a Canadian Armed Forces officer and a Vancouver police detective — became Canada\'s Minister of National Defence.',
                3: '> In 1988, Baltej Singh Dhillon, a Sikh from British Columbia, applied to join the RCMP. The force\'s dress regulations required the Stetson hat and a clean-shaven face; Dhillon\'s faith required his turban and unshorn hair and beard. A public campaign against changing the uniform gathered tens of thousands of signatures. In March 1990 the federal government changed the regulations; Dhillon became the first turbaned Mountie in 1991 and served until his retirement in 2019.\n> Tensions did not end there: the Supreme Court had ruled against a Sikh electrician who refused a hard hat (Bhinder, 1985, Unit 1); the kirpan has been contested in schools (Multani, 2006) and in some legislatures and courts; motorcycle helmet laws now exempt turbaned Sikhs in Ontario (since 2018), British Columbia, Manitoba, and Alberta but not everywhere; and Quebec\'s Bill 21 (2019) bars turbans along with other religious symbols for teachers and police.\n> In 2015, Harjit Sajjan — a turbaned Sikh who had served as a Canadian Armed Forces officer and a Vancouver police detective — became Canada\'s Minister of National Defence.\n\n**Think about it**\n\n- List the tensions a Sikh observing the Five Ks may encounter in a secular world: workplace, school, law, politics.\n- Which tensions have been resolved by accommodation, and which remain contested? Why the difference (think: safety, symbolism, politics)?\n- What did it take to resolve the RCMP case? What does that suggest about how a secular society learns to make room for daily observance?\n\n**From the teacher notes:** Ontario\'s helmet exemption for turbaned Sikhs took effect October 2018; Sajjan was Minister of National Defence 2015–2021 and served in the CAF, including deployments to Bosnia and Afghanistan. Resolved: the RCMP turban, helmet exemptions in several provinces, the kirpan in Ontario schools under conditions. Contested: Bill 21 (heard by the Supreme Court in March 2026 — check its status), some safety-gear contexts. Resolving the RCMP case took law (the Code, the Charter), individuals willing to apply and litigate, public education — and time.'
              }
            },
            {
              title: {
                1: 'The uninformed world — and check yourself',
                2: 'Daily observance and the uninformed world — and check yourself',
                3: 'Daily observance and the uninformed world — connecting the units, and check yourself'
              },
              visual: '🧩',
              body: {
                1: 'Most tensions come from not knowing. A kirpan is read as a weapon. A kara is treated as jewellery to remove for gym. Fasting students are assumed to be \'on a diet\'.\n\n**The legal answer (Unit 1):** creed is protected. Accommodation is owed, up to undue hardship.\n\n**The human answer (this lesson):** when classmates and colleagues know what the practice is and why it happens daily, most tensions dissolve before any law is needed.\n\n**Check yourself**\n\n- How does saying grace anchor a believer\'s day? Give three effects.\n- Describe the Baltej Singh Dhillon case: the tension, the result, and the year.',
                2: 'Most tensions come from not knowing: a kirpan read as a weapon; a kara as jewellery to remove for gym; fasting students assumed to be \'on a diet\'; prayer breaks read as laziness; tefillin mistaken for something else at airport security (which has happened).\n\n**Unit 1 gave the legal answer:** creed is protected; accommodation is owed up to undue hardship; sincerity is the test (Amselem).\n\n**Unit 3 gives the human answer:** when classmates and colleagues know what the practice is and why it happens daily, most tensions dissolve before any law is needed. That is the course\'s purpose: understanding why a neighbour fasts, prays, washes, or wears what they wear.\n\n**Connect the units:** Lesson 1 of Unit 1 asked what needs traditions meet. Daily observances are where those needs are met most often — several times a day, for life.\n\n**Check yourself**\n\n- How does saying grace anchor and regulate a believer\'s day? Give three effects.\n- Name two claims traditions make about daily meditation or prayer, and one observable effect.\n- Describe the Baltej Singh Dhillon case: the tension, the resolution, the year.\n- Name two tensions a Sikh observing the Five Ks may still encounter and the law that addresses them.',
                3: 'Most tensions come from not knowing: a kirpan read as a weapon; a kara as jewellery to remove for gym; fasting students assumed to be \'on a diet\'; prayer breaks read as laziness; tefillin mistaken for something else at airport security (which has happened).\n\n**Unit 1 gave the legal answer:** creed is protected; accommodation is owed up to undue hardship; sincerity is the test (Amselem).\n\n**Unit 3 gives the human answer:** when classmates and colleagues know what the practice is and why it happens daily, most tensions dissolve before any law is needed. That is the course\'s purpose (Unit 1 Lesson 4): understanding why a neighbour fasts, prays, washes, or wears what they wear.\n\n**Connect the units:** Lesson 1 of Unit 1 asked what needs traditions meet. Daily observances are where those needs are met most often — several times a day, for life. D3 (daily observance) connects to C2.4 (accommodation) and B1.3 (why understand neighbours).\n\n**Worked example — Gurpreet\'s week at school:** the gym teacher asks him to remove his kara (an article of faith, not jewellery — accommodate, e.g. tape it, as sports bodies allow); a supply teacher reports his kirpan (allowed under conditions after Multani, 2006 — follow board policy, not treat it as a weapon); the cafeteria serves only meat on a fasting day (offer a vegetarian option or food from home); a classmate asks why he \'never takes the hat off\' (the human answer: \'It\'s not a hat — it\'s a turban covering my uncut hair, which initiated Sikhs keep as a sign of accepting God\'s will. It\'s part of the Five Ks I wear every day.\'). So it does not recur: include articles of faith in staff orientation, post board policy on the kirpan, and educate students.\n\n**Check yourself**\n\n- How does saying grace anchor and regulate a believer\'s day? Give three effects.\n- Name two claims traditions make about daily meditation or prayer, and one observable effect.\n- Describe the Baltej Singh Dhillon case: the tension, the resolution, the year.\n- Name two tensions a Sikh observing the Five Ks may still encounter and the law that addresses them.\n\n**Think about it:** what changes a secular society\'s mind — law, time, or knowing someone? Whose job is it to inform the secular world — the minority, the school, the state?'
              }
            }
          ]
        }
      ],

      terms: [
        // Lesson 1
        {
          term: 'solar calendar',
          def: {
            1: 'A calendar that follows the sun\'s year; dates stay in season.',
            2: 'A calendar following the sun\'s year (about 365.25 days); dates stay in the same season — the Gregorian calendar, Christmas.',
            3: 'A calendar following the sun\'s year (about 365.25 days); dates stay in the same season — the Gregorian calendar, Christmas (Dec 25), Remembrance Day, Vaisakhi.'
          }
        },
        {
          term: 'lunar calendar',
          def: {
            1: 'A calendar of moon months; its year is about 11 days shorter.',
            2: 'A calendar following the moon\'s months (about 29.5 days each); a 12-month lunar year is about 11 days shorter than a solar year — the Islamic calendar.',
            3: 'A calendar following the moon\'s months (about 29.5 days each); a 12-month lunar year is about 11 days shorter than a solar year — the Islamic calendar, whose festivals (Ramadan, the Eids) drift about 11 days earlier each year.'
          }
        },
        {
          term: 'lunisolar calendar',
          def: {
            1: 'Moon months plus a leap month, so festivals stay in season.',
            2: 'Moon months corrected to the solar year by adding a leap month — the Jewish, Chinese, and Hindu calendars.',
            3: 'Moon months corrected to the solar year by adding a leap month every two or three years — the Jewish, Chinese, and Hindu calendars (Passover always spring, Diwali always autumn). Christian Easter is also set this way.'
          }
        },
        {
          term: 'equinox',
          def: {
            1: 'A day with equal day and night; many festivals are anchored to it.',
            2: 'One of the two days a year of equal day and night (the solstices are the longest and shortest days). Many festivals are anchored to them.',
            3: 'One of the two days a year of equal day and night, around March 20 and September 22 (the solstices, the longest and shortest days, fall around June 21 and December 21). Many festivals are anchored to them — Nowruz, Easter\'s spring moon, Christmas near the winter solstice.'
          }
        },
        {
          term: 'sacred time',
          def: {
            1: 'Time a tradition sets apart, like a holy day or fast.',
            2: 'Time set apart by a tradition — a holy day, a season of fasting, a moment of silence.',
            3: 'Time set apart by a tradition — a holy day, a season of fasting, a moment of silence. Civic commemorations such as Remembrance Day are sacred time in a civic form.'
          }
        },
        {
          term: 'commemoration',
          def: {
            1: 'Remembering a person or event from the past with a ritual.',
            2: 'The ritualized remembrance of a person or event from the past (Unit 1).',
            3: 'The ritualized remembrance of a person or event from the past (e.g. Remembrance Day, Hanukkah, Vaisakhi). Curriculum glossary term from Unit 1.'
          }
        },
        // Lesson 2
        {
          term: 'festival',
          def: {
            1: 'A community celebration that returns each year to mark a story or season.',
            2: 'A recurring community celebration marking a sacred story, season, or event (Unit 2).',
            3: 'A recurring community celebration marking a sacred story, season, or event (e.g. Holi, Wesak, Passover). Significance = what it remembers and why it matters; practices = what people actually do.'
          }
        },
        {
          term: 'observance',
          def: {
            1: 'A practice done to mark a holy day, like fasting.',
            2: 'A practice carried out to mark a holy day — fasting, lighting candles, attending a service.',
            3: 'A practice carried out to mark a holy day — fasting, lighting candles, attending a service. Yom Kippur\'s observances include the 25-hour fast, white clothing, and communal confession.'
          }
        },
        {
          term: 'atonement',
          def: {
            1: 'Making up for wrongdoing; the heart of Yom Kippur.',
            2: 'Making amends for wrongdoing; the central act of Yom Kippur.',
            3: 'Making amends for wrongdoing; the central act of Yom Kippur, the Day of Atonement. Curriculum glossary term.'
          }
        },
        {
          term: 'Shabbat',
          def: {
            1: 'The Jewish day of rest, Friday sunset to Saturday night.',
            2: 'The Jewish Sabbath, from Friday sunset to Saturday nightfall: a day of rest, meals, and prayer.',
            3: 'The Jewish Sabbath, from Friday sunset to Saturday nightfall: a day of rest, meals, and prayer. Two candles lit before sunset on Friday mark the border between ordinary time and sacred rest.'
          }
        },
        {
          term: 'powwow',
          def: {
            1: 'A gathering of Indigenous nations for dancing, drumming, and singing.',
            2: 'A gathering of Indigenous nations for dancing, drumming, singing, and community, with ceremonial and social elements.',
            3: 'A gathering of Indigenous nations for dancing, drumming, singing, and community, with ceremonial and social elements. \'Powwow\' is the common English word; many nations have their own terms.'
          }
        },
        {
          term: 'nativity',
          def: {
            1: 'The birth of Jesus; a scene shows the stable and family.',
            2: 'The birth of Jesus; a nativity scene shows the stable, the family, shepherds, and visitors.',
            3: 'The birth of Jesus; a nativity scene shows the stable, the family, shepherds, and visitors (later the Magi). St. Francis is credited with the first living nativity in 1223.'
          }
        },
        // Lesson 3
        {
          term: 'fast',
          def: {
            1: 'Going without food or drink for a set time as a discipline.',
            2: 'Going without food, drink, or certain foods for a set time as a spiritual discipline.',
            3: 'Going without food, drink, or certain foods for a set time as a spiritual discipline (e.g. Ramadan, Yom Kippur, Lent, Ayambil). Every tradition in the lesson has exemptions for the sick, young, elderly, and pregnant.'
          }
        },
        {
          term: 'feast',
          def: {
            1: 'A shared celebration meal for a holy day.',
            2: 'A shared celebratory meal that marks a holy day or occasion.',
            3: 'A shared celebratory meal that marks a holy day or occasion (e.g. Eid al-Fitr, the Passover Seder, langar, the potlatch). Most traditions end a fast with a feast.'
          }
        },
        {
          term: 'sawm',
          def: {
            1: 'Fasting from dawn to sunset during Ramadan.',
            2: 'Fasting during Ramadan from dawn to sunset — one of the Five Pillars of Islam.',
            3: 'Fasting during Ramadan from dawn to sunset (food, drink, smoking, and sexual activity) — one of the Five Pillars of Islam. Children, the sick, travellers, and pregnant or nursing women are exempt.'
          }
        },
        {
          term: 'iftar',
          def: {
            1: 'The meal that breaks the fast at sunset in Ramadan.',
            2: 'The meal that breaks the fast at sunset during Ramadan (suhoor is the meal before dawn).',
            3: 'The meal that breaks the fast at sunset during Ramadan; suhoor is the shared pre-dawn meal. Together with night prayers they draw families and communities together.'
          }
        },
        {
          term: 'redistribution',
          def: {
            1: 'Giving wealth or food away to confirm status and relationships.',
            2: 'Giving wealth or food away to confirm status, relationships, and shared obligation — the heart of the potlatch.',
            3: 'Giving wealth or food away to confirm status, relationships, and shared obligation — the heart of the potlatch, where wealth is measured by what is given, not kept, and guests must reciprocate later.'
          }
        },
        {
          term: 'interdependence',
          def: {
            1: 'Mutual reliance: each person depends on the others.',
            2: 'Mutual reliance: a community in which each depends on the others for survival and standing.',
            3: 'Mutual reliance: a community in which each depends on the others for survival and standing. The curriculum\'s own word for what the potlatch expresses; in the Arctic, survival depends on sharing, so generosity is the highest status.'
          }
        },
        // Lesson 4
        {
          term: 'symbol',
          def: {
            1: 'An object or action that carries a meaning beyond itself.',
            2: 'An object, image, or action that carries a meaning beyond itself, understood by a community.',
            3: 'An object, image, or action that carries a meaning beyond itself, understood by a community (e.g. the menorah, the lotus, sweetgrass). Without its story, a symbol becomes decoration.'
          }
        },
        {
          term: 'menorah',
          def: {
            1: 'The Hanukkah lamp; one more candle is lit each night.',
            2: 'The seven-branched lamp of the ancient Temple; the nine-branched Hanukkah lamp (hanukkiah) used to light one more candle each night.',
            3: 'The seven-branched lamp of the ancient Temple; the nine-branched Hanukkah lamp (hanukkiah) used to light one more candle each night for eight nights, placed in a window to publicize the miracle of the oil (164 BCE rededication).'
          }
        },
        {
          term: 'Advent',
          def: {
            1: 'The four weeks before Christmas, when Christians prepare for Jesus\' birth.',
            2: 'The four weeks before Christmas in which Christians prepare for the birth of Jesus.',
            3: 'The four weeks before Christmas in which Christians prepare for the birth of Jesus. The Advent wreath — evergreen circle, four candles lit one per Sunday — began among German Lutherans in the 1800s.'
          }
        },
        {
          term: 'lotus',
          def: {
            1: 'A water flower that rises clean from mud; purity and enlightenment.',
            2: 'A water flower that rises clean from mud; in Buddhism and Hinduism a symbol of purity and enlightenment.',
            3: 'A water flower that rises clean from mud; in Buddhism a symbol of enlightenment rising from suffering (the Buddha seated on a lotus), in Hinduism of purity and divine birth (Lakshmi, Brahma).'
          }
        },
        {
          term: 'smudging',
          def: {
            1: 'Burning sacred medicines and drawing the smoke over oneself to cleanse and pray.',
            2: 'Burning sacred medicines — sweetgrass, sage, cedar, tobacco — and drawing the smoke over oneself for cleansing and prayer, in many First Nations traditions.',
            3: 'Burning sacred medicines — sweetgrass, sage, cedar, tobacco — and drawing the smoke over oneself for cleansing and prayer, in many First Nations traditions. Definitions vary by nation; it is described in class, not demonstrated without an Indigenous educator.'
          }
        },
        {
          term: 'dreidel',
          def: {
            1: 'A spinning top used in a Hanukkah game.',
            2: 'A four-sided spinning top used in a Hanukkah game; its Hebrew letters stand for \'a great miracle happened there\'.',
            3: 'A four-sided spinning top used in a Hanukkah game; its Hebrew letters stand for \'a great miracle happened there\' (in Israel, \'here\'). The story of secret Torah study disguised as a game is a later folk explanation.'
          }
        },
        // Lesson 5
        {
          term: 'rite of passage',
          def: {
            1: 'A ritual that marks moving from one status to another.',
            2: 'A ritual event that marks a person\'s progress from one status to another (curriculum glossary).',
            3: 'A ritual event that marks a person\'s progress from one status to another (curriculum glossary). Three stages: separation from the old status, a threshold moment, and incorporation into the new one.'
          }
        },
        {
          term: 'naming ceremony',
          def: {
            1: 'A rite that gives a child a name and welcomes them.',
            2: 'A rite that gives a child a name and welcomes them into the community and often into a relationship with the divine.',
            3: 'A rite that gives a child a name and welcomes them into the community and often into a relationship with the divine (e.g. a spirit name from an Elder, Hindu namakarana, Jewish brit milah, Muslim aqiqah).'
          }
        },
        {
          term: 'bar/bat mitzvah',
          def: {
            1: 'A Jewish boy at 13 or girl at 12 becomes responsible for the commandments.',
            2: '\'Son/daughter of the commandment\': a Jewish boy at 13 or girl at 12 (13 in many communities) becomes responsible for the commandments; marked by reading from the Torah in the synagogue.',
            3: '\'Son/daughter of the commandment\': a Jewish boy at 13 or girl at 12 (13 in many communities) becomes responsible for the commandments; marked by being called to the Torah and chanting the Haftarah, after which the community throws candy.'
          }
        },
        {
          term: 'confirmation',
          def: {
            1: 'A Christian rite where a baptized person confirms their faith.',
            2: 'In many Christian churches, the rite in which a baptized person confirms their faith and receives the Holy Spirit through anointing and the laying on of hands.',
            3: 'In many Christian churches, the rite in which a baptized person confirms their faith and receives the Holy Spirit through anointing with oil and the laying on of hands; often a saint\'s name is taken.'
          }
        },
        {
          term: 'amritsanchar',
          def: {
            1: 'The Sikh initiation into the Khalsa with amrit and the Five Ks.',
            2: 'The Sikh initiation into the Khalsa: drinking amrit (sweetened water stirred with a double-edged sword) and taking on the Five Ks.',
            3: 'The Sikh initiation into the Khalsa: drinking amrit (sweetened water stirred with a double-edged sword) prepared by five initiated Sikhs, taking on the Five Ks and the name Singh or Kaur. Chosen as an adult.'
          }
        },
        {
          term: 'aqiqah',
          def: {
            1: 'The Muslim naming celebration around a baby\'s seventh day.',
            2: 'The Muslim celebration on or around a baby\'s seventh day: naming, shaving the head, and an animal sacrifice shared with the poor.',
            3: 'The Muslim celebration on or around a baby\'s seventh day: naming (often after prophets or the Prophet\'s family), shaving the head, and an animal sacrifice whose meat is shared with the poor. At birth, the adhan is whispered in the baby\'s right ear.'
          }
        },
        // Lesson 6
        {
          term: 'Antyeshti',
          def: {
            1: 'The Hindu funeral rites: cremation and the ceremonies after it.',
            2: 'The Hindu funeral rites, \'last sacrifice\': cremation and the ceremonies that follow.',
            3: 'The Hindu funeral rites, \'last sacrifice\': cremation (ideally within a day, the pyre lit by the eldest son), immersion of ashes in a river, and about thirteen days of shraddha. Pronounced un-TYESH-tee.'
          }
        },
        {
          term: 'chuppah',
          def: {
            1: 'The canopy a Jewish couple marries under; their future home.',
            2: 'The canopy under which a Jewish couple is married, symbolizing the home they will build.',
            3: 'The canopy under which a Jewish couple is married, symbolizing the home they will build; vows, a ring before witnesses, seven blessings, and a glass broken underfoot complete the rite. Pronounced HOO-pah.'
          }
        },
        {
          term: 'nikah',
          def: {
            1: 'The Muslim marriage contract, with witnesses and a gift to the bride.',
            2: 'The Muslim marriage contract, agreed before witnesses with a gift (mahr) to the bride.',
            3: 'The Muslim marriage contract, agreed with consent before witnesses with a gift (mahr) to the bride, followed by a walima (feast). Rights and obligations are spelled out — protection, especially for the bride.'
          }
        },
        {
          term: 'Anand Karaj',
          def: {
            1: 'The Sikh wedding: four circuits of the Guru Granth Sahib.',
            2: 'The Sikh wedding: the couple circle the Guru Granth Sahib four times as the four laavan (hymns) are sung.',
            3: 'The Sikh wedding: the couple circle the Guru Granth Sahib four times as the four laavan (hymns) are sung — the marriage as a journey toward union with God.'
          }
        },
        {
          term: 'tallit',
          def: {
            1: 'The Jewish prayer shawl with fringes at its corners.',
            2: 'The Jewish prayer shawl with fringes (tzitzit) at its corners, worn in prayer and often first given at bar/bat mitzvah.',
            3: 'The Jewish prayer shawl with fringes (tzitzit) at its corners that recall the commandments (Numbers 15:38–40); worn in prayer and often first worn at bar/bat mitzvah — wrapping oneself in the commandments.'
          }
        },
        {
          term: 'Five Ks',
          def: {
            1: 'The five articles of faith worn by an initiated Sikh.',
            2: 'Kesh (uncut hair), kangha (comb), kara (steel bracelet), kachera (undergarment), kirpan (sword): the articles of faith of an initiated Sikh.',
            3: 'Kesh (uncut hair: acceptance of God\'s will), kangha (comb: order), kara (steel bracelet: the unbroken circle of God and restraint of the hand), kachera (undergarment: self-control), kirpan (sword: the duty to defend justice and the weak): the articles of faith taken on at amritsanchar and worn every day.'
          }
        },
        // Lesson 7
        {
          term: 'Salah',
          def: {
            1: 'The five daily prayers of Islam, facing Mecca.',
            2: 'The five daily prayers of Islam, performed facing Mecca at set times: dawn, noon, afternoon, sunset, night.',
            3: 'The five daily prayers of Islam, performed facing Mecca at set times that follow the sun — Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), Isha (night) — after wudu, with set postures. The adhan is the call to it.'
          }
        },
        {
          term: 'wudu',
          def: {
            1: 'The ritual washing before Salah.',
            2: 'The ritual washing of hands, mouth, nose, face, arms, head, and feet before Salah.',
            3: 'The ritual washing of hands, mouth, nose, face, arms, head, and feet before Salah — preparation of body and mind for prayer.'
          }
        },
        {
          term: 'Shema',
          def: {
            1: 'The central Jewish declaration that God is one, said morning and evening.',
            2: 'The central Jewish declaration, \'Hear, O Israel: the Lord our God, the Lord is one\', recited morning and evening.',
            3: 'The central Jewish declaration, \'Hear, O Israel: the Lord our God, the Lord is one\' (Deuteronomy 6:4), recited morning, evening, and at bedtime; observed through clothing (tefillin, tzitzit) and ritual (the mezuzah, teaching children).'
          }
        },
        {
          term: 'tefillin',
          def: {
            1: 'Small boxes with scripture bound on the arm and head in prayer.',
            2: 'Small boxes with scripture bound on arm and head in weekday morning prayer (with the mezuzah on the doorpost and tzitzit fringes on garments, the Shema\'s commands made physical).',
            3: 'Small boxes with scripture bound on arm and head in weekday morning prayer (not on Shabbat); together with the mezuzah (a scripture case on the doorpost, touched when passing) and tzitzit (fringes on garments) they make the Shema\'s commands physical.'
          }
        },
        {
          term: 'Kusti',
          def: {
            1: 'The Zoroastrian sacred cord, untied and retied with prayers daily.',
            2: 'The sacred cord of 72 threads worn by Zoroastrians around the waist over the sudreh (sacred shirt), untied and retied with prayers several times a day.',
            3: 'The sacred woollen cord of 72 threads worn by Zoroastrians around the waist over the sudreh (sacred shirt), untied and retied with Avestan prayers several times a day facing a source of light; each knot is tied with good thoughts, good words, good deeds.'
          }
        },
        {
          term: 'sunrise ceremony',
          def: {
            1: 'A First Nations morning practice: facing east and giving thanks.',
            2: 'A morning practice in many First Nations: facing east, offering tobacco or smudge, and giving thanks for the new day.',
            3: 'A morning practice in many First Nations: rising before dawn, facing east, offering tobacco or smudge, and giving thanks for the new day, the sun, the water, the land, the ancestors, and the people. Forms vary by nation.'
          }
        },
        // Lesson 8
        {
          term: 'grace',
          def: {
            1: 'A short prayer of thanks before a meal.',
            2: 'A short prayer of thanks before (and in some traditions after) a meal.',
            3: 'A short prayer of thanks before (and in some traditions after) a meal — e.g. Christian grace, the Jewish blessing over bread and Birkat Hamazon, the Muslim \'Bismillah\'. Gives a day fixed pauses of gratitude.'
          }
        },
        {
          term: 'anchor',
          def: {
            1: 'A practice that fixes a day\'s rhythm.',
            2: 'A practice that fixes a day\'s rhythm — a point the day is organized around.',
            3: 'A practice that fixes a day\'s rhythm — a point the day is organized around, such as grace at meals or Salah at set times.'
          }
        },
        {
          term: 'formation',
          def: {
            1: 'How repeated practice shapes a person\'s character over time.',
            2: 'The shaping of character and attention by repeated practice over time.',
            3: 'The shaping of character and attention by repeated practice over time; the word religious educators use for what daily practice does. The lesson\'s key idea.'
          }
        },
        {
          term: 'mindfulness',
          def: {
            1: 'Paying careful, non-judging attention to the present moment.',
            2: 'Paying deliberate, non-judging attention to the present moment; a Buddhist practice now widely used in secular settings.',
            3: 'Paying deliberate, non-judging attention to the present moment; a Buddhist practice now widely used in secular settings. Programs commonly report modest reductions in stress and better attention with regular practice.'
          }
        },
        {
          term: 'secular world',
          def: {
            1: 'Public places like schools and workplaces not organized around any religion.',
            2: 'Public institutions and spaces — schools, workplaces, police, courts — that are not organized around any religion.',
            3: 'Public institutions and spaces — schools, workplaces, police, courts — that are not organized around any religion. Daily observances such as the Five Ks meet it constantly: uniforms, helmets, security, dress codes.'
          }
        },
        {
          term: 'accommodation',
          def: {
            1: 'Changing a rule so a person can follow their practice.',
            2: 'Adjusting a rule so a person can follow their practice, up to undue hardship (Unit 1).',
            3: 'Adjusting a rule so a person can follow their practice, up to undue hardship (Unit 1) — e.g. the RCMP changing its dress regulations in 1990 to allow the turban.'
          }
        }
      ],

      questions: [
        // Lesson 1
        {
          type: 'mc',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Ramadan moves about 11 days earlier each year because the Islamic calendar is…',
          answer: 'lunar',
          options: {
            1: ['lunar', 'made of 400 days'],
            2: ['solar', 'lunar', 'lunisolar'],
            3: ['solar', 'lunar', 'lunisolar', 'based on the equinox']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Passover always falls in spring because the Jewish calendar is…',
          answer: 'lunisolar',
          options: {
            1: ['lunisolar', 'fixed to December'],
            2: ['solar', 'lunar', 'lunisolar'],
            3: ['solar', 'lunar', 'lunisolar', 'fixed to December']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Qingming connects respect for ancestors with…',
          answer: 'the arrival of spring',
          options: {
            1: ['the arrival of spring', 'a football match'],
            2: ['the harvest', 'the arrival of spring', 'the winter solstice'],
            3: ['the harvest', 'the arrival of spring', 'the winter solstice', 'the whale hunt']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'The potlatch is traditionally held in winter mainly because…',
          answer: 'the fishing and gathering season is over and families are together with stored food',
          options: {
            1: ['the fishing and gathering season is over and families are together with stored food', 'summer is too hot for dancing'],
            2: ['it is required by law', 'the fishing and gathering season is over and families are together with stored food', 'summer is too hot for dancing'],
            3: ['it is required by law', 'the fishing and gathering season is over and families are together with stored food', 'summer is too hot for dancing', 'the moon is fullest']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Christmas, Remembrance Day, and Vaisakhi fall in the same season every year because they follow a…',
          answer: 'solar calendar',
          options: {
            1: ['solar calendar', 'school timetable'],
            2: ['solar calendar', 'lunar calendar', 'lunisolar calendar'],
            3: ['solar calendar', 'lunar calendar', 'lunisolar calendar', 'moon-sighting calendar']
          }
        },
        {
          type: 'tf',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Easter moves each year because it is set by the moon and the spring equinox, unlike Christmas.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Easter is a fixed solar date like Christmas.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Vaisakhi marks the founding of the Khalsa in 1699.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'A 12-month lunar year is about 11 days shorter than a solar year.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'A 12-month lunar year is about 11 days longer than a solar year, so Ramadan arrives later each year.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Ramadan circles through all the seasons about every ___ years.',
          answer: '33',
          bank: ['33', '11', '100', '7']
        },
        {
          type: 'fill',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Easter falls on the first Sunday after the first full moon after the spring ___.',
          answer: 'equinox',
          bank: ['equinox', 'solstice', 'harvest', 'eclipse']
        },
        {
          type: 'fill',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Canada banned the potlatch from 1885 to ___.',
          answer: '1951',
          bank: ['1951', '1699', '1918', '1996']
        },
        {
          type: 'match',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Match each calendar term to its meaning.',
          pairs: [
            ['lunisolar calendar', 'moon months corrected with a leap month so festivals stay in season'],
            ['lunar calendar', 'twelve moon months with no correction; festivals drift through the seasons'],
            ['solar calendar', 'follows the sun\'s year; dates stay in the same season'],
            ['equinox', 'a day of equal day and night'],
            ['solstice', 'the longest or shortest day of the year'],
            ['sacred time', 'time set apart by a tradition, such as a holy day or fast'],
            ['commemoration', 'ritualized remembrance of a past person or event'],
            ['Qingming', 'sweeping ancestors\' graves as spring returns']
          ]
        },
        {
          type: 'match',
          cat: 'L1 Sacred Time & Calendars',
          prompt: 'Match each observance to what sets its timing.',
          pairs: [
            ['Ramadan', 'lunar calendar — moves about 11 days earlier each year'],
            ['Passover', 'lunisolar calendar — always in spring'],
            ['Christmas', 'solar calendar — fixed on December 25'],
            ['Easter', 'first Sunday after the first full moon after the spring equinox'],
            ['Wesak', 'the May full moon; the Buddha\'s birth, enlightenment, and death'],
            ['Vaisakhi', 'the founding of the Khalsa in 1699; a spring harvest festival'],
            ['First Salmon ceremony', 'the spring salmon run'],
            ['Día de los Muertos', 'the return of the monarch butterflies (Nov 1–2)']
          ]
        },
        // Lesson 2
        {
          type: 'mc',
          cat: 'L2 Festivals & Meaning',
          prompt: 'Many Jews call Yom Kippur the holiest day because it is…',
          answer: 'the Day of Atonement, when the year\'s judgement is sealed',
          options: {
            1: ['the Day of Atonement, when the year\'s judgement is sealed', 'the festival of lights'],
            2: ['the New Year', 'the Day of Atonement, when the year\'s judgement is sealed', 'the festival of lights'],
            3: ['the New Year', 'the Day of Atonement, when the year\'s judgement is sealed', 'the festival of lights', 'the day of the Exodus']
          }
        },
        {
          type: 'mc',
          cat: 'L2 Festivals & Meaning',
          prompt: 'The drum at a powwow is often described as…',
          answer: 'the heartbeat of the earth and the people',
          options: {
            1: ['the heartbeat of the earth and the people', 'a modern invention'],
            2: ['a decoration', 'the heartbeat of the earth and the people', 'a signal to end the dance'],
            3: ['a decoration', 'the heartbeat of the earth and the people', 'a signal to end the dance', 'a modern invention']
          }
        },
        {
          type: 'mc',
          cat: 'L2 Festivals & Meaning',
          prompt: 'Lights at Wesak symbolize…',
          answer: 'the Buddha\'s enlightenment dispelling ignorance',
          options: {
            1: ['the Buddha\'s enlightenment dispelling ignorance', 'victory in war'],
            2: ['the harvest', 'the Buddha\'s enlightenment dispelling ignorance', 'victory in war'],
            3: ['the harvest', 'the Buddha\'s enlightenment dispelling ignorance', 'victory in war', 'the new year']
          }
        },
        {
          type: 'mc',
          cat: 'L2 Festivals & Meaning',
          prompt: 'Which festival comes ten days after Rosh Hashanah, the Jewish New Year?',
          answer: 'Yom Kippur',
          options: {
            1: ['Yom Kippur', 'Holi'],
            2: ['Yom Kippur', 'Passover', 'Hanukkah'],
            3: ['Yom Kippur', 'Passover', 'Hanukkah', 'Purim']
          }
        },
        {
          type: 'mc',
          cat: 'L2 Festivals & Meaning',
          prompt: 'Which festival does Wesak celebrate?',
          answer: 'the Buddha\'s birth, enlightenment, and passing',
          options: {
            1: ['the Buddha\'s birth, enlightenment, and passing', 'the first day of school'],
            2: ['the Buddha\'s birth, enlightenment, and passing', 'the founding of the Khalsa', 'the Exodus from Egypt'],
            3: ['the Buddha\'s birth, enlightenment, and passing', 'the founding of the Khalsa', 'the Exodus from Egypt', 'Rama\'s return']
          }
        },
        {
          type: 'tf',
          cat: 'L2 Festivals & Meaning',
          prompt: 'At Holi, throwing colour erases distinctions of rank for a day.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L2 Festivals & Meaning',
          prompt: 'Shabbat candles are lit before sunset on Friday.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L2 Festivals & Meaning',
          prompt: 'Shabbat candles are lit on Saturday morning.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L2 Festivals & Meaning',
          prompt: 'Yom Kippur ends with a long blast of the shofar and a meal to break the fast.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L2 Festivals & Meaning',
          prompt: 'On Yom Kippur, observant Jews feast all day to celebrate the sealing of the year\'s judgement.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L2 Festivals & Meaning',
          prompt: 'The shofar blown at the end of Yom Kippur is a ___ horn.',
          answer: 'ram\'s',
          bank: ['ram\'s', 'bull\'s', 'goat\'s', 'deer\'s']
        },
        {
          type: 'fill',
          cat: 'L2 Festivals & Meaning',
          prompt: 'On Yom Kippur, observant Jews fast for about ___ hours.',
          answer: '25',
          bank: ['25', '12', '40', '3']
        },
        {
          type: 'fill',
          cat: 'L2 Festivals & Meaning',
          prompt: 'Holi recalls the playfulness of ___ and the victory of good over evil.',
          answer: 'Krishna',
          bank: ['Krishna', 'Rama', 'Esther', 'Moses']
        },
        {
          type: 'match',
          cat: 'L2 Festivals & Meaning',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['atonement', 'making amends for wrongdoing; the central act of Yom Kippur'],
            ['Shabbat', 'the Jewish Sabbath, from Friday sunset to Saturday nightfall'],
            ['powwow', 'a gathering of Indigenous nations for dancing, drumming, and singing'],
            ['observance', 'a practice carried out to mark a holy day'],
            ['nativity', 'the birth of Jesus, shown in a scene with the stable and family'],
            ['festival', 'a recurring community celebration marking a sacred story or season'],
            ['shofar', 'the ram\'s horn blown at the end of Yom Kippur'],
            ['Holika Dahan', 'the bonfire the night before Holi']
          ]
        },
        {
          type: 'match',
          cat: 'L2 Festivals & Meaning',
          prompt: 'Match each practice to the festival it belongs to.',
          pairs: [
            ['throwing coloured powder', 'Holi'],
            ['lighting two candles before sunset on Friday', 'Shabbat'],
            ['hanging lanterns for the May full moon', 'Wesak'],
            ['dancing in regalia to a drum group', 'powwow'],
            ['setting up a nativity scene', 'Christmas'],
            ['fasting and confessing wrongs together', 'Yom Kippur'],
            ['a Seder meal with matzo and bitter herbs', 'Passover'],
            ['the Haft-Seen table at the spring equinox', 'Nowruz']
          ]
        },
        // Lesson 3
        {
          type: 'mc',
          cat: 'L3 Fasts and Feasts',
          prompt: 'Fasting during Ramadan (sawm) is…',
          answer: 'one of the Five Pillars of Islam',
          options: {
            1: ['one of the Five Pillars of Islam', 'a Hindu practice'],
            2: ['optional for adults', 'one of the Five Pillars of Islam', 'required only on Fridays'],
            3: ['optional for adults', 'one of the Five Pillars of Islam', 'required only on Fridays', 'a Hindu practice']
          }
        },
        {
          type: 'mc',
          cat: 'L3 Fasts and Feasts',
          prompt: 'At Nalukataq, whaling captains gain respect by…',
          answer: 'sharing the whale with every family',
          options: {
            1: ['sharing the whale with every family', 'selling the whale'],
            2: ['keeping the whale', 'selling the whale', 'sharing the whale with every family'],
            3: ['keeping the whale', 'selling the whale', 'sharing the whale with every family', 'hunting alone']
          }
        },
        {
          type: 'mc',
          cat: 'L3 Fasts and Feasts',
          prompt: 'The Jain fast of Ayambil involves…',
          answer: 'one plain, tasteless meal a day for nine days',
          options: {
            1: ['one plain, tasteless meal a day for nine days', 'eating only sweets'],
            2: ['no food for nine days', 'one plain, tasteless meal a day for nine days', 'eating only sweets'],
            3: ['no food for nine days', 'one plain, tasteless meal a day for nine days', 'eating only sweets', 'fasting on Fridays']
          }
        },
        {
          type: 'mc',
          cat: 'L3 Fasts and Feasts',
          prompt: 'The feast that ends Ramadan, with special prayers, new clothes, gifts, and a required charity gift, is…',
          answer: 'Eid al-Fitr',
          options: {
            1: ['Eid al-Fitr', 'Christmas'],
            2: ['Eid al-Fitr', 'Eid al-Adha', 'Mawlid'],
            3: ['Eid al-Fitr', 'Eid al-Adha', 'Mawlid', 'Nowruz']
          }
        },
        {
          type: 'mc',
          cat: 'L3 Fasts and Feasts',
          prompt: 'Langar, the free community kitchen open to everyone every day, belongs to which tradition?',
          answer: 'Sikhism',
          options: {
            1: ['Sikhism', 'a fast-food chain'],
            2: ['Sikhism', 'Jainism', 'Judaism'],
            3: ['Sikhism', 'Jainism', 'Judaism', 'Buddhism']
          }
        },
        {
          type: 'tf',
          cat: 'L3 Fasts and Feasts',
          prompt: 'The kiss of peace enacts reconciliation with others before Communion.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L3 Fasts and Feasts',
          prompt: 'Children, the sick, travellers, and pregnant or nursing women are exempt from the Ramadan fast.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L3 Fasts and Feasts',
          prompt: 'Every Muslim, including young children and the sick, is required to fast during Ramadan.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L3 Fasts and Feasts',
          prompt: 'At a potlatch, wealth is measured by what is given away, not what is kept.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L3 Fasts and Feasts',
          prompt: 'At a potlatch, the host family gains status by keeping as many blankets and goods as possible.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L3 Fasts and Feasts',
          prompt: 'The highlight of Nalukataq is the ___ toss, in which a jumper is launched into the air from a seal- or walrus-skin blanket.',
          answer: 'blanket',
          bank: ['blanket', 'whale', 'net', 'flag']
        },
        {
          type: 'fill',
          cat: 'L3 Fasts and Feasts',
          prompt: 'The required charity gift before the Eid prayer, so that the poor can also feast, is called zakat al-___.',
          answer: 'fitr',
          bank: ['fitr', 'adha', 'sawm', 'iftar']
        },
        {
          type: 'fill',
          cat: 'L3 Fasts and Feasts',
          prompt: 'Ramadan is the ___ month of the Islamic calendar.',
          answer: 'ninth',
          bank: ['ninth', 'first', 'twelfth', 'fifth']
        },
        {
          type: 'match',
          cat: 'L3 Fasts and Feasts',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['iftar', 'the meal that breaks the daily fast at sunset during Ramadan'],
            ['redistribution', 'giving wealth away to confirm status and relationships, as in the potlatch'],
            ['sawm', 'fasting from dawn to sunset during Ramadan'],
            ['suhoor', 'the meal before dawn during Ramadan'],
            ['interdependence', 'mutual reliance within a community'],
            ['fast', 'going without food or drink for a set time as a discipline'],
            ['feast', 'a shared celebratory meal marking a holy day'],
            ['muktuk', 'whale skin and blubber shared at Nalukataq']
          ]
        },
        {
          type: 'match',
          cat: 'L3 Fasts and Feasts',
          prompt: 'Match each practice to the teaching it reflects.',
          pairs: [
            ['the potlatch', 'redistribution and interdependence'],
            ['Ayambil', 'detachment from craving and non-harm'],
            ['the kiss of peace', 'reconciliation with others before worship'],
            ['sweets at Holi', 'forgiving old quarrels and renewing relationships'],
            ['langar', 'equality: everyone eats the same food seated together'],
            ['Nalukataq', 'generosity as status: the whale shared with every family'],
            ['sawm', 'self-control, awareness of God, compassion for the poor'],
            ['Lent', 'forty days of giving something up']
          ]
        },
        // Lesson 4
        {
          type: 'mc',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'The menorah (hanukkiah) is lit over eight nights to recall…',
          answer: 'the oil that burned eight days at the Temple\'s rededication (164 BCE)',
          options: {
            1: ['the oil that burned eight days at the Temple\'s rededication (164 BCE)', 'the birth of Jesus'],
            2: ['the Exodus', 'the oil that burned eight days at the Temple\'s rededication (164 BCE)', 'Esther\'s victory'],
            3: ['the Exodus', 'the oil that burned eight days at the Temple\'s rededication (164 BCE)', 'Esther\'s victory', 'the birth of Jesus']
          }
        },
        {
          type: 'mc',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'Diwali lamps recall the lights the people of Ayodhya lit to welcome…',
          answer: 'Rama and Sita home from exile',
          options: {
            1: ['Rama and Sita home from exile', 'the first snowfall'],
            2: ['Rama and Sita home from exile', 'the Buddha\'s enlightenment', 'the Maccabees to the Temple'],
            3: ['Rama and Sita home from exile', 'the Buddha\'s enlightenment', 'the Maccabees to the Temple', 'Lakshmi\'s birth from the sea']
          }
        },
        {
          type: 'mc',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'In Buddhism, the lotus stands for enlightenment because the flower…',
          answer: 'rises clean from the mud and murky water',
          options: {
            1: ['rises clean from the mud and murky water', 'glows in the dark'],
            2: ['rises clean from the mud and murky water', 'blooms only at the full moon', 'has eight petals'],
            3: ['rises clean from the mud and murky water', 'blooms only at the full moon', 'has eight petals', 'grows on mountain tops']
          }
        },
        {
          type: 'mc',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'The Advent wreath\'s circle of evergreen with four candles began among…',
          answer: 'German Lutherans in the 1800s',
          options: {
            1: ['German Lutherans in the 1800s', 'astronauts in the 1960s'],
            2: ['German Lutherans in the 1800s', 'the first Christians in Jerusalem', 'Italian monks in 1223'],
            3: ['German Lutherans in the 1800s', 'the first Christians in Jerusalem', 'Italian monks in 1223', 'English Puritans in the 1600s']
          }
        },
        {
          type: 'tf',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'The dreidel\'s letters stand for \'a great miracle happened there\'.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'Sweetgrass is one of the four sacred medicines in Anishinaabe teaching.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'The Hanukkah lamp is placed in a window so the miracle can be seen by all.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'The Hanukkah lamp is lit with all eight candles on the first night and one fewer each night after.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'In the traditional view, sweetgrass is gathered with gratitude and never sold for profit.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'Historians have confirmed that the dreidel was used to disguise secret Torah study under the Greek ban.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'The word Diwali means \'row of ___\'.',
          answer: 'lamps',
          bank: ['lamps', 'flowers', 'candles', 'stars']
        },
        {
          type: 'fill',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'The four sacred medicines in Anishinaabe teaching are sweetgrass, tobacco, sage, and ___.',
          answer: 'cedar',
          bank: ['cedar', 'pine', 'lavender', 'mint']
        },
        {
          type: 'fill',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'Hanukkah means \'___\'.',
          answer: 'dedication',
          bank: ['dedication', 'light', 'miracle', 'freedom']
        },
        {
          type: 'match',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['Advent', 'the four weeks of preparation before Christmas'],
            ['menorah', 'the Hanukkah lamp, lit one more candle each night'],
            ['dreidel', 'a four-sided spinning top used in a Hanukkah game'],
            ['lotus', 'a flower that rises clean from mud; purity and enlightenment'],
            ['smudging', 'burning sacred medicines and drawing the smoke over oneself'],
            ['symbol', 'an object or action that carries a meaning beyond itself'],
            ['diya', 'a clay lamp lit at Diwali'],
            ['rangoli', 'a pattern drawn at the door at Diwali']
          ]
        },
        {
          type: 'match',
          cat: 'L4 Symbols of the Festivals',
          prompt: 'Match each symbol to its festival or tradition.',
          pairs: [
            ['menorah', 'Hanukkah'],
            ['rows of clay lamps and fireworks', 'Diwali'],
            ['evergreen wreath with four candles', 'Advent'],
            ['lotus', 'Buddhism and Hinduism'],
            ['sweetgrass braid', 'many First Nations'],
            ['dreidel', 'Hanukkah game'],
            ['lanterns on the May full moon', 'Wesak']
          ]
        },
        // Lesson 5
        {
          type: 'mc',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'In Chinese Buddhist and Taoist families, red eggs are given at…',
          answer: 'the one-month celebration of a baby',
          options: {
            1: ['the one-month celebration of a baby', 'a funeral'],
            2: ['a wedding', 'the one-month celebration of a baby', 'a funeral'],
            3: ['a wedding', 'the one-month celebration of a baby', 'a funeral', 'the New Year only']
          }
        },
        {
          type: 'mc',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'Candy is thrown at a bar/bat mitzvah when the young person…',
          answer: 'completes the Haftarah',
          options: {
            1: ['completes the Haftarah', 'turns twelve'],
            2: ['enters the synagogue', 'completes the Haftarah', 'receives a gift'],
            3: ['enters the synagogue', 'completes the Haftarah', 'receives a gift', 'turns twelve']
          }
        },
        {
          type: 'mc',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'In the Hindu naming ceremony (namakarana), who whispers the name into the baby\'s ear?',
          answer: 'the father',
          options: {
            1: ['the father', 'the mail carrier'],
            2: ['the father', 'a priest', 'the grandmother'],
            3: ['the father', 'a priest', 'the grandmother', 'the eldest sibling']
          }
        },
        {
          type: 'mc',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'In Judaism, a boy is circumcised and named in the brit milah ceremony on which day?',
          answer: 'the eighth day',
          options: {
            1: ['the eighth day', 'his sixteenth birthday'],
            2: ['the eighth day', 'the seventh day', 'the twelfth day'],
            3: ['the eighth day', 'the seventh day', 'the twelfth day', 'the thirtieth day']
          }
        },
        {
          type: 'mc',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'Which coming-of-age rite is chosen as an adult rather than fixed by age?',
          answer: 'amritsanchar',
          options: {
            1: ['amritsanchar', 'bar mitzvah'],
            2: ['amritsanchar', 'bar mitzvah', 'quinceañera'],
            3: ['amritsanchar', 'bar mitzvah', 'quinceañera', 'upanayana']
          }
        },
        {
          type: 'tf',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'In Islam the call to prayer is whispered into a newborn\'s ear.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'A rite of passage has three stages: separation, threshold, and incorporation.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'A Jewish young person becomes bar or bat mitzvah only if a synagogue ceremony is held.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'At a one-month celebration, red stands for luck and joy and the egg for life and new beginnings.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'In many First Nations, a spirit name is always chosen by the child when they turn eighteen.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'At a bar/bat mitzvah, the young person chants the ___, a passage from the Prophets.',
          answer: 'Haftarah',
          bank: ['Haftarah', 'Shema', 'Talmud', 'Seder']
        },
        {
          type: 'fill',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'The Muslim aqiqah takes place on or around a baby\'s ___ day.',
          answer: 'seventh',
          bank: ['seventh', 'eighth', 'twelfth', 'fortieth']
        },
        {
          type: 'fill',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'Confirmation includes anointing with oil and the laying on of ___.',
          answer: 'hands',
          bank: ['hands', 'candles', 'water', 'bread']
        },
        {
          type: 'match',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['rite of passage', 'a ritual event marking a person\'s progress from one status to another'],
            ['amritsanchar', 'the Sikh initiation into the Khalsa with amrit and the Five Ks'],
            ['aqiqah', 'Muslim naming on the seventh day with head-shaving and meat for the poor'],
            ['bar/bat mitzvah', 'a Jewish young person becomes responsible for the commandments'],
            ['confirmation', 'a baptized Christian confirms their faith with anointing and laying on of hands'],
            ['naming ceremony', 'a rite that gives a child a name and welcomes them into the community'],
            ['brit milah', 'Jewish circumcision and naming on the eighth day'],
            ['namakarana', 'the Hindu naming rite on the 11th or 12th day']
          ]
        },
        {
          type: 'match',
          cat: 'L5 Rites: Birth & Coming of Age',
          prompt: 'Match each practice to its tradition.',
          pairs: [
            ['the adhan whispered in a newborn\'s right ear', 'Islam'],
            ['a spirit name given by an Elder', 'First Nations'],
            ['red-dyed eggs at the one-month celebration', 'Chinese Buddhist and Taoist families'],
            ['candy thrown after the Haftarah', 'Judaism'],
            ['the sacred thread ceremony (upanayana)', 'Hinduism'],
            ['a Mass and celebration at 15 (quinceañera)', 'Catholic Latin American cultures'],
            ['fasting alone on the land for a vision', 'many First Nations'],
            ['taking the name Singh or Kaur', 'Sikhism']
          ]
        },
        // Lesson 6
        {
          type: 'mc',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'Hindus cremate the body because they understand the self (atman) to be…',
          answer: 'reborn until released; the body is a temporary home',
          options: {
            1: ['reborn until released; the body is a temporary home', 'returned to the sea'],
            2: ['destroyed at death', 'reborn until released; the body is a temporary home', 'preserved in the body'],
            3: ['destroyed at death', 'reborn until released; the body is a temporary home', 'preserved in the body', 'returned to the sea']
          }
        },
        {
          type: 'mc',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'In a Hindu wedding, the couple take seven steps (saptapadi) around a…',
          answer: 'sacred fire',
          options: {
            1: ['sacred fire', 'swimming pool'],
            2: ['sacred fire', 'canopy', 'holy book'],
            3: ['sacred fire', 'canopy', 'holy book', 'river']
          }
        },
        {
          type: 'mc',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'At a Jewish wedding, the glass broken underfoot expresses…',
          answer: 'joy mixed with memory of the Temple\'s destruction',
          options: {
            1: ['joy mixed with memory of the Temple\'s destruction', 'that the party has ended'],
            2: ['joy mixed with memory of the Temple\'s destruction', 'the seven blessings', 'the gift to the bride'],
            3: ['joy mixed with memory of the Temple\'s destruction', 'the seven blessings', 'the gift to the bride', 'the couple\'s first argument']
          }
        },
        {
          type: 'mc',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'In the Ojibwe teaching of the dream catcher, bad dreams…',
          answer: 'catch in the web and vanish at sunrise',
          options: {
            1: ['catch in the web and vanish at sunrise', 'turn into feathers'],
            2: ['catch in the web and vanish at sunrise', 'pass through the centre', 'are stored in the hoop'],
            3: ['catch in the web and vanish at sunrise', 'pass through the centre', 'are stored in the hoop', 'fly away on the wind']
          }
        },
        {
          type: 'mc',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'He Qi\'s painting The Baptism of Jesus shows Jesus in the Jordan with John, water flowing and…',
          answer: 'a dove descending',
          options: {
            1: ['a dove descending', 'a rocket launching'],
            2: ['a dove descending', 'a lotus opening', 'a star rising'],
            3: ['a dove descending', 'a lotus opening', 'a star rising', 'a lamb kneeling']
          }
        },
        {
          type: 'tf',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'Muslims and Jews bury their dead quickly and do not commonly cremate.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'Muslims and Jews commonly cremate the dead.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'Hindu mourners wear white, not black.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'In Hindu funeral rites, the body is embalmed and preserved for a viewing several days after death.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'A Muslim burial is performed within about a day, with the body facing Mecca.',
          answer: true
        },
        {
          type: 'fill',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'In Hindu teaching the self is reborn until it is released; this release is called ___.',
          answer: 'moksha',
          bank: ['moksha', 'atman', 'shraddha', 'karma']
        },
        {
          type: 'fill',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'After a Jewish burial, the family observes seven days of mourning called ___.',
          answer: 'shiva',
          bank: ['shiva', 'Kaddish', 'shraddha', 'walima']
        },
        {
          type: 'fill',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'The Hindu family mourns and performs shraddha rituals for about ___ days.',
          answer: 'thirteen',
          bank: ['thirteen', 'seven', 'forty-nine', 'three']
        },
        {
          type: 'match',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['Antyeshti', 'the Hindu funeral rites: cremation and the ceremonies that follow'],
            ['chuppah', 'the canopy under which a Jewish couple is married'],
            ['nikah', 'the Muslim marriage contract with witnesses and the mahr'],
            ['Anand Karaj', 'the Sikh wedding with four circuits of the Guru Granth Sahib'],
            ['tallit', 'the Jewish prayer shawl with fringes at its corners'],
            ['Five Ks', 'the articles of faith of an initiated Sikh'],
            ['shraddha', 'Hindu mourning rituals that help the departed on their way'],
            ['Asibikaashi', 'Spider Woman, who protected children in Ojibwe teaching']
          ]
        },
        {
          type: 'match',
          cat: 'L6 Rites: Marriage & Death',
          prompt: 'Match each of the Five Ks to what it represents.',
          pairs: [
            ['kesh (uncut hair)', 'acceptance of God\'s will'],
            ['kangha (comb)', 'order'],
            ['kara (steel bracelet)', 'the unbroken circle of God and restraint of the hand'],
            ['kachera (undergarment)', 'self-control'],
            ['kirpan (sword)', 'the duty to defend justice and the weak']
          ]
        },
        // Lesson 7
        {
          type: 'mc',
          cat: 'L7 Daily Observances',
          prompt: 'The Shema is observed through clothing by means of…',
          answer: 'tefillin and tzitzit',
          options: {
            1: ['tefillin and tzitzit', 'a white robe'],
            2: ['the kara and kirpan', 'tefillin and tzitzit', 'the Kusti and sudreh'],
            3: ['the kara and kirpan', 'tefillin and tzitzit', 'the Kusti and sudreh', 'a white robe']
          }
        },
        {
          type: 'mc',
          cat: 'L7 Daily Observances',
          prompt: 'Each knot of the Kusti is tied with the thought of…',
          answer: 'good thoughts, good words, good deeds',
          options: {
            1: ['good thoughts, good words, good deeds', 'breakfast, lunch, dinner'],
            2: ['good thoughts, good words, good deeds', 'faith, hope, and love', 'mind, body, and spirit'],
            3: ['good thoughts, good words, good deeds', 'faith, hope, and love', 'mind, body, and spirit', 'earth, air, and water']
          }
        },
        {
          type: 'mc',
          cat: 'L7 Daily Observances',
          prompt: 'Before Salah, Muslims perform wudu, which is…',
          answer: 'ritual washing of the hands, face, arms, head, and feet',
          options: {
            1: ['ritual washing of the hands, face, arms, head, and feet', 'a short nap'],
            2: ['ritual washing of the hands, face, arms, head, and feet', 'the call to prayer', 'a reading from the Qur\'an'],
            3: ['ritual washing of the hands, face, arms, head, and feet', 'the call to prayer', 'a reading from the Qur\'an', 'a donation to the poor']
          }
        },
        {
          type: 'mc',
          cat: 'L7 Daily Observances',
          prompt: 'The Kusti prayers belong to which tradition?',
          answer: 'Zoroastrianism',
          options: {
            1: ['Zoroastrianism', 'ice hockey'],
            2: ['Zoroastrianism', 'Hinduism', 'Sikhism'],
            3: ['Zoroastrianism', 'Hinduism', 'Sikhism', 'Judaism']
          }
        },
        {
          type: 'mc',
          cat: 'L7 Daily Observances',
          prompt: 'A small case holding the words of the Shema, fixed to the doorpost of a Jewish home and touched when passing, is a…',
          answer: 'mezuzah',
          options: {
            1: ['mezuzah', 'doorbell'],
            2: ['mezuzah', 'tallit', 'tefillin'],
            3: ['mezuzah', 'tallit', 'tefillin', 'shofar']
          }
        },
        {
          type: 'tf',
          cat: 'L7 Daily Observances',
          prompt: 'The sunrise ceremony is performed facing east at dawn.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L7 Daily Observances',
          prompt: 'The sunrise ceremony is performed facing west at sunset.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L7 Daily Observances',
          prompt: 'Salah is performed five times a day facing Mecca.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L7 Daily Observances',
          prompt: 'Salah times are fixed by the clock and stay the same all year.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L7 Daily Observances',
          prompt: 'Tefillin are bound on the arm and forehead during weekday morning prayer.',
          answer: true
        },
        {
          type: 'fill',
          cat: 'L7 Daily Observances',
          prompt: 'The Kusti is a sacred cord of ___ threads.',
          answer: '72',
          bank: ['72', '5', '12', '108']
        },
        {
          type: 'fill',
          cat: 'L7 Daily Observances',
          prompt: 'The direction of the Kaaba in Mecca, which Muslims face in Salah, is called the ___.',
          answer: 'qibla',
          bank: ['qibla', 'adhan', 'wudu', 'sawm']
        },
        {
          type: 'fill',
          cat: 'L7 Daily Observances',
          prompt: 'The Sikh set of morning, evening, and bedtime prayers is called ___.',
          answer: 'Nitnem',
          bank: ['Nitnem', 'Salah', 'japa', 'puja']
        },
        {
          type: 'match',
          cat: 'L7 Daily Observances',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['Kusti', 'the Zoroastrian sacred cord untied and retied with prayers several times a day'],
            ['Salah', 'the five daily prayers of Islam at set times, facing Mecca'],
            ['Shema', 'the central Jewish declaration recited morning and evening'],
            ['wudu', 'ritual washing before Salah'],
            ['tefillin', 'small boxes with scripture bound on arm and head in weekday morning prayer'],
            ['sunrise ceremony', 'facing east, offering tobacco or smudge, and giving thanks for the day'],
            ['sudreh', 'the Zoroastrian sacred shirt worn under the Kusti'],
            ['tzitzit', 'fringes on garments that recall the commandments']
          ]
        },
        {
          type: 'match',
          cat: 'L7 Daily Observances',
          prompt: 'Match each daily ritual to its tradition.',
          pairs: [
            ['Salah and wudu', 'Islam'],
            ['the Shema, tefillin, and mezuzah', 'Judaism'],
            ['Kusti prayers', 'Zoroastrianism'],
            ['Nitnem and the Five Ks', 'Sikhism'],
            ['sitting meditation and mindfulness', 'Buddhism'],
            ['puja at a home shrine and the Gayatri mantra', 'Hinduism'],
            ['the Rosary and the Liturgy of the Hours', 'Christianity'],
            ['the sunrise ceremony and smudging', 'many First Nations']
          ]
        },
        // Lesson 8
        {
          type: 'mc',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'The shaping of character and attention by repeated practice over time is called…',
          answer: 'formation',
          options: {
            1: ['formation', 'vacation'],
            2: ['formation', 'accommodation', 'mindfulness'],
            3: ['formation', 'accommodation', 'mindfulness', 'commemoration']
          }
        },
        {
          type: 'mc',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'Baltej Singh Dhillon\'s application to the RCMP led the federal government to change the force\'s…',
          answer: 'dress regulations, allowing the turban',
          options: {
            1: ['dress regulations, allowing the turban', 'horse-riding rules'],
            2: ['dress regulations, allowing the turban', 'hiring age limit', 'language requirement'],
            3: ['dress regulations, allowing the turban', 'hiring age limit', 'language requirement', 'firearms training']
          }
        },
        {
          type: 'mc',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'In 2015, Harjit Sajjan, a turbaned Sikh who had served as an army officer and police detective, became Canada\'s…',
          answer: 'Minister of National Defence',
          options: {
            1: ['Minister of National Defence', 'head coach of the national hockey team'],
            2: ['Minister of National Defence', 'Chief Justice', 'Governor General'],
            3: ['Minister of National Defence', 'Chief Justice', 'Governor General', 'RCMP Commissioner']
          }
        },
        {
          type: 'mc',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'Muslims begin a meal with the word \'Bismillah\', which means…',
          answer: 'in the name of God',
          options: {
            1: ['in the name of God', 'pass the salt'],
            2: ['in the name of God', 'thank you for the food', 'peace be upon you'],
            3: ['in the name of God', 'thank you for the food', 'peace be upon you', 'God is great']
          }
        },
        {
          type: 'mc',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'Quebec\'s Bill 21 (2019) bars turbans and other religious symbols for…',
          answer: 'teachers and police',
          options: {
            1: ['teachers and police', 'hockey players'],
            2: ['teachers and police', 'all shoppers', 'motorcycle riders'],
            3: ['teachers and police', 'all shoppers', 'motorcycle riders', 'university students']
          }
        },
        {
          type: 'tf',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'Baltej Singh Dhillon became the first turbaned RCMP officer after the regulations changed in 1990.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'The RCMP changed its dress regulations in 1990 without any public opposition.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'Ontario\'s motorcycle helmet law has exempted turbaned Sikhs since 2018.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'Every Canadian province exempts turbaned Sikhs from motorcycle helmet laws.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'The lesson says most tensions over daily observances come from people not knowing what the practice is and why it happens.',
          answer: true
        },
        {
          type: 'fill',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'After a meal, Jews recite a longer blessing called Birkat ___.',
          answer: 'Hamazon',
          bank: ['Hamazon', 'Shema', 'Kaddish', 'Shabbat']
        },
        {
          type: 'fill',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'In Unit 1\'s legal answer, accommodation is owed up to undue ___.',
          answer: 'hardship',
          bank: ['hardship', 'cost', 'effort', 'delay']
        },
        {
          type: 'fill',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'The Supreme Court case that allowed the kirpan in schools under conditions was ___ (2006).',
          answer: 'Multani',
          bank: ['Multani', 'Bhinder', 'Amselem', 'Dhillon']
        },
        {
          type: 'match',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['grace', 'a short prayer of thanks before (and sometimes after) a meal'],
            ['anchor', 'a practice that fixes a day\'s rhythm'],
            ['formation', 'the shaping of character by repeated practice over time'],
            ['mindfulness', 'deliberate, non-judging attention to the present moment'],
            ['secular world', 'public institutions not organized around any religion'],
            ['accommodation', 'adjusting a rule so a person can follow their practice'],
            ['Bismillah', '\'in the name of God\', said by Muslims before a meal'],
            ['Birkat Hamazon', 'the Jewish blessing recited after a meal']
          ]
        },
        {
          type: 'match',
          cat: 'L8 How Daily Practice Shapes a Life',
          prompt: 'Match each Canadian case or law to what it concerned.',
          pairs: [
            ['Baltej Singh Dhillon (1990)', 'the turban in the RCMP uniform'],
            ['Bhinder (1985)', 'a Sikh electrician who refused a hard hat'],
            ['Multani (2006)', 'the kirpan in schools'],
            ['Ontario helmet exemption (2018)', 'turbaned Sikhs riding motorcycles'],
            ['Bill 21 (2019)', 'Quebec\'s ban on religious symbols for teachers and police'],
            ['Amselem', 'sincerity as the test for a religious belief'],
            ['Harjit Sajjan (2015)', 'a turbaned Sikh became Minister of National Defence']
          ]
        }
      ]
    },

    /* ------------------------------------------------------------------ */
    /* Unit 4 · Communities, History, and Sacred Place — 7 lessons */
    {
      id: 'place',
      title: 'Unit 4 · Communities, History, and Sacred Place',
      description: {
        1: 'How big moments in history, founders, branches, and sacred places made traditions what they are today.',
        2: 'How turning points, founders, rituals, and movements shaped the traditions we see in Ontario, and how communities hold together across their branches and degrees of observance. Then we learn to read sacred places — houses of worship, sacred land, cenotaphs, and pilgrimage destinations — the way their communities do.',
        3: 'How turning points (the Jewish diaspora, the Haudenosaunee Confederacy, the Dalai Lama\'s exile), founders (Baha\'u\'llah, the Peacemaker, Jesus in Christianity and Islam), rituals and movements (the Exodus and matzo, Reform Judaism, Vatican II) shaped traditions, and how communities hold together across branches and degrees of observance. Then we read sacred places — Catholic, Orthodox, and Reformed interiors, the gurdwara, the sweat lodge, Turtle Island, the Western Wall, the Ganges, cenotaphs, the Somme, Ipperwash, and pilgrimage to Jerusalem, Mecca, and Varanasi versus the vision quest. Expectations: C1.1, C1.2, C1.3, C1.4, C2.1, C2.2, C2.3, C2.4, F2.1, F2.2, F2.3, F2.4, A4.4.'
      },

      lessons: [
        // ---- Lesson 1: Turning Points: Episodes in the History of Traditions ----
        {
          title: 'Turning Points: Episodes in the History of Traditions',
          slides: [
            {
              title: {
                1: 'Moments that made traditions',
                2: 'Turning points in the history of traditions',
                3: 'Turning points: episodes that made traditions what they are'
              },
              visual: '🕰️',
              body: {
                1: 'Every family has an event that changed its story. A move. A war. A loss.\n\nTraditions have events like this too.\n\nToday we look at three big moments:\n\n- A temple was destroyed and a people were scattered.\n- Five nations at war buried their weapons under a tree.\n- A young leader fled over the mountains.\n\n**We are learning** how each moment changed a tradition, and why it still matters today.',
                2: 'A temple destroyed and a people scattered; five warring nations buried their weapons under a tree; a young leader fled over the Himalayas. Moments that made traditions what they are.\n\nAsk yourself: what one event changed your family\'s story (a move, a war, a loss)? Traditions have such events too, and many of the practices from Unit 3 come from them.\n\n**Learning goals**\n\n- Identify and describe significant episodes from the history of world religions and belief traditions.\n- Explain how each episode changed a tradition\'s practice, leadership, or sense of itself.\n- Connect each episode to the community\'s life today, in Ontario where possible.\n\n**Today\'s three turning points:** the Jewish diaspora, the founding of the Haudenosaunee Confederacy, and the Dalai Lama\'s exile.',
                3: 'A temple destroyed and a people scattered; five warring nations buried their weapons under a tree; a young leader fled over the Himalayas. Moments that made traditions what they are.\n\n**Expectations: C1.1** — the curriculum\'s prompts for C1.1 are exactly these three cases: the diaspora and Jewish practice; the Confederacy and the Woodland Cultural Centre; Tibetan leadership succession and the exile.\n\n**Learning goals**\n\n- Identify and describe significant episodes from the history of world religions and belief traditions.\n- Explain how each episode changed a tradition\'s practice, leadership, or sense of itself.\n- Connect each episode to the community\'s life today, in Ontario where possible.\n\n**Success criteria — I can…**\n\n- describe the Jewish diaspora, the founding of the Haudenosaunee Confederacy, and the Dalai Lama\'s exile with dates and key facts\n- explain one lasting effect of each on practice or leadership\n- explain why the opening of the Woodland Cultural Centre matters to the Six Nations\n\n**Think about it:** Unit 3\'s practices came from history — prayer replaced sacrifice; wampum carries law; the tulku system guides leadership. Which Unit 3 practice can you already connect to one of today\'s episodes?'
              }
            },
            {
              title: { 1: 'Words we need', 2: 'Words we need today', 3: 'Words we need today — and the pattern they describe' },
              visual: '📖',
              body: {
                1: '- **diaspora** — a community living far from the homeland of its tradition, but keeping its identity.\n- **exile** — being forced out of your homeland.\n- **confederacy** — nations joined together under one shared law.\n- **Grand Council** — the council of chiefs that governs the Haudenosaunee.\n- **tulku** — in Tibetan Buddhism, a teacher who is recognized as the rebirth of an earlier teacher.\n- **residential school** — a boarding school that took Indigenous children from their families to make them give up their culture.',
                2: '| Term | Meaning |\n| diaspora | A community living outside the homeland of its tradition, keeping its identity (Unit 1). |\n| exile | Forced removal from one\'s homeland; the Babylonian exile (586 BCE), the Dalai Lama\'s flight (1959). |\n| confederacy | A union of nations under a shared law — the Haudenosaunee (Six Nations) Confederacy. |\n| Grand Council | The governing council of the Haudenosaunee, with fifty chiefs (Hoyane) from the member nations, meeting at Onondaga. |\n| tulku | In Tibetan Buddhism, a recognized reincarnation of a previous teacher; the Dalai Lama is the best-known tulku lineage. |\n| residential school | Government-funded, church-run boarding schools (1880s–1996) that removed Indigenous children from families to assimilate them; the Mohawk Institute in Brantford was the longest-running. |\n\n**Pronunciation help:** Haudenosaunee (ho-den-oh-SHOW-nee), Hoyane (ho-YAH-neh), tulku (TOOL-koo).',
                3: '| Term | Meaning |\n| diaspora | A community living outside the homeland of its tradition, keeping its identity (Unit 1). |\n| exile | Forced removal from one\'s homeland; the Babylonian exile (586 BCE), the Dalai Lama\'s flight (1959). |\n| confederacy | A union of nations under a shared law — the Haudenosaunee (Six Nations) Confederacy. |\n| Grand Council | The governing council of the Haudenosaunee, with fifty chiefs (Hoyane) from the member nations, meeting at Onondaga. |\n| tulku | In Tibetan Buddhism, a recognized reincarnation of a previous teacher; the Dalai Lama is the best-known tulku lineage. |\n| residential school | Government-funded, church-run boarding schools (1880s–1996) that removed Indigenous children from families to assimilate them; the Mohawk Institute in Brantford was the longest-running. |\n\n**Pronunciation help:** Haudenosaunee (ho-den-oh-SHOW-nee), Hoyane (ho-YAH-neh), tulku (TOOL-koo).\n\n**Extra fact:** \'Diaspora\' now describes many communities (Sikh, Tamil, Ukrainian); in this lesson it begins with its original Jewish meaning.\n\n**The pattern these words describe (the unit\'s spine):**\n\n- Each episode involves **loss of a place**: the Temple; the land along the Grand River and the children taken to the Mohawk Institute; Tibet itself.\n- Each tradition responded by making its teaching **portable**: synagogue and Talmud; wampum and the Great Law; a government-in-exile and a worldwide community.\n- Each created a **new institution**: the rabbinate; the Grand Council; the Dalai Lama\'s office in exile.\n- Each is **still unfinished**: the diaspora continues; Six Nations\' land claims and the Centre\'s preservation; the succession question.'
              }
            },
            {
              title: {
                1: 'Real case: the Jewish diaspora',
                2: 'Real case: the Jewish diaspora',
                3: 'Real case: the Jewish diaspora — how losing a Temple reshaped a tradition'
              },
              visual: '🗺️',
              body: {
                1: '> In 586 BCE the Babylonians destroyed the First Temple in Jerusalem. Many Jewish people were taken away to Babylon.\n> In 70 CE the Romans destroyed the Second Temple.\n> Without a Temple, Jewish life had to change. It was rebuilt around things that could travel:\n> - the synagogue, a house of prayer and study in every town\n> - rabbis as teachers, instead of priests\n> - the oral law written down in the Mishnah and Talmud\n> - prayer three times a day, in place of sacrifices\n> - the home as the centre of Shabbat and Passover\n> For almost two thousand years, Jewish life was lived far from Jerusalem. But Jerusalem was always remembered — at every wedding, and in the direction every synagogue faces.',
                2: '> In 586 BCE the Babylonians destroyed the First Temple in Jerusalem and deported much of Judah\'s population; many returned after 538 BCE, but Jewish communities remained in Babylon and spread around the Mediterranean. In 70 CE the Romans destroyed the Second Temple.\n> Without the Temple and its sacrifices, Jewish life reorganized around what could travel: the synagogue as a house of prayer and study in every town; rabbis as teachers rather than priests; the Mishnah (c. 200 CE) and Talmud, which fixed the oral law in writing (Unit 2); prayer three times daily in place of the daily sacrifices; the home as the centre of Shabbat and Passover; and a calendar that could be kept anywhere.\n> For nearly two thousand years the diaspora — from Baghdad to Spain to Poland to Toronto — was Jewish life, with Jerusalem remembered at every wedding (the broken glass) and in every synagogue\'s orientation.',
                3: '> In 586 BCE the Babylonians destroyed the First Temple in Jerusalem and deported much of Judah\'s population; many returned after 538 BCE, but Jewish communities remained in Babylon and spread around the Mediterranean. In 70 CE the Romans destroyed the Second Temple.\n> Without the Temple and its sacrifices, Jewish life reorganized around what could travel: the synagogue as a house of prayer and study in every town; rabbis as teachers rather than priests; the Mishnah (c. 200 CE) and Talmud, which fixed the oral law in writing (Unit 2); prayer three times daily in place of the daily sacrifices; the home as the centre of Shabbat and Passover; and a calendar that could be kept anywhere.\n> For nearly two thousand years the diaspora — from Baghdad to Spain to Poland to Toronto — was Jewish life, with Jerusalem remembered at every wedding (the broken glass) and in every synagogue\'s orientation.\n\n**Think about it**\n\n- List four ways Jewish practice changed because of the diaspora. Which Unit 3 practices came from this?\n- Why could the tradition survive without its central place when many ancient religions did not?\n- How does \'next year in Jerusalem\', said at the end of every Passover Seder, carry this history?\n\n**From the speaker notes:** the four key changes are the synagogue, rabbis, the written oral law, and prayer replacing sacrifice — plus the home-centred festival calendar. The tradition survived because its practices and texts were portable. Toronto has Canada\'s largest Jewish community; many families trace diaspora paths through Europe, North Africa, or the Middle East.'
              }
            },
            {
              title: {
                1: 'Two more turning points',
                2: 'Two more turning points: the Confederacy and the exile',
                3: 'Two more turning points: the Haudenosaunee Confederacy and Tibetan Buddhism in exile'
              },
              visual: '🌲',
              body: {
                1: '**The Haudenosaunee Confederacy.** The Peacemaker, with Hiawatha and the clan mother Jigonhsasee, persuaded five nations at war to bury their weapons under a white pine. They agreed to live under the Great Law of Peace. The Tuscarora joined around 1722, making Six Nations.\n\nThe Mohawk Institute was a residential school near Brantford (1828–1970). In 1972 the Six Nations opened the Woodland Cultural Centre in that same building. A place built to erase their culture now teaches it.\n\n**Tibetan Buddhism in exile.** The Dalai Lama is a tulku. In 1959 he fled Tibet to India and settled in Dharamsala. Who will recognize the next Dalai Lama?',
                2: '**The founding of the Confederacy.** According to Haudenosaunee oral history, the Peacemaker, with Hiawatha and the clan mother Jigonhsasee, persuaded five nations at war — Mohawk, Oneida, Onondaga, Cayuga, Seneca — to bury their weapons beneath a white pine at Onondaga and live under the Great Law of Peace, governed by a Grand Council of chiefs chosen by clan mothers. The Tuscarora joined around 1722, making Six Nations. After the American Revolution many Haudenosaunee moved to the Grand River in Ontario (1784).\n\n**The Woodland Cultural Centre.** The Mohawk Institute near Brantford (1828–1970) was Canada\'s longest-running residential school. In October 1972 the Six Nations and allied nations opened the Woodland Cultural Centre in the former school building — a museum, library, and language centre preserving Haudenosaunee and Anishinaabe culture in the very place built to erase it.\n\n**Tibetan Buddhism in exile.** The Dalai Lama is believed to be a tulku: each one the reincarnation of the last, recognized as a child by senior lamas through signs, oracles, and tests. In March 1959, after a failed uprising against Chinese rule, he fled over the Himalayas to India and settled in Dharamsala, home of the Tibetan government-in-exile. In 2011 he handed political leadership to an elected administration; in July 2025 he affirmed that the institution will continue and that his office, the Gaden Phodrang Trust, alone may recognize his successor.',
                3: '**The founding of the Confederacy.** According to Haudenosaunee oral history, the Peacemaker, with Hiawatha and the clan mother Jigonhsasee, persuaded five nations at war — Mohawk, Oneida, Onondaga, Cayuga, Seneca — to bury their weapons beneath a white pine at Onondaga and live under the Great Law of Peace, governed by a Grand Council of chiefs chosen by clan mothers. The founding predates European contact (dates proposed range from the 1100s to the 1400s); the Tuscarora joined around 1722, making Six Nations. After the American Revolution, many Haudenosaunee who had allied with Britain moved to the Grand River in Ontario (the Haldimand Proclamation, 1784).\n\n**The Woodland Cultural Centre.** In 1828 the Mohawk Institute opened near Brantford; it became Canada\'s longest-running residential school, closing in 1970. In October 1972 the Six Nations and allied nations opened the Woodland Cultural Centre in the former school building — a museum, library, and language centre dedicated to preserving and teaching Haudenosaunee and Anishinaabe culture in the very place built to erase it. Its \'Save the Evidence\' campaign (since 2013) preserves the building as evidence of what happened. Haudenosaunee custom avoids casual use of the Peacemaker\'s personal name; this course follows it.\n\n**Tibetan Buddhism in exile.** The Dalai Lama is believed to be a tulku: each one the reincarnation of the last, recognized as a child by senior lamas through signs, oracles, and tests, and understood as an emanation of Avalokiteshvara, the bodhisattva of compassion. The present Dalai Lama, Tenzin Gyatso, was recognized in 1937 and enthroned in 1940. In March 1959, after a failed uprising against Chinese rule, he fled over the Himalayas to India and settled in Dharamsala, where the Tibetan government-in-exile is based; some 80,000 Tibetans followed. He received the Nobel Peace Prize in 1989 and in 2011 handed political leadership to an elected administration. The exile raised a new question: what happens to succession by reincarnation when the homeland is under a government that claims the right to approve reincarnations? In July 2025 the Dalai Lama affirmed that the institution will continue and that his office, the Gaden Phodrang Trust, alone has the authority to recognize his successor; the Chinese government has stated it will control the selection.\n\n**Worked example — the pattern:** loss of place (Temple / Grand River and the Mohawk Institute / Tibet) → portable teaching (Talmud / wampum and the Great Law / a government-in-exile) → a new institution (the rabbinate / the Grand Council / the Dalai Lama\'s office in exile).\n\n**Think about it:** Why keep the Mohawk Institute building rather than tear it down? Argue both sides.'
              }
            },
            {
              title: { 1: 'Check yourself', 2: 'Check for understanding', 3: 'Check for understanding' },
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- How did the diaspora change Jewish practice? Give three changes.\n- Why does the Woodland Cultural Centre matter to the Six Nations?\n\n**Remember the pattern:** a place is lost → the teaching travels → a new institution is built.',
                2: 'Answer in your notes, then compare with a partner.\n\n- How did the diaspora affect Jewish practice? Give three changes.\n- Why is the founding of the Confederacy important? Why does the Woodland Cultural Centre matter?\n- Describe Tibetan Buddhist succession and two effects of the Dalai Lama\'s exile.\n- State the pattern the three episodes share.\n\n**Talk it through:** The Jewish tradition survived the loss of its Temple by becoming portable. Which Canadian communities today are keeping a tradition alive far from its homeland? What are they carrying?\n\n**Exit ticket:** Write one sentence connecting a Unit 3 practice to one of today\'s episodes.',
                3: 'Answer in your notes, then compare with a partner.\n\n- How did the diaspora affect Jewish practice? Give three changes.\n- Why is the founding of the Confederacy important? Why does the Woodland Cultural Centre matter?\n- Describe Tibetan Buddhist succession and two effects of the Dalai Lama\'s exile.\n- State the pattern the three episodes share.\n\n**Model answer (succession and exile):** The Dalai Lama is a tulku, recognized as a child as the reincarnation of the previous one by senior lamas through signs and tests, understood as an emanation of Avalokiteshvara. Exile (1959) means the search may happen outside Tibet; the Chinese government claims the right to approve reincarnations; the 2025 statement says the institution will continue and only the Gaden Phodrang Trust may recognize the successor; political leadership was separated in 2011.\n\n**Talk it through**\n\n- Which Canadian communities today are keeping a tradition alive far from its homeland? What are they carrying?\n- If a leader is chosen by reincarnation, who decides what counts as recognition? What does the 2025 statement try to settle?\n\n**Looking ahead:** Lesson 2 — the founders behind the episodes; Lesson 3 — how episodes become rituals (Exodus → matzo) and reforms; Lessons 4–5 — how communities split, differ, and hold together; Lessons 6–7 — sacred place, the thing each episode lost or defended.'
              }
            }
          ]
        },

        // ---- Lesson 2: Founders and Major Figures ----
        {
          title: 'Founders and Major Figures',
          slides: [
            {
              title: {
                1: 'Who started it?',
                2: 'Founders and major figures',
                3: 'Founders and major figures: origins, role, contribution'
              },
              visual: '👥',
              body: {
                1: 'What does a founder give a tradition that a book alone cannot? A life to copy. A story. Authority.\n\nToday we meet three figures:\n\n- A prisoner who declared a new faith in a garden.\n- A man who crossed a lake in a stone canoe to end a war.\n- A teacher from Nazareth who is claimed by Christians and honoured by Muslims.\n\n**We are learning** where each founder came from, what role they played, and what they gave their tradition.',
                2: 'A prisoner who declared a new faith in a garden; a man who crossed a lake in a stone canoe to end a war; a teacher from Nazareth claimed by two billion Christians and honoured by two billion Muslims.\n\nWhat does a founder give a tradition that a text alone cannot? A life to imitate, a story, authority. Today: three figures — and in the third case, one figure understood two ways.\n\n**Learning goals**\n\n- Identify major figures from the history of various traditions and explain their origins, roles, and contributions.\n- Explain how Baha\'u\'llah shaped the Baha\'i Faith and how the Peacemaker influenced the Haudenosaunee.\n- Compare the significance and role of Jesus of Nazareth in Christianity and in Islam.',
                3: 'A prisoner who declared a new faith in a garden; a man who crossed a lake in a stone canoe to end a war; a teacher from Nazareth claimed by two billion Christians and honoured by two billion Muslims.\n\nWhat does a founder give a tradition that a text alone cannot? A life to imitate, a story, authority. Today: three figures — and in the third case, one figure understood two ways.\n\n**Expectations: C1.2** — the curriculum\'s prompts are exactly these three cases. The unit test asks for one founder\'s origins, role, and contribution, and for the Jesus comparison.\n\n**Learning goals**\n\n- Identify major figures from the history of various traditions and explain their origins, roles, and contributions.\n- Explain how Baha\'u\'llah shaped the Baha\'i Faith and how the Peacemaker influenced the Haudenosaunee.\n- Compare the significance and role of Jesus of Nazareth in Christianity and in Islam.\n\n**Success criteria — I can…**\n\n- give the origins, role, and two contributions of Baha\'u\'llah\n- explain who the Peacemaker was and what he brought to the Haudenosaunee\n- state three differences and two similarities in how Christianity and Islam understand Jesus\n\n**Think about it:** the course habit for this lesson is to describe each tradition in its own voice — \'Christians believe…\', \'the Qur\'an teaches…\' — and to name differences plainly without ranking them.'
              }
            },
            {
              title: {
                1: 'Words we need',
                2: 'Words we need today — and other founders to know',
                3: 'Words we need today — and other founders to know'
              },
              visual: '📖',
              body: {
                1: '- **founder** — the person a tradition says it began with.\n- **prophet** — a person believed to speak for God.\n- **Manifestation of God** — the Baha\'i name for the founders of the world\'s religions.\n- **incarnation** — the Christian belief that God became human in Jesus.\n- **Isa** — the Qur\'an\'s name for Jesus.\n- **condolence ceremony** — the Haudenosaunee ceremony that clears grief so a new chief can be raised.\n\n**Other founders:** the Buddha, Muhammad, Guru Nanak, and Handsome Lake.',
                2: '| Term | Meaning |\n| founder | The person a tradition traces its origin to — a prophet, teacher, or lawgiver. |\n| prophet / messenger | A person believed to speak for God; in Islam, messengers bring scripture (Moses, Jesus, Muhammad). |\n| Manifestation of God | The Baha\'i term for the founders of the world\'s religions — Abraham, Moses, Buddha, Jesus, Muhammad, the Bab, Baha\'u\'llah — each revealing God\'s will for an age. |\n| incarnation | The Christian belief that God became human in Jesus. |\n| Isa | The Qur\'anic name for Jesus, honoured as a prophet and messenger born of the virgin Maryam. |\n| condolence ceremony | The Haudenosaunee ceremony, taught by the Peacemaker, that clears grief so that a new chief can be raised and the council can think clearly. |\n\n**Other founders to know:** the Buddha (c. 5th century BCE), who taught the Four Noble Truths and Eightfold Path; Muhammad (c. 570–632 CE), honoured in Islam as the final prophet; Guru Nanak (1469–1539), the first Sikh Guru; Handsome Lake (c. 1735–1815), the Seneca prophet whose visions produced the Code.',
                3: '| Term | Meaning |\n| founder | The person a tradition traces its origin to — a prophet, teacher, or lawgiver. |\n| prophet / messenger | A person believed to speak for God; in Islam, messengers bring scripture (Moses, Jesus, Muhammad). |\n| Manifestation of God | The Baha\'i term for the founders of the world\'s religions — Abraham, Moses, Buddha, Jesus, Muhammad, the Bab, Baha\'u\'llah — each revealing God\'s will for an age. |\n| incarnation | The Christian belief that God became human in Jesus. |\n| Isa | The Qur\'anic name for Jesus, honoured as a prophet and messenger born of the virgin Maryam. |\n| condolence ceremony | The Haudenosaunee ceremony, taught by the Peacemaker, that clears grief so that a new chief can be raised and the council can think clearly. |\n\n\'Manifestation of God\' is the Baha\'i Faith\'s own term and the key to understanding its view of other religions. \'Incarnation\' and \'Isa\' set up the Jesus comparison.\n\n**Other founders and figures to know (the C1.2 pattern: origins, role, contribution)**\n\n- **Siddhartha Gautama, the Buddha** (c. 5th century BCE): a prince of the Shakya clan in what is now Nepal who left his palace, sought the end of suffering, awakened under a tree at Bodh Gaya, and taught the Four Noble Truths and Eightfold Path for about 45 years.\n- **Muhammad** (c. 570–632 CE): a merchant of Mecca who, Muslims believe, received the Qur\'an from 610; persecuted, he migrated to Medina in 622 (the start of the Islamic calendar), united Arabia, and is honoured as the final prophet, not worshipped.\n- **Guru Nanak** (1469–1539) and the Sikh Gurus: born in Punjab, he taught the oneness of God, equality of all people, honest work, and service; nine Gurus followed him, ending with Guru Gobind Singh (founder of the Khalsa, 1699), who named the Guru Granth Sahib the eternal Guru.\n- **Handsome Lake** (c. 1735–1815): the Seneca prophet whose 1799 visions produced the Code and the Longhouse religion — a figure born inside his nation who renewed it, as the Peacemaker founded it from outside.'
              }
            },
            {
              title: {
                1: 'Real case: Baha\'u\'llah',
                2: 'Real case: Baha\'u\'llah',
                3: 'Real case: Baha\'u\'llah — from prisoner to founder of a world faith'
              },
              visual: '🌹',
              body: {
                1: '> Baha\'u\'llah was born in Tehran, Persia, in 1817. His name means \'the Glory of God\'.\n> In 1844 he became a follower of the Bab, who said a new messenger from God was coming. The Bab was executed in 1850.\n> In 1852 Baha\'u\'llah was put in a dungeon in Tehran. He later said he received his mission there. Then he was sent away to Baghdad.\n> In 1863, in a garden near Baghdad now called Ridvan, he declared that he was the messenger the Bab had promised.\n> He was exiled again and again, and died in the prison city of Akka in 1892.\n> His writings teach that there is one God, one religion, and one human family. They teach that women and men are equal, that science and religion agree, that everyone should be educated, and that the world should be at peace.\n> Today the Baha\'i Faith is run by elected councils. It has no clergy.',
                2: '> Mirza Husayn-Ali, later called Baha\'u\'llah (\'the Glory of God\'), was born in Tehran, Persia, in 1817 to a noble family. In 1844 he became a follower of the Bab, a young merchant who announced the coming of a new messenger from God; the Bab was executed in 1850 and his followers were persecuted.\n> In 1852 Baha\'u\'llah was imprisoned in a Tehran dungeon, where he later said he received his mission, then exiled to Baghdad. In 1863, in a garden outside Baghdad now called Ridvan, he declared himself the messenger the Bab had foretold. Further exiles took him to Constantinople, Adrianople, and finally the prison city of Akka (Acre), where he died in 1892.\n> His writings — thousands of letters and books — teach the oneness of God, the oneness of religion (all founders as Manifestations of one God), and the oneness of humanity; the equality of women and men; the harmony of science and religion; universal education; and a world at peace. The Baha\'i Faith now has members in nearly every country, administered by elected councils with no clergy.',
                3: '> Mirza Husayn-Ali, later called Baha\'u\'llah (\'the Glory of God\'), was born in Tehran, Persia, in 1817 to a noble family. In 1844 he became a follower of the Bab, a young merchant who announced the coming of a new messenger from God; the Bab was executed in 1850 and his followers were persecuted.\n> In 1852 Baha\'u\'llah was imprisoned in a Tehran dungeon, where he later said he received his mission, then exiled to Baghdad. In 1863, in a garden outside Baghdad now called Ridvan, he declared himself the messenger the Bab had foretold. Further exiles took him to Constantinople, Adrianople, and finally the prison city of Akka (Acre), where he died in 1892.\n> His writings — thousands of letters and books — teach the oneness of God, the oneness of religion (all founders as Manifestations of one God), and the oneness of humanity; the equality of women and men; the harmony of science and religion; universal education; and a world at peace. The Baha\'i Faith now has members in nearly every country, administered by elected councils with no clergy.\n\n**Think about it**\n\n- Give Baha\'u\'llah\'s origins, role, and three contributions to the Baha\'i Faith.\n- How did persecution and exile shape the faith he founded? Compare with the pattern from Lesson 1 (loss of place → portable teaching → new institution).\n- Baha\'is honour Jesus, Muhammad, and the Buddha as Manifestations of God. How might that shape how a Baha\'i student relates to classmates of other faiths?\n\n**From the speaker notes:** born November 12, 1817; declaration April 1863; death May 29, 1892 at Bahji near Akka. The Baha\'i community in Canada dates to 1898. Baha\'is in Iran face documented persecution today. The Lesson 1 pattern fits: exile → writings → elected councils (the Universal House of Justice in Haifa).'
              }
            },
            {
              title: {
                1: 'Real case: the Peacemaker',
                2: 'Real case: the Peacemaker',
                3: 'Real case: the Peacemaker — a stranger who brought peace to the Haudenosaunee'
              },
              visual: '🛶',
              body: {
                1: 'The Peacemaker was born among the Wendat, on the north shore of Lake Ontario. He was an outsider to the five nations he united.\n\nHe crossed the lake in a stone canoe to bring the Great Law of Peace.\n\n- His first ally was **Jigonhsasee**. He gave women the role of choosing chiefs.\n- He then won over **Hiawatha**, who was grieving. He taught the **condolence ceremony** that clears grief.\n- **Tadodaho**, a feared leader, became the keeper of the council fire.\n\nHe planted the Tree of Peace at Onondaga and buried the weapons of war under it.\n\nHaudenosaunee custom does not say his personal name casually. He is called the Peacemaker.',
                2: 'In Haudenosaunee oral history, the Peacemaker was born among the Wendat (Huron) on the north shore of Lake Ontario — an outsider to the five nations he would unite. Tradition tells that he crossed the lake in a stone canoe to bring the Great Law of Peace to nations locked in blood feuds.\n\n- He first persuaded **Jigonhsasee**, a woman who fed warriors from all sides, and gave women the role of choosing chiefs.\n- He then won over **Hiawatha**, an Onondaga grieving the murder of his daughters, and taught the **condolence ceremony** that clears grief so that leaders can reason.\n- Together they confronted **Tadodaho**, a feared Onondaga leader, whose twisted mind and body the Peacemaker \'combed straight\'; Tadodaho became the keeper of the council fire.\n\nThe Peacemaker planted the Tree of Peace at Onondaga and buried the weapons of war beneath it. Haudenosaunee custom avoids speaking his personal name casually; he is called the Peacemaker.\n\n**Three contributions:** the Great Law of Peace; the council structure with clan mothers\' authority; the condolence ceremony — plus the Tree of Peace symbolism.',
                3: 'In Haudenosaunee oral history, the Peacemaker was born among the Wendat (Huron) on the north shore of Lake Ontario — an outsider to the five nations he would unite. Tradition tells that he crossed the lake in a stone canoe to bring the Great Law of Peace to nations locked in blood feuds.\n\n- He first persuaded **Jigonhsasee**, a woman who fed warriors from all sides, and gave women the role of choosing chiefs.\n- He then won over **Hiawatha**, an Onondaga grieving the murder of his daughters, and taught the **condolence ceremony** that clears grief so that leaders can reason.\n- Together they confronted **Tadodaho**, a feared Onondaga leader, whose twisted mind and body the Peacemaker \'combed straight\'; Tadodaho became the keeper of the council fire.\n\nThe Peacemaker planted the Tree of Peace at Onondaga and buried the weapons of war beneath it. Haudenosaunee custom avoids speaking his personal name casually; he is called the Peacemaker.\n\n**Worked example (model panel text):** \'Born among the Wendat on the north shore of Lake Ontario, the Peacemaker crossed the lake to bring peace to five warring nations. With Jigonhsasee and Hiawatha, he taught the Great Law of Peace and the condolence ceremony, and gave clan mothers the authority to choose chiefs. He planted the Tree of Peace at Onondaga and buried the weapons of war beneath it. The Haudenosaunee Confederacy he founded still meets in Grand Council.\'\n\n**Think about it**\n\n- How have the Haudenosaunee been influenced by someone born outside their nation? Name three things the Peacemaker brought.\n- Why might it matter that the founder of the Confederacy was an outsider, and that his first ally was a woman? (From the notes: the outsider status is part of the teaching — peace comes from beyond the feuding parties; Jigonhsasee\'s role grounds the clan mothers\' authority.)\n- Compare the Peacemaker and Baha\'u\'llah: two founders, two very different kinds of tradition. What do their contributions have in common?'
              }
            },
            {
              title: {
                1: 'Jesus in two traditions',
                2: 'Jesus of Nazareth in two traditions',
                3: 'Jesus of Nazareth in two traditions — and check for understanding'
              },
              visual: '⚖️',
              body: {
                1: '| In Christianity | In Islam |\n| The Son of God, God made human | Isa, a prophet and messenger of God, not divine |\n| Born of the Virgin Mary | Born of the virgin Maryam |\n| Crucified, died, and rose again | Not crucified; God raised him to himself |\n| Saviour, worshipped in the Trinity | Honoured, not worshipped |\n\n**Same:** virgin birth, miracles, a messenger of God, a return at the end of time, deep respect.\n\n**Check yourself**\n\n- Name two things both traditions say about Jesus.\n- Name two things the Peacemaker brought to the Haudenosaunee.',
                2: '| In Christianity | In Islam |\n| The Son of God: God incarnate, born of the Virgin Mary; taught, healed, and gathered disciples | Isa, son of Maryam: a prophet and messenger of God, born of a virgin by God\'s command, who performed miracles by God\'s permission |\n| Crucified under Pontius Pilate, died, and rose on the third day — the resurrection is the centre of Christian faith | Not crucified: the Qur\'an (4:157–158) says it was made to appear so, and that God raised him to himself |\n| Saviour: his death and resurrection reconcile humanity with God | Brought the Injil (Gospel) as scripture; one in the line from Adam through Abraham and Moses to Muhammad, the final messenger |\n| Second person of the Trinity; worshipped; present in the Eucharist | Not divine and not the son of God: the Qur\'an insists on God\'s absolute oneness |\n| The Gospels and letters are the primary sources; the Church continues his mission | Will return before the Day of Judgment; honoured — Muslims say \'peace be upon him\' after his name |\n\n**Similarities:** virgin birth; miracles; a messenger of God; a return at the end of time; deep reverence. **Differences:** divinity and the Trinity; the crucifixion and resurrection; salvation through his death; worship.\n\n**Check for understanding:** give Baha\'u\'llah\'s origins, role, and two contributions; name three things the Peacemaker brought; state two similarities and three differences between Jesus in Christianity and in Islam.',
                3: '| In Christianity | In Islam |\n| The Son of God: God incarnate, born of the Virgin Mary; taught, healed, and gathered disciples | Isa, son of Maryam: a prophet and messenger of God, born of a virgin by God\'s command, who performed miracles by God\'s permission |\n| Crucified under Pontius Pilate, died, and rose on the third day — the resurrection is the centre of Christian faith | Not crucified: the Qur\'an (4:157–158) says it was made to appear so, and that God raised him to himself |\n| Saviour: his death and resurrection reconcile humanity with God | Brought the Injil (Gospel) as scripture; one in the line from Adam through Abraham and Moses to Muhammad, the final messenger |\n| Second person of the Trinity; worshipped; present in the Eucharist | Not divine and not the son of God: the Qur\'an insists on God\'s absolute oneness |\n| The Gospels and letters are the primary sources; the Church continues his mission | Will return before the Day of Judgment; honoured — Muslims say \'peace be upon him\' after his name |\n\n**Worked example (model answer):** Similarities: virgin birth; miracles; a messenger of God; return at the end of time; reverence. Differences: Christians — Son of God, incarnate, crucified and risen, saviour, worshipped as part of the Trinity; Muslims — Isa, a prophet and messenger, not divine, not crucified (Qur\'an 4:157–158), honoured but not worshipped. Present each as the tradition\'s own teaching: \'Christians believe…\', \'the Qur\'an teaches…\'. Islam\'s honour for Jesus is real; the disagreement is theological, not disrespect.\n\n**Check for understanding**\n\n- Give Baha\'u\'llah\'s origins, role, and two contributions.\n- What did the Peacemaker bring to the Haudenosaunee? Why is it significant that he came from outside?\n- State two similarities and three differences between Jesus in Christianity and in Islam.\n- Name two other founders with their tradition and one contribution each.\n\n**Talk it through**\n\n- Baha\'u\'llah taught that all religions\' founders are Manifestations of one God. Is that view generous, or does it erase real differences? How might a Christian or a Muslim respond?\n- The Peacemaker gave women the right to choose chiefs. How does a founding story shape who holds power centuries later?\n- Can two traditions share a figure and still respect each other\'s view? What would that take?'
              }
            }
          ]
        },

        // ---- Lesson 3: History into Ritual, Movements into Change ----
        {
          title: 'History into Ritual, Movements into Change',
          slides: [
            {
              title: {
                1: 'How history becomes ritual',
                2: 'History into ritual, movements into change',
                3: 'History into ritual, movements into change'
              },
              visual: '🍞',
              body: {
                1: 'Matzo is a flat, dry cracker. Millions of people eat it for a week every spring. Why? Because of an escape that happened about 3,000 years ago.\n\nHistory becomes ritual. And movements change ritual.\n\n**We are learning**\n\n- how the Exodus story shapes Passover\n- what Reform Judaism changed and why\n- what changed after the Second Vatican Council',
                2: 'Why unleavened bread tastes of an escape 3,000 years ago; why some synagogues have organs and women rabbis; why a Catholic Mass in 1950 and in 1970 looked so different.\n\nA flat, dry cracker that millions eat for a week every spring because of an event in the Bronze Age. History becomes ritual; and movements change ritual. Both today.\n\n**Learning goals**\n\n- Explain the relationship between specific historical incidents and the practices or rituals associated with particular traditions.\n- Explain the relationship between religious movements or events and changes in religious practice over time.\n- Describe what changed after the Second Vatican Council and why lay participation grew as vowed religious life declined.',
                3: 'Why unleavened bread tastes of an escape 3,000 years ago; why some synagogues have organs and women rabbis; why a Catholic Mass in 1950 and in 1970 looked so different.\n\nA flat, dry cracker that millions eat for a week every spring because of an event in the Bronze Age. History becomes ritual; and movements change ritual. Both today.\n\n**Expectations: C1.3, C1.4** — C1.3\'s example is the Exodus and matzo; C1.4\'s examples are Reform Judaism and Vatican II, with the prompt about vowed religious and lay movements.\n\n**Learning goals**\n\n- Explain the relationship between specific historical incidents and the practices or rituals associated with particular traditions.\n- Explain the relationship between religious movements or events and changes in religious practice over time.\n- Describe what changed after the Second Vatican Council and why lay participation grew as vowed religious life declined.\n\n**Success criteria — I can…**\n\n- explain how the Exodus story shapes at least three Passover practices\n- describe what Reform Judaism changed and why\n- describe three changes made by Vatican II and explain the shift from vowed religious to lay participation\n\n**Think about it:** Passover is also a spring harvest festival; the Exodus story was laid over the season. Ritual turns history into present identity — the pattern across this unit.'
              }
            },
            {
              title: {
                1: 'Words we need, and the pattern',
                2: 'Words we need today — and the pattern',
                3: 'Words we need today — and the pattern (the test\'s matching base)'
              },
              visual: '🕰️',
              body: {
                1: '- **Exodus** — the Bible story of the Israelites escaping slavery in Egypt.\n- **Seder** — the Passover meal where the Exodus is retold with special foods.\n- **matzo** — flat bread with no yeast, eaten at Passover.\n- **Reform Judaism** — a movement that changed Jewish worship to fit modern life.\n- **Second Vatican Council** — the 1962–1965 meeting of Catholic bishops that renewed the Church.\n- **laity** — members who are not clergy.\n\n**The pattern:** a historical event → a ritual. A movement → a change in practice.',
                2: '| Term | Meaning |\n| Exodus | The biblical account of the Israelites\' escape from slavery in Egypt under Moses; the founding story of the Jewish people. |\n| Seder | The ordered Passover meal at which the Exodus is retold with symbolic foods. |\n| matzo | Unleavened bread eaten at Passover, recalling dough that had no time to rise. |\n| Reform Judaism | A movement beginning in early 19th-century Germany that adapted worship and practice to modern life; today the largest Jewish denomination in North America. |\n| Second Vatican Council | The meeting of the world\'s Catholic bishops (1962–1965) that renewed the Church\'s worship, teaching, and relations with other faiths. |\n| laity / vowed religious | Laity: members who are not clergy. Vowed religious: priests in religious orders, sisters, and brothers who take vows (poverty, chastity, obedience). |\n\n**Historical incident → ritual (C1.3):** Exodus → matzo and the Seder; rededication of the Temple (164 BCE) → eight nights of light; the founding of the Khalsa (1699) → Vaisakhi processions; the armistice of 1918 → two minutes of silence on November 11.\n\n**Movement → changed practice (C1.4):** Reform Judaism → vernacular prayer, women rabbis, mixed seating; Vatican II → vernacular Mass, lay ministry, interfaith dialogue.',
                3: '| Term | Meaning |\n| Exodus | The biblical account of the Israelites\' escape from slavery in Egypt under Moses; the founding story of the Jewish people. |\n| Seder | The ordered Passover meal at which the Exodus is retold with symbolic foods. |\n| matzo | Unleavened bread eaten at Passover, recalling dough that had no time to rise. |\n| Reform Judaism | A movement beginning in early 19th-century Germany that adapted worship and practice to modern life; today the largest Jewish denomination in North America. |\n| Second Vatican Council | The meeting of the world\'s Catholic bishops (1962–1965) that renewed the Church\'s worship, teaching, and relations with other faiths. |\n| laity / vowed religious | Laity: members who are not clergy. Vowed religious: priests in religious orders, sisters, and brothers who take vows (poverty, chastity, obedience). |\n\n**Historical incident → ritual (C1.3)**\n\n| Incident | Ritual |\n| Exodus | matzo, Seder, Passover cleaning |\n| Rededication of the Temple (164 BCE) | eight nights of light |\n| Esther\'s victory | reading the Megillah at Purim |\n| Jesus\' last meal and death | the Eucharist and Good Friday |\n| The founding of the Khalsa (1699) | Vaisakhi processions |\n| The Buddha\'s enlightenment | Wesak lamps |\n| The armistice of 1918 | two minutes of silence on November 11 |\n\n**Movement or event → changed practice (C1.4)**\n\n| Movement | Change |\n| Reform Judaism | vernacular prayer, women rabbis, mixed seating; Orthodox and Conservative responses |\n| Vatican II | vernacular Mass, lay ministry, interfaith dialogue, fewer vowed religious |\n| The Protestant Reformation (1517) | scripture in local languages, married clergy, plain churches |\n| The Code of Handsome Lake (1799) | the Longhouse religion |\n| Sikh reform movements (late 1800s) | standardized gurdwara practice |\n| Secularization in Canada | the \'no religion\' third |\n\n**Think about it:** add one example of each from a tradition you know.'
              }
            },
            {
              title: {
                1: 'Real case: the Exodus on the table',
                2: 'Real case: the Exodus on the table',
                3: 'Real case: the Exodus on the table — how a story becomes a meal'
              },
              visual: '🍲',
              body: {
                1: '> The Torah tells that the Israelites were slaves in Egypt. They were freed after ten plagues. On the last night they marked their doors with lamb\'s blood so death would pass over their homes. They left so fast that their bread had no time to rise.\n> Every spring at Passover, Jewish families retell this story at the Seder meal. The table tells the story:\n> - **matzo** for the bread that did not rise\n> - **bitter herbs** for slavery\n> - **charoset**, a paste of fruit and nuts, for the mortar of the bricks\n> - **salt water** for tears\n> - a **roasted bone** for the Passover lamb\n> - **four cups of wine** for four promises of freedom\n> For the whole week, no leavened food is eaten. The youngest child asks, \'Why is this night different?\' The answer is the story.',
                2: '> The Torah tells that the Israelites, enslaved in Egypt, were freed after ten plagues; on the last night they marked their doors with lamb\'s blood so death would pass over their homes, and left so quickly that their bread had no time to rise.\n> Every spring at Passover, Jewish families retell the story at the Seder, and the table is the story: matzo for the unrisen bread; bitter herbs (maror) for slavery; a paste of fruit and nuts (charoset) for the mortar of the bricks; salt water for tears; a roasted bone for the Passover lamb; four cups of wine for four promises of freedom.\n> For the week of Passover no leavened food is eaten and homes are cleaned of it. The youngest child asks \'why is this night different?\', and the answer is the story. The Haggadah, the Seder\'s text, instructs each generation to see itself as having come out of Egypt.',
                3: '> The Torah tells that the Israelites, enslaved in Egypt, were freed after ten plagues; on the last night they marked their doors with lamb\'s blood so death would pass over their homes, and left so quickly that their bread had no time to rise.\n> Every spring at Passover (April 22–29 in 2027), Jewish families retell the story at the Seder, and the table is the story: matzo for the unrisen bread; bitter herbs (maror) for slavery; a paste of fruit and nuts (charoset) for the mortar of the bricks; salt water for tears; a roasted bone for the Passover lamb; four cups of wine for four promises of freedom.\n> For the week of Passover no leavened food is eaten and homes are cleaned of it. The youngest child asks \'why is this night different?\', and the answer is the story. The Haggadah, the Seder\'s text, instructs each generation to see itself as having come out of Egypt.\n\n**Think about it**\n\n- Connect each of five Seder foods to the part of the Exodus it recalls.\n- Why eat the story rather than only read it?\n- The Haggadah tells each person to see themselves as freed from Egypt. What does that do to a historical event?\n\n**From the speaker notes:** this is the curriculum\'s own example for C1.3 — \'the exodus of Jews from Egypt and the eating of matzo at Passover\'. Passover is also a spring harvest festival; the Exodus story was laid over the season. Ritual turns history into present identity.'
              }
            },
            {
              title: {
                1: 'Two movements that changed practice',
                2: 'Two movements: Reform Judaism and the Second Vatican Council',
                3: 'Two movements: Reform Judaism and the Second Vatican Council (1962–1965)'
              },
              visual: '🕊️',
              body: {
                1: '**Reform Judaism** began in Germany in the early 1800s. Some Jewish communities changed worship to fit modern life: prayers in German as well as Hebrew, organs, shorter services. Later it ordained women as rabbis (the first in 1972). Other Jews formed Orthodox and Conservative movements that kept more traditional practice.\n\n**The Second Vatican Council** (1962–1965) brought the world\'s Catholic bishops to Rome. After it, the Mass could be said in local languages with the priest facing the people. Lay people began to read scripture and lead music. Since then, fewer people have become priests, sisters, and brothers, and lay roles have grown.',
                2: '**Reform Judaism.** In early 19th-century Germany, as Jews gained civil rights and entered universities and professions, some communities began to adapt worship to the world around them: prayers in German as well as Hebrew, sermons, choirs and organs, shorter services, and a rethinking of laws they saw as belonging to an earlier age. Leaders such as Abraham Geiger argued that Judaism had always changed and should continue to. Holy Blossom Temple in Toronto, founded in 1856, is now Canada\'s largest Reform congregation. Over time Reform Judaism ordained women as rabbis (the first in 1972), seated men and women together, and welcomed converts and interfaith families. In response, other Jews formed Orthodox and Conservative movements that kept more traditional practice.\n\n**The Second Vatican Council.** Pope John XXIII called the world\'s Catholic bishops to Rome in 1962; the Council concluded under Paul VI in 1965. The Mass could be celebrated in local languages instead of Latin, with the priest facing the people; lay people began to read scripture, lead music, and distribute Communion; the Church declared respect for other religions (Nostra Aetate, 1965) and affirmed religious freedom; and it described the Church as \'the people of God\', with every baptized person sharing in its mission. Since then the number of priests, sisters, and brothers in countries like Canada has fallen sharply, while lay ministries, parish councils, and lay teachers in Catholic schools have grown.',
                3: '**Reform Judaism.** In early 19th-century Germany, as Jews gained civil rights and entered universities and professions, some communities began to adapt worship to the world around them: prayers in German as well as Hebrew, sermons, choirs and organs, shorter services, and a rethinking of laws they saw as belonging to an earlier age. Leaders such as Abraham Geiger argued that Judaism had always changed and should continue to. Reform spread to North America with German immigrants; Holy Blossom Temple in Toronto, founded in 1856, gradually adopted Reform practice and is now Canada\'s largest Reform congregation. Over time Reform Judaism ordained women as rabbis (the first in 1972), seated men and women together, welcomed converts and interfaith families, and emphasized ethics and social justice. In response, other Jews formed Orthodox and Conservative movements that kept more traditional practice — so one movement reshaped the whole community\'s landscape. (Notes: Israel Jacobson\'s first Reform-style service at Seesen, 1810; Sally Priesand ordained 1972.)\n\n**The Second Vatican Council.** Pope John XXIII called the world\'s Catholic bishops to Rome in 1962; the Council concluded under Paul VI in 1965. The Mass could be celebrated in local languages instead of Latin, with the priest facing the people; lay people began to read scripture, lead music, and distribute Communion; the Church declared respect for other religions (Nostra Aetate, 1965), committed to dialogue with other Christians, and affirmed religious freedom; and it described the Church as \'the people of God\', with every baptized person sharing in its mission. Since then the number of priests, sisters, and brothers in countries like Canada has fallen sharply, while lay ministries, parish councils, lay teachers in Catholic schools, and movements of lay spirituality have grown. Many Catholics see this as the Council\'s vision realized; others mourn what was lost; both agree the Council was a turning point.\n\n**Worked example — why vowed religious declined and lay participation grew:** the Council\'s teaching that every baptized person shares the Church\'s mission; the vernacular, participatory Mass opening roles to lay readers, ministers, and musicians; social changes of the 1960s (smaller families, more options for women, secularization) that reduced vocations independently of the Council; parishes needing lay people as clergy declined. Ontario\'s Catholic schools were largely staffed by religious orders before the 1960s and are now almost entirely lay-taught.\n\n**Think about it:** Reform Judaism and Vatican II both put worship in the people\'s language. What is gained and lost when a sacred language is replaced by an everyday one?'
              }
            },
            {
              title: { 1: 'Check yourself', 2: 'Check for understanding', 3: 'Check for understanding' },
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- Connect three Seder foods to the Exodus story.\n- Name two things that changed after Vatican II.\n\n**Remember:** a historical event can become a ritual, and a movement can change how people practise.',
                2: 'Answer in your notes, then compare with a partner.\n\n- Connect three Seder foods to the Exodus.\n- What did Reform Judaism change, and what movements formed in response?\n- Name four changes after Vatican II and two reasons lay participation grew as vowed religious declined.\n- Give one more example each of history → ritual and movement → change.\n\n**Talk it through:** If a tradition changes its practice, is it the same tradition? Who decides — leaders, members, or time?\n\n**Exit ticket:** Write one historical incident and the ritual that recalls it, from any tradition.',
                3: 'Answer in your notes, then compare with a partner.\n\n- Connect three Seder foods to the Exodus.\n- What did Reform Judaism change, and what movements formed in response?\n- Name four changes after Vatican II and two reasons lay participation grew as vowed religious declined.\n- Give one more example each of history → ritual and movement → change.\n\n**Worked example — comparing the two movements:** both put worship in the people\'s language, expanded lay roles (women rabbis; lay ministers), and opened to other faiths. Reform changed law and ordination more radically, while Catholicism kept the priesthood, the sacraments, and papal authority. Both provoked internal responses (Orthodox and Conservative; traditionalist Catholics). Each movement kept the ritual core and changed the surrounding form.\n\n**Talk it through**\n\n- The Seder tells each person to see themselves as freed from Egypt. Could Canada\'s Remembrance Day work that way? Should it?\n- If a tradition changes its practice, is it the same tradition? Who decides — leaders, members, or time?\n\n**Exit ticket:** Write one historical incident and the ritual that recalls it, from any tradition. For your Sacred Place Profile, name one historical event or movement that shaped your community or its building.'
              }
            }
          ]
        },

        // ---- Lesson 4: One Tradition, Many Branches ----
        {
          title: 'One Tradition, Many Branches',
          slides: [
            {
              title: {
                1: 'One tradition, many branches',
                2: 'One tradition, many branches',
                3: 'One tradition, many branches: difference, unity, and roles'
              },
              visual: '🌳',
              body: {
                1: 'The same leader can be a living bodhisattva, a respected monk, a Nobel Prize winner, and a political problem. It depends on who is looking.\n\nEvery tradition has differences inside it. Some are small. Some became separate branches long ago.\n\n**We are learning**\n\n- how branches of a tradition differ\n- what still holds them together\n- who does what inside a community',
                2: 'The same leader is a living bodhisattva, a respected monk, a Nobel laureate, and a political problem — depending on who is looking. How traditions hold together across their differences.\n\nName one thing your family does differently from another family of the same tradition or culture. Every tradition contains such differences, some small, some that became separate branches centuries ago.\n\n**Learning goals**\n\n- Identify and explain differences in beliefs and practices between branches within particular communities of believers, and describe the unifying elements that connect them.\n- Describe various roles played by people in different belief traditions.\n- Explain why one figure — the Dalai Lama — is perceived differently by different Buddhist branches and by secular society, and how the concept of umma shapes relationships among Muslims.',
                3: 'The same leader is a living bodhisattva, a respected monk, a Nobel laureate, and a political problem — depending on who is looking. How traditions hold together across their differences.\n\nName one thing your family does differently from another family of the same tradition or culture. Every tradition contains such differences, some small, some that became separate branches centuries ago.\n\n**Expectations: C2.1, C2.2** — C2.1\'s prompts are the Dalai Lama and the umma; C2.2\'s examples are the Métis Senators, Orthodox laity, the cantor, and gender roles.\n\n**Learning goals**\n\n- Identify and explain differences in beliefs and practices between branches within particular communities of believers, and describe the unifying elements that connect them.\n- Describe various roles played by people in different belief traditions.\n- Explain why the Dalai Lama is perceived differently by different Buddhist branches and by secular society, and how the concept of umma shapes relationships among Muslims.\n\n**Success criteria — I can…**\n\n- describe how Vajrayana, Theravada, and Mahayana Buddhists and secular observers see the Dalai Lama\n- explain the Sunni–Shia–Ismaili differences and what the umma unites\n- describe the roles of Métis Senators, Orthodox laity, the cantor, and men, women, boys, and girls in at least one tradition\n\n**Think about it:** branches of a tradition often disagree more sharply with each other than with outsiders. Why might that be?'
              }
            },
            {
              title: {
                1: 'Words we need',
                2: 'Words we need today — and what divides and unites branches',
                3: 'Words we need today — and what divides and unites branches'
              },
              visual: '📖',
              body: {
                1: '- **branch** — a group inside a tradition with its own beliefs or practices.\n- **Vajrayana** — Tibetan Buddhism. The other main branches are Mahayana and Theravada.\n- **umma** — the worldwide community of Muslims.\n- **Ismaili** — a Shia branch led by a living Imam, the Aga Khan.\n- **cantor** — the leader of sung prayer in a synagogue.\n- **Métis Senator** — a respected Elder who guides the Métis Nation of Ontario.\n\n**What divides branches:** leadership, texts, practices, history. **What unites them:** a founder, a shared scripture, shared festivals, shared sacred places, the sense of being one people.',
                2: '| Term | Meaning |\n| branch / denomination | A subgroup within a tradition with distinct beliefs or practices. |\n| Vajrayana / Mahayana / Theravada | The three main Buddhist vehicles: Tibetan tantric Buddhism; the \'great vehicle\' of East Asia; the \'way of the elders\' of Sri Lanka and Southeast Asia. |\n| umma | The worldwide community of Muslims, united by the Qur\'an, the Five Pillars, and the hajj. |\n| Sunni / Shia / Ismaili | The two largest Muslim branches, divided over leadership after Muhammad\'s death (632); Ismailis are a Shia branch led by a living Imam, the Aga Khan. |\n| cantor (hazzan) | The leader of sung prayer in a synagogue, who chants the liturgy and often teaches bar/bat mitzvah students. |\n| Senator (Métis Nation of Ontario) | A respected Elder recognized by the community for knowledge and service, who guides and opens meetings with prayer. |\n\n**What divides branches:** leadership and succession; authority of texts and interpretation; practices (language of worship, roles of women, dress, diet, calendar); history. **What unites them:** a founder and founding story; a shared scripture or core teaching; shared festivals and rites; shared sacred places; the sense of being one people — umma, sangha, the people of Israel, the body of Christ.',
                3: '| Term | Meaning |\n| branch / denomination | A subgroup within a tradition with distinct beliefs or practices. |\n| Vajrayana / Mahayana / Theravada | The three main Buddhist vehicles: Tibetan tantric Buddhism; the \'great vehicle\' of East Asia; the \'way of the elders\' of Sri Lanka and Southeast Asia. |\n| umma | The worldwide community of Muslims, united by the Qur\'an, the Five Pillars, and the hajj. |\n| Sunni / Shia / Ismaili | The two largest Muslim branches, divided over leadership after Muhammad\'s death (632); Ismailis are a Shia branch led by a living Imam, the Aga Khan. |\n| cantor (hazzan) | The leader of sung prayer in a synagogue, who chants the liturgy and often teaches bar/bat mitzvah students. |\n| Senator (Métis Nation of Ontario) | A respected Elder recognized by the community for knowledge and service, who guides and opens meetings with prayer. |\n\n**Pronunciation:** Vajrayana (vaj-ra-YAH-na), Theravada (teh-ra-VAH-da), hazzan (ha-ZAHN). The Métis Senator\'s role is specific to the Métis Nation of Ontario\'s governance; it is not a parliamentary office.\n\n**What divides branches (the test\'s template)**\n\n- Leadership and succession (Sunni/Shia; Catholic/Orthodox over the Pope; Tibetan tulkus)\n- Authority of texts and interpretation (Orthodox/Reform Judaism; Protestant/Catholic)\n- Practices: language of worship, roles of women, dress, diet, calendar (Orthodox Easter May 2 vs Western March 28, 2027)\n- History: a split remembered as betrayal or liberation\n\n**What unites them**\n\n- A founder and founding story (Lesson 2)\n- A shared scripture or core teaching (the Qur\'an; the Dharma; the Torah; the Gospels)\n- Shared festivals and rites, even on different dates\n- Shared sacred places and pilgrimage (Mecca, Bodh Gaya, Jerusalem — Lesson 7)\n- The sense of being one people: umma, sangha, the people of Israel, the body of Christ\n\n**Think about it:** apply this template to a tradition not named here.'
              }
            },
            {
              title: {
                1: 'Real case: one Dalai Lama, four views',
                2: 'Real case: one Dalai Lama, four views',
                3: 'Real case: one Dalai Lama, four views — who is he, depending on who you ask?'
              },
              visual: '🧭',
              body: {
                1: '> To **Tibetan Buddhists (Vajrayana)**, the Dalai Lama is the fourteenth in a line of tulkus. He is an emanation of Avalokiteshvara, the bodhisattva of compassion. For centuries he was the spiritual and political head of Tibet.\n> To **Theravada Buddhists** in Sri Lanka, Thailand, or Myanmar, he is a deeply respected monk and teacher. But Theravada has no system of reincarnate lamas.\n> To **Mahayana Buddhists** in China, Japan, Korea, and Vietnam, he is an honoured teacher from a different school.\n> To **secular society** he is the 1989 Nobel Peace Prize winner and a symbol of nonviolence and of Tibet. To the Chinese government, he is a political separatist.',
                2: '> To Tibetan Buddhists (Vajrayana), the Dalai Lama is the fourteenth in a line of tulkus, an emanation of Avalokiteshvara, the bodhisattva of compassion, and for centuries the spiritual and political head of Tibet.\n> To Theravada Buddhists in Sri Lanka, Thailand, or Myanmar, he is a deeply respected monk and teacher — but Theravada has no system of recognized reincarnate lamas and does not regard him as an emanation of a bodhisattva.\n> To Mahayana Buddhists in China, Japan, Korea, and Vietnam, he is an honoured teacher within a different school; his authority is moral, not institutional.\n> To secular society he is the 1989 Nobel Peace Prize laureate, an author and public figure, a symbol of nonviolence and of Tibet — and to the Chinese government, a political separatist whose succession it claims the right to control.\n\n**The key belief:** the tulku system of recognized reincarnation, specific to Tibetan Buddhism. **What unites the branches:** the Buddha, the Dharma, the Sangha; the Four Noble Truths; monastic ordination; Wesak.',
                3: '> To Tibetan Buddhists (Vajrayana), the Dalai Lama is the fourteenth in a line of tulkus, an emanation of Avalokiteshvara, the bodhisattva of compassion, and for centuries the spiritual and political head of Tibet.\n> To Theravada Buddhists in Sri Lanka, Thailand, or Myanmar, he is a deeply respected monk and teacher — but Theravada has no system of recognized reincarnate lamas and does not regard him as an emanation of a bodhisattva.\n> To Mahayana Buddhists in China, Japan, Korea, and Vietnam, he is an honoured teacher within a different school; his authority is moral, not institutional.\n> To secular society he is the 1989 Nobel Peace Prize laureate, an author and public figure, a symbol of nonviolence and of Tibet — and to the Chinese government, a political separatist whose succession it claims the right to control.\n\n**Think about it**\n\n- Why is the Dalai Lama differently perceived by Vajrayana, Theravada, and Mahayana Buddhists? Name the belief that makes the difference.\n- What unites all three branches\' respect for him?\n- How does the secular view differ from every religious view — and why might it still matter to the tradition?\n\n**From the speaker notes:** the key belief is the tulku system of recognized reincarnation, specific to Tibetan Buddhism. Unifying elements across branches: the Buddha, the Dharma, the Sangha; the Four Noble Truths; monastic ordination; Wesak. Keep the Chinese government\'s position descriptive.'
              }
            },
            {
              title: {
                1: 'The umma, and the roles people play',
                2: 'The umma — and the roles people play',
                3: 'The umma (Sunni, Shia, Ismaili — one community) and the roles people play (C2.2)'
              },
              visual: '👥',
              body: {
                1: '**The umma.** When Muhammad died in 632, Muslims divided over who should lead. Those who accepted Abu Bakr became the **Sunni**. Those who held that leadership belonged to Ali became the **Shia**. **Ismailis** are a Shia branch who follow a living Imam, the Aga Khan.\n\nBut the umma stays one: the same Qur\'an, the same Five Pillars, and the hajj, where all circle the Kaaba together.\n\n**Roles people play**\n\n- **Métis Senators** are respected Elders who advise and open meetings with prayer.\n- **Orthodox laity** answer \'Amen\' to complete the priest\'s prayers.\n- The **cantor** leads sung prayer in the synagogue.',
                2: '**The umma.** When Muhammad died in 632, Muslims divided over who should lead. Those who accepted Abu Bakr, chosen by the community\'s elders, became the Sunni (\'people of the tradition\'), today about 85–90% of Muslims; those who held that leadership belonged to Ali, the Prophet\'s cousin and son-in-law, and his descendants became the Shia (\'party of Ali\'), who follow a line of Imams. Ismailis are a Shia branch who follow a living hereditary Imam, the Aga Khan, with a large community in Canada. Across these branches the umma remains one: the same Qur\'an, the same Five Pillars, the same direction of prayer, and the hajj, where Sunni, Shia, and Ismaili Muslims circle the Kaaba together. Many Muslims describe the umma as a body in which the pain of one part is felt by all.\n\n**Roles people play (C2.2)**\n\n- **Senators in the Métis Nation of Ontario:** respected Elders recognized for knowledge and service; they advise councils, open meetings with prayer, mediate disputes, and carry the community\'s memory — not an elected office.\n- **The laity in Orthodox Christianity:** worship is a dialogue; the people\'s \'Amen\' completes the priest\'s prayers; lay chanters and choirs sing the liturgy; laity serve on parish councils and guard the faith.\n- **The cantor in Jewish Sabbath services:** the hazzan leads sung prayer, chants from the Torah, and often trains bar/bat mitzvah students.\n- **Men, women, boys, and girls:** roles differ and are changing — Catholic and Orthodox priesthood is male while women lead parish life, orders, and schools; Reform and Conservative Judaism ordain women, Orthodox Judaism does not; Sikh women may lead worship; many First Nations give clan mothers decisive authority; children carry specific roles (the youngest at the Seder, altar servers).',
                3: '**The umma.** When Muhammad died in 632, Muslims divided over who should lead. Those who accepted Abu Bakr, chosen by the community\'s elders, became the Sunni (\'people of the tradition\'), today about 85–90% of Muslims; those who held that leadership belonged to Ali, the Prophet\'s cousin and son-in-law, and his descendants became the Shia (\'party of Ali\'), who follow a line of Imams and keep distinctive observances such as the mourning of Ashura. Ismailis are a Shia branch who follow a living hereditary Imam, the Aga Khan — Aga Khan V since February 2025 — and have a large, well-organized community in Canada, including the Aga Khan Museum and Ismaili Centre in Toronto. Across these branches the umma remains one: the same Qur\'an, the same Five Pillars, the same direction of prayer, and the hajj, where Sunni, Shia, and Ismaili Muslims circle the Kaaba together. The Qur\'an speaks of the believers as one community, and many Muslims describe the umma as a body in which the pain of one part is felt by all. (Notes: in Ontario many mosques serve Muslims of both branches; Ismaili jamatkhanas are separate.)\n\n**Roles people play (C2.2)**\n\n- **Senators in the Métis Nation of Ontario:** respected Elders recognized for knowledge and service; they advise councils and the provisional government, open meetings with prayer, mediate disputes, and carry the community\'s memory — an honour and a duty, not an elected office.\n- **The laity in Orthodox Christianity:** Orthodox worship is a dialogue; the people\'s \'Amen\' completes the priest\'s prayers; lay chanters and choirs sing the liturgy; laity serve on parish councils, and in Orthodox teaching the whole body of the faithful, not clergy alone, guards the faith.\n- **The cantor in Jewish Sabbath services:** the hazzan leads the congregation in sung prayer, chants from the Torah, and often trains bar/bat mitzvah students; in many synagogues the cantor, not the rabbi, carries most of the service, and the melodies carry centuries of community memory.\n- **Men, women, boys, and girls:** roles differ and are changing — Catholic and Orthodox priesthood is male while women lead parish life, religious orders, and schools; Reform and Conservative Judaism ordain women, Orthodox Judaism does not and seats men and women separately; Sikh women may lead worship and read the Guru Granth Sahib; many First Nations give clan mothers or grandmothers decisive authority; children carry specific roles (the youngest at the Seder, altar servers, the gurdwara\'s young sewadars).\n\n**Worked example — \'Aren\'t you all the same?\':** \'We share the Qur\'an, the five daily prayers, and the pilgrimage to Mecca, and we call ourselves one umma — one community. We differ over who should have led after the Prophet, and some of our practices differ. Both are true: one community, more than one branch.\''
              }
            },
            {
              title: { 1: 'Check yourself', 2: 'Check for understanding', 3: 'Check for understanding' },
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- Why do Theravada Buddhists see the Dalai Lama differently from Tibetan Buddhists?\n- Name two things that unite all Muslims in the umma.\n\n**Remember:** branches differ, but a founder, a shared scripture, shared festivals, and the sense of being one people hold a tradition together.',
                2: 'Answer in your notes, then compare with a partner.\n\n- Why is the Dalai Lama perceived differently by the three Buddhist branches and by secular society?\n- What divided Sunni and Shia, what distinguishes Ismailis, and what does the umma unite?\n- Describe the roles of Métis Senators, Orthodox laity, and the cantor.\n- Give two things that divide branches of a tradition and two that unite them.\n\n**Exit ticket:** Name one tradition, one way its branches differ, and one thing that unites them.',
                3: 'Answer in your notes, then compare with a partner.\n\n- Why is the Dalai Lama perceived differently by the three Buddhist branches and by secular society?\n- What divided Sunni and Shia, what distinguishes Ismailis, and what does the umma unite?\n- Describe the roles of Métis Senators, Orthodox laity, and the cantor.\n- Give two things that divide branches of a tradition and two that unite them.\n\n**Worked example (model answer):** Vajrayana: a tulku, emanation of Avalokiteshvara, former head of Tibet. Theravada: a respected monk and teacher, but no reincarnate-lama system. Mahayana: an honoured teacher of another school with moral, not institutional, authority. Secular: Nobel laureate (1989), symbol of nonviolence and Tibet; to the Chinese government, a separatist. The difference comes from the tulku belief specific to Tibetan Buddhism. Unity: the Buddha, Dharma, Sangha; the Four Noble Truths; Wesak; monastic ordination.\n\n**Talk it through**\n\n- The umma is described as a body that feels every part\'s pain. Do Canadians have anything like that across their divisions? Should they?\n- Roles by gender are changing in many traditions. Who should decide such changes — the tradition\'s own members, its leaders, or the surrounding society through law?\n\n**Exit ticket:** Name one tradition, one way its branches differ, and one thing that unites them. For your Sacred Place Profile: which branch does your community belong to, and what role (clergy, lay, Elder) will you describe?'
              }
            }
          ]
        },

        // ---- Lesson 5: Strict to Liberal: Degrees of Commitment ----
        {
          title: 'Strict to Liberal: Degrees of Commitment',
          slides: [
            {
              title: {
                1: 'Strict to liberal',
                2: 'Strict to liberal: degrees of commitment',
                3: 'Strict to liberal: degrees of commitment'
              },
              visual: '🛤️',
              body: {
                1: 'A horse and buggy on a Simcoe County road. A plain black car behind it. A Hindu grandmother at her home shrine, and her grandson at a yoga studio.\n\nEvery tradition has people who follow it very closely, and people who follow it more loosely. Both can be sincere.\n\n**We are learning**\n\n- how traditions make room for strict and relaxed members\n- how Old Order Amish differ from Conservative Mennonites\n- why Hindus can show devotion in many ways',
                2: 'A horse and buggy on a Simcoe County road, a plain black car behind it; a Hindu grandmother at her home shrine and her grandson at a yoga studio. How traditions hold the strict and the relaxed in one family.\n\nWithin any tradition you know, what do the \'most observant\' people do that others do not? Every tradition has a spectrum. Today: two Anabaptist neighbours who drew the line in different places, and a tradition — Hinduism — that treats many ways as equally valid.\n\n**Learning goals**\n\n- Demonstrate an understanding of how various world religions and belief traditions accommodate a range of commitment, from strict observance to liberal compromise.\n- Compare Old Order Amish and Conservative Mennonites: shared roots, different lines.\n- Explain why Hindus may express their devotion in a multiplicity of ways, and connect degrees of observance to the accommodation questions of Unit 1.',
                3: 'A horse and buggy on a Simcoe County road, a plain black car behind it; a Hindu grandmother at her home shrine and her grandson at a yoga studio. How traditions hold the strict and the relaxed in one family.\n\nWithin any tradition you know, what do the \'most observant\' people do that others do not? Every tradition has a spectrum. Today: two Anabaptist neighbours who drew the line in different places, and a tradition — Hinduism — that treats many ways as equally valid.\n\n**Expectations: C2.3, C2.4** — C2.3\'s prompts are the Amish/Mennonite comparison and Hindu multiplicity. C2.4 (difficulties with dress, diet, behaviour) is revisited through the Amish case.\n\n**Learning goals**\n\n- Demonstrate an understanding of how various world religions and belief traditions accommodate a range of commitment, from strict observance to liberal compromise.\n- Compare Old Order Amish and Conservative Mennonites: shared roots, different lines.\n- Explain why Hindus may express their devotion in a multiplicity of ways, and connect degrees of observance to the accommodation questions of Unit 1.\n\n**Success criteria — I can…**\n\n- describe a spectrum of observance in at least two traditions with examples at each end\n- explain how Old Order Amish differ from Conservative Mennonites and what they share\n- explain the Hindu idea of many paths with three examples of devotion\n\n**A caution from the course:** \'liberal compromise\' is the curriculum\'s phrase; \'liberal\' does not mean \'less sincere\'. The whole spectrum is treated as sincere, and the curriculum\'s word is \'accommodate\' — the tradition makes room.'
              }
            },
            {
              title: {
                1: 'Words we need',
                2: 'Words we need today — and how traditions make room',
                3: 'Words we need today — and how traditions make room'
              },
              visual: '📖',
              body: {
                1: '- **observance** — how closely a person follows a tradition\'s practices.\n- **Anabaptist** — a Christian movement from the 1500s; Amish and Mennonites are Anabaptists.\n- **Ordnung** — the unwritten rules of an Amish community.\n- **Old Order** — Amish and Mennonite groups that keep horse and buggy and reject most modern technology.\n- **bhakti** — loving devotion to a deity in Hinduism.\n- **liberal** — adapting practice to modern life; **orthodox** means holding closely to long-standing practice.\n\n**Traditions make room** by having separate branches, named categories, levels of vow, and different expectations at different life stages.',
                2: '| Term | Meaning |\n| observance | The degree to which a person follows a tradition\'s practices — strict, moderate, occasional. |\n| Anabaptist | Christian movement from the 1500s Reformation practising adult baptism, pacifism, and separation from the state; Amish and Mennonites are Anabaptists. |\n| Ordnung | The unwritten rules of an Amish community governing dress, technology, and conduct, decided locally. |\n| Old Order | Amish and Mennonite groups that keep horse-and-buggy travel and reject most modern technology. |\n| bhakti | Loving devotion to a deity — one of Hinduism\'s main paths, alongside knowledge, action, and meditation. |\n| orthodox / liberal | Within a tradition: holding to long-standing practice closely / adapting practice to modern life. |\n\n**How traditions make room**\n\n- **Separate branches:** Orthodox, Conservative, Reform; Old Order and Conservative Mennonites — the line becomes a denomination.\n- **Named categories:** Sikhism\'s amritdhari, keshdhari, sahajdhari; Islam\'s \'practising\' and \'non-practising\' as everyday terms.\n- **Levels of vow:** Catholic laity, third orders, and vowed religious; Buddhist laypeople and monks with different precepts.\n- **Minimum and maximum:** Judaism\'s idea that doing one more commandment is good; Islam\'s obligatory (fard) and recommended (sunnah) acts.\n- **Life stages:** Hindu tradition expects more observance in later life.',
                3: '| Term | Meaning |\n| observance | The degree to which a person follows a tradition\'s practices — strict, moderate, occasional. |\n| Anabaptist | Christian movement from the 1500s Reformation practising adult baptism, pacifism, and separation from the state; Amish and Mennonites are Anabaptists. |\n| Ordnung | The unwritten rules of an Amish community governing dress, technology, and conduct, decided locally. |\n| Old Order | Amish and Mennonite groups that keep horse-and-buggy travel and reject most modern technology. |\n| bhakti | Loving devotion to a deity — one of Hinduism\'s main paths, alongside knowledge, action, and meditation. |\n| orthodox / liberal | Within a tradition: holding to long-standing practice closely / adapting practice to modern life (Unit 1). |\n\nOrdnung (ORD-nung) varies by church district; there is no single Amish rulebook. Bhakti connects to Unit 3 (puja, japa).\n\n**How traditions make room**\n\n- **Separate branches:** Orthodox, Conservative, Reform; Old Order and Conservative Mennonites — the line becomes a denomination.\n- **Named categories:** Sikhism\'s amritdhari, keshdhari, sahajdhari; Islam\'s \'practising\' and \'non-practising\' as everyday terms.\n- **Levels of vow:** Catholic laity, third orders, and vowed religious; Buddhist laypeople and monks with different precepts (five for laity, hundreds for monks).\n- **Minimum and maximum:** Judaism\'s idea that doing one more commandment is good; Islam\'s obligatory (fard) and recommended (sunnah) acts.\n- **Life stages:** Hindu tradition expects more observance in later life; many traditions expect more of elders and leaders.\n\n**Unit 1 link (the C2.3–C2.4 bridge):** a tradition\'s spectrum is why the law tests sincerity rather than doctrine (Amselem, 2004). Because the same practice is required for one believer and optional for another, courts cannot ask \'does your religion require this?\' but \'do you sincerely hold this?\''
              }
            },
            {
              title: {
                1: 'Real case: Amish and Mennonites',
                2: 'Real case: Old Order Amish and Conservative Mennonites',
                3: 'Real case: Old Order Amish and Conservative Mennonites — two Anabaptist neighbours in Ontario'
              },
              visual: '🐎',
              body: {
                1: '> Both groups come from the Anabaptists of the 1500s. The Anabaptists believed in adult baptism, refused to fight in wars, and stayed apart from worldly power. The Amish split from the Mennonites in 1693.\n> Ontario\'s oldest Amish settlement, near Milverton, dates to 1824.\n> **Old Order Amish** travel by horse and buggy. They do not connect to the electrical grid. They speak Pennsylvania German at home, dress plainly, worship in homes, and end school at Grade 8.\n> **Conservative Mennonites** also dress plainly and refuse to fight. But they drive cars (often plain or black), use electricity, worship in meetinghouses in English, and run their own schools.\n> Both are sincere. They draw the line between church and world in different places.',
                2: '> Both groups descend from the Anabaptists of the 1500s, who insisted on adult baptism, refusal of military service, and separation from worldly power; the Amish separated from the Mennonites in 1693 under Jakob Ammann over stricter discipline. Ontario\'s oldest Amish settlement, near Milverton, dates to 1824; Old Order Amish also live near Aylmer and elsewhere in southwestern Ontario.\n> Old Order Amish travel by horse and buggy, do not connect to the electrical grid, speak Pennsylvania German at home, dress plainly in prescribed styles, worship in homes, end formal schooling at Grade 8, and practise shunning (Meidung) of baptized members who break the Ordnung.\n> Conservative Mennonites share plain dress (head coverings for women, modest clothing), nonresistance, and a separated life, but drive cars (often plain or black), use electricity and selected technology, worship in meetinghouses in English, run their own schools, and engage in missions and evangelism.\n> Both are sincere; they draw the line between church and world in different places.',
                3: '> Both groups descend from the Anabaptists of the 1500s, who insisted on adult baptism, refusal of military service, and separation from worldly power; the Amish separated from the Mennonites in 1693 under Jakob Ammann over stricter discipline. Ontario\'s oldest Amish settlement, near Milverton, dates to 1824; Old Order Amish also live near Aylmer and elsewhere in southwestern Ontario.\n> Old Order Amish travel by horse and buggy, do not connect to the electrical grid, speak Pennsylvania German at home, dress plainly in prescribed styles, worship in homes, end formal schooling at Grade 8, and practise shunning (Meidung) of baptized members who break the Ordnung.\n> Conservative Mennonites share plain dress (head coverings for women, modest clothing), nonresistance, and a separated life, but drive cars (often plain or black), use electricity and selected technology, worship in meetinghouses in English, run their own schools, and engage in missions and evangelism.\n> Both are sincere; they draw the line between church and world in different places.\n\n**Think about it**\n\n- How do Old Order Amish differ from Conservative Mennonites? List four differences.\n- What do they share, and where does the difference come from?\n- Name two difficulties Old Order Amish may encounter in Canadian society because of their practices, and one accommodation Ontario has made.\n\n**From the speaker notes:** Shared — Anabaptist roots, adult baptism, pacifism, plain dress, community discipline. Differences — technology, transportation, language, worship place, schooling, shunning. Accommodations — buggy signage and road-shoulder provisions exist in Amish areas; the slow-moving-vehicle sign is a familiar example. Photographing Amish people is discouraged by their communities.'
              }
            },
            {
              title: {
                1: 'Many ways to be Hindu',
                2: 'Real case: many ways to be Hindu — and spectrums within traditions',
                3: 'Real case: many ways to be Hindu — and spectrums within traditions'
              },
              visual: '🌊',
              body: {
                1: 'Hinduism has no single founder, creed, or authority. Its texts describe several paths to the divine: devotion (**bhakti**), knowledge, action, and meditation.\n\nA Hindu may keep a home shrine, visit a temple, go on pilgrimage to Varanasi, chant a mantra, follow a guru, practise yoga, fast, or be vegetarian. Or do only a few of these. For many Hindus this is the tradition\'s nature: **many rivers to one ocean**.\n\n**Other traditions have spectrums too.** In Judaism, Orthodox Jews keep full Shabbat and kosher rules, while \'cultural\' Jews keep festivals and food.',
                2: 'Hinduism has no single founder, creed, or authority, and its texts describe several paths to the divine: the path of devotion (bhakti) to a chosen deity; the path of knowledge (jnana) through study and meditation; the path of action (karma yoga) through duty done without attachment; and the path of discipline (raja yoga) through meditation. A Hindu may keep a home shrine with daily puja, attend a temple weekly or only at festivals, go on pilgrimage to Varanasi, chant a mantra on beads, follow a guru, practise yoga, fast on Ekadashi, keep strict vegetarianism — or do a few of these, or almost none, while still identifying as Hindu. The Bhagavad Gita presents Krishna accepting worship offered in any form with sincerity. For many Hindus, this plurality is the tradition\'s nature: many rivers to one ocean.\n\n**Spectrums within traditions**\n\n| Tradition | Strict observance | Moderate and liberal observance |\n| Judaism | Haredi and Modern Orthodox — full Shabbat and kosher observance | Conservative and Reform; \'cultural\' Jews who keep festivals and food |\n| Islam | five daily prayers, full Ramadan fast, hijab or beard | Friday prayer and Ramadan; dress varies |\n| Sikhism | initiated (amritdhari) Khalsa with the Five Ks | keshdhari (uncut hair, not initiated) and sahajdhari (cut hair) Sikhs |',
                3: 'Hinduism has no single founder, creed, or authority, and its texts describe several paths to the divine: the path of devotion (bhakti) to a chosen deity; the path of knowledge (jnana) through study and meditation; the path of action (karma yoga) through duty done without attachment; and the path of discipline (raja yoga) through meditation. A Hindu may keep a home shrine with daily puja, attend a temple weekly or only at festivals, go on pilgrimage to Varanasi, chant a mantra on beads, follow a guru, practise yoga, fast on Ekadashi, keep strict vegetarianism — or do a few of these, or almost none, while still identifying as Hindu. The Bhagavad Gita presents Krishna accepting worship offered in any form with sincerity. Regional traditions, family deities, and caste and community customs add more variety. For many Hindus, this plurality is not a weakness but the tradition\'s nature: many rivers to one ocean.\n\n**Worked example — why Hindus may express devotion in a multiplicity of ways:** no central authority; multiple scriptural paths; the Gita\'s acceptance of sincere worship in any form; regional and family variety; the \'many paths\' view itself.\n\n**Spectrums within traditions**\n\n| Tradition | Strict observance | Moderate and liberal observance |\n| Judaism | Haredi and Modern Orthodox — full Shabbat and kosher observance, daily prayer, gender-separate seating | Conservative and Reform — selective observance, egalitarian worship; \'cultural\' Jews who keep festivals and food |\n| Islam | five daily prayers, full Ramadan fast, hijab or beard, no alcohol | Friday prayer and Ramadan, fewer daily prayers; dress varies |\n| Christianity | daily Mass or prayer, Friday abstinence, religious orders, Old Order Amish | weekly or holiday attendance; \'cultural Catholics\' who keep baptism, weddings, Christmas |\n| Sikhism | initiated (amritdhari) Khalsa with the Five Ks and Nitnem | keshdhari (uncut hair, not initiated) and sahajdhari (cut hair) Sikhs |\n| Hinduism | daily puja, strict vegetarianism, fasts, pilgrimage, a guru | festivals and family rites without daily practice |\n\n**Think about it**\n\n- Compare with the Amish: one tradition holds a tight line, the other many lines. Which is harder to keep alive in a secular society, and why? (Notes: a tight line is visible and demanding, while plurality absorbs change but can blur identity — both are strategies.)\n- Where does \'liberal compromise\' end and leaving the tradition begin, in a tradition with no single rule?\n\nDo not treat the right column as \'less Muslim\' or \'less Jewish\': the tradition makes room.'
              }
            },
            {
              title: { 1: 'Check yourself', 2: 'Check for understanding', 3: 'Check for understanding' },
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- Name two ways Old Order Amish differ from Conservative Mennonites.\n- Name two ways a Hindu might show devotion.\n\n**Remember:** both strict and relaxed members can be sincere. The tradition makes room for both.',
                2: 'Answer in your notes, then compare with a partner.\n\n- How do Old Order Amish differ from Conservative Mennonites? What do they share?\n- Why may Hindus express devotion in a multiplicity of ways?\n- Give a strict and a liberal example of observance in two traditions.\n- Name two ways traditions make room for a range of commitment.\n\n**Talk it through:** Is a \'cultural\' member of a tradition — festivals and food, no belief — still a member? Who decides: the person, the community, or the tradition\'s rules?\n\n**Exit ticket:** Write one tradition, one strict practice, and one liberal practice, and name how the tradition accommodates both.',
                3: 'Answer in your notes, then compare with a partner.\n\n- How do Old Order Amish differ from Conservative Mennonites? What do they share?\n- Why may Hindus express devotion in a multiplicity of ways?\n- Give a strict and a liberal example of observance in two traditions.\n- Name two ways traditions make room for a range of commitment.\n\n**Worked example (model answer):** Differences — horse and buggy vs cars; no grid electricity vs electricity and selected technology; Pennsylvania German vs English worship; worship in homes vs meetinghouses; schooling to Grade 8 vs own schools; shunning vs less formal discipline; no evangelism vs missions. Shared — Anabaptist roots, adult baptism, pacifism/nonresistance, plain dress, separation from the world, community discipline.\n\n**Talk it through**\n\n- The Amish keep their community by limiting technology; most traditions in Canada have not. Fifty years from now, which strategy will have kept more of its young people? Why?\n- Is a \'cultural\' member of a tradition — festivals and food, no belief — still a member? Who decides: the person, the community, or the tradition\'s rules?\n- Hinduism says many rivers lead to one ocean. Would that view make interfaith life in Canada easier if more traditions held it, or does it only work from inside Hinduism?\n\n**Exit ticket:** Write one tradition, one strict practice, and one liberal practice, and name how the tradition accommodates both. For your Sacred Place Profile: where on its tradition\'s spectrum does your community sit, and how does the place show it (dress expectations, language of worship, who leads)?'
              }
            }
          ]
        },

        // ---- Lesson 6: Sacred Place: Houses of Worship and Sacred Land ----
        {
          title: 'Sacred Place: Houses of Worship and Sacred Land',
          slides: [
            {
              title: {
                1: 'Reading a sacred space',
                2: 'Sacred place: houses of worship and sacred land',
                3: 'Sacred place: houses of worship and sacred land — reading a space the way its community does'
              },
              visual: '🏛️',
              body: {
                1: 'Why does a Catholic church have statues, while a Reformed church has bare walls? Why does the synagogue\'s Ark face one direction? Why do you take your shoes off here and cover your head there?\n\nA worship space is like an argument made of stone and cloth. Today we learn to read it.\n\n**We are learning**\n\n- the main features of different places of worship\n- how beliefs about place shape what people do\n- how to read a space: centre, direction, threshold, seating, walls',
                2: 'Why a Catholic church has statues and a Reformed church has bare walls; why the synagogue\'s Ark faces one direction; why you take your shoes off here and cover your head there. Reading a space the way its community does.\n\nDescribe the inside of any place of worship you have entered — what was at the front, where people sat, what they did on entering. Spaces are arguments in stone and cloth: today we learn to read them.\n\n**Learning goals**\n\n- Describe the main features of the places of worship of various traditions.\n- Explain ways in which the attitudes and actions of believers are shaped by convictions about the significance of place.\n- Read a worship space: what is at the centre, how people face, what they do on entering, and what that says about belief.',
                3: 'Why a Catholic church has statues and a Reformed church has bare walls; why the synagogue\'s Ark faces one direction; why you take your shoes off here and cover your head there. Reading a space the way its community does.\n\nDescribe the inside of any place of worship you have entered — what was at the front, where people sat, what they did on entering. Spaces are arguments in stone and cloth: today we learn to read them.\n\n**Expectations: F2.1, F2.2** — F2.1\'s prompts: Catholic vs Orthodox vs Calvinist interiors; the sweat lodge; prayer wheels. F2.2\'s: Turtle Island, the Western Wall, the Ganges; the Ark facing Jerusalem; expressions of reverence; Indigenous attitudes to the earth; the Guru Granth Sahib\'s position.\n\n**Learning goals**\n\n- Describe the main features of the places of worship of various traditions.\n- Explain ways in which the attitudes and actions of believers are shaped by convictions about the significance of place.\n- Read a worship space: what is at the centre, how people face, what they do on entering, and what that says about belief.\n\n**Success criteria — I can…**\n\n- describe the interiors of a Catholic, an Orthodox, and a Reformed church and explain the differences\n- explain how the sweat lodge\'s construction and Buddhist prayer wheels reflect beliefs\n- explain why the Ark faces Jerusalem and how the Guru Granth Sahib\'s position reflects Sikh beliefs about place\n- explain why Turtle Island, the Western Wall, and the Ganges shape attitudes and actions\n\n**Method:** describe first (what is there), then explain (what the community believes that makes it so). The explanation is the mark-earner.'
              }
            },
            {
              title: {
                1: 'Words we need',
                2: 'Words we need today — and how to read any sacred space',
                3: 'Words we need today — and how to read any sacred space'
              },
              visual: '📖',
              body: {
                1: '- **sanctuary** — the holiest area of a worship space.\n- **iconostasis** — the screen of icons in an Orthodox church that separates the sanctuary from the nave.\n- **Ark** — the cabinet in a synagogue that holds the Torah scrolls.\n- **Guru Granth Sahib** — the Sikh scripture, honoured as the living Guru.\n- **sweat lodge** — a covered dome of saplings used for purification ceremonies.\n- **prayer wheel** — a cylinder with a mantra inside; spinning it counts as saying the prayers.\n\n**To read a space, ask:** centre, direction, threshold, seating, walls.',
                2: '| Term | Meaning |\n| sanctuary / altar | The holiest area of a worship space; in churches, the altar table where the Eucharist is celebrated. |\n| iconostasis | In Orthodox churches, the screen of icons with doors separating the sanctuary from the nave. |\n| Ark (Aron Kodesh) | The cabinet in a synagogue holding the Torah scrolls, placed on the wall facing Jerusalem. |\n| Guru Granth Sahib | The Sikh scripture, honoured as the living Guru and installed on a raised throne in the gurdwara. |\n| sweat lodge | A dome of bent saplings covered to hold heat, in which many First Nations hold purification ceremonies with heated stones. |\n| prayer wheel | A cylinder inscribed with a mantra and containing written prayers; spinning it is understood as reciting them. |\n\n**Reading any sacred space**\n\n- **Centre:** an altar, an Ark, a throne for a book, a pulpit, a fire, an empty niche (the mihrab) — what the community faces is what it believes is most present.\n- **Direction:** Jerusalem, Mecca, the rising sun — direction turns a room into a map of the sacred world.\n- **Threshold:** shoes, head, hands, bowing, silence, holy water — where reverence is taught.\n- **Seating:** floor or pews; separate or mixed; a screen or an open sanctuary.\n- **Walls:** icons, statues, calligraphy, nothing — the tradition\'s view of images and words.',
                3: '| Term | Meaning |\n| sanctuary / altar | The holiest area of a worship space; in churches, the altar table where the Eucharist is celebrated. |\n| iconostasis | In Orthodox churches, the screen of icons with doors separating the sanctuary from the nave. |\n| Ark (Aron Kodesh) | The cabinet in a synagogue holding the Torah scrolls, placed on the wall facing Jerusalem. |\n| Guru Granth Sahib | The Sikh scripture, honoured as the living Guru and installed on a raised throne in the gurdwara. |\n| sweat lodge | A dome of bent saplings covered to hold heat, in which many First Nations hold purification ceremonies with heated stones. |\n| prayer wheel | A cylinder inscribed with a mantra and containing written prayers; spinning it is understood as reciting them. |\n\n**Pronunciations:** iconostasis (eye-kon-oh-STAH-sis), Aron Kodesh (ah-ROHN KO-desh), gurdwara (gur-DWAH-ra). \'Sanctuary\' is used loosely in English for the whole worship hall; in this course it means the holiest area.\n\n**Reading any sacred space (the assessment method for F2.1–F2.2 and the assignment)**\n\n- **What is at the centre or front?** An altar, an Ark, a throne for a book, a pulpit, a fire, an empty niche (the mihrab) — the thing the community faces is the thing it believes is most present.\n- **Which way does it face?** Jerusalem, Mecca, the east and the rising sun — direction turns a room into a map of the sacred world.\n- **What do people do on entering?** Shoes, head, hands, bowing, silence, holy water — the threshold is where reverence is taught.\n- **Where do people sit or stand, and who may go where?** Floor or pews; separate or mixed; a screen or an open sanctuary — the layout is a diagram of the community\'s roles (Lesson 4).\n- **What is on the walls?** Icons, statues, calligraphy, nothing — the tradition\'s view of images and words.\n\n**Method:** describe first (what is there), then explain (what the community believes that makes it so). Practise on one space the class has seen — a school chapel\'s altar, tabernacle, and crucifix can be read this way.\n\n**Think about it:** in a gurdwara everyone sits on the floor below the Guru; in many churches the priest stands above the people. What does the height of things teach?'
              }
            },
            {
              title: {
                1: 'Real case: inside a gurdwara',
                2: 'Real case: inside a gurdwara',
                3: 'Real case: inside a gurdwara — where the Guru sits, and where everyone else does'
              },
              visual: '🚪',
              body: {
                1: '> In a Sikh gurdwara, the Guru Granth Sahib sits on a raised platform under a canopy, wrapped in rich cloths. An attendant waves a whisk over it, as a sign of royalty.\n> Worshippers take off their shoes, wash, and cover their heads. They walk to the front, kneel, and touch their foreheads to the floor before the Guru.\n> Then everyone sits on the carpeted floor, lower than the Guru. There are no reserved seats. Rich and poor sit together. Nobody turns their back on the Guru Granth Sahib.\n> At the end, everyone eats together in the langar, served by volunteers. At night the Guru Granth Sahib is carried to a separate room to rest.\n> Four doors in a traditional gurdwara mean welcome from every direction.',
                2: '> In a Sikh gurdwara, the Guru Granth Sahib is installed on a raised platform (takht) under a canopy (chanani), wrapped in rich cloths, with an attendant waving a chauri (a whisk) over it as a mark of royalty.\n> Worshippers remove their shoes, wash, cover their heads, and on entering walk to the front, kneel, and touch their foreheads to the floor (matha tek) before the Guru, often leaving an offering. Everyone then sits on the carpeted floor, lower than the Guru, with no reserved seats — men and women on either side, rich and poor together. Nobody turns their back on the Guru Granth Sahib.\n> At the end of the service all eat together in the langar, seated in rows on the floor, served by volunteers of every status. At night the Guru Granth Sahib is carried in procession to a separate room to rest. Four doors in a traditional gurdwara signal welcome from every direction.',
                3: '> In a Sikh gurdwara, the Guru Granth Sahib is installed on a raised platform (takht) under a canopy (chanani), wrapped in rich cloths, with an attendant waving a chauri (a whisk) over it as a mark of royalty.\n> Worshippers remove their shoes, wash, cover their heads, and on entering walk to the front, kneel, and touch their foreheads to the floor (matha tek) before the Guru, often leaving an offering. Everyone then sits on the carpeted floor, lower than the Guru, with no reserved seats — men and women on either side, rich and poor together. Nobody turns their back on the Guru Granth Sahib.\n> At the end of the service all eat together in the langar, seated in rows on the floor, served by volunteers of every status. At night the Guru Granth Sahib is carried in procession to a separate room to rest. Four doors in a traditional gurdwara signal welcome from every direction.\n\n**Think about it**\n\n- How does the positioning of the Guru Granth Sahib in relation to the congregation reflect attitudes about the significance of place?\n- List the ways reverence is expressed on entering. Which are shared with other traditions\' places (mosques, temples, synagogues)?\n- What do the floor seating and the langar say about Sikh belief? How does the building teach it without words?\n\n**From the speaker notes:** the scripture is sovereign — treated as a living Guru with a throne, canopy, and attendant — and the congregation is equal before it; the space is sacred because the Guru is present, which is why the Guru Granth Sahib is moved to rest at night. Shared reverence practices: shoes off (mosques, Hindu and Buddhist temples), head covered (synagogue for men, mosques for women), washing (wudu), bowing or prostration, silence.'
              }
            },
            {
              title: {
                1: 'Three churches, a lodge, a wheel',
                2: 'Three Christian interiors, a sweat lodge, and a prayer wheel',
                3: 'Three Christian interiors, three theologies — and a sweat lodge and a prayer wheel'
              },
              visual: '🕯️',
              body: {
                1: '| Church | What you see | What it says |\n| Roman Catholic | altar with tabernacle, crucifix, statues of saints | God is present in the sacrament |\n| Eastern Orthodox | an iconostasis of icons hides the altar; icons cover the walls | heaven and earth meet in the liturgy |\n| Reformed | plain white walls, no images, a central pulpit | God is known through the Word preached |\n\n**The sweat lodge** is a low dome of saplings covered to hold heat. Heated stones, called grandfathers, go in a pit at the centre. It is understood as the womb of Mother Earth.\n\n**Prayer wheels** hold a written mantra. Each clockwise turn counts as saying the prayers, even for people who cannot read.',
                2: '| Interior | Features | What the space says |\n| Roman Catholic | Altar at the centre with the tabernacle (reserved Eucharist) and a sanctuary lamp; a crucifix; statues of Mary and saints; stations of the cross; a baptismal font; stained glass; pews facing the altar | God is present in the sacrament; the saints are company; the senses lead to prayer |\n| Eastern Orthodox | An iconostasis of icons with royal doors hides the altar; icons cover walls and dome (Christ Pantocrator above); candles, incense, chant; traditionally no pews — worshippers stand and move | Heaven and earth meet in the liturgy; icons are windows to the holy; worship is for the whole body |\n| Calvinist / Reformed | Plain white walls, clear glass, no images or statues; a central raised pulpit with an open Bible; a simple communion table; pews facing the pulpit | God is known through the Word preached; images distract or deceive; the congregation gathers to hear |\n\n**The sweat lodge (many First Nations):** a low dome of bent saplings covered with blankets or hides to hold heat and darkness. A pit at the centre receives stones heated in a sacred fire outside — the grandfathers; water poured on them makes steam. The low door faces east; participants enter crawling, humbled; four rounds of prayer, song, and teaching follow. The lodge is understood as the womb of Mother Earth — creation itself is sacred and people are reborn clean from it.\n\n**Prayer wheels (Tibetan Buddhism):** cylinders inscribed with the mantra Om mani padme hum, holding the mantra printed thousands of times; turned clockwise along temple walls or in the hand. Each turn is understood as reciting the prayers inside — sending compassion and accumulating merit — so that practice is possible for everyone, including those who cannot read.',
                3: '| Interior | Features | What the space says |\n| Roman Catholic | Altar at the centre with the tabernacle (reserved Eucharist) and a sanctuary lamp; a crucifix; statues of Mary and saints; stations of the cross on the walls; a baptismal font; stained glass; pews facing the altar | God is present in the sacrament; the saints are company; the senses lead to prayer |\n| Eastern Orthodox | An iconostasis of icons with royal doors hides the altar; icons cover walls and dome (Christ Pantocrator above); candles, incense, chant; traditionally no pews — worshippers stand and move | Heaven and earth meet in the liturgy; icons are windows to the holy; worship is for the whole body |\n| Calvinist / Reformed | Plain white walls, clear glass, no images or statues; a central raised pulpit with an open Bible; a simple communion table; pews facing the pulpit | God is known through the Word preached; images distract or deceive; the congregation gathers to hear |\n\nThe Reformation (1517) produced the Reformed interior deliberately: images removed as idolatry. Many Catholic churches after Vatican II (Lesson 3) simplified. Each interior is a theology you can stand in.\n\n**The sweat lodge (many First Nations):** a low dome of bent willow or other saplings — often sixteen — tied in a framework, covered with blankets or hides to hold heat and darkness. A pit at the centre receives stones heated in a sacred fire outside; the stones are called grandfathers; water poured on them makes steam. The low door faces east (or the direction the nation teaches); participants enter crawling, humbled; four rounds of prayer, song, and teaching follow. The lodge is understood as the womb of Mother Earth; the structure\'s materials and shape reflect the belief that creation itself is sacred and that people are reborn clean from it. The sweat lodge is a ceremony with protocols; this course describes it from published Indigenous sources only and does not replicate it. Details vary by nation.\n\n**Prayer wheels (Tibetan Buddhism):** cylinders of metal or wood inscribed with the mantra Om mani padme hum, holding tightly rolled paper printed with the mantra thousands of times; set in rows along temple walls and around stupas, or held in the hand; turned clockwise as one walks. Each turn is understood as reciting the prayers inside — sending compassion into the world and accumulating merit. They reflect beliefs that sacred speech has power, that merit can be generated and shared, and that practice should be possible for everyone, including those who cannot read.\n\n**Think about it:** Reformed churches removed every image; Orthodox churches cover every wall with them. Both claim to honour God. What does each fear, and what does each trust?'
              }
            },
            {
              title: {
                1: 'Sacred land, sacred direction',
                2: 'Sacred land, sacred direction — and check for understanding',
                3: 'Sacred land, sacred direction — and check for understanding'
              },
              visual: '🌍',
              body: {
                1: '**Turtle Island.** In the Haudenosaunee creation story, the land grows on the turtle\'s back. North America itself is sacred and alive. Humans are relatives of the land, not its owners.\n\n**The Western Wall.** The last wall of the Temple in Jerusalem, destroyed in 70 CE. Jews pray facing it and press written prayers into its cracks. Every synagogue\'s Ark faces Jerusalem.\n\n**The Ganges.** Hindus see the river as the goddess Ganga. Bathing in it purifies. Ashes placed in it carry the dead toward release.\n\n**Check yourself:** Why does the Ark face Jerusalem? Name two ways people show reverence when entering a sacred place.',
                2: '**Turtle Island (Haudenosaunee and many nations).** In the creation story, the land grows on the turtle\'s back; North America itself is sacred and alive. The conviction shapes action: humans are relatives of the land, responsible to it for seven generations; land is not a commodity — which is why land loss and protection of sites are spiritual, not only political, matters.\n\n**The Western Wall (Judaism).** The surviving retaining wall of the Temple Mount from Herod\'s Second Temple, destroyed in 70 CE. Jews pray facing it, press written prayers into its cracks, and gather there on holy days; every synagogue\'s Ark faces Jerusalem so that prayer everywhere is oriented to the Temple\'s site — place remembered in direction.\n\n**The Ganges (Hinduism).** The river is the goddess Ganga, descended from heaven; bathing in it purifies, and ashes immersed in it carry the dead toward release. Millions travel to Varanasi and to the Kumbh Mela; Hindus in Ontario immerse ashes in Canadian rivers.\n\n**Check for understanding**\n\n- Give two features each of Catholic, Orthodox, and Reformed interiors and what each says about belief.\n- How does the sweat lodge\'s construction reflect beliefs about the natural world? Why are prayer wheels built into temples?\n- Why does the Ark face Jerusalem? How does the Guru Granth Sahib\'s position reflect Sikh beliefs?\n- Name three ways people express reverence on entering sacred places.',
                3: '**Turtle Island (Haudenosaunee and many nations).** In the creation story, the land grows on the turtle\'s back; North America itself is sacred and alive. The conviction shapes action: humans are relatives of the land, responsible to it for seven generations; land is not a commodity — which is why land loss (Lesson 1) and protection of sites (Lesson 7) are spiritual, not only political, matters. Indigenous attitudes to the environment reflect the larger tradition: relationship, not ownership; the land as relative.\n\n**The Western Wall (Judaism).** The surviving retaining wall of the Temple Mount from Herod\'s Second Temple, destroyed in 70 CE. Jews pray facing it, press written prayers into its cracks, and gather there on holy days; every synagogue\'s Ark faces Jerusalem so that prayer everywhere is oriented to the Temple\'s site — place remembered in direction. The Ark holds the Torah as the Temple held the tablets. Muslims similarly face the Kaaba (qibla) in every mosque — the mihrab marks the direction.\n\n**The Ganges (Hinduism).** The river is the goddess Ganga, descended from heaven; bathing in it purifies, and ashes immersed in it carry the dead toward release. Millions travel to Varanasi and to the Kumbh Mela; the conviction shapes daily action at ghats across northern India and the practice of Hindus in Ontario who immerse ashes in Canadian rivers.\n\n**Worked example (model answer):** The Ark holds the Torah as the Temple held the tablets, and prayer everywhere is oriented toward the Temple\'s site at Jerusalem (the Western Wall) — place remembered in direction. The Guru Granth Sahib sits on a raised throne under a canopy with an attendant, while all worshippers sit below on the floor and bow to it: the scripture is the living, sovereign Guru, the space is sacred because the Guru is present, and all people are equal before it.\n\n**Check for understanding**\n\n- Give two features each of Catholic, Orthodox, and Reformed interiors and what each says about belief.\n- How does the sweat lodge\'s construction reflect beliefs about the natural world? Why are prayer wheels built into temples?\n- Why does the Ark face Jerusalem? How does the Guru Granth Sahib\'s position reflect Sikh beliefs?\n- Name three ways people express reverence on entering sacred places.\n\n**Talk it through:** If the land itself is sacred (Turtle Island), can any development be neutral? How should a province that holds this view alongside others decide what to build?'
              }
            }
          ]
        },

        // ---- Lesson 7: Place, Memory, and Pilgrimage ----
        {
          title: 'Place, Memory, and Pilgrimage',
          slides: [
            {
              title: {
                1: 'Place, memory, and pilgrimage',
                2: 'Place, memory, and pilgrimage',
                3: 'Place, memory, and pilgrimage — the final content lesson'
              },
              visual: '🗿',
              body: {
                1: 'A stone column in every Canadian town. A battlefield that could not become a runway. A park that was a burial ground. Three cities that draw millions. And a journey with no destination at all.\n\nPlace carries memory. Where is your town\'s cenotaph? Have you stood at it on November 11?\n\n**We are learning**\n\n- why remembering happens at particular places\n- where pilgrims go, and what the hajj is\n- why a vision quest has no fixed place',
                2: 'A stone column in every Canadian town; a battlefield that could not become a runway; a park that was a burial ground; three cities that draw millions; and a journey with no destination at all.\n\nWhere is your town\'s cenotaph, and have you stood at it on November 11? Place carries memory; today we see how, from a cenotaph to a pilgrimage city, and we end by looking back at the whole course.\n\n**Learning goals**\n\n- Identify the relationship between place and common celebrations and commemorations, such as cenotaphs on Remembrance Day.\n- Identify sacred places that are destinations for pilgrims and explain the difference between a pilgrimage and other kinds of spiritual journey.\n- Reflect on and evaluate the research, inquiry, and communication skills you have built across the course.',
                3: 'A stone column in every Canadian town; a battlefield that could not become a runway; a park that was a burial ground; three cities that draw millions; and a journey with no destination at all.\n\nWhere is your town\'s cenotaph, and have you stood at it on November 11? Place carries memory; today we see how, from a cenotaph to a pilgrimage city, and we end by looking back at the whole course.\n\n**Expectations: F2.3, F2.4, A4.4** — F2.3\'s prompts: the Somme airport and Ipperwash; F2.4\'s: Jerusalem, Varanasi, and the vision quest. A4.4 is assessed in the assignment\'s reflection and in the exam review.\n\n**Learning goals**\n\n- Identify the relationship between place and common celebrations and commemorations, such as cenotaphs on Remembrance Day.\n- Identify sacred places that are destinations for pilgrims and explain the difference between a pilgrimage and other kinds of spiritual journey.\n- Reflect on and evaluate the research, inquiry, and communication skills you have built across the course.\n\n**Success criteria — I can…**\n\n- explain why commemorations happen at particular places, using the cenotaph, the Somme, and Ipperwash\n- describe Jerusalem, Mecca, and Varanasi as pilgrimage destinations and explain the hajj\n- explain why a vision quest has no fixed place and how it differs from a pilgrimage\n- evaluate my own research process and name one question that remains\n\n**A note on the Ipperwash case:** it involves a death and is part of Ontario\'s own history; the course presents it factually, with the burial ground as the connection to the expectation.'
              }
            },
            {
              title: {
                1: 'Words we need, and the cenotaph',
                2: 'Words we need today — and place and commemoration: the cenotaph',
                3: 'Words we need today — and place and commemoration: the cenotaph (F2.3)'
              },
              visual: '📖',
              body: {
                1: '- **cenotaph** — a monument to the dead who are buried elsewhere.\n- **pilgrimage** — a sacred journey to a place.\n- **hajj** — the pilgrimage to Mecca that every able Muslim makes once.\n- **vision quest** — a young person\'s solitary fast on the land, guided by an Elder.\n- **burial ground** — a place where ancestors are buried.\n- **reflection** — looking back at your own work to judge what worked.\n\n**The cenotaph.** Nearly every Canadian town has one. On November 11, people gather at it at 11 a.m. for two minutes of silence. The dead lie far away; the cenotaph brings them home.',
                2: '| Term | Meaning |\n| cenotaph | An \'empty tomb\': a monument to the dead whose bodies lie elsewhere; the focus of Remembrance Day in most Canadian towns. |\n| pilgrimage | A sacred journey to a place for religious or spiritual purposes (curriculum glossary). |\n| hajj | The pilgrimage to Mecca required once in a lifetime of every Muslim who is able — the fifth pillar of Islam. |\n| vision quest | In many First Nations, a young person\'s solitary fast on the land, guided by an Elder, seeking a vision, a name, or direction. |\n| burial ground | A place where ancestors are buried; sacred to the community and protected by law and custom. |\n| reflection (A4.4) | Looking back at one\'s own research, inquiry, and communication to judge what worked and what to improve. |\n\n**Place and commemoration: the cenotaph**\n\n- Nearly every Canadian town has a cenotaph, most raised after the First World War, often listing local names; Remembrance Day happens AT it — wreaths, the two minutes of silence at 11 a.m., the Last Post, a parade.\n- The dead lie in Europe or at sea; the cenotaph brings them home to the place they left. The town\'s memory has an address.\n- Place makes commemoration public and repeatable: the same stone, the same hour, every year — ritual needs a \'where\' as much as a \'when\'.\n- Civic and religious commemoration meet here: hymns and prayers at a public monument.\n\n**Why do commemorations need a place?** Because memory shared by a community must be somewhere everyone can go.',
                3: '| Term | Meaning |\n| cenotaph | An \'empty tomb\': a monument to the dead whose bodies lie elsewhere; the focus of Remembrance Day in most Canadian towns. |\n| pilgrimage | A sacred journey to a place for religious or spiritual purposes (curriculum glossary). |\n| hajj | The pilgrimage to Mecca required once in a lifetime of every Muslim who is able — the fifth pillar of Islam. |\n| vision quest | In many First Nations, a young person\'s solitary fast on the land, guided by an Elder, seeking a vision, a name, or direction. |\n| burial ground | A place where ancestors are buried; sacred to the community and protected by law and custom. |\n| reflection (A4.4) | Looking back at one\'s own research, inquiry, and communication to judge what worked and what to improve. |\n\n\'Cenotaph\' comes from Greek kenos (empty) and taphos (tomb); Ottawa\'s National War Memorial (1939) and the Tomb of the Unknown Soldier (2000) are the national examples.\n\n**Place and commemoration: the cenotaph**\n\n- Nearly every Canadian town has a cenotaph, most raised after the First World War, often listing local names; Remembrance Day happens AT it — wreaths, the two minutes of silence at 11 a.m., the Last Post, a parade.\n- The dead lie in Europe or at sea; the cenotaph brings them home to the place they left. The town\'s memory has an address.\n- Place makes commemoration public and repeatable: the same stone, the same hour, every year — ritual needs a \'where\' as much as a \'when\' (Unit 3).\n- Civic and religious commemoration meet here (Unit 1): hymns and prayers at a public monument.\n- The same logic appears in the Western Wall, the Woodland Cultural Centre, a roadside cross, a bench with a plaque.\n\n**Curriculum question — why do commemorations need a place?** Because memory shared by a community must be somewhere everyone can go.\n\n**Think about it:** what is written on your local cenotaph, and is any name a family name?'
              }
            },
            {
              title: {
                1: 'Real cases: the Somme and Ipperwash',
                2: 'Real cases: the Somme airport that was never built, and Ipperwash',
                3: 'Real cases: the Somme airport that was never built, and Ipperwash — burial places as sacred ground'
              },
              visual: '🕯️',
              body: {
                1: '> **The Somme.** The Somme, in northern France, was the site of one of the bloodiest battles of the First World War, in 1916. Canadian and Newfoundland soldiers fought there. The fields hold hundreds of cemeteries and the remains of soldiers never found.\n> Between 2001 and 2003, the French government studied building an airport on the battlefield. Veterans\' groups protested that the land was sacred to the memory of the dead. The plan was dropped in 2003.\n> **Ipperwash.** In 1942 the Canadian government took the Stoney Point reserve to build a military camp. It promised to give the land back after the war. It did not.\n> Next to the camp, Ipperwash Provincial Park held an old burial ground. In September 1995, community members occupied the park to protect it. On the night of September 6, police moved in. An officer shot and killed Dudley George, an unarmed protester.\n> The Ipperwash Inquiry (2007) confirmed the burial ground and said the police and both governments bore responsibility. The park land was returned to the First Nation.',
                2: '> **The Somme.** The Somme, in northern France, was the site of one of the First World War\'s bloodiest battles in 1916; Canadian and Newfoundland soldiers fought there (the Newfoundland Regiment was nearly wiped out at Beaumont-Hamel on July 1, 1916). The fields hold hundreds of cemeteries and the remains of soldiers never found. Between 2001 and 2003, the French government studied building a third Paris airport near Chaulnes, on the Somme battlefield; the plan would have disturbed cemeteries and the ground where soldiers still lie. Veterans\' organizations in Britain, Canada, and Australia, the Commonwealth War Graves Commission, and local residents protested that the land was sacred to the memory of the dead; the project was dropped in 2003. The battlefield remains a place of pilgrimage — the Thiepval memorial, the Vimy Ridge memorial farther north — visited by Canadian students every year.\n> **Ipperwash.** In 1942 the federal government took the Stoney Point reserve on Lake Huron under the War Measures Act to build a military camp, moving the families and promising the land back after the war. It was not returned. Beside the camp, Ipperwash Provincial Park (created 1936) contained an old burial ground that the Kettle and Stony Point people had asked to be protected since 1937. In September 1995, members of the community occupied the park to assert their claim and protect the burial ground. On the night of September 6, Ontario Provincial Police moved in; an officer shot and killed Dudley George, an unarmed protester. The Ipperwash Inquiry, reporting in 2007, found that the OPP, the provincial government, and the federal government all bore responsibility, confirmed the burial ground, and called the 1942 taking \'unprecedented\'. Ontario returned the park land to the First Nation, and in 2015 the federal government agreed to return Camp Ipperwash with a settlement. The park land is now held by the Chippewas of Kettle and Stony Point.',
                3: '> **The Somme.** The Somme, in northern France, was the site of one of the First World War\'s bloodiest battles in 1916; Canadian and Newfoundland soldiers fought there (the Newfoundland Regiment was nearly wiped out at Beaumont-Hamel on July 1, 1916). The fields hold hundreds of cemeteries and the remains of soldiers never found. Between 2001 and 2003, the French government studied building a third Paris airport near Chaulnes, on the Somme battlefield; the plan would have disturbed cemeteries and the ground where soldiers still lie. Veterans\' organizations in Britain, Canada, and Australia, the Commonwealth War Graves Commission, and local residents protested that the land was sacred to the memory of the dead; the project was dropped in 2003. The battlefield remains a place of pilgrimage — the Thiepval memorial, the Vimy Ridge memorial farther north — visited by Canadian students every year.\n> **Ipperwash.** In 1942 the federal government took the Stoney Point reserve on Lake Huron under the War Measures Act to build a military camp, moving the families and promising the land back after the war. It was not returned. Beside the camp, Ipperwash Provincial Park (created 1936) contained an old burial ground that the Kettle and Stony Point people had asked to be protected since 1937. In September 1995, members of the community occupied the park to assert their claim and protect the burial ground. On the night of September 6, Ontario Provincial Police moved in; an officer shot and killed Dudley George, an unarmed protester. The Ipperwash Inquiry, reporting in 2007, found that the OPP, the provincial government, and the federal government all bore responsibility, confirmed the burial ground, and called the 1942 taking \'unprecedented\'. Ontario returned the park land to the First Nation, and in 2015 the federal government agreed to return Camp Ipperwash with a settlement. The park land is now held by the Chippewas of Kettle and Stony Point.\n\n**Think about it**\n\n- Why were veterans upset when the French government considered an airport on the Somme battlefield?\n- Is a battlefield a sacred place in the same sense as a temple? What makes ground sacred — belief, death, memory, or law?\n- Why were the Stoney Point people protesting at Ipperwash Provincial Park in 1995? Name the two issues of place.\n- What do the Somme and Ipperwash have in common about burial places? What differs about who was listened to, and how long it took?\n\n**From the speaker notes:** Dudley George was shot on the night of September 6, 1995 and died early September 7. The Inquiry report by Justice Sidney Linden was released May 30, 2007; the park land was transferred to the First Nation in 2009; the federal settlement was approved by the community in September 2015. The Kettle and Stony Point First Nation is Anishinaabe (the curriculum says \'Ojibwe\'). The Somme was listened to within two years; Ipperwash took decades and a death.'
              }
            },
            {
              title: {
                1: 'Pilgrims, and a journey with no destination',
                2: 'Destinations for pilgrims — and the vision quest, a journey with no destination',
                3: 'Destinations for pilgrims (F2.4) — and the vision quest, a journey with no destination'
              },
              visual: '🧭',
              body: {
                1: '**Jerusalem** is holy to three traditions. Jews pray at the Western Wall. Christians walk to the Church of the Holy Sepulchre. Muslims pray at al-Aqsa Mosque and the Dome of the Rock.\n\n**Mecca.** Every Muslim who is able makes the **hajj** once. Pilgrims wear simple white clothes and circle the Kaaba seven times.\n\n**Varanasi.** Hindus bathe in the Ganges at dawn, offer lamps, and bring the ashes of the dead.\n\n**The vision quest** is different. A young person spends days alone on the land, fasting and praying, guided by an Elder. There is no shrine to reach. The land is sacred everywhere.',
                2: '**Jerusalem — three traditions.** Jews pray at the Western Wall, the last remnant of the Temple; Christians walk the Via Dolorosa to the Church of the Holy Sepulchre, built over the sites of Jesus\' crucifixion and burial; Muslims pray at al-Aqsa Mosque and the Dome of the Rock, from which Muhammad is believed to have ascended to heaven. One city, three focal points, centuries of pilgrimage and conflict.\n\n**Mecca — the hajj.** Every Muslim able in body and means must perform the hajj once: in the month of Dhu al-Hijjah, in simple white garments that erase rank, circling the Kaaba seven times, walking between the hills of Safa and Marwa, standing on the plain of Arafat in prayer, and ending with Eid al-Adha. Two to three million people perform it together each year.\n\n**Varanasi — the Ganges.** Hindus come to bathe at the ghats at dawn, offer lamps to the river, visit the Kashi Vishwanath temple, and bring the ashes of the dead; many elderly Hindus come to die there, believing death in Varanasi brings release (moksha).\n\n**The vision quest.** In many First Nations, a young person undertakes a vision quest under the guidance of an Elder: several days alone on the land, fasting, praying and watching for a dream or vision that may bring a name, a spirit helper, a song, or a direction for life. There is no shrine to reach. The Elder helps choose a fitting place — a hill, a forest, a shore — but the place is not sacred before the quest; it becomes sacred through what happens there. The quester does not go to where the sacred is, but opens to the sacred where they are.',
                3: '**Jerusalem — three traditions.** Jews pray at the Western Wall, the last remnant of the Temple; Christians walk the Via Dolorosa to the Church of the Holy Sepulchre, built over the sites of Jesus\' crucifixion and burial; Muslims pray at al-Aqsa Mosque and the Dome of the Rock, from which Muhammad is believed to have ascended to heaven. One city, three focal points, centuries of pilgrimage and conflict.\n\n**Mecca — the hajj.** Every Muslim able in body and means must perform the hajj once: in the month of Dhu al-Hijjah (May 2027), in simple white garments that erase rank, circling the Kaaba seven times, walking between the hills of Safa and Marwa, standing on the plain of Arafat in prayer, and ending with Eid al-Adha. Two to three million people perform it together each year.\n\n**Varanasi — the Ganges.** Hindus come to bathe at the ghats at dawn, offer lamps to the river, visit the Kashi Vishwanath temple, and bring the ashes of the dead; many elderly Hindus come to die there, believing death in Varanasi brings release (moksha). Pilgrims express reverence by bathing, offering flowers and lamps, chanting, and circling the city.\n\n**What pilgrimages share:** a fixed destination, a set of actions at it, and a community of fellow pilgrims.\n\n**The vision quest — a journey with no destination.** In many First Nations, a young person — traditionally a young man, in many nations today young women too — undertakes a vision quest under the guidance of an Elder: several days alone on the land, fasting from food and often water, praying and watching for a dream or vision that may bring a name, a spirit helper, a song, or a direction for life. There is no shrine to reach. The Elder helps choose a fitting place — a hill, a forest, a shore — but the place is not sacred before the quest; it becomes sacred through what happens there. The journey is inward and personal: the quester does not go to where the sacred is, but opens to the sacred where they are. The community prepares the quester, waits, and afterward helps interpret the vision. (The vision quest is a personal ceremony guided by Elders and is not to be imitated.)\n\n**Worked example — pilgrimage vs vision quest:** Pilgrimage: fixed destination, crowds, prescribed actions, a duty or merit fulfilled. Vision quest: no destination, solitude, fasting and waiting, a personal vision. Both are rites of passage — separation, threshold, return — prepared and interpreted by the community.\n\n**Think about it:** a pilgrimage goes to the sacred; a vision quest opens to it anywhere. Which better fits life in a place like Canada, far from most traditions\' holy cities?'
              }
            },
            {
              title: {
                1: 'Check yourself, and look back',
                2: 'Check for understanding — and looking back (A4.4)',
                3: 'Check for understanding — and looking back at your research and inquiry (A4.4)'
              },
              visual: '✅',
              body: {
                1: 'Answer in your notes, then compare with a partner.\n\n- Why does Remembrance Day happen at a cenotaph?\n- How is a vision quest different from a pilgrimage?\n\n**Look back at the course.** Which part of your research was strongest? What would you do differently? What question about belief traditions do you still have?',
                2: 'Answer in your notes, then compare with a partner.\n\n- Why do commemorations like Remembrance Day happen at a cenotaph?\n- Why were veterans upset about the Somme airport plan? Why were the Stoney Point people protesting at Ipperwash?\n- Describe the hajj and how pilgrims to Varanasi express reverence; why is Jerusalem a focal point for three traditions?\n- Why does a vision quest have no fixed place, and how does it differ from a pilgrimage?\n\n**Looking back: your research and inquiry (A4.4)**\n\n- Unit 1: you formed research questions and found primary and secondary sources (Belief in My Community).\n- Unit 2: you evaluated sources for reliability and voice and synthesized a conclusion (Sacred Text Study).\n- Unit 3: you placed an observance in time and connected practices to teachings (Festival Field Guide).\n- Unit 4: you will profile a sacred place, reading it as its community does (Sacred Place Profile).\n\n**Now evaluate:** Which step of the research process was strongest for you? What would you do differently? What question about belief traditions remains for you?',
                3: 'Answer in your notes, then compare with a partner.\n\n- Why do commemorations like Remembrance Day happen at a cenotaph?\n- Why were veterans upset about the Somme airport plan? Why were the Stoney Point people protesting at Ipperwash?\n- Describe the hajj and how pilgrims to Varanasi express reverence; why is Jerusalem a focal point for three traditions?\n- Why does a vision quest have no fixed place, and how does it differ from a pilgrimage?\n\n**Worked example (model answer):** The land is sacred everywhere (Turtle Island) and the quest concerns the person\'s relationship with the spirit world; the Elder chooses a fitting place, which becomes sacred through the vision. Pilgrimage: fixed destination, crowds, prescribed actions, a duty or merit fulfilled. Vision quest: no destination, solitude, fasting and waiting, a personal vision. Both are rites of passage prepared and interpreted by the community.\n\n**Looking back: your research and inquiry (A4.4)**\n\n- Unit 1: you formed research questions and found primary and secondary sources (Belief in My Community).\n- Unit 2: you evaluated sources for reliability and voice, found common themes, and synthesized a conclusion (Sacred Text Study).\n- Unit 3: you placed an observance in time, connected practices to teachings, and wrote practical guidance (Festival Field Guide).\n- Unit 4: you will profile a sacred place, reading it as its community does (Sacred Place Profile).\n\n**Curriculum questions:** \'What steps might you take to enhance your research/inquiry skills?\' \'What questions arise from the results of your research?\'\n\n**Talk it through**\n\n- The Somme was protected within two years; Ipperwash\'s burial ground took decades and a death. What made the difference? What should Ontario have learned?\n- After this course: what would you ask a neighbour of another tradition that you would not have known to ask at the start?\n\n**Exit ticket:** Write one step you would take to improve your research skills, and one question about belief traditions that remains for you.'
              }
            }
          ]
        }
      ],

      terms: [
        // Lesson 1
        {
          term: 'diaspora',
          def: {
            1: 'A community living far from its homeland but keeping its identity.',
            2: 'A community living outside the homeland of its tradition, keeping its identity.',
            3: 'A community living outside the homeland of its tradition, keeping its identity (e.g. Jewish communities from Baghdad to Toronto after the Temple\'s destruction). Now also used for Sikh, Tamil, and Ukrainian communities.'
          }
        },
        {
          term: 'exile',
          def: {
            1: 'Being forced to leave your homeland.',
            2: 'Forced removal from one\'s homeland.',
            3: 'Forced removal from one\'s homeland; e.g. the Babylonian exile (586 BCE) and the Dalai Lama\'s flight from Tibet (1959).'
          }
        },
        {
          term: 'confederacy',
          def: {
            1: 'Nations joined together under one shared law.',
            2: 'A union of nations under a shared law.',
            3: 'A union of nations under a shared law — e.g. the Haudenosaunee (Six Nations) Confederacy, governed by the Great Law of Peace.'
          }
        },
        {
          term: 'Grand Council',
          def: {
            1: 'The council of chiefs that governs the Haudenosaunee.',
            2: 'The governing council of the Haudenosaunee, with fifty chiefs (Hoyane) from the member nations.',
            3: 'The governing council of the Haudenosaunee, with fifty chiefs (Hoyane) from the member nations, chosen by clan mothers and meeting at Onondaga.'
          }
        },
        {
          term: 'tulku',
          def: {
            1: 'A Tibetan Buddhist teacher recognized as a past teacher reborn.',
            2: 'In Tibetan Buddhism, a recognized reincarnation of a previous teacher.',
            3: 'In Tibetan Buddhism, a recognized reincarnation of a previous teacher; the Dalai Lama is the best-known tulku lineage.'
          }
        },
        {
          term: 'residential school',
          def: {
            1: 'A boarding school that took Indigenous children away to erase their culture.',
            2: 'Government-funded, church-run boarding schools that removed Indigenous children from their families to assimilate them.',
            3: 'Government-funded, church-run boarding schools (1880s–1996) that removed Indigenous children from families to assimilate them; the Mohawk Institute in Brantford was the longest-running (1828–1970).'
          }
        },
        // Lesson 2
        {
          term: 'founder',
          def: {
            1: 'The person a tradition says it began with.',
            2: 'The person a tradition traces its origin to — a prophet, teacher, or lawgiver.',
            3: 'The person a tradition traces its origin to — a prophet, teacher, or lawgiver (e.g. Baha\'u\'llah, the Peacemaker, Guru Nanak).'
          }
        },
        {
          term: 'prophet',
          def: {
            1: 'A person believed to speak for God.',
            2: 'A person believed to speak for God; in Islam, messengers bring scripture.',
            3: 'A person believed to speak for God; in Islam, messengers bring scripture (Moses, Jesus, Muhammad). Also called a messenger.'
          }
        },
        {
          term: 'Manifestation of God',
          def: {
            1: 'The Baha\'i name for the founders of the world\'s religions.',
            2: 'The Baha\'i term for the founders of the world\'s religions, each revealing God\'s will for an age.',
            3: 'The Baha\'i term for the founders of the world\'s religions — Abraham, Moses, Buddha, Jesus, Muhammad, the Bab, Baha\'u\'llah — each revealing God\'s will for an age.'
          }
        },
        {
          term: 'incarnation',
          def: {
            1: 'The Christian belief that God became human in Jesus.',
            2: 'The Christian belief that God became human in Jesus.',
            3: 'The Christian belief that God became human in Jesus; Christians call Jesus \'God incarnate\', the Son of God.'
          }
        },
        {
          term: 'Isa',
          def: {
            1: 'The Qur\'an\'s name for Jesus.',
            2: 'The Qur\'anic name for Jesus, honoured as a prophet and messenger born of the virgin Maryam.',
            3: 'The Qur\'anic name for Jesus, honoured in Islam as a prophet and messenger born of the virgin Maryam — not divine, and not crucified according to the Qur\'an.'
          }
        },
        {
          term: 'condolence ceremony',
          def: {
            1: 'A Haudenosaunee ceremony that clears grief so a new chief is raised.',
            2: 'The Haudenosaunee ceremony, taught by the Peacemaker, that clears grief so that a new chief can be raised.',
            3: 'The Haudenosaunee ceremony, taught by the Peacemaker to the grieving Hiawatha, that clears grief so that a new chief can be raised and the council can think clearly.'
          }
        },
        // Lesson 3
        {
          term: 'Exodus',
          def: {
            1: 'The Bible story of the Israelites escaping slavery in Egypt.',
            2: 'The biblical account of the Israelites\' escape from slavery in Egypt under Moses; the founding story of the Jewish people.',
            3: 'The biblical account of the Israelites\' escape from slavery in Egypt under Moses; the founding story of the Jewish people, retold every Passover at the Seder.'
          }
        },
        {
          term: 'Seder',
          def: {
            1: 'The Passover meal where the Exodus is retold with special foods.',
            2: 'The ordered Passover meal at which the Exodus is retold with symbolic foods.',
            3: 'The ordered Passover meal at which the Exodus is retold with symbolic foods (matzo, bitter herbs, charoset, salt water, a roasted bone, four cups of wine).'
          }
        },
        {
          term: 'matzo',
          def: {
            1: 'Flat bread with no yeast, eaten at Passover.',
            2: 'Unleavened bread eaten at Passover, recalling dough that had no time to rise.',
            3: 'Unleavened bread eaten at Passover, recalling dough that had no time to rise when the Israelites fled Egypt.'
          }
        },
        {
          term: 'Reform Judaism',
          def: {
            1: 'A movement that changed Jewish worship to fit modern life.',
            2: 'A movement beginning in early 19th-century Germany that adapted worship and practice to modern life.',
            3: 'A movement beginning in early 19th-century Germany that adapted worship and practice to modern life; today the largest Jewish denomination in North America (e.g. Holy Blossom Temple, Toronto).'
          }
        },
        {
          term: 'Second Vatican Council',
          def: {
            1: 'The 1962–1965 meeting of Catholic bishops that renewed the Church.',
            2: 'The meeting of the world\'s Catholic bishops (1962–1965) that renewed the Church\'s worship, teaching, and relations with other faiths.',
            3: 'The meeting of the world\'s Catholic bishops (1962–1965) that renewed the Church\'s worship, teaching, and relations with other faiths; also called Vatican II.'
          }
        },
        {
          term: 'laity',
          def: {
            1: 'Members of a church who are not clergy.',
            2: 'Members who are not clergy, in contrast to vowed religious (priests in orders, sisters, and brothers).',
            3: 'Members who are not clergy. Contrast vowed religious: priests in religious orders, sisters, and brothers who take vows of poverty, chastity, and obedience.'
          }
        },
        // Lesson 4
        {
          term: 'branch',
          def: {
            1: 'A group inside a tradition with its own beliefs or practices.',
            2: 'A subgroup within a tradition with distinct beliefs or practices; also called a denomination.',
            3: 'A subgroup within a tradition with distinct beliefs or practices; also called a denomination (e.g. Sunni and Shia; Orthodox, Conservative, and Reform Judaism).'
          }
        },
        {
          term: 'Vajrayana',
          def: {
            1: 'Tibetan Buddhism, which recognizes reborn teachers like the Dalai Lama.',
            2: 'Tibetan tantric Buddhism, one of the three main Buddhist vehicles with Mahayana and Theravada.',
            3: 'Tibetan tantric Buddhism, which recognizes reincarnate teachers (tulkus) such as the Dalai Lama; the other vehicles are Mahayana (the \'great vehicle\' of East Asia) and Theravada (the \'way of the elders\').'
          }
        },
        {
          term: 'umma',
          def: {
            1: 'The worldwide community of Muslims.',
            2: 'The worldwide community of Muslims, united by the Qur\'an, the Five Pillars, and the hajj.',
            3: 'The worldwide community of Muslims, united by the Qur\'an, the Five Pillars, and the hajj; often described as a body in which the pain of one part is felt by all.'
          }
        },
        {
          term: 'Ismaili',
          def: {
            1: 'A Shia Muslim branch led by a living Imam, the Aga Khan.',
            2: 'A Shia branch of Islam led by a living hereditary Imam, the Aga Khan.',
            3: 'A Shia branch of Islam led by a living hereditary Imam, the Aga Khan (Aga Khan V since February 2025); a large community in Canada, including the Aga Khan Museum in Toronto.'
          }
        },
        {
          term: 'cantor',
          def: {
            1: 'The leader of sung prayer in a synagogue.',
            2: 'The leader of sung prayer in a synagogue (hazzan), who chants the liturgy.',
            3: 'The leader of sung prayer in a synagogue (hazzan), who chants the liturgy and from the Torah and often teaches bar/bat mitzvah students.'
          }
        },
        {
          term: 'Métis Senator',
          def: {
            1: 'A respected Elder who guides the Métis Nation of Ontario.',
            2: 'A respected Elder recognized by the Métis Nation of Ontario for knowledge and service, who guides and opens meetings with prayer.',
            3: 'A respected Elder recognized by the Métis Nation of Ontario for knowledge and service, who advises councils, opens meetings with prayer, and mediates disputes — an honour and a duty, not an elected office.'
          }
        },
        // Lesson 5
        {
          term: 'observance',
          def: {
            1: 'How closely a person follows a tradition\'s practices.',
            2: 'The degree to which a person follows a tradition\'s practices — strict, moderate, occasional.',
            3: 'The degree to which a person follows a tradition\'s practices — strict, moderate, occasional (e.g. five daily prayers vs Friday prayer and Ramadan only).'
          }
        },
        {
          term: 'Anabaptist',
          def: {
            1: 'A 1500s Christian movement; Amish and Mennonites are Anabaptists.',
            2: 'Christian movement from the 1500s Reformation practising adult baptism, pacifism, and separation from the state; Amish and Mennonites are Anabaptists.',
            3: 'Christian movement from the 1500s Reformation practising adult baptism, pacifism, and separation from the state; Amish and Mennonites are Anabaptists. The Amish separated from the Mennonites in 1693 under Jakob Ammann.'
          }
        },
        {
          term: 'Ordnung',
          def: {
            1: 'The unwritten rules of an Amish community.',
            2: 'The unwritten rules of an Amish community governing dress, technology, and conduct, decided locally.',
            3: 'The unwritten rules of an Amish community governing dress, technology, and conduct, decided locally; it varies by church district — there is no single Amish rulebook.'
          }
        },
        {
          term: 'Old Order',
          def: {
            1: 'Amish and Mennonite groups that keep horse and buggy travel.',
            2: 'Amish and Mennonite groups that keep horse-and-buggy travel and reject most modern technology.',
            3: 'Amish and Mennonite groups that keep horse-and-buggy travel and reject most modern technology (e.g. Ontario\'s oldest Amish settlement near Milverton, 1824).'
          }
        },
        {
          term: 'bhakti',
          def: {
            1: 'Loving devotion to a god in Hinduism.',
            2: 'Loving devotion to a deity — one of Hinduism\'s main paths.',
            3: 'Loving devotion to a deity — one of Hinduism\'s main paths, alongside knowledge (jnana), action (karma yoga), and meditation (raja yoga).'
          }
        },
        {
          term: 'liberal',
          def: {
            1: 'Adapting a tradition\'s practice to modern life.',
            2: 'Within a tradition, adapting practice to modern life; the opposite of orthodox (holding closely to long-standing practice).',
            3: 'Within a tradition, adapting practice to modern life; the opposite of orthodox (holding closely to long-standing practice). The curriculum\'s phrase is \'liberal compromise\' — it does not mean less sincere.'
          }
        },
        // Lesson 6
        {
          term: 'sanctuary',
          def: {
            1: 'The holiest area of a worship space, where the altar is.',
            2: 'The holiest area of a worship space; in churches, the altar table where the Eucharist is celebrated.',
            3: 'The holiest area of a worship space; in churches, the area of the altar table where the Eucharist is celebrated. In Orthodox churches it is hidden behind the iconostasis.'
          }
        },
        {
          term: 'iconostasis',
          def: {
            1: 'The screen of icons in an Orthodox church.',
            2: 'In Orthodox churches, the screen of icons with doors separating the sanctuary from the nave.',
            3: 'In Orthodox churches, the screen of icons with royal doors separating the sanctuary from the nave; it hides the altar during parts of the liturgy.'
          }
        },
        {
          term: 'Ark',
          def: {
            1: 'The cabinet in a synagogue that holds the Torah scrolls.',
            2: 'The cabinet in a synagogue holding the Torah scrolls, placed on the wall facing Jerusalem.',
            3: 'The cabinet in a synagogue holding the Torah scrolls (Aron Kodesh), placed on the wall facing Jerusalem so prayer is oriented to the Temple\'s site.'
          }
        },
        {
          term: 'Guru Granth Sahib',
          def: {
            1: 'The Sikh scripture, honoured as the living Guru.',
            2: 'The Sikh scripture, honoured as the living Guru and installed on a raised throne in the gurdwara.',
            3: 'The Sikh scripture, honoured as the living Guru and installed on a raised throne (takht) under a canopy in the gurdwara, with the congregation seated below on the floor.'
          }
        },
        {
          term: 'sweat lodge',
          def: {
            1: 'A covered dome of saplings used for purification ceremonies.',
            2: 'A dome of bent saplings covered to hold heat, in which many First Nations hold purification ceremonies with heated stones.',
            3: 'A dome of bent saplings covered to hold heat, in which many First Nations hold purification ceremonies with heated stones (\'grandfathers\'); understood as the womb of Mother Earth.'
          }
        },
        {
          term: 'prayer wheel',
          def: {
            1: 'A cylinder holding written prayers; spinning it counts as saying them.',
            2: 'A cylinder inscribed with a mantra and containing written prayers; spinning it is understood as reciting them.',
            3: 'A cylinder inscribed with the mantra Om mani padme hum and containing written prayers; spinning it clockwise is understood as reciting them, sending compassion and accumulating merit.'
          }
        },
        // Lesson 7
        {
          term: 'cenotaph',
          def: {
            1: 'An \'empty tomb\' monument to the dead who are buried elsewhere.',
            2: 'An \'empty tomb\': a monument to the dead whose bodies lie elsewhere; the focus of Remembrance Day in most Canadian towns.',
            3: 'An \'empty tomb\' (Greek kenos, taphos): a monument to the dead whose bodies lie elsewhere; the focus of Remembrance Day in most Canadian towns (e.g. the National War Memorial in Ottawa, 1939).'
          }
        },
        {
          term: 'pilgrimage',
          def: {
            1: 'A sacred journey to a special place.',
            2: 'A sacred journey to a place for religious or spiritual purposes.',
            3: 'A sacred journey to a place for religious or spiritual purposes (curriculum glossary); e.g. the hajj to Mecca, Varanasi, Jerusalem. It has a fixed destination, set actions, and fellow pilgrims.'
          }
        },
        {
          term: 'hajj',
          def: {
            1: 'The pilgrimage to Mecca that every able Muslim makes once.',
            2: 'The pilgrimage to Mecca required once in a lifetime of every Muslim who is able — the fifth pillar of Islam.',
            3: 'The pilgrimage to Mecca required once in a lifetime of every Muslim who is able — the fifth pillar of Islam; pilgrims circle the Kaaba seven times and stand in prayer on the plain of Arafat.'
          }
        },
        {
          term: 'vision quest',
          def: {
            1: 'A young person\'s solitary fast on the land, guided by an Elder.',
            2: 'In many First Nations, a young person\'s solitary fast on the land, guided by an Elder, seeking a vision, a name, or direction.',
            3: 'In many First Nations, a young person\'s solitary fast on the land, guided by an Elder, seeking a vision, a name, or direction; it has no fixed destination because the land is sacred everywhere.'
          }
        },
        {
          term: 'burial ground',
          def: {
            1: 'A place where ancestors are buried.',
            2: 'A place where ancestors are buried; sacred to the community and protected by law and custom.',
            3: 'A place where ancestors are buried; sacred to the community and protected by law and custom (e.g. the burial ground at Ipperwash Provincial Park, confirmed by the 2007 Inquiry).'
          }
        },
        {
          term: 'reflection',
          def: {
            1: 'Looking back at your own work to judge what worked.',
            2: 'Looking back at one\'s own research, inquiry, and communication to judge what worked and what to improve.',
            3: 'Looking back at one\'s own research, inquiry, and communication to judge what worked and what to improve (expectation A4.4, the course\'s closing expectation).'
          }
        }
      ],

      questions: [
        // Lesson 1
        {
          type: 'mc',
          cat: 'L1 Turning Points',
          prompt: {
            1: 'After the Second Temple was destroyed in 70 CE, Jewish life was rebuilt around…',
            2: 'After the destruction of the Second Temple in 70 CE, Jewish practice reorganized around…',
            3: 'After the destruction of the Second Temple in 70 CE, Jewish practice reorganized around…'
          },
          answer: 'the synagogue, rabbis, and the written oral law',
          options: {
            1: ['the synagogue, rabbis, and the written oral law', 'pilgrimage to Rome'],
            2: ['the synagogue, rabbis, and the written oral law', 'the Temple priesthood', 'a single king'],
            3: ['the synagogue, rabbis, and the written oral law', 'the Temple priesthood', 'a single king', 'pilgrimage to Rome']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Turning Points',
          prompt: {
            1: 'The Woodland Cultural Centre (1972) is important because it…',
            2: 'The Woodland Cultural Centre (1972) is significant because it…',
            3: 'The Woodland Cultural Centre (1972) is significant because it…'
          },
          answer: 'occupies the former Mohawk Institute residential school and preserves Haudenosaunee culture',
          options: {
            1: ['occupies the former Mohawk Institute residential school and preserves Haudenosaunee culture', 'is the oldest church in Ontario'],
            2: ['occupies the former Mohawk Institute residential school and preserves Haudenosaunee culture', 'is the oldest church in Ontario', 'was the first Buddhist temple in Canada'],
            3: ['occupies the former Mohawk Institute residential school and preserves Haudenosaunee culture', 'is the oldest church in Ontario', 'was the first Buddhist temple in Canada', 'is where the Hiawatha Belt was made']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Turning Points',
          prompt: {
            1: 'The Dalai Lama is a tulku. This means he is…',
            2: 'The Dalai Lama is recognized as a tulku, meaning…',
            3: 'The Dalai Lama is recognized as a tulku, meaning…'
          },
          answer: 'the recognized reincarnation of the previous Dalai Lama',
          options: {
            1: ['the recognized reincarnation of the previous Dalai Lama', 'an elected leader'],
            2: ['the recognized reincarnation of the previous Dalai Lama', 'an elected leader', 'a hereditary king'],
            3: ['the recognized reincarnation of the previous Dalai Lama', 'an elected leader', 'a hereditary king', 'a Theravada monk']
          }
        },
        {
          type: 'tf',
          cat: 'L1 Turning Points',
          prompt: 'The Tuscarora joined the Haudenosaunee Confederacy around 1722, making Six Nations.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L1 Turning Points',
          prompt: 'The Dalai Lama fled Tibet in 1959 and settled in Dharamsala, India.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L1 Turning Points',
          prompt: 'The Dalai Lama fled Tibet in 1959 and settled in Beijing, China.',
          answer: false,
          levels: [3]
        },
        {
          type: 'match',
          cat: 'L1 Turning Points',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['diaspora', 'a community living outside the homeland of its tradition'],
            ['tulku', 'a recognized reincarnation of a previous teacher in Tibetan Buddhism'],
            ['confederacy', 'a union of nations under a shared law'],
            ['Grand Council', 'the Haudenosaunee governing council of chiefs at Onondaga'],
            ['exile', 'forced removal from one\'s homeland'],
            ['residential school', 'a church-run boarding school meant to assimilate Indigenous children']
          ]
        },
        {
          type: 'mc',
          cat: 'L1 Turning Points',
          prompt: {
            1: 'The Peacemaker persuaded five nations to bury their weapons beneath a…',
            2: 'According to Haudenosaunee oral history, the five nations buried their weapons beneath a…',
            3: 'According to Haudenosaunee oral history, the five nations buried their weapons at Onondaga beneath a…'
          },
          answer: 'white pine',
          options: {
            1: ['white pine', 'shopping mall'],
            2: ['white pine', 'red maple', 'stone wall'],
            3: ['white pine', 'red maple', 'stone wall', 'longhouse floor']
          }
        },
        {
          type: 'mc',
          cat: 'L1 Turning Points',
          prompt: 'The Mohawk Institute near Brantford was…',
          answer: 'Canada\'s longest-running residential school',
          options: {
            1: ['Canada\'s longest-running residential school', 'a hockey arena'],
            2: ['Canada\'s longest-running residential school', 'the first synagogue in Ontario', 'the Dalai Lama\'s home in exile'],
            3: ['Canada\'s longest-running residential school', 'the first synagogue in Ontario', 'the Dalai Lama\'s home in exile', 'the meeting place of the Grand Council']
          }
        },
        {
          type: 'fill',
          cat: 'L1 Turning Points',
          prompt: 'The Romans destroyed the Second Temple in Jerusalem in ___ CE.',
          answer: '70',
          bank: ['70', '586', '1972', '1959']
        },
        {
          type: 'fill',
          cat: 'L1 Turning Points',
          prompt: 'The Woodland Cultural Centre opened in the former Mohawk Institute in ___.',
          answer: '1972',
          bank: ['1972', '1970', '1828', '1784']
        },
        {
          type: 'tf',
          cat: 'L1 Turning Points',
          prompt: 'The Dalai Lama\'s 2025 statement said the Chinese government alone may recognize his successor.',
          answer: false,
          levels: [3]
        },
        // Lesson 2
        {
          type: 'mc',
          cat: 'L2 Founders and Major Figures',
          prompt: {
            1: 'In 1863, Baha\'u\'llah declared his mission in…',
            2: 'Baha\'u\'llah declared his mission in 1863 in…',
            3: 'Baha\'u\'llah declared his mission in 1863 in…'
          },
          answer: 'the garden of Ridvan near Baghdad',
          options: {
            1: ['the garden of Ridvan near Baghdad', 'a hockey arena in Toronto'],
            2: ['the garden of Ridvan near Baghdad', 'Tehran', 'Haifa'],
            3: ['the garden of Ridvan near Baghdad', 'Tehran', 'Haifa', 'Istanbul']
          }
        },
        {
          type: 'mc',
          cat: 'L2 Founders and Major Figures',
          prompt: {
            1: 'The Peacemaker\'s first ally, who gave clan mothers their role, was…',
            2: 'The Peacemaker\'s first ally, who gave clan mothers their role, was…',
            3: 'The Peacemaker\'s first ally, who gave clan mothers their role, was…'
          },
          answer: 'Jigonhsasee',
          options: {
            1: ['Jigonhsasee', 'Baha\'u\'llah'],
            2: ['Jigonhsasee', 'Hiawatha', 'Tadodaho'],
            3: ['Jigonhsasee', 'Hiawatha', 'Tadodaho', 'Handsome Lake']
          }
        },
        {
          type: 'mc',
          cat: 'L2 Founders and Major Figures',
          prompt: {
            1: 'In Islam, Jesus (Isa) is honoured as…',
            2: 'In Islam, Jesus (Isa) is honoured as…',
            3: 'In Islam, Jesus (Isa) is honoured as…'
          },
          answer: 'a prophet and messenger born of a virgin, not divine',
          options: {
            1: ['a prophet and messenger born of a virgin, not divine', 'a Roman emperor'],
            2: ['a prophet and messenger born of a virgin, not divine', 'the Son of God', 'the final prophet'],
            3: ['a prophet and messenger born of a virgin, not divine', 'the Son of God', 'the final prophet', 'a Jewish rabbi only']
          }
        },
        {
          type: 'match',
          cat: 'L2 Founders and Major Figures',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['Manifestation of God', 'the Baha\'i term for the founders of the world\'s religions'],
            ['condolence ceremony', 'the Haudenosaunee ceremony that clears grief so a new chief can be raised'],
            ['incarnation', 'the Christian belief that God became human in Jesus'],
            ['Isa', 'the Qur\'anic name for Jesus'],
            ['founder', 'the person a tradition traces its origin to'],
            ['prophet', 'a person believed to speak for God']
          ]
        },
        {
          type: 'tf',
          cat: 'L2 Founders and Major Figures',
          prompt: 'Baha\'u\'llah was born in Tehran, Persia.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L2 Founders and Major Figures',
          prompt: 'Baha\'u\'llah was born in India.',
          answer: false,
          levels: [3]
        },
        {
          type: 'tf',
          cat: 'L2 Founders and Major Figures',
          prompt: 'Christians and Muslims both hold that Jesus was born of a virgin.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L2 Founders and Major Figures',
          prompt: 'Christians and Muslims agree that Jesus was crucified and rose from the dead.',
          answer: false,
          levels: [3]
        },
        {
          type: 'mc',
          cat: 'L2 Founders and Major Figures',
          prompt: {
            1: 'The Peacemaker was born among the…',
            2: 'In Haudenosaunee oral history, the Peacemaker was born among the…',
            3: 'In Haudenosaunee oral history, the Peacemaker was born among the…'
          },
          answer: 'Wendat (Huron)',
          options: {
            1: ['Wendat (Huron)', 'Vikings'],
            2: ['Wendat (Huron)', 'Mohawk', 'Seneca'],
            3: ['Wendat (Huron)', 'Mohawk', 'Seneca', 'Anishinaabe']
          }
        },
        {
          type: 'mc',
          cat: 'L2 Founders and Major Figures',
          prompt: 'Today the Baha\'i Faith is administered by…',
          answer: 'elected councils with no clergy',
          options: {
            1: ['elected councils with no clergy', 'a king in Tehran'],
            2: ['elected councils with no clergy', 'a council of fifty chiefs', 'a line of reincarnated teachers'],
            3: ['elected councils with no clergy', 'a council of fifty chiefs', 'a line of reincarnated teachers', 'a hereditary high priest']
          }
        },
        {
          type: 'fill',
          cat: 'L2 Founders and Major Figures',
          prompt: 'Baha\'u\'llah declared himself the messenger the Bab had foretold in the year ___.',
          answer: '1863',
          bank: ['1863', '1817', '1852', '1892']
        },
        {
          type: 'fill',
          cat: 'L2 Founders and Major Figures',
          prompt: 'After the Peacemaker \'combed straight\' his mind, ___ became the keeper of the council fire.',
          answer: 'Tadodaho',
          bank: ['Tadodaho', 'Hiawatha', 'Jigonhsasee', 'Handsome Lake']
        },
        // Lesson 3
        {
          type: 'mc',
          cat: 'L3 History into Ritual',
          prompt: 'Matzo is eaten at Passover because…',
          answer: 'the Israelites\' bread had no time to rise when they fled Egypt',
          options: {
            1: ['the Israelites\' bread had no time to rise when they fled Egypt', 'it tastes like pizza'],
            2: ['the Israelites\' bread had no time to rise when they fled Egypt', 'it was the Temple bread', 'wheat is scarce in spring'],
            3: ['the Israelites\' bread had no time to rise when they fled Egypt', 'it was the Temple bread', 'wheat is scarce in spring', 'it recalls the manna only']
          }
        },
        {
          type: 'mc',
          cat: 'L3 History into Ritual',
          prompt: 'The Second Vatican Council (1962–1965) allowed…',
          answer: 'Mass in local languages with the priest facing the people',
          options: {
            1: ['Mass in local languages with the priest facing the people', 'the closing of all churches'],
            2: ['Mass in local languages with the priest facing the people', 'women priests', 'the abolition of the papacy'],
            3: ['Mass in local languages with the priest facing the people', 'women priests', 'the abolition of the papacy', 'Latin only']
          }
        },
        {
          type: 'match',
          cat: 'L3 History into Ritual',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['Seder', 'the ordered Passover meal retelling the Exodus'],
            ['matzo', 'unleavened bread recalling dough that had no time to rise'],
            ['Exodus', 'the Israelites\' escape from slavery in Egypt'],
            ['Reform Judaism', 'a 19th-century movement adapting Jewish worship to modern life'],
            ['Second Vatican Council', 'the 1962–1965 meeting of Catholic bishops that renewed the Church'],
            ['laity', 'members of a church who are not clergy']
          ]
        },
        {
          type: 'tf',
          cat: 'L3 History into Ritual',
          prompt: 'Reform Judaism ordained its first woman rabbi in 1972.',
          answer: true
        },
        {
          type: 'tf',
          cat: 'L3 History into Ritual',
          prompt: 'Since Vatican II, lay ministries and parish councils in countries like Canada have grown.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L3 History into Ritual',
          prompt: 'Since Vatican II, the number of vowed religious in countries like Canada has increased.',
          answer: false,
          levels: [3]
        },
        {
          type: 'match',
          cat: 'L3 History into Ritual',
          prompt: 'Match each historical incident to the ritual that recalls it.',
          pairs: [
            ['the Exodus from Egypt', 'eating matzo at Passover'],
            ['the rededication of the Temple (164 BCE)', 'eight nights of light'],
            ['Esther\'s victory', 'reading the Megillah at Purim'],
            ['the founding of the Khalsa (1699)', 'Vaisakhi processions'],
            ['the Buddha\'s enlightenment', 'Wesak lamps'],
            ['the armistice of 1918', 'two minutes of silence on November 11'],
            ['Jesus\' last meal and death', 'the Eucharist and Good Friday']
          ]
        },
        {
          type: 'mc',
          cat: 'L3 History into Ritual',
          prompt: {
            1: 'At the Seder, the bitter herbs (maror) stand for…',
            2: 'At the Seder, the bitter herbs (maror) recall…',
            3: 'At the Seder, the bitter herbs (maror) recall…'
          },
          answer: 'slavery',
          options: {
            1: ['slavery', 'a birthday party'],
            2: ['slavery', 'the tears of the Israelites', 'the mortar of the bricks'],
            3: ['slavery', 'the tears of the Israelites', 'the mortar of the bricks', 'the Passover lamb']
          }
        },
        {
          type: 'mc',
          cat: 'L3 History into Ritual',
          prompt: {
            1: 'Which movements formed in response to Reform Judaism?',
            2: 'In response to Reform Judaism, other Jews formed which movements that kept more traditional practice?',
            3: 'In response to Reform Judaism, other Jews formed which movements that kept more traditional practice?'
          },
          answer: 'Orthodox and Conservative',
          options: {
            1: ['Orthodox and Conservative', 'Catholic and Protestant'],
            2: ['Orthodox and Conservative', 'Sunni and Shia', 'Theravada and Mahayana'],
            3: ['Orthodox and Conservative', 'Sunni and Shia', 'Theravada and Mahayana', 'Amish and Mennonite']
          }
        },
        {
          type: 'mc',
          cat: 'L3 History into Ritual',
          prompt: 'Nostra Aetate (1965), a document of the Second Vatican Council, declared…',
          answer: 'respect for other religions',
          options: {
            1: ['respect for other religions', 'that pizza is sacred'],
            2: ['respect for other religions', 'that Latin is the only language of worship', 'that women may be ordained priests'],
            3: ['respect for other religions', 'that Latin is the only language of worship', 'that women may be ordained priests', 'that the Seder is a Christian meal']
          }
        },
        {
          type: 'fill',
          cat: 'L3 History into Ritual',
          prompt: 'Reform Judaism began in early 19th-century ___.',
          answer: 'Germany',
          bank: ['Germany', 'Egypt', 'Canada', 'Persia']
        },
        {
          type: 'fill',
          cat: 'L3 History into Ritual',
          prompt: 'The Second Vatican Council opened in 1962 and concluded in ___.',
          answer: '1965',
          bank: ['1965', '1972', '1950', '1970']
        },
        // Lesson 4
        {
          type: 'mc',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'Theravada Buddhists regard the Dalai Lama as…',
          answer: 'a respected monk and teacher, without a reincarnate-lama system',
          options: {
            1: ['a respected monk and teacher, without a reincarnate-lama system', 'a hockey player'],
            2: ['a respected monk and teacher, without a reincarnate-lama system', 'an emanation of Avalokiteshvara', 'a political separatist'],
            3: ['a respected monk and teacher, without a reincarnate-lama system', 'an emanation of Avalokiteshvara', 'a political separatist', 'their own supreme leader']
          }
        },
        {
          type: 'mc',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'Sunni and Shia Muslims divided over…',
          answer: 'who should lead after Muhammad\'s death in 632',
          options: {
            1: ['who should lead after Muhammad\'s death in 632', 'what to eat for breakfast'],
            2: ['who should lead after Muhammad\'s death in 632', 'the text of the Qur\'an', 'the direction of prayer'],
            3: ['who should lead after Muhammad\'s death in 632', 'the text of the Qur\'an', 'the direction of prayer', 'the month of Ramadan']
          }
        },
        {
          type: 'mc',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'In a synagogue, the cantor (hazzan)…',
          answer: 'leads sung prayer and chants from the Torah',
          options: {
            1: ['leads sung prayer and chants from the Torah', 'sells tickets at the door'],
            2: ['leads sung prayer and chants from the Torah', 'guards the door', 'writes the Torah scrolls'],
            3: ['leads sung prayer and chants from the Torah', 'guards the door', 'writes the Torah scrolls', 'bakes the matzo']
          }
        },
        {
          type: 'match',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['umma', 'the worldwide community of Muslims'],
            ['Ismaili', 'a Shia branch led by a living Imam, the Aga Khan'],
            ['Vajrayana', 'Tibetan Buddhism, which recognizes reincarnate teachers'],
            ['cantor', 'the leader of sung prayer in a synagogue'],
            ['Métis Senator', 'a respected Elder who guides the Métis Nation of Ontario'],
            ['branch', 'a subgroup within a tradition with distinct beliefs or practices']
          ]
        },
        {
          type: 'tf',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'Ismailis are a Shia branch led by a living Imam, the Aga Khan.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'Ismailis are a Sunni branch led by a living Imam, the Aga Khan.',
          answer: false,
          levels: [3]
        },
        {
          type: 'mc',
          cat: 'L4 One Tradition, Many Branches',
          prompt: {
            1: 'To Tibetan Buddhists, the Dalai Lama is an emanation of…',
            2: 'To Tibetan (Vajrayana) Buddhists, the Dalai Lama is an emanation of…',
            3: 'To Tibetan (Vajrayana) Buddhists, the Dalai Lama is an emanation of…'
          },
          answer: 'Avalokiteshvara, the bodhisattva of compassion',
          options: {
            1: ['Avalokiteshvara, the bodhisattva of compassion', 'the Aga Khan'],
            2: ['Avalokiteshvara, the bodhisattva of compassion', 'the Buddha himself', 'Abu Bakr'],
            3: ['Avalokiteshvara, the bodhisattva of compassion', 'the Buddha himself', 'Abu Bakr', 'the Peacemaker']
          }
        },
        {
          type: 'mc',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'In Orthodox Christian worship, the people\'s \'Amen\'…',
          answer: 'completes the priest\'s prayers',
          options: {
            1: ['completes the priest\'s prayers', 'ends the hockey game'],
            2: ['completes the priest\'s prayers', 'replaces the sermon', 'is said only by the choir'],
            3: ['completes the priest\'s prayers', 'replaces the sermon', 'is said only by the choir', 'is forbidden to the laity']
          }
        },
        {
          type: 'tf',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'At the hajj, Sunni, Shia, and Ismaili Muslims circle the Kaaba together.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'A Métis Senator is an elected parliamentary office in the Métis Nation of Ontario.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'Muslims divided over leadership after Muhammad\'s death in the year ___.',
          answer: '632',
          bank: ['632', '622', '610', '1972']
        },
        {
          type: 'fill',
          cat: 'L4 One Tradition, Many Branches',
          prompt: 'The Shia held that leadership belonged to ___, the Prophet\'s cousin and son-in-law, and his descendants.',
          answer: 'Ali',
          bank: ['Ali', 'Abu Bakr', 'Hiawatha', 'Moses']
        },
        // Lesson 5
        {
          type: 'mc',
          cat: 'L5 Strict to Liberal',
          prompt: 'Old Order Amish differ from Conservative Mennonites mainly in…',
          answer: 'use of cars, grid electricity, and English worship',
          options: {
            1: ['use of cars, grid electricity, and English worship', 'whether they live in Ontario'],
            2: ['use of cars, grid electricity, and English worship', 'adult baptism', 'pacifism'],
            3: ['use of cars, grid electricity, and English worship', 'adult baptism', 'pacifism', 'belief in Jesus']
          }
        },
        {
          type: 'match',
          cat: 'L5 Strict to Liberal',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['Ordnung', 'the unwritten local rules of an Amish community'],
            ['Anabaptist', 'a Reformation movement practising adult baptism and pacifism'],
            ['Old Order', 'groups that keep horse-and-buggy travel and reject most modern technology'],
            ['bhakti', 'loving devotion to a deity in Hinduism'],
            ['observance', 'the degree to which a person follows a tradition\'s practices'],
            ['liberal', 'adapting a tradition\'s practice to modern life']
          ]
        },
        {
          type: 'tf',
          cat: 'L5 Strict to Liberal',
          prompt: 'Hindus may express their devotion in many different ways and still identify as Hindu.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L5 Strict to Liberal',
          prompt: 'Hindus must express devotion in one prescribed way.',
          answer: false,
          levels: [3]
        },
        {
          type: 'mc',
          cat: 'L5 Strict to Liberal',
          prompt: {
            1: 'In Hinduism, bhakti is the path of…',
            2: 'In Hinduism, bhakti is the path of…',
            3: 'In Hinduism, bhakti is the path of…'
          },
          answer: 'loving devotion to a deity',
          options: {
            1: ['loving devotion to a deity', 'driving a buggy'],
            2: ['loving devotion to a deity', 'knowledge through study', 'duty done without attachment'],
            3: ['loving devotion to a deity', 'knowledge through study', 'duty done without attachment', 'discipline through meditation']
          }
        },
        {
          type: 'mc',
          cat: 'L5 Strict to Liberal',
          prompt: {
            1: 'An initiated Khalsa Sikh who keeps the Five Ks is called…',
            2: 'In Sikhism, an initiated Khalsa member who keeps the Five Ks is called…',
            3: 'In Sikhism, an initiated Khalsa member who keeps the Five Ks and Nitnem is called…'
          },
          answer: 'amritdhari',
          options: {
            1: ['amritdhari', 'Anabaptist'],
            2: ['amritdhari', 'keshdhari', 'sahajdhari'],
            3: ['amritdhari', 'keshdhari', 'sahajdhari', 'Haredi']
          }
        },
        {
          type: 'mc',
          cat: 'L5 Strict to Liberal',
          prompt: {
            1: 'Both Old Order Amish and Conservative Mennonites share…',
            2: 'Old Order Amish and Conservative Mennonites both share…',
            3: 'Old Order Amish and Conservative Mennonites both share…'
          },
          answer: 'Anabaptist roots, adult baptism, and plain dress',
          options: {
            1: ['Anabaptist roots, adult baptism, and plain dress', 'a love of video games'],
            2: ['Anabaptist roots, adult baptism, and plain dress', 'horse-and-buggy travel', 'worship in Pennsylvania German'],
            3: ['Anabaptist roots, adult baptism, and plain dress', 'horse-and-buggy travel', 'worship in Pennsylvania German', 'the practice of shunning']
          }
        },
        {
          type: 'tf',
          cat: 'L5 Strict to Liberal',
          prompt: 'Old Order Amish worship in homes and end formal schooling at Grade 8.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L5 Strict to Liberal',
          prompt: 'Old Order Amish worship in meetinghouses in English and drive plain black cars.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L5 Strict to Liberal',
          prompt: 'Ontario\'s oldest Amish settlement, near ___, dates to 1824.',
          answer: 'Milverton',
          bank: ['Milverton', 'Brantford', 'Barrie', 'Toronto']
        },
        {
          type: 'fill',
          cat: 'L5 Strict to Liberal',
          prompt: 'For many Hindus, the plurality of paths is the tradition\'s nature: \'many rivers to one ___\'.',
          answer: 'ocean',
          bank: ['ocean', 'temple', 'mountain', 'lake']
        },
        {
          type: 'fill',
          cat: 'L5 Strict to Liberal',
          prompt: 'The Amish separated from the Mennonites in ___ under Jakob Ammann.',
          answer: '1693',
          bank: ['1693', '1824', '1517', '1972']
        },
        // Lesson 6
        {
          type: 'mc',
          cat: 'L6 Sacred Place',
          prompt: 'A Reformed (Calvinist) church interior typically has…',
          answer: 'plain walls and a central pulpit with no images',
          options: {
            1: ['plain walls and a central pulpit with no images', 'a swimming pool'],
            2: ['plain walls and a central pulpit with no images', 'an iconostasis', 'statues of saints'],
            3: ['plain walls and a central pulpit with no images', 'an iconostasis', 'statues of saints', 'a tabernacle']
          }
        },
        {
          type: 'mc',
          cat: 'L6 Sacred Place',
          prompt: 'The Ark in a synagogue faces…',
          answer: 'Jerusalem',
          options: {
            1: ['Jerusalem', 'the parking lot'],
            2: ['Jerusalem', 'east always', 'Mecca'],
            3: ['Jerusalem', 'east always', 'Mecca', 'the door']
          }
        },
        {
          type: 'match',
          cat: 'L6 Sacred Place',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['iconostasis', 'the screen of icons separating sanctuary from nave in an Orthodox church'],
            ['Ark', 'the cabinet holding the Torah scrolls in a synagogue'],
            ['Guru Granth Sahib', 'the Sikh scripture, honoured as the living Guru'],
            ['sweat lodge', 'a covered dome of saplings for purification ceremonies with heated stones'],
            ['prayer wheel', 'a cylinder of written prayers that is spun to recite them'],
            ['sanctuary', 'the holiest area of a worship space']
          ]
        },
        {
          type: 'tf',
          cat: 'L6 Sacred Place',
          prompt: 'In a gurdwara the Guru Granth Sahib sits on a raised throne while the congregation sits on the floor.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L6 Sacred Place',
          prompt: 'In a gurdwara the congregation sits on raised chairs while the Guru Granth Sahib rests on the floor.',
          answer: false,
          levels: [3]
        },
        {
          type: 'match',
          cat: 'L6 Sacred Place',
          prompt: 'Match each place of worship to a feature at its centre or front.',
          pairs: [
            ['Roman Catholic church', 'an altar with the tabernacle and a crucifix'],
            ['Eastern Orthodox church', 'an iconostasis hiding the altar'],
            ['Reformed church', 'a central raised pulpit with an open Bible'],
            ['gurdwara', 'the Guru Granth Sahib on a raised throne under a canopy'],
            ['synagogue', 'the Ark holding the Torah scrolls, facing Jerusalem'],
            ['mosque', 'the mihrab marking the direction of Mecca']
          ]
        },
        {
          type: 'mc',
          cat: 'L6 Sacred Place',
          prompt: {
            1: 'In a sweat lodge, the heated stones are called…',
            2: 'In a sweat lodge, the stones heated in the sacred fire are called…',
            3: 'In a sweat lodge, the stones heated in the sacred fire and placed in the central pit are called…'
          },
          answer: 'grandfathers',
          options: {
            1: ['grandfathers', 'pizzas'],
            2: ['grandfathers', 'icons', 'stupas'],
            3: ['grandfathers', 'icons', 'stupas', 'mantras']
          }
        },
        {
          type: 'mc',
          cat: 'L6 Sacred Place',
          prompt: 'The Western Wall in Jerusalem is…',
          answer: 'the surviving retaining wall of the Second Temple, destroyed in 70 CE',
          options: {
            1: ['the surviving retaining wall of the Second Temple, destroyed in 70 CE', 'a wall of a hockey arena'],
            2: ['the surviving retaining wall of the Second Temple, destroyed in 70 CE', 'the outer wall of a gurdwara', 'the wall where the Ganges begins'],
            3: ['the surviving retaining wall of the Second Temple, destroyed in 70 CE', 'the outer wall of a gurdwara', 'the wall where the Ganges begins', 'the wall of the First Temple built by Moses']
          }
        },
        {
          type: 'tf',
          cat: 'L6 Sacred Place',
          prompt: 'In Orthodox churches, icons are understood as windows to the holy.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L6 Sacred Place',
          prompt: 'A Catholic church interior typically has plain white walls with no images or statues.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L6 Sacred Place',
          prompt: 'Prayer wheels inscribed with the mantra Om mani padme hum are turned ___ as one walks.',
          answer: 'clockwise',
          bank: ['clockwise', 'counter-clockwise', 'upside down', 'twice']
        },
        {
          type: 'fill',
          cat: 'L6 Sacred Place',
          prompt: 'In Hinduism, the Ganges river is understood as the goddess ___, descended from heaven.',
          answer: 'Ganga',
          bank: ['Ganga', 'Krishna', 'Maryam', 'Avalokiteshvara']
        },
        // Lesson 7
        {
          type: 'mc',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: 'A vision quest has no fixed destination because…',
          answer: 'the land is sacred everywhere and the quest concerns the person\'s relationship with the spirit world',
          options: {
            1: ['the land is sacred everywhere and the quest concerns the person\'s relationship with the spirit world', 'pilgrims must stay home'],
            2: ['the land is sacred everywhere and the quest concerns the person\'s relationship with the spirit world', 'Elders forbid travel', 'there are no sacred places in First Nations traditions'],
            3: ['the land is sacred everywhere and the quest concerns the person\'s relationship with the spirit world', 'Elders forbid travel', 'there are no sacred places in First Nations traditions', 'pilgrims must stay home']
          }
        },
        {
          type: 'match',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: 'Match each term to its meaning.',
          pairs: [
            ['cenotaph', 'an \'empty tomb\' monument to the dead whose bodies lie elsewhere'],
            ['hajj', 'the pilgrimage to Mecca required once of every able Muslim'],
            ['pilgrimage', 'a sacred journey to a place for religious or spiritual purposes'],
            ['vision quest', 'a solitary fast on the land, guided by an Elder, seeking a vision'],
            ['burial ground', 'a place where ancestors are buried, protected by law and custom'],
            ['reflection', 'looking back at one\'s own research to judge what worked']
          ]
        },
        {
          type: 'tf',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: 'The Somme airport proposal was dropped in 2003 after protests.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: 'The Somme airport was built in 2003 despite protests from veterans\' organizations.',
          answer: false,
          levels: [3]
        },
        {
          type: 'match',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: 'Match each pilgrimage site to the tradition it belongs to.',
          pairs: [
            ['the Western Wall in Jerusalem', 'Judaism'],
            ['the Church of the Holy Sepulchre', 'Christianity'],
            ['the Dome of the Rock and al-Aqsa Mosque', 'Islam (Jerusalem)'],
            ['the Kaaba in Mecca', 'Islam (the hajj)'],
            ['the ghats of Varanasi on the Ganges', 'Hinduism']
          ]
        },
        {
          type: 'mc',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: {
            1: 'Jerusalem is a focal point of pilgrimage for…',
            2: 'Jerusalem is a focal point of pilgrimage because it is sacred to…',
            3: 'Jerusalem is a focal point of pilgrimage because it is sacred to…'
          },
          answer: 'Jews, Christians, and Muslims',
          options: {
            1: ['Jews, Christians, and Muslims', 'hockey fans'],
            2: ['Jews, Christians, and Muslims', 'Hindus and Buddhists', 'Sikhs only'],
            3: ['Jews, Christians, and Muslims', 'Hindus and Buddhists', 'Sikhs only', 'the Haudenosaunee']
          }
        },
        {
          type: 'mc',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: {
            1: 'In 1942 the government took the Stoney Point reserve to build…',
            2: 'In 1942 the federal government took the Stoney Point reserve under the War Measures Act to build…',
            3: 'In 1942 the federal government took the Stoney Point reserve under the War Measures Act to build…'
          },
          answer: 'a military camp',
          options: {
            1: ['a military camp', 'a shopping mall'],
            2: ['a military camp', 'an airport', 'a provincial park'],
            3: ['a military camp', 'an airport', 'a provincial park', 'a residential school']
          }
        },
        {
          type: 'mc',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: {
            1: 'On the hajj, pilgrims wear simple white garments that…',
            2: 'On the hajj, pilgrims wear simple white garments that…',
            3: 'On the hajj, pilgrims wear simple white garments that…'
          },
          answer: 'erase rank',
          options: {
            1: ['erase rank', 'glow in the dark'],
            2: ['erase rank', 'show their home country', 'mark their branch of Islam'],
            3: ['erase rank', 'show their home country', 'mark their branch of Islam', 'indicate their age']
          }
        },
        {
          type: 'tf',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: 'On Remembrance Day, communities keep two minutes of silence at the cenotaph at 11 a.m.',
          answer: true,
          levels: [1, 2]
        },
        {
          type: 'tf',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: 'In a vision quest, the Elder sends the young person to a shrine that was already sacred before the quest.',
          answer: false,
          levels: [3]
        },
        {
          type: 'fill',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: 'The Ipperwash Inquiry, which confirmed the burial ground and found the OPP and both governments bore responsibility, reported in ___.',
          answer: '2007',
          bank: ['2007', '1995', '1942', '2015']
        },
        {
          type: 'fill',
          cat: 'L7 Place, Memory, and Pilgrimage',
          prompt: 'On the hajj, pilgrims circle the Kaaba ___ times.',
          answer: 'seven',
          bank: ['seven', 'three', 'ten', 'four']
        }
      ]
    }
  ]
});

// ---- Colouring pictures (original line art; every fillable area carries class="region") ----
window.LearnHub.colouring = window.LearnHub.colouring || {};
(function (C) {
  var S = 'fill="#fff" stroke="#000" stroke-width="2.5" stroke-linejoin="round"';
  function reg(shape) {
    if (shape.indexOf('fill="none"') >= 0) return shape.replace(/^<(\w+)/, '<$1 stroke="#000" stroke-width="2.5" stroke-linecap="round"');
    return shape.replace(/^<(\w+)/, '<$1 class="region" ' + S);
  }
  function pic(key, title, shapes) {
    (C[key] = C[key] || []).push({ title: title, svg: '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">' + shapes.map(reg).join('') + '</svg>' });
  }

  // Unit 1 — Remembrance: a candle, poppies and maple leaves
  pic('hrf3o/belief', 'Candle, poppies and maple leaves', [
    // sky / ground
    '<rect x="2" y="2" width="396" height="200"/>',
    '<rect x="2" y="202" width="396" height="96"/>',
    // table
    '<rect x="40" y="215" width="320" height="18" rx="4"/>',
    // candle holder
    '<path d="M150 215 L250 215 L238 190 L162 190 Z"/>',
    '<ellipse cx="200" cy="190" rx="38" ry="8"/>',
    // candle body
    '<rect x="178" y="95" width="44" height="95" rx="4"/>',
    '<ellipse cx="200" cy="95" rx="22" ry="6"/>',
    // wick + flame
    '<rect x="198" y="78" width="4" height="14"/>',
    '<path d="M200 40 C 214 58, 218 68, 200 82 C 182 68, 186 58, 200 40 Z"/>',
    '<path d="M200 56 C 207 64, 208 70, 200 78 C 192 70, 193 64, 200 56 Z"/>',
    // glow rays
    // left poppy
    '<path d="M110 215 C 112 180, 116 160, 118 140"/>'.replace('<path', '<path fill="none"'),
    '<circle cx="118" cy="128" r="24"/>', '<circle cx="118" cy="128" r="7"/>',
    '<circle cx="60" cy="170" r="20"/>', '<circle cx="60" cy="170" r="6"/>',
    '<path d="M60 215 C 60 200, 60 195, 60 190"/>'.replace('<path', '<path fill="none"'),
    // right poppy
    '<circle cx="290" cy="140" r="24"/>', '<circle cx="290" cy="140" r="7"/>',
    '<path d="M290 215 C 290 190, 290 180, 290 164"/>'.replace('<path', '<path fill="none"'),
    '<circle cx="340" cy="175" r="20"/>', '<circle cx="340" cy="175" r="6"/>',
    '<path d="M340 215 C 340 205, 340 200, 340 195"/>'.replace('<path', '<path fill="none"'),
    // maple leaves on the table
    '<path d="M70 255 L80 238 L86 250 L96 232 L104 250 L112 238 L122 255 L112 258 L120 272 L104 268 L96 284 L88 268 L72 272 L80 258 Z"/>',
    '<path d="M290 255 L300 238 L306 250 L316 232 L324 250 L332 238 L342 255 L332 258 L340 272 L324 268 L316 284 L308 268 L292 272 L300 258 Z"/>',
    // small stars
    '<polygon points="40,40 46,52 59,54 49,63 52,76 40,70 28,76 31,63 21,54 34,52"/>',
    '<polygon points="350,30 355,40 366,42 358,49 360,60 350,55 340,60 342,49 334,42 345,40"/>',
    '<polygon points="320,90 323,96 330,97 325,102 326,109 320,106 314,109 315,102 310,97 317,96"/>'
  ]);

  // Unit 2 — Sacred writings: an open book, a scroll and a quill
  pic('hrf3o/texts', 'Open book, scroll and quill', [
    '<rect x="2" y="2" width="396" height="296"/>',
    // sun
    '<circle cx="330" cy="60" r="28"/>',
    '<path d="M330 14 L336 26 L324 26 Z"/>', '<path d="M376 60 L364 66 L364 54 Z"/>', '<path d="M284 60 L296 54 L296 66 Z"/>',
    '<path d="M362 28 L358 40 L350 32 Z"/>', '<path d="M298 28 L310 32 L302 40 Z"/>',
    // desk
    '<rect x="20" y="235" width="360" height="22" rx="4"/>',
    '<rect x="40" y="257" width="20" height="40"/>', '<rect x="340" y="257" width="20" height="40"/>',
    // open book — covers
    '<path d="M60 230 C 60 150, 70 120, 120 120 C 160 120, 190 130, 200 150 L200 232 C 190 215, 160 210, 120 210 C 80 210, 65 220, 60 230 Z"/>',
    '<path d="M340 230 C 340 150, 330 120, 280 120 C 240 120, 210 130, 200 150 L200 232 C 210 215, 240 210, 280 210 C 320 210, 335 220, 340 230 Z"/>',
    // pages
    '<path d="M72 220 C 72 160, 80 132, 120 132 C 158 132, 182 140, 194 158 L194 222 C 182 208, 158 202, 120 202 C 90 202, 78 210, 72 220 Z"/>',
    '<path d="M328 220 C 328 160, 320 132, 280 132 C 242 132, 218 140, 206 158 L206 222 C 218 208, 242 202, 280 202 C 310 202, 322 210, 328 220 Z"/>',
    // text lines as thin rounded rects
    '<rect x="92" y="150" width="80" height="6" rx="3"/>', '<rect x="92" y="164" width="70" height="6" rx="3"/>',
    '<rect x="92" y="178" width="80" height="6" rx="3"/>', '<rect x="92" y="192" width="55" height="6" rx="3"/>',
    '<rect x="228" y="150" width="80" height="6" rx="3"/>', '<rect x="228" y="164" width="70" height="6" rx="3"/>',
    '<rect x="228" y="178" width="80" height="6" rx="3"/>', '<rect x="228" y="192" width="55" height="6" rx="3"/>',
    // bookmark ribbon
    '<path d="M196 150 L204 150 L204 250 L200 242 L196 250 Z"/>',
    // scroll (left)
    '<rect x="30" y="70" width="90" height="46" rx="6"/>',
    '<ellipse cx="30" cy="93" rx="10" ry="23"/>', '<ellipse cx="120" cy="93" rx="10" ry="23"/>',
    '<rect x="48" y="82" width="54" height="5" rx="2"/>', '<rect x="48" y="94" width="44" height="5" rx="2"/>', '<rect x="48" y="106" width="54" height="5" rx="2"/>',
    // quill (right) + ink pot
    '<path d="M250 236 L300 150 C 310 130, 340 110, 360 108 C 352 130, 340 160, 320 175 L300 190 L270 230 Z"/>',
    '<path d="M300 150 L262 232"/>'.replace('<path', '<path fill="none"'),
    '<rect x="236" y="212" width="36" height="24" rx="5"/>', '<rect x="244" y="204" width="20" height="10" rx="2"/>',
    // candle
    '<rect x="140" y="80" width="18" height="40" rx="3"/>', '<path d="M149 56 C 157 66, 158 72, 149 80 C 140 72, 141 66, 149 56 Z"/>'
  ]);

  // Unit 3 — Living the tradition: lanterns and a shared feast
  pic('hrf3o/practice', 'Lanterns and a feast', [
    '<rect x="2" y="2" width="396" height="170"/>',
    '<rect x="2" y="172" width="396" height="126"/>',
    // string of lanterns
    '<path d="M2 30 C 100 60, 300 60, 398 30"/>'.replace('<path', '<path fill="none"'),
    '<rect x="55" y="40" width="40" height="52" rx="8"/>', '<rect x="63" y="34" width="24" height="8" rx="2"/>', '<rect x="63" y="92" width="24" height="8" rx="2"/>', '<rect x="72" y="100" width="6" height="14"/>',
    '<rect x="180" y="48" width="40" height="52" rx="8"/>', '<rect x="188" y="42" width="24" height="8" rx="2"/>', '<rect x="188" y="100" width="24" height="8" rx="2"/>', '<rect x="197" y="108" width="6" height="14"/>',
    '<rect x="305" y="40" width="40" height="52" rx="8"/>', '<rect x="313" y="34" width="24" height="8" rx="2"/>', '<rect x="313" y="92" width="24" height="8" rx="2"/>', '<rect x="322" y="100" width="6" height="14"/>',
    // stars / fireworks
    '<polygon points="130,30 134,40 145,41 137,48 139,59 130,54 121,59 123,48 115,41 126,40"/>',
    '<polygon points="260,20 264,30 275,31 267,38 269,49 260,44 251,49 253,38 245,31 256,30"/>',
    '<polygon points="380,70 383,76 390,77 385,82 386,89 380,86 374,89 375,82 370,77 377,76"/>',
    '<polygon points="20,80 23,86 30,87 25,92 26,99 20,96 14,99 15,92 10,87 17,86"/>',
    // table top and cloth
    '<path d="M30 180 L370 180 L390 205 L10 205 Z"/>',
    '<rect x="10" y="205" width="380" height="18"/>',
    '<rect x="40" y="223" width="18" height="70"/>', '<rect x="342" y="223" width="18" height="70"/>',
    // big bowl centre
    '<path d="M150 180 L250 180 C 250 210, 230 222, 200 222 C 170 222, 150 210, 150 180 Z"/>',
    '<ellipse cx="200" cy="180" rx="50" ry="10"/>',
    '<circle cx="185" cy="176" r="6"/>', '<circle cx="205" cy="174" r="6"/>', '<circle cx="218" cy="179" r="5"/>',
    // plates left and right
    '<ellipse cx="85" cy="186" rx="40" ry="11"/>', '<ellipse cx="85" cy="186" rx="26" ry="6"/>',
    '<ellipse cx="315" cy="186" rx="40" ry="11"/>', '<ellipse cx="315" cy="186" rx="26" ry="6"/>',
    // bread loaf and fruit
    '<path d="M60 186 C 60 172, 110 172, 110 186 Z"/>',
    '<circle cx="305" cy="182" r="7"/>', '<circle cx="322" cy="180" r="7"/>', '<circle cx="313" cy="174" r="6"/>',
    // cups
    '<path d="M130 160 L148 160 L146 182 L132 182 Z"/>', '<path d="M252 160 L270 160 L268 182 L254 182 Z"/>',
    // small pitcher
    '<path d="M345 150 C 345 140, 375 140, 375 150 L380 178 L340 178 Z"/>', '<path d="M375 155 C 390 155, 390 172, 378 172"/>'.replace('<path', '<path fill="none"'),
    // flowers in a vase
    '<path d="M22 150 L42 150 L46 180 L18 180 Z"/>',
    '<circle cx="24" cy="138" r="8"/>', '<circle cx="40" cy="134" r="8"/>', '<circle cx="32" cy="124" r="8"/>'
  ]);

  // Unit 4 — Sacred place: a path through hills to a hilltop building
  pic('hrf3o/place', 'A path to a hilltop building', [
    '<rect x="2" y="2" width="396" height="296"/>',
    // sun and clouds
    '<circle cx="60" cy="55" r="26"/>',
    '<path d="M250 50 C 250 36, 272 32, 278 44 C 290 36, 310 44, 306 58 C 318 60, 318 76, 304 76 L254 76 C 240 76, 240 54, 250 50 Z"/>',
    '<path d="M330 95 C 330 85, 346 82, 350 90 C 360 84, 374 90, 371 100 C 380 102, 380 112, 370 112 L334 112 C 324 112, 324 96, 330 95 Z"/>',
    // far hills
    '<path d="M2 200 C 60 150, 120 160, 160 185 C 200 150, 260 150, 300 180 C 340 150, 380 160, 398 190 L398 240 L2 240 Z"/>',
    // hilltop
    '<path d="M110 200 C 150 120, 250 120, 290 200 Z"/>',
    // building: base, dome, tower
    '<rect x="165" y="140" width="70" height="60" rx="3"/>',
    '<path d="M160 140 L240 140 L240 134 L160 134 Z"/>',
    '<path d="M168 134 C 168 100, 232 100, 232 134 Z"/>',
    '<rect x="196" y="86" width="8" height="18"/>', '<circle cx="200" cy="82" r="6"/>',
    '<rect x="243" y="110" width="22" height="90" rx="2"/>', '<path d="M240 110 L268 110 L254 88 Z"/>',
    '<path d="M190 200 L210 200 L210 172 C 210 160, 190 160, 190 172 Z"/>',
    '<path d="M172 170 L184 170 L184 156 C 184 150, 172 150, 172 156 Z"/>', '<path d="M216 170 L228 170 L228 156 C 228 150, 216 150, 216 156 Z"/>',
    // steps
    '<rect x="180" y="200" width="40" height="7"/>', '<rect x="175" y="207" width="50" height="7"/>',
    // foreground meadow
    '<path d="M2 240 L398 240 L398 298 L2 298 Z"/>',
    // winding path
    '<path d="M186 214 C 150 230, 240 245, 200 262 C 160 278, 230 290, 190 298 L120 298 C 150 285, 110 272, 150 258 C 190 244, 130 232, 170 214 Z"/>',
    // trees left and right
    '<rect x="50" y="215" width="12" height="36"/>', '<circle cx="56" cy="200" r="26"/>',
    '<rect x="330" y="220" width="12" height="36"/>', '<path d="M336 170 L364 222 L308 222 Z"/>',
    // two walkers (simple figures) on the path
    '<circle cx="178" cy="268" r="7"/>', '<path d="M170 276 L186 276 L184 296 L172 296 Z"/>',
    '<circle cx="200" cy="274" r="6"/>', '<path d="M193 281 L207 281 L205 298 L195 298 Z"/>',
    // birds
    '<path d="M110 90 C 118 82, 124 82, 130 90 C 124 86, 118 86, 110 90 Z"/>', '<path d="M140 100 C 148 92, 154 92, 160 100 C 154 96, 148 96, 140 100 Z"/>',
    // flowers in meadow
    '<circle cx="30" cy="275" r="6"/>', '<circle cx="90" cy="285" r="6"/>', '<circle cx="300" cy="280" r="6"/>', '<circle cx="370" cy="268" r="6"/>'
  ]);
})(window.LearnHub.colouring);
