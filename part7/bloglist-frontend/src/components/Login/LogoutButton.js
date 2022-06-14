import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/loginActions';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    await dispatch(logout());
    navigate('/login');
  };

  return <p onClick={handleLogout}>Log out</p>;
};

export default LogoutButton;
