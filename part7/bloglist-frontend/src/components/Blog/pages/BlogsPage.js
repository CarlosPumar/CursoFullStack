import { useEffect, useRef } from 'react';
import BlogList from '../BlogList';
import BlogForm from '../BlogForm';
import Togglable from '../../Utils/Togglable';
import { useDispatch } from 'react-redux';
import { getBlogs } from '../../../actions/blogsActions';

const BlogsPage = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <>
      <Togglable buttonLabel={'New blog'} ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </>
  );
};

export default BlogsPage;
