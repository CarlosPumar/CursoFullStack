import usersService from '../services/users';
import { setUsers } from '../reducers/usersReducer';

export const getUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};
