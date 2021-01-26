'use strict'
const faker = require('faker')
const config = require('../config/appConfig')
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('AdminReddit', config.SALT_ROUNDS)

    const mockUsers = new Array(10).fill().map(() => ({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('Users', mockUsers, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}