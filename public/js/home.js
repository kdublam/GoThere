// we only need 2 decimal places in our lat/long: xx.xx, xxx.xx

const timer = document.querySelector('.timepicker');
M.Timepicker.init(timer, {
  showClearBtn: true
});



$(document).ready(function () {
  $('.sidenav').sidenav();
  $('select').formSelect();
  $('.parallax').parallax();
});

$("#submit").on("click", function () {
  //alert the user if any input field is empty
  if ($.trim($("#start").val()) === "" || $.trim($("#end").val()) === "" || $.trim($("#calendar").val()) === "" || $.trim($("#clock").val()) === "" || $.trim($("#transMethod").val()) === "") {
    alert('Please fiil out all the fields');
    return false;
  }
});



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
  var newTimeText = convertTimeStringformat(24, timeText);
  var selectedTime = new Date(dateText + ' ' + newTimeText);
  var now = new Date();

  console.log(selectedTime);
  console.log(now);

  if (selectedTime < now) {
    alert("Time must be in the future");
    $("#clock").val('')
  }
}

//convert 12h time string to 24h time string
function convertTimeStringformat(format, str) {
  var time = $("#clock").val();
  var hours = Number(time.match(/^(\d+)/)[1]);
  var minutes = Number(time.match(/:(\d+)/)[1]);
  var AMPM = time.match(/\s(.*)$/)[1];
  if (AMPM == "PM" && hours < 12) hours = hours + 12;
  if (AMPM == "AM" && hours == 12) hours = hours - 12;
  var sHours = hours.toString();
  var sMinutes = minutes.toString();
  if (hours < 10) sHours = "0" + sHours;
  if (minutes < 10) sMinutes = "0" + sMinutes;
  return (sHours + ":" + sMinutes);
}

