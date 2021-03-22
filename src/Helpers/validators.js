export const isEmail = (value) => {
  const error = {
    hasError: false,
    text: 'Email is not valid',
  };
  const regular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  error.hasError = !regular.test(String(value).toLowerCase());
  return error;
};

export const isRequired = (value) => {
  const error = {
    hasError: false,
    text: 'Can`t be empty',
  };
  if (value.trim() === '') {
    error.hasError = true;
  }
  return error;
};

export const areSimilar = (value1, value2) => {
  const error = {
    hasError: false,
    text: 'Must be similar',
  };
  if (value1 !== value2) {
    error.hasError = true;
  }
  return error;
};

export const inRange = (min, max, value) => {
  const error = {
    hasError: false,
    text: `Must have at least ${min} characters and less than ${max}`,
  };
  if (min > value.length || max < value.length) {
    error.hasError = true;
  }
  return error;
};

export const isNumber = (value) => {
  const error = {
    hasError: false,
    text: `Must be a number`,
  };
  error.hasError = isNaN(value);
  return error;
};

export const isBetween = (min, max, value) => {
  const error = {
    hasError: false,
    text: `Must be between ${min} and ${max}`,
  };
  error.hasError = !(min <= value && value <= max);
  return error;
};
