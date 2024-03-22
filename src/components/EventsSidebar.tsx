import { Event } from '../types';
export default function EventsSidebar({
  events,
}: {
  events: Array<Event>;
}) {
  return (
    <div className="row">
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
        <div className="listing">
          {events.map((event: Event, key: number) => {
            const date = new Date(event.startDate);
            return (
              <article
                className="preview calendar"
                itemScope
                itemProp="itemListElement"
                itemType="http://schema.org/ListItem"
                role="article"
                key={key}
              >
                <a itemProp="url" href={event.link}>
                  <div className="preview-calendar-date">
                    <div className="preview-calendar-date-day">
                      {date.getDate()}
                    </div>
                    <div className="preview-calendar-date-month">
                      {date.toLocaleString('en-US', {
                        month: 'short',
                      })}
                    </div>
                  </div>

                  <div className="call-to-action-container">
                    <figure>
                      <img
                        itemProp="image"
                        alt="logo"
                        src={event.photo}
                        loading="lazy"
                      />
                    </figure>
                    <div className="article-preview-text">
                      <div className="labels">
                        <span className="label">
                          {event.arrangedBy}
                        </span>
                      </div>
                      <h1 className="headline">{event.name}</h1>
                      <p className="standfirst">
                        ({event.digital ? 'Digitalt' : 'Fysisk'})
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
