const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const models = require('../models')
const postType = require('./types/postType')
const postInputType = require('./inputTypes/postInputType')
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: postType,
      description: 'Create a post',
      args: {
        userId: {
          type: GraphQLNonNull(GraphQLInt)
        },
        postInput: {
          type: GraphQLNonNull(postInputType)
        },
      },
      resolve: async (_, { userId, postInput }) => {
        const user = await models.User.findByPk(userId);
        if (!user) {
          return null;
        }

        const post = await user.createPost(postInput);
        return post;
      },
    },
    login: {
      type: GraphQLString,
      args: {
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
        password: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (parent, { email, password }) => {
        const user = await models.User.findOne({
          where: {
            email,
          }
        });

        if(user) {
          const isValid = await bcrypt.compare(password, user.password);
          if(isValid) {
            // Pasam `userId` in token pentru a-l folosi la validarea tokenului (authenticationMiddleware)
            const token = jwt.sign({userId: user.id}, config.JWTSECRET);
            return token;
          }
        }

        return null;
      },
    },
  },
});

module.exports = mutationType
