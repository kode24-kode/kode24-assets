/**
 * Adds number of events to counter in top menu
 * @param {*} numberOfAds
 */
export function addNumberToEventCounterInTopMenu(numberOfAds) {
  document.querySelector("#events-menu-item .counter").innerHTML = numberOfAds;
}
