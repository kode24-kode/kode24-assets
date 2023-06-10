import { Listing } from '../types';
import ListingSidebar from './ListingSidebar.tsx';
export default function PremiumListingsSidebar({
  listings,
  title,
}: {
  listings: Array<Listing>;
  title: string;
}) {
  return (
    <div className="row">
      <article className="preview preview-list job-list">
        <div className="preview-list-header">
          <h2 className="highlight">{title}</h2>
          <a
            href="https://www.kode24.no/annonse/priser-pa-annonser-og-content-pa-kode24/70244826"
            className="button action"
          >
            Se priser
          </a>
        </div>
        <div className="listing">
          {listings.map((listing: Listing, key: number) => (
            <ListingSidebar Listing={listing} key={key} />
          ))}
        </div>
        <div className="listing-actions">
          <a href="/jobb" className="button">
            Vis alle
          </a>
        </div>
      </article>
    </div>
  );
}
