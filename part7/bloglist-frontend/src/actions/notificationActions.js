import { setNotification } from '../reducers/notificationReducer';

export const showNotification = (message, type, sec) => {
  return async (dispatch) => {
    const timer = setTimeout(() => {
      dispatch(setNotification({ message: '', timer: null, type }));
    }, sec);
    dispatch(setNotification({ message, timer, type }));
  };
};
