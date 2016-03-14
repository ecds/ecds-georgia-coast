
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

        var counties = L.layerGroup([]);
        $.ajax({
            type: "POST",
            url: "geo-json/GAcoastalcounties.json",
            dataType: 'json',
            success: function (response) {
                //geojsonLayer = L.geoJson(response).addTo(map);
                var GAcoastalcounties = L.geoJson(response, {
                     style: function (feature) {
                         
                     },
                     onEachFeature: function (feature, layer) {
                         layer.bindPopup(feature.properties.NAME);
                         layer.addTo(counties);
                         var countyLabel = L.divIcon({
                              // Specify a class name we can refer to in CSS.
                              className: 'countyLabel '+ feature.properties.NAME,
                              html: "<div class='label'>"+feature.properties.NAME+"</div>",
                              iconSize: [0,0]
                              // Set marker width and height
                            });
                         var countyCenter = layer.getBounds().getCenter();
                         L.marker([countyCenter.lat, countyCenter.lng], {icon: countyLabel}).addTo(counties);
                     }
                 })

            }
        });


        var sapelo_poi = L.layerGroup([]);

         $.ajax({
            type: "POST",
            url: "geo-json/Sapelo_POI.json",
            dataType: 'json',
            success: function (response) {
                geojsonLayer = L.geoJson(response).addTo(sapelo_poi);
            }
        });

         var shoreline1857 = L.layerGroup([]);

         $.ajax({
            type: "POST",
            url: "geo-json/Coastlines_Storms-selected/Sapelo1857-1870coastline.json",
            dataType: 'json',
            success: function (response) {
                geojsonLayer = L.geoJson(response).addTo(shoreline1857);
            }
        });
        
      
        var baseMaps = {
            "Open Street Map": OpenStreetMap,
            "Open Street Map Black and White": OpenStreetMap_BlackAndWhite
        };

        var overlayMaps = {
            "Counties": counties,
            "Sapelo POIs" : sapelo_poi,
            "COASTLINES" : shoreline1857
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);

}
