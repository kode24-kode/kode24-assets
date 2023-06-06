import { Frontpage, DesktopRow } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
export default function ArticlesBelowSecondBanner({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  return (
    <div>
      {frontpageData.frontpage.slice(1).map((DesktopRow, key) => (
        <ArticlesRow
          DesktopRowData={DesktopRow}
          firstRow={true}
          hotnessThreshold={[20, 5]}
          key={key}
        />
      ))}
    </div>
  );
}
