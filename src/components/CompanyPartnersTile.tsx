import { CompanyPartner } from '../types';
import { shuffleArray } from '../functions/shuffleArray';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
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
        <h2 className="heading-title">Våre partnere 🥰</h2>
        <a
          href="https://partner.kode24.no"
          target="_blank"
          className="button"
        >
          Finn ut mer
        </a>
      </div>
      <div className="partner-slider">
        <Splide
          aria-label="hero images"
          data-splide='{"type":"loop"}'
        >
          {shuffledCompanyPartners.map(
            (partner: CompanyPartner, key: number) => (
              <SplideSlide key={key}>
                <a
                  href={'https://partner.kode24.no/' + partner.slug}
                  className="partner-slider-item-container"
                >
                  <div className="partner-slider-image">
                    <img src={partner.banner} alt={partner.tooltip} />
                  </div>
                  <div className="partner-slider-title">
                    <h3
                      className={`partner-slider-title-slogan ${
                        partner.title.split('').length > 88
                          ? 'small'
                          : ''
                      }`}
                    >
                      {partner.title}
                    </h3>
                    <div className="partner-slider-logo-row">
                      <figure className="partner-slider-logo">
                        <img
                          src={partner.company.logo}
                          alt={partner.company.title}
                        />
                      </figure>
                      <span className="partner-slider-company-name">
                        {partner.company.title}
                      </span>
                    </div>
                  </div>
                </a>
              </SplideSlide>
            )
          )}
        </Splide>
      </div>
      <div className="single">
        <ul className="preview logo-list">
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
                    src={
                      'https://kode24-image-cache.onrender.com/image?url=' +
                      companyPartner.darkLogo
                    }
                    alt={'partner logo ' + companyPartner.slug}
                  />
                  <img
                    className="light"
                    src={
                      'https://kode24-image-cache.onrender.com/image?url=' +
                      companyPartner.lightLogo
                    }
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
