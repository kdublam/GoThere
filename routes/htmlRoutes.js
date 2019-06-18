var db = require("../models");

module.exports = function(app) {
  // results page
  // put the $.ajax().then() to get this inside the /api/home POST route.
  app.get("/result", function(req, res) {
    // get the query from the url (req.params...) and pass it to the db
    //db.Plans.findAll({dbquery}).then(function(dbResult) {
      res.render("result", {data: req.body.plans}); // this is a framework, not necessarily literal code.
    // });
  });
  

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
