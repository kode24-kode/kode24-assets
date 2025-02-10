// For the ad type topbanner

import type { bannerAd } from '../types/index';
import { shuffleArray } from '../functions/shuffleArray';
const TopBarAd = ({
  ads,
  mobileToggle,
}: {
  ads: bannerAd[];
  mobileToggle?: boolean;
}) => {
  const ad = shuffleArray(ads)[0] as bannerAd;
  return (
    <div className="banner-listing">
      <a
        href={ad.adlink.toString()}
        className="top-bar-ad-content"
        target="_blank"
      >
        <div
          className={`${
            mobileToggle ? 'top-bar-ad-mobile' : 'top-bar-ad-desktop'
          }`}
        >
          <img src={ad.banner.toString()} alt="background" />
        </div>
      </a>
    </div>
  );
};

export default TopBarAd;
