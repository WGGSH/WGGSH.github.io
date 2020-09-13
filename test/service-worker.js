const STATIC_DATA = ['index.html']

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('cache_v1').then(function (cache) {
      return cache.addAll(STATIC_DATA)
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
