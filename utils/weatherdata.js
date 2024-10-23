const axios = require('axios');

const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: "a7500de537763c63c3568504ba59830c"
}

// Define a function to get weather data
const weatherData = async (address, callback) => {
    // Construct the URL for the API request
    const url = openWeatherMap.BASE_URL +
        encodeURIComponent(address) +
        "&APPID=" +
        openWeatherMap.SECRET_KEY +
        "&units=metric"; // Include units = metric for Celsius

    console.log(url); // Debug log

    try {
        // Make an HTTP GET request to the OpenWeatherMap API
        const response = await axios.get(url);

        // If request is successful, pass the data to the callback
        callback(false, response.data); // Pass the data to the callback
    } catch (error) {
        // If the error is due to an invalid API key
        if (error.response && error.response.status === 401) {
            callback(true, "Invalid API key. Please check your API key and try again.");
        } else if (error.response && error.response.status === 404) {
            // If the error is due to a city not being found
            callback(true, "City not found. Please check your input.");
        } else {
            // If there's any other error, pass an error message to the callback
            callback(true, "Unable to fetch data, please try again. " + error.message); // Handle errors
        }
    }
};

// Export the function so it can be used in other files
module.exports = weatherData;