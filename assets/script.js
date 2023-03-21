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


