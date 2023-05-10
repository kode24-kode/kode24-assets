/**
 * Created dummy ad element for showing while loading job ads
 * creates a dummy element
 * returns a container for ads to replace
 * @param {*} selector
 */
import { shuffleArray } from '../functions/shuffleArray';
import { initReactionIcon } from './reactionIcons';
import { initCommentIcon } from './commentIcon';
export const initDesktopRowLoading = (numberOfElements = 0) => {
  let element = document.createElement('div');
  element.innerHTML = `


  <div class="row desktop-row undefined first-row">
      <div class="heading">
      </div>
      <div class="main-story-with-two-vertical dummy-desktop-row">
        <div class="preview dummy-article">
          <div class="dummy-image dummy-style"></div>
          <div class="dummy-time dummy-style"></div>
          <div class="dummy-title dummy-style"></div>
          <div class="dummy-social">
            <div class="dummy-byline dummy-style">
              <div class="dummy-byline-image"></div>
              <div class="dummy-byline-title"></div>
            </div>
          </div>
        </div>
        <div class="preview dummy-article">
          <div class="dummy-image dummy-style"></div>
          <div class="dummy-time dummy-style"></div>
          <div class="dummy-title dummy-style"></div>
          <div class="dummy-social">
            <div class="dummy-byline dummy-style">
              <div class="dummy-byline-image"></div>
              <div class="dummy-byline-title"></div>
            </div>
          </div>
        </div>
        <div class="preview dummy-article">
          <div class="dummy-image dummy-style"></div>
          <div class="dummy-time dummy-style"></div>
          <div class="dummy-title dummy-style"></div>
          <div class="dummy-social">
            <div class="dummy-byline dummy-style">
              <div class="dummy-byline-image"></div>
              <div class="dummy-byline-title"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

  `;
  return element;
};

/**
 *
 * @param {*} param0
 * @param {*} articlesAboveFirstBanner
 * @param {*} articlesBelowFirstBanner
 * @param {*} articlesBelowSecondBanner
 */
export const initDesktopRow = (
  { latestArticles, frontpage, listing, content, events, partners },
  articlesAboveFirstBanner,
  articlesBelowFirstBanner,
  articlesBelowSecondBanner
) => {
  let iterator = 1;
  let newMarkup = '';

  // is set when third row is drawn. We try to draw it after page loads
  let toggledThirdRow = false;

  // shuffle content ads before presentation
  shuffleArray(content);

  // get list of premium Ids and shuffle them
  let lists = listing.premiumIds;
  let premiumAds = shuffleArray(
    listing.listings.filter((listing) => lists.includes(listing.id))
  );

  // Start by adding first row
  articlesAboveFirstBanner.innerHTML = `
      ${drawDesktopRow(
        {
          articles: latestArticles.splice(0, 3),
          layout: 'main-story-with-two-vertical',
          showDate: true,
        },
        true,
        [20, 5]
      )}
    `;

  let secondRowMarkup = ``;
  secondRowMarkup += drawDesktopRow(
    {
      articles: latestArticles.splice(0, 3),
      layout: 'main-story-with-two-vertical',
      showDate: true,
    },
    false,
    [20, 5]
  );
  // start drawing commercial content
  if (content.length > 0) {
    secondRowMarkup += drawDesktopRow(
      {
        title: 'Fra våre annonsører',
        articles: content.splice(0, 3),
        style: 'commercial',
      },
      false,
      [100, 100]
    );
  } else if (premiumAds.length > 0) {
    secondRowMarkup += drawDesktopRow(
      {
        title: 'Ledige stillinger',
        articles: premiumAds.splice(0, 3),
        style: 'commercial',
        lenke: '/jobb',
      },
      false,
      [100, 100]
    );
  }
  if (frontpage.length > 0) {
    let frontPageRow = frontpage.splice(0, 1)[0];
    secondRowMarkup += drawDesktopRow(frontPageRow, false, [30, 8]);
  }
  articlesBelowFirstBanner.innerHTML = secondRowMarkup;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 2000) {
      if (!toggledThirdRow) {
        toggledThirdRow = true;

        let thirdRowMarkup = ``;

        // The main loop for drawing articles
        while (latestArticles.length > 0 && iterator < 50) {
          if (iterator % 2 !== 0) {
            thirdRowMarkup += drawDesktopRow(
              {
                articles: latestArticles.splice(0, 3),
                layout:
                  iterator === 1
                    ? 'main-story-with-two-vertical'
                    : undefined,
                showDate: true,
              },
              false,
              [40, 10]
            );
          } else {
            if (iterator > 2 && frontpage.length > 0) {
              let frontPageRow = frontpage.splice(0, 1)[0];
              thirdRowMarkup += drawDesktopRow(
                frontPageRow,
                false,
                [40, 10]
              );
            }
            // start drawing commercial content
            if (content.length > 0) {
              thirdRowMarkup += drawDesktopRow(
                {
                  title: 'Fra våre annonsører',
                  articles: content.splice(0, 3),
                  style: 'commercial',
                },
                false,
                [100, 100]
              );
            } else if (premiumAds.length > 0) {
              thirdRowMarkup += drawDesktopRow(
                {
                  title: 'Ledige stillinger',
                  articles: premiumAds.splice(0, 3),
                  style: 'commercial',
                  lenke: '/jobb',
                },
                false,
                [100, 100]
              );
            }
          }
          iterator++;
        }

        articlesBelowSecondBanner.innerHTML = thirdRowMarkup;
      }
    }
  });
};

