export {fetchCitySuggestions }

const GEO_NAMES_USERNAME = 'karthi5565'; 
const GEO_NAMES_URL = `http://api.geonames.org/searchJSON?username=${GEO_NAMES_USERNAME}&style=full&maxRows=10&name_startsWith=`;

 async function fetchCitySuggestions(query) {
    try {
        const response = await fetch(`${GEO_NAMES_URL}${query}`);
        const data = await response.json();
        return data.geonames || [];
    } catch (error) {
        console.error("Error fetching city suggestions:", error);
        return [];
    }
}

