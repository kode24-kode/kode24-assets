import { Frontpage, Listing, Article } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
export default function ArticlesBelowSecondBanner({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  // if there are no contents the listings will be offset by 3 as 3 have already been shown in "articles_below_first_banner.tsx"
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
        const splicedListings = shuffleArray(
          listings.splice(0, 3)
        ) as Listing[];
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
              <ListingsRow Listings={splicedListings} />
            )}
          </div>
        );
      })}
    </div>
  );
}
