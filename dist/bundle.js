/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/apiKeyAndHost.js":
/*!**********************************!*\
  !*** ./src/api/apiKeyAndHost.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiKey: () => (/* binding */ apiKey),
/* harmony export */   baseUrl: () => (/* binding */ baseUrl)
/* harmony export */ });
const apiKey = "fedb6c450be4c2411a3c8e5d42cf418d";
const baseUrl = "https://api.openweathermap.org";


/***/ }),

/***/ "./src/api/geoData.js":
/*!****************************!*\
  !*** ./src/api/geoData.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGeoData: () => (/* binding */ getGeoData)
/* harmony export */ });
/* harmony import */ var _apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiKeyAndHost.js */ "./src/api/apiKeyAndHost.js");
/* harmony import */ var _components_inputForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/inputForm.js */ "./src/components/inputForm.js");
/* harmony import */ var _components_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/error.js */ "./src/components/error.js");
/* harmony import */ var _helpers_checkCyrillic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/checkCyrillic.js */ "./src/helpers/checkCyrillic.js");
/* harmony import */ var _helpers_cityCorrect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/cityCorrect.js */ "./src/helpers/cityCorrect.js");
/* harmony import */ var _helpers_saveCityToLocalStorage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/saveCityToLocalStorage.js */ "./src/helpers/saveCityToLocalStorage.js");
/* harmony import */ var _getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getWeatherAndForecast.js */ "./src/api/getWeatherAndForecast.js");
/* harmony import */ var _components_currentWeather_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/currentWeather.js */ "./src/components/currentWeather.js");
/* harmony import */ var _components_hourlyForecast_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/hourlyForecast.js */ "./src/components/hourlyForecast.js");
/* harmony import */ var _components_dailyForecast_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/dailyForecast.js */ "./src/components/dailyForecast.js");











//
async function getGeoData() {
  let city = _components_inputForm_js__WEBPACK_IMPORTED_MODULE_1__.cityInput.value.trim().toLowerCase();

  if (!city) {
    return;
  }
  if (!(0,_helpers_checkCyrillic_js__WEBPACK_IMPORTED_MODULE_3__.isCyrillic)(city)) {
    (0,_components_error_js__WEBPACK_IMPORTED_MODULE_2__.showError)("Введите город");
    return;
  }

  city = (0,_helpers_cityCorrect_js__WEBPACK_IMPORTED_MODULE_4__.cityCorrect)(city);

  try {
    const geoUrl = `${_apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}/geo/1.0/direct`;
    const queryParams = new URLSearchParams({
      q: city,
      limit: 1,
      appid: _apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.apiKey,
    });

    const geoResponse = await fetch(`${geoUrl}?${queryParams.toString()}`);
    const geoData = await geoResponse.json();
    if (!geoData.length) {
      throw new Error("Город не найден!");
    }

    const { lat, lon } = geoData[0];

    (0,_helpers_saveCityToLocalStorage_js__WEBPACK_IMPORTED_MODULE_5__.saveCityToLocalStorage)(city);

    const weatherData = await (0,_getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_6__.getWeather)(lat, lon);
    const forecastData = await (0,_getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_6__.getForecast)(lat, lon);

    (0,_components_currentWeather_js__WEBPACK_IMPORTED_MODULE_7__.renderCurrentWeather)(weatherData, city);
    (0,_components_hourlyForecast_js__WEBPACK_IMPORTED_MODULE_8__.renderHourlyForecast)(forecastData);
    (0,_components_dailyForecast_js__WEBPACK_IMPORTED_MODULE_9__.renderDaylyForecast)(forecastData);
  } catch (error) {
    console.error(error.message);
    (0,_components_error_js__WEBPACK_IMPORTED_MODULE_2__.showError)("Город не найден!");
  }
}


/***/ }),

/***/ "./src/api/getWeatherAndForecast.js":
/*!******************************************!*\
  !*** ./src/api/getWeatherAndForecast.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getForecast: () => (/* binding */ getForecast),
