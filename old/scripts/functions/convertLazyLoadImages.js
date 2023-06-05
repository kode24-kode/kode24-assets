/**
 * Handles all labrador-images that are set to lazyload
 * converts them into browser based lazy load
 */

export function convertLazyLoadImages() {
  const lazyLoadImages = document.querySelectorAll(".lazyload");
  lazyLoadImages.forEach((image) => {
    let srcSet = image
      .getAttribute("data-srcset")
      .replaceAll(
        "https://www.kode24.no/images?imageUrl=https%3A%2F%2Fwww.dagbladet.no%2",
        "https://www.kode24.no/images/"
      )
      .replaceAll("%3F", "?")
      .replaceAll("%3D", "=")
      .replaceAll("%26", "&");
    srcSet = convertUrlsInSrcSet(srcSet);
    image.classList.remove("lazyload");
    image.setAttribute(
      "sizes",
      "(min-width: 700px) 700px, (min-width: 1024px) 1024px, (max-width: 700px) 100px"
    );
    image.setAttribute("srcset", srcSet);
    image.setAttribute("loading", "lazy");
  });
}
/**
 * upscales images from labrador and patches them together again
 */
function convertUrlsInSrcSet(srcSet) {
  let sources = srcSet.split(", ");
  sources = sources.filter((source) => source !== "");
  sources = sources.map((source) => {
    let urlObject = {
      url: new URL(source.split(" ")[0]),
      width: source.split(" ")[1].replace("w", ""),
    };

    urlObject.url.searchParams.set(
      "width",
      urlObject.url.searchParams.get("width") * 2
    );
    urlObject.url.searchParams.set(
      "height",
      urlObject.url.searchParams.get("height") * 2
    );
    return urlObject;
  });
  return sources
    .map((source) => `${source.url.toString()} ${source.width}w`)
    .join(", ");
}
