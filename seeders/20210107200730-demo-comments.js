'use strict';
const models = require('../models');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postsQuery = await models.Post.findAll();
    const comments = new Array(20).fill(0).map(comment => {
      const post = postsQuery[Math.floor(Math.random() * postsQuery.length)]
      return {
        postId: post.id,
        text: faker.lorem.paragraph(),
        upvotes: faker.random.number(1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
    await queryInterface.bulkInsert('Comments', comments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