/* harmony export */   getWeather: () => (/* binding */ getWeather)
/* harmony export */ });
/* harmony import */ var _apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiKeyAndHost.js */ "./src/api/apiKeyAndHost.js");


//
async function getWeather(lat, lon) {
  return fetchData("weather", lat, lon);
}

async function getForecast(lat, lon) {
  return fetchData("forecast", lat, lon);
}

async function fetchData(endpoint, lat, lon) {
  const url = new URL(`${_apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}/data/2.5/${endpoint}`);
  const queryParams = new URLSearchParams({
    lat: lat,
    lon: lon,
    appid: _apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.apiKey,
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


/***/ }),

/***/ "./src/components/currentWeather.js":
/*!******************************************!*\
  !*** ./src/components/currentWeather.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCurrentWeather: () => (/* binding */ renderCurrentWeather)
/* harmony export */ });
/* harmony import */ var _helpers_windDirectionIndicator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/windDirectionIndicator.js */ "./src/helpers/windDirectionIndicator.js");
/* harmony import */ var _helpers_humidityIndicator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/humidityIndicator.js */ "./src/helpers/humidityIndicator.js");
/* harmony import */ var _helpers_formatTime_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formatTime.js */ "./src/helpers/formatTime.js");
/* harmony import */ var _helpers_calcDayLength_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/calcDayLength.js */ "./src/helpers/calcDayLength.js");
/* harmony import */ var _helpers_calcSunPosition_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/calcSunPosition.js */ "./src/helpers/calcSunPosition.js");






//
const currentCity = document.querySelector(".city");
const currentTemperature = document.querySelector(".temperature");
const currenteFeelsLike = document.querySelector(".feels");
const currenteDescription = document.querySelector(".description");
const currentWeatherIcon = document.querySelector(".weather-icon img");

const currentWind = document.querySelector(".wind");
const currentVisibility = document.querySelector(".visibility");
const currentHumidity = document.querySelector(".humidity");
const currentPressure = document.querySelector(".pressure");

const dayLenght = document.querySelector(".day-length");
const sunriseItem = document.querySelector(".sunrise");
const sunsetItem = document.querySelector(".sunset");

//
function renderCurrentWeather(data, city) {
  // console.log("weatherData --->", data);

  //
  currentCity.textContent = city || "неизвестно";
  currentTemperature.textContent = `${Math.round(data.main?.temp || "?")}°C`;
  currenteFeelsLike.textContent = `Ощущается как ${Math.round(
    data.main?.feels_like || "?",
  )}°C`;
  currenteDescription.textContent =
    data.weather?.[0]?.description || "неизвестно";
  currentWeatherIcon.src = `https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`;

  //
  currentWind.textContent = `${Math.round(data.wind?.speed || 0)} м/с`;
  const currentWindDeg = data.wind?.deg || 0;
  (0,_helpers_windDirectionIndicator_js__WEBPACK_IMPORTED_MODULE_0__.windDirection)(currentWindDeg);
  const visibility = data.visibility || 0;
  if (visibility >= 1000) {
    currentVisibility.textContent = `${visibility / 1000} км`;
  } else {
    currentVisibility.textContent = `${visibility} м`;
  }
  currentHumidity.textContent = `${data.main?.humidity || 0}%`;
  const humidity = data.main?.humidity;
  (0,_helpers_humidityIndicator_js__WEBPACK_IMPORTED_MODULE_1__.humidityIndicator)(humidity);

  currentPressure.textContent = `${Math.round(
    (data.main?.pressure || 0) * 0.750062,
  )}мм`;
  currentPressure.textContent = `${Math.round(
    (data.main?.pressure || 0) * 0.750062,
  )}мм`;

  //
  const { sunrise, sunset } = data.sys || {};
  const { timezone } = data || {};
  sunriseItem.textContent = sunrise ? (0,_helpers_formatTime_js__WEBPACK_IMPORTED_MODULE_2__.formatTime)(sunrise, timezone) : "н/д";
  sunsetItem.textContent = sunset ? (0,_helpers_formatTime_js__WEBPACK_IMPORTED_MODULE_2__.formatTime)(sunset, timezone) : "н/д";

  dayLenght.textContent = `Длинна светового дня: ${
    sunrise && sunset ? (0,_helpers_calcDayLength_js__WEBPACK_IMPORTED_MODULE_3__.calcDayLenght)(sunrise, sunset) : "н/д"
  }`;

  const sunPosition = sunrise && sunset ? (0,_helpers_calcSunPosition_js__WEBPACK_IMPORTED_MODULE_4__.calcSunPosition)(sunrise, sunset) : 0;
  (0,_helpers_calcSunPosition_js__WEBPACK_IMPORTED_MODULE_4__.updateSunPosition)(sunPosition);
}


