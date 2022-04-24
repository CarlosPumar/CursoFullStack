import Togglable from './Togglable';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const divStyle = {
    border: '1px solid black',
  };

  const handleLikes = () => {
    likeBlog(blog.id);
  };

  const handleRemove = () => {
    removeBlog(blog.id);
  };

  return (
    <div style={divStyle} className="blog">
      {blog.title} {blog.author}
      <Togglable buttonLabel={'view'}>
        likes: {blog.likes} <button onClick={handleLikes}>Like</button>
        <br />
        url: {blog.url}
        <button onClick={handleRemove}>remove</button>
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
