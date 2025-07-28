import { getGeoData } from "../src/api/geoData.js";
import { cityInput } from "./inputForm.js";
const lastCitiesList = document.getElementById("recent-cities-list");

// сброс выпадающего меню по клику вне
document.addEventListener("click", (e) => {
  if (e.target !== cityInput && e.target !== lastCitiesList)
    lastCitiesList.style.display = "none";
});

//
export function showLastCities() {
  const cities = JSON.parse(localStorage.getItem("citiesArr")) || [];
  if (cities.length === 0) return;

  lastCitiesList.innerHTML = "";

  cities.forEach((city) => {
    const liEl = document.createElement("li");
    liEl.textContent = city;
    liEl.addEventListener("click", () => {
      cityInput.value = city;
      lastCitiesList.style.display = "none";
      getGeoData(city)
    });

    lastCitiesList.append(liEl);
  });

  lastCitiesList.style.display = "block";
}