/***/ }),

/***/ "./src/components/currentYear.js":
/*!***************************************!*\
  !*** ./src/components/currentYear.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentYear: () => (/* binding */ getCurrentYear)
/* harmony export */ });
function getCurrentYear() {
  const currentYear = new Date().getFullYear();

  const yearEl = document.getElementById("currentYear");
  yearEl.textContent = currentYear;
}


/***/ }),

/***/ "./src/components/dailyForecast.js":
/*!*****************************************!*\
  !*** ./src/components/dailyForecast.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderDaylyForecast: () => (/* binding */ renderDaylyForecast)
/* harmony export */ });
const forecastListEl = document.querySelector(".forecast-list");

//
function renderDaylyForecast(data) {
  forecastListEl.innerHTML = "";

  const groupedData = groupDataByDay(data.list);

  Object.keys(groupedData)
    .slice(0, 5)
    .forEach((dayKey) => {
      const dayData = groupedData[dayKey];

      const maxTemp = Math.round(
        Math.max(...dayData.map((item) => item.main.temp_max)),
      );

      const minTemp = Math.round(
        Math.min(...dayData.map((item) => item.main.temp_min)),
      );

      const icon = dayData[0].weather[0].icon;
      const date = new Date(dayData[0].dt * 1000);
      const dayName = date.toLocaleDateString("ru-RU", {
        weekday: "short",
      });
      const dayNumber = date.getDate();
      const monthName = date.toLocaleDateString("ru-RU", {
        month: "short",
      });

      const forecastItemEl = document.createElement("div");
      forecastItemEl.classList.add("forecast-item");
      forecastItemEl.innerHTML = `
          <p class="day">${dayName},</p>
          <p class="day">${dayNumber} ${monthName}</p>
          <img
              src="https://openweathermap.org/img/wn/${icon}@2x.png"
              alt="Погода"
          />
          <div class="temp">
              <p class="temp-day">${maxTemp} °C</p>
              <p class="temp-night">${minTemp} °C</p>
          </div>`;

      forecastListEl.append(forecastItemEl);
    });
}

//
function groupDataByDay(list) {
  const groupedData = {};

  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("ru-RU");

    if (!groupedData[dayKey]) {
      groupedData[dayKey] = [];
    }
    groupedData[dayKey].push(item);
  });

  return groupedData;
}


/***/ }),

/***/ "./src/components/error.js":
/*!*********************************!*\
  !*** ./src/components/error.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showError: () => (/* binding */ showError)
/* harmony export */ });
const errorMessage = document.getElementById("error-message");

function showError(message) {
  errorMessage.textContent = message;
}


/***/ }),

/***/ "./src/components/geolocation.js":
/*!***************************************!*\
  !*** ./src/components/geolocation.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   geoLocation: () => (/* binding */ geoLocation)
/* harmony export */ });
/* harmony import */ var _api_apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/apiKeyAndHost.js */ "./src/api/apiKeyAndHost.js");
/* harmony import */ var _api_getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/getWeatherAndForecast.js */ "./src/api/getWeatherAndForecast.js");
/* harmony import */ var _error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error.js */ "./src/components/error.js");
/* harmony import */ var _currentWeather_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./currentWeather.js */ "./src/components/currentWeather.js");
/* harmony import */ var _hourlyForecast_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hourlyForecast.js */ "./src/components/hourlyForecast.js");
/* harmony import */ var _dailyForecast_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dailyForecast.js */ "./src/components/dailyForecast.js");







