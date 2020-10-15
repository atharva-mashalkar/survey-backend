CREATE TABLE "SurveyReplies" (
	"replyId"	TEXT NOT NULL UNIQUE,
	"answers"	TEXT NOT NULL,
	"surveyId"	TEXT NOT NULL,
	"lastUpdated"	INTEGER NOT NULL,
	"creationTime"	INTEGER NOT NULL,
	PRIMARY KEY("replyId")
);