export {fetchWeather,initializeWeatherApp,addToHistory}
import{clearCityList} from "./geoNamesApi.mjs";

const API_KEY = "26c08ba67736bc5ca8daa4707cc564fc";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function initializeWeatherApp() {
    const fetchWeatherButton = document.getElementById('fetchWeatherButton');
    fetchWeatherButton.addEventListener('click', () => {
        const cityInput = document.getElementById('cityInput').value;
        if (cityInput) {
            fetchWeather(cityInput);
        } else {
            alert('Please Enter City Name.');
        }
    });
}

async function fetchWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
        const jsonData = await response.json();

        if (jsonData.cod === 200) {
            // Extract weather details
            const weatherDescription = jsonData.weather.map(w => w.description).join(", ");
            const temperatureK = jsonData.main.temp;
            const temperatureCelsius = temperatureK - 273.15;
            const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
            const humidity = jsonData.main.humidity;
            const windSpeed = jsonData.wind.speed;
            const cloudCover = jsonData.clouds.all;
            const visibility = jsonData.visibility / 1000; // Convert meters to kilometers
            const cityName = jsonData.name;
            const countryCode = jsonData.sys.country;

            // Update the DOM with weather data
            document.getElementById('weatherInfo').innerHTML = ` 
                <div class="displayWeather">
                <h2>Weather in ${cityName}, ${countryCode}</h2>
                <p>Description: ${weatherDescription}</p>
                <p>Temperature: ${temperatureCelsius.toFixed(2)} °C (${temperatureFahrenheit.toFixed(2)} °F)</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
                <p>Cloud Cover: ${cloudCover}%</p>
                <p>Visibility: ${visibility.toFixed(2)} km</p>
                </div>
            `;

            // Add the search data to the history table
            addToHistory(cityName, countryCode, temperatureCelsius.toFixed(2), weatherDescription);
            
            document.getElementById('cityInput').value = '';
            clearCityList();

        } else {
            document.getElementById('weatherInfo').innerHTML = `<p>Error: ${jsonData.message}</p>`;
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to add data to the history table
function addToHistory(cityName, countryCode, temperatureCelsius, weatherDescription) {
    const tableBody = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    const row = tableBody.insertRow();
    
    row.insertCell(0).textContent = cityName;
    row.insertCell(1).textContent = countryCode;
    row.insertCell(2).textContent = temperatureCelsius;
    row.insertCell(3).textContent = weatherDescription;
}
