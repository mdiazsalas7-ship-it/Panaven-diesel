// Panaven SW — red primero, cache como respaldo offline.
const CACHE = 'panaven-control-v24';
const SHELL = ['./', 'index.html', 'manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put('index.html', copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match('index.html'))
    );
    return;
  }
  if (new URL(req.url).origin === self.location.origin) {
    e.respondWith(fetch(req).catch(() => caches.match(req)));
  }
});
