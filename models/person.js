module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define("Person", {
    name: DataTypes.STRING,
    photoPath: DataTypes.STRING,
    currLat: DataTypes.DECIMAL,
    currLong: DECIMAL,
    destLat: DECIMAL,
    destLong: DECIMAL,
    arriveBy: DataTypes.DATE
  });
  return Person;
};
