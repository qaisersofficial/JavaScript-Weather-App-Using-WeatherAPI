// Base URL and API Key for WeatherAPI
const API_KEY = "348a0d8017f1448a91d171151242311";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";
const FORECAST_URL = "https://api.weatherapi.com/v1/forecast.json";
// chache expiration time 
const chacheExpTime = 30 * 60 * 1000;
// Feth weather data (current and forecast) for a city
async function fetchWeatherData(city) {
  const url = `${FORECAST_URL}?key=${API_KEY}&q=${city}&days=3`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City not found: ${response.status}`);
    }
    const data = await response.json();
    chacheWeatherData(city, data);
    return data;
  } catch (error) {
    displayErrorMessage(error.message);
  }
}
function displayErrorMessage(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  setTimeout(() => {
    errorMessage.classList.add("hidden");
  }, 5000);
}
// Cache weather data for a city
function chacheWeatherData(city, data) {
  const chacheData = {
    timestap: new Date().getTime(),
    data: data,
  };
  localStorage.setItem(city, JSON.stringify(chacheData));
}
// Get cached weather data for a city and not expired
function getCachedWeatherData(city) {
  const cachedData = localStorage.getItem(city);
  if (!cachedData) return null;

  const parsedData = JSON.parse(cachedData);
  const currentTime = new Date().getTime();

  // If the cached data is expired, remove it
  if (currentTime - parsedData.timestamp > chacheExpTime) {
    localStorage.removeItem(city);
    return null;
  }

  return parsedData.data;
}
//  Clear the current weather display
function clearWeatherUI() {
  document.getElementById("weather-card").classList.add("hidden");
  document.getElementById("error-message").classList.add("hidden");
  document.getElementById("forecast-cards").classList.add("hidden");
} 
//  Update the UI with fetched weather data

function updateWeatherUI(data) {
  const errorMessage = document.getElementById("error-message");
  const weatherCard = document.getElementById("weather-card");
  const forecastCards = document.getElementById("forecast-cards");

  if (data) {
    // Populate data into the DOM
    document.getElementById("city-name").textContent = data.location.name;
    document.getElementById("temperature").textContent = `${data.current.temp_c}°C`;
    document.getElementById("humidity").textContent = `${data.current.humidity}%`;
    document.getElementById("wind-speed").textContent = `${data.current.wind_kph} km/h`;
    document.getElementById("weather-icon").src = data.current.condition.icon;
    document.getElementById("weather-icon").alt = data.current.condition.text;
    document.getElementById("last-updated").textContent = ` ${data.current.last_updated}`;
    weatherCard.classList.remove("hidden");
    // Update forecast
    forecastCards.innerHTML = "";
    data.forecast.forecastday.forEach((day) => {
      const forecastCard = document.createElement("div");
      forecastCard.classList.add("forecast-card");

      forecastCard.innerHTML = `
        <div class="day"><h3>${new Date(day.date).toLocaleDateString("en-US", {
          weekday: "short",
        })}</h3></div>
        <div class="forcastImage">
          <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" />
        </div>
        <div class="high_low">
          <p><span class="high">${day.day.maxtemp_c}°C</span> <span class="low">${day.day.mintemp_c}°C</span></p>
        </div>
      `;
      forecastCards.appendChild(forecastCard);
    });
    forecastCards.classList.remove("hidden");

  } else {
    clearWeatherUI();
    displayErrorMessage("Unable to update weather information.");
  }
}
//  Show the spinner while fetching data
function showSpinner() {
  const spinner = document.querySelector(".loader");
  spinner.style.display = "grid";
}
// Hide the spinner after fetching data
function hideSpinner() {
  const spinner = document.querySelector(".loader");
  spinner.style.display = "none";
}
//  Handle the search button click event

async function handleSearchButtonClick() {
  const cityInput = document.getElementById("city-input").value.trim();

  if (!cityInput) {
    displayErrorMessage("Please enter a valid city name!");
    return;
  }
  // Check if there's cached data available for the city
  const cachedData = getCachedWeatherData(cityInput);

  if (cachedData) {
    // If cached data is available, use it and skip the API call
    updateWeatherUI(cachedData);
  } else {
  // Show spinner before starting the fetch process
  showSpinner();
  clearWeatherUI();
  const weatherData = await fetchWeatherData(cityInput);
  // Hide spinner after the data is fetched
  hideSpinner();
  updateWeatherUI(weatherData);
}
}
// Show spinner on page load
window.onload = function () {
  showSpinner();
  setTimeout(hideSpinner, 1000);
};
