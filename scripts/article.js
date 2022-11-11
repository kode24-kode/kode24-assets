import { initCommon } from "./common";
import { initQuickJobApplicationForm } from "./components/quickJobApplicationForm";
import { initInArticleAds } from "./components/inArticleAds";

import {
  getAdsForFrontFromApi,
  getArticleFromApi,
  getEventsFromApi,
  getContentAdsFromApi,
} from "./API/api";
import { isArticleEditorial } from "./functions/isArticleEditorial";
import { listenToOutboundAdClicks } from "./functions/listenToOutboundAdClicks";
import { trackJobView } from "./functions/trackJobView";
import { findTagInCommaSeparatedString } from "./functions/findTagInCommaSeparatedString";
import { initRelatedArticles } from "./components/relatedArticles";
import { getArticleId } from "./functions/getArticleId";
import { addRibbonClassToTop } from "./functions/addRibbonClassToTop";

import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github.css";
/**
 * Inits all components that needs to run on a kode24 article page
 * Should have as litle logic as possible built in.
 * Separate it into functions and call them from here.
 */
export async function initArticle() {
  // all functions that need to run on every page
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
  } = await initCommon();
  //fetch article data
  const articleData = await getArticleFromApi(getArticleId());

  // if article is editorial render in article ads
  // if it is not editiorial render quick signup form
  if (isArticleEditorial()) {
    // init loading animation for right aside
    initAsideLoading("desktop-sidemenu-front");

    // render commercial ads in the article
    let inArticleAds = initInArticleAds(
      ".body-copy h2",
      premiumAds,
      contentAds.length && contentAds[0] ? contentAds[0] : []
    );

    // initialise the right menu with ads
    // asideElements are displayed in the right sidebar
    const asideElementsArticle = await initAdElementsInRightColumn(
      "#desktop-sidemenu-front",
      premiumAds,
      nonPremiumAds
    );

    // draws the listing of ads under the article body
    initPremiumJobComponent(premiumAds, ".article-entity", true);

    // draws related articles based on first article tag from API
    initRelatedArticles(articleData.tags, ".article-entity", articleData.id);

    // track impressions for all ads in article
    trackInScreenImpressions([...asideElementsArticle]);
  } else {
    // add ribbon class to top of page
    addRibbonClassToTop();
    // initiate view tracking
    trackJobView(articleData.id);
    // track outbound clicks
    listenToOutboundAdClicks(articleData.id);
    // draw quick application form if job ad has a jobbmail tag
    if (
      articleData &&
      articleData.tags &&
      articleData.tags.includes("jobbmail")
    ) {
      initQuickJobApplicationForm(
        findTagInCommaSeparatedString(articleData.tags, "jobbmail"),
        articleData.title,
        articleData.published_url
      );
    }
  }
  // update job listings count in top menu
  addNumberToJobCounterInTopMenu(listings.length);
  // fetch events data for top menu
  addNumberToEventCounterInTopMenu(
    await getEventsFromApi().then((events) => events.eventsCount)
  );
}
