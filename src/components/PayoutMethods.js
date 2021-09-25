import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PAYOUT_METHODS } from '../utils/constants';
import * as images from '../assets';

export const getPayoutImage = (method) => {
  switch (method) {
    case PAYOUT_METHODS.ZELLE:
      return images.zelle;
    case PAYOUT_METHODS.CASHAPP:
      return images.cashapp;
    case PAYOUT_METHODS.VENMO:
      return images.venmo;
    case PAYOUT_METHODS.PAYPAL:
      return images.paypal;
    default:
      return images.paypal;
  }
};

const PayoutMethods = ({ availableMethods, onSelect, selected, colors }) => {
  const textColor = selected => {
    if (selected) {
      return colors.highlight;
    } else {
      return colors.primary;
    }
  };

  return (
    <View>
      {availableMethods.map((method) => (
        <TouchableOpacity
          key={method}
          style={styles.method(textColor(selected === method))}
          onPress={() => onSelect(method)}>
          <Image source={getPayoutImage(method)} style={styles.logo} />
          <Text style={styles.methodName(textColor(selected === method))}>
            {method}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  method: color => ({
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: color,
  }),
  logo: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  methodName: (color) => ({
    fontSize: 18,
    fontWeight: '600',
    color: color,
  }),
});

PayoutMethods.propTypes = {
  availableMethods: PropTypes.arrayOf([
    PropTypes.string,
  ]),
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

PayoutMethods.defaultProps = {
  availableMethods: [
    PAYOUT_METHODS.ZELLE,
    PAYOUT_METHODS.CASHAPP,
    PAYOUT_METHODS.VENMO,
    PAYOUT_METHODS.PAYPAL,
  ],
  onSelect: Function.prototype,
  selected: false,
};

export default PayoutMethods;
