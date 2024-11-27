import { fetchWeatherData, getCachedWeatherData } from "./api.js";
import { updateWeatherUI, clearWeatherUI, displayErrorMessage } from "./ui.js";
import { showSpinner, hideSpinner } from "./utils.js";

export async function handleSearchButtonClick() {
  const cityInput = document.getElementById("city-input").value.trim();

  if (!cityInput) {
    displayErrorMessage("Please enter a valid city name!");
    return;
  }

  const cachedData = getCachedWeatherData(cityInput);

  if (cachedData) {
    updateWeatherUI(cachedData);
  } else {
    showSpinner();
    clearWeatherUI();
    try {
      const weatherData = await fetchWeatherData(cityInput);
      updateWeatherUI(weatherData);
    } catch (error) {
      displayErrorMessage(error.message);
    } finally {
      hideSpinner();
    }
  }
}
