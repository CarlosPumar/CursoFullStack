import { useSelector } from 'react-redux';

const Notification = () => {
  const notifications = useSelector((state) =>
    state.anecdotes.filter((anecdote) => anecdote.notifying === true)
  );

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notifications.length !== 0)
    return (
      <div style={style}>
        {notifications.map((anecdote) => (
          <div key={anecdote.id}>You voted '{anecdote.content}'</div>
        ))}
      </div>
    );
  return <></>;
};

export default Notification;
