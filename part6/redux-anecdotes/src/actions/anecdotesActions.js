import anecdotesService from '../services/anecdotes';
import {
  vote,
  notify,
  stopNotify,
  appendAnecdote,
  setAnecdotes,
} from '../reducers/anecdoteReducer';

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdotesService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    newAnecdote.notifying = false;
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.vote(id);
    anecdote.notifying = true;
    dispatch(vote(id));
  };
};

export const setNotification = (id, sec) => {
  return async (dispatch) => {
    const timer = setTimeout(() => {
      dispatch(stopNotify(id));
    }, sec);

    dispatch(notify({ id, timer }));
  };
};
