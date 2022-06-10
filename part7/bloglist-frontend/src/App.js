import ProtectedRoute from './components/Utils/ProtectedRoute';
import BlogsPage from './components/Blog/pages/BlogsPage';
import LoginPage from './components/Login/pages/LoginPage';
import UsersPage from './components/User/pages/UsersPage';
import UserPage from './components/User/pages/UserPage';
import BlogPage from './components/Blog/pages/BlogPage';
import { useMatch } from 'react-router-dom';

import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  let match;

  match = useMatch('/users/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  match = useMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <BlogsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <UserPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute>
              <BlogPage blog={blog} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
};

export default App;
