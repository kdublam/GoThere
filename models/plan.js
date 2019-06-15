module.exports = function (sequelize, DataTypes) {
  var Plan = sequelize.define("Plan", {
    currLat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    currLong: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    destLat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    destLong: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    arriveBy: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  });

  return Plan;
};
