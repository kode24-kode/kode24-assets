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
/**
 * Runs all the code that all pages have in common
 */
export function initCommon() {
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
  return {
    addNumberToEventCounterInTopMenu,
    addNumberToJobCounterInTopMenu,
    initPremiumJobComponent,
    initSponsors,
    initAsideLoading,
    initAdElementsInRightColumn,
    hideSidebarForCommercialPages,
    trackInScreenImpressions,
  };
}
