'use strict';
const models = require('../models');
const faker = require('faker');
const { random } = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersQuery = await models.User.findAll();
    const usersPosts = new Array(100).fill(0).map(post => {
      const user = usersQuery[Math.floor(Math.random() * usersQuery.length)]
      return {
        userId: user.id,
        media: faker.image.imageUrl(),
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
        upvotes: faker.random.number(9999),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
    await queryInterface.bulkInsert('Posts', usersPosts, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};