var db = require("../models");

module.exports = function(app) {
  // results page
  // put the $.ajax().then() to get this inside the /api/home POST route.
  app.get("/result", function(req, res) {
    // get the query from the url (req.params...) and pass it to the db
    //db.Plans.findAll({dbquery}).then(function(dbResult) {
      res.render("result", {data: dbResult}); // this is a framework, not necessarily literal code.
    // });
  });
  // Load index page

  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("home", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
