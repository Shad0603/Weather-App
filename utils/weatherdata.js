// This file acts as a utility module that handles the interaction with the OpenWeatherMap API.
// It is responsible for data fetching as well as some error handling

const axios = require('axios');


const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    COORDS_BASE_URL: "https://api.openweathermap.org/data/2.5/weather?",
    FORECAST_BASE_URL: "https://api.openweathermap.org/data/2.5/forecast?", // This works for the 5-day forecast
    SECRET_KEY: "a7500de537763c63c3568504ba59830c"
}

// Define a function to get weather data
// const weatherData = async (address, callback) => {
//     // Construct the URL for the API request
//     const url = openWeatherMap.BASE_URL +
//         encodeURIComponent(address) + // encodes the city name to ensure its a valid url component
//         "&APPID=" +
//         openWeatherMap.SECRET_KEY +
//         "&units=metric"; // Include units = metric for Celsius
//
//     console.log(url); // Debug log
//
//     try {
//         // Make an HTTP GET request to the OpenWeatherMap API
//         const response = await axios.get(url);
//
//         // If request is successful, pass the data to the callback
//         callback(false, response.data); // Pass the data to the callback, with 'false' indicating no error
//     } catch (error) {
//         // If the error is due to an invalid API key
//         if (error.response && error.response.status === 401) {
//             callback(true, "Invalid API key. Please check your API key and try again.");
//         } else if (error.response && error.response.status === 404) {
//             // If the error is due to a city not being found
//             callback(true, "City not found. Please check your input.");
//         } else {
//             // If there's any other error, pass an error message to the callback
//             callback(true, "Unable to fetch data, please try again. " + error.message); // Handle errors
//         }
//     }
// };

// Define a function to get weather data
const weatherData = (address) => {
    // Construct the URL for the API request
    const url = openWeatherMap.BASE_URL +
        encodeURIComponent(address) + // encodes the city name to ensure its a valid url component
        "&APPID=" +
        openWeatherMap.SECRET_KEY +
        "&units=metric"; // Include units = metric for Celsius

    console.log(url); // Debug log

    // Make an HTTP GET request to the OpenWeatherMap API
    return axios.get(url)
    // If request is successful, return the data
        .then(response => response.data)
        .catch(error => {
            let errorMessage;
            // If the error is due to an invalid API key
            if (error.response && error.response.status === 401) {
                errorMessage = "Invalid API key. Please check your API key and try again.";
            } else if (error.response && error.response.status === 404) {
                // If the error is due to a city not being found
                errorMessage="City not found. Please check your input.";
            } else {
                // If there's any other error, pass an error message to the callback
                errorMessage="Unable to fetch data, please try again. "; // Handle errors
            }
            throw new Error(errorMessage);
    });
};


// function to get weather data using coordinates
const weatherDataByCoords = (lat, lon) => {
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${openWeatherMap.SECRET_KEY}&units=metric`;
    const url = openWeatherMap.COORDS_BASE_URL +
        "lat=" + encodeURIComponent(lat) +
        "&lon=" + encodeURIComponent(lon) +
        "&APPID=" + openWeatherMap.SECRET_KEY +
        "&units=metric"; // Include units = metric for Celsius

    console.log(url); // Debug log

    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            let errorMessage;
            if (error.response && error.response.status === 401) {
                errorMessage = "Invalid API key. Please check your API key and try again.";
            } else if (error.response && error.response.status === 404) {
                errorMessage = "Location not found. Please check your input.";
            } else {
                errorMessage = "Unable to fetch data, please try again. ";
            }
            throw new Error(errorMessage);
        });
};

// Function to get weather forecast for 5 days
const weatherForecast = (lat, lon) => {
    const url = openWeatherMap.FORECAST_BASE_URL +
        "lat=" + encodeURIComponent(lat) +
        "&lon=" + encodeURIComponent(lon) +
        // "&cnt=" + days +
        "&appid=" + openWeatherMap.SECRET_KEY +
        "&units=metric"; // Include units = metric for Celsius

    console.log(url); // Debug log


    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            let errorMessage;
            if (error.response && error.response.status === 401) {
                errorMessage = "Invalid API key. Please check your API key and try again.";
            } else if (error.response && error.response.status === 404) {
                errorMessage = "Location not found. Please check your input.";
            } else {
                errorMessage = "Unable to fetch data, please try again. ";
            }
            throw new Error(errorMessage);
        });
};

// Export the function so it can be used in other files
module.exports = { weatherData, weatherDataByCoords , weatherForecast};