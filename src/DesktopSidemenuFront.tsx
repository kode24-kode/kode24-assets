import { useMemo, useState } from "react";
import CommentsTileSidebar from "./components/CommentsTileSidebar";

import EventsSidebar from "./components/EventsSidebar.tsx";
import ListingsSidebar from "./components/ListingsSidebar.tsx";
import { shuffleArray } from "./functions/shuffleArray.ts";
import type { Frontpage, Listing } from "./types/index.ts";
const partnerLogosRow = (rows: HTMLElement[]) =>
  rows.find((row) => row.querySelector(".logo-list"));
const rowAfterPartnerLogos = (rows: HTMLElement[]) => {
  const partnerRow = partnerLogosRow(rows);
  return partnerRow ? rows[rows.indexOf(partnerRow) + 1] : undefined;
};

export default function DesktopSidemenuFront({
  frontpageData,
}: {
  frontpageData: Frontpage;
}) {
  // the calendar sits below the comments, so it measures after they have settled
  const [commentsMeasured, setCommentsMeasured] = useState(0);
  const [eventsMeasured, setEventsMeasured] = useState(0);
  // memoized so the list isn't shuffled again when the calendar re-measures
  const premiumJobAds = useMemo(
    () =>
      shuffleArray([
        ...frontpageData.jobs.filter(
          (listing: Listing) =>
            listing.type &&
            (listing.type === "premium" || listing.type === "fokus")
        ),
      ]) as Listing[],
    [frontpageData.jobs]
  );

  return (
    <div>
      <ListingsSidebar
        title="Anbefalte stillinger"
        listings={premiumJobAds.slice(0, 5)}
      />
      <CommentsTileSidebar
        comments={frontpageData.newestComments}
        onMeasured={() => setCommentsMeasured((count) => count + 1)}
      />
      <EventsSidebar
        events={frontpageData.events.upcomingEvents}
        remeasureKey={commentsMeasured}
        onMeasured={() => setEventsMeasured((count) => count + 1)}
      />
      <ListingsSidebar
        title="Ledige stillinger"
        listings={frontpageData.jobs}
        // below the partner logos and above the next full width row
        fitBetween={{ start: partnerLogosRow, end: rowAfterPartnerLogos }}
        remeasureKey={eventsMeasured}
      />
    </div>
  );
}
