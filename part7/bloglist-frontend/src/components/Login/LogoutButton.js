import { useDispatch } from 'react-redux';
import { logout } from '../../actions/loginActions';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return <p onClick={handleLogout}>Log out</p>;
};

export default LogoutButton;