//
function geoLocation() {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const { latitude, longitude } = await getBrowserGeoLocation();
      const locationName = await getLocationName(latitude, longitude);
      await fetchWeatherByCoords(latitude, longitude, locationName);
    } catch (error) {
      console.error("Ошибка при получении геолокации", error.message);
      (0,_error_js__WEBPACK_IMPORTED_MODULE_2__.showError)("Ошибка при получении геолокации");
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
        },
      );
    }
  });
}

async function getLocationName(latitude, longitude) {
  const reverseGeoCodingUrl = new URL(`${_api_apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.baseUrl}/geo/1.0/reverse`);

  const queryParams = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    limit: 1,
    appid: _api_apiKeyAndHost_js__WEBPACK_IMPORTED_MODULE_0__.apiKey,
  });

  const url = `${reverseGeoCodingUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      // eslint-disable-next-line camelcase
      const { local_names } = data[0];
      // eslint-disable-next-line camelcase
      const russianName = local_names?.ru || data[0].name;
      return `${russianName}`;
    } else {
      throw new Error("Локация не найдена");
    }
  } catch (error) {
    console.error(
      "Ошибка при получении названия локации (getLocationName)",
      error.message,
    );
    (0,_error_js__WEBPACK_IMPORTED_MODULE_2__.showError)("Ошибка при получении названия локации");
  }
}

async function fetchWeatherByCoords(latitude, longitude, locationName) {
  try {
    const weatherData = await (0,_api_getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_1__.getWeather)(latitude, longitude);
    const forecastData = await (0,_api_getWeatherAndForecast_js__WEBPACK_IMPORTED_MODULE_1__.getForecast)(latitude, longitude);

    (0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_3__.renderCurrentWeather)(weatherData, locationName);
    (0,_hourlyForecast_js__WEBPACK_IMPORTED_MODULE_4__.renderHourlyForecast)(forecastData);
    (0,_dailyForecast_js__WEBPACK_IMPORTED_MODULE_5__.renderDaylyForecast)(forecastData);
  } catch (error) {
    console.error(
      "Ошибка при получении погоды по координатам (fetchWeatherByCoords)",
      error.message,
    );
    (0,_error_js__WEBPACK_IMPORTED_MODULE_2__.showError)("Ошибка при получении погоды по координатам");
  }
}


/***/ }),

/***/ "./src/components/hourlyForecast.js":
/*!******************************************!*\
  !*** ./src/components/hourlyForecast.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderHourlyForecast: () => (/* binding */ renderHourlyForecast)
/* harmony export */ });
const hourlyForecastBlockEl = document.querySelector(".hourly-scroll");

function renderHourlyForecast(data) {
  hourlyForecastBlockEl.innerHTML = "";

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const daysOfWeek = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

  const timeZone = data.city.timezone * 1000;

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000 + timeZone);
    const hour = date.getHours();
    const temp = Math.round(item.main.temp);
    const icon = item.weather[0].icon;

    const forecastDate = new Date(date);
    forecastDate.setHours(0, 0, 0, 0);

    const timeDiff = forecastDate.getTime() - currentDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let dayEl;
    if (dayDiff === 0) {
      dayEl = "сегодня";
    } else if (dayDiff === 1) {
      dayEl = "завтра";
    } else {
      dayEl = daysOfWeek[forecastDate.getDay()];
    }

    const hourlyItem = document.createElement("div");
    hourlyItem.classList.add("hourly-item");
    hourlyItem.innerHTML = `
        <p class="hour">${dayEl}</p>
        <p class="hour">${hour}:00</p>
        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="Погода"
        />
        <p class="temp">${temp} °C</p>`;
    hourlyForecastBlockEl.append(hourlyItem);
  });
}


/***/ }),

/***/ "./src/components/inputForm.js":
/*!*************************************!*\
  !*** ./src/components/inputForm.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cityInput: () => (/* binding */ cityInput),
/* harmony export */   getWeatherByForm: () => (/* binding */ getWeatherByForm)
/* harmony export */ });
/* harmony import */ var _api_geoData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/geoData.js */ "./src/api/geoData.js");
/* harmony import */ var _showLastCities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./showLastCities.js */ "./src/components/showLastCities.js");



const searchForm = document.querySelector(".search-form");
const cityInput = document.querySelector(".city-input");

function getWeatherByForm() {
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    (0,_api_geoData_js__WEBPACK_IMPORTED_MODULE_0__.getGeoData)(cityInput);
  });

  cityInput.addEventListener("focus", () => {
    (0,_showLastCities_js__WEBPACK_IMPORTED_MODULE_1__.showLastCities)();
  });
}


/***/ }),

/***/ "./src/components/scrollToTop.js":
/*!***************************************!*\
  !*** ./src/components/scrollToTop.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scrollToTop: () => (/* binding */ scrollToTop)
/* harmony export */ });
const toTopEl = document.getElementById("to-top");

toTopEl.addEventListener("click", scrollToTop);

function scrollToTop() {
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


/***/ }),

/***/ "./src/components/showLastCities.js":
/*!******************************************!*\
  !*** ./src/components/showLastCities.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   showLastCities: () => (/* binding */ showLastCities)
/* harmony export */ });
/* harmony import */ var _api_geoData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/geoData.js */ "./src/api/geoData.js");
/* harmony import */ var _inputForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputForm.js */ "./src/components/inputForm.js");


const lastCitiesList = document.getElementById("recent-cities-list");

// сброс выпадающего меню по клику вне
document.addEventListener("click", (e) => {
  if (e.target !== _inputForm_js__WEBPACK_IMPORTED_MODULE_1__.cityInput && e.target !== lastCitiesList)
    lastCitiesList.style.display = "none";
});

//
function showLastCities() {
  const cities = JSON.parse(localStorage.getItem("citiesArr")) || [];
  if (cities.length === 0) return;

  lastCitiesList.innerHTML = "";

  cities.forEach((city) => {
    const liEl = document.createElement("li");
    liEl.textContent = city;
    liEl.addEventListener("click", () => {
      _inputForm_js__WEBPACK_IMPORTED_MODULE_1__.cityInput.value = city;
      lastCitiesList.style.display = "none";
      (0,_api_geoData_js__WEBPACK_IMPORTED_MODULE_0__.getGeoData)(city);
    });

    lastCitiesList.append(liEl);
  });

  lastCitiesList.style.display = "block";
}


/***/ }),

/***/ "./src/components/switchTheme.js":
/*!***************************************!*\
  !*** ./src/components/switchTheme.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   switchTheme: () => (/* binding */ switchTheme)
/* harmony export */ });
function switchTheme() {
  const switchThemeEl = document.getElementById("theme-switch");
  switchThemeEl.addEventListener("change", toggleTheme);
  let userHasChosenTheme = false;

  // определение текущей темы и новой темы
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    userHasChosenTheme = true;
    setTheme(newTheme);
  }

  // установка новой темы
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    if (userHasChosenTheme) {
      localStorage.setItem("theme", theme);
    }
  }

  // установка сохраненной темы из local storage
  // или тема браузера
  // или по времени суток (getThemeByTime)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const browserTheme = getBrowserTheme();
    if (browserTheme === "dark") {
      setTheme("dark");
    } else {
      const themeByTime = getThemeByTime();
      setTheme(themeByTime);
    }
  }

  // установка темы по времени суток
  function getThemeByTime() {
    const now = new Date().getHours();
    return now >= 7 && now <= 21 ? "light" : "dark";
  }

  // установки ос пользователя
  function getBrowserTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    } else {
      return "light";
    }
  }
}


/***/ }),

/***/ "./src/helpers/calcDayLength.js":
/*!**************************************!*\
  !*** ./src/helpers/calcDayLength.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcDayLenght: () => (/* binding */ calcDayLenght)
/* harmony export */ });
function calcDayLenght(sunrise, sunset) {
  const diffSeconds = sunset - sunrise;
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);

  return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
}


/***/ }),

/***/ "./src/helpers/calcSunPosition.js":
/*!****************************************!*\
  !*** ./src/helpers/calcSunPosition.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcSunPosition: () => (/* binding */ calcSunPosition),
/* harmony export */   updateSunPosition: () => (/* binding */ updateSunPosition)
/* harmony export */ });
function calcSunPosition(sunrise, sunset) {
  const now = Math.floor(Date.now() / 1000);
  const dayLength = sunset - sunrise;
  const elapsedTime = now - sunrise;

  const percent = elapsedTime / dayLength;
  return percent;
}

function updateSunPosition(sunPosition) {
  const sunGraphic = document.querySelector(".sun-graphic circle");

  if (sunPosition < 0 || sunPosition > 1) {
    sunGraphic.setAttribute("visibility", "hidden");
    return;
  }

  sunGraphic.setAttribute("visibility", "visible");

  const startX = 20;
  const endX = 180;
  const horizonY = 35;
  const arcRadius = 45;

  const x = startX + sunPosition * (endX - startX);
  const y = horizonY - Math.sin(sunPosition * Math.PI) * arcRadius;

  sunGraphic.setAttribute("cx", x);
  sunGraphic.setAttribute("cy", y);
}


/***/ }),

/***/ "./src/helpers/capitalize.js":
/*!***********************************!*\
  !*** ./src/helpers/capitalize.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalize: () => (/* binding */ capitalize)
/* harmony export */ });
function capitalize(city) {
  if (!city) {
    return city;
  }
  return city
    .toLowerCase()
    .split(/[\s-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


/***/ }),

/***/ "./src/helpers/checkCyrillic.js":
/*!**************************************!*\
  !*** ./src/helpers/checkCyrillic.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isCyrillic: () => (/* binding */ isCyrillic)
/* harmony export */ });
/* harmony import */ var _components_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/error.js */ "./src/components/error.js");


const cityInput = document.querySelector(".city-input");

//
function isCyrillic(text) {
  const cyrillicRules = /^[А-Яа-яЁё\s-]+$/;
  return cyrillicRules.test(text);
}

cityInput.addEventListener("input", () => {
  const inputValue = cityInput.value;
  if (inputValue && !isCyrillic(inputValue)) {
    (0,_components_error_js__WEBPACK_IMPORTED_MODULE_0__.showError)("Введите город на русском языке");
  } else {
    (0,_components_error_js__WEBPACK_IMPORTED_MODULE_0__.showError)("");
  }
});


/***/ }),

/***/ "./src/helpers/cityCorrect.js":
/*!************************************!*\
  !*** ./src/helpers/cityCorrect.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cityCorrect: () => (/* binding */ cityCorrect)
/* harmony export */ });
const cityAbbreviation = {
  мск: "Москва",
  спб: "Санкт-Петербург",
  екб: "Екатеринбург",
  нсб: "Новосибирск",
};

function cityCorrect(city) {
  const lowerCaseCity = city.toLowerCase();

  if (cityAbbreviation[lowerCaseCity]) {
    return cityAbbreviation[lowerCaseCity];
  }

  return lowerCaseCity;
}


/***/ }),

/***/ "./src/helpers/currentTime.js":
/*!************************************!*\
  !*** ./src/helpers/currentTime.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCurrentTime: () => (/* binding */ renderCurrentTime)
/* harmony export */ });
function renderCurrentTime() {
  const nowEl = document.querySelector(".now");

  const currentTime = new Date();
  const formattedTime = formatDate(currentTime);

  nowEl.textContent = `Сейчас: ${formattedTime}`;
}

function formatDate(currentTime) {
  const date = currentTime.toLocaleDateString("ru", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const time = currentTime.toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${date}, ${time}`;
}

