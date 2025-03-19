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
      <div className="comment-inline">
        <div className="comment-avatar">
          <img src={comment.user.picture_url} className="" />
        </div>
        <div className="comment-main">
          <div className="comment-posted">
            <div className="comment-username">
              {comment.user.name}
            </div>
            <div className="comment-date">
              {comment.created_at && getTimeAgo(comment.created_at)}
            </div>
          </div>
          <div className="comment-snippet">
            {htmlDecode(comment.bodySnippet)}
            {comment.bodySnippet.charAt(
              comment.bodySnippet.length - 1
            ) != '.' && '...'}
          </div>
        </div>
      </div>
    </a>
  );
}

//<div className="comment-article">{comment.articleTitle}</div>
