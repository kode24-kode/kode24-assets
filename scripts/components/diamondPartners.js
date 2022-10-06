/**
 * Displays box of diamond partners
 */

export function initDiamondPartners(diamondPartners, selector) {
  if (diamondPartners && diamondPartners.length) {
    var diamondPartnersContainer = document.createElement("div");
    diamondPartnersContainer.classList.add("diamond-partners-list");
    diamondPartnersContainer.innerHTML = `
    <h3>kode24-partnere</h3>
    <ul>
    ${diamondPartners.map(
      (partner) => `
      <li>
      <a href="${partner.url}"><img src="${partner.logo}"></a>
      </li>
      `
    )}
      </ul>
      <p class="call-to-action">Lyst til å bli partner og få din egen landingsside?<br/> <a href="https://www.kode24.no/annonse/na-lanserer-vi-egen-landingsside-for-annonsorer/77370110"> Les mer her! </a></p>
      `;
  }
  console.log(
    "hallo",
    selector,
    document.querySelector(selector),
    diamondPartnersContainer
  );
  document.querySelector(selector).prepend(diamondPartnersContainer);
}
