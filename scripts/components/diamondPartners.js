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
        <img class="dark" src="${partner.darkLogo}" alt="partner logo ${
          partner.name
        }">
        <img class="light" src="${partner.lightLogo}" alt="partner logo ${
          partner.name
        }">
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
    lightLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-dnb-light.png",
    darkLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-dnb-dark.png",
    title: "We Aim Higher",
    url: "https://www.kode24.no/partner/dnb",
  },
  {
    name: "Avantgarde Search",
    lightLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-avantgardesearch-light.png",
    darkLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-avantgardesearch-dark.png",
    title: "Looking for talent?",
    url: "https://www.kode24.no/partner/avantgarde-search",
  },
  {
    name: "Enso",
    lightLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-enso-light.png",
    darkLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-enso-dark.png",
    title: "Mennesker du vil jobbe med",
    url: "https://www.kode24.no/partner/enso",
  },
  {
    name: "Telenor",
    lightLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-telenor-light.png",
    darkLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-telenor-dark.png",
    logoUrl: "telenor",
    title: "Vi har mot til å forandre – har du?",
    url: "https://www.kode24.no/partner/telenor",
  },
  {
    name: "Bouvet",
    lightLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-bouvet-light.png",
    darkLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-bouvet-dark.png",
    title: "Vi er samfunsbyggere",
    url: "https://www.kode24.no/partner/bouvet",
  },
  {
    name: "Shortcut",
    lightLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-shortcut-light.png",
    darkLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-shortcut-dark.png",
    title: "We make apps for life",
    url: "https://www.kode24.no/partner/shortcut",
  },
  {
    name: "Geodata",
    lightLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-geodata-light.png",
    darkLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-geodata-dark.png",

    title: "Vit hvor du er – vit hvor du skal",
    url: "https://www.kode24.no/partner/geodata",
  },
  {
    name: "Computas",
    lightLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-computas-light.png",
    darkLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-computas-dark.png",
    title: "Mulig du er et geni, men funker du sammen med andre glupinger?",
    url: "https://www.kode24.no/partner/computas",
  },
  {
    name: "Twoday",
    lightLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-twoday-light.png",
    darkLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-twoday-dark.png",
    title: "La oss kode fremtiden sammen",
    url: "https://www.kode24.no/partner/twoday",
  },
  {
    name: "Boitano",
    lightLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-boitano-light.png",
    darkLogo:
      "https://www.kode24.no/files/2023/02/17/kode24-partner-boitano-dark.png",
    title: "Jobb med alt fra start-ups til de største merkevarene.",
    url: "https://www.kode24.no/partner/boitano",
  },
  {
    name: "Skatteetaten",
    lightLogo:
      "https://www.dagbladet.no/files/2023/03/03/kode24-partner-skatteetaten2-light.png",
    darkLogo:
      "https://www.dagbladet.no/files/2023/03/03/kode24-partner-skatteetaten2-dark.png",
    title: "Bli med på å gjøre Norge enklere å bruke",
    url: "https://www.kode24.no/partner/skatteetaten",
  },
];
