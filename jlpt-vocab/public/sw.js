const CACHE = 'jlpt-vocab-v1';
const ASSETS = [
  '/',
  '/vi',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  // Cache-first for static and JSON data
  if (url.origin === location.origin) {
    if (url.pathname.startsWith('/data/') || url.pathname === '/' || url.pathname.startsWith('/vi') || url.pathname.startsWith('/ja')) {
      event.respondWith(
        caches.match(request).then((cached) => cached || fetch(request).then((res) => {
          const resClone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(request, resClone));
          return res;
        }))
      );
      return;
    }
  }
});