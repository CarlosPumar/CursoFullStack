import { setFilter } from '../reducers/filterReducer';

export const setFilterAction = (filter) => {
  return async (dispatch) => {
    dispatch(setFilter(filter));
  };
};
