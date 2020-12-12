'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      models.Profile.belongsTo(models.User,{​​ foreignKey: 'userId' }​​);
    }
  };
  Profile.init({
    postkarma: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    age: DataTypes.INTEGER,
    commentkarma: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};