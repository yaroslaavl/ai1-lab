const apiKey = "df22bc45491106ad23aa2f6abd5919f8";

document.getElementById("get-today-weather").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    fetchCurrentWeather(city);
  } else {
    alert("Wpisz miasto");
  }
});

document.getElementById("get-forecast-weather").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    fetchCurrentWeather(city);
    fetchForecast(city);
  } else {
    alert("Wpisz miasto");
  }
});

function fetchCurrentWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", apiUrl, true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
      displayCurrentWeather(data);
    } else {
      document.getElementById("current-weather").innerHTML =
        `<p>Nie znaleziono miasta lub błąd: ${xhr.status}</p>`;
    }
  };

  xhr.onerror = function () {
    document.getElementById("current-weather").innerHTML = `<p>Błąd</p>`;
  };

  xhr.send();
}

function fetchForecast(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nie ma takiego miasta");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayForecast(data);
    })
    .catch((error) => {
      document.getElementById("forecast").innerHTML = `<p>${error.message}</p>`;
    });
}

function displayCurrentWeather(data) {
  const currentWeatherHtml = `
    <h2>Pogoda na teraz</h2>
    <p>Miasto: ${data.name}</p>
    <p>Temperatura: ${data.main.temp} °C</p>
    <p>Status: ${data.weather[0].description}</p>
  `;
  document.getElementById("current-weather").innerHTML = currentWeatherHtml;
}

function displayForecast(data) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.style.display = "block";

  const forecastByDay = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!forecastByDay[date]) {
      forecastByDay[date] = [];
    }
    forecastByDay[date].push(item);
  });

  let forecastHtml = "";
  Object.keys(forecastByDay).forEach((date) => {
    const dayData = forecastByDay[date];

    const minTemp = Math.min(...dayData.map((entry) => entry.main.temp_min));
    const maxTemp = Math.max(...dayData.map((entry) => entry.main.temp_max));

    forecastHtml += `
      <div class="forecast-item">
        <h3>${date}</h3>
        <p>Min Temperatura: ${minTemp.toFixed(1)} °C</p>
        <p>Max Temperatura: ${maxTemp.toFixed(1)} °C</p>
        <p>Status: ${dayData[0].weather[0].description}</p>
      </div>
    `;
  });

  forecastContainer.innerHTML = `<h2>Pogoda na 5 dni</h2>${forecastHtml}`;
}
