/**
 * Handles clicks on the light switch toggle button
 * on the top right of the page
 */

import Cookies from 'js-cookie';

export function handleLightSwitchToggle() {
  let lightSwitchButton = document.getElementById('mode-toggle');
  let lightButton = document.getElementById(
    'light-switch-toggler-icon-left'
  );
  let darkButton = document.getElementById(
    'light-switch-toggler-icon-right'
  );

  let theme = Cookies.get('theme');
  setMode(theme);

  lightButton.onclick = () => setMode('light', true);
  darkButton.onclick = () => setMode('dark', true);

  function setMode(modeString, updateCookie) {
    let pageBody = document.getElementById('page-body');
    let lightSwitchButton = document.getElementById('mode-toggle');
    pageBody?.classList.add('animate');

    if (modeString === 'light') {
      pageBody?.classList.add('light');
      pageBody?.classList.remove('dark');
    } else if (modeString === 'dark') {
      pageBody?.classList.remove('light');
      pageBody?.classList.add('dark');
    } else {
      pageBody?.classList.remove('light', 'dark');
    }

    if (updateCookie) {
      Cookies.set('theme', modeString, { expires: 3600, path: '' });
    }
  }
}
