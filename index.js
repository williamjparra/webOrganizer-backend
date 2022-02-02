const { ApolloServer } = require('apollo-server')
const db = require('./database')
const { server } = require('./config')

const apollo = new ApolloServer({
    context: (data) => ({ data })
})

db()

apollo.listen({ port: server.port })
    .then(res => {
        console.log(`server running at ${res.url}`)
    })