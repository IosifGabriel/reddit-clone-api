const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const postType = require('../types/postType')
const postInputType = require('../inputTypes/postInputType')
const userProfileType = require('../types/userProfileType');

module.exports = {
  createPost: {
    type: postType,
    description: 'Create a post',
    args: {
      userId: {
        type: GraphQLNonNull(GraphQLInt)
      },
      postInput: {
        type: GraphQLNonNull(postInputType)
      },
    },
    resolve: async (_, { userId, postInput }) => {
      const user = await models.User.findByPk(userId);
      if (!user) {
        return null;
      }

      const post = await user.createPost(postInput);
      return post;
    },
  },
  upvotePost: {
    type: userProfileType,
    args: {
      userId: {
        type: GraphQLNonNull(GraphQLInt)
      },
    },
    resolve: async (_, { userId }) => {
      const profile = await models.Profile.findByPk(userId);
      const numb = Number(profile.postkarma) + 1
      profile.postkarma = numb
      profile.save()
      return profile;
    },
  },
  upvoteComment: {
    type: userProfileType,
    args: {
      userId: {
        type: GraphQLNonNull(GraphQLInt)
      },
    },
    resolve: async (_, { userId }) => {
      const profile = await models.Profile.findByPk(userId);
      profile.commentkarma = profile.commentkarma + 1
      profile.save()
      return profile;
    },
  },
  downvotePost: {
    type: userProfileType,
    args: {
      userId: {
        type: GraphQLNonNull(GraphQLInt)
      },
    },
    resolve: async (_, { userId }) => {
      const profile = await models.Profile.findByPk(userId);
      profile.postkarma = profile.postKarma - 1
      profile.save()
      return profile;
    },
  },
  downvoteComment: {
    type: userProfileType,
    args: {
      userId: {
        type: GraphQLNonNull(GraphQLInt)
      },
    },
    resolve: async (_, { userId }) => {
      const profile = await models.Profile.findByPk(userId);
      profile.commentkarma = profile.commentkarma - 1
      profile.save()
      return profile;
    }
  }
}