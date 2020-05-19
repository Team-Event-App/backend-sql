'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    fullname: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Event, {
      through: {
          model: models.Booking
      },
      foreignKey: 'id'
  })
  };
  return User;
};
