/**
 * Adds counter to job icon in top menu
 * @param {*} numberOfAds
 */
export function addNumberToJobCounterInTopMenu(numberOfAds: number) {
  const eventCounterElement = document.querySelector(
    '#job-menu-item .counter'
  );
  if (eventCounterElement && eventCounterElement.innerHTML) {
    eventCounterElement.innerHTML = numberOfAds.toString();
  }
}
