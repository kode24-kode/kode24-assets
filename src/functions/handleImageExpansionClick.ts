/**
 * Toggles expansion of images in article
 */
export function handleImageExpansionClick() {
  document
    .querySelectorAll('figure[data-image-lightbox]')
    .forEach(function (element) {
      element.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();

        let el = event.target as HTMLElement;

        // somehow it becomes the child when clicked
        if (!el?.hasAttribute('data-options')) {
          el = el.parentElement as HTMLElement;
        }

        if (!el.classList.contains('active')) {
          const imageUrl = el
            ?.getAttribute('data-options')
            ?.replace('src:', '');
          el.style.backgroundImage = `url(${imageUrl})`;
          el.style.backgroundSize = `contain`;
        } else {
          el.style.backgroundSize = `0`;
        }
        el.classList.toggle('active');
      });
    });
}
