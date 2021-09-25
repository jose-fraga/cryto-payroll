import * as types from '../actions/types';
import PayoutService from '../services/PayoutService';
import PaymentService from '../services/PaymentService';
import authService from '../services/AuthServices';
import { setLanguage } from '../../utils/i18n';
import { getThemeColors } from '../../styles';

export default {
  getPayoutMethods: () => {
    return (dispatch) => {
      return PayoutService.getPayoutMethods()
        .then((res) => {
          return dispatch({ type: types.GET_PAYOUT_METHODS, payoutMethods: res.methods });
        })
        .catch((err) => {
          dispatch({ type: types.GET_PAYOUT_METHODS_FAILED });
          throw err;
        });
    };
  },

  changeLanguage(language) {
    return (dispatch) => {
      setLanguage(language);
      return dispatch({ type: types.CHANGE_LANGUAGE, language });
    };
  },

  socketHealth: ({ active }) => {
    return (dispatch) => {
      if (active) {
        dispatch({ type: types.SOCKET_CONNECTED });
      } else {
        dispatch({ type: types.SOCKET_DISCONNECTED });
      }
    };
  },

  fetchConnectionToken: () => {
    return (dispatch) => {
      return authService.fetchConnectionToken()
        .then((res) => {
          return dispatch({ type: types.FETCH_SOCKET_CONNECTION_TOKEN, token: res.connectionToken });
        })
        .catch((error) => {
          return dispatch({ type: types.FETCH_SOCKET_CONNECTION_TOKEN_FAILED, error });
        });
    };
  },

  changeTheme: ({ theme = 'light' }) => {
    return (dispatch) => dispatch({
      type: types.THEME_CHANGED,
      theme,
      colors: getThemeColors(theme),
    });
  },

  getPayments: () => {
    return (dispatch) => {
      return PaymentService.getPayments()
        .then((res) => {
          return dispatch({
            type: types.GET_PAYMENTS,
            payments: res,
          });
        })
        .catch((err) => {
          dispatch({ type: types.GET_PAYMENTS_FAILED });
          throw err;
        });
    };
  },
  showLoginPage: () => ({ type: types.SHOW_LOGIN_PAGE }),
  hideLoginPage: () => ({ type: types.HIDE_LOGIN_PAGE }),
}