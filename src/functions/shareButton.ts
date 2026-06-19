export function ShareButton() {
  console.log("running share button");
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("share-article-button");
    console.log("# found share button", button);
    if (!button) return;
    console.log("# you have a share button, adding event listener", button);
    button.addEventListener("click", (e: MouseEvent) => {
      console.log("# klikket knapp");
      const target = e.target as HTMLElement | null;
      console.log("# registered a click", button);
      if (target && target.id === "share-article-button") {
        handleShare();
      }
    });
    const handleShare = async () => {
      const url = window.location.href;
      console.log("# handling share for url", url);
      try {
        if (navigator.share) {
          const data = {
            title: document.title,
            text:
              document
                .querySelector("meta[name='description']")
                ?.getAttribute("content") ?? undefined,
            url,
          };
          console.log("# data", data);
          await navigator.share(data);
        } else {
          await navigator.clipboard.writeText(url);
        }
      } catch {
        // Brukeren lukket delearket
      }
    };
    console.log("# siden er klar!");
  });
}
