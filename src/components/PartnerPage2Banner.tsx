import { PortableText } from "@portabletext/react";
import { shuffleArray } from "../functions/shuffleArray";
import type { PartnerPage2 } from "../types/partnerpages2";
export const PartnerPage2Banner = ({
  partnerPages2,
}: {
  partnerPages2: PartnerPage2[];
}) => {
  const shuffledPartnerPages2 = shuffleArray(partnerPages2);
  const partnerpage2 = shuffledPartnerPages2[0] as PartnerPage2;
  if (!partnerpage2) {
    return null;
  }
  return (
    <div
      className={
        partnerpage2.slug +
        " partner-pages-2-banner row desktop-row card single-row full-width-container-constrained relative overflow-hidden"
      }
    >
      <div className="heading constrained partner-title">
        <div className="partner-title-wrapper">
          <div className="partner-logo"></div>
          <div className="partner-logo-wrapper">
            <img
              src={partnerpage2.company?.logo}
              alt={partnerpage2.company?.title}
            />
            <span>{partnerpage2.company?.title} er partner med kode24</span>
          </div>
          <h2 className="heading-title">
            <a
              href={
                partnerpage2.partnerSite +
                "?partnerpage=" +
                partnerpage2.slug +
                ""
              }
              target="_blank"
              rel="noopener"
            >
              {partnerpage2.title}
            </a>
          </h2>
          <div className="heading-ingress">
            <a
              href={
                partnerpage2.partnerSite +
                "?partnerpage=" +
                partnerpage2.slug +
                ""
              }
              target="_blank"
              rel="noopener"
            >
              <PortableText value={partnerpage2.heroIngress} />
            </a>
          </div>
          <a
            href={
              partnerpage2.partnerSite +
              "?partnerpage=" +
              partnerpage2.slug +
              ""
            }
            target="_blank"
            className="button"
            rel="noopener"
          >
            Finn ut mer
          </a>
        </div>
        <div className="partner-image-wrapper">
          <a
            href={
              partnerpage2.partnerSite +
              "?partnerpage=" +
              partnerpage2.slug +
              ""
            }
            target="_blank"
            rel="noopener"
          >
            <img
              src={partnerpage2.heroImage}
              alt={partnerpage2.company?.title}
            />
          </a>
        </div>
      </div>
      <div className="content constrained">
        {partnerpage2.modules?.map((module) => {
          if (
            module._type === "partnerArticleList" &&
            module.items &&
            module.items.length > 0
          ) {
            return (
              <div key={module._key} className="partner-content-module">
                <div className="partner-content-intro">
                  <h2>{module.title}</h2>
                  <div className="partner-articles-wrapper">
                    {module.items?.map((item) => (
                      <div key={item.link} className="partner-article">
                        <a
                          href={
                            item.link + "?partnerpage=" + partnerpage2.slug + ""
                          }
                          target="_blank"
                          rel="noopener"
                        >
                          <div className="partner-article-image-wrapper">
                            <img src={item.image} alt={item.title} />
                          </div>
                          <h3 className="partner-article-title">
                            {item.title}
                          </h3>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
          if (
            module._type === "partnerExternalJobAdList" &&
            module.items &&
            module.items.length > 0
          ) {
            return (
              <div
                key={module._key}
                className="partner-content-module partner-job-module"
              >
                <div className="partner-content-intro">
                  <h2>{module.title}</h2>
                  <div className="partner-articles-wrapper">
                    {module.items?.map((item) => (
                      <div key={item.link} className="partner-article">
                        <a href={item.link} target="_blank" rel="noopener">
                          <div className="partner-article-image-wrapper">
                            <img
                              src={partnerpage2.company?.logo}
                              alt={item.title}
                            />
                          </div>
                          <h3 className="partner-article-title">
                            {item.title}
                          </h3>
                          <p>{item.salesTitle}</p>
                          <div className="partner-article-location">
                            {item.jobLocationCity?.map((loc) => (
                              <span
                                key={loc.jobLocationCity}
                                className="location"
                              >
                                {loc.jobLocationCity}
                              </span>
                            ))}
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

/**
<div key={index} className="partner-content-module">
        <div className="partner-content-intro">
          <PortableText value={partnerpage2.} />
        </div>

      </div>
**/
