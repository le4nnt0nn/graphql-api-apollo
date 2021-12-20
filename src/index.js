const { ApolloServer, gql } = require('apollo-server');
const { join } = require('path');
const { loadTypedefsSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');

const sources = loadTypedefsSync(join(__dirname, './typeDefs.gql'), {
    loaders: [
        new GraphQLFileLoader()
    ]
});

const typeDefs = sources.map(source => source.document)

const resolvers = {
    Query: {
        
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({port: process.env.PORT}).then(({url}) => {
    console.log(`Servidor iniciado en ${url}`);
});

console.log(`Listening in ${process.env.PORT}`);