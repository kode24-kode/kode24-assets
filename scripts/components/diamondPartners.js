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
    ${diamondPartners
      .map(
        (partner) => `
      <li>
      <a href="${partner.link}"><img src="${partner.banner}"></a>
      </li>
      `
      )
      .join("")}
      </ul>
      <div class="listing-actions">
        <a href="https://www.kode24.no/annonse/na-lanserer-vi-egen-landingsside-for-annonsorer/77370110" class="button">+ bli partner</a>
      </div>
      `;
  }
  element.innerHTML = "";
  element.append(diamondPartnersContainer);
}

export function initDiamondPartnersLoading(numberOfItems) {
  let diamondPartnersContainer = document.createElement("div");
  let dummyAds = Array.from(Array(numberOfItems).keys());
  diamondPartnersContainer.innerHTML = `
      <div class="diamond-partners-list preview-list preview row">
      <h3>kode24-partnere</h3>
      <ul>
      
        
          ${dummyAds
            .map(
              () =>
                `<li><div class="dummy-diamond-partner-list-item"></div></li>`
            )
            .join("")}
        
        
        
        </ul>
        </div>    
  `;
  console.log("new node", diamondPartnersContainer);
  return diamondPartnersContainer;
}
