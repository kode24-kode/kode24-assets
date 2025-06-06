import { Listing } from '../types';
import { getImageCacheUrl } from '../functions/getImageCacheUrl';
export default function ListingSidebar({
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
      <a
        itemProp="url"
        href={'https://www.kodejobb.no' + Listing.published_url}
      >
        <figure className="">
          <img
            src={getImageCacheUrl(`${Listing.company.imageUrl}`)}
            loading="lazy"
            alt={`byline name ${Listing.company.name}`}
          />
        </figure>
        <div className="call-to-action-container">
          <div className="article-preview-text">
            <div className="labels">
              <span className="label">{Listing.company.name}</span>
            </div>
            <h1 className="headline">
              {Listing.applicationTitle || Listing.title}
            </h1>
          </div>
        </div>
      </a>
    </article>
  );
}
