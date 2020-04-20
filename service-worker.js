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
  '/node_modules/material-components-web/dist/material-components-web.min.js',
  '/node_modules/material-components-web/dist/material-components-web.min.css',
  '/node_modules/material-components-web/dist/material-components-web.min.css.map',
  '/node_modules/material-design-icons/iconfont/material-icons.css',
  '/node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot',
  '/node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2',
  '/node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff',
  '/node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf'
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


