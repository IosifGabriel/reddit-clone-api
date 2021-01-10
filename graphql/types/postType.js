const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const userType = require('./userType');
const commentType = require('./commentType');
const models = require('../../models')

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    media: { type: GraphQLString },
    upvotes: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    author: {
      type: userType,
      resolve: async (parent) => {
        return await parent.getUser();
      }
    },
    comments: {
      type: GraphQLList(commentType),
      resolve: async (parent) => {
        const post = await models.Post.findByPk(parent.id, {
          include: {
            model: models.Comment,
            where: {
              parentId: null
            }
          }
        })
        if (post) {
          return post.Comments
        }
        return []
      }
    }
  }
});

module.exports = postType;