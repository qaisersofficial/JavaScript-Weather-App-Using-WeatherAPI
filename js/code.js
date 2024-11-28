import {handleSearchButtonClick} from "./events.js";
import { showSpinner, hideSpinner } from "./utils.js";
import { getGeolocationWeather } from "./geolocation.js";

window.onload = function () {
  showSpinner();
  setTimeout(hideSpinner, 1000);
  getGeolocationWeather();
};

document.getElementById("search-btn").addEventListener("click", handleSearchButtonClick);