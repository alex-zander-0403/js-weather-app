import { showError } from "../../components/error.js";

const cityInput = document.querySelector(".city-input");

//
export function isCyrillic(text) {
  const cyrillicRules = /^[А-Яа-яЁё\s-]+$/;
  return cyrillicRules.test(text);
}

cityInput.addEventListener("input", () => {
  const inputValue = cityInput.value;
  if (inputValue && !isCyrillic(inputValue)) {
    showError("Введите город на русском языке");
  } else {
    showError("");
  }
});
 