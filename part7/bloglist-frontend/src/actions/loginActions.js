import loginService from '../services/login';
import { setUser } from '../reducers/userReducer';
import { showNotification } from './notificationActions';
import { LOGIN_ERROR } from '../types/notificationTypes';

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService(credentials);
      window.localStorage.setItem('user', JSON.stringify(user));
      dispatch(setUser(user));
    } catch (exception) {
      dispatch(showNotification('Wrong credentials', LOGIN_ERROR, 3000));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    dispatch(setUser(null));
  };
};
