'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, { foreignKey: 'userId' })
      models.Post.belongsTo(models.Thread, { foreignKey: 'threadId' })
      models.Post.hasMany(models.Comment, { foreignKey: 'postId' })
    }
  }
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    media: DataTypes.STRING,
    upvotes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  })
  return Post
}