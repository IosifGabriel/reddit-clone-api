const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const models = require('../models')
const postType = require('./types/postType')
const userType = require('./types/userType')

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: GraphQLList(userType),
      resolve: async (_) => {
        const users = await models.User.findAll()
        return users
      }
    },
    user: {
      type: userType,
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
      resolve: async (_) => {
        const posts = await models.Post.findAll()
        return posts
      }
    }
  }
})

module.exports = queryType
