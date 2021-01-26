const { GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')

const userProfileType = require('../types/userProfileType');
const profileInputType = require('../inputTypes/profileInputType');

module.exports = {
  updateProfile: {
    type: userProfileType,
    description: 'Update current user profile',
    args: {
      input: {
        type: GraphQLNonNull(profileInputType)
      }
    },
    resolve: async (_, { input }, { user }) => {
      const profile = await user.getProfile()
      await profile.update(input)
      return profile;
    },
  }
}