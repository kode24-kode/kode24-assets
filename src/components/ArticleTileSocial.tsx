import { Article } from '../types';
import ArticleTileSocialIcons from './ArticleTileSocialIcons';
export default function ArticleTileSocial({
  Article,
  style,
}: {
  Article: Article;
  style: string;
}) {
  if (
    Article.reactions &&
    Article.reactions.reactions &&
    typeof Article.reactions.comments_count == 'number' &&
    typeof Article.reactions.reactions_count == 'number'
  ) {
    return (
      <div className="social-buttons flex items-center gap-4">
        {Article.reactions.reactions_count > 0 && (
          <div className="article-social-reactions article-social-item flex items-center">
            <a
              href={`https://www.kode24.no/${Article.id}#hyvor-talk-view`}
              className={`reaction-button reaction flex items-center ${
                style === 'inverse' && ' bg-slate-800'
              }
                    ${!style && 'bg-slate-100'} p-2 gap-4 rounded-md`}
            >
              <span
                className="reaction-icons-summary flex items-center 0 text-xl flex-row-reverse"
                aria-hidden="true"
              >
                {Article.reactions.reactions
                  .map((count: number, index: number) => ({
                    number: index,
                    count: count,
                  }))
                  .sort((a, b) => b.count - a.count)
                  // pick three first items in array
                  .slice(0, 3)
                  .filter((reaction) => reaction.count > 0)
                  .map((reaction, key: number) => (
                    <ArticleTileSocialIcons
                      key={key}
                      emojiId={reaction.number}
                    />
                  ))}
              </span>
              <span
                className={`${
                  style === 'inverse' && ' text-slate-200'
                }
                    ${!style && 'text-slate-600'}
                reaction-count`}
              >
                {Article.reactions.reactions_count}
              </span>
            </a>
          </div>
        )}
        {Article.reactions.comments_count > 0 && (
          <div className="article-social-reactions article-social-item flex items-center bg-slate-200 p-2 gap-4 rounded-md">
            <a
              href={`https://www.kode24.no/${Article.id}#hyvor-talk-view`}
              className="reaction-button reaction flex gap-2 text-slate-600"
            >
              <span
                className="reaction-icons-summary"
                aria-hidden="true"
              >
                <span className="emoji">💬</span>
              </span>
              <span className="reaction-count">
                {Article.reactions.comments_count}
              </span>
            </a>
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}
