const API_KEY = 'dd3733e976eb4adeacf72819242112'; // Replace with your WeatherAPI key
const checkWeatherBtn = document.getElementById('checkWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

checkWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();

    if (!city) {
        errorMessage.textContent = 'Please enter a city name.';
        weatherInfo.innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        weatherInfo.innerHTML = `
            <p><strong>City:</strong> ${data.location.name}</p>
            <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        `;

        errorMessage.textContent = '';
    } catch (error) {
        weatherInfo.innerHTML = '';
        errorMessage.textContent = 'City not found. Please try again.';
    }
});