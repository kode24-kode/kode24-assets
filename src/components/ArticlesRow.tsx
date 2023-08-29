import { Article, Listing, Content, DesktopRow } from '../types';
import ArticleTile from './ArticleTile.tsx';
import ContentTile from './ContentTile.tsx';
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
  ad?: Listing | Content | null;
}) {
  const hottestArticle = findHottestArticle(
    DesktopRowData,
    hotnessThreshold
  );
  return (
    <div
      className={`row desktop-row ${DesktopRowData.style} ${
        firstRow ? 'first-row' : ''
      }
      ${listView ? 'list-view' : ''}
        `}
    >
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
      <div className={DesktopRowData.layout}>
        {DesktopRowData.articles.map(
          (article: Article, key: number) => (
            <ArticleTile
              Article={article}
              key={key}
              isHot={
                hottestArticle && hottestArticle === article.id
                  ? true
                  : false
              }
            />
          )
        )}
        {ad && <ContentTile Content={ad} />}
      </div>
    </div>
  );
}
