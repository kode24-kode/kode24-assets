import { initCommon } from "./common";
import { initFrontAdComponents } from "./components/frontAdComponents";
import { initEventCardsList } from "./components/eventCardsList";
import { getArticlePreviewList } from "./functions/getArticlePreviewList";
import {
  getFrontPreviewData,
  getAdsForFrontFromApi,
  getContentAdsFromApi,
} from "./API/api";
import { drawByline } from "./components/drawByline";
import { drawCommentRow } from "./components/drawCommentRow";
import { isPagePartner } from "./functions/isPagePartner";
import { setPartnerPageConfig } from "./functions/setPartnerPageConfig";

/**
 * inits everything that needs to run on a kode24 front (/, /emne/react, etc...)
 */
export async function initFrontend() {
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
    sponsors,
  } = await initCommon();

  // if we have a partner page, we should not show ads
  if (!partnerPage) {
    initAsideLoading("desktop-sidemenu-front");
    // get ids and nodes of all article previews on page
    const { articleIds, articlesList } = getArticlePreviewList();
    // get data for all article previews on page
    const articlePreviewListData = await getFrontPreviewData(articleIds);
    initDiamondPartners(
      sponsors.diamond || [],
      "#front-articles-list .row:nth-child(2)"
    );
    // draw bylines for all article previews on page
    drawByline(articlePreviewListData, articleIds, articlesList);
    // draw comment rows for all article previews on page
    drawCommentRow(articlePreviewListData, articleIds, articlesList);
    // init component that shows content articles and job listings in front feed
    const frontAdElements = initFrontAdComponents(
      "#front-articles-list >.row:not(.show-for-small-only, .show-for-medium-up, .added):nth-child(2n+3)",
      [...contentAds, ...premiumAds].filter((ad) => ad && ad.id)
    );
    // init box that shows job listings
    initPremiumJobComponent(
      premiumAds,
      "#front-articles-list >.row:not(.show-for-small-only, .show-for-medium-up, .added):nth-child(5)"
    );
    // init ad elements listed in right column
    const asideElements = await initAdElementsInRightColumn(
      "#desktop-sidemenu-front",
      premiumAds,
      nonPremiumAds
    );
    // init container for calendar events shown in front feed
    const numberOfEvents = await initEventCardsList(
      eventData,
      "#front-articles-list >.row:not(.show-for-small-only, .show-for-medium-up, .added):nth-child(11)"
    );
    // track impressions for all ads on frontpage
    trackInScreenImpressions([...frontAdElements, ...asideElements]);
  }
}
