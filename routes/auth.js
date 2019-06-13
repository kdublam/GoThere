var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  app.get("/signin", authController.signin);

  app.get("/home", authController.home);

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/home",

      failureRedirect: "/signup"
    })
  );

  app.get("/", authController.index);

  app.get("/logout", authController.logout);

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/home",
      failureRedirect: "/signin"
    })
  );
};
