'use strict';
const models = require('../models');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersQuery = await models.User.findAll();
    const threadsQuery = await models.Thread.findAll();
    const usersPosts = new Array(15).fill(0).map(post => {
      const user = usersQuery[Math.floor(Math.random() * usersQuery.length)]
      const thread = threadsQuery[Math.floor(Math.random() * threadsQuery.length)]
      return {
        userId: user.id,
        threadId: thread.id,
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