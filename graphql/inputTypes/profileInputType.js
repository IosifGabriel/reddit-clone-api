const { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'ProfileInput',
  fields: {
    avatar: { type: GraphQLString },
    age: { type: GraphQLInt },
  }
})
