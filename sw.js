const version = 'v2.0.0';

const offlineFundamentals = [
  'index.html',
  'blog.html',
  'style.css',
  'site.js',
  '/images/Rick.jpg'
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(version + 'fundamentals')
      .then(function (cache) {
        return cache.addAll(offlineFundamentals);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("fetch", function (event) {
  let requestUrl = event.request.url;
  let isGetRequest = event.request.method === 'GET';
  let isWhitelistedUrl =
    requestUrl.startsWith('https://rickbutterfield.com') ||
    requestUrl.startsWith('https://use.typekit.net') ||
    requestUrl.startsWith('https://cdnjs.cloudflare.com');

  if (!isGetRequest || !isWhitelistedUrl) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      function fetchAndCache() {
        return fetch(event.request).then(response => {
          let cacheCopy = response.clone();

          caches.open(version).then(cache => cache.put(event.request, cacheCopy));
          return response;
        });
      }

      if (!response) { return fetchAndCache(); }
      return response;
    })
  );
});


self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return !key.startsWith(version);
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
  );
});