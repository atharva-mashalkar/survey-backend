const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLInputObjectType
} = graphql;

//Object type for quering questions
const AnswerInputType = new GraphQLInputObjectType({
    name: 'inputAnswer',
    fields: () => ({
        questionNumber: { type: GraphQLInt },
        answer: { type: GraphQLString }
    })
})

//Object type for sending results
const ResultType = new GraphQLObjectType({
    name: 'result',
    fields: () => ({
        questionNumber: { type: GraphQLInt },
        yes: { type: GraphQLInt },
        no: { type: GraphQLInt }
    })
});

//Object type for survey results
const SurveyResultType = new GraphQLObjectType({
    name: 'surveyResult',
    fields: () => ({
        replies: { type: new GraphQLList(ResultType) },
        error: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        status: { type: GraphQLInt }
    })
})

module.exports = {
    SurveyResultType,
    AnswerInputType
}