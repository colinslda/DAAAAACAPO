// Nom du cache
const CACHE_NAME = 'musicconnect-v1';

// Liste des fichiers à mettre en cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installation en cours...');

  // Mettre en cache les ressources statiques
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Mise en cache des ressources statiques');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // Forcer l'activation du nouveau Service Worker
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activation en cours...');

  // Supprimer les anciens caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Suppression de l\'ancien cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // Prendre le contrôle de toutes les pages
  self.clients.claim();
});

// Intercepter les requêtes réseau
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Interception de la requête', event.request.url);

  // Stratégie "Cache First, puis réseau"
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si la ressource est en cache, la retourner
        if (cachedResponse) {
          console.log('Service Worker: Ressource trouvée dans le cache', event.request.url);
          return cachedResponse;
        }

        // Sinon, faire la requête réseau
        return fetch(event.request)
          .then((networkResponse) => {
            // Mettre en cache la nouvelle ressource
            return caches.open(CACHE_NAME)
              .then((cache) => {
                console.log('Service Worker: Mise en cache de la nouvelle ressource', event.request.url);
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              });
          })
          .catch(() => {
            // En cas d'échec, retourner une page de secours (par exemple, une page hors ligne)
            return caches.match('/offline.html');
          });
      })
  );
});
