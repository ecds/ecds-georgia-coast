
function getLeaflet(lat,lng,zoom) {


        var OpenStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
            layers: [baseMaps, overlayMaps]
        });

        var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });


        var map = L.map('map', {
            center: [lat, lng],
            zoom: zoom,
            layers: [OpenStreetMap]
        });

        var sapelo_images = L.layerGroup([]);

         $.ajax({
            type: "POST",
            url: "geo-json/Sapelo_POI.json",
            dataType: 'json',
            success: function (response) {
                geojsonLayer = L.geoJson(response, {
                      // style: function(feature) {
                      //   icon: L.AwesomeMarkers.icon({icon: 'camera', prefix: 'fa', markerColor: 'blue', spin:false}) 
                      // },
                      onEachFeature: function (feature, layer) {
                        layer.bindPopup(feature.properties.Location)
                        layer.addTo(sapelo_images)
                     }
                 });
            }
        });

         var shoreline1857 = L.layerGroup([]);

         $.ajax({
            type: "POST",
            url: "geo-json/Coastlines_Storms-selected/Sapelo_1857-1870coastline.json",
            dataType: 'json',
            success: function (response) {
                geojsonLayer = L.geoJson(response, {color : "#bf58a1", weight : "3"
                }).addTo(shoreline1857);
            }
        });

         var shoreline1920 = L.layerGroup([]);

         $.ajax({
            type: "POST",
            url: "geo-json/Coastlines_Storms-selected/Sapelo_1920-1925coastline.json",
            dataType: 'json',
            success: function (response) {

                geojsonLayer = L.geoJson(response, {color : "#f1942c", weight : "3"
                }).addTo(shoreline1920);
            }
        });

         var shoreline1971 = L.layerGroup([]);

         $.ajax({
            type: "POST",
            url: "geo-json/Coastlines_Storms-selected/Sapelo_1971-1973coastline.json",
            dataType: 'json',
            success: function (response) {

                geojsonLayer = L.geoJson(response, {color : "#70ad43", weight : "3"
                }).addTo(shoreline1971);

            }
        });

         var shoreline1999 = L.layerGroup([]);

         $.ajax({
            type: "POST",
            url: "geo-json/Coastlines_Storms-selected/Sapelo_1999coastline.json",
            dataType: 'json',
            success: function (response) {

                geojsonLayer = L.geoJson(response, {color : "#37a5d7", weight : "3"
                }).addTo(shoreline1999);
            }
        });

         function calculateLatitudeofPolygon(layer) {
              var length = layer.length;
              var allLats = 0
              for (var i = 0; i < length; i++) {
                  allLats += layer[i].lat
              }
              return (allLats/length)
        }
        function calculateLongitudeofPolygon(layer) {
              var length = layer.length;
              var allLngs = 0
              for (var i = 0; i < length; i++) {
                  allLngs += layer[i].lng
              }
              return (allLngs/length)
        }
        
      
        var baseMaps = {
            "Open Street Map": OpenStreetMap,
            "Open Street Map Black and White": OpenStreetMap_BlackAndWhite
        };

        var overlayMaps = {
            "Sapelo POIs" : sapelo_images,
            "Shoreline in 1857" : shoreline1857,
            "Shoreline in 1920" : shoreline1920,
            "Shoreline in 1971" : shoreline1971,
            "Shoreline in 1999" : shoreline1999
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);

}
