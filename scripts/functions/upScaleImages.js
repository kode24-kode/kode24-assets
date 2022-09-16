/**
 * Go through all img src and double resolution
 */
export function upScaleImages() {
  let images = document.querySelectorAll("img");
  images.forEach((image) => {
    let src = image.getAttribute("src");
    if (src.includes("https://www.kode24.no")) {
      let imageUrl = new URL(src);
      imageUrl.searchParams.set(
        "width",
        imageUrl.searchParams.get("width") * 2
      );
      imageUrl.searchParams.set(
        "height",
        imageUrl.searchParams.get("height") * 2
      );
      image.setAttribute("src", imageUrl.toString());
    }
  });
}
