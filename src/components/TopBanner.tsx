/**
 * @module TopBanner
 * @category Components
 * @description TopBanner component renders a banner at the top of kode24 at either 1920x300 or 320x250
 * @component TopBanner
 * @example
 * return (
 *  <TopBanner />
 * )
 * @param {string} props - props description
 * @return {JSX.Element} - React component
 * @exports page
 * @exports TopBanner
 * @exports default
 *
 */

import type { bannerAd } from '../types/index';
import { shuffleArray } from '../functions/shuffleArray';
import { useEffect } from 'react';
const TopBarAd = ({
  ads,
  mobileToggle,
}: {
  ads: bannerAd[];
  mobileToggle?: boolean;
}) => {
  const ad = shuffleArray(ads)[0] as bannerAd;
  useEffect(() => {
    if (typeof plausible !== 'undefined') {
      plausible('annonse_visning', {
        props: { annonse: ad.title },
      });
    }
  }, [ad]);
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // Prevent the default anchor behavior
    if (typeof plausible !== 'undefined') {
      plausible('annonse_klikk', {
        props: { annonse: ad.title },
      });
    }
    // Navigate to the ad link after running the function
    window.location.href = ad.adlink.toString();
  };
  return (
    <div
      className={`banner-container ${
        mobileToggle ? 'mobile' : 'desktop'
      }`}
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
              mobileToggle
                ? 'top-bar-ad-mobile'
                : 'top-bar-ad-desktop'
            }`}
          >
            <img src={ad.banner.toString()} alt="background" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default TopBarAd;
