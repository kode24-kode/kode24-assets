import { Comment } from "../types";
import { getTimeAgo } from '../functions/getTimeAgo';
import htmlDecode from '../functions/decodeStringWithSpecialCharacters';
export default function CommentTile({ comment, oneLine = false }: {comment: Comment, oneLine?: boolean}) {
  return (
    <a href={comment.url} className={`comment-tile ${comment}`} >
      <div className="comment-author">
        {!oneLine &&
            <img src={comment.user.picture} className="comment-avatar" />
        }
          <div className="comment-username">
          {comment.user.name}
          </div>

      </div>
      <div className="comment-text">
          {htmlDecode(comment.bodySnippet)}
      </div>
      <div className="comment-meta">
        {!oneLine &&
          <div className="comment-date">{getTimeAgo(comment.created_at)}</div>
          }
        </div>
        {!oneLine && (
          <div className="comment-article">
            {comment.articleTitle}
        </div>
      )}
    </a>
  )
}