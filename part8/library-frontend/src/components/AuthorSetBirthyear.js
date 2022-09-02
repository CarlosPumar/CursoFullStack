import { useState } from 'react';
import { ALL_AUTHORS } from '../graphql/queries';
import { UPDATE_AUTHOR } from '../graphql/mutations';
import { useMutation } from '@apollo/client/react';

const AuthorSetBirthyear = ({ authors }) => {
  const [author, setAuthor] = useState(authors ? authors[0].name : '');
  const [bornYear, setBornYear] = useState('');
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const variables = {
    name: author,
    born: parseInt(bornYear),
  };

  const submit = (event) => {
    event.preventDefault();
    updateAuthor({
      variables,
    });
  };

  return (
    <>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        >
          {authors &&
            authors.map((author) => {
              return (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              );
            })}
        </select>
        <br />
        <input
          value={bornYear}
          onChange={({ target }) => setBornYear(target.value)}
        />
        <br />
        <button type="submit">set born year</button>
      </form>
    </>
  );
};

export default AuthorSetBirthyear;
