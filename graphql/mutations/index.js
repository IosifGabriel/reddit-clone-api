const authMutations = require('./auth')
const accountMutations = require('./account')
const postMutations = require('./post')

module.exports = {
  ...authMutations,
  ...accountMutations,
  ...postMutations
}