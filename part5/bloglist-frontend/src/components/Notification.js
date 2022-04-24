const Notification = ({ message }) => {
  if (message) {
    return <>{message}</>;
  }
  return <></>;
};

export default Notification;
