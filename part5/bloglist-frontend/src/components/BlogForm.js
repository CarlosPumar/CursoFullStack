import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [likes, setLikes] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogCreation = (event) => {
    event.preventDefault();
    createBlog({ title, author, url, likes });
    setTitle('');
    setAuthor('');
    setUrl('');
    setLikes('');
  };

  return (
    <>
      <h2>Create blog</h2>
      <form onSubmit={handleBlogCreation} id="form">
        title
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        author
        <input
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        url
        <input
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        likes
        <input
          id="likes"
          type="text"
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
        />
        <br />
        <button id="blogFormCreate" type="submit">
          Create
        </button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
