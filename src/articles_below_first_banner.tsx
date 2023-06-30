import { Frontpage, Content, Listing } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
import ContentsRow from './components/ContentsRow.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
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
        <ContentsRow
          Contents={shuffleArray(frontpageData.content) as Content[]}
        />
      )}
      {frontpageData.content.length <= 0 && (
        <ListingsRow
          Listings={
            shuffleArray(
              frontpageData.listing.listings.slice(0, 3)
            ) as Listing[]
          }
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
