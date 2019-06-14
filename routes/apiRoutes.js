var db = require("../models");

module.exports = function(app) {
  // USERS
  // Get all users
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(users) {
      res.json(users);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(user) {
      res.json(user);
    });
  });

  // Update a user
  app.put("/api/users", function(req, res) {
    db.Users.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(user) {
      res.json(user);
    });
  });

  // Delete an user by id
  app.delete("/api/users/:id", function(req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function(user) {
      res.json(user);
    });
  });

  // PLANS
  // Get all plans
  app.get("/api/plans", function(req, res) {
    db.Plan.findAll({}).then(function(plans) {
      res.json(plans);
    });
  });

  // Create a new plan
  app.post("/api/plans", function(req, res) {
    db.Plan.create(req.body).then(function(plan) {
      res.json(plan);
    });
  });

  // Update a plan
  app.put("/api/plans", function(req, res) {
    db.Plan.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(plan) {
      res.json(plan);
    });
  });

  // Delete a plan by id
  app.delete("/api/plans/:id", function(req, res) {
    db.Plan.destroy({ where: { id: req.params.id } }).then(function(plan) {
      res.json(plan);
    });
  });
};
