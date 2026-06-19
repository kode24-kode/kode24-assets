import { useEffect, useRef } from "react";
import type { partnerAd, partnerAds } from "../types";
import "react-multi-carousel/lib/styles.css";
import bind3DHover from "../functions/flip3d";
import getIdsFromLocalstorage from "../functions/getIdsFromLocalstorage";
import { getImageCacheUrl } from "../functions/getImageCacheUrl";
export default function PartnerAdTile({
  partnerAds,
  perspective = false,
}: {
  partnerAds: [partnerAds];
  perspective?: boolean;
}) {
  const singleRef = useRef<HTMLDivElement | null>(null);

  const partner = getIdsFromLocalstorage(
    partnerAds,
    "partner-ad",
    "slug",
  ) as partnerAds;

  const partnerAd = getIdsFromLocalstorage(
    partner.ads,
    "partner-ad-banner",
    "banner",
  ) as partnerAd;

  useEffect(() => {
    if (perspective && singleRef.current) {
      bind3DHover(singleRef.current);
    }
  }, [perspective]);

  if (!partnerAd) {
    return null;
  }

  if (partnerAd)
    return (
      <div id="" className="row desktop-row commercial single-row">
        <div ref={singleRef} className="single">
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
                href={`https://partner.kode24.no/${partner.slug}?id=${partnerAd.uniqueValue}`}
                title={partnerAd.title}
                aria-label={partnerAd.title}
              >
                <figure className={`photo`}>
                  <img
                    className="photo"
                    itemProp="image"
                    loading="lazy"
                    alt={`image: ${partnerAd.title}`}
                    src={getImageCacheUrl(partnerAd.banner)}
                  />
                </figure>
              </a>
              <div className="article-preview-text">
                <a
                  itemProp="url"
                  href={`https://partner.kode24.no/${partner.slug}?id=${partnerAd.uniqueValue}`}
                  title={partnerAd.title}
                  aria-label={partnerAd.title}
                >
                  <p className="company-name">Annonsørinnhold</p>
                  <h1 className="headline">
                    <span className="headline-title-wrapper">
                      {partnerAd.title}
                    </span>
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
        </div>
      </div>
    );
}
