import { useState } from 'react';
import {
  ALL_BOOKS,
  ALL_AUTHORS,
  FILTER_BOOKS_BY_GENRE,
} from '../graphql/queries';
import { ADD_BOOK } from '../graphql/mutations';
import { useMutation, useSubscription } from '@apollo/client/react';
import { BOOK_ADDED } from '../graphql/subscriptions';
import { useApolloClient } from '@apollo/client/react';

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded;
      client.cache.updateQuery({ query: ALL_BOOKS }, (data) => {
        return {
          allBooks: data.allBooks.concat(bookAdded),
        };
      });

      bookAdded.genres.map((genre) => {
        client.cache.updateQuery(
          {
            query: FILTER_BOOKS_BY_GENRE,
            variables: { genre },
          },
          (data) => {
            return {
              filterBooksByGenre: data.filterBooksByGenre.concat(bookAdded),
            };
          },
        );
        return true;
      });
    },
  });

  const [createBook] = useMutation(ADD_BOOK);

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');

    createBook({
      variables: { title, author, published: parseInt(published), genres },
    });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
