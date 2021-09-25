import * as types from '../actions/types';
import initialState from './initialState';

function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.USER_AUTH:
    case types.SIGNUP:
    case types.LOGIN:
      return {
        ...state,
        isUserLoggedIn: true,
      };

    case types.LOGOUT_FAILED:
    case types.SIGNUP_FAILED:
    case types.LOGIN_FAILED:
      return state;

    case types.USER_NO_AUTH:
    case types.LOGOUT:
      return {
        ...state,
        isUserLoggedIn: false,
      };

    default:
      return state;
  }
}

export default sessionReducer;
