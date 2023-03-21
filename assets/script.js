const apiKey = "01c96215aa0d4a4be72c357c3513ec88";
let recentCity = [];

$(document).ready(() => {
  recentCity = JSON.parse(localStorage.getItem("recentlySearched")) || [];
  generateRecentCities(recentCity);
  
  $("#citySearchBtn").on("click", (event) => {
    event.preventDefault();
    const searchValue = $("#searchedCity").val();
    recentCity.push(searchValue);
    localStorage.setItem("recentlySearched", JSON.stringify(recentCity));
    generateRecentCities(recentCity);
    getCity(recentCity[recentCity.length - 1]);
  });
});

function getCity(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&&units=imperial`;
    const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&&units=imperial`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const date = dayjs().format("YYYY-MM-DD");
        const temperature = data.main.temp;
        const wind = data.wind.speed;
        const humidity = data.main.humidity;
        const icon = data.weather[0].icon;
        $("#weatherResult").html(`
          <h3 id="todayWeather" class="text-center">Today's Current Weather:</h3>
          <br>
          <h3 id="current-date" class="text-center">${cityName} : ${date}</h3>
          <br>
          <p class="current-temp text-center">Current Temperature: ${temperature}</p>
          <p class="current-wind text-center">Current Wind Speed: ${wind}</p>
          <p class="current-humidity text-center">Current Humidity: ${humidity}</p>
          <div class="text-center">
            <img class="justify-content-center" id="current-logo" src="http://openweathermap.org/img/wn/${icon}@2x.png">
          </div>
        `);
      });
