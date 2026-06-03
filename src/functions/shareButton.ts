export function ShareButton() {
  const button = document.getElementById("share-article-button");
  if (!button) return;
  console.log("you have a share button, adding event listener");
  button.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.id === "share-article-button") {
      handleShare();
    }
  });
  const handleShare = async () => {
    const url = window.location.href;
    console.log("handling share for url", url);
    try {
      if (navigator.share) {
        const data = {
          title: document.title,
          text: document
            .querySelector("meta[name='description']")
            ?.getAttribute("content"),
          url,
        };
        console.log("data", data);
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // Brukeren lukket delearket
    }
  };
}
