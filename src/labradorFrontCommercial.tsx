// draws ads in between labrador articles on front page

//import React from "react";
import ReactDOM from "react-dom/client";
import Banner from "./components/Banner";
import { shuffleArray } from "./functions/shuffleArray.ts";
import {
  Frontpage,
  //Content,
  //ontentTile,
  //DesktopRow,
  bannerAd,
  //Article,
} from "./types/index.ts";

export default function LabradorFrontCommercial(frontPageData: Frontpage) {
  const mobileBrandBoardBanners = shuffleArray(
    frontPageData.bannerAds.filter(
      (banner: bannerAd) => banner.adFormat === "mobile-banner_320x250"
    )
  ) as bannerAd[];
  const brandBoardBanners = shuffleArray(
    frontPageData.bannerAds.filter(
      (banner: bannerAd) => banner.adFormat === "desktop-brandboard_980x600"
    )
  ) as bannerAd[];
  const articles = document.querySelectorAll(".page-content article");
  // if we have at least one labrador article, draw a banner underneath it
  console.log("hello fresh");
  if (articles.length > 0) {
    createBannerNode(mobileBrandBoardBanners, true, ".page-content");
    createBannerNode(brandBoardBanners, false, ".page-content");
  }

  /**
  articles.forEach((article: Element) => {
    console.log("hello");
  });
   */
}

/**
 * Takes an array of banner ads, and creates a react component.
 * Places it after the node specified in the dom.
 * @param bannerAds
 * @param mobileToggle
 * @param afterNode
 */
function createBannerNode(
  bannerAds: bannerAd[],
  mobileToggle: boolean,
  appendToNode: string
) {
  console.log("got here", appendToNode);
  const commentNode = document.createElement("div");
  ReactDOM.createRoot(commentNode).render(
    <Banner ads={bannerAds} mobileToggle={mobileToggle} />
  );
  document.querySelector(appendToNode)?.append(commentNode);
}
