// Service worker mínimo para PWA / offline. Estrategia:
//  • Navegaciones y assets propios: "stale-while-revalidate" (rápido y se actualiza).
//  • Pyodide y CDNs externas: no se cachean acá (las maneja el navegador).
// El cache se versiona; al cambiar VERSION se limpian los viejos.
const VERSION = 'programerso-v1';
const CORE = ['/', '/progreso', '/glosario', '/playground', '/perfil', '/favicon.svg', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(CORE).catch(() => undefined))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Sólo manejamos same-origin; lo externo (Pyodide CDN) pasa directo.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') cache.put(req, res.clone());
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
