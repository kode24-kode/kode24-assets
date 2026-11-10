import { useRef, useState } from "react";
import useFitCount from "../functions/useFitCount";
import type { Comment } from "../types";
import CommentTile from "./CommentTile";

// used when there is no full width row to measure against
const FALLBACK_COUNT = 4;

/**
 * Lists as many comments as fit in the sidebar, down to the first full width
 * row in the main column. The rest is available through "Vis alle".
 */
export default function CommentsTile({
  comments,
  onMeasured,
}: {
  comments: Array<Comment>;
  // called when the list has its final height, so content below can measure
  onMeasured?: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  // everything is shown in the overlay, and the list is measured again when it closes
  useFitCount({
    listRef,
    containerRef,
    buttonRef,
    boundary: 0,
    fallback: FALLBACK_COUNT,
    itemCount: comments.length,
    enabled: !showAll,
    onMeasured,
  });

  return (
    <div
      ref={containerRef}
      className={`newest-comments comments-sidebar social-component desktop-row card fit-comments ${
        showAll ? "full" : ""
      } ${showAll ? "show-all" : ""}`}
    >
      <div className="heading">
        <h2 className="heading-title">Nyeste kommentarer</h2>
      </div>
      <ul className="newest-comments-list" ref={listRef}>
        {comments.map((comment: Comment) => {
          return (
            <li className="comment-container" key={comment.created_at}>
              <CommentTile comment={comment} oneLine={false} />
            </li>
          );
        })}
      </ul>

      <button
        ref={buttonRef}
        className="button"
        type="button"
        onClick={() => setShowAll(!showAll)}
      >
        {!showAll && "Vis alle"}
        {showAll && "Lukk"}
      </button>
    </div>
  );
}
