// Base URL and API Key for WeatherAPI
const API_KEY = "348a0d8017f1448a91d171151242311";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";
// chache expiration time 
const chacheExpTime = 30 * 60 * 1000;
/** 
    Fetch weather data from the API
    @param {string} city - The city name to fetch data for
    @returns {object|null} - JSON weather data or null on failure
 */
async function fetchWeatherData(city) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${city}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City not found: ${response.status}`);
    }
    const data = await response.json();
    chacheWeatherData(city, data);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null;
  }
}
/**
  Cache the weather data in localStorage with a timestamp
 @param {string} city - The city name to fetch data
 @param {object} data - The weather data to cache
 */
function chacheWeatherData(city, data) {
  const chacheData = {
    timestap: new Date().getTime(),
    data: data
  };
  localStorage.setItem(city, JSON.stringify(chacheData));
}
/**
 * Get cached weather data for a city if it exists and is not expired
 @param {string} city - The city name
 @returns {object|null} - Cached weather data or null if expired or not found
 */
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
}

/** 
 Update the UI with fetched weather data
 @param {object} data - The weather data to display
 */
function updateWeatherUI(data) {
  const errorMessage = document.getElementById("error-message");
  const weatherCard = document.getElementById("weather-card");

  if (data) {
    errorMessage.classList.add("hidden");
    weatherCard.classList.remove("hidden");

    // Populate data into the DOM
    document.getElementById("city-name").textContent = data.location.name;
    document.getElementById("temperature").textContent = `${data.current.temp_c}°C`;
    document.getElementById("humidity").textContent = `${data.current.humidity}%`;
    document.getElementById("wind-speed").textContent = `${data.current.wind_kph} km/h`;
    document.getElementById("weather-icon").src = data.current.condition.icon;
    document.getElementById("last-updated").textContent = ` ${data.current.last_updated}`;
  } else {
    errorMessage.classList.remove("hidden");
    weatherCard.classList.add("hidden");
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
    alert("Please enter a city name!");
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
