import {useState} from 'react';
import {useHistory} from 'react-router-dom';

import Input from '@Components/UI/Input';
import Button from '@Components/UI/Button';
import axios from '@Axios';

import * as validators from '@Helpers/validators';

import classes from './SignUp.module.css';

const SignUp = () => {

  const history = useHistory();

  const [config, setConfig] = useState({
    email: {
      value: '',
      validators: [
        validators.isRequired,
        validators.isEmail,
      ],
      errors: [],
      touched: false,
      valid: false,
    },
    username: {
      value: '',
      validators: [
        validators.isRequired,
      ],
      errors: [],
      touched: false,
      valid: false,
    },
    password: {
      value: '',
      validators: [
        validators.isRequired,
        validators.inRange.bind(null, 4, 10),
      ],
      errors: [],
      touched: false,
      valid: false,
    },
    confirmPassword: {
      value: '',
      validators: [
        validators.isRequired,
      ],
      errors: [],
      touched: false,
      valid: false,
    },
  });

  const setValues = (field, event) => {
    const {value} = event.target;
    setConfig((prev) => {
      const errors = validate(prev[field].validators, value.trim());
      return {
        ...prev,
        [field]: {
          ...prev[field],
          value: value,
          touched: true,
          valid: errors.length === 0,
          errors: errors,
        },
      };
    });
  };

  const isFormValid = () => {
    return Object.values(config).every(({valid}) => valid);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post('auth/sign-up', {
        email: config.email.value,
        password: config.password.value,
        username: config.username.value,
        confirmPassword: config.confirmPassword.value,
      });
      history.push('/auth/sign-in');
    }
    catch(err) {
      const {errors} = err.response.data;
      const newConfig = {...config};
      Object.entries(errors).forEach(([key, errors]) => {
        newConfig[key] = {...config[key]};
        newConfig[key].errors = errors.errors;
        newConfig[key].valid = false;
        newConfig[key].touched = true;
      });
      setConfig(newConfig);
    }
  };

  const validate = (validators, value) => {
    const errors = [];
    validators.forEach((validator) => {
      const {text, hasError} = validator(value);
      if (hasError) {
        errors.push(text);
      }
    });
    return errors;
  };

  return (
    <section className={classes.Form}>
      <h1 className={classes.Title}>Sign Up</h1>
      <form>
        <Input
          value={config.email.value}
          type={'email'}
          setValue={(event)=>{setValues('email', event)}}
          field={'email'}
          label={'Email:'}
          valid={config.email.valid || !config.email.touched}
          errorText={config.email.errors[0]}
          />
        <Input
          value={config.username.value}
          type={'text'}
          setValue={(event)=>{setValues('username', event)}}
          field={'username'}
          label={'Username:'}
          valid={config.username.valid || !config.username.touched}
          errorText={config.username.errors[0]}
          />
        <Input
          value={config.password.value}
          type={'password'}
          setValue={(event)=>{setValues('password', event)}}
          field={'password'}
          label={'Password:'}
          valid={config.password.valid || !config.password.touched}
          errorText={config.password.errors[0]}
          />
        <Input
          value={config.confirmPassword.value}
          type={'password'}
          setValue={(event)=>{setValues('confirmPassword', event)}}
          field={'confirmPassword'}
          label={'Confirm password:'}
          valid={config.confirmPassword.valid || !config.confirmPassword.touched}
          errorText={config.confirmPassword.errors[0]}
          />
        <div className={classes.ButtonContainer}>
          <Button
            type="submit"
            click={submitHandler}
            isDisabled={!isFormValid()}
          >Sign Up</Button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
