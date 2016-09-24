const dataCacheName = 'popthecorndata-v1';

self.addEventListener('install', () => {
  console.log('SW installed');
});

self.addEventListener('activate', () => {
  console.log('SW activated');
});

self.addEventListener('fetch', (e) => {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    fetch(e.request)
    .then((response) => {
      return caches.open(dataCacheName).then((cache) => {
        cache.put(e.request.url, response.clone());
        console.log('[ServiceWorker] Fetched&Cached Data');
        return response;
      });
    })
  );
});
