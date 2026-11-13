/* =========================================================
   report.js — "Found a problem?" button on every page.
   Takes a picture of what is on the screen, opens a box with the picture and a
   place to describe the problem, and sends it to the Headmaster
   (Settings → Reported problems), who can read it, save the screenshot,
   mark it resolved or delete it.

   Cloud:   issues/{id} { id, by, name, role, number, page, title, text, shot, at, status, version, screen, agent }
            anyone signed in may create one; only the Headmaster reads, changes or deletes them (firestore.rules).
   Device-only mode: kept in localStorage ('learnhub.issues') for the master account on that device.
   The screenshot is a JPEG shrunk to fit inside one cloud record (under ~700 KB).
   ========================================================= */
(function () {
  const KEY = 'learnhub.issues', MAX_SHOT = 700000;
  const esc = s => String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  /** The screenshot of a stored report, only if it really is a JPEG picture (anything else is dropped, never put into the page). */
  const safeShot = v => (typeof v === 'string' && v.length < 800000 && /^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/.test(v)) ? v : '';
  const safePage = v => (typeof v === 'string' && /^#\/[\w\-\/.:%]*$/.test(v)) ? v : '#/';
  const cloud = () => !!(window.Cloud && Cloud.enabled);
  const me = () => (window.Students && Students.current) || null;
  const isMaster = () => { const s = me(); return !!(s && s.role === 'master'); };
  const lsGet = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } };
  const lsSet = v => { try { localStorage.setItem(KEY, JSON.stringify(v)); return true; } catch (e) { return false; } };

  /* ---------- the floating button ---------- */
  const btn = document.createElement('button');
  btn.type = 'button'; btn.id = 'reportBtn'; btn.className = 'report-fab'; btn.hidden = true;
  btn.setAttribute('data-html2canvas-ignore', 'true');
  btn.title = 'Found a problem? Click here to screenshot and submit.';
  btn.innerHTML = '<span aria-hidden="true">🐞</span><span class="report-fab-text"> Found a problem? <span class="report-fab-more">Click here to screenshot and submit.</span></span>';
  btn.setAttribute('aria-label', 'Found a problem? Click here to screenshot and submit.');
  document.body.appendChild(btn);
  function refresh() { btn.hidden = !me() || /^#\/print/.test(location.hash) || !!document.getElementById('reportBox'); }
  window.addEventListener('hashchange', () => setTimeout(refresh, 0));
  window.addEventListener('cloud:auth', () => setTimeout(refresh, 50));
  window.addEventListener('cloud:change', () => setTimeout(refresh, 0));
  document.addEventListener('click', () => setTimeout(refresh, 50));
  setTimeout(refresh, 300);
  const appEl = document.getElementById('app'); if (appEl && window.MutationObserver) new MutationObserver(() => setTimeout(refresh, 0)).observe(appEl, { childList: true });   // every page draw

  /* ---------- screenshot ---------- */
  let libP = null;
  function loadLib() {
    if (window.html2canvas) return Promise.resolve();
    return libP || (libP = new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'html2canvas.min.js'; s.onload = res; s.onerror = () => { libP = null; rej(new Error('The screenshot tool could not be loaded.')); }; document.head.appendChild(s); }));
  }
  /** A JPEG data URL of what is on the screen right now, small enough to send. */
  async function capture() {
    await loadLib();
    const w = window.innerWidth, h = window.innerHeight;
    const bg = getComputedStyle(document.body).backgroundColor;
    const canvas = await window.html2canvas(document.documentElement, { x: window.scrollX, y: window.scrollY, width: w, height: h, windowWidth: w, windowHeight: h, scale: Math.min(1.5, 1400 / w), useCORS: true, logging: false, backgroundColor: /rgba\(0, 0, 0, 0\)|transparent/.test(bg) ? '#ffffff' : bg });
    let c = canvas, q = 0.8, url = c.toDataURL('image/jpeg', q);
    for (let i = 0; i < 8 && url.length > MAX_SHOT; i++) {
      if (q > 0.5) q -= 0.15;
      else { const n = document.createElement('canvas'); n.width = Math.round(c.width * 0.8); n.height = Math.round(c.height * 0.8); n.getContext('2d').drawImage(c, 0, 0, n.width, n.height); c = n; }
      url = c.toDataURL('image/jpeg', q);
    }
    if (url.length > MAX_SHOT) throw new Error('The screenshot is too large to send.');
    return url;
  }

  /* ---------- the report box ---------- */
  btn.addEventListener('click', async () => {
    if (btn.disabled) return; btn.disabled = true; btn.classList.add('busy');
    let shot = '', shotErr = '';
    try { shot = await capture(); } catch (e) { shotErr = (e && e.message) || 'The screenshot could not be taken.'; }
    btn.disabled = false; btn.classList.remove('busy');
    openBox(shot, shotErr);
  });
  function openBox(shot, shotErr) {
    const old = document.getElementById('reportBox'); if (old) old.remove();
    const page = location.hash || '#/', title = ((document.querySelector('#app h1') || {}).textContent || document.title || '').trim().slice(0, 120);
    const d = document.createElement('div'); d.id = 'reportBox'; d.className = 'learn-overlay report-overlay'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.setAttribute('aria-label', 'Report a problem');
    d.innerHTML = '<div class="learn-card report-card"><h2>🐞 Report a problem</h2>' +
      '<p class="muted small">This goes to the Headmaster. Say what went wrong and what you expected to happen.</p>' +
      (shot ? '<figure class="report-shot"><img src="' + esc(safeShot(shot)) + '" alt="Screenshot of the page you were on"><figcaption class="muted small">Screenshot of <strong>' + esc(title || page) + '</strong></figcaption></figure>' +
              '<label class="chk"><input type="checkbox" id="reportInclude" checked> Send this screenshot with my report</label>'
            : '<p class="report-note">⚠️ ' + esc(shotErr || 'The screenshot could not be taken.') + ' You can still describe the problem and send it.</p>') +
      '<label class="report-label" for="reportText">What is the problem?</label>' +
      '<textarea class="text-input report-text" id="reportText" rows="4" maxlength="2000" placeholder="e.g. The quiz in Lesson 3 will not let me pick an answer."></textarea>' +
      '<p class="small" id="reportMsg" role="status"></p>' +
      '<div class="btn-row"><button class="btn" id="reportSend">Send to the Headmaster</button><button class="btn ghost" id="reportCancel">Cancel</button></div></div>';
    document.body.appendChild(d); refresh();
    const close = () => { d.remove(); refresh(); };
    const text = d.querySelector('#reportText'), msg = d.querySelector('#reportMsg'), send = d.querySelector('#reportSend');
    d.querySelector('#reportCancel').addEventListener('click', close);
    d.addEventListener('click', e => { if (e.target === d && !text.value.trim()) close(); });
    d.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    setTimeout(() => text.focus(), 50);
    send.addEventListener('click', async () => {
      const t = text.value.trim(); if (!t) { msg.textContent = 'Type a few words about the problem first.'; msg.style.color = 'var(--danger)'; text.focus(); return; }
      const inc = d.querySelector('#reportInclude'); const s = me() || {};
      const issue = { id: 'i' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7), by: cloud() && Cloud.user ? Cloud.user.uid : String(s.id || ''), name: String(s.name || ''), role: s.role === 'master' ? 'Headmaster' : s.isStaff ? 'Teacher' : 'Student', number: String(s.number || ''),
        page, title, text: t, shot: shot && (!inc || inc.checked) ? shot : '', at: new Date().toISOString(), status: 'open', version: (window.PWA && PWA.APP_VERSION) || '', screen: window.innerWidth + '×' + window.innerHeight, agent: navigator.userAgent.slice(0, 200) };
      send.disabled = true; msg.style.color = ''; msg.textContent = 'Sending…';
      try { await submit(issue); d.querySelector('.report-card').innerHTML = '<h2>✅ Sent</h2><p>Thank you — the Headmaster will see your report.</p><div class="btn-row"><button class="btn" id="reportDone">Close</button></div>'; d.querySelector('#reportDone').addEventListener('click', close); d.querySelector('#reportDone').focus(); }
      catch (e) { send.disabled = false; msg.style.color = 'var(--danger)'; msg.textContent = 'Not sent: ' + ((e && e.code === 'permission-denied') ? 'the cloud refused it. Ask the Headmaster to publish the latest firestore.rules.' : !navigator.onLine ? 'you are offline. Try again when you are connected.' : (e && e.message) || e); }
    });
  }
  async function submit(issue) {
    if (cloud()) {
      const write = Cloud.db.collection('issues').doc(issue.id).set(issue);
      await Promise.race([write, new Promise((_, rej) => setTimeout(() => rej(new Error('the cloud did not answer. Check your connection and try again.')), 15000))]);
    } else { const all = lsGet(); all.unshift(issue); if (!lsSet(all)) { issue.shot = ''; all[0] = issue; if (!lsSet(all)) throw new Error('this device is out of storage space.'); } }
  }

  /* ---------- Headmaster: Settings → Reported problems ---------- */
  let cache = null, filter = 'open';
  async function load() {
    if (!cloud()) { cache = lsGet().map(i => Object.assign(i, { id: String(i.id || ''), shot: safeShot(i.shot) })); return cache; }
    const q = await Cloud.db.collection('issues').get();
    cache = q.docs.map(d => Object.assign({}, d.data(), { id: d.id })).map(i => Object.assign(i, { shot: safeShot(i.shot) })).sort((a, b) => String(b.at).localeCompare(String(a.at)));
    return cache;
  }
  async function patch(id, change) {
    if (cloud()) { if (change === null) await Cloud.db.collection('issues').doc(id).delete(); else await Cloud.db.collection('issues').doc(id).update(change); }
    else { let all = lsGet(); all = change === null ? all.filter(i => i.id !== id) : all.map(i => i.id === id ? Object.assign(i, change) : i); lsSet(all); }
  }
  const when = iso => iso ? new Date(iso).toLocaleString([], { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '';
  const fileName = i => 'problem-' + String(i.at || '').slice(0, 10).replace(/[^0-9-]/g, '') + '-' + String(i.name || 'user').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + String(i.id).slice(-4).replace(/[^a-z0-9]/gi, '') + '.jpg';
  function listHtml() {
    if (!cache) return '<p class="muted small">Loading…</p>';
    const open = cache.filter(i => i.status !== 'resolved'), shown = filter === 'open' ? open : filter === 'resolved' ? cache.filter(i => i.status === 'resolved') : cache;
    return '<div class="report-bar"><div class="seg">' + [['open', 'Open (' + open.length + ')'], ['resolved', 'Resolved (' + (cache.length - open.length) + ')'], ['all', 'All (' + cache.length + ')']].map(o => '<button data-issue-filter="' + o[0] + '" class="' + (filter === o[0] ? 'on' : '') + '">' + o[1] + '</button>').join('') + '</div><button class="btn ghost sm" data-issue-refresh>↻ Refresh</button></div>' +
      (shown.length ? shown.map(i => '<article class="issue' + (i.status === 'resolved' ? ' resolved' : '') + '">' +
        (i.shot ? '<a class="issue-shot" href="' + esc(safeShot(i.shot)) + '\" data-issue-view="' + esc(i.id) + '" title="Open the full screenshot"><img src="' + esc(safeShot(i.shot)) + '\" alt="Screenshot sent with this report" loading="lazy"></a>' : '<div class="issue-shot none muted small">No screenshot</div>') +
        '<div class="issue-main"><div class="issue-head"><strong>' + esc(i.name || 'Unknown') + '</strong> <span class="tag">' + esc(i.role || '') + (i.number ? ' · #' + esc(i.number) : '') + '</span> <span class="tag ' + (i.status === 'resolved' ? 'ok' : 'accent') + '">' + (i.status === 'resolved' ? '✓ Resolved' : 'Open') + '</span></div>' +
        '<div class="muted small">' + esc(when(i.at)) + ' · page <a href="' + esc(safePage(i.page)) + '">' + esc(i.title || i.page || '') + '</a> <span class="issue-tech">(' + esc(i.page || '') + (i.version ? ' · v' + esc(i.version) : '') + (i.screen ? ' · ' + esc(i.screen) : '') + ')</span></div>' +
        '<p class="issue-text">' + esc(i.text) + '</p>' +
        '<div class="btn-row">' + (i.shot ? '<a class="btn secondary sm" href="' + esc(safeShot(i.shot)) + '\" download="' + esc(fileName(i)) + '">💾 Save screenshot</a>' : '') +
        '<button class="btn secondary sm" data-issue-status="' + esc(i.id) + '">' + (i.status === 'resolved' ? '↩ Reopen' : '✓ Mark resolved') + '</button><button class="btn ghost sm hm-danger" data-issue-del="' + esc(i.id) + '">🗑️ Delete</button></div></div></article>').join('')
        : '<p class="muted small">' + (filter === 'open' ? 'No open problems. 🎉' : 'Nothing here.') + '</p>');
  }
  function draw(host) {
    host.innerHTML = listHtml();
    const sum = host.closest('details') && host.closest('details').querySelector('.sg-help');
    if (sum && cache) { const n = cache.filter(i => i.status !== 'resolved').length; sum.textContent = n ? n + ' open' : 'none open'; }
    host.querySelectorAll('[data-issue-filter]').forEach(b => b.addEventListener('click', () => { filter = b.dataset.issueFilter; draw(host); }));
    const rf = host.querySelector('[data-issue-refresh]'); if (rf) rf.addEventListener('click', () => mount(host, true));
    host.querySelectorAll('[data-issue-view]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const i = cache.find(x => x.id === a.dataset.issueView); if (i) viewer(i); }));
    host.querySelectorAll('[data-issue-status]').forEach(b => b.addEventListener('click', async () => { const i = cache.find(x => x.id === b.dataset.issueStatus); const st = i.status === 'resolved' ? 'open' : 'resolved'; b.disabled = true; try { await patch(i.id, { status: st, resolvedAt: st === 'resolved' ? new Date().toISOString() : null }); i.status = st; } catch (e) { alert('Could not change it: ' + e.message); } draw(host); }));
    host.querySelectorAll('[data-issue-del]').forEach(b => b.addEventListener('click', async () => { const i = cache.find(x => x.id === b.dataset.issueDel); if (!confirm('Delete this report from ' + (i.name || 'this user') + ' and its screenshot? This cannot be undone.')) return; b.disabled = true; try { await patch(i.id, null); cache = cache.filter(x => x.id !== i.id); } catch (e) { alert('Could not delete it: ' + e.message); } draw(host); }));
  }
  function viewer(i) {
    const d = document.createElement('div'); d.className = 'learn-overlay report-overlay'; d.setAttribute('data-html2canvas-ignore', 'true');
    d.innerHTML = '<div class="learn-card report-view"><img src="' + esc(safeShot(i.shot)) + '\" alt="Screenshot sent by ' + esc(i.name) + '"><div class="btn-row" style="margin-top:0.75rem"><a class="btn" href="' + esc(safeShot(i.shot)) + '\" download="' + esc(fileName(i)) + '">💾 Save screenshot</a><button class="btn ghost" data-close>Close</button></div></div>';
    document.body.appendChild(d); const close = () => d.remove();
    d.addEventListener('click', e => { if (e.target === d) close(); }); d.querySelector('[data-close]').addEventListener('click', close);
  }
  /** Fill the Settings group (called by app.js after it draws Settings). */
  let loadedAt = 0;
  window.addEventListener('hashchange', () => { loadedAt = 0; });                 // opening Settings again fetches fresh reports
  window.addEventListener('cloud:auth', () => { loadedAt = 0; cache = null; });   // never show one account's list to another
  async function mount(host, force) {
    if (!host || !isMaster()) return;
    if (cache && !force && Date.now() - loadedAt < 60000) return draw(host);   // Settings redraws often; do not fetch every time
    host.innerHTML = '<p class="muted small">Loading…</p>';
    try { await load(); loadedAt = Date.now(); if (host.isConnected) draw(host); }
    catch (e) { host.innerHTML = '<p class="report-note">⚠️ The reports could not be loaded: ' + esc(e && e.code === 'permission-denied' ? 'the cloud refused. Paste the latest firestore.rules into Firebase → Firestore → Rules → Publish.' : (e && e.message) || e) + '</p>'; }
  }
  window.Report = { mount, refresh, capture };
})();
