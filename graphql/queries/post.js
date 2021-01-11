const { GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const models = require('../../models')
const postType = require('../types/postType')

module.exports = {
  posts: {
    type: GraphQLList(postType),
    description: 'Get a list of all posts',
    resolve: async (_) => {
      const posts = await models.Post.findAll()
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