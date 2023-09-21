import { Article } from '../types';
import ArticleTileSocialIcons from './ArticleTileSocialIcons';
export default function ArticleTileSocial({
  Article,
}: {
  Article: Article;
}) {
  if (
    Article.reactions &&
    Article.reactions.reactions &&
    typeof Article.reactions.comments_count == 'number' &&
    typeof Article.reactions.reactions_count == 'number'
  ) {
    return (
      <div className="social-buttons">
        {Article.reactions.reactions_count > 0 && (
          <div className="article-social-reactions article-social-item">
            <a
              href={`https://www.kode24.no/${Article.id}#hyvor-talk-view`}
              className="reaction-button reaction"
            >
              <span
                className="reaction-icons-summary"
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
              <span className="reaction-count">
                {Article.reactions.reactions_count}
              </span>
            </a>
          </div>
        )}
        {Article.reactions.comments_count > 0 && (
          <div className="article-social-reactions article-social-item">
            <a
              href={`https://www.kode24.no/${Article.id}#hyvor-talk-view`}
              className="reaction-button reaction"
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
