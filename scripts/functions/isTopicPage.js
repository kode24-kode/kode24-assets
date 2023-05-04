// checks wether the page is a partner page or not
export function isTopicPage() {
  return window.location.pathname.includes("/emne");
}
