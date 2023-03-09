// Added in order to get weather data. 
var openWeatherAPIKey = "357d278b4dc1d31d59f16e3afe69a945";

var searchResultsEl = $("#search-results-container");

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
        // seachresultslist()
        displaydata(data)
        });

}

getBrewery()



function displaydata(brewdata) {
    console.log("The function to display the data on each brewery")
    console.log(brewdata)

      // loop through array of all breweries
    for (var i=0; i<brewdata.length; i++){

        // for each brewery create a card (brewery name, city, address, phone #, state, zip code). Each card to have select button. (add latitude/longitude as data attributes to select button)       
        var brewContainerEl = $('<section>');
        brewContainerEl.attr('id', 'brewery-id-'+i)
        brewContainerEl.attr('class', 'col-sm bg-primary text-white m-1') 

        
        var breweryNameEl = $('<p>')
        breweryNameEl.attr('id', 'brewery-name-id-'+i)
        breweryNameEl.text('Name: ' + brewdata[i].name)

        var breweryStreetEl = $('<p>')
        breweryStreetEl.attr('id', 'brewery-street-id-'+i)
        breweryStreetEl.text('Street: ' + brewdata[i].street)
        
        var breweryCityStateZipEl = $('<p>')
        breweryCityStateZipEl.attr('id', 'brewery-city-state-zip-id-'+i)
        breweryCityStateZipEl.text('Address: ' + brewdata[i].city + ', ' + brewdata[i].state + ' ' + brewdata[i].postal_code)

        var breweryPhoneEl = $('<p>')
        breweryPhoneEl.attr('id', 'brewery-phone-id-'+i)
        breweryPhoneEl.text('Phone: ' + brewdata[i].phone)

        var breweryTypeEl = $('<p>')
        breweryTypeEl.attr('id', 'brewery-type-id-'+i)
        breweryTypeEl.text('Brewery Type: ' + brewdata[i].brewery_type)

        var checkWeatherBtnEl = $('<button>')
        checkWeatherBtnEl.attr('type', 'button')
        checkWeatherBtnEl.attr('id', 'check-weather-btn-id-'+i)
        checkWeatherBtnEl.text('Select Brewery!')

        brewContainerEl.append(breweryNameEl)
        brewContainerEl.append(breweryCityStateZipEl)
        brewContainerEl.append(breweryPhoneEl)
        brewContainerEl.append(breweryTypeEl)
        brewContainerEl.append(checkWeatherBtnEl)

        // append card to the card container 
        searchResultsEl.append(brewContainerEl)

        //longitude and latitude data to pass to the weatheroutlook function when a city is selected.
        var longitude = brewdata[i].longitude
        var latitude = brewdata[i].latitude

        weatheroutlook()

    }

}


function seachresultslist() {
    console.log("I am not sure this function is necessary. Redundant to displaydata?")
  // retrieve array from local storage as a whole
  // use local storage to populate search results list
  // selector button to choose a specific brewery within the results list
  // pass long/lat to weather function
    // weatheroutlook()
}

// insert longitude and latitude variables into weatheroutlook function call
function weatheroutlook(longitude, latitude) {
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
