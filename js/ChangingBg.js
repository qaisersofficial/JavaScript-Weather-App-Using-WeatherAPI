function setDynamicBackground(condition) {
  const hour = new Date().getHours();
  const body = document.querySelector("html");
  const searchButton = document.getElementById("search-btn");
  const changeColor = document.getElementById("current-weather-color");
    body.className = "";
    searchButton.style.backgroundColor = "";
    changeColor.style.color = "";
    // console.log(body);
  if (condition.includes("rain")) {
    body.classList.add("rainy");
    searchButton.style.backgroundColor = "#6e7f80";
    searchButton.style.color= "#010101";
  } else if (condition.includes("cloud")) {
    body.classList.add("cloudy");
    searchButton.style.backgroundColor = "#b0c4de";
    searchButton.style.color= "#162335";
  } else if (hour >= 6 && hour < 12) {
    body.classList.add("morning");
    searchButton.style.backgroundColor = "#ffd700";
    searchButton.style.color= "#552b00";
    changeColor.style.color = "	#5C4033";
  } else if (hour >= 12 && hour < 18) {
    body.classList.add("afternoon");
    searchButton.style.backgroundColor = "#007bff";
    changeColor.style.color="#FFFFFF";
  } else if (hour >= 18 || hour < 6) {
    body.classList.add("night");
    searchButton.style.backgroundColor = "#483d8b";
    searchButton.style.color= "#fadfb9";
    changeColor.style.color = "#000c66";
   
  } else {
    body.classList.add("default");
    searchButton.style.backgroundColor = "#007bff";
  }
}
export { setDynamicBackground };