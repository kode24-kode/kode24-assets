import { initCommon } from "./common";
import { initFrontAdComponents } from "./components/frontAdComponents";
import { getArticlePreviewList } from "./functions/getArticlePreviewList";
import { getFrontPreviewData } from "./API/api";
import { drawCommentRow } from "./components/drawCommentRow";
import { getNodes } from "./functions/getNodes";
import { getPrettyFormatDateString } from "./functions/getPrettyFormatDateString";
import { trackInScreenImpressions } from "./functions/inScreenAdImpressionTracker";
import { shuffleArray } from "./functions/shuffleArray";
import { limitArray } from "./functions/limitArray";
import {
  initJobAdsComponent,
  initJobAdsComponentLoading,
} from "./components/JobAdsComponent";

/**
 * inits everything that needs to run on a kode24 front (/, /emne/react, etc...)
 */
export async function initFrontend() {
  document.getElementById(
    "date-frontpage"
  ).innerHTML = ` ${getPrettyFormatDateString()}`;

  const { premiumAds, nonPremiumAds, contentAds, eventData, partnerPage } =
    await initCommon();

  // init job ad component in front feed
  const JobAdsComponentNode = initJobAdsComponentLoading(10);
  document
    .querySelectorAll(
      ".article-previews .row:not(.show-for-small-only, .show-for-medium-up, .added)"
    )[4]
    .after(JobAdsComponentNode);
  // init box that shows job listings
  initJobAdsComponent(
    premiumAds,
    JobAdsComponentNode,
    "replace",
    "utvalgte stillinger"
  );

  // if we have a partner page, we should not show ads
  if (!partnerPage) {
    //initAsideLoading('desktop-sidemenu-front');
    // get ids and nodes of all article previews on page
    const { articleIds, articlesList } = getArticlePreviewList();
    // get data for all article previews on page
    const articlePreviewListData = await getFrontPreviewData(articleIds);
    // draw bylines for all article previews on page
    //drawByline(articlePreviewListData, articleIds, articlesList);
    // draw comment rows for all article previews on page
    drawCommentRow(articlePreviewListData, articleIds, articlesList);

    // init component that shows content articles and job listings in front feed
    const frontAdElements = initFrontAdComponents(
      getNodes(
        ".article-previews .row:not(.show-for-small-only, .show-for-medium-up, .added)",
        [3, 5, 7, 9, 11, 13, 15, 19, 23, 27, 31]
      ),
      [
        contentAds ? shuffleArray(contentAds)[0] : {},
        ...limitArray(shuffleArray(premiumAds), 6),
      ]
    );

    /*
    // init container for calendar events shown in front feed
    await initEventCardsList(
      eventData,
      getNodes("#desktop-sidemenu-front", [1]),
      "append"
    );
    const numberOfEvents = await initEventCardsList(
      eventData,
      getNodes(
        ".article-previews .row:not(.show-for-small-only, .show-for-medium-up, .added)",
        [11]
      )
    );
     */
    // track impressions for all ads on frontpage
    trackInScreenImpressions([...frontAdElements]);
  }
}
