import {NavLink} from 'react-router-dom';

import classes from './Link.module.css';

const Link = ({path, children, linkClick}) => {
  return (
    <li className={classes.ListItem}>
      <NavLink onClick={linkClick} exact className={classes.Link} activeClassName={classes.active} to={path}>{children}</NavLink>
    </li>
  );
};

export default Link;
