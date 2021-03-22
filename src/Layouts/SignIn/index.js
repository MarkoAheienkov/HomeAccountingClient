import {useState} from 'react';
import axios from '@Axios';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Input from '@Components/UI/Input';
import Button from '@Components/UI/Button';

import * as validators from '@Helpers/validators';
import actionTypes from '@Store/actionTypes';

import classes from './SignIn.module.css';

const SignIn = () => {
  const dispatch = useDispatch();
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
      const response = await axios.post('auth/sign-in', {
        email: config.email.value,
        password: config.password.value,
      });
      const {token} = response.data;
      dispatch({type: actionTypes.SET_WEB_TOKEN, pilot: token});
      dispatch({type: actionTypes.SET_AUTH_TRUE});
      history.push('/groups');
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
      <h1 className={classes.Title}>Sign In</h1>
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
          value={config.password.value}
          type={'password'}
          setValue={(event)=>{setValues('password', event)}}
          field={'password'}
          label={'Password:'}
          valid={config.password.valid || !config.password.touched}
          errorText={config.password.errors[0]}
          />
        <div className={classes.ButtonContainer}>
          <Button
            type="submit"
            click={submitHandler}
            isDisabled={!isFormValid()}
          >Sign In</Button>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
