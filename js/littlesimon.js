function getLeaflet(lat, lng, zoom) {


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
    layers: [OpenStreetMap]
  });

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

  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);

  return map;
}
