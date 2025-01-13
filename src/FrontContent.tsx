/**
 * Draws the front content on kode24.
 * This is an annoying implementation, but basically there are three divs in every kode24 front page where content should be filled into. in between them there are banner ads from google that come from the server side.
 * Its a stupid implementation.
 */

import {
  Frontpage,
  Content,
  ContentTile,
  Listing,
} from './types/index.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
import CompanyPartnersTile from './components/CompanyPartnersTile.tsx';
import structuredClone from '@ungap/structured-clone';
import CommentsTile from './components/CommentsTile.tsx';
import SortByReactions from './components/SortByReactions.tsx';
import PremiumListing from './components/PremiumListing.tsx';
import TopPhoto from './components/TopPhoto.tsx';
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

  const articlesBelowFirstBanner = document.getElementById(
    'articles-below-first-banner'
  ) as HTMLElement;

  const articlesBelowSecondBanner = document.getElementById(
    'articles-below-second-banner'
  ) as HTMLElement;

  function renderContentBelowFirstBanner() {
    ReactDOM.createRoot(articlesBelowFirstBanner).render(
      <React.StrictMode>
        <>
          <div className="flex gap-8 max-w-screen-xl mx-auto items-start justify-between pt-16">
            <ArticlesRow
              DesktopRowData={{
                layout: 'list',
                style: '',
                title: '',
                description: '',
                tags: 'artikler',
                antall: 3,
                lenke: '',
                articles: frontPageDataCopy.latestArticles,
              }}
              firstRow={false}
              hotnessThreshold={[40, 10]}
              listView={listView}
              newestComments={frontPageDataCopy.newestComments}
            />
            <PremiumListing
              Listings={
                shuffleArray([
                  ...frontpageData.jobs.filter(
                    (listing: Listing) =>
                      listing.type &&
                      (listing.type === 'premium' ||
                        listing.type === 'fokus')
                  ),
                ]) as Listing[]
              }
            />
          </div>
          <CompanyPartnersTile
            companyPartners={frontPageDataCopy.companyPartners}
          />
        </>
      </React.StrictMode>
    );

    ReactDOM.createRoot(articlesBelowSecondBanner).render(
      <React.StrictMode></React.StrictMode>
    );
  }

  if (
    articlesAboveFirstBanner &&
    articlesBelowFirstBanner &&
    articlesBelowSecondBanner
  ) {
    ReactDOM.createRoot(articlesAboveFirstBanner).render(
      <React.StrictMode>
        <div>
          <TopPhoto
            imageUrl={`https://www.kode24.no/images/${frontPageDataCopy.latestArticles[0].image}.jpg${frontPageDataCopy.latestArticles[0].frontCropUrl}&width=960&height=600`}
          />
          <ArticlesRow
            DesktopRowData={{
              layout: 'main-story-double-column',
              style: 'inverse',
              title: '',
              description: '',
              tags: 'artikler',
              antall: 3,
              lenke: '',
              articles: frontPageDataCopy.latestArticles.splice(0, 3),
            }}
            firstRow={true}
            hotnessThreshold={[20, 5]}
            listView={listView}
            newestComments={frontPageDataCopy.newestComments}
          />

          <ArticlesRow
            DesktopRowData={{
              layout: 'dual-column',
              style: 'inverse',
              title: '',
              description: '',
              tags: 'artikler',
              antall: 2,
              lenke: '',
              articles:
                frontPageDataCopy.content.length > 0
                  ? frontPageDataCopy.latestArticles.splice(0, 1)
                  : frontPageDataCopy.latestArticles.splice(0, 2),
            }}
            firstRow={true}
            hotnessThreshold={[20, 5]}
            listView={listView}
            ad={
              allContentTiles.length > 0
                ? allContentTiles.splice(0, 1)[0]
                : undefined
            }
            newestComments={frontPageDataCopy.newestComments}
          />
        </div>
      </React.StrictMode>
    );

    renderContentBelowFirstBanner();
  }
}

/**
 *
 *
 * <PremiumListing
          <CommentsTile comments={frontPageDataCopy.newestComments} />
          <CompanyPartnersTile
            companyPartners={frontPageDataCopy.companyPartners}
          />
 */

/**






        <>
          {frontPageDataCopy.frontpage &&
            frontPageDataCopy.frontpage.map &&
            frontPageDataCopy.frontpage.map((DesktopRow, key) => {
              return (
                <div key={key}>
                  <ArticlesRow
                    DesktopRowData={{
                      layout: 'bg-yellow-100',
                      style: '',
                      title: '',
                      description: '',
                      tags: 'artikler',
                      antall: 3,
                      lenke: '',
                      articles:
                        frontPageDataCopy.latestArticles.splice(0, 3),
                    }}
                    firstRow={false}
                    hotnessThreshold={[60, 30]}
                    listView={listView}
                    newestComments={frontPageDataCopy.newestComments}
                  />
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
                        allContentTiles.length > 0
                          ? frontPageDataCopy.latestArticles.splice(
                              0,
                              1
                            )
                          : frontPageDataCopy.latestArticles.splice(
                              0,
                              2
                            ),
                    }}
                    firstRow={true}
                    hotnessThreshold={[60, 30]}
                    listView={listView}
                    newestComments={frontPageDataCopy.newestComments}
                    ad={
                      allContentTiles.length > 0
                        ? allContentTiles.splice(0, 1)[0]
                        : undefined
                    }
                  />
                  <ArticlesRow
                    DesktopRowData={DesktopRow}
                    firstRow={false}
                    hotnessThreshold={[50, 20]}
                    key={key}
                    listView={listView}
                    newestComments={frontPageDataCopy.newestComments}
                  />
                </div>
              );
            })}
        </>

 */
