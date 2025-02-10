// For the ad type topbanner
/**
 * @component Banner
 * @example
 * return (
 * <Banner ads={} mobileToggle={true} />
 * )
 *
 */
import type { bannerAd } from '../types/index';
import { shuffleArray } from '../functions/shuffleArray';
import { useEffect } from 'react';
const Banner = ({
  ads,
  mobileToggle,
}: {
  ads: bannerAd[];
  mobileToggle?: boolean;
}) => {
  const ad = shuffleArray(ads)[0] as bannerAd;
  useEffect(() => {
    plausible('annonse_visning', {
      props: { annonse: ad.title },
    });
  }, [ad]);
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault(); // Prevent the default anchor behavior
    plausible('annonse_klikk', {
      props: { annonse: ad.title },
    });
    // Navigate to the ad link after running the function
    window.location.href = ad.adlink.toString();
  };
  return (
    <div
      className={`banner-listing ${
        mobileToggle ? 'mobile' : 'desktop'
      }`}
    >
      <a
        href={ad.adlink.toString()}
        className="top-bar-ad-content"
        target="_blank"
        onClick={handleClick}
      >
        <div
          className={`${
            mobileToggle ? 'display-mobile' : 'display-desktop'
          }`}
        >
          <img src={ad.banner.toString()} alt="background" />
        </div>
      </a>
    </div>
  );
};

export default Banner;
