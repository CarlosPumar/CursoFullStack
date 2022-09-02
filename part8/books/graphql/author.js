const { gql } = require('apollo-server-core');
const Author = require('../models/Author');
const Book = require('../models/Book');
const { UserInputError, AuthenticationError } = require('apollo-server');

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }

  extend type Mutation {
    editAuthor(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Author: {
    bookCount: async (root) => Book.find({ author: root.name }).length,
  },
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      author.born = args.born;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },
  },
};

module.exports = { typeDefs, resolvers };
