/**
 * Adds number of events to counter in top menu
 * @param {*} numberOfAds
 */
export function addNumberToEventCounterInTopMenu(
  numberOfAds: number
) {
  const eventCounterElement = document.querySelector(
    '#events-menu-item .counter'
  );
  if (eventCounterElement && eventCounterElement.innerHTML) {
    eventCounterElement.innerHTML = numberOfAds.toString();
  }
}
