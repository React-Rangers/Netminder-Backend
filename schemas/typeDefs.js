const { gql } = require('apollo-server-express');

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
        profiles: [Profile]
        profile(profileId: ID!): Profile
        me: Profile
        login(email: String!, password: String!): AuthResult
    }

    type AuthResult {
        token: String
    }

    type Mutation {
        createProfile(username: String!, email: String!, password: String!): Profile
        createTask(taskDescription: String!, contactPhone: String, contactEmail: String, contactFirstName: String!, contactLastName: String!, reminderDate: String!): Tasks
        login(email: String!, password: String!): AuthResult
    }

    type AuthResult {
        token: String
    }
`

module.exports = typeDefs;
