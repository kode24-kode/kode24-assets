import { Snow } from './Snow';

const desktop = {
  background:
    'https://www.dagbladet.no/files/2024/12/04/julebanner-backgrounddesktop.jpg',
};
const mobile = {
  background:
    'https://www.dagbladet.no/files/2024/12/04/julebanner-backgroundmobile.jpg',
};

const link = 'https://www.konsulent2000.com';
const TopBarAd = () => {
  return (
    <a href={link} className="top-bar-ad-content" target="_blank">
      <Snow />
      <div className="top-bar-ad-content-information">
        <p className="title">kode24s julekalender er i gang!</p>
        <p className="description">
          Hjelp Tomsconsult med å få unna konsulentoppgaver før jul.
          Vinnermuligheter hver dag. 🏆
        </p>
        <a
          href="https://konsulent2000.com/"
          target="_blank"
          className="retro-button"
        >
          Bli med!
        </a>
      </div>
      <div className="top-bar-ad-desktop">
        <img src={desktop.background} alt="background" />
      </div>
      <div className="top-bar-ad-mobile">
        <img src={mobile.background} alt="background" />
      </div>
    </a>
  );
};

export default TopBarAd;
