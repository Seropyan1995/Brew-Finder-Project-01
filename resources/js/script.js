// Added in order to get weather data. 
var openWeatherAPIKey = "357d278b4dc1d31d59f16e3afe69a945";

// button to send state & city to getbrewery function
// card container to have even listener attached (to help trigger weather API by clicking on the select button)
var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", getBrewery);


function getBrewery() {
    fetch(
        // 'fetch' data from the appropriate URL. Retrieve state and city from search button functionality.
        'https://api.openbrewerydb.org/breweries?by_state=north_carolina&by_city=Durham&per_page=20'
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // array to be placed within local storage 
        console.log(data)
        seachresultslist()
        });

}

getBrewery()



function displaydata(data) {
  // loop through array of all breweries
  // for each brewery create a card (brewery name, city, address, phone #, state, zip code). Each card to have select button. (add latitude/longitude as data attributes to select button)
  // append card to the card container 
}


function seachresultslist() {
    console.log("I am not sure this function is necessary. Redundant to displaydata?")
  // retrieve array from local storage as a whole
  // use local storage to populate search results list
  // selector button to choose a specific brewery within the results list
  // pass long/lat to weather function
    weatheroutlook()
}

// insert longitude and latitude variables into weatheroutlook function call
function weatheroutlook() {
    console.log("Function to fetch the weather outlook")
  // get latitude/longitude from clicking select button 
  var longitude = "-78.88891655" 
  var latitude = "35.89445737"

  // fetch weather api 
  // use longitude/latitude to retrieve current weather for specific brewery
  var currentUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&appid=" + openWeatherAPIKey + "&units=imperial";

  console.log(currentUrl)

  fetch(currentUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            console.log(data)
            // return weather data
            return displayweather(data)

        });
        





}

function displayweather(weatherdata) {
    console.log("This function displays the weather data.")
    console.log(weatherdata)

    // Pull breweryName from local Storage.?. This is just a placeholder value.
    breweryName = "Barrel Culture Brewing And Blending"

    // create html elements to create weather data
    $("#brewery-weather-id").text("Current weather conditions for " + breweryName + ":")
    $("#weather-conditions-id").text(weatherdata.weather[0].main)
    iconURL = 'https://openweathermap.org/img/w/'+ weatherdata.weather[0].icon +'.png'
    var iconImage = $("<img>").attr("src", iconURL);
    $("#weather-conditions-id").append(iconImage)
    $("#temp-id").text("Temperature: " + weatherdata.main.temp + "\u00B0F")
    $("#wind-id").text("Wind Speed: " + weatherdata.wind.speed + " MPH")
    $("#humidity-id").text("Humidity: " + weatherdata.main.humidity + "%")

    // append to the weather container       
    
    
    

}

function saveSearch(city, state){
    localStorage.setItem("city", city)
    localStorage.setItem("state", state)
}
