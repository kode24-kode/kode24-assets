export function initCommentIcon(commentCount, articleId) {
  if (commentCount < 1) return ``;
  return `
        <div class="article-social-reactions article-social-item">            
            <a href="https://www.kode24.no/${articleId}#hyvor-talk-view" class="reaction-button reaction">
                <span class="reaction-icons-summary" aria-hidden="true">${getCommentIcon()}</span>
                <span class="reaction-count">${commentCount}</span>
            </a>
        </div>
    `;
}

function getCommentIcon() {
  return `
    <svg class="reaction-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
  `;
}
