'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    imageEvent: DataTypes.STRING,
    organizerName: DataTypes.STRING,
    responsibleName: DataTypes.STRING,
    typeEvent: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.STRING,
    limitPeople: DataTypes.INTEGER,
    price : DataTypes.STRING,
    detail: DataTypes.STRING,
    userId : DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})  };
  return Event;
};