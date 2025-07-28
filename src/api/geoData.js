import { apiKey, baseUrl } from "./apiKeyAndHost.js";
import { cityInput } from "../../components/inputForm.js";
import { showError } from "../../components/error.js";
import { isCyrillic } from "../helpers/checkCyrillic.js";
import { cityCorrect } from "../helpers/cityCorrect.js";
import { saveCityToLocalStorage } from "../helpers/saveCityToLocalStorage.js";
import { getWeather, getForecast } from "./getWeatherAndForecast.js";
import { renderCurrentWeather } from "../../components/currentWeather.js";
import { renderHourlyForecast } from "../../components/hourlyForecast.js";
import { renderDaylyForecast } from "../../components/dailyForecast.js";

//
export async function getGeoData() {
  let city = cityInput.value.trim().toLowerCase();

  if (!city) {
    return;
  }
  if (!isCyrillic(city)) {
    showError("Введите город");
    return;
  }

  city = cityCorrect(city);

  try {
    const geoUrl = `${baseUrl}/geo/1.0/direct`;
    const queryParams = new URLSearchParams({
      q: city,
      limit: 1,
      appid: apiKey,
    });

    const geoResponse = await fetch(`${geoUrl}?${queryParams.toString()}`);
    const geoData = await geoResponse.json();
    if (!geoData.length) {
      throw new Error("Город не найден!");
    }

    const { lat, lon } = geoData[0];
    
    saveCityToLocalStorage(city);

    const weatherData = await getWeather(lat, lon);
    const forecastData = await getForecast(lat, lon);

    renderCurrentWeather(weatherData, city);
    renderHourlyForecast(forecastData);
    renderDaylyForecast(forecastData);
  } catch (error) {
    console.error(error.message);
    showError("Город не найден!");
  }
}
