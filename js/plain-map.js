
function getLeaflet(lat,lng,zoom) {


        var OpenStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
            layers: [baseMaps]
});


        var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        

        var map = L.map('map', {
            center: [lat, lng],
            zoom: zoom,
            zoomControl:false,
            layers: [OpenStreetMap]
        });
        var baseMaps = {
            "Open Street Map": OpenStreetMap,
            "Open Street Map Black and White": OpenStreetMap_BlackAndWhite
        };

        boundaries.addTo(map)
        L.control.layers(baseMaps,{collapsed: false}).addTo(map);

}
