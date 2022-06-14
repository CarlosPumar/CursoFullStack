import { Link } from 'react-router-dom';
import LogoutButton from '../Login/LogoutButton';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';
import { Layout } from 'antd';
const { Header } = Layout;

const Navigation = () => {
  const user = useSelector((state) => state.user);
  if (!user) return <></>;

  return (
    <>
      <Header>
        <div className="logo"></div>
        <p className="userLogged">{user.username} is logged</p>
        <Menu
          style={{
            lineHeight: '3.55em',
            paddingRight: '0px',
          }}
          className="menu"
          theme="dark"
          mode="horizontal"
          items={[
            {
              label: <Link to="/blogs">Blogs</Link>,
              key: 'blogs',
            },
            {
              label: <Link to="/users">Users</Link>,
              key: 'users',
            },
            {
              label: <LogoutButton />,
              key: 'logout',
            },
          ]}
        />
      </Header>
    </>
  );
};

export default Navigation;
