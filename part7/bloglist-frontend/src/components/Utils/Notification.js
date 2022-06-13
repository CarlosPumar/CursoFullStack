import { useSelector } from 'react-redux';

const Notification = ({ type }) => {
  const notification = useSelector((state) =>
    state.notification.find((notification) => notification.type === type)
  );

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
