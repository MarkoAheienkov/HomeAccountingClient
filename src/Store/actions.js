export const setWebToken = (state, action) => {
  const {pilot} = action;
  const newState = {...state};
  newState.webToken = pilot;
  return newState;
};

export const setAuthTrue = (state, action) => {
  const newState = {...state};
  newState.isAuth = true;
  return newState;
};

export const setAuthFalse = (state, action) => {
  const newState = {...state};
  newState.isAuth = false;
  return newState;
};

export const removeWebToken = (state, action) => {
  const newState = {...state};
  newState.isAuth = null;
  return newState;
};
