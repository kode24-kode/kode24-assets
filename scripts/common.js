import "../scss/main.scss";
import { initInlineSearch } from "./components/inlineSearch";
import { convertTagFeedURL } from "./functions/convertTagFeedURL";
import { upScaleImages } from "./functions/upScaleImages";
import { handleHamburgerMenuClick } from "./functions/handleHamburgerMenuClick";
import { convertLazyLoadImages } from "./functions/convertLazyLoadImages";
import { handleLightSwitchToggle } from "./functions/handleLightSwitchToggle";
import { handleImageExpansionClick } from "./functions/handleImageExpansionClick";
import { addNumberToJobCounterInTopMenu } from "./functions/addNumberToJobCounterInTopMenu";
import { addNumberToEventCounterInTopMenu } from "./functions/addNumberToEventCounterInTopMenu";
import {
  initJobAdsComponentLoading,
  initJobAdsComponent,
} from "./components/JobAdsComponent";
import { initSponsors } from "./components/sponsorListingInLeftMenu";

import { initAdElementsInRightColumn } from "./components/adElementsInRightColumn";
import { hideSidebarForCommercialPages } from "./functions/hideSidebarForCommercialPages";
import { trackInScreenImpressions } from "./functions/inScreenAdImpressionTracker";
import {
  initCompanyLeague,
  initCompanyLeagueLoading,
} from "./components/companyLeague";
import {
  getAdsForFrontFromApi,
  getContentAdsFromApi,
  getEventsFromApi,
  getSponsorsFromApi,
} from "./API/api";
import { isPagePartner } from "./functions/isPagePartner";
import { setPartnerPageConfig } from "./functions/setPartnerPageConfig";
import {
  initDiamondPartners,
  initDiamondPartnersLoading,
} from "./components/diamondPartners";
import { shuffleArray } from "./functions/shuffleArray";
import { limitArray } from "./functions/limitArray";
import {
  initPodcastPlayer,
  initPodcastPlayerLoading,
} from "./components/PodcastPlayer";

/**
 * Runs all the code that all pages have in common
 */
export async function initCommon() {
  // init loading animation for job ads in right column
  const JobAdsComponentNode = initJobAdsComponentLoading(5);

  const diamondPartnersNode = initDiamondPartnersLoading();
  const companyLeagueNode = initCompanyLeagueLoading();
  const podcastPlayerNode = initPodcastPlayerLoading();
  document
    .querySelector("#desktop-sidemenu-front")
    .append(
      diamondPartnersNode,
      JobAdsComponentNode,
      companyLeagueNode,
      podcastPlayerNode
    );

  const partnerPage = isPagePartner();
  if (partnerPage) setPartnerPageConfig();
  // initialise the company league table
  initCompanyLeague(companyLeagueNode);
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
  const premiumAds = listings.filter((ad) => premiumIds.includes(ad.id));
  // filter list of non-premium ads
  const nonPremiumAds = listings.filter((ad) => !premiumIds.includes(ad.id));

  // fetch content ads
  const contentAds = await getContentAdsFromApi();
  // fetch event data
  let eventData = await getEventsFromApi();

  let sponsors = await getSponsorsFromApi();

  // init a sidebar component for all ads
  const JobAdsComponentLongNode = initJobAdsComponentLoading(
    [...premiumAds, nonPremiumAds].length
  );
  document
    .querySelector("#desktop-sidemenu-front")
    .append(JobAdsComponentLongNode);
  initJobAdsComponent(
    limitArray(shuffleArray([...premiumAds, ...nonPremiumAds])),
    JobAdsComponentLongNode,
    "replace",
    "Ledige stillinger"
  );

  initJobAdsComponent(
    limitArray(shuffleArray(premiumAds), 5),
    JobAdsComponentNode,
    "replace",
    "Utvalgte stillinger"
  );

  initPodcastPlayer(podcastPlayerNode);
  initSponsors(sponsors, "#company-sponsors-list");
  initDiamondPartners(sponsors.diamond || [], diamondPartnersNode);

  // add number of active events to counter in top menu
  addNumberToEventCounterInTopMenu(eventData.eventsCount);
  // update job listings count in top menu
  addNumberToJobCounterInTopMenu(listings.length);

  return {
    listings,
    premiumAds,
    nonPremiumAds,
    contentAds,
    eventData,
  };
}
