const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql')

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: { type: GraphQLInt },
    text: { type: GraphQLString },
    upvotes: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  }
})

module.exports = commentType