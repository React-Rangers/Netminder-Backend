const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        profiles: async () => {
            return Profile.find();
        }
    },

    Query: {
        profile: async (parent, { profileId }) => {
            return Profile.findOne({ _id: profileId });
        }
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return Profile.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
}

module.exports = resolvers;