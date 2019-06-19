//initMap is passed to the google maps API.  We do not call it.
function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 47.6062, lng: 122.3321 }
  });
  directionsDisplay.setMap(map);

  directionsDisplay.setPanel(document.getElementById("directions"));
  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  
  document.getElementById("submit").addEventListener("click", function () {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });

}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var mode = document.getElementById("transMethod").value;

  var dateText = document.getElementById("calendar").value;
  var timeText = document.getElementById("clock");
  

  var selectedTime = new Date(dateText + " " + timeText);
  console.log(selectedTime);
  

  if (selectedTime <= Date.now()) {
    alert("Date has to be in the future");
  } else {
    var routeOptions = {
      origin: start,
      destination: end,
      travelMode: mode
    };
    console.log(start);
    if (mode === "TRANSIT") {
      routeOptions.transitOptions = {
        arrivalTime: acceptedMapTime,
        modes: ["BUS", "TRAIN"],
        routingPreference: "FEWER_TRANSFERS"
      };
    }
    console.log(routeOptions);
  }
  directionsService.route(routeOptions, function(response, status) {
    if (status === "OK") {
      console.log(response);
      console.log(status);
      console.log("this is the res");

      directionsDisplay.setDirections(response);
    }
    // } else {
    //   window.alert('Directions request failed due to ' + status);
    // }
  });
  // window.location.href ="/result"
}

// const googleMapsScript = document.createElement('script');
// googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDqkFyDzzmxCdHCqKjjEnO7COHGRXxfqX4&callback=initMap';
// document.head.appendChild(googleMapsScript);
