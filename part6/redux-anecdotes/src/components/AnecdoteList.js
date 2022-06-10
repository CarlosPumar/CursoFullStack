import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, setNotification } from '../actions/anecdotesActions';
import { sortByVotes } from '../utils/sort';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    let anecdotes;

    if (state.filter === '') {
      anecdotes = [...state.anecdotes];
    } else {
      anecdotes = [...state.anecdotes].filter((anecdote) =>
        anecdote.content.includes(state.filter)
      );
    }

    return anecdotes.sort(sortByVotes);
  });
  const dispatch = useDispatch();
  const voteAnecdoteOnCLick = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(setNotification(id, 3000));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdoteOnCLick(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
