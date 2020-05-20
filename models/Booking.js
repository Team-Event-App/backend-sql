'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    total: DataTypes.STRING,
    eventId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.Event, {foreignKey: 'eventId', as: 'event'}, models.User, {foreignKey: 'userId', as: 'user'})
  };
  return Booking;
};