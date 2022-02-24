const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, { username }) => {
      const params = username ? { username: username } : {};
      return User.findOne(params);
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return  { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (_, { username, book }) => {
      console.log(book)
      try {
      const updatedUser = await User.findOneAndUpdate(
        { username: username },
        { $addToSet: { savedBooks: book } },
        { new: true, runValidators: true }
      )
      return updatedUser
    } catch (err) {
        console.log(err)
        throw new AuthenticationError('Error Saving Book');
      }
    },
    deleteBook: async (_, { user, bookId }) => {
      try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      )
      return updatedUser;
      } catch (err) {
        console.log(err)
        throw new AuthenticationError("Error Deleting Book")
      }
    },

    }
    

  };

module.exports = resolvers;
