var map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4,
});

// Create the tile layer that will be the background of our map
L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY,
  }
).addTo(map);

var layerGroup = L.layerGroup().addTo(map);

document.addEventListener("DOMContentLoaded", function () {
  d3.text("../../extreme2.csv").then(function (csv) {
    data = d3.csvParseRows(csv);

    data.forEach(function (data) {
      data[5] = +data[5];
      data[1] = data[1].toString();
    });
    data = data.filter((row) => row[9] == "EMXP");
    var landingData = data.filter((row) => row[1].includes("1980"));
    createMarkers(landingData);
    var sliderYear = document.getElementById("sliderYear");
    sliderYear.innerHTML = "Selected Year: 1980"

    document.getElementById("slider").addEventListener("input", function (e) {
      var year = e.target.value;
      sliderYear.innerHTML = `Selected Year: ${year}`;
      var newData = data.filter((row) => row[1].includes(year));

      layerGroup.clearLayers();
      createMarkers(newData);
    });
  });

  function createMarkers(row_data) {
    row_data.map((row) => {
      var city_prcp = L.circle([row[11], row[12]], {
        weight: 0.5,
        fillOpacity: 0.5,
        color: "black",
        fillColor: "blue",
        radius: row[5] * 300,
      }).bindPopup("<h3>" + "Maximum Precipitation: " + row[5] + " inches");
      city_prcp.addTo(layerGroup);
    });
  }
});
