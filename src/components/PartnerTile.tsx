import { CompanyPartner } from '../types';
import { getImageCacheUrl } from '../functions/getImageCacheUrl';

type PartnerAd = { title: string; url: string; image: string };

export default function PartnerTileItem({
  partner,
  ad,
}: {
  partner: CompanyPartner['company'];
  ad: PartnerAd;
}) {
  return (
    <article
      className={`preview columns large-12 small-12 medium-12 compact commercial-content partner-tile-wide`}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      role="article"
      data-label=""
    >
      <div className="article-content-wrapper">
        <a
          itemProp="url"
          href={ad.url}
          title={ad.title}
          aria-label={ad.title}
        >
          <figure className={`photo`}>
            <img
              className="photo"
              itemProp="image"
              loading="lazy"
              alt={`image: ${ad.title}`}
              src={ad.image}
            />
          </figure>
        </a>
        <div className="article-preview-text">
          <a itemProp="url" href={ad.url}>
            <p className="company-name">Annonsørinnhold</p>
            <h1 className="headline">
              <span className="headline-title-wrapper">
                {ad.title}
              </span>
            </h1>
          </a>

          <div className="article-social">
            <div className="byline-row">
              <div className="byline-profile-image">
                <img
                  src={getImageCacheUrl(partner.logo)}
                  loading="lazy"
                  alt={`byline name ${partner.title}`}
                />
              </div>
              <div className="byline-info">
                <div className="byline-name">{partner.title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
