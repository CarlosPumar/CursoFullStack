import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.message) {
    return (
      <>
        <p className="notification">{notification.message}</p>
      </>
    );
  }
  return <></>;
};

export default Notification;
