// Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

//Getting current location using html geolocation api
var lat = document.getElementById("lat");
var long = document.getElementById("long");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    lat.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  lat.innerHTML = "Latitide: " + position.coords.latitude;
  long.innerHTML = "Longitude: " + position.coords.longitude;
  initMap(position);
}
getLocation();

// //Our API key= AIzaSyDqkFyDzzmxCdHCqKjjEnO7COHGRXxfqX4
var marker;
var map;
function initMap(position) {
  console.log(position);

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: position.coords.latitude, lng: position.coords.longitude },
    zoom: 8
  });
  var currentLocation = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  console.log(currentLocation);

  marker = new google.maps.Marker({
    position: currentLocation,
    map: map,
    title: "Current location!",
    draggable: true,
    animation: google.maps.Animation.DROP
  });
  marker(center);
  marker.addListener("click", toggleBounce);
}
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

var input = document.getElementById("destination");

$.get(
  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDqkFyDzzmxCdHCqKjjEnO7COHGRXxfqX4"
)
  .then(function(res) {
    console.log("Goohle place search", res);
  })
  .catch(function(err) {
    console.log(err);
  });

// function destination() {
//   console.log("function");
//   $.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDqkFyDzzmxCdHCqKjjEnO7COHGRXxfqX4", function (res) {
//   console.log(res);

//   var service = new google.maps.distance;
//   }
// )
// }

//Google maps api docs
// function initMap() {
//   var directionsDisplay = new google.maps.DirectionsRenderer;
//   var directionsService = new google.maps.DirectionsService;
//   var origin = document.getElementById("origin");
//   var destination = document.getElementById("destination");

//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 14,
//     center: {origin, destination}
//   });
//   directionsDisplay.setMap(map);

//   calculateAndDisplayRoute(directionsService, directionsDisplay);
//   document.getElementById('mode').addEventListener('change', function() {
//     calculateAndDisplayRoute(directionsService, directionsDisplay);
//   });
// }

// function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//   var selectedMode = document.getElementById('mode').value;
//   directionsService.route({
//     origin: origin,  // Haight.
//     destination: destination,  // Ocean Beach.
//     // Note that Javascript allows us to access the constant
//     // using square brackets and a string value as its
//     // "property."
//     travelMode: google.maps.TravelMode[selectedMode]
//   }, function(response, status) {
//     if (status == 'OK') {
//       directionsDisplay.setDirections(response);
//     } else {
//       window.alert('Directions request failed due to ' + status);
//     }
//   });
// }
