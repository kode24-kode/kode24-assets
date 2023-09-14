import { Comment } from '../types';
import htmlDecode from '../functions/decodeStringWithSpecialCharacters';

import { getTimeAgo } from '../functions/getTimeAgo';

export default function CommentsTile({
  comments,
}: {
  comments: Array<Comment>;
}) {
  return (
    <div className="newest-comments social-component desktop-row card">
      <div className="heading">
        <h2 className="heading-title">💬 Nyeste kommentarer</h2>
      </div>
      <ul className="newest-comments-list">
        {comments.map((comment: Comment, key: number) => {
          return (
            <li className="comment-container" key={key}>
              <a href={comment.url} className="comment-link">
                <div className="avatar">
                  <img src={comment.user.picture} />
                </div>
                <div className="comment">
                  <div className="comment-description">
                    <div className="comment-author">
                      {comment.user.name}
                      <span className="comment-meta">
                        {getTimeAgo(comment.created_at)}
                      </span>
                    </div>
                    <div className="comment-text">
                      {htmlDecode(comment.bodySnippet)}
                    </div>
                    <div className="comment-article">
                      {comment.articleTitle}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
