import type { Listing } from "../types";
import ListingTile from "./ListingTile.tsx";
export default function ListingsRow({
  Listings,
  listView,
  customHeading,
}: {
  Listings: Array<Listing>;
  listView: boolean;
  customHeading?: string;
}) {
  return (
    <div
      className={`row desktop-row commercial ${listView ? "list-view" : ""}`}
    >
      <div className="heading ">
        <h2 className="heading-title">
          {customHeading || "Ledige stillinger"}
        </h2>
        <a
          href="https://www.kodejobb.no"
          target="_blank"
          className="button"
          rel="noopener"
        >
          Se alle
        </a>
      </div>
      <div className="triple">
        {Listings.map((listing: Listing) => (
          <ListingTile Listing={listing} key={listing.id} />
        ))}
      </div>
    </div>
  );
}

function getLayoutForCommercialRow(numberOfListings: number) {
  switch (numberOfListings) {
    case 1:
      return "single";
    case 2:
      return "dual";
    case 3:
      return "triple";
    default:
      return "triple";
  }
}
