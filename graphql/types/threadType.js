const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql')
const postType = require('./postType')

module.exports = new GraphQLObjectType({
  name: 'Thread',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    posts: {
      type: GraphQLList(postType),
      resolve: async (parent) => {
        return await parent.getPosts();
      }
    }
  })
})
