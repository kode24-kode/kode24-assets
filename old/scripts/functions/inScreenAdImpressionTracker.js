import { getCookie } from "./getCookie.js";
/**
 * Reverse engineered version of Blink ad tracking
 * Listens to scroll and tracks impressions
 * @param {*} ads
 */
export function trackInScreenImpressions(ads) {
  setTimeout(() => {
    // wait for some other variables to be initiated
    const startScrollOffset = window.scrollY; // must be added to offset of articles
    let impressionTrackingList = [...ads]; // keeps id of already reported impressions
    // run once before event tracking starts
    let { matchingImpressions, nonMatchingImpressions } =
      getAdsInsideBoundariesOfScroll(impressionTrackingList, startScrollOffset);
    impressionTrackingList = [...nonMatchingImpressions]; // keep track of remainding ads that have not had impressions;
    if (matchingImpressions.length) trackImpressionFromAd(matchingImpressions);
    document.addEventListener("scroll", function (event) {
      let { matchingImpressions, nonMatchingImpressions } =
        getAdsInsideBoundariesOfScroll(
          impressionTrackingList,
          startScrollOffset
        );
      impressionTrackingList = [...nonMatchingImpressions]; // keep track of remainding ads that have not had impressions;
      if (matchingImpressions.length)
        trackImpressionFromAd(matchingImpressions);
    });
  }, 1000);
}

/**
 * Returns a list of matching ads within boundaries and non matching ads
 * @param {*} impressionTrackingList
 * @param {*} startScrollOffset
 * @returns
 */
function getAdsInsideBoundariesOfScroll(
  impressionTrackingList,
  startScrollOffset
) {
  // dont allow mutation of array
  const impressions = [...impressionTrackingList];
  const matchingImpressions = impressions.filter(
    (ad) =>
      ad.fromTop + startScrollOffset >= window.scrollY &&
      ad.fromTop + startScrollOffset <= window.scrollY + window.innerHeight
  );
  const nonMatchingImpressions = impressions.filter(
    (ad) => !matchingImpressions.includes(ad)
  );
  return {
    matchingImpressions,
    nonMatchingImpressions,
  };
}

const uuidDict = {};

/**
 * Gives a unique but consistent id for each key.
 * Saves the uuid, so if several system is using this, they get the same value!
 */
function generateUUID(key = "") {
  if (key && key in uuidDict) {
    return uuidDict[key];
  }

  // Public Domain/MIT
  let d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); // use high-precision timer if available
  }
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  uuidDict[key] = uuid;
  return uuid;
}

/**
 * Track impressions to blink
 * @param {*} ads
 * @returns
 */
async function trackImpressionFromAd(ads) {
  let adData = ads.map((ad) => {
    return {
      pageView: sessionStorage.getItem(`PAGEVIEW-${document.location.href}`),
      site: "www.kode24.no",
      userId: getCookie(document, "xavier") || generateUUID("xavier"),
      version: "blink-8.10.8",
      customUserAgent: navigator.userAgent,
      id: `kode24.no/${ad.id}`,
      context: ad.context,
      abId: "",
      type: "impression",
      article: {
        url: ad.published_url,
        harvesterId: `kode24.no/${ad.id}`,
      },
      title: ad.title,
      height: 0,
      width: 0,
    };
  });
  // try to send request
  try {
    const result = await fetch("https://www.kode24.no/app/aas/a", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adData),
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}
