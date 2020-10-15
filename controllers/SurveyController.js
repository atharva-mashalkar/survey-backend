const JwtService = require('../services/auth.service');
const DBUtils = require('../utils/DBUtils')();

//Creating a survey by taking in questions
exports.createSurvey = async (token, questions) => {
    if (token === undefined || questions === undefined) {
        return { success: false, status: 400, error: "Bad Request" }
    }
    try {
        //Checking JWT Auth
        let user = JwtService.verify(token)
        
        //Stringfying
        strQuestions = JSON.stringify(questions)

        //Saving survey to DB
        await DBUtils.saveEntity(
            "Survey",
            "surveyId,questions,resultIds",
            `'${strQuestions}','${JSON.stringify([])}'`
        )
    } catch (error) {
        console.error("Error in creating survey: ", error);
        return { error, success: false, status: 500 }
    }
    return { error: null, success: true, status: 200 }
}

//Sending survey questions by fetching them through surveyID
exports.sendingSurveyQuestions = async (token, surveyId) => {
    if (token === undefined || surveyId === undefined) {
        return { success: false, status: 400, error: "Bad Request" }
    }
    var survey;
    try {
        //Checkign JWT Auth
        let user = JwtService.verify(token);

        //Fetching survey using surveyID
        survey = await DBUtils.getEntity(
            "Survey",
            `surveyId='${surveyId}'`
        );
    } catch (error) {
        console.error("Error in creating survey: ", error);
        return { error, success: false, status: 500 }
    }
    return { id: survey.surveyId, questions: JSON.parse(survey.questions), error: null, success: true, status: 200 }
}

//Saving survey response
exports.storingSurveyAnswers = async (token, answers, surveyId) => {
    if (token === undefined || answers === undefined) {
        return { success: false, status: 400, error: "Bad Request" }
    }
    try {
        //Checking JWT Auth
        let user = JwtService.verify(token)

        //Stringifying answers
        strAnswers = JSON.stringify(answers)

        //Fetching survey using surveyID
        survey = await DBUtils.getEntity(
            "Survey",
            `surveyId='${surveyId}'`
        );
        let resultArr = JSON.parse(survey.resultIds);

        //Saving the replies to another table
        await DBUtils.saveEntity(
            "SurveyReplies",
            "replyId,answers,surveyId",
            `'${strAnswers}','${surveyId}'`
        )

        //Fetching the stored replies to get the reply ID
        reply = await DBUtils.getEntity(
            "SurveyReplies",
            `surveyId='${surveyId}'`
        );
        resultArr  = [reply.replyId,...resultArr];

        //Updating the survey table for storing reply ID
        DBUtils.updateEntity(
            "Survey",
            `surveyId='${surveyId}'`,
            `resultIds='${JSON.stringify(resultArr)}'`
        )
    } catch (error) {
        console.error("Error in creating survey: ", error);
        return { error, success: false, status: 500 }
    }
    return { error: null, success: true, status: 200 }
}

//Declaring the survey results
exports.getResults = async (token,surveyId) => {
    if (token === undefined || surveyId === undefined) {
        return { success: false, status: 400, error: "Bad Request" }
    }

    var groupedAnswers = [];
    try {
        //Checking JWT Auth
        let user = JwtService.verify(token)

        //Fetching all the replies for particular Survey ID
        let replies = await DBUtils.getAllEntities(
            "SurveyReplies",
            `surveyId='${surveyId}'`
        );

        //Finding the number of questions in the survey
        let numberOfAnswers = JSON.parse(replies[0].answers).length;
       var answers = [];

       //Taking out all the replies from all the surveys of all the questions
       replies.forEach(reply => {
           answers = [...answers,...JSON.parse(reply.answers)]
       })

       //Finding number of yes and no for each question in the survey
       for(var i=1;i<=numberOfAnswers;i++){
           var yes = 0;
           var no = 0;
           answers.forEach(answer => {
            if(answer.questionNumber === i){
                if(answer.answer === "yes" ){
                    yes = yes+1;
                }else{
                    no = no+1;
                }
            }
           })
           groupedAnswers = [...groupedAnswers,{
               questionNumber:i,
               yes,
               no 
           }]
       }
    } catch (error) {
        console.error("Error in creating survey: ", error);
        return { error, success: false, status: 500 }
    }
    return { replies:groupedAnswers, error: null, success: true, status: 200 }
}

