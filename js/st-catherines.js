
function getLeaflet(lat,lng,zoom) {


        var OpenStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
            layers: [baseMaps, overlayMaps]
});


        var OpenStreetMap_BlackAndWhite = L.tileLayer('https://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });



        var map = L.map('map', {
            center: [lat, lng],
            zoom: zoom,
            zoomControl:false,
            layers: [OpenStreetMap]
        });

        var countyStyle = {
          "color": "#66C396",
          "weight": 2,
          "opacity": 0.85
      };

        var counties = L.layerGroup([]);
        $.ajax({
            type: "GET",
            url: "geo-json/GAcoastalcounties.json",
            dataType: 'json',
            success: function (response) {
                //geojsonLayer = L.geoJson(response).addTo(map);
                var GAcoastalcounties = L.geoJson(response, {
                     style: function (feature) {
                         return countyStyle
                     },
                     onEachFeature: function (feature, layer) {
                         layer.addTo(counties);
                         var countyLabel = L.divIcon({
                              // Specify a class name we can refer to in CSS.
                              className: 'countyLabel '+ feature.properties.NAME,
                              html: "<div class='label'>"+feature.properties.NAME+"</div>",
                              iconSize: [0,0]
                              // Set marker width and height
                            });
                         var countyCenter = layer.getBounds().getCenter();
                         L.marker([calculateLatitudeofPolygon(layer._latlngs), calculateLongitudeofPolygon(layer._latlngs)], {icon: countyLabel}).addTo(counties);

                     }
                 })

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

        var boundaryStyle = {
          "color": "#4989F3",
          "weight": 2,
          "opacity": 0.85
      };
      var highlightStyle = {
        "weight": 3,
        "color" : "#D94B3F"
      };
        var boundaries = L.layerGroup([]);
        $.ajax({
            type: "GET",
            url: "geo-json/IslandBounds.json",
            dataType: 'json',
            success: function (response) {
                //geojsonLayer = L.geoJson(response).addTo(map);
                var GAcoastalboundaries = L.geoJson(response, {
                    style: function(feature) { return boundaryStyle },
                     onEachFeature: function (feature, layer) {
                        layer.addTo(boundaries);
                        var thisDiv = feature.properties.Name.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'').toLowerCase()
                        layer.on("mouseover", function (e) {
                          layer.setStyle(highlightStyle);
                          $("#"+thisDiv).toggleClass("hover");
                          location.hash = "#" + thisDiv;
                        });
                        layer.on("mouseout", function (e) {
                          layer.setStyle(boundaryStyle);
                          $("#"+thisDiv).toggleClass("hover");
                        });
                        layer.on("click", function (e) {
                          window.location.href = thisDiv+".html";
                        });
                     }
                 })
            }
        });

        var baseMaps = {
            "Open Street Map": OpenStreetMap,
            "Open Street Map Black and White": OpenStreetMap_BlackAndWhite
        };

        var overlayMaps = {
            "Counties": counties
        };
        // per Anandi - this is skipped to avoid island overlays on a specific island page
        // boundaries.addTo(map)
        // L.control.layers(baseMaps, overlayMaps,{collapsed: false}).addTo(map);
        L.control.layers(baseMaps,{collapsed: false}).addTo(map);

        return map;
}
