import { getAPIHost } from "./getAPIHost";

/**
 * fetches data from url
 * @param {*} url
 * @returns
 */
async function getDataFromUrl(url) {
  try {
    const result = await fetch(
      getAPIHost() + url + "?safaricanbiteme=" + Math.random()
    );
    return await result.json();
  } catch (error) {
    console.error(error);
  }
}
/**
 * Posts data to url
 * @param {*} postData
 * @param {*} url
 * @returns
 */
async function postDataToUrl(postData, url) {
  try {
    const result = await fetch(getAPIHost() + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    return await result.json();
  } catch (error) {
    console.error(error);
  }
}

/**
 * fetches all the data needed to draw the frontpage main feed
 * @param {*} searchValue
 * @returns
 */
export async function getFrontPageDataFromApi() {
  return await getDataFromUrl("frontpage");
}

/**
 * Searches from strings in articles
 * @param {*} searchValue
 * @returns
 */
export async function getSearchData(searchValue) {
  return await getDataFromUrl("search/" + searchValue);
}

/**
 * Fetches additional article data
 * @param {*} articleId
 * @returns
 */
export async function getArticleFromApi(articleId) {
  return await getDataFromUrl("article/" + articleId);
}

/**
 * posts form data to api from quickapplication
 * @param {*} data
 * @returns
 */
export async function postQuickApplication(data) {
  return await postDataToUrl(data, "sendmail");
}
