import type { bannerAd } from '../types/index';
import { shuffleArray } from '../functions/shuffleArray';
const TopBarAd = ({ ads }: { ads: bannerAd[] }) => {
  const ad = shuffleArray(ads)[0] as bannerAd;
  return (
    <a
      href={ad.adlink.toString()}
      className="top-bar-ad-content"
      target="_blank"
    >
      <div className="top-bar-ad-desktop">
        <img src={ad.banner.toString()} alt="background" />
      </div>
    </a>
  );
};

export default TopBarAd;
