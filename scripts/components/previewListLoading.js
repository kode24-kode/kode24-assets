/**
 * Returns a preview list with dummy elements
 * @param {*} numberOfElements
 * @returns
 */
export const initPreviewListLoading = (numberOfElements) => {
  let element = document.createElement("div");
  // create array with number of elements
  let dummyAds = Array.from(Array(numberOfElements).keys());
  element.innerHTML = `
          <div class="row added">
            <div class="dummy-aside-content preview job-list preview-list">
            <h3></h3>
            <div class="listing">
              ${dummyAds
                .map(
                  (ad) => `
                  <article class="preview job" itemscope itemprop="itemListElement" itemType="http://schema.org/ListItem">
                      <a itemprop="url" href="#">
                          <figure id="">
                          </figure>
                          <div class="article-preview-text">
                              <div class="labels"><span class="label"></span></div>
                              <h1 class="headline"></h1>
                          </div>
                      </a>
                  </article>
                  
                  `
                )
                .join("")}
              </div>
              <div class="listing-actions">
                <a href="#" class="button"></a>
              </div>
            </div>
          </div>`;
  return element;
};
