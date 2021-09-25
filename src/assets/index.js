import background1 from './events/background-1.png';
import background2 from './events/background-2.png';
import background3 from './events/background-3.png';
import background4 from './events/background-4.png';
import background5 from './events/background-5.png';
import background6 from './events/background-6.png';
import background7 from './events/background-7.png';
import background8 from './events/background-8.png';

import amex from './payments/amex.png';
import applePay from './payments/apple-pay.png';
import card from './payments/card.png';
import diners from './payments/diners.png';
import discover from './payments/discover.png';
import jcb from './payments/jcb.png';
import masterCard from './payments/mastercard.png';
import visa from './payments/visa.png';

import cashapp from './payouts/cashapp.png';
import paypal from './payouts/paypal.png';
import venmo from './payouts/venmo.png';
import zelle from './payouts/zelle.png';

import iconLight from './icons/light.png';
import iconDark from './icons/dark.png';

import splashLight from './splash/light.png';
import splashDark from './splash/dark.png';
import { PAYMENTS_METHODS } from '../utils/constants';

const paymentMethodImage = (paymentType) => {
  switch (paymentType) {
    case PAYMENTS_METHODS.AMEX:
      return amex;
    case PAYMENTS_METHODS.APPLE_PAY:
      return applePay;
    case PAYMENTS_METHODS.DINERS:
      return diners;
    case PAYMENTS_METHODS.DISCOVER:
      return discover;
    case PAYMENTS_METHODS.JCB:
      return jcb;
    case PAYMENTS_METHODS.MASTERCARD:
      return masterCard;
    case PAYMENTS_METHODS.VISA:
      return visa;
    default:
      return card;
  }
};

export {
  background1,
  background2,
  background3,
  background4,
  background5,
  background6,
  background7,
  background8,
  amex,
  applePay,
  card,
  diners,
  discover,
  jcb,
  masterCard,
  visa,
  cashapp,
  paypal,
  venmo,
  zelle,
  iconLight,
  iconDark,
  splashLight,
  splashDark,
  paymentMethodImage,
};
