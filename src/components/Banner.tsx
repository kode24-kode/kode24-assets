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
import { getImageCacheUrl } from "../functions/getImageCacheUrl";
import { shuffleArray } from "../functions/shuffleArray";
import type { bannerAd } from "../types/index";

const Banner = ({
  ads,
  mobileToggle,
}: {
  ads: bannerAd[];
  mobileToggle?: boolean;
}) => {
  const ad = shuffleArray(ads)[0] as bannerAd;

  useEffect(() => {
    if (typeof plausible !== "undefined" && ad && ad?.title) {
      plausible("annonse_visning", {
        props: { annonse: ad.title },
      });
    }
  }, [ad]);
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // Prevent the default anchor behavior
    if (typeof plausible !== "undefined") {
      plausible("annonse_klikk", {
        props: { annonse: ad.title },
      });
    }
    // Navigate to the ad link after running the function
    window.location.href = ad.adlink.toString();
  };

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
