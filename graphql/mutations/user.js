const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const models = require('../../models')

const userProfileType = require('../types/userProfileType');

module.exports = {
  updateProfile: {
    type: userProfileType,
    args: {
      userId: {
        type: GraphQLNonNull(GraphQLInt)
      },
      avatar: {
        type: GraphQLString,
      },
      age: {
        type: GraphQLInt,
      },
    },
    resolve: async (_, { userId, avatar, age }) => {
      const profile = await models.Profile.findByPk(userId);
      if (avatar !== null)
        profile.avatar = avatar
      if (age !== null)
        profile.age = age
      profile.save()

      return profile;
    },
  }
}