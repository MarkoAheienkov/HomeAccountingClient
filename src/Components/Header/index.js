import classes from './Header.module.css';

import Toggle from '@Components/UI/Toggle';

const Header = ({toggleClick, isSticky}) => {
  const headerClasses = [classes.Header];
  if (isSticky) {
    headerClasses.push(classes.sticky);
  }
  return (
    <header className={headerClasses.join(' ')}>
      <Toggle click={toggleClick}/>
      <p className={classes.Logo}>
      Home Accounting
      </p>
    </header>
  );
};

export default Header;
