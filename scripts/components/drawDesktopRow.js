/**
 * Created dummy ad element for showing while loading job ads
 * creates a dummy element
 * returns a container for ads to replace
 * @param {*} selector
 */
import { shuffleArray } from "../functions/shuffleArray";
export const initDesktopRowLoading = (numberOfElements = 0) => {
  let element = document.createElement("div");
  element.innerHTML = ``;
  return element;
};

/**
 * Takes a node and fills it with frontpage articles
 * @param {*} desktopRowNode
 * @param {*} param1
 */
export const initDesktopRow = (
  desktopRowNode,
  { latestArticles, frontpage, listing, content, events, partners }
) => {
  let iterator = 1;
  let newMarkup = "";

  // shuffle content ads before presentation
  shuffleArray(content);

  // get list of premium Ids and shuffle them
  let lists = listing.premiumIds;
  let premiumAds = shuffleArray(
    listing.listings.filter((listing) => lists.includes(listing.id))
  );
  // The main loop for drawing articles
  while (latestArticles.length > 0 && iterator < 50) {
    // we can draw a full row
    if (latestArticles.length >= 3) {
      newMarkup += drawDesktopRow({
        articles: latestArticles.splice(0, 3),
        layout: iterator === 1 ? "main-story-with-two-vertical" : undefined,
        showDate: true,
      });
    } else if (latestArticles.length > 0) {
      newMarkup += drawDesktopRow({
        articles: latestArticles.splice(0),
        showDate: true,
      });
    }
    if (iterator >= 2 && frontpage.length > 0) {
      let frontPageRow = frontpage.splice(0, 1)[0];
      frontPageRow.layout = undefined;
      newMarkup += drawDesktopRow(frontPageRow);
    }
    if (iterator % 2 === 0) {
      // start drawing commercial content
      if (content.length > 0) {
        if (content.length > 3) {
          newMarkup += drawDesktopRow({
            title: "Fra våre annonsører",
            articles: content.splice(0, 3),
            style: "commercial",
          });
        } else {
          newMarkup += drawDesktopRow({
            title: "Fra våre annonsører",
            articles: content.splice(0),
            style: "commercial",
          });
        }
      } else if (premiumAds.length > 0) {
        if (premiumAds.length > 3) {
          newMarkup += drawDesktopRow({
            title: "Ledige stillinger",
            articles: premiumAds.splice(0, 3),
            style: "commercial",
            lenke: "/jobb",
          });
        } else {
          newMarkup += drawDesktopRow({
            title: "Ledige stillinger",
            articles: premiumAds.splice(0),
            style: "commercial",
            lenke: "/jobb",
          });
        }
      }
    }
    iterator++;
  }

  desktopRowNode.innerHTML = `<div id="desktop-row-list">${newMarkup}</div>`;
};

function getRandomView(articlesLength = 0) {
  const views = {
    1: ["single"],
    2: ["dual"],
    3: ["main-story-with-two-vertical", "triple"],
    4: ["main-story-with-two-vertical", "triple"],
    5: [
      "main-story-with-two-vertical",
      "triple",
      "main-story-with-vertical-list",
    ],
    6: [
      "main-story-with-two-vertical",
      "triple",
      "main-story-with-vertical-list",
    ],
  };
  if (!articlesLength) return "";
  return views[articlesLength][
    Math.floor(Math.random() * views[articlesLength].length)
  ];
}

function drawDesktopRow(articlesData) {
  if (articlesData)
    return `
    <div class="row desktop-row ${articlesData.style}">
      <div class="heading">
        ${
          articlesData.title
            ? `<h2 class="heading-title">${articlesData.title}</h2>`
            : ""
        }
        ${
          articlesData.description
            ? `<p class="heading-description">${articlesData.description}</p>`
            : ""
        }
        ${
          articlesData.lenke
            ? `<a href="https://www.kode24.no${articlesData.lenke}" target="_blank" class="button">Se alle</a>`
            : ""
        }
      </div>
      <div class="${
        articlesData.layout
          ? articlesData.layout
          : getRandomView(articlesData.articles.length)
      }">
      ${articlesData.articles
        .map((article, index) =>
          articlesData.style === "commercial"
            ? drawDesktopAd(article)
            : drawDesktopArticle(article, true, articlesData.showDate)
        )
        .join("")}
      </div>
    </div>
  `;
  return ``;
}

const figureComponent = (article) => {
  return `
          <figure class="">
          <img
            class=""
            itemprop="image"
            alt="image: ${article.title}"
            src="${`https://www.kode24.no/images/${article.image}.jpg${article.frontCropUrl}`}"
            
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
            }" loading="lazy" alt="byline name ${article.byline.name}">
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

          ${
            article.reactions.reactions_count > 0
              ? `<div class="article-social-reactions article-social-item">
            <a href="https://www.kode24.no/${
              article.id
            }#hyvor-talk-view" class="reaction-button reaction">
              ${
                article.reactions.reactions_count
                  ? article.reactions.reactions_count
                  : ""
              }
            </a>
          </div>`
              : ""
          }
          ${
            article.reactions.comments_count > 0
              ? `<div class="article-social-comments article-social-item">
            <a href="https://www.kode24.no/${
              article.id
            }#hyvor-talk-view" class="reaction-button comment">
              ${
                article.reactions.comments_count
                  ? article.reactions.comments_count
                  : ""
              }
            </a>
          </div>`
              : ""
          }



        </div>
        `
            : ""
        }
      </div>
  `;
};

const drawDesktopArticle = (article, socialToggle, timeToggle) => {
  // check if article is today
  let articleIsToday =
    new Date(article.published).setHours(0, 0, 0, 0) ==
    new Date().setHours(0, 0, 0, 0)
      ? true
      : false;

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
              src="${`https://www.kode24.no/images/${article.image}.jpg${article.frontCropUrl}&width=650`}"
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
                    ? `I dag, ${new Intl.DateTimeFormat("no-NB", {
                        timeStyle: "short",
                        timeZone: "Europe/Oslo",
                      }).format(new Date(article.published))}`
                    : `
            ${new Intl.DateTimeFormat("no-NB", {
              weekday: "long",
              month: "long",
              day: "numeric",
              timeZone: "Europe/Oslo",
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
          ${socialToggle ? socialComponent(article) : ""}
        </div>
        ${!socialToggle ? socialComponent(article) : ""}
      </div>

    </article>
  `;
};

const drawDesktopAd = (content) => {
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
          </a>
          <div class="article-social">
            <div class="byline-row">
              <div class="byline-profile-image">
                <img src="https://www.kode24.no/images${
                  content.company.imageUrl
                }" loading="lazy" alt="company name ${content.company.name}">
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
