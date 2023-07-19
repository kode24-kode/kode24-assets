/**
 * Injects job listings and commercial articles into articles on kode24
 */

import { Frontpage, Content, Listing } from './types/index.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ContentsRow from './components/ContentsRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
export default function FrontContent(frontpageData: Frontpage) {
  // So we don't mutate the original data
  const frontPageDataCopy = { ...frontpageData };
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
    const h2s = document.querySelectorAll(
      '.body-copy h2:nth-of-type(odd)'
    );
    h2s.forEach((h2, key: number) => {
      const listingNode = document.createElement('div');
      if (key === 0 && frontPageDataCopy.content.length > 0) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ContentsRow
              Contents={frontPageDataCopy.content.slice(0, 1)}
            />
          </React.StrictMode>
        );
        h2.before(listingNode);
      } else if (key === 1 && frontPageDataCopy.content.length > 1) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ContentsRow
              Contents={frontPageDataCopy.content.slice(1, 4)}
            />
          </React.StrictMode>
        );
        h2.before(listingNode);
      } else if (frontpageData.listing.listings.length > 0) {
        ReactDOM.createRoot(listingNode as HTMLElement).render(
          <React.StrictMode>
            <ListingsRow
              Listings={frontpageData.listing.listings.splice(0, 2)}
            />
          </React.StrictMode>
        );

        h2.before(listingNode);
      }
    });
  }
}
