/**
 * Listens to clicks on hamburger menu in mobile view
 * and handles interaction
 */
export function handleHamburgerMenuClick() {
  console.log("handleHamburgerMenuClick loaded");
  if (
    document.getElementById("top-menu-left-menu-link") &&
    document.getElementById("top-menu-left-menu-link")?.addEventListener
  ) {
    document
      .getElementById("top-menu-left-menu-link")
      ?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        document.getElementById("left-menu")?.classList.toggle("active");
      });
  }

  //cconsst isToggled = true;

  document
    ?.getElementById("top-menu-toggle")
    ?.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("got here");
      event.preventDefault();
      document?.getElementById("top-menu-toggle")?.classList.toggle("active");
      document?.getElementById("left-menu")?.classList.toggle("active");
    });
}

window.addEventListener("click", () => {
  if (
    document?.getElementById("top-menu-toggle")?.classList.contains("active")
  ) {
    console.log("yo");
    document?.getElementById("top-menu-toggle")?.classList.toggle("active");
    document?.getElementById("left-menu")?.classList.toggle("active");
  }
});

window.addEventListener("keydown", (event) => {
  if (
    document?.getElementById("top-menu-toggle")?.classList.contains("active") &&
    event.key.toLowerCase() === "escape"
  ) {
    console.log("yo");
    document?.getElementById("top-menu-toggle")?.classList.toggle("active");
    document?.getElementById("left-menu")?.classList.toggle("active");
  }
});
