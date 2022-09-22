import { initCommon } from './common';
import { initFrontAdComponents } from './components/frontAdComponents';
import { initEventCardsList } from './components/eventCardsList';
import { getArticlePreviewList } from './functions/getArticlePreviewList';
import {
  getFrontPreviewData,
  getAdsForFrontFromApi,
  getContentAdsFromApi,
} from './API/api';
import { drawByline } from './components/drawByline';
import { drawCommentRow } from './components/drawCommentRow';

/**
 * inits everything that needs to run on a kode24 front (/, /emne/react, etc...)
 */
export async function initFrontend() {
  const commonFunctions = initCommon();
  // init loading animation for right aside
  commonFunctions.initAsideLoading('desktop-sidemenu-front');
  // get ids and nodes of all article previews on page
  const { articleIds, articlesList } = getArticlePreviewList();
  // get data for all article previews on page
  const articlePreviewListData = await getFrontPreviewData(
    articleIds
  );
  // draw bylines for all article previews on page
  drawByline(articlePreviewListData, articleIds, articlesList);
  // draw comment rows for all article previews on page
  drawCommentRow(articlePreviewListData, articleIds, articlesList);
  // init sponsors in left sidebar
  commonFunctions.initSponsors('#company-sponsors-list ul');

  // fetch data for job listings
  const { listings, premiumIds } = await getAdsForFrontFromApi();
  // filter list of premium ads
  const premiumAds = listings.filter((ad) =>
    premiumIds.includes(ad.id)
  );
  // filter list of non-premium ads
  const nonPremiumAds = listings.filter(
    (ad) => !premiumIds.includes(ad.id)
  );
  // fetch content ads
  const contentAds = await getContentAdsFromApi();

  // update job listings count in top menu
  commonFunctions.addNumberToJobCounterInTopMenu(listings.length);

  // init component that shows content articles and job listings in front feed
  const frontAdElements = initFrontAdComponents(
    '#front-articles-list >.row:not(.show-for-small-only, .show-for-medium-up, .added):nth-child(2n+3)',
    [...contentAds, ...premiumAds].filter((ad) => ad && ad.id)
  );
  // init box that shows job listings
  commonFunctions.initPremiumJobComponent(
    premiumAds,
    '#front-articles-list >.row:not(.show-for-small-only, .show-for-medium-up, .added):nth-child(5)'
  );

  // init ad elements listed in right column
  const asideElements =
    await commonFunctions.initAdElementsInRightColumn(
      '#desktop-sidemenu-front',
      premiumAds,
      nonPremiumAds
    );
  // init container for calendar events shown in front feed
  const numberOfEvents = await initEventCardsList(
    '#front-articles-list >.row:not(.show-for-small-only, .show-for-medium-up, .added):nth-child(11)'
  );
  // add number of active events to counter in top menu
  commonFunctions.addNumberToEventCounterInTopMenu(numberOfEvents);

  // track impressions for all ads on frontpage
  commonFunctions.trackInScreenImpressions([
    ...frontAdElements,
    ...asideElements,
  ]);
}
