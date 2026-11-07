/* SNC1L/2L · Science, Locally Developed (Grades 9/10)
   The Academy · Learn Hub course file.  Pilot: Unit 1 · Science at Work (8 lessons).
   Add Units 2–5 as further entries in `units`.  Load after colouring.js. */

window.LearnHub = window.LearnHub || { courses: [] };

(function () {
  // level helper: lv(l1, l2, l3[, l4]) — L4 omitted → app serves L3
  const lv = (a, b, c, d) => (d === undefined ? { 1: a, 2: b, 3: c } : { 1: a, 2: b, 3: c, 4: d });
  // mc helper: options per level; answer always first in each list
  const mc = (cat, prompt, answer, o1, o2, o3, extra) =>
    Object.assign({ type: 'mc', cat, prompt, answer, options: { 1: [answer, o1], 2: [answer, o1, o2], 3: [answer, o1, o2, o3] } }, extra || {});
  const tf = (cat, prompt, answer, extra) => Object.assign({ type: 'tf', cat, prompt, answer }, extra || {});
  const fill = (cat, prompt, answer, bank, extra) => Object.assign({ type: 'fill', cat, prompt, answer, bank }, extra || {});
  const app4 = (cat, prompt, answer, o1, o2, o3) => ({ type: 'mc', cat, prompt, answer, options: [answer, o1, o2, o3], levels: [4] });

  const course = {
    id: 'snc1l2l',
    title: 'Science at Work',
    subtitle: 'SNC1L/2L · Locally Developed Science',
    description: 'Science you will use at work, at home and in the community. Every lesson has one thing to write down, one thing to do, and one job it connects to.',
    icon: '🔧',
    color: '#2a6f66',

    awards: {
      study:        { icon: '📓', name: 'Notebook Kept: {unit}', desc: 'Read every lesson in {unit}.' },
      testPass:     { icon: '✅', name: 'Certified: {unit}', desc: 'Passed the {unit} test.' },
      testPerfect:  { icon: '💯', name: 'Flawless Shift: {unit}', desc: 'A perfect score on the {unit} test.' },
      games3:       { icon: '🎲', name: 'Break Room Regular: {unit}', desc: 'Played three games in {unit}.' },
      allGames:     { icon: '🎖️', name: 'Shop Foreman: {unit}', desc: 'Played every game in {unit}.' },
      unitMedal:    { icon: '🏅', name: 'Journeyperson: {unit}', desc: 'Everything in {unit} complete.' },
      courseTrophy: { icon: '🏆', name: 'Red Seal', desc: 'Every unit of Science at Work complete.' }
    },

    units: [
      // ===================================================================
      // UNIT 1 · SCIENCE AT WORK
      // ===================================================================
      {
        id: 'work',
        title: 'Unit 1 · Science at Work',
        description: lv(
          'How people use science at work. How to stay safe. How to measure.',
          'Where science shows up on the job, how to work safely with hazardous products, and how to measure and record like a tradesperson.',
          'Science skills, careers and connections (SNC1W Strand A; SNC2P Strand A): safety and WHMIS, measurement with the right tool, data tables and graphs, and the fair test.'
        ),
        lessons: [

          // ---------------------------------------------------------------
          // L1 Science is already in your day
          // ---------------------------------------------------------------
          { title: 'Lesson 1 · Science is already in your day',
            media: [
              { slide: 0, type: 'image', title: 'Four workers, four sciences', why: 'Photos of a cook, an electrician, a PSW and a mechanic start the "where is the science?" talk.', source: 'Wikimedia Commons (CC0) or Unsplash', search: 'electrician at work; line cook kitchen; personal support worker; auto mechanic', src: '' },
              { slide: 3, type: 'video', title: 'Skilled trades in Ontario', why: 'A 2-minute overview of trades careers to set the vocational tone.', source: 'Skilled Trades Ontario (YouTube) or Ontario Youth Apprenticeship Program', search: 'Skilled Trades Ontario careers video', minutes: 2, src: '' }
            ],
            assignments: [
              { title: 'Job-card match-up',
                prompt: lv('Pick 3 jobs. For each one, write one science thing the worker does every day.',
                           'Choose three jobs from the list (cook, electrician, PSW, mechanic, landscaper, hairstylist, warehouse worker). For each, name one task that uses science and say which kind of science it is (biology, chemistry, physics, Earth and space).',
                           'Choose three jobs. For each, describe one daily task that uses science, name the branch of science, and explain in one sentence why getting that science wrong would matter on the job. (SNC1W A2; SNC2P A2.1)',
                           'As Level 3, then add a fourth job that is not on the list and defend why it belongs with the others.'),
                starter: lv('A cook uses science when they …', 'The first job I chose is … One science task in this job is …', 'Job 1: … Task: … Branch: … If this went wrong, …', 'Job 1: …'),
                success: lv('3 jobs, 3 science tasks.', '3 jobs, each with a task and the branch of science named.', '3 jobs; task, branch and a "why it matters" sentence for each.', 'As Level 3 plus a fourth, defended choice.'),
                expectations: 'SNC1W A2.1, A2.3; SNC2P A2.1' },
              { title: 'Notebook page 1: Science I already do',
                prompt: lv('List 5 things you did today that use science.', 'List five things you did today that use science (for example: charging a phone, cooking, reading a label, taking a bus). Beside each, write the kind of science.', 'List five everyday actions that rely on science, name the branch for each, and pick one to explain in two sentences.', 'As Level 3, then rank your five from "most science" to "least" and justify the top choice.'),
                starter: lv('Today I …', 'Today I … (science: …)', '1. … — branch: … — because …', '1. …'),
                success: lv('5 things listed.', '5 things, each with a kind of science.', '5 actions with branches and one explained.', 'Ranked list with a justified top choice.'),
                expectations: 'SNC1W A2.4' }
            ],
            slides: [
              { title: 'Where is the science?', visual: '🔍',
                body: lv('Look at a cook. A mechanic. A nurse. An electrician.\n\nThey all use science every day.\n\nThis course is about that science.',
                         'A cook, a mechanic, a personal support worker and an electrician all use science every single day, even if they never call it that.\n\nThis course is about the science you will meet at work, at home and in your community.',
                         'Every job uses science. A cook controls chemical reactions, an electrician works with current and resistance, a PSW reads vital signs that are biology, and a mechanic diagnoses problems with a fair test.\n\n**Learning goal (SNC1W A2):** we are learning to see how science is applied in real jobs.\n\n**Success criteria:** I can name five jobs that use science and say what science each one uses.',
                         'Every job uses science. A cook controls chemical reactions, an electrician works with current and resistance, a PSW reads vital signs that are biology, and a mechanic diagnoses problems with a fair test.\n\n**Learning goal (SNC1W A2):** we are learning to see how science is applied in real jobs.\n\n**Success criteria:** I can name five jobs that use science and say what science each one uses.\n\n**Go further:** pick one job you might actually do. Over the week, notice every moment it would use science.') },
              { title: 'What science is', visual: '🧪',
                body: lv('Science is a way of finding things out.\n\n- Look carefully.\n- Try something.\n- See what happens.\n- Write it down.',
                         'Science is a way of finding things out by looking carefully, trying something, seeing what happens and writing it down.\n\nIt is not only in a lab. A mechanic who swaps one part to see if the noise stops is doing science.',
                         'Science is a way of finding things out: observe, test, record, explain. It has four big branches:\n\n| Branch | What it studies | A job that uses it |\n| Biology | living things | PSW, landscaper, cook |\n| Chemistry | what stuff is made of and how it changes | hairstylist, painter, cleaner |\n| Physics | energy, forces, electricity, light | electrician, mechanic, welder |\n| Earth and space | our planet, weather, space | farmer, roofer, pilot |') },
              { title: 'Write this down', visual: '✏️',
                body: lv('**Science = look, try, record, explain.**\n\nFour kinds of science:\n- Biology = living things\n- Chemistry = what stuff is made of\n- Physics = energy and electricity\n- Earth and space = our planet and beyond',
                         '**Science = observe, test, record, explain.**\n\nFour branches:\n- Biology: living things\n- Chemistry: what stuff is made of and how it changes\n- Physics: energy, forces, electricity, light\n- Earth and space: our planet, weather, space\n\nWrite these four lines in your notebook. You will use them in every unit.',
                         '**Science = observe, test, record, explain.**\n\nFour branches: biology (living things), chemistry (matter and its changes), physics (energy, forces, electricity, light), Earth and space (the planet, climate, the solar system).\n\nAdd one job beside each branch in your notebook. This page is your map of the whole course: Unit 2 is biology, Unit 3 is chemistry, Unit 4 is physics, Unit 5 is Earth and space.') },
              { title: 'Do: job-card match-up', visual: '🗂️',
                body: lv('Pick 3 jobs.\n\nFor each job, write one science thing the worker does.\n\nExample: a cook boils water. That is physics (heat).',
                         'Pick three jobs from the cards. For each one, write a task that uses science and say which branch it is.\n\nExample: a hairstylist mixes colour. That is chemistry, because two chemicals react.\n\nUse the four branches you just wrote down.',
                         'Pick three jobs. For each one, write a daily task, the branch of science, and one sentence on why getting the science wrong matters.\n\n**Worked example:** Electrician. Task: tests a wire before touching it. Branch: physics (electricity). Why it matters: a live wire can kill; the test is the only way to know.') },
              { title: 'Connect: one job, one science', visual: '🔗',
                body: lv('Exit question:\n\nName one job. Name one science it uses.\n\nWrite the job beside today\'s note.',
                         'Exit question: name one job you might do, and one branch of science it uses. Write the job beside today\'s note in your notebook.\n\nNext lesson: the hazard symbols every workplace in Ontario uses.',
                         'Exit question: name a job you might do, the branch of science it leans on most, and one task where that science is used.\n\nNext lesson: WHMIS, the hazard labelling system every Ontario workplace must use (SNC1W A1.5).') }
            ] },

          // ---------------------------------------------------------------
          // L2 Hazard symbols: WHMIS
          // ---------------------------------------------------------------
          { title: 'Lesson 2 · Hazard symbols: WHMIS',
            media: [
              { slide: 1, type: 'image', title: 'The 10 WHMIS 2015 pictograms', why: 'The official pictogram chart is the reference for the whole lesson.', source: 'CCOHS (Canadian Centre for Occupational Health and Safety) WHMIS pictograms page', search: 'CCOHS WHMIS 2015 pictograms', src: '' },
              { slide: 3, type: 'video', title: 'WHMIS in 3 minutes', why: 'A short explainer of why labels exist and what the symbols mean.', source: 'CCOHS or WorkSafeBC (YouTube)', search: 'WHMIS 2015 pictograms explained', minutes: 3, src: '' }
            ],
            assignments: [
              { title: 'Label scavenger hunt',
                prompt: lv('Find 3 products at home or school with a hazard symbol. Write the product and the symbol.',
                           'Find three products (home, school or work) that carry a WHMIS or consumer hazard symbol. For each, write the product name, the symbol you found and what the symbol means.',
                           'Find three products with hazard symbols. For each: product, symbol, meaning, and one safe-handling step the label gives. Note whether the symbol is WHMIS (workplace) or consumer (the diamond or octagon shape). (SNC1W A1.5)',
                           'As Level 3, then explain why the same chemical can have different labels at home and at work.'),
                starter: lv('Product 1: … Symbol: …', 'Product 1: … Symbol: … It means …', 'Product 1: … | Symbol: … | Meaning: … | Safe step: …', 'Product 1: …'),
                success: lv('3 products with a symbol each.', '3 products, symbol and meaning for each.', '3 products with symbol, meaning, safe step and label type.', 'As Level 3 plus the home-vs-work explanation.'),
                expectations: 'SNC1W A1.5; SNC2P A1.4' },
              { title: 'Notebook page 2: pictogram chart',
                prompt: lv('Draw or name the 10 symbols. Write one place you might see each.', 'Copy the pictogram chart (10 symbols, meaning of each). Beside each, write one product or workplace where you would see it.', 'Complete the pictogram chart with meaning and an example for each, then star the three most likely in the job you want.', 'As Level 3, and for your starred three, name the protective equipment the label would call for.'),
                starter: lv('Flame = fire. Seen on …', 'Flame: flammable. Example: …', 'Flame: flammable; example: …; PPE: …', 'Flame: …'),
                success: lv('10 symbols named.', '10 symbols, meaning and example.', '10 complete rows and 3 starred.', 'Rows, stars and PPE for the starred three.'),
                expectations: 'SNC1W A1.5' }
            ],
            slides: [
              { title: 'Two bottles on the desk', visual: '🧴',
                body: lv('A bleach bottle. A spray can.\n\nBoth have a small picture on the label.\n\nThat picture can save your life.',
                         'A bleach bottle and a spray can both carry a small symbol on the label. The symbol tells you the danger before you open the product.\n\nIn Ontario, every workplace must label hazardous products this way. The system is called WHMIS.',
                         'Every hazardous product in an Ontario workplace must carry a WHMIS label (Workplace Hazardous Materials Information System). The law also requires that every worker is trained to read it.\n\n**Learning goal (SNC1W A1.5; SNC2P A1.4):** we are learning to read the WHMIS pictograms and find them on real products.\n\n**Success criteria:** I can name all 10 pictograms and say what each one warns about.') },
              { title: 'The 10 pictograms', visual: '⚠️',
                body: lv('| Symbol | Means |\n| Flame | can catch fire |\n| Flame over circle | makes fires worse |\n| Exploding bomb | can explode |\n| Gas cylinder | gas under pressure |\n| Corrosion | burns skin and eyes |\n| Skull | poison |\n| Health hazard | can make you sick over time |\n| Exclamation mark | irritates skin or eyes |\n| Environment | harms fish and water |\n| Biohazard | germs |',
                         '| Pictogram | Warns about | Example |\n| Flame | flammable | gasoline, hair spray |\n| Flame over circle | oxidizer, feeds fires | pool chlorine |\n| Exploding bomb | explosive | some aerosol cans |\n| Gas cylinder | gas under pressure | welding tanks, propane |\n| Corrosion | burns skin, eyes, metal | drain cleaner, battery acid |\n| Skull and crossbones | fatal or toxic quickly | pesticides |\n| Health hazard | serious long-term harm | some solvents, silica dust |\n| Exclamation mark | irritant, less severe | many cleaners |\n| Environment | harmful to aquatic life | some paints |\n| Biohazardous | infectious materials | medical waste |',
                         '| Pictogram | Hazard class | Example | Where you will meet it |\n| Flame | flammable | gasoline, acetone, hair spray | auto shop, salon |\n| Flame over circle | oxidizer | pool chlorine, peroxide | pool tech, salon (bleach) |\n| Exploding bomb | explosive | some aerosols, fireworks | warehouse |\n| Gas cylinder | gas under pressure | propane, oxygen, acetylene | welding, HVAC, kitchens |\n| Corrosion | corrosive | drain cleaner, battery acid | custodial, auto |\n| Skull and crossbones | acute toxicity | pesticides, methanol | landscaping, auto |\n| Health hazard | carcinogen, organ toxicity | silica dust, some solvents | construction, painting |\n| Exclamation mark | irritant, skin sensitizer | many cleaners | every job |\n| Environment | aquatic toxicity | some paints, oils | painting, auto |\n| Biohazardous infectious | infectious material | sharps, medical waste | health care |\n\nThe biohazard symbol is Canada-only; the other nine are the international GHS set.') },
              { title: 'Write this down', visual: '✏️',
                body: lv('Copy the 10 symbols and what they mean.\n\nBeside each one, write one product you have seen it on.',
                         'Copy the pictogram chart into your notebook: the 10 symbols and their meanings.\n\nBeside each, write one product or job where you would see it. You will use this page for the scavenger hunt and again in Unit 3.',
                         'Copy the pictogram chart with meaning and an example for each. Add the three WHMIS worker rights from Ontario\'s Occupational Health and Safety Act:\n\n- the right to **know** about hazards\n- the right to **participate** in health and safety\n- the right to **refuse** unsafe work\n\nThis page is reused in Unit 3 (chemicals on the job) and the practical final.',
                         'Copy the pictogram chart with meaning and an example for each. Add the three WHMIS worker rights from Ontario\'s Occupational Health and Safety Act:\n\n- the right to **know** about hazards\n- the right to **participate** in health and safety\n- the right to **refuse** unsafe work\n\nThis page is reused in Unit 3 (chemicals on the job) and the practical final.\n\n**Go further:** a WHMIS label also carries a signal word, "Danger" or "Warning". Find out which is more serious and why both exist.') },
              { title: 'Do: read a real label', visual: '🔎',
                body: lv('Look at the label on the desk.\n\n1. Find the symbol.\n2. Find the product name.\n3. Find one safety word.\n\nThen start your scavenger hunt.',
                         'Look at the label your teacher gives you. Find:\n\n1. the pictogram(s)\n2. the product name\n3. the signal word (Danger or Warning)\n4. one safe-handling instruction\n\nThen begin the scavenger hunt: three products, three symbols.',
                         'Read the sample label and find the six required parts of a WHMIS supplier label: product identifier, pictogram(s), signal word, hazard statement, precautionary statement, supplier identifier.\n\n**Worked example:** Drain cleaner. Pictogram: corrosion. Signal word: Danger. Hazard statement: "Causes severe skin burns and eye damage." Precaution: "Wear protective gloves and eye protection."') },
              { title: 'Connect: who reads labels for a living?', visual: '🔗',
                body: lv('Custodians. Hairstylists. Mechanics. Cooks.\n\nThey all read these symbols every day.\n\nExit: name one symbol and one job that sees it.',
                         'Custodians, hairstylists, mechanics, cooks, warehouse workers and nurses all read WHMIS labels daily. In Ontario, your employer must train you on them before you start.\n\nExit: name one pictogram and one job that sees it every day.',
                         'Every Ontario employer must provide WHMIS training before a worker handles a hazardous product, and refresh it when products change. Being able to read a label on day one makes you safer and more employable.\n\nExit: name one pictogram, one job that sees it daily, and the protective equipment that label would require.') }
            ] },

          // ---------------------------------------------------------------
          // L3 Safety in our room and on the job
          // ---------------------------------------------------------------
          { title: 'Lesson 3 · Safety in our room and on the job',
            media: [
              { slide: 0, type: 'video', title: 'Near-miss in a shop or kitchen', why: 'A short, real near-miss clip makes the safety contract feel earned rather than imposed.', source: 'WSIB Ontario, Workers Health & Safety Centre, or WorkSafeBC (YouTube)', search: 'young worker near miss safety video Ontario', minutes: 2, src: '' },
              { slide: 3, type: 'image', title: 'Spot-the-hazard scene', why: 'A busy lab or job-site picture with 8 to 10 planted hazards for the worksheet.', source: 'CCOHS or Live Safe! Work Smart (Ontario Ministry of Labour) spot-the-hazard posters', search: 'spot the hazard poster workplace', src: '' }
            ],
            assignments: [
              { title: 'Spot the hazard',
                prompt: lv('Look at the picture. Find 5 unsafe things. Say how to fix each one.', 'Study the lab photo and the job-site photo. List five hazards you can see and the fix for each.', 'From both photos, list six hazards, the harm each could cause, and the fix. Label each fix as PPE, procedure or housekeeping. (SNC1W A1.5)', 'As Level 3, then rank your six by how likely they are to hurt someone this week, and explain your top choice.'),
                starter: lv('Hazard 1: … Fix: …', 'Hazard 1: … Fix: …', 'Hazard: … | Harm: … | Fix: … | Type: …', 'Hazard 1: …'),
                success: lv('5 hazards, 5 fixes.', '5 hazards with a fix for each.', '6 hazards with harm, fix and type.', 'Ranked list with a justified top hazard.'),
                expectations: 'SNC1W A1.5; SNC2P A1.4' },
              { title: 'Notebook page 3: my safety contract',
                prompt: lv('Write 5 room rules. Sign your page.', 'Write the five room rules in your own words, add one rule for the job you want, and sign the page.', 'Write the five room rules in your own words, add two rules from the job you want and the three worker rights (know, participate, refuse). Sign and date.', 'As Level 3, and write one sentence on what you would do if asked to do something unsafe at work.'),
                starter: lv('Rule 1: I will …', 'In this room I will …', 'Room rules: 1. … Job rules: 1. … Rights: …', 'Room rules: 1. …'),
                success: lv('5 rules and a signature.', '5 rules, 1 job rule, signed.', '5 rules, 2 job rules, 3 rights, signed and dated.', 'As Level 3 plus the refuse-unsafe-work plan.'),
                expectations: 'SNC1W A1.5' }
            ],
            slides: [
              { title: 'It only takes a second', visual: '⚡',
                body: lv('Watch the clip.\n\nWhat went wrong?\n\nWhat could have stopped it?',
                         'Watch the near-miss clip. What went wrong, and what one thing would have stopped it?\n\nMost injuries at work happen in the first six months on the job. Knowing the rules is how you get through them.',
                         'In Ontario, young workers (15 to 24) are hurt at work more often than any other age group, mostly in their first few months. Nearly every one of those injuries had a rule that would have prevented it.\n\n**Learning goal (SNC1W A1.5):** we are learning to follow safety routines and spot hazards before they hurt someone.\n\n**Success criteria:** I can state the room rules, spot hazards in a picture and name my three worker rights.') },
              { title: 'Five room rules', visual: '🥽',
                body: lv('1. Goggles on when told.\n2. Walk, never run.\n3. No food or drink.\n4. Tell the teacher about spills and breaks.\n5. Know where the exit, eyewash and extinguisher are.',
                         '1. **Eyes:** goggles on whenever anything is poured, heated or mixed.\n2. **Feet:** walk; keep bags and cords out of the aisles.\n3. **Mouth:** no eating or drinking; wash hands after every activity.\n4. **Tell:** report every spill, break, cut or burn right away, no matter how small.\n5. **Know:** where the exit, eyewash, fire extinguisher and first-aid kit are.',
                         '1. **Eyes:** goggles whenever anything is poured, heated or mixed; tie back hair; no loose sleeves near flames.\n2. **Feet:** walk; aisles clear; closed-toe shoes.\n3. **Mouth:** no eating or drinking; never taste or sniff directly; wash hands after.\n4. **Tell:** report every spill, break, cut or burn immediately; this is the same as a workplace incident report.\n5. **Know:** exit, eyewash, fire extinguisher, fire blanket, first-aid kit, and the WHMIS binder (safety data sheets).\n\nThese map directly onto the job: PPE, housekeeping, hygiene, reporting, emergency plan.') },
              { title: 'Write this down', visual: '✏️',
                body: lv('Copy the 5 rules.\n\nThen write your 3 rights at work:\n- Right to **know**\n- Right to **take part**\n- Right to **refuse** unsafe work\n\nSign the page.',
                         'Copy the five rules in your own words. Then copy your three rights under Ontario law:\n\n- the right to **know** about hazards\n- the right to **participate** in keeping the workplace safe\n- the right to **refuse** unsafe work\n\nSign and date the page. This is your safety contract.',
                         'Copy the five rules in your own words, then the three worker rights (know, participate, refuse) from the Occupational Health and Safety Act, and the employer\'s matching duties: provide training, provide PPE, fix reported hazards.\n\nSign and date. On the job, this is the orientation checklist you sign on day one.',
                         'Copy the five rules in your own words, then the three worker rights (know, participate, refuse) from the Occupational Health and Safety Act, and the employer\'s matching duties: provide training, provide PPE, fix reported hazards.\n\nSign and date. On the job, this is the orientation checklist you sign on day one.\n\n**Go further:** look up what happens, step by step, when a worker refuses unsafe work in Ontario. Who gets called?') },
              { title: 'Do: spot the hazard', visual: '🔎',
                body: lv('Look at the two pictures.\n\nFind 5 unsafe things.\n\nFor each one, write the fix.',
                         'Study the lab photo and the job-site photo. Find five hazards and write the fix for each.\n\nHints: look at eyes, feet, hands, cords, bottles, ladders and what is on the floor.',
                         'Find six hazards across the two photos. For each, write the harm it could cause and the fix, then label the fix as **PPE** (wear something), **procedure** (do it differently) or **housekeeping** (put it away).\n\n**Worked example:** extension cord across the aisle. Harm: trip, fall. Fix: run it along the wall and tape it down. Type: housekeeping.') },
              { title: 'Connect: the safety talk', visual: '🔗',
                body: lv('Every job starts with a safety talk.\n\nNow you already know the words.\n\nExit: say one rule and one right.',
                         'Every job in Ontario starts with a safety orientation. You now know the vocabulary: PPE, hazard, report, refuse. That makes you the new worker who gets it right.\n\nExit: name one rule and one right.',
                         'Every Ontario employer must give a health and safety orientation before work begins. Walking in already knowing PPE, hazard reporting, WHMIS and the three rights marks you as someone who can be trusted with tools on day one.\n\nExit: one rule, one right, and one hazard you have seen in a real workplace.') }
            ] },

          // ---------------------------------------------------------------
          // L4 Measuring 1: length and mass
          // ---------------------------------------------------------------
          { title: 'Lesson 4 · Measuring 1: length and mass',
            media: [
              { slide: 1, type: 'image', title: 'Measuring tools side by side', why: 'Tape measure, ruler, callipers, kitchen scale and balance in one photo so students can match tool to job.', source: 'Wikimedia Commons (CC0)', search: 'tape measure ruler calliper kitchen scale', src: '' },
              { slide: 2, type: 'video', title: 'Reading a tape measure', why: 'Carpenters read a tape in sixteenths; a 2-minute demo makes the metric/imperial point.', source: 'Skilled Trades Ontario, Home Depot Canada or a carpentry channel (YouTube)', search: 'how to read a tape measure metric and imperial', minutes: 2, src: '' }
            ],
            assignments: [
              { title: 'Station rotation: 8 objects',
                prompt: lv('Measure 8 things. Write the number and the unit for each.', 'At each station, measure the object with the right tool. Record the object, the tool, the number and the unit in a table.', 'Measure all eight objects, choosing the tool and unit that fits. Record object, tool, measurement with unit, and one line on why that tool was the right one. (SNC2P A1.2, A1.12)', 'As Level 3, then re-measure two objects in imperial units and show the conversion.'),
                starter: lv('Object: … Measurement: … unit: …', '| Object | Tool | Measurement |', '| Object | Tool | Measurement | Why this tool |', '| Object | Tool | Measurement | Why | Imperial |'),
                success: lv('8 rows, each with a number and a unit.', '8 rows with tool, number and unit.', '8 complete rows with a reason for each tool.', 'As Level 3 plus two imperial conversions.'),
                expectations: 'SNC2P A1.2, A1.12, A1.13' },
              { title: 'Notebook page 4: units and tools',
                prompt: lv('Write the units for length and mass. Draw the tools.', 'Write the length units (mm, cm, m) and mass units (g, kg) with the conversions, and draw the four tools.', 'Make the units cheat-sheet: length and mass units with conversions, imperial equivalents used in trades (inch, foot, pound), and a labelled drawing of each tool with the job that uses it.', 'As Level 3, and add the one measurement mistake that would be most expensive in the job you want.'),
                starter: lv('10 mm = 1 cm …', 'Length: 10 mm = 1 cm, 100 cm = 1 m …', 'Length: … Mass: … Imperial: 1 inch ≈ 2.54 cm …', 'Length: …'),
                success: lv('Units written, tools drawn.', 'Units with conversions and 4 tool drawings.', 'Complete cheat-sheet with imperial and jobs.', 'As Level 3 plus the costly-mistake note.'),
                expectations: 'SNC2P A1.12' }
            ],
            slides: [
              { title: 'Guess, then measure', visual: '📏',
                body: lv('How long is the desk?\n\nGuess first. Then measure.\n\nHow close were you?',
                         'How long is the desk? How much does the stapler weigh? Guess first, then measure.\n\nTradespeople guess well because they measure all day. By the end of this unit, so will you.',
                         'Estimate the length of the desk and the mass of the stapler before measuring. Good estimation comes from measuring often; a carpenter can eyeball a 2-by-4 within a centimetre.\n\n**Learning goal (SNC2P A1.2, A1.12):** we are learning to choose the right tool and unit for length and mass and record the result correctly.\n\n**Success criteria:** I can measure in mm, cm, m, g and kg, pick the right tool, and write every measurement with its unit.') },
              { title: 'Tools and units', visual: '🔩',
                body: lv('**Length:** ruler, tape measure.\nUnits: mm, cm, m.\n10 mm = 1 cm. 100 cm = 1 m.\n\n**Mass:** kitchen scale, balance.\nUnits: g, kg.\n1000 g = 1 kg.',
                         '**Length**\n- Ruler: small things, mm and cm.\n- Tape measure: rooms and boards, cm and m.\n- Callipers: round or precise things, mm.\n- 10 mm = 1 cm, 100 cm = 1 m, 1000 m = 1 km.\n\n**Mass**\n- Kitchen scale: food, packages, g.\n- Balance: lab, g.\n- Bathroom or shipping scale: people, boxes, kg.\n- 1000 g = 1 kg.',
                         '| Tool | Measures | Unit | Jobs |\n| Ruler | small lengths | mm, cm | drafting, sewing |\n| Tape measure | rooms, lumber | cm, m (and inches, feet) | carpentry, flooring, landscaping |\n| Callipers | diameters, thickness | mm (0.1 mm) | machining, auto |\n| Kitchen scale | ingredients, portions | g | cooking, baking, barista |\n| Balance | lab samples | g (0.1 g) | pharmacy, lab tech |\n| Platform scale | boxes, people | kg | warehouse, PSW |\n\nConversions: 10 mm = 1 cm; 100 cm = 1 m; 1000 m = 1 km; 1000 g = 1 kg. Canada is metric, but construction still uses inches and feet (1 in ≈ 2.54 cm, 1 ft = 12 in ≈ 30.5 cm) and recipes sometimes use pounds (1 lb ≈ 454 g).',
                         '| Tool | Measures | Unit | Jobs |\n| Ruler | small lengths | mm, cm | drafting, sewing |\n| Tape measure | rooms, lumber | cm, m (and inches, feet) | carpentry, flooring, landscaping |\n| Callipers | diameters, thickness | mm (0.1 mm) | machining, auto |\n| Kitchen scale | ingredients, portions | g | cooking, baking, barista |\n| Balance | lab samples | g (0.1 g) | pharmacy, lab tech |\n| Platform scale | boxes, people | kg | warehouse, PSW |\n\nConversions: 10 mm = 1 cm; 100 cm = 1 m; 1000 m = 1 km; 1000 g = 1 kg. Canada is metric, but construction still uses inches and feet (1 in ≈ 2.54 cm, 1 ft = 12 in ≈ 30.5 cm) and recipes sometimes use pounds (1 lb ≈ 454 g).\n\n**Go further:** mass and weight are not the same thing. A scale measures the pull of gravity on an object; on the Moon it would read one sixth as much. Unit 5 comes back to this.') },
              { title: 'Write this down', visual: '✏️',
                body: lv('**Length:** mm, cm, m\n10 mm = 1 cm\n100 cm = 1 m\n\n**Mass:** g, kg\n1000 g = 1 kg\n\nDraw: ruler, tape, scale, balance.',
                         '**Length:** mm → cm → m (10 mm = 1 cm, 100 cm = 1 m). Tools: ruler, tape measure, callipers.\n\n**Mass:** g → kg (1000 g = 1 kg). Tools: kitchen scale, balance, platform scale.\n\n**Rule:** every number gets a unit. "12" means nothing; "12 cm" means something.\n\nDraw the four tools with their names.',
                         '**Length:** mm → cm → m → km (×10, ×100, ×1000). Tools: ruler, tape, callipers. Imperial: 1 in ≈ 2.54 cm; 1 ft = 12 in.\n\n**Mass:** g → kg (×1000). Tools: kitchen scale, balance, platform scale. Imperial: 1 lb ≈ 454 g.\n\n**Rules:** every number carries a unit; read a scale at eye level; zero (tare) the scale before weighing; measure twice before you cut.\n\nDraw and label the tools, and write the job that uses each. This cheat-sheet is used in every lab for the rest of the course and in the practical final.') },
              { title: 'Do: eight stations', visual: '🔄',
                body: lv('Go to each station.\n\nPick the right tool.\n\nMeasure. Write the number AND the unit.',
                         'Rotate through the eight stations. At each one: choose the tool, measure, and record object, tool, number and unit in your table.\n\nStations: a paperclip, a textbook, the desk, the door, a pencil\'s thickness, an apple, a bag of rice, a backpack.',
                         'Rotate through eight stations and complete the table: object, tool chosen, measurement with unit, reason for the tool.\n\n**Worked example:** Pencil thickness. Tool: callipers (a ruler cannot read 7 mm precisely). Measurement: 7.2 mm. Reason: small, round, needs precision.\n\nCheck: did you tare the scale? Did you read the tape from the hook end?') },
              { title: 'Connect: measure twice, cut once', visual: '🔗',
                body: lv('A carpenter measures twice.\n\nA cook weighs the flour.\n\nA PSW weighs the patient.\n\nExit: name one job and what it measures.',
                         '"Measure twice, cut once" is a carpenter\'s rule because a wrong cut wastes a board. A cook weighs flour because a guess ruins the bread. A PSW records a patient\'s weight because a change can mean illness.\n\nExit: name one job and one thing it measures every day.',
                         'In trades, a measurement error costs money (a wasted board, a mis-cut pipe) or safety (a wrong dose, an overloaded shelf). Recording the unit is part of the measurement: a 2 kg and a 2 lb package are not the same shipment.\n\nExit: one job, one daily measurement, and what a mistake in it would cost.') }
            ] },

          // ---------------------------------------------------------------
          // L5 Measuring 2: volume and temperature
          // ---------------------------------------------------------------
          { title: 'Lesson 5 · Measuring 2: volume and temperature',
            media: [
              { slide: 1, type: 'image', title: 'Reading the meniscus', why: 'The curved water surface in a graduated cylinder has to be read at the bottom, at eye level; a labelled photo is clearer than words.', source: 'Wikimedia Commons (CC0) or a chemistry education site', search: 'meniscus graduated cylinder read at eye level', src: '' },
              { slide: 3, type: 'video', title: 'Taking a temperature: food, body, air', why: 'Three thermometers, three jobs, in one short clip.', source: 'Public Health Ontario (food safety) or a culinary channel', search: 'food thermometer safe internal temperature Canada', minutes: 2, src: '' }
            ],
            assignments: [
              { title: 'Liquids and thermometers stations',
                prompt: lv('Measure 4 liquids and 4 temperatures. Write the number and the unit.', 'At each station measure the volume or the temperature with the right tool. Add eight rows to your table: object, tool, number, unit.', 'Complete eight rows (four volumes, four temperatures) with tool, measurement with unit, and a note on how you avoided a reading error (meniscus, eye level, waiting for the thermometer to settle). (SNC2P A1.2, A1.12)', 'As Level 3, then convert two of your temperatures to Fahrenheit and say where you would see each scale at work.'),
                starter: lv('Liquid 1: … mL', '| Object | Tool | Measurement |', '| Object | Tool | Measurement | How I avoided error |', '| Object | Tool | Measurement | Error check | °F |'),
                success: lv('8 rows with number and unit.', '8 rows with tool, number, unit.', '8 complete rows with an error-check note.', 'As Level 3 plus two conversions.'),
                expectations: 'SNC2P A1.2, A1.12, A1.13' },
              { title: 'Notebook page 5: volume and temperature',
                prompt: lv('Write the volume units and the temperature unit. Draw the meniscus.', 'Add volume (mL, L) and temperature (°C) to your cheat-sheet, with the tools and a labelled meniscus drawing.', 'Complete the cheat-sheet: volume and temperature units, tools, the meniscus rule, and the four temperatures every worker should know (0 °C water freezes, 37 °C body, 74 °C safe cooked chicken, 100 °C water boils).', 'As Level 3, and explain why a food thermometer and an outdoor thermometer have different ranges.'),
                starter: lv('1000 mL = 1 L …', 'Volume: 1000 mL = 1 L. Temperature: °C …', 'Volume: … Temperature: … Key temperatures: 0, 37, 74, 100 …', 'Volume: …'),
                success: lv('Units written, meniscus drawn.', 'Units, tools and drawing.', 'Complete sheet with the four key temperatures.', 'As Level 3 plus the range explanation.'),
                expectations: 'SNC2P A1.12' }
            ],
            slides: [
              { title: 'Same amount, different cups', visual: '🥤',
                body: lv('Pour the water into two cups.\n\nWhich has more?\n\nYou cannot tell by looking. You have to measure.',
                         'Pour the same water into a tall glass and a wide bowl. Which has more? You cannot tell by looking, which is why cooks, nurses and pool technicians measure volume instead of guessing.\n\nToday: volume and temperature.',
                         'The same 250 mL looks different in a tall glass and a wide bowl. Volume is measured, not judged by eye. The same is true of temperature: a kitchen at 24 °C and a fridge at 4 °C feel different, but only the thermometer tells a health inspector which is safe.\n\n**Learning goal (SNC2P A1.2, A1.12):** we are learning to measure volume in mL and L and temperature in °C, with the right tool.\n\n**Success criteria:** I can read a graduated cylinder at the meniscus, read a thermometer, and record both with units.') },
              { title: 'Volume and temperature tools', visual: '🌡️',
                body: lv('**Volume:** measuring cup, graduated cylinder.\nUnits: mL, L. 1000 mL = 1 L.\n\nRead the water at the **bottom of the curve**, at eye level.\n\n**Temperature:** thermometer.\nUnit: °C.\nWater freezes at 0 °C. Water boils at 100 °C.',
                         '**Volume**\n- Measuring cup: cooking, mL and cups.\n- Graduated cylinder: lab, mL, more precise.\n- Jug or bucket with marks: cleaning, pools, L.\n- 1000 mL = 1 L. Read the **meniscus** (the bottom of the curved surface) at eye level.\n\n**Temperature**\n- Food thermometer: inside meat, °C.\n- Medical thermometer: body, °C.\n- Air thermometer: rooms, fridges, outdoors, °C.\n- Water freezes at 0 °C, body is about 37 °C, chicken is safe at 74 °C, water boils at 100 °C.',
                         '| Tool | Measures | Unit | Jobs |\n| Measuring cup / spoons | ingredients | mL, cups, tsp | cook, baker, barista |\n| Graduated cylinder | liquids, precisely | mL | lab tech, pharmacy |\n| Marked jug or bucket | cleaning solutions, pool chemicals | L | custodian, pool tech |\n| Syringe (no needle) | medicine, small doses | mL | PSW, vet assistant |\n| Food thermometer | internal food temperature | °C | cook (74 °C chicken, 71 °C ground beef) |\n| Medical thermometer | body temperature | °C | PSW (37 °C normal, 38 °C fever) |\n| Air / probe thermometer | rooms, fridges, HVAC | °C | HVAC, grocery (fridge ≤ 4 °C) |\n\n1000 mL = 1 L. Read the meniscus at eye level. Wait for a thermometer to stop changing before you read it. Canada uses °C; some ovens and US recipes use °F (water boils at 212 °F).',
                         '| Tool | Measures | Unit | Jobs |\n| Measuring cup / spoons | ingredients | mL, cups, tsp | cook, baker, barista |\n| Graduated cylinder | liquids, precisely | mL | lab tech, pharmacy |\n| Marked jug or bucket | cleaning solutions, pool chemicals | L | custodian, pool tech |\n| Syringe (no needle) | medicine, small doses | mL | PSW, vet assistant |\n| Food thermometer | internal food temperature | °C | cook (74 °C chicken, 71 °C ground beef) |\n| Medical thermometer | body temperature | °C | PSW (37 °C normal, 38 °C fever) |\n| Air / probe thermometer | rooms, fridges, HVAC | °C | HVAC, grocery (fridge ≤ 4 °C) |\n\n1000 mL = 1 L. Read the meniscus at eye level. Wait for a thermometer to stop changing before you read it. Canada uses °C; some ovens and US recipes use °F (water boils at 212 °F).\n\n**Go further:** 1 mL of water has a mass of 1 g. A cook can weigh water instead of measuring it. Check this on a scale.') },
              { title: 'Write this down', visual: '✏️',
                body: lv('**Volume:** mL, L\n1000 mL = 1 L\nRead the bottom of the curve.\n\n**Temperature:** °C\n0 °C = water freezes\n37 °C = body\n74 °C = cooked chicken\n100 °C = water boils',
                         '**Volume:** mL → L (1000 mL = 1 L). Tools: measuring cup, graduated cylinder, marked jug. Read the **meniscus** at eye level. Draw it.\n\n**Temperature:** °C. Tools: food, medical and air thermometers. Four to remember: 0 °C freezing, 37 °C body, 74 °C safe chicken, 100 °C boiling.\n\nAdd both to your cheat-sheet from Lesson 4.',
                         '**Volume:** mL → L (×1000). Tools: cup, cylinder, jug, syringe. Meniscus rule: read the bottom of the curve at eye level. Draw it.\n\n**Temperature:** °C (°F in some kitchens: 212 °F boiling, 165 °F chicken). Key points: 0 °C freezing, 4 °C fridge limit, 37 °C body, 38 °C fever, 74 °C safe chicken, 100 °C boiling. Let the thermometer settle before reading.\n\nYour cheat-sheet is now complete: length, mass, volume, temperature. It is used in every lab from here on.') },
              { title: 'Do: liquids and thermometers', visual: '🔄',
                body: lv('Four liquid stations. Four thermometer stations.\n\nMeasure. Write the number AND the unit.',
                         'Four volume stations (a cup of water, a bottle, a spoon of oil, a bucket) and four temperature stations (tap water, ice water, the room, your hand). Measure each and add eight rows to your table.',
                         'Eight stations: four volumes, four temperatures. For each row, record how you avoided the common error (meniscus at eye level; thermometer settled; right tool for the amount).\n\n**Worked example:** Ice water. Tool: air/probe thermometer. Reading: 1 °C after 30 s. Error check: waited until the number stopped falling.') },
              { title: 'Connect: 74 degrees', visual: '🔗',
                body: lv('A cook checks chicken is 74 °C.\n\nA PSW checks a fever.\n\nA pool tech measures chemicals in mL.\n\nExit: name one job and one thing it measures.',
                         'A cook probes chicken to 74 °C or someone gets sick. A PSW reads 38.5 °C and calls the nurse. A pool technician measures chlorine in mL per 1000 L of water. Every one of these is a volume or temperature reading with a unit.\n\nExit: one job, one measurement, one unit.',
                         'Food-safety law in Ontario sets internal temperatures (74 °C poultry, 71 °C ground meat) that a health inspector checks with a probe thermometer. In care homes, a temperature log is a legal record. In pools, chemical doses are mL per L of water. A missing unit in any of these is a reportable error.\n\nExit: one job, one measurement with its unit, and who checks it.') }
            ] },

          // ---------------------------------------------------------------
          // L6 Tables and bar graphs
          // ---------------------------------------------------------------
          { title: 'Lesson 6 · Tables and bar graphs',
            media: [
              { slide: 2, type: 'image', title: 'A good bar graph, labelled', why: 'One clean example with title, axis labels, units and scale pointed out.', source: 'Statistics Canada "Statistics: Power from Data!" (graph types) or Wikimedia Commons', search: 'bar graph parts labelled title axis', src: '' },
              { slide: 4, type: 'image', title: 'Graphs at work', why: 'A warehouse inventory chart, a nursing vitals chart and a sales chart show where graphs are read on the job.', source: 'Wikimedia Commons (CC0) or Unsplash', search: 'inventory bar chart; vital signs chart; sales dashboard', src: '' }
            ],
            assignments: [
              { title: 'Graph the measurements',
                prompt: lv('Use the data table. Draw a bar graph with a title and labels.', 'Using the class data (or the data set on the worksheet if you missed the stations), draw a bar graph of the mass of the four objects: title, axis labels with units, even scale, one bar per object.', 'Build a data table from the class measurements (or the provided set), then a bar graph with title, labelled axes with units, an even scale and a one-sentence conclusion ("The heaviest object was…"). (SNC2P A1.6, A1.12)', 'As Level 3, then explain one choice you made about the scale and how a different scale could mislead a reader.'),
                starter: lv('Title: … The bars show …', 'Title: … x-axis: … y-axis: … (unit)', 'Table → graph → conclusion: The heaviest object was … at … g.', 'Table → graph → conclusion → scale note: …'),
                success: lv('A graph with a title and 4 bars.', 'Title, both axes labelled with units, even scale, 4 bars.', 'Table, complete graph and a conclusion sentence.', 'As Level 3 plus the scale explanation.'),
                expectations: 'SNC2P A1.6, A1.12' },
              { title: 'Notebook page 6: table and graph template',
                prompt: lv('Copy the blank table. Copy the bar graph with its 4 parts labelled.', 'Copy the blank data table (title, headings with units) and the example bar graph with the four parts labelled: title, axis labels, units, scale.', 'Copy the table and graph templates, label the four parts, and add the rule for choosing a scale (biggest value, then even steps that fit the page).', 'As Level 3, and sketch how the same data would look as a line graph and when a line graph is the better choice.'),
                starter: lv('Title: … | Object | Mass (g) |', 'Table: title, headings with units. Graph: title, x label, y label, scale.', 'Templates + scale rule: …', 'Templates + scale rule + line-graph sketch.'),
                success: lv('Table and graph copied.', 'Templates with the 4 parts labelled.', 'Templates, labels and the scale rule.', 'As Level 3 plus the line-graph note.'),
                expectations: 'SNC2P A1.6' }
            ],
            slides: [
              { title: 'Our numbers on the board', visual: '🧮',
                body: lv('We measured a lot of things.\n\nNow the numbers are everywhere.\n\nA table puts them in order. A graph shows them in a picture.',
                         'We have two lessons of measurements and they are scattered through everyone\'s notebook. A data table puts them in order. A bar graph turns them into a picture you can read in two seconds.\n\nToday: build both.',
                         'Measurements are only useful once they are organized. A data table arranges them so they can be compared; a bar graph lets a reader see the comparison instantly.\n\n**Learning goal (SNC2P A1.6, A1.12):** we are learning to record data in a table and present it as a bar graph with all its parts.\n\n**Success criteria:** I can build a table with headings and units, and draw a bar graph with a title, labelled axes, units and an even scale.') },
              { title: 'A table, then a graph', visual: '📊',
                body: lv('**A table has:**\n- a title\n- headings\n- units\n\n**A bar graph has:**\n- a title\n- labels on both sides\n- units\n- even steps\n- one bar for each thing',
                         '**Data table**\n- Title: what was measured.\n- Column headings with units: "Object", "Mass (g)".\n- One row per thing measured.\n\n**Bar graph**\n- Title.\n- Horizontal axis (x): the things.\n- Vertical axis (y): the number, with its unit.\n- Even scale: 0, 50, 100, 150 … not 0, 50, 75, 300.\n- One bar per thing, same width, with a gap between.',
                         '| Part | Table | Bar graph |\n| Title | "Mass of four objects" | same |\n| Categories | first column | x-axis labels |\n| Values | second column, heading with unit "Mass (g)" | bar heights, y-axis labelled with unit |\n| Scale | n/a | even steps that reach the largest value |\n| Reading it | compare rows | compare bar heights at a glance |\n\n**Choosing a scale:** find the biggest value (say 410 g), pick a step that fits the page (50 g), and run it from 0 to just past the biggest value (0 to 450). A scale that does not start at 0 exaggerates small differences.\n\n**Worked example:** paperclip 1 g, apple 160 g, textbook 410 g, bag of rice 1000 g. Scale: 0 to 1000 in steps of 100.',
                         '| Part | Table | Bar graph |\n| Title | "Mass of four objects" | same |\n| Categories | first column | x-axis labels |\n| Values | second column, heading with unit "Mass (g)" | bar heights, y-axis labelled with unit |\n| Scale | n/a | even steps that reach the largest value |\n| Reading it | compare rows | compare bar heights at a glance |\n\n**Choosing a scale:** find the biggest value (say 410 g), pick a step that fits the page (50 g), and run it from 0 to just past the biggest value (0 to 450). A scale that does not start at 0 exaggerates small differences.\n\n**Worked example:** paperclip 1 g, apple 160 g, textbook 410 g, bag of rice 1000 g. Scale: 0 to 1000 in steps of 100.\n\n**Go further:** a bar graph compares separate things; a line graph shows one thing changing over time (a pulse during exercise, a temperature through the day). Unit 2 uses both.') },
              { title: 'Write this down', visual: '✏️',
                body: lv('Copy the blank table:\n\n| Object | Mass (g) |\n| | |\n\nCopy the graph with its 4 parts:\ntitle, labels, units, even steps.',
                         'Copy the blank table (title, headings with units, three empty rows) and the example bar graph with these four parts labelled: **title, axis labels, units, even scale**.\n\nThis template is what every lab sheet in the course looks like.',
                         'Copy both templates and label the four parts. Add the scale rule: biggest value → even step that fits → start at 0.\n\nEvery lab in this course (soil, pulse, pH, circuits, solar panel) records data in this table and presents it in this graph. The practical final includes reading one.') },
              { title: 'Do: graph the class data', visual: '🔄',
                body: lv('Use the table on the board.\n\nDraw one bar for each object.\n\nAdd a title and labels.',
                         'Use the class data (or the data set printed on your worksheet if you missed the stations). Build the table, then the bar graph: title, labelled axes with units, even scale, one bar per object.',
                         'Build the table from the class data or the provided set, then the bar graph, then write one conclusion sentence that compares two bars with numbers.\n\n**Check before you hand in:** title? both axes labelled? unit on the y-axis? scale starts at 0 and goes up evenly? bars the same width?') },
              { title: 'Connect: who reads graphs?', visual: '🔗',
                body: lv('A warehouse counts stock in a graph.\n\nA nurse charts a patient\'s temperature.\n\nA shop tracks sales.\n\nExit: name one job and one graph it reads.',
                         'Warehouse systems show stock levels as bar graphs. Nurses chart temperature and pulse on a graph so a change is visible at a glance. Stores track sales by day. Reading a graph quickly is a job skill.\n\nExit: one job, one graph it reads every day.',
                         'Inventory dashboards, vital-sign charts, energy-use reports and sales summaries are all bar or line graphs. Being able to read one (and spot a misleading scale) is expected of supervisors in every sector.\n\nExit: one job, one graph it uses, and one decision that graph helps make.') }
            ] },

          // ---------------------------------------------------------------
          // L7 Fair test: change one thing
          // ---------------------------------------------------------------
          { title: 'Lesson 7 · Fair test: change one thing',
            media: [
              { slide: 0, type: 'video', title: 'Paper helicopter drop', why: 'A 60-second clip of two helicopters with different wing lengths falling side by side is the hook.', source: 'Science Buddies or a science teacher channel (YouTube)', search: 'paper helicopter wing length experiment', minutes: 1, src: '' },
              { slide: 4, type: 'image', title: 'Troubleshooting on the job', why: 'A mechanic swapping one part at a time, or a technician testing one circuit at a time, shows the fair test as diagnosis.', source: 'Wikimedia Commons (CC0) or Unsplash', search: 'mechanic diagnostic testing', src: '' }
            ],
            assignments: [
              { title: 'Paper-helicopter investigation',
                prompt: lv('Make 2 helicopters: short wings and long wings. Drop each 3 times. Time it. Which falls slower?', 'Build two helicopters that are the same except for wing length. Drop each three times from the same height and time the falls. Record in a table, find the average, and answer: which wing length falls slower, and how do you know the test was fair?', 'Run the fair test: change only wing length, control height, paper, and drop method; three trials each; average. Present a table and bar graph, then conclude with evidence. Name the independent, dependent and controlled variables. (SNC1W A1.2; SNC2P A1.5, A1.8)', 'As Level 3, then propose a second variable to test and predict the result with a reason.'),
                starter: lv('Short wings: … s, … s, … s. Long wings: …', 'I changed … I kept the same … I measured …', 'Independent: … Dependent: … Controlled: … Result: …', 'Independent: …'),
                success: lv('2 helicopters, 3 drops each, a winner named.', 'Table with 6 times, averages, a conclusion and a fairness sentence.', 'Variables named, table, graph, evidence-based conclusion.', 'As Level 3 plus a second variable with a prediction.'),
                expectations: 'SNC1W A1.2; SNC2P A1.1, A1.5, A1.8' },
              { title: 'Notebook page 7: fair-test checklist',
                prompt: lv('Copy the checklist: change one thing, keep the rest the same, repeat 3 times.', 'Copy the fair-test checklist and write what you changed, kept the same, and measured in today\'s test.', 'Copy the checklist with the three variable names (independent, dependent, controlled) and the reason for repeating trials. Apply it to one job example (a mechanic finding a rattle).', 'As Level 3, and describe one real-life "test" that was not fair and what it should have changed.'),
                starter: lv('1. Change one thing. 2. …', 'Change one thing (…). Keep the same (…). Measure (…). Repeat 3×.', 'Independent = what I change: … Dependent = what I measure: … Controlled = what I keep the same: …', 'Independent = …'),
                success: lv('Checklist copied.', 'Checklist filled in for today\'s test.', 'Checklist with variable names and a job example.', 'As Level 3 plus the unfair-test example.'),
                expectations: 'SNC1W A1.2' }
            ],
            slides: [
              { title: 'Two helicopters', visual: '🚁',
                body: lv('Two paper helicopters.\n\nOne has long wings. One has short wings.\n\nDrop them together. Which one lands last?',
                         'Two paper helicopters, one with long wings and one with short. Drop them at the same time. Which lands last?\n\nNow the real question: how do you know it was the wings and not something else?',
                         'Two helicopters, different wing lengths, dropped together. One lands last. But if one was also heavier, or dropped from higher, the result proves nothing. A **fair test** changes one thing only.\n\n**Learning goal (SNC1W A1.2; SNC2P A1.5):** we are learning to design a fair test: one variable changed, the rest controlled, trials repeated.\n\n**Success criteria:** I can name what I changed, what I kept the same, what I measured, and why I repeated the test.') },
              { title: 'The fair-test rules', visual: '⚖️',
                body: lv('1. Change **one** thing.\n2. Keep everything else the **same**.\n3. **Measure** the result.\n4. **Repeat** 3 times.',
                         '1. **Change one thing** (the independent variable): wing length.\n2. **Keep everything else the same** (controlled variables): same paper, same height, same drop, same paperclip.\n3. **Measure the result** (the dependent variable): fall time in seconds.\n4. **Repeat** three times and average, because one drop can be a fluke.\n\nIf you change two things at once, you cannot tell which one caused the result.',
                         '| Rule | Variable name | Helicopter example | Mechanic example |\n| Change one thing | independent | wing length | swap one part |\n| Keep the rest the same | controlled | paper, height, clip, drop style | same car, same road, same speed |\n| Measure the result | dependent | fall time (s) | is the noise gone? |\n| Repeat | trials | 3 drops, take the average | drive it twice |\n\n**Why average?** A single trial can be a fluke (a draft, a wobbly release). Three trials and the average smooth out the luck.\n\n**Worked example:** short wings 1.8 s, 1.6 s, 1.7 s → average 1.7 s. Long wings 2.4 s, 2.6 s, 2.5 s → average 2.5 s. Conclusion: longer wings fall slower by about 0.8 s.',
                         '| Rule | Variable name | Helicopter example | Mechanic example |\n| Change one thing | independent | wing length | swap one part |\n| Keep the rest the same | controlled | paper, height, clip, drop style | same car, same road, same speed |\n| Measure the result | dependent | fall time (s) | is the noise gone? |\n| Repeat | trials | 3 drops, take the average | drive it twice |\n\n**Why average?** A single trial can be a fluke (a draft, a wobbly release). Three trials and the average smooth out the luck.\n\n**Worked example:** short wings 1.8 s, 1.6 s, 1.7 s → average 1.7 s. Long wings 2.4 s, 2.6 s, 2.5 s → average 2.5 s. Conclusion: longer wings fall slower by about 0.8 s.\n\n**Go further:** why do longer wings fall slower? Think about the air pushing up on more surface. Unit 4 and Unit 5 (rockets) come back to this.') },
              { title: 'Write this down', visual: '✏️',
                body: lv('**Fair test:**\n1. Change one thing.\n2. Keep the rest the same.\n3. Measure.\n4. Repeat 3 times.\n\nToday I changed: wing length.\nI measured: fall time.',
                         '**Fair-test checklist**\n1. Change one thing: ________\n2. Keep the same: ________\n3. Measure: ________\n4. Repeat 3× and average.\n\nFill it in for today: changed wing length; kept paper, height, clip, drop; measured fall time in seconds.',
                         '**Fair-test checklist** with variable names:\n- Independent (what I change): wing length\n- Controlled (what I keep the same): paper, height, paperclip, release\n- Dependent (what I measure): fall time (s)\n- Trials: 3, averaged\n\nAdd one job example: a mechanic chasing a rattle changes one part at a time. Every lab in Units 2 to 5 starts by filling in this checklist.') },
              { title: 'Do: run the test', visual: '🔄',
                body: lv('Build 2 helicopters. Same paper. Same clip.\n\nOnly the wings are different.\n\nDrop each one 3 times. Time it. Write the times.',
                         'Build two helicopters from the template: identical except for wing length. Drop each from the same height three times, timing each fall. Record in a table, average, and write your conclusion and one sentence on why the test was fair.',
                         'Build, drop, record: a table with six times and two averages, a two-bar graph of the averages, and a conclusion with numbers. Then name the three variables.\n\n**Check:** same paper, same clip, same height, same person dropping? If not, your test was not fair; say so in your conclusion.') },
              { title: 'Connect: one thing at a time', visual: '🔗',
                body: lv('A mechanic changes one part at a time.\n\nA baker changes one ingredient at a time.\n\nExit: what did you change today? What did you keep the same?',
                         'A mechanic swaps one part at a time to find a problem. A baker changes one ingredient to fix a recipe. A technician tests one circuit at a time. Troubleshooting is a fair test.\n\nExit: what did you change, what did you keep the same, and what did you measure?',
                         'Diagnosis in any trade is a fair test: change one thing, hold the rest, check the result, repeat to be sure. Product testing, quality control and recipe development all run on the same rule.\n\nExit: independent, controlled and dependent variables from today, and one job where you would use the checklist.') }
            ] },

          // ---------------------------------------------------------------
          // L8 A day in the job
          // ---------------------------------------------------------------
          { title: 'Lesson 8 · A day in the job',
            media: [
              { slide: 0, type: 'video', title: 'A day in the life of a tradesperson', why: 'A 3-minute first-person day (electrician, chef, PSW or landscaper) is the model for the mini-assignment.', source: 'Skilled Trades Ontario, OYAP, or a trade union channel (YouTube)', search: 'day in the life apprentice electrician Ontario', minutes: 3, src: '' },
              { slide: 1, type: 'image', title: 'Pathways chart', why: 'A one-page graphic of the routes into work: apprenticeship (OYAP), college, on-the-job training.', source: 'Ontario Youth Apprenticeship Program (OYAP) or Skilled Trades Ontario', search: 'OYAP pathway to apprenticeship chart', src: '' }
            ],
            assignments: [
              { title: 'A Day in the Job (mini-assignment)',
                prompt: lv('Pick a job. Write 3 science things the worker does in a day. Write 1 safety rule they follow.', 'Choose one job. Make a one-pager or four slides: the job, three science tasks it does in a day (with the branch of science for each), one safety rule or hazard symbol it meets, and one measurement it takes.', 'Choose one job. Produce a one-pager or four slides covering: the job and how people get into it (apprenticeship, college, on the job); three daily science tasks with the branch named; one hazard and its WHMIS symbol; one measurement with tool and unit; one fair-test moment (troubleshooting). (SNC1W A2.1; SNC2P A2.1)', 'As Level 3, then compare your job with a classmate\'s: which uses more science, and which has the bigger safety risk? Defend both answers.'),
                starter: lv('My job: … Science task 1: …', 'Job: … How you get in: … Task 1 (…): …', 'Job: … Pathway: … Task 1 / branch: … Hazard / symbol: … Measurement / tool / unit: … Fair-test moment: …', 'Job: …'),
                success: lv('A job, 3 science tasks, 1 safety rule.', 'Job, pathway, 3 tasks with branches, 1 hazard, 1 measurement.', 'All six parts present and specific to the job.', 'As Level 3 plus a defended comparison.'),
                expectations: 'SNC1W A2.1, A2.3; SNC2P A2.1' },
              { title: 'Notebook page 8: job profile',
                prompt: lv('Write the job, 3 science tasks and 1 safety rule on your profile page.', 'Fill in the job profile page: job, pathway, three science tasks, one hazard, one measurement. Add a job you want to look at next.', 'Complete the job profile page and list the three Unit 1 skills (reading a label, measuring with a unit, running a fair test) with one sentence each on where this job uses them.', 'As Level 3, and write the first question you would ask someone who does this job.'),
                starter: lv('Job: … Task 1: …', 'Job: … Pathway: … Tasks: 1. … 2. … 3. …', 'Job: … Skills: label → …; measure → …; fair test → …', 'Job: …'),
                success: lv('Profile page filled in.', 'Profile with pathway, 3 tasks, hazard, measurement.', 'Profile plus the three skills applied.', 'As Level 3 plus the interview question.'),
                expectations: 'SNC1W A2.1' }
            ],
            slides: [
              { title: 'Follow one worker', visual: '🎬',
                body: lv('Watch the video.\n\nCount the science.\n\nEvery time the worker measures, checks a label, or tests something, that is science.',
                         'Watch the day-in-the-life video. Count every moment of science: a measurement, a label read, a test, a temperature check, a safety step.\n\nMost people count more than ten. Today you build that list for a job you choose.',
                         'Watch the video and tally the science: measurements, labels, tests, safety steps. Then map them to the three Unit 1 skills: read a label (WHMIS), measure with a unit, run a fair test.\n\n**Learning goal (SNC1W A2.1; SNC2P A2.1):** we are learning to describe how a real job uses science, and the training that leads to it.\n\n**Success criteria:** I can profile one job with three science tasks, a hazard, a measurement and the pathway into it.') },
              { title: 'How people get in', visual: '🛤️',
                body: lv('Three ways into a job:\n\n- **Apprenticeship:** learn while you work and get paid.\n- **College:** a 1- or 2-year program.\n- **On the job:** start, then get trained.',
                         'Three common pathways:\n\n- **Apprenticeship:** paid work plus short school blocks; electrician, plumber, cook, hairstylist, auto technician. In high school this starts with OYAP.\n- **College:** 1- or 2-year certificate or diploma; PSW, dental assistant, pharmacy assistant, HVAC.\n- **On the job:** hired, then trained; warehouse, landscaping, retail, kitchen prep.\n\nAll three begin with the same thing: showing up safe, able to measure and willing to follow a procedure.',
                         '| Pathway | How it works | Example jobs | Science you bring |\n| Apprenticeship (OYAP in high school) | paid work ~ 80%, school blocks ~ 20%, 2 to 5 years, Certificate of Qualification; Red Seal for many trades | electrician, plumber, cook, hairstylist, auto service technician, welder | measurement, electricity, chemistry, safety |\n| College certificate / diploma | 1 to 2 years, often with placement | PSW, dental assistant, pharmacy assistant, HVAC technician, lab technician | biology, measurement, chemistry |\n| On-the-job training | hired first, trained by the employer, WHMIS on day one | warehouse, landscaping, kitchen prep, retail, cleaning | safety, measurement, fair-test troubleshooting |\n\nOntario\'s workplace science credit path (SNC1L/2L → SNC4E) feeds all three. Skilled Trades Ontario lists every trade and whether it is compulsory (licence required).',
                         '| Pathway | How it works | Example jobs | Science you bring |\n| Apprenticeship (OYAP in high school) | paid work ~ 80%, school blocks ~ 20%, 2 to 5 years, Certificate of Qualification; Red Seal for many trades | electrician, plumber, cook, hairstylist, auto service technician, welder | measurement, electricity, chemistry, safety |\n| College certificate / diploma | 1 to 2 years, often with placement | PSW, dental assistant, pharmacy assistant, HVAC technician, lab technician | biology, measurement, chemistry |\n| On-the-job training | hired first, trained by the employer, WHMIS on day one | warehouse, landscaping, kitchen prep, retail, cleaning | safety, measurement, fair-test troubleshooting |\n\nOntario\'s workplace science credit path (SNC1L/2L → SNC4E) feeds all three. Skilled Trades Ontario lists every trade and whether it is compulsory (licence required).\n\n**Go further:** find out what "Red Seal" means and which of the jobs above carry it. What does it let a worker do?') },
              { title: 'Write this down', visual: '✏️',
                body: lv('**Job profile**\nJob: ______\nHow you get in: ______\nScience task 1: ______\nScience task 2: ______\nScience task 3: ______\nOne safety rule: ______',
                         '**Job profile page**\n- Job:\n- Pathway (apprenticeship / college / on the job):\n- Science task 1 (branch):\n- Science task 2 (branch):\n- Science task 3 (branch):\n- One hazard and its WHMIS symbol:\n- One measurement (tool, unit):\n\nFill it in for the job you choose. This page is the plan for your mini-assignment.',
                         '**Job profile page** with the three Unit 1 skills mapped:\n- Job and pathway\n- Three science tasks with branches\n- One hazard and its pictogram; the PPE it calls for\n- One measurement: tool, unit, what a mistake would cost\n- One fair-test moment: what the worker changes one-at-a-time to troubleshoot\n\nThis page is reused in Unit 2 (Body at Work), Unit 3 (Chemicals on the Job), Unit 4 (Energy Plan) and Unit 5 (space-sector jobs).') },
              { title: 'Do: build your one-pager', visual: '🔄',
                body: lv('Pick a job.\n\nMake a page or 4 slides:\n- the job\n- 3 science things\n- 1 safety rule\n\nUse your notebook pages.',
                         'Choose a job. Build a one-pager or four slides from your profile page: job and pathway, three science tasks, one hazard with its symbol, one measurement with its unit.\n\nUse your notebook: page 1 (branches), page 2 (pictograms), pages 4 and 5 (units and tools), page 7 (fair test).',
                         'Build the one-pager or deck from your profile page. Each of the six parts must be specific to the job (not "uses chemistry" but "mixes developer and colour at a 1:1 ratio by volume").\n\n**Model:** Cook. Pathway: apprenticeship. Tasks: probes chicken to 74 °C (physics, heat); proofs dough with yeast (biology); deglazes a pan (chemistry). Hazard: flame pictogram on the oil spray. Measurement: 250 mL stock in a graduated jug. Fair test: changes one ingredient to fix a flat soup.') },
              { title: 'Connect: Unit 1 done', visual: '🔗',
                body: lv('You can now:\n- read a hazard label\n- measure with a unit\n- run a fair test\n\nNext: Unit 2, living things and your body.\n\nExit quiz: open your notebook.',
                         'Three skills you now have that every employer wants: read a WHMIS label, measure with the right tool and unit, run a fair test. They come back in every unit.\n\nNext: Unit 2, Living Systems (ecosystems, then your body at work).\n\nExit: open-notebook Unit 1 quiz.',
                         'Unit 1 skills: WHMIS literacy (SNC1W A1.5), measurement and recording (SNC2P A1.2, A1.12), tables and graphs (A1.6), the fair test (A1.2 / A1.5), career connections (A2.1). Each returns in the labs of Units 2 to 5 and in the practical final.\n\nNext: Unit 2 opens with a schoolyard ecosystem walk.\n\nExit: open-notebook Unit 1 test.') }
            ] }
        ],

        // ---------------------------------------------------------------
        // Vocabulary → Matching, Memory, Tap & Reveal, Wheel of Fortune
        // ---------------------------------------------------------------
        terms: [
          { term: 'science', def: lv('a way of finding things out', 'a way of finding things out by observing, testing, recording and explaining', 'a systematic way of building knowledge through observation, testing, recording and explanation') },
          { term: 'biology', def: lv('the science of living things', 'the branch of science that studies living things', 'the study of living organisms, from cells to ecosystems') },
          { term: 'chemistry', def: lv('the science of what stuff is made of', 'the branch of science that studies what matter is made of and how it changes', 'the study of the composition, properties and reactions of matter') },
          { term: 'physics', def: lv('the science of energy and electricity', 'the branch of science that studies energy, forces, electricity and light', 'the study of matter, energy and forces, including electricity, light and motion') },
          { term: 'WHMIS', def: lv('the hazard labels used at work in Canada', 'the Workplace Hazardous Materials Information System: Canada\'s system of labels and training for hazardous products', 'Workplace Hazardous Materials Information System, the Canadian law requiring labels, safety data sheets and worker training for hazardous products') },
          { term: 'pictogram', def: lv('a small picture that warns of a danger', 'a symbol on a label that shows a type of hazard', 'a standardized symbol in a red diamond that identifies a hazard class on a WHMIS label') },
          { term: 'flammable', def: lv('can catch fire', 'catches fire easily; the flame pictogram', 'able to ignite easily; shown by the flame pictogram (e.g. gasoline, acetone)') },
          { term: 'corrosive', def: lv('burns skin and eyes', 'burns skin, eyes or metal on contact; the corrosion pictogram', 'able to damage skin, eyes or metal by chemical action; shown by the corrosion pictogram (e.g. drain cleaner)') },
          { term: 'toxic', def: lv('poison', 'can poison you; the skull and crossbones pictogram', 'able to cause serious harm or death if swallowed, inhaled or absorbed; shown by the skull and crossbones') },
          { term: 'hazard', def: lv('something that could hurt you', 'anything that could cause harm, like a wet floor or a sharp blade', 'any source of potential harm, injury or ill health at work') },
          { term: 'PPE', def: lv('safety gear you wear', 'personal protective equipment: goggles, gloves, boots, hard hat', 'personal protective equipment worn to reduce exposure to hazards: eye, hand, foot, head, hearing and breathing protection') },
          { term: 'right to refuse', def: lv('you can say no to unsafe work', 'an Ontario worker\'s right to refuse work they believe is unsafe', 'under the Occupational Health and Safety Act, a worker\'s right to refuse work they have reason to believe is dangerous, without penalty') },
          { term: 'mass', def: lv('how much stuff is in something, in g or kg', 'the amount of matter in an object, measured in grams or kilograms', 'the quantity of matter in an object, measured in g or kg with a scale or balance') },
          { term: 'volume', def: lv('how much space a liquid takes, in mL or L', 'the amount of space something takes up, measured in mL or L', 'the space occupied by a substance, measured in millilitres or litres') },
          { term: 'temperature', def: lv('how hot or cold, in °C', 'how hot or cold something is, measured in degrees Celsius', 'a measure of how hot or cold a substance is, in degrees Celsius; read with a thermometer') },
          { term: 'meniscus', def: lv('the curve on top of water in a tube', 'the curved surface of a liquid in a container; read volume at the bottom of the curve', 'the curved upper surface of a liquid in a narrow container; volume is read at its lowest point, at eye level') },
          { term: 'graduated cylinder', def: lv('a tall tube for measuring liquid', 'a tall marked tube used to measure liquid volume in mL', 'a narrow marked cylinder for measuring liquid volume precisely in millilitres') },
          { term: 'callipers', def: lv('a tool for measuring small round things', 'a tool that measures thickness or diameter very precisely in mm', 'a precision instrument with sliding jaws for measuring thickness, diameter and depth to 0.1 mm') },
          { term: 'unit', def: lv('the word after a number, like cm or g', 'the label that says what a number measures: cm, g, mL, °C', 'a standard quantity used to express a measurement; every recorded value must carry one') },
          { term: 'data table', def: lv('numbers in rows and columns with a title', 'an organized set of measurements with a title, headings and units', 'a structured record of observations with a title, column headings (with units) and one row per item') },
          { term: 'bar graph', def: lv('a picture of numbers using bars', 'a graph that compares amounts using bars of different heights', 'a chart that compares categories using bars, with a title, labelled axes, units and an even scale') },
          { term: 'scale', def: lv('the even steps up the side of a graph', 'the even steps on a graph\'s axis, starting at zero', 'the evenly spaced numbering of a graph axis, chosen to start at zero and reach the largest value') },
          { term: 'fair test', def: lv('a test that changes only one thing', 'an experiment that changes one thing and keeps everything else the same', 'an investigation in which one variable is changed, others are controlled, the result is measured and trials are repeated') },
          { term: 'variable', def: lv('a thing that can change in a test', 'anything in an experiment that can be changed or measured', 'any factor in an investigation that can change: independent (changed), dependent (measured) or controlled (kept the same)') },
          { term: 'average', def: lv('add the numbers, divide by how many', 'the total of the trials divided by the number of trials', 'the mean of repeated trials: sum of values divided by the count, used to smooth out flukes') },
          { term: 'apprenticeship', def: lv('learn a trade while working and getting paid', 'training for a trade that is mostly paid work plus some school', 'a pathway into a skilled trade combining paid on-the-job training (about 80%) with in-school blocks, leading to a Certificate of Qualification') },
          { term: 'OYAP', def: lv('a way to start an apprenticeship in high school', 'the Ontario Youth Apprenticeship Program, which lets students begin an apprenticeship while in high school', 'Ontario Youth Apprenticeship Program: a co-op-based route for secondary students to start registered apprenticeship hours'), levels: [2, 3, 4] },
          { term: 'Red Seal', def: lv('a trade licence good across Canada', 'a certification that lets a tradesperson work in any province', 'an interprovincial standard; a Red Seal endorsement lets a certified tradesperson work anywhere in Canada'), levels: [3, 4] }
        ],

        // ---------------------------------------------------------------
        // Question bank — cat 'L<n> …' feeds each lesson's quiz and the unit test
        // ---------------------------------------------------------------
        questions: [
          // L1
          tf('L1 Science in your day', 'A cook uses science at work.', true),
          mc('L1 Science in your day', 'Which branch of science studies living things?', 'biology', 'a hammer', 'physics', 'Earth and space'),
          mc('L1 Science in your day', 'An electrician testing a wire is mostly using which science?', 'physics', 'a sandwich', 'biology', 'Earth and space'),
          mc('L1 Science in your day', 'A hairstylist mixing colour is using which science?', 'chemistry', 'a bicycle', 'Earth and space', 'biology'),
          fill('L1 Science in your day', 'Science = observe, test, ___, explain.', 'record', ['record', 'guess', 'forget']),
          tf('L1 Science in your day', 'Science only happens in a laboratory.', false, { levels: [3, 4] }),
          tf('L1 Science in your day', 'A mechanic who swaps one part to see if a noise stops is doing science.', true, { levels: [1, 2] }),
          mc('L1 Science in your day', 'Which job uses Earth and space science most?', 'farmer checking the weather', 'a TV remote', 'dental assistant', 'hairstylist'),
          fill('L1 Science in your day', 'The branch of science about energy, electricity and light is ___.', 'physics', ['physics', 'biology', 'chemistry']),
          mc('L1 Science in your day', 'Unit 3 of this course is about which branch?', 'chemistry', 'a lunch box', 'biology', 'physics'),
          { type: 'match', cat: 'L1 Science in your day', prompt: 'Match the branch to what it studies.', pairs: [['biology', 'living things'], ['chemistry', 'what stuff is made of'], ['physics', 'energy and electricity'], ['Earth and space', 'our planet and beyond']] },
          app4('L1 Science in your day', 'A PSW notices a resident\'s skin is cooler than usual and reports it. The science behind that observation is mainly:', 'biology, because body temperature signals health', 'chemistry, because skin is a compound', 'physics, because cold is a force', 'Earth and space, because of the weather'),
          app4('L1 Science in your day', 'A landscaper chooses a shade plant for the north side of a house. Which two branches is she combining?', 'biology and Earth and space', 'chemistry and physics', 'physics only', 'chemistry only'),
          app4('L1 Science in your day', 'Why does this course call science "observe, test, record, explain" instead of "memorize facts"?', 'because workers use science as a process to solve problems, not as a list', 'because facts are never useful at work', 'because recording is the only step that matters', 'because explaining is optional'),

          // L2
          tf('L2 WHMIS', 'The flame pictogram means a product can catch fire.', true),
          mc('L2 WHMIS', 'What does WHMIS stand for?', 'Workplace Hazardous Materials Information System', 'Where Have My Instructions Spread', 'Work Hard, Make It Safe', 'Warning: Harmful Materials In Storage'),
          mc('L2 WHMIS', 'Which pictogram warns that a product burns skin and eyes?', 'corrosion', 'a happy face', 'gas cylinder', 'environment'),
          mc('L2 WHMIS', 'The skull and crossbones means:', 'poison, can be fatal', 'pirate brand', 'irritant', 'gas under pressure'),
          mc('L2 WHMIS', 'How many WHMIS pictograms are there?', '10', '100', '6', '12'),
          fill('L2 WHMIS', 'The gas cylinder pictogram warns of gas under ___.', 'pressure', ['pressure', 'water', 'ice']),
          fill('L2 WHMIS', 'The two signal words on a WHMIS label are "Danger" and "___".', 'Warning', ['Warning', 'Hello', 'Caution']),
          tf('L2 WHMIS', 'In Ontario, employers must train workers on WHMIS before they handle hazardous products.', true),
          tf('L2 WHMIS', 'The exclamation mark pictogram is the most dangerous of all.', false, { levels: [3, 4] }),
          tf('L2 WHMIS', 'The exclamation mark pictogram warns of an irritant.', true, { levels: [1, 2] }),
          mc('L2 WHMIS', 'Which pictogram is used only in Canada?', 'biohazardous infectious materials', 'smiley face', 'flame', 'corrosion'),
          mc('L2 WHMIS', 'Pool chlorine carries the "flame over circle". That means it is an:', 'oxidizer, it feeds fires', 'ice cube', 'irritant', 'explosive'),
          { type: 'match', cat: 'L2 WHMIS', prompt: 'Match the pictogram to its meaning.', pairs: [['flame', 'flammable'], ['corrosion', 'burns skin and eyes'], ['skull and crossbones', 'toxic'], ['gas cylinder', 'gas under pressure'], ['health hazard', 'serious long-term harm'], ['environment', 'harms water life']] },
          app4('L2 WHMIS', 'A new worker finds an unlabelled spray bottle in the custodial closet. Under WHMIS, the correct action is:', 'do not use it; report it so it can be labelled or disposed of', 'sniff it to identify it', 'use it only on floors', 'pour it into a labelled bottle'),
          app4('L2 WHMIS', 'A salon product carries both the flame and the exclamation mark. The stylist should:', 'keep it away from heat sources and avoid skin contact', 'store it beside the dryer', 'assume the two symbols cancel out', 'only read the first symbol'),
          app4('L2 WHMIS', 'Why does the same bleach have a diamond WHMIS pictogram at work but a different symbol at home?', 'consumer products follow a separate labelling law; WHMIS applies in workplaces', 'home bleach is weaker', 'the store removes workplace labels', 'WHMIS symbols are optional at home'),

          // L3
          tf('L3 Safety', 'You should wear goggles whenever something is poured, heated or mixed.', true),
          mc('L3 Safety', 'What should you do right away if you cut yourself in the lab?', 'tell the teacher', 'hide it', 'keep working', 'wash it later'),
          mc('L3 Safety', 'Which is one of a worker\'s three rights in Ontario?', 'the right to refuse unsafe work', 'the right to free lunch', 'the right to skip training', 'the right to remove labels'),
          mc('L3 Safety', 'PPE stands for:', 'personal protective equipment', 'pizza, pop and everything', 'private property entrance', 'proper paper envelope'),
          fill('L3 Safety', 'Walk, never ___, in the lab or shop.', 'run', ['run', 'sing', 'talk']),
          fill('L3 Safety', 'The three worker rights are to know, to participate and to ___.', 'refuse', ['refuse', 'leave', 'sleep']),
          tf('L3 Safety', 'Eating in the science room is fine if you are careful.', false, { levels: [3, 4] }),
          tf('L3 Safety', 'You should not eat or drink in the science room.', true, { levels: [1, 2] }),
          mc('L3 Safety', 'An extension cord across an aisle is a hazard because it could cause a:', 'trip and fall', 'rainbow', 'fire alarm', 'spill'),
          mc('L3 Safety', 'Which age group is injured at work most often in Ontario?', 'young workers, 15 to 24', 'retired workers', 'workers over 50', 'managers'),
          mc('L3 Safety', 'Taping a cord along the wall is which kind of fix?', 'housekeeping', 'a snack', 'PPE', 'first aid'),
          { type: 'match', cat: 'L3 Safety', prompt: 'Match the hazard to the fix.', pairs: [['chemical splash', 'goggles'], ['cord in the aisle', 'tape it along the wall'], ['wet floor', 'sign and mop'], ['unlabelled bottle', 'report it'], ['long hair near flame', 'tie it back']] },
          app4('L3 Safety', 'A supervisor tells a 16-year-old to clean a machine while it is running. The worker\'s best response under Ontario law is:', 'refuse, explain why, and report it; the right to refuse unsafe work protects them', 'do it quickly to avoid trouble', 'quit on the spot', 'ask a co-worker to do it instead'),
          app4('L3 Safety', 'Why is reporting a tiny cut treated the same as reporting a serious one?', 'small incidents reveal hazards before they cause a big injury', 'because paperwork is required for everything', 'so the worker can go home', 'because small cuts always get infected'),
          app4('L3 Safety', 'A kitchen has goggles, a procedure for hot oil and a clean floor. Which three types of control are these?', 'PPE, procedure, housekeeping', 'first aid, training, signage', 'law, rule, habit', 'tool, label, report'),

          // L4
          tf('L4 Length and mass', '100 cm = 1 m.', true),
          mc('L4 Length and mass', 'Which tool measures the length of a room?', 'tape measure', 'a spoon', 'kitchen scale', 'thermometer'),
          mc('L4 Length and mass', 'Mass is measured in:', 'grams and kilograms', 'minutes', 'millilitres', 'degrees'),
          mc('L4 Length and mass', 'How many grams are in a kilogram?', '1000', '2', '100', '10'),
          mc('L4 Length and mass', 'Which tool is best for the thickness of a pencil?', 'callipers', 'a bucket', 'tape measure', 'platform scale'),
          fill('L4 Length and mass', '10 mm = 1 ___.', 'cm', ['cm', 'kg', 'L']),
          fill('L4 Length and mass', 'Every measurement must be written with its ___.', 'unit', ['unit', 'colour', 'name']),
          tf('L4 Length and mass', 'Writing "12" without a unit is a complete measurement.', false, { levels: [3, 4] }),
          tf('L4 Length and mass', 'A measurement needs a number and a unit.', true, { levels: [1, 2] }),
          mc('L4 Length and mass', '"Measure twice, cut once" is a rule used by:', 'carpenters', 'singers', 'PSWs', 'cooks'),
      mc('L4 Length and mass', 'Before weighing, you should ___ the scale.', 'zero (tare)', 'paint', 'drop', 'warm'),
          mc('L4 Length and mass', 'One inch is about how many centimetres?', '2.5', '25', '1', '10', { levels: [3, 4] }),
          { type: 'match', cat: 'L4 Length and mass', prompt: 'Match the tool to what it measures.', pairs: [['tape measure', 'a room'], ['callipers', 'a bolt\'s diameter'], ['kitchen scale', 'flour'], ['platform scale', 'a shipping box'], ['ruler', 'a business card']] },
          app4('L4 Length and mass', 'A flooring installer measures a room as 4.2 m by 3.6 m but orders flooring in square feet. What must she do first?', 'convert metres to feet so the order matches the measurement', 'order the same numbers in feet', 'round both to 4 and 4', 'skip the conversion; the store will fix it'),
          app4('L4 Length and mass', 'A baker\'s scale reads 15 g with an empty bowl on it. If she does not tare it, each batch will be:', '15 g short of flour', '15 g heavy on flour', 'exactly right', 'impossible to make'),
          app4('L4 Length and mass', 'Why does a machinist use callipers instead of a ruler for a bolt?', 'a ruler cannot read to 0.1 mm, and the part must fit precisely', 'rulers are only for wood', 'callipers are cheaper', 'bolts are too heavy for a ruler'),

          // L5
          tf('L5 Volume and temperature', '1000 mL = 1 L.', true),
          mc('L5 Volume and temperature', 'Volume is measured in:', 'millilitres and litres', 'metres', 'grams', 'degrees'),
          mc('L5 Volume and temperature', 'Water boils at:', '100 °C', '1 °C', '37 °C', '74 °C'),
          mc('L5 Volume and temperature', 'Normal body temperature is about:', '37 °C', '100 °C', '0 °C', '74 °C'),
          mc('L5 Volume and temperature', 'Chicken is safe to eat when its inside reaches:', '74 °C', '4 °C', '37 °C', '100 °C'),
          mc('L5 Volume and temperature', 'Where do you read the meniscus?', 'at the bottom of the curve, at eye level', 'from across the room', 'at the top of the curve', 'from above'),
          fill('L5 Volume and temperature', 'Water freezes at ___ °C.', '0', ['0', '100', '37']),
          fill('L5 Volume and temperature', 'A tall marked tube for measuring liquid is a graduated ___.', 'cylinder', ['cylinder', 'cup', 'spoon']),
          tf('L5 Volume and temperature', 'You should read a thermometer the instant it touches the food.', false, { levels: [3, 4] }),
          tf('L5 Volume and temperature', 'You should wait for a thermometer to stop changing before reading it.', true, { levels: [1, 2] }),
          mc('L5 Volume and temperature', 'A fridge should be kept at or below:', '4 °C', '40 °C', '20 °C', '0 °C', { levels: [2, 3, 4] }),
          mc('L5 Volume and temperature', 'Which worker uses a probe thermometer every day?', 'a cook', 'a singer', 'a carpenter', 'an electrician'),
          { type: 'match', cat: 'L5 Volume and temperature', prompt: 'Match the temperature to what it means.', pairs: [['0 °C', 'water freezes'], ['37 °C', 'normal body'], ['74 °C', 'safe cooked chicken'], ['100 °C', 'water boils'], ['4 °C', 'fridge limit']] },
          app4('L5 Volume and temperature', 'A PSW records 38.6 °C for a resident. The right next step is:', 'report it; 38 °C or above is a fever', 'record it and move on', 'open a window', 'take it again next week'),
          app4('L5 Volume and temperature', 'A pool technician needs 50 mL of chemical per 1000 L. For a 20 000 L pool she needs:', '1000 mL (1 L)', '50 mL', '100 mL', '20 L'),
          app4('L5 Volume and temperature', 'A recipe from a US website says bake at 350 °F. Why can\'t the cook set a Celsius oven to 350?', '350 °F is about 175 °C; the scales are different', 'the oven will not go that high', 'Fahrenheit is only for candy', 'the recipe is wrong'),

          // L6
          tf('L6 Tables and graphs', 'A bar graph needs a title.', true),
          mc('L6 Tables and graphs', 'Which part of a table says what the numbers mean?', 'the headings with units', 'the colour', 'the pencil', 'the page number'),
          mc('L6 Tables and graphs', 'A good graph scale starts at:', '0', '7', 'the biggest number', 'any number you like'),
          mc('L6 Tables and graphs', 'On a bar graph of object masses, the y-axis should be labelled:', 'Mass (g)', 'Fun', 'Object', 'Title'),
          mc('L6 Tables and graphs', 'Which scale is even?', '0, 50, 100, 150', '0, 50, 75, 300', '0, 10, 100, 1000', '5, 6, 10, 20'),
          fill('L6 Tables and graphs', 'A bar graph compares amounts using ___ of different heights.', 'bars', ['bars', 'words', 'lines']),
          fill('L6 Tables and graphs', 'In a table, each thing you measured gets its own ___.', 'row', ['row', 'colour', 'title']),
          tf('L6 Tables and graphs', 'A graph scale that starts above zero can make small differences look big.', true, { levels: [3, 4] }),
          tf('L6 Tables and graphs', 'Bars in a bar graph should be the same width.', true, { levels: [1, 2] }),
          mc('L6 Tables and graphs', 'Which job reads a stock-level bar graph?', 'warehouse worker', 'lifeguard', 'hairstylist', 'welder'),
          mc('L6 Tables and graphs', 'A nurse charting a patient\'s temperature every hour would best use a:', 'line graph', 'pie of pizza', 'bar graph', 'table only', { levels: [3, 4] }),
          { type: 'match', cat: 'L6 Tables and graphs', prompt: 'Match the graph part to its job.', pairs: [['title', 'says what was measured'], ['x-axis', 'names the things'], ['y-axis', 'shows the numbers with a unit'], ['scale', 'even steps from zero'], ['bar', 'one per thing measured']] },
          app4('L6 Tables and graphs', 'A sales chart shows bars for $980, $1 000 and $1 020 on a scale from $970 to $1 030. The bars look very different. The problem is:', 'the scale does not start at zero, exaggerating a 4% difference', 'the bars are the wrong colour', 'sales cannot be graphed', 'there are too few bars'),
          app4('L6 Tables and graphs', 'A warehouse supervisor sees one product\'s bar dropping week after week on the inventory graph. The decision the graph supports is:', 'reorder before it runs out', 'stop selling it', 'change the graph colours', 'ignore it until zero'),
          app4('L6 Tables and graphs', 'Why does the course make every lab use the same table and graph template?', 'so students practise one format until it is automatic, like a job form', 'because there is only one kind of graph', 'to save paper', 'so the teacher can mark faster'),

          // L7
          tf('L7 Fair test', 'A fair test changes only one thing.', true),
          mc('L7 Fair test', 'In the helicopter test, what did we change?', 'wing length', 'the weather', 'the paper colour', 'the drop height'),
          mc('L7 Fair test', 'In the helicopter test, what did we measure?', 'fall time', 'the smell', 'wing colour', 'the paperclip'),
          mc('L7 Fair test', 'Why repeat a test three times?', 'one try can be a fluke', 'to use more paper', 'because three is lucky', 'to make it harder'),
          mc('L7 Fair test', 'The thing you change in a fair test is the ___ variable.', 'independent', 'invisible', 'dependent', 'controlled'),
          mc('L7 Fair test', 'The thing you measure in a fair test is the ___ variable.', 'dependent', 'delicious', 'independent', 'controlled'),
          fill('L7 Fair test', 'Keep everything else the ___.', 'same', ['same', 'different', 'blue']),
          fill('L7 Fair test', 'Add the trials and divide by how many to get the ___.', 'average', ['average', 'answer', 'total']),
          tf('L7 Fair test', 'Changing two things at once makes a test more useful.', false, { levels: [3, 4] }),
          tf('L7 Fair test', 'A mechanic who swaps one part at a time is running a fair test.', true, { levels: [1, 2] }),
          mc('L7 Fair test', 'Short wings: 1.8, 1.6, 1.7 s. The average is:', '1.7 s', '5.1 s', '1.8 s', '1.6 s', { levels: [2, 3, 4] }),
          mc('L7 Fair test', 'Which of these was a controlled variable in the helicopter test?', 'drop height', 'wing length', 'fall time', 'the average'),
          { type: 'match', cat: 'L7 Fair test', prompt: 'Match the variable to the helicopter test.', pairs: [['independent', 'wing length'], ['dependent', 'fall time'], ['controlled', 'drop height'], ['trials', 'three drops']] },
          app4('L7 Fair test', 'A baker\'s bread is flat. She changes the yeast brand AND the oven temperature, and the next loaf rises. What does she know?', 'nothing certain; two variables changed, so either could be the cause', 'the yeast was the problem', 'the oven was the problem', 'both were the problem'),
          app4('L7 Fair test', 'A technician testing why a furnace short-cycles checks the filter first, then the thermostat, then the sensor, one at a time. This is a fair test because:', 'each change is isolated so the fix can be identified', 'it takes longer', 'three parts were checked', 'the filter is usually the cause'),
          app4('L7 Fair test', 'Trial times for the long wings were 2.4, 2.6 and 4.9 s. A careful student would:', 'repeat the test; the 4.9 s drop was probably a fluke (a draft or bad release)', 'use 4.9 s as the result', 'average all three without comment', 'delete the 4.9 s and say nothing'),

          // L8
          tf('L8 A day in the job', 'An apprentice earns money while learning a trade.', true),
          mc('L8 A day in the job', 'OYAP lets students start which pathway in high school?', 'apprenticeship', 'retirement', 'university', 'the military'),
          mc('L8 A day in the job', 'Which job is usually entered through an apprenticeship?', 'electrician', 'astronaut', 'PSW', 'warehouse worker'),
          mc('L8 A day in the job', 'Which job is usually entered through a college certificate?', 'PSW', 'rock star', 'plumber', 'landscaper'),
          mc('L8 A day in the job', 'Which happens on day one of almost every job in Ontario?', 'WHMIS and safety training', 'a party', 'a pay raise', 'a vacation'),
          fill('L8 A day in the job', 'An apprenticeship is mostly paid ___ plus school blocks.', 'work', ['work', 'rest', 'travel']),
          fill('L8 A day in the job', 'A ___ Seal lets a tradesperson work anywhere in Canada.', 'Red', ['Red', 'Gold', 'Blue'], { levels: [3, 4] }),
          tf('L8 A day in the job', 'A cook probing chicken to 74 °C is using science.', true, { levels: [1, 2] }),
          tf('L8 A day in the job', 'Only jobs that need university use science.', false, { levels: [3, 4] }),
          mc('L8 A day in the job', 'Which Unit 1 skill does a custodian use when reading a cleaner\'s label?', 'WHMIS', 'graphing', 'callipers', 'averaging'),
          mc('L8 A day in the job', 'Which Unit 1 skill does a mechanic use to find a rattle?', 'the fair test', 'the meniscus', 'WHMIS', 'the bar graph'),
          { type: 'match', cat: 'L8 A day in the job', prompt: 'Match the job to its usual pathway.', pairs: [['electrician', 'apprenticeship'], ['PSW', 'college certificate'], ['warehouse worker', 'on-the-job training'], ['hairstylist', 'apprenticeship']] },
          app4('L8 A day in the job', 'Two students profile a cook and a PSW. Which comparison is best supported by Unit 1?', 'both use measurement daily; the PSW\'s readings are reported to a nurse, the cook\'s to a health inspector', 'only the cook uses science', 'only the PSW follows safety rules', 'neither needs a fair test'),
          app4('L8 A day in the job', 'A student wants to be an HVAC technician. Which Unit 1 skills will the first month on the job use most?', 'temperature measurement, WHMIS (refrigerants) and fair-test troubleshooting', 'graphing only', 'none; HVAC is learned later', 'reading labels only'),
          app4('L8 A day in the job', 'Why does the course path SNC1L/2L → SNC4E matter for an apprenticeship?', 'it provides the compulsory science credits while building the safety and measurement skills employers expect', 'apprenticeships require university science', 'it replaces WHMIS training', 'it is required only for college')
        ]
      }
    ]
  };

  window.LearnHub.courses.push(course);

  // ---------------------------------------------------------------------
  // Colouring page · Unit 1: a toolbox with tools (original line art)
  // ---------------------------------------------------------------------
  window.LearnHub.colouring = window.LearnHub.colouring || {};
  (window.LearnHub.colouring['snc1l2l/work'] = window.LearnHub.colouring['snc1l2l/work'] || []).push({
    title: 'Toolbox and safety gear',
    svg: '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" fill="#fff" stroke="#000" stroke-width="3" stroke-linejoin="round">' +
      '<rect class="region" x="60" y="150" width="280" height="110" rx="8"/>' +
      '<rect class="region" x="60" y="130" width="280" height="24" rx="6"/>' +
      '<path class="region" d="M150 130 v-28 a50 28 0 0 1 100 0 v28 z"/>' +
      '<rect class="region" x="90" y="170" width="60" height="70" rx="4"/>' +
      '<rect class="region" x="170" y="170" width="60" height="70" rx="4"/>' +
      '<rect class="region" x="250" y="170" width="60" height="70" rx="4"/>' +
      '<path class="region" d="M20 60 h60 v18 h-60 z"/>' +
      '<path class="region" d="M80 62 l30 -14 v42 l-30 -14 z"/>' +
      '<circle class="region" cx="340" cy="60" r="28"/>' +
      '<circle class="region" cx="340" cy="60" r="12"/>' +
      '<path class="region" d="M300 250 a20 20 0 0 1 40 0 a20 20 0 0 1 40 0 l0 12 l-80 0 z"/>' +
      '<path class="region" d="M20 220 l0 -40 a30 30 0 0 1 60 0 l0 40 z"/>' +
      '<rect class="region" x="12" y="220" width="76" height="12" rx="3"/>' +
      '</svg>'
  });
})();
