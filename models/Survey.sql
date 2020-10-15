CREATE TABLE "Survey" (
	"surveyId"	TEXT NOT NULL UNIQUE,
	"questions"	TEXT NOT NULL,
	"resultIds"	TEXT,
	"creationTime"	INTEGER NOT NULL,
	"lastUpdated"	INTEGER NOT NULL,
	PRIMARY KEY("surveyId")
);