import { ContentTile } from '../types';
import { getImageCacheUrl } from '../functions/getImageCacheUrl';
export default function ContentTileItem({
  Content,
  inlineToggle,
  layout,
  size,
}: {
  Content: ContentTile;
  inlineToggle?: boolean;
  layout: string;
  size: 'big' | 'small';
}) {
  if (
    Content.adlink.includes('stillinger') &&
    !Content.adlink.includes('kodejobb')
  ) {
    Content.adlink = 'https://www.kodejobb.no' + Content.adlink;
  }

  return (
    <article
      className={`relative ${layout} ${inlineToggle ? 'inline' : ''}`}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      role="article"
      data-label=""
    >
      <div className="article-content-wrapper flex flex-col gap-4">
        <a
          className="flex gap-4"
          itemProp="url"
          href={Content.adlink}
          title={Content.title}
          aria-label={Content.title}
        >
          <figure
            className={`${
              Content.banner ? 'photo' : 'logo'
            } rounded-md overflow-hidden`}
          >
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
        <div className="article-preview-text flex flex-col gap-4">
          <a itemProp="url" href={Content.adlink}>
            <p className="company-name absolute left-2 -top-3 bg-gradient-to-b from-pink-500 to-purple-600 p-2 rounded-md text-white">
              Annonsørinnhold
            </p>
            <h1 className="headline text-4xl">
              <span className="headline-title-wrapper">
                {Content.title}
              </span>
            </h1>
          </a>

          <div className="article-social">
            <div className="byline-row flex items-center gap-2">
              <div className="byline-profile-image rounded-full overflow-hidden w-10">
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
