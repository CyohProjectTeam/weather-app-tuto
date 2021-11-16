const tiempoEl = document.getElementById("tiempo");
const fechaEl = document.getElementById("fecha");
const meteoactualEl = document.getElementById("elementos-tiempo-actual");
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
    (horasFormato12 <= 10 ? "0" + horasFormato12 : horasFormato12) +
    ":" +
    (minutos <= 10 ? "0" + minutos : minutos) +
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

function showWeatherData(data) {
  let {
    humidity: humedad,
    pressure: presion,
    sunrise: amanecer,
    sunset: anochecer,
    wind_speed: velViento,
  } = data.current;

  console.log(data);
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
              <div class="dia">${
                diasPrevision[window.moment(day.dt * 1000).format("ddd")]
              }</div>
              <div class="temp">Noche - ${day.temp.night} &#176;C</div>
              <div class="temp">Día -   ${day.temp.day} &#176;C</div>
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
            <div class="temp">Noche - ${day.temp.night} &#176;C</div>
            <div class="temp">Dia -   ${day.temp.day} &#176;C</div>
          </div>
        `;
    }
  });

  previsionTiempoEl.innerHTML = previsionRestoDias;
}
