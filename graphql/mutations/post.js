const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const models = require('../../models')

const postType = require('../types/postType')
const userProfileType = require('../types/userProfileType')
const commentType = require('../types/commentType')

const postInputType = require('../inputTypes/postInputType')
const commentInputType = require('../inputTypes/commentInputType')

module.exports = {
  createPost: {
    type: postType,
    description: 'Create a post',
    args: {
      input: {
        type: GraphQLNonNull(postInputType)
      },
    },
    resolve: async (_, { input }, { user }) => {
      if (!user)
        throw new Error('not authenticated')

      const post = await user.createPost(input);
      return post;
    },
  },
  addComment: {
    type: commentType,
    description: 'Add a comment',
    args: {
      input: {
        type: GraphQLNonNull(commentInputType)
      }
    },
    resolve: async (_, { input }, { user }) => {
      if (!user)
        throw new Error('not authenticated')

      input.userId = user.id

      const comment = await models.Comment.create(input)
      return comment
    }
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