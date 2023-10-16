import { Article, Comment } from '../types';
import ArticleTileSocial from './ArticleTileSocial';
import CommentTile from './CommentTile';
export default function ArticleTile({
  Article,
  isHot,
  comments,
}: {
  Article: Article;
  isHot: boolean;
  comments: Comment[] | [];
}) {
  if (Article.id === '80203162')
    console.log(
      Article,
      comments,
      Article.reactions.comments_count,
      comments.length
    );
  const articleIsToday =
    new Date(Article.published).setHours(0, 0, 0, 0) ==
    new Date().setHours(0, 0, 0, 0)
      ? true
      : false;
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
              {articleIsToday
                ? `I dag, ${new Intl.DateTimeFormat('no-NB', {
                    timeStyle: 'short',
                    timeZone: 'Europe/Oslo',
                  }).format(new Date(Article.published))}`
                : `
              ${new Intl.DateTimeFormat('no-NB', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                timeZone: 'Europe/Oslo',
              }).format(new Date(Article.published))}
            `}
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
            {Article.highestRatedComment && (
              <CommentTile
                comment={{ ...Article.highestRatedComment, ...{ url: Article.published_url } }}
                oneLine={true}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
