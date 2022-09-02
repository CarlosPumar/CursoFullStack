import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { FILTER_BOOKS_BY_GENRE } from '../graphql/queries';

const Recommended = (props) => {
  const { me } = useContext(AuthContext);
  const { data } = useQuery(FILTER_BOOKS_BY_GENRE, {
    variables: {
      genre: me?.favouriteGenre,
    },
  });

  if (!props.show) {
    return <></>;
  }

  if (!me?.favouriteGenre) {
    return <></>;
  }

  const books = data.filterBooksByGenre;

  return (
    <>
      <div>
        <h2>books</h2>
        <h3>Genre: {me.favouriteGenre}</h3>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Recommended;
