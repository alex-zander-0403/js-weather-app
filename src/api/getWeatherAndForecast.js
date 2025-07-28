import { apiKey, baseUrl } from "./apiKeyAndHost.js";

//
export async function getWeather(lat, lon) {
  return fetchData("weather", lat, lon);
}

export async function getForecast(lat, lon) {
  return fetchData("forecast", lat, lon);
}

async function fetchData(endpoint, lat, lon) {
  const url = new URL(`${baseUrl}/data/2.5/${endpoint}`);
  const queryParams = new URLSearchParams({
    lat: lat,
    lon: lon,
    appid: apiKey,
    lang: "ru",
    units: "metric",
  });

  url.search = queryParams.toString();
  //   console.log("--->", url.search);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Не удалось загрузить данные о погоде");
    }

    // console.log(response);
    return response.json();
  } catch (error) {
    console.error(error.message);
  }
}
