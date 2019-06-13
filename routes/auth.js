var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',

  app.get("/", authController.home);

  app.get("/logout", authController.logout);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    if (req.isAuthenticated())

      return next();

    res.redirect('/signin');

  }

  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',

    failureRedirect: '/signin'
  }

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",

      failureRedirect: "/signin"
    })
  );
};
