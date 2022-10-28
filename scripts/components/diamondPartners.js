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
    ${diamondPartners
      .map(
        (partner) => `
      <li>
      <a href="${partner.url}"><img src="${partner.logo}"></a>
      </li>
      `
      )
      .join("")}
      </ul>
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
