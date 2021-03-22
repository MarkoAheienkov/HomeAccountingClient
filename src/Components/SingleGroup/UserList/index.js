import {AiFillPlusCircle} from 'react-icons/ai';

import UserItem from './UserItem';

import classes from './UserList.module.css';

const UserList = ({users, addUser}) => {
  return (
    <ul className={classes.UserList}>
      {users.map((user) => <UserItem key={user._id} {...user}/>)}
      <AiFillPlusCircle onClick={addUser} size={32} className={classes.Add}/>
    </ul>
  );
};

export default UserList;
