import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import { Layout } from 'antd';
import { setUser } from '../../reducers/userReducer';
import { useEffect } from 'react';
const { Content } = Layout;

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) dispatch(setUser(user));
  }, [dispatch, user]);

  if (!user) return <Navigate to="/login" replace />;
  return (
    <Layout>
      <Navigation />
      <Content
        style={{
          margin: '50px 50px',
          padding: '50px',
          backgroundColor: 'white',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default ProtectedRoute;
