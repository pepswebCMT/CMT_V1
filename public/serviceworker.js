const CACHE_NAME = "version-1";
const urlsToCache = ['./index.html', './favicon.ico', './CMT-logo-02.svg'];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Service Worker: Failed to cache', error);
            })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    console.log('Service Worker: Returning cached response', event.request.url);
                    return response;
                }
                console.log('Service Worker: Fetching from network', event.request.url);
                return fetch(event.request)
                    .catch((error) => {
                        console.error('Service Worker: Fetch failed', error);
                        return caches.match(''); // Optionally return a fallback page
                    });
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
