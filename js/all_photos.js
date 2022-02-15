
function getLeaflet(lat,lng,zoom) {


        var OpenStreetMap = L.tileLayer('https://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
            type: 'map',
            ext: 'jpg',
            attribution: 'Tiles Courtesy of <a href="https://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: '1234',
            layers: [baseMaps, overlayMaps]
        });

        var OpenStreetMap_BlackAndWhite = L.tileLayer('https://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        var videos = L.layerGroup([]);
        var panotour = L.layerGroup([]);
        var images = L.layerGroup([]);
        var articles = L.layerGroup([]);

        $.getScript('js/all-media.js', function() {
            console.log('Load was performed.');
        });

        var map = L.map('map', {
            center: [lat, lng],
            zoom: zoom,
            layers: [OpenStreetMap]
        });
        
        var baseMaps = {
            "Open Street Map": OpenStreetMap,
            "Open Street Map Black and White": OpenStreetMap_BlackAndWhite
        };

        var overlayMaps = {
            "Videos": videos,
            "Panotours": panotour,
            "Images": images,
            "Articles": articles
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);
        map.removeLayer(images);

}
