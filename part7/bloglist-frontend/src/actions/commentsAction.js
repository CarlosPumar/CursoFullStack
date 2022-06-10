import commentService from '../services/comment';
import { pushComment, setComment } from '../reducers/commentsReducer';

export const createComment = (comment) => {
  return async (dispatch) => {
    const response = await commentService.post(comment);
    dispatch(pushComment(response));
  };
};

export const getComments = () => {
  return async (dispatch) => {
    const response = await commentService.getAll();
    dispatch(setComment(response));
  };
};
