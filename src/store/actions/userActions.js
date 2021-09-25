import * as types from './types';
import UserServices from '../services/UserServices';

export default {
  getUserDetails() {
    return (dispatch) => {
      return UserServices.getUserDetails()
        .then((res) => {
          return dispatch({ type: types.GET_USER_INFO, user: res.user });
        })
        .catch((err) => {
          dispatch({ type: types.GET_USER_INFO_FAILED });
          throw err;
        });
    };
  },

  getUserPayoutMethod() {
    return (dispatch) => {
      return UserServices.getUserPayoutMethod()
        .then((res) =>
          dispatch({
            type: types.GET_USER_PAYOUT_METHOD,
            payoutUsername: res.payoutUsername,
            payoutMethod: res.payoutMethod,
          }),
        )
        .catch((err) => {
          dispatch({ type: types.GET_USER_PAYOUT_METHOD_FAILED });
          throw err;
        });
    };
  },

  updateUserPayout({ payoutMethod, payoutUsername }) {
    return (dispatch) => {
      return UserServices.updateUserPayout({ payoutMethod, payoutUsername })
        .then((res) => {
          return dispatch({ 
            type: types.UPDATE_USER_PAYOUT_METHOD,
            payoutUsername: res.payoutUsername,
            payoutMethod: res.payoutMethod,
          });
        })
        .catch((err) => {
          dispatch({ type: types.UPDATE_USER_PAYOUT_METHOD_FAILED });
          throw err;
        });
    };
  },

  getUserEvents() {
    return (dispatch) => {
      return UserServices.getUserEvents()
        .then((res) => {
          return dispatch({ 
            type: types.GET_USER_EVENTS, 
            events: res.events, 
            isUserRegister: true 
          });
        })
        .catch((err) => {
          dispatch({ type: types.GET_USER_EVENTS_FAILED });
          throw err;
        });
    };
  },

  registerEvent({ eventId }) {
    return (dispatch) => {
      return UserServices.registerEvent({ eventId })
        .then((res) => {
          return dispatch({ 
            type: types.REGISTER_EVENT, 
            events: res.events, 
            isUserRegister: true 
          });
        })
        .catch((err) => {
          dispatch({ type: types.REGISTER_EVENT_FAILED });
          throw err;
        });
    };
  },

  uploadAvatar(data) {
    return (dispatch) => {
      return UserServices.uploadAvatar(data)
        .then((avatar) => {
          return dispatch({ type: types.UPLOAD_AVATAR, avatar });
        })
        .catch((err) => {
          dispatch({ type: types.UPLOAD_AVATAR_FAILED });
          throw err;
        });
    };
  },
};
