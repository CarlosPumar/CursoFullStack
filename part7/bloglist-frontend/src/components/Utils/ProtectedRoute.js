import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import { Layout } from 'antd';
const { Content } = Layout;

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
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
