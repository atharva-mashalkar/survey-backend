const graphql = require('graphql');
const SurveyController = require('../controllers/SurveyController');
const {
    QuestionInputType,
    SurveyType 
} = require("./Survey");
const {SurveyResultType,
    AnswerInputType
} = require("./SurveyResults");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
} = graphql;

//Setting up root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        gettingSurveyQuestions: {
            type: SurveyType,
            args: {
                token: { type: GraphQLString },
                id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return SurveyController.sendingSurveyQuestions(args.token, args.id)
            }
        },
        gettingSurveyResults: {
            type: SurveyResultType,
            args: {
                token: { type: GraphQLString },
                surveyId: { type: GraphQLString }
            },
            resolve(parent, args) {
                return SurveyController.getResults(args.token, args.surveyId)
            }
        }
    }
})

//Setting up mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addSurvey: {
            type: SurveyType,
            args: {
                token: { type: GraphQLString },
                questions: { type: GraphQLList(QuestionInputType) },
            },
            resolve(parent, args) {
                return SurveyController.createSurvey(args.token, args.questions)
            }
        },
        addSurveyAnswers: {
            type: SurveyType,
            args: {
                token: { type: GraphQLString },
                answers: { type: GraphQLList(AnswerInputType) },
                surveyId: { type: GraphQLString }
            },
            resolve(parent, args) {
                return SurveyController.storingSurveyAnswers(args.token, args.answers, args.surveyId)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})