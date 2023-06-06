import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.scss';
import { Frontpage } from './types/index.ts';
import ArticlesAboveFirstBanner from './articles_above_first_banner.tsx';
import ArticlesBelowFirstBanner from './articles_below_first_banner.tsx';
import ArticlesBelowSecondBanner from './articles_below_second_banner.tsx';
async function main() {
  const response = await fetch(
    'https://functions.kode24.no/api/frontpage'
  );
  const FrontpageData: Frontpage = await response.json();

  ReactDOM.createRoot(
    document.getElementById(
      'articles-above-first-banner'
    ) as HTMLElement
  ).render(
    <React.StrictMode>
      <ArticlesAboveFirstBanner frontpageData={FrontpageData} />
    </React.StrictMode>
  );

  ReactDOM.createRoot(
    document.getElementById(
      'articles-below-first-banner'
    ) as HTMLElement
  ).render(
    <React.StrictMode>
      <ArticlesBelowFirstBanner frontpageData={FrontpageData} />
    </React.StrictMode>
  );

  ReactDOM.createRoot(
    document.getElementById(
      'articles-below-second-banner'
    ) as HTMLElement
  ).render(
    <React.StrictMode>
      <ArticlesBelowSecondBanner frontpageData={FrontpageData} />
    </React.StrictMode>
  );
}

main();
