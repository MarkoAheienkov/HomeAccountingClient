import classes from './UserItem.module.css';

const UserItem = ({username, email}) => {
  return (
    <li className={classes.UserItem}>
      <span className={classes.Username}>{username}</span>
      <span className={classes.Email}>{email}</span>
    </li>
  );
};

export default UserItem;
