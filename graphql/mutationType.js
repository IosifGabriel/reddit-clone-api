const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const models = require('../models')
const postType = require('./types/postType')
const postInputType = require('./inputTypes/postInputType')

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
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
  },
});

module.exports = mutationType
