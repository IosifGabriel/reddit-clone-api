'use strict'
const models = require('../models')
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersQuery = await models.User.findAll()
    const usersProfile = usersQuery.map(user => ({
      userId: user.id,
      avatar: faker.internet.avatar(),
      karma: faker.random.number(100),
      age: faker.random.number(100),
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('Profiles', usersProfile, {})
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Profiles', null, {})
  }
};