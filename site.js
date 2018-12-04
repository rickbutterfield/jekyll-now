if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker.register('/sw.js').then(function () {
    console.log('CLIENT: service worker registration complete.');
  }, function () {
    console.error('CLIENT: service worker registration failure.');
  });
} else {
  console.warn('CLIENT: service worker is not supported.');
}