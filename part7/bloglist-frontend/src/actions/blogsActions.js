import {
  setBlogs,
  pushBlog,
  updateBlog,
  removeBlog,
} from '../reducers/blogsReducer';
import blogService from '../services/blogs';

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.post(blog);
    dispatch(pushBlog(response));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.remove(blog.id);
    dispatch(removeBlog(response));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogFoward = { ...blog, likes: blog.likes + 1 };
    const response = await blogService.put(blogFoward);
    dispatch(updateBlog(response));
  };
};
