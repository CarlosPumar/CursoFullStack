const { gql } = require('apollo-server');
const Book = require('../models/Book');
const Author = require('../models/Author');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  extend type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    filterBooksByGenre(genre: String): [Book!]!
    allGenres: [String]!
  }

  extend type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const authors = await Author.find({ name: args.author });
        return Book.find({
          author: { $in: authors },
          genres: { $in: args.genre },
        }).populate('author');
      }

      if (args.author) {
        const authors = await Author.find({ name: args.author });
        return Book.find({ author: { $in: authors } }).populate('author');
      }

      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author');
      }

      return Book.find({}).populate('author');
    },
    filterBooksByGenre: async (root, args) => {
      let books;

      if (args.genre) {
        books = await Book.find({ genres: { $in: args.genre } }).populate(
          'author',
        );
      }

      if (!args.genre || books.length === 0) {
        books = await Book.find({}).populate('author');
      }

      return books;
    },
    allGenres: async () => {
      const books = await Book.find({});
      const genreDuplicates = books.reduce((previousValue, currentValue) => {
        return previousValue.concat(currentValue.genres);
      }, []);

      const genres = genreDuplicates.filter((item, index) => {
        return genreDuplicates.indexOf(item) === index;
      });
      console.log(genres);
      return genres;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      const newBook = new Book({ ...args });

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const authorSameName = await Author.findOne({ name: args.author });
      newBook.author = authorSameName;

      if (!authorSameName) {
        const newAuthor = new Author({
          name: args.author,
        });
        try {
          const result = await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
        const result = await newAuthor.save();
        newBook.author = result;
      }

      try {
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

      return newBook;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

module.exports = { typeDefs, resolvers };
