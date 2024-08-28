const desktop = {
  background:
    'https://www.dagbladet.no/files/2024/08/20/kode24-FINN_banner_1700x100-background.png',
  text2:
    'https://www.dagbladet.no/files/2024/08/20/kode24-FINN_banner_1700x100-text1.png',
  text1:
    'https://www.dagbladet.no/files/2024/08/20/kode24-FINN_banner_1700x100-text2.png',
};
const mobile = {
  background:
    'https://www.dagbladet.no/files/2024/08/20/kode24-FemaleDeveloper_kvadrat%20400x400-background.png',
  text2:
    'https://www.dagbladet.no/files/2024/08/20/kode24-FemaleDeveloper_kvadrat%20400x400-text1.png',
  text1:
    'https://www.dagbladet.no/files/2024/08/20/kode24-FemaleDeveloper_kvadrat%20400x400-text2.png',
};

const link =
  'https://www.finn.no/jobbeifinn/teknologi/female-developer-of-the-year-2024';
const TopBarAd = () => {
  return (
    <a href={link} className="top-bar-ad-content" target="_blank">
      <div className="top-bar-ad-desktop">
        <img src={desktop.background} alt="background" />
        <img
          src={desktop.text1}
          alt="text1"
          className="fading-image first"
        />
        <img
          src={desktop.text2}
          alt="text1"
          className="fading-image second"
        />
      </div>
      <div className="top-bar-ad-mobile">
        <img src={mobile.background} alt="background" />
        <img
          src={mobile.text1}
          alt="text1"
          className="fading-image center first"
        />
        <img
          src={mobile.text2}
          alt="text1"
          className="fading-image center second"
        />
      </div>
    </a>
  );
};

export default TopBarAd;
