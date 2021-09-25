import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import RightButton from '../components/RightButton';
import appSettingsActions from '../store/actions/appSettingsActions';
import { useSelector, useDispatch } from 'react-redux';
import { SCREENS, PAYMENTS_METHODS } from '../utils/constants';
import { paymentMethodImage } from '../assets';
import i18n from '../utils/i18n';
import Logger from '../utils/logger';

const logger = Logger.get("Payments.js");

const Payments = ({ navigation }) => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.appSettings.colors);
  const payments = useSelector((state) => state.appSettings).payments;

  navigation.setOptions({
    headerRight: () => (
      <RightButton
        onPress={() => navigation.navigate(SCREENS.EDITPAYMENT)}
        title={i18n.t('addPayment')}
      />
    ),
  });

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    try {
      await dispatch(appSettingsActions.getPayments());
    } catch (err) {
      logger.error('Error fetching the payments', err);
    }
  };

  const handlePress = ({ method }) => {
    navigation.navigate(SCREENS.EDITPAYMENT, {
      cc: method
    });
  }

  const paymentList = () => (
    <>
      {payments.map((method, idx) => {
        const isApplePay = method.type === PAYMENTS_METHODS.APPLE_PAY;

        return (
          <TouchableOpacity
            disabled={isApplePay}
            onPress={() => handlePress({ method })}
            key={method.type}
            style={styles.method({ idx, colors })}>
            <View style={styles.methodImageInfo}>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={paymentMethodImage(method.type)}
              />
              <Text style={styles.methodInfo(colors)}>
                {isApplePay
                  ? 'Apple Pay'
                  : `‧‧‧‧ ${method.number}`}
              </Text>
              {
                method.default
                  ? <MaterialCommunityIcons
                    style={styles.default}
                    name="checkbox-marked-circle"
                    size={18}
                    color={colors.highlight}
                  />
                  : <View />
              }
            </View>
            {!isApplePay && (
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color={colors.primary}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </>
  );

  const noPayments = () => (
    <View style={styles.method({ idx: 0, colors })}>
      <Text style={styles.methodInfo(colors)}>
        {i18n.t('noPaymentsYet')}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container(colors)}>
        <Text style={styles.title(colors)}>
          {i18n.t('payments')}
        </Text>
        {payments.length > 0 ? paymentList() : noPayments()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    backgroundColor: colors.background,
  }),
  title: colors => ({
    margin: '10%',
    fontSize: 40,
    fontWeight: '600',
    color: colors.primary,
  }),
  method: ({ idx, colors }) => ({
    borderBottomColor: colors.shade12,
    borderTopColor: colors.shade12,
    borderBottomWidth: 1,
    borderTopWidth: idx === 0 ? 1 : 0,
    paddingHorizontal: '3%',
    paddingVertical: '5%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  methodImageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 25,
    width: 40,
    marginRight: '10%',
  },
  methodInfo: colors => ({
    color: colors.primary,
  }),
  default: {
    marginLeft: 10,
  },
});

Payments.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

Payments.defaultProps = {};

export default Payments;
