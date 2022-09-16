import { updateViewDataWithExitTime, postViewData } from "../API/api";
/**
 * Is called whenever the user hits a job url
 * tracks the view and listens to when the user leaves the page
 * @param {*} documentId
 */
export async function trackJobView(documentId) {
  var openedSiteTimestamp = new Date();
  const viewObject = {
    startView: openedSiteTimestamp,
    documentId: documentId,
    device: getDevice(),
    source: document.referrer,
    browser: navigator.userAgent,
  };
  const viewData = await postViewData(viewObject);
  window.onbeforeunload = () => {
    updateViewDataWithExitTime({
      startView: openedSiteTimestamp,
      documentId: documentId,
      uuid: viewData.uuid,
      exitView: new Date(),
    });
  };
}

/**
 * Simple device detection implementation
 * Needs to be run on frontend
 * @returns string with desktop
 */
function getDevice() {
  if (window.matchMedia("max-width: 767px").matches) {
    return "mobile";
  }
  if (window.matchMedia("max-width: 991px").matches) {
    return "tablet";
  }
  return "desktop";
}
