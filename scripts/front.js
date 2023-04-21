import { initCommon } from "./common";
import { isTopicPage } from "./functions/isTopicPage";

/**
 * inits everything that needs to run on a kode24 front (/, /emne/react, etc...)
 */
export async function initFrontend() {
  const { premiumAds, contentAds, partnerPage } = await initCommon();

  // if we have a partner page, we should not show ads
  console.log("yeeeet");
  if (isTopicPage()) {
    document.getElementById("main-content").classList.add("section-list");
    console.log("hello");
  }
  if (!partnerPage) {
    // init component that shows content articles and job listings in front feed
    // track impressions for all ads on frontpage
  }
}
