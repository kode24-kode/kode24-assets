import { Listing } from '../types';
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
        <a itemProp="url" href={Listing.published_url}>
          <figure className="">
            <img
              className=""
              itemProp="image"
              loading="lazy"
              alt={`image: ${Listing.title}`}
              src={`https://www.kode24.no/images/${Listing.image}.jpg?imageId=${Listing.image}&width=900&compression=80`}
            />
          </figure>
        </a>
        <div className="article-preview-text">
          <a itemProp="url" href={Listing.published_url}>
            <p className="company-name">Annonsørinnhold</p>
            <h1 className="headline">
              <span className="headline-title-wrapper">
                {Listing.title}
              </span>
            </h1>
          </a>

          <div className="article-social">
            <div className="byline-row">
              <div className="byline-profile-image">
                <img
                  src={`https://www.kode24.no/images/${Listing.company.imageUrl}`}
                  loading="lazy"
                  alt={`byline name ${Listing.company.name}`}
                />
              </div>
              <div className="byline-info">
                <div className="byline-name">
                  {Listing.company.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
