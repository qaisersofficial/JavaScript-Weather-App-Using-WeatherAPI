const API_KEY = "348a0d8017f1448a91d171151242311";
const FORECAST_URL = "https://api.weatherapi.com/v1/forecast.json";
const Chache_Exp_Time = 30 * 60 * 1000; // 30 minutes

// Fetch weather data from the API
export async function fetchWeatherData(city) {
  const url = `${FORECAST_URL}?key=${API_KEY}&q=${city}&days=3`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City not found: ${response.status}`);
    }
    const data = await response.json();
    cacheWeatherData(city, data);
    return data;
  } catch (error) {
    throw error; // Error will be caught in code.js 
  }
}

// Cache weather data in localStorage
export function cacheWeatherData(city, data) {
  const cacheData = {
    timestamp: new Date().getTime(),
    data: data,
  };
  localStorage.setItem(city, JSON.stringify(cacheData));
}

// Retrieve cached weather data
export function getCachedWeatherData(city) {
  const cachedData = localStorage.getItem(city);
  if (!cachedData) return null;

  const parsedData = JSON.parse(cachedData);
  const currentTime = new Date().getTime();

  if (currentTime - parsedData.timestamp > Chache_Exp_Time) {
    localStorage.removeItem(city);
    return null;
  }

  return parsedData.data;
}