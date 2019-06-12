// An object to store users.

var User = function(name, photo) {
  this.name = name;
  this.photo = photo;
  // this.plan is a placeholder for a Plan object.
  this.plan = {};
};

module.exports = User;
