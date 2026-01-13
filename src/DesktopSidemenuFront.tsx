import CommentsTileSidebar from "./components/CommentsTileSidebar";

import EventsSidebar from "./components/EventsSidebar.tsx";
import ListingsSidebar from "./components/ListingsSidebar.tsx";
import { shuffleArray } from "./functions/shuffleArray.ts";
import type { Frontpage, Listing } from "./types/index.ts";
export default function DesktopSidemenuFront({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  const premiumJobAds = shuffleArray([
    ...frontpageData.jobs.filter(
      (listing: Listing) =>
        listing.type && (listing.type === "premium" || listing.type === "fokus")
    ),
  ]) as Listing[];

  return (
    <div>
      <ListingsSidebar
        title="Anbefalte stillinger"
        listings={premiumJobAds.slice(0, 5)}
      />
      <CommentsTileSidebar comments={frontpageData.newestComments} />
      <EventsSidebar events={frontpageData.events.upcomingEvents.slice(0, 5)} />
      <ListingsSidebar
        title="Ledige stillinger"
        listings={frontpageData.jobs}
      />
    </div>
  );
}
