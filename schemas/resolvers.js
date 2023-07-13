const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // profiles: async () => {
    //   return Profile.find().exec();
    // },
    // profile: async (parent, { profileId }) => {
    //   return Profile.findOne({ _id: profileId });
    // },
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.profile._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    createProfile: async (parent, args) => {
      const profile = await Profile.create(args);
      const token = signToken(profile);
      console.log('token -->', token)
      console.log('profile -->', profile)
      return { token, profile };
    },

    // addTask: async (parent, args, context) => {
    //   if (context.profile) {
    //     const {
    //       taskDescription,
    //       contactPhone,
    //       contactEmail,
    //       contactFirstName,
    //       contactLastName,
    //       reminderDate
    //     } = args;

    //     const profile = await Profile.findOne({ _id: context.profile._id });

    //     if (!profile) {
    //       throw new Error('Profile not found');
    //     }

    //     const newTask = {
    //       taskDescription,
    //       contactPhone,
    //       contactEmail,
    //       contactFirstName,
    //       contactLastName,
    //       reminderDate
    //     };

    //     profile.tasks.push(newTask);
    //     await profile.save();

    //     return profile;
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    addTask: async (parent, args, context) => {
      if (context.profile) {
        await Profile.findOneAndUpdate(
          { _id: context.profile._id },
          { $addToSet: { tasks: args } },
          {
            new: true
          }
        );

        return args;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    }
  }
};

module.exports = resolvers;
