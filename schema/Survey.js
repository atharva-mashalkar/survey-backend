const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLInputObjectType
} = graphql;

//Object type for sending results
const AnswerType = new GraphQLObjectType({
    name: 'answer',
    fields: () => ({
        questionNumber: { type: GraphQLInt },
        yes: { type: GraphQLInt },
        no: { type: GraphQLInt }
    })
})

//Object type for sending questions from DB
const QuestionType = new GraphQLObjectType({
    name: 'question',
    fields: () => ({
        questionNumber : {type: GraphQLInt},
        question: {type: GraphQLString}
    })
})

//Object type for quering questions while creating survey
const QuestionInputType = new GraphQLInputObjectType({
    name: 'inputQuestion',
    fields: () => ({
        questionNumber : {type: GraphQLInt},
        question: {type: GraphQLString}
    })
})

//Object type for survey
const SurveyType = new GraphQLObjectType({
    name: 'survey',
    fields: () => ({
        surveyId: { type: GraphQLString },
        questions: { type: new GraphQLList(QuestionType) },
        answers: { type: new GraphQLList(AnswerType) },
        token: { type: GraphQLString },
        error: {type: GraphQLString},
        success: {type: GraphQLBoolean},
        status: {type: GraphQLInt},
    })
});

module.exports = {
    QuestionInputType,
    SurveyType,
}