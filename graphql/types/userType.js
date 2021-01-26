const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql')
const profileType = require('./userProfileType')

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: {
      type: profileType,
      resolve: async (parent) => {
        return await parent.getProfile()
      }
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})
