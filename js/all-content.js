
function getLeaflet(lat,lng,zoom) {

        var dataToShow = $("body").attr('data-to-show')
        if ($("body").attr('island-data')) {
            var islandToShow = $("body").attr('island-data')
        }
        else {
            var islandToShow = "Not Specified"
        }
        console.log(islandToShow)

        var OpenStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
            layers: [baseMaps, overlayMaps]
        });

        var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        var panoramas = L.layerGroup([]);
        var videos = L.layerGroup([]);
        var articles = L.layerGroup([]);
        var images = L.layerGroup([]);
        var galleries = L.layerGroup([]);

        var imageStyle =  L.AwesomeMarkers.icon({
            icon: 'camera', 
            prefix: 'fa', 
            markerColor: 'red', 
            spin:false
        });

        var videoStyle =  L.AwesomeMarkers.icon({
            icon: 'video-camera', 
            prefix: 'fa', 
            markerColor: 'green', 
            spin:false
        });

        var articleStyle =  L.AwesomeMarkers.icon({
            icon: 'file-text', 
            prefix: 'fa', 
            markerColor: 'orange', 
            spin:false
        });

        var panoramaStyle =  L.AwesomeMarkers.icon({
            icon: 'circle-o-notch', 
            prefix: 'fa', 
            markerColor: 'purple', 
            spin:true
        });

        var galleryStyle =  L.AwesomeMarkers.icon({
            icon: 'picture-o', 
            prefix: 'fa', 
            markerColor: 'blue', 
            spin:false
        });


        var countyStyle = {
          "color": "#66C396",
          "weight": 2,
          "opacity": 0.85
      };

        var counties = L.layerGroup([]);
        $.ajax({
            type: "POST",
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


        $.ajax({
            type: "POST",
            url: "geo-json/all_content.json",
            dataType: 'json',
            success: function (response) {
                var geojsonLayer = L.geoJson(response, {
                    pointToLayer: function(feature, latlng) {
                        if (feature.properties.Loc_type == 'image') {
                            return L.marker(latlng, {
                                icon: imageStyle
                            })
                        }
                        else if (feature.properties.Loc_type == 'video'){
                            return L.marker(latlng, {
                                icon: videoStyle
                            })
                        }
                        else if (feature.properties.Loc_type == 'photo-gallery'){
                            return L.marker(latlng, {
                                icon: galleryStyle
                            })
                        }
                        else if (feature.properties.Loc_type == 'panorama'){
                            return L.marker(latlng, {
                                icon: panoramaStyle
                            })
                        }
                        else if (feature.properties.Loc_type == 'article'){
                            return L.marker(latlng, {
                                icon: articleStyle
                            })
                        }
                    },
                    onEachFeature: function (feature, layer) {
                        var thisPopup = ""
                        thisPopup += "<div class='articleTitle'>"+feature.properties.Location+"</div>"
                        if (feature.properties.Loc_type == "image") {
                            layer.bindPopup(feature.properties.Location)
                            layer.addTo(images)
                        }
                        else if (feature.properties.Loc_type == "video") {
                            if (feature.properties.Description) {
                                thisPopup += "<div class='articleDescription'>"+feature.properties.Description+"</div>"
                            }
                            if (feature.properties.video_id) {
                                thisPopup += '<div class="embed-responsive embed-responsive-16by9 video"><iframe src="https://player.vimeo.com/video/'+feature.properties.video_id+'?title=0&byline=0&portrait=0" width="100%" height="100%" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen=""></iframe>'
                            }
                            layer.bindPopup(thisPopup)
                            if (islandToShow == feature.properties.Island.toLowerCase() || islandToShow == "Not Specified") {
                                layer.addTo(videos)
                            }
                        }
                        else if (feature.properties.Loc_type == "panorama") {
                            if (feature.properties.Description) {
                                thisPopup += "<div class='articleDescription'>"+feature.properties.Description+"</div>"
                            }
                            if (feature.properties.URL) {
                                thisPopup += "<a href='"+feature.properties.URL+"'><div class='btn btn-primary'>Go To Panorama</div></a>"
                            }
                            layer.bindPopup(thisPopup)
                            layer.addTo(panoramas)
                        }
                        else if (feature.properties.Loc_type == "article") {
                            if (feature.properties.Description) {
                                thisPopup += "<div class='articleDescription'>"+feature.properties.Description+"</div>"
                            }
                            if (feature.properties.URL) {
                                thisPopup += "<a href='"+feature.properties.URL+"'><div class='btn btn-primary'>Read Article</div></a>"
                            }
                            layer.bindPopup(thisPopup)
                            layer.addTo(articles)
                        }
                        else if (feature.properties.Loc_type == "photo-gallery") {
                            layer.addTo(galleries)
                            var thisGallery = ""
                            var thisGalleryId = feature.properties.Location.replace(/([~!@#$%^&*()_+=`{}\[\]\|\\:;'<>,.\/? ])+/g, '-').replace(/^(-)+|(-)+$/g,'').toLowerCase()
                            thisGallery = "<div id='" + thisGalleryId + "' class='carousel slide' data-ride='carousel'><p class='gallery-label'>"+feature.properties.Location+"</p><div class='carousel-inner' role='listbox'>"
                            $.each(feature.images, function(index, val) {
                                if (index == 0) {
                                    thisGallery += '<div class="item active"><img src="'+val.url+'">'
                                }
                                else {
                                    thisGallery += '<div class="item"><img src="'+val.url+'">'
                                }
                                if (val.caption) {
                                    thisGallery += '<div class="carousel-caption">'
                                    if (val.credit) {
                                        thisGallery += '<p class="credit">'+val.credit+'</p>'
                                    }
                                    thisGallery += '<p>'+val.caption+'</p>'
                                    
                                    thisGallery += '</div>'
                                }
                                if (val.credit && !val.caption) {
                                    thisGallery += '<div class="carousel-caption"><p class="credit">'+val.credit+'</p></div>'
                                }
                                thisGallery += '</div>'
                            });
                            thisGallery += '<a class="left carousel-control" href="#'+thisGalleryId+'" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="right carousel-control" href="#'+thisGalleryId+'" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a>'
                            thisGallery += "</div>"
                            thisGallery += "</div>"
                            layer.bindPopup(thisGallery)
                        }
                        else {
                            layer.bindPopup("feature.properties")
                        }
                     }
                 });
            }
        });

        var startingLayers = [OpenStreetMap]
        
        if (dataToShow.indexOf('videos') !== -1 ) {
            startingLayers.push(videos)      
        }
        if (dataToShow.indexOf('galleries') !== -1 ) {
            startingLayers.push(galleries)      
        }
        if (dataToShow.indexOf('panoramas') !== -1 ) {
            startingLayers.push(panoramas)      
        }
        if (dataToShow.indexOf('articles') !== -1 ) {
            startingLayers.push(articles)      
        }
        if (dataToShow.indexOf('images') !== -1 ) {
            startingLayers.push(images)      
        }
        if (dataToShow.indexOf('counties') !== -1 ) {
            startingLayers.push(counties)      
        }

        var map = L.map('map', {
            center: [lat, lng],
            zoom: zoom,
            layers: startingLayers
        });        

        var baseMaps = {
            "Open Street Map": OpenStreetMap,
            "Open Street Map Black and White": OpenStreetMap_BlackAndWhite
        };

        if (islandToShow == "Not Specified") {
            var overlayMaps = {
                "County Borders":counties,   
                "Videos": videos,
                //"Images": images,
                "Photo Galleries": galleries,
                "Articles": articles,
                "Panoramas":panoramas
            }
        }
        else {
            var overlayMaps = { 
                "Videos": videos,
                //"Images": images,
                "Photo Galleries": galleries,
                "Articles": articles,
                "Panoramas":panoramas
            };
        }

        

        L.control.layers(baseMaps, overlayMaps).addTo(map);
        map.removeLayer(images);
        map.fitBounds(map.getBounds());
}
