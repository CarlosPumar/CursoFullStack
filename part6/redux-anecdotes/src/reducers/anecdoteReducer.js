import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    notify(state, action) {
      const anecdoteTimer = state.find(
        (anecdote) => anecdote.id === action.payload.id
      );

      if (anecdoteTimer.timer) {
        clearTimeout(anecdoteTimer.timer);
      }

      const id = action.payload.id;
      const anecdote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdote,
        notifying: true,
        timer: action.payload.timer,
      };
      return state.map((anecdote) => {
        if (anecdote.id === id) return changedAnecdote;
        return anecdote;
      });
    },
    stopNotify(state, action) {
      const id = action.payload;
      const anecdote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdote,
        notifying: false,
        timer: false,
      };
      return state.map((anecdote) => {
        if (anecdote.id === id) return changedAnecdote;
        return anecdote;
      });
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, notify, stopNotify, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

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

export default anecdoteSlice.reducer;
