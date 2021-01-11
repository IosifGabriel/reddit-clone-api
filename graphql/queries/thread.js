const { GraphQLList, GraphQLString } = require('graphql')
const models = require('../../models')
const { Op } = require('sequelize')
const threadType = require('../types/threadType')

module.exports = {
  threads: {
    type: GraphQLList(threadType),
    description: 'Get a list of all threads',
    args: {
      name: {
        type: GraphQLString
      },
    },
    resolve: async (_, { name = '' }) => {
      const threads = await models.Thread.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        }
      })
      return threads
    }
  }
}