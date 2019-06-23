var db = require("../models");
var Op = db.Sequelize;

module.exports = function(app) {
  // results page
  // put the $.ajax().then() to get this inside the /api/home POST route.
  app.post("/result", function(req, res) {
    console.log("*** loading /result")
    console.log(req.body);
    res.render("result", req.body);
    // if (req.user) {
    //   req.body.UserId = req.user.id;
    //   console.log(req.body);
    //   db.Plan.create(req.body)
    //     .then(function (plan) {
    //       // console.log(plan);
    //       console.log(typeof plan.currLat);
    //       var dbQuery = {
    //         where: {
    //           UserId: {[Op.ne]: req.body.UserId},
    //           currLat: plan.currLat,    // all lat/long precision 2 (xx.xx)
    //           currLong: plan.currLong,
    //           destLat: plan.destLat,
    //           destLong: plan.destLong,
    //           arriveBy: {                 // within 30 minute range (15 minutes before or after)
    //             [Op.and]: {
    //               [Op.lt]: plan.arriveBy + 900000,
    //               [Op.gt]: plan.arriveBy - 900000
    //             }
    //           }
    //         },
    //         include: [db.User]
    //       }
    //       db.Plan.findAll(dbQuery).then(function (plans) {
    //         console.log(plans);
    //         res.render("result");
    //       });
    //       // sends back the plan that was inserted into the database
    //       // res.json(plan);
    //     })
    //     .catch(function (error) { errorHandler(error, res) });
    // }
    // else {
    //   res.status(403).end();
    // }
  });


    // get the query from the url (req.params...) and pass it to the db
    //db.Plans.findAll({dbquery}).then(function(dbResult) {
  //     res.render("result", {data: req.body.plans}); // this is a framework, not necessarily literal code.
  //   // });
  // });
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

var errorHandler = function (err, res) {
  console.log(err);
  err.errors.forEach(element => {
    console.log(element.message);
  });
  res.status(500).end();
};