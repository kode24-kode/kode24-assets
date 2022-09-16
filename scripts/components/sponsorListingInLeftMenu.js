import { getSponsorsFromApi } from '../API/api';
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
      <a href="${sponsors.url}" target="new_window">
        <img src="${sponsors.logo}" alt="${sponsors.name}" loading="lazy">
        <p>${sponsors.message}</p>
      </a>
    </li>`
    )
    .join('')}

  ${sponsors.silver
    .map(
      (sponsors) => `<li class="silver preview">
      <a href="${sponsors.url}" target="new_window"><img src="${sponsors.logo}" alt="${sponsors.name}"></a>
    </li>`
    )
    .join('')}

  `;
}

export async function initSponsors(elementToAppendTo) {
  const sponsorsMarkup = getSponsorsMarkup(
    await getSponsorsFromApi()
  );
  document.querySelector(elementToAppendTo).innerHTML =
    sponsorsMarkup;
}
