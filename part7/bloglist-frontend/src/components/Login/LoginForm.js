import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/loginActions';
import Notification from '../Utils/Notification';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Space } from 'antd';
import { LOGIN_ERROR } from '../../types/notificationTypes';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await dispatch(login({ username, password }));
    navigate('/blogs');
  };

  return (
    <>
      <Form
        style={{ marginTop: '2em' }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <h1>Login</h1>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Notification type={LOGIN_ERROR} />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Space>
            <Input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Space>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Space>
            <Input.Password
              type="text"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Space>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
