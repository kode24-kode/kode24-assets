import { initCommon } from "./common";
import { initFrontAdComponents } from "./components/frontAdComponents";
import { getArticlePreviewList } from "./functions/getArticlePreviewList";
import { getFrontPreviewData } from "./API/api";
import { drawCommentRow } from "./components/drawCommentRow";
import { getNodes } from "./functions/getNodes";
import { trackInScreenImpressions } from "./functions/inScreenAdImpressionTracker";
import { shuffleArray } from "./functions/shuffleArray";
import { limitArray } from "./functions/limitArray";

/**
 * inits everything that needs to run on a kode24 front (/, /emne/react, etc...)
 */
export async function initFrontend() {
  const { premiumAds, contentAds, partnerPage } = await initCommon();

  // if we have a partner page, we should not show ads
  if (!partnerPage) {
    //initAsideLoading('desktop-sidemenu-front');
    // init component that shows content articles and job listings in front feed
    const frontAdElements = initFrontAdComponents(
      getNodes(
        ".article-previews .row:not(.show-for-small-only, .show-for-medium-up, .added)",
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
