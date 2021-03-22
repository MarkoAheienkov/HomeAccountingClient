import {useState} from 'react';
import axios from '@Axios';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Input from '@Components/UI/Input';
import Button from '@Components/UI/Button';

import * as validators from '@Helpers/validators';

import classes from './GroupCreate.module.css';

const GroupCreate = () => {
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
    description: {
      value: '',
      validators: [
        validators.isRequired,
      ],
      errors: [],
      touched: false,
      valid: false,
    },
    balance: {
      value: '0',
      validators: [
        validators.isRequired,
        validators.isNumber,
      ],
      errors: [],
      touched: false,
      valid: true,
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
      await axios.post('groups/create', {
        title: config.title.value,
        description: config.description.value,
        balance: config.balance.value,
      }, {
        params: {
          _token: webToken,
        }
      });
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
      <h1 className={classes.Title}>Group Create</h1>
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
          value={config.description.value}
          type={'text'}
          setValue={(event)=>{setValues('description', event)}}
          field={'description'}
          label={'Description:'}
          valid={config.description.valid || !config.description.touched}
          errorText={config.description.errors[0]}
          />
        <Input
          value={config.balance.value}
          type={'text'}
          setValue={(event)=>{setValues('balance', event)}}
          field={'balance'}
          label={'Balance:'}
          valid={config.balance.valid || !config.balance.touched}
          errorText={config.balance.errors[0]}
          />
        <div className={classes.ButtonContainer}>
          <Button
            type="submit"
            click={submitHandler}
            isDisabled={!isFormValid()}
          >Create</Button>
        </div>
      </form>
    </section>
  );
};

export default GroupCreate;
