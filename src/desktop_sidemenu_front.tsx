import { Frontpage, Listing } from './types/index.ts';
import ArticlesRow from './components/ArticlesRow.tsx';
import EventsSidebar from './components/EventsSidebar.tsx';
import ListingsSidebar from './components/ListingsSidebar.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
export default function DesktopSidemenuFront({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  const premiumJobAds = shuffleArray([
    ...frontpageData.listing.listings.filter((listing: Listing) =>
      frontpageData.listing.premiumIds.includes(listing.id)
    ),
  ]) as Listing[];
  return (
    <div>
      <ListingsSidebar
        title="Utvalgte stillinger"
        listings={premiumJobAds}
      />
      <EventsSidebar
        events={frontpageData.events.upcomingEvents.slice(0, 5)}
      />
      <ListingsSidebar
        title="Ledige stillinger"
        listings={frontpageData.listing.listings}
      />
    </div>
  );
}
