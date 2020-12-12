const { GraphQLSchema } = require('graphql')
const queryType = require('./queryType')

module.exports = new GraphQLSchema({
  query: queryType
})
