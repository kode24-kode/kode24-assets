import { initCommon } from "./common";

/**
 * inits everything that needs to run on a kode24 front (/, /emne/react, etc...)
 */
export async function initFrontend() {
  const { premiumAds, contentAds, partnerPage } = await initCommon();

  // if we have a partner page, we should not show ads
  if (!partnerPage) {
    // init component that shows content articles and job listings in front feed
    // track impressions for all ads on frontpage
  }
}
