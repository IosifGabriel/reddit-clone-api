const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql')
const userType = require('./userType')

const commentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLInt },
    text: { type: GraphQLString },
    upvotes: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    author: {
      type: userType,
      resolve: async (parent) => {
        return await parent.getUser()
      }
    },
    comments: {
      type: GraphQLList(commentType),
      resolve: async (parent) => {
        return await parent.getComments()
      }
    }
  })
})

module.exports = commentType