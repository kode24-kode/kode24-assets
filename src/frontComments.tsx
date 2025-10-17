// draws comments on articles published through labrador

import { Chat2Icon, HeartIcon } from "@navikt/aksel-icons";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ArticleTileSocialIcons from "./components/ArticleTileSocialIcons";
import CommentTile from "./components/CommentTile";
import { createPortal } from "react-dom";

import type { Article } from "./types";

export default function FrontComments(latestArticles: Article[]) {
  const articles = document.querySelectorAll(".page-content article");

  articles.forEach((article) => {
    const dataInstance = article.getAttribute("data-instance");
    if (dataInstance) {
      const articleData = latestArticles.find(
        (article) => article.id === dataInstance
      );
      if (articleData) {
        const commentNode = document.createElement("div");

        commentNode.classList.add("article-reactions-container");
        ReactDOM.createRoot(commentNode).render(
          <React.StrictMode>
            <ArticleReactions article={articleData} />
          </React.StrictMode>
        );

        const mediaFigure = article.querySelector(".media figure");
        if (mediaFigure) {
          mediaFigure.appendChild(commentNode); // Append the commentNode to the .media figure element
        }
      }
    }
  });
}

function ArticleReactions({ article }: { article: Article }) {
  const [toggleReactions, setToggleReactions] = useState(false);

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Handler to update mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <button
      type="button"
      className="article-reactions"
      //Uncomment and implement the handler if needed:
      onMouseEnter={() => setToggleReactions(true)}
      onMouseLeave={() => setToggleReactions(false)}
      onMouseMove={handleMouseMove}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = article.published_url + "#hyvor-talk-view";
      }}
    >
      <div className="backdrop-filter"></div>
      {createPortal(
        <div
          className={`article-reactions-popup ${
            article.highestRatedComment ? "" : "no-comment"
          }
        ${toggleReactions ? "active" : ""}
        `}
          style={{
            position: "fixed",
            left: mousePos.x,
            top: mousePos.y - (article.highestRatedComment ? 260 : 100), // Adjust -180 to move popup above cursor
            zIndex: 9999,
            pointerEvents: "none", // Prevents popup from interfering with mouse events
          }}
        >
          <ul className="article-reactions-popup-reactions">
            {article.reactions.reactions.map((reaction, key) => (
              <li key={key}>
                <ArticleTileSocialIcons emojiId={key} />
                {reaction}
              </li>
            ))}
          </ul>
          {article.highestRatedComment && (
            <div className="article-reactions-popup-latest-comments">
              <h2 className="article-reactions-comment-title">
                Nyeste kommentar ({article.reactions.comments_count} totalt):
              </h2>
              <CommentTile comment={article.highestRatedComment} />
            </div>
          )}
        </div>,
        document.body
      )}

      <span>
        <HeartIcon />
        {article.reactions?.reactions_count || 0}
      </span>
      {article.reactions?.comments_count > 0 && (
        <span>
          <Chat2Icon />
          {article.reactions?.comments_count || 0}
        </span>
      )}
    </button>
  );
}
