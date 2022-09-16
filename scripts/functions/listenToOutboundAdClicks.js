export function listenToOutboundAdClicks(documentId) {
  document.querySelectorAll(".body-copy a").forEach((link) => {
    link.addEventListener("click", (event) => {
      postClick(documentId, link.getAttribute("href"));
    });
  });
}
