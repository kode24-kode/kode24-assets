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
  return (
    <div
      id="diamond-partners-list-tile"
      className="row desktop-row card single-row"
    >
      <div className="single relative min-h-svh bg-slate-200 w-svw left-1/2 -translate-x-1/2 mb-16 p-8 flex flex-col justify-center">
        <div className="heading pb-14 pt-8 flex flex-col justify-center items-center">
          <h2 className="heading-title heading-title text flex justify-center text-5xl px-8 mb-4">
            💡 Ny karriere?
          </h2>
          <h3 className="heading-title heading-title text flex justify-center text-2xl px-8 m-0">
            Disse firmaene støtter kode24.no
          </h3>
        </div>
        <ul className="preview logo-list flex gap-4 flex-wrap justify-center items-center">
          {shuffledCompanyPartners.map(
            (companyPartner: CompanyPartner, key: number) => (
              <li key={key}>
                <a
                  href={
                    'https://partner.kode24.no/' + companyPartner.slug
                  }
                >
                  <img
                    className="w-72 max-h-60 px-8 py-8"
                    src={'/logos/' + companyPartner.slug + '.svg'}
                    alt={'partner logo ' + companyPartner.slug}
                    loading="lazy"
                  />
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

/**

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
            (partner: CompanyPartner, key: number) => {
              console.log(partner.banner);
              return (
                <div key={key}>
                  <a
                    href={'https://partner.kode24.no/' + partner.slug}
                    className="partner-slider-item-container"
                  >
                    <div className="partner-slider-image">
                      <img
                        src={
                          companyPartnersBannersLookup[
                            partner.banner
                          ] || getImageCacheUrl(partner.banner)
                        }
                        alt={partner.tooltip}
                        loading="lazy"
                      />
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
                    </div>
                  </a>
                </div>
              );
            }
          )}
        </Carousel>
      </div>

 */
