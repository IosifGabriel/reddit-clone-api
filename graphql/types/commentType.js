const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql')

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLInt },
    text: { type: GraphQLString },
    upvotes: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    comments: {
      type: GraphQLList(commentType),
      resolve: async (parent) => {
        return await parent.getComments()
      }
    }
  })
})

module.exports = commentType