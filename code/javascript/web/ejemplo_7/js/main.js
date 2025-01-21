const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city');
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');
    const apiKey = 'ed46f19ea192bad68ab0c13c479fe460'; // Reemplaza con tu clave API de OpenWeatherMap

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página

    const city = cityInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Ciudad no encontrada');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
});

function displayWeather(data) {
    weatherInfo.style.display = 'block';
    errorMessage.style.display = 'none';
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    document.getElementById('city-name').textContent = `Clima en ${cityName}`;
    document.getElementById('temperature').textContent = `Temperatura: ${temperature}°C`;
    document.getElementById('description').textContent = `Condición: ${description.charAt(0).toUpperCase() + description.slice(1)}`;
    document.getElementById('humidity').textContent = `Humedad: ${humidity}%`;
}

function showError(message) {
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'block';
    errorMessage.textContent = `Error: ${message}`;
}