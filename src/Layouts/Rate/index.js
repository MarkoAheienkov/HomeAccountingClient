import {useState} from 'react';
import axios from '@Axios';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Input from '@Components/UI/Input';
import Button from '@Components/UI/Button';

import * as validators from '@Helpers/validators';

import classes from './Rate.module.css';

const Rate = () => {
  const webToken = useSelector((state) => state.webToken);
  const history = useHistory();

  const [config, setConfig] = useState({
    title: {
      value: '',
      validators: [
        validators.isRequired,
      ],
      errors: [],
      touched: false,
      valid: false,
    },
    text: {
      value: '',
      validators: [
        validators.isRequired,
      ],
      errors: [],
      touched: false,
      valid: false,
    },
    mark: {
      value: '',
      validators: [
        validators.isRequired,
        validators.isBetween.bind(null, 0, 5),
        validators.isNumber,
      ],
      errors: [],
      touched: false,
      valid: false,
    }
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
      await axios.post('rates', {
        title: config.title.value,
        text: config.text.value,
        mark: config.mark.value,
      },{
        params: {
          _token: webToken,
        },
      });
      history.push('/rates');
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
      <h1 className={classes.Title}>Rate Us!</h1>
      <form>
        <Input
          value={config.title.value}
          type={'text'}
          setValue={(event)=>{setValues('title', event)}}
          field={'title'}
          label={'Title:'}
          valid={config.title.valid || !config.title.touched}
          errorText={config.title.errors[0]}
          />
        <Input
          value={config.text.value}
          type={'text'}
          setValue={(event)=>{setValues('text', event)}}
          field={'text'}
          label={'Text:'}
          valid={config.text.valid || !config.text.touched}
          errorText={config.text.errors[0]}
          />
        <Input
          value={config.mark.value}
          type={'text'}
          setValue={(event)=>{setValues('mark', event)}}
          field={'mark'}
          label={'Mark:'}
          valid={config.mark.valid || !config.mark.touched}
          errorText={config.mark.errors[0]}
          />
        <div className={classes.ButtonContainer}>
          <Button
            type="submit"
            click={submitHandler}
            isDisabled={!isFormValid()}
          >Rate</Button>
        </div>
      </form>
    </section>
  );
};

export default Rate;
