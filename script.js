// ✅ Your API Key
const apiKey = "ca45622cbcceaa8518cf9208c6711bdd";

// ✅ Element references
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

// ✅ Event listener
searchBtn.addEventListener("click", getWeather);

// ✅ Fetch weather by city
async function getWeather() {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found! Please check spelling.");
      return;
    }

    displayWeather(data);
  } catch (error) {
    alert("Error fetching weather data. Please try again later.");
    console.error(error);
  }
}

// ✅ Display fetched weather details
function displayWeather(data) {
  const cityName = document.getElementById("cityName");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const weatherIcon = document.getElementById("weatherIcon");

  // Basic weather info
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `🌡️ Temperature: ${data.main.temp} °C`;
  description.textContent = `🌥️ Condition: ${data.weather[0].description}`;
  humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  // Extra details
  const feelsLike = document.createElement("p");
  feelsLike.textContent = `🥵 Feels Like: ${data.main.feels_like} °C`;

  const wind = document.createElement("p");
  wind.textContent = `🌬 Wind Speed: ${data.wind.speed} m/s`;

  const localTime = new Date((data.dt + data.timezone) * 1000);
  const timePara = document.createElement("p");
  timePara.textContent = `🕒 Local Time: ${localTime.toUTCString().slice(17, 25)}`;

  // Clear previous results before appending new ones
  weatherInfo.innerHTML = ""; // <--- important addition
  weatherInfo.appendChild(weatherIcon);
  weatherInfo.appendChild(cityName);
  weatherInfo.appendChild(temperature);
  weatherInfo.appendChild(description);
  weatherInfo.appendChild(humidity);
  weatherInfo.appendChild(feelsLike);
  weatherInfo.appendChild(wind);
  weatherInfo.appendChild(timePara);

  // Change background dynamically
  changeBackground(data.weather[0].description);

  weatherInfo.style.display = "block";
}

// ✅ Change background based on weather condition
function changeBackground(condition) {
  const body = document.body;
  condition = condition.toLowerCase();

  if (condition.includes("rain")) {
    body.style.background = "linear-gradient(135deg, #667db6, #0082c8, #0082c8, #667db6)";
  } else if (condition.includes("cloud")) {
    body.style.background = "linear-gradient(135deg, #a1c4fd, #c2e9fb)";
  } else if (condition.includes("clear")) {
    body.style.background = "linear-gradient(135deg, #f6d365, #fda085)";
  } else {
    body.style.background = "linear-gradient(135deg, #74ABE2, #5563DE)";
  }
}
