/* LearnHub service worker — offline cache + update detection.
   BUMP THE VERSION every time you deploy changed files; that is what
   makes installed copies show the "Update available" notice. */
const VERSION = 'learnhub-v25';
const FILES = [
  './', './index.html', './styles.css', './manifest.json', './icon-192.png', './icon-512.png', './logo.png',
  './storage.js', './util.js', './badges.js', './games.js', './print.js', './media.js', './drive.js', './dashboard.js', './app.js', './pwa.js', './colouring.js',
  './english.js', './science.js', './olc4o.js', './hrf3o.js', './media-guide-hrf3o.html', './media-guide-olc4o.html'
];

self.addEventListener('install', e => {
  // Cache each file on its own so one missing file cannot break the whole install.
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))   // removes other apps' caches too
      .then(() => self.clients.claim())
  );
});
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

// Network first (always fresh when online), cache fallback (works offline).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;           // fonts etc. go straight to the network
  if (/version\.json$/.test(url.pathname)) return;       // the version check always hits the network
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(VERSION).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html')))
  );
});
