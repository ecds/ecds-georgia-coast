function getLeaflet(lat, lng, zoom) {

  var contentType = $("body").attr('data-type')

  if (contentType == "article") {
    var markerStyle = {
      icon: 'file-text',
      prefix: 'fa',
      markerColor: 'orange',
      spin: false
    }
  } else if (contentType = "panotour") {
    var markerStyle = {
      icon: 'image',
      prefix: 'fa',
      markerColor: 'purple',
      spin: false
    }
  } else if (contentType = "video") {
    var markerStyle = {
      icon: 'video-camera',
      prefix: 'fa',
      markerColor: 'red',
      spin: false
    }
  } else if (contentType = "images") {
    var markerStyle = {
      icon: 'camera',
      prefix: 'fa',
      markerColor: 'green',
      spin: false
    }
  } else {
    var markerStyle = {
      icon: 'map-marker',
      prefix: 'fa',
      markerColor: 'blue',
      spin: false
    }
  }

  var OpenStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    layers: [baseMaps]
  });


  var OpenStreetMap_BlackAndWhite = L.tileLayer('https://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });



  var map = L.map('map', {
    center: [lat, lng],
    zoom: zoom,
    zoomControl: false,
    layers: [OpenStreetMap]
  });
  var baseMaps = {
    "Open Street Map": OpenStreetMap,
    "Open Street Map Black and White": OpenStreetMap_BlackAndWhite
  };

  L.control.layers(baseMaps).addTo(map);
  //var thisMarker = L.marker([lat, lng], , {icon: L.AwesomeMarkers.icon({icon: 'image', prefix: 'fa', markerColor: 'green', spin:false})).addTo(map);
  var sapelo_cabretta_360 = L.marker([lat, lng], {
    icon: L.AwesomeMarkers.icon(markerStyle)
  }).bindPopup("Cabretta Island  360&deg; Panorama").addTo(map);

  return map;
}
