import { Article } from '../types';
import ArticleTileSocial from './ArticleTileSocial';
export default function ArticleTile({
  Article,
  isHot,
}: {
  Article: Article;
  isHot: boolean;
}) {
  console.log(Article.id, Article.title, isHot);
  return (
    <article
      id={`article_${Article.id}`}
      className={`preview columns large-12 small-12 medium-12 compact ${
        isHot ? 'hot' : ''
      }`}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      role="article"
      data-id={Article.id}
      data-label=""
    >
      <div className="article-content-wrapper">
        <a itemProp="url" href={Article.published_url}>
          <figure className="">
            <img
              className=""
              itemProp="image"
              loading="lazy"
              alt={`image: {Article.title}`}
              src={`https://www.kode24.no/images/${Article.image}.jpg${Article.frontCropUrl}&width=960&height=600`}
            />
          </figure>
        </a>
        <div className="article-preview-text">
          <a itemProp="url" href={Article.published_url}>
            <time className="published" dateTime={Article.published}>
              I dag, 11:21
            </time>

            <h1 className="headline">
              <span className="headline-title-wrapper">
                {Article.title}
              </span>
            </h1>
          </a>

          <div className="article-social">
            <div className="byline-row">
              <div className="byline-profile-image">
                <img
                  src={`https://www.kode24.no/images/${Article.byline.imageUrl}`}
                  loading="lazy"
                  alt={`byline name ${Article.byline.name}`}
                />
              </div>
              <div className="byline-info">
                <div className="byline-name">
                  {Article.byline.name}
                </div>
                <div className="byline-bio">{Article.byline.bio}</div>
              </div>
            </div>
            <ArticleTileSocial Article={Article} />
          </div>
        </div>
      </div>
    </article>
  );
}