function getRandomView(articlesLength = 0) {
  const views = {
    1: ['single'],
    2: ['dual'],
    3: ['main-story-with-two-vertical'],
    4: ['main-story-with-two-vertical'],
    5: [
      'main-story-with-two-vertical',
      'main-story-with-vertical-list',
    ],
    6: [
      'main-story-with-two-vertical',
      'main-story-with-vertical-list',
    ],
  };
  if (!articlesLength) return '';
  return views[articlesLength][
    Math.floor(Math.random() * views[articlesLength].length)
  ];
}

function drawDesktopRow(articlesData, firstRow, hotnessThreshold) {
  if (articlesData)
    return `
    <div class="row desktop-row ${articlesData.style} ${
      firstRow ? 'first-row' : ''
    }">
      <div class="heading">
        ${
          articlesData.title
            ? `<h2 class="heading-title">${articlesData.title}</h2>`
            : ''
        }
        ${
          articlesData.description
            ? `<p class="heading-description">${articlesData.description}</p>`
            : ''
        }
        ${
          articlesData.lenke
            ? `<a href="https://www.kode24.no${articlesData.lenke}" target="_blank" class="button">Se alle</a>`
            : ''
        }
      </div>
      <div class="${
        articlesData.layout
          ? articlesData.layout
          : getRandomView(articlesData.articles.length)
      }">
      ${articlesData.articles
        .map((article, index) =>
          articlesData.style === 'commercial'
            ? drawDesktopAd(article, index)
            : drawDesktopArticle(
                article,
                true,
                articlesData.showDate,
                index,
                hotnessThreshold
              )
        )
        .join('')}
      </div>
    </div>
  `;
  return ``;
}

const socialComponent = (article) => {
  return `
  <div class="article-social">
        <div class="byline-row">
          <div class="byline-profile-image">
            <img src="https://www.kode24.no/images${
              article.byline.imageUrl
            }" loading="lazy" alt="byline name ${
    article.byline.name
  }">
          </div>
          <div class="byline-info">
            <div class="byline-name">${article.byline.name}</div>
            <div class="byline-bio">${article.byline.bio}</div>
          </div>
        </div>${
          article.reactions.reactions_count > 0 ||
          article.reactions.comments_count > 0
            ? `
        <div class="social-buttons">
          ${initReactionIcon(article.reactions, article.id)}
          ${initCommentIcon(
            article.reactions.comments_count,
            article.id
          )}
        </div>
        `
            : ''
        }
      </div>
  `;
};

const drawDesktopArticle = (
  article,
  socialToggle,
  timeToggle,
  index,
  hotnessThreshold
) => {
  // check if article is today
  let isMainArticle = index === 0 ? true : false;
  let imageWidth = isMainArticle ? '960' : '400';
  const isHot =
    article.reactions.reactions_count >= hotnessThreshold[0] ||
    article.reactions.comments_count >= hotnessThreshold[1]
      ? true
      : false;
  let articleIsToday =
    new Date(article.published).setHours(0, 0, 0, 0) ==
    new Date().setHours(0, 0, 0, 0)
      ? true
      : false;

  return `
    <article
    id="article_${article.id}"
    class="preview columns large-12 small-12 medium-12 compact ${
      isHot ? 'hot' : ''
    }"
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
              loading="lazy"
              alt="image: ${article.title}"
              src="${`https://www.kode24.no/images/${
                article.image
              }.jpg${
                article.frontCropUrl
              }&width=${imageWidth}&height=${
                isMainArticle ? '600' : '250'
              }`}"
            />
          </figure>
        </a>
        <div class="article-preview-text">
          <a
            itemprop="url"
            href="https://www.kode24.no${article.published_url}"
          >
          ${
            timeToggle
              ? `
            <time class="published" datetime="${article.published}">${
                  articleIsToday
                    ? `I dag, ${new Intl.DateTimeFormat('no-NB', {
                        timeStyle: 'short',
                        timeZone: 'Europe/Oslo',
                      }).format(new Date(article.published))}`
                    : `
            ${new Intl.DateTimeFormat('no-NB', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              timeZone: 'Europe/Oslo',
            }).format(new Date(article.published))}`
                }
            </time>
          `
              : ``
          }

            <h1 class="headline">
              <span class="headline-title-wrapper">
                ${article.title}
              </span>
            </h1>
          </a>
          ${socialToggle ? socialComponent(article) : ''}
        </div>
        ${!socialToggle ? socialComponent(article) : ''}
      </div>

    </article>
  `;
};

const drawDesktopAd = (content, index) => {
  let isMainArticle = index === 0 ? true : false;
  let imageWidth = isMainArticle ? '900' : '400';
  return `
    <article
    id="article_${content.id}"
    class="preview columns large-12 small-12 medium-12 compact commercial-content"
    itemscope
    itemprop="itemListElement"
    itemtype="https://schema.org/ListItem"
    role="article"
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
              loading="lazy"
              itemprop="image"
              alt="image: ${content.title}"
              src="${`https://www.kode24.no/images/${content.image}.jpg?imageId=${content.image}&width=${imageWidth}&compression=80`}"
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
          </a>
          <div class="article-social">
            <div class="byline-row">
              <div class="byline-profile-image">
                <img src="https://www.kode24.no/images${
                  content.company.imageUrl
                }" loading="lazy" alt="company name ${
    content.company.name
  }">
              </div>
              <div class="byline-info">
                <div class="byline-name">${content.company.name}</div>
              </div>
            </div>
          </div>
      </div>
    </article>
  `;
};
