const { GraphQLList } = require('graphql')
const models = require('../../models')
const threadType = require('../types/threadType')

module.exports = {
  threads: {
    type: GraphQLList(threadType),
    description: 'Get a list of all threads',
    resolve: async (_) => {
      const threads = await models.Thread.findAll()
      return threads
    }
  }
}