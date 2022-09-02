import { useState, useEffect, useContext } from 'react';
import { LOGIN } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../App';

const Login = ({ show }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setToken, setMe } = useContext(AuthContext);

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      // setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      const me = {
        username: result.data.login.username,
        favouriteGenre: result.data.login.favouriteGenre,
      };
      setToken(token);
      setMe(me);
      localStorage.setItem('user-token', token);
      localStorage.setItem('me', JSON.stringify(me));
    }
  }, [result.data, setToken, setMe]);

  if (!show) {
    return null;
  }

  const submit = (e) => {
    e.preventDefault();
    setPassword('');
    login({ variables: { username, password } });
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
