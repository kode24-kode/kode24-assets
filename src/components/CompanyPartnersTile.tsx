import { CompanyPartner } from '../types';
import { shuffleArray } from '../functions/shuffleArray';
import { getImageCacheUrl } from '../functions/getImageCacheUrl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const companyPartnersBannersLookup: { [key: string]: string } = {
  'https://cdn.sanity.io/images/2i41qvsb/production/5490592ed585e03fd929357a5fb2ee67cead5b15-1800x600.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/1-nav-partner.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/4a39f4b7839232a3dbb982b1b394545f7381f1ca-1960x654.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/2-geodata.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/de864a0e389ec9c751a77d869cb49d1b1307c670-1800x600.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/3-statensvegvesen.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/2e0acacc6a0d489ffb5b26f55494ca51ff80ad32-1800x600.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/4-boitano.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/ab4079d3c74187bc4188137db301cdcd33000ed0-1800x600.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/5%20-%20ukjent.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/2dbb765bf85bc8b885bb5d66f372aaef1c31f454-3600x1200.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/6-wayscloud.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/872b6af61b48df9cc56c845be4a45f99b3f31498-1960x668.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/7-enso.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/98001a9d1ee342f2f01e5c9edcc8b06f7bd1fa9d-1960x668.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/8-dnb.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/a2189009f1a97ea663eb7da0ad90edc454a841d2-1800x600.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/9-ukjent.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/ad4791209ebb8b28f2742bbc2124f6289b3c1f6b-1972x658.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/10-experis.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/da004ca51b62c4f181787194fadb3a21809a6c71-1972x658.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/11-skatteetaten.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/cbd2059a8d5a475ca2d6d6ba079bc992115cab2f-1800x600.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/12-vivende.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/801cad0af91974e6625c5648171fc454f540a89b-3750x1250.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/13-embriq.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/3f2dac214586d69971a68884f91043c4a5509b3c-1960x668.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/14-posten.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/f41af8ea5920d026dc61414b69f2c5408723214d-1800x600.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/15-tripletex.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/9aa9f23cab6677986181f8567728f80cac7b7a6f-1972x658.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/16-nova.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/24c9b27b46b85d241909ddee8d988354d637d471-1584x396.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/17-shortcut.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/c0476ad71047099f62f066affb4030a83b92fb40-1024x341.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/18-computas.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/7e1264d518c24de87a68c145b78f27ec820a00b9-1800x600.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/18-soprasteria.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/d4e9634ac021fd1fe030598c009adde087ffe142-1960x654.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/20-twoday.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/27d37c6ece08d8c94fc77efb8cc64d23d47ae3fb-3840x1333.jpg?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/21-telenor.jpg',
  'https://cdn.sanity.io/images/2i41qvsb/production/3680cbe0bea144e652830c662b80cd6a1ae31b60-3600x1200.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/24/kode24-partner-ways-tinified.png',
  'https://cdn.sanity.io/images/2i41qvsb/production/e07a94cc49bc5a58ef941541d78f7be210e01839-1800x600.png?w=976&fit=max':
    'https://www.dagbladet.no/files/2024/09/30/23-ukjent.png',
};

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
            (partner: CompanyPartner, key: number) => {
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
                    loading="lazy"
                  />
                  <img
                    className="light"
                    src={getImageCacheUrl(companyPartner.lightLogo)}
                    alt={'partner logo ' + companyPartner.slug}
                    loading="lazy"
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
