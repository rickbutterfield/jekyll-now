// if ('serviceWorker' in navigator) {
//   console.log('CLIENT: service worker registration in progress.');
//   navigator.serviceWorker.register('/sw.js').then(function () {
//     console.log('CLIENT: service worker registration complete.');
//   }, function () {
//     console.error('CLIENT: service worker registration failure.');
//   });
// } else {
//   console.warn('CLIENT: service worker is not supported.');
// }

document.body.classList.remove('no-js');

let isDarkMode = false;

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  isDarkMode = true;
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
  if (e.matches) {
    isDarkMode = true;
  } else {
    isDarkMode = false;
  }
  setModeOptions();
});

function setModeOptions() {
  document.body.dataset.darkMode = isDarkMode;
}
setModeOptions();

function toggleMode(e) {
  e.preventDefault();
  let darkModeCheck = document.body.dataset.darkMode;
  isDarkMode = !JSON.parse(darkModeCheck);
  setModeOptions();
};

const modeToggle = document.querySelector('.js-mode-toggle');
if (modeToggle) {
  modeToggle.addEventListener('click', toggleMode);
}