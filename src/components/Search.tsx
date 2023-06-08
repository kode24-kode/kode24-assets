import { Article } from '../types';
import { useState } from 'react';
import ArticleTile from './ArticleTile.tsx';

export default function Search() {
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingSearch, setLoadingSearch] = useState(false);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resetSearch();
    }
  });

  window.addEventListener('click', (e) => {
    console.log(e.target);
  });

  function resetSearch() {
    setSearchResults([]);
    setSearchQuery('');
  }

  async function searchForArticles(value: string | undefined) {
    setSearchResults([]);
    setLoadingSearch(true);
    const response = await fetch(
      `https:/functions.kode24.no/api/search/${value || searchQuery}`
    );
    const data = await response.json();
    setSearchResults(
      data.map(
        (SearchItem: any) =>
          ({
            id: '',
            title: SearchItem.title,
            published: SearchItem.published,
            published_url: SearchItem.published_url,
            image: SearchItem.image,
            frontCropUrl: `?imageId=${SearchItem.image}`,
            byline: {
              name:
                SearchItem.full_bylines[0]?.firstname +
                ' ' +
                SearchItem.full_bylines[0]?.lastname,
              imageUrl: SearchItem.full_bylines[0]?.imageUrl,
            },
            reactions: {
              reactions: [1],
              comments_count: 0,
              reactions_count: 0,
            },
          } as Article)
      )
    );
    setLoadingSearch(false);
  }
  // updates search results on every keypress
  // and searches if the query is longer than 3 characters
  // and timeouts the search if the user stops typing
  let timeout: any = undefined;
  function autoSearch(value: string) {
    setSearchQuery(value);
    clearTimeout(timeout);
    if (value.length > 3) {
      console.log('going in here', value);
      timeout = setTimeout(() => {
        console.log('searching', value);
        searchForArticles(value);
      }, 500);
    }
  }
  return (
    <form
      id="search-component"
      onSubmit={(e) => {
        e.preventDefault();
        searchForArticles(searchQuery);
      }}
    >
      <input
        placeholder="Søk etter.."
        type="search"
        value={searchQuery}
        onChange={(e) => autoSearch(e.target.value)}
      />
      <button
        aria-label="search button"
        title="search button"
        id="search-button"
        onClick={(e) => {
          e.preventDefault();
          searchForArticles(searchQuery);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
      {searchResults.length === 0 && loadingSearch && (
        <div id="article-search-results">
          <div
            id="article-search-cover"
            onClick={() => resetSearch()}
          ></div>
          <h2 id="article-search-header">
            Søker etter "{searchQuery}"...
          </h2>
        </div>
      )}
      {searchResults.length > 0 && (
        <div id="article-search-results">
          <div
            id="article-search-cover"
            onClick={() => resetSearch()}
          ></div>
          <h2 id="article-search-header">
            Søkeresultater {searchQuery}
            <span id="article-search-results-count">
              ({searchResults.length})
            </span>
          </h2>
          <ul id="search-results-list">
            {searchResults.map((article: Article, key: number) => (
              <li key={key}>
                <ArticleTile Article={article} isHot={false} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
