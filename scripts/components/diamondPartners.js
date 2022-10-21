/**
 * Displays box of diamond partners
 */

export function initDiamondPartners(diamondPartners, element) {
  if (diamondPartners && diamondPartners.length) {
    var diamondPartnersContainer = document.createElement("div");
    diamondPartnersContainer.classList.add(
      "diamond-partners-list",
      "preview-list",
      "preview",
      "row"
    );
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
      `;
  }
  element.innerHTML = "";
  element.append(diamondPartnersContainer);
}

export function initDiamondPartnersLoading() {
  var diamondPartnersContainer = document.createElement("div");
  return diamondPartnersContainer;
}
