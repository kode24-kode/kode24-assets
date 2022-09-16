/**
 * Handles clicks on the light switch toggle button
 * on the top right of the page
 */
export function handleLightSwitchToggle() {
  let pageBody = document.getElementById('page-body');
  let lightSwitchButton = document.getElementById('mode-toggle');
  let lightButton = document.getElementById(
    'light-switch-toggler-icon-left'
  );
  let darkButton = document.getElementById(
    'light-switch-toggler-icon-right'
  );

  if (document.cookie.indexOf('light') > -1) {
    pageBody.classList.add('light');
    lightSwitchButton.classList.add('on');
  } else {
    pageBody.classList.remove('light');
    lightSwitchButton.classList.remove('on');
  }

  function toggleLight() {
    lightSwitchButton.classList.toggle('on');
    pageBody.classList.add('animate');
    pageBody.classList.toggle('light');
    if (lightSwitchButton.classList.contains('on')) {
      document.cookie =
        'light=hest; expires=Fri, 3 Aug 2040 20:47:11 UTC; path=/;';
    } else {
      document.cookie =
        'light=; expires=Fri, 3 Aug 2017 20:47:11 UTC; path=/;';
    }
  }

  lightButton.onclick = toggleLight;
  darkButton.onclick = toggleLight;
}
