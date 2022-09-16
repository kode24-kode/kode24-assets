/**
 * Listens to clicks on hamburger menu in mobile view
 * and handles interaction
 */
export function handleHamburgerMenuClick() {
  document
    .getElementById('top-menu-left-menu-link')
    .addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      document.getElementById('left-menu').classList.toggle('active');
    });
}
