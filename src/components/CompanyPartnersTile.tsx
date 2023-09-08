import { CompanyPartner } from '../types';
import { shuffleArray } from '../functions/shuffleArray';
export default function CompanyPartnersTile({
  companyPartners,
}: {
  companyPartners: Array<CompanyPartner>;
}) {
  const shuffledCompanyPartners = shuffleArray(
    companyPartners
  ) as Array<CompanyPartner>;
  return (
    <div
      id="diamond-partners-list-tile"
      className="row desktop-row card single-row"
    >
      <div className="heading">
        <h2 className="heading-title">
          Bli kjent med våre firmapartnere 😍
        </h2>
        <a
          href="https://partner.kode24.no"
          target="_blank"
          className="button"
        >
          Finn ut mer
        </a>
      </div>
      <div className="single">
        <ul className="preview">
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
      </div>
    </div>
  );
}
