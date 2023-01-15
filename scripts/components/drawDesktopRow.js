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
  return `
    <div class="row desktop-row ${articlesData.style}">
      <div class="heading">
        <h2 class="heading-title">${articlesData.title}</h2>
        ${
          articlesData.description
            ? `<p class="heading-description">${articlesData.description}</p>`
            : ''
        }
        <a href="https://www.kode24.no${
          articlesData.lenke
        }" target="_blank" class="button">Se alle</a>
      </div>
      <div class="${
        articlesData.layout ? articlesData.layout : 'multiple'
      }">
      ${articlesData.articles
        .map((article, index) =>
          articlesData.style === 'commercial'
            ? drawDesktopAd(
                article,
                articlesData.layout.includes('list')
              )
            : drawDesktopArticle(
                article,
                articlesData.layout.includes('list')
              )
        )
        .join('')}
      </div>
    </div>
  `;
}

const figureComponent = (article) => {
  return `
          <figure class="">
          <img
            class=""
            itemprop="image"
            alt="image: ${article.title}"
            src="${`https://www.kode24.no/images/${article.image}.jpg?imageId=${article.image}&width=1000&compression=80`}"
          />
        </figure>
  `;
};

const socialComponent = (article) => {
  return `
  <div class="article-social">
        <div class="byline-row">
          <div class="byline-profile-image">
            <img src="https://www.kode24.no/images${
              article.byline.imageUrl
            }" loading="lazy">
          </div>
          <div class="byline-info">
            <div class="byline-name">${article.byline.name}</div>
            <div class="byline-bio">${article.byline.bio}</div>
          </div>
        </div>
        <div class="social-buttons">
          <div class="article-social-reactions article-social-item">
            <a href="https://www.kode24.no/${
              article.id
            }#hyvor-talk-view" class="reaction-button reaction">
              ${
                article.reactions.reactions_count
                  ? article.reactions.reactions_count
                  : ''
              }
            </a>
          </div>
          <div class="article-social-comments article-social-item">
            <a href="https://www.kode24.no/${
              article.id
            }#hyvor-talk-view" class="reaction-button comment">
              ${
                article.reactions.comments_count
                  ? article.reactions.comments_count
                  : ''
              }
            </a>
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
              )
              .join('')}
        </div>
      </div>
  `;
};

const drawDesktopArticle = (article, socialToggle) => {
  console.log('article', article);
  return `
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
      <div class="article-content-wrapper">
        <a
        itemprop="url"
        href="https://www.kode24.no${article.published_url}"
      >
          <figure class="">
            <img
              class=""
              itemprop="image"
              alt="image: ${article.title}"
              src="${`https://www.kode24.no/images/${article.image}.jpg?imageId=${article.image}&width=1000&compression=80`}"
            />
          </figure>
        </a>
        <div class="article-preview-text">
          <a
            itemprop="url"
            href="https://www.kode24.no${article.published_url}"
          >
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
            >
              ${article.published}
            </time>
          </a>
          ${socialToggle ? socialComponent(article) : ''}
        </div>
        ${!socialToggle ? socialComponent(article) : ''}
      </div>

    </article>
  `;
};

const drawDesktopAd = (content) => {
  console.log('content', content);
  return `
    <article
    id="article_${content.id}"
    class="preview columns large-12 small-12 medium-12 compact commercial-content"
    itemscope
    itemprop="itemListElement"
    itemtype="https://schema.org/ListItem"
    role="content"
    data-id="${content.id}"
    data-label=""
    >
      <div class="article-content-wrapper">
        <a
        itemprop="url"
        href="https://www.kode24.no${content.published_url}"
        >
          <figure class="">
            <img
              class=""
              itemprop="image"
              alt="image: ${content.title}"
              src="${`https://www.kode24.no/images/${content.image}.jpg?imageId=${content.image}&width=1000&compression=80`}"
            />
          </figure>
        </a>
        <div class="article-preview-text">
          <a
          itemprop="url"
          href="https://www.kode24.no${content.published_url}"
          >
            <p class="company-name">
              Annonsørinnhold
            </p>
            <h1 class="headline">
              <span class="headline-title-wrapper">
                ${content.title}
              </span>
            </h1>



            <time
              itemprop="datePublished"
              data-from-now
              class="published"
              datetime="${content.published}"
              title="${content.published}"
            >
              ${content.published}
            </time>
          </a>
          <div class="article-social">
            <div class="byline-row">
              <div class="byline-profile-image">
                <img src="https://www.kode24.no/images${
                  content.company.imageUrl
                }" loading="lazy">
              </div>
              <div class="byline-info">
                <div class="byline-name">${content.company.name}</div>
                <div class="byline-bio">${content.company.bio}</div>
              </div>
            </div>
          </div>
      </div>
    </article>
  `;
};
