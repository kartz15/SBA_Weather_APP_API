import { fetchCitySuggestions} from './modules/geoNamesApi.mjs';
import { initializeWeatherApp, fetchWeather } from "./modules/weatherApi.mjs";

function initializeApp() {
    initializeWeatherApp(); 
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
function clearCityList() {
    const datalist = document.getElementById('cityList');
    datalist.innerHTML = ''; 
}

// Initialize the app
initializeApp();
