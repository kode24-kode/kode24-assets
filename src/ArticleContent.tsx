/**
 * Injects job listings and commercial articles into articles on kode24
 */

import structuredClone from "@ungap/structured-clone";
import React from "react";
import ReactDOM from "react-dom/client";
import Banner from "./components/Banner.tsx";
//import ContentsRow from "./components/ContentsRow.tsx";
import ContentTile from "./components/ContentTile.tsx";
import ListingsRow from "./components/ListingsRow";
import PartnerAdTile from "./components/PartnerAdTile.tsx";
import { shuffleArray } from "./functions/shuffleArray.ts";
import type {
  //Content,
  //ContentTile,
  Frontpage,
  Listing,
} from "./types/index.ts";
export default function FrontContent(frontpageData: Frontpage) {
  setTimeout(() => {
    (window as any).hljs.highlightAll();
  }, 1000);
  if (
    !document.querySelector(".is-editor") &&
    !document.querySelector(".section_annonse")
  ) {
    // So we don't mutate the original data
    const frontPageDataCopy = structuredClone(frontpageData) as Frontpage;
    /** shuffle content and ads */
    const premiumJobAds = shuffleArray(
      frontPageDataCopy.jobs
        .filter((job) =>
          frontPageDataCopy.jobAdsSanity.some(
            (ad) => ad.adlink === job.published_url
          )
        )
        .map((job) => ({
          ...job,
          type: "premium",
        }))
    );

    const jobAds = shuffleArray(frontPageDataCopy.jobs);
    /**
    // get only premium ads and shuffle them
    frontPageDataCopy.listing.listings = shuffleArray(
      frontPageDataCopy.listing.listings.filter((listing) =>
        frontpageData.listing.premiumIds.includes(listing.id)
      )
    ) as [Listing];
      */

    // grab the DOM-elements for the three content divs

    /** This part should only occur in articles */
    /** Attempts to add job ads before every odd h2-tag in article */

    const bannerAds = frontPageDataCopy.bannerAds.filter(
      (ad) => ad.adFormat === "desktop-brandboard_980x600"
    );

    const mobileBannerAds = frontPageDataCopy.bannerAds.filter(
      (ad) =>
        ad.adFormat === "mobile-banner_320x250" ||
        ad.adFormat === "mobile-topbanner_320x250"
    );

    // create node for banners and add before #hyvor-talk-view

    const bannerNode = document.createElement("div");
    ReactDOM.createRoot(bannerNode as HTMLElement).render(
      <React.StrictMode>
        {bannerAds.length > 0 && (
          <Banner
            ads={bannerAds}
            mobileToggle={false}
            namespace="desktop-banner"
          />
        )}
        {mobileBannerAds.length > 0 && (
          <Banner
            ads={mobileBannerAds}
            mobileToggle={true}
            namespace="mobile-banner"
          />
        )}
        {/*
        {bannerAds.length <= 0 && mobileBannerAds.length <= 0 && (
          <ListingsRow
            Listings={shuffleArray([...frontPageDataCopy.jobs]) as Listing[]}
          />
        )}
        */}
      </React.StrictMode>
    );
    //document?.getElementById("hyvor-talk-view")?.before();
    document?.querySelector(".meta")?.append(bannerNode);
    // draw a listing before each h2
    const h2s = document.querySelectorAll(".bodytext>h2");
    h2s.forEach((h2, key: number) => {
      const listingNode = document.createElement("div");
      if (key === 0 && frontPageDataCopy.contentTiles.length) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ContentTile
              Contents={frontPageDataCopy.contentTiles}
              perspective={true}
            />
          </React.StrictMode>
        );
        h2.before(listingNode);
      } else if (key === 1 && premiumJobAds.length > 0) {
        listingNode.classList.add("full-width");
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ListingsRow
              customHeading="Anbefalte ledige stilinger"
              Listings={premiumJobAds as Listing[]}
            />
          </React.StrictMode>
        );
        h2.before(listingNode);
      } else {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <PartnerAdTile
              partnerAds={frontPageDataCopy.partnerAdsSanity}
              perspective={true}
            />
          </React.StrictMode>
        );
        h2.before(listingNode);
      }
    });

    // draw job ads before comments
    const jobCarouselNode = document.createElement("div");
    jobCarouselNode.classList.add("full-width");
    ReactDOM.createRoot(jobCarouselNode as HTMLElement).render(
      <React.StrictMode>
        <ListingsRow
          customHeading="Ledige stilinger"
          Listings={jobAds as Listing[]}
        />
      </React.StrictMode>
    );
    document?.getElementById("hyvor-talk-view")?.after(jobCarouselNode);

    // create node for banners and add before #hyvor-talk-view
    const bannerBottomNode = document.createElement("div");
    ReactDOM.createRoot(bannerNode as HTMLElement).render(
      <React.StrictMode>
        {bannerAds.length > 0 && (
          <Banner
            ads={bannerAds}
            mobileToggle={false}
            namespace="desktop-banner"
          />
        )}
        {mobileBannerAds.length > 0 && (
          <Banner
            ads={mobileBannerAds}
            mobileToggle={true}
            namespace="mobile-banner"
          />
        )}
        {/*
        {bannerAds.length <= 0 && mobileBannerAds.length <= 0 && (
          <ListingsRow
            Listings={shuffleArray([...frontPageDataCopy.jobs]) as Listing[]}
          />
        )}
        */}
      </React.StrictMode>
    );
    document?.getElementById("hyvor-talk-view")?.before(bannerBottomNode);
    //h2.before(listingNode);
  }
}
