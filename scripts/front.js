import { initInlineSearch } from './components/inlineSearch';
import { initAsideLoading } from './components/asideLoading';
import { initFrontAdComponents } from './components/frontAdComponents';
import { initSponsors } from './components/sponsorListingInLeftMenu';
import { initPremiumJobComponent } from './components/premiumJobComponent';
import { initAdElementsInRightColumn } from './components/AdElementsInRightColumn';
import { initEventCardsList } from './components/eventCardsList';
import { getArticlePreviewList } from './functions/getArticlePreviewList';
import { getFrontPreviewData } from './API/api';
import { getAdsForFrontFromApi } from './API/api';
import { getContentAdsFromApi } from './API/api';
import { drawByline } from './components/drawByline';
import { drawCommentRow } from './components/drawCommentRow';
import { convertTagFeedURL } from './functions/convertTagFeedURL';
import { hideSidebarForCommercialPages } from './functions/hideSidebarForCommercialPages';
import { addNumberToJobCounterInTopMenu } from './functions/addNumberToJobCounterInTopMenu';
import { addNumberToEventCounterInTopMenu } from './functions/addNumberToEventCounterInTopMenu';
import { convertLazyLoadImages } from './functions/convertLazyLoadImages';
import { trackInScreenImpressions } from './functions/inScreenAdImpressionTracker';
import { upScaleImages } from './functions/upScaleImages';
import { handleLightSwitchToggle } from './functions/handleLightSwitchToggle';
import { handleHamburgerMenuClick } from './functions/handleHamburgerMenuClick';
/**
 * inits everything that needs to run on a kode24 front (/, /emne/react, etc...)
 */
export async function initFrontend() {
  // if user presses hamburger menu button in mobile view
  handleHamburgerMenuClick();
  // if user presses light switch on top right of page
  handleLightSwitchToggle();
  // upscale all images in front feed
  upScaleImages();
  console.log('hello');
  // convert all labrador images to browser based lazy load
  convertLazyLoadImages();
  // hide sidebar for all commercial pages
  hideSidebarForCommercialPages();
  // fixes bug with image url in labrador auto-rows
  convertTagFeedURL();
  // init inline search handler for top menu bar
  initInlineSearch();
  // init loading animation for right aside
  initAsideLoading('desktop-sidemenu-front');
  // get ids and nodes of all article previews on page
  const { articleIds, articlesList } = getArticlePreviewList();
  // get data for all article previews on page
  const articlePreviewListData = await getFrontPreviewData(
    articleIds
  );
  // draw bylines for all article previews on page
  drawByline(articlePreviewListData, articleIds, articlesList);
  // draw comment rows for all article previews on page
  drawCommentRow(articlePreviewListData, articleIds, articlesList);
  // init sponsors in left sidebar
  initSponsors('#company-sponsors-list ul');

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

  // update job listings count in top menu
  addNumberToJobCounterInTopMenu(listings.length);

  // init component that shows content articles and job listings in front feed
  const frontAdElements = initFrontAdComponents(
    '#front-articles-list >.row:nth-child(1n+4)',
    [...contentAds, ...premiumAds]
  );
  // init box that shows job listings
  initPremiumJobComponent(
    premiumAds,
    '#front-articles-list >.row:nth-child(11)'
  );

  // init ad elements listed in right column
  const asideElements = await initAdElementsInRightColumn(
    '#desktop-sidemenu-front',
    premiumAds,
    nonPremiumAds
  );
  // init container for calendar events shown in front feed
  const numberOfEvents = await initEventCardsList(
    '#front-articles-list >.row:nth-child(4)'
  );
  // add number of active events to counter in top menu
  addNumberToEventCounterInTopMenu(numberOfEvents);

  // track impressions for all ads on frontpage
  trackInScreenImpressions([...frontAdElements, ...asideElements]);
}
