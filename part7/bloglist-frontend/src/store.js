import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';
import commentsReducer from './reducers/commentsReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    notification: notificationReducer,
    blogs: blogsReducer,
    comments: commentsReducer,
  },
});

export default store;
