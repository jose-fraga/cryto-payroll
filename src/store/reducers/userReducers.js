import * as types from '../actions/types';
import initialState from './initialState';

function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.GET_USER_INFO:
      return {
        ...state,
        name: action.user.name,
        userTypes: action.user.userTypes,
        username: action.user.username,
        email: action.user.email,
        phone: action.user.phone,
        payout: action.user.payout,
      };

    case types.UPDATE_USER_PAYOUT_METHOD: 
    case types.GET_USER_PAYOUT_METHOD:
      return {
        ...state,
        payout: {
          payoutUsername: action.payoutUsername,
          payoutMethod: action.payoutMethod,
        }
      };

    case types.GET_USER_PAYOUT_METHOD_FAILED:
      return state;

    case types.UPLOAD_AVATAR:
      return { ...state, avatar: action.avatar };

    case types.UPLOAD_AVATAR_FAILED:
      return state;

    default:
      return state;
  }
}

export default userReducer;
