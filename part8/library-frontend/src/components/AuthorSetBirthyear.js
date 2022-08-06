import { useState } from 'react';
import { UPDATE_AUTHOR } from '../queries';
import { useMutation } from '@apollo/client/react';

const AuthorSetBirthyear = ({ authors }) => {
  const [author, setAuthor] = useState(authors[0].name);
  const [bornYear, setBortnYear] = useState('');
  const [updateAuthor] = useMutation(UPDATE_AUTHOR);

  const variables = {
    name: author,
    born: parseInt(bornYear),
  };

  console.log(variables);

  const submit = () => {
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
          {authors.map((author) => {
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
          onChange={({ target }) => setBortnYear(target.value)}
        />
        <br />
        <button type="submit">set born year</button>
      </form>
    </>
  );
};

export default AuthorSetBirthyear;
