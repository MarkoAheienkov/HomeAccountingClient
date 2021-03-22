import actionTypes from './actionTypes';
import * as actions from './actions';

const initState = {
  isAuth: false,
  webToken: null,
};

const reducer = (state = initState, action) => {
  switch(action.type) {
    case(actionTypes.SET_WEB_TOKEN):
      return actions.setWebToken(state, action);
    case(actionTypes.SET_AUTH_TRUE):
      return actions.setAuthTrue(state, action);
    case(actionTypes.SET_AUTH_FALSE):
      return actions.setAuthFalse(state, action);
    case(actionTypes.REMOVE_WEB_TOKEN):
      return actions.removeWebToken(state, action);
    default:
      return state;
  }
};

export default reducer;
