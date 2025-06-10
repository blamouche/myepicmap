



document.addEventListener("DOMContentLoaded", function() {
  
  // Show the title
  //document.getElementById('title').innerHTML = config.title;
  
  // Specify your HTML content
  var htmlTitle = `
    <div id="loading" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; background: white; padding: 20px; border-radius: 5px; display: none;">
      Loading GPX file...
    </div>
    <div class="top" id="title">${config.title}</div>
    `;
  var htmlFooter = `
    <div class="bottom"><a href="https://myepicmap.com" target="_blank">Awesome map creator on MyEpicMap.com</a></div>
    `;
  // Insert the HTML before and after the target element
  document.getElementById('map').insertAdjacentHTML('beforebegin', htmlTitle);
  document.getElementById('map').insertAdjacentHTML('afterend', htmlFooter);

  //Initial zoom of the map
  var map = L.map('map', {
      center: [46.8, 2.46],
      zoom: 3,
      zoomControl: false,
      scrollWheelZoom: true,
      attributionControl: true
  });

  



  var tileServer = '';
  var tileServerAttribution = '';
  switch (config.mapTiles) {
    case 'OpenStreetMap.Mapnik':
      tileServer = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
      tileServerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';
      break;
    case 'OpenStreetMap.DE':
      tileServer = 'https://tile.openstreetmap.de/{z}/{x}/{y}.png';
      tileServerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';
      break;
    case 'OpenStreetMap.France':
      tileServer = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
      tileServerAttribution = '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';
      break;
    case 'OpenStreetMap.HOT':
      tileServer = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
      tileServerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>';
      break;
    case 'OPNVKarte':
      tileServer = 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png';
      tileServerAttribution = 'Map <a href="https://memomaps.de/" target="_blank">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';
      break;
    case 'OpenTopoMap':
      tileServer = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
      tileServerAttribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org" target="_blank">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org" target="_blank">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank">CC-BY-SA</a>)';
      break;
    case 'CyclOSM':
      tileServer = 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png';
      tileServerAttribution = '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      break;
    default:
      tileServer = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      tileServerAttribution = '©OpenStreetMap contributors, ©CARTO';
      break;
  }

  //Map style and attributions
  L.tileLayer(tileServer, {
    attribution: tileServerAttribution
  }).addTo(map);
  map.attributionControl.addAttribution('<a href="https://lamouche.fr"  target="_blank">Benoit Lamouche</a>, <a href="https://myepicmap.com" target="_blank">MyEpicMap.com</a>');

  //Initiate the polyline for gpx
  var polyline;

  // Show the loading message
  document.getElementById('loading').style.display = 'block';


  // Use omnivore to load the GPX file
  var gpxLayer = omnivore.gpx(config.gpxFile, null, L.geoJson().on('ready', function() {
      
    // Hide the loading message
    document.getElementById('loading').style.display = 'none';

    // This function is called once the GPX data is fully loaded
    this.eachLayer(function(layer) {
      // Assuming each layer is a polyline
      var latlngs = layer.getLatLngs();
      // Flatten the array if it's nested
      if (Array.isArray(latlngs[0])) {
          latlngs = latlngs.flat();
      }
      // Now latlngs is an array of L.LatLng objects
      var gpsTrack = latlngs.map(function(latlng) {
          return [latlng.lat, latlng.lng];
      });
      // Add the polyline to the map based on the extracted points
      polyline = L.polyline(gpsTrack, {color: config.lineColor, weight: config.lineWeight}).addTo(map);



      //For admin only, display all the gpx points on the map
      if(config.adminMode){
        gpsTrack.forEach(function(latlng, index) {
          var marker = L.circleMarker(latlng, {
                radius: config.adminPoiRadius, // Small radius for the marker
                color: config.adminPoiColor, // Default blue color for visibility
                fillColor: config.adminPoiColor, // Match marker color
                fillOpacity: 0.5, // Semi-transparent
                weight: 1 // Border width
            }).addTo(map);

            // Attach a click event to the marker
            marker.on('click', function() {
                L.popup()
                    .setLatLng(latlng)
                    .setContent("Point Index: " + index) // Display the index of the point
                    .openOn(map);
            });
        });
      }





      config.specialMarkers.forEach(function(markerInfo) {
        // Check if the index exists in the gpsTrack
        if (markerInfo.index < gpsTrack.length) {
          var latlng = gpsTrack[markerInfo.index];
          var marker = L.circleMarker(latlng, {
            radius: markerInfo.index === 0 || markerInfo.index === gpsTrack.length - 1 ? config.poiStartStopRadius : config.poiRadius, // Smaller for start/end, larger for others
            color: markerInfo.index === 0 ? config.poiStartColor : (markerInfo.index === gpsTrack.length - 1 ? config.poiStopColor : config.poiColor),
            fillColor: markerInfo.index === 0 ? config.poiStartColor : (markerInfo.index === gpsTrack.length - 1 ? config.poiStopColor : config.poiColor),
            fillOpacity: markerInfo.index === 0 || markerInfo.index === gpsTrack.length - 1 ? 1 : 0.5, // Semi-transparent for the special marker
            opacity: 0,
            weight: 0
          }).addTo(map);
      
          // Attach a click event to the marker
          marker.on('click', function(e) {
            

            //If landscape
            if(map.getSize().x > map.getSize().y){
              // Calculate the offset to make the popup use 50% of the space on the left of the marker
              var offsetX = map.getSize().x * 0.42; // 50% of the map's width
              var offsetY = map.getSize().y * 0.5; // 50% of the map's height
              var popupOffset = [-offsetX, offsetY]; // Apply this offset to the X position
              var latLng = e.latlng; // Get the clicked marker's position
              var popupHeight = null;
              var popupWidth = map.getSize().x * 0.4;
            }
            //If portrait
            else{
              // Calculate the offset to make the popup use 50% of the space on the left of the marker
              var offsetX = map.getSize().x * 0; // 50% of the map's width
              var offsetY = map.getSize().y * 0.85; // 50% of the map's height
              var popupOffset = [-offsetX, offsetY]; // Apply this offset to the X position
              var latLng = e.latlng; // Get the clicked marker's position
              var popupHeight = map.getSize().y * 0.4;
              var popupWidth = map.getSize().x * 0.8;
            }
            // Set the map zoom to 13 immediately without animation
            map.setView(latLng, 16, { animate: false });
      
            // Wait a brief moment before flying to the final position to allow the setView to complete
            setTimeout(function() {
              
              //If landscape
              if(map.getSize().x > map.getSize().y){
                // Calculate the desired position from the right as a fraction of the map's viewable width
                var desiredPositionFromRight = 0.025; // 25% from the right edge
                // Calculate the offset needed to position the marker at the desired location from the right
                var offsetX = map.getSize().x * desiredPositionFromRight;
                console.log(map.getSize().x);
                console.log(map.getSize().y);
                // Convert the marker's LatLng to pixel coordinates based on the current map state
                var markerPoint = map.project(latLng, 13); // Use zoom level 13 for consistency
                // Calculate the new center point in pixels by subtracting the offsetX from the marker's x position
                var newCenterPoint = L.point(markerPoint.x - offsetX, markerPoint.y);
              }
              //If portrait
              else{
                // Calculate the desired position from the right as a fraction of the map's viewable width
                var desiredPositionFromTop = -0.05; // 30% from the right edge
                // Calculate the offset needed to position the marker at the desired location from the right
                var offsetY = map.getSize().y * desiredPositionFromTop;
                console.log(map.getSize().x);
                console.log(map.getSize().y);
                // Convert the marker's LatLng to pixel coordinates based on the current map state
                var markerPoint = map.project(latLng, 13); // Use zoom level 13 for consistency
                // Calculate the new center point in pixels by subtracting the offsetX from the marker's x position
                var newCenterPoint = L.point(markerPoint.x, markerPoint.y - offsetY);
              }
              
              
              // Convert the new center point back to LatLng coordinates
              var newCenterLatLng = map.unproject(newCenterPoint, 13); // Use zoom level 13 for consistency
              map.flyTo(newCenterLatLng, 16, { animate: true, duration: 0.5, padding: [0, 0] });  
                    
              L.popup({ 
                className: 'scrollable-popup',
                offset: popupOffset,
                minWidth: popupWidth,
                minHeight: popupHeight
              })
              .setLatLng(latLng)
              .setContent(markerInfo.content)
              .openOn(map);
                    
            }, 10); // Adjust the timeout as needed, 10ms is usually enough for the initial zoom to apply
      
                 
          });
      
        }
      });
    });
    // Fit map bounds to the GPX track
    map.fitBounds(gpxLayer.getBounds(), { 
      animate: true, 
      duration: 2, 
      easeLinearity: 0.1,
      padding: [10, 10] // Top and left padding
    });

    // Update the location immediately when the page loads
    if(config.locationEnable){ updateLocation();}

  }));

  gpxLayer.addTo(map);


  


  var locationMarker;
  let browserLocation = true;

  // Function to update the device's location
  function updateLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // If there's an existing marker, remove it
        if (locationMarker) {
            map.removeLayer(locationMarker);
        }

        // Add a new marker to the map at the current position
        locationMarker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
            .bindPopup('You are here!');
            //.openPopup();

        // Optionally, center the map on the current position
        if(config.locationCenter){ map.setView([position.coords.latitude, position.coords.longitude], 13);}

      }, function(error) {
        console.error('Geolocation error:', error);
        browserLocation = false;
      });
    } else {
      alert('Geolocation is not supported by your browser');
      browserLocation = false;
    }
  }

  

  // Then update the location every 30 seconds
  if(config.locationLive && browserLocation){setInterval(updateLocation, config.locationRefresh);}  // 30000 milliseconds = 30 seconds

  

  // Listen for the 'popupclose' event on the map to zoom out
  map.on('popupclose', function() {
    map.fitBounds(polyline.getBounds(), { 
      animate: true, 
      duration: 2, 
      easeLinearity: 0.1,
      padding: [10, 10] // Top and left padding
    });
  });

  var currentPointIndex = 0; // Start with the first point
  var currentFocusCircle = null; // Reference to the current focus circle
});
