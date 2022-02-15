const config = require('./config')
const { ApolloServer } = require('apollo-server')
const db = require('./database')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const port = config?.server?.port || 3500

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: (data) => ({ data }),
    cors: {
        origin: '*',
    }
})

db()

apollo.listen({ port })
    .then(res => {
        console.log(`server running at ${port}`)
    })
