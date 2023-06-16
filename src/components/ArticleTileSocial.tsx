import { Article } from '../types';
import ArticleTileSocialIcons from './ArticleTileSocialIcons';
export default function ArticleTileSocial({
  Article,
}: {
  Article: Article;
}) {
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
              <svg
                className="reaction-icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </span>
            <span className="reaction-count">
              {Article.reactions.comments_count}
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
