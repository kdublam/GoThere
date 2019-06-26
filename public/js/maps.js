// Plan variables:
var myPlan = {};

var start;
var end;
var mode;
var acceptedMapTime;

// Expose Google Maps API methods to our code:
var geocoder;
var directionsDisplay;
var directionsService;
var map;

//initMap is passed to the google maps API.  We do not call it.
function initMap() {
  // The geocoder
  geocoder = new google.maps.Geocoder();

  // The maps
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 47.6062, lng: -122.3321 }
  });
}

// Document load...
$(function () {
  start = $("#start").text();
  end = $("#end").text();
  mode = $("#transMethod").text();
  acceptedMapTime = getArrivalTime();
  myPlan.arriveBy = acceptedMapTime;
  geocodeAddress(geocoder);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("directions"));

  calculateAndDisplayRoute(directionsService, directionsDisplay);
});

// I'm not sure if this is implemented...
var onChangeHandler = function () {
  calculateAndDisplayRoute(directionsService, directionsDisplay);
};

// document.getElementById("submit").addEventListener("click", function () {
// });
function geocodeAddress(geocoder) {
  geocoder.geocode({ address: start }, function (result, status) {
    console.log("GEOCODING");
    if (status === "OK") {
      var newLat = result[0].geometry.location.lat();
      var newLong = result[0].geometry.location.lng();
      newLat = parseFloat(newLat).toFixed(2);
      newLong = parseFloat(newLong).toFixed(2);
      myPlan.currLat = newLat;
      myPlan.currLong = newLong;
      console.log(myPlan);
      geocoder.geocode({ address: end }, function (result, status) {
        if (status === "OK") {
          // console.log(result);
          var newLat = result[0].geometry.location.lat();
          var newLong = result[0].geometry.location.lng();
          newLat = parseFloat(newLat).toFixed(2);
          newLong = parseFloat(newLong).toFixed(2);
          myPlan.destLat = newLat;
          myPlan.destLong = newLong;
          console.log(myPlan);
          $.ajax("/api/plans", {
            type: "POST",
            data: myPlan // myPlan when map is integrated.
          }).then(function (response) {
            // 'response' holds the matching plans from the database
            console.log("created new user input");
            console.log(response);
            displayResults(response)
            // Reload the page to get the updated list
            // location.reload();
          });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function displayResults(response) {
  if (response.length === 0) {
    $("#match-result").text("Sorry. There isn't any matching trip");
  }
  // Add to the table here...
  // $("tbody").empty();
  else {
    var newResponse = removeDuplicates(response);
    console.log(newResponse);

    for (var i = 0; i < newResponse.length; i++) {
      var tr = $("<tr>").append(
        $("<td>").text(newResponse[i].User.firstname),
        $("<td>").text(newResponse[i].User.email)
      );
      $("#match-result").text("We found matching trip partners for you");
      $("#match").append(tr);
    }
  }
}

      
function removeDuplicates(arr) {
        
  return Object.keys(arr.reduce((acc, val) => {
    arr.forEach(function(v){ delete v.id });
      acc[JSON.stringify(val)] = 1;

      return acc;
  }, {})).map((val, key, array) => JSON.parse(array[key]))
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  if (acceptedMapTime <= Date.now()) {
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
  directionsService.route(routeOptions, function (response, status) {
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
}




function getArrivalTime() {
  var dateText = $("#calendar").text();
  var timeText = $("#clock").text();
  var newTimeText = convertTimeStringformat(24, timeText);
  var selectedTime = new Date(dateText + " " + newTimeText);
  return selectedTime;
}

function convertTimeStringformat(format, time) {
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM === "PM" && hours < 12) hours = hours + 12;
  if (AMPM === "AM" && hours === 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  return sHours + ":" + sMinutes;
}
