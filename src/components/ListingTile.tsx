import { GrCalendar } from "react-icons/gr";
import { getImageCacheUrl } from "../functions/getImageCacheUrl";
import type { Listing } from "../types";
import TimePostedAgo from "./TimePostedAgo";
export default function ListingTile({ Listing }: { Listing: Listing }) {
  const isFresh =
    new Date(Listing.published).getTime() > new Date().getTime() - 604800000;
  return (
    <article
      id={`article_${Listing.id}`}
      className={`preview columns large-12 small-12 medium-12 compact listing commercial-content ${
        Listing.type === "premium" ? "premium" : ""
      }`}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      data-id={Listing.id}
      data-label=""
    >
      <div className="article-content-wrapper">
        <a
          itemProp="url"
          href={"https://www.kodejobb.no" + Listing.published_url}
        >
          <figure
            className=""
            style={{
              backgroundColor: Listing.company?.logoBackgroundLight || "white",
            }}
          >
            <div className="listing-badges">
              {Listing.type === "premium" && (
                <div className="listing-badge pink">Anbefalt</div>
              )}
              {isFresh && <div className="listing-badge">Ny</div>}
            </div>
            <img
              className="logo"
              itemProp="image"
              loading="lazy"
              alt={`image: ${Listing.title}`}
              src={getImageCacheUrl(
                Listing.company?.logoWithoutSize
                  ? Listing.company?.logoWithoutSize + "?w=300&fit=max"
                  : Listing.company?.imageUrl.replace("w=100", "w=300")
              )}
            />
          </figure>
        </a>
        <div className="article-preview-text">
          <a
            itemProp="url"
            href={"https://www.kodejobb.no" + Listing.published_url}
          >
            <div>
              <h1 className="headline">
                <span className="headline-title-wrapper">
                  {Listing.applicationTitle}
                </span>
              </h1>
              <p className="company-name">{Listing.company.name}</p>
              <p>{Listing.title}</p>
            </div>
            {Listing.hideFrom && (
              <div className="listing-hide-from">
                <GrCalendar /> Frist:{" "}
                <TimePostedAgo dateString={Listing.hideFrom} />
              </div>
            )}
          </a>
        </div>
      </div>
    </article>
  );
}
