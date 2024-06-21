const CACHE_NAME = "catch-my-tomb";
const urlsToCache = [
  "/",
  "./index.html",
  "./manifest.json",
  // Ajoutez ici tous les autres fichiers que vous souhaitez mettre en cache
];

// Installation du service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activation du service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes réseau
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Retourne la réponse en cache si disponible
      }
      return fetch(event.request).then((response) => {
        // Vérifie si on a reçu une réponse valide
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // Clone la réponse
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
