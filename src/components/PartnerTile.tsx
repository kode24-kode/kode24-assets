import { getImageCacheUrl } from "../functions/getImageCacheUrl";
import { shuffleArray } from "../functions/shuffleArray";
import type { partnerAd, partnerAds } from "../types";

export default function PartnerTileItem({ partner }: { partner: partnerAds }) {
  if (partner.ads && partner.ads.length > 0) {
    //const ad = getIdsFromLocalstorage(partner.ads, "partner-ad", "slug");
    const ad = shuffleArray(partner.ads)[0] as partnerAd;
    return (
      <article
        className={`preview columns large-12 small-12 medium-12 compact commercial-content partner-tile-wide`}
        itemScope
        itemType="https://schema.org/ListItem"
        itemProp="itemListElement"
        data-label=""
      >
        <div className="article-content-wrapper">
          <a
            itemProp="url"
            href={`https://partner.kode24.no/${partner.slug}?id=${ad.uniqueValue}`}
            title={ad.title}
            aria-label={ad.title}
          >
            <figure className={`photo`}>
              <img
                className="photo"
                itemProp="image"
                loading="lazy"
                alt={`image: ${ad.title}`}
                src={getImageCacheUrl(ad.banner)}
              />
            </figure>
          </a>
          <div className="article-preview-text">
            <a
              itemProp="url"
              href={`https://partner.kode24.no/${partner.slug}?id=${ad.uniqueValue}`}
              title={ad.title}
              aria-label={ad.title}
            >
              <p className="company-name">Annonsørinnhold</p>
              <h1 className="headline">
                <span className="headline-title-wrapper">{ad.title}</span>
              </h1>
            </a>

            <div className="article-social">
              <div className="byline-row">
                <div className="byline-profile-image">
                  <img
                    src={getImageCacheUrl(partner.company.logo)}
                    loading="lazy"
                    alt={`byline name ${partner.company.title}`}
                  />
                </div>
                <div className="byline-info">
                  <div className="byline-name">{partner.company.title}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  } else {
    return <></>;
  }
}
