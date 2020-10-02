//create the Base Layer with a light background
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   tileSize: 512,
   maxZoom: 18,
   zoomOffset: -1,
   id: "light-v10",
   accessToken: API_KEY
    });


// create the Base Layer with an outdoor background
var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   maxZoom: 18,
   id: "streets-v11",
   accessToken: API_KEY
    });

// create the Base Layer with a satellite background
var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   maxZoom: 18,
   id: "satellite-streets-v9",
   accessToken: API_KEY
    });

  // Create a baseMaps object
  var baseMaps = {
    "Grayscale": lightmap,
     "Satellite": satellite,
     "Outdoors": outdoors
    };
    
    var  EMSN = new L.LayerGroup();
    var  EMSD = new L.LayerGroup();
    // Create an overlay object
    var overlayMaps = {
        "Extreme Maximum Snowfall": EMSN,
        "Extreme Maximum Snow Depth": EMSD,
    };
    

// Create the map with the default settings
    var map = L.map("map-id", {
        center: [
          40.7, -94.5
        ],
        zoom: 3,
        layers: [outdoors, satellite, lightmap]
    });

    // add the control to the map where the user can choose the layers they wish to display
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

d3.csv("../assets/Data/extreme2.csv").then(function (csv) {
  csv.forEach(function (data) {
    data['value'] = +data['value'];
    data['date'] = data['date'].toString();
  });
  console.log(csv);

  EMSN_data = csv.filter((row) => row['datatype'] == "EMSN");
  EMSN_data = EMSN_data.filter((row) => row['date'].includes("1992", 0));
  
  console.log(EMSN_data);

  EMSD_data = csv.filter((row) => row['datatype'] == "EMSD");
  EMSD_data = EMSD_data.filter((row) => row['date'].includes("1992", 0));
  createMarkers(EMSN_data, EMSD_data);
});


function createMarkers(sn_data, sd_data) {
  sn_data.map((row) => {
    var sn_data_point = L.circle([row['latitude'], row['longitude']], {
      weight: 0.5,
      fillOpacity: .5,
      color: "black",
      fillColor: "red",
      radius: row['value'] * 100,
    });
    sn_data_point.addTo(EMSN);
  });

  sd_data.map((row) => {
    var sd_data_point = L.circle([row['latitude'], row['longitude']], {
      weight: 0.5,
      fillOpacity: .5,
      color: "black",
      fillColor: "orange",
      radius: row['value'] * 100,
    });
    sd_data_point.addTo(EMSD);
  }); 

  // Finally, add our legend to the map.
  EMSN.addTo(map);
  EMSD.addTo(map);
}

