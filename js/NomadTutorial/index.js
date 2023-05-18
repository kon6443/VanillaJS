const title = document.querySelector("#title");
const CLICKED_CLASS = "clicked";

function handleClilck() {
  title.classList.toggle(CLICKED_CLASS);
}

function init() {
  title.addEventListener("click", handleClilck);
}

init();
