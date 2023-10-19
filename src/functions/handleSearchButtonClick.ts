/**
 * Listens to clicks on search button in mobile view
 * and handles interaction
 */
export function handleSearchButtonClick() {
  if (
    document.getElementById('search-button-mobile') &&
    document.getElementById('search-button-mobile')?.addEventListener
  ) {
    document
      .getElementById('search-button-mobile')
      ?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSearchComponent();
      });
  }
}

export function toggleSearchComponent() {
  document
    .getElementById('search-component')
    ?.classList.toggle('active');
}
