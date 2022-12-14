import { getAPIHost } from './getAPIHost';

/**
 * fetches data from url
 * @param {*} url
 * @returns
 */
async function getDataFromUrl(url, customUrl) {
  try {
    const result = await fetch(customUrl ?? getAPIHost() + url);
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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    return await result.json();
  } catch (error) {
    console.error(error);
  }
}

/**
 * takes a list of article ids on front previews and returns additional data (byline, tags)
 * @param {*} ids
 * @returns
 */
export async function getChristmasCalendarHighscore() {
  return await getDataFromUrl(
    '',
    'https://jk-backend.kode24.no/api/highscore/'
  );
}

/**
 * takes a list of article ids on front previews and returns additional data (byline, tags)
 * @param {*} ids
 * @returns
 */
export async function getFrontPreviewData(ids) {
  return await getDataFromUrl('front/' + ids.join(','));
}

/**
 * Searches from strings in articles
 * @param {*} searchValue
 * @returns
 */
export async function getSearchData(searchValue) {
  return await getDataFromUrl('search/' + searchValue);
}

/**
 * posts impressionData to the job board statistics
 * @param {*} impressionData
 * @returns
 */
export async function postImpressions(impressionData) {
  return await postDataToUrl(
    impressionData,
    'listing/impression-data'
  );
}

/**
 * Posts job clicks to the job board statistics
 * @param {*} documentId
 * @param {*} clickUrl
 * @returns
 */
export async function postClick(documentId, clickUrl) {
  return await postDataToUrl(
    {
      documentId: documentId,
      url: clickUrl,
    },
    'listing/click-data'
  );
}

/**
 * Posts view data to the job board statistics
 * @param {*} viewData
 * @returns
 */
export async function postViewData(viewData) {
  return await postDataToUrl(viewData, 'listing/view-data');
}

/**
 * Updates view data with exit time and posts to the job board statistics
 * @param {*} param0
 * @returns
 */
export async function updateViewDataWithExitTime({
  exitView,
  startView,
  uuid,
  documentId,
}) {
  return await postDataToUrl(
    {
      uuid: uuid,
      exitView: exitView,
      startView: startView,
      documentId: documentId,
    },
    'listing/exit-view-data'
  );
}

/**
 * Fetches all active ads from the job board
 * @returns
 */
export async function getAdsForFrontFromApi() {
  return await getDataFromUrl('listing/front');
}

/**
 * Fetches all active content ads
 * @returns
 */
export async function getContentAdsFromApi() {
  return await getDataFromUrl('listing/content');
}

/**
 * Fetches additional article data
 * @param {*} articleId
 * @returns
 */
export async function getArticleFromApi(articleId) {
  return await getDataFromUrl('article/' + articleId);
}

/**
 * Fetches articles tagget with a specific tag
 * @param {*} tag
 * @returns
 */
export async function getArticlesByTag(tag) {
  return await getDataFromUrl('article/tag/' + tag);
}

/**
 * Fetches list of sponsors
 */
export async function getSponsorsFromApi() {
  return await getDataFromUrl('sponsors');
}
/**
 * Fetches calendar events
 * @returns
 */
export async function getEventsFromApi() {
  const result = await getDataFromUrl('events');
  return {
    nextEvents: result.upcomingEvents,
    premiumEvents: result.premiumEvents || [],
    eventsCount: result.upcomingEvents.length,
  };
}
/**
 * posts form data to api from quickapplication
 * @param {*} data
 * @returns
 */
export async function postQuickApplication(data) {
  return await postDataToUrl(data, 'sendmail');
}

/**
 * fetches data from api for the company league
 * @returns
 */
export async function getCompanyLeagueTableData() {
  return await getDataFromUrl('company-league');
}
