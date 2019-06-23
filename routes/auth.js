var authController = require("../controllers/authcontroller.js");

module.exports = function(app, passport) {
  app.get("/signup", authController.signup);

  app.get("/signin", authController.signin);

  // app.get("/signin", authController.signin);

  app.get("/home", isLoggedIn, authController.home);

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
    if (req.isAuthenticated()) {
      // console.log(req.body);
      return next();
    }

    // res.redirect("/");

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
