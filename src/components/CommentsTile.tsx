import { Comment } from '../types';
import CommentTile from './CommentTile';

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
              <CommentTile comment={comment} oneLine={false} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
