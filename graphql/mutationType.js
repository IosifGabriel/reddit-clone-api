const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require('graphql')
const models = require('../models')
const postType = require('./types/postType')
const postInputType = require('./inputTypes/postInputType')
const config = require('../config/appConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const IsEmail = require('validator');
const userType = require('./types/userType');
const userProfileType = require('./types/userProfileType');

const passwordSchema = new passwordValidator()
    .is().min(8)
    .is().max(20)
    .has().letters()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

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
    signup: {
      type: userType,
      args: {
        username: {
          type: GraphQLNonNull(GraphQLString),
        },
        email: {
          type: GraphQLNonNull(GraphQLString),
        },
        password:{
          type:GraphQLNonNull(GraphQLString),
        },
        repassword: {
          type: GraphQLNonNull(GraphQLString),
        },
      },
      resolve: async (_, {username, email, password, repassword }) => {
       
        const user = await models.User.findOne({
          where: {
            email,
          }
        });

        if(user)
          return new Error("Email already in use")
        if(password !== repassword)
          return new Error("Passwords dont match")
        if(!passwordSchema.validate(password))
          return new Error("Think of a stronger password, 8-20chars, uppercase,lowercase, number,symbol")
        const hashedPassword = await bcrypt.hash(password, config.SALT_ROUNDS);
        const datenow= new Date().toDateString
        
        newuser = new models.User({username,hashedPassword,email,datenow,datenow});
        newprofile = new models.Profile({userid:newuser.id,avatar:"",age:0,postkarma:0,commentkarma:0});
        const res = await newuser.save();
        res = await newprofile.save();
        return newuser
      }
    },
    updateProfile: {
      type: userProfileType,
      args: {
        userId: {
          type: GraphQLNonNull(GraphQLInt)
        },
        avatar: {
          type: GraphQLString,
        },
        age: {
          type: GraphQLInt,
        },
      },
      resolve: async (_, {userId, avatar,age}) => {
        const profile = await models.Profile.findByPk(userId);
        if(avatar !== null)
          profile.avatar = avatar
        if(age !== null)
          profile.age = age
        profile.save()

        return profile;
      },
    },
    upvotePost: {
      type: userProfileType,
      args: {
        userId: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, {userId}) => {
        const profile = await models.Profile.findByPk(userId);
        const numb = Number(profile.postkarma) + 1
        profile.postkarma = numb 
        profile.save()
        return profile;
      },
    },
    upvoteComment: {
      type: userProfileType,
      args: {
        userId: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, {userId}) => {
        const profile = await models.Profile.findByPk(userId);
        profile.commentkarma = profile.commentkarma + 1
        profile.save()
        return profile;
      },
    },
    downvotePost: {
      type: userProfileType,
      args: {
        userId: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, {userId}) => {
        const profile = await models.Profile.findByPk(userId);
        profile.postkarma = profile.postKarma - 1
        profile.save()
        return profile;
      },
    },
    downvoteComment: {
      type: userProfileType,
      args: {
        userId: {
          type: GraphQLNonNull(GraphQLInt)
        },
      },
      resolve: async (_, {userId}) => {
        const profile = await models.Profile.findByPk(userId);
        profile.commentkarma = profile.commentkarma - 1
        profile.save()
        return profile;
      }
    }
  }
});

module.exports = mutationType
