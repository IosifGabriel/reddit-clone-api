const userType = require('../types/userType')

module.exports = {
  me: {
    type: userType,
    description: 'Get logged user',
    resolve: async (_, __, { user }) => {
      return user
    }
  }
}