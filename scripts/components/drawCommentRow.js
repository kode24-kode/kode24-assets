export function drawCommentRow(articleData, articleIds, articlesList) {
  articlesList.forEach((element, index) => {
    let commentData = articleData.find(
      (article) => article.id === articleIds[index]
    );
    if (commentData) {
      let numberofReactions =
        commentData.commentsData && commentData.commentsData.reactions.length
          ? commentData.commentsData.reactions.reduce(
              (sum, number) => sum + number,
              0
            )
          : 0;
      let numberofComments =
        commentData.commentsData && commentData.commentsData.comments_count
          ? commentData.commentsData.comments_count
          : 0;

      element.appendChild(
        getSocialRowNode(
          numberofComments,
          numberofReactions,
          commentData.tags || [],
          commentData && commentData.id ? commentData.id : ""
        )
      );
    }
  });
}

function getSocialRowNode(commentCount, reactionsCount, tagsList, articleId) {
  let newElement = document.createElement("div");
  newElement.classList.add("article-social");
  newElement.innerHTML = `
    <div class="social-buttons">
        <div class="article-social-reactions article-social-item">
            <a href="https://www.kode24.no/${articleId}#hyvor-talk-view" class="reaction-button reaction">${reactionsCount}</a> 
        </div>
        <div class="article-social-comments article-social-item">
            <a href="https://www.kode24.no/${articleId}#hyvor-talk-view" class="reaction-button comment">${commentCount}</a> 
        </div>
    </div>
    <div class="article-social-tags article-social-item">
        ${tagsList
          .slice(0, 2)
          .map(
            (tag) =>
              `<a class="social-tag" href="https://www.kode24.no/emne/${tag}">#${tag}</a>`
          )
          .join("")}
    </div>
    `;
  return newElement;
}
