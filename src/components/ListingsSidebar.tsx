import { useRef } from "react";
import useFitCount, { type RowPicker } from "../functions/useFitCount";
import type { Listing } from "../types";
import ListingSidebar from "./ListingSidebar.tsx";
// used when the rows to measure against are missing
const FALLBACK_COUNT = 10;

export default function PremiumListingsSidebar({
  listings,
  title,
  fitBetween,
  remeasureKey,
}: {
  listings: Array<Listing>;
  title: string;
  /**
   * Lists as many as fit between two full width rows: the card starts below
   * `start` and ends above `end`. Without it the first 10 are listed.
   */
  fitBetween?: { start: RowPicker; end: RowPicker };
  // changes when content above has been measured, since it moves this card
  remeasureKey?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  useFitCount({
    listRef,
    containerRef,
    boundary: fitBetween?.end ?? 0,
    startBoundary: fitBetween?.start,
    fallback: FALLBACK_COUNT,
    itemCount: listings.length,
    enabled: !!fitBetween,
    remeasureKey,
  });

  return (
    <div className="row" ref={containerRef}>
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
        <div className="listing" ref={listRef}>
          {(fitBetween ? listings : listings.slice(0, 10)).map((listing: Listing, key: number) => (
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
