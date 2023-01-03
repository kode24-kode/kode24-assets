import '../scss/main.scss';
import { initInlineSearch } from './components/inlineSearch';
import { convertTagFeedURL } from './functions/convertTagFeedURL';
import { upScaleImages } from './functions/upScaleImages';
import { handleHamburgerMenuClick } from './functions/handleHamburgerMenuClick';
import { convertLazyLoadImages } from './functions/convertLazyLoadImages';
import { handleLightSwitchToggle } from './functions/handleLightSwitchToggle';
import { handleImageExpansionClick } from './functions/handleImageExpansionClick';
import { addNumberToJobCounterInTopMenu } from './functions/addNumberToJobCounterInTopMenu';
import { addNumberToEventCounterInTopMenu } from './functions/addNumberToEventCounterInTopMenu';
import { initPremiumJobComponent } from './components/premiumJobComponent';
import { initSponsors } from './components/sponsorListingInLeftMenu';
import { initAsideLoading } from './components/asideLoading';
import { initAdElementsInRightColumn } from './components/adElementsInRightColumn';
import { hideSidebarForCommercialPages } from './functions/hideSidebarForCommercialPages';
import { trackInScreenImpressions } from './functions/inScreenAdImpressionTracker';
import {
  getAdsForFrontFromApi,
  getContentAdsFromApi,
  getEventsFromApi,
  getSponsorsFromApi,
} from './API/api';
import { isPagePartner } from './functions/isPagePartner';
import { setPartnerPageConfig } from './functions/setPartnerPageConfig';
import { initDiamondPartners } from './components/diamondPartners';

/**
 * Runs all the code that all pages have in common
 */
export async function initCommon() {
  // init loading animation for right aside
  const partnerPage = isPagePartner();
  if (partnerPage) setPartnerPageConfig();
  // initialise the company league table
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
  // fetch event data
  let eventData = await getEventsFromApi();

  let sponsors = await getSponsorsFromApi();

  initSponsors(sponsors, '#company-sponsors-list');
  initDiamondPartners(sponsors.diamond || [], '#left-menu');

  // add number of active events to counter in top menu
  addNumberToEventCounterInTopMenu(eventData.eventsCount);
  // update job listings count in top menu
  addNumberToJobCounterInTopMenu(listings.length);

  return {
    addNumberToEventCounterInTopMenu,
    addNumberToJobCounterInTopMenu,
    initPremiumJobComponent,
    initSponsors,
    initAsideLoading,
    initAdElementsInRightColumn,
    hideSidebarForCommercialPages,
    trackInScreenImpressions,
    listings,
    premiumIds,
    premiumAds,
    nonPremiumAds,
    contentAds,
    eventData,
    initDiamondPartners,
    sponsors,
  };
}
