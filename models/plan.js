module.exports = function(sequelize, DataTypes) {
  var Plan = sequelize.define("Plan", {
    photoPath: DataTypes.STRING,
    currLat: DataTypes.DECIMAL,
    currLong: DataTypes.DECIMAL,
    destLat: DataTypes.DECIMAL,
    destLong: DataTypes.DECIMAL,
    arriveBy: DataTypes.DATE
  });
  Plan.associate = function(models) {
    Plan.belongsTo(models.User);
  };

  return Plan;
};
