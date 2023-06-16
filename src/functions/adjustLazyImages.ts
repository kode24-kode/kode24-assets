import { upscaleLabradorImagesinSrcSet } from './upscaleLabradorImagesinSrcSet';
// select all elements with data attribute data-srcset and place the value of that attribute into the srcset attribute
export function adjustLazyImages() {
  const lazyImages = document.querySelectorAll('[data-srcset]');
  lazyImages.forEach((image) => {
    if (image.getAttribute('data-srcset')) {
      image.setAttribute(
        'srcset',
        upscaleLabradorImagesinSrcSet(
          image.getAttribute('data-srcset') || ''
        ) || ''
      );
    }
  });
}
