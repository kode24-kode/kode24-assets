import { Frontpage } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
export default function ArticlesAboveFirstBanner({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  return (
    <div>
      <ArticlesRow
        DesktopRowData={{
          layout: 'main-story-with-two-vertical',
          style: '',
          title: '',
          description: '',
          tags: 'artikler',
          antall: 3,
          lenke: '',
          articles: frontpageData.latestArticles.slice(0, 3),
        }}
        firstRow={true}
        hotnessThreshold={[20, 5]}
      />
    </div>
  );
}
