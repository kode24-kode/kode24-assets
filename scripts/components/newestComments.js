export function initNewestComments(comments) {
  console.log(comments);
  const firstBanner = document.querySelectorAll(
    '.show-for-medium-up'
  )[0];
  const newestCommentsNode = document.createElement('div');
  newestCommentsNode.classList.add(
    'newest-comments',
    'social-component',
    'desktop-row',
    'card'
  );
  newestCommentsNode.innerHTML = `
    <div class="heading">
        <h2 class="heading-title">Nyeste kommentarer</h2>
      </div>
    <ul class="newest-comments-list">
      ${comments
        .map(
          (comment) => `
        <li class="comment-container">
          <a href="${comment.url}" class="comment-link">
            <div class="avatar"><img src="${comment.user.picture}" /></div>
            <div class="comment">
              <div class="comment-description">
                <span class="comment-author">${comment.user.name}:</span>
                <span class="comment-text">${comment.bodySnippet}</span>
              </div>
              <div class="comment-meta">${comment.created_at}</div>
            </div>
          </a>
        </li>
      `
        )
        .join('')}
    </ul>`;
  firstBanner.prepend(newestCommentsNode);
}
