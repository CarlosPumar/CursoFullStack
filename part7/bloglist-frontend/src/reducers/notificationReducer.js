import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    timer: null,
  },
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
      if (state.timer) {
        clearTimeout(state.timer);
      }
      state.timer = action.payload.timer;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
