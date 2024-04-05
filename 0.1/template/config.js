var config = {
  title:  `Ma Map Super Cool`,
  gpxFile: `https://www.visugpx.com/download.php?id=Zmyk9S46u1`,
  mapTiles: `CyclOSM`,
  locationEnable: false,
  locationLive: false,
  locationRefresh: 30000, //miliseconds
  locationCenter: false,
  adminMode: false,
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
      <h1>Special Point</h1><iframe width="100%" height="315" src="https://www.youtube.com/embed/UocVdtUq1sU?si=SYzoUvOQB3MANBqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p>Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. </p><p>Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. </p><p>Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. </p><p>Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. Details about this special point. </p>
      ` },
    { index: 203, content: `
      <h1>Titre</h1>
      <p>sdfsdfsdfsdffd</p>
      <p>sdfsdfsdfsdfdsf<br /><br /></p>
      <p>&nbsp;</p>
      ` },
    { index: 517, content: `
      <h1>End</h1>
      ` }
    // Add more markers as needed
  ]
};

