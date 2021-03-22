import classes from './Toggle.module.css';

const Toggle = ({click}) => {
  return (
    <div onClick={click} role="button" className={classes.Toggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Toggle;
