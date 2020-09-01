---
  layout: null
---

const version = "v{{'now' | date: '%s' }}";

const offlineFundamentals = [
  'index.html',
  'blog.html',
  'offline.html',
  'site.js',
  '/images/Rick.webp',
  '/images/Rick.jpg'
];

const offlinePage = '/offline.html'

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

  let destination = event.request.destination;
  let isFont = destination === 'font';
  let isDocument = destination === 'document';
  let isImage = destination === 'image' || destination === '' && requestUrl.endsWith('.svg');
  let isScript = destination === 'script';
  let isStyle = destination === 'style';

  let isWhitelistedUrl =
    requestUrl.startsWith('http://127.0.0.1') ||
    requestUrl.startsWith('http://localhost') ||
    requestUrl.startsWith('https://rickbutterfield.com') ||
    requestUrl.startsWith('https://use.typekit.net') ||
    requestUrl.startsWith('https://cdnjs.cloudflare.com');

  if (!isGetRequest || !isWhitelistedUrl) {
    return;
  }

  if (isFont || isImage || isScript || isStyle) {
    event.respondWith(
      caches.match(event.request).then(response => {
        function fetchAndCache() {
          return fetch(event.request).then(response => {
            let cacheCopy = response.clone();

            caches.open(version).then(cache => cache.put(event.request, cacheCopy));
            return response;
          }).catch(error => {
            return caches.match(offlinePage);
          });
        }

        if (!response) { return fetchAndCache(); }
        return response;
      })
    );
  }
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