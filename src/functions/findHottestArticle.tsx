/**
 * Takes a frontpagerow and determines if one of the articles should be defined as hot
 * based on a threshold of reactions and comments
 * returns the id of the row if anything is hot, otherwise returns false
 */
import { DesktopRow, Article } from '../types';

export function findHottestArticle(
  desktopRow: DesktopRow,
  threshold: [number, number]
) {
  // adding four to comments to even out the difference between reactions and comments
  const matchedArticles: any = desktopRow.articles
    .filter(
      (article: Article) =>
        article.reactions.reactions_count >= threshold[0] ||
        article.reactions.reactions_count >= threshold[1]
    )
    .map((article: Article) => ({
      id: article.id,
      hotness:
        article.reactions.reactions_count +
        article.reactions.comments_count * 4,
    }));

  console.log('hotness', matchedArticles);
  return false;
}
