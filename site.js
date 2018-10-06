if (window.location.hostname !== "127.0.0.1") {
  // ServiceWorker is a progressive technology. Ignore unsupported browsers
  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('/sw.js').then(function () {
      console.log('CLIENT: service worker registration complete.');
    }, function () {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  }
}
else {
  console.log('CLIENT: service worker not running locally');
}