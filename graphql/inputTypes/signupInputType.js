const { GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql')

module.exports = new GraphQLInputObjectType({
  name: 'SignupInputType',
  fields: {
      username: {
        type: GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLNonNull(GraphQLString),
      },
      password: {
        type: GraphQLNonNull(GraphQLString),
      },
      repassword: {
        type: GraphQLNonNull(GraphQLString),
        },
    },
})
