export function getCurrentYear() {
  const currentYear = new Date().getFullYear();

  const yearEl = document.getElementById("currentYear");
  yearEl.textContent = currentYear;
  //   return currentYear;
}