setInterval(renderCurrentTime, 60000);


/***/ }),

/***/ "./src/helpers/formatTime.js":
/*!***********************************!*\
  !*** ./src/helpers/formatTime.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatTime: () => (/* binding */ formatTime)
/* harmony export */ });
function formatTime(time, timeZone) {
  const localTime = time + timeZone;

  const date = new Date(localTime * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
}


/***/ }),

/***/ "./src/helpers/humidityIndicator.js":
/*!******************************************!*\
  !*** ./src/helpers/humidityIndicator.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   humidityIndicator: () => (/* binding */ humidityIndicator)
/* harmony export */ });
function humidityIndicator(humidity) {
  const parameter = document.querySelector(".parameter");

  parameter.style.width = `${humidity}%`;
  parameter.style.backgroundColor = "white";
}


/***/ }),

/***/ "./src/helpers/saveCityToLocalStorage.js":
/*!***********************************************!*\
  !*** ./src/helpers/saveCityToLocalStorage.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   saveCityToLocalStorage: () => (/* binding */ saveCityToLocalStorage)
/* harmony export */ });
/* harmony import */ var _capitalize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capitalize.js */ "./src/helpers/capitalize.js");


function saveCityToLocalStorage(city) {
  const capitalizedCity = (0,_capitalize_js__WEBPACK_IMPORTED_MODULE_0__.capitalize)(city);
  let cities = JSON.parse(localStorage.getItem("citiesArr")) || [];

  if (!cities.includes(capitalizedCity)) {
    cities.unshift(capitalizedCity);
    if (cities.length > 5) {
      cities.pop();
    }
    localStorage.setItem("citiesArr", JSON.stringify(cities));
  }
}


