
const searchBox = document.querySelector("#location-search-box");
const searchButton = document.querySelector("#search-button");
const showLocation = document.querySelector("#show-location");
const currentTime = document.querySelector("#current-time");
const currentTemp = document.querySelector("#current-temp");
const windReading = document.querySelector("#wind-reading");
const cloudReading = document.querySelector("#cloud-reading");
const humidityReading = document.querySelector("#humidity-reading");
const pressureReading = document.querySelector("#pressure-reading");


const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";


// Fetch weather data
async function weatherInfo(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

        const data = await response.json();
      await renderWeatherInfo(data);

    } catch (error) {
        console.log("City not found or error fetching data.");
    }
}

// Get current time
function getCurrentTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const exactTime = `${padZero(hours)}:${padZero(minutes)}`;
    return exactTime;
}


function padZero(num) {
    return num < 10 ? '0' + num : num;
}

// Render weather info to the page
function renderWeatherInfo(data) {

    const newTime = getCurrentTime();
    currentTime.innerText = newTime;


    showLocation.innerText = data.name;
    currentTemp.innerText = `${data.main.temp}°C`;
    windReading.innerText = `${data.wind.speed} m/s`;
    humidityReading.innerText = `${data.main.humidity}%`;
    cloudReading.innerText = `${data.clouds.all}%`;
    pressureReading.innerText = `${data.main.pressure} hPa`;

   
}

// Event listener for the search button
searchBox.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        weatherInfo(city);
    }
});

// Event listener for Enter key press
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            weatherInfo(city);
        }
    }
});
