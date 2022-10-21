import { postImpressions } from "../API/api";

/**
 * Created dummy ad element for showing while loading job ads
 * creates a dummy element
 * returns a container for ads to replace
 * @param {*} selector
 */
export const initJobAdsComponentLoading = (numberOfElements) => {
  let element = document.createElement("div");
  // create array with number of elements
  let dummyAds = Array.from(Array(numberOfElements).keys());
  element.innerHTML = `
        <div class="dummy-aside-content row  job-list preview-list">
        <h3></h3>
        ${dummyAds
          .map(
            (ad) => `
            <article class="preview premium job-aside-preview" itemscope itemprop="itemListElement" itemType="http://schema.org/ListItem">
                <a itemprop="url" href="#">
                    <figure id="">
                    </figure>
                    <div class="article-preview-text">
                        <div class="labels"><span class="label"></span></div>
                        <h1 class="headline"></h1>
                    </div>
                </a>
            </article>
            
            `
          )
          .join("")}
        </div>`;
  return element;
};

/**
 * Draws a list of job posts on front page
 * @param {*} selector
 * @param {*} position
 */
export async function initJobAdsComponent(
  ads,
  JobAdsComponentNode,
  appendToggle,
  headerText
) {
  // post impression for all ads rendered on page
  postImpressions([...ads.map((ad) => ad.id)]);
  // get markup for all ads
  let jobAdsMarkup = getJobAdsMarkup(ads);
  console.log("node", JobAdsComponentNode);
  // create job component element
  let newPremiumJobComponent = document.createElement("div");
  newPremiumJobComponent.classList.add("row", "added");
  newPremiumJobComponent.innerHTML = `
    <article class="preview preview-list job-list">
      <h3 class="highlight">${headerText}</h3>
      <div class="listing">
        ${getJobAdsMarkup(ads)}
      </div>
      <div class="listing-actions">
        <a href="/jobb" class="button">Vis alle ledige stillinger</a>
      </div>
    </article>
    `;

  // Add after specified element
  if (JobAdsComponentNode) {
    if (appendToggle == "append") {
      JobAdsComponentNode.append(newPremiumJobComponent);
    } else if ("replace") {
      JobAdsComponentNode.innerHTML = "";
      JobAdsComponentNode.append(newPremiumJobComponent);
    } else if ("after") {
      JobAdsComponentNode.after(newPremiumJobComponent);
    }
  }
}

/**
 * Returns a string of markup for job posts
 * @param {*} ads
 * @returns
 */
function getJobAdsMarkup(ads) {
  return ads
    .map(function (ad) {
      return `
        <article id="article_${ad.id}" class="preview job" itemscope="" itemprop="itemListElement" itemtype="https://schema.org/ListItem" role="article" data-id="${ad.id}" data-label="">
          <a itemprop="url" href="${ad.published_url}">
            <figure class="">
              <img src="//www.kode24.no/images/${ad.company.imageUrl})" loading="lazy" />
            </figure>
            <div class="call-to-action-container">
              <div class="article-preview-text">
                  <div class="labels">
                      <span class="label">${ad.company.name}</span>
                  </div>
                  <h1 class="headline">
                      ${ad.title}
                  </h1>
              </div>
              <div class="call-to-action">
                <span class="button action-button">Les mer</span>
              </div>
            </div>
          </a>
        </article>
    `;
    })
    .join("");
}