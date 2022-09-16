import { initInlineSearch } from './components/inlineSearch';
import { initAsideLoading } from './components/asideLoading';
import { initQuickJobApplicationForm } from './components/quickJobApplicationForm';
import { initInArticleAds } from './components/inArticleAds';
import { initPremiumJobComponent } from './components/premiumJobComponent';
import { initAdElementsInRightColumn } from './components/adElementsInRightColumn';
import { initSponsors } from './components/sponsorListingInLeftMenu';
import {
  getAdsForFrontFromApi,
  getArticleFromApi,
  getEventsFromApi,
  getContentAdsFromApi,
} from './API/api';
import { hideSidebarForCommercialPages } from './functions/hideSidebarForCommercialPages';
import { convertTagFeedURL } from './functions/convertTagFeedURL';
import { upScaleImages } from './functions/upScaleImages';
import { addNumberToJobCounterInTopMenu } from './functions/addNumberToJobCounterInTopMenu';
import { addNumberToEventCounterInTopMenu } from './functions/addNumberToEventCounterInTopMenu';
import { isArticleEditorial } from './functions/isArticleEditorial';
import { listenToOutboundAdClicks } from './functions/listenToOutboundAdClicks';
import { trackJobView } from './functions/trackJobView';
import { findDataInSpecialTag } from './functions/findDataInSpecialTag';
import { convertLazyLoadImages } from './functions/convertLazyLoadImages';
import { initRelatedArticles } from './components/relatedArticles';
import { getArticleId } from './functions/getArticleId';
import { addRibbonClassToTop } from './functions/addRibbonClassToTop';
import { handleLightSwitchToggle } from './functions/handleLightSwitchToggle';
import { handleImageExpansionClick } from './functions/handleImageExpansionClick';
import { handleHamburgerMenuClick } from './functions/handleHamburgerMenuClick';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
/**
 * Inits all components that needs to run on a kode24 article page
 * Should have as litle logic as possible built in.
 * Separate it into functions and call them from here.
 */
export async function initArticle() {
  // if user presses hamburger menu button in mobile view
  handleHamburgerMenuClick();
  // if user presses light switch on top right of page
  handleLightSwitchToggle();
  // if user clicks on image in article that is exapndable
  handleImageExpansionClick();
  // upscale all images in front feed
  upScaleImages();
  // convert all labrador images to browser based lazy load
  convertLazyLoadImages();

  // fixes bug with image url in labrador auto-rows
  convertTagFeedURL();
  // init inline search handler for top menu bar
  initInlineSearch();

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
  //fetch article data
  const articleData = await getArticleFromApi(getArticleId());

  // if article is editorial render in article ads
  // if it is not editiorial render quick signup form
  if (isArticleEditorial()) {
    // init loading animation for right aside
    initAsideLoading('desktop-sidemenu-front');
    // Do all this if page is commercial
    let inArticleAds = initInArticleAds(
      '.body-copy h2',
      premiumAds,
      contentAds[0]
    );

    // initialise the right menu with ads
    // asideElements are displayed in the right sidebar
    const asideElements = await initAdElementsInRightColumn(
      '#desktop-sidemenu-front',
      premiumAds,
      nonPremiumAds
    );

    // draws the listing of ads under the article body
    initPremiumJobComponent(premiumAds, '.article-entity', true);

    // draws related articles based on first article tag from API
    initRelatedArticles(
      articleData.tags,
      '.article-entity',
      articleData.id
    );
  } else {
    console.log('not editorial');
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
      articleData.tags.includes('jobbmail')
    ) {
      initQuickJobApplicationForm(
        findDataInSpecialTag(articleData.tags, 'jobbmail'),
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

  // init sponsors in left sidebar
  initSponsors('#company-sponsors-list ul');
}
