import { Frontpage } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
import ContentsRow from './components/ContentsRow.tsx';
export default function ArticlesAboveFirstBanner({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  const latestArticles = frontpageData.latestArticles.splice(0, 3);
  const content = frontpageData.content.splice(0, 1);
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
          articles: latestArticles,
        }}
        firstRow={true}
        hotnessThreshold={[20, 5]}
      />
      {content.length > 0 && <ContentsRow Contents={content} />}
    </div>
  );
}
