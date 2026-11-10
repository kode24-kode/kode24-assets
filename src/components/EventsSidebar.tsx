import { useRef } from "react";
import useFitCount from "../functions/useFitCount";
import type { Event } from "../types";

// used when there is no second full width row to measure against
const FALLBACK_COUNT = 5;

/**
 * Lists as many events as fit between the first and the second full width row
 * in the main column, since the comments above fill the space down to the first.
 */
export default function EventsSidebar({
  events,
  remeasureKey,
  onMeasured,
}: {
  events: Array<Event>;
  // called when the calendar has its final height, so content below can measure
  onMeasured?: () => void;
  // changes when the comments above have been measured, since they move the calendar
  remeasureKey?: number;
}) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useFitCount({
    listRef,
    containerRef,
    // the calendar starts below the first full width row and ends above the second
    startBoundary: 0,
    boundary: 1,
    remeasureKey,
    fallback: FALLBACK_COUNT,
    itemCount: events.length,
    onMeasured,
  });

  return (
    <div className="row" ref={containerRef}>
      <article className="preview preview-list job-list">
        <div className="preview-list-header">
          <h2 className="highlight">Bransjekalender</h2>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeIpFCZRLdecwbZjLKZ_CSIqs7deA5vU4zHJJTPEa1wUbHo7A/viewform"
            className="button action"
          >
            Opprett ny
          </a>
        </div>
        <div className="listing" ref={listRef}>
          {events.map((event: Event) => {
            const date = new Date(event.startDate);

            return (
              <article
                className="preview calendar"
                itemScope
                itemProp="itemListElement"
                itemType="http://schema.org/ListItem"
                key={event.link}
              >
                <a itemProp="url" href={event.link}>
                  <div className="preview-calendar-date">
                    <div className="preview-calendar-date-day">
                      {date.getDate()}
                    </div>
                    <div className="preview-calendar-date-month">
                      {date.toLocaleString("en-US", {
                        month: "short",
                      })}
                    </div>
                  </div>

                  <div className="call-to-action-container">
                    <div className="article-preview-text">
                      <div className="labels">
                        <span className="label">{event.arrangedBy}</span>
                      </div>
                      <h1 className="headline">{event.name}</h1>
                      <p className="standfirst">
                        ({event.digital ? "Digitalt" : "Fysisk"})
                      </p>
                    </div>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
        <div className="listing-actions">
          <a href="/kalender" className="button">
            Vis alle
          </a>
        </div>
      </article>
    </div>
  );
}
