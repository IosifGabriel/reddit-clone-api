const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');
const userType = require('./userType');

const postType = new GraphQLObjectType({
    name: 'Post',
    fields: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        media: { type: GraphQLString },
        upvotes: { type: GraphQLInt },
        author: {
            type: userType,
            resolve: async (parent) => {
                return await parent.getUser();
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }
});

module.exports = postType;