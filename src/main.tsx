import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.scss';
import { Frontpage } from './types/index.ts';
import ArticlesAboveFirstBanner from './articles_above_first_banner.tsx';
import ArticlesBelowFirstBanner from './articles_below_first_banner.tsx';
import ArticlesBelowSecondBanner from './articles_below_second_banner.tsx';
import DesktopSidemenuFront from './desktop_sidemenu_front.tsx';
import { addNumberToEventCounterInTopMenu } from './functions/addNumberToEventCounterInTopMenu.ts';
import { addNumberToJobCounterInTopMenu } from './functions/addNumberToJobCounterInTopMenu.ts';
import { addRibbonClassToTop } from './functions/addRibbonClassToTop.ts';
import { handleImageExpansionClick } from './functions/handleImageExpansionClick.ts';
import { handleHamburgerMenuClick } from './functions/handleHamburgerMenuClick.ts';
import CompanyPartnersTop from './components/CompanyPartnersTop.tsx';
import CommentsTile from './components/CommentsTile.tsx';
async function main() {
  const response = await fetch(
    'https://functions.kode24.no/api/frontpage'
  );
  const FrontpageData: Frontpage = await response.json();

  addNumberToEventCounterInTopMenu(
    FrontpageData.events.upcomingEvents.length
  );

  addNumberToJobCounterInTopMenu(
    FrontpageData.listing.listings.length
  );

  addRibbonClassToTop();
  handleImageExpansionClick();
  handleHamburgerMenuClick();

  ReactDOM.createRoot(
    document.getElementById(
      'articles-above-first-banner'
    ) as HTMLElement
  ).render(
    <React.StrictMode>
      <ArticlesAboveFirstBanner
        frontpageData={{ ...FrontpageData }}
      />
    </React.StrictMode>
  );

  ReactDOM.createRoot(
    document.getElementById(
      'articles-below-first-banner'
    ) as HTMLElement
  ).render(
    <React.StrictMode>
      <ArticlesBelowFirstBanner
        frontpageData={{ ...FrontpageData }}
      />
    </React.StrictMode>
  );

  ReactDOM.createRoot(
    document.getElementById(
      'articles-below-second-banner'
    ) as HTMLElement
  ).render(
    <React.StrictMode>
      <ArticlesBelowSecondBanner
        frontpageData={{ ...FrontpageData }}
      />
    </React.StrictMode>
  );

  ReactDOM.createRoot(
    document.getElementById('desktop-sidemenu-front') as HTMLElement
  ).render(
    <React.StrictMode>
      <DesktopSidemenuFront frontpageData={{ ...FrontpageData }} />
    </React.StrictMode>
  );

  const partnersTop = document.createElement('div') as HTMLElement;
  ReactDOM.createRoot(partnersTop).render(
    <React.StrictMode>
      <CompanyPartnersTop
        companyPartners={[...FrontpageData.companyPartners]}
      />
    </React.StrictMode>
  );
  document.querySelector('#top-bar')?.after(partnersTop);

  const newestCommentsNode = document.createElement('div');
  ReactDOM.createRoot(newestCommentsNode).render(
    <React.StrictMode>
      <CommentsTile comments={FrontpageData.newestComments} />
    </React.StrictMode>
  );
  const firstBanner = document.querySelectorAll(
    '.show-for-medium-up'
  );
  if (firstBanner && firstBanner.length > 0) {
    firstBanner[0].prepend(newestCommentsNode);
  }
}

main();
