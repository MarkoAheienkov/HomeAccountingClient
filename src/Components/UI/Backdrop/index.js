import classes from './Backdrop.module.css';

const Backdrop = ({isShowing, click}) => {
  const backdropClasses = [classes.Backdrop];
  if (isShowing) {
    backdropClasses.push(classes.active);
  }
  return <div onClick={click} className={backdropClasses.join(' ')}></div>;
};

export default Backdrop;
