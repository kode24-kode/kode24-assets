/**
 * Draws the front content on kode24.
 * This is an annoying implementation, but basically there are three divs in every kode24 front page where content should be filled into. in between them there are banner ads from google that come from the server side.
 * Its a stupid implementation.
 */

import { Frontpage, Content, ContentTile } from './types/index.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
import CompanyPartnersTile from './components/CompanyPartnersTile.tsx';
import structuredClone from '@ungap/structured-clone';

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
          <ArticlesRow
            DesktopRowData={{
              layout: 'main-story-with-two-vertical',
              style: '',
              title: '',
              description: '',
              tags: 'artikler',
              antall: 3,
              lenke: '',
              articles: frontPageDataCopy.latestArticles.splice(0, 3),
            }}
            firstRow={false}
            hotnessThreshold={[40, 10]}
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
                  ? frontPageDataCopy.latestArticles.splice(0, 1)
                  : frontPageDataCopy.latestArticles.splice(0, 2),
            }}
            firstRow={true}
            hotnessThreshold={[40, 10]}
            listView={listView}
            newestComments={frontPageDataCopy.newestComments}
            ad={
              allContentTiles.length > 0
                ? allContentTiles.splice(0, 1)[0]
                : undefined
            }
          />
          {frontPageDataCopy.jobs.length > 0 && (
            <ListingsRow
              Listings={frontPageDataCopy.jobs.splice(0, 3)}
              listView={listView}
            />
          )}
        </>
      </React.StrictMode>
    );

    ReactDOM.createRoot(articlesBelowSecondBanner).render(
      <React.StrictMode>
        <>
          {frontPageDataCopy.frontpage &&
            frontPageDataCopy.frontpage.map &&
            frontPageDataCopy.frontpage.map((DesktopRow, key) => {
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
                  {frontPageDataCopy.jobs.length > 0 && (
                    <ListingsRow
                      Listings={frontPageDataCopy.jobs.splice(0, 3)}
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

  if (
    articlesAboveFirstBanner &&
    articlesBelowFirstBanner &&
    articlesBelowSecondBanner
  ) {
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
              articles: frontPageDataCopy.latestArticles.splice(0, 3),
            }}
            firstRow={true}
            hotnessThreshold={[20, 5]}
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
          <CompanyPartnersTile
            companyPartners={frontPageDataCopy.companyPartners}
          />
        </>
      </React.StrictMode>
    );

    renderContentBelowFirstBanner();
  }
}
