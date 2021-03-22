import {Link} from 'react-router-dom';

import Card from '@Components/UI/Card';

import classes from './Group.module.css';

const Group = ({title, description, path}) => {
  return (
    <Card>
      <Link to={path} className={classes.Link}>
        <div className={classes.Container}>
          <h2 className={classes.Title}>{title}</h2>
          <p className={classes.Description}>{description}</p>
        </div>
      </Link>
    </Card>
  );
};

export default Group;
