/**
 * Draws sponsors in the left menu from api
 * @param {*} sponsors
 * @returns
 */
function getSponsorsMarkup(sponsors) {
  return `
  ${sponsors.gold
    .map(
      (sponsors) => `<li class="gold preview">
      <div>
        <img src="${sponsors.logo}" alt="${sponsors.name}" loading="lazy">
        <p>${sponsors.message}</p>
      </div>
    </li>`
    )
    .join('')}

  ${sponsors.silver
    .map(
      (sponsors) => `<li class="silver preview">
      <img src="${sponsors.logo}" alt="${sponsors.name}" loading="lazy">
    </li>`
    )
    .join('')}

  `;
}

export async function initSponsors(sponsors, elementToAppendTo) {
  const sponsorsMarkup = getSponsorsMarkup(sponsors);
  document.querySelector(elementToAppendTo).innerHTML =
    sponsorsMarkup;
}
