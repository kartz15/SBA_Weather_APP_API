import { fetchCitySuggestions ,clearCityList} from './modules/geoNamesApi.mjs';
import { initializeWeatherApp, fetchWeather } from "./modules/weatherApi.mjs";

function initializeApp() {
    initializeWeatherApp(); // Set up weather fetching
    const cityInput = document.getElementById('cityInput');

    cityInput.addEventListener('input', async () => {
        const inputValue = cityInput.value;
        if (inputValue) {
            const cities = await fetchCitySuggestions(inputValue);
            updateCityList(cities);
        } else {
            clearCityList();
        }
    });
}

function updateCityList(cities) {
    const datalist = document.getElementById('cityList');
    datalist.innerHTML = ''; 

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name + (city.adminName1 ? ', ' + city.adminName1 : '');
        datalist.appendChild(option);
    });
}

// Initialize the app
initializeApp();
