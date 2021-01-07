'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const mockThreads = new Array(4).fill().map(() => ({
      name: `r/${faker.lorem.word()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Threads', mockThreads, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Threads', null, {});
  }
};
