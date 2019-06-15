module.exports = function (sequelize, DataTypes) {
  var Plan = sequelize.define("Plan", {
    currLat: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    currLong: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    destLat: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    destLong: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    arriveBy: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  return Plan;
};
