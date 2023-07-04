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
        dateCreated: Date
        reminderDate: Date
        contactFirstName: String
        contactLastName: String
        contactEmail: String
        contactPhone: String
        taskDescription: String
    }

    type Query {
        profiles: [Profile]!
        profile(profileId: ID!): Profile
        # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
        me: Profile
    }
`

module.exports = typeDefs;