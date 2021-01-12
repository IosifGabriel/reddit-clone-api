const { GraphQLInputObjectType, GraphQLBoolean, GraphQLInt, GraphQLNonNull } = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'UpvoteCommentInput',
  fields: {
    commentId: { type: GraphQLNonNull(GraphQLInt) },
    isPositive: { type: GraphQLNonNull(GraphQLBoolean) },
  }
})
