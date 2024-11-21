function setDynamicBackground(condition) {
  const hour = new Date().getHours();
  const bgDiv = document.getElementById("weatherapp-container");
  const searchButton = document.getElementById("search-btn");
    bgDiv.className = "";
    searchButton.style.backgroundColor = "";
    // console.log(bgDiv);
  if (condition.includes("rain")) {
    bgDiv.classList.add("rainy");
    searchButton.style.backgroundColor = "#6e7f80";
    searchButton.style.color= "#010101";
  } else if (condition.includes("cloud")) {
    bgDiv.classList.add("cloudy");
    searchButton.style.backgroundColor = "#b0c4de";
    searchButton.style.color= "#162335";
  } else if (hour >= 6 && hour < 12) {
    bgDiv.classList.add("morning");
    searchButton.style.backgroundColor = "#ffd700";
    searchButton.style.color= "#552b00";
  } else if (hour >= 12 && hour < 18) {
    bgDiv.classList.add("afternoon");
    searchButton.style.backgroundColor = "#007bff";
  } else if (hour >= 18 || hour < 6) {
    bgDiv.classList.add("night");
    searchButton.style.backgroundColor = "#483d8b";
    searchButton.style.color= "#fadfb9";
   
  } else {
    bgDiv.classList.add("default");
    searchButton.style.backgroundColor = "#007bff";
  }
}

// Simulate calling the function (replace with actual weather condition)
const mockWeatherCondition = ""; // Example: 'clear', 'clouds', 'rain'
setDynamicBackground(mockWeatherCondition);
