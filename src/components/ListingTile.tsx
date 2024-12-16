import { Listing } from '../types';
import { getImageCacheUrl } from '../functions/getImageCacheUrl';
export default function ListingTile({
  Listing,
  layout,
  size,
  style,
}: {
  Listing: Listing;
  layout: string;
  size: 'big' | 'small';
  style: string;
}) {
  return (
    <article
      id={`article_${Listing.id}`}
      className={`relative ${layout}`}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      role="article"
      data-id={Listing.id}
      data-label=""
    >
      <div className="article-content-wrapper">
        <a
          itemProp="url"
          href={'https://www.kodejobb.no' + Listing.published_url}
        >
          <figure
            className=""
            style={{
              backgroundColor:
                Listing.company?.logoBackgroundLight || 'white',
            }}
          >
            <img
              className="logo"
              itemProp="image"
              loading="lazy"
              alt={`image: ${Listing.title}`}
              src={getImageCacheUrl(
                Listing.company?.logoWithoutSize
                  ? Listing.company?.logoWithoutSize +
                      '?w=300&fit=max'
                  : Listing.company?.imageUrl.replace(
                      'w=100',
                      'w=300'
                    )
              )}
            />
          </figure>
        </a>
        <div className="article-preview-text">
          <a
            itemProp="url"
            href={'https://www.kodejobb.no' + Listing.published_url}
          >
            <p className="company-name">{Listing.company.name}</p>
            <h1
              className={`
                ${style === 'inverse' && ' text-slate-100'}
                ${!style && 'text-slate-700'}

              headline text-3xl`}
            >
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
