const CACHE_NAME = "habitudes-cyberpunk-v2";

// On ne met en cache de manière stricte que le manifest et les icônes
const STATIC_ASSETS = [
  "./",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Stratégie : Réseau d'abord, sinon Cache (Network-First, falling back to Cache)
// Idéal pour index.html pour que les mises à jour soient instantanées quand on est connecté !
self.addEventListener("fetch", event => {
  // On applique cette stratégie principalement pour les requêtes de page (document HTML)
  if (event.request.mode === "navigate" || event.request.destination === "document") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Si le réseau répond, on met à jour le cache avec la nouvelle version
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          // Si pas de réseau (hors-ligne), on sert la version du cache
          return caches.match(event.request);
        })
    );
  } else {
    // Pour les autres fichiers (images, manifest), cache d'abord, sinon réseau
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  }
});
