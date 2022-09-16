/**
 * Handles bug with image urls in auto-rows on kode24
 *
 */
export function convertTagFeedURL() {
  const nodes = document.querySelectorAll(".preview.compact figure img");
  nodes.forEach((element) => {
    const imageSource = window.decodeURIComponent(element.getAttribute("src"));
    let imageSourceSet = element.getAttribute("data-srcset");
    if (imageSource.includes("images?")) {
      element.setAttribute(
        "src",
        imageSource.replace("?imageUrl=https://www.dagbladet.no/images", "")
      );
    }
    if (imageSourceSet) {
      imageSourceSet = imageSourceSet.replace(
        /\?imageUrl=https%3A%2F%2Fwww.dagbladet.no%2Fimages/g,
        ""
      );
      imageSourceSet = imageSourceSet.replace(/%2F/g, "/");
      imageSourceSet = imageSourceSet.replace(/%3F/g, "?");
      imageSourceSet = imageSourceSet.replace(/%3D/g, "=");
      element.setAttribute(
        "data-srcset",
        imageSourceSet.replace(
          /\?imageUrl=https%3A%2F%2Fwww.dagbladet.no%2Fimages/g,
          ""
        )
      );
    }
  });
}
