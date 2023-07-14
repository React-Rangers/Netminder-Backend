const { AuthenticationError } = require('apollo-server-express')
const { Profile } = require('../models')
const { signToken, login } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log('context -> ', context)

      if (context.user) {
        return Profile.findOne({ _id: context.user._id })
      }
      throw new AuthenticationError('You need to be logged in!')
    }
  },

  Mutation: {
    createProfile: async (parent, args) => {
      const profile = await Profile.create(args)
      const token = signToken(profile)
      console.log('token -->', token)
      console.log('profile -->', profile)
      return { token, profile }
    },

    addTask: async (parent, args, context) => {
      if (context.user) {
        console.log('Context is in use!!')

        const profile = await Profile.findOne({ _id: context.user._id })

        if (!profile) {
          throw new Error('Profile not found')
        }

        profile.tasks.push(args)
        await profile.save()

        return profile
      }
      throw new AuthenticationError('You need to be logged in!')
    },

    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email })

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!')
      }

      const correctPw = await profile.isCorrectPassword(password)

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!')
      }

      const token = signToken(profile)
      return { token, profile }
    }
  }
}

module.exports = resolvers
