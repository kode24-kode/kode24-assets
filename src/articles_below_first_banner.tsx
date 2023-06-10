import { Frontpage } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
import ContentsRow from './components/ContentsRow.tsx';
export default function ArticlesBelowFirstBanner({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  return (
    <>
      <ArticlesRow
        DesktopRowData={{
          layout: 'main-story-with-two-vertical',
          style: '',
          title: '',
          description: '',
          tags: 'artikler',
          antall: 3,
          lenke: '',
          articles: frontpageData.latestArticles.slice(3, 6),
        }}
        firstRow={false}
        hotnessThreshold={[20, 5]}
      />
      {frontpageData.content.length > 0 && (
        <ContentsRow Contents={frontpageData.content} />
      )}
      {frontpageData.content.length <= 0 && (
        <ListingsRow
          Listings={frontpageData.listing.listings.slice(0, 3)}
        />
      )}
      {frontpageData.frontpage.length > 0 && (
        <ArticlesRow
          DesktopRowData={frontpageData.frontpage[0]}
          firstRow={false}
          hotnessThreshold={[20, 5]}
        />
      )}
    </>
  );
}
