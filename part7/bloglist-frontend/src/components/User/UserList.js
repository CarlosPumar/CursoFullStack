import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from '../../actions/usersActions';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (user) => <Link to={`${user.id}`}>{user.username}</Link>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Nº Blogs',
      dataIndex: 'nblogs',
      key: 'nblogs',
    },
  ];

  const dataSource = users.map((user) => {
    return {
      key: user.id,
      username: user,
      name: user.name,
      nblogs: user.blogs.length,
    };
  });

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

export default UserList;
