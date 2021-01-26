const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const models = require('../../models')
const config = require('../../config/appConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passwordValidator = require('password-validator');

const IsEmail = require('validator');
const userType = require('../types/userType');
const signupInputType = require('../inputTypes/signupInputType');

const passwordSchema = new passwordValidator()
  .is().min(8)
  .is().max(20)
  .has().letters()
  .has().digits()
  .has().symbols()
  .has().not().spaces();

module.exports = {
  login: {
    type: GraphQLString,
    description:"Login a user",
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

      if (user) {
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
          // Pasam `userId` in token pentru a-l folosi la validarea tokenului (authenticationMiddleware)
          const token = jwt.sign({ userId: user.id }, config.JWTSECRET);
          return token;
        }
      }

      return null;
    },
  },
  signup: {
    type: GraphQLString,
    description: "Signup account",
    args: {
      input: {
        type: GraphQLNonNull(signupInputType)
      }
    },
    resolve: async (_, {input}) => {
      const user = await models.User.findOne({
        where: {
          email:input.email,
        }
      });

      if (user)
        return new Error("Email already in use")
      if (input.password !== input.repassword)
        return new Error("Passwords dont match")
      if (!passwordSchema.validate(input.password))
        return new Error("Think of a stronger password, 8-20chars, uppercase,lowercase, number,symbol")
      const hashedPassword = await bcrypt.hash(input.password, config.SALT_ROUNDS);

      newuser = new models.User({ username:input.username, password:hashedPassword, email:input.email });
      res = await newuser.save();

      newprofile = new models.Profile({ userId: res.id, avatar: "", age: 0, karma: 0 });
      await newprofile.save();

      const token = jwt.sign({ userId: res.id }, config.JWTSECRET);

      return token;
    }
  }
}