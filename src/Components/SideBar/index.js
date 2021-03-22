import {useSelector, useDispatch} from 'react-redux';

import Links from './Links';
import Link from './Links/Link';

import actionTypes from '@Store/actionTypes';

import classes from './Sidebar.module.css';

const Sidebar = ({isOpen, linkClick}) => {
  const sidebarClasses = [classes.Sidebar];
  if (isOpen) {
    sidebarClasses.push(classes.active);
  }

  const isAuth = useSelector((state) => state.isAuth);

  const dispatch = useDispatch();

  let links = [
    {
      path: '/',
      body: 'Home',
    },
    {
      path: '/rates',
      body: 'All rates',
    },
    {
      path: '/auth/sign-up',
      body: 'Sign Up',
    },
    {
      path: '/auth/sign-in',
      body: 'Sign In',
    },

  ];

  const logout = () => {
    linkClick();
    dispatch({type: actionTypes.SET_AUTH_FALSE});
    dispatch({type: actionTypes.REMOVE_WEB_TOKEN});
  };

  if (isAuth) {
    links = [
      {
        path: '/',
        body: 'Home',
      },
      {
        path: '/groups',
        body: 'Groups',
      },
      {
        path: '/rate',
        body: 'Rate Us',
      },
      {
        path: '/rates',
        body: 'All rates',
      },
    ];
  }

  return (
    <div className={sidebarClasses.join(' ')}>
      <p className={classes.Logo}>Home Accounting</p>
      <nav className={classes.Navigation}>
        <ul className={classes.Links}>
          <Links linkClick={linkClick} links={links}/>
          {isAuth && <Link linkClick={logout} path="/auth/sign-in">Logout</Link>}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
