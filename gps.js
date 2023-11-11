var map;
var routeCoordinates = [
  { lat: 40.7128, lng: -74.0060 }, // Starting point (New York, NY)
  { lat: 34.0522, lng: -118.2437 }, // Ending point (Los Angeles, CA)
];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: routeCoordinates[0], // Set the initial map center
  });

  // Create a Polyline to represent the route
  var routePath = new google.maps.Polyline({
    path: routeCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  // Set the Polyline on the map
  routePath.setMap(map);

  // Create a marker for the person's current position
  var personMarker = new google.maps.Marker({
    position: routeCoordinates[0], // Starting point
    map: map,
    icon: 'person-icon.png', // You can use a custom icon for the person
  });

  // Animate the person walking along the route
  animatePerson(personMarker, routePath);
}

function animatePerson(marker, path) {
  var speed = 10; // Adjust the speed of animation
  var i = 0;
  function moveMarker() {
    if (i < path.getPath().getArray().length) {
      marker.setPosition(path.getPath().getArray()[i]);
      i++;
      setTimeout(moveMarker, speed);
    }
  }
  moveMarker();
}