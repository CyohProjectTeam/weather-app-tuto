const tiempoEl = document.getElementById("tiempo");
const fechaEl = document.getElementById("fecha");
const meteoactualEl = document.getElementById("elementos-tiempo-actual");
const lugarubicacion = document.getElementById("lugar-ubicacion");
const zonahoraria = document.getElementById("zona-horaria");
const paisEl = document.getElementById("pais");
const previsionTiempoEl = document.getElementById("prevision-tiempo");
const tempActualEl = document.getElementById("temp-actual");

const dias = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const diasPrevision = {
  Sun: "Dom",
  Mon: "Lun",
  Tue: "Mar",
  Wed: "Mié",
  Thu: "Jue",
  Fri: "Vie",
  Sat: "Sáb",
};
const meses = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const API_KEY = "16f6b86543568463c043d3d800017583";

setInterval(() => {
  const tiempo = new Date();
  const mes = tiempo.getMonth();
  const fecha = tiempo.getDate();
  const dia = tiempo.getDay();
  const hora = tiempo.getHours();
  const horasFormato12 = hora >= 12 ? hora % 12 : hora;
  const minutos = tiempo.getMinutes();
  const ampm = hora >= 12 ? "PM" : "AM";

  tiempoEl.innerHTML =
    (horasFormato12 < 10 ? "0" + horasFormato12 : horasFormato12) +
    ":" +
    (minutos < 10 ? "0" + minutos : minutos) +
    `<span id="am-pm">${ampm}</span>`;

  fechaEl.innerHTML = dias[dia] + ", " + fecha + " " + meses[mes];
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
        showWeatherData(data);
      });
  });
}

function setWeatherBackground(atmosphere) {
  switch (atmosphere) {
    case "Thunderstorm":
      document.body.style.backgroundImage = "";
      break;
    case "Drizzle":
      document.body.style.backgroundImage = "";
      break;
    case "Rain":
      document.body.style.backgroundImage = "";
      break;
    case "Snow":
      document.body.style.backgroundImage = "";
      break;
    case "Mist":
      document.body.style.backgroundImage = "";
      break;
    case "Smoke":
      document.body.style.backgroundImage = "";
      break;
    case "Haze":
      document.body.style.backgroundImage = "";
      break;
    case "Dust":
      document.body.style.backgroundImage = "";
      break;
    case "Fog":
      document.body.style.backgroundImage = "";
      break;
    case "Sand":
      document.body.style.backgroundImage = "";
      break;
    case "Ash":
      document.body.style.backgroundImage = "";
      break;
    case "Squall":
      document.body.style.backgroundImage = "";
      break;
    case "Tornado":
      document.body.style.backgroundImage = "";
      break;
    case "Clear":
      document.body.style.backgroundImage =
        "url('https://wallpapercave.com/wp/2khKQyP.jpg')";
      break;
    case "Clouds":
      document.body.style.backgroundImage =
        "url('https://www.cambridge.org/elt/blog/wp-content/uploads/2019/02/background-3268840_1920.jpg')";
      break;

    default:
      break;
  }
  // document.body.style.backgroundImage  = "url(`${atmosphere[atmos]}`)";
}

function setLocation(latitude, longitude) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((resdata) => {
      lugarubicacion.innerHTML = resdata[0].name;
    });
}

function showWeatherData(data) {
  let {
    humidity: humedad,
    pressure: presion,
    sunrise: amanecer,
    sunset: anochecer,
    wind_speed: velViento,
  } = data.current;

  setWeatherBackground(data.current.weather[0].main);
  setLocation(data.lat, data.lon);
  zonahoraria.innerHTML = data.timezone;
  paisEl.innerHTML = data.lat + "N " + data.lon + "E";

  meteoactualEl.innerHTML = `<div class="elem-tiempo">
        <p>Humedad</p>
        <p id="elem-tiempo-valor">${humedad} %</p>
    </div>

    <div class="elem-tiempo">
        <p>Presión</p>
        <p id="elem-tiempo-valor">${presion}</p>
    </div>

    <div class="elem-tiempo">
        <p>Vel. viento</p>
        <p id="elem-tiempo-valor">${velViento}</p>
    </div>

    <div class="elem-tiempo">
        <p>Amanacer</p>
        <p id="elem-tiempo-valor">${window
          .moment(amanecer * 1000)
          .format("HH:mm a")}</p>
    </div>

    <div class="elem-tiempo">
        <p>Anochecer</p>
        <p id="elem-tiempo-valor">${window
          .moment(anochecer * 1000)
          .format("HH:mm a")}</p>
    </div>`;

  let previsionRestoDias = "";
  data.daily.forEach((day, idx) => {
    if (idx == 0) {
      tempActualEl.innerHTML = `
          <img src="http://openweathermap.org/img/wn/${
            day.weather[0].icon
          }@2x.png" alt="icon-tiempo" class="icon-t">
          <div class="otro">
              <div class="dia">HOY</div>
              <div class="temp">Noche - ${Math.round(
                day.temp.night
              )} &#176;C</div>
              <div class="temp">Día -   ${Math.round(
                day.temp.day
              )} &#176;C</div>
          </div>
        `;
    } else {
      previsionRestoDias += `
          <div class="elem-prevision-tiempo">
            <div class="dia">${
              diasPrevision[window.moment(day.dt * 1000).format("ddd")]
            }</div>
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png" alt="icon-tiempo" class="icon-t">
            <div class="temp">Noche - ${Math.round(
              day.temp.night
            )} &#176;C</div>
            <div class="temp">Dia -   ${Math.round(day.temp.day)} &#176;C</div>
          </div>
        `;
    }
  });

  previsionTiempoEl.innerHTML = previsionRestoDias;
}
