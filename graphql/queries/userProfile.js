const { GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const userProfileType = require('../types/userProfileType')

module.exports = {
  userProfile: {
    type: userProfileType,
    description: 'Get a specific profile by ID',
    args: {
      userId: {
        type: GraphQLNonNull(GraphQLInt)
      }
    },
    resolve: async (_, { userId }) => {
      const userProfile = await models.Profile.findByPk(userId);
      return userProfile;
    }
  },
  userProfiles: {
    type: GraphQLList(userProfileType),
    description: 'Get a list of all user profiles',
    resolve: async (_) => {
      const userprofiles = await models.Profile.findAll()
      return userprofiles
    }
  }
}