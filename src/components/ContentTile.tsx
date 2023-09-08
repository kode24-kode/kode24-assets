import { Content } from '../types';
export default function ContentTile({
  Content,
  inlineToggle,
}: {
  Content: Content;
  inlineToggle?: boolean;
}) {
  return (
    <article
      id={`article_${Content.id}`}
      className={`preview columns large-12 small-12 medium-12 compact commercial-content ${
        inlineToggle ? 'inline' : ''
      }`}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      role="article"
      data-id={Content.id}
      data-label=""
    >
      <div className="article-content-wrapper">
        <a itemProp="url" href={Content.published_url}>
          <figure className="">
            <img
              className=""
              itemProp="image"
              loading="lazy"
              alt={`image: ${Content.title}`}
              src={`https://www.kode24.no/images/${Content.image}.jpg?imageId=${Content.image}&width=900&compression=80`}
            />
          </figure>
        </a>
        <div className="article-preview-text">
          <a itemProp="url" href={Content.published_url}>
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
                  src={`https://www.kode24.no/images/${Content.company.imageUrl}`}
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
