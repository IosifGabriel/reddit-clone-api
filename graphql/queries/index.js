const userQueries = require('./user')
const userProfileQueries = require('./userProfile')
const postQueries = require('./post')
const threadQueries = require('./thread')

module.exports = {
  ...userQueries,
  ...postQueries,
  ...threadQueries,
  ...userProfileQueries
}