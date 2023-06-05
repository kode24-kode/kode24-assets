/**
 * Finds all articles on front and returns an array of article ids
 * and all the nodes
 * @returns
 */
export function getArticlePreviewList() {
  let articlesList = document.querySelectorAll(
    "#front-articles-list article.preview.columns:not(.native-advertisement)"
  );
  const articleIds = [...articlesList]
    .filter((node) => node && node.id)
    .map((node) => node.id.replace("article_", ""));
  return {
    articlesList,
    articleIds,
  };
}
