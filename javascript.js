// Approved cities with their weather data
const predefinedWeatherData = {
    Greytown: {
        tempC: 24,
        tempF: 75,
        humidity: 87,
        windSpeed: 7.2,
        description: "Moderate rain",
    },
    Pietermaritzburg: {
        tempC: 22,
        tempF: 72,
        humidity: 80,
        windSpeed: 5.5,
        description: "Cloudy",
    },
    "Tugela Ferry": {
        tempC: 30,
        tempF: 86,
        humidity: 70,
        windSpeed: 10.3,
        description: "Sunny",
    },
    "South Africa": {
        tempC: 25,
        tempF: 77,
        humidity: 60,
        windSpeed: 9.5,
        description: "Windy",
    },
    "KwaZulu Natal": {
        tempC: 28,
        tempF: 82,
        humidity: 75,
        windSpeed: 6.0,
        description: "Partly cloudy",
    },
};

// Function to get weather, either from predefined data or API
async function getWeather() {
    const cityInput = document.getElementById("cityInput").value.trim();

    // Check if the city is predefined
    if (predefinedWeatherData[cityInput]) {
        const { tempC, tempF, humidity, windSpeed, description } =
        predefinedWeatherData[cityInput];

        // Update the UI
        document.getElementById("cityName").textContent = cityInput;
        document.getElementById("temperature").innerHTML = `${tempC}°C <span>☀️</span>`;
        document.getElementById("weatherDetails").innerHTML = `
              ${getCurrentDayAndTime()}. ${description} 
              Humidity: <span class="highlight">${humidity}%</span> 
              Wind: <span class="highlight">${windSpeed}Km/h</span>
          `;

        alert(
            `It is currently ${tempC}°C (${tempF}°F) in ${cityInput} with a humidity of ${humidity}%.`
        );
    } else {
        // Fetch from OpenWeatherMap API if city is not predefined
        const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("City not found");
            }

            const weatherData = await response.json();
            const cityFormatted = weatherData.name; // Use the name returned by the API
            const tempC = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const description = weatherData.weather[0].description;

            // Update UI with fetched weather data
            document.getElementById("cityName").textContent = cityFormatted;
            document.getElementById("temperature").innerHTML = `${tempC}°C <span>☀️</span>`;
            document.getElementById("weatherDetails").innerHTML = `
              ${getCurrentDayAndTime()}. ${
          description.charAt(0).toUpperCase() + description.slice(1)
        } 
              Humidity: <span class="highlight">${humidity}%</span> 
              Wind: <span class="highlight">${windSpeed}Km/h</span>
          `;

            alert(
                `It is currently ${tempC}°C in ${cityFormatted} with a humidity of ${humidity}%.`
            );
        } catch (error) {
            alert(`Sorry, we don't know the weather for ${cityInput}. Please try again.`);
        }
    }
}

// Function to update the city name in bold as the user types
function updateCityName() {
    const cityInput = document.getElementById("cityInput").value;
    document.getElementById("cityName").textContent = cityInput;
}

// Function to get the current day of the week and time
function getCurrentDayAndTime() {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const now = new Date();
    const day = daysOfWeek[now.getDay()];
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${day} ${hours}:${minutes}`;
}

// Prompt the user for a city when the page loads
window.onload = function() {
    const userCity = prompt("Enter a city (e.g., Greytown):");
    if (userCity) {
        document.getElementById("cityInput").value = userCity;
        getWeather();
    }
};