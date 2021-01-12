const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'UserProfile',
  fields: {
    id: { type: GraphQLInt },
    avatar: { type: GraphQLString },
    age: { type: GraphQLInt },
    karma: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  }
})
