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
        posts: [Post]
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

    input PostInput{
        public: Boolean!
        coverImage: FileInput
        ownerId: ID!
        title: String!
        slug: String!
        data: PostSchemaInput!
    }

    input FileInput {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    input PostSchemaInput{
        title: String
        link: String
        description: DescriptionSchemaInput!
    }

    input DescriptionSchemaInput{
        id: ID!
        rawHtml: String!
        content: String!
        htmlTagtype: String!
    }
    input FolderInput{
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
        searchFolder(text: String!): [Folder]
    }

    type Mutation {
        "UsersMutations"
        login(publicAddress: String!): User
        createUser(input: UserInput): User
        updateUserData(_id: ID!, input: UserInput): User
        deleteUser(_id: ID!): User
        "post Mutations"
        createPosts(input: PostInput): Post
        updatePosts(_id: ID!, input: PostInput): Post
        deltePosts(_id: ID!): Post
        "folder's mutation"
        createFolder(input: FolderInput): Folder
        updateFolder(_id: ID!, input: FolderInput): Folder,
        deleteFolder(_id: ID!): Folder
    }
`