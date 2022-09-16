/**
 * Shows dummy content while loading ads in the right column
 * @param {*} selector
 */
export const initAsideLoading = (selector) => {
  document.getElementById(selector).innerHTML = `

        <div class="dummy-aside-content">
        <h3></h3>
        ${[1, 2, 3, 4, 5, 6, 7, 8]
          .map(
            (ad) => `
            <article class="preview premium job-aside-preview" itemscope itemprop="itemListElement" itemType="http://schema.org/ListItem">
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
        </div>`;
};
