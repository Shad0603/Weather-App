const express = require('express');
const app = express();


const port = 3000;

const weatherData = require("../utils/weatherdata");

app.get('/', (req, res) => {
    res.send('GET request to the / route');
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.status(400).send("Address is required");
    }

    weatherData(req.query.address, (error, result) => {
        if (error) {
            return res.status(500).send(result); // Send the error message from the callback
        }
        res.json(result);
    });
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