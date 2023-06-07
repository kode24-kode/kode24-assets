/**
 * For content articles and job listings we need to add
 * a class to the top of the page to create the correct
 * padding on the page.
 */
export function addRibbonClassToTop() {
  if (
    document.querySelector('.article-entity.content') ||
    document.querySelector('.article-entity.jobb')
  ) {
    document
      .querySelector('.frontpage')
      ?.classList.add('with-ribbon');
  }
}
