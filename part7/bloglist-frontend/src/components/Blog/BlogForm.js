import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../actions/blogsActions';
import { Button, Form, Space, Input } from 'antd';
import Notification from '../Utils/Notification';
import { CREATE_BLOG_ERROR } from '../../types/notificationTypes';
import { showNotification } from '../../actions/notificationActions';

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [likes, setLikes] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleBlogCreation = async () => {
    try {
      await dispatch(createBlog({ title, author, url, likes }));
      setTitle('');
      setAuthor('');
      setUrl('');
      setLikes('');
      blogFormRef.current.toggleVisibility();
    } catch {
      dispatch(showNotification('Bad parameters', CREATE_BLOG_ERROR));
    }
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <>
      <Notification type={CREATE_BLOG_ERROR} />
      <h2>Create blog</h2>
      <Form
        {...layout}
        onFinish={handleBlogCreation}
        style={{
          backgroundColor: 'white',
          padding: '1.5em',
        }}
      >
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
        >
          <div>Title</div>
          <Space>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Space>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
        >
          <div>Author</div>
          <Space>
            <Input
              id="author"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Space>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
        >
          <div>Url</div>
          <Space>
            <Input
              id="url"
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </Space>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
        >
          <div>Likes </div>
          <Space>
            <Input
              id="likes"
              type="text"
              value={likes}
              onChange={({ target }) => setLikes(target.value)}
            />
          </Space>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </>
  );
};

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
};

export default BlogForm;
