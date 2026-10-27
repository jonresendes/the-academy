/* =========================================================
   Science — Living Things & Matter
   ========================================================= */
window.LearnHub = window.LearnHub || { courses: [] };
window.LearnHub.courses.push({
  id: 'science',
  title: 'Science',
  subtitle: 'Living Things & Matter',
  description: 'How the natural world works — from tiny cells to the states of matter.',
  icon: '🔬',
  color: '#0b8a7a',

  awards: {
    study:        { icon: '🔬', name: 'Observer: {unit}',           desc: 'Read every slide in the {unit} Study Room.' },
    testPass:     { icon: '🧪', name: 'Lab Technician: {unit}',     desc: 'Score 70% or more on the {unit} test.' },
    testPerfect:  { icon: '⚗️', name: 'Flawless Experiment: {unit}', desc: 'Score 100% on the {unit} test.' },
    games3:       { icon: '🧫', name: 'Field Researcher: {unit}',   desc: 'Finish 3 different games in {unit}.' },
    allGames:     { icon: '🎖️', name: 'Chief Scientist: {unit}',    desc: 'Finish every game in {unit}.' },
    unitMedal:    { icon: '🏅', name: 'Medal of Discovery: {unit}', desc: 'Finish the Study Room, pass the test and complete 3 games in {unit}.' },
    courseTrophy: { icon: '🏆', name: 'Nobel Explorer',             desc: 'Earn the Medal of Discovery for every unit in Science.' }
  },

  units: [
    {
      id: 'cells',
      title: 'Cells',
      description: { 1: 'The tiny building blocks of all living things.', 2: 'What cells are, what they contain and why they matter.', 3: 'Cell theory, organelles and the differences between plant and animal cells.' },
      lessons: [
        {
          title: 'What is a cell?',
          slides: [
            { title: 'Building blocks of life', visual: '🧱', body: { 1: 'All living things are made of **cells**.\n\nCells are **very, very small**. You need a microscope to see them.', 2: 'A **cell** is the smallest unit of life. Every living thing — from a blade of grass to a blue whale — is made of cells. Most are far too small to see without a **microscope**.', 3: '**Cell theory** states that all living organisms are composed of cells, the cell is the basic unit of life, and all cells arise from pre-existing cells. Cells range from single-celled bacteria to the roughly 37 trillion cells in a human body.' } },
            { title: 'Parts of a cell', visual: '🔬', body: { 1: 'A cell has parts:\n\n- the **membrane** is the skin around the cell\n- the **nucleus** is the boss\n- the **cytoplasm** is the jelly inside', 2: 'Important parts of a cell:\n\n- **Cell membrane** — the outer layer that controls what goes in and out\n- **Nucleus** — the control centre that holds the DNA\n- **Cytoplasm** — the jelly-like fluid where the parts float\n- **Mitochondria** — release energy for the cell', 3: 'Key **organelles** and structures:\n\n- **Cell membrane** — a selectively permeable phospholipid bilayer\n- **Nucleus** — stores DNA and directs cell activity\n- **Cytoplasm** — the fluid in which organelles are suspended\n- **Mitochondria** — site of cellular respiration, releasing energy from glucose\n- **Ribosomes** — assemble proteins' } },
            { title: 'Plant vs animal cells', visual: '🌱', body: { 1: 'Plant cells have two extra parts:\n\n- a **cell wall** (a hard outside)\n- **chloroplasts** (they make food from sunlight)', 2: 'Plant cells have everything animal cells have, plus:\n\n- a **cell wall** for support\n- **chloroplasts** that capture sunlight to make food\n- a large **vacuole** that stores water', 3: 'Plant cells differ from animal cells in three major ways: a rigid cellulose **cell wall** outside the membrane, **chloroplasts** containing chlorophyll for photosynthesis, and a large central **vacuole** that maintains turgor pressure. Animal cells have small, temporary vacuoles and no wall, which allows a wider variety of shapes.' } }
          ]
        }
      ],
      terms: [
        { term: 'cell',         def: { 1: 'the tiny building block of living things', 2: 'the smallest unit of life', 3: 'the basic structural and functional unit of life' } },
        { term: 'nucleus',      def: { 1: 'the boss of the cell', 2: 'the control centre of the cell', 3: 'the organelle that stores DNA and directs the cell' } },
        { term: 'membrane',     def: { 1: 'the skin around a cell', 2: 'the outer layer that controls what enters and leaves', 3: 'the selectively permeable boundary of the cell' } },
        { term: 'cytoplasm',    def: { 1: 'the jelly inside a cell', 2: 'the jelly-like fluid inside a cell', 3: 'the fluid in which organelles are suspended' } },
        { term: 'chloroplast',  def: { 1: 'makes food from sunlight', 2: 'the part of a plant cell that makes food from sunlight', 3: 'the organelle where photosynthesis occurs' } },
        { term: 'cell wall',    def: { 1: 'the hard outside of a plant cell', 2: 'the stiff layer that supports a plant cell', 3: 'the rigid cellulose layer outside a plant cell membrane' } },
        { term: 'mitochondria', def: { 2: 'the parts that release energy', 3: 'organelles that release energy by cellular respiration' }, levels: [2, 3] },
        { term: 'vacuole',      def: { 2: 'a storage space for water', 3: 'a membrane-bound sac storing water and nutrients' }, levels: [2, 3] },
        { term: 'microscope',   def: { 1: 'a tool to see tiny things', 2: 'a tool that makes tiny things look bigger', 3: 'an instrument that magnifies objects too small for the eye' } }
      ],
      questions: [
        { type: 'mc', cat: 'Cell basics', prompt: { 1: 'What are all living things made of?', 2: 'What is the smallest unit of life?', 3: 'According to cell theory, what is the basic unit of life?' }, answer: 'cells', options: { 1: ['cells', 'rocks'], 2: ['cells', 'atoms', 'bones'], 3: ['cells', 'atoms', 'organs', 'molecules'] } },
        { type: 'mc', cat: 'Cell parts', prompt: { 1: 'Which part is the boss of the cell?', 2: 'Which part is the control centre of the cell?', 3: 'Which organelle stores the cell\'s DNA?' }, answer: 'nucleus', options: { 1: ['nucleus', 'leaf'], 2: ['nucleus', 'membrane', 'cytoplasm'], 3: ['nucleus', 'membrane', 'cytoplasm', 'ribosome'] } },
        { type: 'mc', cat: 'Cell parts', prompt: { 1: 'What tool do you use to see cells?', 2: 'Which tool lets you see cells?', 3: 'Which instrument is used to observe cells?' }, answer: 'microscope', options: { 1: ['microscope', 'spoon'], 2: ['microscope', 'telescope', 'thermometer'], 3: ['microscope', 'telescope', 'thermometer', 'barometer'] } },
        { type: 'mc', cat: 'Plant cells', prompt: { 1: 'Which part makes food from sunlight?', 2: 'Which part of a plant cell makes food from sunlight?', 3: 'In which organelle does photosynthesis take place?' }, answer: 'chloroplast', options: { 1: ['chloroplast', 'nose'], 2: ['chloroplast', 'nucleus', 'membrane'], 3: ['chloroplast', 'nucleus', 'mitochondria', 'vacuole'] } },
        { type: 'tf', cat: 'Cell basics', prompt: 'Cells are too small to see without a microscope.', answer: true },
        { type: 'tf', cat: 'Plant cells', prompt: { 1: 'Plant cells have a cell wall.', 2: 'Animal cells have a cell wall.', 3: 'Animal cells have a cell wall.' }, answer: true, levels: [1] },
        { type: 'tf', cat: 'Plant cells', prompt: 'Animal cells have a cell wall.', answer: false, levels: [2, 3] },
        { type: 'tf', cat: 'Cell parts', prompt: { 2: 'Mitochondria release energy for the cell.', 3: 'Mitochondria are the site of cellular respiration.' }, answer: true, levels: [2, 3] },
        { type: 'fill', cat: 'Cell parts', prompt: 'The ___ is the jelly-like fluid inside a cell.', answer: 'cytoplasm', bank: ['cytoplasm', 'nucleus', 'wall', 'water'] },
        { type: 'fill', cat: 'Plant cells', prompt: 'A plant cell stores water in a large ___.', answer: 'vacuole', bank: ['vacuole', 'nucleus', 'ribosome', 'bucket'], levels: [2, 3] },
        { type: 'match', prompt: 'Match each cell part to its job.', pairs: [['nucleus', 'control centre'], ['membrane', 'controls what goes in and out'], ['cytoplasm', 'jelly-like fluid'], ['chloroplast', 'makes food from sunlight'], ['mitochondria', 'releases energy'], ['cell wall', 'supports a plant cell']] }
      ]
    },

    {
      id: 'states-of-matter',
      title: 'States of Matter',
      description: { 1: 'Solids, liquids and gases.', 2: 'The three states of matter and how they change.', 3: 'Particle theory, phase changes and the energy behind them.' },
      lessons: [
        {
          title: 'Solid, liquid, gas',
          slides: [
            { title: 'Three states', visual: '🧊', body: { 1: 'Matter is everything around us.\n\nIt comes in three states:\n\n- **solid** — like ice\n- **liquid** — like water\n- **gas** — like steam', 2: '**Matter** is anything that has mass and takes up space. It exists in three common states:\n\n- **Solid** — keeps its shape (ice, rock)\n- **Liquid** — takes the shape of its container (water, juice)\n- **Gas** — spreads out to fill any space (steam, air)', 3: '**Matter** is anything with mass and volume. The **particle theory** explains its states: all matter is made of tiny particles in constant motion, and the strength of attraction between them determines the state.\n\n- **Solid**: particles vibrate in fixed positions — definite shape and volume\n- **Liquid**: particles slide past each other — definite volume, variable shape\n- **Gas**: particles move freely and rapidly — no fixed shape or volume' } },
            { title: 'Changing state', visual: '🔥', body: { 1: 'Heat changes matter!\n\n- Ice **melts** into water.\n- Water **boils** into steam.\n- Cold makes water **freeze** into ice.', 2: 'Adding or removing heat changes the state of matter:\n\n- **Melting**: solid → liquid\n- **Freezing**: liquid → solid\n- **Evaporation / boiling**: liquid → gas\n- **Condensation**: gas → liquid', 3: '**Phase changes** happen when thermal energy alters particle motion:\n\n- **Melting** (solid → liquid) and **freezing** (liquid → solid) occur at the melting point\n- **Vaporisation** (liquid → gas) and **condensation** (gas → liquid) occur at the boiling point\n- **Sublimation** (solid → gas) skips the liquid phase, as with dry ice\n\nDuring a phase change the temperature stays constant while energy breaks or forms attractions between particles.' } }
          ]
        }
      ],
      terms: [
        { term: 'solid',        def: { 1: 'keeps its shape, like ice', 2: 'matter that keeps its own shape', 3: 'a state with definite shape and volume' } },
        { term: 'liquid',       def: { 1: 'flows, like water', 2: 'matter that takes the shape of its container', 3: 'a state with definite volume but no fixed shape' } },
        { term: 'gas',          def: { 1: 'spreads out, like steam', 2: 'matter that spreads to fill any space', 3: 'a state with neither fixed shape nor volume' } },
        { term: 'melting',      def: { 1: 'solid turning into liquid', 2: 'a solid changing to a liquid', 3: 'the phase change from solid to liquid' } },
        { term: 'freezing',     def: { 1: 'liquid turning into solid', 2: 'a liquid changing to a solid', 3: 'the phase change from liquid to solid' } },
        { term: 'evaporation',  def: { 1: 'liquid turning into gas', 2: 'a liquid changing to a gas', 3: 'vaporisation from the surface of a liquid' } },
        { term: 'condensation', def: { 2: 'a gas changing to a liquid', 3: 'the phase change from gas to liquid' }, levels: [2, 3] },
        { term: 'sublimation',  def: { 3: 'the phase change from solid directly to gas' }, levels: [3] },
        { term: 'matter',       def: { 1: 'everything around us', 2: 'anything that has mass and takes up space', 3: 'anything that has mass and volume' } }
      ],
      questions: [
        { type: 'mc', cat: 'States', prompt: 'Ice is a…', answer: 'solid', options: { 1: ['solid', 'gas'], 2: ['solid', 'liquid', 'gas'] } },
        { type: 'mc', cat: 'States', prompt: 'Steam is a…', answer: 'gas', options: { 1: ['gas', 'solid'], 2: ['gas', 'solid', 'liquid'] } },
        { type: 'mc', cat: 'Changes', prompt: { 1: 'When ice turns into water, it is…', 2: 'A solid changing to a liquid is called…', 3: 'The phase change from solid to liquid is…' }, answer: 'melting', options: { 1: ['melting', 'flying'], 2: ['melting', 'freezing', 'boiling'], 3: ['melting', 'freezing', 'condensation', 'sublimation'] } },
        { type: 'mc', cat: 'Changes', prompt: { 1: 'When water turns into ice, it is…', 2: 'A liquid changing to a solid is called…', 3: 'The phase change from liquid to solid is…' }, answer: 'freezing', options: { 1: ['freezing', 'singing'], 2: ['freezing', 'melting', 'evaporation'], 3: ['freezing', 'melting', 'evaporation', 'condensation'] } },
        { type: 'mc', cat: 'Changes', prompt: { 2: 'A gas changing to a liquid is called…', 3: 'Water droplets forming on a cold glass is an example of…' }, answer: 'condensation', options: { 2: ['condensation', 'melting', 'freezing'], 3: ['condensation', 'evaporation', 'sublimation', 'melting'] }, levels: [2, 3] },
        { type: 'tf', cat: 'States', prompt: { 1: 'A liquid can flow.', 2: 'A liquid takes the shape of its container.', 3: 'A gas has a definite volume.' }, answer: true, levels: [1, 2] },
        { type: 'tf', cat: 'States', prompt: 'A gas has a definite volume.', answer: false, levels: [3] },
        { type: 'tf', cat: 'Changes', prompt: { 1: 'Heat makes ice melt.', 2: 'Adding heat can change a solid into a liquid.', 3: 'Temperature rises steadily during a phase change.' }, answer: true, levels: [1, 2] },
        { type: 'tf', cat: 'Changes', prompt: 'Temperature rises steadily during a phase change.', answer: false, levels: [3] },
        { type: 'fill', cat: 'Changes', prompt: 'Water turns into steam when it ___.', answer: 'boils', bank: ['boils', 'freezes', 'sleeps', 'melts'] },
        { type: 'fill', cat: 'States', prompt: 'Anything that has mass and takes up space is called ___.', answer: 'matter', bank: ['matter', 'energy', 'air', 'light'], levels: [2, 3] },
        { type: 'fill', cat: 'Changes', prompt: 'Dry ice turning straight into gas is an example of ___.', answer: 'sublimation', bank: ['sublimation', 'condensation', 'melting', 'freezing'], levels: [3] },
        { type: 'match', prompt: 'Match each change to what it means.', pairs: [['melting', 'solid to liquid'], ['freezing', 'liquid to solid'], ['evaporation', 'liquid to gas'], ['condensation', 'gas to liquid'], ['sublimation', 'solid to gas']] }
      ]
    }
  ]
});
