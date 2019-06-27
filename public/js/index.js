// This file is unused.  See home.js
// we only need 2 decimal places in our lat/long: xx.xx, xxx.xx

const timer = document.querySelector('.timepicker');
M.Timepicker.init(timer, {
  showClearBtn: true
});

var myPlan = {};
var geocoder;

function initGeocode() {
  geocoder = new google.maps.Geocoder();
}

function geocodeAddress(geocoder) {
  var origin = $("#start").val().trim();
  var destination = $("#end").val().trim();

  geocoder.geocode({ "address": origin }, function (result, status) {
    console.log("GEOCODING");
    if (status === 'OK') {
      var newLat = result[0].geometry.location.lat();
      var newLong = result[0].geometry.location.lng();
      newLat = parseFloat(newLat).toFixed(2);
      newLong = parseFloat(newLong).toFixed(2);
      myPlan.currLat = newLat;
      myPlan.currLong = newLong;
      console.log(myPlan);
      geocoder.geocode({ "address": destination }, function (result, status) {
        if (status === 'OK') {
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
          }).then(
            function (response) {
              // 'response' holds the matching plans from the database
              console.log("created new user input");
              console.log(response);
              // Reload the page to get the updated list
              // location.reload();
            }
          );
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function getArrivalTime() {
  var dateText = $("#calendar").val();
  var timeText = $("#clock").val();
 
  var selectedTime = new Date(dateText + ' ' + timeText);
  return selectedTime;
}

$(document).ready(function () {
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.parallax').parallax();
});

// $("#submit").on("click", function (event) {
//   // Make sure to preventDefault on a submit event.
//   event.preventDefault();

//   //alert the user if any input field is empty
//   if ($.trim($("#destination").val()) === "" || $.trim($("#calendar").val()) === "" || $.trim($("#clock").val()) === "" || $.trim($("#transMethod").val()) === "") {
//     alert('Please fiil out all the fields');
//     return false;
//   }
$("#submit").on("click", function () {
  //alert the user if any input field is empty
  if ($.trim($("#start").val()) === "" || $.trim($("#end").val()) === "" || $.trim($("#calendar").val()) === "" || $.trim($("#clock").val()) === "" || $.trim($("#transMethod").val()) === "") {
    alert('Please fiil out all the fields');
    return false;
  }
  myPlan.arriveBy = getArrivalTime();
  geocodeAddress(geocoder);
});


  //get the value of user input for database
  // var start=$("#start").val().trim();
  // var end=$("#end").val().trim();
  // var dateText = $("#calendar").val();
  // var timeText = $("#clock").val();
  // var mode = $("#transMethod").children("option:selected").val()
  // var newTimeText = convertTimeStringformat(24, timeText);
  // var selectedTime = new Date(dateText + ' ' + newTimeText);


   //start and destination should be lat/long
  // var newPlan = {   
  //   start: start,
  //   destination: end,
  //   arrivalDateTime: selectedTime,
  //   transMethod: mode

  // }

  // console.log(newPlan)

  // $.ajax("/api/plans", {
  //   type: "POST",
  //   data: newPlan
  // }).then(
  //   function () {
  //     console.log("created new user input");
  //     // Reload the page to get the updated list
      
  //    window.location.href ="/plans/" + plan.id
  //   }
  // );


//alert user if past or today is selected. allow user to choose today after alerting.
function checkDate() {
  var dateText = $("#calendar").val();
  var selectedDate = new Date(dateText+ ' ' + "00:00 AM");
  console.log(selectedDate);
  var now = new Date();
  if (selectedDate < now) {
    alert("Date must be in the future");
  }
}

//alert user if past time is selected, and clear the form until user selects future time

function checkTime() {

  var dateText = $("#calendar").val();
  var timeText = $("#clock").val(); 
  var selectedTime = new Date(dateText + ' ' + timeText);
  var now = new Date();

  console.log(selectedTime);
  console.log(now);

  if (selectedTime < now) {
    alert("Time must be in the future");
    $("#clock").val('')
  }
}


