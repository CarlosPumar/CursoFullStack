import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
    }
  }
`;

export const GET_GENRES = gql`
  query AllGenres {
    allGenres
  }
`;

export const FILTER_BOOKS_BY_GENRE = gql`
  query FilterBooksByGenre($genre: String) {
    filterBooksByGenre(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      username
      favouriteGenre
    }
  }
`;
