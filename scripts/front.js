import { initCommon } from './common';
import { initFrontAdComponents } from './components/frontAdComponents';
import { getArticlePreviewList } from './functions/getArticlePreviewList';
import { getFrontPreviewData } from './API/api';
import { drawCommentRow } from './components/drawCommentRow';
import { getNodes } from './functions/getNodes';
import { trackInScreenImpressions } from './functions/inScreenAdImpressionTracker';
import { shuffleArray } from './functions/shuffleArray';
import { limitArray } from './functions/limitArray';

/**
 * inits everything that needs to run on a kode24 front (/, /emne/react, etc...)
 */
export async function initFrontend() {
  const { premiumAds, contentAds, partnerPage } = await initCommon();

  // if we have a partner page, we should not show ads
  if (!partnerPage) {
    //initAsideLoading('desktop-sidemenu-front');
    // init component that shows content articles and job listings in front feed
    // track impressions for all ads on frontpage
    //trackInScreenImpressions([...frontAdElements]);
  }
}
