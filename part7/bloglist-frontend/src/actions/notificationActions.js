import { setNotification } from '../reducers/notificationReducer';
import { NOTIFICATION_TIMEOUT } from '../constants';

export const showNotification = (message, type, sec = NOTIFICATION_TIMEOUT) => {
  return async (dispatch) => {
    const timer = setTimeout(() => {
      dispatch(setNotification({ message: '', timer: null, type }));
    }, sec);
    dispatch(setNotification({ message, timer, type }));
  };
};
