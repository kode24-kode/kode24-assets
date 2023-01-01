import { initCommon } from './common';
import { initFrontAdComponents } from './components/frontAdComponents';
import { getArticlePreviewList } from './functions/getArticlePreviewList';
import { getFrontPreviewData } from './API/api';
import { drawCommentRow } from './components/drawCommentRow';
import { getNodes } from './functions/getNodes';
import { getPrettyFormatDateString } from './functions/getPrettyFormatDateString';
import { trackInScreenImpressions } from './functions/inScreenAdImpressionTracker';
import { shuffleArray } from './functions/shuffleArray';
import { limitArray } from './functions/limitArray';
import {
  initDesktopRowLoading,
  initDesktopRow,
} from './components/drawDesktopRow';
import {
  initJobAdsComponent,
  initJobAdsComponentLoading,
} from './components/JobAdsComponent';
import {
  initEventCardsListLoading,
  initEventCardsList,
} from './components/eventCardsList';

/**
 * inits everything that needs to run on a kode24 front (/, /emne/react, etc...)
 */
export async function initFrontend() {
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

  const {
    premiumAds,
    nonPremiumAds,
    contentAds,
    eventData,
    partnerPage,
    frontPageData,
  } = await initCommon();

  // init job ad component in front feed
  const desktopRowNode = initDesktopRowLoading();
  if (document.getElementById('desktop-rows'))
    document.getElementById('desktop-rows').append(desktopRowNode);
  const JobAdsComponentNode = initJobAdsComponentLoading(10);
  const eventCardsListNode = initEventCardsListLoading();
  // init box that shows job listings
  console.log(frontPageData);
  initDesktopRow(desktopRowNode, frontPageData.frontpage);

  initJobAdsComponent(
    premiumAds,
    JobAdsComponentNode,
    'replace',
    'utvalgte stillinger'
  );

  // if we have a partner page, we should not show ads
  if (!partnerPage) {
    //initAsideLoading('desktop-sidemenu-front');
    // init component that shows content articles and job listings in front feed
    const frontAdElements = initFrontAdComponents(
      getNodes(
        '.article-previews .row:not(.show-for-small-only, .show-for-medium-up, .added)',
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      ),
      [
        contentAds ? shuffleArray(contentAds)[0] : {},
        ...limitArray(shuffleArray(premiumAds), 6),
      ].filter((obj) => obj)
    );

    /*

     */
    // track impressions for all ads on frontpage
    trackInScreenImpressions([...frontAdElements]);
  }
}
