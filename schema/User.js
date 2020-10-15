const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
} = graphql;

//Object type for user
const UserType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        token: { type: GraphQLString },
        error: {type: GraphQLString},
        success: {type: GraphQLBoolean},
        status: {type: GraphQLInt}
    })
});

module.exports = {
    UserType
}