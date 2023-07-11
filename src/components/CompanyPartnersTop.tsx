import { CompanyPartner } from '../types';
import { shuffleArray } from '../functions/shuffleArray';
import Marquee from 'react-fast-marquee';
export default function CompanyPartnersTop({
  companyPartners,
}: {
  companyPartners: Array<CompanyPartner>;
}) {
  const shuffledCompanyPartners = shuffleArray(
    companyPartners
  ) as Array<CompanyPartner>;
  return (
    <div className="diamond-partners-list">
      <Marquee pauseOnHover={true} speed={10} gradient={true}>
        <ul>
          {shuffledCompanyPartners.map(
            (companyPartner: CompanyPartner, key: number) => (
              <li key={key}>
                <a
                  href={
                    'https://partner.kode24.no/' + companyPartner.slug
                  }
                >
                  <img
                    className="dark"
                    src={companyPartner.darkLogo}
                    alt={'partner logo ' + companyPartner.slug}
                  />
                  <img
                    className="light"
                    src={companyPartner.lightLogo}
                    alt={'partner logo ' + companyPartner.slug}
                  />
                  <span className="description">
                    {companyPartner.tooltip}
                  </span>
                </a>
              </li>
            )
          )}
        </ul>
      </Marquee>
    </div>
  );
}
