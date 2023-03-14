// Added in order to get weather data. 
var openWeatherAPIKey = "357d278b4dc1d31d59f16e3afe69a945";

var searchResultsEl = $("#search-results-container");
var stateDropdownEl = $("#state-dropdown-id");

// button to send state & city to getbrewery function
// card container to have even listener attached (to help trigger weather API by clicking on the select button)
var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", getBrewery);


function getBrewery(nameOfCity, nameOfState) {
    fetch(
        // 'fetch' data from the appropriate URL. Retrieve state and city from search button functionality.
        `https://api.openbrewerydb.org/breweries?by_state=${nameOfState}&by_city=${nameOfCity}&per_page=20`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // array to be placed within local storage 
        console.log(data)
        // seachresultslist()
        displayData(data)
        });

}

function getWeather(nameOfCity, nameOfState) {
  
  fetch(
    // 'fetch' data from the appropriate URL. Retrieve state and city from search button functionality.
    `https://api.openweathermap.org/geo/1.0/direct?q=%27+${nameOfCity}+%27&limit=5&appid=${openWeatherAPIKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

    weatherOutlook(data, nameOfState)
    });

}

function displayData(brewData) {
    console.log("The function to display the data on each brewery")
    console.log(brewData)
    //  

      // loop through array of all breweries
      $("#search-results-container").empty()
    for (var i=0; i<brewData.length; i++){

        // for each brewery create a card (brewery name, city, address, phone #, state, zip code). Each card to have select button. (add latitude/longitude as data attributes to select button)       
        var brewContainerEl = $('<section>');
        brewContainerEl.attr('id', 'brewery-id-'+i)
        brewContainerEl.attr('class', 'has-text-white has-background-info has-text-left m-1 p-1') 

        var breweryNameEl = $('<p>')
        breweryNameEl.attr('id', 'brewery-name-id-'+i)
        breweryNameEl.text('Name: ' + brewData[i].name)

        var breweryStreetEl = $('<p>')
        breweryStreetEl.attr('id', 'brewery-street-id-'+i)
        breweryStreetEl.text('Street: ' + brewData[i].street)
        
        var breweryCityStateZipEl = $('<p>')
        breweryCityStateZipEl.attr('id', 'brewery-city-state-zip-id-'+i)
        breweryCityStateZipEl.text('Address: ' + brewData[i].street + ', ' + brewData[i].city + ', ' + brewData[i].state + ' ' + brewData[i].postal_code)

        var breweryPhoneEl = $('<p>')
        breweryPhoneEl.attr('id', 'brewery-phone-id-'+i)
        breweryPhoneEl.text('Phone: ' + brewData[i].phone)

        var breweryTypeEl = $('<p>')
        breweryTypeEl.attr('id', 'brewery-type-id-'+i)
        breweryTypeEl.text('Brewery Type: ' + brewData[i].brewery_type)

        // var checkWeatherBtnEl = $('<button>')
        // checkWeatherBtnEl.attr('type', 'button')
        // checkWeatherBtnEl.attr('id', 'check-weather-btn-id-'+i)
        // checkWeatherBtnEl.text('Select Brewery!')

        brewContainerEl.append(breweryNameEl)
        brewContainerEl.append(breweryCityStateZipEl)
        brewContainerEl.append(breweryPhoneEl)
        brewContainerEl.append(breweryTypeEl)
        // brewContainerEl.append(checkWeatherBtnEl)

        // append card to the card container 
        searchResultsEl.append(brewContainerEl)
            
        //longitude and latitude data to pass to the weatheroutlook function when a city is selected.
        var longitude = brewData[i].longitude
        var latitude = brewData[i].latitude
    }

}

// insert longitude and latitude variables into weatheroutlook function call
function weatherOutlook(weatherData, nameOfState) {
    console.log("Function to fetch the weather outlook")
    console.log(weatherData)
    console.log(nameOfState)
  for (var i=0; i<weatherData.length;i++){
    console.log(weatherData[i].state)
    if(weatherData[i].state == nameOfState){
      var longitude = weatherData[i].lon
      var latitude = weatherData[i].lat
    }
  }
  // get latitude/longitude from clicking select button 
  //  var longitude = weatherdata[0].lon
  //  var latitude = weatherdata[0].lat

  // fetch weather api 
  // use longitude/latitude to retrieve current weather for specific brewery
  var currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPIKey}&units=imperial`;

  console.log(currentUrl)

  fetch(currentUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            console.log(data)
            // return weather data
            return displayWeather(data, nameOfState)

        });
        
}

function displayWeather(weatherData, nameOfState) {
    console.log("This function displays the weather data.")
    console.log(weatherData)

    // Pull breweryName from local Storage.?. This is just a placeholder value.
    cityName = weatherData.name

    // create html elements to create weather data
    $("#brewery-weather-id").text("Current weather conditions for " + cityName + ", " + nameOfState +":")
    $("#weather-conditions-id").text(weatherData.weather[0].main)
    iconURL = 'https://openweathermap.org/img/w/'+ weatherData.weather[0].icon +'.png'
    var iconImage = $("<img>").attr("src", iconURL);
    $("#weather-conditions-id").append(iconImage)
    $("#temp-id").text("Temperature: " + weatherData.main.temp + "\u00B0F")
    $("#wind-id").text("Wind Speed: " + weatherData.wind.speed + " MPH")
    $("#humidity-id").text("Humidity: " + weatherData.main.humidity + "%")

    // append to the weather container       
    
    
    

}

function saveSearch(city, state){
    localStorage.setItem("city", city)
    localStorage.setItem("state", state)
}

function initListener() {
  console.log("initlistener")
  $("#city-searchform").submit(function(event){
    event.preventDefault()
    console.log("formsubmitted")
    var nameOfCity = $("#text-input").val()
    var nameOfState = $("#state-dropdown-id").val()

    $("#search-results-id").show();
    $("#weather-results-id").show();
  
    getBrewery(nameOfCity, nameOfState)
    getWeather(nameOfCity, nameOfState)
    saveSearch(nameOfCity, nameOfState)
  })

}

var loadLastCity = function() {
  nameOfCity = localStorage.getItem("city");
  nameOfState = localStorage.getItem("state");

  getBrewery(nameOfCity, nameOfState)
  getWeather(nameOfCity, nameOfState)
}

$(function(){
  initListener()
  loadLastCity()

  const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
  console.log(states)
  for (var i=0; i<states.length; i++) {
      var stateEl = $('<option>');
      stateEl.attr('id', states[i] + '-id')
      stateEl.text(states[i])
    
      stateDropdownEl.append(stateEl)

      console.log(stateDropdownEl)

  } 

  nameOfCity = localStorage.getItem("city");
  if (!nameOfCity) {
    $("#search-results-id").hide(); 
    $("#weather-results-id").hide();
  } 
});