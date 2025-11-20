import { useEffect, useRef } from "react";
import bind3DHover from "../functions/flip3d";
import getIdsFromLocalstorage from "../functions/getIdsFromLocalstorage";
import { getImageCacheUrl } from "../functions/getImageCacheUrl";
import type { ContentTile } from "../types";

export default function ContentTileItem({
  Contents,
  inlineToggle,
  perspective = false,
}: {
  Contents: ContentTile[];
  inlineToggle?: boolean;
  perspective?: boolean;
}) {
  const singleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (perspective && singleRef.current) {
      bind3DHover(singleRef.current);
    }
  }, [perspective]);

  const Content = getIdsFromLocalstorage(Contents, "content-tile", "banner");
  if (Content) {
    if (
      Content.adlink.includes("stillinger") &&
      !Content.adlink.includes("kodejobb")
    ) {
      Content.adlink = "https://www.kodejobb.no" + Content.adlink;
    }

    return (
      <div className={`row desktop-row commercial single-row`}>
        <div ref={singleRef} className="single">
          <article
            className={`preview columns large-12 small-12 medium-12 compact commercial-content ${
              inlineToggle ? "inline" : ""
            }`}
            itemScope
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
            data-label=""
          >
            <div className="article-content-wrapper">
              <a
                itemProp="url"
                href={Content.adlink}
                title={Content.title}
                aria-label={Content.title}
              >
                <figure className={`${Content.banner ? "photo" : "logo"}`}>
                  <img
                    className="photo"
                    itemProp="image"
                    loading="lazy"
                    alt={`image: ${Content.title}`}
                    src={getImageCacheUrl(
                      Content.banner ||
                        Content.company.logo.replace(
                          "w=100&fit=max",
                          "fm=webp&w=100"
                        )
                    )}
                  />
                </figure>
              </a>
              <div className="article-preview-text">
                <a
                  itemProp="url"
                  href={Content.adlink}
                  title={Content.title}
                  aria-label={Content.title}
                >
                  <p className="company-name">Annonsørinnhold</p>
                  <h1 className="headline">
                    <span className="headline-title-wrapper">
                      {Content.title}
                    </span>
                  </h1>
                </a>

                <div className="article-social">
                  <div className="byline-row">
                    <div className="byline-profile-image">
                      <img
                        src={getImageCacheUrl(Content.company.logo)}
                        loading="lazy"
                        alt={`byline name ${Content.company.name}`}
                      />
                    </div>
                    <div className="byline-info">
                      <div className="byline-name">{Content.company.name}</div>
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
}
