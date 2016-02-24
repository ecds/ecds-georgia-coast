
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

        var map = L.map('map', {
            center: [lat, lng],
            zoom: zoom,
            layers: [OpenStreetMap, videos, panotour]
        });

        //OpenStreetMap.addTo(map);

        var sapelo_marsh_landing = L.marker([31.41778, -81.29559], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).addTo(map).bindPopup("Sapelo Marsh Landing").addTo(videos).addTo(videos);

        var sapelo_cabretta_beach = L.marker([31.436647, -81.235684], {icon: L.AwesomeMarkers.icon({icon: 'repeat', prefix: 'fa', markerColor: 'green', spin:true}) }).addTo(map);  
        sapelo_cabretta_beach.bindPopup("Cabretta Beach Panotour").addTo(panotour);

        var sapelo_shell_hammock = L.marker([31.40016, -81.2868], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).addTo(map).bindPopup("Shell Hammock").addTo(videos);

        var sapelo_water_gardens = L.marker([31.39793, -81.27856], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).addTo(map).bindPopup("Water Gardens").addTo(videos);

        var sapelo_ugami = L.marker([31.39734, -81.27986 ], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).addTo(map).bindPopup("UGAMI").addTo(videos);

        var sapelo_lighthouse = L.marker([31.39126, -81.28568 ], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).addTo(map);  
        sapelo_lighthouse.bindPopup("Lighthouse").addTo(videos);

        var sapelo_nannygoat_beach = L.marker([31.39048, -81.26437], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).addTo(map);  
        sapelo_nannygoat_beach.bindPopup("Nannygoat Beach").addTo(videos);

        var sapelo_beach_road_bridge = L.marker([31.39306, -81.27002], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).addTo(map);  
        sapelo_beach_road_bridge.bindPopup("Beach Road Bridge <img src='images/st-catherines.jpg'/>").addTo(videos);

        var sapelo_nature_trail_observation_deck = L.marker([31.39461, -81.27087], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).addTo(map).bindPopup("Nature Trail Observation Deck").addTo(videos);

        var sapelo_nature_trail_bridge = L.marker([31.39472, -81.26988], {icon: L.AwesomeMarkers.icon({icon: 'video-camera', prefix: 'fa', markerColor: 'red', spin:false}) }).bindPopup("Nature Trail Bridge").addTo(videos);

        var sapelo_reynolds_mansion = L.marker([31.39708, -81.27702], {icon: L.AwesomeMarkers.icon({icon: 'camera', prefix: 'fa', markerColor: 'blue', spin:false}) }).bindPopup("Reynolds Mansion").addTo(images);

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
            "Images": images
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);
        map.removeLayer(images);

}
