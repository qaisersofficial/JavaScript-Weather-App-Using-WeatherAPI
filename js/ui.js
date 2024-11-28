import { setDynamicBackground } from "./ChangingBg.js";
export function updateWeatherUI(data) {
    const weatherCard = document.getElementById("weather-card");
    const forecastCards = document.getElementById("forecast-cards");
  
    if (data) {
        const condition = data.current.condition.text.toLowerCase(); 
        setDynamicBackground(condition);
      // Populate current weather details
      document.getElementById("city-name").textContent = data.location.name;
      document.getElementById("temperature").textContent = `${data.current.temp_c}°C`;
      document.getElementById("humidity").textContent = `${data.current.humidity}%`;
      document.getElementById("wind-speed").textContent = `${data.current.wind_kph} km/h`;
      document.getElementById("weather-icon").src = data.current.condition.icon;
      document.getElementById("weather-icon").alt = data.current.condition.text;
      document.getElementById("last-updated").textContent = ` ${data.current.last_updated}`;
      weatherCard.classList.remove("hidden");
  
      // Populate forecast data
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
  
  // Display an error message
  export function displayErrorMessage(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    setTimeout(() => {
      errorMessage.classList.add("hidden");
    }, 5000);
  }
  
  // Clear the weather and forecast UI
  export function clearWeatherUI() {
    document.getElementById("weather-card").classList.add("hidden");
    document.getElementById("error-message").classList.add("hidden");
    document.getElementById("forecast-cards").classList.add("hidden");
  }