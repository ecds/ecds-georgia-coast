
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

        var videos = L.layerGroup([]);
        var panotour = L.layerGroup([]);
        var images = L.layerGroup([]);
        var articles = L.layerGroup([]);

        var map = L.map('map', {
            center: [lat, lng],
            zoom: zoom,
            layers: [OpenStreetMap, videos, panotour]
        });

        //OpenStreetMap.addTo(map);

        //sapelo articles
        var sapelo_cabretta_fossils = L.marker([31.443465, -81.234475], {icon: L.AwesomeMarkers.icon({icon: 'file-text', prefix: 'fa', markerColor: 'orange', spin:false}) }).bindPopup("Fossils in Progress").addTo(articles);
        var sapelo_cabretta_lost_barrier = L.marker([31.433713, -81.238634], {icon: L.AwesomeMarkers.icon({icon: 'file-text', prefix: 'fa', markerColor: 'orange', spin:false}) }).bindPopup("The Lost Barrier Islands of Georgia").addTo(articles);

        //panotours
        var sapelo_cabretta_360 = L.marker([31.448899, -81.235913], {icon: L.AwesomeMarkers.icon({icon: 'image', prefix: 'fa', markerColor: 'green', spin:false}) }).bindPopup("Cabretta Island  360&deg; Panorama").addTo(panotour);
        var sapelo_cabretta_aerial = L.marker([31.447028, -81.235346], {icon: L.AwesomeMarkers.icon({icon: 'image', prefix: 'fa', markerColor: 'green', spin:false}) }).bindPopup("Cabretta Relict Marsh Aerial Panorama").addTo(panotour);
        var sapelo_1976 = L.marker([31.465634, -81.251975], {icon: L.AwesomeMarkers.icon({icon: 'image', prefix: 'fa', markerColor: 'green', spin:false}) }).bindPopup("Sapelo Island 1976").addTo(panotour);

        //videos
        var sapelo_alligator_pond = L.marker([31.39793, -81.27856], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Alligator Pond").addTo(video);
       
        var sapelo_borrow_pit = L.marker([31.436491, -81.275418], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Borrow Pit").addTo(video);
      
        var sapelo_cabretta_boneyard = L.marker([31.444522, -81.235062], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Cabretta Beach Tree Boneyard").addTo(video);
        var sapelo_cabretta_relict_marsh = L.marker([31.43958, -81.237552], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Cabretta Beach Relict Marsh").addTo(video);
        var sapelo_cabretta_tide_timelapse = L.marker([31.441161, -81.233886], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Cabretta Beach Relict Marsh").addTo(video);

        var sapelo_chocolate_plantation = L.marker([31.501003, -81.254634], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Chocolate Plantation").addTo(video);

        var sapelo_FABC = L.marker([31.496933, -81.229721], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("First African Baptist Church").addTo(video);

        var sapelo_nannygoat_shrimp = L.marker([31.39048, -81.26437], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Ghost Shrimp on Nannygoat Beach").addTo(video);
        var sapelo_nannygoat_runnels = L.marker([31.384358, -81.269276], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Runnels on Nannygoat Beach").addTo(video);
       
        var sapelo_back_dune_meadow = L.marker([31.387273, -81.269262], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Back Dune Meadows").addTo(video);

        var sapelo_nature_trail_periwinkles = L.marker([31.39461, -81.27087], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Periwinkles in the Nature Trail").addTo(video);
        var sapelo_nature_trail_relict_dunes = L.marker([31.39306, -81.27002], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Relict Dunes").addTo(video);
        var sapelo_nature_trail_tidal_creek = L.marker([31.39472, -81.26988], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Nature Trail Tidal Creek").addTo(video);

        var sapelo_tracking_animals = L.marker([31.397075, -81.272254], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Tracking Animals").addTo(video);

        var sapelo_shell_ring = L.marker([31.514824, -81.244701], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Shell Ring").addTo(video);

        var sapelo_raccoon_bluff_outcrop = L.marker([31.499082, -81.229506], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Raccoon Bluff Outcrop").addTo(video);
        var sapelo_raccoon_bluff = L.marker([31.498983, -81.229219], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Raccoon Bluff").addTo(video);

        //galleries
        var sapelo_shell_ring_gallery = L.marker([31.514815, -81.244476], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("Shell Ring").addTo(images);
        var sapelo_raccoon_bluff_gallery = L.marker([31.499258, -81.229529], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("Raccoon Bluff").addTo(images);
        var sapelo_nannygoat_beach_gallery = L.marker([31.389500, -81.265159], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("Nannygoat Beach").addTo(images);
        var sapelo_lighthouse_gallery = L.marker([31.39126, -81.28568], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("Sapelo Island Lighthouse").addTo(images);
        var sapelo_marine_institute_gallery = L.marker([31.39734, -81.27986], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("Marine Institute").addTo(video);
        var sapelo_borrow_pit_gallery = L.marker([31.436370, -81.275273], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("Borrow Pit").addTo(images);
        var sapelo_raccoon_bluff_church_gallery = L.marker([31.496891, -81.229693], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("First African Baptist Church").addTo(images);
        var sapelo_greenhouse_gallery = L.marker([31.39756, -81.27396], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("Greenhouse").addTo(images);
        var sapelo_alligator_pond_gallery = L.marker([31.397869, -81.278431], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("Alligator Pond").addTo(images);
        var sapelo_nature_trail_gallery = L.marker([31.394498, -81.270047], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("Nature Trail").addTo(images);



// Sapelo  Sapelo Lighthouse          
// Sapelo  Nannygoat Beach        
// Sapelo  Beach Road Bridge          
// Sapelo  Nature Trail Observation Deck          
// Sapelo  Nature Trail Bridge        
// Sapelo  Greenhouse      -81.27396   31.39756
// Sapelo  Reynolds Mansion        -81.27702   31.39708
// Sapelo  Nature Trail Entry      -81.273568  31.395159
// Sapelo  Nature Trail Beach Access       -81.261617  31.395847
// Sapelo  Racoon Bluff        -81.229506  31.499082
// Sapelo  Shell Ring      -81.244701  31.514824
// Sapelo  Chocolate Plantation        -81.254634  31.501003
// Sapelo  Cabretta Beach      -81.235684  31.436647
// Sapelo  Cabretta Inlet      -81.236453  31.438
// Sapelo  Cabretta Relic Marsh        -81.237552  31.43958
// Sapelo  Reynolds Duck Pond      -81.234212  31.514568
// Sapelo  Borrow Pit      -81.275418  31.436491
// Sapelo  Hog Hammock Beach Road      -81.250615  31.429754
// Sapelo  First Baptist Church        -81.229721  31.496933
// Sapelo  Old Beach Road Access       -81.258496  31.4062
// Sapelo  Nature Trail Maritime Forest Observation Deck       -81.263909  31.396613
        
        
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
