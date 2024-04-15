// Function to fetch weather data from OpenWeatherMap API
async function getWeather() {
    const apiKey = '3ef6168340bd62da5a076573071bb5a0'; // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const city = document.getElementById('cityInput').value.trim(); // Trim is used here to remove any white spaces that user has entered

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`); // API call to openweathermap 
        if (!response.ok) { // IF the city user entered is invalid we'll throw an Error 
            throw new Error('City not found');
        }
        const data = await response.json(); // If the api call is sucessful ,we'll get the data 
        displayWeather(data); // calling the display weather function
    } catch (error) { // In case there is an Error druing the fetch itself, or something wrong with the API
        console.error('Error fetching weather:', error);
        displayError('City not found. Please try again.');
    }
}

// Function to display weather information on the web page
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo'); // Selecting the empty weather info div to display the output
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Extracting the weather icon from the data we got from the api response

    // DISPLAYING THE WEATHER INFORMATION
    weatherInfo.innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
}

// Function to display error message on the web page
function displayError(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p style="color: red;">${message}</p>`;
}
