import { createSlice } from '@reduxjs/toolkit';

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    pushComment(state, action) {
      state.push(action.payload);
    },
    setComment(state, action) {
      return action.payload;
    },
  },
});

export const { setComment, pushComment } = commentsSlice.actions;
export default commentsSlice.reducer;
