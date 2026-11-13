const CACHE_STATIC = 'app-shell-v1';
const CACHE_API = 'api-data-v1';

const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
];

// Instalación: precacheo del App Shell estático
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Activación: limpieza de cachés antiguas obsoletas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_STATIC && key !== CACHE_API)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Interceptación de peticiones de red
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Solo gestionamos métodos GET por seguridad
  if (request.method !== 'GET') return;

  // Estrategia Network-First para la API (con respaldo offline en caché)
  if (request.url.includes('/posts') || request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_API).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Estrategia Cache-First para el App Shell (archivos estáticos)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return cachedResponse || fetch(request);
    })
  );
});