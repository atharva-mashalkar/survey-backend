CREATE TABLE "sqlb_temp_table_10" (
	"userId"	TEXT NOT NULL UNIQUE,
	"username"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"lastUpdated"	INTEGER NOT NULL,
	"creationTime"	INTEGER NOT NULL,
	PRIMARY KEY("userId")
);