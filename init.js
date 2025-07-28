import { switchTheme } from "./components/switchTheme.js";
import { getGeoData } from "./src/api/geoData.js";
import { getWeatherByForm } from "./components/inputForm.js";
import { renderCurrentTime } from "./src/helpers/currentTime.js";
import { geoLocation } from "./components/geolocation.js";
import { scrollToTop } from "./components/scrollToTop.js";
import { getCurrentYear } from "./components/currentYear.js";

export function initApp() {
  switchTheme();
  getGeoData();
  getWeatherByForm();
  renderCurrentTime();
  geoLocation();
  scrollToTop();
  getCurrentYear();
}
