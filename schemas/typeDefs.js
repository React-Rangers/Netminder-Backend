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
    }

    type Query {
        profiles: [Profile]
        profile(profileId: ID!): Profile
        me: Profile
    }

    type Mutation {
        createProfile(username: String!, email: String!, password: String!): Profile
        createTask(taskDescription: String!, contactPhone: String, contactEmail: String, contactFirstName: String!, contactLastName: String!, reminderDate: String!): Tasks
    }
`

module.exports = typeDefs;
