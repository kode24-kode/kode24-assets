import { getSearchData } from "../API/api";

// Handles inline search in the topbar of kode24
export function initInlineSearch() {
  let searchForm = document.createElement("form");
  searchForm.id = "search-component";
  let searchInput = document.createElement("input");
  searchInput.setAttribute("placeholder", "Søk etter..");
  searchInput.type = "search";
  let searchButton = document.createElement("button");
  searchButton.setAttribute("aria-label", "search button");
  searchButton.setAttribute("title", "search button");
  searchButton.id = "search-button";
  searchButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;

  searchForm.append(searchInput);
  searchForm.append(searchButton);

  let navTop = document.getElementById("nav-top");

  navTop ? navTop.append(searchForm) : null;

  window.inputTimeout = false;
  searchInput.addEventListener("input", (e) =>
    handleInlineSearchEvent(e, inputTimeout)
  );
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
  document.addEventListener("click", (event) => {
    let searchResultsElement = document.getElementById("search-component");
    let searchResults = document.getElementById("article-search-results");
    if (
      searchResultsElement &&
      searchResults &&
      !searchResultsElement.contains(event.target)
    ) {
      event.preventDefault();
      event.stopPropagation();
      removeSearchResults();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      removeSearchResults();
    }
  });

  // listen to click on search toggle button on mobile
  document
    .getElementById("search-button-mobile")
    .addEventListener("click", (e) => {
      document.getElementById("search-component").classList.toggle("active");
    });
}

function handleInlineSearchEvent(e) {
  e.preventDefault();
  e.stopPropagation();
  clearTimeout(window.inputTimeout);
  if (e.target.value) {
    window.inputTimeout = setTimeout(() => initSearch(e.target.value), 500);
    return;
  }
  removeSearchResults();
}

function removeSearchResults() {
  if (document.getElementById("article-search-results"))
    document.getElementById("article-search-results").remove();
}

async function initSearch(searchValue) {
  // before we get data we need to draw the dummy content
  let searchBox = drawSearchBox(searchValue);
  let dummySearchItems = drawDummySearchItems(searchBox);
  let searchData = await getSearchData(searchValue);
  searchData = searchData.map((data) => ({
    ...data,
    publishedDate: new Date(data.published),
  }));
  dummySearchItems.remove();
  document.getElementById("search-loader").remove();
  addSearchItemsCountToCounter(searchData.length);
  drawSearchItems(searchData, searchBox);
}

function drawSearchBox(searchValue) {
  if (document.getElementById("article-search-results"))
    document.getElementById("article-search-results").remove();
  let newDomElement = document.createElement("div");
  newDomElement.id = "article-search-results"; // always make sure the div has this id
  newDomElement.innerHTML = `
  <div>
    <h2 id="article-search-header">Søkeresultater "${searchValue}" <span id="search-loader" class="loader"></span><span id="article-search-results-count"></span>
    </h2>`;
  document.getElementById("search-component").appendChild(newDomElement);
  return newDomElement;
}

function drawDummySearchItems(searchBox) {
  if (document.getElementById("search-results-list-dummy"))
    document.getElementById("search-results-list-dummy").remove();
  let newDomElement = document.createElement("div");
  newDomElement.id = "search-results-list-dummy";
  let items = [1, 2, 3]; // Draw three dummy items
  if (items.length) {
    newDomElement.innerHTML = `
        <ul id="search-results-list-dummy">
          ${items
            .map(
              (item) =>
                `<li class="preview">
                  <a target="new_window" href="#">
                    <figure class=""></figure>
                    <div class="article-preview-text">
                      <h1 class="headline"><span class="headline-title-wrapper"></span></h1>
                      <time
                        itemprop="datePublished"
                        data-from-now=""
                        class="published"
                        datetime="2022-07-04T05:00:00+02:00"
                        title=""
                      ></time>
                      <div class="byline-row">
                        <div class="byline-profile-image"></div>
                        <div class="byline-info">
                          <div class="byline-name"></div>
                          <div class="byline-bio"></div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>`
            )
            .join("")}
        </ul>
    `;
  }
  searchBox.appendChild(newDomElement);
  return newDomElement;
}

function addSearchItemsCountToCounter(itemsCount) {
  if (document.getElementById("article-search-results-count")) {
    let doc = document.getElementById("article-search-results-count");
    doc.innerHTML = `(${itemsCount})`;
  }
}

function drawSearchItems(items, searchBox) {
  if (document.getElementById("search-results-list"))
    document.getElementById("search-results-list").remove(); // allways remove old lists
  let newDomElement = document.createElement("div");
  newDomElement.id = "search-results-list";
  if (items.length) {
    newDomElement.innerHTML = `
        <ul id="search-results-list">
          ${items
            .map(
              (item) =>
                `<li class="preview">
                  <a target="new_window" href="https://www.kode24.no${
                    item.published_url
                  }">
                  <figure class="">
                  <img class="" itemprop="image" alt="" src="https://www.kode24.no/images/${
                    item.image
                  }.jpg?width=400" loading="lazy">

                  </figure>
                  <div class="article-preview-text">
                    <h1 class="headline ">
                      <span class="headline-title-wrapper">
                        ${item.title}
                      </span>
                    </h1>
                    <time itemprop="datePublished" data-from-now="" class="published" datetime="${
                      item.published
                    }" title="">${item.publishedDate.getDate()}-${
                  item.publishedDate.getMonth() + 1
                }-${item.publishedDate.getFullYear()}</time>
                    ${
                      !!item.full_bylines.length &&
                      `
                      <div class="byline-row">
                        <div class="byline-profile-image">
                          <img src="https://www.kode24.no/images${item.full_bylines[0].imageUrl}" loading="lazy">
                        </div>
                        <div class="byline-info">
                          <div class="byline-name">${item.full_bylines[0].firstname} ${item.full_bylines[0].lastname}</div>
                          <div class="byline-bio">${item.full_bylines[0].bio}</div>
                        </div>
                      </div>
                    `
                    }
                  </div>
                  </a>
                </li>`
            )
            .join("")}
        </ul>
    `;
  } else {
    newDomElement.innerHTML = `
      <div>
          <p>Ingen resultater for dette søket</p>
        </div>
    `;
  }

  searchBox.appendChild(newDomElement);
}
