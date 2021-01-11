const authMutations = require('./auth')
const userMutations = require('./user')
const postMutations = require('./post')

module.exports = {
  ...authMutations,
  ...userMutations,
  ...postMutations
}