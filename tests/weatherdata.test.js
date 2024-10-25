const weatherData = require('../utils/weatherdata');


test('fetches weather data for a valid city', done => {
    const address = 'London' // Define the city to be tested

    weatherData(address, (error, data) => {

        expect(error).toBe(false);

        expect(data).toHaveProperty('main.temp');
        // Signal Jest that the asynchronous test is complete
        done();
    });
});

test('returns an error for an invalid city', done => {
    const address = 'invalidCity'

    weatherData(address, (error, data) => {

        expect(error).toBe(true);

        expect(data).toBe('City not found. Please check your input.');
        // Signal Jest that the asynchronous test is complete
        done();
    });
});


// WORK IN PROGRESS -----
// test for invalid API key

// mocking process
// const axios = require('axios');
// jest.mock('axios'); // Mock axios to control its behavior


// Test to handle invalid API key
// test('handles invalid API key', done => {
//     const address = 'New York'; // Define the city to be tested
//
//     // Mock the axios.get method to simulate a 401 response for invalid API key
//     axios.get.mockImplementationOnce(() =>
//         Promise.reject({
//             response: {
//                 status: 401 // Simulate a 401 Unauthorized error
//             }
//         })
//     );
//
//     // Call the weatherData function with the city name and a callback function
//     weatherData(address, (error, data) => {
//         // Assert that the error is true, indicating an invalid API key
//         expect(error).toBe(true);
//
//         // Assert that the returned data is the expected error message
//         expect(data).toBe('Invalid API key. Please check your API key and try again.');
//
//         // Signal Jest that the asynchronous test is complete
//         done();
//     });
// });
