import { createSlice } from '@reduxjs/toolkit';

export const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    pushBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    updateBlog(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) return action.payload;
        return blog;
      });
    },
  },
});

export const { setBlogs, pushBlog, updateBlog, removeBlog } =
  blogsSlice.actions;
export default blogsSlice.reducer;
