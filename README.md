# Weather Application 🌤️
<p>
  A responsive weather application that fetches and displays real-time weather data for any location, with support for geolocation-based weather updates. The app dynamically adjusts its UI based on weather conditions and is fully optimized for various devices.
</p>
<hr>

 ## 🌍 Geolocation-Based Weather Updates
 <ul>
   <li>Automatically fetches and displays the weather data for the user’s current location on page load.</li>
   <li>Prompts the user to allow location access with fallback error handling if access is denied or unavailable.</li>
 </ul>
 
 ## 🎨 Dynamic UI Updates
 <ul>
   <li>Background dynamically changes based on the current weather condition (e.g., rainy, cloudy, morning, afternoon, or night).</li>
   <li>Adjusts seamlessly across devices using media queries for full responsiveness.</li>
 </ul>
 
  ## 🔍 Search Functionality
 <ul>
   <li>Allows users to search for weather data by entering a city name.</li>
   <li>Displays a 3-day weather forecast alongside current weather conditions.</li>
 </ul>
 
 ## ⚙️ Caching
 <ul>
   <li>Weather data is cached in localStorage for 30 minutes to minimize redundant API calls.</li>
 </ul>

   ## 🔄 Loading Spinner
 <ul>
   <li>Provides visual feedback while fetching weather data or processing geolocation requests.</li>
 </ul>
 
 ## ❌ Error Handling
 <p> <b>Displays user-friendly error messages for:</b> </p>
 <ul>
   <li>Invalid city names.</li>
   <li>Denied location permissions.</li>
    <li>API or network failures.</li>
 </ul>
 <hr>

## Technologies Used
### Frontend
**HTML5:** Structure of the app. <br>
**CSS3:** Styling and responsive design with media queries. <br>
**JavaScript (ES6):** Core functionality, including API calls and UI updates. <br>
### API
 <ul>
        <li><a href="https://www.weatherapi.com/">WeatherAPI</a>: Fetches real-time weather data and a 3-day forecast.</li>
    </ul>

## Setup Instructions
  <h3>1.  Clone the Repository </h3>
    <pre>
        <code>
            git clone &lt;https://github.com/qaisersofficial/JavaScript-Weather-App-Using-WeatherAPI.git&gt;
            cd JavaScript-Weather-App-Using-WeatherAPI
        </code>
    </pre>
    
 <h3>2. Open with live server</h3>

  <h3>3. Open the Application</h3>
  <p>Visit <a href="#">link here when I host it via netlify</a> (or your server URL) in the browser.</p>

  <hr>

  ## File Structure
  <pre>
      <code>
JAVASCRIPT-WEATHER-APP-USING-WEATHERAPI/
        ├── README.md                         # Project documentation
        ├── index.html                        # Main HTML file
        ├── Stylesheets/
        │   ├── styles.css                    # Main stylesheet
        │   ├── settingUpTheBGofBody.css      # Stylesheet for background changes
        │   ├── searchbar.css                 # Stylesheet for seachbar on webpage
        │   ├── search-section.css            # Stylesheet for search section with its search button
        │   ├── Header.css                    # Stylesheet for header section
        │   ├── loader.css                    # Stylesheet for the spinner
        │   ├── current-weather.css           # Stylesheet for current weather container
        │   ├── AppData-container.css         # Stylesheet for the major container
        │   ├── 3-Days-Forcast.css            # Stylesheet for ui of fore-casting
        ├── js/
        │   ├── code.js               # Entry point, integrates all functionality
        │   ├── geolocation.js        # Handles geolocation-based weather fetching
        │   ├── ui.js                 # Manages UI updates
        │   ├── api.js                # Handles API calls and caching
        │   ├── events.js             # Event handler on search button click 
        │   ├── utils.js              # Spinner and utility functions
        │   ├── ChangingBg.js         # Dynamic background changes
        ├── images/                   # Background and weather icons
        </code>
    </pre>
<hr>

  ## How It Works
  <ol>
      <li><strong>Page Load (Geolocation):</strong>
          <ul>
                <li>The app prompts the user to allow location access.</li>
                <li>If allowed, it fetches weather data for the current location and updates the UI dynamically.</li>
            </ul>
        </li>
        <li><strong>Search Functionality:</strong>
            <ul>
                <li>Users can search for any city.</li>
                <li>The app fetches real-time weather data and displays it along with a 3-day forecast.</li>
            </ul>
        </li>
        <li><strong>Dynamic Background:</strong>
            <ul>
                <li>The background changes based on weather conditions (e.g., rainy, cloudy, sunny).</li>
            </ul>
        </li>
        <li><strong>Responsive Design:</strong>
            <ul>
                <li>Media queries ensure the app looks great on all devices (mobile, tablet, desktop).</li>
            </ul>
        </li>
    </ol>
<hr>

  ## Contributing
  <p>Contributions are welcome! If you'd like to contribute:</p>
  <ol>
      <li>Fork the repository.</li>
        <li>Create a new branch: <code>git checkout -b feature-name</code>.</li>
        <li>Commit your changes: <code>git commit -m "Add a new feature"</code>.</li>
        <li>Push to the branch: <code>git push origin feature-name</code>.</li>
        <li>Open a pull request.</li>
    </ol>
<hr>

  ## License
  <p>This project is licensed under the MIT License.</p>
