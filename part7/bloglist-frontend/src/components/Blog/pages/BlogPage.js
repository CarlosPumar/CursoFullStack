import Notification from '../../Utils/Notification';
import Blog from '../Blog';
import { DELETE_BLOG_ERROR } from '../../../types/notificationTypes';

const BlogPage = ({ blog }) => {
  return (
    <>
      <Notification type={DELETE_BLOG_ERROR} />
      <Blog blog={blog} />
    </>
  );
};

export default BlogPage;
