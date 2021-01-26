const { GraphQLNonNull } = require('graphql')
const models = require('../../models')

const postType = require('../types/postType')
const commentType = require('../types/commentType')

const postInputType = require('../inputTypes/postInputType')
const upvotePostInputType = require('../inputTypes/upvotePostInputType')
const commentInputType = require('../inputTypes/commentInputType')
const upvoteCommentInputType = require('../inputTypes/upvoteCommentInputType')

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
  upvotePost: {
    type: postType,
    description: 'Upvote a post',
    args: {
      input: {
        type: GraphQLNonNull(upvotePostInputType)
      },
    },
    resolve: async (_, { input }, { user }) => {
      if (!user)
        throw new Error('not authenticated')

      const post = await models.Post.findByPk(input.postId);
      if (!post)
        throw new Error('not found')

      const voteValue = input.isPositive ? 1 : -1

      await post.update({ upvotes: post.upvotes + voteValue })

      const author = await post.getUser()
      const authorProfile = await author.getProfile()
      await authorProfile.update({ karma: authorProfile.karma + voteValue })
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
  upvoteComment: {
    type: commentType,
    description: 'Upvote a comment',
    args: {
      input: {
        type: GraphQLNonNull(upvoteCommentInputType)
      },
    },
    resolve: async (_, { input }, { user }) => {
      if (!user)
        throw new Error('not authenticated')

      const comment = await models.Comment.findByPk(input.commentId);
      if (!comment)
        throw new Error('not found')

      const voteValue = input.isPositive ? 1 : -1

      await comment.update({ upvotes: comment.upvotes + voteValue })

      const author = await comment.getUser() // TODO
      const authorProfile = await author.getProfile()
      await authorProfile.update({ karma: authorProfile.karma + voteValue })
      return comment;
    }
  }
}