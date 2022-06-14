import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { likeBlog, deleteBlog } from '../../actions/blogsActions';
import CommentCreate from '../Comment/CommentCreate';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getComments } from '../../actions/commentsAction';
import { Table, Button } from 'antd';
import CommentList from '../Comment/CommentList';
import { showNotification } from '../../actions/notificationActions';
import { DELETE_BLOG_ERROR } from '../../types/notificationTypes';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const comments = useSelector((state) =>
    state.comments.filter((comment) => {
      if (!blog) return false;
      return comment.blog === blog.id;
    })
  );

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const handleLikes = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = async () => {
    try {
      await dispatch(deleteBlog(blog));
      navigate('/blogs');
    } catch {
      dispatch(
        showNotification(
          'A blog only can be delete by his owner',
          DELETE_BLOG_ERROR
        )
      );
    }
  };

  if (!blog) return <></>;

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: (text) => (
        <a href={text} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: 'Likes',
      dataIndex: 'likes',
      key: 'likes',
      render: (text) => (
        <>
          {text}{' '}
          <Button style={{ marginLeft: '5em' }} onClick={handleLikes}>
            like
          </Button>
        </>
      ),
    },
  ];

  const data = [
    {
      key: blog.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
    },
  ];

  return (
    <div className="blog">
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        style={{ marginBottom: '5em' }}
      />
      <h3>Comments</h3>
      <br />
      <CommentCreate blogId={blog.id} />
      <CommentList comments={comments} />
      <Button
        onClick={handleRemove}
        type="primary"
        danger
        style={{ float: 'right' }}
      >
        Remove
      </Button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
};

export default Blog;
