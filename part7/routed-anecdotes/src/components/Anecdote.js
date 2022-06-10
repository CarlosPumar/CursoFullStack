export const Anecdote = ({ anecdote }) => (
  <>
    <ul>
      <li>content: {anecdote.content}</li>
      <li>author: {anecdote.author}</li>
      <li>info: {anecdote.info}</li>
      <li>votes: {anecdote.votes}</li>
    </ul>
  </>
);
