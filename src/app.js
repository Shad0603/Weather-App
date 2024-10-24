const express = require('express');
const app = express();

const port = 3000;

const weatherData = require("../utils/weatherdata");

app.get('/', (req, res) => {
    res.send('GET request to the / route');
});

// Route handler for single city as well as thresholded multi-city query
app.get("/weather", async (req, res) => {
    const { address, threshold, cities } = req.query; // Setting up for extraction of query parameters

    if (address) {
        // Fetch weather data for the specified city
        weatherData(address, (error, result) => {
            if (error) {
                return res.status(500).send(result); // Send the error message from the callback
            }
            return res.json(result); // Send the weather data as JSON
        });
    } else if (threshold && cities) {
        // Convert cities query string to an array
        const citiesArray = cities.split(',');

        // Fetch weather data for each city and filter by threshold
        const results = [];
        let count = 0;

        for (const city of citiesArray) {
            weatherData(city, (error, result) => {
                count++;
                if (!error && result.main.temp > threshold) {
                    results.push(result);
                }

                // When all cities have been processed, return the results
                if (count === citiesArray.length) {
                    return res.json(results); // Send the filtered weather data as JSON
                }
            });
        }
    } else {
        res.status(400).send("Either address or cities with threshold are required");
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