import { gql } from '@apollo/client';

export const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      title
      published
      author {
        name
        born
        bookCount
        id
      }
      genres
      id
    }
  }
`;
