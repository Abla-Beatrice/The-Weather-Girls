d3.text("../../extreme_data.csv").then(function(data){
  data = d3.csvParseRows(data)
  data.forEach(function(data){
    data[5] = +data[5]
    data[1] = data[1].toString()
  })
  data = data.filter(row => row[9] == "EMXP")
  data = data.filter(row => row[1].includes("1992", 0))
console.log(data)
createMarkers(data)
})


function createMap(maxprcp) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "Year 2010": maxprcp
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [lightmap, maxprcp]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
d3.csv("../../station.csv").then(function(data){
  var extremeweather = [];
  for (var index = 0; index < response.length; index++){
    row_data = response[index]
    stationid = row_data[3]
      filtered_data = data.filter(row => row.id == stationid)
      console.log(filtered_data)
      // For each station, create a marker and bind a popup with the station's name
      // if (filtered_data[0].latitude != null){
        console.log(filtered_data[0].latitude)
      var city_prcp = L.marker([parseFloat(filtered_data[0].latitude), parseFloat(filtered_data[0].longitude)])
        extremeweather.push(city_prcp);
      // }
        // .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
      
      // Add the marker to the bikeMarkers array
     
    
  }
  console.log(extremeweather)
  createMap(L.layerGroup(extremeweather));
})

}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
// d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);
