import {useState} from 'react';
import {useSelector} from 'react-redux';
import {ImCross} from 'react-icons/im';

import Input from '@Components/UI/Input';
import Button from '@Components/UI/Button';

import axios from '@Axios';

import * as validators from '@Helpers/validators';

import classes from './ModalContent.module.css';

const ModalAddRecord = ({closeModal, groupId, onSuccess}) => {
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
    amount: {
      value: '',
      validators: [
        validators.isNumber,
        validators.isRequired
      ],
      errors: [],
      touched: false,
      valid: false,
    },
  });

  const webToken = useSelector((state) => state.webToken);

  const setValues = async (field, event) => {
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
      await axios.post('records', {
        title: config.title.value,
        description: config.description.value,
        amount: config.amount.value,
        groupId: groupId,
      }, {
        params: {
          _token: webToken,
        }
      });
      onSuccess();
      closeModal();
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
      <h1 className={classes.Title}>Add new Record</h1>
      <form>
        <Input
          value={config.title.value}
          type={'title'}
          setValue={(event)=>{setValues('title', event)}}
          field={'title'}
          label={'Title:'}
          valid={config.title.valid || !config.title.touched}
          errorText={config.title.errors[0]}
          />
        <Input
          value={config.description.value}
          type={'description'}
          setValue={(event)=>{setValues('description', event)}}
          field={'description'}
          label={'Description:'}
          valid={config.description.valid || !config.description.touched}
          errorText={config.description.errors[0]}
          />
        <Input
          value={config.amount.value}
          type={'amount'}
          setValue={(event)=>{setValues('amount', event)}}
          field={'amount'}
          label={'Amount:'}
          valid={config.amount.valid || !config.amount.touched}
          errorText={config.amount.errors[0]}
          />
        <div className={classes.ButtonContainer}>
          <Button
            type="submit"
            click={submitHandler}
            isDisabled={!isFormValid()}
          >Add Record</Button>
        </div>
      </form>
      <ImCross onClick={closeModal} className={classes.ModalCross}/>
    </section>
  );
};

export default ModalAddRecord;
