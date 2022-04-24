import { useState, useEffect, useRef } from 'react';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  const login = async ({ username, password }) => {
    try {
      const user = await loginService({ username, password });
      window.localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  const createBlog = async ({ title, author, url, likes }) => {
    blogFormRef.current.toggleVisibility();
    const newBlog = await blogService.post({ title, author, url, likes });
    const newBlogs = blogs.concat(newBlog);
    setBlogs(newBlogs);
  };

  const likeBlog = (id) => {
    const newBlogs = blogs.map((blog) => {
      if (blog.id === id) {
        blog.likes += 1;
        blogService.put(blog);
      }
      return blog;
    });
    setBlogs(newBlogs);
  };

  const removeBlog = (id) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    blogService.remove(id);
    setBlogs(newBlogs);
  };

  const likesCompare = (a, b) => {
    if (a.likes > b.likes) return -1;
    if (a.likes < b.likes) return 1;
    return 0;
  };

  return (
    <>
      <Notification message={errorMessage} />
      {user === null && <LoginForm login={login} />}
      {user !== null && (
        <>
          <p>{user.username} is logged </p>
          <button onClick={handleLogout}>Log out</button>
          <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <BlogList
            blogs={blogs.sort(likesCompare)}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
          />
        </>
      )}
    </>
  );
};

export default App;