/***/ }),

/***/ "./src/helpers/windDirectionIndicator.js":
/*!***********************************************!*\
  !*** ./src/helpers/windDirectionIndicator.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   windDirection: () => (/* binding */ windDirection)
/* harmony export */ });
function windDirection(currentWindDeg) {
  const windIcon = document.getElementById("wind-direction-icon");
  const windText = document.getElementById("wind-direction-text");

  const iconRotation = (currentWindDeg + 180) % 360;
  windIcon.style.transform = `rotate(${iconRotation}deg)`;

  const directions = ["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"];
  const normalizedDeg = (currentWindDeg + 360) % 360;

  const index = Math.round(normalizedDeg / 45) % 8;
  windText.textContent = directions[index] || "Н/Д";
}


/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initApp: () => (/* binding */ initApp)
/* harmony export */ });
/* harmony import */ var _components_switchTheme_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/switchTheme.js */ "./src/components/switchTheme.js");
/* harmony import */ var _api_geoData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api/geoData.js */ "./src/api/geoData.js");
/* harmony import */ var _components_inputForm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/inputForm.js */ "./src/components/inputForm.js");
/* harmony import */ var _helpers_currentTime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/currentTime.js */ "./src/helpers/currentTime.js");
/* harmony import */ var _components_geolocation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/geolocation.js */ "./src/components/geolocation.js");
/* harmony import */ var _components_scrollToTop_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/scrollToTop.js */ "./src/components/scrollToTop.js");
/* harmony import */ var _components_currentYear_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/currentYear.js */ "./src/components/currentYear.js");








function initApp() {
  (0,_components_switchTheme_js__WEBPACK_IMPORTED_MODULE_0__.switchTheme)();
  (0,_api_geoData_js__WEBPACK_IMPORTED_MODULE_1__.getGeoData)();
  (0,_components_inputForm_js__WEBPACK_IMPORTED_MODULE_2__.getWeatherByForm)();
  (0,_helpers_currentTime_js__WEBPACK_IMPORTED_MODULE_3__.renderCurrentTime)();
  (0,_components_geolocation_js__WEBPACK_IMPORTED_MODULE_4__.geoLocation)();
  (0,_components_scrollToTop_js__WEBPACK_IMPORTED_MODULE_5__.scrollToTop)();
  (0,_components_currentYear_js__WEBPACK_IMPORTED_MODULE_6__.getCurrentYear)();
}


/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./init.js */ "./src/init.js");



(0,_init_js__WEBPACK_IMPORTED_MODULE_1__.initApp)();

function fn1() {
  const myObj = { key: "property" };
  console.log(myObj.qwe.rty);
}

fn1();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map