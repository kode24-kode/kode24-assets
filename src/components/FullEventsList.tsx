import { Event } from '../types';
export default function FullEventsList({
  events,
}: {
  events: Array<Event>;
}) {
  return (
    <div className="row">
      <section className="events-list-section">
        <div className="events-list-header">
          <h2 className="highlight">Bransjekalender</h2>
          <p>
            Det er gratis å legge inn arrangement i kalenderen vår,
            bare fyll inn skjemaet under her.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeIpFCZRLdecwbZjLKZ_CSIqs7deA5vU4zHJJTPEa1wUbHo7A/viewform"
            className="button"
          >
            Kalenderskjema 📅
          </a>
        </div>
        <div className="events-list">
          {events.map((event: Event, key: number) => {
            const date = new Date(event.startDate);
            return (
              <article
                className="calendar"
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
      </section>
    </div>
  );
}
