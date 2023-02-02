/**
 * Displays box of diamond partners
 */

export function initDiamondPartners(diamondPartners, selector) {
  if (diamondPartners && diamondPartners.length) {
    var diamondPartnersContainer = document.createElement('div');
    diamondPartnersContainer.classList.add('diamond-partners-list');
    diamondPartnersContainer.innerHTML = `
    <h3>Se karrieremuligheter hos våre partnere</h3>
    <ul>
    ${diamondPartners
      .map(
        (partner) => `
      <li>
      <a href="${partner.url}"><img src="${partner.logo}" alt="partner logo ${partner.name}"></a>
      </li>
      `
      )
      .join('')}
      </ul>
      `;
    document
      .querySelector(selector)
      .prepend(diamondPartnersContainer);
  }
}
