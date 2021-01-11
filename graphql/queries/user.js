const { GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const models = require('../../models')
const userType = require('../types/userType')

module.exports = {
  users: {
    type: GraphQLList(userType),
    description: 'Get the list of all users',
    resolve: async (_, __) => {
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
  }
}