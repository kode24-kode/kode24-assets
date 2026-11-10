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
import JobContentTile from "./components/JobContentTile.tsx";
import ListingsRow from "./components/ListingsRow";
import PartnerAdTile from "./components/PartnerAdTile.tsx";
import { shuffleArray } from "./functions/shuffleArray.ts";
import type { Frontpage, Listing } from "./types/index.ts";
//import React from "react";
import { PartnerPage2Banner } from "./components/PartnerPage2Banner.tsx";

export default function FrontContent(frontpageData: Frontpage) {
  // So we don't mutate the original data
  const frontPageDataCopy = structuredClone(frontpageData) as Frontpage;
  /** shuffle content and ads */
  const mobileBannerAds =
    frontPageDataCopy?.bannerAds?.filter(
      (ad) =>
        ad?.adFormat === "mobile-banner_320x250" ||
        ad?.adFormat === "mobile-topbanner_320x250",
    ) || [];

  const desktopBannerAds = frontPageDataCopy.bannerAds.filter(
    (ad) => ad.adFormat === "desktop-brandboard_980x600",
  );

  // draw a listing before each h2
  // iterate and draw listings
  const rows = document.querySelectorAll(
    "#front-articles-list .page-content .row:not(:first-child):nth-child(2n+1)",
  );

  const premiumJobAds = shuffleArray(
    frontPageDataCopy.jobs
      .filter((job) =>
        frontPageDataCopy.jobAdsSanity.some(
          (ad) => ad.adlink === job.published_url,
        ),
      )
      .map((job) => ({
        ...job,
        type: "premium",
      })),
  );

  const jobAds = shuffleArray(frontPageDataCopy.jobs);
  const premiumPlusJobAds = frontPageDataCopy.jobs.filter(
    (job) => job.premiumPlus,
  );

  /**
   * Ad types in priority order. An ad slot is drawn for every second row,
   * and we loop through the types that have content, so a type with nothing
   * to show is skipped in favour of the next one on the list.
   */
  const adTypes: {
    available: boolean;
    fullWidth?: boolean;
    render: () => React.ReactNode;
  }[] = [
    {
      // content
      available: frontPageDataCopy.contentTiles.length > 0,
      render: () => (
        <ContentTile
          Contents={frontPageDataCopy.contentTiles}
          perspective={true}
        />
      ),
    },
    {
      // banner
      available: desktopBannerAds.length > 0 || mobileBannerAds.length > 0,
      render: () => (
        <>
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
        </>
      ),
    },
    {
      // premium plus stillingsannonse
      available: premiumPlusJobAds.length > 0,
      render: () => <JobContentTile Jobs={premiumPlusJobAds as Listing[]} />,
    },
    {
      // portalbanner
      available: (frontPageDataCopy.partnerPages2?.length ?? 0) > 0,
      fullWidth: true,
      render: () => (
        <PartnerPage2Banner partnerPages2={frontPageDataCopy.partnerPages2} />
      ),
    },
    {
      // premium stillingskarusell
      available: premiumJobAds.length > 0,
      fullWidth: true,
      render: () => (
        <ListingsRow
          customHeading="Anbefalte ledige stillinger"
          Listings={premiumJobAds as Listing[]}
        />
      ),
    },
    {
      // partnerlogoer
      available: (frontPageDataCopy.companyPartners?.length ?? 0) > 0,
      fullWidth: true,
      render: () => (
        <CompanyPartnersTile
          companyPartners={frontPageDataCopy.companyPartners}
        />
      ),
    },
    {
      // partneradtile
      available: frontPageDataCopy.partnerAdsSanity.length > 0,
      render: () => (
        <PartnerAdTile
          partnerAds={frontPageDataCopy.partnerAdsSanity}
          perspective={true}
        />
      ),
    },
    {
      // stillingskarusell
      available: jobAds.length > 0,
      fullWidth: true,
      render: () => (
        <ListingsRow
          customHeading="Ledige stillinger"
          Listings={jobAds as Listing[]}
        />
      ),
    },
  ];
  const availableAdTypes = adTypes.filter((adType) => adType.available);

  if (availableAdTypes.length > 0) {
    rows.forEach((row, key: number) => {
      const adType = availableAdTypes[key % availableAdTypes.length];
      const adNode = document.createElement("div");
      adNode.style.maxWidth = "100%";
      if (adType.fullWidth) {
        adNode.classList.add("full-width");
      }
      ReactDOM.createRoot(adNode as HTMLElement).render(
        <React.StrictMode>{adType.render()}</React.StrictMode>,
      );
      row.before(adNode);
    });
  }
  const commentNode = document.createElement("div");
  commentNode.style.maxWidth = "100%";
  ReactDOM.createRoot(commentNode as HTMLElement).render(
    <React.StrictMode>
      <CommentsTile comments={frontPageDataCopy.newestComments} />
    </React.StrictMode>,
  );
  document
    .querySelector("#front-articles-list .page-content .row:nth-child(5)")
    ?.append(commentNode);
}
