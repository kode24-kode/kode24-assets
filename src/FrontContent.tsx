/**
 * Draws the front content on kode24.
 * This is an annoying implementation, but basically there are three divs in every kode24 front page where content should be filled into. in between them there are banner ads from google that come from the server side.
 * Its a stupid implementation.
 */

import {
  Frontpage,
  Content,
  ContentTile,
  DesktopRow,
} from './types/index.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
import CompanyPartnersTile from './components/CompanyPartnersTile.tsx';
import structuredClone from '@ungap/structured-clone';
import PartnerAdTile from './components/PartnerAdTile.tsx';
import Banner from './components/Banner.tsx';
import CommentsTile from './components/CommentsTile.tsx';
import { useEffect, useState } from 'react';

export default function FrontContent(frontpageData: Frontpage) {
  const listView = false;
  // So we don't mutate the original data
  const frontPageDataCopy = structuredClone(
    frontpageData
  ) as Frontpage;
  /** shuffle content and ads */
  frontPageDataCopy.content = shuffleArray(
    frontPageDataCopy.content
  ) as [Content];
  // get only premium ads and shuffle them
  const allContentTiles = [
    ...shuffleArray(frontPageDataCopy.contentTiles),
    ...shuffleArray(frontPageDataCopy.jobAdsSanity),
  ] as [ContentTile];

  // grab the DOM-elements for the three content divs
  const articlesAboveFirstBanner = document.getElementById(
    'articles-above-first-banner'
  ) as HTMLElement;

  /**
  const articlesBelowFirstBanner = document.getElementById(
    'articles-below-first-banner'
  ) as HTMLElement;

  const articlesBelowSecondBanner = document.getElementById(
    'articles-below-second-banner'
  ) as HTMLElement;


  const bannerAds = frontPageDataCopy.bannerAds.filter(
    (ad) => ad.adFormat === 'desktop-brandboard_980x600'
  );

  const mobileBannerAds = frontPageDataCopy.bannerAds.filter(
    (ad) => ad.adFormat === 'mobile-banner_320x250'
  );

  const topBannersMobile =
    frontPageDataCopy.bannerAds?.filter(
      (banner) => banner.adFormat === 'mobile-topbanner_320x250'
    ) || [];
*/
  /**
  function renderContentBelowFirstBanner() {


    );
  }
   */

  if (articlesAboveFirstBanner) {
    ReactDOM.createRoot(articlesAboveFirstBanner).render(
      <React.StrictMode>
        <FrontPageContent
          frontPageDataCopy={frontPageDataCopy}
          allContentTiles={allContentTiles}
          listView={listView}
        />
      </React.StrictMode>
    );

    //renderContentBelowFirstBanner();
  }
}

const FrontPageContent = ({
  frontPageDataCopy,

  allContentTiles,
  listView,
}: {
  frontPageDataCopy: Frontpage;
  allContentTiles: ContentTile[];
  listView: boolean;
}) => {
  const [latestArticlesCopy, setLatestArticlesCopy] = useState([
    frontPageDataCopy.latestArticles[0],
  ]);
  const latestArticles = [...frontPageDataCopy.latestArticles];
  const jobs = [...frontPageDataCopy.jobs];
  const [showAllToggle, setShowAllToggle] = useState(false);
  const allAds = [...allContentTiles];
  const desktopRows = [
    ...frontPageDataCopy.frontpage,
  ] as DesktopRow[];
  const topBannersMobile =
    frontPageDataCopy.bannerAds?.filter(
      (banner) => banner.adFormat === 'mobile-topbanner_320x250'
    ) || [];
  const bannerAds = frontPageDataCopy.bannerAds.filter(
    (ad) => ad.adFormat === 'desktop-brandboard_980x600'
  );

  const mobileBannerAds = frontPageDataCopy.bannerAds.filter(
    (ad) => ad.adFormat === 'mobile-banner_320x250'
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 400 && !showAllToggle) {
        setLatestArticlesCopy([...frontPageDataCopy.latestArticles]);
        setShowAllToggle(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showAllToggle, frontPageDataCopy.latestArticles]);

  return (
    <>
      {latestArticlesCopy.map((_, index) => {
        return (
          <section key={index}>
            {latestArticles.length >= 1 && (
              <div key={index}>
                <ArticlesRow
                  DesktopRowData={{
                    layout: 'main-story-with-two-vertical',
                    style: '',
                    title: '',
                    description: '',
                    tags: 'artikler',
                    antall: 3,
                    lenke: '',
                    articles: latestArticles.splice(0, 3),
                  }}
                  firstRow={false}
                  hotnessThreshold={[60, 30]}
                  listView={listView}
                  newestComments={frontPageDataCopy.newestComments}
                />
                {index === 0 && topBannersMobile.length > 0 && (
                  <Banner
                    ads={[...topBannersMobile]}
                    mobileToggle={true}
                  />
                )}

                {topBannersMobile.length <= 0 &&
                  mobileBannerAds.length > 0 && (
                    <Banner
                      ads={[...mobileBannerAds]}
                      mobileToggle={true}
                    />
                  )}
              </div>
            )}
            {latestArticles.length >= 2 && (
              <ArticlesRow
                DesktopRowData={{
                  layout: 'dual',
                  style: '',
                  title: '',
                  description: '',
                  tags: 'artikler',
                  antall: 2,
                  lenke: '',
                  articles:
                    allAds.length > 0
                      ? latestArticles.splice(0, 1)
                      : latestArticles.splice(0, 2),
                }}
                firstRow={true}
                hotnessThreshold={[60, 30]}
                listView={listView}
                newestComments={frontPageDataCopy.newestComments}
                ad={
                  allAds.length > 0
                    ? allAds.splice(0, 1)[0]
                    : undefined
                }
              />
            )}
            {bannerAds.length > 0 && (
              <Banner ads={[...bannerAds]} mobileToggle={false} />
            )}
            <div>
              {index === 0 && (
                <>
                  <CommentsTile
                    comments={frontPageDataCopy.newestComments}
                  />
                  <PartnerAdTile
                    partnerAds={frontPageDataCopy.partnerAdsSanity}
                  />
                </>
              )}
            </div>

            {index !== 0 && desktopRows.length > 0 && (
              <ArticlesRow
                DesktopRowData={desktopRows.splice(0, 1)[0]}
                firstRow={false}
                hotnessThreshold={[50, 20]}
                listView={listView}
                newestComments={frontPageDataCopy.newestComments}
              />
            )}
            {index === 1 && (
              <CompanyPartnersTile
                companyPartners={frontPageDataCopy.companyPartners}
              />
            )}
            <>
              {jobs.length > 0 && (
                <ListingsRow
                  Listings={jobs.splice(0, 3)}
                  listView={listView}
                />
              )}
            </>
          </section>
        );
      })}
    </>
  );
};
