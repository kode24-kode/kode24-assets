/**
 * Draws sponsors in the left menu from api
 * @param {*} sponsors
 * @returns
 */
function getSponsorsMarkup(sponsors) {
  return `
  ${sponsors.goldPatreon
    .map(
      (sponsors) => `<li class="gold preview">
      <a href="#" target="new_window">
        <img src="${sponsors.logo}" alt="${sponsors.name}" loading="lazy">
        <p>${sponsors.title}</p>
      </a>
    </li>`
    )
    .join("")}

  ${sponsors.silverPatreon
    .map(
      (sponsors) => `<li class="silver preview">
      <a href="#" target="new_window"><img src="${sponsors.logo}" alt="${sponsors.name}"></a>
    </li>`
    )
    .join("")}

  `;
}
export function initSponsorsLoading() {
  const sponsorsNode = document.createElement("div");
  sponsorsNode.id = "company-sponsors-list";
  return sponsorsNode;
}
export function initSponsors(sponsors, sponsorsNode) {
  const sponsorsMarkup = getSponsorsMarkup(sponsors);
  sponsorsNode.innerHTML = sponsorsMarkup;
}
