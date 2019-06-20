var db = require("../models");
const Op = db.Sequelize.Op;

module.exports = function (app) {
  // USERS
  // Get all users
  app.get("/api/users", function (req, res) {
    db.Users.findAll({}).then(function (users) {
      res.json(users);
    });
  });

  // Create a new user
  app.post("/api/users", function (req, res) {
    db.Users.create(req.body).then(function (user) {
      res.json(user);
    }).catch(function (error) { errorHandler(error, res) });
  });

  // Update a user
  app.put("/api/users", function (req, res) {
    db.Users.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (user) {
      res.json(user);
    }).catch(function (error) { errorHandler(error, res) });
  });

  // Delete an user by id
  app.delete("/api/users/:id", function (req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function (user) {
      res.json(user);
    }).catch(function (error) { errorHandler(error, res) });
  });

  // PLANS
  // Get all plans
  app.get("/api/plans", function (req, res) {
    db.Plan.findAll({}).then(function (plans) {
      res.json(plans);
    });
  });

  // Create a new plan
  // then return all similar plans
  app.post("/api/plans", function (req, res) {
    console.log(req.user);
    if (req.user) {
      req.body.UserId = req.user.id;
      console.log("*** /api/plans request");
      console.log(req.body);
      db.Plan.create(req.body)
        .then(function (plan) {
          // console.log(plan);
          console.log(typeof plan.currLat);
          var dbQuery = {
            where: {
              UserId: {[Op.ne]: req.body.UserId},
              currLat: plan.currLat,    // all lat/long precision 2 (xx.xx)
              currLong: plan.currLong,
              destLat: plan.destLat,
              destLong: plan.destLong,
              arriveBy: {                 // within 30 minute range (15 minutes before or after)
                [Op.and]: {
                  [Op.lt]: plan.arriveBy + 900000,
                  [Op.gt]: plan.arriveBy - 900000
                }
              },
            },
            include: [db.User]
          }
          db.Plan.findAll(dbQuery).then(function (plans) {
            console.log("*** /api/plans result");
            console.log(plans);
            res.json(plans);
          });
          // sends back the plan that was inserted into the database
          // res.json(plan);
        })
        .catch(function (error) { errorHandler(error, res) });
    }
    else {
      res.status(403).end();
    }
  });

  // Update a plan
  // then return all similar plans
  app.put("/api/plans", function (req, res) {
    db.Plan.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (plan) {
      var dbQuery = {
        where: {
          UserId: {[Op.ne]: req.body.UserId},
          currLat: plan.currLat,    // all lat/long precision 2 (xx.xx)
          currLong: plan.currLong,
          destLat: plan.destLat,
          destLong: plan.destLong,
          destTime: {                 // within 30 minute range (15 minutes before or after)
            [Op.and]: {
              [Op.lt]: plan.arriveBy + 900000,
              [Op.gt]: plan.arriveBy - 900000
            }
          }
        }
      }
      db.Plan.findAll(dbQuery).then(function (plans) {
        console.log(plans);
        res.json(plans);
      });
      // sends back the plan that was updated in the database
      // res.json(plan);
    }).catch(function (error) { errorHandler(error, res) });
  });

  // Delete a plan by id
  app.delete("/api/plans/:id", function (req, res) {
    db.Plan.destroy({ where: { id: req.params.id } }).then(function (plan) {
      res.json(plan);
    }).catch(function (error) { errorHandler(error, res) });

  });
};

var errorHandler = function (err, res) {
  console.log(err);
  err.errors.forEach(element => {
    console.log(element.message);
  });
  res.status(500).end();
}
