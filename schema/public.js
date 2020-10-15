const graphql = require('graphql');
const UserController = require('../controllers/UserController');
const ThumbnailController = require('../controllers/ThumbnailController');
const { UserType } = require("./User");
const { ImageType } = require("./ImageThumbnail");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
} = graphql;

//Setting up root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        minimizeImage: {
            type: ImageType,
            args: {
                url: { type: GraphQLString }
            },
            resolve(parent, args) {
                return ThumbnailController.createThumbnail(args.url)
            }
        }
    }
})

//Setting up mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args) {
                return UserController.authUser(args.username, args.password)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})