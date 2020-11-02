const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");
const GraphQLSchema = require("graphql").GraphQLSchema;

const schema = require("./schema.js");

const users = [
    { name : "Mike", id: "1"},
    { name : "John", id: "2"}
]
const UserType = new GraphQLObjectType({
    name: "User",  fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

app = express();

app.use("/graphql",  graphqlHTTP({
    schema : schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log("server running on port 3000")
})