'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    sender: DataTypes.STRING,
    totalAmount: DataTypes.STRING,
    imageProof: DataTypes.STRING,
    bookingId: DataTypes.INTEGER
  }, {});
  Payment.associate = function(models) {  };
  return Payment;
};