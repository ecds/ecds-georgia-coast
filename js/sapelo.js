
function getLeaflet(lat,lng,zoom) {


        var OpenStreetMap = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
            type: 'map',
            ext: 'jpg',
            attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: '1234',
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
                geojsonLayer = L.geoJson(response, {color : "#66C396", weight : "2"
                }).addTo(shoreline1857);
            }
        });

         var shoreline1920 = L.layerGroup([]);

         $.ajax({
            type: "POST",
            url: "geo-json/Coastlines_Storms-selected/Sapelo_1920-1925coastline.json",
            dataType: 'json',
            success: function (response) {

                geojsonLayer = L.geoJson(response, {color : "#D94B3F", weight : "2"
                }).addTo(shoreline1920);
            }
        });

         var shoreline1971 = L.layerGroup([]);

         $.ajax({
            type: "POST",
            url: "geo-json/Coastlines_Storms-selected/Sapelo_1971-1973coastline.json",
            dataType: 'json',
            success: function (response) {

                geojsonLayer = L.geoJson(response, {color : "#4989F3", weight : "2"
                }).addTo(shoreline1971);

            }
        });

         var shoreline1999 = L.layerGroup([]);

         $.ajax({
            type: "POST",
            url: "geo-json/Coastlines_Storms-selected/Sapelo_1999coastline.json",
            dataType: 'json',
            success: function (response) {

                geojsonLayer = L.geoJson(response, {color : "#455a64", weight : "2"
                }).addTo(shoreline1971);
            }
        });

         $.ajax({
            type: "POST",
            url: "geo-json/SapeloQuads.json",
            dataType: 'json',
            success: function (response) {

                geojsonLayer = L.geoJson(response, {
                      // style: function(feature) ({
                      //   color : "#455a64", 
                      //   weight : "2"
                      // }),
                      onEachFeature: function (feature, layer) {
                        layer.bindPopup(feature.properties.QUADNAME)
                        var countyLabel = L.divIcon({
                              // Specify a class name we can refer to in CSS.
                              className: 'countyLabel '+ feature.properties.QUADNAME,
                              html: "<div class='label'>"+feature.properties.QUADNAME+"</div>",
                              iconSize: [0,0]
                              // Set marker width and height
                            });
                         L.marker([calculateLatitudeofPolygon(layer._latlngs), calculateLongitudeofPolygon(layer._latlngs)], {icon: countyLabel}).addTo(map);

                     }
                 });
                geojsonLayer.addTo(map)
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
            "shoreline1857" : shoreline1857,
            "shoreline1920" : shoreline1920,
            "shoreline1971" : shoreline1971,
            "shoreline1999" : shoreline1999
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);

}
