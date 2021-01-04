const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const models = require('../models')
const postType = require('./types/postType')
const userType = require('./types/userType')

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: GraphQLList(userType),
      description: 'Get the list of all users',
      resolve: async (_, __, context) => {
        const users = await models.User.findAll()
        return users
      }
    },
    user: {
      type: userType,
      description: 'Get a specific user by ID',
      args: {
        userId: {
          type: GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: async (_, { userId }) => {
        const user = await models.User.findByPk(userId);
        return user;
      }
    },
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
})

module.exports = queryType
