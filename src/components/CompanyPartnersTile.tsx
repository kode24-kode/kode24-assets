import { CompanyPartner } from '../types';
import { shuffleArray } from '../functions/shuffleArray';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '@splidejs/react-splide/css';

import { useRef, useEffect } from 'react';

export default function CompanyPartnersTile({
  companyPartners,
}: {
  companyPartners: Array<CompanyPartner>;
}) {
  const shuffledCompanyPartners = shuffleArray(
    companyPartners
  ) as Array<CompanyPartner>;
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const myRef = useRef(null);

  const play = () => {
    myRef.current.slickPlay();
  };
  const pause = () => {
    myRef.current.slickPause();
  };
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
        <div style={{ textAlign: 'center' }}>
          <button className="button" onClick={play}>
            Play
          </button>
          <button className="button" onClick={pause}>
            Pause
          </button>
        </div>
        <Slider
          id="partner-slider"
          aria-label="partners"
          settings={settings}
          ref={myRef}
          onInit={(elm) => {
            console.log(elm, myRef, 'init');
            if (myRef && myRef.current) {
              console.log('starting to play');
              myRef.current.slickPlay();
            }

            //play();
          }}
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
        </Slider>
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
