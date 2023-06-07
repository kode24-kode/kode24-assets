import { Listing } from '../types';
import ListingTile from './ListingTile.tsx';
export default function ListingsRow({
  Listings,
}: {
  Listings: Array<Listing>;
}) {
  return (
    <div className={`row desktop-row commercial`}>
      <div className="heading">
        <h2 className="heading-title">Annonsørinnhold</h2>
      </div>
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
