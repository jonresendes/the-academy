/* The Academy · Learn Hub — service worker (offline cache + update detection).
   BUMP THE VERSION every time you upload changed files; that is what makes
   installed copies show the "Update available" notice. */
const VERSION = 'learnhub-v13';
const FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './logo.png',
  './styles.css',
  './english.js',
  './science.js',
  './olc4o.js',
  './colouring.js',
  './hrf3o.js',
  './snc1l2l.js',
  './storage.js',
  './util.js',
  './badges.js',
  './games.js',
  './print.js',
  './media.js',
  './drive.js',
  './overlay.js',
  './dashboard.js',
  './app.js',
  './pwa.js',
  './glc2o.js',
  './cloud-config.js',
  './cloud.js',
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js'
];

self.addEventListener('install', e => {
  // Fetch fresh copies and cache each file on its own, so one missing file cannot break the install.
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(FILES.map(f =>
    fetch(new Request(f, { cache: 'reload' })).then(r => { if (r.ok) return c.put(f, r); }).catch(() => null)
  ))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

// Network first (always fresh when online), cache fallback (works offline).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const sdk = url.hostname === 'www.gstatic.com' && /firebasejs/.test(url.pathname);
  if (url.origin !== location.origin && !sdk) return;                           // fonts etc. go straight to the network
  if (/firestore\.googleapis\.com|identitytoolkit|securetoken/.test(url.hostname)) return;
  if (/\/(sw\.js|version\.json|cloud\.json)$/.test(url.pathname)) return;      // update checks always hit the website
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || (e.request.mode === 'navigate' ? caches.match('./index.html') : undefined)))
  );
});
