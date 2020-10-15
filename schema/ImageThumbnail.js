const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
} = graphql;

//Object type for image
const ImageType = new GraphQLObjectType({
    name: 'image',
    fields: () => ({
        url: { type: GraphQLString },
        thumbnail: { type: GraphQLString },
        error: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        status: { type: GraphQLInt }
    })
})

module.exports = {
    ImageType
}