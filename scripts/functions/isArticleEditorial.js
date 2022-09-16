/**
 * Check if article is commercial
 */
export function isArticleEditorial() {
  if (document.querySelector(".article-entity.artikkel")) return true;
  return false;
}
