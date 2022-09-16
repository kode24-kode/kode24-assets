import { postImpressions } from '../API/api';
/**
 * Injects ad above given elements specified in selector
 * @param {*} premiumAds
 * @param {*} selector
 */
export function initFrontAdComponents(selector, ads) {
  let adsForTracking = [];
  // run through all eligable elements in front feed
  document.querySelectorAll(selector).forEach(function (node) {
    // if we still have ads to distribute in our ads array
    if (ads.length) {
      // fetch the first ad in the array
      let ad = ads.shift();
      // create new ad element and get markup for it
      let newAd = document.createElement('div');
      newAd.classList.add('row', 'added');
      newAd.innerHTML = getMarkupForNativeAd(ad);
      // insert the new ad element after the current node
      node.after(newAd);

      // add ad to traffic tracking array
      adsForTracking.push({
        id: ad.id,
        fromTop: newAd.getBoundingClientRect().top,
        element: newAd,
        context: [
          `tag=article&id=article_${ad.id}&class=columns,compact,large-12,medium-12,preview,small-12&dataId=${ad.id}&i=1&n=1`,
          `tag=div&class=row&i=11&n=39`,
          `tag=div&id=front-articles-list&i=2&n=3`,
          `tag=main&class=frontpage,wide&i=3&n=8`,
        ],
        published_url: ad.published_url,
        title: ad.title,
      });
    }
  });
  // post impressions to server
  postImpressions([...adsForTracking.map((ad) => ad.id)]);
  return adsForTracking;
}

/**
 * Generate markup for a front preview ad
 * @param {*} ad
 * @returns
 */
function getMarkupForNativeAd(ad) {
  if (!ad) return '';
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
