import React from "react";
import ReactDOM from "react-dom/client";

import "./scss/main.scss";
import { Frontpage, Article } from "./types/index.ts";
import FullEventsList from "./components/FullEventsList.tsx";
import { adjustLazyImages } from "./functions/adjustLazyImages.ts";
import structuredClone from "@ungap/structured-clone";
import SortByReactions from "./components/SortByReactions.tsx";
import DesktopSidemenuFront from "./DesktopSidemenuFront.tsx";
import { addNumberToEventCounterInTopMenu } from "./functions/addNumberToEventCounterInTopMenu.ts";
import { addNumberToJobCounterInTopMenu } from "./functions/addNumberToJobCounterInTopMenu.ts";
import { addRibbonClassToTop } from "./functions/addRibbonClassToTop.ts";
import { handleImageExpansionClick } from "./functions/handleImageExpansionClick.ts";
import { handleHamburgerMenuClick } from "./functions/handleHamburgerMenuClick.ts";
import { handleSearchButtonClick } from "./functions/handleSearchButtonClick.ts";
import { handleSourcePointClick } from "./functions/handleSourcePointClick.ts";
import FrontComments from "./frontComments.tsx";
import Search from "./components/Search.tsx";
import ListingsApplication from "./components/ListingsApplication.tsx";
import FrontContent from "./FrontContent.tsx";
import ArticleContent from "./ArticleContent.tsx";
import PatreonsList from "./components/PatreonsList.tsx";
import PodcastPlayer from "./components/PodcastPlayer.tsx";
import TopBanner from "./components/TopBanner.tsx";

//import CompetitionHighscore from './components/CompetitionHighscore.tsx';

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://88c129afe0da75f1811037da951b4bb3@o4507420043182080.ingest.de.sentry.io/4507420049145937",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/kode24\.no/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

