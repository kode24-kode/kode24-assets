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
import { isPagePartner } from './functions/isPagePartner';
import { setPartnerPageConfig } from './functions/setPartnerPageConfig';
import { getNodes } from './functions/getNodes';
import { getPrettyFormatDateString } from './functions/getPrettyFormatDateString';

/**
 * inits everything that needs to run on a kode24 front (/, /emne/react, etc...)
 */
export async function initFrontend() {
  document.getElementById(
    'date-frontpage'
  ).innerHTML = ` ${getPrettyFormatDateString()}`;

  const {
    initAsideLoading,
    initSponsors,
    addNumberToJobCounterInTopMenu,
    initPremiumJobComponent,
    initAdElementsInRightColumn,
    addNumberToEventCounterInTopMenu,
    trackInScreenImpressions,
    listings,
    premiumIds,
    premiumAds,
    nonPremiumAds,
    contentAds,
    eventData,
    partnerPage,
    initDiamondPartners,
  } = await initCommon();

  // if we have a partner page, we should not show ads
  if (!partnerPage) {
    //initAsideLoading('desktop-sidemenu-front');
    // get ids and nodes of all article previews on page
    const { articleIds, articlesList } = getArticlePreviewList();
    // get data for all article previews on page
    const articlePreviewListData = await getFrontPreviewData(
      articleIds
    );
    // draw bylines for all article previews on page
    //drawByline(articlePreviewListData, articleIds, articlesList);
    // draw comment rows for all article previews on page
    drawCommentRow(articlePreviewListData, articleIds, articlesList);
    // init component that shows content articles and job listings in front feed
    const frontAdElements = initFrontAdComponents(
      getNodes(
        '.article-previews .row:not(.show-for-small-only, .show-for-medium-up, .added)',
        [3, 5, 7, 9, 11, 13, 15, 19, 23, 27, 31]
      ),
      premiumAds
    );
    // init box that shows job listings
    initPremiumJobComponent(
      premiumAds,
      getNodes(
        '.article-previews .row:not(.show-for-small-only, .show-for-medium-up, .added)',
        [4]
      )
    );
    // init box that shows job listings
    initPremiumJobComponent(
      premiumAds,
      getNodes('#desktop-sidemenu-front', [1]),
      'append'
    );

    // init container for calendar events shown in front feed
    await initEventCardsList(
      eventData,
      getNodes('#desktop-sidemenu-front', [1]),
      'append'
    );
    const numberOfEvents = await initEventCardsList(
      eventData,
      getNodes(
        '.article-previews .row:not(.show-for-small-only, .show-for-medium-up, .added)',
        [11]
      )
    );
    // track impressions for all ads on frontpage
    trackInScreenImpressions([...frontAdElements, ...asideElements]);
  }
}
