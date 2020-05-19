'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    nameId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.STRING,
    eventId: DataTypes.INTEGER
  }, {});
  Booking.associate = function(models) {
      };
  return Booking;
};