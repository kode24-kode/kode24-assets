/**
 * Injects job listings and commercial articles into articles on kode24
 */

import {
  Frontpage,
  Content,
  Listing,
  ContentTile,
} from './types/index.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ContentsRow from './components/ContentsRow.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
import CompanyPartnersTile from './components/CompanyPartnersTile.tsx';
import structuredClone from '@ungap/structured-clone';
export default function FrontContent(frontpageData: Frontpage) {
  (window as any).hljs.highlightAll();

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

  /** This part should only occur in articles */
  /** Attempts to add job ads before every odd h2-tag in article */
  if (document.querySelector('.article-entity.artikkel')) {
    // draw a listing before each h2
    const h2s = document.querySelectorAll('.body-copy h2');
    h2s.forEach((h2, key: number) => {
      const listingNode = document.createElement('div');
      if (key === 0) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <>
              <CompanyPartnersTile
                companyPartners={frontPageDataCopy.companyPartners}
              />
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
      } else if (frontpageData.listing.listings.length > 0) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ContentsRow
              Contents={
                shuffleArray([
                  ...frontPageDataCopy.jobAdsSanity.splice(0, 2),
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
