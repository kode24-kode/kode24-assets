/**
 * Listens to clicks on hamburger menu in mobile view
 * and handles interaction
 */
export function handleHamburgerMenuClick() {
  if (
    document.getElementById('top-menu-left-menu-link') &&
    document.getElementById('top-menu-left-menu-link')
      ?.addEventListener
  ) {
    document
      .getElementById('top-menu-left-menu-link')
      ?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        document
          .getElementById('left-menu')
          ?.classList.toggle('active');
      });
  }
}
