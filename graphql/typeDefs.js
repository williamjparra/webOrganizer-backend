const { gql } = require('apollo-server')

module.exports = gql`
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type User{
        id: ID!
        email: String
        name: String
        lastName: String
        userName: String
        publicAddress: String
        posts: [ID]
        createdAt: String
        updatedAt: String
        status: Boolean
        profileImg: String
    }
    type Post{
        id: ID!
        public: Boolean!
        coverImage: String
        ownerId: ID!
        title: String
        slug: String!
        data: PostSchema
    }
    type PostSchema{
        title: String
        link: String
        description: DescriptionSchema
    }
    type DescriptionSchema{
        id: ID!
        rawHtml: String!
        content: String!
        htmlTagtype: String!
    }
    type Folder{
        id: ID!
        tile: String!
        description: String
        posts: [Post]
    }
    
    input UserInput{
        email: String
        name: String
        lastName: String
        userName: String
        publicAddress: String
        createdAt: String
        updatedAt: String
        status: Boolean
        posts: [ID]
    }
    type PostInput{
        public: Boolean!
        coverImage: File
        ownerId: ID!
        title: String!
        slug: String!
        data: PostSchema!
        profileImg: File
    }
    type PostSchemaInput{
        title: String
        link: String
        description: DescriptionSchema!
    }
    type DescriptionSchemaInput{
        id: ID!
        rawHtml: String!
        content: String!
        htmlTagtype: String!
    }
    type FolderInput{
        tile: String!
        description: String
        posts: [ID]
    }

    type Query {
        "Querys for users definitions"
        getUsers: [User]
        getUserById(_id: ID!): User
        getUserByUserName(userName: String!): User
        searchUsers(text: String!): [User]
        "Querys for Posts"
        getUserPosts(_id: ID!): [Post]
        getPostById(_id: ID!): Post
        getPostBySlug(slug: String!): Post
        searchPost(text: String!): [Post]
        "Querys for folders"
        getFolders(_id: ID!): [Folder]
        getFolder(_id: ID!): Folder
        searchFolder(text: String!); [Folder]
    }

    type Mutation {
        
    }
`