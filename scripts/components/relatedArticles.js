import { getArticlesByTag } from '../API/api';
/**
 * Fetches articles from the API based on a tag
 * draws related articles markup for article
 * and adds it to given selector
 * @param {*} selector
 */
export async function initRelatedArticles(
  tagsString,
  selector,
  articleId
) {
  let tag =
    tagsString.split(', ').filter((tag) => tag !== 'artikkel')[0] ||
    'nyheter';

  // fetch articles with tag
  let relatedArticles = await getArticlesByTag(tag);
  // make sure the article we are on is not included
  relatedArticles = relatedArticles.filter(
    (article) => article.id !== articleId
  );

  // create related articles collection element
  let relatedArticlesCollection = document.createElement('div');
  relatedArticlesCollection.classList.add('related');
  relatedArticlesCollection.innerHTML = `
    <h2>Relaterte saker tagget med ${tag}</h2>
    ${getRelatedArticlesMarkup(relatedArticles)}
  `;
  // add related articles collection to page
  document.querySelector(selector).append(relatedArticlesCollection);
}

/**
 * Markup for related article
 * basically the same as a preview tile on the front page
 * @param {*} articles
 * @returns
 */
function getRelatedArticlesMarkup(articles) {
  return `
        ${articles
          .map(
            (article) => `
            <div class="row">
          <article id="article_${article.id}" class="preview job-aside-preview" itemscope itemprop="itemListElement" itemType="http://schema.org/ListItem" data-id="${article.id}">
              <a itemprop="url" href="//www.kode24.no/${article.published_url}">
                  <figure id="${article.id}">
                      <img src="//www.kode24.no/images/${article.image}.jpg?width=400" loading="lazy" />
                  </figure>
                  <div class="article-preview-text">
                      <h1 class="headline">${article.title}</h1>
                      <p class="standfirst">${article.subtitle}</p>
                  </div>
              </a>
          </article>
          </div>
      `
          )
          .join('')}
    `;
}
