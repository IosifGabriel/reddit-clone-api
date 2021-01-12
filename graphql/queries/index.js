const userQueries = require('./user')
const accountQueries = require('./account')
const postQueries = require('./post')
const threadQueries = require('./thread')

module.exports = {
  ...userQueries,
  ...postQueries,
  ...threadQueries,
  ...accountQueries
}