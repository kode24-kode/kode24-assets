import { Frontpage } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
import ListingsRow from './components/ListingsRow.tsx';
export default function ArticlesBelowSecondBanner({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  return (
    <div>
      {frontpageData.frontpage.map((DesktopRow, key) => {
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
                articles: frontpageData.latestArticles.splice(0, 3),
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
            {frontpageData.listing.listings.length > 0 && (
              <ListingsRow
                Listings={frontpageData.listing.listings.splice(0, 3)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
