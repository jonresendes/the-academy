/* =========================================================
   pwa.js — install button, update notice, Android back button
   ========================================================= */
(function () {
  /* ---------- install ---------- */
  let deferredPrompt = null;
  const installBtn = document.getElementById('installBtn');
  const KEY_INSTALLED = 'learnhub.installed';
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|Edg|OPR/.test(ua);
  const flag = { get: () => { try { return localStorage.getItem(KEY_INSTALLED) === '1'; } catch (e) { return false; } },
                 set: v => { try { v ? localStorage.setItem(KEY_INSTALLED, '1') : localStorage.removeItem(KEY_INSTALLED); } catch (e) {} } };
  if (standalone()) flag.set(true);                       // running as the installed app = definitely installed here

  /** Is LearnHub installed on this device? Uses the browser's answer when it can give one. */
  async function isInstalled() {
    if (standalone() || flag.get()) return true;
    try {
      if (navigator.getInstalledRelatedApps) { const apps = await navigator.getInstalledRelatedApps(); if (apps && apps.length) { flag.set(true); return true; } }
    } catch (e) {}
    return false;
  }
  async function refreshButton() {
    if (!installBtn) return;
    installBtn.hidden = await isInstalled();              // header button disappears once installed; Settings takes over
  }
  refreshButton();
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; refreshButton(); });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; flag.set(true); refreshButton(); if (location.hash === '#/settings') window.dispatchEvent(new HashChangeEvent('hashchange')); });

  const steps = {
    install: isIOS
      ? ['Open this page in <strong>Safari</strong> (other iPhone browsers cannot install apps).', 'Tap the <strong>Share</strong> button (the square with an arrow).', 'Scroll down and tap <strong>Add to Home Screen</strong>, then <strong>Add</strong>.']
      : isAndroid
        ? ['Tap the <strong>⋮ menu</strong> in the top-right corner of Chrome.', 'Tap <strong>Add to Home screen</strong> or <strong>Install app</strong>.', 'Tap <strong>Install</strong>.']
        : isSafari
          ? ['In Safari, open the <strong>File</strong> menu and choose <strong>Add to Dock…</strong>.']
          : ['Open Chrome\'s <strong>⋮ menu</strong> → <strong>Cast, save and share</strong> → <strong>Install page as app…</strong>, then click <strong>Install</strong>.', 'The dialog should be titled <strong>Install LearnHub</strong> and show a blue diamond icon. If it says <em>"Install this page as an app"</em> with a plain letter instead, the browser could not load the app\'s manifest or icons — open <strong>Settings → App</strong> in LearnHub to see which file is missing.'],
    uninstall: isIOS
      ? ['On the Home Screen, press and hold the <strong>LearnHub</strong> icon.', 'Tap <strong>Remove App</strong> → <strong>Delete App</strong>.']
      : isAndroid
        ? ['Press and hold the <strong>LearnHub</strong> icon on your Home screen or app list.', 'Tap <strong>Uninstall</strong> (or drag it to <em>Uninstall</em>).']
        : ['Open the installed LearnHub window, click the <strong>⋮ menu</strong> in its title bar and choose <strong>Uninstall LearnHub</strong>.', 'Or type <code>chrome://apps</code> in Chrome\'s address bar, right-click LearnHub and choose <strong>Remove from Chrome</strong>.']
  };
  function dialog(title, list, note) {
    const d = document.createElement('div'); d.className = 'learn-overlay'; d.id = 'installHelp';
    d.innerHTML = '<div class="learn-card" style="max-width:520px"><div class="btn-row between"><h2>' + title + '</h2><button class="btn ghost sm" id="installHelpClose">✕</button></div>' +
      '<ol style="padding-left:1.3rem;font-size:1.05rem">' + list.map(x => '<li style="margin-bottom:0.5rem">' + x + '</li>').join('') + '</ol>' + (note || '') + '</div>';
    document.body.appendChild(d);
    d.querySelector('#installHelpClose').addEventListener('click', () => d.remove());
    d.addEventListener('click', e => { if (e.target === d) d.remove(); });
  }
  const installHelp = () => dialog('Install LearnHub', steps.install,
    '<p class="muted small" style="margin-top:1rem">If the browser only offers "Install this page as an app" with a plain letter icon, it has not found the app\'s manifest or icons — open <strong>Settings → App</strong> in LearnHub to see which file is missing on the website.</p>');
  const uninstallHelp = () => dialog('Uninstall LearnHub', steps.uninstall,
    '<p class="muted small" style="margin-top:1rem">Websites cannot uninstall themselves, so this is done from the device. Your progress stays saved in the browser.</p>');

  async function install() {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        deferredPrompt = null;
        if (choice && choice.outcome === 'accepted') { flag.set(true); refreshButton(); return true; }
      } catch (e) { /* fall through to the instructions */ }
    }
    installHelp(); return false;
  }
  if (installBtn) installBtn.addEventListener('click', install);

  /** Check that the files the browser needs for installing are really being served. */
  async function diagnostics() {
    const out = { https: /^https:/.test(location.protocol) || location.hostname === 'localhost', manifest: null, icon192: null, icon512: null, sw: null, standalone: standalone(), installed: await isInstalled(), promptAvailable: !!deferredPrompt };
    const check = async (url) => { try { const r = await fetch(url, { cache: 'no-store' }); return r.ok; } catch (e) { return false; } };
    out.manifest = await check('manifest.json');
    out.icon192 = await check('icon-192.png');
    out.icon512 = await check('icon-512.png');
    try { out.sw = 'serviceWorker' in navigator && !!(await navigator.serviceWorker.getRegistration()); } catch (e) { out.sw = false; }
    return out;
  }

  window.PWA = { isInstalled, install, installHelp, uninstallHelp, diagnostics, forget: () => { flag.set(false); refreshButton(); }, standalone };

  /* ---------- update notice ---------- */
  function notice(text, btnLabel, onClick) {
    const host = document.getElementById('toasts'); if (!host) return;
    const el = document.createElement('div');
    el.className = 'toast update-toast';
    el.innerHTML = '<div class="t-icon">⬆️</div><div><div class="t-title">LearnHub</div><div class="t-name">' + text + '</div></div>' +
      (btnLabel ? '<button class="btn sm" id="updateBtn">' + btnLabel + '</button>' : '');
    host.appendChild(el);
    const b = el.querySelector('#updateBtn'); if (b) b.addEventListener('click', () => { onClick(); el.remove(); });
    if (!btnLabel) setTimeout(() => el.remove(), 5000);
  }
  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
    window.addEventListener('load', async () => {
      // Remove any service worker that is not ours (e.g. another app previously deployed at this address)
      // and any cache it left behind, so nothing from an old build can be served.
      try {
        const regs = await navigator.serviceWorker.getRegistrations();
        let removed = false;
        for (const r of regs) {
          const url = (r.active || r.waiting || r.installing || {}).scriptURL || '';
          if (!/\/sw\.js$/.test(url)) { await r.unregister(); removed = true; }
        }
        if ('caches' in window) {
          const keys = await caches.keys();
          for (const k of keys) if (!/^learnhub-/.test(k)) { await caches.delete(k); removed = true; }
        }
        if (removed && !sessionStorage.getItem('learnhub.cleaned')) { sessionStorage.setItem('learnhub.cleaned', '1'); location.reload(); return; }
      } catch (e) { /* ignore */ }
      navigator.serviceWorker.register('./sw.js').then(reg => {
        const announce = worker => notice('A new version is ready.', 'Update now', () => worker.postMessage('SKIP_WAITING'));
        if (reg.waiting && navigator.serviceWorker.controller) announce(reg.waiting);
        reg.addEventListener('updatefound', () => {
          const w = reg.installing; if (!w) return;
          w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) announce(w); });
        });
        setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);   // check hourly while open
      }).catch(() => {});
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => { if (refreshing) return; refreshing = true; location.reload(); });
    });
  }

  /* ---------- back button: in-app history, double-tap to close ----------
     All in-app navigation uses replaceState, so the browser history holds exactly
     two entries: [base, guard]. The phone's back button pops the guard, we catch
     it in popstate, step back through our own stack, and re-push the guard. At the
     home page a second back within 2 s asks whether to close.                    */
  const stack = [];
  let lastBack = 0, closing = false, dialogOpen = false, lastRoute = location.hash || '#/';
  const current = () => location.hash || '#/';

  function go(hash) {
    if (hash === current()) return;
    stack.push(current());
    lastRoute = hash;
    history.replaceState({ lh: 'guard' }, '', hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#/"], a[href="#/"]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault(); go(a.getAttribute('href'));
  });
  // navigations made by setting location.hash directly (tests, older code)
  window.addEventListener('hashchange', () => {
    const h = current();
    if (stack[stack.length - 1] !== h && lastRoute !== h) { if (lastRoute) stack.push(lastRoute); }
    lastRoute = h;
  });

  function closeDialog() {
    const host = document.getElementById('toasts'); const d = document.getElementById('closeDialog'); if (d) d.remove(); dialogOpen = false;
  }
  function askClose() {
    dialogOpen = true;
    const d = document.createElement('div'); d.id = 'closeDialog'; d.className = 'learn-overlay';
    d.innerHTML = '<div class="learn-card" style="max-width:380px;text-align:center"><div class="slide-visual">👋</div><h2>Close LearnHub?</h2><p class="muted">Your progress is saved.</p>' +
      '<div class="btn-row" style="justify-content:center"><button class="btn secondary" id="stayBtn">Keep learning</button><button class="btn" id="closeBtn">Close app</button></div></div>';
    document.body.appendChild(d);
    d.querySelector('#stayBtn').addEventListener('click', closeDialog);
    d.querySelector('#closeBtn').addEventListener('click', () => { closing = true; closeDialog(); history.back(); setTimeout(() => { try { window.close(); } catch (e) {} }, 150); });
  }

  if (history.state === null || !history.state.lh) {
    history.replaceState({ lh: 'base' }, '', current());
    history.pushState({ lh: 'guard' }, '', current());
  }
  /** Where "back a level" goes when nothing is left in our own history
      (e.g. the app was opened on a deep link): one step up the hierarchy. */
  function parentOf(hash) {
    const p = hash.replace(/^#\/?/, '').split('/');
    switch (p[0]) {
      case 'study': case 'quiz': case 'assign': return '#/lesson/' + p[1] + '/' + p[2] + '/' + p[3];
      case 'lesson': case 'test': case 'games': case 'work': return '#/course/' + p[1];
      case 'game': return '#/games/' + p[1] + '/' + p[2];
      case 'print': return p[3] === 'unit' || p[3] === 'test' ? '#/course/' + p[1] : '#/lesson/' + p[1] + '/' + p[2] + '/' + (p[4] || 0);
      case 'course': case 'case': case 'settings': case 'signin': case 'welcome': case 'dashboard': return '#/';
      default: return '#/';
    }
  }
  /** Go back one step: our own history first, then up the hierarchy. Returns false when already home. */
  function back() {
    if (dialogOpen) { closeDialog(); return true; }
    let prev = stack.pop();
    while (prev && (prev === current() || prev === '#/signin' || prev === '#/welcome')) prev = stack.pop();
    if (!prev && current() !== '#/') prev = parentOf(current());
    if (!prev) return false;
    history.replaceState({ lh: 'guard' }, '', prev);
    lastRoute = prev;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    return true;
  }
  // header button — same behaviour as the phone's back button
  const backBtn = document.getElementById('backBtn');
  function refreshBackBtn() { if (backBtn) backBtn.hidden = current() === '#/' || current() === '#/signin' || current() === '#/welcome' || !(window.Students && Students.current); }
  if (backBtn) backBtn.addEventListener('click', () => { back(); refreshBackBtn(); });
  window.addEventListener('hashchange', refreshBackBtn);
  refreshBackBtn();

  window.addEventListener('popstate', e => {
    if (closing) return;
    // Only a real back press lands on our base entry; hash navigations made with
    // location.hash create their own entries and are handled by the browser.
    if (!(e.state && e.state.lh === 'base')) return;
    history.pushState({ lh: 'guard' }, '', current());   // re-arm the guard first
    if (back()) { refreshBackBtn(); return; }
    // already home: double-press to close
    const now = Date.now();
    if (now - lastBack < 2000) askClose();
    else { lastBack = now; notice('Press back again to close.'); }
  });

  window.LHNav = { go, back, stack };
})();
