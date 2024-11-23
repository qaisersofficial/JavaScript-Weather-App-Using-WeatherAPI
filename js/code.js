// Base URL and API Key for WeatherAPI
const API_KEY = "13ad90ae1a9f4d7384484112241911";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

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
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null;
  }
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
  // Show spinner before starting the fetch process
  showSpinner();
  clearWeatherUI();
  const weatherData = await fetchWeatherData(cityInput);
  // Hide spinner after the data is fetched
  hideSpinner();
  updateWeatherUI(weatherData);
}
