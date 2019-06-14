// The Plan object stores the current location, destination location, and destination time.
// Hopefully this makes things easier to keep track of.
// If we want users to be able to review their history with us, we will need to store Plans in their own table.  Icebox?

var Plan = function(currLat, currLong, destLat, destLong, destTime) {
  this.origin = { lat: currLat, long: currLong };
  this.destination = { lat: destLat, long: destLong };
  this.arrivalTime = destTime;
};

module.exports = Plan;
