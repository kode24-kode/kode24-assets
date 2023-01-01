/**
 * Created dummy ad element for showing while loading job ads
 * creates a dummy element
 * returns a container for ads to replace
 * @param {*} selector
 */
export const initDesktopRowLoading = (numberOfElements = 0) => {
  let element = document.createElement('div');
  element.innerHTML = `<div class="row desktop-rowadded">`;
  return element;
};
export const initDesktopRow = (
  desktopRowNode,
  articlesSectionsData
) => {
  desktopRowNode.innerHTML = articlesSectionsData
    .map((articleData) => drawDesktopRow(articleData))
    .join('');
};

function drawDesktopRow(articlesData) {
  console.log('articlesData', articlesData);
  let articlesGrid = 'multiple';
  if (articlesData.articles.length < 2) articlesGrid = 'single';
  if (articlesData.articles.length == 2) articlesGrid = 'dual';
  return `
    <div class="row desktop-row ${articlesData.style}">
      <div class="heading">
        <h2 class="heading-title">${articlesData.title}</h2>
        ${
          articlesData.description
            ? `<p class="heading-description">${articlesData.description}</p>`
            : ''
        }
      </div>
      <div class="${articlesGrid} ${articlesData.layout}">
      ${articlesData.articles
        .map(
          (article, index) => `
        <article
              id="article_${article.id}"
              class="preview columns large-12 small-12 medium-12 compact"
              itemscope
              itemprop="itemListElement"
              itemtype="https://schema.org/ListItem"
              role="article"
              data-id="${article.id}"
              data-label=""
            >
              <a
                itemprop="url"
                href="${article.published_url}"
              >
                <figure class="">
                  <img
                    class=""
                    itemprop="image"
                    alt="image: ${article.title}"
                    src="${`https://www.kode24.no/images/${article.image}.jpg?imageId=${article.image}&width=1000&compression=80`}"
                  />
                </figure>

                <div class="article-preview-text">
                  <h1 class="headline">
                    <span class="headline-title-wrapper">
                      ${article.title}
                    </span>
                  </h1>

                  <p class="standfirst">
                    ${article.subtitle}
                  </p>

                  <time
                    itemprop="datePublished"
                    data-from-now
                    class="published"
                    datetime="${article.published}"
                    title="${article.published}"
                    >${article.published}</time
                  >
                </div>
              </a>
              <div class="article-social">
                <div class="byline-row">
                <div class="byline-profile-image">
                  <img src="https://www.kode24.no/images${
                    article.byline.imageUrl
                  }" loading="lazy">
                </div>
                <div class="byline-info">
                  <div class="byline-name">${
                    article.byline.name
                  }</div>
                  <div class="byline-bio">${article.byline.bio}</div>
                </div>
            </div>

            <div class="social-buttons">
                <div class="article-social-reactions article-social-item">
                    <a href="https://www.kode24.no/${
                      article.id
                    }#hyvor-talk-view" class="reaction-button reaction">${
            article.reactions.reactions_count
              ? article.reactions.reactions_count
              : ''
          }</a>
                </div>
                <div class="article-social-comments article-social-item">
                    <a href="https://www.kode24.no/${
                      article.id
                    }#hyvor-talk-view" class="reaction-button comment">${
            article.reactions.comments_count
              ? article.reactions.comments_count
              : ''
          }</a>
                </div>
            </div>
            <div class="article-social-tags article-social-item">
                  ${article.tags
                    .split(', ')
                    .filter((tag) => tag !== 'artikkel')
                    .slice(0, 2)
                    .map(
                      (tag) =>
                        `<a class="social-tag" href="https://www.kode24.no/emne/${tag}">#${tag}</a>`
                    )}
            </div>
          </div>
        </article>

      `
        )
        .join('')}
      </div>
    </div>
  `;

  return row;
}
