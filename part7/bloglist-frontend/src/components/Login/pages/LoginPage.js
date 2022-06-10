import LoginForm from '../LoginForm';
import { Layout } from 'antd';

const { Content } = Layout;

const LoginPage = () => {
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
