
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

getBrewery()
