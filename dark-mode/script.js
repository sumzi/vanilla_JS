const lyrics = document.querySelector(".lyrics");

if (window.matchMedia("(prefers-color-scheme:dark)")) {
  lyrics.classList.add("dark");
}

window.addEventListener("click", () => {
  lyrics.classList.toggle("dark");
});
