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
import { initPreviewListLoading } from './components/previewListLoading';
import { initNewestComments } from './components/newestComments';
import {
  initJobAdsComponentLoading,
  initJobAdsComponent,
} from './components/JobAdsComponent';
import {
  initSponsors,
  initSponsorsLoading,
} from './components/sponsorListingInLeftMenu';
import { initEventCardsList } from './components/eventCardsList';
import { getFrontPageDataFromApi } from './API/api';
import { isPagePartner } from './functions/isPagePartner';
import { setPartnerPageConfig } from './functions/setPartnerPageConfig';
import {
  initDiamondPartners,
  initDiamondPartnersLoading,
} from './components/diamondPartners';
import { shuffleArray } from './functions/shuffleArray';
import { limitArray } from './functions/limitArray';
import {
  initPodcastPlayer,
  initPodcastPlayerLoading,
} from './components/PodcastPlayer';

import {
  initDesktopRowLoading,
  initDesktopRow,
} from './components/drawDesktopRow';

/**
 * Runs all the code that all pages have in common
 */
export async function initCommon() {
  // init loading animation for job ads in right column
  const JobAdsComponentNode = initPreviewListLoading(5);

  const diamondPartnersNode = initDiamondPartnersLoading();
  const podcastPlayerNode = initPodcastPlayerLoading();
  const eventCardsListNode = initPreviewListLoading(4);
  const sponsorsNode = initSponsorsLoading();
  const articlesAboveFirstBanner = initDesktopRowLoading();
  const articlesBelowFirstBanner = initDesktopRowLoading();
  const articlesBelowSecondBanner = initDesktopRowLoading();
  const JobAdsComponentLongNode = initJobAdsComponentLoading(10);
  document
    .querySelector('#desktop-sidemenu-front')
    ?.append(
      JobAdsComponentNode,
      eventCardsListNode,
      podcastPlayerNode,
      JobAdsComponentLongNode
    );

  document.querySelector('#left-menu')?.append(sponsorsNode);

  document
    .getElementById('articles-above-first-banner')
    ?.append(articlesAboveFirstBanner);
  document
    .getElementById('articles-below-first-banner')
    ?.append(articlesBelowFirstBanner);
  document
    .getElementById('articles-below-second-banner')
    ?.append(articlesBelowSecondBanner);

  const partnerPage = isPagePartner();
  if (partnerPage) setPartnerPageConfig();
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

  const frontPageData = await getFrontPageDataFromApi();
  // fetch data for job listings
  const { listings, premiumIds } = frontPageData.listing;
  // filter list of premium ads
  const premiumAds = listings.filter((ad) =>
    premiumIds.includes(ad.id)
  );
  // filter list of non-premium ads
  const nonPremiumAds = listings.filter(
    (ad) => !premiumIds.includes(ad.id)
  );

  // draw company partners
  initDiamondPartners(diamondPartnersNode);
  document.querySelector('#top-bar')?.after(diamondPartnersNode);

  // fetch content ads
  const contentAds = frontPageData.content;
  // fetch event data
  let eventData = frontPageData.events;

  let sponsors = await frontPageData.partners;

  // init a sidebar component for all ads

  initJobAdsComponent(
    limitArray(shuffleArray([...premiumAds, ...nonPremiumAds])),
    JobAdsComponentLongNode,
    'replace',
    'Ledige stillinger'
  );

  // init sidebar component for premium ads
  initJobAdsComponent(
    limitArray(shuffleArray(premiumAds), 5),
    JobAdsComponentNode,
    'replace',
    'Utvalgte stillinger'
  );

  // init sidebar component for calendar events shown right column
  initEventCardsList(eventData, eventCardsListNode, '');

  initPodcastPlayer(podcastPlayerNode);
  initSponsors(sponsors, sponsorsNode);

  // add number of active events to counter in top menu
  addNumberToEventCounterInTopMenu(eventData.upcomingEvents.length);
  // update job listings count in top menu
  addNumberToJobCounterInTopMenu(listings.length);
  initDesktopRow(
    frontPageData,
    articlesAboveFirstBanner,
    articlesBelowFirstBanner,
    articlesBelowSecondBanner
  );

  initNewestComments(frontPageData.newestComments);

  return {
    listings,
    premiumAds,
    nonPremiumAds,
    contentAds,
    eventData,
    frontPageData,
  };
}
