
function getLeaflet(lat,lng,zoom) {

    console.log(lat);
    console.log(lng)
    console.log(zoom);
    var map = L.map('map').setView([lat, lng], zoom);

        var OpenStreetMap_BlackAndWhite = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
            type: 'map',
            ext: 'jpg',
            attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: '1234'
        });
        OpenStreetMap_BlackAndWhite.addTo(map);

        //var sapelo_marsh_landing = L.marker([31.41778, -81.29559]).addTo(map);
        //sapelo_marsh_landing.bindPopup("SAPELO MARSH LANDING");
        //var sapelo_shell_hammock = L.marker([31.40016, -81.2868]).addTo(map);

        //map.on('click', onMapClick);

    // console.log(lat);
    // console.log(lng);
    // //Map parametrs
    // var mapOptions = {
    //     zoom: zoom,
    //     center: new google.maps.LatLng(lat,lng),
    //     mapTypeId: google.maps.MapTypeId.HYBRID,

    //     mapTypeControl: false,
    //     mapTypeControlOptions: {
    //         style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
    //         position: google.maps.ControlPosition.BOTTOM_CENTER
    //     },
    //     panControl: false,
    //     panControlOptions: {
    //         position: google.maps.ControlPosition.TOP_RIGHT
    //     },
    //     zoomControl: false,
    //     zoomControlOptions: {
    //         style: google.maps.ZoomControlStyle.LARGE,
    //         position: google.maps.ControlPosition.TOP_RIGHT
    //     },
    //     scaleControl: false,
    //     scaleControlOptions: {
    //         position: google.maps.ControlPosition.TOP_LEFT
    //     },
    //     streetViewControl: false,
    //     streetViewControlOptions: {
    //         position: google.maps.ControlPosition.LEFT_TOP
    //     }
    // }

    // //map
    // var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
}

