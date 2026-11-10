import { GrCalendar } from "react-icons/gr";
import getIdsFromLocalstorage from "../functions/getIdsFromLocalstorage";
import { getImageCacheUrl } from "../functions/getImageCacheUrl";
import type { Listing } from "../types";
import TimePostedAgo from "./TimePostedAgo";

/**
 * Full width job ad for premium plus. Looks like the content ads, but shows
 * the company logo and deadline like a job listing. Uses the header image if
 * the job has one, otherwise the company logo.
 */
export default function JobContentTile({ Jobs }: { Jobs: Listing[] }) {
  const Job = getIdsFromLocalstorage(Jobs, "job-content-tile", "id");
  if (!Job) return null;

  const url = "https://www.kodejobb.no" + Job.published_url;
  // big headline is the short title from the customer, the actual title goes below
  const headline = Job.applicationTitle || Job.title;
  const subtitle = Job.title !== headline ? Job.title : "";
  const logo = getImageCacheUrl(
    Job.company.logoWithoutSize
      ? Job.company.logoWithoutSize + "?w=300&fit=max"
      : Job.company.imageUrl.replace("w=100", "w=300"),
  );

  return (
    <div className="row desktop-row commercial single-row">
      <div className="single job-content-single">
        <article
          className="preview columns large-12 small-12 medium-12 compact commercial-content job-content-tile"
          itemScope
          itemType="https://schema.org/ListItem"
          itemProp="itemListElement"
          data-label=""
        >
          <div className="article-content-wrapper">
            <a
              itemProp="url"
              href={url}
              title={Job.title}
              aria-label={Job.title}
            >
              <figure
                className={Job.headerImage ? "photo" : "logo"}
                style={
                  Job.headerImage
                    ? undefined
                    : {
                        backgroundColor:
                          Job.company?.logoBackgroundLight || "white",
                      }
                }
              >
                <div className="listing-badges">
                  <div className="listing-badge pink">Anbefalt</div>
                </div>
                <img
                  className="photo"
                  itemProp="image"
                  loading="lazy"
                  alt={`image: ${Job.title}`}
                  src={Job.headerImage ? getImageCacheUrl(Job.headerImage) : logo}
                />
              </figure>
            </a>
            <div className="article-preview-text">
              <a
                itemProp="url"
                href={url}
                title={Job.title}
                aria-label={Job.title}
              >
                <p className="company-name">Stilling</p>
                <h1 className="headline">
                  <span className="headline-title-wrapper">{headline}</span>
                </h1>
                {subtitle && <p className="job-content-subtitle">{subtitle}</p>}
              </a>
              <div className="article-social">
                <div className="byline-row">
                  <div className="byline-profile-image">
                    <img
                      src={getImageCacheUrl(Job.company.imageUrl)}
                      loading="lazy"
                      alt={`byline name ${Job.company.name}`}
                    />
                  </div>
                  <div className="byline-info">
                    <div className="byline-name">{Job.company.name}</div>
                  </div>
                </div>
                <div className="listing-hide-from">
                  {Job.hideFrom && (
                    <span className="listing-deadline">
                      <GrCalendar /> Frist:{" "}
                      <TimePostedAgo dateString={Job.hideFrom} />
                    </span>
                  )}
                  <a className="listing-apply-button" href={url}>
                    Søk her
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
