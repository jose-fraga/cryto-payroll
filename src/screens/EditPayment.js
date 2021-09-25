import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, InputAccessoryView } from 'react-native';
import { useSelector } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import i18n from '../utils/i18n';
import * as images from '../assets';
import { PAYMENTS_METHODS } from '../utils/constants';

const EditPayment = ({ route }) => {
  const { cc } = route.params;
  const colors = useSelector((state) => state.appSettings.colors);

  const getCardImage = (type) => {
    switch (type) {
      case PAYMENTS_METHODS.AMEX:
        return images.amex;
      case PAYMENTS_METHODS.APPLE_PAY:
        return images.applePay;
      case PAYMENTS_METHODS.DINERS:
        return images.diners;
      case PAYMENTS_METHODS.DISCOVER:
        return images.discover;
      case PAYMENTS_METHODS.JCB:
        return images.jcb;
      case PAYMENTS_METHODS.MASTERCARD:
        return images.masterCard;
      case PAYMENTS_METHODS.VISA:
        return images.visa;
      default:
        return images.card;
    }
  };

  return (
    <View style={styles.container(colors)}>
      <View style={styles.keyboardDissmiss}>
        <Text style={styles.title(colors)}>
          {i18n.t('payments')}
        </Text>
        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel(colors)}>
            {i18n.t('cardNumber')}
          </Text>
          <Input
            autoFocus
            colors={colors}
            value={cc.number}
            style={styles.input}
            keyboardType="numeric"
            imageSource={getCardImage(cc.type)}
            inputAccessoryViewID="edit-payment"
          />
          <View style={styles.secondRow}>
            <View style={styles.secondRowChild}>
              <Text style={styles.fieldLabel(colors)}>
                {i18n.t('expDate')}
              </Text>
              <Input
                colors={colors}
                style={styles.input}
                value={cc.expireDate}
                keyboardType="numeric"
                inputAccessoryViewID="edit-payment"
                placeholder={i18n.t('expDateFormat')}
              />
            </View>
            <View style={styles.secondRowChild}>
              <Text style={styles.fieldLabel(colors)}>
                {i18n.t('cvv')}
              </Text>
              <Input
                value={cc.cvv}
                colors={colors}
                placeholder="123"
                style={styles.input}
                keyboardType="numeric"
                inputAccessoryViewID="edit-payment"
              />
            </View>
          </View>
          <Text style={styles.fieldLabel(colors)}>
            {i18n.t('zipcode')}
          </Text>
          <Input
            colors={colors}
            value={cc.zipcode}
            style={styles.input}
            keyboardType="numeric"
            inputAccessoryViewID="edit-payment"
          />
        </View>
      </View>
      <InputAccessoryView nativeID="edit-payment">
        <View style={styles.buttonContainer}>
          {/* TODO: disable button until all fields are correct */}
          <Button
            title="Save"
            onPress={() => {}}
            colors={colors}
          />
        </View>
      </InputAccessoryView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    backgroundColor: colors.background,
  }),
  keyboardDissmiss: {
    padding: '10%',
    height: '100%',
    width: '100%',
  },
  formContainer: {
    marginTop: 20,
  },
  title: colors => ({
    fontSize: 40,
    fontWeight: '600',
    color: colors.primary,
  }),
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondRowChild: {
    width: '45%',
  },
  input: {
    marginVertical: 10,
  },
  buttonContainer: {
    width: '100%',
    padding: '3%',
  },
  fieldLabel: colors => ({
    color: colors.primary,
  }),
});

EditPayment.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      cc: PropTypes.shape({
        number: PropTypes.number,
        type: PropTypes.string,
        cvv: PropTypes.number,
        zipcode: PropTypes.string,
        default: PropTypes.bool,
        expireDate: PropTypes.string,
      }),
    }),
  }),
};

export default EditPayment;
