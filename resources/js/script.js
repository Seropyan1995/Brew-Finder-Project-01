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
  // retrieve array from local storage as a whole
  // use local storage to populate search results list
  // selector button to choose a specific brewery within the results list
  // pass long/lat to weather function
}

function weatheroutlook() {
  // get latitude/longitude from clicking select button 
  var longitude = ""
  var latitude = ""
  // fetch weather api 
  // use longitude/latitude to retrieve current weather for specific city
  // return weather data
}

function displayweather(weatherdata) {
// create html elements to create weather data
// append to the weather container
}

function saveSearch(city, state){
    localStorage.setItem("city", city)
    localStorage.setItem("state", state)
}
