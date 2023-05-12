import { shuffleArray } from "../functions/shuffleArray.js";
/**
 * Displays box of diamond partners
 */

export function initDiamondPartners(node, partners) {
  node.innerHTML = `
    <h3>Se karrieremuligheter <br />hos våre partnere</h3>
    <ul>
    ${shuffleArray(partners)
      .slice(0, 8)
      .map(
        (partner) => `
      <li>
      <a href="${`https://www.kode24.no/partner/${partner.slug}`}">
        <img class="dark" src="${partner.darkLogo}" alt="partner logo ${
          partner.name
        }">
        <img class="light" src="${partner.lightLogo}" alt="partner logo ${
          partner.name
        }">
        ${
          partner.tooltip &&
          `<span class="description">${partner.tooltip}</span>`
        }
      </a>
      </li>
      `
      )
      .join("")}
      </ul>
      `;
}

export function initDiamondPartnersLoading() {
  var diamondPartnersContainer = document.createElement("div");
  diamondPartnersContainer.classList.add("diamond-partners-list");
  return diamondPartnersContainer;
}
