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
      href={comment.url + '#hyvor-talk-view'}
      className={`comment-tile ${oneLine ? 'oneline' : ''}`}
      title="Hopp rett til kommentarer i saken"
      aria-label="Hopp rett til kommentarer i saken"
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
            {comment.created_at && getTimeAgo(comment.created_at)}
          </div>
        )}
      </div>
      {!oneLine && (
        <div className="comment-article">{comment.articleTitle}</div>
      )}
    </a>
  );
}
