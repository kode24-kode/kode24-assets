import { CompanyPartner } from '../types';
import { shuffleArray } from '../functions/shuffleArray';
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
      <h3>
        Se karrieremuligheter <br />
        hos våre partnere
      </h3>
      <ul>
        {shuffledCompanyPartners
          .slice(0, 8)
          .map((companyPartner: CompanyPartner, key: number) => (
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
          ))}
      </ul>
    </div>
  );
}
