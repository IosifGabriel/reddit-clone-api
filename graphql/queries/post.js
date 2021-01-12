const { GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList } = require('graphql')
const models = require('../../models')
const { Op } = require('sequelize')
const postType = require('../types/postType')

module.exports = {
  posts: {
    type: GraphQLList(postType),
    description: 'Get a list of all posts',
    args: {
      title: { type: GraphQLString },
      sort: { type: GraphQLString },
      limit: { type: GraphQLInt },
      offset: { type: GraphQLInt }
    },
    resolve: async (_, { title = '', sort = 'DESC', limit = 5, offset = 0 }) => {
      const posts = await models.Post.findAndCountAll({
        where: {
          title: { [Op.like]: `%${title}%` }
        },
        order: [['createdAt', sort]],
        limit,
        offset
      })
      return posts.rows
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