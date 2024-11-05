// This file serves as the main entry point to the node.js application.
// It sets up the express server, defines the routes, and handles the incoming HTTP requests.

const express = require('express');
const app = express();
const port = 3000;

// import functions
const { weatherData, weatherDataByCoords, weatherForecast} = require("../utils/weatherdata");

// test route
app.get('/', (req, res) => {
    res.send('GET request to the / route');
});

// Route handler for single city as well as thresholded multi-city query
app.get("/weather", (req, res) => {
    const { address, threshold, cities } = req.query; // Setting up for extraction of query parameters

    if (address) {
        // Fetch weather data for the specified city
        weatherData(address)
            .then(response => res.json(response))
            .catch(error=> res.status(500).send(error));

    }else if (threshold && cities) {
        // Convert cities query string to an array
        const citiesArray = cities.split(',');

        // Fetch weather data for each city and filter by min. temperature threshold
        const weatherPromises = citiesArray.map(city =>
            weatherData(city)
                .then(response => {
                    if (response.main.temp >= threshold) {
                        return response;
                    }
                    return null;
                })
                .catch(error => {
                    console.log(`Request failed for city ${city} with error: ${JSON.stringify(error)}`);
                    return null;
                })
        );

        // Wait for all promises to resolve
        Promise.all(weatherPromises)
            .then(results => {
                const filteredResults = results.filter(result => result !== null); // filter out null values
                res.json(filteredResults); // return the final results
            })
            .catch(error => res.status(500).send("An error occurred while processing the requests"));
    } else {
        res.status(400).send("Either address or cities with threshold are required");
    }
});

// Route for weather by coordinates
app.get("/weather/coords", async (req, res) => {
    const { lat, lon } = req.query;

    if (lat && lon) {
        weatherDataByCoords(lat, lon)
            .then(result => res.json(result))
            .catch(error => res.status(500).send(error.message))
    } else {
        res.status(400).send("Latitude and longitude are required");
    }
});

// Route for 5-day weather forecast
app.get("/weather/forecast/5", async (req, res) => {
    const { lat, lon } = req.query;

    if (lat && lon) {
        weatherForecast(lat, lon)
            .then(result => res.json(result))
            .catch(error => res.status(500).send(error.message))
    } else {
        res.status(400).send("Latitude and longitude are required");
    }
});

// Handle the undefined routes
app.get("*", (req,res)=>{
    res.send("This route doesnt exist");
})

// Start the server and have it listen on the defined port
// When the server starts, log a message to the console
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});