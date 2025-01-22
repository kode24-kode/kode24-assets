import { partnerAds } from '../types';
import { shuffleArray } from '../functions/shuffleArray';
import 'react-multi-carousel/lib/styles.css';
import PartnerTile from './PartnerTile';

export default function PartnerAdTile({
  partnerAds,
}: {
  partnerAds: [partnerAds];
}) {
  const partner = shuffleArray(partnerAds)[0] as partnerAds;

  return (
    <div id="" className="row desktop-row">
      <div className="single">
        <PartnerTile partner={partner} />
      </div>
    </div>
  );
}
