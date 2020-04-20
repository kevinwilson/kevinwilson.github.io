const lakanaDocumentsCache = 'lakana-documents-v1';

const assets = [
  '/',
  '/index.html',
  '/app.js',
  '/lakana.ico',
  '/styles.css',
  '/content/sop1.html',
  '/content/process1.html',
  '/content.json',
  'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
  'https://fonts.gstatic.com/s/materialicons/v50/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(lakanaDocumentsCache).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(key => key !== lakanaDocumentsCache)
          .map(key => caches.delete(key))
        )
    })
  )
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request);
    }))
});


