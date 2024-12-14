import { Article } from '../types';
import ArticleTileSocial from './ArticleTileSocial';
import CommentTile from './CommentTile';
export default function ArticleTile({
  Article,
  layout,
  size,
  isHot,
}: {
  Article: Article;
  layout: string;
  size: 'big' | 'small';
  isHot: boolean;
}) {
  const articleIsToday =
    new Date(Article.published).setHours(0, 0, 0, 0) ==
    new Date().setHours(0, 0, 0, 0)
      ? true
      : false;
  return (
    <article
      id={`article_${Article.id}`}
      className={`relative ${layout} ${isHot ? 'hot' : ''}`}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      role="article"
      data-id={Article.id}
      data-label=""
    >
      <div className="article-content-wrapper flex flex-col gap-2">
        <a
          itemProp="url"
          href={Article.published_url}
          title={Article.title}
          aria-label={Article.title}
        >
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
        <div className="article-preview-text p-2 flex flex-col gap-2">
          <a itemProp="url" href={Article.published_url}>
            <time
              className="published bg-slate-50 rounded-md p-2 text-slate-600 text-sm absolute -top-3 left-3"
              dateTime={Article.published}
            >
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

            <h1
              className={`  ${
                size === 'big' ? 'text-6xl' : 'text-2xl'
              } headline`}
            >
              <span className="headline-title-wrapper">
                {Article.title}
              </span>
            </h1>
          </a>

          <div className="article-social flex items-center justify-start gap-4">
            <div className="byline-row bg-slate-100 p-2 rounded-md flex items-center gap-2">
              <div className="byline-profile-image w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={`https://www.kode24.no/images/${Article.byline.imageUrl}`}
                  loading="lazy"
                  alt={`byline name ${Article.byline.name}`}
                />
              </div>
              <div className="byline-info">
                <div className="byline-name text-slate-900 text-sm">
                  {Article.byline.name}
                </div>
                <div className="byline-bio text-slate-600/75 text-xs">
                  {Article.byline.bio}
                </div>
              </div>
            </div>
            <ArticleTileSocial Article={Article} />
          </div>
          <div>
            {Article.highestRatedComment && (
              <CommentTile
                comment={{
                  ...Article.highestRatedComment,
                  ...{ url: Article.published_url },
                }}
                oneLine={true}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
