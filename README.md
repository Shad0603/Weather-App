# Weather App

This Weather App fetches weather data for a specified city or multiple cities, filtering them based on a user-defined temperature threshold. Built using Node.js, Express, and Axios, this app leverages the OpenWeatherMap API. Basic unit testing is also implemented using Jest.

[![My Skills](https://skillicons.dev/icons?i=js,nodejs,express,jest&theme=light)](https://skillicons.dev)
## Features

- **Single City Weather Data**: Fetches and displays weather data for a specified city.
- **Multi-City Threshold Filter**: Fetches weather data for multiple cities and displays those above a specified temperature threshold.
- **Weather by Coordinates**: Fetches weather data for a location specified by latitude and longitude coordinates.
- **5-Day Weather by Coordinates**: Fetches weather data over a period of 5 days for a location specified by latitude and longitude coordinates.

## Setup

### Prerequisites

- Node.js and npm installed
- OpenWeatherMap API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shad0603/weather-app.git
   cd weather-app
2. **Install dependencies:**
   ```bash
   npm install express axios
   npm install --save-dev jest
3. **Configure API Key:**
   - Add your OpenWeatherMap API Key to SECRET_KEY in weatherData.js
4. **Run the server:**
   ```bash
   node app.js
## Usage

### Single City Weather Data

To get weather data for a single city, use the following endpoint:
```plaintext
http://localhost:3000/weather?address=CityName
```
### Multi-City Minimum Temperature Threshold Filter
To get weather data for multiple cities and filter by a min. temperature threshold, use the following endpoint:
```plaintext
http://localhost:3000/weather?threshold=Temperature&cities=City1,City2,City3
```
### Get Current Weather Using Coordinates
To get the current weather data using geographical coordinates (latitude and longitude), make a GET request to the /weather/coords endpoint with the lat and lon query parameters.
```plaintext
http://localhost:3000/weather/coords?lat=enter_lat&lon=enter_lon
```
### Get 5-Day Weather Forecast Using Coordinates
To get a 5-day weather forecast using geographical coordinates (latitude and longitude), make a GET request to the /weather/forecast/5 endpoint with the lat and lon query parameters.
```plaintext
http://localhost:3000/weather/forecast/5?lat=enter_lat&lon=enter_lon
```
## Error Handling
The app provides meaningful error messages for various scenarios, such as:

- Missing address or threshold parameters

- Invalid city names

- Issues with the OpenWeatherMap API
  
## Testing

This project includes unit tests to ensure the reliability of the weather data fetching functionality. We use Jest as our testing framework.
To run the tests, use the following command:
```bash
npm test
```

## Endpoints
- **GET /weather**: Fetches weather data based on query parameters.

*Query Parameters*:

address: Name of the city for which to fetch weather data.

threshold: Temperature threshold for filtering cities.

cities: Comma-separated list of city names to check against the threshold.
