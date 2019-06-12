var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.Person.findAll({}).then(function(users) {
      res.json(users);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.Person.create(req.body).then(function(user) {
      res.json(user);
    });
  });

  // Update a user
  app.put("/api/users", function(req, res) {
    db.Person.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(user) {
      res.json(user);
    });
  });

  // Delete an user by id
  app.delete("/api/users/:id", function(req, res) {
    db.Person.destroy({ where: { id: req.params.id } }).then(function(user) {
      res.json(user);
    });
  });
};
