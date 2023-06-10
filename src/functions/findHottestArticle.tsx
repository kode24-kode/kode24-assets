/**
 * Takes a frontpagerow and determines if one of the articles should be defined as hot
 * based on a threshold of reactions and comments
 * returns the id of the row if anything is hot, otherwise returns false
 */
import { DesktopRow, Article } from '../types';

interface HottestArticle {
  id: string;
  hotness: number;
}

export function findHottestArticle(
  desktopRow: DesktopRow,
  threshold: [number, number]
) {
  // adding four to comments to even out the difference between reactions and comments
  const matchedArticles: HottestArticle[] = desktopRow.articles
    .filter(
      (article: Article) =>
        article.reactions.reactions_count >= threshold[0] ||
        article.reactions.comments_count >= threshold[1]
    )
    .map((article: Article) => ({
      id: article.id,
      hotness:
        article.reactions.reactions_count +
        article.reactions.comments_count * 4,
    }))
    .sort(
      (a: HottestArticle, b: HottestArticle) => b.hotness - a.hotness
    );
  if (matchedArticles.length > 0) return matchedArticles[0].id;
  return false;
}
