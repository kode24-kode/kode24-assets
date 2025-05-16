// draws comments on articles published through labrador

import React from "react";
import ReactDOM from "react-dom/client";
import { Chat2Icon, HeartIcon } from "@navikt/aksel-icons";

import { Article } from "./types";

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

        commentNode.classList.add("article-reactions");
        ReactDOM.createRoot(commentNode).render(
          <React.StrictMode>
            <ArticleReactions article={articleData} />
          </React.StrictMode>
        );

        const mediaFigure = article.querySelector(".media figure");
        if (mediaFigure) {
          mediaFigure.appendChild(commentNode); // Append the commentNode to the .media figure element
        } else {
          console.warn("No .media figure found in article", article);
        }

        console.log("fant artikkel", articleData); // Do something with the instance number
      }
    }
  });
}

function ArticleReactions({ article }: { article: Article }) {
  return (
    <>
      <span>
        <Chat2Icon />
        {article.reactions?.reactions_count || 0}
      </span>
      <span>
        <HeartIcon />
        {article.reactions?.comments_count || 0}
      </span>
    </>
  );
}
