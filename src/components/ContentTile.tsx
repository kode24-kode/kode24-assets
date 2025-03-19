import { ContentTile } from '../types';
import { getImageCacheUrl } from '../functions/getImageCacheUrl';
export default function ContentTileItem({
  Content,
  inlineToggle,
}: {
  Content: ContentTile;
  inlineToggle?: boolean;
}) {
  if (
    Content.adlink.includes('stillinger') &&
    !Content.adlink.includes('kodejobb')
  ) {
    Content.adlink = 'https://www.kodejobb.no' + Content.adlink;
  }

  return (
    <article
      className={`preview columns large-12 small-12 medium-12 compact commercial-content ${
        inlineToggle ? 'inline' : ''
      }`}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      role="article"
      data-label=""
    >
      <div className="article-content-wrapper">
        <a
          itemProp="url"
          href={Content.adlink}
          title={Content.title}
          aria-label={Content.title}
        >
          <figure className={`${Content.banner ? 'photo' : 'logo'}`}>
            <img
              className="photo"
              itemProp="image"
              loading="lazy"
              alt={`image: ${Content.title}`}
              src={getImageCacheUrl(
                Content.banner ||
                  Content.company.logo.replace(
                    'w=100&fit=max',
                    'fm=webp&w=100'
                  )
              )}
            />
          </figure>
        </a>
        <div className="article-preview-text">
          <a
            itemProp="url"
            href={Content.adlink}
            title={Content.title}
            aria-label={Content.title}
          >
            <p className="company-name">Annonsørinnhold</p>
            <h1 className="headline">
              <span className="headline-title-wrapper">
                {Content.title}
              </span>
            </h1>
          </a>

          <div className="article-social">
            <div className="byline-row">
              <div className="byline-profile-image">
                <img
                  src={getImageCacheUrl(Content.company.logo)}
                  loading="lazy"
                  alt={`byline name ${Content.company.name}`}
                />
              </div>
              <div className="byline-info">
                <div className="byline-name">
                  {Content.company.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
