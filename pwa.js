/* =========================================================
   pwa.js — install button, update notice, Android back button
   ========================================================= */
(function () {
  /* ---------- install ---------- */
  let deferredPrompt = null;
  const installBtn = document.getElementById('installBtn');
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ua = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/.test(ua);
  const isSafari = /Safari/.test(ua) && !/Chrome|CriOS|Edg|OPR/.test(ua);

  if (installBtn) installBtn.hidden = standalone();        // inside the installed app there is nothing to install
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; if (installBtn) installBtn.hidden = standalone(); });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; if (installBtn) installBtn.hidden = true; });

  function installHelp() {
    const steps = isIOS
      ? ['Open this page in <strong>Safari</strong> (other iPhone browsers cannot install apps).', 'Tap the <strong>Share</strong> button (the square with an arrow).', 'Scroll down and tap <strong>Add to Home Screen</strong>, then <strong>Add</strong>.']
      : isAndroid
        ? ['Tap the <strong>⋮ menu</strong> in the top-right corner of Chrome.', 'Tap <strong>Add to Home screen</strong> or <strong>Install app</strong>.', 'Tap <strong>Install</strong>.']
        : isSafari
          ? ['In Safari, open the <strong>File</strong> menu and choose <strong>Add to Dock…</strong>.']
          : ['Click the <strong>install icon</strong> at the right end of the address bar (a monitor with a down-arrow), or open the <strong>⋮ menu</strong> → <strong>Cast, save and share</strong> → <strong>Install page as app…</strong>.', 'Click <strong>Install</strong>.'];
    const already = '<p class="muted small" style="margin-top:1rem">If the install option is missing, this address is probably <strong>already installed</strong> under another name (for example an older app). Remove that app first — on a computer open <code>chrome://apps</code>, right-click it and choose <em>Remove from Chrome</em>; on a phone long-press its icon and choose <em>Uninstall</em> — then come back here and try again.</p>';
    const d = document.createElement('div'); d.className = 'learn-overlay'; d.id = 'installHelp';
    d.innerHTML = '<div class="learn-card" style="max-width:520px"><div class="btn-row between"><h2>Install LearnHub</h2><button class="btn ghost sm" id="installHelpClose">✕</button></div>' +
      '<ol style="padding-left:1.3rem;font-size:1.05rem">' + steps.map(x => '<li style="margin-bottom:0.5rem">' + x + '</li>').join('') + '</ol>' + already + '</div>';
    document.body.appendChild(d);
    d.querySelector('#installHelpClose').addEventListener('click', () => d.remove());
    d.addEventListener('click', e => { if (e.target === d) d.remove(); });
  }

  if (installBtn) installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        deferredPrompt = null;
        if (choice && choice.outcome === 'accepted') { installBtn.hidden = true; return; }
      } catch (e) { /* fall through to the instructions */ }
    }
    installHelp();
  });

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
  window.addEventListener('popstate', e => {
    if (closing) return;
    // Only a real back press lands on our base entry; hash navigations made with
    // location.hash create their own entries and are handled by the browser.
    if (!(e.state && e.state.lh === 'base')) return;
    if (dialogOpen) { closeDialog(); history.pushState({ lh: 'guard' }, '', current()); return; }
    const prev = stack.pop();
    if (prev) {
      history.pushState({ lh: 'guard' }, '', prev);
      lastRoute = prev;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      return;
    }
    // nothing left in our stack
    const now = Date.now();
    if (current() !== '#/') {
      history.pushState({ lh: 'guard' }, '', '#/'); lastRoute = '#/';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      return;
    }
    history.pushState({ lh: 'guard' }, '', '#/');
    if (now - lastBack < 2000) askClose();
    else { lastBack = now; notice('Press back again to close.'); }
  });

  window.LHNav = { go, stack };
})();
