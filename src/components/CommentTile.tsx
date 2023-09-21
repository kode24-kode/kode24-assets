import { Comment } from '../types';
import { getTimeAgo } from '../functions/getTimeAgo';
import htmlDecode from '../functions/decodeStringWithSpecialCharacters';
export default function CommentTile({
  comment,
  oneLine = false,
}: {
  comment: Comment;
  oneLine?: boolean;
}) {
  if (comment.bodySnippet == '') return <></>;
  return (
    <a
      href={comment.url}
      className={`comment-tile ${oneLine ? 'oneline' : ''}`}
    >
      <div className="comment-text">
        {oneLine && <span className="comment-icon">💬</span>}
        <div className="comment-author">
          {!oneLine && (
            <img
              src={comment.user.picture}
              className="comment-avatar"
            />
          )}
          <div className="comment-username">{comment.user.name}</div>
        </div>
        {htmlDecode(comment.bodySnippet)}
        {comment.bodySnippet.charAt(comment.bodySnippet.length - 1) !=
          '.' && '...'}
      </div>
      <div className="comment-meta">
        {!oneLine && (
          <div className="comment-date">
            {getTimeAgo(comment.created_at)}
          </div>
        )}
      </div>
      {!oneLine && (
        <div className="comment-article">{comment.articleTitle}</div>
      )}
    </a>
  );
}
