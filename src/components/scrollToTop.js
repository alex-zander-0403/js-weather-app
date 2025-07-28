const toTopEl = document.getElementById("to-top");

toTopEl.addEventListener("click", scrollToTop);

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    toTopEl.style.display = "block";
  } else {
    toTopEl.style.display = "none";
  }
});
