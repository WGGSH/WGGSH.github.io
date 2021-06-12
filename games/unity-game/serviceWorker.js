// // service-worker.js
// // original code from https://qiita.com/umamichi/items/0e2b4b1c578e7335ba20
// self.addEventListener('install', function(e) {
//   console.log('[ServiceWorker] Install');
// });
//
// self.addEventListener('activate', function(e) {
//   console.log('[ServiceWorker] Activate');
// });
//
// // 現状では、この処理を書かないとService Workerが有効と判定されないようです
// self.addEventListener('fetch', function(event) {});

// Cache name
const CACHE_NAME = 'pwa-sample-caches-v1';
// Cache targets
const urlsToCache = [
  './',
  './index.html',
  './Build/WebGL.data.unityweb',
  './Build/WebGL.framework.js.unity',
  './Build/WebGL.loader.js',
  './Build/WebGL/wasm.unityweb',
  './TemplateData/fullscreen-button.png',
  './TemplateData/icon-128x128.png',
  './TemplateData/icon-256x256.png',
  './TemplateData/progress-bar-empty-dark.png',
  './TemplateData/progress-bar-empty-dark.png.meta',
  './TemplateData/progress-bar-full-dark.png',
  './TemplateData/progress-bar-full-light.png',
  './TemplateData/style.css',
  './TemplateData/unity-logo-dark.png',
  './TemplateData/unity-logo-light.png',
  './TemplateData/webgl-logo.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response ? response : fetch(event.request);
      })
  );
});
