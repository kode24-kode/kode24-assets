import React from "react";
import ReactDOM from "react-dom/client";
import bind3DHover from "./functions/flip3d";
import "./scss/main.scss";
import structuredClone from "@ungap/structured-clone";
import ArticleContent from "./ArticleContent.tsx";
//import SortByReactions from "./components/SortByReactions.tsx";
//import CalendarButton from "./components/CalendarButton.tsx";
import FullEventsList from "./components/FullEventsList.tsx";
//import PodcastPlayer from "./components/PodcastPlayer.tsx";
import Search from "./components/Search.tsx";
//import ListingsApplication from "./components/ListingsApplication.tsx";
//import PatreonsList from "./components/PatreonsList.tsx";
import SortByReactions from "./components/SortByReactions.tsx";
import TopBanner from "./components/TopBanner.tsx";
import DesktopSidemenuFront from "./DesktopSidemenuFront.tsx";
import FrontContent from "./FrontContent.tsx";
//import FrontContentFeed from "./FrontContentFeed.tsx";
import FrontComments from "./frontComments.tsx";
import { addNumberToEventCounterInTopMenu } from "./functions/addNumberToEventCounterInTopMenu.ts";
import { addNumberToJobCounterInTopMenu } from "./functions/addNumberToJobCounterInTopMenu.ts";
import { addRibbonClassToTop } from "./functions/addRibbonClassToTop.ts";
//import { adjustLazyImages } from "./functions/adjustLazyImages.ts";
import { handleHamburgerMenuClick } from "./functions/handleHamburgerMenuClick.ts";
import { handleImageExpansionClick } from "./functions/handleImageExpansionClick.ts";
import { handleSearchButtonClick } from "./functions/handleSearchButtonClick.ts";
import { handleSourcePointClick } from "./functions/handleSourcePointClick.ts";
import type { Article, Frontpage } from "./types/index.ts";

//import CompetitionHighscore from './components/CompetitionHighscore.tsx';

/** kode24 runs multiple react applications in one. Here we try to attach all necessarry applications */
async function main() {
  // the functions below should run regardless.
  const topBarLogo = document.getElementById("top-bar-logo-icon-wrapper");
  if (topBarLogo) bind3DHover(topBarLogo, 60);
  // only if commercial content
  addRibbonClassToTop();

  //adjustLazyImages();

  console.log("loading toggles");
  handleImageExpansionClick();
  handleHamburgerMenuClick();
  handleSearchButtonClick();
  handleSourcePointClick();

  // fetch frontpage data
  const response = await fetch("https://docs.kode24.no/api/frontpage");
  const FrontpageData: Frontpage = await response.json();
  FrontComments(FrontpageData.latestArticles);
  /**
   * Always check if there is a batter on top and draw it
   */
  const topBanners =
    FrontpageData.bannerAds?.filter(
      (banner) => banner.adFormat === "desktop-topbanner_1540x300"
    ) || [];

  if (topBanners.length > 0 && document.getElementById("top-bar-ad")) {
    const topBarEl = document.getElementById("top-bar-ad");
    //const topBarAd = document.createElement("div");
    if (topBarEl)
      ReactDOM.createRoot(topBarEl).render(
        <React.StrictMode>
          <TopBanner ads={topBanners} />
        </React.StrictMode>
      );
  }

  if (!document.querySelector(".is-editor")) {
    ArticleContent(structuredClone(FrontpageData) as Frontpage);
    FrontContent(structuredClone(FrontpageData) as Frontpage);
  }

  addNumberToJobCounterInTopMenu(FrontpageData.jobs.length);
  addNumberToEventCounterInTopMenu(FrontpageData.events.upcomingEvents.length);

  const desktopSideMenuFront = document.getElementById(
    "desktop-sidemenu-front"
  ) as HTMLElement;

  /**
  /** podcast player component
  const tipUsCallToAction = document.getElementById("tip-us-call-to-action");
  const podcastPlayerNode = document.createElement("div");
  podcastPlayerNode.classList.add("podcast-player");
  ReactDOM.createRoot(podcastPlayerNode).render(
    <React.StrictMode>
      <PodcastPlayer />
    </React.StrictMode>
  );
  tipUsCallToAction?.after(podcastPlayerNode);

  */

  /** draws right sidebar with job ads */
  if (desktopSideMenuFront)
    ReactDOM.createRoot(desktopSideMenuFront).render(
      <React.StrictMode>
        <DesktopSidemenuFront frontpageData={FrontpageData} />
      </React.StrictMode>
    );

  /** search component */
  const searchNode = document.createElement("div");
  searchNode.id = "search-component-wrapper";
  ReactDOM.createRoot(searchNode as HTMLElement).render(
    <React.StrictMode>
      <Search />
    </React.StrictMode>
  );
  document.querySelector("#top-bar-logo")?.after(searchNode);

  /** this part only occurs if the div "event-list" is present */
  const eventsList = document.getElementById("events-list");
  if (eventsList) {
    ReactDOM.createRoot(eventsList).render(
      <React.StrictMode>
        <FullEventsList events={FrontpageData.events.upcomingEvents} />
      </React.StrictMode>
    );
  }

  // front content feed
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
  //FrontContentFeed(structuredClone(FrontpageData) as Frontpage);
}

main();
