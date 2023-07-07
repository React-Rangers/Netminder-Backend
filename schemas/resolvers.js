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

    //createTask
    createTask: async (parent, args, context) => {
      if (context.user) {
        const { taskDescription, contactPhone, contactEmail, contactFirstName, contactLastName, reminderDate } = args;

        const profile = await Profile.findOne({ _id: context.user._id });

        if (!profile) {
          throw new Error('Profile not found');
        }

        const newTask = {
          taskDescription,
          contactPhone,
          contactEmail,
          contactFirstName,
          contactLastName,
          reminderDate
        };

        profile.tasks.push(newTask);
        await profile.save();

        return profile;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;

