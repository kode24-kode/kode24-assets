import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.scss';
import {
  Frontpage,
  Content,
  Listing,
  Article,
} from './types/index.ts';
import ArticlesAboveFirstBanner from './articles_above_first_banner.tsx';
import ArticlesBelowFirstBanner from './articles_below_first_banner.tsx';
import ArticlesBelowSecondBanner from './articles_below_second_banner.tsx';
import FullEventsList from './components/FullEventsList.tsx';
import { adjustLazyImages } from './functions/adjustLazyImages.ts';

import ListingsRow from './components/ListingsRow.tsx';
import DesktopSidemenuFront from './DesktopSidemenuFront.tsx';
import { addNumberToEventCounterInTopMenu } from './functions/addNumberToEventCounterInTopMenu.ts';
import { addNumberToJobCounterInTopMenu } from './functions/addNumberToJobCounterInTopMenu.ts';
import { addRibbonClassToTop } from './functions/addRibbonClassToTop.ts';
import { handleImageExpansionClick } from './functions/handleImageExpansionClick.ts';
import { handleHamburgerMenuClick } from './functions/handleHamburgerMenuClick.ts';
import CompanyPartnersTop from './components/CompanyPartnersTop.tsx';
import CommentsTile from './components/CommentsTile.tsx';
import Search from './components/Search.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
import ContentsRow from './components/ContentsRow.tsx';
import { getArticleId } from './functions/getArticleId.tsx';
import QuicksearchComponent from './components/Quicksearch.tsx';
import { findDataInSpecialTag } from './functions/findDataInSpecialTag.ts';
import ListingsApplication from './components/ListingsApplication.tsx';
import FrontContent from './FrontContent.tsx';

/** kode24 runs multiple react applications in one. Here we try to attach all necessarry applications */
async function main() {
  // only if commercial content
  addRibbonClassToTop();

  adjustLazyImages();

  handleImageExpansionClick();
  handleHamburgerMenuClick();

  // fetch frontpage data
  const response = await fetch(
    'https://functions.kode24.no/api/frontpage'
  );
  const FrontpageData: Frontpage = await response.json();

  FrontContent(FrontpageData as Frontpage);

  addNumberToEventCounterInTopMenu(
    FrontpageData.events.upcomingEvents.length
  );

  addNumberToJobCounterInTopMenu(
    FrontpageData.listing.listings.length
  );

  const desktopSideMenuFront = document.getElementById(
    'desktop-sidemenu-front'
  ) as HTMLElement;

  const eventsList = document.getElementById('events-list');
  const listingList = document.getElementById('listings-application');

  if (desktopSideMenuFront)
    ReactDOM.createRoot(desktopSideMenuFront).render(
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
  ReactDOM.createRoot(newestCommentsNode as HTMLElement).render(
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

  const searchNode = document.createElement('div');
  ReactDOM.createRoot(searchNode as HTMLElement).render(
    <React.StrictMode>
      <Search />
    </React.StrictMode>
  );
  document.querySelector('#nav-top')?.append(searchNode);

  /** this part only occurs if the div "event-list" is present */
  if (eventsList) {
    ReactDOM.createRoot(eventsList).render(
      <React.StrictMode>
        <FullEventsList
          events={FrontpageData.events.upcomingEvents}
        />
      </React.StrictMode>
    );
  }

  /** this part only occurs if the div "listing-list" is present */
  /** Which means we are on the job listing page */
  if (listingList) {
    ReactDOM.createRoot(listingList).render(
      <React.StrictMode>
        <ListingsApplication
          listings={FrontpageData.listing.listings}
        />
      </React.StrictMode>
    );
  }

  /** This part should only occur in articles */
  /** Attempts to add job ads before every odd h2-tag in article */
  if (document.querySelector('.article-entity.artikkel')) {
    const premiumListings = shuffleArray([
      ...FrontpageData.listing.listings.filter((listing: Listing) =>
        FrontpageData.listing.premiumIds.includes(listing.id)
      ),
    ]) as Listing[];
    // draw a listing before each h2
    const h2s = document.querySelectorAll(
      '.body-copy h2:nth-of-type(odd)'
    );
    h2s.forEach((h2, key: number) => {
      const listingNode = document.createElement('div');
      if (key === 0 && FrontpageData.content.length > 0) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ContentsRow
              Contents={FrontpageData.content.slice(0, 3)}
            />
          </React.StrictMode>
        );
        h2.before(listingNode);
      } else if (premiumListings.length > 0) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ListingsRow
              Listings={premiumListings.splice(0, 3) as Listing[]}
            />
          </React.StrictMode>
        );
        h2.before(listingNode);
      }
    });
  }

  /** Add class for topic pages */
  if (window.location.pathname.includes('/emne')) {
    document
      ?.getElementById('main-content')
      ?.classList.add('section-list');
  }

  /** This part only runs if we are in a job listing */
  if (document.querySelector('.article-entity.jobb')) {
    const listingId = getArticleId();
    if (listingId) {
      // attempt to find listing and see if it has a quick search tag
      const listing = FrontpageData.listing.listings.find(
        (listing) => listing.id === listingId
      );

      if (listing && listing.tags.includes('jobbmail')) {
        const jobbmail = document.createElement('div');
        ReactDOM.createRoot(jobbmail as HTMLElement).render(
          <React.StrictMode>
            <QuicksearchComponent
              quicksearchData={{
                from: 'no-reply@kode24.no',
                to: findDataInSpecialTag(listing.tags, 'jobbmail'),
                applicant: '',
                jobUrl: listing.published_url,
                jobTitle: listing.title,
              }}
            />
          </React.StrictMode>
        );
        document.querySelector('.body-copy')?.append(jobbmail);
      }
    }
  }
}

main();
