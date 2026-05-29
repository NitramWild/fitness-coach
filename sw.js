// Cache-busting service worker — always fetch fresh from network
const CACHE_NAME = 'martin-coach-v4';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Always go to network — never serve from cache
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
