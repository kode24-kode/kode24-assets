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
        {DesktopRowData.articles.map(
          (article: Article, key: number) => {
            let layout = '';
            if (
              DesktopRowData.layout === 'main-story-double-column'
            ) {
              layout =
                key === 0
                  ? 'col-span-4 row-span-2'
                  : 'col-span-2 row-span-1';
            } else {
              layout = 'col-span-3';
            }
            return (
              <ArticleTile
                Article={article}
                key={key}
                layout={layout}
                style={DesktopRowData.style}
                size={(layout = key === 0 ? 'big' : 'small')}
                isHot={
                  hottestArticle && hottestArticle === article.id
                    ? true
                    : false
                }
              />
            );
          }
        )}
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
    </div>
  );
}
