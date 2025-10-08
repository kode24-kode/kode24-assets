import { useState } from "react";
import type { Comment } from "../types";
import CommentTile from "./CommentTile";

export default function CommentsTile({
  comments,
}: {
  comments: Array<Comment>;
}) {
  const [showAll, setShowAll] = useState(false);
  return (
    <div
      className={`newest-comments social-component desktop-row card ${
        showAll ? "show-all" : ""
      }`}
    >
      <div className="heading">
        <h2 className="heading-title">💬 Nyeste kommentarer</h2>
      </div>
      <ul className="newest-comments-list">
        {comments.map((comment: Comment) => {
          return (
            <li className="comment-container" key={comment.created_at}>
              <CommentTile comment={comment} oneLine={false} />
            </li>
          );
        })}
      </ul>

      <button
        className="button"
        type="button"
        onClick={() => setShowAll(!showAll)}
      >
        {!showAll && "Vis alle"}
        {showAll && "Skjul"}
      </button>
    </div>
  );
}
