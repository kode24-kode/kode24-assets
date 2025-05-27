/**
 * Injects job listings and commercial articles into articles on kode24
 */

import { Frontpage, Content, Listing, ContentTile } from "./types/index.ts";
import React from "react";
import ReactDOM from "react-dom/client";
import ContentsRow from "./components/ContentsRow.tsx";
import { shuffleArray } from "./functions/shuffleArray.ts";
import PartnerAdTile from "./components/PartnerAdTile.tsx";
import structuredClone from "@ungap/structured-clone";
import Banner from "./components/Banner.tsx";
export default function FrontContent(frontpageData: Frontpage) {
  (window as any).hljs.highlightAll();

  if (document.querySelector(".article-entity:not(.is-editor)")) {
    // So we don't mutate the original data
    const frontPageDataCopy = structuredClone(frontpageData) as Frontpage;
    /** shuffle content and ads */
    frontPageDataCopy.content = shuffleArray(frontPageDataCopy.content) as [
      Content
    ];
    // get only premium ads and shuffle them
    frontPageDataCopy.listing.listings = shuffleArray(
      frontPageDataCopy.listing.listings.filter((listing) =>
        frontpageData.listing.premiumIds.includes(listing.id)
      )
    ) as [Listing];

    // grab the DOM-elements for the three content divs

    /** This part should only occur in articles */
    /** Attempts to add job ads before every odd h2-tag in article */

    const bannerAds = frontPageDataCopy.bannerAds.filter(
      (ad) => ad.adFormat === "desktop-brandboard_980x600"
    );

    const mobileBannerAds = frontPageDataCopy.bannerAds.filter(
      (ad) => ad.adFormat === "mobile-banner_320x250"
    );

    // create node for banners and add before #hyvor-talk-view
    const bannerNode = document.createElement("div");
    ReactDOM.createRoot(bannerNode as HTMLElement).render(
      <React.StrictMode>
        <>
          {bannerAds.length > 0 && (
            <Banner ads={bannerAds} mobileToggle={false} />
          )}
          {mobileBannerAds.length > 0 && (
            <Banner ads={mobileBannerAds} mobileToggle={true} />
          )}
        </>
      </React.StrictMode>
    );

    document?.getElementById("hyvor-talk-view")?.before(bannerNode);
    document?.querySelector(".meta")?.after(bannerNode);
    // draw a listing before each h2
    const h2s = document.querySelectorAll(".bodytext>h2");
    h2s.forEach((h2, key: number) => {
      const listingNode = document.createElement("div");
      if (key === 0) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <>
              <PartnerAdTile partnerAds={frontPageDataCopy.partnerAdsSanity} />
            </>
          </React.StrictMode>
        );
        h2.before(listingNode);
      } else if (
        (key === 1 || key === 2) &&
        frontPageDataCopy.contentTiles.length > 0
      ) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ContentsRow
              Contents={frontPageDataCopy.contentTiles.splice(0, 1)}
              listView={false}
            />
          </React.StrictMode>
        );
        h2.before(listingNode);
      } else if (frontPageDataCopy.jobAdsSanity.length > 0) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ContentsRow
              Contents={
                shuffleArray([
                  ...frontPageDataCopy.jobAdsSanity.splice(0, 3),
                ]) as ContentTile[]
              }
              listView={false}
            />
          </React.StrictMode>
        );

        h2.before(listingNode);
      }
    });
  }
}
