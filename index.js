const config = require('./config')
const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const db = require('./database')
const cookies = require('cookie-parser')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const port = config?.server?.port || 3500
const app = express();

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: (data) => (data),
        cors: {
            origin: '*',
        }
    })

    await server.start()
    
    db()

    app.use(cookies());
    
    server.applyMiddleware({ app })
    
    app.listen(port, () => {
        console.log(`server running at ${port}`)
    })
} 

startServer()
