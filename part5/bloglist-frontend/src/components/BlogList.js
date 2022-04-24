import Blog from './Blog';
import PropTypes from 'prop-types';

const BlogList = ({ blogs, likeBlog, removeBlog }) => (
  <>
    <h2>blogs</h2>
    {blogs.map((blog) => {
      return (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
        />
      );
    })}
  </>
);

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default BlogList;
