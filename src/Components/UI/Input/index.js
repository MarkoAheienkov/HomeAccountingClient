import classes from './Input.module.css';

const Input = ({field, value, setValue, label, type, errorText, valid}) => {
  const inputClasses = [classes.Input];
  if (!valid) {
    inputClasses.push(classes.error);
  }
  return (
    <div className={classes.FormControl}>
      <label className={classes.Label} htmlFor={field}>{label}</label>
      <input noValidate={true} className={inputClasses.join(' ')} id={field} type={type} value={value} onInput={setValue}/>
      <small className={classes.ErrorText}>{errorText || '⠀'}</small>
    </div>
  );
};

export default Input;
