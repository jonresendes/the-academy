/* =========================================================
   games.js — the Game Room
   Each game gets { course, unit, level, host, finish(result) }.
   finish() records completion, awards badges and shows a
   result card. Games scale with the difficulty level.
   ========================================================= */
(function () {
  const { L, esc, shuffle, sample, termsFor, choicePool, normalize, speakBtn, questionsFor } = window.LH;

  /* ---------- shared widgets ---------- */

  /** Render a choice question into host; calls done(correct) after feedback. */
  function askChoice(host, q, done, opts) {
    opts = opts || {};
    const big = Settings.level === 1 || q.options.length <= 2;
    host.innerHTML =
      '<div class="q-prompt">' + esc(q.prompt) + ' ' + speakBtn(q.prompt) + '</div>' +
      '<div class="options' + (q.options.length > 2 && !big ? '' : '') + '">' +
      q.options.map(o => '<button class="option' + (big ? ' big' : '') + '" data-v="' + esc(o) + '">' + esc(o) + '</button>').join('') +
      '</div><div class="q-feedback"></div>';
    const answerText = q.type === 'tf' ? (q.answer ? 'True' : 'False') : String(q.answer);
    host.querySelectorAll('.option').forEach(btn => {
      btn.addEventListener('click', () => {
        const correct = btn.dataset.v === answerText;
        host.querySelectorAll('.option').forEach(b => { b.disabled = true; if (b.dataset.v === answerText) b.classList.add('correct'); });
        if (!correct) btn.classList.add('wrong');
        host.querySelector('.q-feedback').innerHTML = '<div class="feedback ' + (correct ? 'ok' : 'bad') + '">' +
          (correct ? '🎉 Correct!' : '👉 The answer is: ' + esc(answerText)) + '</div>';
        setTimeout(() => done(correct), opts.delay !== undefined ? opts.delay : (correct ? 900 : 1800));
      });
    });
    return host;
  }

  function resultCard(host, title, lines, ctx, extra) {
    host.innerHTML =
      '<div class="card result-card"><div class="card-icon">🎊</div><h2>' + esc(title) + '</h2>' +
      lines.map(l => '<p class="muted">' + l + '</p>').join('') +
      '<div class="btn-row" style="justify-content:center;margin-top:1rem">' +
      '<button class="btn" id="againBtn">Play again</button>' +
      '<a class="btn secondary" href="#/games/' + ctx.course.id + '/' + ctx.unit.id + '">Back to Game Room</a>' +
      (extra || '') + '</div></div>';
    host.querySelector('#againBtn').addEventListener('click', () => ctx.replay());
  }

  /* ---------- 1. Matching ---------- */
  const matching = {
    id: 'matching', name: 'Matching', icon: '🔗', gentle: true,
    desc: 'Tap a word, then tap its meaning.',
    canPlay: (c, u) => termsFor(u).length >= 2,
    render(ctx) {
      const n = ctx.level === 1 ? 3 : ctx.level === 2 ? 5 : 8;
      const pairs = sample(termsFor(ctx.unit), n);
      renderMatchBoard(ctx.host, pairs.map(p => [p.term, p.def]), (mistakes) => {
        resultCard(ctx.host, 'All matched!', ['You paired ' + pairs.length + ' terms' + (mistakes ? ' with ' + mistakes + ' slip' + (mistakes > 1 ? 's' : '') : ' with no mistakes') + '.'], ctx);
        ctx.finish({ score: Math.max(0, pairs.length - mistakes), max: pairs.length });
      });
    }
  };

  /** Generic two-column matching board. done(mistakes) when all paired. */
  function renderMatchBoard(host, pairs, done) {
    const left = shuffle(pairs.map((p, i) => ({ i, t: p[0] })));
    const right = shuffle(pairs.map((p, i) => ({ i, t: p[1] })));
    host.innerHTML = '<p class="muted small">Tap an item on the left, then its match on the right.</p>' +
      '<div class="match-grid"><div class="match-col">' +
      left.map(x => '<button class="match-item" data-side="l" data-i="' + x.i + '">' + esc(x.t) + '</button>').join('') +
      '</div><div class="match-col">' +
      right.map(x => '<button class="match-item" data-side="r" data-i="' + x.i + '">' + esc(x.t) + '</button>').join('') +
      '</div></div>';
    let sel = { l: null, r: null }, paired = 0, mistakes = 0;
    host.querySelectorAll('.match-item').forEach(btn => btn.addEventListener('click', () => {
      if (btn.classList.contains('paired')) return;
      const side = btn.dataset.side;
      host.querySelectorAll('.match-item[data-side="' + side + '"]').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected'); sel[side] = btn;
      if (sel.l && sel.r) {
        if (sel.l.dataset.i === sel.r.dataset.i) {
          sel.l.classList.add('paired'); sel.r.classList.add('paired');
          sel.l.classList.remove('selected'); sel.r.classList.remove('selected');
          paired++;
          if (paired === pairs.length) setTimeout(() => done(mistakes), 500);
        } else {
          mistakes++;
          sel.l.classList.add('shake'); sel.r.classList.add('shake');
          const a = sel.l, b = sel.r;
          setTimeout(() => { a.classList.remove('shake', 'selected'); b.classList.remove('shake', 'selected'); }, 400);
        }
        sel = { l: null, r: null };
      }
    }));
  }

  /* ---------- 2. Memory ---------- */
  const memory = {
    id: 'memory', name: 'Memory', icon: '🧠', gentle: true,
    desc: 'Flip cards to find each word and its meaning.',
    canPlay: (c, u) => termsFor(u).length >= 2,
    render(ctx) {
      const n = ctx.level === 1 ? 3 : ctx.level === 2 ? 5 : 8;
      const pairs = sample(termsFor(ctx.unit), n);
      const cards = shuffle(pairs.flatMap((p, i) => [{ i, t: p.term }, { i, t: p.def }]));
      ctx.host.innerHTML = '<div class="game-head"><span class="muted">Moves: <strong id="moves">0</strong></span></div>' +
        '<div class="memory-grid">' + cards.map((c, k) =>
          '<button class="mem-card" data-i="' + c.i + '" data-k="' + k + '"><div class="inner"><div class="face front">?</div><div class="face back">' + esc(c.t) + '</div></div></button>').join('') + '</div>';
      let open = [], lock = false, moves = 0, found = 0;
      ctx.host.querySelectorAll('.mem-card').forEach(card => card.addEventListener('click', () => {
        if (lock || card.classList.contains('flipped')) return;
        card.classList.add('flipped'); open.push(card);
        if (open.length === 2) {
          moves++; ctx.host.querySelector('#moves').textContent = moves;
          if (open[0].dataset.i === open[1].dataset.i) {
            open.forEach(c => c.classList.add('matched')); open = []; found++;
            if (found === pairs.length) setTimeout(() => {
              resultCard(ctx.host, 'You found them all!', ['Finished in ' + moves + ' moves.'], ctx);
              ctx.finish({ score: moves, max: pairs.length });
            }, 600);
          } else {
            lock = true;
            setTimeout(() => { open.forEach(c => c.classList.remove('flipped')); open = []; lock = false; }, 1100);
          }
        }
      }));
    }
  };

  /* ---------- 3. Tap & Reveal ---------- */
  const reveal = {
    id: 'reveal', name: 'Tap & Reveal', icon: '👆', gentle: true,
    desc: 'Tap each tile to reveal what the word means. No wrong answers!',
    canPlay: (c, u) => termsFor(u).length >= 1,
    render(ctx) {
      const terms = ctx.level === 1 ? termsFor(ctx.unit).slice(0, 6) : termsFor(ctx.unit);
      ctx.host.innerHTML = '<p class="muted small">Tap every tile to finish.</p><div class="reveal-grid">' +
        terms.map((t, i) => '<button class="reveal-tile" data-i="' + i + '"><span>' + esc(t.term) + '</span><span class="reveal-def"></span></button>').join('') + '</div>';
      let opened = 0;
      ctx.host.querySelectorAll('.reveal-tile').forEach(tile => tile.addEventListener('click', () => {
        const t = terms[+tile.dataset.i];
        if (!tile.classList.contains('open')) {
          tile.classList.add('open'); tile.querySelector('.reveal-def').textContent = t.def; opened++;
          if (Settings.get('readAloud')) window.LH.speak(t.term + '. ' + t.def);
          if (opened === terms.length) setTimeout(() => {
            resultCard(ctx.host, 'Every tile revealed!', ['You explored ' + terms.length + ' words.'], ctx);
            ctx.finish({ score: terms.length, max: terms.length });
          }, 1200);
        } else if (Settings.get('readAloud')) window.LH.speak(t.term + '. ' + t.def);
      }));
    }
  };

  /* ---------- 4. Fill in the Blanks ---------- */
  const fill = {
    id: 'fill', name: 'Fill in the Blanks', icon: '✏️', gentle: true,
    desc: 'Choose the missing word to complete each sentence.',
    canPlay: (c, u) => questionsFor(u, 2, ['fill']).length >= 1 || termsFor(u).length >= 2,
    render(ctx) {
      let items = questionsFor(ctx.unit, ctx.level, ['fill']);
      if (items.length < 3) {
        // build from terms: definition with the term as the blank
        const terms = termsFor(ctx.unit);
        items = items.concat(terms.map(t => {
          const bank = [t.term].concat(sample(terms.filter(x => x.term !== t.term).map(x => x.term), ctx.level === 1 ? 1 : 3));
          return { type: 'fill', prompt: t.def + ' → ___', answer: t.term, bank: shuffle(bank), freeType: ctx.level === 3 };
        }));
      }
      const count = ctx.level === 1 ? 4 : ctx.level === 2 ? 6 : 8;
      items = sample(items, count);
      let i = 0, score = 0;
      const next = () => {
        if (i >= items.length) {
          resultCard(ctx.host, 'Blanks filled!', ['You got ' + score + ' of ' + items.length + ' right.'], ctx);
          return ctx.finish({ score, max: items.length });
        }
        ctx.host.innerHTML = '<div class="score-bar"><span>Question ' + (i + 1) + ' of ' + items.length + '</span><span>Score: ' + score + '</span></div><div class="q-host"></div>';
        renderFill(ctx.host.querySelector('.q-host'), items[i], ok => { if (ok) score++; i++; next(); });
      };
      next();
    }
  };

  /** Fill-in-the-blank widget; done(correct). */
  function renderFill(host, q, done) {
    const promptHtml = esc(q.prompt).replace(/_{2,}/, '<span class="blank" id="blank">&nbsp;</span>');
    host.innerHTML = '<div class="q-prompt">' + promptHtml + ' ' + speakBtn(q.prompt.replace(/_{2,}/, 'blank')) + '</div>' +
      (q.freeType
        ? '<input class="text-input" id="fillInput" placeholder="Type the missing word…" autocomplete="off"><div class="btn-row" style="margin-top:0.75rem"><button class="btn" id="fillGo">Check</button></div>'
        : '<div class="word-bank">' + q.bank.map(b => '<button class="chip" data-v="' + esc(b) + '">' + esc(b) + '</button>').join('') + '</div>') +
      '<div class="q-feedback"></div>';
    const finish = (val) => {
      const correct = normalize(val) === normalize(q.answer);
      const blank = host.querySelector('#blank'); if (blank) blank.textContent = val;
      host.querySelectorAll('.chip').forEach(c => { c.disabled = true; if (c.dataset.v === q.answer) c.classList.add('used'); });
      host.querySelector('.q-feedback').innerHTML = '<div class="feedback ' + (correct ? 'ok' : 'bad') + '">' + (correct ? '🎉 Correct!' : '👉 The answer is: ' + esc(q.answer)) + '</div>';
      setTimeout(() => done(correct), correct ? 900 : 1800);
    };
    host.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => finish(c.dataset.v)));
    const go = host.querySelector('#fillGo');
    if (go) {
      const input = host.querySelector('#fillInput');
      go.addEventListener('click', () => { go.disabled = true; finish(input.value); });
      input.addEventListener('keydown', e => { if (e.key === 'Enter') go.click(); });
      input.focus();
    }
  }

  /* ---------- 5. Jeopardy ---------- */
  const jeopardy = {
    id: 'jeopardy', name: 'Jeopardy', icon: '📺', gentle: false,
    desc: 'Pick a category and a value. Answer to bank the points.',
    canPlay: (c, u) => choicePool(u, 2).length >= 4,
    render(ctx) {
      const pool = choicePool(ctx.unit, ctx.level);
      const rows = ctx.level === 1 ? 2 : ctx.level === 2 ? 3 : 4;
      // group by category when authors provided one; else chunk
      let groups = {};
      pool.forEach(q => { const k = q.cat || ''; (groups[k] = groups[k] || []).push(q); });
      let cats = Object.keys(groups).filter(k => k && groups[k].length >= rows).map(k => ({ name: k, qs: groups[k].slice(0, rows) }));
      if (cats.length < 2) {
        const flat = shuffle(pool);
        cats = [];
        const names = ['Round One', 'Round Two', 'Round Three', 'Round Four'];
        for (let i = 0; i < 4 && flat.length >= rows; i++) cats.push({ name: names[i], qs: flat.splice(0, rows) });
      }
      cats = cats.slice(0, ctx.level === 1 ? 2 : ctx.level === 2 ? 3 : 4);
      let score = 0, answered = 0, total = cats.length * rows;
      const board = () => {
        ctx.host.innerHTML = '<div class="game-head"><span class="jscore">Score: ' + score + '</span><span class="muted">' + (total - answered) + ' clues left</span></div>' +
          '<div class="jeopardy-board" style="grid-template-columns:repeat(' + cats.length + ',1fr)">' +
          cats.map(c => '<div class="jcat">' + esc(c.name) + '</div>').join('') +
          Array.from({ length: rows }).map((_, r) => cats.map((c, ci) =>
            '<button class="jcell" data-c="' + ci + '" data-r="' + r + '"' + (c.qs[r].done ? ' disabled' : '') + '>' + (c.qs[r].done ? '' : (r + 1) * 100) + '</button>').join('')).join('') +
          '</div>';
        ctx.host.querySelectorAll('.jcell').forEach(b => b.addEventListener('click', () => {
          const q = cats[+b.dataset.c].qs[+b.dataset.r]; const value = (+b.dataset.r + 1) * 100;
          ctx.host.innerHTML = '<div class="game-head"><span class="tag accent">' + esc(cats[+b.dataset.c].name) + ' · ' + value + '</span><span class="jscore">Score: ' + score + '</span></div><div class="q-host"></div>';
          askChoice(ctx.host.querySelector('.q-host'), q, ok => {
            q.done = true; answered++;
            score += ok ? value : (ctx.level === 3 ? -value : 0);
            if (answered >= total) {
              resultCard(ctx.host, 'Final score: ' + score, ['You cleared the board!'], ctx);
              ctx.finish({ score, max: total * 100 * (rows + 1) / 2 });
            } else board();
          });
        }));
      };
      board();
    }
  };

  /* ---------- 6. Wheel of Fortune ---------- */
  const wheel = {
    id: 'wheel', name: 'Wheel of Fortune', icon: '🎡', gentle: false,
    desc: 'Spin, guess letters and solve the hidden word or phrase.',
    canPlay: (c, u) => termsFor(u).length >= 1,
    render(ctx) {
      const candidates = termsFor(ctx.unit).filter(t => /^[a-z ]+$/i.test(t.term) && t.term.length >= 3);
      if (!candidates.length) { ctx.host.innerHTML = '<div class="empty">No suitable words in this unit.</div>'; return; }
      const puzzles = sample(candidates, ctx.level === 1 ? 2 : ctx.level === 2 ? 3 : 4);
      let pi = 0, bank = 0;
      const segments = [100, 200, 300, 500, 150, 'LOSE', 250, 400];
      const vowels = 'AEIOU';
      const runPuzzle = () => {
        const p = puzzles[pi]; const phrase = p.term.toUpperCase();
        const revealed = new Set(ctx.level === 1 ? vowels.split('') : []);
        let spinValue = null, turnAngle = 0;
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const draw = (msg) => {
          const solved = phrase.split('').every(ch => ch === ' ' || revealed.has(ch));
          ctx.host.innerHTML =
            '<div class="game-head"><span class="tag accent">Puzzle ' + (pi + 1) + ' of ' + puzzles.length + '</span><span class="jscore">Bank: $' + bank + '</span></div>' +
            (ctx.level < 3 ? '<p class="muted"><strong>Hint:</strong> ' + esc(p.def) + '</p>' : '<p class="muted"><strong>Category:</strong> ' + esc(ctx.unit.title) + '</p>') +
            '<div class="puzzle">' + phrase.split('').map(ch => ch === ' ' ? '<span class="letter space"></span>' :
              '<span class="letter' + (revealed.has(ch) ? ' shown' : '') + '">' + (revealed.has(ch) ? ch : '') + '</span>').join('') + '</div>' +
            '<div class="wheel-wrap"><div><div class="wheel-pointer"></div><div class="wheel" id="wheel" style="transform:rotate(' + turnAngle + 'deg)"></div></div>' +
            '<div style="flex:1;min-width:240px"><p id="wmsg" class="muted" style="min-height:1.5rem">' + (msg || 'Spin the wheel to start.') + '</p>' +
            '<div class="btn-row"><button class="btn accent" id="spinBtn"' + (spinValue !== null || solved ? ' disabled' : '') + '>🎡 Spin</button>' +
            '<button class="btn secondary" id="solveBtn"' + (solved ? ' disabled' : '') + '>Solve</button></div>' +
            '<div class="keyboard" style="margin-top:1rem">' + letters.map(l => '<button data-l="' + l + '" class="' + (vowels.includes(l) ? 'vowel' : '') + '"' +
              ((revealed.has(l) || (spinValue === null && !vowels.includes(l)) || solved) ? ' disabled' : '') + '>' + l + '</button>').join('') + '</div>' +
            '<p class="small muted" style="margin-top:0.5rem">Consonants need a spin first. Vowels are free.</p></div></div>';
          if (solved) return setTimeout(() => { bank += 300; nextPuzzle('Solved! +$300 bonus'); }, 900);
          ctx.host.querySelector('#spinBtn').addEventListener('click', () => {
            const idx = Math.floor(Math.random() * segments.length);
            turnAngle += 1440 + (360 - idx * 45 - 22);
            const w = ctx.host.querySelector('#wheel'); w.style.transform = 'rotate(' + turnAngle + 'deg)';
            ctx.host.querySelector('#spinBtn').disabled = true;
            setTimeout(() => {
              const seg = segments[idx];
              if (seg === 'LOSE') { spinValue = null; draw('Lose a turn… spin again!'); }
              else { spinValue = seg; draw('You spun $' + seg + '. Pick a consonant!'); }
            }, Settings.get('motion') === 'reduced' ? 50 : 2600);
          });
          ctx.host.querySelectorAll('.keyboard button').forEach(b => b.addEventListener('click', () => {
            const l = b.dataset.l; const hits = phrase.split('').filter(ch => ch === l).length;
            revealed.add(l);
            if (!vowels.includes(l)) { bank += hits * spinValue; spinValue = null; }
            draw(hits ? 'Yes! ' + hits + ' × ' + l : 'No ' + l + ' in this puzzle.');
          }));
          ctx.host.querySelector('#solveBtn').addEventListener('click', () => {
            const guess = prompt('Solve the puzzle:');
            if (guess === null) return;
            if (normalize(guess) === normalize(phrase)) { phrase.split('').forEach(ch => revealed.add(ch)); draw('You solved it!'); }
            else draw('Not quite. Keep going!');
          });
        };
        draw();
      };
      const nextPuzzle = (msg) => {
        pi++;
        if (pi >= puzzles.length) {
          resultCard(ctx.host, 'You banked $' + bank + '!', ['All ' + puzzles.length + ' puzzles solved.'], ctx);
          ctx.finish({ score: bank, max: 0 });
        } else runPuzzle(msg);
      };
      runPuzzle();
    }
  };

  /* ---------- 7. Who Wants to Be a Millionaire ---------- */
  const millionaire = {
    id: 'millionaire', name: 'Millionaire', icon: '💰', gentle: false,
    desc: 'Climb the money ladder. Use your lifelines wisely!',
    canPlay: (c, u) => choicePool(u, 2).length >= 5,
    render(ctx) {
      const rungs = ctx.level === 1 ? 5 : ctx.level === 2 ? 8 : 10;
      const values = ['$100', '$200', '$300', '$500', '$1,000', '$2,000', '$4,000', '$8,000', '$16,000', '$1,000,000'].slice(10 - rungs);
      const pool = choicePool(ctx.unit, ctx.level);
      const qs = pool.slice(0, rungs);
      let i = 0, fifty = true, skip = true;
      const ask = () => {
        if (i >= qs.length) return win();
        const q = Object.assign({}, qs[i]);
        ctx.host.innerHTML = '<div class="millionaire"><div><div class="game-head"><span class="tag accent">Playing for ' + values[i] + '</span>' +
          '<div class="btn-row"><button class="btn sm secondary" id="ll50"' + (fifty && q.options.length > 2 ? '' : ' disabled') + '>50 : 50</button>' +
          '<button class="btn sm secondary" id="llskip"' + (skip ? '' : ' disabled') + '>Skip</button></div></div><div class="q-host"></div></div>' +
          '<div class="ladder">' + values.map((v, k) => '<span class="' + (k < i ? 'done' : k === i ? 'current' : '') + '">' + v + '</span>').join('') + '</div></div>';
        const qhost = ctx.host.querySelector('.q-host');
        const run = (question) => askChoice(qhost, question, ok => {
          if (ok) { i++; ask(); return; }
          resultCard(ctx.host, 'Game over', ['You reached ' + (i ? values[i - 1] : '$0') + '. Study the unit and try again!'], ctx);
          ctx.finish({ score: i, max: rungs, failed: true });
        });
        run(q);
        ctx.host.querySelector('#ll50').addEventListener('click', () => {
          fifty = false;
          const answerText = q.type === 'tf' ? (q.answer ? 'True' : 'False') : String(q.answer);
          const wrong = shuffle(q.options.filter(o => o !== answerText)).slice(0, 1);
          run(Object.assign({}, q, { options: shuffle([answerText].concat(wrong)) }));
          ctx.host.querySelector('#ll50').disabled = true;
        });
        ctx.host.querySelector('#llskip').addEventListener('click', () => {
          skip = false;
          const spare = pool.slice(rungs).find(x => !qs.includes(x));
          if (spare) qs[i] = spare; else i++;
          ask();
        });
      };
      const win = () => {
        resultCard(ctx.host, '🏆 You won ' + values[values.length - 1] + '!', ['You answered every question correctly.'], ctx);
        ctx.finish({ score: rungs, max: rungs });
      };
      ask();
    }
  };

  const ALL = [matching, memory, reveal, fill, jeopardy, wheel, millionaire];

  function available(course, unit) {
    return ALL.filter(g => g.canPlay(course, unit));
  }

  /** Mount a game. */
  function play(gameId, course, unit, host) {
    const game = ALL.find(g => g.id === gameId);
    if (!game) { host.innerHTML = '<div class="empty">Unknown game.</div>'; return; }
    const ctx = {
      course, unit, host, level: Settings.level,
      replay: () => play(gameId, course, unit, host),
      finish(result) {
        const u = Progress.unit(course.id, unit.id);
        if (!result.failed) {
          u.games[gameId] = true;
          if (result.score !== undefined) u.gameScores[gameId] = Math.max(u.gameScores[gameId] || 0, result.score);
        }
        Progress.save();
        Badges.evaluate(course, unit);
      }
    };
    game.render(ctx);
  }

  window.Games = { ALL, available, play, renderMatchBoard, renderFill, askChoice };
})();
