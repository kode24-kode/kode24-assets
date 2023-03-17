import { initCommon } from "./common";
import { initQuickJobApplicationForm } from "./components/quickJobApplicationForm";
import { initInArticleAds } from "./components/inArticleAds";

import { getArticleFromApi } from "./API/api";
import { isArticleEditorial } from "./functions/isArticleEditorial";
import { findDataInSpecialTag } from "./functions/findDataInSpecialTag";
import { getArticleId } from "./functions/getArticleId";
import { addRibbonClassToTop } from "./functions/addRibbonClassToTop";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
/**
 * Inits all components that needs to run on a kode24 article page
 * Should have as litle logic as possible built in.
 * Separate it into functions and call them from here.
 */
export async function initArticle() {
  hljs.highlightAll();
  // all functions that need to run on every page
  const { premiumAds, contentAds } = await initCommon();
  //fetch article data
  const articleData = await getArticleFromApi(getArticleId());
  // if article is editorial render in article ads
  // if it is not editiorial render quick signup form
  if (isArticleEditorial()) {
    // render commercial ads in the article
    let inArticleAds = initInArticleAds(
      ".body-copy h2",
      premiumAds,
      contentAds.length && contentAds[0] ? contentAds[0] : []
    );
  } else {
    // add ribbon class to top of page
    addRibbonClassToTop();
    // initiate view tracking
    if (
      articleData &&
      articleData.tags &&
      articleData.tags.includes("jobbmail")
    ) {
      initQuickJobApplicationForm(
        findDataInSpecialTag(articleData.tags, "jobbmail"),
        articleData.title,
        articleData.published_url
      );
    }
  }
}
