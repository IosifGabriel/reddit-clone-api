const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql')
const profileType = require('./userProfileType');
const models = require('../../models')

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: {
      type: profileType,
      resolve: async (parent) => {
        return await parent.getProfile();
      }
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  })
})

module.exports = userType
