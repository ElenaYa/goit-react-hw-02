const Notification = ({ total }) => {
  return total === 0 && <p>No feedback yet</p>;
};

export default Notification;