import type { Listing } from "../types";
import ListingSidebar from "./ListingSidebar.tsx";
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
            href="https://www.hsmedia.no/stilling/kode24-stilling"
            className="button action"
          >
            Se priser
          </a>
        </div>
        <div className="listing">
          {listings.slice(0, 10).map((listing: Listing, key: number) => (
            <ListingSidebar Listing={listing} key={key} />
          ))}
        </div>
        <div className="listing-actions">
          <a
            href="https://www.kodejobb.no/stillinger"
            className="button"
            target="_blank"
            rel="noopener"
          >
            Vis alle
          </a>
        </div>
      </article>
    </div>
  );
}
