import { Frontpage } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
export default function ArticlesBelowFirstBanner({
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
          articles: frontpageData.latestArticles.slice(3, 7),
        }}
        firstRow={true}
        hotnessThreshold={[20, 5]}
      />

      <ListingsRow
        Listings={
          frontpageData.content?.length > 0
            ? frontpageData.content
            : frontpageData.listing.listings.slice(0, 3)
        }
      />
      {frontpageData.frontpage.length > 0 && (
        <ArticlesRow
          DesktopRowData={frontpageData.frontpage[0]}
          firstRow={false}
          hotnessThreshold={[20, 5]}
        />
      )}
    </div>
  );
}
