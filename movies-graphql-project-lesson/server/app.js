const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(cors())

CONNECTION_URL = "mongodb+srv://sefa:test123123@cluster0.sfv3f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL)
mongoose.connection.once('open', () => {
   console.log("Connection to database has been established successfully");
})

app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
}));

app.listen(5000, () => {
   console.log('Server running on port 5000');
})