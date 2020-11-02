const graphql = require("graphql");
const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLBoolean,
        GraphQLFloat,
        GraphQLNonNull,
        GraphQLList
} = graphql;

const users = [
    { name : "Chimwemwe", id: "1"},
    { name : "Yohane", id: "2"}
];

const items = [
    {
        id: "1111",
        text: "Mkaka",
        qty: "5",
        completed: false,
        userId: "1"
    },
    {
        id: "2222",
        text: "Mazira",
        qty: "18",
        completed: true,
        userId: "1"
    },
    {
        id: "3333",
        text: "Nkhwani",
        qty: "1",
        completed: false,
        userId: "2"
    }
];

const UserType = new GraphQLObjectType({
    name: "User",  fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString }
    })
});

const ItemType = new GraphQLObjectType({
    name: "Item",  fields: () => ({
        id: { type: GraphQLID },
        text: {type: GraphQLString },
        qty: { type: GraphQLFloat },
        completed: { type: GraphQLBoolean},
        user: {
            type: UserType, resolve(parent, args) {
                return users.find(user => user.id === parent.userId);            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addItem:{
        type: ItemType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID)},
            text: { type: new GraphQLNonNull(GraphQLString)},
            qty: { type: new GraphQLNonNull(GraphQLFloat)},
            completed: { type: new GraphQLNonNull(GraphQLBoolean)},
            userId: { type: new GraphQLNonNull(GraphQLID)},
         },

         async resolve(parent, args) {
             const arrLength = items.push(args);
             return items[arrLength-1];
         }
        }
    }
});                              

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        items: {
            type: new GraphQLList(ItemType),
            args: { userId: {
                type: GraphQLID
            }},
            resolve(parent, args){
                return items.filter(items => items.userId === args.userId);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});