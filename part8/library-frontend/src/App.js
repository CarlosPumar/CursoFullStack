import { useState, createContext, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import { useApolloClient } from '@apollo/client';
import Recommended from './components/Recommended';

const AuthContext = createContext(null);

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState('');
  const [me, setMe] = useState('');
  const client = useApolloClient();

  useEffect(() => {
    if (!token) setToken(localStorage.getItem('user-token'));
    if (!me) setMe(JSON.parse(localStorage.getItem('me')));
  }, [me, token]);

  const logout = () => {
    setToken(null);
    setMe(null);
    localStorage.clear();
    client.resetStore();
    setPage('login');
  };

  if (token && page === 'login') setPage('authors');

  return (
    <AuthContext.Provider value={{ token, setToken, me, setMe }}>
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          {token && <button onClick={() => setPage('add')}>add book</button>}
          {token && (
            <button onClick={() => setPage('recommended')}>recommended</button>
          )}
          {!token && <button onClick={() => setPage('login')}>login</button>}
          {token && <button onClick={logout}>logout</button>}
        </div>

        <Authors show={page === 'authors'} />

        <Books show={page === 'books'} />

        <NewBook show={page === 'add'} />

        <Recommended show={page === 'recommended'} />

        <Login show={page === 'login'} />
      </div>
    </AuthContext.Provider>
  );
};

export default App;
export { AuthContext };
