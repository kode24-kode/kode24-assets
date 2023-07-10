import { Frontpage } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
import ContentsRow from './components/ContentsRow.tsx';
export default function ArticlesBelowFirstBanner({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  const latestArticles = frontpageData.latestArticles.splice(0, 3);
  const content = frontpageData.content.splice(0, 3);
  console.log('got content', content);
  const listings =
    content.length > 0
      ? []
      : frontpageData.listing.listings.splice(0, 3);
  console.log('got listings', content);
  const frontPageRow = frontpageData.frontpage.splice(0, 1);
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
          articles: latestArticles,
        }}
        firstRow={false}
        hotnessThreshold={[20, 5]}
      />
      d{listings.length > 0 && <ListingsRow Listings={listings} />}f d
      c{content.length > 0 && <ContentsRow Contents={content} />}f
      {frontPageRow.length > 0 && (
        <ArticlesRow
          DesktopRowData={frontPageRow[0]}
          firstRow={false}
          hotnessThreshold={[20, 5]}
        />
      )}
    </>
  );
}
