
  

# About

  

This minimalist app aim to create a webpage to display and enrich a GPX track by adding POIs (points of interest) with rich data.

This webapp is developped and maintained by [Benoit Lamouche](https://lamouche.fr).

As an enthousiast of outdoor adventures and maps I wanted to have a simple and minimalist way to display contextualized contents on a map, and publish it on my blog or strava profile.



# How to use ?

  For now, the Alpha version is not hosted, but you can still use it on your website by hosting the file on your server (if you have a wordpress or any other CMS that allows to upload html file).
## 1 - Create the html file

Create a `map.html` file with this template :
  

    <!doctype  html>
    <html  lang="en">
	    <head>
		    <meta  charset="utf-8">
		    <meta  name="viewport"  content="width=device-width, initial-scale=1.0">
		    <title>My epic map</title>
		    <link  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"  rel="stylesheet"  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"  crossorigin="anonymous">
		    <link  rel="preconnect"  href="https://fonts.googleapis.com">
		    <link  rel="preconnect"  href="https://fonts.gstatic.com"  crossorigin>
		    <link  href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap"  rel="stylesheet">
		    <link  rel="stylesheet"  href="https://unpkg.com/leaflet/dist/leaflet.css"  />
		    <script  src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
		    <script  src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.5.1/gpx.min.js"></script>
		    <script  src="https://unpkg.com/leaflet-omnivore/leaflet-omnivore.min.js"></script>
		    <link  rel="stylesheet"  href="../style.css"  />
		    <script  src="./config.js"></script>
		    <script  src="../script.js"></script>
	    </head>
	    <body>
		    <div  id="loading"  style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; background: white; padding: 20px; border-radius: 5px; display: none;">Loading GPX file...</div>
		    <div  class="container">
		    <div  class="top"  id="title">My Epic Map</div>
		    <div  id="map"></div>
		    <div  class="bottom"><a  href="https://myepicmap.com"  target="_blank">Awesome map creator on MyEpicMap.com</a></div>
		    </div>
	    </body>
    </html>


## 2 - Create the configuration file

In the same folder than your `map.html`, create a `config.js` file:

    var config = {
        title:  `My epic map`,
        gpxFile: `./myfile.gpx`,
        mapTiles: `OpenStreetMap.HOT`,
        adminMode: true,
        adminPoiColor: `red`,
        adminPoiRadius: 5,
        lineColor: `purple`,
        lineWeight: 4,
        poiColor: `black`,
        poiRadius: 10,
        poiStartColor: `green`,
        poiStopColor: `red`,
        poiStartStopRadius: 10,
        specialMarkers: [
          { index: 0, content:  `
            <h1>Start</h1>
            ` },
          { index: 392, content: `
            <h1>Special Point</h1>
            ` },
          { index: 203, content: `
            <h1>Special Point</h1>
            ` },
          { index: 517, content: `
            <h1>End</h1>
            ` }
          // Add more markers as needed
        ]
      };

## 3 - Host your GPX file

The last file you need is a GPX file. You can get it from your favourite sport tracking app.
You must host it in the same directory than the `map.html` and `config.js`.

## 4 - Final directory

Your final directory must look like this :

	/Root directory
	---/My map directory
	------/map.html
	------/config.js
	------/file.gpx

## Optional - merge html & js

As an optional step, you can also merge the `html` and the `js` by including the configuration in the `header` of the `html` page.

# Configuration

Let's focus on the `config.js` file :

`title` : The title to display on your map.

`gpxFile` : The url of the GPX file. Can be a relative URL or an absolute URL (only if the target server allows CORS).

`mapTiles` : The style for the map. Only public styles are available for now. *Options* : `OpenStreetMap.Mapnik` | `OpenStreetMap.DE` | `OpenStreetMap.France` | `OpenStreetMap.HOT` | `OPNVKarte` | `OpenTopoMap` | `CyclOSM`

`adminMode` : Allows to display all the points of the track in order to setup the special markers. To not use on production.

`adminPoiColor` : Color of the POI in admin mode. Can be text or hexadecimal.

`adminPoiRadius` : Size of the POI for admin mode.

`lineColor` : Color of the GPX track on the map. Can be text or hexadecimal.

`lineWeight` : Weight of the GPX track on the map.

`poiColor` : Color of the special markers. Can be text or hexadecimal.

`poiRadius` : Size of the POI on the map.

`poiStartColor` : Specific color for the first POI. Can be text or hexadecimal.

`poiStopColor` : Specific color for the last POI. Can be text or hexadecimal.

`poiStartStopRadius` : Size for the start and stop POI.

`specialMarkers` : Array of the special POI with rich content. Support HTML.


**Additional ressources :**
https://leaflet-extras.github.io/leaflet-providers/preview/
https://htmlcolorcodes.com/color-names/ 
