import { getTimeAgo } from "../functions/getTimeAgo";

export function initNewestComments(comments) {
  const firstBanner = document.querySelectorAll(".show-for-medium-up")[0];
  if (firstBanner) {
    const newestCommentsNode = document.createElement("div");
    newestCommentsNode.classList.add(
      "newest-comments",
      "social-component",
      "desktop-row",
      "card"
    );
    newestCommentsNode.innerHTML = `
      <div class="heading">
          <h2 class="heading-title">💬 Nyeste kommentarer</h2>
        </div>
      <ul class="newest-comments-list">
        ${comments
          .map(
            (comment) => `
          <li class="comment-container">
            <a href="${comment.url}#hyvor-talk-view" class="comment-link">
              <div class="avatar"><img src="${comment.user.picture}" /></div>
              <div class="comment">
                <div class="comment-description">
                  <div class="comment-author">
                    ${comment.user.name}
                    <span class="comment-meta">${getTimeAgo(
                      comment.created_at
                    )}</span>
                  </div>
                  <div class="comment-text">${comment.bodySnippet.replace(
                    /(<([^>]+)>)/gi,
                    ""
                  )}</div>
                  <div class="comment-article">${comment.articleTitle}</div>
  
                </div>
  
              </div>
            </a>
          </li>
        `
          )
          .join("")}
      </ul>`;
    firstBanner.prepend(newestCommentsNode);
  }
}
