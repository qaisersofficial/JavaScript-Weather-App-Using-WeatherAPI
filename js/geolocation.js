import { fetchWeatherData } from "./api.js"; // API se weather fetch karne ka function
import { updateWeatherUI, displayErrorMessage } from "./ui.js"; // UI update aur error display ke liye
import { showSpinner, hideSpinner } from "./utils.js"; // Spinner show/hide karne ke liye

export async function getGeolocationWeather() {
  // Browser mein geolocation support check karein
  if (!navigator.geolocation) {
    displayErrorMessage("Geolocation is not supported by your browser.");
    return;
  }
else{
  // Spinner ko dikhayein jab tak location retrieve ho rahi ho
  showSpinner();

  // Geolocation fetch karein
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        // console.log("Latitude:", latitude, "Longitude:", longitude); // Debugging ke liye
        const locationCity = `${latitude},${longitude}`; // Latitude aur longitude ko city bannae k liye
        const weatherData = await fetchWeatherData(locationCity); // API ka function call kr k weather data fetch kiya
        hideSpinner();

        if (weatherData) {
          updateWeatherUI(weatherData); // Weather UI ko update karein
        } else {
          displayErrorMessage("Unable to fetch weather data for your location.");
        }
      } catch (error) {
        hideSpinner();
        displayErrorMessage("Failed to retrieve location-based weather data.");
        console.error("Geolocation error:", error.message);
      }
    
    },
    (error) => {
      hideSpinner();
      // Geolocation errors ka handling
      switch (error.code) {
        case error.PERMISSION_DENIED:
          displayErrorMessage("Location access denied. Please allow it to fetch weather data.");
          break;
        case error.POSITION_UNAVAILABLE:
          displayErrorMessage("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          displayErrorMessage("The request to get user location timed out.");
          break;
        default:
          displayErrorMessage("An unknown error occurred.");
          break;
      }
    }
  );
}
}