const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { v1: uuid } = require('uuid');
const Book = require('./models/Book');
const Author = require('./models/Author');
const mongoose = require('mongoose');

const MONGODB_URI =
  'mongodb+srv://cpjim:Maristas56.@cluster0.kaxey.mongodb.net/library?retryWrites=true&w=majority';

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
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
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      const newBook = new Book({ ...args });

      const authorSameName = await Author.findOne({ name: args.author });

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

      return newBook;
    },
    editAuthor: async (root, args) => {
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
  Author: {
    bookCount: async (root) => Book.find({ author: root.name }).length,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
