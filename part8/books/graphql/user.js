const { gql } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SeCrEt';

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
    username: String!
    favouriteGenre: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    me: async (root, args, { currentUser }) => currentUser,
  },
  Mutation: {
    createUser: async (root, args) => {
      const newUser = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });

      try {
        await newUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return newUser;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, JWT_SECRET),
        username: user.username,
        favouriteGenre: user.favouriteGenre,
      };
    },
  },
};

module.exports = { typeDefs, resolvers };
