import { Listing } from '../types';
import { getImageCacheUrl } from '../functions/getImageCacheUrl';
export default function ListingTile({
  Listing,
}: {
  Listing: Listing;
}) {
  return (
    <article
      id={`article_${Listing.id}`}
      className={`preview columns large-12 small-12 medium-12 compact commercial-content`}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      role="article"
      data-id={Listing.id}
      data-label=""
    >
      <div className="article-content-wrapper">
        <a itemProp="url" href={"https://www.kodejobb.no" + Listing.published_url}>
          <figure
            className=""
            style={{
              backgroundColor:
                Listing.company?.logoBackgroundLight || 'white',
            }}
          >
            <img
              className=""
              itemProp="image"
              loading="lazy"
              alt={`image: ${Listing.title}`}
              src={
                Listing.company?.logoReal &&
                Listing.company?.logoReal.includes('.svg')
                  ? Listing.company?.logoReal
                  : getImageCacheUrl(
                      Listing.company?.logoReal ||
                        Listing.company?.imageUrl
                    )
              }
            />
          </figure>
        </a>
        <div className="article-preview-text">
          <a itemProp="url" href={"https://www.kodejobb.no" + Listing.published_url}>
            <p className="company-name">{Listing.company.name}</p>
            <h1 className="headline">
              <span className="headline-title-wrapper">
                {Listing.title}
              </span>
            </h1>
          </a>
        </div>
      </div>
    </article>
  );
}