/** kode24 runs multiple react applications in one. Here we try to attach all necessarry applications */
async function main() {
  // the functions below should run regardless.

  // only if commercial content
  addRibbonClassToTop();

  adjustLazyImages();

  handleImageExpansionClick();
  handleHamburgerMenuClick();
  handleSearchButtonClick();
  handleSourcePointClick();

  // fetch frontpage data
  const response = await fetch("https://docs.kode24.no/api/frontpage");
  const FrontpageData: Frontpage = await response.json();
  FrontpageData.latestArticles.push({
    id: "100042",
    title: "",
    published: "",
    section: "",
    image: "",
    published_url: "/artikkel/na-kommer-partiene-med-egne-ai-boter/100042",
    tags: "",
    subtitle: "",
    frontCropUrl: "",
    byline: {
      name: "",
      bio: "",
      imageUrl: "",
    },
    reactions: {
      reactions: [1, 1, 0, 0, 0, 0],
      comments_count: 4,
      reactions_count: 2,
    },
  });
  FrontpageData.latestArticles.push({
    id: "100042",
    title: "",
    published: "",
    section: "",
    image: "",
    published_url: "/artikkel/na-kommer-partiene-med-egne-ai-boter/100042",
    tags: "",
    subtitle: "",
    frontCropUrl: "",
    byline: {
      name: "",
      bio: "",
      imageUrl: "",
    },
    reactions: {
      reactions: [1, 1, 0, 0, 0, 0],
      comments_count: 4,
      reactions_count: 2,
    },
  });
  FrontComments(FrontpageData.latestArticles);
  /**
   * Always check if there is a batter on top and draw it
   */
  const topBanners =
    FrontpageData.bannerAds?.filter(
      (banner) => banner.adFormat === "desktop-topbanner_1540x300"
    ) || [];

  if (topBanners.length > 0) {
    const topBarAd = document.createElement("div");
    document.querySelector(".frontpage")?.before(topBarAd);
    topBarAd.classList.add("top-bar-ad", "desktop");
    topBarAd.setAttribute("id", "top-bar-ad");
    ReactDOM.createRoot(topBarAd).render(
      <React.StrictMode>
        <TopBanner ads={topBanners} />
      </React.StrictMode>
    );
  }

  if (document.querySelector(".article-entity.artikkel"))
    ArticleContent(structuredClone(FrontpageData) as Frontpage);
  FrontContent(structuredClone(FrontpageData) as Frontpage);

  addNumberToEventCounterInTopMenu(FrontpageData.events.upcomingEvents.length);

  addNumberToJobCounterInTopMenu(FrontpageData.jobs.length);

  function sortLatestArticlesByToggle(sortingToggle = "newest") {
    /**
    // grab the DOM-elements for the three content divs for frontendpages
    const articlesAboveFirstBanner = document.getElementById(
      'articles-above-first-banner'
    ) as HTMLElement;

    const articlesBelowFirstBanner = document.getElementById(
      'articles-below-first-banner'
    ) as HTMLElement;

    const articlesBelowSecondBanner = document.getElementById(
      'articles-below-second-banner'
    ) as HTMLElement;
     */

    //articlesAboveFirstBanner.innerHTML = '';
    //articlesBelowFirstBanner.innerHTML = '';
    //articlesBelowSecondBanner.innerHTML = '';

    if (sortingToggle === "newest") {
      sortingToggle = "newest";
      FrontContent(structuredClone(FrontpageData) as Frontpage);
    }
    if (sortingToggle === "mostReactions") {
      sortingToggle = "mostReactions";
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
    if (sortingToggle === "mostComments") {
      sortingToggle = "mostComments";
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

  const sortingToggle = "newest";

  const desktopSideMenuFront = document.getElementById(
    "desktop-sidemenu-front"
  ) as HTMLElement;

  const eventsList = document.getElementById("events-list");
  const listingList = document.getElementById("listings-application");
  const leftMenu = document.getElementById("left-menu");
  const tipUsCallToAction = document.getElementById("tip-us-call-to-action");

  if (document.getElementById("articles-above-first-banner")) {
    const sortByReactionsNode = document.createElement("div");
    ReactDOM.createRoot(sortByReactionsNode).render(
      <React.StrictMode>
        <SortByReactions
          sortingToggle={sortingToggle}
          sortBySortingToggle={sortLatestArticlesByToggle}
        />
      </React.StrictMode>
    );
    document
      .getElementById("articles-above-first-banner")
      ?.before(sortByReactionsNode);
  }
  const easter2025Node = document.createElement("div");
  const podcastPlayerNode = document.createElement("div");

  podcastPlayerNode.classList.add("podcast-player");
  ReactDOM.createRoot(podcastPlayerNode).render(
    <React.StrictMode>
      <PodcastPlayer />
    </React.StrictMode>
  );
  tipUsCallToAction?.after(podcastPlayerNode);
  tipUsCallToAction?.after(easter2025Node);
  /**
  const competitionHighscoreNode = document.createElement('div');
  competitionHighscoreNode.classList.add('competition-highscore');
  ReactDOM.createRoot(competitionHighscoreNode).render(
    <React.StrictMode>
      <CompetitionHighscore
        users={FrontpageData.easterHighscore?.users}
        teams={FrontpageData.easterHighscore?.teams}
      />
    </React.StrictMode>
  );
  tipUsCallToAction?.before(competitionHighscoreNode);
   */

  if (desktopSideMenuFront)
    ReactDOM.createRoot(desktopSideMenuFront).render(
      <React.StrictMode>
        <DesktopSidemenuFront frontpageData={FrontpageData} />
      </React.StrictMode>
    );

  const searchNode = document.createElement("div");
  searchNode.id = "search-component-wrapper";
  ReactDOM.createRoot(searchNode as HTMLElement).render(
    <React.StrictMode>
      <Search />
    </React.StrictMode>
  );
  document.querySelector("#nav-top")?.append(searchNode);

  /** this part only occurs if the div "event-list" is present */
  if (eventsList) {
    ReactDOM.createRoot(eventsList).render(
      <React.StrictMode>
        <FullEventsList events={FrontpageData.events.upcomingEvents} />
      </React.StrictMode>
    );
  }

  /** Draws patreons in left menu if there are patreons */
  if (
    FrontpageData.partners &&
    FrontpageData.partners.goldPatreon &&
    FrontpageData.partners.silverPatreon
  ) {
    const newNode = document.createElement("div");
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
          premiumIds={FrontpageData.listing.premiumIds}
        />
      </React.StrictMode>
    );
  }

  /** Add class for topic pages */
  if (window.location.pathname.includes("/emne")) {
    document?.getElementById("main-content")?.classList.add("section-list");
  }
}

main();
