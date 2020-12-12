const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const models = require('../models')
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
  }
})

module.exports = queryType
