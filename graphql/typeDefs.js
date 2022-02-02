const { gql } = require('apollo-server')

module.exports = gql`
    type User{
        id: ID!,
        email: String,
        name: String,
        lastName: String,
        userName: String,
        publicAddress: String,
        posts: [Posts],
        createdAt: String,
        updatedAt: String
        status: Boolean
    }
    
`