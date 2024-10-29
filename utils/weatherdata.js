// This file acts as a utility module that handles the interaction with the OpenWeatherMap API.
// It is responsible for data fetching as well as some error handling

const axios = require('axios');

const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    COORDS_BASE_URL: "https://api.openweathermap.org/data/2.5/weather?",
    FORECAST_BASE_URL: "https://api.openweathermap.org/data/2.5/forecast?",
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


// function to get weather data using coordinates
const weatherDataByCoords = async (lat, lon, callback) => {
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${openWeatherMap.SECRET_KEY}&units=metric`;
    const url = openWeatherMap.COORDS_BASE_URL +
        "lat=" + encodeURIComponent(lat) +
        "&lon=" + encodeURIComponent(lon) +
        "&APPID=" + openWeatherMap.SECRET_KEY +
        "&units=metric"; // Include units = metric for Celsius

    console.log(url); // Debug log

    try {
        const response = await axios.get(url);
        callback(false, response.data);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            callback(true, "Invalid API key. Please check your API key and try again.");
        } else if (error.response && error.response.status === 404) {
            callback(true, "Location not found. Please check your input.");
        } else {
            callback(true, "Unable to fetch data, please try again. " + error.message);
        }
    }
};

// Function to get weather forecast for a specified number of days
const weatherForecast = async (lat, lon, days, callback) => {
    const url = openWeatherMap.FORECAST_BASE_URL +
        "lat=" + encodeURIComponent(lat) +
        "&lon=" + encodeURIComponent(lon) +
        "&cnt=" + days +
        "&appid=" + openWeatherMap.SECRET_KEY +
        "&units=metric"; // Include units = metric for Celsius

    console.log(url); // Debug log

    try {
        const response = await axios.get(url);
        callback(false, response.data);
    } catch (error) {
        if (error.response && error.response.status === 401) {
            callback(true, "Invalid API key. Please check your API key and try again.");
        } else if (error.response && error.response.status === 404) {
            callback(true, "Location not found. Please check your input.");
        } else {
            callback(true, "Unable to fetch data, please try again. " + error.message);
        }
    }
};


// Export the function so it can be used in other files
module.exports = { weatherData, weatherDataByCoords , weatherForecast};