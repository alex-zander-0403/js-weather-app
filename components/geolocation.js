import { apiKey, baseUrl } from "../src/api/apiKeyAndHost.js";
import { getWeather, getForecast } from "../src/api/getWeatherAndForecast.js";
import { showError } from "./error.js";
import { renderCurrentWeather } from "./currentWeather.js";
import { renderHourlyForecast } from "./hourlyForecast.js";
import { renderDaylyForecast } from "./dailyForecast.js";

//
export function geoLocation() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const { latitude, longitude } = await getBrowserGeoLocation();
      const locationName = await getLocationName(latitude, longitude);
      await fetchWeatherByCoords(latitude, longitude, locationName);
    } catch (error) {
      console.error("Ошибка при получении геолокации", error.message);
      showError("Ошибка при получении геолокации");
    }
  });
}

function getBrowserGeoLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Геолокация не поддерживается"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
}

async function getLocationName(latitude, longitude) {
  const reverseGeoCodingUrl = new URL(`${baseUrl}/geo/1.0/reverse`);

  const queryParams = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    limit: 1,
    appid: apiKey,
  });

  const url = `${reverseGeoCodingUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      const { local_names } = data[0];
      const russianName = local_names?.ru || data[0].name;
      return `${russianName}`;
    } else {
      throw new Error("Локация не найдена");
    }
  } catch (error) {
    console.error(
      "Ошибка при получении названия локации (getLocationName)",
      error.message
    );
    showError("Ошибка при получении названия локации");
  }
}

async function fetchWeatherByCoords(latitude, longitude, locationName) {
  try {
    const weatherData = await getWeather(latitude, longitude);
    const forecastData = await getForecast(latitude, longitude);

    renderCurrentWeather(weatherData, locationName);
    renderHourlyForecast(forecastData);
    renderDaylyForecast(forecastData);
  } catch (error) {
    console.error(
      "Ошибка при получении погоды по координатам (fetchWeatherByCoords)",
      error.message
    );
    showError("Ошибка при получении погоды по координатам");
  }
}
