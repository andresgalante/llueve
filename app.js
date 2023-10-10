document.addEventListener("DOMContentLoaded", function () {
    if ("geolocation" in navigator) {
        // Get the user's current location
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Call the OpenWeatherMap API to check the weather
            checkWeather(latitude, longitude);
        });
    } else {
        document.getElementById("location").textContent = "Geolocation is not supported in your browser.";
    }
});

function checkWeather(latitude, longitude) {
    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = '60515edc03efd11ea6e4a1c6750bff1e';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;

            // Check if the weather description contains the word "rain"
            if (weatherDescription.toLowerCase().includes("rain")) {
                document.getElementById("weather").textContent = "Yes, it's raining!";
            } else {
                document.getElementById("weather").textContent = "No, it's not raining.";
            }
        })
        .catch(error => {
            document.getElementById("weather").textContent = "Error fetching weather data.";
            console.error(error);
        });
}
