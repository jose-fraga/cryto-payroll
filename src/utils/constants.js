import * as Localization from 'expo-localization';
import Constants from 'expo-constants';

export const UNIQUE_ID = 'my_uniq_id';
export const APP_VERSION = Constants.manifest.version;
export const USER_LANGUAGE = Localization.locale;
export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'popquiz_auth_token',
};

export const USER_TYPE = {
  ADMIN: 'admin',
  INFLUENCER: 'influencer',
  COMPANY: 'company',
  CUSTOMER: 'customer',
};

export const SCREENS = {
  /** Auth */
  APP: 'APP',
  AUTH: 'Auth',
  LOGIN: 'Login',
  SIGNUP: 'Signup',

  /** Prices */
  PRICES: 'Prices',

  /** Contractor */
  CONTRACTOR: 'Contractor',

  /** Profile */
  PROFILE: 'Profile',


  PLAYING: 'Playing',
  ACCOUNT: 'Account',
  BUSINESS: 'Business',
  LANGUAGE: 'Language',
  PAYMENTS: 'Payments',
  APPEARANCE: 'Appearance',
  EDITPAYOUT: 'EditPayout',
  EDITACCOUNT: 'EditAccount',
  EDITPAYMENT: 'EditPayment',
  EVENTDETAILS: 'EventDetails',
  PAYOUTMETHODS: 'PayoutMethods',
  PLAY_EVENT_DETAILS: 'PlayEventDetails',
  PRE_START_EVENT: 'PreStartEvent',
  EVENT_START: 'EventStart',
  START_PLAYING_EVENT: 'StartPlaying',
  PRE_START_EVENT: 'PreStartEvent'
};

export const ERRORS = {
  unexpected_error: {
    title: 'unexpectedErrorTitle',
    message: 'unexpectedErrorMessage',
  },
};

export const PAYOUT_METHODS = {
  ZELLE: 'Zelle',
  CASHAPP: 'Cash App',
  VENMO: 'Venmo',
  PAYPAL: 'PayPal',
};

export const PAYMENTS_METHODS = {
  AMEX: 'amex',
  APPLE_PAY: 'apple-pay',
  DINERS: 'diners',
  DISCOVER: 'discover',
  JCB: 'jcb',
  MASTERCARD: 'matercard',
  VISA: 'visa',
}