const Q = require("q");
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require("uuid");

let db = new sqlite3.Database("./db/toddle.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('SQLite toddle database connected.');
});

const DBUtils = () => {

    //Saving a single entity
    const saveEntity = (table, col, values) => {
        const deferred = Q.defer();
        id = uuidv4();
        dbQuery = `INSERT INTO ${table} (${col},creationTime,lastUpdated) VALUES ('${id}',${values},${Date.now()},${Date.now()});`
        db.run(dbQuery, (err) => {
            if (err) {
                console.log(`Error in inserting ${values} in ${table}: ${err.message}`);
                deferred.reject()
            } else {
                console.log(`Data saved in table ${table}`);
                deferred.resolve();
            }
        });
        return deferred.promise;
    };


    //Fetching a single entity
    const getEntity = (table, query) => {
		const deferred = Q.defer();
		dbQuery = `SELECT * FROM ${table} WHERE ${query};`
        db.get(dbQuery, (err, rows) => {
            if (err) {
                console.log(`Error in finding ${query} in ${table}: ${err.message}`);
                deferred.reject()
            } else {
                if(rows !== undefined){
                    if(rows.length !== 0){
                        console.log(`User found in table ${table}`);
                    }
                }else{
                    console.log(`No User found in table ${table}`);
                }
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
    };
    
    //Fetching multiple entities
    const getAllEntities = (table, query) => {
		const deferred = Q.defer();
		dbQuery = `SELECT * FROM ${table} WHERE ${query};`
        db.all(dbQuery, (err, rows) => {
            if (err) {
                console.log(`Error in finding ${query} in ${table}: ${err.message}`);
                deferred.reject()
            } else {
                if(rows !== undefined){
                    if(rows.length !== 0){
                        console.log(`User found in table ${table}`);
                    }
                }else{
                    console.log(`No User found in table ${table}`);
                }
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
    };

    //Updating a single entity
    const updateEntity = (table, condition, query) => {
		const deferred = Q.defer();
        dbQuery = `UPDATE ${table} SET ${query},lastUpdated='${Date.now()}' WHERE ${condition};`
        db.run(dbQuery, (err, rows) => {
            if (err) {
                console.log(`Error in updating ${query} in ${table}: ${err.message}`);
                deferred.reject()
            } else {
                console.log(`Data updated in table ${table}`);
                deferred.resolve(rows);
            }
        });
        return deferred.promise;
    };

    return {
        saveEntity,
        getEntity,
        getAllEntities,
        updateEntity
    };

};

module.exports = DBUtils;
