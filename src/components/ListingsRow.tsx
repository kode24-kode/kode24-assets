import { Listing } from '../types';
import ListingTile from './ListingTile.tsx';
export default function ListingsRow({
  Listings,
  listView,
}: {
  Listings: Array<Listing>;
  listView: boolean;
}) {
  return (
    <div
      className={`row desktop-row commercial ${
        listView ? 'list-view' : ''
      }`}
    >
      <div className={getLayoutForCommercialRow(Listings.length)}>
        {Listings.map((listing: Listing, key: number) => (
          <ListingTile Listing={listing} key={key} />
        ))}
      </div>
    </div>
  );
}

function getLayoutForCommercialRow(numberOfListings: number) {
  switch (numberOfListings) {
    case 1:
      return 'single';
    case 2:
      return 'dual';
    case 3:
      return 'triple';
    default:
      return 'triple';
  }
}
