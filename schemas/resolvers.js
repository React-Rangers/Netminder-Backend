const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find().exec();
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     return Profile.findOne({ _id: context.user._id });
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // }
  },

  Mutation: {
    createProfile: async (parent, args) => {
      const profile = await Profile.create(args);
      return profile;
    },

    //createTask:
  }
};


module.exports = resolvers;
