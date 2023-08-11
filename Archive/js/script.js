// DOM Elements
const searchCity = document.getElementById('enter-city');
const searchBtn = document.getElementById('search-button');
const clearBtn = document.getElementById('clear-history');
const nameEl = document.getElementById('city-name');
const todayWeather = document.getElementById('today-weather');
const historyEl = document.getElementById('history');
const currentImg = document.getElementById('current-img');
const mainTempEl = document.getElementById('temperature');
const mainHumEl = document.getElementById('humidity');
const mainWndEl = document.getElementById('wind-speed');
const fiveDay = document.getElementById('fiveday-header');

// API Key
const apiKey = "672219b32b147adec9eec033265a04e7";

// Search history
const searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// Event Listeners
searchBtn.addEventListener('click', () => {
    const searchName = searchCity.value;
    getWeather(searchName);
    searchHistory.push(searchName);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    getSearchHistory();
});

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    searchHistory.length = 0;
    getSearchHistory();
});

// Fetch current weather
function getWeather(cityName) {
    const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(queryUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            todayWeather.classList.remove("d-none");

            const currentDate = new Date(data.dt * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            nameEl.innerHTML = `${data.name} (${month}/${day}/${year})`;
            currentImg.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            currentImg.setAttribute("alt", data.weather[0].description);
            mainTempEl.innerHTML = `Temperature: ${data.main.temp} &#176F`;
            mainHumEl.innerHTML = `Humidity: ${data.main.humidity}%`;
            mainWndEl.innerHTML = `Wind Speed: ${data.wind.speed} MPH`;

            getForecastWeather(data.coord.lat, data.coord.lon);
        });
}

// Fetch 5-day forecast
function getForecastWeather(lat, lon) {
    const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(queryUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fiveDay.classList.remove("d-none");

            const forecastEls = document.querySelectorAll(".forecast");
            forecastEls.forEach((forecastEl, i) => {
                const forecastIndex = i * 8 + 4;
                const forecastDate = new Date(data.list[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();

                forecastEl.innerHTML = `
                    <p class="mt-3 mb-0 forecast-date">${forecastMonth}/${forecastDay}/${forecastYear}</p>
                    <img src="https://openweathermap.org/img/wn/${data.list[forecastIndex].weather[0].icon}@2x.png" alt="${data.list[forecastIndex].weather[0].description}">
                    <p>Temp: ${data.list[forecastIndex].main.temp} &#176F</p>
                    <p>Humidity: ${data.list[forecastIndex].main.humidity}%</p>
                `;
            });

            getSearchHistory();
        });
}

// Render search history
function getSearchHistory() {
    historyEl.innerHTML = "";
    searchHistory.forEach(historyItem => {
        const historyInput = document.createElement("input");
        historyInput.setAttribute("type", "text");
        historyInput.setAttribute("readonly", true);
        historyInput.setAttribute("class", "form-control d-block bg-white");
        historyInput.value = historyItem;
        historyInput.addEventListener("click", () => {
            getWeather(historyItem);
        });
        historyEl.append(historyInput);
    });
}

// ... existing code ...

// Fetch 5-day forecast
function getForecastWeather(lat, lon) {
    const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(queryUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Clear previous forecast data
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = '';

            const forecastEls = document.createElement('div');
            forecastEls.classList.add('row');

            // Loop through forecast data and create forecast cards
            for (let i = 0; i < data.list.length; i += 8) {
                const forecast = data.list[i];
                const forecastDate = new Date(forecast.dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();

                const forecastCard = document.createElement('div');
                forecastCard.classList.add('col-12', 'col-md-2', 'forecast');
                forecastCard.innerHTML = `
                    <p class="mt-3 mb-0 forecast-date">${forecastMonth}/${forecastDay}/${forecastYear}</p>
                    <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
                    <p>Temp: ${forecast.main.temp} &#176F</p>
                    <p>Humidity: ${forecast.main.humidity}%</p>
                `;

                forecastEls.appendChild(forecastCard);
            }

            forecastContainer.appendChild(forecastEls);
            getSearchHistory();
        });
}

// ... existing code ...


// Initialize
getSearchHistory();
if (searchHistory.length > 0) {
    getWeather(searchHistory[searchHistory.length - 1]);
}
