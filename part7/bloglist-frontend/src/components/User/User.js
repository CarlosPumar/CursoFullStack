import { List } from 'antd';

const User = ({ user }) => {
  const data = user.blogs.map((blog) => blog.title);

  return (
    <>
      <br />
      <h2>Username: {user.username}</h2>
      <h4>Name: {user.name}</h4>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
};

export default User;
