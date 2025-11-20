// For the ad type topbanner
/**
 * @component Banner
 * @example
 * return (
 * <Banner ads={} mobileToggle={true} />
 * )
 *
 */

import { useEffect } from "react";
import getIdsFromLocalstorage from "../functions/getIdsFromLocalstorage";
import { getImageCacheUrl } from "../functions/getImageCacheUrl";
//import { shuffleArray } from "../functions/shuffleArray";
import type { bannerAd } from "../types/index";
import VimeoPlayer from "./bannerVimeoPlayer";

const Banner = ({
  ads,
  mobileToggle,
  namespace = "banner",
}: {
  ads: bannerAd[];
  mobileToggle?: boolean;
  namespace?: string;
}) => {
  const ad = getIdsFromLocalstorage(ads, namespace, "adlink") as bannerAd;

  useEffect(() => {
    if (typeof plausible !== "undefined" && ad && ad?.title) {
      plausible("annonse_visning", {
        props: { annonse: ad?.title || "ukjent" },
      });
    }
  }, [ad]);
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // Prevent the default anchor behavior
    if (typeof plausible !== "undefined" && ad && ad?.title) {
      plausible("annonse_klikk", {
        props: { annonse: ad?.title },
      });
    }
    // Navigate to the ad link after running the function
    window.location.href = ad?.adlink.toString();
  };
  if (ad && ad.bannerVideoId)
    return (
      <div
        className={`banner-container ${mobileToggle ? "mobile" : "desktop"}`}
      >
        <div className={`banner-listing full-width`}>
          <VimeoPlayer id={ad.bannerVideoId} adLink={ad.adlink.toString()} />
          {ad.bannerAdText && (
            <div className="banner-information">
              <a href="https://www.detsombetyrnoe.no/">
                <div className="ad-text">
                  {ad.company && (
                    <div className="article-social">
                      <div className="byline-row">
                        <div className="byline-profile-image">
                          <img
                            src={getImageCacheUrl(ad.company.logo)}
                            loading="lazy"
                            alt={`byline name ${ad.company.name}`}
                          />
                        </div>
                        <div className="byline-info">
                          <div className="byline-name">{ad.company.name}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="banner-text">{ad.bannerAdText}</div>
                </div>
              </a>
              <div className="ad-action">
                <a href={ad.adlink.toString() || ""} className="button action">
                  {ad.bannerAdButtonText || "Finn ut mer"}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );

  if (ad) {
    return (
      <div
        className={`banner-container ${mobileToggle ? "mobile" : "desktop"}`}
      >
        <div className={`banner-listing`}>
          <a
            href={ad.adlink.toString()}
            className="top-bar-ad-content"
            target="_blank"
            onClick={handleClick}
          >
            <div
              className={`${
                mobileToggle ? "display-mobile" : "display-desktop"
              }`}
            >
              <img
                src={getImageCacheUrl(ad.banner.toString())}
                alt="background"
              />
            </div>
          </a>
        </div>
      </div>
    );
  }
};

export default Banner;
