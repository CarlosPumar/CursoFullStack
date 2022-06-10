import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../../actions/commentsAction';
import { Form, Button, Space, Input } from 'antd';

const CommentCreate = ({ blogId }) => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleCreation = () => {
    dispatch(createComment({ content, blog: blogId }));
    setContent('');
  };

  return (
    <>
      <Form
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
        onFinish={handleCreation}
        autoComplete="off"
      >
        <Form.Item
          rules={[
            {
              message: 'Please input your comment!',
            },
          ]}
        >
          <h4>New Comment</h4>{' '}
          <Space>
            <Input
              type="text"
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
          </Space>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: '1em' }}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CommentCreate;
