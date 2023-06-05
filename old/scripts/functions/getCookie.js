/**
 * Fetches a cookie of given name from the document.
 * @param {*} doc
 * @param {*} name
 * @returns
 */
export function getCookie(doc, name) {
  const v = doc.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
}
