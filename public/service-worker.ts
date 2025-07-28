// Це типовий service worker — працює як кеш
const CACHE_NAME = "my-pwa-cache-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json"];

// Встановлення SW та кешування початкових файлів
self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Активуємо та оновлюємо старі кеші
self.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Відповідаємо з кешу або йдемо в інтернет
self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
