const { GraphQLInputObjectType, GraphQLBoolean, GraphQLInt, GraphQLNonNull } = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'UpvotePostInput',
  fields: {
    postId: { type: GraphQLNonNull(GraphQLInt) },
    isPositive: { type: GraphQLNonNull(GraphQLBoolean) },
  }
})
