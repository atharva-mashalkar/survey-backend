const express = require('express');
const { graphqlHTTP } = require('express-graphql');

//Requiring graphQL schema
const publicSchema = require('./schema/public');
const privateSchema = require('./schema/private');

//Requiring confiq variables
const config = require('./config');

//Running express
const app = express();

//Setting up routes with graphiql as middleware
app.use('/public', graphqlHTTP({
    schema:publicSchema,
    graphiql: true
}));
app.use('/private', graphqlHTTP({
    schema:privateSchema,
    graphiql: true
}));

//Starting the server and listening to PORT 9000
app.listen(config.port, () => {
    console.error(`Listening to PORT ${config.port}.`);
	return;
});

