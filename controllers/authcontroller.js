const keys = require("../config/keys");
var exports = (module.exports = {});

exports.signup = function(req, res) {
  res.render("signup");
};

exports.signin = function(req, res) {
  res.render("signin");
};

exports.home = function(req, res) {
  res.render("home", { mapKey: keys.google });
};

exports.index = function(req, res) {
  res.render("index");
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};
