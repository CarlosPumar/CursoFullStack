import { FILTER_BOOKS_BY_GENRE, GET_GENRES } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';
import { useState } from 'react';

const Books = (props) => {
  const [genre, setGenre] = useState('');
  const booksQuery = useQuery(FILTER_BOOKS_BY_GENRE, {
    variables: {
      genre,
    },
  });
  const genresQuery = useQuery(GET_GENRES);

  if (!props.show) {
    return null;
  }

  if (booksQuery.loading) {
    return 'loading';
  }

  const genres = genresQuery.data.allGenres;
  const books = booksQuery.data.filterBooksByGenre;

  return (
    <div>
      <h2>books</h2>
      <h3>Genre: {genre ? genre : 'All genres'}</h3>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenre('')}>All gengers</button>
    </div>
  );
};

export default Books;
