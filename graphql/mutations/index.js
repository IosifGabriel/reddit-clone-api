const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const models = require('../../models')

const userProfileType = require('../types/userProfileType');

const authMutations = require('./auth')
const userMutations = require('./user')
const postMutations = require('./post')

module.exports = {
  ...authMutations,
  ...userMutations,
  ...postMutations
}