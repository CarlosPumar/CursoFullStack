import { Link } from 'react-router-dom';

const BlogLink = ({ blog }) => {
  return <Link to={blog.id}>{blog.title}</Link>;
};

export default BlogLink;
