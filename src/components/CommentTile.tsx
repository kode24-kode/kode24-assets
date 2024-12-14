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
      className={`block rounded-md comment-tile bg-slate-200 p-2 ${
        oneLine ? 'oneline' : ''
      }`}
      title="Hopp rett til kommentarer i saken"
      aria-label="Hopp rett til kommentarer i saken"
    >
      <div className="comment-text flex justify-start items-center">
        {oneLine && (
          <span className="comment-icon inline-block">💬</span>
        )}
        <div className="ml-1 comment-author inline-block px-2 py-1 rounded-md text-sm bg-slate-300">
          {!oneLine && (
            <img
              src={comment.user.picture}
              className="comment-avatar"
            />
          )}
          <div className="comment-username">{comment.user.name}</div>
        </div>
        <div className="truncate ml-1 text-sm">
          {htmlDecode(comment.bodySnippet)}
          {comment.bodySnippet.charAt(
            comment.bodySnippet.length - 1
          ) != '.' && '...'}
        </div>
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
