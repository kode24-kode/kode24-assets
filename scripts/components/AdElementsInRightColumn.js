import { postImpressions } from '../API/api';
/**
 * Creates markup for commercial right sidebar.
 * A combination of premium ads and regular ads.
 * Adds them to supplied selector.
 * @param {*} selector
 */
export function initAdElementsInRightColumn(
  selector,
  premiumAdsList,
  nonPremiumAdsList
) {
  // send impressions
  postImpressions([
    ...premiumAdsList.map((ad) => ad.id),
    ...nonPremiumAdsList.map((ad) => ad.id),
  ]);

  // get markup for ad elements
  let asideMarkup = drawAsideMarkup(
    premiumAdsList,
    nonPremiumAdsList
  );

  // add markup to element in html. Assumes element is id
  document.querySelector(selector).innerHTML = asideMarkup;

  // must be done after elements have been rendered, so we know their position in the dom.
  const premiumAdsListElements = document.querySelectorAll(
    '#desktop-sidemenu-front .preview.premium'
  );
  const nonPremiumAdsListElements = document.querySelectorAll(
    '#desktop-sidemenu-front .preview.regular'
  );

  // tracking
  return [
    ...premiumAdsList.map((ad, index) => {
      let element = premiumAdsListElements[index];
      let context = [
        `tag=article&id=article_${ad.id}&class=preview,premium,job-aside-preview&dataId=${ad.id}&i=1&n=1`,
      ];
      let object = {
        id: ad.id,
        fromTop: element.getBoundingClientRect().top,
        element: element,
        context: context,
        published_url: ad.published_url,
        title: ad.title,
      };
      return object;
    }),
    ...nonPremiumAdsList.map((ad, index) => {
      const element = nonPremiumAdsListElements[index];
      let context = [
        `tag=article&id=article_${ad.id}&class=preview,regular,job-aside-preview&dataId=${ad.id}&i=1&n=1`,
      ];
      let object = {
        id: ad.id,
        fromTop: element.getBoundingClientRect().top,
        element: element,
        context: context,
        published_url: ad.published_url,
        title: ad.title,
      };

      return object;
    }),
  ];
}
/**
 * Creates markup for commercial elements in right sidebar
 * @param {*} premiumAdsList
 * @param {*} nonPremiumAdsList
 * @returns
 */
function drawAsideMarkup(premiumAdsList, nonPremiumAdsList) {
  return `
        <h3>☕ Ledige stillinger</h3>
        ${premiumAdsList
          .map(
            (ad) => `
            <article id="article_${ad.id}" class="preview premium job-aside-preview" itemscope itemprop="itemListElement" itemType="http://schema.org/ListItem" data-id="${ad.id}">
                <a itemprop="url" href="//www.kode24.no/${ad.published_url}">
                    <figure id="${ad.id}">
                        <img src="https://dbstatic.no${ad.company.imageUrl}" loading="lazy" />
                    </figure>
                    <div class="article-preview-text">
                        <div class="labels"><span class="label">${ad.company.name}</span></div>
                        <h1 class="headline">${ad.title}</h1>
                    </div>
                </a>
            </article>
        `
          )
          .join('')}
          <h3>☕ Flere ledige stillinger</h3>
          ${nonPremiumAdsList
            .map(
              (ad) => `
              <article id="article_${ad.id}" class="preview regular job-aside-preview" itemscope itemprop="itemListElement" itemType="http://schema.org/ListItem" data-id="${ad.id}">
                  <a itemprop="url" href="//www.kode24.no/${ad.published_url}">
                      <figure id="${ad.id}">
                          <img src="https://dbstatic.no${ad.company.imageUrl}" loading="lazy" />
                      </figure>
                      <div class="article-preview-text">
                          <div class="labels"><span class="label">${ad.company.name}</span></div>
                          <h1 class="headline">${ad.title}</h1>
                      </div>
                  </a>
              </article>
          `
            )
            .join('')}
    `;
}
