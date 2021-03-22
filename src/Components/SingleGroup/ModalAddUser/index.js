import {useState} from 'react';
import {useSelector} from 'react-redux';
import {ImCross} from 'react-icons/im';

import Input from '@Components/UI/Input';
import Button from '@Components/UI/Button';

import axios from '@Axios';

import * as validators from '@Helpers/validators';

import classes from './ModalContent.module.css';

const ModalAddUser = ({closeModal, groupId, onSuccess}) => {
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
      await axios.post('groups/addUser', {
        email: config.email.value,
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
      <h1 className={classes.Title}>Add new User</h1>
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
        <div className={classes.ButtonContainer}>
          <Button
            type="submit"
            click={submitHandler}
            isDisabled={!isFormValid()}
          >Send Request</Button>
        </div>
      </form>
      <ImCross onClick={closeModal} className={classes.ModalCross}/>
    </section>
  );
};

export default ModalAddUser;
