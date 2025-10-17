/**
 * Injects job listings and commercial articles into articles on kode24
 */

import structuredClone from "@ungap/structured-clone";
import React from "react";
import ReactDOM from "react-dom/client";
import Banner from "./components/Banner.tsx";
import CommentsTile from "./components/CommentsTile.tsx";
import CompanyPartnersTile from "./components/CompanyPartnersTile.tsx";
import ContentsRow from "./components/ContentsRow.tsx";
import ListingsRow from "./components/ListingsRow";
import PartnerAdTile from "./components/PartnerAdTile.tsx";
import { shuffleArray } from "./functions/shuffleArray.ts";
import type { Frontpage, Listing } from "./types/index.ts";
export default function FrontContent(frontpageData: Frontpage) {
  // So we don't mutate the original data
  const frontPageDataCopy = structuredClone(frontpageData) as Frontpage;
  /** shuffle content and ads */
  const mobileBannerAds =
    frontPageDataCopy?.bannerAds?.filter(
      (ad) =>
        ad?.adFormat === "mobile-banner_320x250" ||
        ad?.adFormat === "mobile-topbanner_320x250"
    ) || [];

  const desktopBannerAds = frontPageDataCopy.bannerAds.filter(
    (ad) => ad.adFormat === "desktop-brandboard_980x600"
  );

  // draw a listing before each h2
  // iterate and draw listings
  const rows = document.querySelectorAll(
    "#front-articles-list .page-content .row:not(:first-child):nth-child(2n+1)"
  );

  rows.forEach((row, key: number) => {
    const listingNode = document.createElement("div");
    const patternIndex = key % 4; // Creates repeating pattern: 0,1,2,3,0,1,2,3...

    if (patternIndex === 0 && frontPageDataCopy.contentTiles.length > 0) {
      // After first row (and every 4th row): Content tile
      ReactDOM.createRoot(listingNode as HTMLElement).render(
        <React.StrictMode>
          {mobileBannerAds.length > 0 && (
            <Banner ads={mobileBannerAds} mobileToggle={true} />
          )}
          <ContentsRow
            Contents={frontPageDataCopy.contentTiles.splice(0, 1)}
            listView={false}
          />
        </React.StrictMode>
      );
      row.before(listingNode);
    } else if (
      patternIndex === 2 &&
      frontPageDataCopy.jobAdsSanity.length > 0
    ) {
      // After second row (and every 4th+1 row): Job ad
      if (key <= 3) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ListingsRow
              customHeading="Anbefalte ledige stillinger"
              Listings={
                shuffleArray([
                  ...frontPageDataCopy.jobs
                    .filter((job) =>
                      frontPageDataCopy.jobAdsSanity.some(
                        (ad) => ad.adlink === job.published_url
                      )
                    )
                    .map((job) => ({
                      ...job,
                      type: "premium",
                    })),
                ]) as Listing[]
              }
              listView={false}
            />
          </React.StrictMode>
        );
      } else {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ListingsRow
              customHeading="Ledige stillinger"
              Listings={shuffleArray([...frontPageDataCopy.jobs]) as Listing[]}
              listView={false}
            />
          </React.StrictMode>
        );
      }
      row.before(listingNode);
    } else if (patternIndex === 1) {
      // After third row (and every 4th+2 row): Banner
      ReactDOM.createRoot(listingNode as HTMLElement).render(
        <React.StrictMode>
          {desktopBannerAds.length > 0 && (
            <Banner ads={desktopBannerAds} mobileToggle={false} />
          )}
          {mobileBannerAds.length > 0 && (
            <Banner ads={mobileBannerAds} mobileToggle={true} />
          )}
          {key < 3 && (
            <CommentsTile comments={frontPageDataCopy.newestComments} />
          )}
          {key >= 3 && key < 6 && (
            <CompanyPartnersTile
              companyPartners={frontPageDataCopy.companyPartners}
            />
          )}
        </React.StrictMode>
      );
      row.before(listingNode);
    } else if (
      patternIndex >= 3 &&
      frontPageDataCopy.partnerAdsSanity.length > 0
    ) {
      // After fourth row (and every 4th+3 row): Partner ad
      ReactDOM.createRoot(listingNode as HTMLElement).render(
        <React.StrictMode>
          <PartnerAdTile partnerAds={frontPageDataCopy.partnerAdsSanity} />
        </React.StrictMode>
      );
      row.before(listingNode);
    }
  });
}
