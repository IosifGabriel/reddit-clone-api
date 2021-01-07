'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  };
  Comment.init({
    text: DataTypes.STRING,
    upvotes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};