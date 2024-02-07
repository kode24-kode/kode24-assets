import { CompanyPartner } from '../types';
import { shuffleArray } from '../functions/shuffleArray';
import { getImageCacheUrl } from '../functions/getImageCacheUrl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function CompanyPartnersTile({
  companyPartners,
}: {
  companyPartners: Array<CompanyPartner>;
}) {
  const shuffledCompanyPartners = shuffleArray(
    companyPartners
  ) as Array<CompanyPartner>;
  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 1023, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 30,
    },
  };
  return (
    <div
      id="diamond-partners-list-tile"
      className="row desktop-row card single-row"
    >
      <div className="heading">
        <h2 className="heading-title">
          💡 Ny karriere? Bli kjent med våre partnere
        </h2>
        <a
          href="https://partner.kode24.no"
          target="_blank"
          className="button"
        >
          Finn ut mer
        </a>
      </div>
      <div className="partner-slider">
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={8000}
          keyBoardControl={true}
          transitionDuration={1000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={['tablet', 'mobile']}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {shuffledCompanyPartners.map(
            (partner: CompanyPartner, key: number) => (
              <div key={key}>
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
                        partner.title.split('').length > 60
                          ? 'small'
                          : ''
                      }`}
                    >
                      {partner.title}
                    </h3>
                    <h4 className="partner-slider-company-name">
                      {partner.company.title}
                    </h4>
                    <div className="partner-slider-logo-row">
                      <figure className="partner-slider-logo">
                        <img
                          src={partner.company.logo}
                          alt={partner.company.title}
                        />
                      </figure>
                    </div>
                  </div>
                </a>
              </div>
            )
          )}
        </Carousel>
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
                    src={getImageCacheUrl(companyPartner.darkLogo)}
                    alt={'partner logo ' + companyPartner.slug}
                  />
                  <img
                    className="light"
                    src={getImageCacheUrl(companyPartner.lightLogo)}
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
