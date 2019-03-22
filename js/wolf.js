function getLeaflet(lat, lng, zoom) {


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

  var wolf_images = L.layerGroup([]);

  $.ajax({
    type: "POST",
    url: "geo-json/wolf_POI.json",
    dataType: 'json',
    success: function(response) {
      geojsonLayer = L.geoJson(response, {
        // style: function(feature) {
        //   icon: L.AwesomeMarkers.icon({icon: 'camera', prefix: 'fa', markerColor: 'blue', spin:false})
        // },
        onEachFeature: function(feature, layer) {
          layer.bindPopup(feature.properties.Location);
          layer.addTo(wolf_images);
        }
      });
    }
});

    var wolfshorelines = L.layerGroup([]);

    var wolfurls = [
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:WolfIsland_2015&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:WolfIsland_2013&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:WolfIsland_2009&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:WolfIsland_1976&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:WolfIsland_1975&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:WolfIsland_1974&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:WolfIsland_1953&maxFeatures=50&outputFormat=application%2Fjson'];
    
    /*var colorpicks = ['red', 'darkblue', 'green', 'pink', 'orange', 'purple', 'blue'];
    var i;
    for (i = 0; i < wolfurls.length; i++){
        var linecolor = colorpicks[i]
        fetch(wolfurls[i]
        ).then(function(response) {
            return response.json();
        }
        ).then(function(myJson) {
            geojsonLayer = new L.GeoJSON(myJson,   
                                        {color: linecolor,
                                        opacity: 1,
                                        weight: 2});
            geojsonLayer.addTo(wolfshorelines)
        });
    };
    wolfshorelines.addTo(map);
    */
    var wolf2015 = L.layerGroup([]);
    fetch(wolfurls[0])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson,   
                                    {color: 'red',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(wolf2015);
      });
    wolf2015.addTo(map);
    var wolf2013 = L.layerGroup([]);
    fetch(wolfurls[1])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson,   
                                    {color: 'darkblue',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(wolf2013);
      });
      
    wolf2013.addTo(map);
    var wolf2009 = L.layerGroup([]);
    fetch(wolfurls[2])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson,  
                                    {color: 'green',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(wolf2009);
      });
      
    wolf2009.addTo(map);
    var wolf1976 = L.layerGroup([]);
    fetch(wolfurls[3])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson,  
                                    {color: 'red',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(wolf1976);
      });
    wolf1976.addTo(map);
    var wolf1975 = L.layerGroup([]);
    fetch(wolfurls[4])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson, 
                                    {color: 'orange',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(wolf1975);
      });

    wolf1975.addTo(map);
    var wolf1974 = L.layerGroup([]);
    
    fetch(wolfurls[5])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson, 
                                    {color: 'purple',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(wolf1974);
      });
      
    wolf1974.addTo(map);
    var wolf1953 = L.layerGroup([]);      

    fetch(wolfurls[6])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson, 
                                    {color: 'blue',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(wolf1953);
      });
        wolf1953.addTo(map);
    
    
    
    var eggshorelines = L.layerGroup([]);
    var eggurls = [
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:EggIsland_2009&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:EggIsland_1982&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:EggIsland_1977&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:EggIsland_1976&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:EggIsland_1975&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:EggIsland_1974&maxFeatures=50&outputFormat=application%2Fjson',
    'https://geoserver.ecds.emory.edu/CoastalGeorgia/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=CoastalGeorgia:EggIsland_1953&maxFeatures=50&outputFormat=application%2Fjson'];
    
    fetch(eggurls[0])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson,   
                                    {color: 'red',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(eggshorelines);
      });
      
    fetch(eggurls[1])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson,   
                                    {color: 'darkblue',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(eggshorelines);
      });
      

    fetch(eggurls[2])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson,  
                                    {color: 'green',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(eggshorelines);
      });
      

    fetch(eggurls[3])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson,  
                                    {color: 'red',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(eggshorelines);
      });

    fetch(eggurls[4])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson, 
                                    {color: 'orange',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(eggshorelines);
      });

    fetch(eggurls[5])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson, 
                                    {color: 'purple',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(eggshorelines);
      });
      

    fetch(eggurls[6])
      .then(function(response) {
        return response.json();
      })
        .then(function(myJson) {
        geojsonLayer = new L.GeoJSON(myJson, 
                                    {color: 'blue',
                                    opacity: 1,
                                    weight: 2,
                                    fillOpacity: 0});
        geojsonLayer.addTo(eggshorelines);
      });

    
    eggshorelines.addTo(map)
    


  function calculateLatitudeofPolygon(layer) {
    var length = layer.length;
    var allLats = 0
    for (var i = 0; i < length; i++) {
      allLats += layer[i].lat
    }
    return (allLats / length)
  }

  function calculateLongitudeofPolygon(layer) {
    var length = layer.length;
    var allLngs = 0
    for (var i = 0; i < length; i++) {
      allLngs += layer[i].lng
    }
    return (allLngs / length)
  }


  var baseMaps = {
    "Open Street Map": OpenStreetMap,
    "Open Street Map Black and White": OpenStreetMap_BlackAndWhite
  };

  var overlayMaps = {
    "Wolf POI": wolf_images,
    "Egg Island Shorelines" : eggshorelines,
    "Wolf Island 2015" : wolf2015,
    "Wolf Island 2013" : wolf2013,
    "Wolf Island 2009" : wolf2009,
    "Wolf Island 1976" : wolf1976,
    "Wolf Island 1975" : wolf1975,
    "Wolf Island 1974" : wolf1974,
    "Wolf Island 1953" : wolf1953
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);

  return map;
}
