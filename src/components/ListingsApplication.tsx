import { Listing } from '../types';
import { findDataInSpecialTags } from '../functions/findDataInSpecialTags';
import { getTimeAgo } from '../functions/getTimeAgo';
export default function ListingsApplication({
  listings,
}: {
  listings: Array<Listing>;
}) {
  return (
    <div className="row">
      <section className="listings-application-list-section">
        <div className="listings-application-list-header">
          <h2 className="highlight">Ledige stillinger</h2>
          <p>
            Vil du rykke inn en stilling? Gå til{' '}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScU7RouC4P8eCSWs7-0TfBv7GjQWWXsWol5FCY4YTsJ8LapyA/viewform?fbclid=IwAR0OLNR9eSxwxVFj1Btdux5umE_GPZB_gxHXK6KzXDMon3YGsubSfmGDydE">
              bestillingsskjemaet
            </a>{' '}
            eller&nbsp;
            <a href="https://www.kode24.no/annonse/priser-pa-annonser-og-content-pa-kode24/70244826">
              trykk her for priser og kontaktinformasjon
            </a>
            .
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScU7RouC4P8eCSWs7-0TfBv7GjQWWXsWol5FCY4YTsJ8LapyA/viewform?fbclid=IwAR0OLNR9eSxwxVFj1Btdux5umE_GPZB_gxHXK6KzXDMon3YGsubSfmGDydE"
            className="button"
          >
            Bestillingsskjema 💼
          </a>
        </div>
        <div className="listings-application-list">
          {listings.map((listing: Listing, key: number) => (
            <li className="listing-application-list-item" key={key}>
              <a
                target="_blank"
                rel="noreferrer"
                href={'https://kode24.no/' + listing.id}
              >
                <figure className="listing-application-list-figure">
                  <img
                    alt="company logo"
                    src={
                      `https://www.kode24.no/images/` +
                      listing.company.imageUrl
                    }
                  />
                </figure>
                <div className="listings-application-list-info">
                  <h2 className="listings-application-list-info-title">
                    {listing.title}
                  </h2>
                  <p className="listings-application-list-info-company-name">
                    {listing.company.name}
                  </p>
                  <div className="listings-application-list-info-details">
                    <div className="listings-application-list-info-location">
                      {findDataInSpecialTags(
                        listing.tags,
                        'jobbsted'
                      ).map((location: string) => (
                        <span>{location}</span>
                      ))}
                    </div>
                    <time
                      className="listings-application-list-info-time"
                      dateTime={listing.published}
                      title={listing.published}
                    >
                      📅 {getTimeAgo(listing.published)}
                    </time>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </div>
      </section>
    </div>
  );
}
