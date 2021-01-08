'use strict';
const models = require('../models');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersQuery = await models.User.findAll();
    const postsQuery = await models.Post.findAll();
    let comments = new Array(10).fill(0).map(comment => {
      const user = usersQuery[Math.floor(Math.random() * usersQuery.length)]
      const post = postsQuery[Math.floor(Math.random() * postsQuery.length)]
      return {
        userId: user.id,
        postId: post.id,
        text: faker.lorem.paragraph(),
        upvotes: faker.random.number(1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });
    await queryInterface.bulkInsert('Comments', comments, {});

    for (let i = 0; i < 3; i++) {
      const commentsQuery = await models.Comment.findAll();
      const comments = new Array(10).fill(0).map(comment => {
        const user = usersQuery[Math.floor(Math.random() * usersQuery.length)]
        const parent = commentsQuery[Math.floor(Math.random() * commentsQuery.length)]
        return {
          userId: user.id,
          postId: parent.postId,
          parentId: parent.id,
          text: faker.lorem.paragraph(),
          upvotes: faker.random.number(1000),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      });
      await queryInterface.bulkInsert('Comments', comments, {});
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
