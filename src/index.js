const { ApolloServer, gql } = require('apollo-server');
const { join } = require('path');
const { loadTypedefsSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const fs = require('fs');

const aeropuertos = JSON.parse(fs.readFileSync(join(__dirname, './dataset.json'), 'utf-8'));

console.log(aeropuertos);

const sources = loadTypedefsSync(join(__dirname, './typeDefs.gql'), {
    loaders: [
        new GraphQLFileLoader()
    ]
});

const typeDefs = sources.map(source => source.document)

const resolvers = {
    Query: {
        listarAeropuertos: () => {return aeropuertos},
        obtenerAeropuertoPorId: (obj, args) => {
            const response = aeropuertos.filter(aeropuerto => {
                aeropuerto.id === args.id;
            })
            return response[0];
        },
        obtenerAeropuerto: (obj, { id, localizacion }) => {
            const response = aeropuertos.filter(aeropuerto => {
                if (aeropuerto.localizacion === localizacion || aeropuerto.id === id) {
                    return aeropuerto;
                }
            });
            return response[0];
        }
    }
};


const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
    console.log(`Servidor iniciado en ${url}`);
});

console.log(`Listening in ${process.env.PORT}`);