import React from "react";
import ReactDOM from "react-dom/client";

import "./scss/main.scss";
import structuredClone from "@ungap/structured-clone";
import ArticleContent from "./ArticleContent.tsx";
import FullEventsList from "./components/FullEventsList.tsx";
//import ListingsApplication from "./components/ListingsApplication.tsx";
//import PatreonsList from "./components/PatreonsList.tsx";
import PodcastPlayer from "./components/PodcastPlayer.tsx";
import Search from "./components/Search.tsx";
//import SortByReactions from "./components/SortByReactions.tsx";
import CalendarButton from "./components/CalendarButton.tsx";
import TopBanner from "./components/TopBanner.tsx";
import DesktopSidemenuFront from "./DesktopSidemenuFront.tsx";
import FrontContent from "./FrontContent.tsx";
import FrontComments from "./frontComments.tsx";
import { addNumberToJobCounterInTopMenu } from "./functions/addNumberToJobCounterInTopMenu.ts";
import { addRibbonClassToTop } from "./functions/addRibbonClassToTop.ts";
import { adjustLazyImages } from "./functions/adjustLazyImages.ts";
import { handleHamburgerMenuClick } from "./functions/handleHamburgerMenuClick.ts";
import { handleImageExpansionClick } from "./functions/handleImageExpansionClick.ts";
import { handleSearchButtonClick } from "./functions/handleSearchButtonClick.ts";
import { handleSourcePointClick } from "./functions/handleSourcePointClick.ts";
import type { Frontpage } from "./types/index.ts";

//import CompetitionHighscore from './components/CompetitionHighscore.tsx';

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

  if (!document.querySelector(".is-editor")) {
    ArticleContent(structuredClone(FrontpageData) as Frontpage);
    FrontContent(structuredClone(FrontpageData) as Frontpage);
  }

  // Hydrate events menu item with CalendarButton component
  const eventsMenuItem = document.getElementById("events-menu-item");
  if (eventsMenuItem) {
    ReactDOM.createRoot(eventsMenuItem).render(
      <React.StrictMode>
        <CalendarButton counter={FrontpageData.events.upcomingEvents.length} calendarItems={FrontpageData.events.upcomingEvents} />
      </React.StrictMode>
    );
  }

  addNumberToJobCounterInTopMenu(FrontpageData.jobs.length);

  const desktopSideMenuFront = document.getElementById(
    "desktop-sidemenu-front"
  ) as HTMLElement;

  /** podcast player component */
  const tipUsCallToAction = document.getElementById("tip-us-call-to-action");
  const podcastPlayerNode = document.createElement("div");
  podcastPlayerNode.classList.add("podcast-player");
  ReactDOM.createRoot(podcastPlayerNode).render(
    <React.StrictMode>
      <PodcastPlayer />
    </React.StrictMode>
  );
  tipUsCallToAction?.after(podcastPlayerNode);

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
  document.querySelector("#nav-top")?.append(searchNode);

  /** this part only occurs if the div "event-list" is present */
  const eventsList = document.getElementById("events-list");
  if (eventsList) {
    ReactDOM.createRoot(eventsList).render(
      <React.StrictMode>
        <FullEventsList events={FrontpageData.events.upcomingEvents} />
      </React.StrictMode>
    );
  }
}

main();
