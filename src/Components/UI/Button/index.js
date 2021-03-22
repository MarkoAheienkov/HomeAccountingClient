import classes from './Button.module.css';

const Button = ({click, children, type, isDisabled}) => {
  return (
    <button disabled={isDisabled} className={classes.Button} type={type} onClick={click}>{children}</button>
  );
};

export default Button;
