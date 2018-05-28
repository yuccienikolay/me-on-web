function _(a, b) {
    return {lat: a, lng: b}
}

function initMoscow() {
    var map = new google.maps.Map(document.getElementById('moscow'), {
        zoom: 8.4,
        center: _(55.752068, 37.617663)
    });
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: ""
      });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}
    );
}

var locations = [
    _(55.729717, 38.026752),
    _(55.752068, 37.617663),
    _(55.751302, 37.999721),
    _(55.749754, 37.996373),
    _(55.750410, 38.007876),
    _(55.798367, 37.939345),
    _(55.734448, 37.606398),
    _(55.731673, 37.603659),
    _(55.757334, 37.658201),
    _(55.767250, 37.652509),
    _(55.757717, 37.634320),
    _(55.759810, 37.625113),
    _(55.755460, 37.613385),
]