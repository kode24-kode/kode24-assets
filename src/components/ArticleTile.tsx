import { Article } from '../types';
import ArticleTileSocial from './ArticleTileSocial';
import CommentTile from './CommentTile';
export default function ArticleTile({
  Article,
  layout,
  size,
  isHot,
  style,
  horisontal = false,
}: {
  Article: Article;
  layout: string;
  size: 'big' | 'small';
  isHot: boolean;
  style: string;
  horisontal: boolean;
}) {
  const articleIsToday =
    new Date(Article.published).setHours(0, 0, 0, 0) ==
    new Date().setHours(0, 0, 0, 0)
      ? true
      : false;
  return (
    <article
      id={`article_${Article.id}`}
      className={`relative ${layout} ${isHot ? 'hot' : ''} ${style}`}
      itemScope
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      role="article"
      data-id={Article.id}
      data-label=""
    >
      <div
        className={`${horisontal ? '' : 'flex-col'}
        article-content-wrapper flex  gap-2`}
      >
        <a
          itemProp="url"
          href={Article.published_url}
          title={Article.title}
          aria-label={Article.title}
        >
          <figure className={`${horisontal === true && 'w-80'}`}>
            <img
              className="rounded"
              itemProp="image"
              loading="lazy"
              alt={`image: {Article.title}`}
              src={`https://www.kode24.no/images/${Article.image}.jpg${Article.frontCropUrl}&width=960&height=600`}
            />
          </figure>
        </a>
        <div
          className={`article-preview-text p-2 flex flex-col gap-2 max-w-full overflow-hidden`}
        >
          <a itemProp="url" href={Article.published_url}>
            <time
              className={`published ${
                style === 'inverse' && 'bg-slate-800 text-slate-300'
              } ${!style && 'bg-slate-50 text-slate-600'}
              ${horisontal === true ? 'left-3' : 'right-3'}
                rounded-md p-2  text-sm absolute -top-3`}
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
              className={`
                font-bold
                ${style === 'inverse' && ' text-slate-100'}
                ${!style && 'text-slate-700'}
                ${size === 'big' ? 'text-6xl' : 'text-2xl'} headline
                ${horisontal === true ? 'text-3xl' : ''}
                `}
            >
              <span className="headline-title-wrapper">
                {Article.title}
              </span>
            </h1>
          </a>

          <div className="article-social flex items-center justify-start gap-4">
            <div
              className={
                'byline-row p-2 rounded-md flex items-center gap-2'
              }
            >
              <div className="byline-profile-image w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={`https://www.kode24.no/images/${Article.byline.imageUrl}`}
                  loading="lazy"
                  alt={`byline name ${Article.byline.name}`}
                />
              </div>
              <div className="byline-info">
                <div
                  className={`byline-name
                    ${style === 'inverse' && ' text-pink-500'}
                    ${!style && 'text-slate-700'}
                  text-sm`}
                >
                  {Article.byline.name}
                </div>
                <div
                  className={`byline-bio ${
                    style === 'inverse' && ' text-slate-500/75'
                  }
                  ${!style && 'text-slate-700'}
                     text-xs`}
                >
                  {Article.byline.bio}
                </div>
              </div>
            </div>
            <ArticleTileSocial Article={Article} style={style} />
          </div>
          <div>
            {Article.highestRatedComment && (
              <CommentTile
                style={style}
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
