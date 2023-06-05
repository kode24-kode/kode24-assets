/**
 * Adds counter to job icon in top menu
 * @param {*} numberOfAds
 */
export function addNumberToJobCounterInTopMenu(numberOfAds) {
  document.querySelector("#job-menu-item .counter").innerHTML = numberOfAds;
}
