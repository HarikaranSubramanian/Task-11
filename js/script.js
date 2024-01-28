document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cardsContainer");

  // Fetch countries data
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((countriesData) => {
      // Create cards for each country
      countriesData.forEach((country) => {
        createCountryCard(country);
      });
    })
    .catch((error) => console.error("Error fetching countries data:", error));

  function createCountryCard(country) {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-sm-12", "mb-4");

    const flagUrl = country.flags ? country.flags.png : "";

    const cardHtml = `
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">${country.name.common}</h5>
                </div>
                <img src="${flagUrl}" class="card-img-top" alt="${
      country.name.common
    } Flag" style="width: 70%;">
                <div class="card-body">
                    <p class="card-text"><strong>Capital:</strong> ${
                      country.capital
                    }</p>
                    <p class="card-text"><strong>Latlng:</strong> ${country.latlng.join(
                      ", "
                    )}</p>
                    <p class="card-text"><strong>Region:</strong> ${
                      country.region
                    }</p>
                    <p class="card-text"><strong>Country Code:</strong> ${
                      country.cca2
                    }</p>
                    <button class="btn btn-primary" onclick="getWeather('${
                      country.name.common
                    }')">Click for Weather</button>
                </div>
            </div>
        `;

    card.innerHTML = cardHtml;
    cardsContainer.appendChild(card);
  }

  window.getWeather = function (countryName) {
    // Fetch weather data using OpenWeatherMap API
    const apiKey = "ae789ef8c9d155bf57e02170826213d6"; // OpenWeatherMap API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`;

    fetch(weatherUrl)
      .then((response) => response.json())
      .then((weatherData) => {
        alert(
          `Current weather in ${countryName}: ${weatherData.weather[0].description}`
        );
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  };
});
