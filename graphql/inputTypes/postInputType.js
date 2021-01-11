const { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    threadId: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    body: { type: GraphQLNonNull(GraphQLString) },
    media: { type: GraphQLString }
  }
})
