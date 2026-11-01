/* =========================================================
   pwa.js — install button, update notice, Android back button
   ========================================================= */
(function () {
  /* ---------- install ---------- */
  let deferredPrompt = null;
  const installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault(); deferredPrompt = e;
    if (installBtn) installBtn.hidden = false;
  });
  if (installBtn) installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null; installBtn.hidden = true;
  });
  window.addEventListener('appinstalled', () => { if (installBtn) installBtn.hidden = true; });

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
