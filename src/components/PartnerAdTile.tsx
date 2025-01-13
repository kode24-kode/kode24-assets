import { CompanyPartner } from '../types';
import { shuffleArray } from '../functions/shuffleArray';
import { getImageCacheUrl } from '../functions/getImageCacheUrl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PartnerTile from './PartnerTile';

type Partner = {
  partner: CompanyPartner;
  ads: Array<{ title: string; url: string; image: string }>;
};

type ad = { title: string; url: string; image: string };

const companyAds: Array<Partner> = [
  {
    partner: {
      title: 'Utvikling er vår lidenskap - er det din også?',
      banner:
        'https://cdn.sanity.io/images/2i41qvsb/production/ab4079d3c74187bc4188137db301cdcd33000ed0-1800x600.png?w=976&fit=max',
      company: {
        logo: 'https://cdn.sanity.io/images/2i41qvsb/production/4f9d0f5581bde67c1bdf3738cd582ced894a20dd-140x140.jpg?w=100&fit=max',
        title: 'Capgemini Norge AS',
      },
      slug: 'capgemini',
      darkLogo:
        'https://cdn.sanity.io/images/2i41qvsb/production/185a60eef25e713da075f37bcfb40ce35c1ffc6d-1308x291.png?w=100&fit=max',
      lightLogo:
        'https://cdn.sanity.io/images/2i41qvsb/production/a4716c65410edd4580b356191dc2a2a06c83becc-1024x239.png?w=100&fit=max',
      tooltip: 'Utvikling er vår lidenskap - er det din også?',
    },
    ads: [
      {
        title:
          'På jakt etter jobb i Fredrikstad, Sandefjord, Kristiansand, Stavanger, Bergen, Oslo, Trondheim eller Lillehammer?',
        url: 'https://partner.kode24.no/capgemini?id=1',
        image:
          'https://www.dagbladet.no/files/2025/01/13/kode24-capgemini-1.png',
      },
      {
        title:
          'Vi bygger et lite konsulenthus i det store konsulenthuset, nysgjerrig?',
        url: 'https://partner.kode24.no/capgemini?id=2',
        image:
          'https://www.dagbladet.no/files/2025/01/13/kode24-capgemini-2.png',
      },
      {
        title:
          'Vi bygger et lite konsulenthus i det store konsulenthuset, nysgjerrig?',
        url: 'https://partner.kode24.no/capgemini?id=3',
        image:
          'https://www.dagbladet.no/files/2025/01/13/kode24-capgemini-8.jpg',
      },
    ],
  },
  {
    partner: {
      title: 'Jobb som utvikler i PwC',
      banner:
        'https://cdn.sanity.io/images/2i41qvsb/production/e07a94cc49bc5a58ef941541d78f7be210e01839-1800x600.png?w=976&fit=max',
      company: {
        logo: 'https://cdn.sanity.io/images/2i41qvsb/production/885fb8ce768874823914a2254c6ceaf7e0ccebe7-800x800.jpg?w=100&fit=max',
        title: 'PwC',
      },
      slug: 'pwc',
      darkLogo:
        'https://cdn.sanity.io/images/2i41qvsb/production/52d5cd97a39a510b88b23cf55060506889ed8e90-131x99.png?w=100&fit=max',
      lightLogo:
        'https://cdn.sanity.io/images/2i41qvsb/production/54060871b1edb6d1b2788314ea699ef03d0cd7f0-131x99.png?w=100&fit=max',
      tooltip: 'Konsulent eller inhouse? Du velger!',
    },
    ads: [
      {
        title:
          'Vi er kåret til en av verdens mest ettertraktede arbeidsgivere!',
        url: 'https://partner.kode24.no/pwc?id=1',
        image:
          'https://www.dagbladet.no/files/2025/01/13/kode24-pwc-2.png',
      },
      {
        title: 'Hva har en etisk hacker i ryggsekken?',
        url: 'https://partner.kode24.no/pwc?id=2',
        image:
          'https://www.dagbladet.no/files/2025/01/13/kode24-pwc-1.png',
      },
      {
        title: 'Konsulent eller inhouse? Du velger!',
        url: 'https://partner.kode24.no/pwc?id=3',
        image:
          'https://www.dagbladet.no/files/2025/01/13/kode24-pwc-3.png',
      },
    ],
  },
  {
    partner: {
      title: 'Bli med på å gjøre Norge enklere å bruke?',
      banner:
        'https://cdn.sanity.io/images/2i41qvsb/production/da004ca51b62c4f181787194fadb3a21809a6c71-1972x658.png?w=976&fit=max',
      company: {
        logo: 'https://cdn.sanity.io/images/2i41qvsb/production/65c8b043f108870863ea218277f748cfd2505142-300x300.png?w=100&fit=max',
        title: 'Skatteetaten',
      },
      slug: 'skatteetaten',
      darkLogo:
        'https://cdn.sanity.io/images/2i41qvsb/production/d762e7076802428f247a183a86acc2d08b6d94cb-380x99.png?w=100&fit=max',
      lightLogo:
        'https://cdn.sanity.io/images/2i41qvsb/production/4ce55208a7732aebc2985f1720d1248f39f10c4e-380x99.png?w=100&fit=max',
      tooltip: 'Bli med på å gjøre Norge enklere å bruke',
    },
    ads: [
      {
        title:
          'Vi er kåret til en av verdens mest ettertraktede arbeidsgivere!',
        url: 'https://partner.kode24.no/skatteetaten?id=1',
        image:
          'https://www.dagbladet.no/files/2025/01/13/kode24-skatteetaten-8.png',
      },
      {
        title: 'Hva har en etisk hacker i ryggsekken?',
        url: 'https://partner.kode24.no/skatteetaten?id=2',
        image:
          'https://www.dagbladet.no/files/2025/01/13/kode24-skatteetaten-2.png',
      },
      {
        title: 'Konsulent eller inhouse? Du velger!',
        url: 'https://partner.kode24.no/skatteetaten?id=3',
        image:
          'https://www.dagbladet.no/files/2025/01/13/kode24-skatteteaten-3.png',
      },
    ],
  },
];

export default function PartnerAdTile() {
  const partner = shuffleArray(companyAds)[0] as Partner;
  const ad = shuffleArray(partner.ads)[0] as ad;
  return (
    <div id="" className="row desktop-row">
      <div className="single">
        <PartnerTile partner={partner.partner.company} ad={ad} />
      </div>
    </div>
  );
}
