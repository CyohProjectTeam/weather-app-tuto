const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const API_KEY = "16f6b86543568463c043d3d800017583";

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12hFormat = hour >= 12 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    hoursIn12hFormat + ":" + minutes + `<span id="am-pm">${ampm}</span>`;

  dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
}, 1000);

getWeatherData();

function getWeatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showWeatherData(data);
      });
  });
}

function showWeatherData(data) {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

  currentWeatherItemEl.innerHTML = `<div class="weather-item">
        <p>Humidity</p>
        <p>${humidity} %</p>
    </div>

    <div class="weather-item">
        <p>Pressure</p>
        <p>${pressure}</p>
    </div>

    <div class="weather-item">
        <p>Wind Speed</p>
        <p>${wind_speed}</p>
    </div>

    <div class="weather-item">
        <p>Sunrise</p>
        <p>${sunrise}</p>
    </div>

    <div class="weather-item">
        <p>Sunset</p>
        <p>${sunset}</p>
    </div>`;
}
