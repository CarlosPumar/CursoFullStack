import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../graphql/queries';
import AuthorSetBirthyear from './AuthorSetBirthyear';
import { AuthContext } from '../App';
import { useContext } from 'react';

const Authors = (props) => {
  const authorsQuery = useQuery(ALL_AUTHORS);
  const { token } = useContext(AuthContext);

  if (!props.show) {
    return null;
  }

  let authors;

  if (!authorsQuery.loading) {
    authors = authorsQuery.data.allAuthors;
    console.log(authors);
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {!authorsQuery.loading &&
            authors.map((author) => (
              <tr key={author.name}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {!authorsQuery.loading && token && (
        <AuthorSetBirthyear authors={authors} />
      )}
    </div>
  );
};

export default Authors;
