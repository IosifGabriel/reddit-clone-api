const { GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList } = require('graphql')
const models = require('../../models')
const { Op } = require('sequelize')
const postType = require('../types/postType')

module.exports = {
  posts: {
    type: GraphQLList(postType),
    description: 'Get a list of all posts',
    args: {
      title: {
        type: GraphQLString
      },
    },
    resolve: async (_, { title = '' }) => {
      const posts = await models.Post.findAll({
        where: {
          title: {
            [Op.like]: `%${title}%`
          }
        }
      })
      return posts
    }
  },
  post: {
    type: postType,
    description: 'Get a specific post by ID',
    args: {
      id: {
        type: GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: async (_, { id }) => {
      const post = await models.Post.findByPk(id);
      return post;
    }
  }
}