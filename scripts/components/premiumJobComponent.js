import { postImpressions } from '../API/api';
/**
 * Draws a list of job posts on front page
 * @param {*} selector
 * @param {*} position
 */
export async function initPremiumJobComponent(
  ads,
  selector,
  appendToggle
) {
  // post impression for all ads rendered on page
  postImpressions([...ads.map((ad) => ad.id)]);
  // get markup for all ads
  let jobAdsMarkup = getJobAdsMarkup(ads);

  // create job component element
  let newPremiumJobComponent = document.createElement('div');
  newPremiumJobComponent.classList.add('row', 'added');
  newPremiumJobComponent.innerHTML = `
    <article class="preview preview-list">
      <div class="article-preview-text">
        <div class="labels">
          <span class="label job">Ledige stillinger</span>
        </div>
      </div>
      <div class="listing">
        ${getJobAdsMarkup(ads)}
      </div>
      <div class="listing-actions">
        <a href="/jobb" class="button">Vis alle ledige stillinger</a>
      </div>
    </article>
    `;

  // Add after specified element
  if (appendToggle) {
    document.querySelector(selector).append(newPremiumJobComponent);
  } else {
    document.querySelector(selector).after(newPremiumJobComponent);
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
    .join('');
}
