import { Article, DesktopRow } from '../types';
import ArticleTile from './ArticleTile.tsx';
import { findHottestArticle } from '../functions/findHottestArticle.tsx';
export default function ArticlesRow({
  DesktopRowData,
  firstRow,
  hotnessThreshold,
}: {
  DesktopRowData: DesktopRow;
  firstRow: boolean;
  hotnessThreshold: [number, number];
}) {
  findHottestArticle(DesktopRowData, hotnessThreshold);

  return (
    <div
      className={`row desktop-row undefined ${DesktopRowData.style} ${
        firstRow ? 'first-row' : ''
      }`}
    >
      <div className="heading"></div>
      <div className={DesktopRowData.layout}>
        {DesktopRowData.articles.map(
          (article: Article, key: number) => (
            <ArticleTile Article={article} key={key} isHot={false} />
          )
        )}
      </div>
    </div>
  );
}
