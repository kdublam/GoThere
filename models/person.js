module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define("Person", {
    name: DataTypes.STRING,
    authToken: DataTypes.STRING,
    photoPath: DataTypes.STRING,
    currLat: DataTypes.DECIMAL,
    currLong: DataTypes.DECIMAL,
    destLat: DataTypes.DECIMAL,
    destLong: DataTypes.DECIMAL,
    arriveBy: DataTypes.DATE
  });
  return Person;
};
