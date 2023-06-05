// don't show sidebar on job and search site
/**
 * Looks if the the page is commercial and hides the right sidebar
 */
export function hideSidebarForCommercialPages() {
  if (
    window.location.pathname.indexOf("www.kode24.no/jobb") > -1 ||
    window.location.pathname.indexOf("www.kode24.no/sok") > -1
  ) {
    document.querySelector(".frontpage").addClass("only-main-row");
  }
}
