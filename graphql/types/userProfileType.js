const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql')

const userProfileType = new GraphQLObjectType({
  name: 'UserProfile',
  fields: {
    id: { type: GraphQLInt },
    avatar: { type: GraphQLString },
    age: { type: GraphQLInt },
    postkarma: { type: GraphQLInt },
    commentkarma: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  }
})

module.exports = userProfileType