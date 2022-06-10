import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    {notification && <div>{notification}</div>}
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
