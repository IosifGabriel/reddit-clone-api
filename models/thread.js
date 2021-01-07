'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    static associate(models) {
      models.Thread.hasMany(models.Post, { foreignKey: 'threadId' });
    }
  };
  Thread.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Thread',
  });
  return Thread;
};