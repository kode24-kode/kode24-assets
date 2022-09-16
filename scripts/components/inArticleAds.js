import { postImpressions } from '../API/api.js';
/**
 * Draw ads inline in the article
 * starts with content ads, then job ads
 * @param {*} selector
 * @param {*} premiumAds
 * @param {*} contentAds
 * @returns
 */
export function initInArticleAds(selector, premiumAds, contentAd) {
  let allAds = [contentAd, ...premiumAds];
  let adsForTracking = [];
  document
    .querySelectorAll(selector)
    .forEach(function (element, index) {
      if ((index + 1) % 2 == 1) {
        let ad = allAds.shift();
        let adElement = document.createElement('div');
        adElement.innerHTML = getMarkupForNativeAd(ad);
        element.before(adElement);

        let elementClasses = element.className
          .split(' ')
          .filter((s) => s)
          .join(',');
        const trackingElement = {
          id: ad.id,
          fromTop: element.getBoundingClientRect().top,
          element: element,
          context: [
            `tag=article&id=article_${ad.id}&class=${elementClasses}&dataId=${ad.id}&i=1&n=1`,
            `tag=div&class=body-copy,lab-bodytext-content,small-12,medium-10,large-8,medium-centered,large-left,columns,end&i=1&n=1`,
            `tag=div&class=row`,
            `tag=article&class=article-entity&i=1&n=1`,
          ],
          published_url: ad.published_url,
          title: ad.title,
        };
        adsForTracking.push(trackingElement);
      }
    });
  postImpressions([...adsForTracking.map((ad) => ad.id)]);
  return adsForTracking;
}

function getMarkupForNativeAd(ad) {
  return `
        <article id="article_${
          ad.id
        }" class="preview   columns large-12 small-12 medium-12 native-advertisement ${
    ad.section === 'annonse' ? 'content' : 'job'
  }" itemscope="" itemprop="itemListElement" itemtype="http://schema.org/ListItem" role="article" data-id="c177e9ab-2456-4439-e36b-f426cfbab76a" data-label="">
            <a itemprop="url" href="https://www.kode24.no${
              ad.published_url
            }">
                <figure id="${
                  ad.image
                }" style="width: 980px; padding-bottom: 53.861386138613994%;">
                    <img class="" itemprop="image" alt="logo" src="//www.kode24.no/images/${
                      ad.section === 'annonse'
                        ? `${ad.image}.jpg?width=400`
                        : ad.company.imageUrl
                    }" loading="lazy">
                </figure>
                <div class="article-preview-text">
                    <div class="labels">
                        <span class="label">${
                          ad.section === 'annonse'
                            ? `Annonsørinnhold fra ${ad.company.name}`
                            : `Ledig stilling fra ${ad.company.name}`
                        }</span>
                    </div>
                    <h1 class="headline large-size-36 text- small-size-29">
                        <span class="headline-title-wrapper">${
                          ad.title
                        }</span>
                    </h1>
                </div>
            </a>
        </article>
    `;
}
