import {
  Article,
  Listing,
  ContentTile,
  DesktopRow,
  Comment,
} from '../types';
import ArticleTile from './ArticleTile.tsx';
import ContentTileItem from './ContentTile.tsx';
import ListingTile from './ListingTile.tsx';
import { findHottestArticle } from '../functions/findHottestArticle.tsx';
import { useState } from 'react';
export default function ArticlesRow({
  DesktopRowData,
  firstRow,
  hotnessThreshold,
  listView,
  ad,
}: {
  DesktopRowData: DesktopRow;
  firstRow: boolean;
  hotnessThreshold: [number, number];
  listView: boolean;
  ad?: Listing | ContentTile | null;
  newestComments?: [Comment] | [];
}) {
  const hottestArticle = findHottestArticle(
    DesktopRowData,
    hotnessThreshold
  );
  const [numberOfArticles, setNumberOfArticles] = useState(10);
  return (
    <div className={`row desktop-row mb-16`}>
      <div
        className={`heading ${
          DesktopRowData.title ? '' : 'no-title'
        }`}
      >
        {DesktopRowData.title && (
          <>
            <h2 className="heading-title">{DesktopRowData.title}</h2>
            <a
              href={`https://www.kode24.no${DesktopRowData.lenke}`}
              target="_blank"
              className="button"
            >
              Se alle
            </a>
          </>
        )}
      </div>
      <div
        className={`
          max-w-screen-xl mx-auto grid grid-cols-6 gap-8 auto-cols-min
        `}
      >
        {DesktopRowData.articles
          .slice(0, numberOfArticles)
          .map((article: Article, key: number) => {
            let layout = '';
            if (
              DesktopRowData.layout === 'main-story-double-column'
            ) {
              layout =
                key === 0
                  ? 'col-span-4 row-span-2'
                  : 'col-span-2 row-span-1';
            } else if (DesktopRowData.layout === 'list') {
              layout = 'col-span-6 border-b pb-8'; // full width if list
            } else {
              layout = 'col-span-3';
            }
            return (
              <ArticleTile
                Article={article}
                key={key}
                horisontal={
                  DesktopRowData.layout === 'list' ? true : false
                }
                layout={layout}
                style={DesktopRowData.style}
                size={
                  key === 0 && DesktopRowData.layout !== 'list'
                    ? 'big'
                    : 'small'
                }
                isHot={
                  hottestArticle && hottestArticle === article.id
                    ? true
                    : false
                }
              />
            );
          })}
        {ad && 'banner' in ad && (
          <ContentTileItem
            Content={ad}
            layout={'col-span-3'}
            size={'big'}
            style={DesktopRowData.style}
          />
        )}
        {ad && 'id' in ad && (
          <ListingTile
            Listing={ad}
            layout={'col-span-3'}
            size={'big'}
            style={DesktopRowData.style}
          />
        )}
      </div>
      {DesktopRowData.articles.length > numberOfArticles && (
        <button
          className="w-full bg-slate-300 p-4 rounded-md font-bold"
          onClick={() => setNumberOfArticles((prev) => prev + 5)}
        >
          Vi flere +
        </button>
      )}
    </div>
  );
}
