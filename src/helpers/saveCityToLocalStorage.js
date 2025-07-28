import { capitalize } from "./capitalize.js";

export function saveCityToLocalStorage(city) {
  const capitalizedCity = capitalize(city);
  let cities = JSON.parse(localStorage.getItem("citiesArr")) || [];

  if (!cities.includes(capitalizedCity)) {
    cities.unshift(capitalizedCity);
    if (cities.length > 5) {
      cities.pop();
    }
    localStorage.setItem("citiesArr", JSON.stringify(cities));
  }
}
