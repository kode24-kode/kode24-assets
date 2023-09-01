/**
 * Draws the front content on kode24.
 * This is an annoying implementation, but basically there are three divs in every kode24 front page where content should be filled into. in between them there are banner ads from google that come from the server side.
 * Its a stupid implementation.
 */

import { Frontpage, Content, Listing } from './types/index.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ArticlesRow from './components/ArticlesRow.tsx';
import ContentsRow from './components/ContentsRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
import CompanyPartnersTile from './components/CompanyPartnersTile.tsx';

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
  frontPageDataCopy.listing.listings = shuffleArray(
    frontPageDataCopy.listing.listings.filter((listing) =>
      frontpageData.listing.premiumIds.includes(listing.id)
    )
  ) as [Listing];

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

  if (
    articlesAboveFirstBanner &&
    articlesBelowFirstBanner &&
    articlesBelowSecondBanner
  ) {
    // the logic here is that we want to render the first three articles in the first div, then the next three in the second div, and the rest in the third div.
    // if there are content-articles we try to render them instead of job ads in the first two divs.
    /**
    const latestArticlesAboveFirstBanner =
      frontPageDataCopy.latestArticles.splice(0, 3);
    const latestArticlesSecondRowAboveFirstBanner =
      frontPageDataCopy.latestArticles.splice(0, 1);
    const latestContentAboveFirstBanner =
      frontPageDataCopy.content.splice(0, 1);
    const latestListingsAboveFirstBanner =
      latestContentAboveFirstBanner.length > 0
        ? []
        : frontPageDataCopy.listing.listings.splice(0, 1);

    const latestArticlesBelowFirstBanner =
      frontPageDataCopy.latestArticles.splice(0, 3);
    const latestContentBelowFirstBanner =
      frontPageDataCopy.content.splice(0, 3);
    const latestListingsBelowFirstBanner =
      latestContentBelowFirstBanner.length > 0
        ? []
        : frontPageDataCopy.listing.listings.splice(0, 3);
    const latestFrontPageRowBelowFirstBanner =
      frontpageData.frontpage.splice(0, 1)[0] || undefined;

    const latestArticlesBelowSecondBanner = [
      ...frontPageDataCopy.latestArticles,
    ]; // should be the remainding articles
    const latestListingsBelowSecondBanner = [
      ...frontPageDataCopy.listing.listings,
    ]; // should be the remainding listings
    const latestFrontPageRowsBelowSecondBanner = [
      ...frontpageData.frontpage,
    ]; // should be the remainding frontpage rows
    */
    ReactDOM.createRoot(articlesAboveFirstBanner).render(
      <React.StrictMode>
        <>
          <ArticlesRow
            DesktopRowData={{
              layout: 'main-story-with-two-vertical',
              style: '',
              title: '',
              description: '',
              tags: 'artikler',
              antall: 3,
              lenke: '',
              articles: frontpageData.latestArticles.splice(0, 3),
            }}
            firstRow={true}
            hotnessThreshold={[20, 5]}
            listView={listView}
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
                frontPageDataCopy.content.length > 0 ||
                frontPageDataCopy.listing.listings.length > 0
                  ? frontpageData.latestArticles.splice(0, 1)
                  : frontpageData.latestArticles.splice(0, 2),
            }}
            firstRow={true}
            hotnessThreshold={[20, 5]}
            listView={listView}
            ad={
              frontPageDataCopy.content.length > 0
                ? frontpageData.content.splice(0, 1)[0]
                : undefined
            }
          />
          <CompanyPartnersTile
            companyPartners={frontpageData.companyPartners}
          />
        </>
      </React.StrictMode>
    );

    ReactDOM.createRoot(articlesBelowFirstBanner).render(
      <React.StrictMode>
        <>
          <ArticlesRow
            DesktopRowData={{
              layout: 'main-story-with-two-vertical',
              style: '',
              title: '',
              description: '',
              tags: 'artikler',
              antall: 3,
              lenke: '',
              articles: frontpageData.latestArticles.splice(0, 3),
            }}
            firstRow={false}
            hotnessThreshold={[20, 5]}
            listView={listView}
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
                frontPageDataCopy.content.length > 0 ||
                frontPageDataCopy.listing.listings.length > 0
                  ? frontpageData.latestArticles.splice(0, 1)
                  : frontpageData.latestArticles.splice(0, 2),
            }}
            firstRow={true}
            hotnessThreshold={[20, 5]}
            listView={listView}
            ad={
              frontPageDataCopy.content.length > 0
                ? frontpageData.content.splice(0, 1)[0]
                : undefined
            }
          />
          {frontPageDataCopy.listing.listings.length > 0 && (
            <ListingsRow
              Listings={frontPageDataCopy.listing.listings.splice(
                0,
                3
              )}
              listView={listView}
            />
          )}
        </>
      </React.StrictMode>
    );

    ReactDOM.createRoot(articlesBelowSecondBanner).render(
      <React.StrictMode>
        <>
          {frontPageDataCopy.frontpage.map((DesktopRow, key) => {
            return (
              <div key={key}>
                <ArticlesRow
                  DesktopRowData={{
                    layout: 'main-story-with-two-vertical',
                    style: '',
                    title: '',
                    description: '',
                    tags: 'artikler',
                    antall: 3,
                    lenke: '',
                    articles: frontPageDataCopy.latestArticles.splice(
                      0,
                      3
                    ),
                  }}
                  firstRow={false}
                  hotnessThreshold={[20, 5]}
                  listView={listView}
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
                      frontPageDataCopy.content.length > 0 ||
                      frontPageDataCopy.listing.listings.length > 0
                        ? frontpageData.latestArticles.splice(0, 1)
                        : frontpageData.latestArticles.splice(0, 2),
                  }}
                  firstRow={true}
                  hotnessThreshold={[20, 5]}
                  listView={listView}
                  ad={
                    frontPageDataCopy.content.length > 0
                      ? frontpageData.content.splice(0, 1)[0]
                      : undefined
                  }
                />
                <ArticlesRow
                  DesktopRowData={DesktopRow}
                  firstRow={false}
                  hotnessThreshold={[20, 5]}
                  key={key}
                  listView={listView}
                />
                {frontPageDataCopy.listing.listings.length > 0 && (
                  <ListingsRow
                    Listings={frontPageDataCopy.listing.listings.splice(
                      0,
                      3
                    )}
                    listView={listView}
                  />
                )}
              </div>
            );
          })}
        </>
      </React.StrictMode>
    );
  }
}
