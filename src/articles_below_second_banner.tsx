import { Frontpage, Listing, Article } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
export default function ArticlesBelowSecondBanner({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  const listings: Listing[] =
    frontpageData.content.length > 0
      ? [...frontpageData.listing.listings]
      : frontpageData.listing.listings.slice(0, 3);
  const latestNewsSpliced: Article[] = [
    ...frontpageData.latestArticles.slice(6),
  ];
  return (
    <div>
      {frontpageData.frontpage.slice(1).map((DesktopRow, key) => {
        const splicedListings = listings.splice(0, 3);
        return (
          <div key={key}>
            <ArticlesRow
              DesktopRowData={{
                layout: 'main-story-with-two-vertical',
                style: '',
                title: '',
                description: '',
                tags: 'artikler',
                antall: 3,
                lenke: '',
                articles: latestNewsSpliced.splice(0, 3),
              }}
              firstRow={false}
              hotnessThreshold={[20, 5]}
            />
            <ArticlesRow
              DesktopRowData={DesktopRow}
              firstRow={false}
              hotnessThreshold={[20, 5]}
              key={key}
            />
            {splicedListings.length > 0 && (
              <ListingsRow Listings={listings.splice(0, 3)} />
            )}
          </div>
        );
      })}
    </div>
  );
}
