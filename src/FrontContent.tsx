/**
 * Injects job listings and commercial articles into articles on kode24
 */

import structuredClone from "@ungap/structured-clone";
import React from "react";
import ReactDOM from "react-dom/client";
import Banner from "./components/Banner.tsx";
import CommentsTile from "./components/CommentsTile.tsx";
import CompanyPartnersTile from "./components/CompanyPartnersTile.tsx";
import ContentTile from "./components/ContentTile.tsx";
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

  rows.forEach((row, key: number) => {
    const listingNode = document.createElement("div");
    listingNode.style.maxWidth = "100%";
    const patternIndex = key % 4; // Creates repeating pattern: 0,1,2,3,0,1,2,3...

    // this row is reserved for job ads
    // always try to draw premium job ads that are registered in jobAdsSanity first

    if (key === 2) {
      listingNode.classList.add("full-width");
      ReactDOM.createRoot(listingNode as HTMLElement).render(
        <React.StrictMode>
          <ListingsRow
            customHeading={
              premiumJobAds.length > 0
                ? "Anbefalte ledige stillinger"
                : "Ledige stillinger"
            }
            Listings={
              premiumJobAds.length > 0
                ? (premiumJobAds as Listing[])
                : (jobAds as Listing[])
            }
          />
        </React.StrictMode>
      );
      row.before(listingNode);
      // if we have drawn a row for premium job ads already, draw normal job ads here
    } else if (key === 4 && premiumJobAds.length > 0) {
      listingNode.classList.add("full-width");
      ReactDOM.createRoot(listingNode as HTMLElement).render(
        <React.StrictMode>
          <ListingsRow
            customHeading={"Ledige stillinger"}
            Listings={jobAds as Listing[]}
          />
        </React.StrictMode>
      );
      row.before(listingNode);
    }
    // draw company partners tile on the 8th row
    else if (key === 3) {
      listingNode.classList.add("full-width");
      ReactDOM.createRoot(listingNode as HTMLElement).render(
        <React.StrictMode>
          <CompanyPartnersTile
            companyPartners={frontPageDataCopy.companyPartners}
          />
        </React.StrictMode>
      );
      row.before(listingNode);
    }
    // on the second row we should try to draw content advertisement if available
    // if no content advertisement is available, try to draw company partners
    else if (key === 0) {
      ReactDOM.createRoot(listingNode as HTMLElement).render(
        <React.StrictMode>
          {mobileBannerAds.length > 0 && (
            <Banner
              ads={mobileBannerAds}
              mobileToggle={true}
              namespace="mobile-top-banner"
            />
          )}
          {frontPageDataCopy.contentTiles.length > 0 && (
            <ContentTile
              Contents={frontPageDataCopy.contentTiles}
              perspective={true}
            />
          )}
          {frontPageDataCopy.contentTiles.length < 0 && (
            <PartnerAdTile partnerAds={frontPageDataCopy.partnerAdsSanity} />
          )}
        </React.StrictMode>
      );
      row.before(listingNode);
      // alternate between banners and company partners for the rest of the site
    } else if (patternIndex === 2 || patternIndex === 0) {
      ReactDOM.createRoot(listingNode as HTMLElement).render(
        <React.StrictMode>
          <PartnerAdTile
            partnerAds={frontPageDataCopy.partnerAdsSanity}
            perspective={true}
          />
        </React.StrictMode>
      );
      row.before(listingNode);
      //return; // skip the rest of the code below for job ad rows
    } else {
      ReactDOM.createRoot(listingNode as HTMLElement).render(
        <React.StrictMode>
          {desktopBannerAds.length > 0 && (
            <Banner
              ads={desktopBannerAds}
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
        </React.StrictMode>
      );
      row.before(listingNode);
    }

    /**

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
      if (
        key <= 3 &&
        frontPageDataCopy.jobs.filter((job) =>
          frontPageDataCopy.jobAdsSanity.some(
            (ad) => ad.adlink === job.published_url
          )
        ).length > 0
      ) {
        listingNode.classList.add("full-width");
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
            />
          </React.StrictMode>
        );
      } else if(key >= ) {
        listingNode.classList.add("full-width");
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ListingsRow
              customHeading="Ledige stillinger"
              Listings={shuffleArray([...frontPageDataCopy.jobs]) as Listing[]}
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
    */
  });
  const commentNode = document.createElement("div");
  commentNode.style.maxWidth = "100%";
  ReactDOM.createRoot(commentNode as HTMLElement).render(
    <React.StrictMode>
      <CommentsTile comments={frontPageDataCopy.newestComments} />
    </React.StrictMode>
  );
  document
    .querySelector("#front-articles-list .page-content .row:nth-child(5)")
    ?.append(commentNode);
}
