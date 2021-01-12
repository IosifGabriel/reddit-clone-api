'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, { foreignKey: 'userId' })
      models.Comment.belongsTo(models.Post, { foreignKey: 'postId' })
      models.Comment.belongsTo(models.Comment, { foreignKey: 'parentId' })
      models.Comment.hasMany(models.Comment, { foreignKey: 'parentId' })
    }
  }
  Comment.init({
    text: DataTypes.STRING,
    upvotes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  })
  return Comment
}