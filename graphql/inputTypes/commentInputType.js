const { GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLInputObjectType } = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: {
    postId: { type: GraphQLNonNull(GraphQLInt) },
    parentId: { type: GraphQLInt },
    text: { type: GraphQLNonNull(GraphQLString) },
  }
})
