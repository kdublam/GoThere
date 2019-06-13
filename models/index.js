// "use strict";

// var fs = require("fs");
// var path = require("path");
// var Sequelize = require("sequelize");
// var basename = path.basename(module.filename);
// var env = process.env.NODE_ENV || "development";
// var config = require(__dirname + "/../config/config.json")[env];
// var db = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// fs.readdirSync(__dirname)
//   .filter(function(file) {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach(function(file) {
//     var model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;


// ****Revised code for maps and directions

initMap(); 

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat:start,lng:start}
  });
  directionsDisplay.setMap(map);
  
  directionsDisplay.setPanel(document.getElementById('directions'));
 
  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  
  document.getElementById("button").addEventListener("click", function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var mode = document.getElementById('mode').value;
  console.log(start);
  
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: mode
  }, function(response, status) {
    if (status === 'OK') {
     console.log(response);
     console.log("this is the res");
     
     
      directionsDisplay.setDirections(response);}
    // } else {
    //   window.alert('Directions request failed due to ' + status);
    // }
  });
}
