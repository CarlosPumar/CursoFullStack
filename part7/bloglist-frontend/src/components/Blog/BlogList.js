import { useSelector } from 'react-redux';
import BlogLink from './BlogLink';
import { Table } from 'antd';

const BlogList = () => {
  const likesCompare = (a, b) => {
    if (a.likes > b.likes) return -1;
    if (a.likes < b.likes) return 1;
    return 0;
  };
  const blogs = useSelector((state) => [...state.blogs].sort(likesCompare));
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (blog) => <BlogLink blog={blog} />,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
  ];

  const data = blogs.map((blog) => {
    return {
      key: blog.id,
      title: blog,
      author: blog.author,
    };
  });
  return (
    <>
      <h2>Blogs</h2>
      <Table columns={columns} dataSource={data} />

      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <br />
          </div>
        );
      })}
    </>
  );
};

export default BlogList;
