/**
 * Attempts to grab articleId from either meta-tags or url
 * @returns articleId
 */
export function getArticleId() {
  const articleUrl =
    document
      ?.querySelector('.article-entity meta:first-child')
      ?.getAttribute('content') || window.location.href;
  return articleUrl
    .split('?')[0]
    .split('/')
    .filter((val) => val !== '')
    .pop();
}
