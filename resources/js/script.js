
var submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", getBrewery);


function getBrewery() {
    fetch(
        // 'fetch' data from the appropriate URL
        'https://api.openbrewerydb.org/breweries?by_state=north_carolina&by_city=Durham&per_page=20'
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {

        console.log(data)
        });

}



function saveSearch(city, state){
    localStorage.setItem("city", city)
    localStorage.setItem("state", state)
}
