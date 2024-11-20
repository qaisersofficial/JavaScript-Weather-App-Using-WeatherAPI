function setDynamicBackground(condition) {
  const hour = new Date().getHours();
  const bgDiv = document.getElementById("weatherapp-container");
    bgDiv.className = "";
    // console.log(bgDiv);
  if (condition.includes("rain")) {
    bgDiv.classList.add("rainy");
  } else if (condition.includes("cloud")) {
    bgDiv.classList.add("cloudy");
  } else if (hour >= 6 && hour < 12) {
    bgDiv.classList.add("morning");
  } else if (hour >= 12 && hour < 18) {
    bgDiv.classList.add("afternoon");
  } else if (hour >= 18 || hour < 6) {
    bgDiv.classList.add("night");
  } else {
    bgDiv.classList.add("default");
  }
}

// Simulate calling the function (replace with actual weather condition)
const mockWeatherCondition = ""; // Example: 'clear', 'clouds', 'rain'
setDynamicBackground(mockWeatherCondition);
