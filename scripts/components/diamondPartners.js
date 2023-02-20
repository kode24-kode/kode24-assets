import { shuffleArray } from "../functions/shuffleArray.js";
/**
 * Displays box of diamond partners
 */

export function initDiamondPartners() {
  var diamondPartnersContainer = document.createElement("div");
  diamondPartnersContainer.classList.add("diamond-partners-list");
  diamondPartnersContainer.innerHTML = `
    <h3>Se karrieremuligheter <br />hos våre partnere</h3>
    <ul>
    ${shuffleArray(partners)
      .map(
        (partner) => `
      <li>
      <a href="${partner.url}">
        <img class="dark" src="https://www.kode24.no/files/2023/02/17/kode24-partner-${
          partner.logoUrl
        }-dark.png" alt="partner logo ${partner.name}">
        <img class="light" src="https://www.kode24.no/files/2023/02/17/kode24-partner-${
          partner.logoUrl
        }-light.png" alt="partner logo ${partner.name}">
        ${partner.title && `<span class="description">${partner.title}</span>`}
      </a>
      </li>
      `
      )
      .join("")}
      </ul>
      `;
  return diamondPartnersContainer;
}

const partners = [
  {
    name: "DNB",
    logoUrl: "dnb",
    title: "We Aim Higher",
    url: "https://www.kode24.no/partner/dnb",
  },
  {
    name: "Avantgarde Search",
    logoUrl: "avantgardesearch",
    title: "Looking for talent?",
    url: "https://www.kode24.no/partner/avantgarde-search",
  },
  {
    name: "Enso",
    logoUrl: "enso",
    title: "Mennesker du vil jobbe med",
    url: "https://www.kode24.no/partner/enso",
  },
  {
    name: "Telenor",
    logoUrl: "telenor",
    title: "Vi har mot til å forandre – har du?",
    url: "https://www.kode24.no/partner/telenor",
  },
  {
    name: "Bouvet",
    logoUrl: "bouvet",
    title: "Vi er samfunsbyggere",
    url: "https://www.kode24.no/partner/bouvet",
  },
  {
    name: "Shortcut",
    logoUrl: "shortcut",
    title: "We make apps for life",
    url: "https://www.kode24.no/partner/shortcut",
  },
  {
    name: "Geodata",
    logoUrl: "geodata",
    title: "Vit hvor du er – vit hvor du skal",
    url: "https://www.kode24.no/partner/geodata",
  },
  {
    name: "Computas",
    logoUrl: "computas",
    title: "Mulig du er et geni, men funker du sammen med andre glupinger?",
    url: "https://www.kode24.no/partner/computas",
  },
  {
    name: "Twoday",
    logoUrl: "twoday",
    title: "La oss kode fremtiden sammen",
    url: "https://www.kode24.no/partner/twoday",
  },
  {
    name: "Boitano",
    logoUrl: "boitano",
    title: "Jobb med alt fra start-ups til de største merkevarene.",
    url: "https://www.kode24.no/partner/boitano",
  },
  {
    name: "Skatteetaten",
    logoUrl: "skatteetaten",
    title: "Bli med på å gjøre Norge enklere å bruke",
    url: "https://www.kode24.no/partner/skatteetaten",
  },
];
