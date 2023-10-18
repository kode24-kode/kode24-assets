import React from 'react';
import ReactDOM from 'react-dom/client';

import './scss/main.scss';
import { Frontpage, Article } from './types/index.ts';
import FullEventsList from './components/FullEventsList.tsx';
import { adjustLazyImages } from './functions/adjustLazyImages.ts';
import structuredClone from '@ungap/structured-clone';
import SortByReactions from './components/SortByReactions.tsx';
import DesktopSidemenuFront from './DesktopSidemenuFront.tsx';
import { addNumberToEventCounterInTopMenu } from './functions/addNumberToEventCounterInTopMenu.ts';
import { addNumberToJobCounterInTopMenu } from './functions/addNumberToJobCounterInTopMenu.ts';
import { addRibbonClassToTop } from './functions/addRibbonClassToTop.ts';
import { handleImageExpansionClick } from './functions/handleImageExpansionClick.ts';
import { handleHamburgerMenuClick } from './functions/handleHamburgerMenuClick.ts';
import { handleSearchButtonClick } from './functions/handleSearchButtonClick.ts';
import CommentsTile from './components/CommentsTile.tsx';
import Search from './components/Search.tsx';
import { getArticleId } from './functions/getArticleId.tsx';
import QuicksearchComponent from './components/Quicksearch.tsx';
import { findDataInSpecialTag } from './functions/findDataInSpecialTag.ts';
import ListingsApplication from './components/ListingsApplication.tsx';
import FrontContent from './FrontContent.tsx';
import ArticleContent from './ArticleContent.tsx';
import PatreonsList from './components/PatreonsList.tsx';
import PodcastPlayer from './components/PodcastPlayer.tsx';

/** kode24 runs multiple react applications in one. Here we try to attach all necessarry applications */
async function main() {
  // only if commercial content
  addRibbonClassToTop();

  adjustLazyImages();

  handleImageExpansionClick();
  handleHamburgerMenuClick();
  handleSearchButtonClick();

  // fetch frontpage data
  const response = await fetch(
    'https://docs.kode24.no/api/frontpage'
  );
  const FrontpageData: Frontpage = await response.json();

  if (document.querySelector('.article-entity.artikkel'))
    ArticleContent(structuredClone(FrontpageData) as Frontpage);
  FrontContent(structuredClone(FrontpageData) as Frontpage);

  addNumberToEventCounterInTopMenu(
    FrontpageData.events.upcomingEvents.length
  );

  addNumberToJobCounterInTopMenu(
    FrontpageData.listing.listings.length
  );

  function sortLatestArticlesByToggle(sortingToggle = 'newest') {
    // grab the DOM-elements for the three content divs
    const articlesAboveFirstBanner = document.getElementById(
      'articles-above-first-banner'
    ) as HTMLElement;

    const articlesBelowFirstBanner = document.getElementById(
      'articles-below-first-banner'
    ) as HTMLElement;

    const articlesBelowSecondBanner = document.getElementById(
      'articles-below-second-banner'
    ) as HTMLElement;

    articlesAboveFirstBanner.innerHTML = '';
    articlesBelowFirstBanner.innerHTML = '';
    articlesBelowSecondBanner.innerHTML = '';

    if (sortingToggle === 'newest') {
      sortingToggle = 'newest';
      FrontContent(structuredClone(FrontpageData) as Frontpage);
    }
    if (sortingToggle === 'mostReactions') {
      sortingToggle = 'mostReactions';
      const frontPageDataSortedByReactions = structuredClone(
        FrontpageData
      ) as Frontpage;
      frontPageDataSortedByReactions.latestArticles =
        frontPageDataSortedByReactions.latestArticles.sort(
          (a: Article, b: Article) =>
            b.reactions.reactions_count - a.reactions.reactions_count
        );
      FrontContent(structuredClone(frontPageDataSortedByReactions));
    }
    if (sortingToggle === 'mostComments') {
      sortingToggle = 'mostComments';
      const frontPageDataSortedByReactions = structuredClone(
        FrontpageData
      ) as Frontpage;
      frontPageDataSortedByReactions.latestArticles =
        frontPageDataSortedByReactions.latestArticles.sort(
          (a: Article, b: Article) =>
            b.reactions.comments_count - a.reactions.comments_count
        );
      FrontContent(structuredClone(frontPageDataSortedByReactions));
    }
  }

  const sortingToggle = 'newest';

  const desktopSideMenuFront = document.getElementById(
    'desktop-sidemenu-front'
  ) as HTMLElement;

  const eventsList = document.getElementById('events-list');
  const listingList = document.getElementById('listings-application');
  const leftMenu = document.getElementById('left-menu');
  const tipUsCallToAction = document.getElementById(
    'tip-us-call-to-action'
  );

  if (document.getElementById('articles-above-first-banner')) {
    const sortByReactionsNode = document.createElement('div');
    ReactDOM.createRoot(sortByReactionsNode).render(
      <React.StrictMode>
        <SortByReactions
          sortingToggle={sortingToggle}
          sortBySortingToggle={sortLatestArticlesByToggle}
        />
      </React.StrictMode>
    );
    document
      .getElementById('articles-above-first-banner')
      ?.before(sortByReactionsNode);
  }
  const podcastPlayerNode = document.createElement('div');
  podcastPlayerNode.classList.add('podcast-player');
  ReactDOM.createRoot(podcastPlayerNode).render(
    <React.StrictMode>
      <PodcastPlayer />
    </React.StrictMode>
  );
  tipUsCallToAction?.after(podcastPlayerNode);

  if (desktopSideMenuFront)
    ReactDOM.createRoot(desktopSideMenuFront).render(
      <React.StrictMode>
        <DesktopSidemenuFront frontpageData={FrontpageData} />
      </React.StrictMode>
    );

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
  searchNode.id = 'search-component-wrapper';
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

  /** Draws patreons in left menu if there are patreons */
  if (
    FrontpageData.partners &&
    FrontpageData.partners.goldPatreon &&
    FrontpageData.partners.silverPatreon
  ) {
    const newNode = document.createElement('div');
    ReactDOM.createRoot(newNode).render(
      <React.StrictMode>
        <PatreonsList
          GoldPatreons={FrontpageData.partners.goldPatreon}
          SilverPatreons={FrontpageData.partners.silverPatreon}
        />
      </React.StrictMode>
    );
    leftMenu?.append(newNode);
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
