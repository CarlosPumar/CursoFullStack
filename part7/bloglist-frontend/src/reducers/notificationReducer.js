import { createSlice } from '@reduxjs/toolkit';
import { types } from '../types/notificationTypes';

const initialState = types.map((type) => {
  return {
    type,
    message: null,
    timer: null,
  };
});

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return state.map((notification) => {
        if (notification.type === action.payload.type) {
          if (notification.timer) {
            clearTimeout(notification.timer);
          }

          return {
            ...notification,
            message: action.payload.message,
            timer: action.payload.timer,
          };
        }
        return notification;
      });
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
