import { Frontpage, Listing } from './types/index.ts';
import EventsSidebar from './components/EventsSidebar.tsx';
import ListingsSidebar from './components/ListingsSidebar.tsx';
import { shuffleArray } from './functions/shuffleArray.ts';
export default function DesktopSidemenuFront({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  const premiumJobAds = shuffleArray([
    ...frontpageData.jobs.filter(
      (listing: Listing) =>
        listing.type &&
        (listing.type === 'premium' || listing.type === 'fokus')
    ),
  ]) as Listing[];

  return (
    <div>
      <ListingsSidebar
        title="Utvalgte stillinger"
        listings={premiumJobAds.slice(0, 5)}
      />
      <EventsSidebar
        events={frontpageData.events.upcomingEvents.slice(0, 5)}
      />
      <ListingsSidebar
        title="Ledige stillinger"
        listings={frontpageData.jobs}
      />
    </div>
  );
}
