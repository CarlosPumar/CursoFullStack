import LoginForm from '../LoginForm';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const { Content } = Layout;

const LoginPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      navigate('/blogs');
    }
  }, [navigate, user]);

  return (
    <Layout>
      <Content
        style={{
          margin: '10em',
          background: '#ffffff',
        }}
      >
        <LoginForm />
      </Content>
    </Layout>
  );
};

export default LoginPage;
