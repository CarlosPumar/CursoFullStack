import { setNotification } from '../reducers/notificationReducer';

export const showNotification = (message, sec) => {
  return async (dispatch) => {
    const timer = setTimeout(() => {
      dispatch(setNotification({ message: '', timer: null }));
    }, sec);
    dispatch(setNotification({ message, timer }));
  };
};
