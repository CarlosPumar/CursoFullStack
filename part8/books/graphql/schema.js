const { gql } = require('apollo-server');

const { merge } = require('lodash');
const { typeDefs: Author, resolvers: authorResolvers } = require('./author.js');
const { typeDefs: Book, resolvers: bookResolvers } = require('./book.js');
const { typeDefs: User, resolvers: userResolvers } = require('./user.js');

const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [Query, Author, Book, User];
const resolvers = merge(authorResolvers, bookResolvers, userResolvers);

module.exports = { typeDefs, resolvers };
