const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Profile {
        _id: ID!
        username: String
        email: String
        password: String
        tasks: [Tasks]
    }

    type Tasks {
        _id: ID!
        dateCreated: String
        reminderDate: String
        contactFirstName: String
        contactLastName: String
        contactEmail: String
        contactPhone: String
        taskDescription: String
        type: String
    }

    type Query {
        me: Profile
    }

    type AuthResult {
        token: ID!
        profile: Profile
    }

    type Mutation {
        createProfile(username: String!, email: String!, password: String!): Profile
        addTask(taskDescription: String!, contactPhone: String, contactEmail: String, contactFirstName: String!, contactLastName: String!, reminderDate: String!): Profile
        login(email: String!, password: String!): AuthResult
    }
`

module.exports = typeDefs
